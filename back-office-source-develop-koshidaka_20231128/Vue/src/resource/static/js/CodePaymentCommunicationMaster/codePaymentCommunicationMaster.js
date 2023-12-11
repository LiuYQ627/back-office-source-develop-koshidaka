// KSD V001.000 AS
import commonUtils from '@/resource/static/js/Common/commonUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import { inputNumberLimitation } from '@/resource/static/js/Common/jsUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import axios from 'axios'

const fetchCurrentConfigPath = 'Reservation/FetchConfigurationRecursive'
const updateCurrentConfigPath = 'Reservation/UpdateConfigurationBy5Step'

export default {
  name: 'CodePaymentCommunicationMaster',
  mixins: [errorMappingUtils],
  data () {
    return {
      headquartersAuthority: 0,
      edited: false,
      targetStoreCodes: [],
      focusField: [],
      disabledFixedBtn: true,
      isShowCommSetting1Panel: true,
      isShowCommSetting2Panel: true,
      isShowMessSettingPanel: true,
      paydnsserverOptions: [
        { name: this.$i18n.t('C00223.S027'), value: '0' },
        { name: this.$i18n.t('C00223.S028'), value: '1' }
      ],
      printOptions: [
        { name: this.$i18n.t('C00223.S027'), value: '0' },
        { name: this.$i18n.t('C00223.S028'), value: '1' }
      ],
      paycompanyCodeErrorMsg: '',
      paystoreCodeErrorMsg: '',
      payreqstorecodeErrorMsg: '',
      payreqterminalcodeErrorMsg: '',
      paytreeidErrorMsg: '',
      pay_ipadrErrorMsg: '',
      paycenternameErrorMsg: '',
      payportnoErrorMsg: '',
      payurlErrorMsg: '',
      payrcvtimeoutErrorMsg: '',
      payposopErrorMsg: '',
      payposappnameErrorMsg: '',
      payposappverErrorMsg: '',
      payretrywaittimeErrorMsg: '',
      payretrycountErrorMsg: '',
      payalarmmsg1ErrorMsg: '',
      payalarmmsg2ErrorMsg: '',
      payalarmmsg3ErrorMsg: '',
      payalarmmsg4ErrorMsg: '',
      payalarmmsg5ErrorMsg: '',
      configData: {},
      defaultConfigData: {
        paycompanyCode: 0,
        paystoreCode: 0,
        payreqstorecode: '',
        payreqterminalcode: '',
        paytreeid: '',
        paycpgwtranid: '',
        paydnsserver: 0,
        pay_ipadr: '0.0.0.0',
        paycentername: '',
        payportno: 0,
        payurl: '',
// KSD V001.000 DS issue #1259対応 RCVタイムアウト時間の初期値変更("30000" ⇒ "30")
        //payrcvtimeout: 30000,
// KSD V001.000 DE issue #1259対応 RCVタイムアウト時間の初期値変更("30000" ⇒ "30")
// KSD V001.000 AS issue #1259対応 RCVタイムアウト時間の初期値変更("30000" ⇒ "30")
        payrcvtimeout: 30,
// KSD V001.000 AE issue #1259対応 RCVタイムアウト時間の初期値変更("30000" ⇒ "30")
        payposop: 'windows',
        payposappname: '',
        payposappver: '',
        payretrywaittime: 10,
        payretrycount: 5
      },
      alarmData: {},
      defaultAlarmData: {
        payalarmmsg1prt: '1',
        payalarmmsg1: '',
        payalarmmsg2prt: '1',
        payalarmmsg2: '',
        payalarmmsg3prt: '1',
        payalarmmsg3: '',
        payalarmmsg4prt: '1',
        payalarmmsg4: '',
        payalarmmsg5prt: '1',
        payalarmmsg5: ''
      },
      setting: null
    }
  },
  components: {
    maintButton,
    storeSelect,
    FormGroupLayout,
    popup,
    SelectInput,
    TextInput
  },
  methods: {
    async initialize () {
      this.resetErrorMsgs()
      if (await this.getCodepaySettings() === true) {
        this.edited = true
        this.handleMaintButtonCommSetting1()
        let formLabels = document.getElementsByClassName('form-label')
        for (let i = 1; i < formLabels.length; i++) {
          formLabels[i].style.justifyContent = 'flex-start'
          formLabels[i].style.paddingLeft = '10px'
        }
      }
    },
    resetErrorMsgs () {
      this.paycompanyCodeErrorMsg = ''
      this.paystoreCodeErrorMsg = ''
      this.payreqstorecodeErrorMsg = ''
      this.payreqterminalcodeErrorMsg = ''
      this.paytreeidErrorMsg = ''
      this.pay_ipadrErrorMsg = ''
      this.paycenternameErrorMsg = ''
      this.payportnoErrorMsg = ''
      this.payurlErrorMsg = ''
      this.payrcvtimeoutErrorMsg = ''
      this.payposopErrorMsg = ''
      this.payposappnameErrorMsg = ''
      this.payposappverErrorMsg = ''
      this.payretrywaittimeErrorMsg = ''
      this.payretrycountErrorMsg = ''
      this.payalarmmsg1ErrorMsg = ''
      this.payalarmmsg2ErrorMsg = ''
      this.payalarmmsg3ErrorMsg = ''
      this.payalarmmsg4ErrorMsg = ''
      this.payalarmmsg5ErrorMsg = ''
    },
    async getCodepaySettings () {
      let result = false
      let temp = ''
      try {
        let response = await axios.put(this.$i18n.t('prop.url') + fetchCurrentConfigPath, {
          nodeId: this.targetStoreCodes[0],
          excludeFields: false
        }, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          if ((response.data.responseModel.configurations.CODEPAY_PROPERTY_SETTINGS !== undefined) && (response.data.responseModel.configurations.CODEPAY_ALARMMESSAGE_SETTINGS !== undefined)) {
            result = true
            this.setting = response.data.responseModel
            this.configData = Object.assign({}, this.defaultConfigData, response.data.responseModel.configurations.CODEPAY_PROPERTY_SETTINGS.value)
            Object.entries(this.configData).forEach(([key, value]) => {
              if (value === null) {
                this.configData[key] = this.defaultConfigData[key]
              }
            })
            if (!((this.configData['paycompanyCode'] >= 0) && (this.configData['paycompanyCode'] <= 99999))) this.configData['paycompanyCode'] = this.defaultConfigData['paycompanyCode']
            if (!((this.configData['paystoreCode'] >= 0) && (this.configData['paystoreCode'] <= 999999))) this.configData['paystoreCode'] = this.defaultConfigData['paystoreCode']
            temp = this.configData['payreqstorecode']
            this.inputLimit(this.configData['payreqstorecode'], this.configData, 'payreqstorecode', 'alNum_-.', 32)
            if (temp !== this.configData['payreqstorecode']) this.configData['payreqstorecode'] = this.defaultConfigData['payreqstorecode']
            temp = this.configData['payreqterminalcode']
            this.inputLimit(this.configData['payreqterminalcode'], this.configData, 'payreqterminalcode', 'alNum_-.', 32)
            if (temp !== this.configData['payreqterminalcode']) this.configData['payreqterminalcode'] = this.defaultConfigData['payreqterminalcode']
            temp = this.configData['paytreeid']
            this.inputLimit(this.configData['paytreeid'], this.configData, 'paytreeid', 'alNum', 12)
            if (temp !== this.configData['paytreeid']) this.configData['paytreeid'] = this.defaultConfigData['paytreeid']
            if (!((this.configData['paydnsserver'] === 0) || (this.configData['paydnsserver'] === 1))) this.configData['paydnsserver'] = this.defaultConfigData['paydnsserver']
            temp = this.configData['pay_ipadr']
            this.inputLimit(this.configData['pay_ipadr'], this.configData, 'pay_ipadr', 'ipAdd', 15)
            if (temp !== this.configData['pay_ipadr']) this.configData['pay_ipadr'] = this.defaultConfigData['pay_ipadr']
            temp = this.configData['paycentername']
            this.inputLimit(this.configData['paycentername'], this.configData, 'paycentername', 'alNum%&.-', 100)
            if (temp !== this.configData['paycentername']) this.configData['paycentername'] = this.defaultConfigData['paycentername']
            if (!((this.configData['payportno'] >= 0) && (this.configData['payportno'] <= 99999))) this.configData['payportno'] = this.defaultConfigData['payportno']
            temp = this.configData['payurl']
            this.inputLimit(this.configData['payurl'], this.configData, 'payurl', 'commSet2TextArea', 255)
            if (temp !== this.configData['payurl']) this.configData['payurl'] = this.defaultConfigData['payurl']
            if (!((this.configData['payrcvtimeout'] >= 0) && (this.configData['payrcvtimeout'] <= 9999999999))) this.configData['payrcvtimeout'] = this.defaultConfigData['payrcvtimeout']
            temp = this.configData['payposop']
            this.inputLimit(this.configData['payposop'], this.configData, 'payposop', 'alNum', 10)
            if (temp !== this.configData['payposop']) this.configData['payposop'] = this.defaultConfigData['payposop']
            temp = this.configData['payposappname']
            this.inputLimit(this.configData['payposappname'], this.configData, 'payposappname', 'alNum', 10)
            if (temp !== this.configData['payposappname']) this.configData['payposappname'] = this.defaultConfigData['payposappname']
            temp = this.configData['payposappver']
            this.inputLimit(this.configData['payposappver'], this.configData, 'payposappver', 'alNum_-.', 10)
            if (temp !== this.configData['payposappver']) this.configData['payposappver'] = this.defaultConfigData['payposappver']
            if (!((this.configData['payretrywaittime'] >= 0) && (this.configData['payretrywaittime'] <= 9999))) this.configData['payretrywaittime'] = this.defaultConfigData['payretrywaittime']
            if (!((this.configData['payretrycount'] >= 0) && (this.configData['payretrycount'] <= 99))) this.configData['payretrycount'] = this.defaultConfigData['payretrycount']
            this.alarmData = Object.assign({}, this.defaultAlarmData, response.data.responseModel.configurations.CODEPAY_ALARMMESSAGE_SETTINGS.value)
            Object.entries(this.alarmData).forEach(([key, value]) => {
              if (value === null) {
                this.alarmData[key] = this.defaultAlarmData[key]
              }
            })
            if (!((this.alarmData['payalarmmsg1prt'] === 0) || (this.alarmData['payalarmmsg1prt'] === 1))) this.alarmData['payalarmmsg1prt'] = this.defaultAlarmData['payalarmmsg1prt']
            temp = this.alarmData['payalarmmsg1']
            this.inputLimit(this.alarmData['payalarmmsg1'], this.alarmData, 'payalarmmsg1', null, 32)
            if (temp !== this.alarmData['payalarmmsg1']) this.alarmData['payalarmmsg1'] = this.defaultAlarmData['payalarmmsg1']
            if (!((this.alarmData['payalarmmsg2prt'] === 0) || (this.alarmData['payalarmmsg2prt'] === 1))) this.alarmData['payalarmmsg2prt'] = this.defaultAlarmData['payalarmmsg2prt']
            temp = this.alarmData['payalarmmsg2']
            this.inputLimit(this.alarmData['payalarmmsg2'], this.alarmData, 'payalarmmsg2', null, 32)
            if (temp !== this.alarmData['payalarmmsg2']) this.alarmData['payalarmmsg2'] = this.defaultAlarmData['payalarmmsg2']
            if (!((this.alarmData['payalarmmsg3prt'] === 0) || (this.alarmData['payalarmmsg3prt'] === 1))) this.alarmData['payalarmmsg3prt'] = this.defaultAlarmData['payalarmmsg3prt']
            temp = this.alarmData['payalarmmsg3']
            this.inputLimit(this.alarmData['payalarmmsg3'], this.alarmData, 'payalarmmsg3', null, 32)
            if (temp !== this.alarmData['payalarmmsg3']) this.alarmData['payalarmmsg3'] = this.defaultConfigData['payalarmmsg3']
            if (!((this.alarmData['payalarmmsg4prt'] === 0) || (this.alarmData['payalarmmsg4prt'] === 1))) this.alarmData['payalarmmsg4prt'] = this.defaultAlarmData['payalarmmsg4prt']
            temp = this.alarmData['payalarmmsg4']
            this.inputLimit(this.alarmData['payalarmmsg4'], this.alarmData, 'payalarmmsg4', null, 32)
            if (temp !== this.alarmData['payalarmmsg4']) this.alarmData['payalarmmsg4'] = this.defaultConfigData['payalarmmsg4']
            if (!((this.alarmData['payalarmmsg5prt'] === 0) || (this.alarmData['payalarmmsg5prt'] === 1))) this.alarmData['payalarmmsg5prt'] = this.defaultAlarmData['payalarmmsg5prt']
            temp = this.alarmData['payalarmmsg5']
            this.inputLimit(this.alarmData['payalarmmsg5'], this.alarmData, 'payalarmmsg5', null, 32)
            if (temp !== this.alarmData['payalarmmsg5']) this.alarmData['payalarmmsg5'] = this.defaultAlarmData['payalarmmsg5']
          } else {
            this.targetStoreCodes = []
            this.disabledFixedBtn = true
            this.isShowCommSetting1Panel = true
            this.isShowCommSetting2Panel = true
            this.isShowMessSettingPanel = true
            this.openPopupDialog({
              mode: 3,
              message: this.$i18n.t('O00004.W010')
            })
          }
        } else {
          this.targetStoreCodes = []
          this.disabledFixedBtn = true
          this.isShowCommSetting1Panel = true
          this.isShowCommSetting2Panel = true
          this.isShowMessSettingPanel = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.targetStoreCodes = []
        this.disabledFixedBtn = true
        this.isShowCommSetting1Panel = true
        this.isShowCommSetting2Panel = true
        this.isShowMessSettingPanel = true
        this.openPopupDialog({
          mode: 3,
          message: this.$i18n.t('O00004.W010')
        })
        console.error(error)
      }
      return result
    },
    handleStoreSelectChange () {
      if (this.targetStoreCodes[0]) {
        this.initialize()
      }
    },
    storeClicked () {
      this.openPopupDialog({
        mode: 1,
        message: this.$i18n.t('O00004.W003'),
        showBackBtn: true,
        okBtnCallback: () => {
          this.proceedStoreClick()
        }
      })
    },
    proceedStoreClick () {
      this.edited = false
      this.disabledFixedBtn = true
      this.isShowCommSetting1Panel = true
      this.isShowCommSetting2Panel = true
      this.isShowMessSettingPanel = true
      this.timeout = setTimeout(() => {
        this.$refs.storeSelect.openDialog()
      }, 50)
    },
    handleMaintButtonClose () {
      if (this.disabledFixedBtn === false) {
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => {
          this.$router.push('/TopPage')
        }, false, null)
      } else {
        this.$router.push('/TopPage')
      }
    },
    async handleMaintButtonFixed () {
      let result = false
      try {
        if (this.onValidateSave()) {
          this.configData.paycpgwtranid = ''
          this.configData.paycompanyCode = Number(this.configData.paycompanyCode)
          this.configData.paydnsserver = Number(this.configData.paydnsserver)
          this.configData.payportno = Number(this.configData.payportno)
          this.configData.payrcvtimeout = Number(this.configData.payrcvtimeout)
          this.configData.payretrycount = Number(this.configData.payretrycount)
          this.configData.payretrywaittime = Number(this.configData.payretrywaittime)
          this.configData.paystoreCode = Number(this.configData.paystoreCode)
          // KSD V001.000 DS　更新時のフィールドの形式が不正でエラーになる対応
          // this.setting.configurations.CODEPAY_PROPERTY_SETTINGS = this.configData
          // KSD V001.000 DE　更新時のフィールドの形式が不正でエラーになる対応
          // KSD V001.000 AS　更新時のフィールドの形式が不正でエラーになる対応
          this.setting.configurations.CODEPAY_PROPERTY_SETTINGS.value = this.configData
          // KSD V001.000 AE　更新時のフィールドの形式が不正でエラーになる対応
          this.alarmData.payalarmmsg1prt = Number(this.alarmData.payalarmmsg1prt)
          this.alarmData.payalarmmsg2prt = Number(this.alarmData.payalarmmsg2prt)
          this.alarmData.payalarmmsg3prt = Number(this.alarmData.payalarmmsg3prt)
          this.alarmData.payalarmmsg4prt = Number(this.alarmData.payalarmmsg4prt)
          this.alarmData.payalarmmsg5prt = Number(this.alarmData.payalarmmsg5prt)
          // KSD V001.000 DS　更新時のフィールドの形式が不正でエラーになる対応
          // this.setting.configurations.CODEPAY_ALARMMESSAGE_SETTINGS = this.alarmData
          // KSD V001.000 DS　更新時のフィールドの形式が不正でエラーになる対応
          // KSD V001.000 AS　更新時のフィールドの形式が不正でエラーになる対応
          this.setting.configurations.CODEPAY_ALARMMESSAGE_SETTINGS.value = this.alarmData
          // KSD V001.000 AE　更新時のフィールドの形式が不正でエラーになる対応
          const params = {
            nodeId: this.targetStoreCodes[0],
            configuration: this.setting,
            mode: 0
          }
          this.openPopupDialog({
            mode: 4,
            message: this.$i18n.t('O00004.W009')
          })
          // 保存
          let response = await axios.put(this.$i18n.t('prop.url') + updateCurrentConfigPath, params, commonUtils.methods.getApiHeader())
          if (response.data.result.code === 0) {
            result = true
            if (await this.getCodepaySettings()) {
              this.openPopupDialog({
                mode: 2,
                message: this.$i18n.t('O00004.W002')
              })
            }
          } else {
            result = false
            this.globalErrorMapping(response.data.result)
          }
        } else {
          result = false
          if (this.$refs.pop) {
            this.openPopupDialog({
              mode: 3,
              message: this.$i18n.t('O00004.W006'),
              code: -99
            })
          }
          this.$nextTick(() => {
            this.focusField[0].$el.focus()
          })
        }
      } catch (error) {
        this.openPopupDialog({
          mode: 3,
          message: this.$i18n.t('O00004.W010')
        })
        console.error(error)
      }
      return result
    },
    async masterDataQuery (url, requestPayload, queryParams, successCallback) {
      return new Promise((resolve, reject) => {
        axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (successCallback != null) {
                successCallback(response.data.responseModel)
              }
              resolve(response)
              break
            case 2: // 2:該当する情報なし
              resolve(response)
              break
            default: // その他
              this.globalErrorMapping(response.data.result)
              reject(response)
              break
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        }).catch(async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        })
      })
    },
    handleMaintButtonCommSetting1 () {
      this.disabledFixedBtn = false
      this.isShowCommSetting1Panel = true
      this.isShowCommSetting2Panel = false
      this.isShowMessSettingPanel = false
      this.focusFirstFocusableElement()
    },
    handleMaintButtonCommSetting2 () {
      this.disabledFixedBtn = false
      this.isShowCommSetting1Panel = false
      this.isShowCommSetting2Panel = true
      this.isShowMessSettingPanel = false
      this.focusFirstFocusableElement()
    },
    handleMaintButtonMessSetting () {
      this.disabledFixedBtn = false
      this.isShowCommSetting1Panel = false
      this.isShowCommSetting2Panel = false
      this.isShowMessSettingPanel = true
      this.focusFirstFocusableElement()
    },
    inputLimit (value, inputObject, inputVariable, prohibitFlag = null, maxByteLength = null) {
      let byteCount = 0
      if (maxByteLength > 0) {
        const output = `${value}`.split('').reduce((out, char) => {
          const temp = char.charCodeAt(0).toString(16).toUpperCase()
          if (out.byteCount + (temp.length / 2) <= maxByteLength) {
            out.byteCount += temp.length / 2
            out.value += '' + char
          }
          return out
        }, {
          byteCount: 0,
          value: ''
        })
        value = `${output.value}`
        byteCount = `${output.byteCount}`
      }
      if (Number(byteCount) === Number(maxByteLength)) {
        inputObject[inputVariable] = value
        this.$refs[inputVariable].$el.value = value
      }
      if (prohibitFlag === 'commSet2TextArea') {
        const cleanedValue = value.replace(/[^\x00-\x7F]/g, '').replace(/[\\\'\|\`\^\"\<\>\)\(\}\{\]\[]/g, '')
        inputObject[inputVariable] = cleanedValue
        this.$refs[inputVariable].$el.value = inputObject[inputVariable]
      } else if (prohibitFlag === 'alNum_-.') {
        inputObject[inputVariable] = validationUtils.methods.excludeProhibitedInput(value, /[^a-zA-Z0-9\_\-\.]/g, inputObject, inputVariable)
        this.$refs[inputVariable].$el.value = this.configData[inputVariable]
      } else if (prohibitFlag === 'alNum.') {
        inputObject[inputVariable] = validationUtils.methods.excludeProhibitedInput(value, /[^a-zA-Z0-9\.]/g, inputObject, inputVariable)
        this.$refs[inputVariable].$el.value = inputObject[inputVariable]
      } else if (prohibitFlag === 'alNum') {
        inputObject[inputVariable] = validationUtils.methods.excludeProhibitedInput(value, /[^a-zA-Z0-9]/g, inputObject, inputVariable)
        this.$refs[inputVariable].$el.value = inputObject[inputVariable]
      } else if (prohibitFlag === 'ipAdd') {
        inputObject[inputVariable] = validationUtils.methods.excludeProhibitedInput(value, /[^0-9\.]/g, inputObject, inputVariable)
        this.$refs[inputVariable].$el.value = inputObject[inputVariable]
      } else if (prohibitFlag === 'alNum%&.-') {
        inputObject[inputVariable] = validationUtils.methods.excludeProhibitedInput(value, /[^a-zA-Z0-9ａ-ｚＡ-Ｚ０-９\%\&\.\-]/g, inputObject, inputVariable)
        this.$refs[inputVariable].$el.value = inputObject[inputVariable]
      } else if (prohibitFlag === 'num') {
        inputObject[inputVariable] = validationUtils.methods.excludeProhibitedInput(value, /[^0-9]/g, inputObject, inputVariable)
        this.$refs[inputVariable].$el.value = inputObject[inputVariable]
      }
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    },
    onValidateSave () {
      this.focusField = []
      this.paycompanyCodeErrorMsg = ''
      this.paystoreCodeErrorMsg = ''
      this.payreqstorecodeErrorMsg = ''
      this.payreqterminalcodeErrorMsg = ''
      this.paytreeidErrorMsg = ''
      this.pay_ipadrErrorMsg = ''
      this.paycenternameErrorMsg = ''
      this.payportnoErrorMsg = ''
      this.payurlErrorMsg = ''
      this.payrcvtimeoutErrorMsg = ''
      this.payposopErrorMsg = ''
      this.payposappnameErrorMsg = ''
      this.payposappverErrorMsg = ''
      this.payretrywaittimeErrorMsg = ''
      this.payretrycountErrorMsg = ''
      this.payalarmmsg1ErrorMsg = ''
      this.payalarmmsg2ErrorMsg = ''
      this.payalarmmsg3ErrorMsg = ''
      this.payalarmmsg4ErrorMsg = ''
      this.payalarmmsg5ErrorMsg = ''
      if (this.$refs.paycompanyCode.value === '' || this.$refs.paycompanyCode.value === null) {
        this.paycompanyCodeErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.paycompanyCode)
      }
      if (this.$refs.paystoreCode.value === '' || this.$refs.paystoreCode.value === null) {
        this.paystoreCodeErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.paystoreCode)
      }
      if (this.$refs.payreqstorecode.value === '' || this.$refs.payreqstorecode.value === null) {
        this.payreqstorecodeErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payreqstorecode)
      }
      if (this.$refs.payreqterminalcode.value === '' || this.$refs.payreqterminalcode.value === null) {
        this.payreqterminalcodeErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payreqterminalcode)
      }
      if (this.$refs.paytreeid.value.length < 12) {
        this.paytreeidErrorMsg = this.$i18n.t('C00223.E002')
        this.focusField.push(this.$refs.paytreeid)
      }
      if (this.$refs.paytreeid.value === '' || this.$refs.paytreeid.value === null) {
        this.paytreeidErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.paytreeid)
      }
      if (!(validationUtils.methods.ipv4FormatCheck(this.$refs.pay_ipadr.value))) {
        this.pay_ipadrErrorMsg = this.$i18n.t('C00223.E003')
        this.focusField.push(this.$refs.pay_ipadr)
      }
      if (this.$refs.pay_ipadr.value === '' || this.$refs.pay_ipadr.value === null) {
        this.pay_ipadrErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.pay_ipadr)
      }
      if (this.$refs.paycentername.value === '' || this.$refs.paycentername.value === null) {
        this.paycenternameErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.paycentername)
      }
      if (this.$refs.payportno.value === '' || this.$refs.payportno.value === null) {
        this.payportnoErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payportno)
      }
      if (this.$refs.payurl.value === '' || this.$refs.payurl.value === null) {
        this.payurlErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payurl)
      }
      if (this.$refs.payrcvtimeout.value === '' || this.$refs.payrcvtimeout.value === null) {
        this.payrcvtimeoutErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payrcvtimeout)
      }
      if (this.$refs.payposop.value === '' || this.$refs.payposop.value === null) {
        this.payposopErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payposop)
      }
      if (this.$refs.payposappname.value === '' || this.$refs.payposappname.value === null) {
        this.payposappnameErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payposappname)
      }
      if (this.$refs.payposappver.value === '' || this.$refs.payposappver.value === null) {
        this.payposappverErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payposappver)
      }
      if (this.$refs.payretrywaittime.value === '' || this.$refs.payretrywaittime.value === null) {
        this.payretrywaittimeErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payretrywaittime)
      }
      if (this.$refs.payretrycount.value === '' || this.$refs.payretrycount.value === null) {
        this.payretrycountErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payretrycount)
      }
      if ((Number(this.$refs.payalarmmsg1prt.value) === 0) && (this.$refs.payalarmmsg1.value === '' || this.$refs.payalarmmsg1.value === null)) {
        this.payalarmmsg1ErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payalarmmsg1)
      }
      if ((Number(this.$refs.payalarmmsg2prt.value) === 0) && (this.$refs.payalarmmsg2.value === '' || this.$refs.payalarmmsg2.value === null)) {
        this.payalarmmsg2ErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payalarmmsg2)
      }
      if ((Number(this.$refs.payalarmmsg3prt.value) === 0) && (this.$refs.payalarmmsg3.value === '' || this.$refs.payalarmmsg3.value === null)) {
        this.payalarmmsg3ErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payalarmmsg3)
      }
      if ((Number(this.$refs.payalarmmsg4prt.value) === 0) && (this.$refs.payalarmmsg4.value === '' || this.$refs.payalarmmsg4.value === null)) {
        this.payalarmmsg4ErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payalarmmsg4)
      }
      if ((Number(this.$refs.payalarmmsg5prt.value) === 0) && (this.$refs.payalarmmsg5.value === '' || this.$refs.payalarmmsg5.value === null)) {
        this.payalarmmsg5ErrorMsg = this.$i18n.t('C00223.E001')
        this.focusField.push(this.$refs.payalarmmsg5)
      }
      if (this.focusField.length > 0) {
        const subsc1 = ['paycompanyCode', 'paystoreCode', 'payreqstorecode', 'payreqterminalcode', 'paytreeid', 'pay_ipadr', 'paycentername', 'payportno']
        const subsc2 = ['payurl', 'payrcvtimeout', 'payposop', 'payposappname', 'payposappver', 'payretrywaittime', 'payretrycount']
        const subsc3 = ['payalarmmsg1', 'payalarmmsg2', 'payalarmmsg3', 'payalarmmsg4', 'payalarmmsg5']
        if (subsc1.includes(this.focusField[0].$el.id)) {
          this.isShowCommSetting1Panel = true
          this.isShowCommSetting2Panel = false
          this.isShowMessSettingPanel = false
        } else if (subsc2.includes(this.focusField[0].$el.id)) {
          this.isShowCommSetting1Panel = false
          this.isShowCommSetting2Panel = true
          this.isShowMessSettingPanel = false
        } else if (subsc3.includes(this.focusField[0].$el.id)) {
          this.isShowCommSetting1Panel = false
          this.isShowCommSetting2Panel = false
          this.isShowMessSettingPanel = true
        }
        this.$nextTick(() => {
          this.focusField[0].$el.focus()
        })
        return false
      } else {
        return true
      }
    },
    handlePrintChange (e, printMsgNo) {
      if (e === '1') {
        switch (printMsgNo) {
          case 1:
            this.$refs.payalarmmsg1.value = ''
            this.alarmData.payalarmmsg1 = ''
            break
          case 2:
            this.$refs.payalarmmsg2.value = ''
            this.alarmData.payalarmmsg2 = ''
            break
          case 3:
            this.$refs.payalarmmsg3.value = ''
            this.alarmData.payalarmmsg3 = ''
            break
          case 4:
            this.$refs.payalarmmsg4.value = ''
            this.alarmData.payalarmmsg4 = ''
            break
          case 5:
            this.$refs.payalarmmsg5.value = ''
            this.alarmData.payalarmmsg5 = ''
        }
      }
    },
    globalErrorMapping (result) {
      switch (result.code) {
        case -90:
          this.openPopupDialog({
            mode: 2,
            message: this.$i18n.t('O00004.W008'),
            code: result.code,
            okBtnCallback: () => {
              this.$router.push('/LoginPage')
            }
          })
          break
        default:
          const { code, message } = this.mapErrorMessage(result)
          this.openPopupDialog({
            mode: 3,
            message: message,
            code: code
          })
          break
      }
    },
    mapErrorMessage (result) {
      const errorMsgMap = (result && result.errorMessageMap) || null
      if (errorMsgMap === null || errorMsgMap['global'] === null || !('global' in result.errorMessageMap)) {
        return { code: '', message: this.$i18n.t('O00004.W010') }
      } else {
        return { code: result.code, message: errorMsgMap['global'].toString() }
      }
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        let focusable = null
        if (this.isShowCommSetting1Panel) {
          if (this.headquartersAuthority === 1) {
            focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
          } else {
            focusable = this.$refs.subscreen1.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
          }
        } else if (this.isShowCommSetting2Panel) {
          focusable = this.$refs.subscreen2.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        } else if (this.isShowMessSettingPanel) {
          focusable = this.$refs.subscreen3.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        }
        if (focusable !== null) {
          const target = [...focusable].find(x => !x.disabled)
          target.focus()
        }
      })
    }
  },
  created () {
    this.$root.winId = 'C00223'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    clearTimeout(this.timeout)
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    this.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      this.headquartersAuthority = headquartersAuthority
      this.timeout = setTimeout(() => {
        this.focusFirstFocusableElement()
      }, 200)
    })
  }
}
// KSD V001.000 AE
