// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'
import dialogRegisterSelect from '@/resource/templates/PosReport/RegisterSelectDialog'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import moment from 'moment'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'

const auditReportOutputPathName = 'F32232-output'
const endpointPath = 'Audit/Endpoint'
const settingType = ''
const getConfigPath = 'Reservation/FetchConfigurationRecursive'
const initialScreenPath = '/F32232/監査レポート出力'

export default {
  name: 'AuditReport',
  mixins: [errorMappingUtils],
  data () {
    return {
      permissions: [],
      headquartersAuthority: true,
      registerSelectDisplayed: false,
      targetReport: -1,
      codeHandler: 0,
      emptyStorage: false,
      emptyRegisterStorage: false,
      availableRegisterIds: [],
      selectedRegisterIds: [],
      durationFrom: '',
      durationTo: '',
      storeNode: [],
      storeNodeValue: [],
      correspondingValue: [],
      correspondingCategories: [],
      errorMsg: '',
      countInput: 0,
      sessionBusinessUnitCd: '',
      request: {
        reportName: null,
        reportFormat: 'JSON',
        storeName: [],
        predefinedStoreName: [],
        printNoCheckFlg: false,
        endpointId: [],
        duration: {
          type: [this.$i18n.t('F32232.S341')],
          from: null,
          to: null
        }
      },
      defaultOption: [
        {
          value: this.$i18n.t('F32232.S341'),
          name: this.$i18n.t('F32232.S341')
        }],
      durationTypeOptions: [],
      auditCategory: [
        {
          value: 0,
          Name: this.$i18n.t('F32232.S341'),
          category: 'all'
        },
        {
          value: 1,
          Name: this.$i18n.t('F32232.S342'),
          category: 'OesItemCancel'
        },
        {
          value: 2,
          Name: this.$i18n.t('F32232.S343'),
          category: 'itemCancel'
        },
        {
          value: 4,
          Name: this.$i18n.t('F32232.S345'),
          category: 'orderCancel'
        },
        {
          value: 5,
          Name: this.$i18n.t('F32232.S346'),
          category: 'void'
        },
        {
          value: 6,
          Name: this.$i18n.t('F32232.S347'),
          category: 'saleCancel'
        },
        {
          value: 8,
          Name: this.$i18n.t('F32232.S349'),
          category: 'partialCorrection'
        } ],
      storeCodes: []
    }
  },
  computed: {
    selectedRegisterIdsText () {
      return this.selectedRegisterIds.join(this.$i18n.t('F32232.S121'))
    }
  },

  components: {
    maintButton,
    popup,
    dateInput,
    storeSelect,
    FormGroupLayout,
    RadioButton,
    dialogRegisterSelect,
    dialogStoreSelect
  },
  methods: {
    async initialize () {
      this.storeCodes = (await this.$refs.dialogStoreSelect.getMastersNoAuth(true)).storeMasters
        .map(obj => ({ original: obj.name, parsed: parseInt(obj.name, 10) }))
        .sort((a, b) => a.parsed - b.parsed)
        .map(obj => obj.original)
    },
    isValidResponse () {
      if (this.durationTypeOptions.length > 0) {
        return true
      }
      return false
    },
    isValid2Response () {
      if (this.durationTypeOptions.length > 3) {
        return true
      }
      return false
    },
    async onShowRegisterIdsDialog () {
      this.availableRegisterIds = await this.getRegisterIds()
    },
    durationTypeFilter (type) {
      if (type === 'check') {
        return this.request.duration.type.filter(row => row === this.$i18n.t('F32232.S341')).length
      }
      if (type === 'return') {
        return this.request.duration.type.filter(row => row !== this.$i18n.t('F32232.S341'))
      }
    },
    async getAuditConfig (store) {
      if (store && store.length <= 0) return
      let nodeId = ''
      this.storeNode = this.request.storeName.map(value => ({ original: value, parsed: parseInt(value, 10) }))
        .sort((a, b) => a.parsed - b.parsed)
        .map(obj => obj.original)
      this.storeNodeValue = this.storeNode[0]
      nodeId = (this.request.storeName.length !== 0) ? this.storeNodeValue : this.storeCodes[0]
      if (this.request.storeName.length >= 2) {
        this.selectedRegisterIds = []
      }
      if (this.request.storeName.toString() !== this.request.predefinedStoreName.toString()) {
        this.selectedRegisterIds = []
      }
      this.request.predefinedStoreName = this.request.storeName
      let result = false
      try {
        const params = {
          nodeId: nodeId,
          excludeFields: false,
          type: settingType
        }
        let response = await axios.put(this.$i18n.t('prop.url') + getConfigPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        this.codeHandler = response.data.result.code
        if (response.data.result.code === 0) {
          const auditNameSettings = response.data.responseModel.configurations.AUDIT_NAME_SETTINGS
          if (auditNameSettings && auditNameSettings.value) {
            this.durationTypeOptions = response.data.responseModel.configurations.AUDIT_NAME_SETTINGS.value.map(item => ({
              // KSD V001.000 DS issue#1283対応("Name"⇒"name")
              // value: item.Name,
              // name: item.Name,
              // KSD V001.000 DE issue#1283対応("Name"⇒"name")
              // KSD V001.000 AS issue#1283対応("Name"⇒"name")
              value: item.name,
              name: item.name,
              // KSD V001.000 AE issue#1283対応("Name"⇒"name")

              code: item.code
            })).filter(item => item.name && item.name.trim() !== '' && item.name !== null) || []
            result = true
            let finalDurationTypeOptions = []
            let auditCodes = [1, 2, 4, 5, 6, 8]
            for (let i = 0; i < this.durationTypeOptions.length; i++) {
              const receivedOption = this.durationTypeOptions[i]
              if (auditCodes.includes(receivedOption.code)) finalDurationTypeOptions.push(receivedOption)
            }
            this.durationTypeOptions = finalDurationTypeOptions
          } else {
            this.durationTypeOptions = []
            this.$refs.pop.open(3, '', this.$i18n.t('F00001.E019'), '', false, null, false, null)
          }
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E019'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    async getRegisterIds () {
      try {
        const params = { nodeIds: [this.storeNodeValue] }
        let ids = []
        let response = await axios.put(this.$i18n.t('prop.url') + endpointPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          for (var i = 0; i < response.data.responseModel.length; i++) {
            if (!ids.includes(response.data.responseModel[i].endpointId)) {
              ids.push(response.data.responseModel[i].endpointId)
            }
          }
        } else if (response.data.result.code === 2) {
        } else if (response.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
          return ids
        } else {
        }
        this.registerSelectDisplayed = true
        return ids
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
        return []
      }
    },
    backToMenu () {
      window.open('/TopPage', '_self')
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        const globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    async goToOutput () {
      this.correspondingValue = []
      this.correspondingCategories = []
      if (this.request.duration.type.includes(this.$i18n.t('F32232.S341'))) {
        this.correspondingCategories = ['all']
        this.request.duration.type = [this.$i18n.t('F32232.S341')]
      } else {
        this.request.duration.type.forEach(type => {
          const matchingOption = this.durationTypeOptions.find(option => option.name === type)
          if (matchingOption) {
            this.correspondingValue.push(matchingOption.code)
          }
        })
        this.correspondingValue.forEach(value => {
          if (value) {
            const matchingCategory = this.auditCategory.find(category => category.value === value)
            if (matchingCategory) {
              this.correspondingCategories.push(matchingCategory.category)
            }
          }
        })
      }
      let requestParams = {}
      requestParams = Object.assign(requestParams, {'reportName': JSON.parse(JSON.stringify(this.request.reportName))})
      requestParams = Object.assign(requestParams, {'reportFormat': JSON.parse(JSON.stringify(this.request.reportFormat))})
      requestParams = Object.assign(requestParams, {'storeName': JSON.parse(JSON.stringify(this.request.storeName))})
      requestParams = Object.assign(requestParams, {'duration': {}})
      let dailyValidationResult = validationUtils.methods.dailyDurationValidation(this.durationFrom, this.durationTo)
      if (typeof (dailyValidationResult) !== 'number') {
        requestParams.duration.from = dailyValidationResult.durationFrom
        requestParams.duration.to = dailyValidationResult.durationTo
      }
      if (!this.request.storeName.length && this.codeHandler === 0) {
        this.emptyStorage = true
        this.request.storeName = this.storeCodes
      }
      if (!this.selectedRegisterIds.length) {
        this.emptyRegisterStorage = true
        this.selectedRegisterIds = ['全選択']
      }
      this.$router.push({name: auditReportOutputPathName,
        params: {
          targetReport: this.$i18n.t('F32232.S001'),
          targetReportKey: 'AUDIT',
          storeCodes: this.request.storeName,
          registerIds: this.selectedRegisterIds,
          auditClassification: this.request.duration.type,
          durationFrom: this.durationFrom,
          durationTo: this.durationTo,
          auditCategory: this.correspondingCategories,
          autofillRequestDateFrom: requestParams.duration.from,
          autofillRequestDateTo: requestParams.duration.to
        }})
    },
    disabledDays (date) {
      moment.locale('ja')
      const now = moment()
      const tmp = moment(date)
      return now.isBefore(tmp)
    },
    dailyErrorCheck (e, errorCheckFlag) {
      this.focusField = []
      let dailyValidationResult = ''
      let popupMessage = ''
      dailyValidationResult = validationUtils.methods.dailyDurationValidation(this.durationFrom, this.durationTo, errorCheckFlag)
      if (typeof (dailyValidationResult) === 'number') {
        if (dailyValidationResult === 1) {
          this.durationFrom = ''
          this.focusField.push(this.$refs.durationYMDFrom)
          popupMessage = this.$i18n.t('F32231.E181')
        } else if (dailyValidationResult === 2) {
          this.durationTo = ''
          this.focusField.push(this.$refs.durationYMDTo)
          popupMessage = popupMessage = this.$i18n.t('F32231.E182')
        } else if (dailyValidationResult === 3) {
          this.focusField.push(this.$refs.durationYMDFrom)
          this.durationFrom = ''
          popupMessage = popupMessage = this.$i18n.t('F32231.E183')
        } else if (dailyValidationResult === 4) {
          this.durationTo = ''
          this.focusField.push(this.$refs.durationYMDTo)
          popupMessage = popupMessage = this.$i18n.t('F32231.E183')
        }
      }
      if (this.focusField.length > 0) {
        this.openPopupDialog({
          mode: 3,
          message: popupMessage,
          code: -99,
          okBtnCallback: () => {
            const focusElem = this.focusField[0].$el.querySelector(`#calendarImg`)
            this.$nextTick(() => {
              this.focusField[0].$refs.flatPickr.fp.clear()
              this.focusField[0].$refs.flatPickr.fp.close()
              focusElem.focus()
            })
            this.$refs.pop.closeFunction()
          }
        })
      }
    },
    backToInitialScreen () {
      window.open(initialScreenPath, '_self')
    }
  },
  watch: {
    'request.duration.type': function (value) {
      if (typeof value === 'object' && this.durationTypeFilter('check')) {
        this.request.duration.type = this.durationTypeFilter('return')
      }
      if (value.length === 0) {
        this.request.duration.type = this.$i18n.t('F32232.S341')
      }
    }
  },
  created () {
    this.$root.winId = 'F32232'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
    this.$root.$on('clearStoreCodes', () => {
      if (this.emptyStorage === true) {
        this.request.storeName = []
        this.emptyStorage = false
      }
      if (this.emptyRegisterStorage === true) {
        this.selectedRegisterIds = []
        this.emptyRegisterStorage = false
      }
    })
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    this.$root.$once('getBusinessUnitCdStr', async (businessUnitCdStr) => {
      this.sessionBusinessUnitCd = businessUnitCdStr
      await this.initialize()
      this.getAuditConfig()
    })
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    await this.$nextTick()
  }
}
// KSD V001.000 AE
