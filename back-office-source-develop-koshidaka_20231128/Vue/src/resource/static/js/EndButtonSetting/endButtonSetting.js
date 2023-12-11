import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import compareUtil from '../OperationBtnSetting/compare'
import {ApiPath} from '@/resource/static/properties/api_path'
// G002.00.0 Update-Start
// import radioButton from '@/resource/templates/CommonInput/RadioButton'
import radioButton from '@/resource/templates/EndButtonSetting/RadioButton'
// G002.00.0 Update -End

/*
 * ---------+-----------------+----------+---------------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+---------------------------------------
 *  20221209  duyouwei(Neusoft) G001.00.0  issue課題#1153,#1155,#1150,#1399を対応します.
 *  20221213  zhaomingyue(Neusoft) G002.00.0  issue課題#1198,#1199を対応します.
 *  20230106  bai.ry(Neusoft) G003.00.0  issue課題#1395を対応します.
 *  20230113  bai.ry(Neusoft) G004.00.0  issue課題#1150を対応します.
 *  20230117  bai.ry(Neusoft) G005.00.0  issue課題#1423を対応します.
 *  20230117  bai.ry(Neusoft) G006.00.0  issue課題#1395を対応します.
 *  20230129  duyouwei(Neusoft) G007.00.0  issue課題#1032を対応します.
 *  20230130  duyouwei(Neusoft) G008.00.0  issue課題#1369を対応します.
 *  20230202  duyouwei(Neusoft) G009.00.0  issue課題#1336を対応します.
 *  20230217  dingxin(Neusoft)  G010.00.0  issue課題#1054を対応します.
 *  20230217  duyouwei(Neusoft)  G011.00.0  issue課題#1581を対応します.
 *  20230320  qinshh(Neusoft)  G012.00.0  issue課題#1392を対応します.
 *  20230411  bai.ry(Neusoft)  G013.00.0  issue課題#1166を対応します.
 *  20230413  wangchunmei(Neusoft)  G014.00.0  issue課題#908を対応します.
 *  20230421  bai.ry(Neusoft)  G015.00.0  issue課題#1461を対応します.
 *  20230421  dingxin(Neusoft)      G016.00.0  issue課題#1662を対応します.
 *  20230508  dingxin(Neusoft)      G017.00.0  issue課題#1461を対応します.
 *  20230522  qinshh(Neusoft)  G012.00.1  issue課題#1392を対応します.
 *  20230605  duyouwei(Neusoft)  G013.00.1  issue課題#1776を対応します.
 *  20230629  wangchunmei(Neusoft)  G018.00.0  issue課題#1451を対応します.
 *  20230630  wangchunmei(Neusoft)  G019.00.0  issue課題#1424を対応します.
 *  20230724  qurn(Neusoft)    G020.00.0  issue課題#1885を対応します.
 *  20230815  qinshh(Neusoft)  G021.00.0  issue課題#1195を対応します.
 *  20230828  heqianlong(Neusoft)  G022.00.0  issue課題#1524を対応します.
 */
// G019.00.0 Add-Start
const subSeqNoData = {
  description: {
    default: 'Record the maximum payment serial number'
  },
  group: 'PAYMENT',
  subGroup: 'PAYMENT',
  inherited: true,
  name: 'PAYMENT_XX_SUB_SEQUENCE_NO',
  type: 'Integer',
  value: 1,
  version: 1
}
// G019.00.0 Add-End
export default {
  name: 'EndButtonEditing',
  data () {
    return {
      // G010.00.0 Add start
      permissions: [],
      // G010.00.0 Add end
      targetStoreCodes: [],
      sourceStoreCodes: [],
      configuration: null,
      originConfiguration: null,
      data: [],
      // G019.00.0 Add-Start
      subMediaSeqNoList: [],
      // G019.00.0 Add-End
      editDialog: false,
      // G001.00.0 Add-Start
      isPay01Disabled: false,
      // G001.00.0 Add-End
      editedIndex: -1,
      editingItem: null,
      submediaList: [],
      loading: false,
      updating: false,
      cntApiCallback: 0,
      labelsCash: [
        // G001.00.0 Update-Start
        // { name: 'CASH', value: 'CASH' },
        // { name: 'OTHER', value: 'OTHER' }
        { name: '対象', value: 'CASH' },
        { name: '非対象', value: 'OTHER' }
        // G001.00.0 Update -End
      ],
      labelsDeposit: [
        { name: '任意', value: false },
        { name: '強制', value: true }
      ],
      labelsPermit: [
        { name: '許可', value: true },
        { name: '禁止', value: false }
      ],
      labelsDo: [
        { name: 'する', value: true },
        { name: 'しない', value: false }
      ],
      labelsOperate: [
        { name: '対象', value: true },
        // G001.00.0 Update-Start
        // { name: '非対称', value: false }
        { name: '非対象', value: false }
        // G001.00.0 Update -End
      ],
      // KSD V001.000 DS
      // errorMsgList: [],
      // KSD V001.000 DE
      // KSD V001.000 AS
      errorMsgList: {
        name: [],
        type: []
      },
      // KSD V001.000 AE
      // CS #1589
      // disabledFixedBtn: true,
      // CE #1589
      currentStoreSelected: '',
      // G009.00.0 Add-Start
      showWarrningFlag: false,
      // G009.00.0 Add-End
      // G021.00.0 Add-Start
      nameErrorMsg: ''
      // G021.00.0 Add-End
      // KSD V001.000 AS
      , paymentTypeList: [],
      cashTransferStatusList: [],
      eMoneyTypeList: [],
      paymentChanelPH: this.$i18n.t('F322b2.S063'),
      copyreceiptNumPH: this.$i18n.t('F322b2.S061'),
      copyreceiptNumError: null,
      displayNameError: null,
      storeOperationsDefault: '',
      ishandlingCashDefault: true
      // KSD V001.000 AE
    }
  },
  computed: {
    // KSD V001.000 AS
    disableToggleForPayment01 () {
      return this.editingItem.value.name === 'PAYMENT_01'
    },
    disableHandlingCashToggle () {
      return this.editingItem.value.settlementType === 'CASH' ||
      (this.editingItem.value.settlementType === 'CCT' ||
      this.editingItem.value.settlementType === 'VegaCre' ||
      this.editingItem.value.settlementType === 'VegaEM' ||
      this.editingItem.value.settlementType === 'CODEPAY' ||
      this.editingItem.value.settlementType === 'OFFLINE')
    },
    settlementTypeCurrVal () {
      return this.editingItem.value.settlementType
    },
    // KSD V001.000 AE
    checkStoresSelected () {
      // return true
      // G012.00.0 Add start
      // return this.targetStoreCodes.length > 0 && this.sourceStoreCodes.length > 0
      return this.sourceStoreCodes.length > 0
      // G012.00.0 Add End
    },
    storesLength () {
      // return this.targetStoreCodes.length + this.sourceStoreCodes.length
      return this.targetStoreCodes.length
    },
    updatePercent () {
      // const storesLength = this.targetStoreCodes.length + this.sourceStoreCodes.length
      return (this.cntApiCallback / this.storesLength) * 100
    },
    isAddStatus () {
      return this.editedIndex === this.data.length
    },
    subMediaManagement () {
      if (this.editingItem) {
        return this.editingItem.value.subMediaManagement
      }
      return false
    },
    sourceStoreCanseled () {
      return this.currentStoreSelected === ((typeof this.sourceStoreCodes[0] === 'undefined') ? '' : this.sourceStoreCodes[0])
    // AS #1569
    },
    disabledFixedBtn () {
      // G016.00.0 Update-Start
      // return !this.targetStoreCodes.length || !this.data.length
      return (!this.targetStoreCodes.length || !this.data.length) || !this.permissions.includes('CLOUDPOS_TIGHTENING_BTN_UPDATE')
      // G016.00.0 Update-End
    // AE #1569
    }
  },
  watch: {
    // KSD V001.000 AS
    'editingItem.value.subMediaManagement' (val) {
      if (!val) {
        if (!this.editingItem) return
        if (this.editingItem.value.submediaList) {
          const matchString = this.editingItem.value.name.split('_')[1]
          const objIndex = this.subMediaSeqNoList.findIndex(obj => obj.name.split('_')[1] === matchString)
          if (this.subMediaSeqNoList[objIndex] === undefined) return
          this.subMediaSeqNoList[objIndex].value = Number(this.editingItem.value.submediaList[this.editingItem.value.submediaList.length - 1].name.split('_')[1])
        }
      }
    },
    'submediaList' (val) {
      for (let i = 0; i < this.submediaList.length; i++) {
        const value = this.submediaList[i].settlementType
        if (value === undefined || value === null || value.trim() === '') {
          this.submediaList[i].settlementType = this.storeOperationsDefault
        }
        if (this.editingItem.value.subMediaManagement) {
          if (this.submediaList[i].revenueStamp === undefined || this.submediaList[i].revenueStamp === null) {
            this.submediaList[i].revenueStamp = true
          }
        }
      }
    },
    'editingItem.value.copyreceiptNum' (val) {
      if (val) {
        this.editingItem.value.copyreceiptNum = Number(this.editingItem.value.copyreceiptNum)
      }
    },
    'editingItem.name' (val) {
      if (!val) return
      this.paymentNameOnChange(val)
    },
    'editingItem.value.settlementType' (val) {
      if (val === undefined) return
      if (val === 'VegaEM') {
        this.editingItem.value.subMediaManagement = true
      }
      if (val !== 'OTHERS') {
        this.editingItem.value.giftCertificates = false
        this.editingItem.value.cashTransferStatus = 'TRANSFER_NULL'
      }
      if (val === 'CASH') {
        this.editingItem.value.handlingCash = true
      }
      if (val === 'CCT' || val === 'VegaCre' || val === 'VegaEM' || val === 'CODEPAY' || val === 'OFFLINE') {
        this.editingItem.value.handlingCash = false
      }
    },
    // KSD V001.000 AE
    editDialog (val) {
      val || this.onCancel()
    },
    cntApiCallback (val) {
      if (this.updating && val === this.storesLength) {
        setTimeout(() => {
          this.updating = false
        }, 300)
      }
    },
    // DS #1589
    /*
    checkStoresSelected (oldVal, newVal) {
      if (!oldVal && newVal) {
        this.fetchStoresInfo()
      }
    },
    */
    // DE #1589
    subMediaManagement (val) {
      if (val) {
        if (!this.editingItem.value.submediaList) {
          this.submediaList = []
        } else {
          this.submediaList = [...this.editingItem.value.submediaList]
        }
        // G019.00.0 Add-Start
        const findData = this.subMediaSeqNoList.find(d => d.name === `PAYMENT_${this.editingItem.name.split('_')[1]}_SUB_SEQUENCE_NO`)
        // G019.00.0 Add-End
        // G005.00.0 Update-Start
        if (this.submediaList.length === 0) {
          // KSD V001.000 AS
          if (this.editingItem.value.settlementType === 'CODEPAY') {
            this.submediaList.push({
              paymentChanel: '0',
              name: 'SUB_' + (this.submediaList.length + 1).toString().padStart(2, '0'),
              displayName: {
                default: ''
              },
              name1: 'ｻﾌﾞﾒﾃﾞｨｱ' + (this.submediaList.length + 1).toString().padStart(2, '0') + '名称',
              name2: this.$i18n.t('F322b2.S030')
            })
          }
          if (this.editingItem.value.settlementType === 'VegaEM') {
            this.$nextTick(async () => {
              this.submediaList.push({
                settlementType: this.storeOperationsDefault,
                revenueStamp: true,
                name: 'SUB_' + (this.submediaList.length + 1).toString().padStart(2, '0'),
                displayName: {
                  default: ''
                },
                name1: 'ｻﾌﾞﾒﾃﾞｨｱ' + (this.submediaList.length + 1).toString().padStart(2, '0') + '名称',
                name2: this.$i18n.t('F322b2.S066')
              })
            })
          }
          if (this.editingItem.value.settlementType !== 'CODEPAY' && this.editingItem.value.settlementType !== 'VegaEM') {
            // KSD V001.000 AE
            this.submediaList.push({
              // G001.00.0 Update-Start
              // amount: 0,
              amount: '',
              // G001.00.0 Update-End
              // G001.00.0 Update-Start
              // name: 'SUB_' + (this.submediaList.length + 1),
              name1: 'ｻﾌﾞﾒﾃﾞｨｱ' + (this.submediaList.length + 1).toString().padStart(2, '0') + '名称',
              name2: 'ｻﾌﾞﾒﾃﾞｨｱ' + (this.submediaList.length + 1).toString().padStart(2, '0') + '金額',
              // G001.00.0 Update -End
              name: 'SUB_' + (this.submediaList.length + 1).toString().padStart(2, '0'),
              displayName: {
                default: ''
              }
            })
          // KSD V001.000 AS
          }
          // KSD V001.000 AE
          // G019.00.0 Add-Start
          // KSD V001.000 DS
          // if (!findData) {
          // KSD V001.000 DE
          // KSD V001.000 AS
          if (!findData || findData === undefined) {
          // KSD V001.000 AE
            let subSeqNoDataCopy = {}
            Object.assign(subSeqNoDataCopy, subSeqNoData)
            subSeqNoDataCopy.name = subSeqNoDataCopy.name.replace('XX', this.editingItem.name.split('_')[1])
            this.subMediaSeqNoList.push(subSeqNoDataCopy)
          } else {
            findData.value = 1
          }
          // G019.00.0 Add-End
        } else {
          this.submediaList.forEach(v => {
            // G019.00.0 Add-Start
            v.name1 = 'ｻﾌﾞﾒﾃﾞｨｱ' + v.name.split('_')[1] + '名称'
            v.name2 = 'ｻﾌﾞﾒﾃﾞｨｱ' + v.name.split('_')[1] + '金額'
            // G019.00.0 Add-End
            // G019.00.0 Delete-Start
            // v.name1 = 'ｻﾌﾞﾒﾃﾞｨｱ' + (i + 1).toString().padStart(2, '0') + '名称'
            // v.name2 = 'ｻﾌﾞﾒﾃﾞｨｱ' + (i + 1).toString().padStart(2, '0') + '金額'
            // v.name = 'SUB_' + (i + 1).toString().padStart(2, '0')
            // G019.00.0 Delete-End
          })
          if (!findData && !this.configuration[`PAYMENT_${this.editingItem.name.split('_')[1]}_SUB_SEQUENCE_NO`]) {
            // G019.00.0 Add-Start
            let subSeqNoDataCopy = {}
            Object.assign(subSeqNoDataCopy, subSeqNoData)
            subSeqNoDataCopy.name = subSeqNoDataCopy.name.replace('XX', this.editingItem.name.split('_')[1])
            subSeqNoDataCopy.value = parseInt(this.submediaList[this.submediaList.length - 1].name.split('_')[1])
            this.subMediaSeqNoList.push(subSeqNoDataCopy)
            // G019.00.0 Add-End
          }
        }
        // G005.00.0 Update-End
      } else {
        this.submediaList = []
        // Vue.delete(this.editingItem.value, 'submediaList')
      }
    }
    // DS #1589
    /*
    data: function (val) {
      this.disabledFixedBtn = !!val.length
    }
    */
    // DE #1589
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    radioButton
  },
  methods: {
    async initialize () {
      //
      // KSD V001.000 AS
      this.populateList()
      // KSD V001.000 AE
    },
    // KSD V001.000 AS
    populateList () {
      const codePT = [ 'CASH', 'OTHERS', 'CCT', 'VegaCre', 'VegaUnionPay', 'VegaEM', 'CODEPAY', 'OFFLINE' ]
      const codeCT = [ 'TRANSFER_RETURN', 'TRANSFER_NULL', 'TRANSFER_CORRECT', 'TRANSFER_ALL' ]
      const codeEMT = [ 'Transportation', 'Edy', 'QUICPay', 'iD', 'WAON', 'nanaco', 'PiTaPa' ]
      const namePT = [ this.$i18n.t('F322b2.S039'), this.$i18n.t('F322b2.S040'), this.$i18n.t('F322b2.S041'), this.$i18n.t('F322b2.S042'),
        this.$i18n.t('F322b2.S043'), this.$i18n.t('F322b2.S044'), this.$i18n.t('F322b2.S045'), this.$i18n.t('F322b2.S068') ]
      const nameCT = [ this.$i18n.t('F322b2.S046'), this.$i18n.t('F322b2.S047'), this.$i18n.t('F322b2.S048'), this.$i18n.t('F322b2.S049') ]
      const nameEMT = [ this.$i18n.t('F322b2.S050'), this.$i18n.t('F322b2.S051'), this.$i18n.t('F322b2.S052'), this.$i18n.t('F322b2.S053'),
        this.$i18n.t('F322b2.S054'), this.$i18n.t('F322b2.S055'), this.$i18n.t('F322b2.S056') ]
      this.paymentTypeList = this.initDropDownList(codePT, namePT, 8)
      this.eMoneyTypeList = this.initDropDownList(codeEMT, nameEMT, 7)
      this.cashTransferStatusList = this.initDropDownList(codeCT, nameCT, 4)
    },
    isDisplayType (type, list) {
      const result = list.filter(({ code }) => code === type)
      return result.length ? result[0].displayName : ''
    },
    initDropDownList (codes, displayNames, len) {
      let obj = []
      for (let i = 0; i < len; i++) {
        obj[i] = {
          code: codes[i],
          displayName: displayNames[i]
        }
      }
      return obj
    },
    paymentTypeOnChange () {
      this.editingItem.value.subMediaManagement = this.editingItem.value.settlementType === 'VegaEM'
      this.paymentNameOnChange(this.editingItem.name)
    },
    paymentNameOnChange (val) {
      if (val === 'PAYMENT_01') {
        this.editingItem.value.group = 'CASH'
        this.editingItem.value.settlementType = 'CASH'
        this.editingItem.value.handlingCash = true
      } else {
        if (this.editingItem.value.settlementType === 'CASH') {
          this.editingItem.value.handlingCash = true
          this.editingItem.value.group = 'OTHER'
        } else if (this.ishandlingCashDefault && (this.editingItem.value.settlementType === 'OTHERS' || this.editingItem.value.settlementType === 'VegaUnionPay')) {
          this.editingItem.value.group = 'OTHER'
          this.editingItem.value.handlingCash = false
        } else {
          this.editingItem.value.group = 'OTHER'
        }
      }
    },
    // KSD V001.000 AE
    // G021.00.0 Add-Start
    cancelErrorMsg () {
      this.nameErrorMsg = ''
    },
    // G021.00.0 Add-End
    onMenuClose () {
      // G017.00.0 Add-Start
      this.data.map(d => {
        this.configuration[d.name] = d
      })
      // G017.00.0 Add-End
      // G015.00.0 Add-Start
      const compareResult = compareUtil.compare(this.configuration, this.originConfiguration)
      // if (this.checkStoresSelected) {
      if (!compareResult) {
      // G015.00.0 Add-End
        this.$refs.pop.open(1, '終了', '編集中のデータは破棄されます。よろしいですか？', '', true, function () {
          this.$router.push('/TopPage')
        }, false, () => {})
      } else {
        this.$router.push('/TopPage')
      }
    },
    async onMenuOk () {
      // const codes = [...this.targetStoreCodes, ...this.sourceStoreCodes]
      const codes = this.targetStoreCodes

      if (codes.length) {
        this.updating = true
        this.cntApiCallback = 0

        this.data.map(d => {
          this.configuration[d.name] = d
        })
        // G019.00.0 Add-Start
        this.subMediaSeqNoList.map(item => {
          const findPaymentData = this.data.find(d => item.name.split('_')[1] === d.name.split('_')[1])
          if (findPaymentData.value.subMediaManagement) {
            this.configuration[item.name] = item
          }
        })
        // G019.00.0 Add-End
        // codes.map(code => this.updateNodeSetting(code))
        await Promise.all(codes.map(code => this.updateNodeSetting(code)))
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b1.E002'), '', false, null, false, null)
      }
    },
    // KSD V001.000 AS
    checkSubMediaEMoneyOnEdit (value) {
      const matchValInList = this.eMoneyTypeList.filter(obj => obj.code.toLowerCase() === value.toLowerCase())
      return matchValInList.length === 0
    },
    // KSD V001.000 AE
    // G006.00.0 Add-Start
    checkValues () {
      let flag = false
      // KSD V001.000 DS
      // this.errorMsgList = []
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.errorMsgList = {
        name: [],
        type: []
      }
      // KSD V001.000 AE
      for (let i = 0; i < this.submediaList.length; i++) {
        // KSD V001.000 DS
        // const value = this.submediaList[i].displayName.default
        // if (value === undefined || value === null || value.trim() === '') {
        //   this.errorMsgList.push(this.$i18n.t('O00004.W014'))
        // KSD V001.000 DE
        // KSD V001.000 AS
        const nameVal = this.submediaList[i].displayName.default
        const typeVal = this.submediaList[i].settlementType
        if (nameVal === undefined || nameVal === null || nameVal.trim() === '') {
          this.errorMsgList.name.push(this.$i18n.t('O00004.W014'))
        } else {
          this.errorMsgList.name.push(undefined)
        }
        if (this.editingItem.value.settlementType === 'VegaEM' && (typeVal === '' ||
        (!this.isAddStatus && this.checkSubMediaEMoneyOnEdit(typeVal)))) {
          this.errorMsgList.type.push(this.$i18n.t('F322b2.W009'))
        // KSD V001.000 AE
        } else {
          // KSD V001.000 DS
          // this.errorMsgList.push(undefined)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.errorMsgList.type.push(undefined)
          // KSD V001.000 AE
        }
      }
      // KSD V001.000 DS
      // if (this.errorMsgList.length > 0) {
      //   const filterArray = this.errorMsgList.filter((item) => {
      // KSD V001.000 DE
      // KSD V001.000 AS
      if (this.errorMsgList.name.length > 0 || this.errorMsgList.type.length > 0) {
        const filterArrayName = this.errorMsgList.name.filter((item) => {
          // KSD V001.000 AE
          return item !== undefined
        })
        // KSD V001.000 DS
        // if (filterArray.length > 0) {
        // KSD V001.000 DE
        // KSD V001.000 AS
        const filterArrayType = this.errorMsgList.type.filter((item) => {
          return item !== undefined
        })
        if (filterArrayName.length > 0 || filterArrayType.length > 0) {
          // KSD V001.000 AE
          flag = true
        }
      }
      return flag
    },
    // G006.00.0 Add-End
    onSave () {
      // KSD V001.000 DS
      //// G021.00.0 Add-Start
      //if (this.editingItem.value.displayName.default === '' || this.editingItem.value.displayName.default === null) {
      //  this.nameErrorMsg = this.$i18n.t('O00004.W014')
      //  return
      //}
      //// G021.00.0 Add-End
      // KSD V001.000 DS
      // KSD V001.000 AS
      if (((!this.editingItem.value.copyreceiptNum || this.editingItem.value.copyreceiptNum === 0) &&
      this.editingItem.name !== 'PAYMENT_01') || this.checkValues() || !this.editingItem.value.displayName.default) {
        if (!this.editingItem.value.copyreceiptNum) {
          this.copyreceiptNumError = this.$i18n.t('F322b2.W007')
        }
        if (!this.editingItem.value.displayName.default) {
          this.displayNameError = this.$i18n.t('F322b2.W007')
        }
        if (this.editingItem.value.displayName.default) {
          this.displayNameError = null
        }
        if (this.editingItem.value.copyreceiptNum) {
          this.copyreceiptNumError = null
        }
        if (this.editingItem.value.copyreceiptNum === 0) {
          this.copyreceiptNumError = this.$i18n.t('F322b2.W008')
        }
        if (this.checkValues()) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
          return
        }
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
        return
      }
      // KSD V001.000 AE
      // KSD V001.000 DS
      // // G006.00.0 Add-Start
      // if (this.checkValues()) {
      //   this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
      //   return
      // }
      // // G006.00.0 Add-End
      // KSD V001.000 DE
      // 編集ボタンOK
      if (this.editedIndex > -1) {
        this.editingItem.description.default = this.editingItem.name
        this.editingItem.value.name = this.editingItem.name
        // G001.00.0 Add-Start
        if (this.submediaList.length > 0) {
          this.editingItem.value.submediaList = this.submediaList.filter(item => {
            return item.displayName.default !== ''
          })
          this.editingItem.value.submediaList.forEach(item => {
            // KSD V001.000 AS
            if (this.editingItem.value.settlementType !== 'VegaEM' && this.editingItem.value.settlementType !== 'CODEPAY') {
            // KSD V001.000 AE
              item.amount = +item.amount
              // KSD V001.000 AS
              item.settlementType = null
              item.paymentChanel = null
              item.revenueStamp = null
            }
            if (this.editingItem.value.settlementType === 'VegaEM') {
              item.settlementType = item.settlementType
              item.revenueStamp = item.revenueStamp
              item.amount = null
              item.paymentChanel = null
            }
            if (this.editingItem.value.settlementType === 'CODEPAY') {
              item.paymentChanel = item.paymentChanel
              item.amount = null
              item.settlementType = null
              item.revenueStamp = null
            }
            // KSD V001.000 AE
            delete item.name1
            delete item.name2
          })
        }
        // G001.00.0 Add-End

        if (this.editedIndex === this.data.length) {
          this.data.push(this.editingItem)
          // G018.00.0 Add-Start
          this.configuration.PAYMENT_SEQUENCE_NO.value = this.editingItem.id
          // G018.00.0 Add-End
        } else {
          Object.assign(this.data[this.editedIndex], this.editingItem)
        }
        // G004.00.0 Add-Start
        // G007.00.0 Update-Start
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
        // G022.00.0 Delete-Start
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '0', false, null, false, null)
        // G022.00.0 Delete-End
        // G007.00.0 Update -End
        // G004.00.0 Add-End
        // G019.00.0 Add-Start
        const findSubMediaSeqNoData = this.subMediaSeqNoList.find(d => d.name.split('_')[1] === this.editingItem.name.split('_')[1])
        if (findSubMediaSeqNoData) delete findSubMediaSeqNoData['oldValue']
        // G019.00.0 Add-End
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b2.W004'), '', false, null, false, null)
      }
      this.onCancel()
    },
    // G001.00.0 Add-Start
    onCancelConfirm () {
      // KSD V001.000 DS
      // this.errorMsgList = []
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.errorMsgList = {
        name: [],
        type: []
      }
      // KSD V001.000 AE
      // G019.00.0 Add-Start
      const findSubMediaSeqNoData = this.subMediaSeqNoList.find(d => d.name.split('_')[1] === this.editingItem.name.split('_')[1])
      if (findSubMediaSeqNoData) {
        findSubMediaSeqNoData.value = findSubMediaSeqNoData.oldValue ? findSubMediaSeqNoData.oldValue : findSubMediaSeqNoData.value
        delete findSubMediaSeqNoData['oldValue']
      }
      // G019.00.0 Add-End
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.onCancel, false, null)
    },
    // G001.00.0 Add-End
    onCancel () {
      this.editDialog = false
      this.$nextTick(() => {
        this.editingItem = null
      })
      // KSD V001.000 AS
      this.copyreceiptNumError = null
      this.displayNameError = null
      // KSD V001.000 AE
    },
    // KSD V001.000 AS
    paymentTypeVal (code) {
      for (var j = 0; j < this.paymentTypeList.length; j++) {
        if (code === this.paymentTypeList[j].Code) {
          return this.paymentTypeList[j].displayName
        }
      }
    },
    // KSD V001.000 AE
    editItem (item) {
      // KSD V001.000 AS
      this.ishandlingCashDefault = true
      // KSD V001.000 AE
      this.editedIndex = this.data.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.editingItem = JSON.parse(JSON.stringify(item))
      // G001.00.0 Add-Start
      if (this.editingItem.name === 'PAYMENT_01') {
        this.isPay01Disabled = true
      } else {
        this.isPay01Disabled = false
      }
      // G001.00.0 Add-End
      this.editDialog = true
      // KSD V001.000 AS
      if (this.editingItem.value.settlementType === 'OTHERS' || this.editingItem.value.settlementType === 'VegaUnionPay') {
        this.ishandlingCashDefault = false
      }
      // KSD V001.000 AE
    },
    // G018.00.0 Add-Start
    getMaxPaymentNo (configurations) {
      let maxNo = 0
      for (let key in configurations) {
        if (configurations[key] === null || Object.keys(configurations[key]).length === 0) {
          continue
        }
        if (key.startsWith('PAYMENT_')) {
          const num = key.split('_')[1]
          if (key.split('_').length === 2 && !isNaN(num)) {
            maxNo = parseInt(num) > maxNo ? parseInt(num) : maxNo
          }
        }
      }
      return maxNo
    },
    getNewMaxNo () {
      return this.configuration.PAYMENT_SEQUENCE_NO.value + 1
    },
    // G018.00.0 Add-End
    onNewItem () {
      // KSD V001.000 AS
      this.ishandlingCashDefault = true
      // KSD V001.000 AE
      // G021.00.0 Add-Start
      this.cancelErrorMsg()
      // G021.00.0 Add-End
      this.editedIndex = this.data.length
      const newItem = JSON.parse(JSON.stringify(this.data[0]))
      newItem.name = ''
      newItem.value.deposit = false
      // G002.00.0 Update-Start
      newItem.value.shortTend = true
      newItem.value.overTend = true
      this.isPay01Disabled = false
      // G002.00.0 Update-End
      newItem.value.group = 'CASH'
      // G001.00.0 Add-Start
      newItem.value.giftCertificates = false
      newItem.value.displayName.default = ''
      // (使用中の番号のうち最も大きい番号)＋１ PAYMENT_XX
      if (this.data.length > 0) {
        // G018.00.0 Update-Start
        // let maxPaymentNoPlusOne = (+this.data[this.data.length - 1].name.substr(8, 2)) + 1
        let maxPaymentNoPlusOne = this.getNewMaxNo()
        // G018.00.0 Update-End
        let nameNo = 'PAYMENT_' + maxPaymentNoPlusOne.toString().padStart(2, '0')
        newItem.id = maxPaymentNoPlusOne
        newItem.value.name = nameNo
        newItem.name = nameNo
      }
      // G001.00.0 Add-End
      // G002.00.0 Update-Start
      newItem.value.openCashDrawer = true
      newItem.value.change = true
      newItem.value.revenueStamp = true
      // G002.00.0 Update-End
      // KSD V001.000 DS
      // newItem.value.depositOperation = false
      // newItem.value.withdrawalOperation = false
      // KSD V001.000 DE
      // KSD V001.000 AS
      newItem.value.depositOperation = true
      newItem.value.withdrawalOperation = true
      // KSD V001.000 AE
      // KSD V001.000 DS
      // newItem.value.CCTinterlocking = false
      // KSD V001.000 DE
      newItem.value.subMediaManagement = false
      // KSD V001.000 AS
      newItem.value.cashTransferStatus = 'TRANSFER_NULL'
      newItem.value.handlingCash = true
      newItem.value.settlementType = 'CASH'
      newItem.value.submediaList = [
        {
          displayName: {
            default: ''
          },
          settlementType: this.storeOperationsDefault,
          paymentChanel: '0',
          amount: '',
          revenueStamp: true
          // KSD V001.000 AS
          , name: 'SUB_01'
          // KSD V001.000 AE
        }
      ]
      newItem.value.copyreceiptNum = null
      newItem.value.storeReserve = true
      newItem.value.companyReserve = true
      // KSD V001.000 AE
      this.editingItem = newItem
      this.editDialog = true
    },
    // G019.00.0 Add-Start
    deleteSubMedia (index) {
      this.submediaList.splice(index, 1)
    },
    // G019.00.0 Add-End
    onNewSubMediaItem () {
      if (this.submediaList.length < 99) {
        // G019.00.0 Add-Start
        const findSubMediaSeqNoData = this.subMediaSeqNoList.find(d => d.name.split('_')[1] === this.editingItem.name.split('_')[1])
        let no = 1
        // KSD V001.000 AS
        let val = null
        // KSD V001.000 AE
        if (findSubMediaSeqNoData) {
          no = findSubMediaSeqNoData.value
          findSubMediaSeqNoData.oldValue = !findSubMediaSeqNoData.oldValue ? findSubMediaSeqNoData.value : findSubMediaSeqNoData.oldValue
          findSubMediaSeqNoData.value = parseInt(no + 1)
          // KSD V001.000 AS
          val = findSubMediaSeqNoData.value
          // KSD V001.000 AE
        }

        // KSD V001.000 DS
        // const maxNo = (parseInt(no) + 1).toString().padStart(2, '0')
        // KSD V001.000 DE
        // KSD V001.000 AS
        const maxNo = (parseInt(val)).toString().padStart(2, '0')
        // KSD V001.000 AE
        // G019.00.0 Add-End
        this.submediaList.push({
          // G001.00.0 Update-Start
          // amount: 0,
          amount: '',
          // KSD V001.000 AS
          paymentChanel: '0',
          settlementType: this.storeOperationsDefault,
          revenueStamp: true,
          // KSD V001.000 AE
          // G001.00.0 Update -End
          // G001.00.0 Update-Start
          // name: 'SUB_' + (this.submediaList.length + 1),
          // name: 'SUB_' + (this.submediaList.length + 1).toString().padStart(2, '0'),
          // G019.00.0 Update-Start
          // name1: 'ｻﾌﾞﾒﾃﾞｨｱ' + (this.submediaList.length + 1).toString().padStart(2, '0') + '名称',
          // name2: 'ｻﾌﾞﾒﾃﾞｨｱ' + (this.submediaList.length + 1).toString().padStart(2, '0') + '金額',
          name1: 'ｻﾌﾞﾒﾃﾞｨｱ' + maxNo + '名称',
          name2: 'ｻﾌﾞﾒﾃﾞｨｱ' + maxNo + '金額',
          // G019.00.0 Update-End
          // G001.00.0 Update -End

          // G019.00.0 Update-Start
          // name: 'SUB_' + (this.submediaList.length + 1).toString().padStart(2, '0'),
          name: 'SUB_' + maxNo,
          // G019.00.0 Update-End
          displayName: {
            default: ''
          }
        })
      }
    },
    onRemoveItem () {
      // G001.00.0 Update-Start
      // this.$refs.pop.open(2, '', '本当に削除しますか？', '', false, () => {
      // }, false, null)
      // G013.00.0 Add-Start
      let wargingMessage = '対象マスタを削除します。<br />よろしいですか？'
      let warrningType = 1
      if (typeof Object.entries(this.configuration).filter(([key, value]) => key === 'ACCOUNTING_SETTINGS')
        .map(([key, value]) => value.value.map(x => x.paymentType)).flat()
        .filter(x => x !== null && x !== undefined).find(e => e === this.data[this.editedIndex].name) !== 'undefined') {
        wargingMessage = 'この設定は操作ボタン設定で使用されています。<br />削除してよろしいですか？'
        warrningType = 3
      }
      // G013.00.0 Add-End
      this.$refs.pop.open(warrningType, '', wargingMessage, '', true, () => {
      // G001.00.0 Update -End
        // G001.00.0 Add-Start
        // G009.00.0 Add-Start
        // NAME_TRANSACTION_SETTINGS.value[]削除
        let delTransactionNos = []
        for (let i = 0; i < 6; i++) {
          if (!this.data[this.editedIndex].value.subMediaManagement) {
            // メインメディア
            delTransactionNos.push('1' + this.data[this.editedIndex].name.substr(this.data[this.editedIndex].name.length - 2) + '00' + i)
          } else {
            // サブメディア
            // G018.00.0 Add-Start
            delTransactionNos.push('1' + this.data[this.editedIndex].name.substr(this.data[this.editedIndex].name.length - 2) + '00' + i)
            // G018.00.0 Add-End
            if (this.data[this.editedIndex].value.submediaList.length > 0) {
              this.data[this.editedIndex].value.submediaList.forEach(subItem => {
                delTransactionNos.push('1' + this.data[this.editedIndex].name.substr(this.data[this.editedIndex].name.length - 2) + subItem.name.substr(4, 2) + i)
              })
            }
          }
        }
        delTransactionNos.forEach(transactionNo => {
          this.configuration.NAME_TRANSACTION_SETTINGS.value.splice(
            this.configuration.NAME_TRANSACTION_SETTINGS.value.findIndex(item => item.transactionNo === transactionNo), 1)
        })
        // G019.00.0 Add-Start
        delete this.configuration[`PAYMENT_${this.data[this.editedIndex].name.split('_')[1]}_SUB_SEQUENCE_NO`]
        this.subMediaSeqNoList = this.subMediaSeqNoList.filter(data => data.name !== `PAYMENT_${this.data[this.editedIndex].name.split('_')[1]}_SUB_SEQUENCE_NO`)
        // G019.00.0 Add-End
        // G001.00.0 Add-End
        delete this.configuration[this.data[this.editedIndex].name]
        // G001.00.0 Add-End
        this.data.splice(this.editedIndex, 1)

        this.editDialog = false
        this.editedIndex = -1
        this.editingItem = null
        // G007.00.0 Add-Start
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '0', false, null, false, null)
        // G007.00.0 Add-End
      }, false, null)
    },
    fetchConfigurations () {
      axios.get(
        this.$i18n.t('prop.url') + ApiPath.Configuration.NodeList,
        {},
        commonUtils.methods.getApiHeader()
      ).then(response => {
        const {result} = response.data

        if (result.code === 0) {
          const data = response.data.responseModel
          console.log(data)
        } else if (result.code === 2) {
          this.$refs.pop.open(2, '', this.$i18n.t('F322b2.W002'), '', false, null, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322b2.W001'), '', false, null, false, null)
        }
      }).catch(error => {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('F322b2.W001'), '', false, null, false, null)
      })
    },
    // KSD V001.000 AS
    blockFullWidth (e, maxLength, inputObject, inputVariable) {
      const { value } = e.target
      const strLen = value.toString().length
      let byteLen = 0
      for (let i = 0; i < strLen; i++) {
        const codeUnitNo = value.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
          (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          inputObject[inputVariable] = value.toString().substring(0, i)
          break
        }
        if (byteLen > maxLength) {
          if (inputObject[inputVariable] === value.toString()) {
            inputObject[inputVariable] = value.toString().substring(0, i)
          }
          break
        }
      }
    },
    // KSD V001.000 AE
    // G012.00.0 Delete Start
    // AS #1589
    // fetchTargetStoresInfo () {
    //   if (this.checkStoresSelected) {
    //     // G014.00.0 Update-Start
    //     // this.fetchNodeSetting(this.sourceStoreCodes[0])
    //     this.fetchNodeSetting(this.sourceStoreCodes[0], true)
    //     // G014.00.0 Update-End
    //   }
    // },
    // AE #1589
    // G012.00.0 Delete End
    // G012.00.1 Update-Start
    fetchStoresInfo (returnOrSave) {
      // DS #1589
      // this.loading = true
      // this.data = []
      // DE #1589
      if (this.sourceStoreCodes.length) {
      // if (!this.sourceStoreCodes.length) {
        // G013.00.0 Delete-Start
        // this.$refs.pop.open(2, '', this.$i18n.t('F322b2.W000'), '', false, null, false, null)
        // G013.00.0 Delete-End
        if (returnOrSave.length === 1) {
          this.fetchNodeSetting(this.sourceStoreCodes[0], false)
        }
        this.currentStoreSelected = this.sourceStoreCodes[0]
      } else {
      // if (this.sourceStoreCodes.length) {
        // G012.00.0 Update-Start
        // if (this.checkStoresSelected && !this.sourceStoreCanseled) {
        // if (this.checkStoresSelected) {
        // G012.00.0 Update-End
        // DS #1589
        // this.data = []
        // DE #1589
        // G014.00.0 Update-Start
        // this.fetchNodeSetting(this.sourceStoreCodes[0])
        // this.fetchNodeSetting(this.sourceStoreCodes[0], false)
        // G014.00.0 Update-End
        // }
        // this.currentStoreSelected = this.sourceStoreCodes[0]
      }
      // G012.00.1 Update-End
    },
    // CS #1589
    // fetchNodeSetting (nodeId) {
    //  axios.put(
    // G014.00.0 Update-Start
    // async fetchNodeSetting (nodeId) {
    // KSD V001.000 AS
    getStoreOpsData (obj, keys) {
      const res = {}
      for (const key of keys) {
        if (obj.hasOwnProperty(key)) {
          res[key] = obj[key]
        }
      }
      return res
    },
    setStoreOpsDef (storeOpsList) {
      const keysWithIndex = []
      let index = 0
      for (const key in storeOpsList) {
        keysWithIndex.push({ key, index })
        index++
      }
      const keyList = ['transportation', 'edy', 'quicPay', 'waon', 'nanaco']
      const filteredData = keysWithIndex.filter(item => keyList.includes(item.key))
      const keyToMatch = filteredData.map(obj => obj.key)
      const getObjects = this.getStoreOpsData(storeOpsList, keyToMatch)
      const valCond = value => value === true
      const filterKeys = Object.keys(getObjects).filter(key => valCond(getObjects[key]))
      const filterObj = {}
      filterKeys.forEach(key => {
        filterObj[key] = getObjects[key]
      })
      const keys = Object.keys(filterObj)
      const lowercaseList = keys.map(str => str.toLowerCase())
      const selectedList = this.eMoneyTypeList.filter(obj => lowercaseList.includes(obj.code.toLowerCase()))
      this.eMoneyTypeList = selectedList
      return this.eMoneyTypeList.length > 0 ? this.eMoneyTypeList[0].code.toLowerCase() : 'error'
    },
    // KSD V001.000 AE
    async fetchNodeSetting (nodeId, targetStoreFlag) {
      // debugger
      // G014.00.0 Update-End
      this.loading = true
      this.data = []
      // G014.00.0 Add-Start
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W016'), '', false, null, false, null)
      // G014.00.0 Add-End
      await axios.put(
        // CE #1589
        // G008.00.0 Update-Start
        // this.$i18n.t('prop.url') + ApiPath.Configuration.FetchNodeSetting,
        this.$i18n.t('prop.url') + ApiPath.Configuration.FetchNodeSettingRecursive,
        // G008.00.0 Update -End
        {nodeId: nodeId},
        commonUtils.methods.getApiHeader())
        .then(response => {
          // DS #1589
          // this.loading = false
          // DE #1589

          const {result} = response.data
          // G014.00.0 Add-Start
          this.$refs.pop.closeFunction()
          // G014.00.0 Add-End
          if (result.code === 0) {
            const data = response.data.responseModel
            // KSD V001.000 AS
            const storeOpsList = data.configurations.STORE_OPERATIONS_SETTINGS.value
            this.populateList()
            const strRes = this.setStoreOpsDef(storeOpsList)
            if (strRes !== 'error') {
              const eMoneyTypeList = this.eMoneyTypeList.map(obj => obj.code)
              this.storeOperationsDefault = eMoneyTypeList.filter(item => item.toLowerCase() === strRes.toLowerCase())[0]
            } else {
              this.storeOperationsDefault = ''
            }
            // KSD V001.000 AE
            // G001.00.0 Add-Start
            // PAYMENT_01なければ、デフォルトPAYMENT_01を設定する。
            if (!data.configurations.PAYMENT_01) {
              let payment01 = {
                type: 'Map',
                group: 'PAYMENT',
                description: {
                  default: 'Defines the configuration settings for payment type 01.'
                },
                subGroup: 'CONFIG',
                name: 'PAYMENT_01',
                value: {
                  openCashDrawer: true,
                  displayName: {
                    default: '現金'
                  },
                  tillAmountReconcilable: true,
                  change: true,
                  validForSales: true,
                  validForReturns: true,
                  tillLoanable: true,
                  giftCertificates: false,
                  revenueStamp: true,
                  canBePickedUp: true,
                  allowFractionalAmount: true,
                  overTend: true,
                  withdrawalOperation: true,
                  tillQuantityReconcilable: false,
                  voidable: true,
                  name: 'PAYMENT_01',
                  // G001.00.0 Update-Start
                  // deposit: true,
                  deposit: false,
                  // G001.00.0 Update -End
                  // KSD V001.000 DS
                  // CCTinterlocking: false,
                  // KSD V001.000 DE
                  depositOperation: true,
                  subMediaManagement: false,
                  shortTend: true,
                  currencyCode: 'JPY',
                  paymentHostUsed: false,
                  // KSD V001.000 DS
                  // group: 'CASH'
                  // KSD V001.000 DE
                  // KSD V001.000 AS
                  group: 'CASH',
                  handlingCash: true,
                  copyreceiptNum: 1,
                  settlementType: 'CASH',
                  storeReserve: true,
                  companyReserve: true,
                  cashTransferStatus: 'TRANSFER_NULL'
                  // KSD V001.000 AE
                }
              }
              data.configurations.PAYMENT_01 = payment01
            }
            // G018.00.0 Add-Start
            if (!data.configurations.PAYMENT_SEQUENCE_NO) {
              data.configurations.PAYMENT_SEQUENCE_NO = {
                description: {
                  default: 'Record the maximum payment serial number'
                },
                group: 'PAYMENT',
                subGroup: 'PAYMENT',
                inherited: true,
                name: 'PAYMENT_SEQUENCE_NO',
                type: 'Integer',
                value: this.getMaxPaymentNo(data.configurations),
                version: 1
              }
            }
            // G018.00.0 Add-End
            // G001.00.0 Add-End
            this.configuration = data.configurations

            Object.entries(data.configurations).forEach(([key, value]) => {
              // KSD V001.000 AS
              const DEFAULT_TEMPLATE = {
                displayName: {
                  default: null
                },
                paymentChanel: null,
                amount: null,
                settlementType: null,
                revenueStamp: null
              }
              // KSD V001.000 AE
              // G020.00.0 Update-Start
              // if (key.startsWith('PAYMENT_')) {
              if (key.startsWith('PAYMENT_') && key.length === 10) {
                if (value.group === 'PAYMENT') {
                  // G020.00.0 Update-End
                  const id = parseInt(key.split('_')[1])

                  if (id > -1) {
                    value.id = id
                    this.data.push(value)
                  }
                  // G019.00.0 Add-Start
                }
                // KSD V001.000 AS
                if (/^PAYMENT_[0-9]{2}$/.test(key) && key !== 'PAYMENT_01') {
                  if (data.configurations[key].value.hasOwnProperty('submediaList')) {
                    data.configurations[key].value.submediaList = data.configurations[key].value.submediaList.map((value) => {
                      return Object.assign({}, DEFAULT_TEMPLATE, value)
                    })
                  }
                  if (!data.configurations[key].value.hasOwnProperty('handlingCash')) {
                    data.configurations[key].value.handlingCash = data.configurations[key].value.settlementType === 'CASH'
                  }
                }
                // KSD V001.000 AE
              } else if (key.endsWith('_SUB_SEQUENCE_NO') && key.startsWith('PAYMENT_')) {
                const id = parseInt(key.split('_')[1])
                if (id > -1) {
                  value.id = id
                  this.subMediaSeqNoList.push(value)
                }
                // G019.00.0 Add-End
              }
            })
            // G001.00.0 Add-Start
            this.data.sort((a, b) => {
              return a.name > b.name ? 1 : -1
            })
            // G001.00.0 Add-End
            // G015.00.0 Add-Start
            this.originConfiguration = JSON.parse(JSON.stringify(this.configuration))
            // G015.00.0 Add-End
          } else if (result.code === 2) {
            this.$refs.pop.open(2, '', this.$i18n.t('F322b2.W002'), '', false, null, false, null)
          } else if (result.code === -10) { // G012.00.0 Update start
            this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), result.code, false, null, false, null)
            // this.$refs.pop.open(2, '', this.$i18n.t('F322b2.W002'), '', false, null, false, null)
          } else { // G012.00.0 Update End
            this.$refs.pop.open(3, '', this.$i18n.t('F322b2.W003'), '', false, null, false, null)
          }
        })
        .catch(error => {
          // DS #1589
          // this.loading = false
          // DS #1589
          console.log(error)
          // G014.00.0 Add-Start
          if (targetStoreFlag) {
            this.targetStoreCodes = []
          } else {
            this.sourceStoreCodes = []
            this.currentStoreSelected = ''
          }
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // G014.00.0 Add-End
        })
      // AS #1589
      this.loading = false
      // AE #1589
    },
    async updateNodeSetting (nodeId) {
      // G004.00.0 Add-Start
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // G004.00.0 Add-End
      // G009.00.0 Add-Start
      this.setNameTransactionSettings()
      // G009.00.0 Add-End
      await axios.put(
        this.$i18n.t('prop.url') + ApiPath.Configuration.UpdateNodeSetting,
        {
          nodeId: nodeId,
          type: 'Map',
          configuration: this.configuration,
          mode: 0
        },
        commonUtils.methods.getApiHeader()
      ).then(response => {
        // G015.00.0 Add-Start
        this.originConfiguration = JSON.parse(JSON.stringify(this.configuration))
        // G015.00.0 Add-End
        this.cntApiCallback++
        const {result, responseModel} = response.data
        console.log(result, responseModel)
        // G001.00.0 Update-Start
        // if (responseModel != null) {
        if (result.code === 0) {
          // G001.00.0 Update -End
          //
          // G012.00.0 Add-Start
          if (this.showWarrningFlag) {
            this.$refs.pop.open(3, '', this.$i18n.t('F322b2.W006'), '', false, () => {
              this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), result.code, false, null, false, null)
            }, false, null)
          } else {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), result.code, false, null, false, null)
          }
        // }, false, null)
        // } else {
        //  this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), result.code, false, null, false, null)
        // }
          // G012.00.0 Add-End
          // G012.00.0 Add-Start
          // KSD V001.000 AS
        } else if (result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
          // KSD V001.000 AE
        } else if (result.code === -10) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), result.code, false, null, false, null)
          // G012.00.0 Add-End
        } else {
          var errorMessage = result.errorMessageMap['global'].toString()
          // G012.00.0 Update-Start
          // this.$refs.pop.open(3, '', errorMessage, '', false, null, false, null)
          this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
          // G012.00.0 Update -End
        }
        // G001.00.0 Add-Start
        // 保存した後、再検索
        // this.fetchStoresInfo()
        // G009.00.0 Add-Start
        // if (this.showWarrningFlag) {
        //   this.$refs.pop.open(3, '', this.$i18n.t('F322b2.W006'), '', false, () => {
        //     this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), result.code, false, null, false, null)
        //   }, false, null)
        // } else {
        //   this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), result.code, false, null, false, null)
        // }
        // G009.00.0 Add-End
        // G007.00.0 Update-Start
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
        // G009.00.0 Del-Start
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), result.code, false, null, false, null)
        // G009.00.0 Del-End
        // G007.00.0 Update-End
        // G001.00.0 Add-End
        //        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), result.code, false, null, false, null)
      }).catch(error => {
        this.cntApiCallback++
        // console.log(error)
        if (typeof error !== 'undefined') {
          console.log(error)
        }
        // G001.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E001'), '', false, null, false, null)
        // this.$refs.pop.open(3, '', this.$i18n.t('F322b2.E001'), '', false, null, false, null)
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
        //  this.$router.push('/LoginPage')
        // }, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // G001.00.0 Update -End
      })
    },
    // G003.00.0 Add-Start
    // G009.00.0 Add-Start
    setNameTransactionSettings () {
      this.showWarrningFlag = false
      Object.values(this.configuration).forEach(item => {
        if (item.group === 'PAYMENT' && item.name.startsWith('PAYMENT_') && item.name.length === 10) {
          for (let i = 0; i < 6; i++) {
            if (item.value.subMediaManagement) {
              // サブンメディア
              if (item.value.submediaList.length > 0) {
                item.value.submediaList.forEach(subItem => {
                  // transactionNoを算出
                  const transactionNo = '1' + item.name.substr(item.name.length - 2) + subItem.name.substr(4, 2) + i
                  // 名称
                  let defaultNameByTail = this.getName(subItem.displayName.default)[i]
                  // 新規OR編集判断
                  let obj = this.configuration.NAME_TRANSACTION_SETTINGS.value.find((item) => item.transactionNo === transactionNo)
                  if (!obj) {
                    // 新規
                    obj = {
                      transactionNo: transactionNo,
                      defaultName: {
                        default: defaultNameByTail,
                        'en-US': ''
                      },
                      displayName: {
                        default: defaultNameByTail,
                        'en-US': ''
                      },
                      printName: {
                        default: defaultNameByTail,
                        'en-US': ''
                      },
                      printNo: 0,
                      order: Number(transactionNo)
                    }
                    this.configuration.NAME_TRANSACTION_SETTINGS.value.push(obj)
                  } else {
                    // 編集
                    this.configuration.NAME_TRANSACTION_SETTINGS.value.forEach(item => {
                      if (item.transactionNo === transactionNo) {
                        if (item.defaultName && item.defaultName.default !== defaultNameByTail) {
                          this.showWarrningFlag = true
                          item.defaultName.default = defaultNameByTail
                        }
                      }
                    })
                  }
                })
              }
            // G011.00.0 Update-Start
            // } else {
            }
            // G011.00.0 Update-End
            // メインメディア
            // transactionNoを算出
            const transactionNo = '1' + item.name.substr(item.name.length - 2) + '00' + i
            // 名称
            let defaultNameByTail = this.getName(item.value.displayName.default)[i]
            // 新規OR編集判断
            let obj = this.configuration.NAME_TRANSACTION_SETTINGS.value.find((item) => item.transactionNo === transactionNo)
            if (!obj) {
              // 新規
              obj = {
                transactionNo: transactionNo,
                defaultName: {
                  default: defaultNameByTail,
                  'en-US': ''
                },
                displayName: {
                  default: defaultNameByTail,
                  'en-US': ''
                },
                printName: {
                  default: defaultNameByTail,
                  'en-US': ''
                },
                printNo: 0,
                order: Number(transactionNo)
              }
              this.configuration.NAME_TRANSACTION_SETTINGS.value.push(obj)
            } else {
              // 編集
              this.configuration.NAME_TRANSACTION_SETTINGS.value.forEach(item => {
                if (item.transactionNo === transactionNo) {
                  if (item.defaultName && item.defaultName.default !== defaultNameByTail) {
                    this.showWarrningFlag = true
                    item.defaultName.default = defaultNameByTail
                  }
                }
              })
            }
            // G011.00.0 Del-Start
            // }
            // G011.00.0 Del-End
          }
        }
      })
    },
    getName (inputName) {
      let arr = [
        inputName + '計',
        inputName + '入金',
        inputName + '出金',
        inputName + '在高',
        '手持' + inputName + '在高',
        inputName + '過不足'
      ]
      return arr
    },
    // G009.00.0 Add-End
    inputLimit (subItem, maxLength, index) {
      const str = subItem.displayName.default
      if (str == null) { return }
      var strLen = str.toString().length
      // if (strLen>0) {
      //  this.errorMsgList[index]=undefined
      // }
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
          subItem.displayName.default = str.toString().substring(0, i)
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
    // G003.00.0 Add-End
  },
  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322b2'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  mounted () {
    this.initialize()
    // G010.00.0 Add start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G010.00.0 Add end
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
