// KSD V001.000 AS
import TextInput from '@/resource/templates/CommonInput/TextInput'
export default {
  name: 'SelfPOSMasterSettingMessageSetting',
  props: {
    dataModel: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      messageSettingConfig: this.dataModel
    }
  },
  components: {
    TextInput
  },
  watch: {
    dataModel: {
      handler (value) {
        this.messageSettingConfig = JSON.parse(JSON.stringify(this.dataModel))
      },
      immediate: true,
      deep: true
    }
  }
}
// KSD V001.000 AE
