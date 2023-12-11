// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import popup from '@/resource/templates/CommonDesign/Popup'
import s3bucketBaseUtils from '@/resource/static/js/Common/s3bucketBaseUtils'
import s3bucketUtils from '@/resource/static/js/Common/s3bucketUtils'
import { loadFileModels, loadFileSelection } from './selfPOSUtils'

const FETCH_CURRENT_CONFIGURATION = 'Reservation/FetchConfigurationRecursive'

const CONFIG_DEFAULT_DATA_MODEL = require('./_defaultConfig.json')

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

export default {
  name: 'SelfPOSMasterSettingImageAudioPreview',
  mixins: [s3bucketUtils, s3bucketBaseUtils],
  props: {
    dataModelCommon: {
      type: Object,
      default: null
    },
    dataModelIndividual: {
      type: Object,
      default: null
    },
    selectOptions: {
      type: Array,
      default: null
    },
    headquartersAuthority: {
      type: Number,
      default: null
    },
    targetStoreCodes: {
      type: Array,
      default: null
    },
    filePlay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataConfig: JSON.parse(JSON.stringify(CONFIG_DEFAULT_DATA_MODEL.FILE_DEFAULT_DATA_MODEL)),
      elementFileModel: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL)),
      elementFileModelCommon: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL)),
      elementFileModelIndividual: JSON.parse(JSON.stringify(DEFAULT_ELEMENT_FILE_MODEL)),
      s3BucketBaseFileMap: {},
      s3BucketFileMap: {},
      s3MasterFileMap: {},
      fileStatus: [],
      settingItemFileNameOptions: [],
      fileExists: {},
      settingItemFileName: null,
      isPulldown: false,
      pulldownError: false
    }
  },
  components: {
    FormGroupLayout,
    SelectInput,
    popup
  },
  methods: {
    async pulldownSelect () {
      this.s3BucketBaseFileMap = {}
      this.s3BucketFileMap = {}
      try {
        await this.getSelfPOSMasterSetting()
        if (this.headquartersAuthority === 1) this.s3BucketBaseFileMap = await this.getS3FilesBase()
        if (!this.s3BucketBaseFileMap) throw new Error()
        this.s3BucketFileMap = await this.getS3Files()
        if (!this.s3BucketFileMap) throw new Error()
        if (this.headquartersAuthority === 1) await this.loads3MasterFile()
        await this.loadFileDataModel()
        this.isPulldown = true
        this.pulldownError = false
      } catch (error) {
        if (error.data === undefined) this.catchErrorPopup()
        else this.globalErrorMapping(error.data.result)
        this.pulldownError = true
      }
    },
    resolveFileSourceCommon (id) {
      if (this.elementFileModelCommon && id in this.elementFileModelCommon) {
        const metadata = this.elementFileModelCommon[id]
        if (metadata.authenticatedUrl != null) {
          return metadata.authenticatedUrl
        } else {
          return null
        }
      }
      return null
    },
    resolveFileSourceIndividual (id) {
      if (this.elementFileModelIndividual && id in this.elementFileModelIndividual) {
        const metadata = this.elementFileModelIndividual[id]
        if (metadata.authenticatedUrl != null) {
          return metadata.authenticatedUrl
        } else {
          return null
        }
      }
      return null
    },
    isImage (id) {
      return this.elementFileModelCommon[id].filename.toLowerCase().endsWith('.png')
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
    loadFileDataModel () {
      this.elementFileModel = {}
      this.elementFileModelCommon = {}
      this.elementFileModelIndividual = {}
      const pulldownOptions = CONFIG_DEFAULT_DATA_MODEL.FILENAME.INDIVIDUAL
      const targetElementFileModel = this.dataConfig.SELF_ELEMENTFILE_SETTINGS

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
        this.settingItemFileNameOptions = loadFileSelection(this.elementFileModel)
        if (this.headquartersAuthority !== 1) this.settingItemFileNameOptions = this.settingItemFileNameOptions.filter((item) => Object.values(pulldownOptions).includes(item.name))
      }
    },
    getSelfPOSMasterSetting () {
      return new Promise((resolve, reject) => {
        axios.put(this.$i18n.t('prop.url') + FETCH_CURRENT_CONFIGURATION, {
          nodeId: this.targetStoreCodes[0],
          excludeFields: false
        }, commonUtils.methods.getApiHeader())
          .then(response => {
            const setting = response.data.responseModel
            if (response.data.result.code === 0) {
              if (response.data.responseModel != null) {
                this.dataConfig.SELF_ELEMENTFILE_SETTINGS = setting.configurations.SELF_ELEMENTFILE_SETTINGS.value
                resolve(response.data.responseModel)
              }
            } else reject(response)
          })
          .catch(error => {
            console.error(error)
            if (error.data === undefined) this.catchErrorPopup()
            else this.globalErrorMapping(error.data.result)
            this.pulldownError = true
          })
      })
    },
    getS3FilesBase () {
      return new Promise((resolve, reject) => {
        if (this.dataConfig != null) {
          const targetS3BucketBaseFiles = Object.values(this.dataConfig.SELF_ELEMENTFILE_SETTINGS).reduce((prev, curr) => {
            if (curr !== '') {
              prev.push(curr)
            }
            return prev
          }, [])
          if (targetS3BucketBaseFiles != null) {
            const companyCode = this.targetStoreCodes[0].substring(0, 15)

// KSD V001.000 20230822 DS
//          this.getS3BucketFilesBase('koshidaka', companyCode, 'getS3BucketFilesBase')
// KSD V001.000 20230822 DE
// KSD V001.000 20230822 AS
            this.getS3BucketFilesBase('koshidaka', companyCode, 'callbo')
// KSD V001.000 20230822 AE

              .then(response => {
                if (response.result.code === 0) {
                  // 0:成功
                  if (response.responseModel &&
                    response.responseModel.length > 0) {
                    const initialValue = {}
                    const result = targetS3BucketBaseFiles.reduce((obj, fileName) => {
                      const foundItem = response.responseModel.find(fileItem => {
                        return fileItem.fileName === fileName
                      })
                      this.fileExists = {
                        ...this.fileExists,
                        [fileName]: foundItem != null ? foundItem.exists : null
                      }
                      return {
                        ...obj,
                        [fileName]: foundItem != null ? foundItem.signedUrl : null
                      }
                    }, initialValue)
                    resolve(result)
                  } else {
                    reject(response.result)
                  }
                } else {
                  reject(response.result)
                }
              })
              .catch(error => {
                console.error(error)
                this.isPulldown = true
                this.settingItemFileNameOptions = []
                if (error.data === undefined) this.catchErrorPopup()
                else this.globalErrorMapping(error.data.result)
                this.pulldownError = true
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
          const targetS3BucketFiles = Object.values(this.dataConfig.SELF_ELEMENTFILE_SETTINGS).reduce((prev, curr) => {
            if (curr !== '') {
              prev.push(curr)
            }
            return prev
          }, [])
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
                    const result = targetS3BucketFiles.reduce((obj, fileName) => {
                      const foundItem = response.responseModel.find(fileItem => {
                        return fileItem.fileName === fileName
                      })
                      this.fileExists = {
                        ...this.fileExists,
                        [fileName]: foundItem != null ? foundItem.exists : null
                      }
                      return {
                        ...obj,
                        [fileName]: foundItem != null ? foundItem.signedUrl : null
                      }
                    }, initialValue)
                    resolve(result)
                  } else {
                    reject(response.result)
                  }
                } else {
                  reject(response.result)
                }
              })
              .catch(error => {
                console.error(error)
                this.isPulldown = true
                this.settingItemFileNameOptions = []
                if (error.data === undefined) this.catchErrorPopup()
                else this.globalErrorMapping(error.data.result)
                this.pulldownError = true
              })
          } else {
            resolve({})
          }
        } else {
          resolve({})
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
    }
  },
  watch: {
    dataModelCommon: {
      handler (value) {
        this.settingItemFileName = null
        this.$forceUpdate()
      },
      immediate: true,
      deep: true
    },
    dataModelIndividual: {
      handler (value) {
        this.settingItemFileName = null
        this.$forceUpdate()
      },
      immediate: true,
      deep: true
    }
  }
}
// KSD V001.000 AE
