/* KSD V001.000 AS */
import Popup from '@/resource/templates/CommonDesign/Popup'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'

export default {
  name: 'ReceiptHorizontalSettingDialog',
  data () {
    return {
      permissions: [],
      receiptInfoDisplayed: false,
      params: {},
      receiptOrientationLabels: [
        { name: this.$i18n.t('F322b3.S129'), value: 'horizontal' },
        { name: this.$i18n.t('F322b3.S130'), value: 'vertical' }
      ]
    }
  },
  components: {
    Popup,
    RadioButton
  },
  methods: {
    open (setting) {
      this.params = JSON.parse(JSON.stringify(setting))
      this.receiptInfoDisplayed = true
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.receiptInfoDisplayed = false }, false, null)
    },
    onClickOk () {
      this.clearMessages()
      this.$emit('clickOk', this.params)
      this.receiptInfoDisplayed = false
    },
    clearMessages () {
      this.params.ryosyuMessage_1 = ''
      this.params.ryosyuMessage_2 = ''
      this.params.ryosyuMessage_3 = ''
      this.params.ryosyuMessage_4 = ''
      this.params.ryosyuMessage_5 = ''
      this.params.ryosyuMessage_6 = ''
      this.params.ryosyuMessage_7 = ''
      this.params.ryosyuMessage_8 = ''
      this.params.ryosyuMessage_9 = ''
      this.params.ryosyuMessage_10 = ''
      this.params.ryosyuMessage_11 = ''
      this.params.ryosyuMessage_12 = ''
    }
  },
  mounted () {
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
}
/* KSD V001.000 AE */
