import flatPickr from 'vue-flatpickr-component'
import {Japanese} from 'flatpickr/dist/l10n/ja.js'
import '@/resource/static/css/CommonLibraryTool/flatPickr.css'

export default {
  props: {
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledFunc: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      calendarConfig: {
        locale: Japanese,
        allowInput: true,
        monthSelectorType: 'static',
        dateFormat: 'Y/m/d',
        onClose: this.datePickrOnClose,
        disable: [this.disabledFunc]
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
    }
  },
  async mounted () {
    await this.$nextTick()
    this.$set(this.calendarConfig, 'positionElement', document.getElementById('calendarImg'))
  }
}
