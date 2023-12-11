import popup from '@/resource/templates/CommonDesign/Popup'
// G002.00.0 Add-Start
import commonDialog from '@/resource/templates/TransactionNameSetting/CommonDialog'
// G002.00.0 Add-Start
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230104 duyouwei(Neusoft)  G001.00.0  issue課題#1336を対応します.
 * 20230116 duyouwei(Neusoft)  G002.00.0  issue課題#1248を対応します.
 * 20230317 dingxin(Neusoft)   G003.00.0  issue課題#1662を対応します.
 * 20230420 bai.ry(Neusoft)   G004.00.0  issue課題#1515を対応します.
 */

export default {
  data () {
    return {
      displayed: false,
      index: 0,
      setting: {
        transactionNo: '',
        name: '',
        printNo: '',
        // G003.00.0 Update-Start
        displayName: {
          default: ''
          // print: ''
        },
        printName: {
          default: ''
        },
        defaultName: {
          default: ''
        }
        // G003.00.0 Update-End
      },
      // G004.00.0 Add-Start
      displayNameErrorMsg: '',
      printNameErrorMsg: ''
      // G004.00.0 Add-End
    }
  },
  components: {
    popup,
    commonDialog
  },
  methods: {
    async open (setting, index) {
      // G004.00.0 Add-Start
      this.displayNameErrorMsg = ''
      this.printNameErrorMsg = ''
      // G004.00.0 Add-End
      this.setting = setting
      this.index = index
      this.displayed = true
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    // G004.00.0 Add-Start
    saveCheck () {
      let flag = false
      if (this.setting.displayName.default === '' || this.setting.printName.default === '') {
        flag = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
        if (this.setting.displayName.default === '') {
          this.displayNameErrorMsg = '必ず入力してください。'
        } else {
          this.displayNameErrorMsg = ''
        }
        if (this.setting.printName.default === '') {
          this.printNameErrorMsg = '必ず入力してください。'
        } else {
          this.printNameErrorMsg = ''
        }
        return flag
      }
    },
    // G004.00.0 Add-End
    onClickOk () {
      // G004.00.0 Add-Start
      if (this.saveCheck()) {
        return
      }
      // G004.00.0 Add-End
      // G001.00.0 Add-Start
      this.setting.printNo = +this.setting.printNo
      // G001.00.0 Add-End
      this.$emit('clickOk', this.setting, this.index)
      this.displayed = false
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
          if (this.setting.displayName.default == str) {
            this.setting.displayName.default = str.toString().substring(0, i)
          } else if (this.setting.printName.default == str) {
            this.setting.printName.default = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      this.setting.printNo = this.setting.printNo.toString().replace(/[^0-9]/gi, '')
    }
  }
}
