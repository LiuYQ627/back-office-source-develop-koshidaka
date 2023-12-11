// KSD V001.000 AS
import axios from 'axios'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
// Upsert : update / insert
import upsertDialog from '@/resource/templates/RoomRelatedInformationSetting/RoomRelatedInformationSettingDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import moment from 'moment'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import { convertCode } from '../../js/Common/jsUtils'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import dataUtils from '@/resource/static/js/Common/dataUtils'
const allRoomInfoPath = 'RentalsRoomInformation/Query'
const modelQuery = 'RentalsModel/Query'
const equipmentQuery = 'RentalsEquipment/Query'
const roomQuery = 'RestaurantsTable/Query'

export default {
  name: 'RoomInfoMaster',
  mixins: [transformUtils, dataUtils],
  data () {
    return {
      dispRoomInfoDataList: [],
      findRoomInfoDataList: [],
      equipmentModelList: [],
      equipmentList: [],
      roomList: [],
      resultCount: 0,
      roomSearchCode: '',
      isEditDlgOpen: false,
      operationLock: true,
      sessionBusinessUnitCd: '',
      // dialog store
      masters: {},
      targetStoreText: '',
      headquartersAuthority: 0,
      targetStoreCd: 0,
      isOperationLockStoreCount: 0,
      timeout: null
    }
  },
  components: {
    maintButton,
    upsertDialog,
    popup,
    dialogStoreSelect
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
      if (this.targetStoreCd) {
        if (await this.getRoomInfo() === false) return
      }
      if (this.headquartersAuthority === 1) {
        if (await this.getMasters() === false) return
        await this.setStore(this.targetStoreCd)
      }

      this.operationLock = false
    },
    async getMasters () {
      let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      if (this.masters.storeMasters !== null) {
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.targetStoreText = `${convertCode(this.masters.storeMasters[index].name)}:${this.masters.storeMasters[index].displayName.default}`
        }
      }
    },
    async getRoomInfo () {
      this.isOperationLockStoreCount = 0
      let result = false
      this.findRoomInfoDataList = []
      this.dispRoomInfoDataList = []
      this.resultCount = 0
      try {
        await this.fetchSubData()
        let response = await axios.post(`${this.$i18n.t('prop.url')}${allRoomInfoPath}`, {
          indexNo: 0,
          nodeId: this.targetStoreCd,
          orderBy: 'indexNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          try {
            this.isOperationLockStoreCount++
            if (response.data.responseModel !== null) {
              this.findRoomInfoDataList = await this.getModelandEquipmentNames(response.data.responseModel)
            } else {
              throw response.data.responseModel
            }
          } catch (error) {
            console.error(error)
            throw error
          }
          this.setRoomInfoCount()
          this.formatRoomList()
          result = true
        } else if (response.data.result.code === 2) {
          try {
            this.isOperationLockStoreCount++
            this.findRoomInfoDataList = await this.getModelandEquipmentNames([])
          } catch (error) {
            console.error(error)
          }
          this.setRoomInfoCount()
          this.formatRoomList()
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
          result = false
        }
      } catch (error) {
        console.error(error)
        await this.$nextTick(() => { })
        if (!this.$refs.pop.dialog) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        }
        this.targetStoreCd = []
        this.targetStoreText = []
      }
      return result
    },
    async fetchSubData () {
      try {
        this.roomList = await this.getRoomList()
        if (!this.roomList) throw new Error()
        this.equipmentList = await this.getEquipmentList()
        if (!this.equipmentList) throw new Error()
        this.equipmentModelList = await this.getModelList()
        if (!this.equipmentModelList) throw new Error()
      } catch (error) {
        this.targetStoreCd = []
        this.targetStoreText = []
        console.error(error)
        throw error
      }
    },
    async getModelandEquipmentNames (roomInfoList) {
      for (const [index, roomInfoItem] of roomInfoList.entries()) {
        roomInfoList[index].modelName = this.getEquipmentModel(roomInfoItem.modelNo).modelName
        roomInfoList[index].equipmentName = this.getEquipment(roomInfoItem.modelNo).equipName
        roomInfoList[index].roomName = this.getRoom(roomInfoItem.tableNo).tblName || '' // C00220.S010
      }
      return roomInfoList
    },
    getRoom (roomNo) {
      let room = this.roomList.filter(room => room.indexNo == roomNo)[0]
      if (!room) {
        return ''
      }
      return room
    },
    getEquipmentModel (modelNo) {
      let model = this.equipmentModelList.filter(model => model.modelNo == modelNo)[0]
      if (!model) {
        return ''
      }
      return model
    },
    getEquipment (modelNo) {
      let equipNo = this.getEquipmentModel(modelNo).equipNo
      let equipment = this.equipmentList.filter(equipment => equipment.equipNo == equipNo)[0]
      if (!equipment) {
        return ''
      }
      return equipment
    },
    async getModelList () {
      let response = await axios.post(`${this.$i18n.t('prop.url')}${modelQuery}`, {
        modelNo: 0,
        nodeId: this.sessionBusinessUnitCd,
        orderBy: 'modelNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.addApiHeader({}))
      try {
        if (response.data.result.code === 0) {
          this.isOperationLockStoreCount++
          return response.data.responseModel
        } else if (response.data.result.code === 2) {
          this.isOperationLockStoreCount++
          return []
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
        throw new Error(response.data.result)
      }
    },
    async getEquipmentList () {
      let response = await axios.post(`${this.$i18n.t('prop.url')}${equipmentQuery}`, {
        equipNo: 0,
        nodeId: this.sessionBusinessUnitCd,
        orderBy: 'equipNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.addApiHeader({}))
      try {
        if (response.data.result.code === 0) {
          this.isOperationLockStoreCount++
          return response.data.responseModel
        } else if (response.data.result.code === 2) {
          this.isOperationLockStoreCount++
          return []
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
        throw new Error(response.data.result)
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
      }, commonUtils.methods.addApiHeader({}))
      try {
        if (response.data.result.code === 0) {
          this.isOperationLockStoreCount++
          return response.data.responseModel.map(room => this.uncapitalizeKeys(room))
        } else if (response.data.result.code === 2) {
          this.isOperationLockStoreCount++
          return []
        } else {
          await this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
        throw new Error(response.data.result)
      }
    },
    setRoomInfoCount () {
      this.resultCount = this.findRoomInfoDataList === null ? 0 : this.findRoomInfoDataList.length
    },
    formatRoomList () {
      this.dispRoomInfoDataList = this.findRoomInfoDataList
      this.dispRoomInfoDataList.forEach((roomItem, index) => {
        let startDate = new moment(roomItem.startDate)
        let endDate = new moment(roomItem.endDate)
        this.dispRoomInfoDataList[index].formattedStartDate = startDate.isValid() ? startDate.format('YYYY/MM/DD') : ''
        this.dispRoomInfoDataList[index].formattedEndDate = endDate.isValid() ? endDate.format('YYYY/MM/DD') : ''
      })
    },
    sanitizeDirectInput () {
      this.roomSearchCode = this.roomSearchCode.replace(/[^0-9]/gi, '')
    },
    async getAllRoomInfo () {
      return axios.post(`${this.$i18n.t('prop.url')}${allRoomInfoPath}`, {
        orderBy: 'indexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.addApiHeader({}))
    },
    async directInput () {
      let indexNo = Number(this.$refs.roomSearchCode.value)

      if (indexNo === 0 || indexNo > 9999) {
        this.clearSearchCode()
        return
      }
      try {
        await this.$refs.upsertDialog.fetchData()
      } catch (error) {
        console.error(error)
        return
      }
      axios.post(`${this.$i18n.t('prop.url')}${allRoomInfoPath}`, {
        indexNo: indexNo,
        nodeId: this.targetStoreCd,
        orderBy: 'indexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.addApiHeader({}))
        .then(response => {
          if (response.data.result.code === 0) {
            let responseModel = response.data.responseModel
            const result = responseModel.length ? responseModel[0] : responseModel
            this.$refs.upsertDialog.open(indexNo, result, this.refresh, this.closeFunc, this.dataCheckFunc)
            // setTimeout(() => {
            //   this.$refs.editDialog.openEnd()
            // }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            this.$refs.upsertDialog.open(indexNo, null, this.refresh, this.closeFunc, this.dataCheckFunc)
            // setTimeout(() => {
            //   this.$refs.editDialog.openEnd()
            // }, 50)
            this.editDlgOpen = true
          } else {
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.error(error)
        })
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['businessUnitCd'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result, true)
      }
    },
    globalErrorMapping (result, isEdit = false) {
      if (!isEdit) {
        this.clearStore()
      }
      if (Number(result.code) === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    async selectedRoom (index) {
      try {
        await this.$refs.upsertDialog.fetchData()
      } catch (error) {
        console.error(error)
        return
      }
      axios.post(`${this.$i18n.t('prop.url')}${allRoomInfoPath}`, {
        indexNo: index,
        nodeId: this.targetStoreCd,
        orderBy: 'indexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }, commonUtils.methods.addApiHeader({}))
        .then(response => {
          if (response.data.result.code === 0) {
            let responseModel = response.data.responseModel
            const result = responseModel.length ? responseModel[0] : responseModel
            this.$refs.upsertDialog.open(index, result, this.refresh, this.closeFunc, this.dataCheckFunc)
            // setTimeout(() => {
            //   this.$refs.editDialog.openEnd()
            // }, 50)
            this.editDlgOpen = true
          } else {
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.error(error)
        })
    },
    async refresh () {
      return this.getRoomInfo()
    },
    dataCheckFunc () {
      this.dateConsecutivityCheck()
    },
    closeFunc () {
      this.editDlgOpen = false
      this.clearSearchCode()
    },
    closeTab () {
      //      window.close()
      this.$router.push('/TopPage')
    },
    confirmUnload (event) {
      // マスタ新規・編集ダイアログ表示中なら変更確認ダイアログを表示する
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    },
    clearSearchCode () {
      this.roomSearchCode = ''
    },
    // Dialog Store
    storeSelect () {
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      // if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
      await this.getRoomInfo()
    },
    clearStore () {
      this.targetStoreText = ''
      this.targetStoreCd = ''
    },
    dateConsecutivityCheck () {
      if (this.dispRoomInfoDataList.length <= 1) return
      const masterList = this.deepClone(this.dispRoomInfoDataList)
      const START_DATE_KEY = 'startDate'
      const END_DATE_KEY = 'endDate'
      const PRECISION = 'day'
      const checkMoment = (date) => {
        return moment.isMoment(date) ? date : moment(date)
      }
      const sortMasterList = (list) => {
        return list.sort((a, b) => {
          const aStartMoment = checkMoment(a[START_DATE_KEY])
          const bStartMoment = checkMoment(b[START_DATE_KEY])
          const aEndMoment = checkMoment(a[END_DATE_KEY])
          const bEndMoment = checkMoment(b[END_DATE_KEY])
          if (aStartMoment.isSame(bStartMoment, PRECISION)) {
            if (aEndMoment.isBefore(bEndMoment, PRECISION)) {
              return -1
            }
            if (aEndMoment.isSame(bEndMoment, PRECISION)) {
              return 0
            }
            return 1
          }
          if (aStartMoment.isBefore(bStartMoment, PRECISION)) {
            return -1
          }
          return 1
        })
      }

      const sortedMasterList = sortMasterList(masterList)
      const min = sortedMasterList[0][START_DATE_KEY]
      const max = sortedMasterList.at(-1)[END_DATE_KEY]

      let hasDateGap = false
      sortedMasterList.forEach((item, index) => {
        const startMoment = checkMoment(item[START_DATE_KEY])
        const endMoment = checkMoment(item[END_DATE_KEY])
        const dur = moment.duration(1, 'days')
        const startCheck = startMoment.isSame(min, PRECISION) ? startMoment : moment(startMoment).subtract(dur)
        const endCheck = endMoment.isSame(max, PRECISION) ? endMoment : moment(endMoment).add(dur)
        let startBreakCheck = false
        let endBreakCheck = false
        sortedMasterList.forEach((itemBreakCheck, startFindIndex) => {
          if (index === startFindIndex) return
          if (startBreakCheck && endBreakCheck) return
          if (startMoment.isBetween(checkMoment(itemBreakCheck[START_DATE_KEY]), checkMoment(itemBreakCheck[END_DATE_KEY]), PRECISION) &&
            endMoment.isBetween(checkMoment(itemBreakCheck[START_DATE_KEY]), checkMoment(itemBreakCheck[END_DATE_KEY]), PRECISION)) {
            startBreakCheck = true
            endBreakCheck = true
          }
          if (checkMoment(itemBreakCheck[END_DATE_KEY]).isBetween(startCheck, endCheck, PRECISION, '[]') || startCheck.isSame(min, PRECISION)) {
            startBreakCheck = true
          }
          if (checkMoment(itemBreakCheck[START_DATE_KEY]).isBetween(startCheck, endCheck, PRECISION, '[]') || endCheck.isSame(max, PRECISION)) {
            endBreakCheck = true
          }
        })
        if (!startBreakCheck || !endBreakCheck) hasDateGap = true
      })

      if (hasDateGap) this.openPopupDialog({ mode: 3, messageCode: 'C00220.E013' })
    },
    async openPopupDialog ({
      mode = 1,
      title = '',
      messageCode = null,
      message = null,
      code = '',
      showBackBtn = false,
      okBtnCallback = null,
      isNonDispStatus = false,
      backBtnCallback = null
    } = {}) {
      if (messageCode !== null && message === null) {
        message = this.$i18n.t(messageCode)
      }
      await this.$refs.pop.open(mode, title, message, code, showBackBtn, okBtnCallback, isNonDispStatus, backBtnCallback)
    }
  },
  created () {
    this.$root.winId = 'C00220'
    window.addEventListener('beforeunload', this.confirmUnload)
    // this.getSessionBusinessUnitCd()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
    clearTimeout(this.timeout)
  },
  async mounted () {
    let vue = this
    let belongStoreCdStr = ''
    vue.$root.$once('getBelongStoreCd', (belongStoreCd) => {
      // headerで保持している所属店舗コード
      belongStoreCdStr = belongStoreCd
    })
    let belongStoreNameStr = ''
    vue.$root.$once('getBelongStoreName', (belongStoreName) => {
      // 対象店舗名 = headerで保持している所属店舗名
      belongStoreNameStr = belongStoreName
    })
    let targetStoreCd = ''
    let businessUnitCd = ''
    vue.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      // 対象店舗コード = headerで保持している所属企業コード + headerで保持している所属店舗コード
      businessUnitCd = businessUnitCdStr
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.headquartersAuthority = headquartersAuthority
      vue.sessionBusinessUnitCd = businessUnitCd
      if (headquartersAuthority !== 1) {
        if (targetStoreCd) {
          vue.targetStoreText = `${belongStoreCdStr}:${belongStoreNameStr}`
          vue.targetStoreCd = targetStoreCd
        }
      }
      await this.initialize()
      await this.$nextTick()
      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementById('storeSelectBtn').focus()
        } else {
          this.$refs.roomSearchCode.focus()
        }
      }, 200)
    })
  }
}
// KSD V001.000 AE
