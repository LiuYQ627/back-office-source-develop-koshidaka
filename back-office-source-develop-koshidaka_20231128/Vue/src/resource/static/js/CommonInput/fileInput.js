// KSD V001.000 AS
export default {
  name: 'FileInput',
  props: {
    enctype: {
      type: String,
      default: 'multipart/form-data'
    },
    title: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'file'
    },
    id: {
      type: String
    },
    accept: {
      type: String,
      default: 'image/png'
    },
    hidden: {
      type: Boolean,
      default: true
    },
    large: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openFilePicker () {
      this.$refs.fileInput.click()
    },
    handleChange (event) {
      this.$emit('change', event)
      this.$refs.fileInput.value = null
    }
  }
}
// KSD V001.000 AE
