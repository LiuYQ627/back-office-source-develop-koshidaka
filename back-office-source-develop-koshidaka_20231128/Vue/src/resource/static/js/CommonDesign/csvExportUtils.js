// KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import csvTimeUtils from '@/resource/static/js/Common/csvTimeUtils'
const exportCSVAPI = 'CsvConversionTasks/Export'
const csvTaskGetAPI = 'CsvConversionTasks/Get'

const csvExportUtils = {
  mixins: [csvTimeUtils],
  data() {
    return {
      globalStartTime: null,
      globalTimeout: 0,
      fileHandle: null,
      exportData: {
        response: null,
        data: null
      },
      refresh: Function,
      closeFunc: Function,
      refs: null,
      i18n: null,
      permissionsRolesCalcNum: 0
    };
  },
  methods: {
    recordDuration (start) {
      if (!start) return Date.now()
      return Date.now() - start
    },
    async exportCSV (params = {}, refs, i18n, refresh, permissionsRolesCalcNum, closeFunc) {
      this.closeFunc = closeFunc
      this.permissionsRolesCalcNum = permissionsRolesCalcNum
      this.globalTimeout = this.csvCalc(this.permissionsRolesCalcNum)
      this.refs = refs
      this.i18n = i18n
      this.refresh = refresh
      try {
        this.refs.pop.open(4, '', this.i18n.t('O00004.W009'), '', false, null, false, null)
        const response = await axios.post(
          this.i18n.t('prop.url') + exportCSVAPI,
          params,
          commonUtils.methods.getApiHeader()
        )
        if (response.data.result.code === 0) {
          const { id } = response.data.responseModel
          this.globalTimeout = this.csvCalc(this.permissionsRolesCalcNum)
          this.eventTimeout({ id })
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        if (!error.message.match(/aborted/)) {
          this.refs.pop.open(3, '', this.i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        }
      }
    },
    async eventTimeout ({ id }) {
      const vue = this
      const requestPromise = new Promise( async(resolve, reject) => {
        try {
          this.globalStartTime = this.recordDuration()
          const response = await axios.post(
            `${this.i18n.t('prop.url')}${csvTaskGetAPI}`,
            {
              taskId: id
            },
            commonUtils.methods.getApiHeader()
          )
          if (response.data.result.code === 0 || response.data.result.code === -2 || response.data.result.code === 3 || response.data.result.code === -3) {
            const { status } = response.data.responseModel
            const data = response.data.responseModel
            if (status === 'EXECUTING') {
              const timeoutDuration = 1000
              const result = this.recordDuration(this.globalStartTime)
              this.globalTimeout -= result + timeoutDuration
              if (this.globalTimeout > 0) {
                this.timeout = setTimeout(() => {
                  vue.eventTimeout({ id })
                }, timeoutDuration)
              } else {
                this.refs.pop.open(3, '',  this.i18n.t('F32242.E028'), '', false, null, false, null)
              }
            } else if (status === 'COMPLETE') {
              clearTimeout(this.timeout)
              resolve({ data, fileHandle: this.fileHandle })
            } else if (status === 'ERROR') {
              this.refs.pop.open(3, '',  this.i18n.t('F32242.E028'), -2, false, null, false, null)
            } else if (status === 'COMPLETE_WITH_ERROR') {
              this.refs.pop.open(3, '',  this.i18n.t('F32242.E028'), -3, false, null, false, null)
            } else  {
              this.refs.pop.open(3, '',  this.i18n.t('F32242.E028'), response.data.result.code, false, null, false, null)
            }
          } else if (response.data.result.code === -10) {
            this.refs.pop.open(3, '',  this.i18n.t('F32242.E027'), response.data.result.code, false, null, false, null)
          } else if (response.data.result.code === -90) {
            this.refs.pop.open(2, '', this.i18n.t('O00004.W008'), response.data.result.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
          } else  {
            this.refs.pop.open(3, '',  this.i18n.t('F32242.E028'), response.data.result.code, false, null, false, null)
          }
        } catch (error) {
          this.refs.pop.closeFunction()
          reject(error)
        }
      })
      requestPromise.then(({ data }) => {
        this.getFile({ data })
      }, (reject) => {
        console.error({ reject })
      })
    },
    getFile ({ data }) {
      const { preSignedUrl } = data
      try {
        axios.get(preSignedUrl, { responseType: 'blob' })
          .then(response => {
            this.refs.pop.closeFunction()
            this.saveFileToStorageVariable({ response, data })
          })
          .catch(error => {
            this.refs.pop.open(3, '',  this.i18n.t('F32242.E029'), '', false, null, false, null)
          });
      } catch (e) {
        this.refs.pop.open(3, '',  this.i18n.t('F32242.E029'), '', false, null, false, null)
      }
    },
    async saveFileToStorageVariable ({ response, data }) {
      this.exportData = {
        response,
        data
      }
      this.refs.pop.open(1, '', this.i18n.t('F32242.W006'), '', true, this.confirmExportFile, false, this.cancelExportFile)
    },
    cancelExportFile () {
      this.exportData = {
        response: null,
        data: null
      }
    },
    async confirmExportFile () {
      let result = false
        try {
          const opts = {
            suggestedName: this.exportData.data.fileName
          }
          this.fileHandle = await window.showSaveFilePicker(opts)
          const userLen = this.fileHandle.name.split('.').length
          const systemNameLen = this.exportData.data.fileName.split('.').length
          const fileHandleName = this.fileHandle.name.split('.')
          const systemName = this.exportData.data.fileName.split('.')

          if (systemName[systemNameLen - 1] !== fileHandleName[userLen - 1]) {
            this.fileHandle.remove()
            this.refs.pop.open(3, '', this.i18n.t('F32242.E030').replace('○○', `.${systemName[systemNameLen - 1]}`), '', false, null, false, null)
            this.cancelExportFile()
            return
          }
          const writable = await this.fileHandle.createWritable();
          await writable.write(this.exportData.response.data);
          await writable.close();
        } catch (e) {
          result = true
          if (!e.message.match(/aborted/)) {
            this.refs.pop.open(3, '', 'ファイルのエクスポートに失敗しました。ファイルが保存できる状態か確認してください。', e.code, false, null, false, null)
          }
        }
        if (!result) {
          this.refs.pop.open(2, '', this.i18n.t('F32242.S017'), '', false, () => {
            this.closeFunc()
          }, false, null)
        }
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.refs.pop.open(2, '', this.i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
  }
}

export default csvExportUtils
// KSD V001.000 AE