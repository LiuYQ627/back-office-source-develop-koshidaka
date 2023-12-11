export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      displayed: false
    }
  },
  methods: {
    open () {
      this.displayed = true
    },
    onClickOk () {
      this.$emit('clickSubmit', this.inputData)
      this.displayed = false
    }
  }
}
