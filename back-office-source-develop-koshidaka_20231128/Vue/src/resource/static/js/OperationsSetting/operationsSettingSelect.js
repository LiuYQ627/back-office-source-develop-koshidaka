/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230210  dingxin(Neusoft)  G001.00.0  issue課題#1225を対応します.
 */
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'

const path = 'Reservation/FetchDateList'

export default {
  name: 'ConfigSelect',
  data () {
    return {
      headquartersAuthority: 1,
      targetStoreCodes: [],
      settingItems: []
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect
  },
  methods: {
    openEdit (itemIndex) {
      if (itemIndex < 0) {
        this.goToEdit()
      } else {
        this.goToEdit(this.settingItems[itemIndex].executionDate)
      }
    },
    goToEdit (dateText = '現在の設定') {
      const typeOfSetting =
        dateText === '現在の設定' ? 'current'
          : dateText === null ? 'new'
            : new Date(dateText) < new Date() ? 'past'
              : 'future'

      this.$router.push({
        name: this.$route.name + '-edit',
        params: {
          targetStoreCodes: this.targetStoreCodes,
          typeOfSetting: typeOfSetting,
          propChangeDateText: dateText
        }
      })
    },
    async closeTab () {
      this.$router.push('/TopPage')
    },
    async addPlan () {
      this.goToEdit(null)
    },
    changedStore (storeIds) {
      this.getReservationDates(storeIds[0])
    },
    getReservationDates (nodeId) {
      axios.put(this.$i18n.t('prop.url') + path, {
        nodeId: null,
        excludeFields: true
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          // KSD V001.000 AS
          if (response.data && response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$t('O00004.W008'), response.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
          }
          // KSD V001.000 AE
          if (response.data.responseModel) {
            response.data.responseModel.filter(item => {
              return item.configurationType === 'OPERATIONS_SETTINGS'
            }).forEach(item => {
              this.settingItems.push(item)
            })
          } else {
            // G001.00.0 Add start
            if (response.data.result.code == -10) {
              this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
            }
            // G001.00.0 Add end
            this.settingItems = []
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322a5'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.getReservationDates('000000000000001000001')
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
