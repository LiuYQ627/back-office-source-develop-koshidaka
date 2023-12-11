// KSD V001.000 AS
export default {
  name: 'RadioButton',
  props: {
    value: {
      type: [Number, Object, Array, String, Boolean],
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    disableButtons: {
      type: Boolean,
      default: false
    },
    fitContentWidth: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    itemCols: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      selectedItem: Array.isArray(this.value)
        ? (this.multiple === true)
          ? [ ...this.value ]
          : [ this.value[0] ]
        : [ this.value ]
    }
  },
  methods: {
    handleButtonClick: function (e, value) {
      if (this.multiple === false) {
        this.selectedItem = [value]
        this.$emit('input', value)
      } else {
        if (this.selectedItem.includes(value)) {
          this.selectedItem = this.selectedItem.filter((x) => { return x !== value })
        } else {
          this.selectedItem.push(value)
        }
        this.$emit('input', this.selectedItem)
      }
    }
  },
  watch: {
    value (newValue) {
      this.selectedItem = Array.isArray(newValue)
        ? (this.multiple === true)
          ? [ ...newValue ]
          : [ newValue[0] ]
        : [ newValue ]
    }
  }
}
// KSD V001.000 AE
