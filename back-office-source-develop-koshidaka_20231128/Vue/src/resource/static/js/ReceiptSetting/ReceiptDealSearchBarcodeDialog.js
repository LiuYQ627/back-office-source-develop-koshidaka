/* KSD V001.000 AS */
import Popup from '@/resource/templates/CommonDesign/Popup'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'

export default {
  name: 'ReceiptDealSearchBarcodeDialog',
  data () {
    return {
      permissions: [],
      receiptSearchBarcodePrintDisplayed: false,
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
      this.receiptSearchBarcodePrintDisplayed = true
      this.timeout = setTimeout(() => {
        document.getElementById('receipt-search-barcode-print-switch').focus()
      }, 0)
    },
    closeDialog () {
      clearTimeout(this.timeout)
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.receiptSearchBarcodePrintDisplayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.receiptSearchBarcodePrintDisplayed = false
    },
    onDealSearchBarcodeClick () {
      this.params.searchBarcodePrint = !this.params.searchBarcodePrint
    },
  },
  mounted () {
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
}
/* KSD V001.000 AE */
