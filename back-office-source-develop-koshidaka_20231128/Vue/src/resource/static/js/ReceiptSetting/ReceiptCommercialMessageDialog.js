/* KSD V001.000 AS */
import Popup from '@/resource/templates/CommonDesign/Popup'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'

export default {
  name: 'ReceiptCommercialMessageDialog',
  data () {
    return {
      permissions: [],
      commercialMessageDisplayed: false,
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
      this.commercialMessageDisplayed = true
      this.timeout = setTimeout(() => {
        document.getElementById('commercial-message-1').focus()
      }, 0)
    },
    closeDialog () {
      clearTimeout(this.timeout)
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.commercialMessageDisplayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.commercialMessageDisplayed = false
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
          if (this.params.commercialMessage_1 === str) {
            this.params.commercialMessage_1 = str.toString().substring(0, i)
          } else if (this.params.commercialMessage_2 === str) {
            this.params.commercialMessage_2 = str.toString().substring(0, i)
          } else if (this.params.commercialMessage_3 === str) {
            this.params.commercialMessage_3 = str.toString().substring(0, i)
          } else if (this.params.commercialMessage_4 === str) {
            this.params.commercialMessage_4 = str.toString().substring(0, i)
          } else if (this.params.commercialMessage_5 === str) {
            this.params.commercialMessage_5 = str.toString().substring(0, i)
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
