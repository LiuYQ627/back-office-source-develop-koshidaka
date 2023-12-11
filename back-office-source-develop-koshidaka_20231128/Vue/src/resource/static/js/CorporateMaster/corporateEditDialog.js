import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
// KSD V001.000 AS
import dataUtils from '@/resource/static/js/Common/dataUtils'
// KSD V001.000 AE
const savePath = 'CorporateMaster/CorporateInfoRegist'
const deletePath = 'CorporateMaster/CorporateInfoDeleted'
// KSD V001.000 AS
const searchPath = 'CorporateMaster/ConfigurationSearch'
// KSD V001.000 AE
export default {
  // KSD V001.000 AS
  mixins: [dataUtils],
  // KSD V001.000 AE
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      corporateData: {
        businessUnitCd: '',
        name: '',
        postNo: '',
        address: '',
        telNo: '',
        faxNo: '',
        contractRepresentativeName: '',
        billingDate: 0,
        billingTime: 0,
        useStartMonth: 0,
        useEndMonth: 0,
        invoiceIssueName: '',
        contractServices: []
        // KSD V001.000 AS
        , configurations: {
          BUSINESS_DAY_START_TIME: {
            value: ''
          },
          BUSINESS_DAY_SOFT_END_TIME: {
            value: ''
          },
          BUSINESS_DAY_HARD_END_TIME: {
            value: ''
          }
        }
        // KSD V001.000 AE
      },
      // KSD V001.000 AS
      CLOUDPOS_CONFIG: null,
      // KSD V001.000 AE
      masters: {},
      contractServices: [],
      parentDataList: [],
      nameErrorMsg: '',
      postNoErrorMsg: '',
      addressErrorMsg: '',
      telNoErrorMsg: '',
      faxNoErrorMsg: '',
      contractRepresentativeNameErrorMsg: '',
      contractServicesErrorMsg: [],
      billingDateErrorMsg: '',
      billingTimeErrorMsg: '',
      useStartMonthErrorMsg: '',
      useEndMonthErrorMsg: '',
      selectedIndex: 0,
      refreshFunc: null,
      closeFunc: null,
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
    async open (businessUnitCd, corporateData, parentDataList, masters, refreshFunc, closeFunc, sessionBusinessUnitCd) {
      this.dialog = true
      this.operationLock = false
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.businessUnitCd = businessUnitCd
      this.corporateData = corporateData
      this.parentDataList = parentDataList
      this.masters = masters
      this.sessionBusinessUnitCd = sessionBusinessUnitCd
      if (corporateData !== null) {
        this.mode = 2
        this.title = this.$i18n.t('F00004.S013')
        // this.corporateData = corporateData

        if (corporateData.displayName == null) {
          corporateData.displayName = {default: ''}
        }
        if (corporateData.address == null) {
          corporateData.address = {address1: {default: ''}, postalCode: {defalut: ''}}
        }
        if (corporateData.address.postalCode == null) {
          corporateData.address.postalCode = {default: ''}
        }
        if (corporateData.address.address1 == null) {
          corporateData.address.address1 = {default: ''}
        }

        this.corporateData = {
          businessUnitCd: corporateData.name,
          name: corporateData.displayName.default,
          postNo: corporateData.address.postalCode.default,
          address: corporateData.address.address1.default,
          telNo: corporateData.phone,
          faxNo: corporateData.fax,
          contractRepresentativeName: '',
          billingDate: '',
          billingTime: '',
          smartReceiptCode: corporateData.smartReceiptCode,
          invoiceIssueName: corporateData.invoiceIssueName,
          registerBusinessCode: corporateData.registerBusinessCode,
          useStartMonth: corporateData.configurations.CONTRACT_PERIOD.value.useStartMonth,
          useEndMonth: corporateData.configurations.CONTRACT_PERIOD.value.useEndMonth,
          // changePlanName: '',
          // referenceVersion: '',
          contractServices: []
          // KSD V001.000 AS
          , configurations: {
            BUSINESS_DAY_START_TIME: corporateData.configurations.BUSINESS_DAY_START_TIME,
            BUSINESS_DAY_SOFT_END_TIME: corporateData.configurations.BUSINESS_DAY_SOFT_END_TIME,
            BUSINESS_DAY_HARD_END_TIME: corporateData.configurations.BUSINESS_DAY_HARD_END_TIME
          }
          // KSD V001.000 AE
        }
        // KSD V001.000 AS
        if (this.corporateData.configurations.BUSINESS_DAY_START_TIME.value === '') {
          this.corporateData.configurations.BUSINESS_DAY_START_TIME.value = '00:00'
        }
        // KSD V001.000 AE

        this.contractServices = []
        //        for (var i = 0; i < parentDataList.contractServiceParents.length; i++) {
        //          let addService = []
        //          if (this.corporateData.contractServices != null) {
        //            var findService = await this.findService(parentDataList.contractServiceParents[i].contractServiceParentCd)
        //            addService = {
        //              checked: (findService !== null),
        //              contractServiceParentCd: parentDataList.contractServiceParents[i].contractServiceParentCd,
        //              contractServiceParentName: parentDataList.contractServiceParents[i].contractServiceParentName,
        //              storeNum: '',
        //              storeName: '',
        //              storeCds: []
        //            }
        //            if (findService !== null) {
        //              for (var j = 0; j < findService.storeCds.length; j++) {
        //                addService.storeCds.push(findService.storeCds[j])
        //              }
        //            }
        //            this.contractServices.push(addService)
        //          } else {
        //            addService = {
        //              checked: false,
        //              contractServiceParentCd: parentDataList.contractServiceParents[i].contractServiceParentCd,
        //              contractServiceParentName: parentDataList.contractServiceParents[i].contractServiceParentName,
        //              storeNum: '',
        //              storeName: '',
        //              storeCds: []
        //            }
        //            this.contractServices.push(addService)
        //          }
        //        }
      } else {
        this.mode = 1
        this.title = this.$i18n.t('F00004.S011')
        // KSD V001.000 AS
        const CONFIG_KEYS = {
          START: 'configurations.BUSINESS_DAY_START_TIME.value'
        }
        // KSD V001.000 AE
        this.corporateData = {
          businessUnitCd: ('000000000000000' + businessUnitCd).slice(-15),
          name: '',
          postNo: '',
          address: '',
          telNo: '',
          faxNo: '',
          contractRepresentativeName: '',
          billingDate: '',
          billingTime: '',
          useStartMonth: '',
          useEndMonth: '',
          // changePlanName: '',
          // referenceVersion: '',
          invoiceIssueName: '',
          contractServices: []
          // KSD V001.000 AS
          , configurations: {
            BUSINESS_DAY_START_TIME: {
              value: this.checkKeyHasValue(this.CLOUDPOS_CONFIG, CONFIG_KEYS.START, []) ? this.CLOUDPOS_CONFIG.configurations.BUSINESS_DAY_START_TIME.value : '00:00'
            },
            BUSINESS_DAY_SOFT_END_TIME: {
              value: this.checkKeyHasValue(this.CLOUDPOS_CONFIG, CONFIG_KEYS.START, []) ? this.CLOUDPOS_CONFIG.configurations.BUSINESS_DAY_START_TIME.value : '00:00'
            },
            BUSINESS_DAY_HARD_END_TIME: {
              value: '23:59'
            }
          }
          // KSD V001.000 AE
        }
        this.contractServices = []
        //        for (var k = 0; k < parentDataList.contractServiceParents.length; k++) {
        //          var addServices = {
        //            checked: false,
        //            contractServiceParentCd: parentDataList.contractServiceParents[k].contractServiceParentCd,
        //            contractServiceParentName: parentDataList.contractServiceParents[k].contractServiceParentName,
        //            storeNum: '',
        //            storeName: '',
        //            storeCds: []
        //          }
        //          this.contractServices.push(addServices)
        //        }
      }
      //      if (parentDataList.contractServiceParents.length === 0) {
      //        var nullServices = {
      //          checked: false,
      //          contractServiceParentCd: '',
      //          contractServiceParentName: '',
      //          storeNum: '',
      //          storeName: '',
      //          storeCds: []
      //        }
      //        this.contractServices.push(nullServices)
      //      }
      //      this.serviceDisable = (this.mode === 1 || parentDataList.contractServiceParents.length === 0)
      this.initErrorMessage()
      this.setCorporateStore()
    },
    openEnd () {
      document.getElementsByClassName('textCorporateName')[0].focus()
      document.getElementById('baseTable').scrollTo(0, 0)
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
    async setCorporateStore () {
      for (var i = 0; i < this.contractServices.length; i++) {
        if (this.serviceDisable) {
          this.contractServices[i].storeName = ''
          this.contractServices[i].storeNum = ''
        } else {
          var isError = false
          var tooltips = ''
          for (var j = 0; j < this.contractServices[i].storeCds.length; j++) {
            var store = await this.findStore(this.contractServices[i].storeCds[j].storeCd)
            if (store.isError) {
              isError = true
            }
            if (tooltips !== '') {
              tooltips = tooltips + this.$i18n.t('F00004.S032')
            }
            tooltips = tooltips + store.name
          }
          if (isError) {
            this.contractServices[i].storeName = ''
            this.contractServices[i].storeNum = ''
          } else {
            this.contractServices[i].storeName = tooltips
            this.contractServices[i].storeNum = this.contractServices[i].storeCds.length + this.$i18n.t('F00004.S023')
          }
        }
      }
    },
    async findService (contractServiceParentCd) {
      for (var i = 0; i < this.corporateData.contractServices.length; i++) {
        if (this.corporateData.contractServices[i].contractServiceParentCd === contractServiceParentCd) {
          return this.corporateData.contractServices[i]
        }
      }
      return null
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
      // 新規モードの場合にtrue,編集モードの場合にfalseを設定する
      let isMasterCreate = this.mode === 1
      // KSD V001.000 AS
      const startTime = this.corporateData.configurations.BUSINESS_DAY_START_TIME
      const softEndTime = this.corporateData.configurations.BUSINESS_DAY_SOFT_END_TIME
      const hardEndTime = this.corporateData.configurations.BUSINESS_DAY_HARD_END_TIME
      // KSD V001.000 AE
      try {
        const params = {
          corporateInfos: [
            {
              businessUnitCd: this.$refs.businessUnitCdText.value,
              name: this.$refs.nameText.value,
              postNo: this.$refs.postNoText.value,
              address: this.$refs.addressText.value,
              telNo: this.$refs.telNoText.value,
              invoiceIssueName: this.$refs.invoiceIssueNameText.value,
              smartReceiptCode: this.$refs.smartReceiptCodeText.value,
              registerBusinessCode: this.$refs.registerBusinessCodeText.value,
              faxNo: this.$refs.faxNoText.value,
              // contractRepresentativeName: this.$refs.contractRepresentativeNameText.value,
              // billingDate: this.$refs.billingDateText.value,
              // billingTime: this.$refs.billingTimeText.value,
              useStartMonth: this.$refs.useStartMonthText.value,
              useEndMonth: this.$refs.useEndMonthText.value,
              // referenceVersion: this.$refs.referenceVersionText.value,
              // changePlanName: this.$refs.changePlanNameText.value,
              contractServices: []
              // KSD V001.000 AS
              , configurations: {
                BUSINESS_DAY_START_TIME: {
                  ...startTime,
                  value: this.$refs.businessDayStartTimeText.value
                },
                BUSINESS_DAY_SOFT_END_TIME: {
                  ...softEndTime,
                  value: this.$refs.businessDayStartTimeText.value
                },
                BUSINESS_DAY_HARD_END_TIME: {
                  ...hardEndTime,
                  value: '23:59'
                }
              }
              // KSD V001.000 AE
            }
          ],
          isMasterCreate: isMasterCreate
        }
        for (var i = 0; i < this.contractServices.length; i++) {
          if (this.contractServices[i].checked === true) {
            var storeCds = []
            for (var j = 0; j < this.contractServices[i].storeCds.length; j++) {
              storeCds.push({storeCd: this.contractServices[i].storeCds[j].storeCd})
            }
            params.corporateInfos[0].contractServices.push(
              {
                contractServiceParentCd: this.contractServices[i].contractServiceParentCd,
                contractServiceParentName: this.contractServices[i].contractServiceParentName,
                storeCds: storeCds
              }
            )
          }
        }
        // 請求日付が空欄だった場合、nullを代入する
        if (params.corporateInfos[0].billingDate === '') {
          params.corporateInfos[0].billingDate = null
        }
        // 請求確定時刻が空欄だった場合、nullを代入する
        if (params.corporateInfos[0].billingTime === '') {
          params.corporateInfos[0].billingTime = null
        }

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
    postNoTextInput (str) {
      if (str == 'postno') {
        this.corporateData.postNo = this.corporateData.postNo.replace(/[^0-9-]/gi, '')
      } else if (str == 'telNo') {
        this.corporateData.telNo = this.corporateData.telNo.replace(/[^0-9-]/gi, '')
      } else if (str == 'faxNo') {
        this.corporateData.faxNo = this.corporateData.faxNo.replace(/[^0-9-]/gi, '')
      }
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
        var params = {businessUnitCd: this.corporateData.businessUnitCd}
        let response = await axios.delete(this.$i18n.t('prop.url') + deletePath, commonUtils.methods.addApiHeader({params}))
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
        // 画面項目の下から順に評価
        if (result.errorMessageMap['corporateInfos[0].useEndMonth'] !== undefined) {
          this.useEndMonthErrorMsg = result.errorMessageMap['corporateInfos[0].useEndMonth'].toString().split(',')
          this.focusItem = this.$refs.useEndMonthText
        }
        if (result.errorMessageMap['corporateInfos[0].useStartMonth'] !== undefined) {
          this.useStartMonthErrorMsg = result.errorMessageMap['corporateInfos[0].useStartMonth'].toString().split(',')
          this.focusItem = this.$refs.useStartMonthText
        }
        if (result.errorMessageMap['corporateInfos[0].billingTime'] !== undefined) {
          this.billingTimeErrorMsg = result.errorMessageMap['corporateInfos[0].billingTime'].toString().split(',')
          this.focusItem = this.$refs.billingTimeText
        }
        if (result.errorMessageMap['corporateInfos[0].billingDate'] !== undefined) {
          this.billingDateErrorMsg = result.errorMessageMap['corporateInfos[0].billingDate'].toString().split(',')
          this.focusItem = this.$refs.billingDateText
        }
        this.contractServicesErrorMsg = []
        var pos = 0
        for (var i = 0; i < this.contractServices.length; i++) {
          this.contractServicesErrorMsg.push('')
          if (this.contractServices[i].checked === true) {
            if (result.errorMessageMap['corporateInfos[0].contractServices[' + pos + '].storeCds'] !== undefined) {
              this.contractServicesErrorMsg[i] = result.errorMessageMap['corporateInfos[0].contractServices[' + pos + '].storeCds'].toString().split(',')
            }
            pos++
          }
        }
        if (result.errorMessageMap['corporateInfos[0].contractRepresentativeName'] !== undefined) {
          this.contractRepresentativeNameErrorMsg = result.errorMessageMap['corporateInfos[0].contractRepresentativeName'].toString().split(',')
          this.focusItem = this.$refs.contractRepresentativeNameText
        }
        if (result.errorMessageMap['corporateInfos[0].faxNo'] !== undefined) {
          this.faxNoErrorMsg = result.errorMessageMap['corporateInfos[0].faxNo'].toString().split(',')
          this.focusItem = this.$refs.faxNoText
        }
        if (result.errorMessageMap['corporateInfos[0].telNo'] !== undefined) {
          this.telNoErrorMsg = result.errorMessageMap['corporateInfos[0].telNo'].toString().split(',')
          this.focusItem = this.$refs.telNoText
        }
        if (result.errorMessageMap['corporateInfos[0].address'] !== undefined) {
          this.addressErrorMsg = result.errorMessageMap['corporateInfos[0].address'].toString().split(',')
          this.focusItem = this.$refs.addressText
        }
        if (result.errorMessageMap['corporateInfos[0].postNo'] !== undefined) {
          this.postNoErrorMsg = result.errorMessageMap['corporateInfos[0].postNo'].toString().split(',')
          this.focusItem = this.$refs.postNoText
        }
        if (result.errorMessageMap['corporateInfos[0].name'] !== undefined) {
          this.nameErrorMsg = result.errorMessageMap['corporateInfos[0].name'].toString().split(',')
          this.focusItem = this.$refs.nameText
        }
        if (result.errorMessageMap['corporateInfos[0].smartReceiptCode'] !== undefined) {
          this.smartReceiptCodeErrorMsg = result.errorMessageMap['corporateInfos[0].smartReceiptCode'].toString().split(',')
          this.focusItem = this.$refs.smartReceiptCodeText
        }
        if (result.errorMessageMap['corporateInfos[0].invoiceIssueName'] !== undefined) {
          this.invoiceIssueNameErrorMsg = result.errorMessageMap['corporateInfos[0].invoiceIssueName'].toString().split(',')
          this.focusItem = this.$refs.invoiceIssueNameText
        }
        if (result.errorMessageMap['corporateInfos[0].registerBusinessCode'] !== undefined) {
          this.registerBusinessCodeErrorMsg = result.errorMessageMap['corporateInfos[0].registerBusinessCode'].toString().split(',')
          this.focusItem = this.$refs.registerBusinessCodeText
        }
        if (result.errorMessageMap['useStartMonth'] !== undefined) {
          this.useStartMonthErrorMsg = result.errorMessageMap['useStartMonth'].toString().split(',')
          this.focusItem = this.$refs.useStartMonthText
        }
        if (result.errorMessageMap['useEndMonth'] !== undefined) {
          this.useEndMonthErrorMsg = result.errorMessageMap['useEndMonth'].toString().split(',')
          this.focusItem = this.$refs.useEndMonthText
        }
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
      this.postNoErrorMsg = ''
      this.addressErrorMsg = ''
      this.telNoErrorMsg = ''
      this.faxNoErrorMsg = ''
      this.smartReceiptCodeErrorMsg = ''
      this.invoiceIssueNameErrorMsg = ''
      this.registerBusinessCodeErrorMsg = ''
      this.contractRepresentativeNameErrorMsg = ''
      this.contractServicesErrorMsg = []
      for (var i = 0; i < this.contractServices.length; i++) {
        this.contractServicesErrorMsg.push('')
      }
      this.billingDateErrorMsg = ''
      this.billingTimeErrorMsg = ''
      this.useStartMonthErrorMsg = ''
      this.useEndMonthErrorMsg = ''
    },
    async storeSelect (index) {
      this.selectedIndex = index
      let selectedCorporateCodes = []
      for (var i = 0; i < this.contractServices[index].storeCds.length; i++) {
        selectedCorporateCodes.push(this.contractServices[index].storeCds[i].storeCd)
      }
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedCorporateCodes, this.masters.storeGroupMasters, true)
    },
    storeSelectOk (selectedCorporateCodes) {
      this.contractServices[this.selectedIndex].storeCds = []
      for (var i = 0; i < selectedCorporateCodes.length; i++) {
        var store = {
          storeCd: selectedCorporateCodes[i]
        }
        this.contractServices[this.selectedIndex].storeCds.push(store)
      }
      this.setCorporateStore()
    },
    // チェックボックスにフォーカス時スペースキーでONOFF切り替え
    onCheckKey (index) {
      this.contractServices[index].checked = !this.contractServices[index].checked
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      this.corporateData.billingDate = this.corporateData.billingDate.toString().replace(/[^0-9]/gi, '')
      this.corporateData.billingTime = this.corporateData.billingTime.toString().replace(/[^0-9]/gi, '')
      this.corporateData.useStartMonth = this.corporateData.useStartMonth.toString().replace(/[^0-9]/gi, '')
      this.corporateData.useEndMonth = this.corporateData.useEndMonth.toString().replace(/[^0-9]/gi, '')
    },
    // 住所欄にテキスト貼り付けを行った際に改行を削除する
    pasteAddressText () {
      setTimeout(() => {
        this.corporateData.address = this.corporateData.address.toString().replace(/\r?\n/g, '')
      }, 50)
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
          if (this.corporateData.name == str) {
            this.corporateData.name = str.toString().substring(0, i)
          } else if (this.corporateData.address == str) {
            this.corporateData.address = str.toString().substring(0, i)
          } else if (this.corporateData.invoiceIssueName == str) {
            this.corporateData.invoiceIssueName = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
    // KSD V001.000 AS
    , timeInputRegulation () {
      if (this.corporateData.configurations.BUSINESS_DAY_START_TIME.value === '') {
        this.corporateData.configurations.BUSINESS_DAY_START_TIME.value = '00:00'
      }
    },
    async getCloudPosConfig () {
      const params = { businessUnitCd: 'CLOUDPOS' }
      await axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            this.CLOUDPOS_CONFIG = response.data.responseModel
          } else {
            this.CLOUDPOS_CONFIG = null
            this.globalErrorMapping(response.data.result)
          }
        })
    }
    // KSD V001.000 AE
  }
}
