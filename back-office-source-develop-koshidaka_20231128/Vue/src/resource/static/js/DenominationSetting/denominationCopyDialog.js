// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import Popup from '@/resource/templates/CommonDesign/Popup'

const savePath = 'DeviceSetting/TerminalInfoRegist'

export default {
  name: 'DenominationCopyDialog',
  data () {
    return {
      permissions: [],
      dialog: false,
      title: '',
      mode: 1,
      selectedScanner: 0,
      terminalInfos: [],
      fromErrorMsg: '',
      toErrorMsg: '',
      terminalTypeErrorMsg: '',
      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      timeout: null,
      dataList: [],
      terminalList: [],
      terminalItemFrom: '',
      terminalItemTo: '',
      itemFromEmpty: false,
      itemToEmpty: false
    }
  },
  components: {
    Popup
  },
  methods: {
    open (storeCd, dataList, refreshFunc, closeFunc) {
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.dataList = dataList
      this.terminalList = []
      this.terminalItemFrom = ''
      this.terminalItemTo = ''
      this.terminalList = dataList.map((value) => {
        return {
          code: value.endpointId
        }
      })
      this.storeCd = storeCd
    },
    openEnd () {
      this.initErrorMessage()
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.$refs.terminalItemFromText.focus()
      }, 50)
    },
    onClickReturn () {
      this.dialog = false
      this.closeFunc()
    },
    async onClickSave () {
      try {
        this.initErrorMessage()
        await this.onValidateSave()
        if (this.itemFromEmpty && this.itemToEmpty) {
          this.$refs.pop.open(3, '', this.$i18n.t('F322b6.E004'), -99, false, null, false, null)
          return
        } else if (this.$refs.terminalItemFromText.value === this.$refs.terminalItemToText.value) {
          this.$refs.pop.open(3, '', this.$i18n.t('F322b6.E005'), -99, false, null, false, null)
          return
        }
        if (this.itemFromEmpty) {
          this.$refs.pop.open(3, '', this.$i18n.t('F322b6.E002'), -99, false, null, false, null)
          return
        }
        if (this.itemToEmpty) {
          this.$refs.pop.open(3, '', this.$i18n.t('F322b6.E003'), -99, false, null, false, null)
          return
        }
        this.$refs.pop.open(1, '', this.$i18n.t('F322b6.W001'), '', true, this.runCopy, false, null)
      } catch (error) {
        console.error(error)
      }
    },
    async runCopy () {
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
        let focusField = []
        let result = false
        if (this.$refs.terminalItemFromText.value === '' || this.$refs.terminalItemFromText.value === null) {
          this.fromErrorMsg = this.$i18n.t('F322b6.E008')
          focusField.push(this.$refs.terminalItemFromText)
          this.itemFromEmpty = true
        }
        if (this.$refs.terminalItemToText.value === '' || this.$refs.terminalItemToText.value === null) {
          this.toErrorMsg = this.$i18n.t('F322b6.E009')
          focusField.push(this.$refs.terminalItemToText)
          this.itemToEmpty = true
        }
        if (this.itemFromEmpty && this.itemToEmpty) {
          this.fromErrorMsg = this.$i18n.t('F322b6.E008')
          this.toErrorMsg = this.$i18n.t('F322b6.E009')
          focusField.push(this.$refs.terminalItemFromText)
          focusField.push(this.$refs.terminalItemToText)
        } else if ((!this.itemFromEmpty && !this.itemToEmpty) &&
                  (this.$refs.terminalItemFromText.value === this.$refs.terminalItemToText.value)) {
          this.fromErrorMsg = this.$i18n.t('F322b6.E010')
          this.toErrorMsg = this.$i18n.t('F322b6.E010')
          focusField.push(this.$refs.terminalItemFromText)
          focusField.push(this.$refs.terminalItemToText)
        }
        if (focusField.length > 0) focusField[0].focus()
        return result
      } catch (error) {
        throw error
      }
    },
    async executeSave () {
      var result = false
      try {
        const sourceDenominationData = this.dataList.find(e => e.endpointId === this.$refs.terminalItemFromText.value)
        const destinationDenominationData = this.dataList.find(e => e.endpointId === this.$refs.terminalItemToText.value)
        const params = {
          terminalInfos: [{
            clientId: destinationDenominationData.endpointId,
            mode: 2,
            storeCd: destinationDenominationData.nodeId,
            name: destinationDenominationData.deviceName,
            terminalType: destinationDenominationData.terminalType,
            version: destinationDenominationData.version,
            moneyTypeSettings: sourceDenominationData.moneyTypeSettings
          }]
        }
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
      this.fromErrorMsg = ''
      this.toErrorMsg = ''
      this.itemFromEmpty = false
      this.itemToEmpty = false
    }
  },
  mounted () {
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
}
// KSD V001.000 AE
