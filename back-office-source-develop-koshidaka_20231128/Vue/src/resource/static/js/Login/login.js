import axios from 'axios'
import baseDialog from '@/resource/templates/Login/ChangePassword'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from '../Common/commonUtils'
// KSD V001.000 AS
import ArrowIcon from '@/resource/templates/CommonDesign/ArrowIcon'
// KSD V001.000 AE
/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230214  xu.jh(Neusoft)        G001.00.0  issue課題#1054を対応します.
 * 20230728  qinshh(Neusoft)       G002.00.0  issue課題#1054を対応します.
 */

const path = 'Login/UserLogin'
const getCommonDisplayPath = 'Login/GetCommonDisplay'
let errorCnt = 0

export default {
  name: 'Login',
  data () {
    return {
      // KSD V001.000 DS
      // companyCode: localStorage.getItem('ngpCompanyCode'),
      // userCode: localStorage.getItem('ngpUserCode'),
      // KSD V001.000 DE
      // KSD V001.000 AS
      companyCode: '',
      userCode: '',
      password: '',
      // KSD V001.000 AE
      UserLogin: '',
      latestNews: '',
      maintenanceNotice: ''
    }
  },
  components: {
    baseDialog,
    popup
    // KSD V001.000 AS
    , ArrowIcon
    // KSD V001.000 AE
  },
  methods: {
    /* ログイン処理の実行 */
    beforLogin () {
      if (document.getElementById('companyCheck').checked) {
        if (this.companyCode !== null) {
          localStorage.setItem('ngpCompanyCode', this.companyCode)
        }
      } else {
        localStorage.removeItem('ngpCompanyCode')
      }
      if (document.getElementById('userCheck').checked) {
        if (this.userCode !== null) {
          localStorage.setItem('ngpUserCode', this.userCode)
        }
      } else {
        localStorage.removeItem('ngpUserCode')
        // G001.00.0 Add-Start
        localStorage.removeItem('AuthorizedRouter')
        // G001.00.0 Add-end
      }
      var userCode = this.userCode == null ? '' : this.userCode
      // G002.00.0 Add-Start
      if (userCode === '' || userCode=== 'undefined' || userCode == null) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00001.S028'), -99, false, null, false, null)
        return
      }
       // G002.00.0 Add-end
      const params = {
        loginInfo: { userId: userCode, inputPassword: this.$refs.password.value, errorCnt: errorCnt }
      }
      this.Login(params)
    },
    Login (params) {
      var businessCd = this.companyCode
      if (this.companyCode != null && this.companyCode.length !== 0) {
        businessCd = ('000000000000000' + this.companyCode).slice(-15)
      }

      var parmBusinessCd = businessCd == null ? '' : businessCd
      // ログイン
      axios.put(this.$i18n.t('prop.url') + path + '?businessUnitCdStr=' + parmBusinessCd + '&_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        .then(response => {
          this.UserLogin = response.data
          this.LoginResult(this.UserLogin.result, businessCd)
        })
        .catch(error => {
          console.log(error)
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        })
    },
    LoginResult (Response, businessCd) {
      let errorMsg = ''

      switch (Response.code) {
        // ログイン成功時はtop画面へ移行する
        case 0:
          errorCnt = 0
          this.$router.push('/TopPage')
          break
          // パスワード有効期限一週間前
        case 10:
          var errorMessage
          if (this.UserLogin.untilExpirationDays === 0) {
            errorMessage = this.$i18n.t('O00001.S009')
          } else {
            errorMessage = this.$i18n.t('O00001.S010').replace('[days]', this.UserLogin.untilExpirationDays)
          }
          this.$refs.pop.open(2, '', errorMessage, Response.code, false, this.popupBack, false, null)
          break
          // パスワード有効期限切れ
        case 5:
          // 確認メッセージを入れる パスワード変更時は下記に移動それ以外はtopへ移動
          this.$refs.pop.open(2, '', this.$i18n.t('O00001.S011'), Response.code, false, () => { this.popupConfirm(businessCd) }, false, null)
          break
        case -90:
          // 認証エラー。エラーカウントをアップ
          errorCnt++
          errorMessage = this.$i18n.t('O00001.S019')
          if (errorCnt > 9) {
            errorMessage = this.$i18n.t('O00001.S020')
          }
          this.$refs.pop.open(3, '', errorMessage, Response.code, false, null, false, null)
          break
        // KSD V001.000 AS
        case -98:
          this.$refs.pop.open(2, '', this.$i18n.t('O00001.S011'), Response.code, false, () => { this.popupConfirm98(businessCd) }, false, null)
          break
          // KSD V001.000 AE
          // システムエラーの場合はメッセージを出して終了
        case -99:
          errorMsg = ''
          if (Response.errorMessageMap['businessUnitCdStr'] !== undefined) {
            var businessError = Response.errorMessageMap['businessUnitCdStr'].toString().split(',')
            for (let i = 0; i < businessError.length; i++) {
              errorMsg += this.$i18n.t('O00001.S001') + '：' + businessError[i] + '<br/>'
            }
          }
          if (Response.errorMessageMap['loginInfo.userId'] !== undefined) {
            var userIdError = Response.errorMessageMap['loginInfo.userId'].toString().split(',')
            for (let i = 0; i < userIdError.length; i++) {
              errorMsg += this.$i18n.t('O00001.S002') + '：' + userIdError[i] + '<br/>'
            }
          }
          if (Response.errorMessageMap['loginInfo.inputPassword'] !== undefined) {
            var passwordError = Response.errorMessageMap['loginInfo.inputPassword'].toString().split(',')
            for (var i = 0; i < passwordError.length; i++) {
              errorMsg += this.$i18n.t('O00001.S004') + '：' + passwordError[i] + '<br/>'
            }
          }
          this.$refs.pop.open(3, '', errorMsg, Response.code, false, null, false, null)

          break
        default:
          errorMsg = ''
          if (Response.errorMessageMap['global'] !== undefined) {
            errorMsg += Response.errorMessageMap['global'].toString()
          }
          this.$refs.pop.open(3, '', errorMsg, Response.code, false, null, false, null)
          break
      }
    },
    popupConfirm (businessCd) {
      this.$refs.baseDialog.open('パスワード更新', this.userCode, businessCd)
      setTimeout(() => {
        this.$refs.baseDialog.openEnd()
      }, 50)
    },
    // KSD V001.000 AS
    popupConfirm98 (businessCd) {
      this.$refs.baseDialog.open('パスワード更新', this.userCode, businessCd, this.UserLogin)
      setTimeout(() => {
        this.$refs.baseDialog.openEnd()
      }, 50)
    },
    // KSD V001.000 AE
    popupBack () {
      this.$router.push('/TopPage')
    },
    ChangePassword (iconName, passField) {
      if (document.getElementById(iconName).className === 'mdi mdi-eye toggle-password') {
        document.getElementById(iconName).className = 'mdi mdi-eye-off toggle-password'
      } else {
        document.getElementById(iconName).className = 'mdi mdi-eye toggle-password'
      }

      if (document.getElementById(passField).type === 'password') {
        document.getElementById(passField).type = 'text'
      } else {
        document.getElementById(passField).type = 'password'
      }
    },
    SpaceKeyDownToCompanyCheck () {
      // 企業コード保存チェックボックス フォーカスインによるスペースキー押下時の処理
      document.getElementById('companyCheck').checked = !document.getElementById('companyCheck').checked
    },
    SpaceKeyDownToUserCheck () {
      // ユーザコード保存チェックボックス フォーカスインによるスペースキー押下時の処理
      document.getElementById('userCheck').checked = !document.getElementById('userCheck').checked
    },
    // KSD V001.000 MS
    // GetCommonDisplay () {
    //   var commonDisplayInfoList = this.CommonDisplayResponseData.commonDisplayInfos
    //   var wkStrNews = ''
    //   var wkStrMainte = ''

    //   for (var i = 0; i < commonDisplayInfoList.length; i++) {
    //     if (commonDisplayInfoList[i].displayKey.startsWith('latest-news')) {
    //       wkStrNews += commonDisplayInfoList[i].displayMessage
    //     } else if (commonDisplayInfoList[i].displayKey.startsWith('maintenance-notice')) {
    //       wkStrMainte += commonDisplayInfoList[i].displayMessage
    //     }
    //   }

    //   this.latestNews = wkStrNews
    //   this.maintenanceNotice = wkStrMainte
    // },
    GetCommonDisplay () {
      axios.get(this.$i18n.t('prop.url') + getCommonDisplayPath + '?_=dateTime_=' + Date.now())
        .then(response => {
          if (response.data.result.code === 0) {
            const configurations = response.data.responseModel.configurations
            if (configurations.LATEST_NEWS) { this.SetCommonDisplay(configurations.LATEST_NEWS) }
            if (configurations.MAINTENANCE_NOTICE) { this.SetCommonDisplay(configurations.MAINTENANCE_NOTICE) }
          } else if (response.data.result.code === 2) {
            this.latestNews = ''
            this.maintenanceNotice = ''
          } else {
            this.globalErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          if (error.response) {
            console.error(error.response.data)
            console.error(error.message)
            this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          } else {
            console.error(error)
          }
        })
    },
    // KSD V001.000 MS
    // KSD V001.000 AS
    SetCommonDisplay (info) {
      let wkReplaceDisplay = ''
      wkReplaceDisplay = info.value.replace(/\r\n|\n|\r/gm, '<br>')
      if (info.name === 'LATEST_NEWS') {
        this.latestNews = wkReplaceDisplay
      } else if (info.name === 'MAINTENANCE_NOTICE') {
        this.maintenanceNotice = wkReplaceDisplay
      }
    },
    globalErrorMapping (result) {
      if (result.code !== 0) {
        if (result.errorMessageMap == null || result.errorMessageMap['global'] == null) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          return
        }
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    setCredentials ({ userId, password, companyCode }) {
      if (userId && password && companyCode) {
        this.userCode = userId
        this.password = password
        this.companyCode = companyCode
      }
      if (!userId && !password && !companyCode) {
        this.userCode = localStorage.getItem('ngpUserCode')
        this.password = ''
        this.companyCode = localStorage.getItem('ngpCompanyCode')
      }
    }
    // KSD V001.000 AE
  },
  mounted () {
    document.title = this.$route.meta.title
    this.$root.title = this.$i18n.t('O00001.S018')
    this.$root.winId = 'O00001'
    document.documentElement.style.minWidth = '700px'
    // KSD V001.000 DS
    // if (this.companyCode !== null) {
    //   document.getElementById('companyCheck').checked = true
    // }
    // if (this.userCode !== null) {
    //   document.getElementById('userCheck').checked = true
    // }
    // KSD V001.000 DE
    // KSD V001.000 AS
    if (localStorage.getItem('ngpCompanyCode')) {
      document.getElementById('companyCheck').checked = true
    }
    if (localStorage.getItem('ngpUserCode')) {
      document.getElementById('userCheck').checked = true
    }
    // KSD V001.000 AE
    //    axios.get(this.$i18n.t('prop.url') + getCommonDisplayPath + '?_=dateTime_=' + Date.now())
    //      .then(response => {
    //        this.CommonDisplayResponseData = response.data
    //        if (this.CommonDisplayResponseData.result.code === 0) {
    //          this.GetCommonDisplay()
    //        } else {
    //          this.$refs.pop.open(3, '', response.data.result.errorMessageMap['global'].toString(), this.CommonDisplayResponseData.result.code, false, null, false, null)
    //        }
    //      })
    //      .catch(error => {
    //        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
    //        console.log(error)
    //      })
    // KSD V001.000 AS
    this.GetCommonDisplay()
    // KSD V001.000 AE
  }
  // KSD V001.000 AS
  ,created() {
    const { userId, password, companyCode } = this.$route.query;
    this.setCredentials({ userId, password, companyCode });
  },
  // KSD V001.000 AE
}
