// KSD V001.000 AS
import transformUtils from '@/resource/static/js/Common/transformUtils'

const DEFAULT_DATA_MODEL = {
  tens: null,
  ones: null,
  tenths: null,
  hundredths: null
}
export default {
  name: 'NumericInputSingleDigit',
  mixins: [transformUtils],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    leftPadding: {
      type: Number,
      default: 0
    },
    disabled: {
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
      initialValue: String(this.value).replace('.', ''),
      digits: JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
    }
  },
  computed: {
    returnValue () {
      const { tens, ones, tenths, hundredths } = this.digits
      return `${tens}${ones}.${tenths}${hundredths}`
    }
  },
  methods: {
    hasBlank () {
      return String(this.digits.tens).length === 0 || String(this.digits.ones).length === 0 ||
        String(this.digits.tenths).length === 0 || String(this.digits.hundredths).length === 0
    },
    handleBlur (e) {
      if (this.returnValue.length === 5) {
        this.$emit('blur', this.returnValue)
      }
    },
    handleInput (e) {
      const isDigit = e.target.value.match(/\d/g)
      if (isDigit !== null) {
        const inputElement = e.target
        const tabStopElements = document.querySelectorAll('input')
        const currentIndex = Array.from(tabStopElements).indexOf(inputElement)
        const prevTabStop = tabStopElements[currentIndex - 1]
        const nextTabStop = tabStopElements[currentIndex + 1]
        if (inputElement.value.length === 0) {
          prevTabStop.focus()
          prevTabStop.select()
        } else if (nextTabStop) {
          nextTabStop.focus()
          nextTabStop.select()
          inputElement.value = inputElement.value[0]
        }
      }
    },
    handleFocus (e) {
      e.target.select()
    },
    zeroAssign () {
      const zeroStr = '0000'
      this.digits = {
        tens: zeroStr[0],
        ones: zeroStr[1],
        tenths: zeroStr[2],
        hundredths: zeroStr[3]
      }
    }
  },
  async mounted () {
    if (!this.hasError) {
      const numString = String(this.value).replace('.', '')
      if (this.value.length > 0) {
        numString.padStart('0', 4)
      }
      this.digits = {
        tens: numString[0],
        ones: numString[1],
        tenths: numString[2],
        hundredths: numString[3]
      }
    }
  }
}
// KSD V001.000 AE
