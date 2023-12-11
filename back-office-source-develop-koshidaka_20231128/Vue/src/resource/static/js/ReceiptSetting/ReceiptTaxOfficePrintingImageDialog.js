/* KSD V001.000 AS */
import Popup from '@/resource/templates/CommonDesign/Popup'

export default {
  name: 'ReceiptTaxOfficePrintingImageDialog',
  data () {
    return {
      permissions: [],
      receiptrevenueStampLogoDisplayed: false,
      params: {},
      revenueStampFile: '',
      timeout: null
    }
  },
  components: {
    Popup
  },
  computed: {
    disableCancelBtn () {
      return this.params.revenueStampLogoFileName === ''
    }
  },
  methods: {
    open (setting) {
      this.params = JSON.parse(JSON.stringify(setting))
      this.receiptrevenueStampLogoDisplayed = true
      const uploadinput = document.getElementById('revenue-stamp-logo-file-select')
      if (uploadinput) {
        uploadinput.value = null
      }
      this.timeout = setTimeout(() => {
        document.getElementById('imageSelectedBtn').focus()
      }, 0);
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.receiptrevenueStampLogoDisplayed = false }, false, null)
      clearTimeout(this.timeout)
    },
    clearImage () {
      this.params.revenueStampLogoBase64EncodedString = ''
      this.params.revenueStampLogoFileName = ''
      this.params.revenueStampLogoHashValue = ''
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.receiptrevenueStampLogoDisplayed = false
    },
    onClickImageSelected () {
      this.$refs.revenueStampLogoFileSelect.accept = '.bmp'
      this.$refs.revenueStampLogoFileSelect.click()
    },
    selectedFile (e) {
      e.preventDefault()
      this.revenueStampFile = e.target.files[0]
      if (!this.revenueStampFile) {
        return
      }
      if (this.revenueStampFile.type !== 'image/bmp') {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b3.E002'), '', false, null, false, null)
        return
      }
      this.imageUpload()
    },
    imageUpload () {
      const reader = new FileReader()
      const params = this.params
      reader.addEventListener('load', function () {
        params.revenueStampLogoBase64EncodedString = reader.result
      }, false)
      reader.readAsDataURL(this.revenueStampFile)
      this.params.revenueStampLogoFileName = 'tax_image' + this.hasPlanningCode() + '.bmp'
    },
    hasPlanningCode () {
      if (this.params.planningCode === null || !this.params.planningCode) {
        return '00'
      }
      return this.params.planningCode.toString().length < 2 ? `0${this.params.planningCode}` : this.params.planningCode.toString()
    }
  },
  mounted () {
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
}
/* KSD V001.000 AE */
