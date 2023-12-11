import popup from '@/resource/templates/CommonDesign/Popup'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'

export default {
  model: {
    prop: 'changeDateText',
    event: 'change'
  },
  props: {
    targetStoreCodes: {
      type: Array,
      required: true
    },
    typeOfSetting: {
      type: String,
      required: true
    },
    changeDateText: {
      type: String,
      default: null
    }
    // KSD V001.000 AS
    , storeHeaderLabel: {
      type: String,
      default: ''
    },
    dateChangeHeaderLabel: {
      type: String,
      default: ''
    },
    storeSelectFilledWidth: {
      type: Boolean,
      default: false
    },
    applyStandardSpacing: {
      type: Boolean,
      default: false
    },
    hasCloudPosAdminCheck: {
      type: Boolean,
      default: false
    },
    isCloudposAdmin: {
      type: Boolean,
      default: false
    }
    // KSD V001.000 AE
  },
  components: {
    popup,
    dateInput,
    storeSelect
  },
  methods: {
    disabledFunc (date) {
      return date <= new Date()
    },
    updateDate (dateStr) {
      this.$emit('change', dateStr)
    }
  }
}
