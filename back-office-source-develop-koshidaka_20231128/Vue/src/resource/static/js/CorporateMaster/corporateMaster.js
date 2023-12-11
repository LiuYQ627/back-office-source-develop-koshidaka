import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/CorporateMaster/CorporateEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'

const searchPath = 'CorporateMaster/ConfigurationSearch'
const searchAllPath = 'CorporateMaster/ConfigurationsAllSearch'
const parentPath = 'CorporateMaster/ContractServiceParentSearch'

export default {
  name: 'CorporateMst',
  data () {
    return {
      dispCorporateDataList: [],
      findCorporateDataList: [],
      parentDataList: [],
      resultCount: 0,
      businessUnitCdData: '',
      searchData: '',
      lastSearchData: '',
      editDlgOpen: false,
      operationLock: true,
      // セッションから取得したログインユーザの企業コード
      sessionBusinessUnitCd: '',
      masters: {}
    }
  },
  components: {
    maintButton,
    editDialog,
    popup,
    dialogStoreSelect
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
      // 契約サービス親マスタ取得
      // if (await this.getParent() === false) return
      // 企業マスタ取得
      if (await this.getCorporate() === false) return
      // 店舗選択画面用マスタ情報
      // if (await this.getMasters() === false) {
      //  this.findCorporateDataList = []
      //  this.dispCorporateDataList = []
      //  this.resultCount = 0
      //  return
      // }
      this.operationLock = false
    },
    async getMasters () {
      let getMasters = this.$refs.dialogStoreSelect.getMasters(true)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },

    async getParent () {
      var result = false
      this.parentDataList = { contractServiceParents: [] }
      try {
        let response = await axios.get(this.$i18n.t('prop.url') + parentPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          this.parentDataList = response.data
          result = true
        } else if (response.data.result.code === 2) {
          // 2:契約サービス親マスタ未登録エラー
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },

    async getCorporate () {
      var result = false
      this.findCorporateDataList = []
      this.dispCorporateDataList = []
      const params = { allFlg: 1 }
      this.resultCount = 0
      try {
        // 企業マスタ取得
        let response = await axios.get(this.$i18n.t('prop.url') + searchAllPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.findCorporateDataList = response.data.responseModel
          this.filtering()
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する店舗なし
          this.filtering()
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    filtering () {
      if (this.lastSearchData === '') {
        this.dispCorporateDataList = this.findCorporateDataList
      } else {
        var tempStr = ''
        var tempLen = this.lastSearchData.length
        this.dispCorporateDataList = []
        for (var i = 0; i < this.findCorporateDataList.length; i++) {
          if (document.getElementById('searchName').checked) {
            if (this.findCorporateDataList[i].displayName != null && this.findCorporateDataList[i].displayName.default != null) {
              tempStr = this.findCorporateDataList[i].displayName.default
            }
          } else {
            tempStr = this.findCorporateDataList[i].name + ''
          }
          if (tempStr == null) {
            tempStr = ''
          }
          // 前方一致
          if (tempStr.substr(0, tempLen) === this.lastSearchData) {
            this.dispCorporateDataList.push(this.findCorporateDataList[i])
          }
        }
      }
      this.resultCount = this.dispCorporateDataList === null ? 0 : this.dispCorporateDataList.length
    },
    businessUnitCdInput () {
      this.businessUnitCdData = this.businessUnitCdData.replace(/[^0-9]/gi, '')
    },
    directInput () {
      const params = { businessUnitCd: this.$refs.businessUnitCdText.value }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
      // KSD V001.000 DS
      // .then(response => {
      // KSD V001.000 DE
      // KSD V001.000 AS
        .then(async response => {
      // KSD V001.000 AE
          if (response.data.result.code === 0) {
            // 0:正常
            this.$refs.editDialog.open(this.$refs.businessUnitCdText.value, response.data.responseModel, this.parentDataList, this.masters, this.refresh, this.editDlgClose, this.sessionBusinessUnitCd)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            // 2:該当する企業なし
            // KSD V001.000 AS
            await this.$refs.editDialog.getCloudPosConfig()
            // KSD V001.000 AE
            this.$refs.editDialog.open(this.$refs.businessUnitCdText.value, null, this.parentDataList, this.masters, this.refresh, this.editDlgClose, this.sessionBusinessUnitCd)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
    },
    enterCode () {
      document.getElementById('searchCode').checked = true
      this.onRadioChange()
    },
    enterName () {
      document.getElementById('searchName').checked = true
      this.onRadioChange()
    },
    onRadioChange () {
      this.searchData = ''
    },
    selectedListDate (index) {
      var corporateData = this.dispCorporateDataList[index]
      var params = { businessUnitCd: corporateData.name }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            this.$refs.editDialog.open(corporateData.name, response.data.responseModel, this.parentDataList, this.masters, this.refresh, this.editDlgClose, this.sessionBusinessUnitCd)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            this.globalErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
    },
    async refresh () {
      if (await this.getCorporate() === true) {
        return true
      } else {
        return false
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.businessUnitCdData = ''
    },
    closeTab () {
      //      window.close()
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['businessUnitCd'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    confirmUnload (event) {
      // マスタ新規・編集ダイアログ表示中なら変更確認ダイアログを表示する
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    },
    /**
     * セッションよりヘッダーを経由して企業コードを取得する
     */
    getSessionBusinessUnitCd () {
      let vue = this
      this.$root.$on('getBusinessUnitCdStr', (businessUnitCdStr) => {
        // セッション用企業コード = headerで保持している企業コード
        vue.sessionBusinessUnitCd = businessUnitCdStr
      })
    }
  },
  created () {
    this.$root.winId = 'F00004'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.getSessionBusinessUnitCd()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    this.searchData = ''
    await this.initialize()
    await this.$nextTick()
    this.$refs.businessUnitCdText.focus()
  },
  watch: {
    searchData: function (val) {
      // コード入力の場合、半角数字以外を除去
      if (document.getElementById('searchCode').checked) {
        var inputText = val.replace(/[^0-9]/gi, '')
        this.searchData = inputText
        if (inputText === this.lastSearchData) return
        this.lastSearchData = inputText
      } else {
        this.lastSearchData = val
      }
      if (this.lastSearchData === '') {
        this.findCorporateDataList = []
        this.dispCorporateDataList = []
        this.getCorporate()
      } else {
        if (this.findCorporateDataList === null || this.findCorporateDataList.length === 0) return
        this.filtering()
      }
    }
  }
}
