/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230209  dingxin(Neusoft)  G001.00.0  issue課題#1225を対応します.
 * 20230228  dingxin(Neusoft)  G002.00.0  issue課題#1584を対応します.
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
      // KSD V001.000 AS
      , isCloudposAdmin: false
      // KSD V001.000 AE
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
      if (this.targetStoreCodes.length > 0) {
        this.goToEdit(null)
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a6.W002'), '', false, null, false, null)
      }
    },
    changedStore (storeIds) {
      this.getReservationDates(storeIds[0])
    },
    getReservationDates (nodeId) {
      // G001.00.0 Add start
      this.settingItems = []
      // G001.00.0 Add end
      axios.put(this.$i18n.t('prop.url') + path, {
        nodeId: nodeId,
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
              return item.configurationType === 'STORE_OPERATIONS_SETTINGS'
            }).forEach(item => {
              this.settingItems.push(item)
            })
          } else {
            // G002.00.0 Update start
            if (response.data.result.code != 204) {
              if (response.data.result.code == -10) {
                this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
              }
              this.settingItems = []
              this.targetStoreCodes = []
              this.searchErrorMapping(response.data.result)
            }
            // // G001.00.0 Add start
            // if(response.data.result.code == -10) {
            //   this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
            // }
            // // G001.00.0 Add end
            // this.settingItems = []
            // this.targetStoreCodes = []
            // this.searchErrorMapping(response.data.result)
            // G002.00.0 Update end
          }
        })
        .catch(error => {
          this.targetStoreCodes = []
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['clientId'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    }
  },

  created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322a6'
    window.addEventListener('beforeunload', this.confirmUnload)
    // KSD V001.000 AS
    this.$root.$once('getIsCloudposAdmin', (isCloudposAdmin) => {
      this.isCloudposAdmin = isCloudposAdmin
    })
    // KSD V001.000 AE
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
