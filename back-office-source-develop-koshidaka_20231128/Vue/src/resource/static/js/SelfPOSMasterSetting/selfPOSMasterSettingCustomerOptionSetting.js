// KSD V001.000 AS
import TextInput from '@/resource/templates/CommonInput/TextInput'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import RadioButton from '@/resource/templates/SelfPOSMasterSetting/RadioButton'
import { inputLimitation, inputNumberLimitation } from '@/resource/static/js/Common/jsUtils'

export default {
  name: 'SelfPOSMasterSettingCustomerOptionSetting',
  props: {
    dataModel: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      customerOptionSettingConfig: this.dataModel,
      waitscreentransitionstillpaintingErrorMsg: null,
      waitscreentransition1ErrorMsg: null,
      waitscreentransition2ErrorMsg: null,
      waitscreentransition3ErrorMsg: null,
      focusItem: null,
      customerDisplayOptions: [
        { name: this.$i18n.t('C00222.S112'), value: 0 },
        { name: this.$i18n.t('C00222.S113'), value: 1 }
      ]
    }
  },
  components: {
    TextInput,
    FormGroupLayout,
    RadioButton
  },
  methods: {
    initialize () {
      this.focusItem = null
      this.waitscreentransitionstillpaintingErrorMsg = null
      this.waitscreentransition1ErrorMsg = null
      this.waitscreentransition2ErrorMsg = null
      this.waitscreentransition3ErrorMsg = null
    },
    isEmpty () {
      this.initialize()
      let flag = false
      if (this.customerOptionSettingConfig.waitscreentransition3 === '' || this.customerOptionSettingConfig.waitscreentransition3 == null) {
        this.focusItem = this.waitscreentransition3ErrorMsg = this.$refs.waitscreentransition3
        flag = true
      }
      if (this.customerOptionSettingConfig.waitscreentransition2 === '' || this.customerOptionSettingConfig.waitscreentransition2 == null) {
        this.focusItem = this.waitscreentransition2ErrorMsg = this.$refs.waitscreentransition2
        flag = true
      }
      if (this.customerOptionSettingConfig.waitscreentransition1 === '' || this.customerOptionSettingConfig.waitscreentransition1 == null) {
        this.focusItem = this.waitscreentransition1ErrorMsg = this.$refs.waitscreentransition1
        flag = true
      }
      if (this.customerOptionSettingConfig.waitscreentransitionstillpainting === '' || this.customerOptionSettingConfig.waitscreentransitionstillpainting == null) {
        this.focusItem = this.waitscreentransitionstillpaintingErrorMsg = this.$refs.waitscreentransitionstillpainting
        flag = true
      }
      return flag
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    }
  },
  watch: {
    dataModel: {
      handler (value) {
        this.customerOptionSettingConfig = JSON.parse(JSON.stringify(this.dataModel))
      },
      immediate: true,
      deep: true
    }
  }
}
// KSD V001.000 AE
