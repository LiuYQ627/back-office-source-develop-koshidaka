/* KSD V001.000 AS */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from '@/resource/static/js/Common/commonUtils.js'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'

const path = 'Audit/PosReport'

export default {
  name: 'PosReportHourZoneReport',
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
  mixins: [errorMappingUtils, posReportUtils],
  data () {
    return {
      data: [],
      responseDuration: {},
      processing: false,
      masters: {},
      overDispDataMsg: '',
      headers: [
        {
          text: this.$i18n.t('F32231.S020'),
          align: 'start',
          width: '588px'
        },
        {
          text: this.$i18n.t('F32231.S804'),
          align: 'end',
          width: '176px'
        },
        {
          text: this.$i18n.t('F32231.S805'),
          align: 'end',
          width: '176px'
        },
        {
          text: this.$i18n.t('F32231.S808'),
          align: 'end',
          width: '235px'
        }
      ]
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
    reportDate () {
      return this.responseDuration.from ? this.responseDuration.from : this.request.duration.from
    },
    hasMaxDataErr () {
      return String(this.overDispDataMsg).length > 0
    },
    isTotalized () {
      return this.request.storeTotalize
    },
    salesCode () {
      switch (this.request.sale) {
        case 1: return this.$t('F32231.S787')
        case 2: return this.$t('F32231.S788')
        case 3: return this.$t('F32231.S789')
        case 4: return this.$t('F32231.S790')
      }
    },
    aggregateTime () {
      return this.request.aggregateTime === 0
        ? this.$t('F32231.S791')
        : this.$t('F32231.S792')
    },
    hourZoneDuration () {
      if (String(this.request.hourZoneDuration.from).length === 0 || String(this.request.hourZoneDuration.to).length === 0 || this.request.hourZoneDuration.from === null) {
        return this.$t('F32231.S781')
      }
      return `${String(this.request.hourZoneDuration.from).padStart(2, '0')}${this.$t('F32231.S705')}${String(this.request.hourZoneDuration.to).padStart(2, '0')}`
    },
    tableDateStrip () {
      if (!this.responseDuration.from) {
        return `${this.request.duration.from} ${this.$t('F32231.S705')} ${this.request.duration.to}`
      }
      return `${this.responseDuration.from} ${this.$t('F32231.S705')} ${this.responseDuration.to}`
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
            const globalErrorMsg = response.data.result.errorMessageMap['global'].toString()
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
    },
    maskItem (data) {
      return this.maskExcessDigits(data)
    },
  },
  async mounted () {
    await this.$nextTick()
    this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
    await this.getReportResult()
  }
}
/* KSD V001.000 AE */
