import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
// KSD V001.000 AS
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
// KSD V001.000 AE

// KSD V001.000 DS
// const path = 'Reservation/FetchDateList'
// KSD V001.000 DE
// KSD V001.000 AS
const RESERVATION_FETCH_CONFIGURATION_RECURSIVE = 'Reservation/FetchConfigurationRecursive'
const RESERVATION_FETCH_DATE_LIST = 'Reservation/FetchDateList'
const RESERVATION_FETCH_DETAIL = 'Reservation/FetchDetail'
// KSD V001.000 AE

export default {
  name: 'ConfigSelect',
  // KSD V001.000 AS
  mixins: [errorMappingUtils],
  props: {
    value: {
      type: String,
      required: true
    },
    storeSelectLabel: {
      type: String,
      required: true
    },
    configsTableTitle: {
      type: String,
      required: true
    },
    sortDate: {
      type: Boolean,
      default: false
    },
    showTableOnLoad: {
      type: Boolean,
      default: false
    },
    userDataModel: {
      type: [Object],
      default: {}
    }
  },
  // KSD V001.000 AE
  data () {
    return {
      // KSD V001.000 DS
      // headquartersAuthority: 1,
      // KSD V001.000 DE
      targetStoreCodes: [],
      settingItems: [
        {executionDate: '現在の設定'}
      ],
      // KSD V001.000 DS
      // isShowDatePart: false
      // KSD V001.000 DE
      // KSD V001.000 AS
      sessionUserData: this.userDataModel,
      showConfigsTable: this.showTableOnLoad,
      disableAddButton: true,
      businessDayStartTime: ''
      // KSD V001.000 AS
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect
    // KSD V001.000 AS
    , FormGroupLayout
    // KSD V001.000 AE
  },
  methods: {
    openEdit (itemIndex) {
      if (itemIndex < 0) {
        this.goToEdit()
      } else {
        this.goToEdit(this.settingItems[itemIndex].executionDate)
      }
    },
    // KSD V001.000 DS
    // async initialize (nodeId) {
    //   axios.put(this.$i18n.t('prop.url') + path, {
    //     nodeId: nodeId,
    //     excludeFields: true
    //   }, commonUtils.methods.getApiHeader())
    //     .then(response => {
    //       console.log(response)
    //       response.data.responseModel.filter(item => {
    //         return item.configurationType === 'REVENUE_STAMP_SETTINGS'
    //       }).forEach(item => {
    //         this.settingItems.push(item)
    //       })
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    // goToEdit (dateText) {
    // KSD V001.000 DE
    async goToEdit (dateText) {
      const typeOfSetting =
        dateText === '現在の設定' ? 'current'
          : dateText === null ? 'new'
            : new Date(dateText) < new Date() ? 'past'
              : 'future'

      // KSD V001.000 DS
      // this.$router.push({
      //   name: this.$route.name + '-edit',
      //   params: {
      //     targetStoreCodes: this.targetStoreCodes,
      //     typeOfSetting: typeOfSetting,
      //     propChangeDateText: dateText
      //   }
      // })
      // KSD V001.000 DE
      // KSD V001.000 AS
      switch (typeOfSetting) {
        case 'current':
        case 'new':
          await this.putReservationFetchConfigRecursive(this.targetStoreCodes[0], false, dateText, typeOfSetting)
          break
        case 'past':
        case 'future':
          await this.putReservationFetchDetail(this.targetStoreCodes[0], dateText, typeOfSetting)
      }
      // KSD V001.000 AE
    },
    async closeTab () {
      this.$router.push('/TopPage')
    },
    async addPlan () {
      if (this.targetStoreCodes.length > 0) {
        this.goToEdit(null)
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a4.W002'), '', false, null, false, null)
      }
    },
    // KSD V001.000 DS
    // changedStore () {
    //   this.isShowDatePart = true
    //   this.initialize(this.targetStoreCodes[0])
    // }
    // KSD V001.000 DE
    // KSD V001.000 AS
    // 予約内容取得処理 の「現在の設定」 |  PUT Reservation/FetchConfigurationRecursive
    async putReservationFetchConfigRecursive (nodeId, onLoad = true, dateText = null, typeOfSetting = '') {
      await axios.put(
        `${this.$i18n.t('prop.url')}${RESERVATION_FETCH_CONFIGURATION_RECURSIVE}`,
        {
          nodeId: nodeId,
          excludeFields: false,
          type: this.configType
        },
        commonUtils.methods.addApiHeader({ params: null }))
        .then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (onLoad) {
                this.businessDayStartTime = response.data.responseModel.configurations.BUSINESS_DAY_START_TIME.value
              } else {
                this.configDataModel = {
                  configuration: {...response.data.responseModel},
                  mode: 0,
                  nodeId: this.targetStoreCodes[0],
                  type: this.value
                }
                this.$router.push({
                  name: this.$route.name + '-edit',
                  params: {
                    targetStoreCodes: this.targetStoreCodes,
                    typeOfSetting: typeOfSetting,
                    propChangeDateText: dateText,
                    configDataModel: this.configDataModel,
                    businessDayStartTime: this.businessDayStartTime
                  }
                })
              }
              break
            case 204:// 204:該当する情報なし
              this.settingItems = [this.settingItems[0]]
              if (onLoad) {
                this.disableAddButton = false
                this.showConfigsTable = false
              }
              throw response
            default: // その他
              if (onLoad) {
                this.showConfigsTable = false
              }
              throw response
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
        }).catch(async (error) => {
          console.error(error)
          this.globalErrorMapping2(error.data.result)
        })
    },
    // 予約内容取得処理(既存予約) |  PUT Reservation/FetchDetail
    async putReservationFetchDetail (nodeId, dateText, typeOfSetting) {
      await axios.put(
        `${this.$i18n.t('prop.url')}${RESERVATION_FETCH_DETAIL}`,
        {
          nodeId: nodeId,
          excludeFields: false,
          type: this.value,
          executionDate: dateText
        },
        commonUtils.methods.addApiHeader({
          params: null
        })
      ).then((response) => {
        switch (response.data.result.code) {
          case 0:
            this.configDataModel = {
              configuration: {...response.data.responseModel[0]},
              executionDate: dateText,
              nodeId: this.targetStoreCodes[0],
              type: this.value
            }
            this.$router.push({
              name: this.$route.name + '-edit',
              params: {
                targetStoreCodes: this.targetStoreCodes,
                typeOfSetting: typeOfSetting,
                propChangeDateText: dateText,
                configDataModel: this.configDataModel,
                businessDayStartTime: this.businessDayStartTime
              }
            })
            break
          default:
            throw response
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        console.error(error)
        this.globalErrorMapping2(error.data.result)
      })
    },
    // 予約日付取得処理
    async fetchReservationDateList (nodeId) {
      await this.masterDataQuery(
        RESERVATION_FETCH_DATE_LIST,
        {
          nodeId: nodeId,
          excludeFields: true
        },
        null,
        (responseModel) => {
          const configurationType = this.value
          const dateList = responseModel
            .filter(item => item.configurationType === configurationType)
            .map(({ executionDate }) => ({ executionDate }))
          if (this.sortDate) {
            this.settingItems = [this.settingItems[0], ...dateList.sort((a, b) => b.executionDate.localeCompare(a.executionDate))]
          } else {
            this.settingItems = [this.settingItems[0], ...dateList]
          }
          this.disableAddButton = false
          this.showConfigsTable = true
        }
      ).then((values) => {
        /* NO-OP */
      }, (error) => {
        this.targetStoreCodes = []
        console.error(error)
      }).catch((error) => {
        this.targetStoreCodes = []
        console.error(error)
      })
    },
    async masterDataQuery (url, requestPayload, queryParams, successCallback) {
      return new Promise((resolve, reject) => {
        axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (successCallback != null) {
                successCallback(response.data.responseModel)
              }
              resolve(response)
              break
            case 204:// 204:該当する情報なし
              this.settingItems = [this.settingItems[0]]
              this.disableAddButton = false
              this.showConfigsTable = true
              resolve(response)
              break
            default: // その他
              this.showConfigsTable = false
              this.globalErrorMapping(response.data.result)
              reject(response)
              break
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        }).catch(async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        })
      })
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    }
    // KSD V001.000 AE
  },

  // KSD V001.000 DS
  // created () {
  //   document.title = this.$root.title = this.$route.meta.title
  //   this.$root.winId = 'F322a4'
  //   window.addEventListener('beforeunload', this.confirmUnload)
  // },
  // mounted () {
  // },
  // destroyed () {
  //   window.removeEventListener('beforeunload', this.confirmUnload)
  // }
  // KSD V001.000 DE
  // KSD V001.000 AS
  watch: {
    targetStoreCodes (nodeIds) {
      if (nodeIds.length === 1) {
        this.putReservationFetchConfigRecursive(nodeIds[0]).then(() => {
          this.fetchReservationDateList(nodeIds[0])
        })
      }
    }
  },
  async mounted () {
    this.focusFirstFocusableElement()
    if (this.$route.params.targetStoreCodes) {
      this.targetStoreCodes = this.$route.params.targetStoreCodes
    }
  }
  // KSD V001.000 AE
}
