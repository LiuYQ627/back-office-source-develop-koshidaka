import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from './../Common/commonUtils'

/*
 * ---------+-----------------+----------+---------------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+---------------------------------------
 *  20221215  zhaomingyue(Neusoft) G001.00.0  issue課題#808,#809,#1305を対応します.
 */

const path = 'Login/PwUpdate'

export default {
  data () {
    return {
      dialog: false,
      title: '', // タイトル
      pwUpdate: [],
      resultCode: 0,
      userCode: '', // ユーザコード
      // G001.00.0 Update-Start
      // businessCd: '' // 企業コード
      businessCd: '', // 企業コード
      passwordOld: '',
      passwordNew: '',
      passwordNewConf: ''
      // G001.00.0 Update-End
      // KSD V001.000 AS
      , userLogin: '',
      passRuleMsg: {
        passwordRule0: this.$i18n.t('O00001.S033'), // ○○文字以上○○○文字以下、英数字混在で入力してください。
        passwordRule1: this.$i18n.t('O00001.S034'), // ○○文字以上○○○文字以下、英字大小・数値混在の組み合わせで入力してください。
        passwordRule2: this.$i18n.t('O00001.S035'), // ○○文字以上○○○文字以下、数字または英字のみの組み合わせで入力してください。
        passwordRule3: this.$i18n.t('O00001.S036') // ○○文字以上○○○文字以下、英数大小・数字・記号(`!@#$%^*()_+-[]{}の組み合わせで入力してください。
      },
      validationMsg: {
        rangeMsg: this.$i18n.t('O00001.S023'), // 8文字以上15文字以下で入力してください。
        passwordRule0: this.$i18n.t('O00001.S029'), // 英数字混在で入力してください。
        passwordRule1: this.$i18n.t('O00001.S030'), // 英字大小・数値混在の組み合わせで入力してください。
        passwordRule2: this.$i18n.t('O00001.S031'), // 数字または英字のみの組み合わせで入力してください。
        passwordRule3: this.$i18n.t('O00001.S032') // 英数大小・数字・記号(`!@#$%^*()_+-[]{}
      }
      // KSD V001.000 AE
    }
  },
  components: {
    popup
  },
  // G001.00.0 Add-Start
  watch: {
    passwordOld (newValue, oldValue) {
      const reg = /["',￥/&\\]/
      if (reg.test(newValue)) {
        this.passwordOld = oldValue
      }
    },
    passwordNew (newValue, oldValue) {
      const reg = /["',￥/&\\]/
      if (reg.test(newValue)) {
        this.passwordNew = oldValue
      }
    },
    passwordNewConf (newValue, oldValue) {
      const reg = /["',￥/&\\]/
      if (reg.test(newValue)) {
        this.passwordNewConf = oldValue
      }
    }
  },
  // G001.00.0 Add-End
  methods: {
    // KSD V001.000 DS
    // open (title, userCode, businessCd) {
    // KSD V001.000 DE
    // KSD V001.000 AS
    open (title, userCode, businessCd, userLogin) {
    // KSD V001.000 AE
      this.dialog = true
      this.title = title
      this.userCode = userCode
      this.businessCd = businessCd
      // KSD V001.000 AS
      this.userLogin = userLogin
      // KSD V001.000 AE
    },
    onClickOk () {
      if (this.$refs.passwordNew.value == '' || this.$refs.passwordOld.value == '' || this.$refs.passwordNewConf.value == '') {
        this.$refs.pop.open(3, '', this.$i18n.t('O00001.S022'), -99, false, null, false, null)
        return
      }
      // KSD V001.000 DS
      // if (this.$refs.passwordNew.value.length < 8 || this.$refs.passwordOld.length < 8 || this.$refs.passwordNewConf.length < 8) {
      //   this.$refs.pop.open(3, '', this.$i18n.t('O00001.S023'), -99, false, null, false, null)
      //   return
      // }
      // KSD V001.000 DE
      if (this.$refs.passwordNew.value === this.$refs.passwordOld.value) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00001.S014'), -99, false, null, false, null)
        return
      }

      if (this.$refs.passwordNew.value !== this.$refs.passwordNewConf.value) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00001.S013'), -99, false, null, false, null)
        return
      }

      const params = {
        passInfo: {
          password: this.$refs.passwordNew.value,
          passwordOld: this.$refs.passwordOld.value
        }
      }
      // パスワード変更
      // G001.00.0 Update-Start
      // axios.put(this.$i18n.t('prop.url') + path + '?userId=' + this.userCode + '&businessUnitCdStr=' + this.businessCd + '&_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
      axios.put(this.$i18n.t('prop.url') + path + '?userId=' + this.businessCd + this.userCode + '&businessUnitCdStr=' + this.businessCd + '&_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
      // G001.00.0 Update-End
        .then(response => {
          // KSD V001.000 AS
          let defaultErr = false
          // KSD V001.000 AE
          this.pwUpdate = response.data
          if (this.pwUpdate.result.code === 0) {
            const params = {
              loginInfo: { userId: this.userCode, inputPassword: this.$refs.passwordNew.value }
            }
            this.$emit('method', params)
          } else if (this.pwUpdate.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), this.pwUpdate.result.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
          } else if (this.pwUpdate.result.code === 7) {
            var errorMsg7 = ''
            var globalError = this.pwUpdate.result.errorMessageMap['global'].toString().split(',')
            for (let i = 0; i < globalError.length; i++) {
              errorMsg7 += this.$i18n.t('O00001.S007') + '：' + globalError[i] + '<br>'
            }
            this.$refs.pop.open(3, '', errorMsg7, this.pwUpdate.result.code, false, null, false, null)
          // KSD V001.000 AS
          } else if (this.pwUpdate.result.code === -98) {
            var errorMsg98 = ''
            if (this.pwUpdate.result.errorMessageMap) {
              if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_OUT_OF_RANGE' && (
                !this.pwUpdate.responseModel.messageVariables.passwordMin ||
                !this.pwUpdate.responseModel.messageVariables.passwordMax)) {
                defaultErr = true
                errorMsg98 += this.$i18n.t('O00001.S037')
              } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_OUT_OF_RANGE') {
                defaultErr = true
                errorMsg98 += this.validationMsg.rangeMsg
                  .replace('8', this.pwUpdate.responseModel.messageVariables.passwordMin)
                  .replace('15', this.pwUpdate.responseModel.messageVariables.passwordMax)
              } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_ERROR_OF_RULE_0') {
                defaultErr = true
                errorMsg98 += this.validationMsg.passwordRule0
              } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_ERROR_OF_RULE_1') {
                defaultErr = true
                errorMsg98 += this.validationMsg.passwordRule1
              } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_ERROR_OF_RULE_2') {
                defaultErr = true
                errorMsg98 += this.validationMsg.passwordRule2
              } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_ERROR_OF_RULE_3') {
                defaultErr = true
                errorMsg98 += this.validationMsg.passwordRule3
              } else {
                defaultErr = true
                errorMsg98 += this.$i18n.t('O00001.S038')
              }
              if (!defaultErr && this.pwUpdate.result.errorMessageMap['global'] !== null && this.pwUpdate.result.errorMessageMap['global'] !== undefined) {
                errorMsg98 += this.pwUpdate.result.errorMessageMap['global'].toString() + '\n'
              }
            } else {
              if (this.pwUpdate.responseModel) {
                if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_OUT_OF_RANGE' && (
                  !this.pwUpdate.responseModel.messageVariables.passwordMin ||
                  !this.pwUpdate.responseModel.messageVariables.passwordMax)) {
                  errorMsg98 += this.$i18n.t('O00001.S037')
                } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_OUT_OF_RANGE') {
                  errorMsg98 += this.validationMsg.rangeMsg
                    .replace('8', this.pwUpdate.responseModel.messageVariables.passwordMin)
                    .replace('15', this.pwUpdate.responseModel.messageVariables.passwordMax)
                } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_ERROR_OF_RULE_0') {
                  errorMsg98 += this.validationMsg.passwordRule0
                } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_ERROR_OF_RULE_1') {
                  errorMsg98 += this.validationMsg.passwordRule1
                } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_ERROR_OF_RULE_2') {
                  errorMsg98 += this.validationMsg.passwordRule2
                } else if (this.pwUpdate.responseModel.errors[0].error === 'PASSWORD_ERROR_OF_RULE_3') {
                  errorMsg98 += this.validationMsg.passwordRule3
                } else {
                  errorMsg98 += this.$i18n.t('O00001.S038')
                }
              }
            }
            this.$refs.pop.open(3, '', errorMsg98, this.pwUpdate.result.code, false, null, false, null)
          // KSD V001.000 AE
          } else {
            var errorMsg = ''
            if (this.pwUpdate.result.errorMessageMap['passInfo.password'] !== undefined) {
              var passwordError = this.pwUpdate.result.errorMessageMap['passInfo.password'].toString().split(',')
              for (let i = 0; i < passwordError.length; i++) {
                errorMsg += this.$i18n.t('O00001.S007') + '：' + passwordError[i] + '<br>'
              }
            }
            if (this.pwUpdate.result.errorMessageMap['passInfo.passwordOld'] !== undefined) {
              var passwordOldError = this.pwUpdate.result.errorMessageMap['passInfo.passwordOld'].toString().split(',')
              for (let i = 0; i < passwordOldError.length; i++) {
                errorMsg += this.$i18n.t('O00001.S006') + '：' + passwordOldError[i] + '<br>'
              }
            }
            if (this.pwUpdate.result.errorMessageMap['global'] !== undefined) {
              errorMsg += this.pwUpdate.result.errorMessageMap['global'].toString() + '\n'
            }
            this.$refs.pop.open(3, '', errorMsg, this.pwUpdate.result.code, false, null, false, null)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
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
    openEnd () {
      document.getElementById('inputPassword1').focus()
    }
    // KSD V001.000 AS
    , passwordRuleMessage () {
      if (this.userLogin) {
        const messageVariables = this.userLogin.responseModel.messageVariables
        const isValidMinMax = messageVariables.passwordMin === undefined ||
          messageVariables.passwordMax === undefined ||
          messageVariables.passwordMin === null ||
          messageVariables.passwordMax === null ||
          messageVariables.passwordMin === '' ||
          messageVariables.passwordMax === ''
        switch (messageVariables.passwordRule) {
          case 0:
            if (isValidMinMax) {
              return this.$i18n.t('O00001.S037')
            }
            return this.passRuleMsg.passwordRule0.replace('○○', messageVariables.passwordMin).replace('○○○', messageVariables.passwordMax)
          case 1:
            if (isValidMinMax) {
              return this.$i18n.t('O00001.S038')
            }
            return this.passRuleMsg.passwordRule1.replace('○○', messageVariables.passwordMin).replace('○○○', messageVariables.passwordMax)
          case 2:
            if (isValidMinMax) {
              return this.$i18n.t('O00001.S038')
            }
            return this.passRuleMsg.passwordRule2.replace('○○', messageVariables.passwordMin).replace('○○○', messageVariables.passwordMax)
          case 3:
            if (isValidMinMax) {
              return this.$i18n.t('O00001.S038')
            }
            return this.passRuleMsg.passwordRule3.replace('○○', messageVariables.passwordMin).replace('○○○', messageVariables.passwordMax)
          default:
            return this.$i18n.t('O00001.S038')
        }
      }
    }
    // KSD V001.000 AE
  }
}
