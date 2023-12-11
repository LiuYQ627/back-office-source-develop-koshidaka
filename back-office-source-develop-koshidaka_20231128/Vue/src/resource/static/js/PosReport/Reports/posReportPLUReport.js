/* KSD V001.000 AS */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from '@/resource/static/js/Common/commonUtils.js'
import { posGenerateDisplayType } from '@/resource/static/js/Common/jsUtils.js'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'

const path = 'Audit/PosReport'

export default {
  mixins: [posReportUtils],
  name: 'PosReportPLUReport',
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
      processing: false,
      masters: {},
      responseDuration: {},
      timeDetailDisplay: [ this.$i18n.t('F32231.S221'), this.$i18n.t('F32231.S222') ],
      overDispDataMsg: null,
      terminalIDs: []
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
    pluCodes () {
      return this.request.codeDuration.from + ' ' + this.$i18n.t('F32231.S705') + ' ' + this.request.codeDuration.to
    },
    periodType () {
      return posGenerateDisplayType(this.request.duration.type, this.$i18n)
    },
    timeZone () {
      if (this.request.hourZoneDuration.from && this.request.hourZoneDuration.to) {
        return this.NumberDisplayFormatter(this.request.hourZoneDuration.from, '99') +
        ' ' + this.$i18n.t('F32231.S705') + ' ' + this.NumberDisplayFormatter(this.request.hourZoneDuration.to, '99')
      } else {
        return this.$i18n.t('F32231.S781')
      }
    },
    timeDetail () {
      return this.timeDetailDisplay[this.request.timeDetail]
    },
    showSecondRow () {
      return this.request.timeDetail === 1
    },
    displayDurationStr () {
      return this.reportConditionDateFormatter(this.request, this.responseDuration)
    }
  },
  components: {
    popup,
    dialogStoreSelect,
    posGenerateDisplayType
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
            this.responseDuration = response.data.responseModel.duration
            this.getTerminalIDs()
          } else if (response.data.result.code === 2) {
            this.$refs.pop.open(2, '', this.$i18n.t('F32231.E501'), response.data.result.code, false, () => {
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
    getTerminalIDs () {
      const aggregateDatas = this.data
      Array.forEach(aggregateDatas, (data) => {
        for (let endpoint of data.endpoints) {
          this.terminalIDs.push(endpoint.endpointId)
        }
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
