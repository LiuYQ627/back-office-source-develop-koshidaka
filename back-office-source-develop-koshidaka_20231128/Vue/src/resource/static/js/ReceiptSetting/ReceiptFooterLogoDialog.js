/* KSD V001.000 AS */
import Popup from '@/resource/templates/CommonDesign/Popup'

export default {
  name: 'ReceiptFooterLogoDialog',
  data () {
    return {
      permissions: [],
      receiptFooterLogoDisplayed: false,
      params: {},
      footerFile: '',
      timeout: null
    }
  },
  components: {
    Popup
  },
  computed: {
    disableCancelBtn () {
      return this.params.footerLogoFileName === ''
    }
  },
  methods: {
    open (setting) {
      this.params = JSON.parse(JSON.stringify(setting))
      this.receiptFooterLogoDisplayed = true
      const uploadinput = document.getElementById('footerLogoFileSelect')
      if (uploadinput) {
        uploadinput.value = null
      }
      this.timeout = setTimeout(() => {
        document.getElementById('imageSelectedBtn').focus()
      }, 0);
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.receiptFooterLogoDisplayed = false }, false, null)
      clearTimeout(this.timeout)
    },
    clearImage () {
      this.params.footerLogoBase64EncodedString = ''
      this.params.footerLogoFileName = ''
      this.params.footerLogoHashValue = ''
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.receiptFooterLogoDisplayed = false
    },
    onClickImageSelected () {
      this.$refs.footerLogoFileSelect.accept = '.bmp'
      this.$refs.footerLogoFileSelect.click()
    },
    selectedFile (e) {
      e.preventDefault()
      this.footerFile = e.target.files[0]
      if (!this.footerFile) {
        return
      }
      if (this.footerFile.type !== 'image/bmp') {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b3.E002'), '', false, null, false, null)
        return
      }
      this.imageUpload()
    },
    imageUpload () {
      const reader = new FileReader()
      const params = this.params
      reader.addEventListener('load', function () {
        params.footerLogoBase64EncodedString = reader.result
      }, false)
      reader.readAsDataURL(this.footerFile)
      this.params.footerLogoFileName = 'footerlogo' + this.hasPlanningCode() + '.bmp'
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
