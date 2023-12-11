import popup from '@/resource/templates/CommonDesign/Popup'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'

export default {
  model: {
    prop: 'changeDateText',
    event: 'change'
  },
  props: {
    typeOfSetting: {
      type: String,
      required: true
    },
    changeDateText: {
      type: String,
      default: null
    }
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
