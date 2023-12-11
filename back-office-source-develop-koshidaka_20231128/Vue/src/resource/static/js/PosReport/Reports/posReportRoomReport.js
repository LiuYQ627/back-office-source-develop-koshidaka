/* KSD V001.000 AS */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from '@/resource/static/js/Common/commonUtils.js'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'

const path = 'Audit/PosReport'

export default {
  mixins: [posReportUtils],
  name: 'PosReportRoomReport',
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
          text: this.$i18n.t('F32231.S908'),
          align: 'center',
          sortable: false,
          value: 'roomNo',
          width: '80px'
        },
        {
          text: this.$i18n.t('F32231.S909'),
          align: 'start',
          sortable: false,
          value: 'roomName',
          width: '350px'
        },
        {
          text: this.$i18n.t('F32231.S910'),
          align: 'end',
          sortable: false,
          value: 'useTime',
          width: '90px'
        },
        {
          text: this.$i18n.t('F32231.S911'),
          align: 'end',
          sortable: false,
          value: 'useRate',
          width: '50px'
        }
      ],
      processing: false,
      masters: {},
      responseDuration: {},
      hasData: false,
      overDispDataMsg: null
    }
  },
  computed: {
    roomNamesText () {
      return this.request.roomNo && this.request.roomNo.length > 0 ? this.request.roomNo.join('、') : this.$i18n.t('F32231.S781')
    },
    storeNames () {
      const vue = this
      if (!('storeMasters' in vue.masters)) return ''
      return vue.request.storeName.map(name => {
        const store = vue.masters.storeMasters.find(element => element.name === name)
        return store === undefined ? undefined : store.displayName.default
      }).filter(name => name !== undefined).join('、')
    },
    responseConditionStr () {
      const from = this.responseDuration && this.responseDuration.from && this.responseDuration.to
        ? this.responseDuration.from : this.request.duration.from
      const to = this.responseDuration && this.responseDuration.from && this.responseDuration.to
        ? this.responseDuration.to : this.request.duration.to
      return from + ' ' + this.$i18n.t('F32231.S907') + ' ' + to
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
        .then(response => {
          if (response.data.result.code === 0) {
            this.data = []
            const result = response.data.responseModel
            this.data = result.aggregateData
            if (this.data.length <= 0) {
              this.doCatchError(this.$i18n.t('O00004.W010'))
            }
            if (result.OverDispDataMsg) {
              this.openPopupDialog({
                mode: 2,
                messageCode: 'F32231.W001'
              })
              this.overDispDataMsg = result.OverDispDataMsg
            }
            this.responseDuration = result.duration
          } else if (response.data.result.code === 2) {
            this.$refs.pop.open(2, '', this.$i18n.t('F32231.E501'), '', false, () => {
              this.$parent.backToPrevious()
            }, false, null)
          } else if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              window.open('/LoginPage', '_self')
            }, false, null)
          } else {
            let globalErrorMsg = response.data.result.errorMessageMap['global'].toString()
            this.$refs.pop.open(3, '', globalErrorMsg, response.data.result.code, false, () => {
              this.$parent.backToPrevious()
            }, false, null)
          }
          this.processing = false
        })
        .catch(error => {
          this.doCatchError(error)
        })
    },
    doCatchError (error) {
      this.processing = false
      if (typeof error !== 'undefined') {
        console.error(error)
      }
      this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
        this.$parent.backToPrevious()
      }, false, null)
    }
  },
  async mounted () {
    await this.$nextTick()
    this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
    await this.getReportResult()
  }
}
/* KSD V001.000 AE */
