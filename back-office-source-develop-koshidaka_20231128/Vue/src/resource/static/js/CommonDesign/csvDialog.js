// KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import csvErrorDialog from '@/resource/templates/CommonDesign/CsvErrorDialog'
import csvTimeUtils from '@/resource/static/js/Common/csvTimeUtils'
const importFile = 'CsvConversionTasks/Import'
const csvTaskGetAPI = 'CsvConversionTasks/Get'

export default {
  props: {
    dialogType: {
      type: String,
      required: true
    },
    hasclassificationNumber: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  mixins: [csvTimeUtils],
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      registerAuth: true,
      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      dispFileName: '選択されていません',
      globalTimeout: 0,
      businessUnitCdStr: 0,
      toUploadfile: null,
      productClassificationNumberModel: 1,
      classificationNumberList: [...Array(8)],
      targetStoreCd: 0,
      terminalTypeErrorMsg: '',
      workers: [],
      permissionsRolesCalcNum: 0
    }
  },
  components: {
    popup
    ,csvErrorDialog
  },
  methods: {
    open (refreshFunc, closeFunc, businessUnitCdStr, targetStoreCd, permissionsRolesCalcNum) {
      this.permissionsRolesCalcNum = permissionsRolesCalcNum
      this.globalTimeout = this.csvCalc(this.permissionsRolesCalcNum)
      this.productClassificationNumberModel = 1
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.workers = []
      if (this.$refs.fileSelect) {
        this.$refs.fileSelect.value = ''
      }
      this.dispFileName = '選択されていません'
      this.businessUnitCdStr = businessUnitCdStr
      this.targetStoreCd = targetStoreCd
    },
    isOpen () {
      return this.dialog === true
    },
    openEnd () {
      this.initErrorMessage()
    },
    btnclick () {
      this.$refs.fileSelect.click()
    },
    loadCsvFile (e) {
      this.workers = []
      this.registerAuth = true
      this.dispFileName = '選択されていません'
      let file = e.target.files[0]
      this.toUploadfile = e.target.files[0]
      let linesArr = []
      if (!file) {
        return
      }
      if (!file.type.match('text/csv') && !file.type.match('application/zip') && !file.type.match('application/zip-compressed') && !file.type.match('application/x-zip-compressed')) {
        this.workers = linesArr
        linesArr.push(this.$i18n.t('F32242.W005'))
        this.$set(this.workers, linesArr)
        return
      }
      const maxSizeBytes = 10 * 1024 * 1024
      if (this.toUploadfile.size > maxSizeBytes) {
        this.workers = linesArr
        linesArr.push(this.$i18n.t('F32242.E031'))
        this.$set(this.workers, linesArr)
        return
      }
      if (file.type.match('application/zip') || file.type.match('application/zip-compressed') || file.type.match('application/x-zip-compressed') || file.type.match('text/csv')) {
        this.registerAuth = false
        this.dispFileName = file.name
      }
    },
    onClickReturn () {
      this.popupConfirm()
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    onClickSave () {
      this.$refs.pop.open(1, '', this.$i18n.t('F32242.W002'), '', true, this.importCSV, false, null)
    },
    async importCSV () {
      const formData = new FormData();
      formData.append('file', this.toUploadfile);
      formData.append('companyCode', this.businessUnitCdStr);
      formData.append('fileName', this.dispFileName);

      if (this.dialogType === 'accessAuthorityRegistration') {
        formData.append('targetCollection', 'PERMISSIONS_ROLES');
      }

      if (this.dialogType === 'productGroupMaster') {
        formData.append('targetCollection', 'CATALOGS_GROUPS');
        formData.append('productClassificationNumber', this.productClassificationNumberModel);
        formData.append('storeCode', this.targetStoreCd.slice(15));
      }

      try {
        this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
        const response = await axios.post(
          this.$i18n.t('prop.url') + importFile,
          formData,
          commonUtils.methods.getApiHeader()
        )
        if (response.data.result.code === 0) {
          const { id } = response.data.responseModel
          this.globalTimeout = this.csvCalc(this.permissionsRolesCalcNum)
          await this.eventTimeout({ id })
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
    },
    recordDuration (start) {
      if (!start) return Date.now()
      return Date.now() - start
    },
    async eventTimeout ({ id }) {
      const vue = this
      const requestPromise = new Promise( async(resolve, reject) => {
        try {
          this.globalStartTime = this.recordDuration()
          const response = await axios.post(
            `${this.$i18n.t('prop.url')}${csvTaskGetAPI}`,
            {
              taskId: id
            },
            commonUtils.methods.getApiHeader()
          )
          if (response.data.result.code === 0 || response.data.result.code === -2 || response.data.result.code === 3 || response.data.result.code === -3) {
            const { status } = response.data.responseModel
            const data = response.data.responseModel
            const { errors } = data
            const opts = {
              suggestedName: data.fileName
            }

            if (status === 'EXECUTING') {
              const timeoutDuration = 1000
              const result = this.recordDuration(this.globalStartTime)
              this.globalTimeout -= result + timeoutDuration
              if (this.globalTimeout > 0) {
                this.timeout = setTimeout(() => {
                  vue.eventTimeout({ id })
                }, timeoutDuration)
              } else {
                this.$refs.pop.open(3, '',  this.$i18n.t('F32242.E026'), '', false, () => {
                  this.popupConfirm()
                }, false, null)
              }
            } else if (status === 'COMPLETE') {
              clearTimeout(this.timeout)
              resolve({ data })
            } else if (status === 'ERROR') {
              this.$refs.pop.closeFunction()
              this.$refs.csvErrorDialog.open(() => {
                this.popupConfirm()
              }, -3, errors)
            } else if (status === 'COMPLETE_WITH_ERROR') {
              this.$refs.pop.closeFunction()
              this.$refs.csvErrorDialog.open(() => {
                this.popupConfirm()
              }, -2, errors)
            } else  {
              this.$refs.pop.open(3, '',  this.$i18n.t('F32242.E026'), response.data.result.code, false, () => {
                this.popupConfirm()
              }, false, null)
            }
          } else if (response.data.result.code === -10) {
            this.$refs.pop.open(3, '',  this.$i18n.t('F32242.E023'), response.data.result.code, false, () => {
              this.popupConfirm()
            }, false, null)
          } else if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
          } else  {
            this.$refs.pop.open(3, '',  this.$i18n.t('F32242.E026'), response.data.result.code, false, () => {
              this.popupConfirm()
            }, false, null)
          }
        } catch (error) {
          reject(error)
        }
      })
      requestPromise.then(({ data }) => {
        this.successMessage()
      }, (reject) => {
        console.error({ reject })
      })
    },
    async successMessage () {
      if (this.dialogType === 'productGroupMaster') {
        if (await this.refreshFunc() === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => {
            this.popupConfirm()
          }, false, null)
        } else {
          this.$refs.pop.closeFunction()
        }
      }
      if (this.dialogType === 'accessAuthorityRegistration') {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => {
          this.popupConfirm()
        }, false, null)
      }
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, () => {
          this.popupConfirm()
        }, false, null)
      }
    },
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    initErrorMessage () {
      this.nameErrorMsg = ''
    }
  }
}
// KSD V001.000 AE
