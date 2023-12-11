// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import moment from 'moment'
import errorMessage from '@/resource/templates/CommonDesign/CommonErrorMessageHandler'
import transformUtils from '@/resource/static/js/Common/transformUtils'

const savePath = 'RentalsRoomInformation/Update'
const deletePath = 'RentalsRoomInformation/Delete'
const roomInfoQuery = 'RentalsRoomInformation/Query'
const modelQuery = 'RentalsModel/Query'
const equipmentQuery = 'RentalsEquipment/Query'
const roomQuery = 'RestaurantsTable/Query'

const DEFAULT_FORM_ERRORS = {
  tableNo: '',
  modelNo: '',
  startDate: '',
  endDate: ''
}
const DEFAULT_ROOM_INFO = {
  tableNo: -1,
  modelNo: -1,
  startDate: '',
  endDate: ''
}

export default {
  props: [
    'targetStoreCd',
    'businessUnitCd'
  ],
  mixins: [transformUtils],
  data () {
    return {
      isDialogBoxOpen: false,
      boundEquipmentList: [],
      roomList: [],
      equipmentList: [],
      equipmentModelList: [],
      roomInfoList: [],
      title: '',
      mode: 1,
      indexNo: '',
      roomInfo: {
        tableNo: -1,
        modelNo: -1,
        startDate: '',
        endDate: ''
      },
      hasFetchErrors: false,
      formErrors: {},
      refreshFunc: Function,
      dataCheckFunc: Function,
      errorFields: null
    }
  },
  components: {
    popup,
    dateInput,
    errorMessage
  },
  methods: {
    async open (indexNo, searchedRoom, refreshFunc, closeFunc, dataCheckFunc) {
      this.clearErrors()
      // await this.fetchData()
      this.operationLock = false
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.dataCheckFunc = dataCheckFunc
      if (searchedRoom) {
        this.mode = this.MODE.EDIT
        this.indexNo = searchedRoom.indexNo
        this.roomInfo = searchedRoom
        this.title = this.$i18n.t('C00220.S014')
        this.roomInfo.startDate = this.formatDate(this.roomInfo.startDate)
        this.roomInfo.endDate = this.formatDate(this.roomInfo.endDate)
      } else {
        this.mode = this.MODE.ADD
        this.indexNo = indexNo
        this.roomInfo = { ...DEFAULT_ROOM_INFO }
        this.title = this.$i18n.t('C00220.S015')
      }
      this.isDialogBoxOpen = !this.hasFetchErrors
      this.$refs.tableNoInput.focus()
      setTimeout(() => {
        this.$refs.tableNoInput.focus()
      }, 50)
    },
    async fetchData () {
      try {
        this.roomList = await this.getRoomList()
        this.equipmentList = await this.getEquipmentList()
        this.equipmentModelList = await this.getModelList()
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async getModelList () {
      let response = await axios.post(`${this.$i18n.t('prop.url')}${modelQuery}`, {
        modelNo: 0,
        nodeId: this.businessUnitCd,
        orderBy: 'modelNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.getApiHeader())
      try {
        if (response.data.result.code === 0) {
          return response.data.responseModel
        } else if (response.data.result.code === 2) {
          return []
        } else {
          this.globalErrorMapping(response.data.result)
          throw new Error(response.data.result.message)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
        throw new Error(response.data.result.message)
      }
    },
    async getEquipmentList () {
      let response = await axios.post(`${this.$i18n.t('prop.url')}${equipmentQuery}`, {
        equipNo: 0,
        nodeId: this.businessUnitCd,
        orderBy: 'equipNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.getApiHeader())
      try {
        if (response.data.result.code === 0) {
          return response.data.responseModel
        } else if (response.data.result.code === 2) {
          return []
        } else {
          this.globalErrorMapping(response.data.result)
          throw new Error(response.data.result.message)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
        throw new Error(response.data.result.message)
      }
    },
    async getRoomList () {
      let response = await axios.post(`${this.$i18n.t('prop.url')}${roomQuery}`, {
        IndexNo: 0,
        nodeId: this.targetStoreCd,
        orderBy: 'IndexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.getApiHeader())
      try {
        if (response.data.result.code === 0) {
          let returnValue = response.data.responseModel.map(room => this.uncapitalizeKeys(room))
          returnValue = returnValue.filter(room => {
            if ((room.tblName !== '') && (room.tblNo !== '')) return room
          })
          return returnValue
        } else if (response.data.result.code === 2) {
          return []
        } else {
          this.globalErrorMapping(response.data.result)
          throw new Error(response.data.result.message)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
        throw new Error(response.data.result.message)
      }
    },
    formatDate (date) {
      return new moment(date).format('YYYY/MM/DD')
    },
    bindModelstoEquipment () {
      this.boundEquipmentList = []
      this.equipmentModelList.forEach(model => {
        this.boundEquipmentList.push({ model: model, equipment: this.getEquipment(model.equipNo) })
      })
    },
    getEquipment (equipNo) {
      let equipment = this.equipmentList.filter(equipment => equipment.equipNo == equipNo)[0]
      if (!equipment) {
        return { equipName: '' }
      }
      return equipment
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    popupConfirm () {
      this.closeFunc()
      this.isDialogBoxOpen = false
    },
    clearErrors () {
      this.hasFetchErrors = false
      this.formErrors = { ...DEFAULT_FORM_ERRORS }
    },
    validateDates () {
      let errorInputs = []
      let valid = true
      let startDate = moment(this.roomInfo.startDate, 'YYYY/MM/DD', true)
      let endDate = moment(this.roomInfo.endDate, 'YYYY/MM/DD', true)

      let errorMessages = {
        REQUIRED: this.$i18n.t('C00220.E009'),
        INVALID_RANGE: this.$i18n.t('C00220.E011')
      }

      if (!startDate.isValid()) {
        this.formErrors.startDate = errorMessages.REQUIRED
        errorInputs.push(this.$refs.startDate.$el.children.calendarImg)
        valid = false
      }
      if (!endDate.isValid()) {
        this.formErrors.endDate = errorMessages.REQUIRED
        errorInputs.push(this.$refs.endDate.$el.children.calendarImg)
        valid = false
      }
      if (errorInputs.length > 0) this.errorFields = errorInputs[0]

      if (valid == false) return
      if (endDate.isBefore(startDate)) {
        this.formErrors.endDate = errorMessages.INVALID_RANGE
        errorInputs.push(this.$refs.endDate.$el.children.calendarImg)
        valid = false
      }

      if (errorInputs.length > 0) this.errorFields = errorInputs[0]
      return valid
    },
    validateDropdowns () {
      let errorInputs = []
      let valid = true
      let { tableNo, modelNo } = this.roomInfo
      let roomListNos = []
      let modelListNos = []

      let errorMessages = {
        REQUIRED: this.$i18n.t('C00220.E009')
      }

      this.roomList.forEach((room) => {
        roomListNos.push(room.indexNo)
      })

      this.equipmentModelList.forEach((model) => {
        modelListNos.push(model.modelNo)
      })

      if (!roomListNos.includes(tableNo)) {
        this.formErrors.tableNo = errorMessages.REQUIRED
        errorInputs.push(this.$refs.tableNoInput)
        valid = false
      }
      if (!modelListNos.includes(modelNo)) {
        this.formErrors.modelNo = errorMessages.REQUIRED
        errorInputs.push(this.$refs.equipmentNo.children[0])
        valid = false
      }
      if (errorInputs.length > 0) this.errorFields = errorInputs[0]
      return valid
    },
    validateForm () {
      this.errorFields = null
      let valid = true
      if (!this.validateDates()) {
        valid = false
      }
      if (!this.validateDropdowns()) {
        valid = false
      }
      return valid
    },
    async getRoomInfoList () {
      let response = await axios.post(`${this.$i18n.t('prop.url')}${roomInfoQuery}`, {
        indexNo: 0,
        nodeId: this.targetStoreCd,
        orderBy: 'indexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.getApiHeader())
      try {
        if (response.data.result.code === 0) {
          return response.data.responseModel
        } else if (response.data.result.code === 2) {
          return []
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    async isUnique () {
      let valid = true
      let { tableNo, modelNo } = this.roomInfo
      let [startDate, endDate] = this.appendTimetoDates()
      let newStartDate = moment(startDate)
      let newEndDate = moment(endDate)

      let errorMessages = {
        DUPLICATE: this.$i18n.t('C00220.E010')
      }

      try {
        if (this.roomInfoList === undefined || this.roomInfoList.length === 0) {
          let roomList = await this.getRoomInfoList()
          if (roomList === undefined) return undefined
          this.roomInfoList = roomList
        }

        this.roomInfoList.forEach((roomInfo) => {
          if (roomInfo.indexNo === this.roomInfo.indexNo) return
          if (roomInfo.tableNo === tableNo && roomInfo.modelNo === modelNo) {
            let roomStartDate = moment(roomInfo.startDate)
            let roomEndDate = moment(roomInfo.endDate)
            if (newStartDate.isSame(roomStartDate, 'second') && newEndDate.isSame(roomEndDate, 'second')) {
              valid = false
              this.formErrors.tableNo = errorMessages.DUPLICATE
              this.formErrors.modelNo = errorMessages.DUPLICATE
              this.formErrors.startDate = errorMessages.DUPLICATE
              this.formErrors.endDate = errorMessages.DUPLICATE
            }
          }
        })
      } catch (e) {
        await this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        valid = undefined
      }
      return valid
    },
    async onClickSave () {
      this.clearErrors()
      let isValid = this.validateForm()

      if (!isValid) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '-0099', false, this.setFocus, false, null)
        return
      }

      let isUnique = await this.isUnique()
      if (isUnique === undefined) return
      if (!isUnique) {
        this.$refs.pop.open(3, '', this.$i18n.t('C00220.E012'), '-0099', false, null, false, null)
        return
      }

      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (await this.executeSave() === true) {
        if (await this.refreshFunc() === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => {
            this.dataCheckFunc()
          }, false, null)
          this.roomInfoList = undefined
          this.closeFunc()
          this.isDialogBoxOpen = false
        } else {
          this.roomInfoList = undefined
          this.$refs.pop.closeFunction()
        }
      }
    },
    async executeSave () {
      let result = false
      // 新規モードの場合にtrue,編集モードの場合にfalseを設定する
      // let isMasterCreate = this.mode === 1
      let [formattedStartDate, formattedEndDate] = this.appendTimetoDates()
      try {
        let params = {
          ...this.roomInfo,
          nodeId: this.targetStoreCd,
          // tableNo: 0, //this.roomInfo.chargeCode,
          indexNo: this.indexNo,
          tableNo: this.roomInfo.tableNo,
          startDate: formattedStartDate,
          endDate: formattedEndDate
        }

        // KSD V001.000 AS 更新パラメータに余計なフィールドが含まれていてエラーになる対応
        delete params.createTimestamp
        delete params.lastModifiedTimestamp
        delete params.lastModifiedUserId
        delete params._id
        // KSD V001.000 AE 更新パラメータに余計なフィールドが含まれていてエラーになる対応

        // 保存
        let response = await axios.post(`${this.$i18n.t('prop.url')}${savePath}`, params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    async onClickDelete () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.runDelete, false, null)
    },
    async runDelete () {
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // 削除
      if (await this.executeDelete() === true) {
        if (await this.refreshFunc() === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => {
            this.dataCheckFunc()
          }, false, null)
          this.closeFunc()
          this.isDialogBoxOpen = false
        } else {
          this.$refs.pop.closeFunction()
        }
      }
    },
    async executeDelete () {
      let result = false
      try {
        let response = await axios.put(`${this.$i18n.t('prop.url')}${deletePath}`, {
          nodeId: this.targetStoreCd,
          indexNo: this.roomInfo.indexNo
        }, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    globalErrorMapping (result) {
      this.hasFetchErrors = true
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    openDatePicker (e) {
      e.openDatePickr()
    },
    resetFocus (e) {
      e.preventDefault()
      this.$refs.tableNoInput.focus()
    },
    appendTimetoDates () {
      let { startDate, endDate } = this.roomInfo
      startDate = moment(startDate, 'YYYY/MM/DD').set({ 'hours': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }).toISOString()
      endDate = moment(endDate, 'YYYY/MM/DD').set({ 'hours': 23, 'minute': 59, 'second': 59, 'millisecond': 999 }).toISOString()
      return [startDate, endDate]
    },
    async setFocus () {
      await this.$nextTick(() => {
        this.errorFields.focus()
      })
    }
  },
  watch: {
    equipmentModelList () {
      this.bindModelstoEquipment()
    }
  },
  created () {
    this.MODE = {
      ADD: 1,
      EDIT: 2
    }
  }
}
// KSD V001.000 AE
