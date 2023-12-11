// KSD V001.000 AE
import CheckboxInput from '@/resource/templates/CommonInput/CheckboxInput'

export default {
  name: 'TableSelectInput',
  props: {
    value: {
      type: [String, Number, Array],
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
    hideCheckboxes: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    bodyMaxHeight: {
      type: Number,
      default: 300
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedItems: [...this.value]
    }
  },
  components: {
    CheckboxInput
  },
  methods: {
    handleRowClick (value, event) {
      const isShift = event.shiftKey
      if (isShift === false) {
        let isSelected = this.selectedItems.indexOf(value) !== -1
        if (!this.multiple) {
          this.selectedItems = []
        }
        if (isSelected && this.multiple) {
          this.selectedItems.splice(this.selectedItems.indexOf(value), 1)
        } else {
          this.selectedItems.push(value)
        }
      } else {
        if (!this.multiple) {
          this.selectedItems = []
          this.selectedItems.push(value)
          return
        }
        if (this.selectedItems.length === 0) {
          this.selectedItems.push(value)
        } else {
          if (this.selectedItems.includes(value)) {
            return
          }
          let startIndex = -1
          startIndex = this.selectedItems.shift()
          this.selectedItems = []
          if (this.options.length === 0) {
            return
          }
          let master = this.options.slice()
          let isRangeSelect = false
          master.forEach(store => {
            if (store.value === startIndex || store.value === value) {
              isRangeSelect = !isRangeSelect
              if (!isRangeSelect) {
                this.selectedItems.push(store.value)
              }
            }
            if (isRangeSelect) {
              this.selectedItems.push(store.value)
            }
          })
        }
      }
      this.$emit('input', this.selectedItems)
    }
  },
  watch: {
    value (newValue) {
      this.selectedItems = [...newValue]
    }
  }
}
// KSD V001.000 AE
