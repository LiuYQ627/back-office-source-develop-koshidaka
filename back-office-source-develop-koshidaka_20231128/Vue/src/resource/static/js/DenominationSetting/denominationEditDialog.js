// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import Popup from '@/resource/templates/CommonDesign/Popup'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'
import { inputNumberLimitation } from '@/resource/static/js/Common/jsUtils'

const savePath = 'DeviceSetting/TerminalInfoRegist'

export default {
  name: 'DenominationEditDialog',
  data () {
    return {
      permissions: [],
      dialog: false,
      title: '',
      mode: 1,
      selectedScanner: 0,
      denominationData: { moneyTypeSettings: { denominationSetting: [] } },
      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      timeout: null,
      labelsDenominationType: [
        { code: 0, name: this.$i18n.t('F322b6.S035') },
        { code: 1, name: this.$i18n.t('F322b6.S036') }
      ],
      denominationList: [
        { code: 10000, name: this.$i18n.t('F322b6.S024') },
        { code: 5000, name: this.$i18n.t('F322b6.S025') },
        { code: 2000, name: this.$i18n.t('F322b6.S026') },
        { code: 1000, name: this.$i18n.t('F322b6.S027') },
        { code: 500, name: this.$i18n.t('F322b6.S028') },
        { code: 100, name: this.$i18n.t('F322b6.S029') },
        { code: 50, name: this.$i18n.t('F322b6.S030') },
        { code: 10, name: this.$i18n.t('F322b6.S031') },
        { code: 5, name: this.$i18n.t('F322b6.S032') },
        { code: 1, name: this.$i18n.t('F322b6.S033') }],
      denominationSetting: [{}],
      selectedPreviousDenomination: 0,
      selectedDenomination: 0,
      selectedDenominationSetting: {
        index: 0,
        denomination: 0,
        denominationType: 0,
        denominationTypeName: '',
        numberOfCoinsRoll: 0,
        remainingNumber: 0,
        nearEmpty: 0,
        nearFull: 0,
        maxStorage: 0
      },
      adjustmentLevelErrorMsg: '',
      remainingAmountErrorMsg: '',
      denominationErrorMsg: '',
      numberOfCoinsRollErrorMsg: '',
      remainingNumberErrorMsg: '',
      nearEmptyErrorMsg: '',
      nearFullErrorMsg: '',
      maxStorageErrorMsg: '',
      adjustmentLevelEmpty: false,
      remainingAmountEmpty: false,
      denominationEmpty: false,
      numberOfCoinsRollEmpty: false,
      numberOfCoinsRollNumeric: false,
      remainingNumberEmpty: false,
      nearEmptyEmpty: false,
      nearFullEmpty: false,
      maxStorageEmpty: false,
      previousRemainingAmountValue: '',
      backspaceAmountInvalid: false,
      focusField: []
    }
  },
  components: {
    Popup,
    RadioButton
  },
  methods: {
    open (storeCd, clientId, denominationData, refreshFunc, closeFunc) {
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      if (denominationData !== null) {
        this.mode = 2
        this.title = this.$i18n.t('F322b6.S012')
        this.denominationData = denominationData
        this.denominationSetting = denominationData.moneyTypeSettings.denominationSetting
        this.selectedDenomination = 0
        this.selectedDenominationSetting = {
          denomination: 0,
          denominationType: 0,
          denominationTypeName: '',
          numberOfCoinsRoll: 0,
          remainingNumber: 0,
          nearEmpty: 0,
          nearFull: 0,
          maxStorage: 0
        }
        this.previousRemainingAmountValue = denominationData.moneyTypeSettings.remainingAmount
        this.denominationData['storeCd'] = storeCd
        this.denominationData['clientId'] = clientId
      }
    },
    openEnd () {
      this.initErrorMessage()
      if (this.denominationData.moneyTypeSettings.denominationCollectionMethod === 'SPECIFY_NUMBER_OF_DENOMINATIONS') {
        this.enterDenominationCollectionMethod2()
      } else {
        this.enterDenominationCollectionMethod1()
      }
      if (this.denominationData.moneyTypeSettings.rollCalculation) {
        this.enterRollCalculation1()
      } else {
        this.enterRollCalculation2()
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.isHover()
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    checkClickOutside () {
      this.isHover()
    },
    isHover () {
      this.timeout = setTimeout(() => {
        const inputFocus = this.$refs.denominationCollectionMethod1Label
        inputFocus.focus()
      }, 50)
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    async onClickSave () {
      this.updateSelectedDenominationSetting()
      await this.onValidateSave()
      if (this.withEmptyFields()) {
        if (this.focusField.length > 0) this.focusField[0].focus()
        return
      }
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
    async onValidateSave () {
      try {
        this.focusField = []
        let result = false
        this.initErrorMessage()
        if (this.$refs.adjustmentLevelText.value === '' || this.$refs.adjustmentLevelText.value === null) {
          this.adjustmentLevelErrorMsg = this.$i18n.t('F322b6.E006')
          this.focusField.push(this.$refs.adjustmentLevelText)
          this.adjustmentLevelEmpty = true
        }
        if (this.$refs.remainingAmountText.value === '' || this.$refs.remainingAmountText.value === null) {
          this.remainingAmountErrorMsg = this.$i18n.t('F322b6.E006')
          this.focusField.push(this.$refs.remainingAmountText)
          this.remainingAmountEmpty = true
        }
        if (this.$refs.denominationText.value === '' || this.$refs.denominationText.value === null) {
          this.denominationErrorMsg = this.$i18n.t('F322b6.E007')
          this.focusField.push(this.$refs.denominationText)
          this.denominationEmpty = true
        }
        if (!this.denominationEmpty) {
          if (this.$refs.numberOfCoinsRollText.value === '' || this.$refs.numberOfCoinsRollText.value === null) {
            this.numberOfCoinsRollErrorMsg = this.$i18n.t('F322b6.E006')
            this.focusField.push(this.$refs.numberOfCoinsRollText)
            this.numberOfCoinsRollEmpty = true
          }
          if (this.$refs.numberOfCoinsRollText.value < 0 || this.$refs.numberOfCoinsRollText.value > 50) {
            this.numberOfCoinsRollErrorMsg = this.$i18n.t('F322b6.E011')
            this.focusField.push(this.$refs.numberOfCoinsRollText)
            this.numberOfCoinsRollNumeric = true
          }
          if (this.$refs.remainingNumberText.value === '' || this.$refs.remainingNumberText.value === null) {
            this.remainingNumberErrorMsg = this.$i18n.t('F322b6.E006')
            this.focusField.push(this.$refs.remainingNumberText)
            this.remainingNumberEmpty = true
          }
          if (this.$refs.nearEmptyText.value === '' || this.$refs.nearEmptyText.value === null) {
            this.nearEmptyErrorMsg = this.$i18n.t('F322b6.E006')
            this.focusField.push(this.$refs.nearEmptyText)
            this.nearEmptyEmpty = true
          }
          if (this.$refs.nearFullText.value === '' || this.$refs.nearFullText.value === null) {
            this.nearFullErrorMsg = this.$i18n.t('F322b6.E006')
            this.focusField.push(this.$refs.nearFullText)
            this.nearFullEmpty = true
          }
          if (this.$refs.maxStorageText.value === '' || this.$refs.maxStorageText.value === null) {
            this.maxStorageErrorMsg = this.$i18n.t('F322b6.E006')
            this.focusField.push(this.$refs.maxStorageText)
            this.maxStorageEmpty = true
          }
        }
        return result
      } catch (error) {
        throw error
      }
    },
    async executeSave () {
      let result = false
      try {
        const params = {
          terminalInfos: [{
            clientId: this.denominationData.endpointId,
            mode: this.mode,
            storeCd: this.denominationData.nodeId,
            name: this.denominationData.deviceName,
            terminalType: this.denominationData.terminalType,
            version: this.denominationData.version,
            moneyTypeSettings: this.denominationData.moneyTypeSettings
          }]
        }
        params.terminalInfos[0].moneyTypeSettings.adjustmentLevel = Number(params.terminalInfos[0].moneyTypeSettings.adjustmentLevel)
        params.terminalInfos[0].moneyTypeSettings.remainingAmount = Number(params.terminalInfos[0].moneyTypeSettings.remainingAmount)
        // 保存
        const response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    saveErrorMapping (result) {
      this.focusItem = null
      if (result.code === -99) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), result.code, false, this.setFocus, false, null)
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
        const globalErrorMsg = result.errorMessageMap['global'].toString()
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
      this.adjustmentLevelErrorMsg = ''
      this.remainingAmountErrorMsg = ''
      this.denominationErrorMsg = ''
      this.numberOfCoinsRollErrorMsg = ''
      this.remainingNumberErrorMsg = ''
      this.nearEmptyErrorMsg = ''
      this.nearFullErrorMsg = ''
      this.maxStorageErrorMsg = ''
      this.adjustmentLevelEmpty = false
      this.remainingAmountEmpty = false
      this.denominationEmpty = false
      this.numberOfCoinsRollEmpty = false
      this.numberOfCoinsRollNumeric = false
      this.remainingNumberEmpty = false
      this.nearEmptyEmpty = false
      this.nearFullEmpty = false
      this.maxStorageEmpty = false
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    },
    keydownRemainingAmount (e) {
      this.backspaceAmountInvalid = false
      if (e.keyCode === 8 && Number(this.$refs.remainingAmountText.value.slice(0, -1)) < 1000) {
        this.backspaceAmountInvalid = true
      }
    },
    addZerosToRemainingAmount (e, inputObject, inputVariable, limit) {
      this.inputNumberLimit(e, inputObject, inputVariable, limit)

      const textBox = this.$refs.remainingAmountText
      let textBoxValue = textBox.value

      const selectionStart = textBox.selectionStart
      const selectionEnd = textBox.selectionEnd

      // 半角数字以外の入力を削除
      textBoxValue = textBoxValue.replace(/[^0-9]/g, '')

      // バックスペースキーを押した場合や空の場合はテキストボックスを空にする
      // 桁数が6文字を超える場合、制限する
      if (textBoxValue === '' ||
          textBoxValue === null ||
          textBoxValue === '000' ||
          this.backspaceAmountInvalid ||
          textBoxValue.length > 6) {
        if (textBoxValue.length > 6) {
          textBox.value = this.previousRemainingAmountValue
          textBox.selectionStart = selectionStart
          textBox.selectionEnd = selectionEnd
        } else {
          textBox.value = ''
        }
        this.previousRemainingAmountValue = textBox.value
        inputObject[inputVariable] = this.previousRemainingAmountValue
        return
      }

      // 末尾の "000" を削除
      if (textBoxValue.endsWith('000')) {
        textBoxValue = textBoxValue.slice(0, -3)
      }

      // 入力値が "0" の場合はそのまま表示
      if (textBoxValue === '0') {
        textBox.value = ''
      } else {
        // 末尾に固定の "000" を追加する
        textBox.value = textBoxValue + '000'
      }

      // 入力値が999000以上の場合、制限する
      if (Number(textBox.value) > 999000) {
        textBox.value = this.previousRemainingAmountValue
        this.previousRemainingAmountValue = textBox.value
        inputObject[inputVariable] = this.previousRemainingAmountValue
        textBox.selectionStart = selectionStart
        textBox.selectionEnd = selectionEnd
        return
      }

      // カーソル位置を復元
      this.previousRemainingAmountValue = textBox.value
      inputObject[inputVariable] = this.previousRemainingAmountValue
      textBox.selectionStart = selectionStart
      textBox.selectionEnd = selectionEnd
    },
    getSelectedDenominationSetting () {
      if (this.selectedPreviousDenomination !== 0) {
        this.onValidateSave()
        if (this.withEmptyFields()) {
          this.selectedDenomination = this.selectedPreviousDenomination
          return
        }
      }
      this.updateSelectedDenominationSetting()
      for (let i = 0; i < this.denominationData.moneyTypeSettings.denominationSetting.length; i++) {
        if (this.denominationData.moneyTypeSettings.denominationSetting[i].denomination === this.selectedDenomination) {
          this.selectedDenominationSetting.denomination = this.denominationData.moneyTypeSettings.denominationSetting[i].denomination
          this.selectedDenominationSetting.denominationType = this.denominationData.moneyTypeSettings.denominationSetting[i].denominationType
          this.selectedDenominationSetting.denominationTypeName = this.labelsDenominationType.find(e => e.code === this.selectedDenominationSetting.denominationType).name || ''
          this.selectedDenominationSetting.numberOfCoinsRoll = this.selectedDenomination === 10000 || this.selectedDenomination === 5000 || this.selectedDenomination === 2000 || this.selectedDenomination === 1000 ? 0 : this.denominationData.moneyTypeSettings.denominationSetting[i].numberOfCoinsRoll
          this.selectedDenominationSetting.remainingNumber = this.selectedDenomination === 2000 ? 0 : this.denominationData.moneyTypeSettings.denominationSetting[i].remainingNumber
          this.selectedDenominationSetting.nearEmpty = this.selectedDenomination === 10000 || this.selectedDenomination === 2000 ? 0 : this.denominationData.moneyTypeSettings.denominationSetting[i].nearEmpty
          this.selectedDenominationSetting.nearFull = this.denominationData.moneyTypeSettings.denominationSetting[i].nearFull
          this.selectedDenominationSetting.maxStorage = this.denominationData.moneyTypeSettings.denominationSetting[i].maxStorage
          break
        }
      }
      this.selectedPreviousDenomination = this.selectedDenomination
    },
    updateSelectedDenominationSetting () {
      for (let i = 0; i < this.denominationData.moneyTypeSettings.denominationSetting.length; i++) {
        if (Number(this.denominationData.moneyTypeSettings.denominationSetting[i].denomination) === Number(this.selectedDenominationSetting.denomination)) {
          this.denominationData.moneyTypeSettings.denominationSetting[i].numberOfCoinsRoll = Number(this.selectedDenominationSetting.numberOfCoinsRoll)
          this.denominationData.moneyTypeSettings.denominationSetting[i].remainingNumber = Number(this.selectedDenominationSetting.remainingNumber)
          this.denominationData.moneyTypeSettings.denominationSetting[i].nearEmpty = Number(this.selectedDenominationSetting.nearEmpty)
          this.denominationData.moneyTypeSettings.denominationSetting[i].nearFull = Number(this.selectedDenominationSetting.nearFull)
          this.denominationData.moneyTypeSettings.denominationSetting[i].maxStorage = Number(this.selectedDenominationSetting.maxStorage)
          break
        }
      }
    },
    onChangeDenominationCollectionMethod1 () {
      this.$refs.denominationCollectionMethod1.checked = true
      this.denominationData.moneyTypeSettings.denominationCollectionMethod = 'AMOUNT_SPECIFIED'
    },
    onChangeDenominationCollectionMethod2 () {
      this.$refs.denominationCollectionMethod2.checked = true
      this.denominationData.moneyTypeSettings.denominationCollectionMethod = 'SPECIFY_NUMBER_OF_DENOMINATIONS'
    },
    enterDenominationCollectionMethod1 () {
      this.$refs.denominationCollectionMethod1.checked = true
      this.denominationData.moneyTypeSettings.denominationCollectionMethod = 'AMOUNT_SPECIFIED'
    },
    enterDenominationCollectionMethod2 () {
      this.$refs.denominationCollectionMethod2.checked = true
      this.denominationData.moneyTypeSettings.denominationCollectionMethod = 'SPECIFY_NUMBER_OF_DENOMINATIONS'
    },
    onChangeRollCalculation1 () {
      this.$refs.rollCalculation1.checked = true
      this.denominationData.moneyTypeSettings.rollCalculation = true
    },
    onChangeRollCalculation2 () {
      this.$refs.rollCalculation2.checked = true
      this.denominationData.moneyTypeSettings.rollCalculation = false
    },
    enterRollCalculation1 () {
      this.$refs.rollCalculation1.checked = true
      this.denominationData.moneyTypeSettings.rollCalculation = true
    },
    enterRollCalculation2 () {
      this.$refs.rollCalculation2.checked = true
      this.denominationData.moneyTypeSettings.rollCalculation = false
    },
    withEmptyFields () {
      if (this.adjustmentLevelEmpty ||
        this.remainingAmountEmpty ||
        this.denominationEmpty ||
        this.numberOfCoinsRollEmpty ||
        this.numberOfCoinsRollNumeric ||
        this.remainingNumberEmpty ||
        this.nearEmptyEmpty ||
        this.nearFullEmpty ||
        this.maxStorageEmpty) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
        if (this.focusField.length > 0) this.focusField[0].focus()
        return true
      }
      return false
    }
  },
  mounted () {
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
}
// KSD V001.000 AE
