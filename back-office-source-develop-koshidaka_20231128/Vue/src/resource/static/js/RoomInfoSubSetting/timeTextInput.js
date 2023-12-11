//  KSD V001.000 AS
import moment from 'moment'
const DEFAULT_VALUE = '0000'
export default {
  name: 'TimeTextInput',
  props: {
    value: {
      type: String,
      required: true
    },
    timeMaxValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      time: this.value,
      invalidTime: false,
      maxInput: 4
    }
  },
  methods: {
    formatTimeInput (timeInput) {
      const timeStr = String(timeInput)
      if (timeStr.length > 0) {
        let parsedTime = moment(timeStr.padStart(4, '0'), 'HHmm')
        if (!parsedTime.isValid()) {
          parsedTime = moment(DEFAULT_VALUE, 'HHmm')
        }
        return parsedTime.format('HH:mm')
      }
      return ''
    },

    handleBlur () {
      const timeStr = this.time
      this.time = this.formatTimeInput(DEFAULT_VALUE)
      if (String(timeStr).length > 0) {
        this.time = this.formatTimeInput(timeStr)
      }
      const timeEmit = this.time.replaceAll(':', '')
      timeEmit.length === 0
        ? this.$emit('timeChanged', DEFAULT_VALUE)
        : this.$emit('timeChanged', timeEmit)
    },

    handleFocus () {
      let timeStr = this.time
      if (timeStr) {
        this.time = timeStr.replaceAll(':', '')
        this.maxInput = 4
      }
    }
  },
  watch: {
    time: function (newVal, oldVal) {
      if (newVal !== '') {
        const cleaned = String(newVal).replaceAll(/[^0-9]/g, '')
        if (cleaned !== newVal) {
          this.time = this.formatTimeInput(cleaned)
        }
      }
    },
    value: function (newVal) {
      let cleaned = newVal.toString().replaceAll(':', '')
      if (cleaned === '') this.time = cleaned
      else this.time = this.formatTimeInput(cleaned)
    }
  },
  mounted () {
    this.time = this.formatTimeInput(this.value)
  }
}
//  KSD V001.000 AE
