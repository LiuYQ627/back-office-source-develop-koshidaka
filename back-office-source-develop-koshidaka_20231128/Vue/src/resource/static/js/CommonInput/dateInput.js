import flatPickr from 'vue-flatpickr-component'
import { Japanese } from 'flatpickr/dist/l10n/ja.js'
import '@/resource/static/css/CommonLibraryTool/flatPickr.css'

export default {
  props: {
    value: {
      type: String,
      default: null
    },
    format: {
      type: String,
      default: 'Y-m-d'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledFunc: {
      type: Function,
      default: null
    },
    tabindex: {
      type: Number,
      default: 0
    },
    styling: {
      type: Object
    }
    // KSD V001.000 AS
    , isFixedInputWidth: {
      type: Boolean,
      default: false
    },
    inputWidth: {
      type: Number,
      default: 234
    },
    minDate: {
      type: String,
      default: ''
    },
    maxDate: {
      type: String,
      default: ''
    }
    // KSD V001.000 AE
  },
  data () {
    return {
      calendarConfig: {
        locale: Japanese,
        allowInput: true,
        monthSelectorType: 'static',
        dateFormat: this.format,
        onClose: this.datePickrOnClose,
        disable: [this.disabledFunc]
        // KSD V001.000 AS
        ,
        minDate: this.minDate,
        maxDate: this.maxDate
        // KSD V001.000 AE
      }
    }
  },
  computed: {
    calendarDate () {
      if (this.value === '' || this.value === null) {
        return new Date()
      } else {
        return new Date(this.value)
      }
    }
  },
  components: {
    flatPickr
  },
  methods: {
    openDatePickr () {
      this.$refs.flatPickr.fp.open()
    },
    async datePickrOnClose (selectedDates, dateStr) {
      this.$emit('input', dateStr)
    },
    getCustomStyling () {
      return this.styling
    }
  },
  async mounted () {
    await this.$nextTick()
    this.$set(this.calendarConfig, 'positionElement', document.getElementById('calendarImg'))
  }
}
