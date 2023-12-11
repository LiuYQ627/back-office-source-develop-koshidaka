/**
* ---------+---------------------+----------+--------------------------------
*  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
* ---------+---------------------+----------+--------------------------------
* 20230206  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
* 20230313  dingxin(Neusoft)      G002.00.0  issue課題#1662を対応します.
*/
import popup from '@/resource/templates/CommonDesign/Popup'
import radioButton from '@/resource/templates/CommonInput/RadioButton'

export default {
  data () {
    return {
      // G002.00.0 Add start
      permissions: [],
      // G002.00.0 Add end
      ryosyuMessageDisplayed: false,
      // KSD V001.000 AS
      params: {},
      timeout: null
      // KSD V001.000 AE
    }
  },
  components: {
    popup,
    radioButton
  },
  methods: {
    open (setting) {
      this.params = JSON.parse(JSON.stringify(setting))
      this.ryosyuMessageDisplayed = true
      // KSD V001.000 AS
      this.timeout = setTimeout(() => {
        document.getElementById('ryosyuMessage_1').focus()
      }, 0)
      // KSD V001.000 AE
    },
    closeDialog () {
      // KSD V001.000 AS
      clearTimeout(this.timeout)
      // KSD V001.000 AE
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.ryosyuMessageDisplayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.ryosyuMessageDisplayed = false
    },
    inputLimit (str, maxLength) {
      if (str == null) return
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
          if (this.params.ryosyuMessage_1 === str) {
            this.params.ryosyuMessage_1 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_2 === str) {
            this.params.ryosyuMessage_2 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_3 === str) {
            this.params.ryosyuMessage_3 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_4 === str) {
            this.params.ryosyuMessage_4 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_5 === str) {
            this.params.ryosyuMessage_5 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_6 === str) {
            this.params.ryosyuMessage_6 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_7 === str) {
            this.params.ryosyuMessage_7 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_8 === str) {
            this.params.ryosyuMessage_8 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_9 === str) {
            this.params.ryosyuMessage_9 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_10 === str) {
            this.params.ryosyuMessage_10 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_11 === str) {
            this.params.ryosyuMessage_11 = str.toString().substring(0, i)
          } else if (this.params.ryosyuMessage_12 === str) {
            this.params.ryosyuMessage_12 = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  },
  // G002.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G002.00.0 Add end
}
