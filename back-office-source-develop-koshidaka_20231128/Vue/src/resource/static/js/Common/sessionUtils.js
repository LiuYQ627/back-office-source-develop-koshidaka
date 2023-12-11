// KSD V001.000 AS
import commonUtils from '@/resource/static/js/Common/commonUtils'
import axios from 'axios'

const headerPath = 'CommonDesign/Header'

const sessionUtils = {
  methods: {
    checkSession () {
      axios.get(this.$i18n.t('prop.url') + headerPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        .then((response) => {
          if (!response.data.hasOwnProperty('userDataModel')) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), '', false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
          }
        })
    },
    checkSessionOnLoad (vue) {
      vue.$root.$once('getBelongStoreCd', (belongStoreCd) => {
        // headerで保持している所属店舗コード
        let belongStoreCdStr = belongStoreCd
        if (!belongStoreCdStr) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), '', false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        }
      })
    }
  }
}

export default sessionUtils
// KSD V001.000 AE
