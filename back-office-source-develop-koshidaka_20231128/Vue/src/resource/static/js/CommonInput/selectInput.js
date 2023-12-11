// KSD V001.000 AS
export default {
  name: 'SelectInput',
  props: {
    value: {
      type: [String, Number, Array, Boolean],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    emptyOption: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    getOptionValue: {
      type: Function,
      default: (option, index) => {
        return option.value
      }
    },
    getOptionName: {
      type: Function,
      default: (option, index) => {
        return option.name
      }
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
      this.$emit('input', t.value)
      this.$emit('selectedStr', t[t.selectedIndex].label)
    },
    handleClick (event) {
      this.$emit('mousedown')
    }
  },
  watch: {
    value (newValue) {
      this.dataModel = newValue
    }
  }
}
// KSD V001.000 AE
