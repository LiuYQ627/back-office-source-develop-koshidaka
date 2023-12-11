//  KSD V001.000 AS
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import { inputLimitation, inputNumberLimitation } from '../../js/Common/jsUtils'

const getEquipMaster = 'RentalsEquipment/Query'
const savePath = 'RentalsModel/Update'
const deletePath = 'RentalsModel/Delete'

export default {
  data () {
    return {
      allEquipList: [],
      dialog: false,
      title: '',
      mode: 1,
      masters: {},
      nodeId: '',
      closeFunc: null,
      refreshFunc: null,
      selectedSettingData: [],
      equipNoErrorMsg: '',
      modelNameErrorMsg: '',
      modelShortNameErrorMsg: '',
      dispSeqErrorMsg: '',
      focusItem: null,
      hasErrorMessage: 0
    }
  },
  components: {
    popup
  },
  computed: {
    hasError: function () {
      return this.hasErrorMessage > 0
    }
  },
  methods: {
    async open (nodeId, selectedSettingData, refreshFunc, closeFunc, title) {
      this.dialog = true
      this.nodeId = nodeId
      this.closeFunc = closeFunc
      this.refreshFunc = refreshFunc
      this.selectedSettingData = selectedSettingData
      this.title = title
      await this.$nextTick()
      this.initErrorMessage()
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    },
    openEnd () {
      document.getElementsByClassName('equipNoName')[0].focus()
      document.getElementById('editTable').scrollTo(0, 0)
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    async getAllEquipments (nodeId) {
      try {
        const params = {
          equipNo: 0,
          nodeId: nodeId,
          orderBy: 'equipNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getEquipMaster}`, params, commonUtils.methods.getApiHeader({}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.allEquipList = response.data.responseModel
          return true
        } else if (response.data.result.code === 2) {
          // 2:該当する店舗なし
          this.allEquipList = []
          return true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },
    async onClickSave () {
      this.initErrorMessage()
      this.onValidateSave()
      if (this.errMsgEmpty() === true) {
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
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
      }
    },
    async executeSave () {
      let result = false
      try {
        const params = {
          ...this.selectedSettingData,
          nodeId: this.nodeId,
          createTimestamp: this.selectedSettingData.createTimestamp,
          lastModifiedTimestamp: this.selectedSettingData.lastModifiedTimestamp,
          version: this.selectedSettingData.version,
          modelNo: Number(this.selectedSettingData.modelNo),
          modelName: this.$refs.modelNameText.value,
          modelShortName: this.$refs.modelShortNameText.value,
          dispSeq: Math.abs(this.$refs.dispSeqText.value),
          equipNo: Number(this.$refs.equipNoText.value)
        }

        // KSD V001.000 AS 更新パラメータに余計なフィールドが含まれていてエラーになる対応
        delete params.createTimestamp
        delete params.lastModifiedTimestamp
        delete params.lastModifiedUserId
        delete params._id
        // KSD V001.000 AE 更新パラメータに余計なフィールドが含まれていてエラーになる対応

        // 保存
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
      // // 削除
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
          nodeId: this.nodeId,
          modelNo: this.selectedSettingData.modelNo
        }, commonUtils.methods.getApiHeader())
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
    popupConfirm () {
      this.dialog = false
      this.hasErrorMessage = 0
      this.closeFunc()
    },
    initErrorMessage () {
      this.equipNoErrorMsg = ''
      this.modelNameErrorMsg = ''
      this.modelShortNameErrorMsg = ''
      this.dispSeqErrorMsg = ''
    },
    onValidateSave () {
      let focusItem = []

      if (this.$refs.equipNoText.value === '' || this.$refs.equipNoText.value === null) {
        this.equipNoErrorMsg = this.$i18n.t('C00219.E010')
        this.hasErrorMessage++
        focusItem.push(this.$refs.equipNoText)
      }
      if (this.$refs.modelNameText.value === '' || this.$refs.modelNameText.value === null) {
        this.modelNameErrorMsg = this.$i18n.t('C00219.E009')
        this.hasErrorMessage++
        focusItem.push(this.$refs.modelNameText)
      }
      if (this.$refs.modelShortNameText.value === '' || this.$refs.modelShortNameText.value === null) {
        this.modelShortNameErrorMsg = this.$i18n.t('C00219.E009')
        this.hasErrorMessage++
        focusItem.push(this.$refs.modelShortNameText)
      }
      if (this.$refs.dispSeqText.value === '' || this.$refs.dispSeqText.value === null) {
        this.dispSeqErrorMsg = this.$i18n.t('C00219.E009')
        this.hasErrorMessage++
        focusItem.push(this.$refs.dispSeqText)
      } else {
        if (Number(this.$refs.dispSeqText.value) > 9999 || Number(this.$refs.dispSeqText.value) < 1) {
          this.dispSeqErrorMsg = this.$i18n.t('C00219.E011')
          this.hasErrorMessage++
          focusItem.push(this.$refs.dispSeqText)
        }
      }
      if (focusItem.length > 0) focusItem[0].focus()
    },
    errMsgEmpty () {
      if (this.equipNoErrorMsg === '' && this.modelNameErrorMsg === '' && this.modelShortNameErrorMsg === '' && this.dispSeqErrorMsg === '') {
        this.hasErrorMessage = 0
        return true
      }
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    }
  }
}
//  KSD V001.000 AE
