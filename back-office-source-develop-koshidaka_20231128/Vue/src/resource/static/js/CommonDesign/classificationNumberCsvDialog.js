// KSD V001.000 AS
export default {
  data () {
    return {
      dialog: false,
      title: '',
      saveFunc: null,
      productClassificationNumberModel: 1,
      classificationNumberList: [...Array(8)]
    }
  },
  components: {},
  methods: {
    open (saveFunc) {
      this.productClassificationNumberModel = 1
      this.dialog = true
      this.saveFunc = saveFunc
    },
    onClickReturn () {
      this.popupConfirm()
    },
    popupConfirm () {
      this.dialog = false
    },
    onClickSave () {
      this.saveFunc()
    },
  }
}
// KSD V001.000 AE
