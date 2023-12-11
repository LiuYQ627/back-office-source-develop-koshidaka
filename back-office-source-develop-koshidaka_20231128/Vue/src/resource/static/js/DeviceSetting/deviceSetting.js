import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/DeviceSetting/DeviceEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'

/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221230  litie(Neusoft)        G001.00.0  issue課題#1014を対応します.
 * 20230615  wangchunmei(Neusoft)  G002.00.0  issue課題#1639を対応します.
 */

const queryPath = 'DeviceSetting/TerminalQuery'
const searchPath = 'DeviceSetting/TerminalSearch'
// const tabletPath = 'DeviceSetting/TabletSearch'

export default {
  name: 'deviceSetting',
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
      initialized: false
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
      if (this.initialized) return
      this.initialized = true
      //      if (await this.getTablet() === false) return
      // G001.00.0 Update-Start
      if (this.targetStoreCd) { // G001.00.0 Update-End
        if (await this.getTerminal() === false) return
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
      let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },
    async getTerminal () {
      var result = false
      this.findDataList = []
      this.dispDataList = []
      this.resultCount = 0
      try {
        const params = { storeCd: this.targetStoreCd }
        let response = await axios.get(this.$i18n.t('prop.url') + queryPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
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
        console.log(error)
      }
      return result
    },
    filtering () {
      if (this.lastSearchData === '') {
        this.dispDataList = this.findDataList
      } else {
        var tempStr = ''
        var tempLen = this.lastSearchData.length
        this.dispDataList = []
        for (var i = 0; i < this.findDataList.length; i++) {
          if (document.getElementById('searchName').checked) {
            // tempStr = this.findDataList[i].name
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
      // if (this.$refs.clientIdText.value.length != 4) {
      //   // 14文字以外は反応させない
      //   return;
      // }
      const params = { storeCd: this.targetStoreCd, clientId: this.$refs.clientIdText.value }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            this.$refs.editDialog.open(this.targetStoreCd, this.$refs.clientIdText.value, response.data.responseModel, null, this.refresh, this.editDlgClose)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            // 2:該当する端末管理情報なし
            this.$refs.editDialog.open(this.targetStoreCd, this.$refs.clientIdText.value, null, null, this.refresh, this.editDlgClose)
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
      var terminalData = this.dispDataList[index]
      var params = { storeCd: this.targetStoreCd, clientId: terminalData.endpointId }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            this.$refs.editDialog.open(this.targetStoreCd, terminalData.endpointId, response.data.responseModel, null, this.refresh, this.editDlgClose)
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
      if (await this.getTerminal() === true) {
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
      // G002.00.0 Add-Start
      if (this.headquartersAuthority !== 1) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W019'), '', false, null, false, null)
        return
      }
      // G002.00.0 Add-End
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
      this.getTerminal()
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      this.operationLockStore = true
      if (this.masters.storeMasters !== null) {
        //        var index = this.masters.storeMasters.findIndex((element) => element.storeCd === storeCd)
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          //          this.targetStoreText = this.masters.storeMasters[index].name
          this.targetStoreText = this.masters.storeMasters[index].displayName.default
          this.operationLockStore = false
        }
      }
    },
    closeTab () {
      //      window.close()
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['clientId'].toString().split(',').join('')
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
    }
  },
  created () {
    this.$root.winId = 'F00013'
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
    // STEP0では企業コードで利用
    // vue.$root.$on('getBelongStoreCd', (belongStoreCd) => {
    // G001.00.0 Update-Start
    // vue.$root.$on('getBusinessUnitCdStr', (belongStoreCd) => {
    //   // 対象店舗コード = headerで保持している所属店舗コード
    //   vue.targetStoreCd = belongStoreCd
    // })
    // vue.$root.$on('getHeadquartersAuthority', (headquartersAuthority) => {
    //   // 本部権限 = headerで保持している本部権限
    //   vue.headquartersAuthority = headquartersAuthority
    //   this.initialize()
    // })
    // await this.$nextTick()
    // setTimeout(() => {
    //   if (this.headquartersAuthority === 1) {
    //     document.getElementById('storeSelectBtn').focus()
    //   } else {
    //     this.$refs.clientIdText.focus()
    //   }
    // }, 200)
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
      if (headquartersAuthority != 1) {
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
          document.getElementById('storeSelectBtn').focus()
        } else {
          this.$refs.clientIdText.focus()
        }
      }, 200)
    })
    // G001.00.0 Update-End
  },
  watch: {
    searchData: function (val) {
      // コード入力の場合、半角数値以外を除去
      if (document.getElementById('searchCode').checked) {
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
        this.getTerminal()
      } else {
        if (this.findDataList === null || this.findDataList.length === 0) return
        this.filtering()
      }
    }
  }
}
