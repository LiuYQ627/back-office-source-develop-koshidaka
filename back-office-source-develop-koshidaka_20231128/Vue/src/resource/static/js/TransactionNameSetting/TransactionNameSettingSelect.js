import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230110 bai.ry(Neusoft)  G001.00.0  issue課題#1034を対応します.
 * 20230210 dingxin(Neusoft)   G002.00.0  issue課題#1225を対応します.
 * 20230228 dingxin(Neusoft)   G003.00.0  issue課題#1584を対応します.
 */
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
      if (this.targetStoreCodes.length > 0) {
        this.goToEdit(null)
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a3.W002'), '', false, null, false, null)
      }
    },
    changedStore (storeIds) {
      this.getReservationDates(storeIds[0])
    },
    getReservationDates (nodeId) {
      // G001.00.0 Add-Start
      this.settingItems = []
      // G001.00.0 Add-End
      axios.put(this.$i18n.t('prop.url') + path, {
        nodeId: nodeId,
        excludeFields: true
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          if (response.data.responseModel) {
            response.data.responseModel.filter(item => {
              return item.configurationType === 'NAME_TRANSACTION_SETTINGS'
            }).forEach(item => {
              this.settingItems.push(item)
            })
          } else {
            // G003.00.0 Update start
            if (response.data.result.code != 204) {
              if (response.data.result.code == -10) {
                this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
              }
              this.settingItems = []
              this.targetStoreCodes = []
              this.searchErrorMapping(response.data.result)
            }
            // // G002.00.0 Add start
            // if(response.data.result.code == -10) {
            //   this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
            // }
            // // G002.00.0 Add end
            // this.settingItems = []
            // this.targetStoreCodes = []
            // this.searchErrorMapping(response.data.result)
            // G003.00.0 Update end
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
    this.$root.winId = 'F322a3'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
