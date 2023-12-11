/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221222  dingxin(Neusoft)  G001.00.0  issue課題#1212を対応します.
 * 20230209  dingxin(Neusoft)  G002.00.0  issue課題#1225を対応します.
 * 20230228  dingxin(Neusoft)  G003.00.0  issue課題#1584を対応します.
 * 20230506  wangchunmei(Neusoft)  G004.00.0  issue課題#908を対応します.
 * 20231013  hql(Neusoft)          G005.00.0  issue課題#1502を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import axios from 'axios'
import commonUtils from '../Common/commonUtils'

const path = 'Reservation/FetchDateList'
export default {
  name: 'ConfigSelect',
  data () {
    return {
      headquartersAuthority: 1,
      targetStoreCodes: [],
      // G002.00.0 Update start
      // settingItems: [
      //   {executionDate: '現在の設定'}
      // ],
      settingItems: []
      // G002.00.0 Update end
      // G004.00.0 Delete-Start
      // isShowDatePart: false
      // G004.00.0 Delete-End
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
    async initialize (nodeId) {
      // G002.00.0 Add start
      this.settingItems = []
      // G002.00.0 Add end
      axios.put(this.$i18n.t('prop.url') + path, {
        nodeId: nodeId,
        excludeFields: true
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          console.log(response)
          // G002.00.0 Update start
          //   response.data.responseModel.filter(item => {
          //     return item.configurationType === 'REVENUE_STAMP_SETTINGS'
          //   }).forEach(item => {
          //     this.settingItems.push(item)
          //   })
          // })
          // .catch(error => {
          //   console.log(error)
          // })
          if (response.data.responseModel) {
            response.data.responseModel.filter(item => {
              return item.configurationType === 'REVENUE_STAMP_SETTINGS'
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
          // if(response.data.result.code == -10) {
          //   this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // }
          // this.settingItems = []
          //   this.targetStoreCodes = []
          //   this.searchErrorMapping(response.data.result)
          // G003.00.0 Update end
          }
        })
        .catch(error => {
          this.targetStoreCodes = []
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
      // G002.00.0 Update end
    },
    // G002.00.0 Update start
    // goToEdit (dateText) {
    goToEdit (dateText = '現在の設定') {
    // G002.00.0 Update end
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
    // G001.00.0 Update-Start
    // async addPlan () {
    //   this.goToEdit(null)
    // },
    async addPlan () {
      if (this.targetStoreCodes.length > 0) {
        this.goToEdit(null)
      } else {
        // G005.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F322a4.W002'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('F322a4.W005'), '', false, null, false, null)
        // G005.00.0 Update-End
      }
    },
    // G001.00.0 Update-End
    changedStore () {
      // G004.00.0 Delete-Start
      // this.isShowDatePart = true
      // G004.00.0 Delete-End
      this.initialize(this.targetStoreCodes[0])
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
    this.$root.winId = 'F322a4'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  mounted () {
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
