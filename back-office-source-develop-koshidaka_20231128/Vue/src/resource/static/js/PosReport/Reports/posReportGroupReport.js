/* KSD V001.000 AS */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from '@/resource/static/js/Common/commonUtils.js'
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'

const path = 'Audit/PosReport'

export default {
  name: 'PosReportGroupReport',
  props: {
    request: {
      type: Object,
      required: true
    },
    reportTitle: {
      type: String,
      required: true
    }
  },
  mixins: [posReportUtils],
  data () {
    return {
      data: [],
      responseDuration: {},
      processing: false,
      masters: {},
      overDispDataMsg: ''
    }
  },
  computed: {
    registerIdsText () {
      return this.request.endpointId.join('、')
    },
    storeNames () {
      const vue = this
      if (!('storeMasters' in vue.masters)) return ''
      return vue.request.storeName.map(name => {
        const store = vue.masters.storeMasters.find(element => element.name === name)
        return store === undefined ? undefined : store.displayName.default
      }).filter(name => name !== undefined).join('、')
    },
    durationType () {
      switch (this.request.duration.type) {
        case 0: return this.$t('F32231.S171')
        case 1: return this.$t('F32231.S172')
        case 2: return this.$t('F32231.S173')
      }
    },
    detailOutput () {
      switch (this.request.detailOutput) {
        case 0: return this.$t('F32231.S785')
        case 1: return this.$t('F32231.S795')
        case 2: return this.$t('F32231.S709')
      }
    },
    hasMaxDataErr () {
      return String(this.overDispDataMsg).length > 0
    },
    reportDuration () {
      return this.reportConditionDateFormatter(this.request, this.responseDuration)
    },
    isTotalized () {
      return this.request.storeTotalize
    },
    hasTerms () {
      return this.request.detailOutput !== 0
    },
    hourZoneDuration () {
      if (String(this.request.hourZoneDuration.from).length === 0 || String(this.request.hourZoneDuration.to).length === 0 || this.request.hourZoneDuration.from === null) {
        return this.$t('F32231.S781')
      }
      return `${String(this.request.hourZoneDuration.from).padStart(2, '0')}${this.$t('F32231.S705')}${String(this.request.hourZoneDuration.to).padStart(2, '0')}`
    }
  },
  components: {
    popup,
    dialogStoreSelect
  },
  methods: {
    async getReportResult () {
      this.processing = true
      await axios.post(this.$i18n.t('prop.url') + path, this.request, commonUtils.methods.getApiHeader())
        .then(async response => {
          switch (response.data.result.code) {
            case 0:
              if (JSON.stringify(response.data.responseModel) === '{}') {
                this.openPopupDialog({
                  mode: 3,
                  messageCode: 'O00004.W010',
                  okBtnCallback: () => { this.$router.push('F32231/POSレポート出力') }
                })
              }
              const result = response.data.responseModel
              this.data = []
              this.data = result.aggregateData
              this.responseDuration = result.duration
              if (result.OverDispDataMsg) {
                this.openPopupDialog({
                  mode: 2,
                  messageCode: 'F32231.W001'
                })
                this.overDispDataMsg = result.OverDispDataMsg
              }
              break
            case 2:
              await this.openPopupDialog({
                mode: 2,
                messageCode: 'F32231.E501',
                okBtnCallback: () => {
                  this.processing = false
                  this.$router.push('F32231/POSレポート出力')
                }
              })
              break
            default:
              throw response.data.result
          }
          this.processing = false
        }, async (error) => {
          console.error(error)
          this.openPopupDialog({
            mode: 3,
            messageCode: 'O00004.W010',
            okBtnCallback: () => { this.$router.push('F32231/POSレポート出力') }
          })
        })
        .catch(error => {
          this.processing = false
          console.error(error)
          this.errorMapper(error)
        })
    }
  },
  async mounted () {
    await this.$nextTick()
    this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
    await this.getReportResult()
  }
}
/* KSD V001.000 AE */
