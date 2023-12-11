import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
const savePath = 'AccessAuthorityRegistration/Edit'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230508  dingxin(Neusoft)   G001.00.0  issue課題#1662を対応します.
 * 20230608  wangchunmei(Neusoft) G002.00.0  issue課題#1123を対応します.
 */
export default {
  data () {
    return {
      // G001.00.0 Add start
      permissions: [],
      // G001.00.0 Add end
      dialog: false,
      refresh: false,
      title: '',
      mode: 1,
      registerAuth: true,
      authority: '',
      authorityName: '',
      authorityOldName: '',
      selectedScanner: 0,
      authorityListSelect: [],
      workers: [],
      tabletDataList: { tabletModels: [] },
      scannerList: [
        { code: 1, name: this.$i18n.t('F00013.S019') },
        { code: 2, name: this.$i18n.t('F00013.S020') }
      ],
      nameErrorMsg: '',
      terminalTypeErrorMsg: '',
      refreshFunc: null,
      closeFunc: null,
      focusItem: null
    }
  },
  components: {
    popup
  },
  methods: {
    open (authority, authorityName, refreshFunc, closeFunc) {
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.authority = authority
      this.authorityName = authorityName
      this.authorityOldName = authorityName
      this.workers = []
      this.registerAuth = true
      this.refresh = true
    },
    openEnd () {
      this.initErrorMessage()
    },
    onClickReturn () {
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
      this.popupConfirm()
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    async onClickSave () {
      this.nameErrorMsg = ''
      if (this.authorityName == '') {
        this.nameErrorMsg = '必ず入力してください。'
        return
      }
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (await this.executeSave() === true) {
        // G002.00.0 Update-Start
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => { this.$emit('changeName') }, false, null)
        // G002.00.0 Update-End
        this.dialog = false
        // this.$router.go({path: this.$router.currentRoute.path, force: true})
      }
    },
    async executeSave () {
      var result = false
      try {
        const params = {
          authority: this.authority,
          authorityName: this.authorityName,
          authorityOldName: this.authorityOldName
        }
        // 保存
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
          this.refresh = true
          // G002.00.0 Delete-Start
          // this.$emit('changeName')
          // G002.00.0 Delete-End
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E005'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    saveErrorMapping (result) {
      this.focusItem = null
      if (result.code === -99) {
        if (result.errorMessageMap['terminalInfos[0].name'] !== undefined) {
          this.nameErrorMsg = result.errorMessageMap['terminalInfos[0].name'].toString().split(',')
          this.focusItem = this.$refs.nameText
        }
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), result.code, false, this.setFocus, false, null)
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
    },
    inputLimit (str, maxLength) {
      if (str == null) { return }
      var strLen = str.toString().length
      // byte数の取得
      var byteLen = 0
      for (var i = 0; i < strLen; i++) {
        var codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
          (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          if (this.authorityName == str) {
            this.authorityName = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  },
  // G001.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G001.00.0 Add end
}
