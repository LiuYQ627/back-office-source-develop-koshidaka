// KSD V001.000 AS
export default {
  name: 'CheckboxInput',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      checked: this.value
    }
  },
  methods: {
    handleClick (event) {
      if (this.readonly) {
        event.preventDefault()
        return false
      }
    },
    handleFocus (e) {
      if (!this.readonly && !this.disabled) {
        e.target.nextElementSibling.classList.add('checkbox-tab-focus')
      }
    },
    handleBlur (e) {
      if (!this.readonly && !this.disabled) {
        e.target.nextElementSibling.classList.remove('checkbox-tab-focus')
      }
    }
  },
  watch: {
    value: function (value) {
      this.checked = value
    },
    checked: function (value) {
      this.$emit('input', value)
    }
  }
}
// KSD V001.000 AE
