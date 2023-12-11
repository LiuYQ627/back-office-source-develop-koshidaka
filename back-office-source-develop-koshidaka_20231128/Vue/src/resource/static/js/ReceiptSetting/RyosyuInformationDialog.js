/**
* ---------+---------------------+----------+--------------------------------
*  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
* ---------+---------------------+----------+--------------------------------
* 20230206  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
* 20230217  wangchunmei(Neusoft)  G002.00.0  issue課題#1567を対応します.
* 20230313  dingxin(Neusoft)      G003.00.0  issue課題#1662を対応します.
*/
import popup from '@/resource/templates/CommonDesign/Popup'
import radioButton from '@/resource/templates/CommonInput/RadioButton'

export default {
  data () {
    return {
      // G003.00.0 Add start
      permissions: [],
      // G003.00.0 Add end
      ryosyuInfoDisplayed: false,
      params: {},
      ryosyuInformationLabels: [
        { name: '責任者情報印字する', value: true },
        // G002.00.0 Update-Start
        // { name: 'しない', value: false }
        { name: '責任者情報印字しない', value: false }
        // G002.00.0 Update-End
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
      this.ryosyuInfoDisplayed = true
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.ryosyuInfoDisplayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', this.params)
      this.ryosyuInfoDisplayed = false
    }
  },
  // G003.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G003.00.0 Add end
}
