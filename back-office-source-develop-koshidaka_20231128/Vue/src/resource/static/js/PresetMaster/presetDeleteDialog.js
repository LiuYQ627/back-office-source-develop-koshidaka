// import axios from 'axios'
// import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'

export default {
  data () {
    return {
      displayed: false,
      plans: [],
      selectedId: ''
    }
  },
  components: {
    popup,
    commonDialog
  },
  methods: {
    open (plans) {
      this.plans = plans
      this.selectedId = ''
      this.displayed = true
    },
    closeDialog () {
      this.displayed = false
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickOk () {
      if (!this.selectedId) {
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W013'), '', true, () => { }, false, null)
      } else {
        this.$emit('clickOk', this.selectedId)
        this.displayed = false
      }
    }
  }
}
