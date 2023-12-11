/* KSD V001.000 AS */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from '@/resource/static/js/Common/commonUtils.js'
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import moment from 'moment'

const path = 'Audit/PosReport'

export default {
  name: 'PosReportTicketReport',
  mixins: [posReportUtils],
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
  data () {
    return {
      data: [],
      headers: [
        {
          text: this.$i18n.t('F32231.S801'),
          align: 'left',
          sortable: false,
          value: 'code',
          width: '100px'
        },
        {
          text: this.$i18n.t('F32231.S802'),
          align: 'start',
          sortable: false,
          value: 'name',
          width: '250px'
        },
        {
          text: this.$i18n.t('F32231.S820'),
          align: 'end',
          sortable: false,
          value: 'discountAmount',
          width: '150px'
        },
        {
          text: this.$i18n.t('F32231.S807'),
          align: 'end',
          sortable: false,
          value: 'sheets',
          width: '150px'
        },
        {
          text: this.$i18n.t('F32231.S806'),
          align: 'end',
          sortable: false,
          value: 'occurrence',
          width: '150px'
        },
        {
          text: this.$i18n.t('F32231.S808'),
          align: 'end',
          sortable: false,
          value: 'amount',
          width: '150px'
        }
      ],
      processing: false,
      masters: {},
      tabDuration: {},
      overDispDataMsg: null,
      durationTypeOptions: [
        { name: this.$i18n.t('F32231.S171'), value: 0 },
        { name: this.$i18n.t('F32231.S172'), value: 1 },
        { name: this.$i18n.t('F32231.S173'), value: 2 }
      ],
      responseDuration: {}
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
        let store = vue.masters.storeMasters.find(element => element.name === name)
        return store === undefined ? undefined : store.displayName.default
      }).filter(name => name !== undefined).join('、')
    },
    selectedDurationTypeName () {
      const selectedOption = this.durationTypeOptions.find(
        option => option.value === this.request.duration.type
      )
      return selectedOption ? selectedOption.name : ''
    },
    reportDuration () {
      return this.reportConditionDateFormatter(this.request, this.responseDuration)
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
              const result = response.data.responseModel
              this.data = []
              this.data = result.aggregateData
              this.responseDuration = response.data.responseModel.duration
              if (result.OverDispDataMsg) {
                this.openPopupDialog({
                  mode: 2,
                  messageCode: 'F32231.W001'
                })
                this.overDispDataMsg = result.OverDispDataMsg
              }
              const isInvalidDuration = result.duration === '' ||
                result.duration === undefined ||
                result.duration.from === '' ||
                result.duration.to === '' ||
                result.duration.from === undefined ||
                result.duration.to === undefined
              this.tabDuration = (this.data[0].from === '' || this.data[0].to === '')
                ? (isInvalidDuration
                  ? this.request.duration
                  : result.duration)
                : this.data[0]
              this.formatDuration()
              break
            case 2:
              await this.openPopupDialog({
                mode: 2,
                message: '対象データが存在しません。',
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
    },
    formatDuration () {
      if (this.request.duration.type === 1) {
        this.tabDuration.from = moment(this.tabDuration.from).format('YYYY-MM')
        this.tabDuration.to = moment(this.tabDuration.to).format('YYYY-MM')
      } else if (this.request.duration.type === 2) {
        this.tabDuration.from = moment(this.tabDuration.from).format('YYYY')
        this.tabDuration.to = moment(this.tabDuration.to).format('YYYY')
      }
    },
    getModifiedData (key, idx) {
      const modifiedData = this.data[key].endpoints[idx].data.map(item => {
        const truncatedName = this.doubleByteStringSlicer(item.name, 20)
        const truncatedDiscountAmount = this.doubleByteStringSlicer(item.discountAmount, 11)
        const codeFormatted = this.NumberDisplayFormatter(item.code, '999')
        const sheetsFormatted = Number(item.sheets).toLocaleString()
        const occurrenceFormatted = Number(item.occurrence).toLocaleString()
        const modifiedAmount = this.maskExcessDigits(item.amount)
        return {
          ...item,
          code: codeFormatted,
          name: truncatedName,
          discountAmount: truncatedDiscountAmount,
          amount: modifiedAmount,
          sheets: sheetsFormatted,
          occurrence: occurrenceFormatted
        }
      })
      return modifiedData
    }
  },
  async mounted () {
    await this.$nextTick()
    this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
    await this.getReportResult()
  }
}
/* KSD V001.000 AE */
