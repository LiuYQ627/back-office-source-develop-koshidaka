// KSD V001.000 AS
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import CommonButton from '@/resource/templates/CommonInput/CommonButton'

export default {
  name: 'ComplianceInformationSettingPreview',
  props: {
    dataModel: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      usageTimeProvisionSetting: 'provisionsImageFile03',
      usageTimeProvisionSettingOptions: [
        { name: this.$i18n.t('C00210.S009'), value: 'provisionsImageFile03' },
        { name: this.$i18n.t('C00210.S010'), value: 'provisionsImageFile04' },
        { name: this.$i18n.t('C00210.S011'), value: 'provisionsImageFile05' }
      ]
    }
  },
  computed: {},
  components: {
    FormGroupLayout,
    SelectInput,
    CommonButton
  },
  methods: {
    resolveImageSource (id) {
      if (this.dataModel && id in this.dataModel) {
        const metadata = this.dataModel[id]
        if (metadata.authenticatedUrl != null) {
          return metadata.authenticatedUrl
        } else {
          return null
        }
      }
      return null
    }
  },
  watch: {
    dataModel: {
      handler (value) {
        this.$forceUpdate()
      },
      immediate: true,
      deep: true
    }
  }
}
// KSD V001.000 AE
