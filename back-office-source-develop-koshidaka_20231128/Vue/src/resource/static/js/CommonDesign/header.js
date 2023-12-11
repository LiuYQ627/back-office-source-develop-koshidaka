import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from './../Common/commonUtils'
// KSD V001.000 AS
import QuestionIcon from '@/resource/templates/CommonDesign/QuestionIcon'
// KSD V001.000 AE

/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221230  litie(Neusoft)        G001.00.0  issue課題#1014を対応します.
 * 20230214  xu.jh(Neusoft)        G002.00.0  issue課題#1054を対応します.
 * 20230418  dingxin(Neusoft)      G003.00.0  issue課題#1459を対応します.
 * 20230608  wangchunmei(Neusoft)  G004.00.0  issue課題#1655を対応します.
 * 20230629  wangchunmei(Neusoft)  G005.00.0  issue課題#1867を対応します.
 */

const path = 'CommonDesign/Header'
const logoutPath = 'Login/logout'
const helpFilePath = 'CommonDesign/Helppdf'

export default {
  data () {
    return {
      users: [],
      date: '',
      time: '',
      week: [this.$i18n.t('O00004.S032'), this.$i18n.t('O00004.S033'), this.$i18n.t('O00004.S034'), this.$i18n.t('O00004.S035'), this.$i18n.t('O00004.S036'), this.$i18n.t('O00004.S037'), this.$i18n.t('O00004.S038')],
      sysver: '2',
      showContent: false
    }
  },
  mounted () {
    // 時間は毎秒取得
    setInterval(this.updateTime, 1000)
  },
  components: {
    popup
    // KSD V001.000 AS
    , QuestionIcon
    // KSD V001.000 AE
  },
  methods: {
    // ログインユーザー情報の取得
    getUser () {
      axios.get(this.$i18n.t('prop.url') + path + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        .then((response) => {
          // G005.00.0 Delete-Start
          // this.users = response.data
          // G005.00.0 Delete-End
          // G005.00.0 Add-Start
          if (this.$root.winId === 'O00001') return
          if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
            return
          }
          this.users = response.data.userDataModel
          if (this.users === null || this.users === undefined) {
            this.users = {
              belongStoreCd: '',
              belongStoreName: '',
              businessUnitCdStr: '',
              headquartersAuthority: 0,
              chargeStoreCds: null,
              roleCd: 1,
              permissions: ''
            }
          }
          // G005.00.0 Add-End

          this.$root.$emit('getBelongStoreCd', this.users.belongStoreCd)
          // G001.00.0 Update-Start
          this.$root.$emit('getBelongStoreName', this.users.belongStoreName)
          // G001.00.0 Update-End
          this.$root.$emit('getBusinessUnitCdStr', this.users.businessUnitCdStr)
          this.$root.$emit('getHeadquartersAuthority', this.users.headquartersAuthority)
          this.$root.$emit('getChargeStoreCds', this.users.chargeStoreCds)
          this.$root.$emit('getRoleCd', this.users.roleCd)
          // G004.00.0 Update-Start
          // // G002.00.0 Add-Start
          // this.$root.$emit('getPermissions', this.users.permissions)
          // // G002.00.0 Add-end
          this.$root.$emit('getPermissions', this.users.permissions || [])
          // G004.00.0 Update-End
          // KSD V001.000 AS
          this.$root.$emit('getIsCloudposAdmin', this.users.isCloudposAdmin)
          // KSD V001.000 AE
        })
        .catch((error) => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // G003.00.0 Add-Start
          // this.$router.push('/LoginPage')
          // G003.00.0 Add-End
          console.log(error)
        })
    },
    logout () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W007'), '', true, () => {
        axios.get(this.$i18n.t('prop.url') + logoutPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader()
        ).then((response) => {
          this.users = response.data
          this.$router.push('/LoginPage')
          // G002.00.0 Add-Start
          localStorage.removeItem('AuthorizedRouter')
          // G002.00.0 Add-end
        }).catch((error) => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
      }, false, null)
    },
    // 日付表示
    updateTime () {
      let curretDate = new Date()

      this.date = (curretDate.getMonth() + 1) + '/' + curretDate.getDate() + this.week[curretDate.getDay()]
      this.time = this.zeroPadding(curretDate.getHours(), 2) + ':' + this.zeroPadding(curretDate.getMinutes(), 2)
    },
    // 時刻の0埋め処理
    zeroPadding (num, len) {
      let zero = ''
      for (var i = 0; i < len; i++) {
        zero += '0'
      }
      return (zero + num).slice(-len)
    },
    // ヘッダーアイコン ホバー処理
    changeImg (iname) {
      let onImgSrc = ''
      let elm = ''

      switch (iname) {
        case 'help':
          onImgSrc = require('@/assets/ico_help_h.png')
          break
        case 'drawer':
          onImgSrc = require('@/assets/ico_drawer_h.png')
          break
        case 'drawer-close':
          onImgSrc = require('@/assets/ico_drawerclose_h.png')
          break
      }
      elm = document.getElementById(iname)
      elm.src = onImgSrc
      return elm
    },
    returnImg (iname) {
      let offImgSrc = ''
      let elm = ''

      switch (iname) {
        case 'help':
          offImgSrc = require('@/assets/ico_help_n.png')
          break
        case 'drawer':
          offImgSrc = require('@/assets/ico_drawer_n.png')
          break
        case 'drawer-close':
          offImgSrc = require('@/assets/ico_drawerclose_n.png')
          break
      }
      elm = document.getElementById(iname)
      elm.src = offImgSrc
      return this.elm
    },
    openModal () {
      this.showContent = true
    },
    closeModal () {
      this.showContent = false
    },
    // ヘルプ用PDFファイル取得処理
    async helpFunction () {
      // サーバへ送るPDF検索用の名前定義
      let searchName = ''

      // ダイアログ名が未定義の場合は画面のwinIdを定義
      if (typeof this.$root.dialogName !== 'string') {
        searchName = this.$root.winId
      } else {
        searchName = this.$root.winId + '_' + this.$root.dialogName
      }

      const params = {
        helpPdfSearchName: searchName
      }
      try {
        let response = await axios.get(this.$i18n.t('prop.url') + helpFilePath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        if (response.data.result.code === 0) {
          // 0:正常
          let openUrl = response.data.preSigneUrl
          window.open(openUrl, '_blank')
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },
    /**
     * サーバーと通信した際に発生したエラーをポップアップで表示する処理
     * @param {*} result サーバーからのレスポンスデータ
     */
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    }
  },
  watch: {
    $route (to, from) {
      this.getUser()
    }
  }
}
