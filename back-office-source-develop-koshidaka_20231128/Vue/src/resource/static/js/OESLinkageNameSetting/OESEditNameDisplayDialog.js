// KSD V001.000 AS
import popup from '@/resource/templates/CommonDesign/Popup'
import { inputLimitation } from '@/resource/static/js/Common/jsUtils'

export default {
  name: 'OESEditNameDisplayDialog',
  data () {
    return {
      classificationName: '',
      itemName: '',
      placeholder: '',
      nameDisplay: {
        displayName: '',
        printName: ''
      },
      dataRows: ['tblNo', 'slipNo', 'nkTblNo'],
      dialog: false,
      index: 0,
      limit: 0,
      row: null
    }
  },
  components: {
    popup
  },
  methods: {
    async open (row, index) {
      this.dialog = true
      this.classificationName = this.$i18n.t('F322b7.S003')
      this.itemName = this.setItemName(index)
      this.placeholder = index === 3 ? this.$i18n.t('F322b7.S029') : this.$i18n.t('F322b7.S028')
      this.limit = index === 3 ? 16 : 8
      this.nameDisplay = {
        displayName: row.displayName.default,
        printName: row.printName.default
      }
      this.index = index
      this.row = row
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.dialog = false }, false, null)
    },
    openEnd () {
      this.timeout = setTimeout(() => {
        const inputFocus = this.$refs.displayName
        inputFocus.focus()
      }, 50)
    },
    async onClickSave () {
      this.dialog = false
      this.$emit('clickSave', this.nameDisplay, this.dataRows[this.index - 1])
    },
    setItemName (index) {
      switch (index) {
        case 1:
          return this.$i18n.t('F322b7.S005')
        case 2:
          return this.$i18n.t('F322b7.S006')
        case 3:
          return this.$i18n.t('F322b7.S007')
        default:
          return ''
      }
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    }
  }
}
// KSD V001.000 AE
