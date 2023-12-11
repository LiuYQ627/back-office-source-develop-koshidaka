/*
 * ---------+-----------------+----------+---------------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+---------------------------------------
 *  20230217  dingxin(Neusoft)  G001.00.0  issue課題#1054を対応します.
 *  20230714  shiyue(Neusoft)   G002.00.0  issue課題#1864を対応します.
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
const savePath = 'DeviceSetting/TerminalInfoRegist'
const deletePath = 'DeviceSetting/TerminalInfoDeleted'

export default {
  data () {
    return {
      // G001.00.0 Add start
      permissions: [],
      // G001.00.0 Add end
      dialog: false,
      title: '',
      mode: 1,
      selectedScanner: 0,
      // KSD V001.000 AS 端末設定新規追加時に金種設定の初期値を追加する対応
      moneyTypeSettings: {
        denominationSetting: [
          {denomination: 10000, denominationType: 0, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 5000, denominationType: 0, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 2000, denominationType: 0, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 1000, denominationType: 0, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 500, denominationType: 1, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 100, denominationType: 1, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 50, denominationType: 1, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 10, denominationType: 1, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 5, denominationType: 1, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0},
          {denomination: 1, denominationType: 1, numberOfCoinsRoll: 0, remainingNumber: 0, nearEmpty: 0, nearFull: 0, maxStorage: 0}
        ],
        remainingAmount: 0,
        denominationCollectionMethod: 'AMOUNT_SPECIFIED',
        rollCalculation: false,
        adjustmentLevel: 0
      },
      // KSD V001.000 AE 端末設定新規追加時に金種設定の初期値を追加する対応
      terminalData: {
        storeCd: 0,
        clientId: 0,
        name: '',
        terminalType: '',
        activeFlag: 0,
        connectScanner: 1,
        deviceName: ''
      },
      tabletDataList: { tabletModels: [] },
      // G002.00.0 Add-Start
      terminalTypeList: [],
      // G002.00.0 Add-End
      scannerList: [
        { code: 1, name: this.$i18n.t('F00013.S019') },
        { code: 2, name: this.$i18n.t('F00013.S020') }
      ],
      nameErrorMsg: '',
      terminalTypeErrorMsg: '',
      refreshFunc: null,
      closeFunc: null,
      focusItem: null
    }
  },
  components: {
    popup
  },
  methods: {
    open (storeCd, clientId, terminalData, tabletDataList, refreshFunc, closeFunc) {
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      //      this.tabletDataList = tabletDataList
      this.terminalTypeList = [{ code: '', name: '' }, { code: 'Androidタブレット', name: 'Androidタブレット' }, { code: 'iPad', name: 'iPad' }]
      if (terminalData !== null) {
        this.mode = 2
        this.title = this.$i18n.t('F00013.S012')
        this.terminalData = terminalData
        this.terminalData['storeCd'] = storeCd
        this.terminalData['clientId'] = clientId
        //        // もし接続スキャナが「0:設定無し」だった場合は「1:F00013.S019」を設定する
        //        if (this.terminalData.connectScanner === 0) this.terminalData.connectScanner = 1
      } else {
        this.mode = 1
        this.title = this.$i18n.t('F00013.S011')
        this.terminalData = {
          storeCd: storeCd,
          clientId: clientId,
          name: '',
          deviceName: '',
          //          terminalType: '',
          activeFlag: 0
          //          connectScanner: 1
        }
        //        if (tabletDataList.tabletModels.length > 0) this.terminalData.terminalType = tabletDataList.tabletModels[0].terminalType
      }
    },
    openEnd () {
      // document.getElementsByClassName('textTerminalName')[0].focus()
      // document.getElementById('baseTable').scrollTo(0, 0)
      //      this.$refs.typeText.value = this.terminalData.terminalType
      //      this.selectedScanner = this.terminalData.connectScanner
      this.initErrorMessage()
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
          terminalInfos: [
            {
              storeCd: this.terminalData.storeCd,
              clientId: this.terminalData.clientId,
              name: this.$refs.nameText.value,
              version: this.terminalData.version,
              mode: this.mode,
              terminalType: this.$refs.terminalTypeText.value,
              activeFlag: this.terminalData.activeFlag
              //              connectScanner: this.$refs.scannerText.value
              // KSD V001.000 AS 端末設定新規追加時に金種設定の初期値を追加する対応
              ,moneyTypeSettings: this.moneyTypeSettings
              // KSD V001.000 AS 端末設定新規追加時に金種設定の初期値を追加する対応
            }
          ]
        }
        // KSD V001.000 AS 端末設定新規追加時に金種設定の初期値を追加する対応
        // 編集モードの場合は金種設定をパラメータから削除する
        if (this.mode === 2) {
          delete params.terminalInfos[0].moneyTypeSettings
        }
        // KSD V001.000 AE 端末設定新規追加時に金種設定の初期値を追加する対応

        // 保存
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.saveErrorMapping(response.data.result)
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
        var params = { storeCd: this.terminalData.storeCd, clientId: this.terminalData.clientId }
        let response = await axios.delete(this.$i18n.t('prop.url') + deletePath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ data: params }))
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
    saveErrorMapping (result) {
      this.focusItem = null
      if (result.code === -99) {
        if (result.errorMessageMap['terminalInfos[0].name'] !== undefined) {
          this.nameErrorMsg = result.errorMessageMap['terminalInfos[0].name'].toString().split(',')
          this.focusItem = this.$refs.nameText
        }
        // G002.00.0 Add-Start
        if (result.errorMessageMap['terminalInfos[0].terminalType'] !== undefined) {
          this.terminalTypeErrorMsg = result.errorMessageMap['terminalInfos[0].terminalType'].toString().split(',')
          if (result.errorMessageMap['terminalInfos[0].name'] !== undefined) {
            this.focusItem = this.$refs.nameText
          } else {
            this.focusItem = this.$refs.terminalTypeText
          }
        }
        // G002.00.0 Add-End

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
      this.nameErrorMsg = ''
      // G002.00.0 Add-Start
      this.terminalTypeErrorMsg = ''
      // G002.00.0 Add-End
    },
    inputLimit (str, maxLength) {
      var strLen = str.toString().length
      // byte数の取得
      var byteLen = 0
      for (var i = 0; i < strLen; i++) {
        var codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
          (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          this.terminalData.deviceName = str.toString().substring(0, i)
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  },
  // G001.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G001.00.0 Add end
}
