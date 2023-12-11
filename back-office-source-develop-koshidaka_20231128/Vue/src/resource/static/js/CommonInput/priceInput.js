// KSD V001.000 AS
const DEFAULT_VALUE = 0

export default {
  name: 'PriceInput',
  props: {
    value: {
      type: Number,
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
    taxRate: {
      type: Number,
      default: 10
    },
    roundType: {
      type: String,
      default: 'off',
      validator (value) {
        return ['up', 'down', 'off'].includes(value)
      }
    },
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 99999
    },
    showPostTax: {
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
      isFocused: false
    }
  },
  computed: {
    displayValue () {
      if (this.showPostTax) {
        const postTax = this.getPostTax(this.originalValue)
        return this.isFocused ? this.originalValue : `${this.originalValue} (${postTax})`
      } else {
        return this.isFocused ? this.originalValue : this.originalValue
      }
    },
    minInputDigits () {
      return 0
    },
    maxInputDigits () {
      return this.maxValue.toString().length
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
      if (newValue != null && newValue.length > 0) {
        this.originalValue = this.convertToNumber(newValue, this.originalValue)
      } else {
        this.originalValue = null
      }
      this.$emit('input', this.originalValue)
    },
    handleInput: function (event) {
      const inputElement = event.target
      const numInput = inputElement.value.replace(/[^0-9]/g, '')
      event.target.value = numInput
    },
    convertToNumber: function (value, defaultValue) {
      if (!value || value.length <= 0 || isNaN(value)) {
        return defaultValue
      }
      if (value < this.minValue || value > this.maxValue) {
        return defaultValue
      }
      return Number(value)
    },
    getPostTax: function (value) {
      const taxRate = this.taxRate / 100
      let consumptionTax = Number(value) * taxRate
      switch (this.roundType) {
        case 'up':
          consumptionTax = Math.ceil(consumptionTax)
          break
        case 'down':
          consumptionTax = Math.floor(consumptionTax)
          break
        default:
        case 'off':
          consumptionTax = Math.round(consumptionTax)
          break
      }
      return Number(value) + consumptionTax
    }
  },
  watch: {
    value (newValue) {
      this.originalValue = newValue
    }
  }
}
// KSD V001.000 AE
