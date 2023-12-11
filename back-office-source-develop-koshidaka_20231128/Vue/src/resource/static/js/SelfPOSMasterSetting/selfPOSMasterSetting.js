// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import FileInput from '@/resource/templates/CommonInput/FileInput'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import CrossIcon from '@/resource/templates/CommonDesign/CrossIcon'
import popup from '@/resource/templates/CommonDesign/Popup'
import SelfPOSMasterSettingTimeSetting from '@/resource/templates/SelfPOSMasterSetting/SelfPOSMasterSettingTimeSetting'
import SelfPOSMasterSettingPaymentSetting from '@/resource/templates/SelfPOSMasterSetting/SelfPOSMasterSettingPaymentSetting'
import SelfPOSMasterSettingMessageSetting from '@/resource/templates/SelfPOSMasterSetting/SelfPOSMasterSettingMessageSetting'
import SelfPOSMasterSettingImageAudioPreview from '@/resource/templates/SelfPOSMasterSetting/SelfPOSMasterSettingImageAudioPreview'
import SelfPOSMasterSettingCustomerFilePreview from '@/resource/templates/SelfPOSMasterSetting/SelfPOSMasterSettingCustomerFilePreview'
import SelfPOSMasterSettingCustomerOptionSetting from '@/resource/templates/SelfPOSMasterSetting/SelfPOSMasterSettingCustomerOptionSetting'
import s3bucketBaseUtils from '@/resource/static/js/Common/s3bucketBaseUtils'
import s3bucketUtils from '@/resource/static/js/Common/s3bucketUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import {
  processSettings,
  loadFileModels,
  loadFileStatus,
  loadFileSelection,
  getFileStatus,
  handleFileUpload,
  formatSettingConfig,
  removeDelFiles,
  convertToInteger } from './selfPOSUtils'

const FETCH_CURRENT_CONFIGURATION = 'Reservation/FetchConfigurationRecursive'
const PUT_CURRENT_CONFIGURATION = 'Reservation/UpdateConfigurationBy5Step'

const DEFAULT_MODEL = require('./_defaultConfig.json')

const DEFAULT_ELEMENT_FILE_ITEM_MODEL = {
  filename: null,
  authenticatedUrl: null,
  uploadedFileObj: null,
  uploadedFileDataUri: null
}

const DEFAULT_ELEMENT_FILE_MODEL = {
  ksdtaikiseidougaimagefilename: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdomiokuriImagefilename: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdallcpiconiImagefilename: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdallcticoniImagefilename: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdomiokurivoicefilename: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL))
}

const DEFAULT_CUSTOMER_FILE_MODEL = {
  ksdtaikiseidougacartoonfilename: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename1: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename2: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename3: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename4: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename5: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename6: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename7: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename8: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename9: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL)),
  ksdtaikiseishigaimagefilename10: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_ITEM_MODEL))
}

export default {
  name: 'SelfPOSMasterSetting',
  mixins: [s3bucketUtils, s3bucketBaseUtils, validationUtils, errorMappingUtils],
  props: {
    config: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dataConfig: JSON.parse(JSON.stringify(DEFAULT_MODEL.CONFIG_DEFAULT_DATA_MODEL)),
      elementFileModel: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL)),
      elementFileModelCommon: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL)),
      elementFileModelIndividual: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL)),
      customerFileModel: JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL)),
      customerFileModelCommon: JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL)),
      customerFileModelIndividual: JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL)),
      setting: {},
      s3BucketBaseFileMap: {},
      s3BucketFileMap: {},
      s3MasterFileMap: {},
      fileExists: {},
      deleteFiles: [],
      targetStoreCodes: [],
      elemFileStatus: [],
      disableDelBtn: [],
      initialCusFileStatus: [],
      cusFileStatus: [],
      elementFileNameOptions: [],
      customerFileNameOptions: [],
      edited: false,
      isShowOptionItemSettingPanel: false,
      isShowTimeSettingPanel: false,
      isShowPaymentSettingPanel: false,
      isShowMessageSettingPanel: false,
      isShowImageAudioSettingPanel: false,
      isShowCustomerOptionSettingPanel: false,
      isShowCustomerFileSettingPanel: false,
      disabledFixedBtn: true,
      disabledIconPositionButton: true,
      s3getFileFlag: false,
      saveFlag: false,
      focusItem: null,
      isShowPreviewPanel: true,
      isShowCustomerFilePreviewPanel: true,
      headquartersAuthority: null,
      hasImage: false,
      isCommon: false,
      isIndividual: false,
      isCusCommon: false,
      isCusIndividual: false,
      timeout: null,
      isDuplicate: false,
      delBtnPrsd: false,
      upIndvCounter: 0,
      doOptions: [
        { name: this.$i18n.t('C00222.S020'), value: 1 },
        { name: this.$i18n.t('C00222.S021'), value: 0 }
      ],
      topScreenOptions: [
        { name: this.$i18n.t('C00222.S022'), value: 0 },
        { name: this.$i18n.t('C00222.S023'), value: 1 }
      ]
    }
  },
  components: {
    maintButton,
    popup,
    storeSelect,
    FormGroupLayout,
    FileInput,
    SelectInput,
    TextInput,
    CrossIcon,
    SelfPOSMasterSettingTimeSetting,
    SelfPOSMasterSettingPaymentSetting,
    SelfPOSMasterSettingMessageSetting,
    SelfPOSMasterSettingImageAudioPreview,
    SelfPOSMasterSettingCustomerOptionSetting,
    SelfPOSMasterSettingCustomerFilePreview
  },
  methods: {
    async initialize () {
      this.dataConfig = JSON.parse(JSON.stringify(DEFAULT_MODEL.CONFIG_DEFAULT_DATA_MODEL))
      this.elementFileModel = JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL))
      this.elementFileModelCommon = JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL))
      this.elementFileModelIndividual = JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL))
      this.customerFileModel = JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL))
      this.customerFileModelCommon = JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL))
      this.customerFileModelIndividual = JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL))
      this.setting = {}
      this.s3BucketBaseFileMap = {}
      this.s3BucketFileMap = {}
      this.s3MasterFileMap = {}
      this.fileExists = {}
      this.elementFileNameOptions = []
      this.customerFileNameOptions = []
      this.initialCusFileStatus = []
      this.edited = false
      this.isShowOptionItemSettingPanel = false
      this.isShowTimeSettingPanel = false
      this.isShowPaymentSettingPanel = false
      this.isShowMessageSettingPanel = false
      this.isShowImageAudioSettingPanel = false
      this.isShowCustomerOptionSettingPanel = false
      this.isShowCustomerFileSettingPanel = false
      this.disabledFixedBtn = true
      this.disabledIconPositionButton = true
      this.s3getFileFlag = false
      this.saveFlag = false
      this.isShowPreviewPanel = true
      this.isShowCustomerFilePreviewPanel = true
      this.headquartersAuthority = this.$refs.storeSelect.headquartersAuthority
      this.hasImage = false
      this.isCommon = false
      this.isIndividual = false
      this.isCusCommon = false
      this.isCusIndividual = false
      this.isDuplicate = false
      this.delBtnPrsd = false
      this.upIndvCounter = 0
      this.elemFileStatus = Array(6).fill(false)
      this.cusFileStatus = Array(11).fill(false)
      this.disableDelBtn = Array(11).fill(false)
      this.deleteFiles = Array(11).fill(null)
      const result = await this.loadMasterData()
      this.loadElemFileStatus()
      this.loadCusFileStatus()
      this.setDelButtonStatus()
      if (result === true) {
        this.isShowOptionItemSettingPanel = true
        this.disabledFixedBtn = false
        this.focusFirstFocusableElement()
      }
    },
    async loadMasterData () {
      this.elementFileModel = JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL))
      this.elementFileModelCommon = JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL))
      this.elementFileModelIndividual = JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL))
      this.customerFileModel = JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL))
      this.customerFileModelCommon = JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL))
      this.customerFileModelIndividual = JSON.parse(JSON.stringify(DEFAULT_CUSTOMER_FILE_MODEL))
      this.s3BucketBaseFileMap = {}
      this.s3BucketFileMap = {}
      this.initialCusFileStatus = []
      this.isCommon = false
      this.isIndividual = false
      this.isCusCommon = false
      this.isCusIndividual = false
      this.isDuplicate = false
      this.delBtnPrsd = false
      this.upIndvCounter = 0
      this.disableDelBtn = Array(11).fill(false)
      this.deleteFiles = Array(11).fill(null)
      try {
        const tempDataModel = await this.getSelfPOSMasterSetting()
        if (!tempDataModel) throw new Error()
        if (this.headquartersAuthority === 1) this.s3BucketBaseFileMap = await this.getS3FilesBase()
        if (!this.s3BucketBaseFileMap) this.s3BucketBaseFileMap = {}
        this.s3BucketFileMap = await this.getS3Files()
        if (!this.s3BucketFileMap) this.s3BucketFileMap = {}
        if (this.headquartersAuthority === 1) await this.loads3MasterFile()
        await this.loadFileDataModel()
        return true
      } catch (error) {
        if (!this.s3getFileFlag) this.targetStoreCodes = []
        console.error(error)
        if (error.data === undefined) this.catchErrorPopup()
        else this.globalErrorMapping(error.data.result)
        return false
      }
    },
    loads3MasterFile () {
      const s3keys1 = Object.keys(this.s3BucketBaseFileMap)
      const s3keys2 = Object.keys(this.s3BucketFileMap)
      const allKeys = [...s3keys1, ...s3keys2]

      for (const key of allKeys) {
        const value1 = this.s3BucketBaseFileMap[key]
        const value2 = this.s3BucketFileMap[key]
        const selectedValue = value2 !== null ? value2 : value1
        if (selectedValue !== null) {
          this.s3MasterFileMap[key] = selectedValue
        }
      }
    },
    loadElemFileStatus () {
      const fileMap = this.headquartersAuthority === 1 ? this.s3MasterFileMap : this.s3BucketFileMap
      loadFileStatus(this.dataConfig.SELF_ELEMENTFILE_SETTINGS, fileMap, this.elemFileStatus, this.fileExists, this.s3getFileFlag)
    },
    loadCusFileStatus () {
      const fileMap = this.headquartersAuthority === 1 ? this.s3MasterFileMap : this.s3BucketFileMap
      loadFileStatus(this.dataConfig.CUSTOMER_FILE_SETTINGS, fileMap, this.cusFileStatus, this.fileExists, this.s3getFileFlag)
    },
    loadFileDataModel () {
      this.elementFileModel = {}
      this.elementFileModelCommon = {}
      this.elementFileModelIndividual = {}
      this.customerFileModel = {}
      this.customerFileModelCommon = {}
      this.customerFileModelIndividual = {}
      const pulldownOptions = DEFAULT_MODEL.FILENAME.INDIVIDUAL
      const targetElementFileModel = this.dataConfig.SELF_ELEMENTFILE_SETTINGS
      const targetCustomerFileModel = this.dataConfig.CUSTOMER_FILE_SETTINGS

      if (targetElementFileModel != null) {
        const {
          fileModel,
          fileModelCommon,
          fileModelIndividual,
          hasFileAuthenticatedUrl,
          hasFileAuthenticatedUrlCommon,
          hasFileAuthenticatedUrlIndividual
        } = loadFileModels(targetElementFileModel, this.headquartersAuthority === 1 ? this.s3MasterFileMap : this.s3BucketFileMap, this.s3BucketBaseFileMap, this.s3BucketFileMap)
        this.elementFileModel = fileModel
        this.elementFileModelCommon = fileModelCommon
        this.elementFileModelIndividual = fileModelIndividual
        this.isShowPreviewPanel = hasFileAuthenticatedUrl || hasFileAuthenticatedUrlCommon || hasFileAuthenticatedUrlIndividual
        this.elementFileNameOptions = loadFileSelection(this.elementFileModel)
        if (this.headquartersAuthority !== 1) this.elementFileNameOptions = this.elementFileNameOptions.filter((item) => Object.values(pulldownOptions).includes(item.name))
      }

      if (targetCustomerFileModel != null) {
        const {
          fileModel,
          fileModelCommon,
          fileModelIndividual,
          hasFileAuthenticatedUrl,
          hasFileAuthenticatedUrlCommon,
          hasFileAuthenticatedUrlIndividual
        } = loadFileModels(targetCustomerFileModel, this.headquartersAuthority === 1 ? this.s3MasterFileMap : this.s3BucketFileMap, this.s3BucketBaseFileMap, this.s3BucketFileMap)
        this.customerFileModel = fileModel
        this.customerFileModelCommon = fileModelCommon
        this.customerFileModelIndividual = fileModelIndividual
        this.isShowCustomerFilePreviewPanel = hasFileAuthenticatedUrl || hasFileAuthenticatedUrlCommon || hasFileAuthenticatedUrlIndividual
        this.customerFileNameOptions = loadFileSelection(this.customerFileModel)
        if (this.headquartersAuthority !== 1) this.customerFileNameOptions = this.customerFileNameOptions.filter((item) => Object.values(pulldownOptions).includes(item.name))
      }
    },
    getElementFileStatusCommon (fileId) {
      const keys = Object.keys(this.elementFileModelCommon)
      const targetProp = keys[fileId - 1]
      return getFileStatus(this.elementFileModelCommon[targetProp], this.$i18n)
    },
    getElementFileStatusIndividual (fileId) {
      const keys = Object.keys(this.elementFileModelIndividual)
      const targetProp = keys[fileId - 1]
      return getFileStatus(this.elementFileModelIndividual[targetProp], this.$i18n)
    },
    getCustomerFileStatusCommon (fileId) {
      const keys = Object.keys(this.customerFileModelCommon)
      const targetProp = keys[fileId - 1]
      return getFileStatus(this.customerFileModelCommon[targetProp], this.$i18n, this.disableDelBtn[fileId - 1])
    },
    getCustomerFileStatusIndividual (fileId) {
      const keys = Object.keys(this.customerFileModelIndividual)
      const targetProp = keys[fileId - 1]
      return getFileStatus(this.customerFileModelIndividual[targetProp], this.$i18n, this.disableDelBtn[fileId - 1])
    },
    setDelButtonStatus () {
      for (const keys of Object.keys(this.customerFileModel)) {
        const model = this.customerFileModel[keys]
        this.initialCusFileStatus.push(getFileStatus(model, this.$i18n))
      }
    },
    async setDisableDelButton (delId) {
      this.disableDelBtn[delId - 1] = true
      this.isShowCustomerFileSettingPanel = false
      this.isShowCustomerFileSettingPanel = true
    },
    setElemFileName (fileId) {
      const filename = JSON.parse(JSON.stringify(DEFAULT_MODEL.FILENAME.ELEMENT_FILENAME))
      return filename[fileId] || ''
    },
    setCusFileName (fileId) {
      const filename = JSON.parse(JSON.stringify(DEFAULT_MODEL.FILENAME.CUSTOMER_FILENAME))
      return filename[fileId] || ''
    },
    validateFileUpload (file, fileId, cusPage) {
      const isCusPage = cusPage
      const validate = validationUtils.methods
      const showMessageAndReturn = (validationMessage) => {
        this.$refs.pop.open(3, '', this.$i18n.t(validationMessage), -99, false, null, false, null)
        return true
      }
      switch (fileId) {
        case 1:
          if (['video/mp4', 'video/quicktime', 'video/x-ms-wmv'].includes(file.type)) {
            if (validate.videoUploadSizeLimit(file)) { return showMessageAndReturn('C00222.E008') }
          } else return showMessageAndReturn('C00222.E007')
          break
        case 3:
          if (!isCusPage) {
            if (file.type === 'image/png') {
              if (validate.imageUploadSizeLimit(file)) { return showMessageAndReturn('C00222.E008') }
            } else return showMessageAndReturn('C00222.E004')
          } else {
            if (['video/mp4', 'video/quicktime', 'video/x-ms-wmv'].includes(file.type)) {
              if (validate.videoUploadSizeLimit(file)) { return showMessageAndReturn('C00222.E008') }
            } else if (file.type === 'image/png') {
              if (validate.imageUploadSizeLimit(file)) { return showMessageAndReturn('C00222.E008') }
            } else return showMessageAndReturn('C00222.E006')
          }
          break
        case 6:
          if (!isCusPage) {
            if (file.type === 'image/png') {
              if (validate.imageUploadSizeLimit(file)) { return showMessageAndReturn('C00222.E008') }
            } else return showMessageAndReturn('C00222.E004')
          } else {
            if (file.type === 'audio/wav') {
              if (validate.audioUploadSizeLimit(file)) { return showMessageAndReturn('C00222.E008') }
            } else return showMessageAndReturn('C00222.E005')
          }
          break
        default:
          if (file.type === 'image/png') {
            if (validate.imageUploadSizeLimit(file)) { return showMessageAndReturn('C00222.E008') }
          } else return showMessageAndReturn('C00222.E004')
      }
    },
    getValueOrDefault (config, dataConfigKey) {
      const configValue = config.value
      return (configValue && Object.keys(configValue).length > 0) ? configValue : { ...DEFAULT_MODEL.CONFIG_DEFAULT_DATA_MODEL[dataConfigKey] }
    },
    setMasterConfiguration (setting) {
      this.setting = setting
      const selfOptionSettingsValue = this.getValueOrDefault(this.setting.configurations.SELF_OPTION_SETTINGS, 'SELF_OPTION_SETTINGS')
      const selfTimerSettingsValue = this.getValueOrDefault(this.setting.configurations.SELF_TIMER_SETTINGS, 'SELF_TIMER_SETTINGS')
      const selfPaymentSettingsValue = this.getValueOrDefault(this.setting.configurations.SELF_PAYMENT_SETTINGS, 'SELF_PAYMENT_SETTINGS')
      const selfMessageSettingsValue = this.getValueOrDefault(this.setting.configurations.SELF_MESSAGE_SETTINGS, 'SELF_MESSAGE_SETTINGS')
      const selfElementFileSettingsValue = this.getValueOrDefault(this.setting.configurations.SELF_ELEMENTFILE_SETTINGS, 'SELF_ELEMENTFILE_SETTINGS')
      const selfCusOptionSettingsValue = this.getValueOrDefault(this.setting.configurations.CUSTOMER_OPTION_SETTINGS, 'CUSTOMER_OPTION_SETTINGS')
      const selfCusFileSettingsValue = this.getValueOrDefault(this.setting.configurations.CUSTOMER_FILE_SETTINGS, 'CUSTOMER_FILE_SETTINGS')
      this.dataConfig.SELF_OPTION_SETTINGS = {
        ringsound: selfOptionSettingsValue.ringsound,
        turiremain: selfOptionSettingsValue.turiremain,
        receiptwaitchange: selfOptionSettingsValue.receiptwaitchange,
        earlycheckout: selfOptionSettingsValue.earlycheckout,
        imageofstandby: selfOptionSettingsValue.imageofstandby
      }
      this.dataConfig.SELF_TIMER_SETTINGS = {
        nooperationtime: selfTimerSettingsValue.nooperationtime,
        waitscreentransition: selfTimerSettingsValue.waitscreentransition,
        topscreentransition: selfTimerSettingsValue.topscreentransition,
        transittoomiokuri: selfTimerSettingsValue.transittoomiokuri,
        stillimageplaytime: selfTimerSettingsValue.stillimageplaytime,
        movieplaynum: selfTimerSettingsValue.movieplaynum
      }
      this.dataConfig.SELF_PAYMENT_SETTINGS = {
        cashpayuse: selfPaymentSettingsValue.cashpayuse,
        cashpaytallnum: selfPaymentSettingsValue.cashpaytallnum,
        creditpayuse: selfPaymentSettingsValue.creditpayuse,
        creditpaytallnum: selfPaymentSettingsValue.creditpaytallnum,
        elemoneypayuse: selfPaymentSettingsValue.elemoneypayuse,
        elemoneypaytallnum: selfPaymentSettingsValue.elemoneypaytallnum,
        codepayuse: selfPaymentSettingsValue.codepayuse,
        codepaytallnum: selfPaymentSettingsValue.codepaytallnum
      }
      this.dataConfig.SELF_MESSAGE_SETTINGS = {
        ondrinkorderguide: selfMessageSettingsValue.ondrinkorderguide,
        conceptroomguid: selfMessageSettingsValue.conceptroomguid,
        seeingoff: selfMessageSettingsValue.seeingoff
      }
      this.dataConfig.SELF_ELEMENTFILE_SETTINGS = {
        ksdtaikiseidougaimagefilename: selfElementFileSettingsValue.ksdtaikiseidougaimagefilename,
        ksdtaikiseishigaimagefilename: selfElementFileSettingsValue.ksdtaikiseishigaimagefilename,
        ksdomiokuriImagefilename: selfElementFileSettingsValue.ksdomiokuriImagefilename,
        ksdallcpiconiImagefilename: selfElementFileSettingsValue.ksdallcpiconiImagefilename,
        ksdallcticoniImagefilename: selfElementFileSettingsValue.ksdallcticoniImagefilename,
        ksdomiokurivoicefilename: selfElementFileSettingsValue.ksdomiokurivoicefilename
      }
      this.dataConfig.CUSTOMER_OPTION_SETTINGS = {
        ksdtaikiseidougastart: selfCusOptionSettingsValue.ksdtaikiseidougastart,
        waitscreentransitionstillpainting: selfCusOptionSettingsValue.waitscreentransitionstillpainting,
        waitscreentransition1: selfCusOptionSettingsValue.waitscreentransition1,
        waitscreentransition2: selfCusOptionSettingsValue.waitscreentransition2,
        waitscreentransition3: selfCusOptionSettingsValue.waitscreentransition3
      }
      this.dataConfig.CUSTOMER_FILE_SETTINGS = {
        ksdtaikiseidougacartoonfilename: selfCusFileSettingsValue.ksdtaikiseidougacartoonfilename,
        ksdtaikiseishigaimagefilename1: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename1,
        ksdtaikiseishigaimagefilename2: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename2,
        ksdtaikiseishigaimagefilename3: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename3,
        ksdtaikiseishigaimagefilename4: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename4,
        ksdtaikiseishigaimagefilename5: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename5,
        ksdtaikiseishigaimagefilename6: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename6,
        ksdtaikiseishigaimagefilename7: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename7,
        ksdtaikiseishigaimagefilename8: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename8,
        ksdtaikiseishigaimagefilename9: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename9,
        ksdtaikiseishigaimagefilename10: selfCusFileSettingsValue.ksdtaikiseishigaimagefilename10
      }
    },
    getSelfPOSMasterSetting () {
      return new Promise((resolve, reject) => {
        axios.put(this.$i18n.t('prop.url') + FETCH_CURRENT_CONFIGURATION, {
          nodeId: this.targetStoreCodes[0],
          excludeFields: false
        }, commonUtils.methods.getApiHeader())
          .then(response => {
            if (response.data.result.code === 0) {
              const optionSettingConfig = response.data.responseModel.configurations.SELF_OPTION_SETTINGS
              const timeSettingConfig = response.data.responseModel.configurations.SELF_TIMER_SETTINGS
              const paymentSettingConfig = response.data.responseModel.configurations.SELF_PAYMENT_SETTINGS
              const messageSettingConfig = response.data.responseModel.configurations.SELF_MESSAGE_SETTINGS
              const imageAudioSettingConfig = response.data.responseModel.configurations.SELF_ELEMENTFILE_SETTINGS
              const customerOptionSettingConfig = response.data.responseModel.configurations.CUSTOMER_OPTION_SETTINGS
              const customerFileSettingConfig = response.data.responseModel.configurations.CUSTOMER_FILE_SETTINGS
              if (optionSettingConfig !== undefined &&
                timeSettingConfig !== undefined &&
                paymentSettingConfig !== undefined &&
                messageSettingConfig !== undefined &&
                imageAudioSettingConfig !== undefined &&
                customerOptionSettingConfig !== undefined &&
                customerFileSettingConfig !== undefined) {
                if (response.data.responseModel != null) {
                  this.setMasterConfiguration(response.data.responseModel)
                  resolve(response.data.responseModel)
                } else {
                  this.targetStoreCodes = []
                  this.errorView()
                  this.openPopupDialog({
                    mode: 3,
                    message: this.$i18n.t('O00004.W010')
                  })
                }
              }
            } else if (response.data.result.code === 2 && this.saveFlag) {
              this.errorView()
              this.targetStoreCodes = []
              this.globalErrorMapping(response.data.result)
            } else if (response.data.result.code !== 2 && this.saveFlag) {
              this.errorView()
              this.targetStoreCodes = []
              this.globalErrorMapping(response.data.result)
            } else reject(response)
          })
          .catch(error => {
            console.error(error)
            this.targetStoreCodes = []
            if (error.data === undefined) {
              this.errorView()
              this.catchErrorPopup()
            } else this.globalErrorMapping(error.data.result)
          })
      })
    },
    getS3FilesBase () {
      return new Promise((resolve, reject) => {
        if (this.dataConfig != null) {
          const targetS3BucketBaseFiles = {
            SELF_ELEMENTFILE_SETTINGS: Object.values(this.dataConfig.SELF_ELEMENTFILE_SETTINGS).reduce((prev, curr) => {
              if (curr !== '') {
                prev.push(curr)
              }
              return prev
            }, []),
            SELF_CUSTOMERFILE_SETTINGS: Object.values(this.dataConfig.CUSTOMER_FILE_SETTINGS).reduce((prev, curr) => {
              if (curr !== '') {
                prev.push(curr)
              }
              return prev
            }, [])
          }
          if (targetS3BucketBaseFiles != null) {
            const companyCode = this.targetStoreCodes[0].substring(0, 15)
            this.getS3BucketFilesBase('koshidaka', companyCode)
              .then(response => {
                if (response.result.code === 0) {
                  // 0:成功
                  if (response.responseModel &&
                    response.responseModel.length > 0 &&
                    targetS3BucketBaseFiles != null) {
                    const initialValue = {}
                    const resultElementFiles = processSettings(targetS3BucketBaseFiles.SELF_ELEMENTFILE_SETTINGS, response, initialValue)
                    const resultCustomerFiles = processSettings(targetS3BucketBaseFiles.SELF_CUSTOMERFILE_SETTINGS, response, initialValue)
                    const result = {
                      ...resultElementFiles,
                      ...resultCustomerFiles
                    }
                    resolve(result)
                  } else {
                    reject(response.result)
                  }
                } else if (response.result.code === 2) {
                  resolve({})
                } else {
                  reject(response.result)
                }
              })
              .catch(error => {
                console.error(error)
                if (error.data === undefined) {
                  this.errorView()
                  this.catchErrorPopup()
                } else {
                  if (error.data.result.code !== 2 && this.saveFlag) {
                    this.targetStoreCodes = []
                    this.errorView()
                    this.globalErrorMapping(error.data.result)
                  } else if (error.data.result.code === 2) {
                    this.s3ErrorView()
                    reject(error)
                    return
                  }
                  this.globalErrorMapping(error.data.result)
                }
              })
          } else {
            resolve({})
          }
        } else {
          resolve({})
        }
      })
    },
    getS3Files () {
      return new Promise((resolve, reject) => {
        if (this.dataConfig != null) {
          const targetS3BucketFiles = {
            SELF_ELEMENTFILE_SETTINGS: Object.values(this.dataConfig.SELF_ELEMENTFILE_SETTINGS).reduce((prev, curr) => {
              if (curr !== '') {
                prev.push(curr)
              }
              return prev
            }, []),
            SELF_CUSTOMERFILE_SETTINGS: Object.values(this.dataConfig.CUSTOMER_FILE_SETTINGS).reduce((prev, curr) => {
              if (curr !== '') {
                prev.push(curr)
              }
              return prev
            }, [])
          }
          if (targetS3BucketFiles != null) {
            const companyCode = this.targetStoreCodes[0].substring(0, 15)
            const storeCode = this.targetStoreCodes[0].substring(15)
            this.getS3BucketFiles('koshidaka', companyCode, storeCode, targetS3BucketFiles)
              .then(response => {
                if (response.result.code === 0) {
                  // 0:成功
                  if (response.responseModel &&
                    response.responseModel.length > 0 &&
                    targetS3BucketFiles != null) {
                    const initialValue = {}
                    const resultElementFiles = processSettings(targetS3BucketFiles.SELF_ELEMENTFILE_SETTINGS, response, initialValue)
                    const resultCustomerFiles = processSettings(targetS3BucketFiles.SELF_CUSTOMERFILE_SETTINGS, response, initialValue)
                    const result = {
                      ...resultElementFiles,
                      ...resultCustomerFiles
                    }
                    resolve(result)
                  } else {
                    reject(response.result)
                  }
                } else if (response.result.code === 2) {
                  resolve({})
                } else {
                  reject(response.result)
                }
              })
              .catch(error => {
                console.error(error)
                if (error.data === undefined) {
                  this.errorView()
                  this.catchErrorPopup()
                } else {
                  if (error.data.result.code !== 2 && this.saveFlag) {
                    this.targetStoreCodes = []
                    this.errorView()
                    this.globalErrorMapping(error.data.result)
                  } else if (error.data.result.code === 2) {
                    this.s3ErrorView()
                    reject(error)
                    return
                  }
                  this.globalErrorMapping(error.data.result)
                }
              })
          } else {
            resolve({})
          }
        } else {
          resolve({})
        }
      })
    },
    saveSelfPOSMasterSetting () {
      return new Promise((resolve, reject) => {
        const optionSettingConfig = convertToInteger(JSON.parse(JSON.stringify(this.dataConfig.SELF_OPTION_SETTINGS)))
        const timeSettingConfig = convertToInteger(this.$refs.timeSettingPanel.timeSettingConfig)
        const paymentSettingConfig = convertToInteger(this.$refs.paymentSettingPanel.paymentSettingConfig)
        const messageSettingConfig = this.$refs.messageSettingPanel.messageSettingConfig
        const imageAudioSettingConfig = formatSettingConfig(this.isCommon, this.isIndividual, this.elementFileModel, this.elementFileModelCommon, this.elementFileModelIndividual)
        const customerOptionSettingConfig = this.$refs.customerOptionSettingPanel.customerOptionSettingConfig
        customerOptionSettingConfig.waitscreentransitionstillpainting = parseFloat(customerOptionSettingConfig.waitscreentransitionstillpainting)
        const customerFileSettingConfig = formatSettingConfig(this.isCusCommon, this.isCusIndividual, this.customerFileModel, this.customerFileModelCommon, this.customerFileModelIndividual)

        this.setting.configurations.SELF_OPTION_SETTINGS.value = optionSettingConfig
        this.setting.configurations.SELF_TIMER_SETTINGS.value = timeSettingConfig
        this.setting.configurations.SELF_PAYMENT_SETTINGS.value = paymentSettingConfig
        this.setting.configurations.SELF_MESSAGE_SETTINGS.value = messageSettingConfig
        this.setting.configurations.SELF_ELEMENTFILE_SETTINGS.value = imageAudioSettingConfig
        this.setting.configurations.CUSTOMER_OPTION_SETTINGS.value = customerOptionSettingConfig
        this.setting.configurations.CUSTOMER_FILE_SETTINGS.value = removeDelFiles(customerFileSettingConfig, this.deleteFiles)
        const nodeId = this.targetStoreCodes[0]
        const params = {
          nodeId: nodeId,
          configuration: this.setting,
          mode: 0
        }
        axios.put(this.$i18n.t('prop.url') + PUT_CURRENT_CONFIGURATION,
          params,
          commonUtils.methods.getApiHeader())
          .then(response => {
            if (response.data.result.code === 0) {
              resolve(response.data)
            } else {
              reject(response)
            }
          })
          .catch(error => {
            console.error(error)
            reject(error)
          })
      })
    },
    uploadS3FilesBase (fileModelCommon, fileModel) {
      this.isDuplicate = false
      return new Promise(async (resolve, reject) => {
        try {
          const companyCode = this.targetStoreCodes[0].substring(0, 15)
          if (this.hasImage) {
            await this.createS3BucketFolderBase('koshidaka', companyCode)
              .then(async (response) => {
                if (response.result.code === 0) {
                  for (const key of Object.keys(fileModelCommon)) {
                    const model = fileModelCommon[key]
                    const modelCompare = fileModel[key]
                    if (model.uploadedFileObj != null && model.uploadedFileDataUri != null && !this.deleteFiles.includes(key)) {
                      const response = await this.captureS3BucketFileBase('koshidaka', companyCode, model.filename, model.uploadedFileObj)
                      if (response.result.code !== 0) {
                        reject(response.result)
                        return
                      } else {
                        if (modelCompare.filename !== null &&
                            modelCompare.filename !== '' &&
                            model.filename.toLowerCase() !== modelCompare.filename.toLowerCase() &&
                            !this.delBtnPrsd) {
                          this.isDuplicate = true
                          await this.deleteS3BucketFileBase('koshidaka', companyCode, modelCompare.filename)
                            .then((response) => {
                              // NO-OP
                            }, async (error) => {
                              await this.globalErrorMapping2(error.data.result)
                            })
                        }
                      }
                    }
                  }
                  resolve()
                }
              }, (error) => {
                console.error(error)
                if (error.data === undefined) {
                  this.errorView()
                  this.catchErrorPopup()
                } else this.globalErrorMapping(error.data.result)
              })
          } else {
            resolve()
          }
        } catch (error) {
          console.error(error)
          if (error.data === undefined) {
            this.errorView()
            this.catchErrorPopup()
            return
          } else this.globalErrorMapping(error)
          reject(error)
        }
      })
    },
    uploadS3Files (fileModelIndividual) {
      this.upIndvCounter = 1
      return new Promise(async (resolve, reject) => {
        try {
          const companyCode = this.targetStoreCodes[0].substring(0, 15)
          const storeCode = this.targetStoreCodes[0].substring(15)
          if (this.hasImage) {
            await this.createS3BucketFolder('koshidaka', companyCode, storeCode)
              .then(async (response) => {
                if (response.result.code === 0) {
                  for (const key of Object.keys(fileModelIndividual)) {
                    const model = fileModelIndividual[key]
                    if (model.uploadedFileObj != null && model.uploadedFileDataUri != null && !this.deleteFiles.includes(key)) {
                      const response = await this.captureS3BucketFile('koshidaka', companyCode, storeCode, model.filename, model.uploadedFileObj)
                      if (response.result.code !== 0) {
                        reject(response.result)
                        return
                      }
                    }
                  }
                  resolve()
                }
              }, (error) => {
                console.error(error)
                if (error.data === undefined) {
                  this.errorView()
                  this.catchErrorPopup()
                } else this.globalErrorMapping(error.data.result)
              })
          } else {
            resolve()
          }
        } catch (error) {
          console.error(error)
          if (error.data === undefined) {
            this.errorView()
            this.catchErrorPopup()
            return
          } else this.globalErrorMapping(error.data.result)
          reject(error)
        }
      })
    },
    deleteS3FilesBase (fileModelCommon) {
      return new Promise(async (resolve, reject) => {
        try {
          const companyCode = this.targetStoreCodes[0].substring(0, 15)
          for (const key of Object.keys(fileModelCommon)) {
            const model = fileModelCommon[key]
            if (model.uploadedFileObj != null && model.uploadedFileDataUri != null) {
              await this.deleteS3BucketFileBase('koshidaka', companyCode, model.filename)
                .then((response) => {
                  // NO-OP
                }, async (error) => {
                  await this.globalErrorMapping2(error.data.result)
                })
            }
          }
          resolve()
        } catch (error) {
          console.error(error)
          this.globalErrorMapping(error)
        }
      })
    },
    deleteS3Files (fileModelIndividual) {
      return new Promise(async (resolve, reject) => {
        try {
          const companyCode = this.targetStoreCodes[0].substring(0, 15)
          const storeCode = this.targetStoreCodes[0].substring(15)
          for (const key of Object.keys(fileModelIndividual)) {
            const model = fileModelIndividual[key]
            if (model.uploadedFileObj != null && model.uploadedFileDataUri != null) {
              await this.deleteS3BucketFile('koshidaka', companyCode, storeCode, model.filename)
                .then((response) => {
                  // NO-OP
                }, async (error) => {
                  await this.globalErrorMapping2(error.data.result)
                })
            }
          }
          resolve()
        } catch (error) {
          console.error(error)
          this.globalErrorMapping(error)
        }
      })
    },
    deleteS3CusFilesBase () {
      return new Promise(async (resolve, reject) => {
        try {
          const companyCode = this.targetStoreCodes[0].substring(0, 15)
          for (const key of Object.keys(this.customerFileModel)) {
            const model = this.customerFileModel[key]
            if (this.deleteFiles[0] === key && this.initialCusFileStatus[0] !== '未設定') {
              await this.deleteS3BucketFileBase('koshidaka', companyCode, model.filename)
                .then((response) => {
                  // NO-OP
                }, async (error) => {
                  await this.globalErrorMapping2(error.data.result)
                })
              this.delBtnPrsd = true
            }
          }
          resolve()
        } catch (error) {
          console.error(error)
          this.globalErrorMapping(error)
        }
      })
    },
    deleteS3CusFiles () {
      let deleteCounter = 0
      return new Promise(async (resolve, reject) => {
        try {
          const companyCode = this.targetStoreCodes[0].substring(0, 15)
          const storeCode = this.targetStoreCodes[0].substring(15)
          for (const key of Object.keys(this.customerFileModel)) {
            const model = this.customerFileModel[key]
            if (this.deleteFiles.includes(key) &&
                key !== 'ksdtaikiseidougacartoonfilename' &&
                this.initialCusFileStatus[deleteCounter] !== '未設定') {
              await this.deleteS3BucketFile('koshidaka', companyCode, storeCode, model.filename)
                .then((response) => {
                  // NO-OP
                }, async (error) => {
                  await this.globalErrorMapping2(error.data.result)
                })
            }
            deleteCounter = deleteCounter + 1
          }
          resolve()
        } catch (error) {
          console.error(error)
          this.globalErrorMapping(error)
        }
      })
    },
    storeClicked () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.proceedStoreClick, false, null)
    },
    proceedStoreClick () {
      this.disabledFixedBtn = true
      this.timeout = setTimeout(() => {
        this.$refs.storeSelect.openDialog()
      }, 50)
    },
    handleStoreSelectChange () {
      if (this.targetStoreCodes[0]) {
        this.initialize()
      }
    },
    async handleDeleteFileCommon (fileId) {
      const keys = Object.keys(this.customerFileModelCommon)
      const targetProp = keys[fileId - 1]
      this.deleteFiles.splice(fileId - 1, 1, targetProp)
      await this.setDisableDelButton(fileId)
    },
    async handleDeleteFileIndividual (fileId) {
      const keys = Object.keys(this.customerFileModelIndividual)
      const targetProp = keys[fileId - 1]
      this.deleteFiles.splice(fileId - 1, 1, targetProp)
      await this.setDisableDelButton(fileId)
    },
    handleElemFileUploadCommon (event, fileId) {
      this.hasImage = true
      const uploadedFile = event.target.files[0]
      if (this.validateFileUpload(uploadedFile, fileId, true)) return
      else this.isCommon = true
      const filename = this.setElemFileName(fileId)
      handleFileUpload(this.$refs, event, fileId, this.elementFileModelCommon, this.elemFileStatus, filename, this.$forceUpdate.bind(this), false)
    },
    handleElemFileUploadIndividual (event, fileId) {
      this.hasImage = true
      const uploadedFile = event.target.files[0]
      if (this.validateFileUpload(uploadedFile, fileId, true)) return
      else this.isIndividual = true
      const filename = this.setElemFileName(fileId)
      handleFileUpload(this.$refs, event, fileId, this.elementFileModelIndividual, this.elemFileStatus, filename, this.$forceUpdate.bind(this), false)
    },
    handleCusFileUploadCommon (event, fileId) {
      this.hasImage = true
      const uploadedFile = event.target.files[0]
      if (this.validateFileUpload(uploadedFile, fileId, false)) return
      else {
        this.isCusCommon = true
        if (this.disableDelBtn[fileId - 1] === true) this.deleteFiles.splice(fileId - 1, 1, null)
      }
      const filename = this.setCusFileName(fileId)
      handleFileUpload(this.$refs, event, fileId, this.customerFileModelCommon, this.cusFileStatus, filename, this.$forceUpdate.bind(this), true)
      this.disableDelBtn[fileId - 1] = false
    },
    handleCusFileUploadIndividual (event, fileId) {
      this.hasImage = true
      const uploadedFile = event.target.files[0]
      if (this.validateFileUpload(uploadedFile, fileId, false)) return
      else {
        this.isCusIndividual = true
        if (this.disableDelBtn[fileId - 1] === true) this.deleteFiles.splice(fileId - 1, 1, null)
      }
      const filename = this.setCusFileName(fileId)
      handleFileUpload(this.$refs, event, fileId, this.customerFileModelIndividual, this.cusFileStatus, filename, this.$forceUpdate.bind(this), true)
      this.disableDelBtn[fileId - 1] = false
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
      let hasValidationError = false
      if (this.$refs.customerOptionSettingPanel.isEmpty()) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.focusErrorCustomerOption, false, null)
        hasValidationError = true
      }
      if (this.$refs.paymentSettingPanel.isValidInput()) {
        this.$refs.pop.open(3, '', this.$i18n.t('C00222.E003'), '', false, this.focusErrorPayment, false, null)
        hasValidationError = true
      }
      if (this.$refs.timeSettingPanel.isEmpty()) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.focusErrorTime, false, null)
        hasValidationError = true
      }
      if (hasValidationError) return
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)

      if (this.deleteFiles[0] !== null) {
        await this.deleteS3CusFilesBase()
      }
      if (this.deleteFiles.slice(1, 11).some(item => item !== null)) {
        await this.deleteS3CusFiles()
      }

      try {
        let upCusCommon = 1
        let upCusIndv = 1
        if (this.isCommon) await this.uploadS3FilesBase(this.elementFileModelCommon, this.elementFileModel)
        if (this.isIndividual) await this.uploadS3Files(this.elementFileModelIndividual)
        for (const key of Object.keys(this.customerFileModelCommon)) {
          if (!this.deleteFiles.includes(key) && this.isCusCommon && upCusCommon === 1) {
            await this.uploadS3FilesBase(this.customerFileModelCommon, this.customerFileModel)
          }
          upCusCommon = upCusCommon + 1
        }
        for (const key of Object.keys(this.customerFileModelIndividual)) {
          if (!this.deleteFiles.includes(key) && this.getCustomerFileStatusIndividual(upCusIndv) === '*設定済' && this.upIndvCounter === 0) {
            await this.uploadS3Files(this.customerFileModelIndividual)
          }
          upCusIndv = upCusIndv + 1
        }
        this.saveSelfPOSMasterSetting()
          .then(async () => {
            let result = false
            this.saveFlag = true
            if (await this.loadMasterData() === false) this.$refs.pop.closeFunction()
            else result = true
            this.loadElemFileStatus()
            this.loadCusFileStatus()
            this.setDelButtonStatus()
            this.refreshPages()
            this.hasImage = false
            if (result) this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          }, async (error) => {
            console.error(error)
            this.globalErrorMapping2(error.data.result, null, () => {
              if ((this.isCusCommon || this.isCommon) && !this.isDuplicate) {
                if (this.isCommon) this.deleteS3FilesBase(this.elementFileModelCommon)
                if (this.isCusCommon) this.deleteS3FilesBase(this.customerFileModelCommon)
              }
              if (this.isCusIndividual || this.isIndividual) {
                if (this.isIndividual) this.deleteS3Files(this.elementFileModelIndividual)
                if (this.isCusIndividual) this.deleteS3Files(this.customerFileModelIndividual)
              }
            })
          })
          .catch((error) => {
            console.error(error)
            if (error.data === undefined) this.catchErrorPopup()
            else this.globalErrorMapping(error.data.result)
          })
      } catch (error) {
        console.error(error)
        this.globalErrorMapping2(error.data.result, null, async () => {
          if ((this.isCusCommon || this.isCommon) && !this.isDuplicate) {
            if (this.isCommon) {
              await this.deleteS3FilesBase(this.elementFileModelCommon)
              return
            }
            if (this.isCusCommon) {
              await this.deleteS3FilesBase(this.customerFileModelCommon)
              return
            }
          }
          if (this.isCusIndividual || this.isIndividual) {
            if (this.isIndividual) {
              await this.deleteS3Files(this.elementFileModelIndividual)
              return
            }
            if (this.isCusIndividual) {
              await this.deleteS3Files(this.customerFileModelIndividual)
            }
          }
        })
      }
    },
    handleMaintButtonOptionItemSetting () {
      this.hideAllPages()
      this.isShowOptionItemSettingPanel = true
      this.focusFirstFocusableElement()
    },
    handleMaintButtonTimeSetting () {
      this.hideAllPages()
      this.isShowTimeSettingPanel = true
      this.focusFirstFocusableElement()
    },
    handleMaintButtonPaymentSetting () {
      this.hideAllPages()
      this.isShowPaymentSettingPanel = true
      this.focusFirstFocusableElement()
    },
    handleMaintButtonMessageSetting () {
      this.hideAllPages()
      this.isShowMessageSettingPanel = true
      this.focusFirstFocusableElement()
    },
    handleMaintButtonImageAudioSetting () {
      this.hideAllPages()
      this.isShowImageAudioSettingPanel = true
      this.focusFirstFocusableElement()
    },
    handleMaintButtonCustomerOptionSetting () {
      this.hideAllPages()
      this.isShowCustomerOptionSettingPanel = true
      this.focusFirstFocusableElement()
    },
    handleMaintButtonCustomerFileSetting () {
      this.hideAllPages()
      this.isShowCustomerFileSettingPanel = true
      this.focusFirstFocusableElement()
    },
    handleMaintButtonIconPositionSetting () {
      this.disabledIconPositionButton = true
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        if (this.s3getFileFlag === false) {
          if (result.errorMessageMap == null || result.errorMessageMap['global'] == null) this.catchErrorPopup()
          else {
            const globalErrorMsg = result.errorMessageMap['global'].toString()
            this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
          }
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
      if (this.isDirty) {
        event.returnValue = ''
      }
    },
    hideAllPages () {
      this.isShowOptionItemSettingPanel = false
      this.isShowTimeSettingPanel = false
      this.isShowPaymentSettingPanel = false
      this.isShowMessageSettingPanel = false
      this.isShowImageAudioSettingPanel = false
      this.isShowCustomerOptionSettingPanel = false
      this.isShowCustomerFileSettingPanel = false
    },
    refreshPages () {
      if (this.isShowImageAudioSettingPanel) {
        this.isShowImageAudioSettingPanel = false
        this.isShowImageAudioSettingPanel = true
      }
      if (this.isShowCustomerFileSettingPanel) {
        this.isShowCustomerFileSettingPanel = false
        this.isShowCustomerFileSettingPanel = true
      }
    },
    errorView () {
      this.hideAllPages()
      this.disabledFixedBtn = true
    },
    s3ErrorView () {
      this.s3getFileFlag = true
      this.handleMaintButtonOptionItemSetting()
      this.isShowPreviewPanel = false
      this.isShowCustomerFilePreviewPanel = false
      this.disabledFixedBtn = false
    },
    async focusErrorTime () {
      await this.$nextTick(() => {
        this.handleMaintButtonTimeSetting()
      })
    },
    async focusErrorPayment () {
      await this.$nextTick(() => {
        this.handleMaintButtonPaymentSetting()
      })
    },
    async focusErrorCustomerOption () {
      await this.$nextTick(() => {
        this.handleMaintButtonCustomerOptionSetting()
      })
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        let focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!this.isShowOptionItemSettingPanel) {
          focusable = this.$el.querySelectorAll('button:not(.rightArrowButton), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        }
        const errorTarget = [...focusable].find(x => !x.disabled && x.classList.contains('error-text-box') && x.closest('div.pageHeader').style.display !== 'none')
        const target = [...focusable].find(x => !x.disabled && x.checkVisibility())
        errorTarget ? errorTarget.focus() : target.focus()
      })
    }
  },
  created () {
    this.$root.winId = 'C00222'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  mounted () {
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    const authority = this.$refs.storeSelect.headquartersAuthorityCheckEnable
    if (this.config != null) {
      this.dataConfig = this.config.dataConfig
    }
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 200)
    this.focusFirstFocusableElement()
  }
}
// KSD V001.000 AE
