import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/StoreMaster/StoreEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
const searchPath = 'StoreMaster/StoreSearch'
const searchAllPath = 'StoreMaster/StoreAllSearch'
const oprFormPath = 'StoreMaster/OperationalForm'
// KSD V001.000 DS
// const storeGroupPath = 'Reservation/FetchConfigurationRecursive'
// KSD V001.000 DE

export default {
  name: 'StoreMst',
  data () {
    return {
      dispStoreDataList: [],
      findStoreDataList: [],
      operationalDataList: [],
      // KSD V001.000 DS
      // group1DataList: [],
      // group2DataList: [],
      // KSD V001.000 DE
      resultCount: 0,
      storeCdData: '',
      searchData: '',
      lastSearchData: '',
      editDlgOpen: false,
      operationLock: true
    }
  },
  components: {
    maintButton,
    editDialog,
    popup
  },
  methods: {
    async initialize () {
      // if (await this.getOperationalForm() === false) return
      // if (await this.getStoreGroup() === false) return
      if (await this.getStore() === false) return
      this.operationLock = false
    },
    async getOperationalForm () {
      var result = false
      try {
        let response = await axios.get(this.$i18n.t('prop.url') + oprFormPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          this.operationalDataList = response.data
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E001'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    // KSD V001.000 DS
    // async getStoreGroup () {
    //   var result = false
    //   try {
    //     let response = await axios.get(this.$i18n.t('prop.url') + storeGroupPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
    //     if (response.data.result.code === 0 || response.data.result.code === 2) {
    //       // 0:正常
    //       this.group1DataList = { storeGroupInfos: [] }
    //       this.group2DataList = { storeGroupInfos: [] }
    //       // 業態・地区それぞれのリストの先頭に「0:設定なし」を追加
    //       this.group1DataList.storeGroupInfos.push({
    //         'storeGroupNo': 1,
    //         'storeGroupValue': 0,
    //         'storeGroupValueStr': '000',
    //         'storeGroupName': this.$i18n.t('F00003.S031')
    //       })
    //       this.group2DataList.storeGroupInfos.push({
    //         'storeGroupNo': 2,
    //         'storeGroupValue': 0,
    //         'storeGroupValueStr': '000',
    //         'storeGroupName': this.$i18n.t('F00003.S031')
    //       })
    //       if (response.data.storeGroupInfos === null) {
    //         // 店舗グループマスタが0件(null)の場合は処理を終了
    //         result = true
    //         return result
    //       }
    //       for (var i = 0; i < response.data.storeGroupInfos.length; i++) {
    //         if (response.data.storeGroupInfos[i].storeGroupNo === 1) {
    //           this.group1DataList.storeGroupInfos.push(response.data.storeGroupInfos[i])
    //         } else if (response.data.storeGroupInfos[i].storeGroupNo === 2) {
    //           this.group2DataList.storeGroupInfos.push(response.data.storeGroupInfos[i])
    //         }
    //       }
    //       result = true
    //     } else {
    //       this.globalErrorMapping(response.data.result)
    //     }
    //   } catch (error) {
    //     this.$refs.pop.open(3, '', this.$i18n.t('F00001.E003'), '', false, null, false, null)
    //     console.log(error)
    //   }
    //   return result
    // },
    // KSD V001.000 DE
    async getStore () {
      var result = false
      this.findStoreDataList = { storeInfos: [] }
      this.dispStoreDataList = { storeInfos: [] }
      this.resultCount = 0
      try {
        let response = await axios.get(this.$i18n.t('prop.url') + searchAllPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          this.findStoreDataList = response.data
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
        this.$refs.pop.open(3, '', this.$i18n.t('F00003.E005'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    filtering () {
      if (this.lastSearchData === '') {
        this.dispStoreDataList = this.findStoreDataList
      } else {
        var tempStr = ''
        var tempLen = this.lastSearchData.length
        this.dispStoreDataList = { storeInfos: [] }
        for (var i = 0; i < this.findStoreDataList.storeInfos.length; i++) {
          if (document.getElementById('searchName').checked) {
            tempStr = this.findStoreDataList.storeInfos[i].name
          } else {
            tempStr = this.findStoreDataList.storeInfos[i].storeCd + ''
          }
          if (tempStr == null) {
            tempStr = ''
          }
          // 前方一致
          if (tempStr.substr(0, tempLen) === this.lastSearchData) {
            this.dispStoreDataList.storeInfos.push(this.findStoreDataList.storeInfos[i])
          }
        }
      }
      this.resultCount = this.dispStoreDataList.storeInfos === null ? 0 : this.dispStoreDataList.storeInfos.length
    },
    storeCdInput () {
      this.storeCdData = this.storeCdData.replace(/[^0-9]/gi, '')
    },
    directInput () {
      const params = { storeCd: this.$refs.storeCdText.value }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            // KSD V001.000 MS
            // this.$refs.editDialog.open(this.$refs.storeCdText.value, response.data.storeInfos[0], this.operationalDataList, this.group1DataList, this.group2DataList, this.refresh, this.editDlgClose)
            const configData = response.data.storeInfos[0]
            this.$refs.editDialog.open(this.$refs.storeCdText.value, configData, this.operationalDataList, this.refresh, this.editDlgClose, false)
            // KSD V001.000 ME
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            // 2:該当する店舗なし
             // KSD V001.000 MS
            //  this.$refs.editDialog.open(this.$refs.storeCdText.value, null, this.operationalDataList, this.group1DataList, this.group2DataList, this.refresh, this.editDlgClose)
            this.$refs.editDialog.open(this.$refs.storeCdText.value, null, this.operationalDataList, this.refresh, this.editDlgClose, true)
             // KSD V001.000 ME
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('F00003.E005'), '', false, null, false, null)
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
      var storeData = this.dispStoreDataList.storeInfos[index]
      var params = { storeCd: storeData.storeCd }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            // KSD V001.000 MS
            // this.$refs.editDialog.open(storeData.storeCd, response.data.storeInfos[0], this.operationalDataList, this.group1DataList, this.group2DataList, this.refresh, this.editDlgClose)
            const configData = response.data.storeInfos[0]
            this.$refs.editDialog.open(storeData.storeCd, configData, this.operationalDataList, this.refresh, this.editDlgClose, false)
            // KSD V001.000 ME
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            // 2:該当するユーザなし
            this.$refs.pop.open(3, '', this.$i18n.t('F00003.E012'), response.data.result.code, false, null, false, null)
          } else {
            this.globalErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('F00003.E005'), '', false, null, false, null)
          console.log(error)
        })
    },
    async refresh () {
      if (await this.getStore() === true) {
        return true
      } else {
        return false
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.storeCdData = ''
    },
    closeTab () {
      //      window.close()
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['storeCd'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, this.setFocus, false, null)
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
    this.$root.winId = 'F00003'
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    this.searchData = ''
    await this.initialize()
    await this.$nextTick()
    this.$refs.storeCdText.focus()
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
        this.findStoreDataList = { storeInfos: [] }
        this.dispStoreDataList = { storeInfos: [] }
        this.getStore()
      } else {
        if (this.findStoreDataList === null || this.findStoreDataList.storeInfos.length === 0) return
        this.filtering()
      }
    }
  }
}
