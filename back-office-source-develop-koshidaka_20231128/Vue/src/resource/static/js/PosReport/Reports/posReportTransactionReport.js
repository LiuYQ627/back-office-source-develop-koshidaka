/* KSD V001.000 AS */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from '@/resource/static/js/Common/commonUtils.js'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import TransactionReportTable from '@/resource/templates/PosReport/Tables/TransactionReportTable'
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'
import { posGenerateDisplayType } from '@/resource/static/js/Common/jsUtils'
const path = 'Audit/PosReport'

export default {
  mixins: [posReportUtils],
  name: 'PosReportTransactionReport',
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
          align: 'center',
          sortable: true,
          value: 'code',
          width: '100px'
        },
        {
          text: this.$i18n.t('F32231.S802'),
          align: 'start',
          sortable: true,
          value: 'name',
          width: '300px'
        },
        {
          text: this.$i18n.t('F32231.S803'),
          align: 'end',
          sortable: true,
          value: 'setQuantity',
          width: '100px'
        },
        {
          text: this.$i18n.t('F32231.S804'),
          align: 'end',
          sortable: false,
          value: 'customerCount',
          width: '150px'
        },
        {
          text: this.$i18n.t('F32231.S805'),
          align: 'end',
          sortable: false,
          value: 'itemQuantity',
          width: '150px'
        },
        {
          text: this.$i18n.t('F32231.S806'),
          align: 'end',
          sortable: true,
          value: 'occurrence',
          width: '150px'
        },
        {
          text: this.$i18n.t('F32231.S807'),
          align: 'end',
          sortable: true,
          value: 'sheets',
          width: '150px'
        },
        {
          text: this.$i18n.t('F32231.S808'),
          align: 'end',
          sortable: true,
          value: 'amount',
          width: '150px'
        }
      ],
      processing: false,
      masters: {},
      overDispDataMsg: null,
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
        const store = vue.masters.storeMasters.find(element => element.name === name)
        return store === undefined ? undefined : store.displayName.default
      }).filter(name => name !== undefined).join('、')
    },
    responseConditionStr () {
      const from = this.responseDuration && this.responseDuration.from && this.responseDuration.to
        ? this.responseDuration.from : this.request.duration.from
      const to = this.responseDuration && this.responseDuration.from && this.responseDuration.to
        ? this.responseDuration.to : this.request.duration.to
      const format = this.request.duration.type === 0 ? 10 : this.request.duration.type === 1 ? 7 : 4
      const result = this.request.duration.type === 2 ? from.slice(0, format)
        : from.slice(0, format) + ' ' + this.$i18n.t('F32231.S907') + ' ' + to.slice(0, format)
      return result
    }
  },
  components: {
    popup,
    dialogStoreSelect,
    TransactionReportTable
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
    generateType (data) {
      return posGenerateDisplayType(data, this.$i18n)
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
