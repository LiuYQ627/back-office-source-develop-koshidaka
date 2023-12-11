// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editNameDisplayDialog from '@/resource/templates/OESLinkageNameSetting/OESEditNameDisplayDialog'
import editUnpaidDeleteReasonDialog from '@/resource/templates/OESLinkageNameSetting/OESEditUnpaidDeleteReasonDialog'
import popup from '@/resource/templates/CommonDesign/Popup'

const FETCH_CURRENT_CONFIGURATION = 'Reservation/FetchConfigurationRecursive'
const PUT_CURRENT_CONFIGURATION = 'Reservation/UpdateConfigurationBy5Step'

const DEFAULT_MODEL = require('./_defaultConfig.json')

export default {
  name: 'OESLinkageNameSetting',
  data () {
    return {
      nameDisplayConfig: JSON.parse(JSON.stringify(DEFAULT_MODEL.NAME_DISPLAY_PRINT_SETTING)),
      unpaidDeleteReasonCodeConfig: JSON.parse(JSON.stringify(DEFAULT_MODEL.UNPAID_DELETE_REASON_CODE_VALUES)),
      setting: {},
      targetStoreCodes: [],
      isEdited: false,
      disabledFixedBtn: true,
      disableStopButton: true,
      disableEditButton: true
    }
  },
  components: {
    maintButton,
    editNameDisplayDialog,
    editUnpaidDeleteReasonDialog,
    popup,
    storeSelect,
    FormGroupLayout
  },
  methods: {
    async initialize () {
      this.nameDisplayConfig = JSON.parse(JSON.stringify(DEFAULT_MODEL.NAME_DISPLAY_PRINT_SETTING))
      this.unpaidDeleteReasonCodeConfig = JSON.parse(JSON.stringify(DEFAULT_MODEL.UNPAID_DELETE_REASON_CODE_VALUES))
      this.setting = {}
      this.isEdited = false
      this.disabledFixedBtn = true
      this.disableStopButton = true
      this.disableEditButton = true
      const result = await this.getOESLinkageNameSetting()
      if (result === true) {
        this.disabledFixedBtn = false
        this.disableStopButton = false
        this.disableEditButton = false
        this.focusFirstFocusableElement()
      }
    },
    async getOESLinkageNameSetting () {
      this.nameDisplayConfig = JSON.parse(JSON.stringify(DEFAULT_MODEL.NAME_DISPLAY_PRINT_SETTING))
      this.unpaidDeleteReasonCodeConfig = JSON.parse(JSON.stringify(DEFAULT_MODEL.UNPAID_DELETE_REASON_CODE_VALUES))
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + FETCH_CURRENT_CONFIGURATION, {
          nodeId: this.targetStoreCodes[0],
          excludeFields: false
        }, commonUtils.methods.getApiHeader())
        const nameDisplayPrintSetting = response.data.responseModel.configurations.NAME_DISPLAY_PRINT_SETTING
        const unpaidDeleteReasonCodeValues = response.data.responseModel.configurations.UNPAID_DELETE_REASON_CODE_VALUES

        if (nameDisplayPrintSetting !== undefined &&
          unpaidDeleteReasonCodeValues !== undefined) {
          if (response.data.result.code === 0) {
            if (response.data.responseModel != null) {
              this.setConfiguration(response.data.responseModel)
              return true
            }
          } else {
            this.targetStoreCodes = []
            this.disabledFixedBtn = true
            this.disableStopButton = true
            this.disableEditButton = true
            this.globalErrorMapping(response.data.result)
          }
        } else {
          this.targetStoreCodes = []
          this.catchErrorPopup()
        }
      } catch (error) {
        console.error(error)
        this.targetStoreCodes = []
        this.disabledFixedBtn = true
        this.disableStopButton = true
        this.disableEditButton = true
        if (error.data === undefined) {
          this.catchErrorPopup()
        } else this.globalErrorMapping(error.data.result)
      }
    },
    async saveOESLinkageNameSetting () {
      let result = false
      try {
        const nameDisplayConfig = JSON.parse(JSON.stringify(this.nameDisplayConfig))
        const unpaidDeleteDisplay = JSON.parse(JSON.stringify(this.unpaidDeleteReasonCodeConfig))

        this.setting.configurations.NAME_DISPLAY_PRINT_SETTING.value = nameDisplayConfig
        this.setting.configurations.UNPAID_DELETE_REASON_CODE_VALUES.value = unpaidDeleteDisplay
        const nodeId = this.targetStoreCodes[0]
        const params = {
          nodeId: nodeId,
          configuration: this.setting,
          mode: 0
        }
        const response = await axios.put(this.$i18n.t('prop.url') + PUT_CURRENT_CONFIGURATION, params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        console.error(error)
        this.catchErrorPopup()
      }
      return result
    },
    assignValueIfDefined (target, source) {
      if (source !== undefined && source !== null && source !== '') {
        Object.assign(target, source)
      }
    },
    setConfiguration (setting) {
      this.setting = JSON.parse(JSON.stringify(setting))
      this.assignValueIfDefined(this.nameDisplayConfig, setting.configurations.NAME_DISPLAY_PRINT_SETTING.value)
      this.assignValueIfDefined(this.unpaidDeleteReasonCodeConfig, setting.configurations.UNPAID_DELETE_REASON_CODE_VALUES.value)
    },
    storeClicked () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.proceedStoreClick, false, null)
    },
    proceedStoreClick () {
      this.isEdited = false
      this.timeout = setTimeout(() => {
        this.$refs.storeSelect.openDialog()
      }, 50)
    },
    editNameDisplaySetting (row, index) {
      if (this.disableStopButton === false) {
        this.$refs.editNameDisplayDialog.open(row, index)
        this.$refs.editNameDisplayDialog.openEnd()
      }
    },
    editUnpaidDeleteReasonSetting (row, index) {
      if (this.disableStopButton === false) {
        this.$refs.editUnpaidDeleteReasonDialog.open(row, index)
        this.$refs.editUnpaidDeleteReasonDialog.openEnd()
      }
    },
    nameDisplayCallback (nameDisplay, dataRows) {
      this.isEdited = true
      this.$set(
        this.nameDisplayConfig.rows[dataRows].row[0].displayName,
        'default',
        nameDisplay.displayName
      )
      this.$set(
        this.nameDisplayConfig.rows[dataRows].row[0].printName,
        'default',
        nameDisplay.printName
      )
    },
    unpaidDeleteReasonSaveCallback (unpaidDeleteDisplay, index) {
      this.isEdited = true
      this.$set(
        this.unpaidDeleteReasonCodeConfig.rows['code' + index].row[0].displayName,
        'default',
        unpaidDeleteDisplay.displayName
      )
      this.$set(
        this.unpaidDeleteReasonCodeConfig.rows['code' + index].row[0].printName,
        'default',
        unpaidDeleteDisplay.printName
      )
    },
    async resetForm () {
      await this.getOESLinkageNameSetting()
    },
    handleStoreSelectChange () {
      if (this.targetStoreCodes[0]) {
        this.initialize()
      }
    },
    handleMaintButtonClose () {
      if (this.disabledFixedBtn === false) {
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => {
          this.$router.push('/TopPage')
        }, false, null)
      } else {
        this.$router.push('/TopPage')
      }
    },
    async handleMaintButtonFixed () {
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (await this.saveOESLinkageNameSetting() === true) {
        if (await this.getOESLinkageNameSetting() === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
        }
      }
    },
    handleStopMaintButton () {
      this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.resetForm()
        }
      })
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        if (result.errorMessageMap == null || result.errorMessageMap['global'] == null) this.catchErrorPopup()
        else {
          const globalErrorMsg = result.errorMessageMap['global'].toString()
          this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        }
      }
    },
    async openPopupDialog ({
      mode = 1,
      title = '',
      messageCode = null,
      message = null,
      code = '',
      showBackBtn = false,
      okBtnCallback = null,
      isNonDispStatus = false,
      backBtnCallback = null
    } = {}) {
      if (messageCode !== null && message === null) {
        message = this.$i18n.t(messageCode)
      }
      await this.$refs.pop.open(mode, title, message, code, showBackBtn, okBtnCallback, isNonDispStatus, backBtnCallback)
    },
    catchErrorPopup () {
      this.openPopupDialog({
        mode: 3,
        message: this.$i18n.t('O00004.W010'),
        code: ''
      })
    },
    confirmUnload (event) {
      if (this.isEdited) {
        event.returnValue = ''
      }
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled && x.checkVisibility())
        target.focus()
      })
    }
  },
  created () {
    this.$root.winId = 'F322b7'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  mounted () {
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    const authority = this.$refs.storeSelect.headquartersAuthorityCheckEnable
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 200)
    this.focusFirstFocusableElement()
  }
}
// KSD V001.000 AE
