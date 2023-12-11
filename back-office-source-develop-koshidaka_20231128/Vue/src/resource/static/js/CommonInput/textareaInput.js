// KSD V001.000 AS
export default {
  name: 'TextareaInput',
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
    }
  },
  data () {
    return {
      dataModel: this.value
    }
  },
  methods: {
    handleInput (event) {
      const t = event.target
      if (t.type === 'number') {
        t.value = t.value.replace(/[^0-9]/g, '')
        if (t.value.length > t.maxLength) {
          t.value = t.value.slice(0, t.maxLength)
          this.dataModel = t.value
        }
      }
      if (this.maxByteLength > 0) {
        const output = `${t.value}`.split('').reduce((out, char) => {
          const temp = char.charCodeAt(0).toString(16).toUpperCase()
          if (out.byteCount + (temp.length / 2) <= this.maxByteLength) {
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
    }
  },
  watch: {
    value (newValue) {
      this.dataModel = newValue
    }
  }
}
// KSD V001.000 AE
