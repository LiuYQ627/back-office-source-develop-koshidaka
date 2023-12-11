export default {
  // KSD V001.000 AS
  name: 'RadioButton',
  // KSD V001.000 AE
  props: {
    value: {
      // KSD V001.000 AS
      type: [Number, Object, Array, String, Boolean],
      // KSD V001.000 AE
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    // KSD V001.000 AS
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
    // KSD V001.000 AE
  // KSD V001.000 DS
  // }
  // KSD V001.000 DE
  // KSD V001.000 AS
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
  // KSD V001.000 AE
}
