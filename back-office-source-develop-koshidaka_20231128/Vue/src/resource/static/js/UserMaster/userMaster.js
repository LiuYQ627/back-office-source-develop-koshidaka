import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import baseDialog from '@/resource/templates/UserMaster/PwLockOutList'
import editDialog from '@/resource/templates/UserMaster/UserEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
const queryPath = 'UserMaster/UserQuery'
const searchPath = 'UserMaster/UserSearch'
const rolePath = 'UserMaster/UserMaintenance'
const LockOutDataPath = 'UserMaster/PwLockOutList'
const accessListPath = 'UserMaster/AccessList'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230508  dingxin(Neusoft)   G001.00.0  issue課題#1662を対応します.
 * 20230714  shiyue(Neusoft)    G002.00.0  issue課題#1863を対応します.
 * 20230809  zxh(Neusoft)       G003.00.0  issue課題#1891を対応します.
 * 20230825  qinshh(Neusoft)    G004.00.0  issue課題#975を対応します.
 * 20231009  wupsh(Neusoft)     G005.00.0  issue課題#1546#note_720551を対応します.
 */
export default {
  name: 'UserMst',
  data () {
    return {
      // G001.00.0 Add start
      permissions: [],
      // G001.00.0 Add end
      userIdData: '',
      searchData: '',
      findUserDataList: [],
      dispUserDataList: [],
      userAccessModelList: [],
      lastSearchData: '',
      roleDataList: [],
      lockUserDataList: [],
      resultCount: 0,
      editDlgOpen: false,
      operationLock: true,
      disablePwLockBtn: true,
      masters: {}
    }
  },
  components: {
    maintButton,
    baseDialog,
    editDialog,
    popup,
    dialogStoreSelect
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
      this.disablePwLockBtn = true
      if (await this.getPwLockUser() === false) return
      if (await this.getAccessList() === false) return
      //      if (await this.getRole() === false) return
      if (await this.getUser() === false) return
      //      if (await this.getMasters() === false) {
      //        this.findUserDataList = { userInfos: [] }
      //        this.dispUserDataList = { userInfos: [] }
      //        this.resultCount = 0
      //        return
      //      }
      this.disablePwLockBtn = (this.lockUserDataList.userInfos.length === 0)
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
    async getPwLockUser () {
      var result = false
      this.lockUserDataList = { userInfos: [] }
      const params = {
        accountClassification: 1
      }
      try {
        let response = await axios.get(this.$i18n.t('prop.url') + LockOutDataPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        if (response.data.result.code === 0) {
          // 0:正常
          // G003.00.0 Update-Start
          // G005.00.0 Update start
          // if (response.data.userInfos === null || response.data.responseModel === null) {
          if (response.data.userInfos === null) {
            this.lockUserDataList = { userInfos: [] }
          } else {
            this.lockUserDataList = response.data
          }
          // G003.00.0 Update-End
          // this.disablePwLockBtn = false
          // G005.00.0 Update End
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当ユーザなし
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E012'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    async getRole () {
      var result = false
      this.roleDataList = { roleInfos: [] }
      try {
        let response = await axios.get(this.$i18n.t('prop.url') + rolePath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          var num = 0
          for (var i = 0; i < response.data.roleInfos.length; i++) {
            if (response.data.roleInfos[i].roleCd !== 10 &&
                response.data.roleInfos[i].roleDisplay === 0) {
              this.roleDataList.roleInfos[num] = response.data.roleInfos[i]
              num++
            }
          }
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
    async getUser () {
      var result = false
      this.findUserDataList = []
      this.dispUserDataList = []
      this.resultCount = 0
      try {
        // ユーザ一覧取得
        let response = await axios.get(this.$i18n.t('prop.url') + queryPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          this.findUserDataList = response.data.responseModel
          this.findUserDataList.sort((a, b) => (a.userRecord.username < b.userRecord.username) ? -1 : 1)
          this.filtering()
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当するユーザなし
          this.filtering()
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E003'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    async getAccessList () {
      var result = false
      try {
        const params = {}
        let response = await axios.get(this.$i18n.t('prop.url') + accessListPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        if (response.data.result.code === 0) {
          // 0:正常
          this.userAccessModelList = []
          this.userAccessModelList = response.data.responseModel.userAccessModelList
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
      // フィルタリング
      if (this.lastSearchData === '') {
        this.dispUserDataList = this.findUserDataList
      } else {
        var tempStr = ''
        var tempLen = this.lastSearchData.length
        this.dispUserDataList = []
        for (var i = 0; i < this.findUserDataList.length; i++) {
          if (document.getElementById('searchName').checked) {
            tempStr = this.findUserDataList[i].userRecord.firstName
          } else {
            // G002.00.0 Update-Start
            // tempStr = this.findUserDataList[i].userRecord.username + ''
            tempStr = this.findUserDataList[i].userRecord.displayCode + ''
            // G002.00.0 Update-End
          }
          if (tempStr == null) {
            tempStr = ''
          }
          // 前方一致
          if (tempStr.substr(0, tempLen) === this.lastSearchData) {
            this.dispUserDataList.push(this.findUserDataList[i])
          }
        }
      }
      this.dispUserDataList = this.dispUserDataList.filter((usr) => usr.userRecord.displayCode.toLowerCase() !== 'tecsys')
      // this.resultCount = this.dispUserDataList.userInfos === null ? 0 : this.dispUserDataList.userInfos.length
      this.resultCount = this.dispUserDataList === null ? 0 : this.dispUserDataList.length
    },
    userIdInput () {
      this.userIdData = this.userIdData.replace(/[^0-9a-z]/gi, '')
    },
    directInput () {
      // 直接入力
      if (this.$refs.userIdText.value.length < 1 || this.$refs.userIdText.value.length > 10) {
        // 10文字以外は反応させない
        return
      }
      // スーパーユーザー対応
      if (this.$refs.userIdText.value.toUpperCase() == 'TECSYS') {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E022'), '-0099', false, this.setFocus, false, null)
        return
      }

      const params = { userId: this.$refs.userIdText.value, searchFlg: 1 }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            this.$refs.editDialog.open(this.$refs.userIdText.value, response.data.responseModel, this.roleDataList, this.masters, this.refresh, this.editDlgClose, this.userAccessModelList)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            // 2:該当するユーザなし
            this.$refs.editDialog.open(this.$refs.userIdText.value, null, this.roleDataList, this.masters, this.refresh, this.editDlgClose, this.userAccessModelList)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('F00001.E003'), '', false, null, false, null)
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
      // ユーザ編集
      var userData = this.dispUserDataList[index]
      var params = { userId: userData.userRecord.username, searchFlg: 1 }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            this.$refs.editDialog.open(userData.userRecord.username, response.data.responseModel, this.roleDataList, this.masters, this.refresh, this.editDlgClose, this.userAccessModelList)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            // 2:該当するユーザなし
            this.$refs.pop.open(3, '', this.$i18n.t('F00001.E011'), response.data.result.code, false, null, false, null)
          } else {
            this.globalErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          // G004.00.0 Update-Start
          // this.$refs.pop.open(3, '', this.$i18n.t('F00001.E003'), '', false, null, false, null)
          this.$refs.pop.open(3, '', this.$i18n.t('F00001.E024'), '', false, null, false, null)
          // G004.00.0 Update-End
          console.log(error)
        })
    },
    async refresh (userId) {
      // 再描画
      //      if (userId !== 0) {
      //        await this.removeLockUser(userId)
      //      }
      if (await this.getUser() === true) {
        //        // すぐに更新するとPWロックボタン状態に反映されないため時差を設ける
        //        setTimeout(() => {
        //          this.disablePwLockBtn = (this.lockUserDataList.userInfos.length === 0)
        //        }, 50)
        return true
      } else {
        return false
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.userIdData = ''
    },
    openPwLock () {
      this.$refs.baseDialog.open(this.$i18n.t('F00001.S026'), this.lockUserDataList, this.closePwLock)
      setTimeout(() => {
        this.$refs.baseDialog.openEnd()
      }, 50)
    },
    async closePwLock (pwUnLockList) {
      if (pwUnLockList) {
        for (var i = 0; i < pwUnLockList.length; i++) {
          await this.removeLockUser(pwUnLockList[i].userId)
        }
        // すぐに更新するとPWロックボタン状態に反映されないため時差を設ける
        setTimeout(() => {
          this.disablePwLockBtn = (this.lockUserDataList.userInfos.length === 0)
        }, 50)
      }
    },
    async removeLockUser (userId) {
      for (var i = 0; i < this.lockUserDataList.userInfos.length; i++) {
        if (this.lockUserDataList.userInfos[i].userId === userId) {
          this.lockUserDataList.userInfos.splice(i, 1)
          return
        }
      }
    },
    closeTab () {
      //      window.close()
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['userId'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, this.setFocus, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    globalErrorMapping (result) {
    // G004.00.0 Update Start
    //  if (result.code === -90) {
    //     this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
    //       this.$router.push('/LoginPage')
    //     }, false, null)
    //   } else if (result.code !== 0) {
    //     let globalErrorMsg = result.errorMessageMap['global'].toString()
    //     this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
    //   }
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['userId'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, this.setFocus, false, null)
      } else if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
      // G004.00.0 Update End
    },
    confirmUnload (event) {
      // マスタ新規・編集ダイアログ表示中なら変更確認ダイアログを表示する
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    }
  },
  created () {
    this.$root.winId = 'F00001'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    // G001.00.0 Add start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G001.00.0 Add end
    this.searchData = ''
    await this.initialize()
    await this.$nextTick()
    this.$refs.userIdText.focus()
  },
  watch: {
    searchData: function (val) {
      // コード入力の場合、半角英数以外を除去
      if (document.getElementById('searchCode').checked) {
        var inputText = val.replace(/[^0-9a-z]/gi, '')
        this.searchData = inputText
        if (inputText === this.lastSearchData) return
        this.lastSearchData = inputText
      } else {
        this.lastSearchData = val
      }
      if (this.lastSearchData === '') {
        this.findUserDataList = []
        this.dispUserDataList = []
        this.getUser()
      } else {
        if (this.findUserDataList === null || this.findUserDataList.length === 0) return
        this.filtering()
      }
    }
  }
}
