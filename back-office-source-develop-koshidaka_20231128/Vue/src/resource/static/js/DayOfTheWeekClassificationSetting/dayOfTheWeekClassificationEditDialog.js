//  KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import popup from '@/resource/templates/CommonDesign/Popup'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import editDialog from '@/resource/templates/DayOfTheWeekClassificationSetting/ColorPicker'
import { inputLimitation, inputNumberLimitation } from '../../js/Common/jsUtils'

const savePath = 'RentalsWeekdayDivision/Update'
const deletePath = 'RentalsWeekdayDivision/Delete'

export default {
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      passedData: {},
      settingData: {
        weekdayCode: '',
        weekdayName: '',
        weekdayShortName: '',
        textColorCode: '',
        backColorCode: ''
      },
      masters: {},
      closeFunc: null,
      refreshFunc: null,
      nodeId: '',
      colorSet: [],
      responseSet: [],
      check: false,
      timeout: null,
      editDlgOpen: false,
      colorDlgOpen: false,
      colorSetting: false,
      errMessage: {
        weekdayName: '',
        weekdayShortName: ''
      },
    }
  },
  components: {
    popup,
    editDialog,
    TextInput,
    FormGroupLayout
  },
  methods: {
    async open (mode, nodeId, passedData, refreshFunc, closeFunc, colorSetting, colorSet) {
      this.nodeId = nodeId
      this.dialog = true
      this.operationLock = false
      this.refreshFunc = refreshFunc
      this.colorSetting = colorSetting
      this.colorSet = colorSet
      this.errMessage.weekdayName = ''
      this.errMessage.weekdayShortName = ''

      await this.$nextTick()
      this.settingData = passedData
      this.closeFunc = closeFunc
      if (mode === 2) {
        this.mode = 2
        this.title = this.$i18n.t('C00214.S018')

        if (passedData.weekdayCode == null) {
          passedData.weekdayCode = {default: ''}
        }
        if (passedData.weekdayName == null) {
          passedData.weekdayName = {default: ''}
        }
        if (passedData.weekdayShortName == null) {
          passedData.weekdayShortName = {default: ''}
        }
        if (passedData.textColorCode == null) {
          passedData.textColorCode = {default: ''}
        }
        if (passedData.backColorCode == null) {
          passedData.backColorCode = {default: ''}
        }

        this.settingData = {
          ...passedData,
          weekdayCode: passedData.weekdayCode,
          weekdayName: passedData.weekdayName,
          weekdayShortName: passedData.weekdayShortName,
          textColorCode: this.colorConverter(passedData.textColorCode),
          backColorCode: this.colorConverter(passedData.backColorCode)
        }
      } else {
        this.mode = 1
        this.title = this.$i18n.t('C00214.S020')
        this.settingData = {
          ...passedData,
          weekdayName: '',
          weekdayShortName: '',
          textColorCode: '#000000',
          backColorCode: '#ffffff'
        }
      }
    },
    colorConverter (number) {
      let x = ''
      let hex = number.toString(16)
      let finalHex = '#'
      if (hex.length < 6) {
        x = 6 - hex.length
        for (let y = 1; y <= x; y++) {
          finalHex += '0'
        }
        finalHex += hex
      } else {
        finalHex += hex
      }
      return finalHex
    },
    async colorSelectText (colorSetting) {
      if (this.colorDlgOpen === false) {
        this.colorDlgOpen = true
        if (colorSetting === true) {
          this.$refs.colorPickerDialog.open(this.settingData.textColorCode, this.colorSet, this.editDlgClose, this.getColorSelectedText)
        }
      }
    },
    async colorSelectBg (colorSetting) {
      if (this.colorDlgOpen === false) {
        this.colorDlgOpen = true
        if (colorSetting === true) {
          this.$refs.colorPickerDialog.open(this.settingData.backColorCode, this.colorSet, this.editDlgClose, this.getColorSelectedBg)
        }
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.colorDlgOpen = false
    },
    async getColorSelectedText (color) {
      if (color !== '') {
        this.settingData.textColorCode = color
      }
    },
    async getColorSelectedBg (color) {
      if (color !== '') {
        this.settingData.backColorCode = color
      }
    },
    rgbToHex (color) {
      let rgb2hex = c => '#' + c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``
      return rgb2hex(color)
    },
    openEnd () {
      document.getElementsByClassName('textWeekdayName')[0].focus()
      document.getElementById('editTable').scrollTo(0, 0)
    },
    async findStore (storeCd) {
      for (var i = 0; i < this.masters.storeMasters.length; i++) {
        if (this.masters.storeMasters[i].storeCd === storeCd) {
          return {
            storeCd: this.masters.storeMasters[i].storeCd,
            name: this.masters.storeMasters[i].name,
            isError: false
          }
        }
      }
      // 店舗が見つからなかった場合はエラーメッセージを表示して「保存」操作を無効化
      if (!this.operationLock) {
        this.$refs.pop.open(1, '', this.$i18n.t('F00004.S031'), '', false, null, false, null)
        this.operationLock = true
      }
      return { storeCd: storeCd, name: '', isError: true }
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    async isValidate() {
      this.errMessage.weekdayName = ''
      this.errMessage.weekdayShortName = ''
      let focusItem = []
      let result = 0
      if (!this.settingData.weekdayName || !this.settingData.weekdayShortName) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
      }
      if (!this.settingData.weekdayName) {
        this.errMessage.weekdayName = this.$i18n.t('C00214.E009')
        result++
        focusItem.push(this.$refs.weekdayNameText)
      }
      if (!this.settingData.weekdayShortName) {
        this.errMessage.weekdayShortName = this.$i18n.t('C00214.E009')
        result++
        focusItem.push(this.$refs.weekdayShortNameText)
      }
      if (focusItem.length > 0) focusItem[0].$el.focus()

      return result > 0
    },
    async onClickSave () {
      if (await this.isValidate()) return
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
    },
    async executeSave () {
      var result = false
      try {
        const params = {
          ...this.settingData,
          nodeId: this.nodeId,
          weekdayCode: Number(this.$refs.weekdayCodeText.value),
          weekdayName: this.$refs.weekdayNameText.value,
          weekdayShortName: this.$refs.weekdayShortNameText.value,
          textColorCode: this.$refs.textColorCode.style.backgroundColor ? parseInt(this.rgbToHex(this.$refs.textColorCode.style.backgroundColor).substring(1), 16) : 0,
          backColorCode: this.$refs.backColorCode.style.backgroundColor ? parseInt(this.rgbToHex(this.$refs.backColorCode.style.backgroundColor).substring(1), 16) : 16777215
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
      var result = false
      try {
        let response = await axios.put(this.$i18n.t('prop.url') + deletePath, {
          nodeId: this.nodeId,
          weekdayCode: this.settingData.weekdayCode
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
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    }
  }
}
//  KSD V001.000 AE
