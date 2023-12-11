// KSD V001.000 AS
import popup from '@/resource/templates/CommonDesign/Popup'
import { inputLimitation } from '@/resource/static/js/Common/jsUtils'

export default {
  name: 'OESEditUnpaidDeleteReasonDialog',
  data () {
    return {
      classificationName: '',
      itemName: '',
      unpaidDeleteDisplay: {
        displayName: '',
        printName: ''
      },
      dialog: false,
      index: 0,
      row: null
    }
  },
  components: {
    popup
  },
  methods: {
    async open (row, index) {
      this.dialog = true
      this.classificationName = this.$i18n.t('F322b7.S012')
      this.itemName = this.setItemName(index)
      this.unpaidDeleteDisplay = {
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
      this.$emit('clickSave', this.unpaidDeleteDisplay, this.index)
    },
    setItemName (index) {
      switch (index) {
        case 1:
          return this.$i18n.t('F322b7.S014')
        case 2:
          return this.$i18n.t('F322b7.S015')
        case 3:
          return this.$i18n.t('F322b7.S016')
        case 4:
          return this.$i18n.t('F322b7.S017')
        case 5:
          return this.$i18n.t('F322b7.S018')
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
