//  KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import roomSelect from '@/resource/templates/RoomInfoSubSetting/RoomSelect'
import WeekdayDivisionSelect from '@/resource/templates/RoomInfoSubSetting/WeekdayDivisionSelect'
import TimeDivisionRow from '@/resource/templates/RoomInfoSubSetting/TimeDivisionRow'
import CommonSelectDialog from '@/resource/templates/CommonDesign/CommonSelectDialog'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import moment from 'moment'
import transformUtils from '@/resource/static/js/Common/transformUtils'

const RestaurantsTableQuery = 'RestaurantsTable/Query'
const RentalsWeekdayDivisionQuery = 'RentalsWeekdayDivision/Query'
const RentalsRoomsubQuery = 'RentalsRoomsub/Query'
const RentalsRoomsubUpdate = 'RentalsRoomsub/Update'

const DEFAULT_TIMESETTING = {
  nodeId: '',
  indexNo: 0,
  tblNo: '',
  weekdayCode: 0,
  timeDivision1: {
    applyingTime: {
      start: '',
      end: ''
    },
    minCount: ''
  },
  timeDivision2: {
    applyingTime: {
      start: '',
      end: ''
    },
    minCount: ''
  },
  timeDivision3: {
    applyingTime: {
      start: '',
      end: ''
    },
    minCount: ''
  },
  timeDivision4: {
    applyingTime: {
      start: '',
      end: ''
    },
    minCount: ''
  }
}

export default {
  name: 'RoomInfoSubSetting',
  mixins: [transformUtils],
  props: {
  },
  components: {
    maintButton,
    popup,
    storeSelect,
    roomSelect,
    WeekdayDivisionSelect,
    TimeDivisionRow,
    CommonSelectDialog,
    FormGroupLayout
  },
  data () {
    return {
      masterRooms: [],
      masterWeekdayDivisions: [],
      masterSubTimeSettings: [],

      copyMasterWeekdayDivisions: [],

      targetStoreCodes: [],
      targetRoom: [],
      targetWeekdayCode: 0,

      timeSetting: JSON.parse(JSON.stringify(DEFAULT_TIMESETTING)),
      refTimeSetting: JSON.parse(JSON.stringify(DEFAULT_TIMESETTING)),

      disabledSaveBtn: true,
      disabledInputs: true,
      disabledEditBtn: true,
      disabledParamPanel: false,
      disabledCopyBtn: true,
      disabledCloseBtn: false,
      focusItem: null,
      showDetailPanels: false,
      isEditing: false
    }
  },
  computed: {
    isParamsSelected () {
      if (this.targetRoom.length > 0 && this.targetWeekdayCode > 0) return true
      return false
    },
    isTimeModified () {
      if (this.refTimeSetting !== JSON.stringify(this.timeSetting)) return true
      return false
    },
    isStoreSelected () {
      if (this.targetStoreCodes && this.targetStoreCodes > 0 &&
        (this.masterRooms.length > 0 && this.masterWeekdayDivisions.length > 0)) {
        return true
      }
      return false
    }
  },
  methods: {
    mapValues (objA, objB) {
      const mappedObject = Object.assign({}, objB)

      for (let key in objA) {
        if (objB.hasOwnProperty(key)) {
          mappedObject[key] = objA[key]
        }
      }

      return mappedObject
    },

    init () {
      this.masterRooms = []
      this.masterWeekdayDivisions = []
      this.masterSubTimeSettings = []
      this.targetRoom = []
      this.targetWeekdayCode = 0
      this.viewMode()
    },

    async handleStoreChange (store) {
      if (this.$refs.roomSelectDialog) {
        this.$refs.roomSelectDialog.clearRoomSelect()
      }
      if (this.$refs.weekdayDivisionSelectOption) {
        this.$refs.weekdayDivisionSelectOption.weekdayDivision = {}
      }
      this.init()
      if (store.length <= 0) {
        return
      }
      let storeAuthority = this.$refs.storeSelect.headquartersAuthority === 1

      await this.getRooms()
        .then(() => this.getWeekdayDivisions())
        .then(() => this.getTimeSettingRecords())
        .then(() => {
          this.showDetailPanels = true
          this.timeSetting = JSON.parse(JSON.stringify(DEFAULT_TIMESETTING))
          if (!storeAuthority) {
            this.focusFirstFocusableElement()
          }
        })
        .catch((error) => {
          this.targetStoreCodes = []
          this.showDetailPanels = false
          this.globalErrorMapping(error)
          console.error(error)
        })
    },

    async handleRoomChange () {
      if (this.targetWeekdayCode !== 0) {
        this.parameterChanged()
      }
    },

    handleWeekdaySelection (val) {
      this.targetWeekdayCode = val
      this.copyMasterWeekdayDivisions = this.masterWeekdayDivisions.filter(
        weekdays => weekdays.weekdayCode !== this.targetWeekdayCode
      )
      if (this.targetRoom.length > 0) this.parameterChanged()
    },

    getRoomSubSetting () {
      const subSetting = this.masterSubTimeSettings.find(timeSetting =>
        timeSetting.indexNo === this.targetRoom[0].indexNo &&
        timeSetting.tblNo === this.targetRoom[0].tblNo &&
        timeSetting.weekdayCode === this.targetWeekdayCode
      )
      const defaultTimeSettingCopy = JSON.parse(JSON.stringify(DEFAULT_TIMESETTING))
      if (this.isParamsSelected) {
        const defaultTimeValues = {
          applyingTime: {
            start: '0000',
            end: '0000'
          },
          minCount: ''
        }

        defaultTimeSettingCopy.timeDivision1 = JSON.parse(JSON.stringify(defaultTimeValues))
        defaultTimeSettingCopy.timeDivision2 = JSON.parse(JSON.stringify(defaultTimeValues))
        defaultTimeSettingCopy.timeDivision3 = JSON.parse(JSON.stringify(defaultTimeValues))
        defaultTimeSettingCopy.timeDivision4 = JSON.parse(JSON.stringify(defaultTimeValues))
      }

      if (subSetting) {
        this.isEditing = true
        delete subSetting.createTimestamp
        delete subSetting.lastModifiedTimestamp
        delete subSetting.lastModifiedUserId
        delete subSetting._id
        return {...subSetting}
      }
      this.isEditing = false
      return defaultTimeSettingCopy
    },

    isCopyAllowed () {
      const subSetting = this.getRoomSubSetting()
      const defaultTimeSettingCopy = JSON.parse(JSON.stringify(DEFAULT_TIMESETTING))
      if (this.isParamsSelected) {
        const defaultTimeValues = {
          applyingTime: {
            start: '0000',
            end: '0000'
          },
          minCount: ''
        }

        defaultTimeSettingCopy.timeDivision1 = JSON.parse(JSON.stringify(defaultTimeValues))
        defaultTimeSettingCopy.timeDivision2 = JSON.parse(JSON.stringify(defaultTimeValues))
        defaultTimeSettingCopy.timeDivision3 = JSON.parse(JSON.stringify(defaultTimeValues))
        defaultTimeSettingCopy.timeDivision4 = JSON.parse(JSON.stringify(defaultTimeValues))
      }
      if (JSON.stringify(subSetting) === JSON.stringify(defaultTimeSettingCopy)) return true
      return false
    },

    viewMode () {
      this.disabledEditBtn = !this.isParamsSelected
      this.disabledParamPanel = false
      this.disabledInputs = true
      this.disabledSaveBtn = true
      this.disabledCopyBtn = this.isCopyAllowed()
      this.disabledCloseBtn = false
    },

    editMode () {
      this.disabledEditBtn = true
      this.disabledParamPanel = true
      this.disabledCopyBtn = true
      this.disabledSaveBtn = false
      this.disabledInputs = false
      this.disabledCloseBtn = true
      this.focusFirstFocusableElement()
    },

    async parameterChanged () {
      const subSetting = this.getRoomSubSetting()
      this.timeSetting = subSetting
      this.refTimeSetting = JSON.stringify(subSetting)
      this.viewMode()
    },

    async handleEditTimeSettingPanel () {
      this.editMode()
    },

    handleCancel () {
      this.$refs.pop.open(1, '',
        this.$i18n.t('O00004.W003'),
        '',
        true,
        () => {
          this.viewMode()
          this.timeSetting = JSON.parse(this.refTimeSetting)
          this.timeDivisionsResetErrors()
        },
        false,
        () => {})
    },

    backToTop () {
      this.$router.push('/TopPage')
    },

    assignDataModel (storeCd, indexNo, tblNo, weekdayCode, timeDivision1, timeDivision2, timeDivision3, timeDivision4) {
      return {
        nodeId: storeCd,
        indexNo: indexNo,
        tblNo: tblNo,
        weekdayCode: weekdayCode,
        timeDivision1: timeDivision1,
        timeDivision2: timeDivision2,
        timeDivision3: timeDivision3,
        timeDivision4: timeDivision4
      }
    },

    async handleSaveRoomSubSetting () {
      const data = this.assignDataModel(
        this.targetStoreCodes[0],
        this.targetRoom[0].indexNo,
        this.targetRoom[0].tblNo,
        this.targetWeekdayCode,
        this.timeSetting.timeDivision1,
        this.timeSetting.timeDivision2,
        this.timeSetting.timeDivision3,
        this.timeSetting.timeDivision4
      )

      if (this.isTimeOverlap()) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '-0099', false, this.setFocus, false, null)
        return
      }
      await this.saveRoomsubTimeSetting(this.isEditing ? this.timeSetting : data)
        .then(async () => {
          await this.getTimeSettingRecords(0, true)
            .then(() => {
              this.timeSetting = this.getRoomSubSetting()
              this.viewMode()
              this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
            }).catch((error) => {
              this.targetStoreCodes = []
              this.showDetailPanels = false
              this.init()
              this.globalErrorMapping(error)
              console.error(error)
            })
        })
        .catch((error) => {
          this.globalErrorMapping(error)
          console.error(error)
        })
    },

    globalErrorMapping (result) {
      let message = this.$t('O00004.W010')
      if (result == null) {
        this.$refs.pop.open(3, '', message, '', false, null, false, null)
        return
      }
      if (result.response && result.response.status === 404) {
        this.showDetailPanels = false
        this.init()
        this.$refs.pop.open(3, '', message, '', false, null, false, null)
        return
      }
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.disabledParamPanel = true
          this.$router.push('/LoginPage')
        }, false, null)
      // KSD V001.000 AS refs #82914(テーブルマスタ または 曜日区分マスタの設定が空の場合のエラー変更対応)
      } else if (result.code === 2) {
          this.$refs.pop.open(3, '', this.$i18n.t('C00221.E007'), '', false, null, false, null)
      // KSD V001.000 AE refs #82914(テーブルマスタ または 曜日区分マスタの設定が空の場合のエラー変更対応)
      } else if (result.code !== 0) {
        if (result && result.errorMessageMap && result.errorMessageMap.global) {
          this.$refs.pop.open(3, '', `${result.errorMessageMap['global']}`, result.code, false, null, false, null)
          return
        }
        this.$refs.pop.open(3, '', message, '', false, null, false, null)
      }
    },

    transformDataList (arrList, dataKeys) {
      return arrList.map(item => {
        return {
          code: item[dataKeys[0]],
          name: item[dataKeys[1]]
        }
      })
    },

    async handleCopyBtn () {
      if (this.$refs.commonSelectDialog) {
        this.weekdayCopyDataModel = this.transformDataList(this.copyMasterWeekdayDivisions, ['weekdayCode', 'weekdayName'])
        this.$refs.commonSelectDialog.open(this.weekdayCopyDataModel, [], true)
      }
    },

    async handleCopyRoomSubSetting (weekdayList) {
      if (!weekdayList || weekdayList.length === 0) {
        return
      }

      if (this.isTimeOverlap()) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '', false, this.setFocus, false, null)
        return
      }
      let copyFuncList = []

      for (const weekdayCode of weekdayList) {
        const data = this.assignDataModel(
          this.targetStoreCodes[0],
          this.targetRoom[0].indexNo,
          this.targetRoom[0].tblNo,
          weekdayCode,
          this.timeSetting.timeDivision1,
          this.timeSetting.timeDivision2,
          this.timeSetting.timeDivision3,
          this.timeSetting.timeDivision4
        )
        try {
          copyFuncList.push(this.saveRoomsubTimeSetting(data))
        } catch (error) {
          this.globalErrorMapping(JSON.parse(error.message))
          return
        }
      }
      await Promise.all([...copyFuncList])
        .then(async () => {
          this.$refs.commonSelectDialog.dialog = false
          await this.getTimeSettingRecords(0, true)
            .then(() => {
              this.timeSetting = this.getRoomSubSetting()
              this.viewMode()
              this.$refs.pop.open(2, '', this.$i18n.t('C00221.W001'), '', false, null, false, null)
            })
            .catch((error) => {
              this.showDetailPanels = false
              this.init()
              this.globalErrorMapping(error)
            })
        })
        .catch((error) => {
          this.globalErrorMapping(error)
        })
    },

    timeDivisionsResetErrors () {
      const divisions = [
        this.$refs.timeDivision1,
        this.$refs.timeDivision2,
        this.$refs.timeDivision3,
        this.$refs.timeDivision4
      ]

      for (let i = 0; i < divisions.length - 1; i++) {
        divisions[i].noValueOnSave = false
        divisions[i + 1].noValueOnSave = false
        divisions[i].$refs.startTimeInput.invalidTime = false
        divisions[i].$refs.endTimeInput.invalidTime = false
        divisions[i + 1].$refs.startTimeInput.invalidTime = false
        divisions[i + 1].$refs.endTimeInput.invalidTime = false
      }
      return divisions
    },

    isTimeOverlap () {
      const divisions = this.timeDivisionsResetErrors()
      let focusable = []
      let result = false
      for (let i = 0; i < divisions.length - 1; i++) {
        const currentDivision = divisions[i]
        const nextDivision = divisions[i + 1]

        const currentDivisionStartTime = this.getTimeAsInt(currentDivision.$refs.startTimeInput.time)
        const currentDivisionEndTime = this.getTimeAsInt(currentDivision.$refs.endTimeInput.time)
        const nextDivisionStartTime = this.getTimeAsInt(nextDivision.$refs.startTimeInput.time)
        const nextDivisionEndTime = this.getTimeAsInt(nextDivision.$refs.endTimeInput.time)
        const lastDivisionStartTime = this.getTimeAsInt(this.$refs.timeDivision4.$refs.startTimeInput.time)
        const lastDivisionEndTime = this.getTimeAsInt(this.$refs.timeDivision4.$refs.endTimeInput.time)

        if (i === 0 && currentDivisionStartTime === 0 && currentDivisionEndTime === 0 && currentDivision.$refs.minCount.value !== '') {
          currentDivision.$refs.endTimeInput.invalidTime = true
          focusable.push(currentDivision.$refs.endTimeInput.$el)
          result = true
        }

        if (currentDivisionStartTime >= currentDivisionEndTime &&
          (currentDivisionStartTime !== 0 && currentDivisionEndTime !== 0) &&
          (nextDivisionStartTime > 0 && nextDivisionStartTime > 0)) {
          currentDivision.$refs.endTimeInput.invalidTime = true
          focusable.push(currentDivision.$refs.endTimeInput.$el)
          result = true
        }

        if ((currentDivisionStartTime === 0 && currentDivisionEndTime === 0) &&
          (nextDivisionStartTime > 0 && nextDivisionStartTime > 0)) {
          nextDivision.$refs.startTimeInput.invalidTime = true
          nextDivision.$refs.endTimeInput.invalidTime = true
          focusable.push(nextDivision.$refs.startTimeInput.$el)
          result = true
        }

        if (currentDivisionStartTime > currentDivisionEndTime) {
          currentDivision.$refs.endTimeInput.invalidTime = true
          focusable.push(currentDivision.$refs.endTimeInput.$el)
          result = true
        }

        if (nextDivisionStartTime <= currentDivisionEndTime && nextDivisionStartTime !== 0) {
          currentDivision.$refs.endTimeInput.invalidTime = true
          nextDivision.$refs.startTimeInput.invalidTime = true
          focusable.push(currentDivision.$refs.endTimeInput.$el)
          result = true
        }

        if (currentDivisionEndTime > 0 && nextDivisionStartTime === 0 && nextDivision.$refs.minCount.value !== '') {
          nextDivision.$refs.startTimeInput.invalidTime = true
          focusable.push(nextDivision.$refs.startTimeInput.$el)
          result = true
        }

        if ((currentDivisionStartTime > 0 && currentDivisionEndTime > 0) &&
          (nextDivisionStartTime === 0 && nextDivisionEndTime === 0) &&
          (lastDivisionStartTime > 0)) {
          this.$refs.timeDivision4.$refs.startTimeInput.invalidTime = true
          this.$refs.timeDivision4.$refs.endTimeInput.invalidTime = true
          focusable.push(this.$refs.timeDivision4.$refs.startTimeInput.$el)
          result = true
        }

        if (currentDivisionStartTime === currentDivisionEndTime && currentDivision.$refs.minCount.value !== '') {
          currentDivision.$refs.endTimeInput.invalidTime = true
          focusable.push(currentDivision.$refs.endTimeInput.$el)
          result = true
        }

        if ((currentDivision.$refs.minCount.value === '' || parseInt(currentDivision.$refs.minCount.value) === 0) &&
        (currentDivisionStartTime > 0 || currentDivisionEndTime > 0)) {
          currentDivision.noValueOnSave = true
          focusable.push(currentDivision.$refs.minCount)
          result = true
        }

        if (currentDivisionStartTime === 0 && currentDivisionEndTime === 0 && currentDivision.$refs.minCount.value !== '') {
          currentDivision.noValueOnSave = true
          focusable.push(currentDivision.$refs.minCount)
          result = true
        }

        if (lastDivisionStartTime > lastDivisionEndTime) {
          this.$refs.timeDivision4.$refs.endTimeInput.invalidTime = true
          focusable.push(this.$refs.timeDivision4.$refs.endTimeInput.$el)
          result = true
        }

        if (lastDivisionEndTime <= lastDivisionStartTime && (lastDivisionStartTime !== 0 && lastDivisionEndTime !== 0)) {
          this.$refs.timeDivision4.$refs.endTimeInput.invalidTime = true
          focusable.push(this.$refs.timeDivision4.$refs.endTimeInput.$el)
          result = true
        }

        if (lastDivisionEndTime === 0 && lastDivisionStartTime === 0 && this.$refs.timeDivision4.$refs.minCount.value > 0) {
          this.$refs.timeDivision4.noValueOnSave = true
          focusable.push(this.$refs.timeDivision4.$refs.minCount)
          result = true
        }

        if (((this.$refs.timeDivision4.$refs.minCount.value === '' || parseInt(this.$refs.timeDivision4.$refs.minCount.value) === 0) && (lastDivisionStartTime > 0 || lastDivisionEndTime > 0)) ||
            (lastDivisionEndTime === 0 && lastDivisionStartTime === 0 && this.$refs.timeDivision4.$refs.minCount.value > 0)) {
          this.$refs.timeDivision4.noValueOnSave = true
          focusable.push(this.$refs.timeDivision4.$refs.minCount)
          result = true
        }
      }
      this.focusItem = (focusable[0])
      return result
    },
    getTimeAsInt (timeString) {
      const time = moment(timeString, 'HHmm')
      const minutesSinceMidnight = time.diff(moment().startOf('day'), 'minutes')
      return parseInt(minutesSinceMidnight)
    },

    async postRequest (apiUrl, params) {
      return axios.post(`${this.$i18n.t('prop.url')}${apiUrl}`, params, commonUtils.methods.addApiHeader({}))
        .then((response) => {
          return response
        }, (error) => {
          throw error
        })
        .catch((error) => {
          throw error
        })
    },

    async getRooms () {
      this.masterRooms = []
      const params = {
        nodeId: this.targetStoreCodes[0],
        IndexNo: 0,
        orderBy: 'IndexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      await this.postRequest(RestaurantsTableQuery, params)
        .then((response) => {
          switch (response.data.result.code) {
            case 0:
              if (response.data.responseModel !== null) {
                this.masterRooms = response.data.responseModel.map(room => this.uncapitalizeKeys(room))
                this.masterRooms = this.masterRooms.filter(room => {
                  if ((room.tblName !== '') && (room.tblNo !== '')) return room
                })
              } else {
                throw response.data.responseModel
              }
              break
            default:
              throw response.data.result
          }
        })
    },

    async getWeekdayDivisions (weekdayCode = 0) {
      this.masterWeekdayDivisions = []
      const params = {
        nodeId: this.targetStoreCodes[0],
        weekdayCode: weekdayCode,
        orderBy: 'weekdayCode',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      await this.postRequest(RentalsWeekdayDivisionQuery, params)
        .then((response) => {
          switch (response.data.result.code) {
            case 0:
              if (response.data.responseModel !== null) {
                this.masterWeekdayDivisions = response.data.responseModel
              } else {
                throw response.data.responseModel
              }
              break
            default:
              throw response.data.result
          }
        })
    },

    async getTimeSettingRecords (indexNo = 0, isSave = false) {
      this.masterSubTimeSettings = []
      const params = {
        nodeId: this.targetStoreCodes[0],
        indexNo: indexNo,
        orderBy: 'indexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }

      await this.postRequest(RentalsRoomsubQuery, params)
        .then((response) => {
          switch (response.data.result.code) {
            case 0:
              if (response.data.responseModel !== null) {
                this.masterSubTimeSettings = response.data.responseModel
              } else {
                throw response.data.responseModel
              }
              break
            case 2:
              if (isSave) throw response.data.result
              else break
            default:
              throw response.data.result
          }
        })
    },

    async saveRoomsubTimeSetting (payload) {
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      const existingData = this.masterSubTimeSettings.find(timeSetting =>
        timeSetting.indexNo === payload.indexNo &&
        timeSetting.tblNo === payload.tblNo &&
        timeSetting.weekdayCode === payload.weekdayCode
      )
      if (existingData) payload.version = existingData.version

      await this.postRequest(RentalsRoomsubUpdate, payload)
        .then((response) => {
          switch (response.data.result.code) {
            case 0:
              break
            default:
              throw response.data.result
          }
        })
    },

    async confirmUnload (event) {
      if (this.disabledParamPanel) {
        event.preventDefault()
        event.returnValue = ''
      }
    },
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    }
  },
  created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'C00221'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    let authority = this.$refs.storeSelect.headquartersAuthorityCheckEnable
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 200)
  }
}
//  KSD V001.000 AE
