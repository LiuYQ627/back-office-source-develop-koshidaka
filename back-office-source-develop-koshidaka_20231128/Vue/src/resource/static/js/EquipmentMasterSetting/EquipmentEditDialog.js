/* KSD V001.000 AS */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import { inputLimitation, inputNumberLimitation } from '../../js/Common/jsUtils'
const savePath = 'RentalsEquipment/Update'
const deletePath = 'RentalsEquipment/Delete'

export default {
  data () {
    return {
      dialog: false,
      title: '',
      mode: 2,
      equipmentData: {
        equipNo: '',
        equipName: '',
        equipShortName: ''
      },
      equipmentOriginalData: {},
      masters: {},
      contractServices: [],
      parentDataList: [],
      closeFunc: null,
      indexNoErrorMsg: '',
      equipNameErrorMsg: '',
      equipShortNameErrorMsg: '',
      ticketNoErrorMsg: '',
      selectedIndex: 0,
      refreshFunc: null,
      focusItem: null,
      sessionBusinessUnitCd: '',
      serviceDisable: false,
      operationLock: false,
      smartReceiptCodeErrorMsg: '',
      invoiceIssueNameErrorMsg: '',
      registerBusinessCodeErrorMsg: ''
    }
  },
  components: {
    popup,
    dialogStoreSelect
  },
  methods: {
    async open (row, refreshFunc, sessionBusinessUnitCd, closeFunc, mode, businessUnitCdData) {
      this.dialog = true
      this.mode = mode
      this.businessUnitCdData = businessUnitCdData
      this.sessionBusinessUnitCd = sessionBusinessUnitCd
      this.operationLock = false
      this.equipNameErrorMsg = ''
      this.equipShortNameErrorMsg = ''
      this.closeFunc = closeFunc
      this.refreshFunc = refreshFunc
      this.equipmentOriginalData = {...row}
      const {equipNo} = row
      const {equipName} = row
      const {equipShortName} = row
      this.equipmentData = {
        equipNo,
        equipName,
        equipShortName
      }
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    openEnd () {
      this.$refs.equipmentNameInput.focus()
    },
    validateFields () {
      // let withError = false
      let itemsFocus = []
      if (this.$refs.equipmentNameInput.value === null || this.$refs.equipmentNameInput.value === '') {
        this.equipNameErrorMsg = this.$i18n.t('C00218.E009')
        // withError = true
        itemsFocus.push(this.$refs.equipmentNameInput)
      }
      if (this.$refs.equipmentShortNameInput.value === null || this.$refs.equipmentShortNameInput.value === '') {
        this.equipShortNameErrorMsg = this.$i18n.t('C00218.E009')
        // withError = true
        itemsFocus.push(this.$refs.equipmentShortNameInput)
      }

      this.focusItem = itemsFocus[0]
      return itemsFocus.length > 0
    },
    async onClickSave () {
      this.initErrorMessage()
      if (this.validateFields() === false) {
        this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
        if (await this.executeSave() === true) {
          if (await this.refreshFunc() === true) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
            this.closeFunc()
            this.dialog = false
          } else {
            this.$refs.pop.closeFunction()
          }
        }
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.setFocus, false, null)
        this.nameErrorMsg = this.$i18n.t('C00218.E009')
      }
    },
    async executeSave () {
      let result = false
      try {
        const params = {
          ...this.equipmentOriginalData,
          nodeId: `${this.sessionBusinessUnitCd}`,
          equipNo: this.equipmentData.equipNo,
          equipName: this.equipmentData.equipName,
          equipShortName: this.equipmentData.equipShortName
        }

        // KSD V001.000 AS 更新パラメータに余計なフィールドが含まれていてエラーになる対応
        delete params.createTimestamp
        delete params.lastModifiedTimestamp
        delete params.lastModifiedUserId
        delete params._id
        // KSD V001.000 AE 更新パラメータに余計なフィールドが含まれていてエラーになる対応

        let response = await axios.post(this.$i18n.t('prop.url') + savePath,
          params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      return result
    },
    async onClickDelete () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.runDelete, false, null)
    },
    async runDelete () {
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
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
      let result = false
      try {
        let response = await axios.put(this.$i18n.t('prop.url') + deletePath, {
          nodeId: this.sessionBusinessUnitCd,
          equipNo: this.equipmentData.equipNo
        }, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      return result
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
      this.equipNameErrorMsg = ''
      this.equipShortNameErrorMsg = ''
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    }
  }
}
/* KSD V001.000 AE */
