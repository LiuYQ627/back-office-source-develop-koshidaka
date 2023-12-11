// KSD V001.000 AS
import TableSelectInput from '@/resource/templates/CommonInput/TableSelectInput'

export default {
  name: 'CoursePriceSettingCopyDialog',
  props: {
    selectedParameterDataModel: {
      type: Object,
      default: () => {
        return {
          weekdayCode: 0,
          chargeCode: 0,
          memberPrice: 0,
          ageDivisionCode: 0,
          countSetting: 0
        }
      }
    },
    weekdayCodeOptions: {
      type: Array,
      default: () => { return [] }
    },
    chargeCodeOptions: {
      type: Array,
      default: () => { return [] }
    },
    memberPriceOptions: {
      type: Array,
      default: () => { return [] }
    },
    ageDivisionCodeOptions: {
      type: Array,
      default: () => { return [] }
    },
    countSettingOptions: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      dialog: false,
      dataModel: {
        weekdayCode: [],
        chargeCode: [],
        memberPrice: [],
        ageDivisionCode: [],
        countSetting: []
      }
    }
  },
  components: {
    TableSelectInput
  },
  computed: {
    okButtonDisabled () {
      return this.dataModel.weekdayCode.length <= 0 ||
        this.dataModel.chargeCode.length <= 0 ||
        this.dataModel.memberPrice.length <= 0 ||
        this.dataModel.ageDivisionCode.length <= 0 ||
        this.dataModel.countSetting.length <= 0
    }
  },
  methods: {
    open () {
      this.dataModel = {
        weekdayCode: [],
        chargeCode: [],
        memberPrice: [],
        ageDivisionCode: [],
        countSetting: []
      }
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    handleCancelButtonClick () {
      this.dialog = false
      this.$emit('close')
    },
    handleOkButtonClick () {
      this.$emit('confirm', this.dataModel)
      this.$emit('close')
    }
  }
}
// KSD V001.000 AE
