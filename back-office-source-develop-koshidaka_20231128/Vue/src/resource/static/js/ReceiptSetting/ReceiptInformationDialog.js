/**
* ---------+---------------------+----------+--------------------------------
*  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
* ---------+---------------------+----------+--------------------------------
* 20230206  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
* 20230313  dingxin(Neusoft)      G002.00.0  issue課題#1662を対応します.
*/
import popup from '@/resource/templates/CommonDesign/Popup'
import radioButton from '@/resource/templates/CommonInput/RadioButton'

export default {
  data () {
    return {
      // G002.00.0 Add start
      permissions: [],
      // G002.00.0 Add end
      receiptInfoDisplayed: false,
      params: {},
      receiptInformationLabels: [
        { name: '責任者No＋名称', value: 1 },
        { name: '責任者Noのみ', value: 0 }
      ]
    }
  },
  components: {
    popup,
    radioButton
  },
  methods: {
    open (setting) {
      this.params = JSON.parse(JSON.stringify(setting))
      this.receiptInfoDisplayed = true
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.receiptInfoDisplayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.receiptInfoDisplayed = false
    }
  },
  // G002.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G002.00.0 Add end
}
