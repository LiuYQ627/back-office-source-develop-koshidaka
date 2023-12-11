/**
* ---------+---------------------+----------+--------------------------------
*  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
* ---------+---------------------+----------+--------------------------------
* 20230207  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
* 20230313  dingxin(Neusoft)      G002.00.0  issue課題#1662を対応します.
*/
import popup from '@/resource/templates/CommonDesign/Popup'

export default {
  data () {
    return {
      // G002.00.0 Add start
      permissions: [],
      // G002.00.0 Add end
      receiptHeaderLogoDisplayed: false,
      params: {},
      headerFile: ''
    }
  },
  components: {
    popup
  },
  methods: {
    open (setting) {
      this.params = JSON.parse(JSON.stringify(setting))
      this.receiptHeaderLogoDisplayed = true
      let uploadinput = document.getElementById('headerLogoFileSelect')
      if (uploadinput) {
        uploadinput.value = null
      }
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.receiptHeaderLogoDisplayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.receiptHeaderLogoDisplayed = false
    },
    onClickImageSelected () {
      this.$refs.headerLogoFileSelect.accept = '.bmp'
      this.$refs.headerLogoFileSelect.click()
    },
    selectedFile (e) {
      e.preventDefault()
      this.headerFile = e.target.files[0]
      if (!this.headerFile) {
        return
      }
      if (this.headerFile.type !== 'image/bmp') {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b3.E002'), '', false, null, false, null)
        return
      }
      this.imageUpload()
    },
    imageUpload () {
      var reader = new FileReader()
      var params = this.params
      reader.addEventListener('load', function () {
        params.headerLogoBase64EncodedString = reader.result
      }, false)
      reader.readAsDataURL(this.headerFile)
      /* KSD V001.000 DS */
      // this.params.headerLogoFileName = 'headerlogo' + '0' + this.params.planningCode + '.bmp'
      /* KSD V001.000 DE */
      /* KSD V001.000 AS */
      this.params.headerLogoFileName = 'headerlogo' + this.hasPlanningCode() + '.bmp'
      /* KSD V001.000 AE */
    }
    /* KSD V001.000 AS */
    ,hasPlanningCode () {
      if (this.params.planningCode === null || !this.params.planningCode) {
        return '00'
      }
      return this.params.planningCode.toString().length < 2 ? `0${this.params.planningCode}` : this.params.planningCode.toString()
    }
    /* KSD V001.000 AE */
  },
  // G002.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G002.00.0 Add end
}
