/* KSD V001.000 AS */
import Popup from '@/resource/templates/CommonDesign/Popup'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'

export default {
  name: 'ReceiptFooterMessageDialog',
  data () {
    return {
      permissions: [],
      footerCommercialMessageDisplayed: false,
      params: {},
      timeout: null
    }
  },
  components: {
    Popup,
    RadioButton
  },
  methods: {
    open (setting) {
      this.params = JSON.parse(JSON.stringify(setting))
      this.footerCommercialMessageDisplayed = true
      this.timeout = setTimeout(() => {
        document.getElementById('footerMessage_1').focus()
      }, 0)
    },
    closeDialog () {
      clearTimeout(this.timeout)
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.footerCommercialMessageDisplayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.footerCommercialMessageDisplayed = false
    },
    inputLimit (str, maxLength) {
      if (str == null) return
      const strLen = str.toString().length
      let byteLen = 0
      for (let i = 0; i < strLen; i++) {
        const codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
          (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        if (byteLen > maxLength) {
          if (this.params.footerMessage_1 === str) {
            this.params.footerMessage_1 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_2 === str) {
            this.params.footerMessage_2 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_3 === str) {
            this.params.footerMessage_3 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_4 === str) {
            this.params.footerMessage_4 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_5 === str) {
            this.params.footerMessage_5 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_6 === str) {
            this.params.footerMessage_6 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_7 === str) {
            this.params.footerMessage_7 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_8 === str) {
            this.params.footerMessage_8 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_9 === str) {
            this.params.footerMessage_9 = str.toString().substring(0, i)
          } else if (this.params.footerMessage_10 === str) {
            this.params.footerMessage_10 = str.toString().substring(0, i)
          }
          break
        }
      }
    }
  },
  mounted () {
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
}
/* KSD V001.000 AE */
