import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'

/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230103  litie(Neusoft)        G001.00.0  issue課題#1058を対応します.
 * 20230209  dingxin(Neusoft)      G002.00.0  issue課題#1225を対応します.
 * 20230228  dingxin(Neusoft)      G003.00.0  issue課題#1584を対応します.
 * 20230418  wangchunmei(Neusoft)  G004.00.0  issue課題#1444を対応します.
 * 20230616  wangchunmei(Neusoft)  G005.00.0  issue課題#983を対応します.
 */

const path = 'Reservation/FetchDateList'

export default {
  name: 'ConfigSelect',
  data () {
    return {
      headquartersAuthority: 1,
      targetStoreCodes: [],
      settingItems: [],
      isLoading: false
    }
  },
  props: [
    'paramTargetStoreCodes'
  ],
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
    addPlan () {
      if (this.targetStoreCodes.length > 0) {
        this.goToEdit(null)
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a0.W001'), '', false, () => {
        }, false, null)
      }
    },
    changedStore (storeIds) {
      this.getReservationDates(storeIds[0])
    },
    getReservationDates (nodeId) {
      // G002.00.0 Add start
      this.settingItems = []
      // G002.00.0 Add end
      // G005.00.0 Update-Start
      // this.isLoading = true
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W016'), '', false, null, false, null)
      // G005.00.0 Update-End
      axios.put(this.$i18n.t('prop.url') + path, {
        nodeId: nodeId,
        excludeFields: true
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          // G005.00.0 Update-Start
          // this.isLoading = false
          this.$refs.pop.closeFunction()
          // G005.00.0 Update-End
          if (response.data.responseModel) {
            response.data.responseModel.filter(item => {
              return item.configurationType === 'BARCODE_SETTINGS'
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
          this.isLoading = false
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
  // G004.00.0 Delete-Start
  // mounted() {
  //   if (this.paramTargetStoreCodes) {
  //     // G001.00.0 Update-Start
  //     // this.targetStoreCodes = this.paramTargetStoreCodes
  //     // this.changedStore(this.targetStoreCodes)
  //     this.$root.$once('getHeadquartersAuthority', (headquartersAuthority) => {
  //       if (headquartersAuthority == 1) {
  //         this.targetStoreCodes = this.paramTargetStoreCodes
  //         this.changedStore(this.targetStoreCodes)
  //       }
  //     })
  //     // G001.00.0 Update-End
  //   }
  // },
  // G004.00.0 Delete-End
  created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322a0'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
