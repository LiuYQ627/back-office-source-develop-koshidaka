import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
const savePath = 'UserMaster/UserInfoRegist'
const deletePath = 'UserMaster/UserInfoDeleted'
const accessListPath = 'UserMaster/AccessList'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230111 bai.ry(Neusoft)  G001.00.0  issue課題#1012を対応します.
 * 20230113 litie(Neusoft)   G002.00.0  issue課題#1058を対応します.
 * 20230217  dingxin(Neusoft)  G003.00.0  issue課題#1054を対応します.
 * 20230302  xu.jh(Neusoft)  G004.00.0  issue課題#1038を対応します.
 * 20230316  bai.ry(Neusoft)  G005.00.0  issue課題#1012を対応します.
 * 20230320  xu.jh(Neusoft)  G006.00.0  issue課題#1682を対応します.
 * 20230417  qinshh(Neusoft) G007.00.0  issue課題#1559を対応します.
 * 20230420  wangchunmei(Neusoft) G008.00.0  issue課題#908、#1490を対応します.
 * 20230506  wangchunmei(Neusoft) G008.00.1  issue課題#1490を対応します.
 * 20230609  wangchunmei(Neusoft) G009.00.0  issue課題#1672を対応します.
 * 20230614  wangchunmei(Neusoft) G010.00.0  issue課題#1639を対応します.
 * 20230628  wangchunmei(Neusoft) G011.00.0  issue課題alp#3498を対応します.
 * 20230714  shiyue(Neusoft)      G012.00.0  issue課題#1863を対応します.
 * 20230724  qurn(Neusoft)        G013.00.0  issue課題#993を対応します.
 */
export default {
  data () {
    return {
      // G003.00.0 Add start
      permissions: [],
      // G003.00.0 Add end
      dialog: false,
      title: '',
      mode: 1,
      selected: 1,
      userData: {
        userId: 0,
        name: '',
        password: '',
        roleCd: 0,
        passwordChangeDate: 0,
        passwordExpirationDate: 99,
        passwordErrors: 0,
        accountClassification: 0,
        belongStoreCd: 0,
        belongStoreText: '',
        headquartersAuthority: 0,
        chargeStoreCds: [],
        firstName: '',
        username: '',
        posPrintingName: '',
        posPassword: '',
        posUserName: '',
        posOperationPermission: {
          amountOff: 0,
          percentOff: 0,
          salesChange: 0,
          cancellation: 0,
          deposit: 0,
          withdrawal: 0,
          changeReserve: 0,
          // KSD V001.000 AS
          changeMachineInventoryCheck: 0,
          changeMachineRemaining: 0,
          changeMachineConnectDisconnect: 0,
          // KSD V001.000 AE
          report: 0,
          transactionSearch: 0,
          registerMinus: 0,
          returnValue: 0,
          audit: 0,
          calculate: 0
          // KSD V001.000 AS
          , exchange: 0,
          amountInput: 0,
          oesProg: 0,
          oesSet: 0,
          partCorrcet: 0,
          tendCorrcet: 0,
          unpaidDelete: 0,
          oesTime: 0
          // KSD V001.000 AE
        }
      },
      belongStore: {
        storeCd: 0,
        name: ''
      },
      chargeStore: [],
      chargeCdText: '',
      chargeTooltips: '',
      roleDataList: [],
      masters: {},
      expirationDate: '',
      nameErrorMsg: '',
      passwordErrorMsg: '',
      expiryErrorMsg: '',
      roleCdErrorMsg: '',
      belongErrorMsg: '',
      chargeErrorMsg: '',
      usernameErrorMsg: '',
      posPrintingNameErrorMsg: '',
      posPasswordErrorMsg: '',
      posUserNameErrorMsg: '',
      refreshFunc: null,
      closeFunc: null,
      passwordUpdateFlag: '0',
      passReadFlag: true,
      focusItem: null,
      singleSelect: false,
      // passwordVisible: false,
      passwordVisible: true,
      operationLock: false,
      // G002.00.0 Update-Start
      optUserHeadquartersAuthority: 0,
      optUserBelongStoreCd: 0,
      optUserBelongStoreText: '',
      // G002.00.0 Update-End
      // G009.00.0 Add-Start
      posPasswordVisible: false,
      posPasswordUpdateFlag: '0',
      posPassReadFlag: true,
      // G009.00.0 Add-End
      // G008.00.1 Add-Start
      belongText: '',
      chargeText: '',
      userAccessModelList: [],
      // G008.00.1 Add-End
      // G013.00.0 Add-Start
      passwordVisibleFlg: false,
      passwordVisiblePosFlg: false
      // G013.00.0 Add-End
    }
  },
  components: {
    popup,
    dialogStoreSelect
  },
  methods: {
    async getMasters () {
      // G004.00.0 Update-Start
      // this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
      // G010.00.0 Update-Start
      // this.masters = await this.$refs.dialogStoreSelect.getMasters(true)
      this.masters = await this.$refs.dialogStoreSelect.getMastersNoAuth(true)
      // G010.00.0 Update-End
      // G004.00.0 Update-End
      return this.masters.isError === false
    },
    async getAccessList () {
      var result = false
      try {
        const params = {}
        let response = await axios.get(this.$i18n.t('prop.url') + accessListPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        if (response.data.result.code === 0) {
          // 0:正常
          this.userAccessModelList = []
          this.userAccessModelList = response.data.responseModel.userAccessModelList
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
    // G001.00.0 Add-Start
    setEditChargeCdText (headquartersPermission, userData) {
      let name = ''
      if (headquartersPermission === 1) {
        name = userData.chargeCdText
      } else {
        name = userData.belongStoreText
      }
      setTimeout(() => {
        if (this.$refs.belongText) {
          this.$refs.belongText.value = name
        }
        if (this.$refs.chargeText) {
          this.$refs.chargeText.value = name
        }
      }, 300)
    },
    // G001.00.0 Add-End
    open (userId, userData, roleDataList, masters, refreshFunc, closeFunc, userAccessModelList) {
      // 初期設定
      // this.getAccessList()
      this.dialog = true
      this.operationLock = false
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.userAccessModelList = userAccessModelList
      this.roleDataList = roleDataList
      this.masters = masters
      this.chargeCdText = ''
      this.textBelongStore = ''
      this.chargeTooltips = ''
      this.userData = userData
      if (userData !== null) {
        // 編集
        this.mode = 2
        this.title = this.$i18n.t('F00001.S012')
        this.passReadFlag = true
        this.passwordUpdateFlag = 0
        // G009.00.0 Add-Start
        this.posPassReadFlag = true
        this.posPasswordUpdateFlag = 0
        // G009.00.0 Add-End
        this.userData = userData
        this.userData.password = ''
        if (this.userData.headquartersPermission === true) {
          this.userData.headquartersPermission = 1
        } else {
          this.userData.headquartersPermission = 0
        }
        if (this.userData.homeNodeId != null) {
          this.belongStore = { storeCd: 0, name: '' }
          this.belongStore.storeCd = this.userData.homeNodeId
          this.belongStore.name = this.userData.belongStoreText
          this.userData.belongStoreCd = this.userData.homeNodeId
          this.userData.belongStoreText = this.userData.belongStoreText
        }
        this.userData.chargeStoreCds = []
        if (this.userData.responsibleStores != null) {
          for (var i = 0; i < this.userData.responsibleStores.length; i++) {
            this.userData.chargeStoreCds[i] = { chargeStoreCd: this.userData.responsibleStores[i] }
            // G001.00.0 Add-Start
            this.chargeStore[i] = {storeCd: this.userData.responsibleStores[i]}
            // G001.00.0 Add-End
          }
        }
        // G001.00.0 Add-Start
        this.setEditChargeCdText(this.userData.headquartersPermission, this.userData)
        // G001.00.0 Add-End
        if (this.userData.posOperationPermission == null) {
          this.userData = {
            posOperationPermission: {
              amountOff: 0,
              percentOff: 0,
              salesChange: 0,
              cancellation: 0,
              deposit: 0,
              withdrawal: 0,
              changeReserve: 0,
              // KSD V001.000 AS
              changeMachineInventoryCheck: 0,
              changeMachineRemaining: 0,
              changeMachineConnectDisconnect: 0,
              // KSD V001.000 AE
              report: 0,
              transactionSearch: 0,
              registerMinus: 0,
              returnValue: 0,
              audit: 0,
              calculate: 0
              // KSD V001.000 AS
              , exchange: 0,
              amountInput: 0,
              oesProg: 0,
              oesSet: 0,
              partCorrcet: 0,
              tendCorrcet: 0,
              unpaidDelete: 0,
              oesTime: 0
              // KSD V001.000 AE
            }
          }
        } else {
          if (userData.posOperationPermission.amountOff) { this.userData.posOperationPermission.amountOff = 1 }
          if (userData.posOperationPermission.percentOff) { this.userData.posOperationPermission.percentOff = 1 }
          if (userData.posOperationPermission.salesChange) { this.userData.posOperationPermission.salesChange = 1 }
          if (userData.posOperationPermission.cancellation) { this.userData.posOperationPermission.cancellation = 1 }
          if (userData.posOperationPermission.deposit) { this.userData.posOperationPermission.deposit = 1 }
          if (userData.posOperationPermission.withdrawal) { this.userData.posOperationPermission.withdrawal = 1 }
          if (userData.posOperationPermission.changeReserve) { this.userData.posOperationPermission.changeReserve = 1 }
          // KSD V001.000 AS
          if (userData.posOperationPermission.changeMachineInventoryCheck) { this.userData.posOperationPermission.changeMachineInventoryCheck = 1 }
          if (userData.posOperationPermission.changeMachineRemaining) { this.userData.posOperationPermission.changeMachineRemaining = 1 }
          if (userData.posOperationPermission.changeMachineConnectDisconnect) { this.userData.posOperationPermission.changeMachineConnectDisconnect = 1 }
          // KSD V001.000 AE
          if (userData.posOperationPermission.report) { this.userData.posOperationPermission.report = 1 }
          if (userData.posOperationPermission.transactionSearch) { this.userData.posOperationPermission.transactionSearch = 1 }
          if (userData.posOperationPermission.registerMinus) { this.userData.posOperationPermission.registerMinus = 1 }
          if (userData.posOperationPermission.returnValue) { this.userData.posOperationPermission.returnValue = 1 }
          if (userData.posOperationPermission.audit) { this.userData.posOperationPermission.audit = 1 }
          if (userData.posOperationPermission.calculate) { this.userData.posOperationPermission.calculate = 1 }

          // KSD V001.000 AS
          if (userData.posOperationPermission.exchange) { this.userData.posOperationPermission.exchange = 1 }
          if (userData.posOperationPermission.amountInput) { this.userData.posOperationPermission.amountInput = 1 }
          if (userData.posOperationPermission.oesProg) { this.userData.posOperationPermission.oesProg = 1 }
          if (userData.posOperationPermission.oesSet) { this.userData.posOperationPermission.oesSet = 1 }
          if (userData.posOperationPermission.partCorrcet) { this.userData.posOperationPermission.partCorrcet = 1 }
          if (userData.posOperationPermission.tendCorrcet) { this.userData.posOperationPermission.tendCorrcet = 1 }
          if (userData.posOperationPermission.unpaidDelete) { this.userData.posOperationPermission.unpaidDelete = 1 }
          if (userData.posOperationPermission.oesTime) { this.userData.posOperationPermission.oesTime = 1 }
          // KSD V001.000 AE
          if (!userData.posOperationPermission.amountOff) { this.userData.posOperationPermission.amountOff = 0 }
          if (!userData.posOperationPermission.percentOff) { this.userData.posOperationPermission.percentOff = 0 }
          if (!userData.posOperationPermission.salesChange) { this.userData.posOperationPermission.salesChange = 0 }
          if (!userData.posOperationPermission.cancellation) { this.userData.posOperationPermission.cancellation = 0 }
          if (!userData.posOperationPermission.deposit) { this.userData.posOperationPermission.deposit = 0 }
          if (!userData.posOperationPermission.withdrawal) { this.userData.posOperationPermission.withdrawal = 0 }
          if (!userData.posOperationPermission.changeReserve) { this.userData.posOperationPermission.changeReserve = 0 }
          // KSD V001.000 AS
          if (!userData.posOperationPermission.changeMachineInventoryCheck) { this.userData.posOperationPermission.changeMachineInventoryCheck = 0 }
          if (!userData.posOperationPermission.changeMachineRemaining) { this.userData.posOperationPermission.changeMachineRemaining = 0 }
          if (!userData.posOperationPermission.changeMachineConnectDisconnect) { this.userData.posOperationPermission.changeMachineConnectDisconnect = 0 }
          // KSD V001.000 AE
          if (!userData.posOperationPermission.report) { this.userData.posOperationPermission.report = 0 }
          if (!userData.posOperationPermission.transactionSearch) { this.userData.posOperationPermission.transactionSearch = 0 }
          if (!userData.posOperationPermission.registerMinus) { this.userData.posOperationPermission.registerMinus = 0 }
          if (!userData.posOperationPermission.returnValue) { this.userData.posOperationPermission.returnValue = 0 }
          if (!userData.posOperationPermission.audit) { this.userData.posOperationPermission.audit = 0 }
          if (!userData.posOperationPermission.calculate) { this.userData.posOperationPermission.calculate = 0 }
          // KSD V001.000 AS
          if (!userData.posOperationPermission.exchange) { this.userData.posOperationPermission.exchange = 0 }
          if (!userData.posOperationPermission.amountInput) { this.userData.posOperationPermission.amountInput = 0 }
          if (!userData.posOperationPermission.oesProg) { this.userData.posOperationPermission.oesProg = 0 }
          if (!userData.posOperationPermission.oesSet) { this.userData.posOperationPermission.oesSet = 0 }
          if (!userData.posOperationPermission.partCorrcet) { this.userData.posOperationPermission.partCorrcet = 0 }
          if (!userData.posOperationPermission.tendCorrcet) { this.userData.posOperationPermission.tendCorrcet = 0 }
          if (!userData.posOperationPermission.unpaidDelete) { this.userData.posOperationPermission.unpaidDelete = 0 }
          if (!userData.posOperationPermission.oesTime) { this.userData.posOperationPermission.oesTime = 0 }
          // KSD V001.000 AE
        }
      } else {
        this.mode = 1
        this.title = this.$i18n.t('F00001.S011')
        this.passReadFlag = false
        this.passwordUpdateFlag = 1
        // G009.00.0 Add-Start
        this.posPassReadFlag = false
        this.posPasswordUpdateFlag = 1
        // G009.00.0 Add-End
        this.userData = {
          username: userId,
          displayCode: userId,
          firstName: '',
          password: '',
          posOperationPermission: {
            amountOff: 0,
            percentOff: 0,
            salesChange: 0,
            cancellation: 0,
            deposit: 0,
            withdrawal: 0,
            changeReserve: 0,
            // KSD V001.000 AS
            changeMachineInventoryCheck: 0,
            changeMachineRemaining: 0,
            changeMachineConnectDisconnect: 0,
            // KSD V001.000 AE
            report: 0,
            transactionSearch: 0,
            registerMinus: 0,
            returnValue: 0,
            audit: 0,
            calculate: 0
            // KSD V001.000 AS
            , exchange: 0,
            amountInput: 0,
            oesProg: 0,
            oesSet: 0,
            partCorrcet: 0,
            tendCorrcet: 0,
            unpaidDelete: 0,
            oesTime: 0
            // KSD V001.000 AE
          },
          //          roleCd: 0,
          //          passwordChangeDate: 0,
          //          passwordExpirationDate: 99,
          //          passwordErrors: 0,
          //          accountClassification: 0,
          // G002.00.0 Update-Start
          // belongStoreCd: '',
          belongStoreCd: this.optUserHeadquartersAuthority === 1 ? '' : this.optUserBelongStoreCd,
          belongStoreText: this.optUserHeadquartersAuthority === 1 ? '' : this.optUserBelongStoreText,
          // G002.00.0 Update-End
          headquartersPermission: 0,
          chargeStoreCds: []
        }
        //        this.belongStore = { storeCd: 0, name: '' }
        //        this.chargeStore = []
        // G002.00.0 Update-Start
        if (this.optUserHeadquartersAuthority !== 1) {
          this.$nextTick(() => {
            this.$refs.belongText.value = this.optUserBelongStoreText
            this.belongStoreText = this.optUserBelongStoreText
          })
        }
        // G002.00.0 Update-End
      }
    },
    openEnd () {
      //      document.getElementsByClassName('textUserName')[0].focus()
      //      document.getElementById('baseTable').scrollTo(0, 0)
      // this.passwordVisible = false
      // G009.00.0 Add-Start
      // this.posPasswordVisible = false
      // G009.00.0 Add-End
      // G013.00.0 Add-Start
      // DS KSD V001.000 83439
      // this.passwordVisible = true
      // this.posPasswordVisible = true
      // DE KSD V001.000 83439
      // AS KSD V001.000 83439
      this.passwordVisible = false
      this.posPasswordVisible = false
      // AE KSD V001.000 83439
      this.passwordVisibleFlg = false
      this.passwordVisiblePosFlg = false
      // G013.00.0 Add-End
      //      if (this.mode === 2) {
      //        this.setBelongStore()
      //        this.setChargeStore()
      //      }
      //      this.selected = this.userData.roleCd
      this.expirationDate = this.userData.passwordExpirationDays
      this.initErrorMessage()
    },
    async findStore (storeCd) {
      if (this.masters.storeMasters !== null) {
        for (var i = 0; i < this.masters.storeMasters.length; i++) {
          if (this.masters.storeMasters[i].name === storeCd) {
            return {
              storeCd: storeCd,
              name: this.masters.storeMasters[i].name,
              isError: false
            }
          }
        }
      }
      // 店舗が見つからなかった場合はエラーメッセージを表示して「保存」操作を無効化
      if (!this.operationLock) {
        this.$refs.pop.open(1, '', this.$i18n.t('F00001.S036'), '', false, null, false, null)
        this.operationLock = true
      }
      return { storeCd: storeCd, name: '', isError: true }
    },
    async setBelongStore () {
      this.belongStore = await this.findStore(this.userData.belongStoreCd)
    },
    async setChargeStore () {
      this.chargeStore = []
      this.chargeCdText = ''
      this.chargeTooltips = ''
      if (this.userData.headquartersPermission === 0) return
      var isError = false
      for (var i = 0; i < this.userData.chargeStoreCds.length; i++) {
        this.chargeStore[i] = await this.findStore(this.userData.chargeStoreCds[i].chargeStoreCd)
        if (this.chargeStore[i].isError) {
          isError = true
        }
        if (this.chargeTooltips !== '') {
          this.chargeTooltips = this.chargeTooltips + this.$i18n.t('F00001.S035')
        }
        this.chargeTooltips = this.chargeTooltips + this.chargeStore[i].name
      }
      if (isError) {
        this.chargeTooltips = ''
        this.chargeCdText = ''
      } else {
        // G001.00.0 Update start
        if (this.userData.chargeStoreCds.length === 0) {
          this.chargeCdText = ''
          this.$refs.chargeText.value = ''
        } else {
          this.chargeCdText = this.userData.chargeStoreCds.length + this.$i18n.t('F00001.S025')
          this.$refs.chargeText.value = this.userData.chargeStoreCds.length + this.$i18n.t('F00001.S025')
        }
        // G001.00.0 Update end
      }
    },
    enterValid () {
      document.getElementById('authValid').checked = true
      this.onRadioChange()
    },
    enterInvalid () {
      document.getElementById('authInvalid').checked = true
      this.onRadioChange()
    },
    // G001.00.0 Add start
    onAuthRadioChange () {
      if (document.getElementById('authValid').checked) {
        this.userData.headquartersPermission = 1
        // G008.00.1 Add-Start
        this.chargeStore = []
        // G008.00.1 Add-End
        // G005.00.0 Add start
        this.userData.chargeStoreCds = []
        // KSD V001.000 AS
        this.userData.belongStoreCd = ''
        this.userData.posOperationPermission.amountOff = 0
        this.userData.posOperationPermission.percentOff = 0
        this.userData.posOperationPermission.salesChange = 0
        this.userData.posOperationPermission.cancellation = 0
        this.userData.posOperationPermission.deposit = 0
        this.userData.posOperationPermission.withdrawal = 0
        this.userData.posOperationPermission.changeReserve = 0
        this.userData.posOperationPermission.changeMachineInventoryCheck = 0
        this.userData.posOperationPermission.changeMachineRemaining = 0
        this.userData.posOperationPermission.changeMachineConnectDisconnect = 0
        this.userData.posOperationPermission.report = 0
        this.userData.posOperationPermission.transactionSearch = 0
        this.userData.posOperationPermission.registerMinus = 0
        this.userData.posOperationPermission.returnValue = 0
        this.userData.posOperationPermission.audit = 0
        this.userData.posOperationPermission.calculate = 0
        this.userData.posOperationPermission.exchange = 0
        this.userData.posOperationPermission.amountInput = 0
        this.userData.posOperationPermission.oesProg = 0
        this.userData.posOperationPermission.oesSet = 0
        this.userData.posOperationPermission.partCorrcet = 0
        this.userData.posOperationPermission.tendCorrcet = 0
        this.userData.posOperationPermission.unpaidDelete = 0
        this.userData.posOperationPermission.oesTime = 0
        // KSD V001.000 AE
        setTimeout(() => {
          this.$refs.chargeText.value = ''
        }, 300)
        // G005.00.0 Add End
      } else {
        this.userData.headquartersPermission = 0
        // G005.00.0 Add start
        // G008.00.0 Update-Start
        // this.userData.belongStoreCd = 0
        this.userData.belongStoreCd = ''
        // KSD V001.000 AS
        this.userData.chargeStoreCds = []
        // KSD V001.000 AE
        // G008.00.1 Add-Start
        this.userData.posOperationPermission.amountOff = 0
        this.userData.posOperationPermission.percentOff = 0
        this.userData.posOperationPermission.salesChange = 0
        this.userData.posOperationPermission.cancellation = 0
        this.userData.posOperationPermission.deposit = 0
        this.userData.posOperationPermission.withdrawal = 0
        this.userData.posOperationPermission.changeReserve = 0
        // KSD V001.000 AS
        this.userData.posOperationPermission.changeMachineInventoryCheck = 0
        this.userData.posOperationPermission.changeMachineRemaining = 0
        this.userData.posOperationPermission.changeMachineConnectDisconnect = 0
        // KSD V001.000 AE
        this.userData.posOperationPermission.report = 0
        this.userData.posOperationPermission.transactionSearch = 0
        this.userData.posOperationPermission.registerMinus = 0
        this.userData.posOperationPermission.returnValue = 0
        this.userData.posOperationPermission.audit = 0
        this.userData.posOperationPermission.calculate = 0
        // KSD V001.000 AS
        this.userData.posOperationPermission.exchange = 0
        this.userData.posOperationPermission.amountInput = 0
        this.userData.posOperationPermission.oesProg = 0
        this.userData.posOperationPermission.oesSet = 0
        this.userData.posOperationPermission.partCorrcet = 0
        this.userData.posOperationPermission.tendCorrcet = 0
        this.userData.posOperationPermission.unpaidDelete = 0
        this.userData.posOperationPermission.oesTime = 0
        // KSD V001.000 AE
        // G008.00.1 Add-End
        // G008.00.0 Update-End
        setTimeout(() => {
          this.$refs.belongText.value = ''
        }, 300)
        // G005.00.0 Add End
      }
      // G008.00.1 Add-Start
      this.chargeErrorMsg = ''
      this.belongErrorMsg = ''
      // G008.00.1 Add-End
    },
    // G001.00.0 Add End
    onRadioChange () {
      // G001.00.0 Delete start
      // if (document.getElementById('authValid').checked) {
      //   this.userData.headquartersPermission = 1
      //   // G005.00.0 Add start
      //   this.userData.chargeStoreCds = []
      //   setTimeout(()=>{
      //     this.$refs.chargeText.value = ''
      //   },300)
      //   // G005.00.0 Add End
      // } else {
      //   this.userData.headquartersPermission = 0
      //   // G005.00.0 Add start
      //   this.userData.belongStoreCd = 0
      //   setTimeout(()=>{
      //     this.$refs.belongText.value = ''
      //   },300)
      //   // G005.00.0 Add End
      // }
      // G001.00.0 Delete End
      if (document.getElementById('amountOffValid').checked) {
        this.userData.posOperationPermission.amountOff = 1
      } else {
        this.userData.posOperationPermission.amountOff = 0
      }
      if (document.getElementById('percentOffValid').checked) {
        this.userData.posOperationPermission.percentOff = 1
      } else {
        this.userData.posOperationPermission.percentOff = 0
      }
      if (document.getElementById('salesChangeValid').checked) {
        this.userData.posOperationPermission.salesChange = 1
      } else {
        this.userData.posOperationPermission.salesChange = 0
      }
      if (document.getElementById('cancellationValid').checked) {
        this.userData.posOperationPermission.cancellation = 1
      } else {
        this.userData.posOperationPermission.cancellation = 0
      }
      if (document.getElementById('depositValid').checked) {
        this.userData.posOperationPermission.deposit = 1
      } else {
        this.userData.posOperationPermission.deposit = 0
      }
      if (document.getElementById('withdrawalValid').checked) {
        this.userData.posOperationPermission.withdrawal = 1
      } else {
        this.userData.posOperationPermission.withdrawal = 0
      }
      if (document.getElementById('changeReserveValid').checked) {
        this.userData.posOperationPermission.changeReserve = 1
      } else {
        this.userData.posOperationPermission.changeReserve = 0
      }
      // KSD V001.000 AS
      if (document.getElementById('changeMachineInventoryCheckValid').checked) {
        this.userData.posOperationPermission.changeMachineInventoryCheck = 1
      } else {
        this.userData.posOperationPermission.changeMachineInventoryCheck = 0
      }
      if (document.getElementById('changeMachineRemainingValid').checked) {
        this.userData.posOperationPermission.changeMachineRemaining = 1
      } else {
        this.userData.posOperationPermission.changeMachineRemaining = 0
      }
      if (document.getElementById('changeMachineConnectDisconnectValid').checked) {
        this.userData.posOperationPermission.changeMachineConnectDisconnect = 1
      } else {
        this.userData.posOperationPermission.changeMachineConnectDisconnect = 0
      }
      // KSD V001.000 AE
      if (document.getElementById('reportValid').checked) {
        this.userData.posOperationPermission.report = 1
      } else {
        this.userData.posOperationPermission.report = 0
      }
      if (document.getElementById('transactionSearchValid').checked) {
        this.userData.posOperationPermission.transactionSearch = 1
      } else {
        this.userData.posOperationPermission.transactionSearch = 0
      }
      if (document.getElementById('registerMinusValid').checked) {
        this.userData.posOperationPermission.registerMinus = 1
      } else {
        this.userData.posOperationPermission.registerMinus = 0
      }
      if (document.getElementById('returnValue').checked) {
        this.userData.posOperationPermission.returnValue = 1
      } else {
        this.userData.posOperationPermission.returnValue = 0
      }

      if (document.getElementById('auditValid').checked) {
        this.userData.posOperationPermission.audit = 1
      } else {
        this.userData.posOperationPermission.audit = 0
      }

      if (document.getElementById('calculateValid').checked) {
        this.userData.posOperationPermission.calculate = 1
      } else {
        this.userData.posOperationPermission.calculate = 0
      }
      // KSD V001.000 AS
      if (document.getElementById('exchangeValid').checked) {
        this.userData.posOperationPermission.exchange = 1
      } else {
        this.userData.posOperationPermission.exchange = 0
      }
      if (document.getElementById('amountInputValid').checked) {
        this.userData.posOperationPermission.amountInput = 1
      } else {
        this.userData.posOperationPermission.amountInput = 0
      }
      if (document.getElementById('oesProgValid').checked) {
        this.userData.posOperationPermission.oesProg = 1
      } else {
        this.userData.posOperationPermission.oesProg = 0
      }
      if (document.getElementById('oesSetValid').checked) {
        this.userData.posOperationPermission.oesSet = 1
      } else {
        this.userData.posOperationPermission.oesSet = 0
      }
      if (document.getElementById('partCorrcetValid').checked) {
        this.userData.posOperationPermission.partCorrcet = 1
      } else {
        this.userData.posOperationPermission.partCorrcet = 0
      }
      if (document.getElementById('tendCorrcetValid').checked) {
        this.userData.posOperationPermission.tendCorrcet = 1
      } else {
        this.userData.posOperationPermission.tendCorrcet = 0
      }
      if (document.getElementById('unpaidDeleteValid').checked) {
        this.userData.posOperationPermission.unpaidDelete = 1
      } else {
        this.userData.posOperationPermission.unpaidDelete = 0
      }
      if (document.getElementById('oesTimeValid').checked) {
        this.userData.posOperationPermission.oesTime = 1
      } else {
        this.userData.posOperationPermission.oesTime = 0
      }
      // KSD V001.000 AE
    },
    onClickReturn () {
      // G001.00.0 Add-Start
      if (this.$refs.belongText) {
        this.$refs.belongText.value = ''
      }
      if (this.$refs.chargeText) {
        this.$refs.chargeText.value = ''
      }
      // G001.00.0 Add-End
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
        if (await this.refreshFunc(0) === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.closeFunc()
          this.dialog = false
        } else {
          this.$refs.pop.closeFunction()
        }
      }
    },
    async executeSave () {
      // 保存
      var result = false
      try {
        // 新規作成の場合は常にパスワード変更扱い
        if (this.mode === 1) {
          this.passwordUpdateFlag = 1
          // G009.00.0 Add-Start
          this.posPasswordUpdateFlag = 1
          // G009.00.0 Add-End
        }
        // 担当店舗設定
        var chargeCds
        if (this.userData.headquartersPermission === 1) {
          chargeCds = []
          for (var i = 0; i < this.chargeStore.length; i++) {
            chargeCds.push({ chargeStoreCd: this.chargeStore[i].storeCd })
          }
        } else {
          chargeCds = null
        }
        let params = {
          users: [
            {
              // G011.00.0 Add-Start
              passwordSetTS: this.userData.passwordSetTS ? this.userData.passwordSetTS : 0,
              // G011.00.0 Add-End
              mode: this.mode,
              userId: this.userData.username,
              name: this.$refs.nameText.value,
              passwordUpdateFlg: this.passwordUpdateFlag,
              // G009.00.0 Add-Start
              posPasswordUpdateFlg: this.posPasswordUpdateFlag,
              // G009.00.0 Add-End
              password: this.$refs.passwordText.value,
              //              roleCd: this.$refs.roleText.value,
              passwordChangeDate: 0,
              passwordExpirationDate: this.$refs.expiryText.value,
              passwordErrors: 0,
              //              accountClassification: 0,
              belongStoreCd: this.userData.belongStoreCd,
              headquartersPermission: this.userData.headquartersPermission,
              chargeStoreCds: chargeCds,
              id: this.userData.id,
              version: this.userData.version,
              amountOff: this.userData.posOperationPermission.amountOff,
              percentOff: this.userData.posOperationPermission.percentOff,
              salesChange: this.userData.posOperationPermission.salesChange,
              cancellation: this.userData.posOperationPermission.cancellation,
              deposit: this.userData.posOperationPermission.deposit,
              withdrawal: this.userData.posOperationPermission.withdrawal,
              changeReserve: this.userData.posOperationPermission.changeReserve,
              // KSD V001.000 AS
              changeMachineInventoryCheck: this.userData.posOperationPermission.changeMachineInventoryCheck,
              changeMachineRemaining: this.userData.posOperationPermission.changeMachineRemaining,
              changeMachineConnectDisconnect: this.userData.posOperationPermission.changeMachineConnectDisconnect,
              // KSD V001.000 AE
              report: this.userData.posOperationPermission.report,
              transactionSearch: this.userData.posOperationPermission.transactionSearch,
              registerMinus: this.userData.posOperationPermission.registerMinus,
              returnValue: this.userData.posOperationPermission.returnValue,
              audit: this.userData.posOperationPermission.audit,
              calculate: this.userData.posOperationPermission.calculate,
              // KSD V001.000 AS
              exchange: this.userData.posOperationPermission.exchange,
              amountInput: this.userData.posOperationPermission.amountInput,
              oesProg: this.userData.posOperationPermission.oesProg,
              oesSet: this.userData.posOperationPermission.oesSet,
              partCorrcet: this.userData.posOperationPermission.partCorrcet,
              tendCorrcet: this.userData.posOperationPermission.tendCorrcet,
              unpaidDelete: this.userData.posOperationPermission.unpaidDelete,
              oesTime: this.userData.posOperationPermission.oesTime,
              // KSD V001.000 AE
              username: this.userData.username,
              accessAuthority: this.$refs.roleText.value
            }
          ]
        }

        if (this.userData.headquartersPermission === 0) {
          // G008.00.1 Update-Start
          // params.users[0].posPrintingName = this.$refs.posPrintingNameText.value
          // params.users[0].posPassword = this.$refs.posPasswordText.value
          // params.users[0].posUserName = this.$refs.posUserNameText.value
          params.users[0].posPrintingName = params.users[0].belongStoreCd ? this.$refs.posPrintingNameText.value : null
          params.users[0].posPassword = params.users[0].belongStoreCd ? this.$refs.posPasswordText.value : null
          params.users[0].posUserName = params.users[0].belongStoreCd ? this.$refs.posUserNameText.value : null
          // G008.00.1 Update-End
        }
        // KSD V001.000 AS
        else {
          params.users[0].posPrintingName = (params.users[0].chargeStoreCds.length > 0) ? this.$refs.posPrintingNameText.value : null
          params.users[0].posPassword = (params.users[0].chargeStoreCds.length > 0) ? this.$refs.posPasswordText.value : null
          params.users[0].posUserName = (params.users[0].chargeStoreCds.length > 0) ? this.$refs.posUserNameText.value : null
        }
        // KSD V001.000 AE
        // アクセス権、所属店舗は、未選択時はnullにする
        //        if (params.users[0].roleCd === 0 || params.users[0].roleCd === '') {
        //          params.users[0].roleCd = null
        //        }
        //        if (params.users[0].belongStoreCd === 0) {
        //          params.users[0].belongStoreCd = null
        //        }
        // 保存
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // G001.00.0 Add-Start
          if (this.$refs.belongText) {
            this.$refs.belongText.value = ''
          }
          if (this.$refs.chargeText) {
            this.$refs.chargeText.value = ''
          }
          // G001.00.0 Add-End
          result = true
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E005'), '', false, null, false, null)
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
        if (await this.refreshFunc(this.userData.username) === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.closeFunc()
          this.dialog = false
        } else {
          this.$refs.pop.closeFunction()
        }
      }
    },
    async executeDelete () {
      // 削除
      var result = false
      try {
        var userId = this.userData.username
        let response = await axios.delete(this.$i18n.t('prop.url') + deletePath + '/' + userId, commonUtils.methods.addApiHeader({data: 'userId'}))
        if (response.data.result.code === 0) {
          // G001.00.0 Add-Start
          if (this.$refs.belongText) {
            this.$refs.belongText.value = ''
          }
          if (this.$refs.chargeText) {
            this.$refs.chargeText.value = ''
          }
          // G001.00.0 Add-End
          result = true
        } else if (response.data.result.code === -98) { // G007.00.0 Add start
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else { // G007.00.0 Add End
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E009'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    saveErrorMapping (result) {
      this.focusItem = null
      if (result.code === -99) {
        // G012.00.0 Update-Start
        // 画面項目の下から順に評価
        // if (result.errorMessageMap['users[0].chargeStoreCds'] !== undefined) {
        //   this.chargeErrorMsg = result.errorMessageMap['users[0].chargeStoreCds'].toString().split(',')
        //   this.focusItem = null
        // }
        // if (result.errorMessageMap['users[0].belongStoreCd'] !== undefined) {
        //   this.belongErrorMsg = result.errorMessageMap['users[0].belongStoreCd'].toString().split(',')
        //   this.focusItem = null
        // }
        // if (result.errorMessageMap['users[0].roleCd'] !== undefined) {
        //   this.roleCdErrorMsg = result.errorMessageMap['users[0].roleCd'].toString().split(',')
        //   this.focusItem = this.$refs.roleText
        // }
        // POSパスワード
        if (result.errorMessageMap['users[0].posPassword'] !== undefined) {
          this.posPasswordErrorMsg = result.errorMessageMap['users[0].posPassword'].toString().split(',')
          this.focusItem = this.$refs.posPasswordText
        }
        // G008.00.0 Add-Start
        // POS印字名称
        if (result.errorMessageMap['users[0].posPrintingName'] !== undefined) {
          this.posPrintingNameErrorMsg = result.errorMessageMap['users[0].posPrintingName'].toString().split(',')
          this.focusItem = this.$refs.posPrintingNameText
        }
        // G008.00.0 Add-End
        // 責任者No
        if (result.errorMessageMap['users[0].posUserName'] !== undefined) {
          this.posUserNameErrorMsg = result.errorMessageMap['users[0].posUserName'].toString().split(',')
          this.focusItem = this.$refs.posUserNameText
        }
        // 所属店舗
        if (result.errorMessageMap['users[0].belogStore'] !== undefined) {
          this.belongErrorMsg = result.errorMessageMap['users[0].belogStore'].toString().split(',')
          this.focusItem = this.$refs.belongText
        }
        // 担当店舗
        if (result.errorMessageMap['users[0].chargeStore'] !== undefined) {
          this.chargeErrorMsg = result.errorMessageMap['users[0].chargeStore'].toString().split(',')
          this.focusItem = this.$refs.chargeText
        }
        // アクセス権限
        if (result.errorMessageMap['users[0].accessAuthority'] !== undefined) {
          this.roleCdErrorMsg = result.errorMessageMap['users[0].accessAuthority'].toString().split(',')
          this.focusItem = this.$refs.roleText
        }
        // パスワード有効期限
        if (result.errorMessageMap['users[0].passwordExpirationDate'] !== undefined) {
          this.expiryErrorMsg = result.errorMessageMap['users[0].passwordExpirationDate'].toString().split(',')
          this.focusItem = this.$refs.expiryText
        }
        // パスワード
        if (result.errorMessageMap['users[0].password'] !== undefined) {
          this.passwordErrorMsg = result.errorMessageMap['users[0].password'].toString().split(',')
          if (this.$refs.passwordText.readOnly === false) {
            this.focusItem = this.$refs.passwordText
          } else {
            this.focusItem = null
          }
        }
        // 名称
        if (result.errorMessageMap['users[0].name'] !== undefined) {
          this.nameErrorMsg = result.errorMessageMap['users[0].name'].toString().split(',')
          this.focusItem = this.$refs.nameText
        }
        // G012.00.0 Update-End
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), result.code, false, this.setFocus, false, null)
      } else if (result.code === -100) {
        this.posUserNameErrorMsg = this.$i18n.t('F00001.E023').split(',')
        this.focusItem = this.$refs.posUserNameText
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
      this.passwordErrorMsg = ''
      this.expiryErrorMsg = ''
      this.roleCdErrorMsg = ''
      this.belongErrorMsg = ''
      this.chargeErrorMsg = ''
      this.usernameErrorMsg = ''
      this.posPrintingNameErrorMsg = ''
      this.posPasswordErrorMsg = ''
      this.posUserNameErrorMsg = ''
    },
    ChangePassword () {
      // G013.00.0 Update-Start
      // DS KSD V001.000 83439
      //if (this.passwordVisibleFlg) {
      //  this.passwordVisible = !this.passwordVisible
      //}
      // DE KSD V001.000 83439
      // AS KSD V001.000 83439
      // AS KSD V001.000 83439
      if (this.mode === 1 || (this.mode === 2 && !this.passReadFlag)) {
        // AE KSD V001.000 83439
        this.passwordVisible = !this.passwordVisible;
        // AS KSD V001.000 83439
      }
      // AE KSD V001.000 83439
      // AE KSD V001.000 83439
      // this.passwordVisible = !this.passwordVisible
      // G013.00.0 Update-Start
    },
    passwordUpdate () {
      this.passwordErrorMsg = ''
      this.passReadFlag = !this.passReadFlag
      // G013.00.0 Add-Start
      this.passwordVisibleFlg = true
      if (this.passwordVisibleFlg) {
        this.passwordVisible = false
      }
      // G013.00.0 Add-End
      if (this.passReadFlag) {
        this.passwordUpdateFlag = 0
      } else {
        this.passwordUpdateFlag = 1
      }
    },
    // G009.00.0 Add-Start
    ChangePosPassword () {
      // G013.00.0 Update-Start
      // this.posPasswordVisible = !this.posPasswordVisible
      // DS KSD V001.000 83439
      //if (this.passwordVisiblePosFlg) {
      //  this.posPasswordVisible = !this.posPasswordVisible
      //}
      // DE KSD V001.000 83439
      // AS KSD V001.000 83439
      // AS KSD V001.000 83439
      if (this.mode === 1 || (this.mode === 2 && !this.posPassReadFlag)) {
        // AE KSD V001.000 83439
        this.posPasswordVisible = !this.posPasswordVisible;
        // AS KSD V001.000 83439
      }
      // AE KSD V001.000 83439
      // AE KSD V001.000 83439
      // G013.00.0 Update-End
    },
    posPasswordUpdate () {
      this.posPasswordErrorMsg = ''
      this.posPassReadFlag = !this.posPassReadFlag
      // G013.00.0 Add-Start
      //  this.posPasswordVisible = false
      this.passwordVisiblePosFlg = true
      if (this.passwordVisiblePosFlg) {
        this.posPasswordVisible = false
      }
      // G013.00.0 Add-End
      if (this.posPassReadFlag) {
        this.posPasswordUpdateFlag = 0
      } else {
        this.posPasswordUpdateFlag = 1
      }
    },
    // G009.00.0 Add-End
    async belongSelect () {
      // G002.00.0 Update-Start
      if (this.optUserHeadquartersAuthority !== 1) {
        // G010.00.0 Add-Start
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W019'), '', false, null, false, null)
        // G010.00.0 Add-End
        return
      }
      // G002.00.0 Update-End
      this.singleSelect = true
      let selectedStoreCodes = [this.userData.belongStoreCd]
      // G004.00.0 Update-Start
      // let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      // G010.00.0 Update-Start
      // let getMasters = this.$refs.dialogStoreSelect.getMasters(true)
      let getMasters = this.$refs.dialogStoreSelect.getMastersNoAuth(true)
      // G010.00.0 Update-End
      // G004.00.0 Update-End
      this.masters = await getMasters
      // G008.00.0 Delete-Start
      // this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
      // G008.00.0 Delete-End
      // G008.00.0 Add-Start
      if (!this.masters.isError) {
        this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
      }
      // G008.00.0 Add-End
    },
    async chargeSelect () {
      // G002.00.0 Update-Start
      if (this.optUserHeadquartersAuthority !== 1) {
        // G010.00.0 Add-Start
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W019'), '', false, null, false, null)
        // G010.00.0 Add-End
        return
      }
      // G002.00.0 Update-End
      this.singleSelect = false
      let selectedStoreCodes = []
      if (this.userData.chargeStoreCds !== null) {
        for (var i = 0; i < this.userData.chargeStoreCds.length; i++) {
          selectedStoreCodes.push(this.userData.chargeStoreCds[i].chargeStoreCd)
        }
      }
      // G004.00.0 Update-Start
      // let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      // G010.00.0 Update-Start
      // let getMasters = this.$refs.dialogStoreSelect.getMasters(true)
      let getMasters = this.$refs.dialogStoreSelect.getMastersNoAuth(true)
      // G010.00.0 Update-End
      // G004.00.0 Update-End
      this.masters = await getMasters
      // G008.00.0 Delete-Start
      // this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, true)
      // G008.00.0 Delete-End
      // G008.00.0 Add-Start
      if (!this.masters.isError) {
        this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, true)
      }
      // G008.00.0 Add-End
    },
    storeSelectOk (selectedStoreCodes) {
      if (this.singleSelect) {
        if (selectedStoreCodes.length > 0) {
          this.userData.belongStoreCd = selectedStoreCodes[0]
          if (this.masters.storeMasters !== null) {
            var index = this.masters.storeMasters.findIndex((element) => element.name === this.userData.belongStoreCd)
            if (index >= 0) {
              this.$refs.belongText.value = this.masters.storeMasters[index].displayName.default
              this.belongStoreText = this.masters.storeMasters[index].displayName.default
              this.operationLockStore = false
            }
          }
        }
      } else {
        this.userData.chargeStoreCds = []
        this.chargeCdText = ''
        for (var i = 0; i < selectedStoreCodes.length; i++) {
          this.userData.chargeStoreCds.push({ chargeStoreCd: selectedStoreCodes[i] })
          if (this.masters.storeMasters !== null) {
            var index = this.masters.storeMasters.findIndex((element) => element.name === selectedStoreCodes[i])
            if (index >= 0) {
              this.chargeCdText = this.masters.storeMasters[index].displayName.default
              this.$refs.chargeText.value = this.masters.storeMasters[index].displayName.default
            }
          }
        }
        this.setChargeStore()
      }
      // G008.00.1 Add-Start
      this.$forceUpdate()
      // G008.00.1 Add-End
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.belongText = ''
      this.operationLockStore = true
      if (this.masters.storeMasters !== null) {
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.userData.belongStoreCd = this.masters.storeMasters[index].displayName.default
          this.operationLockStore = false
        }
      }
    },
    numInputRegulation () {
      this.userData.posUserName = this.userData.posUserName.toString().replace(/[^0-9]/gi, '')
      // G006.00.0 Add start
      this.userData.posUserName = this.userData.posUserName.toString().replace(/\b(0+)/gi, '')
      // G006.00.0 Add end
    },
    inputLimit (str, maxLength) {
      if (str != null) {
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
            if (this.userData.firstName === str) {
              this.userData.firstName = str.toString().substring(0, i)
            } else if (this.userData.posPrintingName === str) {
              this.userData.posPrintingName = str.toString().substring(0, i)
            }
            break
          } else {
          // maxLength以下は何もしない
          }
        }
      }
    }
  },
  watch: {
    expirationDate: function (val) {
      if (this.expirationDate != null) {
        this.expirationDate = this.expirationDate.toString().replace(/[^0-9]/gi, '')
      }
    }
  },
  // G002.00.0 Update-Start
  async mounted () {
    let vue = this
    let belongStoreCdStr = ''
    // G003.00.0 Add start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G003.00.0 Add end
    vue.$root.$once('getBelongStoreCd', (belongStoreCd) => {
      // headerで保持している所属店舗コード
      belongStoreCdStr = belongStoreCd
    })
    let belongStoreNameStr = ''
    vue.$root.$once('getBelongStoreName', (belongStoreName) => {
      // 対象店舗名 = headerで保持している所属店舗名
      belongStoreNameStr = belongStoreName
    })
    let targetStoreCd = ''
    vue.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      // 対象店舗コード = headerで保持している所属企業コード + headerで保持している所属店舗コード
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.optUserHeadquartersAuthority = headquartersAuthority
      if (headquartersAuthority !== 1) {
        if (targetStoreCd) {
          vue.optUserBelongStoreText = belongStoreNameStr
          vue.optUserBelongStoreCd = targetStoreCd
        }
      }
    })
  }
  // G002.00.0 Update-End
}
