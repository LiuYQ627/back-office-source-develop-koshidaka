// KSD V001.000 AS
import popup from '@/resource/templates/CommonDesign/Popup'
import csvErrorDialog from '@/resource/templates/CommonDesign/CsvErrorDialog'

export default {
  data () {
    return {
      dialog: false,
      closeFunc: null,
      modalType: 0,
      errorList: []
    }
  },
  components: {
    popup,
    csvErrorDialog
  },
  methods: {
    open (closeFunc, modalType, errorList) {
      this.dialog = true
      this.closeFunc = closeFunc
      this.modalType = modalType
      this.errorList = errorList
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    onClickSave () {
      this.popupConfirm()
    }
  }
}
// KSD V001.000 AE
