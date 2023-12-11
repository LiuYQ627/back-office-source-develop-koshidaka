// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import { inputLimitation, inputNumberLimitation } from '@/resource/static/js/Common/jsUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'

const savePath = 'RestaurantsFloor/Update'
const kcpCntPath = 'Restaurants/SysteminffixSys/Query'
const getFloorPath = 'RestaurantsFloor/Query'

export default {
  mixins: [transformUtils],
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      floorData: {},
      masters: {},
      contractServices: [],
      selectedIndex: 0,
      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      sessionBusinessUnitCd: '',
      serviceDisable: false,
      operationLock: false,
      floorNoErrorMsg: '',
      ccpNoErrorMsg: '',
      errKcpNoErrorMsg: '',
      kpStsList: [],
      dishupStsList: [],
      kcpCnt: 0,
      sysinfixData: [],
      floorNoList: [],
      onHoldFloorNo: 0,
      confirmSave: true
    }
  },
  components: {
    popup,
    dialogStoreSelect
  },
  methods: {
    async open (nodeId, floorData, refreshFunc, closeFunc) {
      this.hasDelete = !floorData.isDefault
      delete floorData.isDefault
      this.nodeId = nodeId
      this.dialog = true
      this.operationLock = false
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.floorData = floorData
      this.masters = null
      this.onHoldIndexNo = this.floorData.indexNo
      this.getKcpCnt()
      this.floorNoList = []

      await this.$nextTick()
      setTimeout(() => {
        this.$refs.floorNoText.focus()
      }, 200)

      if (this.floorData !== null) {
        this.mode = 2
        this.title = this.$i18n.t('F322b9.S019')

        if (this.floorData.floorNo === null) floorData.floorNo = 0
        if (this.floorData.floorName === null) floorData.floorName = ''
        if (this.floorData.floorNameShort === null) floorData.floorNameShort = ''
        if (this.floorData.ccpNo === null) floorData.ccpNo = 1
        if (this.floorData.errKcpNo === null) floorData.errKcpNo = 1

        this.kpStsList = [
          this.floorData.kpSts1,
          this.floorData.kpSts2,
          this.floorData.kpSts3,
          this.floorData.kpSts4,
          this.floorData.kpSts5,
          this.floorData.kpSts6,
          this.floorData.kpSts7,
          this.floorData.kpSts8,
          this.floorData.kpSts9,
          this.floorData.kpSts10,
          this.floorData.kpSts11,
          this.floorData.kpSts12,
          this.floorData.kpSts13,
          this.floorData.kpSts14,
          this.floorData.kpSts15,
          this.floorData.kpSts16,
          this.floorData.kpSts17,
          this.floorData.kpSts18,
          this.floorData.kpSts19,
          this.floorData.kpSts20,
          this.floorData.kpSts21,
          this.floorData.kpSts22,
          this.floorData.kpSts23,
          this.floorData.kpSts24,
          this.floorData.kpSts25,
          this.floorData.kpSts26,
          this.floorData.kpSts27,
          this.floorData.kpSts28,
          this.floorData.kpSts29,
          this.floorData.kpSts30,
          this.floorData.kpSts31,
          this.floorData.kpSts32,
        ]

        this.dishupStsList = [
          this.floorData.dishupSts1,
          this.floorData.dishupSts2,
          this.floorData.dishupSts3,
          this.floorData.dishupSts4,
          this.floorData.dishupSts5,
          this.floorData.dishupSts6,
          this.floorData.dishupSts7,
          this.floorData.dishupSts8,
          this.floorData.dishupSts9,
          this.floorData.dishupSts10,
          this.floorData.dishupSts11,
          this.floorData.dishupSts12,
          this.floorData.dishupSts13,
          this.floorData.dishupSts14,
          this.floorData.dishupSts15,
          this.floorData.dishupSts16,
          this.floorData.dishupSts17,
          this.floorData.dishupSts18,
          this.floorData.dishupSts19,
          this.floorData.dishupSts20,
          this.floorData.dishupSts21,
          this.floorData.dishupSts22,
          this.floorData.dishupSts23,
          this.floorData.dishupSts24,
          this.floorData.dishupSts25,
          this.floorData.dishupSts26,
          this.floorData.dishupSts27,
          this.floorData.dishupSts28,
          this.floorData.dishupSts29,
          this.floorData.dishupSts30,
          this.floorData.dishupSts31,
          this.floorData.dishupSts32
        ]
        this.floorData = {
          ...this.floorData,
          indexNo: this.floorData.indexNo,
          floorNo: this.floorData.floorNo,
          floorName: this.floorData.floorName,
          floorNameShort: this.floorData.floorNameShort,
          ccpNo: this.floorData.ccpNo,
          errKcpNo: this.floorData.errKcpNo
        }
      } else {
        this.mode = 1
        this.title = this.$i18n.t('F322b9.S019')
        this.floorData = {
          floorNo: 0,
          floorName: '',
          floorNameShort: '',
          ccpNo: 0,
          errKcpNo: 0
        }
      }
      this.initErrorMessage()
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    openEnd () {
      document.getElementsByClassName('floorNoInput')[0].focus()
      document.getElementById('baseTable').scrollTo(0, 0)
    },
    async getKcpCnt () {
      try {
        const params = { nodeId: this.nodeId }
        let response = await axios.post(
          `${this.$i18n.t('prop.url')}${kcpCntPath}`,
          params,
          commonUtils.methods.addApiHeader({
            params: {
              orderBy: 'nodeId',
              ascending: true,
              startIndex: 0,
              batchSize: 0
            }
          })
        )
        if (response.data.result.code === 0) {
          this.sysinfixData = response.data.responseModel.map(res => this.uncapitalizeKeys(res))[0]
          this.kcpCnt = this.sysinfixData.kcpcnt
        } else if (response.data.result.code === 2) {
          this.kcpCnt = 0
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (err) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(err)
      }
    },
    async getFloorData () {
      this.confirmSave = true
      let result = false
      const params = {
        IndexNo: 0,
        nodeId: this.nodeId,
        orderBy: 'IndexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      try {
        const response = await axios.post(`${this.$i18n.t('prop.url')}${getFloorPath}`,
          params,
          commonUtils.methods.getApiHeader())
          if (response.data.result.code === 0) {
            const res = response.data.responseModel.map(res => this.uncapitalizeKeys(res))
            let dataList = res.length ? res : [res]
            this.floorNoList = dataList.map(({indexNo, floorNo}) => ({indexNo, floorNo}))
          } else if (response.data.result.code === 2) {
            this.floorNoList = []
          } else {
            this.confirmSave = false
            this.searchErrorMapping(response.data.result)
            console.error(`RestaurantsFloor/Query Status Code: ${response.data.result.code}`)
            return null
          }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        throw error
      }
      return result
    },
    selectSTS (ind, state) {
      if (state === 'KP') this.kpStsList = this.kpStsList.map((res, index) => index === ind ? res == 1 ? 0 : 1 : res )
      if (state === 'D') this.dishupStsList = this.dishupStsList.map((res, index) => index === ind ? res == 1 ? 0 : 1 : res )
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    async checkDuplicate () {
      let result = false
      try {
        if (await this.getFloorData() == null) throw new Error()

        const itemFloorNo = Number(this.$refs.floorNoText.value)
        const floorResult = this.floorNoList.filter(({indexNo, floorNo}) => indexNo !== Number(this.onHoldIndexNo) && floorNo === itemFloorNo)
        if (floorResult.length) {
          result = true
        }
        return result
      } catch (error) {
        throw error
      }
    },
    async onValidateSave () {
      try {
        let focusField = []
        let result = false
        if (Number(this.$refs.floorNoText.value) > 99 || Number(this.$refs.floorNoText.value) < 1) {
          if (this.confirmSave === true) {
            this.floorNoErrorMsg =
              (this.$refs.floorNoText.value === '' || this.$refs.floorNoText.value === null)
                ? this.$i18n.t('F322b9.E011')
                : this.floorNoErrorMsg = this.$i18n.t('F322b9.E009')
            focusField.push(this.$refs.floorNoText)
            result = true
          } else this.floorNoErrorMsg = ''
        }
        if (Number(this.$refs.ccpNoText.value) > 32 || Number(this.$refs.ccpNoText.value) < 1) {
          this.ccpNoErrorMsg = this.$i18n.t('F322b9.E012')
          focusField.push(this.$refs.ccpNoText)
        }
        if (Number(this.$refs.errKcpNoText.value) > 32 || Number(this.$refs.errKcpNoText.value) < 1) {
          this.errKcpNoErrorMsg = this.$i18n.t('F322b9.E012')
          focusField.push(this.$refs.errKcpNoText)
        }
        if (this.$refs.errKcpNoText.value === '' || this.$refs.errKcpNoText.value === null) {
          this.errKcpNoErrorMsg = this.$i18n.t('F322b9.E011')
          focusField.push(this.$refs.errKcpNoText)
        }
        if (this.$refs.ccpNoText.value === '' || this.$refs.ccpNoText.value === null) {
          this.ccpNoErrorMsg = this.$i18n.t('F322b9.E011')
          focusField.push(this.$refs.ccpNoText)
        }
        if (focusField.length > 0) focusField[0].focus()
        return result
      } catch (error) {
        throw error
      }
    },
    async onDuplicateCheck () {
      try {
        let focusField = []
        let result = false
        if (await this.checkDuplicate() === true) {
          this.floorNoErrorMsg = this.$i18n.t('F322b9.E010')
          focusField.push(this.$refs.floorNoText)
          result = true
        }
        if (focusField.length > 0) focusField[0].focus()
        return result
      } catch (error) {
        throw error
      }
    },
    async onClickSave () {
      try {
        this.initErrorMessage()
        await this.onValidateSave()
        if (this.floorNoErrorMsg !== '' || this.ccpNoErrorMsg !== '' ||
        this.errKcpNoErrorMsg !== '') {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
          return
        }
        await this.onDuplicateCheck()
        if (this.floorNoErrorMsg !== '' || this.confirmSave !== true) {
          this.$refs.pop.open(3, '', this.$i18n.t('F322b9.E013'), -99, false, null, false, null)
          return
        }

        this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
        if (await this.executeSave('save') === true) {
          if (await this.refreshFunc() === true) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
            this.closeFunc()
            this.dialog = false
            this.floorNoList = []
          } else {
            this.$refs.pop.closeFunction()
          }
        }
        this.initErrorMessage()
      } catch (error) {
        console.error(error)
      }
    },
    setToZero (type, data) {
      if (type === 'delete') return 0
      return data ? data : 0
    },
    setToOne (type, data) {
      if (type === 'delete') return 1
      return data ? data : 1
    },
    setToBlank (type, data) {
      if (type === 'delete') return ''
      return data ? data : ''
    },
    async executeSave (type) {
      let result = false
      try {
        const params = {
              ...this.floorData,
              nodeId : this.nodeId,
              indexNo: Number(this.$refs.indexNoText.value),
              floorNo: this.setToZero(type, Number(this.$refs.floorNoText.value)),
              floorName: this.setToBlank(type, this.$refs.floorNameText.value),
              floorNameShort: this.setToBlank(type, this.$refs.floorNameShortText.value),
              ccpNo: this.setToOne(type, Number(this.$refs.ccpNoText.value)),
              errKcpNo: this.setToOne(type, Number(this.$refs.errKcpNoText.value)),
              kpSts1: this.setToZero(type, this.kpStsList[0]),
              kpSts2: this.setToZero(type, this.kpStsList[1]),
              kpSts3: this.setToZero(type, this.kpStsList[2]),
              kpSts4: this.setToZero(type, this.kpStsList[3]),
              kpSts5: this.setToZero(type, this.kpStsList[4]),
              kpSts6: this.setToZero(type, this.kpStsList[5]),
              kpSts7: this.setToZero(type, this.kpStsList[6]),
              kpSts8: this.setToZero(type, this.kpStsList[7]),
              kpSts9: this.setToZero(type, this.kpStsList[8]),
              kpSts10: this.setToZero(type, this.kpStsList[9]),
              kpSts11: this.setToZero(type, this.kpStsList[10]),
              kpSts12: this.setToZero(type, this.kpStsList[11]),
              kpSts13: this.setToZero(type, this.kpStsList[12]),
              kpSts14: this.setToZero(type, this.kpStsList[13]),
              kpSts15: this.setToZero(type, this.kpStsList[14]),
              kpSts16: this.setToZero(type, this.kpStsList[15]),
              kpSts17: this.setToZero(type, this.kpStsList[16]),
              kpSts18: this.setToZero(type, this.kpStsList[17]),
              kpSts19: this.setToZero(type, this.kpStsList[18]),
              kpSts20: this.setToZero(type, this.kpStsList[19]),
              kpSts21: this.setToZero(type, this.kpStsList[20]),
              kpSts22: this.setToZero(type, this.kpStsList[21]),
              kpSts23: this.setToZero(type, this.kpStsList[22]),
              kpSts24: this.setToZero(type, this.kpStsList[23]),
              kpSts25: this.setToZero(type, this.kpStsList[24]),
              kpSts26: this.setToZero(type, this.kpStsList[25]),
              kpSts27: this.setToZero(type, this.kpStsList[26]),
              kpSts28: this.setToZero(type, this.kpStsList[27]),
              kpSts29: this.setToZero(type, this.kpStsList[28]),
              kpSts30: this.setToZero(type, this.kpStsList[29]),
              kpSts31: this.setToZero(type, this.kpStsList[30]),
              kpSts32: this.setToZero(type, this.kpStsList[31]),
              dishupSts1: this.setToZero(type, this.dishupStsList[0]),
              dishupSts2: this.setToZero(type, this.dishupStsList[1]),
              dishupSts3: this.setToZero(type, this.dishupStsList[2]),
              dishupSts4: this.setToZero(type, this.dishupStsList[3]),
              dishupSts5: this.setToZero(type, this.dishupStsList[4]),
              dishupSts6: this.setToZero(type, this.dishupStsList[5]),
              dishupSts7: this.setToZero(type, this.dishupStsList[6]),
              dishupSts8: this.setToZero(type, this.dishupStsList[7]),
              dishupSts9: this.setToZero(type, this.dishupStsList[8]),
              dishupSts10: this.setToZero(type, this.dishupStsList[9]),
              dishupSts11: this.setToZero(type, this.dishupStsList[10]),
              dishupSts12: this.setToZero(type, this.dishupStsList[11]),
              dishupSts13: this.setToZero(type, this.dishupStsList[12]),
              dishupSts14: this.setToZero(type, this.dishupStsList[13]),
              dishupSts15: this.setToZero(type, this.dishupStsList[14]),
              dishupSts16: this.setToZero(type, this.dishupStsList[15]),
              dishupSts17: this.setToZero(type, this.dishupStsList[16]),
              dishupSts18: this.setToZero(type, this.dishupStsList[17]),
              dishupSts19: this.setToZero(type, this.dishupStsList[18]),
              dishupSts20: this.setToZero(type, this.dishupStsList[19]),
              dishupSts21: this.setToZero(type, this.dishupStsList[20]),
              dishupSts22: this.setToZero(type, this.dishupStsList[21]),
              dishupSts23: this.setToZero(type, this.dishupStsList[22]),
              dishupSts24: this.setToZero(type, this.dishupStsList[23]),
              dishupSts25: this.setToZero(type, this.dishupStsList[24]),
              dishupSts26: this.setToZero(type, this.dishupStsList[25]),
              dishupSts27: this.setToZero(type, this.dishupStsList[26]),
              dishupSts28: this.setToZero(type, this.dishupStsList[27]),
              dishupSts29: this.setToZero(type, this.dishupStsList[28]),
              dishupSts30: this.setToZero(type, this.dishupStsList[29]),
              dishupSts31: this.setToZero(type, this.dishupStsList[30]),
              dishupSts32: this.setToZero(type, this.dishupStsList[31])
            }
        // 保存
        let capParams = this.capitalizeKeys(params)
        let response = await axios.post(this.$i18n.t('prop.url') + savePath, capParams, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          result = true
        }
        else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
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
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.closeFunc()
          this.dialog = false
        } else {
          this.$refs.pop.closeFunction()
        }
      }
    },
    async executeDelete () {
      return this.executeSave('delete')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        let errorMessage = result.errorMessageMap['indexNo'].toString().split(',').join('')
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
    },
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    initErrorMessage () {
      this.floorNoErrorMsg = ''
      this.ccpNoErrorMsg = '',
      this.errKcpNoErrorMsg = ''
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    },
  }
}
// KSD V001.000 AE
