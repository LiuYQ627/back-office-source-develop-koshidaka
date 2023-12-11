import axios from 'axios'
import draggable from 'vuedraggable'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import drawerMenuSettingDialog from '@/resource/templates/OperationBtnSetting/DrawerMenuSettingDialog'
import itemDetailSettingDialog from '@/resource/templates/OperationBtnSetting/ItemDetailSettingDialog'
import accountingSettingDialog from '@/resource/templates/OperationBtnSetting/AccountingSettingDialog'
import subMediaSettingDialog from '@/resource/templates/OperationBtnSetting/SubMediaSettingDialog'
import compareUtil from './compare'
// KSD V001.000 AS
import couponUseSettingDialog from '@/resource/templates/OperationBtnSetting/CouponUseSettingDialog'
// KSD V001.000 AE
// G001.00.0 Add-Start
import subMediaBtnSettingDialog from '@/resource/templates/OperationBtnSetting/SubMediaBtnSettingDialog'
// G001.00.0 Add-End
// G001.00.0 Update-Start
// const fetchCurrentConfiguration = "Reservation/FetchConfiguration"
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'
// G001.00.0 Update -End
const putCurrentConfiguration = 'Reservation/UpdateConfigurationBy5Step'
// KSD V001.000 AS
const systeminffixSysConfiguration = 'Restaurants/SysteminffixSys/Query'
const taxRatesConfiguration = 'TaxTaxes/Query'
const getRestaurantsTicket = 'RestaurantsTicket/Query'
// KSD V001.000 AE
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221221 duyouwei(Neusoft)  G001.00.0  issue課題#1161を対応します.
 * 20230104 duyouwei(Neusoft)  G002.00.0  issue課題#1204を対応します.
 * 20230112 bai.ry(Neusoft)  G003.00.0  issue課題#1249を対応します.
 * 20230113 bai.ry(Neusoft)  G004.00.0  issue課題#1370を対応します.
 * 20230129 duyouwei(Neusoft)  G005.00.0  issue課題#1032を対応します.
 * 20230206 duyouwei(Neusoft)  G006.00.0  issue課題#1336を対応します.
 * 20230216 xujh(Neusoft)  G007.00.0  issue課題#1475を対応します.
 * 20230221 xujh(Neusoft)  G008.00.0  issue課題#1590を対応します.
 * 20230316 duyouwei(Neusoft)  G009.00.0  issue課題#714を対応します.
 * 20230403 wangchunmei(Neusoft)  G010.00.0  issue課題#1767を対応します.
 * 20230410 wangchunmei(Neusoft)  G011.00.0  issue課題#1798を対応します.
 * 20230411 bai.ry(Neusoft)  G012.00.0  issue課題#1166を対応します.
 * 20230414 wangchunmei(Neusoft)  G013.00.0  issue課題#908を対応します.
 * 20230417 bai.ry(Neusoft)  G014.00.0  issue課題#1461を対応します.
 * 20230418 wangchunmei(Neusoft)  G010.00.1  issue課題#1767を対応します.
 * 20230421  dingxin(Neusoft)      G015.00.0  issue課題#1662を対応します.
 * 20230426  dingxin(Neusoft)      G016.00.0  issue課題#1662を対応します.
 * 20230511  dingxin(Neusoft)      G017.00.0  issue課題#1461を対応します.
 * 20230511  dingxin(Neusoft)      G017.00.1  issue課題#1461を対応します.
 * 20230530  qinshh(Neusoft)   G018.00.1  issue課題#1392を対応します.
 * 20230530  duyouwei(Neusoft)   G019.00.1  issue課題#1776を対応します.
 * 20230613  wangchunmei(Neusoft)   G010.00.2  issue課題#1767を対応します.
 * 20230615  wangchunmei(Neusoft)   G020.00.0  issue課題#1211を対応します.
 * 20230825  heqianlong(Neusoft)   G021.00.0  issue課題#1187を対応します.
 */

export default {
  name: 'OperationBtnSetting',
  data () {
    return {
      // G015.00.0 Add-Start
      permissions: [],
      // G015.00.0 Add-End
      initialized: false,
      isProcessing: false,
      config: {},
      targetStoreCodes: [],
      sourceStoreCodes: [],

      setting: null,
      originSetting: null,
      mediaList: [],
      drawerMenu: [],
      itemDetails: [],
      accountingSettings: [],
      subListItems: [],

      currentScreen: null,
      isSubListScreen: null,
      // G001.00.0 Add-Start
      popupTitle: '',
      // G001.00.0 Add-End
      // G006.00.0 Add-Start
      showWarrningFlag: false,
      // G001.00.0 Add-End
      // DS #1589
      // disabledFixedBtn: true,
      // DE #1589
      currentStoreSelected: ''
      // KSD V001.000 AS
      , oesFlag1: false,
      couponUse: [],
      nodeId: null,
      taxRates: [],
      sysinfixxResCode: 0,
      resTickets: [],
      drawerMenuFetchCopy: []
      // KSD V001.000 AE
    }
  },
  computed: {
    displayDrawerMenu: {
      get () {
        // KSD V001.000 DS
        // return this.drawerMenu.filter(([key, value]) => value.active)
        // KSD V001.000 DE
        // KSD V001.000 AS
        let updatedDrawerMenu = []
        this.drawerMenu.forEach(item => {
          if (this.config.drawerMenuName[item[0]] !== undefined) {
            updatedDrawerMenu.push(item)
          }
        })
        this.drawerMenu = updatedDrawerMenu
        return this.drawerMenu.filter(([key, value]) => this.oesFlag1 === true || (this.oesFlag1 === false && value.active)
          ? value.active : value.active && key !== 'unpaidList')
        // KSD V001.000 AE
      },
      set (newValue) {
        var newList = JSON.parse(JSON.stringify(newValue))

        this.drawerMenu.forEach(menu => {
          const index = newList.findIndex(i => i[0] === menu[0])
          if (index < 0) {
            newList.push(JSON.parse(JSON.stringify(menu)))
          }
        })

        this.drawerMenu = newList

        for (var i = 0; i < this.drawerMenu.length; i++) {
          this.drawerMenu[i][1].sort = i + 1
        }
      }
    },
    // KSD V001.000 AS
    hiddenUnpaidList () {
      const unpaidListActive = this.drawerMenuFetchCopy.filter(([key, value]) => key === 'unpaidList')[0][1].active
      const displayWithCheck = (unpaidListActive && this.oesFlag1) || (unpaidListActive && !this.oesFlag1)
      const unchecked = !unpaidListActive && this.oesFlag1
      const hidden = !unpaidListActive && !this.oesFlag1
      if (hidden) {
        return true
      }
      if (unchecked || displayWithCheck) {
        return false
      }
    },
    // KSD V001.000 AE
    accountingSettingName () {
      return (setting) => {
        if (setting.kind == 0) {
          return setting.displayName.default
        }

        const media = this.mediaList.find(item => item.key == setting.paymentType)
        return media ? media.displayName.default : null
      }
    },
    sourceStoreCanseled () {
      return this.currentStoreSelected === ((typeof this.sourceStoreCodes[0] === 'undefined') ? '' : this.sourceStoreCodes[0])
    // AS #1589
    },
    disabledFixedBtn () {
      // G015.00.0 Update-Start
      // return !this.targetStoreCodes.length || (this.setting === null)
      return (!this.targetStoreCodes.length || (this.setting === null)) || !this.permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')
      // G015.00.0 Update-End
    // AE #1589
    }
  },
  components: {
    draggable,
    popup,
    maintButton,
    storeSelect,
    drawerMenuSettingDialog,
    itemDetailSettingDialog,
    // KSD V001.000 AS
    couponUseSettingDialog,
    // KSD V001.000 AE
    accountingSettingDialog,
    // G001.00.0 Add-Start
    subMediaBtnSettingDialog,
    // G001.00.0 Add-End
    subMediaSettingDialog
  },
  methods: {
    getNameFromSetting (code) {
      if (this.setting && this.setting.configurations[code] && this.setting.configurations[code].value.displayName) {
        return this.setting.configurations[code].value.displayName.default
      } else {
        return ''
      }
    },
    async initialize () {
      this.getConfig()
    },
    getConfig () {
      this.config = require('./_config.json')
    },
    initItemDetails () {
      this.itemDetails = []
      for (var i = 0; i < 99; i++) {
        this.itemDetails.push({
          active: false,
          x: i % 4 + 1,
          y: Math.floor(i / 4) + 1
        })
      }
    },
    // KSD V001.000 AS
    initCouponUse () {
      this.couponUse = []
      for (var i = 0; i < 30; i++) {
        this.couponUse.push({
          active: false,
          order: i,
          y: i % 6 + 1,
          x: Math.floor(i / 6) + 1
        })
      }
    },
    // KSD V001.000 AE
    // G003.00.0 Add-Start
    calcNum () {
      return 5
    },
    // G003.00.0 Add-End
    initSubListItems () {
    // G003.00.0 Add-Start
      let num = this.calcNum()
      // G003.00.0 Add-End
      this.subListItems = []
      for (var i = 0; i < 99; i++) {
        this.subListItems.push({
          active: false,
          displayName: {},
          x: i % num + 1,
          y: Math.floor(i / num) + 1
        })
      }
    },
    fixed () {
      if (this.targetStoreCodes.length == 0) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b1.E002'), '', false, () => {
        }, false, null)
        return
      }

      if (this.isSubListScreen !== null) {
        this.closeSubListScreen()
      }

      this.loadChangedCurrentSetting()

      // G006.00.0 Add-Start
      this.setNameTransactionSettings()
      // G006.00.0 Add-End
      this.targetStoreCodes.map(code => this.saveCurrentSetting(code))
    },
    // G006.00.0 Add-Start
    setNameTransactionSettings () {
      this.showWarrningFlag = false
      this.setting.configurations.ACCOUNTING_SETTINGS.value.forEach(accountValue => {
        if (accountValue.kind === 0 && accountValue.subList && accountValue.subList.length > 0) {
          accountValue.subList.forEach(subItem => {
            // G009.00.0 Update-Start
            // this.setNameTransactionSettingsDetail(subItem, '1', '')
            this.setNameTransactionSettingsDetail(subItem, '1')
            // G009.00.0 Update-End
          })
        }
        // G009.00.0 Delete-Start
        // else if (accountValue.kind === 1 && accountValue.subList && accountValue.subList.length > 0) {
        //   accountValue.subList.forEach(subItem => {
        //     // G009.00.0 Update-Start
        //     this.setNameTransactionSettingsDetail(subItem, '1', accountValue.paymentType)
        //     // G009.00.0 Update-End
        //   })
        // }
        // G009.00.0 Delete-End
      })
      this.setting.configurations.ITEM_DETAILS_SETTINGS.value.forEach(itemDetailValue => {
        this.setNameTransactionSettingsDetail(itemDetailValue, '0')
      })
    },
    // G009.00.0 Update-Start
    setNameTransactionSettingsDetail (details, operationFlag) {
      if (details.transactionNo !== undefined && details.kind !== undefined) {
        let transactionNo = '2' + this.getKindValue()[details.kind] + details.transactionNo.substr(3, 2) + operationFlag
        let inputName = details.displayName.default + '計'
        // let transactionNo = ''
        // if (operationFlag !== '0') {
        //   if (details.transactionNo !== undefined) {
        //     transactionNo = '2' + this.getKindValue()[details.kind] + details.transactionNo.substr(3, 2) + operationFlag
        //   } else {
        //     transactionNo = '2' + payment.substr(8, 2) + details.subType.substr(4, 2) + operationFlag
        //   }
        // } else {
        //   transactionNo = '2' + this.getKindValue()[details.kind] + details.transactionNo.substr(3, 2) + operationFlag
        // }
        // let inputName = ''
        // if (details.displayName) {
        //   inputName = details.displayName.default + '計'
        // } else {
        //   inputName = this.setting.configurations[payment].value.submediaList.find((item) => item.name === details.subType).displayName.default + '計'
        // }

        let obj = this.setting.configurations.NAME_TRANSACTION_SETTINGS.value.find((item) => item.transactionNo === transactionNo)
        if (!obj) {
          // 新規
          obj = {
            transactionNo: transactionNo,
            defaultName: {
              default: inputName,
              'en-US': ''
            },
            displayName: {
              default: inputName,
              'en-US': ''
            },
            printName: {
              default: inputName,
              'en-US': ''
            },
            printNo: 0,
            order: Number(transactionNo)
          }
          this.setting.configurations.NAME_TRANSACTION_SETTINGS.value.push(obj)
        } else {
          // 編集
          this.setting.configurations.NAME_TRANSACTION_SETTINGS.value.forEach(item => {
            if (item.transactionNo === transactionNo) {
              if (item.defaultName.default !== inputName) {
                this.showWarrningFlag = true
              }
              item.defaultName.default = inputName
            }
          })
        }
      }
    },
    // G009.00.0 Update-End
    getKindValue () {
      let arr = [
        '02', // 値引
        '01', // 割引
        '03', // 売価変更
        '04' // 割増
      ]
      return arr
    },
    // G018.00.0 Update-Start
    // G006.00.0 Add-End
    // KSD V001.000 DS
    // sourceStoreChanged (storeIds, returnOrSave) {
    // KSD V001.000 DE
    // KSD V001.000 AS
    async sourceStoreChanged (storeIds, returnOrSave) {
    // KSD V001.000 AE
    // sourceStoreChanged (storeIds) {
    // G018.00.0 Update-End
      if (this.sourceStoreCodes.length) {
        console.log(this.sourceStoreCodes, 'sourceStoreChanged')
        console.log(this.sourceStoreCanseled, 'this.sourceStoreCanseled')
        // G018.00.0 Update-Start
        if (returnOrSave.length === 1) {
        // if (!this.sourceStoreCanseled) {
        // G018.00.0 Update-End
        // KSD V001.000 DS
        // this.getCurrentSetting(storeIds[0])
        // KSD V001.000 DE
        // KSD V001.000 AS
          if (await this.getCurrentSetting(storeIds[0]) === false) return
          if (await this.getSysteminffixSys(storeIds[0]) === false) return
          this.getTaxRates(storeIds[0])
          this.fetchRestaurantsTicket(storeIds[0])
          // KSD V001.000 AE
        }
        this.currentStoreSelected = this.sourceStoreCodes[0]
      } else {
        // G012.00.0 Delete-Start
        // this.$refs.pop.open(2, '', this.$i18n.t('F322b2.W000'), '', false, null, false, null)
        // G012.00.0 Delete-End
      }
    },
    // KSD V001.000 DS
    // getCurrentSetting (nodeId) {
    // KSD V001.000 DE
    // KSD V001.000 AS
    async getCurrentSetting (nodeId) {
      let result = false
      this.nodeId = nodeId
      this.isProcessing = true
      // KSD V001.000 AE
      // KSD V001.000 DS
      // // G020.00.0 Update-Start
      // // this.isProcessing = true
      // this.$refs.pop.open(4, '', this.$i18n.t('O00004.W016'), '', false, null, false, null)
      // // G020.00.0 Update-End
      // axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
      // KSD V001.000 DE
      // KSD V001.000 AS
      try {
        await axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
          // KSD V001.000 AE
          nodeId: nodeId,
          excludeFields: false
        }, commonUtils.methods.getApiHeader())
          .then(response => {
            // G020.00.0 Update-Start
            this.$refs.pop.closeFunction()
            // this.isProcessing = false
            // KSD V001.000 AS
            this.isProcessing = false
            // KSD V001.000 AE
            // G020.00.0 Update-End
            if (response.data.responseModel) {
              this.setCurrentConfigurations(response.data.responseModel)
              // KSD V001.000 AS
              result = true
              // KSD V001.000 AE
            } else {
              this.setting = null
              this.sourceStoreCodes = []
              this.searchErrorMapping(response.data.result)
            }
          })
          .catch(error => {
            // G013.00.0 Add-Start
            this.setting = null
            // G013.00.0 Add-End
            this.sourceStoreCodes = []
            this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
            console.log(error)
            this.isProcessing = false
          })
      // KSD V001.000 AS
      } catch (error) {
        this.setting = null
        // G013.00.0 Add-End
        this.sourceStoreCodes = []
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
        this.isProcessing = false
      }
      return result
      // KSD V001.000 AE
    },
    // KSD V001.000 AS
    async getTaxRates (nodeId) {
      axios.post(this.$i18n.t('prop.url') + taxRatesConfiguration, {
        // KSD V001.000 DS 不具合No.80：税率設定は企業コードのみを指定するよう対応
        // nodeId: nodeId
        // KSD V001.000 DE 不具合No.80：税率設定は企業コードのみを指定するよう対応
        // KSD V001.000 AS 不具合No.80：税率設定は企業コードのみを指定するよう対応
        nodeId: nodeId.slice(0,15)
        // KSD V001.000 AE 不具合No.80：税率設定は企業コードのみを指定するよう対応
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          if (response.data.result.code === 0) {
            this.taxRates = response.data.responseModel
          } else if (response.data.result.code === 2) {
            this.taxRates = []
          } else {
            this.taxRates = []
            this.setting = null
            this.sourceStoreCodes = []
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.setting = null
          this.sourceStoreCodes = []
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.error(error)
          this.isProcessing = false
        })
    },
    async fetchRestaurantsTicket (nodeId) {
      const params = {
        nodeId: nodeId,
        Code: 0,
        orderBy: 'Code',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      let result = false
      try {
        var response = await axios.post(`${this.$i18n.t('prop.url')}${getRestaurantsTicket}`, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          this.resTickets = response.data.responseModel
          this.resTickets = this.resTickets.map((rowData, rowIndex) => {
            return {
              ...rowData,
              Code: Number(rowData.Code)
            }
          })
          result = true
        } else if (response.data.result.code === 2) {
          this.resTickets = []
          result = true
        } else {
          this.resTickets = []
          this.setting = null
          this.sourceStoreCodes = []
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.setting = null
        this.sourceStoreCodes = []
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    async getSysteminffixSys (nodeId) {
      try {
        const params = { nodeId: nodeId }
        const response = await axios.post(
          `${this.$i18n.t('prop.url')}${systeminffixSysConfiguration}`,
          params,
          commonUtils.methods.addApiHeader({
            params: {
              orderBy: 'nodeId',
              ascending: true,
              startIndex: 0,
              batchSize: 0
            }
          })
        )
        if (response.data.result.code === 0) {
          if (response.data.responseModel[0].Oes_Flag === 1) {
            this.oesFlag1 = true
          } else {
            this.oesFlag1 = false
          }
        } else if (response.data.result.code === 2) {
          this.oesFlag1 = false
          this.sysinfixxResCode = 2
        } else {
          this.setting = null
          this.sourceStoreCodes = []
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.setting = null
        this.sourceStoreCodes = []
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
    },
    // KSD V001.000 AE
    setCurrentConfigurations (setting) {
      this.setting = setting
      // G014.00.0 Add-Start
      this.originSetting = JSON.parse(JSON.stringify(this.setting))
      // G014.00.0 Add-End
      // KSD V001.000 DS
      // this.drawerMenu = Object.entries(this.setting.configurations.DRAWER_MENU_SETTINGS.value).sort((a, b) => a[1].sort - b[1].sort)
      // KSD V001.000 DE
      // KSD V001.000 AS
      const drawerMenuList = Object.entries(this.setting.configurations.DRAWER_MENU_SETTINGS.value).sort((a, b) => a[1].sort - b[1].sort)
      this.drawerMenu = drawerMenuList
      this.drawerMenuFetchCopy = drawerMenuList
      // KSD V001.000 AE

      this.initItemDetails()
      for (var i = 0; i < this.setting.configurations.ITEM_DETAILS_SETTINGS.value.length; i++) {
        const itemDetail = this.setting.configurations.ITEM_DETAILS_SETTINGS.value[i]

        let index = (itemDetail.y - 1) * 4 + (itemDetail.x - 1)
        this.itemDetails[index] = {
          active: true,
          order: itemDetail.order,
          displayName: { ...itemDetail.displayName },
          kind: itemDetail.kind,
          preset: itemDetail.preset,
          transactionNo: itemDetail.transactionNo,
          x: itemDetail.x,
          y: itemDetail.y
          // KSD V001.000 AS
          , taxCode: itemDetail.taxCode
          // KSD V001.000 AE
        }
      }

      // KSD V001.000 AS
      this.initCouponUse()
      for (var j = 0; j < this.setting.configurations.COUPON_USAGE_SETTINGS.value.length; j++) {
        const couponUse = this.setting.configurations.COUPON_USAGE_SETTINGS.value[j]
        const index = (couponUse.y - 1) * 6 + (couponUse.x - 1)
        this.couponUse[index] = {
          active: true,
          order: couponUse.order,
          code: couponUse.code,
          flag: couponUse.flag,
          displayName: couponUse.displayName,
          x: couponUse.x,
          y: couponUse.y
        }
      }
      // KSD V001.000 AE

      this.accountingSettings = this.setting.configurations.ACCOUNTING_SETTINGS.value.sort((a, b) => (a.sort - b.sort))
      // G002.00.0 Add-Start
      this.accountingSettings.forEach((item, index) => {
        // G019.00.0 Add-Start
        if (item.paymentType !== undefined && this.setting.configurations[item.paymentType] === undefined) {
          this.accountingSettings.splice(index, 1)
        }
        // G019.00.0 Add-End
        if (item.kind === 1 && item.subList) {
          item.subList.forEach(v => {
            if (this.setting.configurations[item.paymentType] && this.setting.configurations[item.paymentType].value.submediaList) {
              v.displayName = this.setting.configurations[item.paymentType].value.submediaList.find(item => item.name === v.subType).displayName
            }
          })
          // G010.00.0 Add-Start
          item.originPaymentType = item.paymentType
          item.originSubList = JSON.parse(JSON.stringify(item.subList))
          // G010.00.0 Add-End
        }
      })
      // G002.00.0 Add-End
      console.log(this.accountingSettings)

      this.mediaList = []
      for (let i = 1; i < 100; i++) {
        const key = i < 10 ? '0' + i : i

        if (this.setting.configurations['PAYMENT_' + key]) {
          this.mediaList.push({
            key: 'PAYMENT_' + key,
            displayName: this.setting.configurations['PAYMENT_' + key].value.displayName,
            subMediaManagement: this.setting.configurations['PAYMENT_' + key].value.subMediaManagement
          })
        }
      }
    },
    loadChangedCurrentSetting () {
      var drawerMenuObject = {}
      for (var i = 0; i < this.drawerMenu.length; i++) {
        drawerMenuObject[this.drawerMenu[i][0]] = this.drawerMenu[i][1]
      }

      this.setting.configurations.DRAWER_MENU_SETTINGS.value = drawerMenuObject

      var itemDetailsObject = []
      // G007.00.0 Update-Start
      // var order = 1
      var order = 0
      // G007.00.0 Update-Start
      for (let i = 0; i < this.itemDetails.length; i++) {
        if (this.itemDetails[i].active) {
          var temp = JSON.parse(JSON.stringify(this.itemDetails[i]))
          delete temp['active']
          temp['order'] = order
          temp['x'] = i % 4 + 1
          temp['y'] = Math.floor(i / 4) + 1
          // KSD V001.000 DS
          // temp['preset'] = Number(temp['preset'])
          // KSD V001.000 DE
          itemDetailsObject.push(temp)

          order++
        }
      }
      this.setting.configurations.ITEM_DETAILS_SETTINGS.value = itemDetailsObject

      // G001.00.0 Update-Start
      // this.setting.configurations.ACCOUNTING_SETTINGS.value = this.accountingSettings
      let accountSettingsArr = []
      // let sort = 1
      this.accountingSettings.forEach(item => {
        let jsonObj = JSON.parse(JSON.stringify(item))
        jsonObj.subList && jsonObj.subList.forEach(v => {
          // G007.00.0 Update-Start
          // v.order = sort++
          delete v['order']
          // G007.00.0 Update-End
          if (v.subType) {
            delete v['displayName']
          }
          delete v['active']
          // G011.00.0 Add-Start
          if (jsonObj.kind === 0) {
            v.preset = Number(v['preset'])
          }
          // G011.00.0 Add-End
        })
        // G010.00.0 Add-Start
        delete jsonObj['originPaymentType']
        delete jsonObj['originSubList']
        // G010.00.0 Add-End
        accountSettingsArr.push(jsonObj)
      })
      this.setting.configurations.ACCOUNTING_SETTINGS.value = accountSettingsArr
      // G001.00.0 Update -End
      // KSD V001.000 AS
      let couponUseObject = []
      let orderCoupon = 0
      for (let j = 0; j < this.couponUse.length; j++) {
        if (this.couponUse[j].active) {
          let temp2 = JSON.parse(JSON.stringify(this.couponUse[j]))
          delete temp2['active']
          delete temp2['selectedCouponIndex']
          temp2['order'] = orderCoupon
          temp2['x'] = j % 6 + 1
          temp2['y'] = Math.floor(j / 6) + 1
          temp2['code'] = this.codeToString(this.couponUse[j].code)
          couponUseObject.push(temp2)

          orderCoupon++
        }
      }
      this.setting.configurations.COUPON_USAGE_SETTINGS.value = couponUseObject
      // KSD V001.000 AE
    },
    async saveCurrentSetting (nodeId) {
      // G020.00.0 Update-Start
      // this.isProcessing = true
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // G020.00.0 Update-End
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putCurrentConfiguration, {
          nodeId: nodeId,
          configuration: this.setting,
          mode: 0
        }, commonUtils.methods.getApiHeader())

        if (response.data.result.code === 0) {
          // G005.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322b1.W001'), '', false, null, false, null)
          // G006.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, null, false, null)
          // KSD V001.000 DS
          // if (this.showWarrningFlag) {
          //  this.$refs.pop.open(3, '', this.$i18n.t('F322b2.W006'), '', false, () => {
          //  this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, null, false, null)
          // }, false, null)
          // } else {
          // KSD V001.000 DE
             this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, null, false, null)
          // KSD V001.000 DS
          // }
          // KSD V001.000 DE
          // G006.00.0 Update-End
          // G005.00.0 Update-End
          // G010.00.0 Add-Start
          this.accountingSettings.forEach(item => {
            if (item.kind === 1 && item.subList) {
              item.originPaymentType = item.paymentType
              item.originSubList = JSON.parse(JSON.stringify(item.subList))
            }
          })
          // G010.00.0 Add-End
          // G014.00.0 Add-Start
          this.originSetting = JSON.parse(JSON.stringify(this.setting))
          // G014.00.0 Add-End
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        //        this.$refs.pop.open(3, '', this.$i18n.t('F322b1.E001'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      // G020.00.0 Delete-Start
      // this.isProcessing = false
      // G020.00.0 Delete-End
    },

    openDrawerMenuSettingDialog () {
      // KSD V001.000 DS
      // const temp = JSON.parse(JSON.stringify(this.drawerMenu))
      // KSD V001.000 DE
      // KSD V001.000 AS
      const temp = [...JSON.parse(JSON.stringify(this.drawerMenu))]
      // KSD V001.000 AE
      // G016.00.0 Update-Start
      // this.$refs.drawerMenuSettingDialog.open(temp)
      // KSD V001.000 DS
      // this.$refs.drawerMenuSettingDialog.open(this.permissions, temp)
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$refs.drawerMenuSettingDialog.open(this.permissions, temp, 0, this.oesFlag1, this.hiddenUnpaidList)
      // KSD V001.000 AE
      // G016.00.0 Update-End
    },
    drawerMenuSettingSaveCallback (drawerMenu) {
      this.drawerMenu = drawerMenu
    },
    deleteDrawerMenu (key) {
      const index = this.drawerMenu.findIndex((item) => item[0] == key)
      this.drawerMenu[index][1].active = false
    },
    openItemDetailSettingDialog (index) {
      var temp = JSON.parse(JSON.stringify(this.itemDetails[index]))
      if (!temp.active) {
        temp = {
          ...temp,
          order: null,
          displayName: {
            default: null
          },
          kind: 0,
          transactionNo: null,
          // G002.00.0 Update-Start
          // preset: 0
          preset: null
          // active: true
          // G002.00.0 Update -End
          // KSD V001.000 AS
          , taxCode: ''
          // KSD V001.000 AE
        }
      }

      let listTrNo = this.itemDetails.filter(function (e) {
        if (typeof e.transactionNo !== 'undefined' && e.transactionNo !== null && e.transactionNo !== '') {
          return e.transactionNo
        }
      }).map(elm => elm.transactionNo)

      // G001.00.0 Update-Start
      // this.$refs.itemDetailSettingDialog.open(temp, index)
      // G016.00.0 Update-Start
      // this.$refs.itemDetailSettingDialog.open(temp, index, '商品明細ポップアップ表示', listTrNo, 'itemDetailSettingDialog')
      // KSD V001.000 DS
      // this.$refs.itemDetailSettingDialog.open(this.permissions, temp, index, '商品明細ポップアップ表示', listTrNo, 'itemDetailSettingDialog')
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$refs.itemDetailSettingDialog.open(this.permissions, temp, index, '商品明細ポップアップ表示', listTrNo, 'itemDetailSettingDialog', this.taxRates)
      // KSD V001.000 AE
      // G016.00.0 Update-End
      // this.$refs.itemDetailSettingDialog.open(temp, index, '商品明細ポップアップ表示')
      // G001.00.0 Update -End
    },
    itemDetailSettingSaveCallback (itemDetail, index) {
      // KSD V001.000 AS
      var temp = JSON.parse(JSON.stringify(itemDetail))
      if (temp['kind'] === 3 || temp['kind'] === 4) {
        delete temp['preset']
        delete temp['transactionNo']
      } else {
        temp['preset'] = Number(temp['preset'])
        delete temp['taxCode']
      }
      // KSD V001.000 AE
      // KSD V001.000 DS
      // this.itemDetails[index] = JSON.parse(JSON.stringify(itemDetail))
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.itemDetails[index] = temp
      // KSD V001.000 AE
      this.$forceUpdate()
    },
    deleteItemDetail (index) {
      // G006.00.0 Add-Start
      // NAME_TRANSACTION_SETTINGS.value[]削除
      this.delItemsFromNameTransSettings(this.itemDetails[index], '0')
      // G006.00.0 Add-End
      var newData = JSON.parse(JSON.stringify(this.itemDetails))
      newData[index].active = false
      this.itemDetails = newData
    },
    // G006.00.0 Add-Start
    delItemsFromNameTransSettings (detail, operationFlag) {
      // const transactionNo = '2' + this.getKindValue()[detail.kind] + (operationFlag === '0' || (operationFlag === '1' && detail.kind === 0) ? detail.transactionNo.substr(3, 2) : detail.subType.substr(4, 2)) + operationFlag
      if (detail.kind && detail.transactionNo) {
        const transactionNo = '2' + this.getKindValue()[detail.kind] + detail.transactionNo.substr(3, 2) + operationFlag
        this.setting.configurations.NAME_TRANSACTION_SETTINGS.value.splice(
          this.setting.configurations.NAME_TRANSACTION_SETTINGS.value.findIndex(item => item.transactionNo === transactionNo), 1)
      }
    },
    // G006.00.0 Add-End

    openAccountingSettingDialog (index) {
      var temp
      if (typeof index === 'undefined') {
        temp = {
          order: null,
          displayName: {
            default: null
          },
          kind: null,
          sort: 1
        }
      } else {
        temp = JSON.parse(JSON.stringify(this.accountingSettings[index]))
      }
      // G016.00.0 Update-Start
      // this.$refs.accountingSettingDialog.open(temp, index)
      this.$refs.accountingSettingDialog.open(this.permissions, temp, index)
      // G016.00.0 Update-End
    },
    accountingSettingSaveCallback (setting, index) {
      console.log(index)
      // G001.00.0 Update-Start
      // setting.order = (this.accountingSettings[this.accountingSettings.length - 1].order + 1) || 0
      // setting.sort = (this.accountingSettings[this.accountingSettings.length - 1].sort + 1) || 1
      // G010.00.2 Add-Start
      if (index === undefined && setting.order === null) {
        // G010.00.2 Add-End
        setting.order = this.accountingSettings[this.accountingSettings.length - 1] ? ((this.accountingSettings[this.accountingSettings.length - 1].order + 1) || 0) : 0
        setting.sort = this.accountingSettings[this.accountingSettings.length - 1] ? ((this.accountingSettings[this.accountingSettings.length - 1].sort + 1) || 1) : 1
      // G010.00.2 Add-Start
      }
      // G010.00.2 Add-End
      // G001.00.0 Update -End
      // G004.00.0 Delete-Start
      // if (setting.kind == 1) {
      //   console.log(this.mediaList)
      //   const media = this.mediaList.find(item => item.key == setting.paymentType)
      //   if (media) {
      //     setting.displayName.default = media.displayName.default
      //   }
      // }
      // G004.00.0 Delete-End
      if (typeof index === 'undefined') {
        this.accountingSettings.push(setting)
      } else {
        // G010.00.0 Add-Start
        if (setting.kind === 1) {
          const originPaymentType = this.accountingSettings[index].originPaymentType
          const oldPaymentType = this.accountingSettings[index].paymentType
          const newPaymentType = setting.paymentType
          if (oldPaymentType !== newPaymentType) {
            setting.subList = newPaymentType === originPaymentType ? JSON.parse(JSON.stringify(this.accountingSettings[index].originSubList)) : []
          }
        // G010.00.1 Add-Start
        } else if (setting.kind === 0) {
          delete setting['subList']
          // G010.00.1 Add-End
        }
        // G010.00.0 Add-End
        this.accountingSettings[index] = setting
      }
      this.$forceUpdate()
    },
    deleteAccountingSetting (index) {
      // G006.00.0 Add-Start
      // NAME_TRANSACTION_SETTINGS.value[]削除
      this.accountingSettings[index].subList && this.accountingSettings[index].subList.forEach(subItem => {
        if (subItem) {
          this.delItemsFromNameTransSettings(subItem, '1')
        }
      })
      // G006.00.0 Add-End
      this.accountingSettings.splice(index, 1)
    },
    showSubListItems (index) {
      const setting = this.accountingSettings[index]

      if (setting.kind == 1) {
        const media = this.mediaList.find(item => item.key == setting.paymentType)
        if (media && !media.subMediaManagement) {
          return
        }
      }

      this.initSubListItems()
      // G003.00.0 Add-Start
      let num = this.calcNum()
      // G003.00.0 Add-End
      if (Array.isArray(setting.subList)) {
        for (var i = 0; i < setting.subList.length; i++) {
          const itemDetail = setting.subList[i]

          let index = (itemDetail.y - 1) * num + (itemDetail.x - 1)
          this.subListItems[index] = {
            active: true,
            order: itemDetail.order,
            displayName: { ...itemDetail.displayName },
            kind: itemDetail.kind,
            preset: itemDetail.preset,
            // G001.00.0 Add-Start
            subType: itemDetail.subType,
            // G001.00.0 Add-End
            transactionNo: itemDetail.transactionNo,
            x: itemDetail.x,
            y: itemDetail.y
          }
        }
      }

      this.isSubListScreen = index
    },
    closeSubListScreen () {
      // G008.00.0 Add-Start
      let num = this.calcNum()
      for (var i = 0; i < this.subListItems.length; i++) {
        if (this.subListItems[i].active) {
          this.subListItems[i].order = i
          this.subListItems[i].x = i % num + 1
          this.subListItems[i].y = Math.floor(i / num) + 1
        }
      }
      // G008.00.0 Add-end
      let newSubList = this.subListItems.filter(item => item.active)
      this.accountingSettings[this.isSubListScreen].subList = JSON.parse(JSON.stringify(newSubList))

      this.isSubListScreen = null
    },
    // G017.00.0 Add-Start
    closeSubListScreen1 () {
      // G008.00.0 Add-Start
      let num = this.calcNum()
      for (var i = 0; i < this.subListItems.length; i++) {
        if (this.subListItems[i].active) {
          this.subListItems[i].order = i
          this.subListItems[i].x = i % num + 1
          this.subListItems[i].y = Math.floor(i / num) + 1
        }
      }
      // G008.00.0 Add-end
      let newSubList = this.subListItems.filter(item => item.active)
      this.accountingSettings[this.isSubListScreen].subList = JSON.parse(JSON.stringify(newSubList))
    },
    // G017.00.0 Add-End
    openSubListSettingDialog (index) {
      const setting = this.accountingSettings[this.isSubListScreen]

      if (setting.kind == 0) {
        let temp = JSON.parse(JSON.stringify(this.subListItems[index]))
        if (!temp.active) {
          temp = {
            ...temp,
            order: null,
            displayName: {
              default: null
            },
            kind: 0,
            transactionNo: null,
            // G002.00.0 Update-Start
            // preset: 0
            preset: null
            // G002.00.0 Update -End
          }
        }

        let listTrNo = this.subListItems.filter(function (e) {
          if (typeof e.transactionNo !== 'undefined' && e.transactionNo !== null && e.transactionNo !== '') {
            return e.transactionNo
          }
        }).map(elm => elm.transactionNo)

        // G001.00.0 Update-Start
        // this.$refs.subListSettingDialog.open(temp, index)
        // G016.00.0 Update-Start
        // this.$refs.subListSettingDialog.open(temp, index, '会計画面表示', listTrNo, 'subListSettingDialog')
        this.$refs.subListSettingDialog.open(this.permissions, temp, index, '会計画面表示', listTrNo, 'subListSettingDialog')
        // G016.00.0 Update-End
        // this.$refs.subListSettingDialog.open(temp, index, '会計画面表示')
        // G001.00.0 Update -End
      } else {
        let temp = JSON.parse(JSON.stringify(this.subListItems[index]))
        if (!temp.active) {
          // G001.00.0 Update-Start
          // temp = {
          //   ...temp,
          //   order: null,
          //   displayName: {
          //     default: null
          //   },
          //   kind: 0,
          //   transactionNo: null,
          //   preset: 0
          // }
          temp = {
            ...temp,
            displayName: {
              default: null
            },
            subType: ''
          }
          // G001.00.0 Update -End
        }
        // G001.00.0 Update-Start
        // this.$refs.subMediaSettingDialog.open(temp, index)
        // G016.00.0 Update-Start
        // this.$refs.subMediaBtnSettingDialog.open(temp, index, this.setting.configurations[setting.paymentType].value.submediaList)
        this.$refs.subMediaBtnSettingDialog.open(this.permissions, temp, index, this.setting.configurations[setting.paymentType].value.submediaList)
        // G016.00.0 Update-End
        // G001.00.0 Update -End
      }
    },
    subListSettingSaveCallback (setting, index) {
      this.subListItems[index] = setting
      this.$forceUpdate()
    },
    deleteSubListItem (index) {
      // G006.00.0 Add-Start
      // NAME_TRANSACTION_SETTINGS.value[]削除
      this.delItemsFromNameTransSettings(this.subListItems[index], '1')
      // G006.00.0 Add-End
      var newSubList = JSON.parse(JSON.stringify(this.subListItems))
      newSubList[index].active = false
      this.subListItems = newSubList
    },
    subMediaSettingSaveCallback (media, index) {
      this.subListItems[index] = media
    },
    // G001.00.0 Add-Start
    subMediaBtnSettingSaveCallback (media, index) {
      this.subListItems[index] = media
      this.$forceUpdate()
    },
    // KSD V001.000 AS
    openCouponUseSettingDialog (index) {
      var temp = JSON.parse(JSON.stringify(this.couponUse[index]))
      if (!temp.active) {
        temp = {
          ...temp,
          order: null,
          code: '',
          flag: 0,
          displayName: null
        }
      }

      const couponUseCode = this.couponUse.filter(function (e) {
        if (typeof e.code !== 'undefined' && e.code !== null && e.code !== '' && e.active !== false) {
          return e.code
        }
      }).map(elm => Number(elm.code))
      if (this.resTickets.length === 0) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b1.W005'), '', false, null, false, null)
      } else {
        this.$refs.couponUseSettingDialog.open(this.permissions, temp, index, this.$i18n.t('F322b1.S054'), couponUseCode, this.nodeId, this.resTickets)
      }
    },
    codeToString (Code) {
      const c = Number(Code)
      if (c < 10) {
        return '00' + c
      } else if (c > 9 && c < 100) {
        return '0' + c
      } else {
        return '' + c
      }
    },
    couponUseSettingSaveCallback (selectedData) {
      const { rowData, cardIndex, selectedIndex } = selectedData
      const { Code, Disc_Type2, Name } = rowData
      this.couponUse = this.couponUse.map((rowData, rowIndex) => {
        if (rowIndex === cardIndex) {
          return {
            active: true,
            code: Code,
            flag: Disc_Type2,
            displayName: Name,
            order: cardIndex,
            selectedCouponIndex: selectedIndex
          }
        }
        return { ...rowData }
      })
    },
    deleteCouponUse (index) {
      this.delItemsFromNameTransSettings(this.couponUse[index], '0')
      var newData = JSON.parse(JSON.stringify(this.couponUse))
      newData[index].active = false
      this.couponUse = newData
    },
    // KSD V001.000 AE
    // G001.00.0 Add-End
    /* ----- サイドバー ----- */
    // async backToTop () {
    backToTop () {
      // G014.00.0 Add-Start
      if (this.setting) {
        // G017.00.1 Update-Start
        // G017.00.0 Add-Start
        // this.closeSubListScreen1()
        if (this.isSubListScreen !== null) {
          this.closeSubListScreen1()
        }
        // G017.00.0 Add-End
        // G017.00.1 Update-End
        this.loadChangedCurrentSetting()
      }
      const compareResult = compareUtil.compare(this.setting, this.originSetting)
      if (!compareResult) {
      // G014.00.0 Add-End
      // if (this.setting !== null && Object.keys(this.setting).length) {
        this.$refs.pop.open(1, '終了', '編集中のデータは破棄されます。よろしいですか？', '', true, function () {
          this.$router.push('/TopPage')
        }, false, () => {})
      } else {
        this.$router.push('/TopPage')
      }
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['clientId'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
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
    // G021.00.0 Add-Start
    formatDisplayName (displayName) {
      const str = displayName
      if (str == null) { return str }
      var strLen = str.toString().length
      // byte数の取得
      var byteLen = 0
      for (var i = 0; i < strLen; i++) {
        var codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
            (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4) || (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0)) {
          byteLen += 1
          if (byteLen === 12) {
            var index = i + 1
            return str.substr(0, index) + '\r\n' + str.substr(index)
          }
        } else {
          byteLen += 2
        }
      }
      return str
    }
    // G021.00.0 Add-End
  },
  // AS #1489
  watch: {
    // KSD V001.000 AS
    currentScreen: function (val) {
      if (val === 'couponUse') {
        for (let j = 0; j < this.couponUse.length; j++) {
          if (this.couponUse[j].active) {
            this.couponUse[j].flag = this.resTickets[Number(this.couponUse[j].code)].Disc_Type2
          }
        }
      }
    },
    // KSD V001.000 AE
    accountingSettings: function (val, old) {
      if (old.length) {
        let order = 0
        for (let i = 0; i < val.length; i++) {
          val[i].order = order++
          val[i].sort = val[i].order + 1
        }
      }
    // DS #1589
    /*
    },
    setting: function (val) {
      this.disabledFixedBtn = !!val.length
    }
    */
    // DE #1589
    }
  },
  // AE #1489
  filters: {
    drawer_menu: function (value) {
      const config = require('./_config.json')
      return config.drawerMenuName[value] || null
    }
  },

  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322b1'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.initialize()
  },
  // G015.00.0 Add-Start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  },
  // G015.00.0 Add-End
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
