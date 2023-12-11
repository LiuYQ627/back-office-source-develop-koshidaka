// KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import FileInput from '@/resource/templates/CommonInput/FileInput'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import CrossIcon from '@/resource/templates/CommonDesign/CrossIcon'
import popup from '@/resource/templates/CommonDesign/Popup'
import ComplianceInformationSettingPreview from '@/resource/templates/ComplianceInformationSetting/ComplianceInformationSettingPreview'
import ComplianceInformationSettingTimeSetting from '@/resource/templates/ComplianceInformationSetting/ComplianceInformationSettingTimeSetting'
import s3bucketUtils from '../Common/s3bucketUtils'
import validationUtils from '../Common/validationUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'

const COMPLIANCE_PATH_GET = 'RestaurantsCompliance/Get'
const COMPLIANCE_PATH_UPDATE = 'RestaurantsCompliance/Update'

const DEFAULT_TIME_RANGE_MODEL = {
  start: '0000',
  end: '0000'
}

const DEFAULT_DATA_MODEL = {
  languageDisplay: null,
  guardianTime: JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL)),
  under18Time: JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL)),
  under16Time: JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL))
}

const DEFAULT_LANGUAGE_DISPLAY_ITEM_MODEL = {
  filename: null,
  authenticatedUrl: null,
  uploadedFileObj: null,
  uploadedFileDataUri: null
}

const DEFAULT_LANGUAGE_DISPLAY_MODEL = {
  provisionsImageFile01: JSON.parse(JSON.stringify(DEFAULT_LANGUAGE_DISPLAY_ITEM_MODEL)),
  provisionsImageFile02: JSON.parse(JSON.stringify(DEFAULT_LANGUAGE_DISPLAY_ITEM_MODEL)),
  provisionsImageFile03: JSON.parse(JSON.stringify(DEFAULT_LANGUAGE_DISPLAY_ITEM_MODEL)),
  provisionsImageFile04: JSON.parse(JSON.stringify(DEFAULT_LANGUAGE_DISPLAY_ITEM_MODEL)),
  provisionsImageFile05: JSON.parse(JSON.stringify(DEFAULT_LANGUAGE_DISPLAY_ITEM_MODEL)),
  provisionsImageFile06: JSON.parse(JSON.stringify(DEFAULT_LANGUAGE_DISPLAY_ITEM_MODEL))
}

export default {
  name: 'ComplianceInformationSetting',
  mixins: [s3bucketUtils, validationUtils, errorMappingUtils],
  props: {
    context: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL)),
      languageDisplayModel: JSON.parse(JSON.stringify(DEFAULT_LANGUAGE_DISPLAY_MODEL)),
      s3BucketFileMap: {},
      targetStoreCodes: [],
      fileStatus: [],
      languageSelectOptions: null,
      selectedLanguage: null,
      selectedLanguageName: null,
      isShowImageSettingPanel: false,
      isShowPreviewPanel: false,
      disabledFixedBtn: true,
      s3getFileFlag: false,
      hasImage: false
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
    ComplianceInformationSettingPreview,
    ComplianceInformationSettingTimeSetting
  },
  computed: {
    isDirty () {
      let dirty = false
      if (this.selectedLanguage != null && this.selectedLanguage > 0) {
        const targetModel = this.dataModel.languageDisplay.find(x => x.language === Number(this.selectedLanguage))
        if (targetModel != null) {
          dirty = dirty || (targetModel.languageName !== this.selectedLanguageName)
        }
        for (const key of Object.keys(this.languageDisplayModel)) {
          const model = this.languageDisplayModel[key]
          dirty = dirty || (model.uploadedFileObj != null && model.uploadedFileDataUri != null)
        }
      }
      const model = this.$refs.timeSettingPanel.timeSettingDataModel
      const timeSettingFormModel = {
        guardianTime: model.guardianTime,
        under18Time: model.under18Time,
        under16Time: model.under16Time
      }
      const timeSettingDataModel = {
        guardianTime: this.dataModel.guardianTime,
        under18Time: this.dataModel.under18Time,
        under16Time: this.dataModel.under16Time
      }
      dirty = dirty || (JSON.stringify(timeSettingFormModel) !== JSON.stringify(timeSettingDataModel))
      return dirty
    }
  },
  methods: {
    async initialize () {
      this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
      this.languageDisplayModel = JSON.parse(JSON.stringify(DEFAULT_LANGUAGE_DISPLAY_MODEL))
      this.s3BucketFileMap = {}
      this.languageSelectOptions = null
      this.selectedLanguage = null
      this.selectedLanguageName = null
      this.isShowImageSettingPanel = false
      this.isShowPreviewPanel = false
      this.disabledFixedBtn = true
      this.s3getFileFlag = false
      this.fileStatus = Array(6).fill(false)
      this.hasImage = false
      const result = await this.loadMasterData()
      if (result === true) {
        this.initializeImageSettingPanel()
        this.isShowImageSettingPanel = true
        this.disabledFixedBtn = false
        if (this.$refs.storeSelect.headquartersAuthority === 0) {
          this.focusFirstFocusableElement()
        }
      }
    },
    async loadMasterData () {
      this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
      this.s3BucketFileMap = {}
      try {
        this.dataModel = await this.getComplianceInfoMaster()
        if (!this.dataModel) throw new Error()
        this.initializeImageSettingPanel()
        if (!this.dataModel) throw new Error()
        this.s3BucketFileMap = await this.getProvisionsImageS3Files()
        if (!this.s3BucketFileMap) throw new Error()
        return true
      } catch (error) {
        this.targetStoreCodes = []
        this.globalErrorMapping(error)
        return false
      }
    },
    loadFileStatus (value) {
      const array = new Array(6).fill('')
      const fileKey = this.dataModel.languageDisplay[value - 1]
      for (const key in fileKey) {
        if (key.startsWith('provisionsImageFile0')) {
          const digit = key.slice('provisionsImageFile0'.length)
          array[digit - 1] = fileKey[key]
        }
      }
      array.forEach((file, index) => {
        if (file == null || file === '') {
          this.fileStatus[index] = false
        } else {
          const s3keys = Object.keys(this.s3BucketFileMap)
          const fileFind = s3keys.find((s3file) => s3file === file)
          this.fileStatus[index] = fileFind === undefined || (this.s3BucketFileMap[fileFind] === null && fileFind !== '')
        }
      })
    },
    initializeImageSettingPanel () {
      if (this.dataModel != null &&
        this.dataModel.languageDisplay != null &&
        this.dataModel.languageDisplay.length > 0) {
        this.languageSelectOptions = this.dataModel.languageDisplay.slice(0, 6).map(x => {
          return {
            name: `${this.$i18n.t('C00210.S031')}${x.language}`,
            value: x.language,
            language: x.language,
            languageName: x.languageName
          }
        })
      }
    },
    loadSelectedLanguageDataModel () {
      this.isShowPreviewPanel = false
      this.languageDisplayModel = {}
      this.selectedLanguageName = null
      const targetLanguageDataModel = this.dataModel.languageDisplay.find(x => x.language === Number(this.selectedLanguage))
      if (targetLanguageDataModel != null) {
        let hasImageAuthenticatedUrl = false
        for (const key of Object.keys(targetLanguageDataModel)) {
          if (key.startsWith('provisionsImageFile')) {
            const filename = targetLanguageDataModel[key]
            let authenticatedUrl = null
            if (filename != null &&
              filename.length !== 0 &&
              this.s3BucketFileMap != null &&
              filename in this.s3BucketFileMap) {
              authenticatedUrl = this.s3BucketFileMap[filename]
              hasImageAuthenticatedUrl = hasImageAuthenticatedUrl || true
            }
            this.languageDisplayModel[key] = {
              filename: filename,
              authenticatedUrl: authenticatedUrl,
              uploadedFileObj: null,
              uploadedFileDataUri: null
            }
          }
        }
        this.isShowPreviewPanel = hasImageAuthenticatedUrl
        this.selectedLanguageName = targetLanguageDataModel.languageName
      }
    },
    errorView () {
      this.isShowImageSettingPanel = false
      this.isShowPreviewPanel = false
      this.disabledFixedBtn = true
    },
    s3ErrorView () {
      this.s3getFileFlag = true
      this.isShowImageSettingPanel = true
      this.isShowPreviewPanel = false
      this.disabledFixedBtn = false
    },
    getProvisionsImageFileStatus (imageId) {
      const targetProp = `provisionsImageFile` + ('0' + Number(imageId)).slice(-2)
      if (this.languageDisplayModel != null &&
        this.languageDisplayModel[targetProp] != null) {
        const model = this.languageDisplayModel[targetProp]
        if (this.selectedLanguage == null) {
          return ''
        } else if (model.uploadedFileObj != null && model.uploadedFileDataUri != null) {
          return this.$i18n.t('C00210.S014')
        } else if (model.authenticatedUrl != null) {
          return this.$i18n.t('C00210.S013')
        } else if (model.filename == null && this.fileStatus[imageId - 1] === true) {
          return this.$i18n.t('C00210.S015')
        } else {
          return this.$i18n.t('C00210.S012')
        }
      }
      return null
    },
    getComplianceInfoMaster () {
      return new Promise((resolve, reject) => {
        const nodeId = this.targetStoreCodes[0]
        const storeCode = Number(nodeId.substring(15))
        const params = { nodeId, storeCode }
        axios
          .post(this.$i18n.t('prop.url') + COMPLIANCE_PATH_GET,
            params,
            commonUtils.methods.getApiHeader({})
          )
          .then(response => {
            switch (response.data.result.code) {
              case 0: // 0:正常
                if (response.data.responseModel != null) {
                  if (Array.isArray(response.data.responseModel)) {
                    if (response.data.responseModel.length > 0) {
                      if (response.data.responseModel[0].languageDisplay != null &&
                        response.data.responseModel[0].languageDisplay.length > 0) {
                        resolve(response.data.responseModel[0])
                      } else {
                        this.targetStoreCodes = []
                        this.globalErrorMapping(response.data.result)
                        this.errorView()
                      }
                    } else {
                      this.targetStoreCodes = []
                      this.globalErrorMapping(response.data.result)
                      this.errorView()
                    }
                  } else {
                    resolve(response.data.responseModel)
                  }
                } else {
                  this.targetStoreCodes = []
                  this.globalErrorMapping(response.data.result)
                  this.errorView()
                }
                break
              case 2: // 2:該当する情報なし
                this.targetStoreCodes = []
                this.globalErrorMapping(response.data.result)
                this.errorView()
                break
              case -90: // -90：セッション不正
                this.targetStoreCodes = []
                this.globalErrorMapping(response.data.result)
                break
              default: // その他
                this.targetStoreCodes = []
                const { code, message } = this.mapErrorMessage(response)
                this.openPopupDialog({ mode: 3, messageCode: message, code: code })
                this.errorView()
                break
            }
          }, (error) => {
            this.targetStoreCodes = []
            console.error(error)
            this.errorView()
            this.globalErrorMapping(error)
          })
          .catch(error => {
            this.targetStoreCodes = []
            console.error(error)
            this.errorView()
            this.globalErrorMapping(error)
          })
      })
    },
    getProvisionsImageS3Files () {
      return new Promise((resolve, reject) => {
        if (this.dataModel != null &&
          this.dataModel.languageDisplay != null &&
          this.dataModel.languageDisplay.length > 0) {
          const targetS3BucketFiles = this.dataModel.languageDisplay.reduce((prev, curr) => {
            if (curr != null) {
              for (const key of Object.keys(curr)) {
                if ((key.startsWith('provisionsImageFile') &&
                  curr[key] != null &&
                  curr[key].endsWith('.png')) ||
                  curr[key] === '') {
                  prev.push(curr[key])
                }
              }
            }
            return prev
          }, [])
          if (targetS3BucketFiles != null &&
            targetS3BucketFiles.length > 0) {
            const companyCode = this.targetStoreCodes[0].substring(0, 15)
            const storeCode = this.targetStoreCodes[0].substring(15)
            this.getS3BucketFiles('koshidaka', companyCode, storeCode, targetS3BucketFiles)
              .then(response => {
                if (response.result.code === 0) {
                  let result = {}
                  // 0:成功
                  if (response.responseModel &&
                    response.responseModel.length > 0 &&
                    targetS3BucketFiles != null &&
                    targetS3BucketFiles.length > 0) {
                    const initialValue = {}
                    result = targetS3BucketFiles.reduce((obj, fileName) => {
                      const foundItem = response.responseModel.find(fileItem => {
                        return fileItem.fileName === fileName
                      })
                      return {
                        ...obj,
                        [fileName]: foundItem != null ? foundItem.signedUrl : null
                      }
                    }, initialValue)
                    resolve(result)
                  } else {
                    reject(response.result)
                  }
                } else if (response.result.code === 2) {
                  resolve({})
                } else {
                  reject(response.result)
                }
              }, (error) => {
                console.error(error)
                if (error.response && error.response.status === 404) {
                  this.errorView()
                  this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
                  return
                }
                if (error && error.data && error.data.result && error.data.result.code === 2) {
                  this.s3ErrorView()
                  reject(error)
                  return
                }
                this.targetStoreCodes = []
                this.errorView()
                this.globalErrorMapping(error)
              })
              .catch(error => {
                console.error(error)
                if (error.response && error.response.status === 404) {
                  this.errorView()
                  this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
                  return
                }
                if (error.data.result.code === 2) {
                  this.s3ErrorView()
                  reject(error)
                  return
                }
                this.targetStoreCodes = []
                this.errorView()
                this.globalErrorMapping(error)
              })
          } else {
            resolve({})
          }
        } else {
          resolve({})
        }
      })
    },
    async saveComplianceInfoMaster () {
      return new Promise((resolve, reject) => {
        const payload = JSON.parse(JSON.stringify(this.dataModel))
        payload.nodeId = this.targetStoreCodes[0]
        payload.storeCode = Number(payload.nodeId.substring(15))
        if (this.selectedLanguage != null && this.selectedLanguage > 0) {
          const targetModel = payload.languageDisplay.find(x => x.language === Number(this.selectedLanguage))
          if (targetModel != null) {
            for (const key of Object.keys(targetModel)) {
              if (key in this.languageDisplayModel) {
                targetModel[key] = this.languageDisplayModel[key].filename
              }
            }
            targetModel.languageName = this.selectedLanguageName
          }
        }

        // KSD V001.000 AS 更新パラメータに余計なフィールドが含まれていてエラーになる対応
        delete payload.createTimestamp
        delete payload.lastModifiedTimestamp
        delete payload.lastModifiedUserId
        delete payload._id
        // KSD V001.000 AE 更新パラメータに余計なフィールドが含まれていてエラーになる対応

        axios
          .post(this.$i18n.t('prop.url') + COMPLIANCE_PATH_UPDATE,
            payload,
            commonUtils.methods.getApiHeader())
          .then(async (response) => {
            switch (response.data.result.code) {
              case 0: // 0:正常
                resolve(response.data)
                break
              case 2: // 2:該当する情報なし
                reject(response)
                break
              case -90: // -90：セッション不正
                reject(response)
                break
              default: // その他
                const { code, message } = this.mapErrorMessage(response)
                await this.openPopupDialog({ mode: 3, messageCode: message, code: code })
                reject(response)
                break
            }
          }, (error) => {
            console.error(error)
            this.errorView()
            reject(error)
          })
          .catch((error) => {
            console.error(error)
            this.errorView()
            reject(error)
          })
      })
    },
    uploadProvisionsImageS3Files () {
      return new Promise(async (resolve, reject) => {
        try {
          const companyCode = this.targetStoreCodes[0].substring(0, 15)
          const storeCode = this.targetStoreCodes[0].substring(15)
          if (this.hasImage) {
            await this.createS3BucketFolder('koshidaka', companyCode, storeCode)
              .then(async (response) => {
                if (response.result.code === 0) {
                  for (const key of Object.keys(this.languageDisplayModel)) {
                    const model = this.languageDisplayModel[key]
                    if (model.uploadedFileObj != null && model.uploadedFileDataUri != null) {
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
                if (error.response && error.response.status === 404) {
                  this.errorView()
                  this.globalErrorMapping(error)
                  return
                }
                this.globalErrorMapping(error)
              })
          } else {
            resolve()
          }
        } catch (error) {
          console.error(error)
          if (error.response && error.response.status === 404) {
            this.errorView()
            this.globalErrorMapping(error)
            return
          }
          reject(error)
        }
      })
    },
    deleteProvisionsImageS3Files () {
      return new Promise(async (resolve, reject) => {
        try {
          const companyCode = this.targetStoreCodes[0].substring(0, 15)
          const storeCode = this.targetStoreCodes[0].substring(15)
          for (const key of Object.keys(this.languageDisplayModel)) {
            const model = this.languageDisplayModel[key]
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
    handleStoreSelectChange () {
      if (this.targetStoreCodes[0]) {
        this.initialize()
      }
    },
    async handleLanguageSelectionInput (value) {
      this.loadFileStatus(value)
      const oldValue = this.selectedLanguage
      if (oldValue !== null && this.isDirty) {
        this.selectedLanguage = value
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => {
          this.selectedLanguage = value
          this.loadSelectedLanguageDataModel()
        }, false, () => {
          this.selectedLanguage = oldValue
        })
      } else {
        this.selectedLanguage = null
        this.selectedLanguage = value
        this.loadSelectedLanguageDataModel()
      }
    },
    handleImageUpload (event, imageId) {
      this.hasImage = true
      const uploadedFile = event.target.files[0]
      const validate = validationUtils.methods
      if (validate.fileUploadType(uploadedFile)) {
        this.$refs.pop.open(3, '', this.$i18n.t('C00210.E007'), -99, false, null, false, null)
        return
      }
      if (validate.fileUploadSizeLimit(uploadedFile)) {
        this.$refs.pop.open(3, '', this.$i18n.t('C00210.E008'), -99, false, null, false, null)
        return
      }
      const y = this.selectedLanguage
      const z = ('0' + Number(imageId)).slice(-2)
      const uploadedFilename = `${y}_${z}_ksd_compliance.png`
      const uploadedFileObj = new File([uploadedFile], uploadedFilename, { type: uploadedFile.type })
      const reader = new FileReader()
      reader.onload = () => {
        const targetProp = `provisionsImageFile` + ('0' + Number(imageId)).slice(-2)
        const targetImageFileModel = this.languageDisplayModel[targetProp]
        targetImageFileModel.filename = uploadedFilename
        targetImageFileModel.uploadedFileObj = uploadedFileObj
        targetImageFileModel.uploadedFileDataUri = reader.result
        this.$refs.previewPanel.$forceUpdate()
        this.$forceUpdate()
      }
      reader.readAsDataURL(uploadedFileObj)
      this.fileStatus[imageId - 1] = false
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
      if (this.$refs.timeSettingPanel.validateTimeSettingDataModel()) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.focusError, false, null)
        return
      }
      if (this.dataModel.guardianTime == null) this.dataModel.guardianTime = JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL))
      if (this.dataModel.under18Time == null) this.dataModel.under18Time = JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL))
      if (this.dataModel.under16Time == null) this.dataModel.under16Time = JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL))

      const timeSettingDataModel = this.$refs.timeSettingPanel.timeSettingDataModel
      this.dataModel.guardianTime.start = timeSettingDataModel.guardianTime.start
      this.dataModel.guardianTime.end = timeSettingDataModel.guardianTime.end
      this.dataModel.under18Time.start = timeSettingDataModel.under18Time.start
      this.dataModel.under18Time.end = timeSettingDataModel.under18Time.end
      this.dataModel.under16Time.start = timeSettingDataModel.under16Time.start
      this.dataModel.under16Time.end = timeSettingDataModel.under16Time.end
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      this.uploadProvisionsImageS3Files()
        .then(async () => {
          await this.saveComplianceInfoMaster()
            .then(async () => {
              let result = false
              if (await this.loadMasterData() === false) {
                this.$refs.pop.closeFunction()
              } else {
                result = true
              }
              this.initializeImageSettingPanel()
              this.loadSelectedLanguageDataModel()
              if (this.selectedLanguage) {
                this.loadFileStatus(this.selectedLanguage)
              }
              this.hasImage = false
              if (result) {
                this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
              }
            }, (error) => {
              this.globalErrorMapping2(error.data.result, null, () => {
                this.deleteProvisionsImageS3Files()
              })
            })
        })
        .catch((error) => {
          this.globalErrorMapping(error)
        })
    },
    handleMaintButtonImageSetting () {
      this.isShowImageSettingPanel = true
      this.focusFirstFocusableElement()
    },
    handleMaintButtonTimeSetting () {
      this.isShowImageSettingPanel = false
      this.focusFirstFocusableElement()
    },
    globalErrorMapping (result) {
      let globalErrorMsg = this.$i18n.t('O00004.W010')
      if (result.response && result.response.status === 404) {
        this.$refs.pop.open(3, '', globalErrorMsg, '', false, null, false, null)
        return
      }
      if (result.code != null) {
        if (result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else if (result.code !== 0) {
          if (result.errorMessageMap == null || result.errorMessageMap['global'] == null) {
            this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
            return
          }
          globalErrorMsg = result.errorMessageMap['global'].toString()
          this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        }
      } else if (result && result.data && result.data.result && result.data.result.code != null) {
        if (result.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.data.result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else if (result.data.result.code !== 0) {
          if (this.s3getFileFlag === false) {
            if (result.data.result.errorMessageMap == null || result.data.result.errorMessageMap['global'] == null) {
              this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
              return
            }
            globalErrorMsg = result.data.result.errorMessageMap['global'].toString()
            this.$refs.pop.open(3, '', globalErrorMsg, result.data.result.code, false, null, false, null)
          }
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        }
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
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
    mapErrorMessage (response) {
      const errorMsgMap = response.data.result.errorMessageMap
      if (errorMsgMap === null || errorMsgMap['global'] === null) {
        return { code: '', message: this.$i18n.t('O00004.W010') }
      } else {
        return { code: response.data.result.code, message: errorMsgMap['global'].toString() }
      }
    },
    confirmUnload (event) {
      if (this.isDirty) {
        event.returnValue = ''
      }
    },
    async focusError () {
      await this.$nextTick(() => {
        this.$refs.timeSettingPanel.focusItem.$el.focus()
        if (this.$refs.timeSettingPanel.isFocusItemDup()) {
          this.$refs.timeSettingPanel.focusItemDup.$el.focus()
        }
      })
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    }
  },
  created () {
    this.$root.winId = 'C00210'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  mounted () {
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    if (this.context != null) {
      this.dataModel = this.context.dataModel
      this.languageDisplayModel = this.context.languageDisplayModel
      this.s3BucketFileMap = this.context.s3BucketFileMap
      this.targetStoreCodes = this.context.targetStoreCodes
      this.languageSelectOptions = this.context.languageSelectOptions
      this.selectedLanguage = this.context.selectedLanguage
      this.initializeImageSettingPanel()
    }
    let authority = this.$refs.storeSelect.headquartersAuthorityCheckEnable
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 200)
  }
}
// KSD V001.000 AE
