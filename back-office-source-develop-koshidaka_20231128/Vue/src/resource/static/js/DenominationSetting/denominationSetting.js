// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import MaintButton from '@/resource/templates/CommonDesign/MaintButton'
import EditDialog from '@/resource/templates/DenominationSetting/DenominationEditDialog'
import Popup from '@/resource/templates/CommonDesign/Popup'
import DialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import CopyDialog from '@/resource/templates/DenominationSetting/DenominationCopyDialog'

const queryPath = 'DeviceSetting/TerminalQuery'
const searchPath = 'DeviceSetting/TerminalSearch'

export default {
  name: 'DenominationSetting',
  data () {
    return {
      dispDataList: [],
      findDataList: [],
      resultCount: 0,
      headquartersAuthority: 0,
      targetStoreCd: 0,
      targetStoreText: '',
      clientIdData: '',
      searchData: '',
      lastSearchData: '',
      editDlgOpen: false,
      operationLock: true,
      operationLockStore: true,
      masters: {},
      initialized: false,
      isEnableCopyButton: false
    }
  },
  components: {
    MaintButton,
    EditDialog,
    Popup,
    DialogStoreSelect,
    CopyDialog
  },
  computed: {
    enableCopyButton: function () {
      return !this.isEnableCopyButton
    }
  },
  methods: {
    async initialize () {
      if (this.initialized) return
      this.initialized = true
      if (this.targetStoreCd) {
        if (await this.getDenomination() === false) return
      }
      if (this.headquartersAuthority === 1) {
        if (await this.getMasters() === false) {
          this.findDataList = []
          this.dispDataList = []
          this.resultCount = 0
          return
        }
        await this.setStore(this.targetStoreCd)
      }
      this.operationLock = false
    },
    async getMasters () {
      const getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },
    async getDenomination () {
      var result = false
      this.findDataList = []
      this.dispDataList = []
      this.resultCount = 0
      try {
        const params = { storeCd: this.targetStoreCd }
        const response = await axios.get(this.$i18n.t('prop.url') + queryPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.findDataList = response.data.responseModel
          this.filtering()
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する端末管理情報なし
          this.filtering()
          result = true
        } else {
          this.targetStoreCd = 0
          this.targetStoreText = ''
          this.operationLockStore = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.targetStoreCd = 0
        this.targetStoreText = ''
        this.operationLockStore = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    filtering () {
      if (this.lastSearchData === '') {
        this.dispDataList = this.findDataList
      } else {
        let tempStr = ''
        const tempLen = this.lastSearchData.length
        this.dispDataList = []
        for (var i = 0; i < this.findDataList.length; i++) {
          if (this.$refs.searchName.checked) {
            tempStr = this.findDataList[i].deviceName
          } else {
            tempStr = this.findDataList[i].endpointId + ''
          }
          if (tempStr == null) {
            tempStr = ''
          }
          // 前方一致
          if (tempStr.substr(0, tempLen) === this.lastSearchData) {
            this.dispDataList.push(this.findDataList[i])
          }
        }
      }
      this.resultCount = this.dispDataList === null ? 0 : this.dispDataList.length
    },
    clientIdInput () {
      this.clientIdData = this.clientIdData.replace(/[^0-9]/gi, '')
    },
    directInput () {
      const params = {
        storeCd: this.targetStoreCd,
        clientId: this.$refs.clientIdText.value
      }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 端末設定検索成功(応答コード：0"端末設定の情報取得成功(正常)")の場合
            this.$refs.editDialog.open(this.targetStoreCd, this.$refs.clientIdText.value, response.data.responseModel, this.refresh, this.editDlgClose)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            // 端末設定検索成功(応答コード：2"該当する端末管理情報なし")の場合
            this.$refs.pop.open(3, '', this.$i18n.t('F322b6.E001'), 2, false, null, false, null)
          } else {
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.error(error)
        })
    },
    copyButton () {
      this.$refs.copyDialog.open(this.targetStoreCd, this.findDataList, this.refresh, this.editDlgClose)
      setTimeout(() => {
        this.$refs.copyDialog.openEnd()
      }, 50)
    },
    enterCode () {
      this.$refs.searchCode.checked = true
      this.onRadioChange()
    },
    enterName () {
      this.$refs.searchName.checked = true
      this.onRadioChange()
    },
    onRadioChange () {
      this.searchData = ''
    },
    selectedListDate (index) {
      const denominationData = this.dispDataList[index]
      const params = {
        storeCd: this.targetStoreCd,
        clientId: denominationData.endpointId
      }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            this.$refs.editDialog.open(this.targetStoreCd, denominationData.endpointId, response.data.responseModel, this.refresh, this.editDlgClose)
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
      if (await this.getDenomination() === true) {
        return true
      } else {
        return false
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.clientIdData = ''
    },
    async storeSelect () {
      const selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
      this.getDenomination()
      this.isEnableCopyButton = true
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      this.operationLockStore = true
      if (this.masters.storeMasters !== null) {
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.targetStoreText = this.masters.storeMasters[index].displayName.default
          this.operationLockStore = false
        }
      }
    },
    closeTab () {
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        const errorMessage = result.errorMessageMap['clientId'].toString().split(',').join('')
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
        const globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    confirmUnload (event) {
      // マスタ新規・編集ダイアログ表示中なら変更確認ダイアログを表示する
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    }
  },
  created () {
    this.$root.winId = 'F322b6'
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    this.searchData = ''
    let vue = this
    let belongStoreCdStr = ''
    vue.$root.$once('getBelongStoreCd', (belongStoreCd) => {
      // headerで保持している所属店舗コード
      belongStoreCdStr = belongStoreCd
    })
    let belongStoreNameStr = ''
    vue.$root.$once('getBelongStoreName', (belongStoreName) => {
      // 対象店舗名 = headerで保持している所属店舗名
      belongStoreNameStr = belongStoreName
    })
    let targetStoreCd = ''
    vue.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      // 対象店舗コード = headerで保持している所属企業コード + headerで保持している所属店舗コード
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.headquartersAuthority = headquartersAuthority
      if (headquartersAuthority !== 1) {
        if (targetStoreCd) {
          vue.targetStoreText = belongStoreNameStr
          vue.targetStoreCd = targetStoreCd
          vue.operationLockStore = false
        }
      }
      await this.initialize()
      await this.$nextTick()
      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementById('store-select-button').focus()
        } else {
          this.$refs.clientIdText.focus()
          this.isEnableCopyButton = true
        }
      }, 200)
    })
  },
  watch: {
    searchData: function (val) {
      // コード入力の場合、半角数値以外を除去
      if (this.$refs.searchCode.checked) {
        var inputText = val.replace(/[^0-9]/gi, '')
        this.searchData = inputText
        if (inputText === this.lastSearchData) return
        this.lastSearchData = inputText
      } else {
        this.lastSearchData = val
      }
      if (this.lastSearchData === '') {
        this.findDataList = []
        this.dispDataList = []
        this.getDenomination()
      } else {
        if (this.findDataList === null || this.findDataList.length === 0) return
        this.filtering()
      }
    }
  }
}
// KSD V001.000 AE
