// KSD V001.000 AS
export default {
  name: 'TextInput',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxByteLength: {
      type: Number,
      default: 0
    },
    halfWidthOnly: {
      type: Boolean,
      default: false
    },
    multiline: {
      type: Boolean,
      default: false
    },
    numeric: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataModel: this.value,
      composing: false,
      tempInput: '',
      compEnd: false,
      compIns: false
    }
  },
  methods: {
    handleInput (event) {
      const t = event.target
      if (this.numeric) {
        t.value = t.value.replace(/[^0-9]/g, '')
      }
      if (this.composing && event.type !== 'compositionend') {
        this.tempInput = event.data
        this.compEnd = true
        return
      }
      this.composing = event.type === 'compositionstart'
      if (t.type === 'number') {
        t.value = t.value.replace(/[^0-9]/g, '')
        if (t.value.length > t.maxLength) {
          t.value = t.value.slice(0, t.maxLength)
          this.dataModel = t.value
        }
      }
      if (this.maxByteLength > 0) {
        if (this.compEnd && event.inputType === 'deleteContentBackward') {
          t.value = this.dataModel + this.tempInput
          this.compEnd = false
          this.compIns = true
          return
        }
        if (this.compIns) {
          t.value = this.dataModel + this.tempInput
          this.compIns = false
          return
        }
        this.tempInput = ''
        const output = `${t.value}`.split('').reduce((out, char) => {
          const charCode = char.charCodeAt(0)
          const temp = charCode.toString(16).toUpperCase()
          if (charCode >= 0xff61 && charCode < 0xffa0 && ((out.byteCount + 1) <= this.maxByteLength)) {
            out.byteCount += 1
            out.value += '' + char
          } else if (out.byteCount + (temp.length / 2) <= this.maxByteLength) {
            out.byteCount += temp.length / 2
            out.value += '' + char
          }
          return out
        }, {
          byteCount: 0,
          value: ''
        })
        t.value = `${output.value}`
        this.dataModel = `${output.value}`
      }
      if (this.halfWidthOnly === true) {
        t.value = t.value.replace(/[\u00ff-\uffff]/gi, '')
        this.dataModel = t.value
      }
      this.$emit('input', t.value)
      if (!this.composing && this.compEnd) {
        let tempDelay = setTimeout(() => {
          this.compEnd = this.compIns
          clearTimeout(tempDelay)
        }, 5)
      }
    },
    handleFocusout () {
      this.$emit('focusout', null)
    }
  },
  watch: {
    value (newValue) {
      this.dataModel = newValue
    }
  }
}
// KSD V001.000 AE
