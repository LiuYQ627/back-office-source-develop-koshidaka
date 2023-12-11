// KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import { inputLimitation } from '../../js/Common/jsUtils'
import textInput from '@/resource/templates/CommonInput/TextInput'
const savePath = 'RestaurantsMemberRank/Update'
const deletePath = 'RestaurantsMemberRank/Delete'
const queryPath = 'RestaurantsMemberRank/Query'

export default {
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      memberData: {
        indexNo: '',
        memberRankNo: '',
        memberRankName: '',
        ticketNo: '',
        found: false
      },
      origData: {},
      memberOriginalData: {},
      masters: {},
      contractServices: [],
      parentDataList: [],
      closeFunc: null,
      memberRankNameErrorMsg: '',
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
    dialogStoreSelect,
    textInput
  },
  methods: {
    async open (memberData, refreshFunc, sessionBusinessUnitCd, closeFunc, dialogMode) {
      this.dialog = true
      this.sessionBusinessUnitCd = sessionBusinessUnitCd
      this.operationLock = false
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.origData = memberData
      this.mode = dialogMode
      if (this.mode === 2) {
        this.title = this.$i18n.t('C00213.S014')
      } else {
        this.title = this.$i18n.t('C00213.S016')
      }
      this.memberData = {
        indexNo: memberData.indexNo,
        memberRankNo: memberData.memberRankNo,
        memberRankName: memberData.memberRankName,
        ticketNo: memberData.ticketNo
      }
    },
    async getMember (indexNo) {
      let defaultVal = {
        indexNo,
        memberRankNo: indexNo - 1,
        memberRankName: '',
        ticketNo: indexNo - 1 + 989
      }
      let params = {
        nodeId: `${this.sessionBusinessUnitCd}`,
        indexNo
      }
      let response = await axios.post(this.$i18n.t('prop.url') + queryPath, params, commonUtils.methods.getApiHeader())
      switch (response.data.result.code) {
        case 0:
          return response.data.responseModel[0]
        case 2:
          return defaultVal
        default:
          return defaultVal
      }
    },
    openEnd () {
      this.$refs.memberRankNameText.focus()
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    async onClickSave () {
      this.initErrorMessage()
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (await this.executeSave() === true) {
        if (await this.refreshFunc() === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.dialog = false
        } else {
          this.$refs.pop.closeFunction()
        }
      }
    },
    async executeSave () {
      let result = false
      try {
        this.origData.memberRankName = this.memberData.memberRankName
        const data = this.morphData
        if (data && data.found) {
          delete data.found
        }
        const dataOrig = this.origData
        if (dataOrig && dataOrig.found) {
          delete dataOrig.found
        }
        const params = {
          ...this.origData,
          nodeId: `${this.sessionBusinessUnitCd}`,
          ...data
        }
        // KSD V001.000 AS 更新パラメータに余計なフィールドが含まれていてエラーになる対応
        delete params.createTimestamp
        delete params.lastModifiedTimestamp
        delete params.lastModifiedUserId
        delete params._id
        // KSD V001.000 AE 更新パラメータに余計なフィールドが含まれていてエラーになる対応

        let response = await axios.post(this.$i18n.t('prop.url') + savePath, params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
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
          indexNo: this.memberData.indexNo
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
      this.memberRankNoErrorMsg = ''
      this.ticketNoErrorMsg = ''
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    }
  }
}
// KSD V001.000 AE
