// KSD V001.000 AS
import moment from 'moment'

const DEFAULT_VALUE = '0000'

export default {
  name: 'NumericTimeInput',
  props: {
    value: {
      type: String,
      default: DEFAULT_VALUE
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearOnDisabled: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      originalValue: this.value,
      momentObject: this.convertToMomentTime(this.value),
      isFocused: false
    }
  },
  computed: {
    displayValue () {
      if (this.clearOnDisabled && this.disabled) {
        return null
      }
      if (!this.momentObject) {
        return null
      }
      return this.isFocused
        ? this.momentObject.format('HHmm')
        : this.momentObject.format('HH:mm')
    }
  },
  methods: {
    handleFocus: function (event) {
      this.isFocused = true
      setTimeout(() => { event.target.setSelectionRange(0, event.target.value.length) }, 1)
    },
    handleBlur: function (event) {
      this.isFocused = false
      const newValue = event.target.value
      const oldMomentObject = this.momentObject
      this.momentObject = moment()
      this.momentObject = this.convertToMomentTime(newValue, oldMomentObject)
      this.$emit('input', this.convertFromMomentTime(this.momentObject))
    },
    handleInput: function (event) {
      const inputElement = event.target
      const numInput = inputElement.value.replace(/[^0-9]/g, '')
      event.target.value = numInput
    },
    convertToMomentTime: function (value, defaultValue) {
      if (!value || value.length <= 0 || isNaN(value)) {
        return defaultValue
      }
      const momentTime = moment(`${value}`.padStart(4, '0'), ['HHmm'])
      return momentTime.isValid() ? momentTime : defaultValue
    },
    convertFromMomentTime: function (value) {
      if (!value || value === null || !value.isValid()) {
        return DEFAULT_VALUE
      } else {
        return value.format('HHmm')
      }
    }
  },
  watch: {
    value (newValue) {
      this.momentObject = this.convertToMomentTime(newValue)
      this.originalValue = this.convertFromMomentTime(this.momentObject)
    }
  }
}
// KSD V001.000 AE
