// KSD V001.000 AS
import TextInput from '@/resource/templates/CommonInput/TextInput'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
export default {
  name: 'SelfPOSMasterSettingPaymentSetting',
  props: {
    dataModel: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      paymentSettingConfig: this.dataModel,
      doOptions: [
        { name: this.$i18n.t('C00222.S020'), value: 1 },
        { name: this.$i18n.t('C00222.S021'), value: 0 }
      ],
      cashpaytallnumflag: null,
      creditpaytallnumflag: null,
      elemoneypaytallnumflag: null,
      codepaytallnumflag: null
    }
  },
  components: {
    TextInput,
    SelectInput
  },
  methods: {
    initialize () {
      this.cashpaytallnumflag = null
      this.creditpaytallnumflag = null
      this.elemoneypaytallnumflag = null
      this.codepaytallnumflag = null
    },
    isValidInput () {
      this.initialize()
      let flag = false
      if (this.paymentSettingConfig.codepayuse === '1' &&
        (this.paymentSettingConfig.codepaytallnum == null ||
        this.paymentSettingConfig.codepaytallnum === '' ||
        this.paymentSettingConfig.codepaytallnum < 1)) {
        this.focusItem = this.codepaytallnumflag = this.$refs.codepaytallnum
        flag = true
      }
      if (this.paymentSettingConfig.elemoneypayuse === '1' &&
        (this.paymentSettingConfig.elemoneypaytallnum == null ||
          this.paymentSettingConfig.elemoneypaytallnum === '' ||
          this.paymentSettingConfig.elemoneypaytallnum < 1)) {
        this.focusItem = this.elemoneypaytallnumflag = this.$refs.elemoneypaytallnum
        flag = true
      }
      if (this.paymentSettingConfig.creditpayuse === '1' &&
        (this.paymentSettingConfig.creditpaytallnum == null ||
        this.paymentSettingConfig.creditpaytallnum === '' ||
        this.paymentSettingConfig.creditpaytallnum < 1)) {
        this.focusItem = this.creditpaytallnumflag = this.$refs.creditpaytallnum
        flag = true
      }
      if (this.paymentSettingConfig.cashpayuse === '1' &&
        (this.paymentSettingConfig.cashpaytallnum == null ||
        this.paymentSettingConfig.cashpaytallnum === '' ||
        this.paymentSettingConfig.cashpaytallnum < 1)) {
        this.focusItem = this.cashpaytallnumflag = this.$refs.cashpaytallnum
        flag = true
      }
      return flag
    },
    regulateNumericInput (propertyName) {
      this.paymentSettingConfig[propertyName] = this.paymentSettingConfig[propertyName].toString().replace(/[^0-9]/gi, '')
    }
  },
  watch: {
    dataModel: {
      handler (value) {
        this.paymentSettingConfig = JSON.parse(JSON.stringify(this.dataModel))
        Object.keys(this.paymentSettingConfig).forEach(key => {
          this.paymentSettingConfig[key] = this.paymentSettingConfig[key].toString()
        })
      },
      immediate: true,
      deep: true
    }
  }
}
// KSD V001.000 AE
