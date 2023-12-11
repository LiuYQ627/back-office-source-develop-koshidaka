import popup from '@/resource/templates/CommonDesign/Popup'
// G001.00.0 Update-Start
// import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'
import commonDialog from '@/resource/templates/PresetMaster/CommonDialog'
// G001.00.0 Update-End
import radioButton from '@/resource/templates/CommonInput/RadioButton'
/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230315  dingxin(Neusoft)      G001.00.0  issue課題#1662を対応します.
 * 20230403  bai.ry(Neusoft)      G002.00.0  issue課題#1607を対応します.
 */
export default {
  data () {
    return {
      displayed: false,
      category: {
        categoryName: '',
        displayFlag: 1,
        order: 1,
        categoryCode: 1
      },
      hiddenLabels: [
        {
          name: '非表示',
          value: 0
        },
        {
          name: '表示',
          value: 1
        }
      ],
      focusItem: null,
      nameError: null,
      // G002.00.0 Add-Start
      categoryMode: 1
      // G002.00.0 Add-End
    }
  },
  components: {
    popup,
    commonDialog,
    radioButton
  },
  methods: {
    open (category, categoryMode) {
      this.category = category
      this.displayed = true
      // G002.00.0 Add-Start
      this.categoryMode = categoryMode
      // G002.00.0 Add-End
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => {
        this.displayed = false
        this.nameError = null
      }, false, null)
    },
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    checkError () {
      this.focusItem = null
      let flag = false
      if (this.$refs.nameText.value === '' || this.$refs.nameText.value == undefined) {
        this.focusItem = this.$refs.nameText
        this.nameError = '必ず入力してください。'
        flag = true
      }
      return flag
    },
    onClickOk () {
      if (this.checkError()) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.setFocus, false, null)
        return
      }
      this.$emit('clickOk', this.category)
      this.displayed = false
    },
    nameInput (val) {
      if (val !== '' && val != undefined) {
        this.nameError = null
      }
    }
  }
}
