/**
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230203  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
 * 20230217  wangchunmei(Neusoft)  G002.00.0  issue課題#1569を対応します.
 * 20230222  wangchunmei(Neusoft)  G003.00.0  issue課題#1594を対応します.
 * 20230223  wangchunmei(Neusoft)  G004.00.0  issue課題#1599を対応します.
 * 20230310  dingxin(Neusoft)      G005.00.0  issue課題#1225を対応します.
 * 20230314  dingxin(Neusoft)      G006.00.0  issue課題#1662を対応します.
 * 20230320  wangchunmei(Neusoft)  G007.00.0  issue課題#1572を対応します.
 * 20230322  wangchunmei(Neusoft)  G008.00.0  issue課題#1573を対応します.
 * 20230322  wangchunmei(Neusoft)  G009.00.0  issue課題#1588を対応します.
 * 20230412  dingxin(Neusoft)      G010.00.0  issue課題#1225を対応します.
 * 20230413  wangchunmei(Neusoft)  G011.00.0  issue課題#908を対応します.
 * 20230421  zxh(Neusoft)          G012.00.0  issue課題#1457を対応します.
 * 20230423  dingxin(Neusoft)      G013.00.0  issue課題#1662を対応します.
 * 20230717  shiyue(Neusoft)       G014.00.0  issue課題#1617を対応します.
 * 20230829  qinshh(Neusoft)       G015.00.0  issue課題#1573を対応します.
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import radioButton from '@/resource/templates/CommonInput/RadioButton'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import moment from 'moment'
// G009.00.0 Add-Start
import {ApiPath} from '@/resource/static/properties/api_path'
// G009.00.0 Add-End

// ダイアログ
import receiptListDialog from '@/resource/templates/ReceiptSetting/ReceiptListDialog'
import receiptCopyDialog from '@/resource/templates/ReceiptSetting/ReceiptCopyDialog'
// G001.00.0 Add-Start
import ryosyuInformationDialog from '@/resource/templates/ReceiptSetting/RyosyuInformationDialog'
import ryosyuMessageDialog from '@/resource/templates/ReceiptSetting/RyosyuMessageDialog'
import receiptHeaderLogoDialog from '@/resource/templates/ReceiptSetting/ReceiptHeaderLogoDialog'
import receiptInformationDialog from '@/resource/templates/ReceiptSetting/ReceiptInformationDialog'
import receiptProductDialog from '@/resource/templates/ReceiptSetting/ReceiptProductDialog'
// G001.00.0 Add-End

/* KSD V001.000 AS */
import receiptCommercialMessageDialog from '@/resource/templates/ReceiptSetting/ReceiptCommercialMessageDialog'
import receiptDealSearchBarcodeDialog from '@/resource/templates/ReceiptSetting/ReceiptDealSearchBarcodeDialog'
import receiptFooterLogoDialog from '@/resource/templates/ReceiptSetting/ReceiptFooterLogoDialog'
import receiptFooterMessageDialog from '@/resource/templates/ReceiptSetting/ReceiptFooterMessageDialog'
import receiptMerchantNameDialog from '@/resource/templates/ReceiptSetting/ReceiptMerchantNameDialog'
import receiptHorizontalSettingDialog from '@/resource/templates/ReceiptSetting/ReceiptHorizontalSettingDialog'
import ReceiptTaxOfficePrintingImageDialog from '@/resource/templates/ReceiptSetting/ReceiptTaxOfficePrintingImageDialog'
import ReceiptHorizontalPrintMessageDialog from '@/resource/templates/ReceiptSetting/ReceiptHorizontalPrintMessageDialog'
import EntranceSlipOptionalCommentDialog from '@/resource/templates/ReceiptSetting/EntranceSlipOptionalCommentDialog'
import EntranceSlipAdmissionTicketQrcodeDialog from '@/resource/templates/ReceiptSetting/EntranceSlipAdmissionTicketQrcodeDialog'
/* KSD V001.000 AE */
const fetchCurrentConfiguration = 'Reservation/FetchConfiguration'
const fetchReceiptDetail = 'Receipt/FetchReceiptDetail'
const updateReceiptDetail = 'Receipt/UpdateReceiptDetail'
// G001.00.0 Add-Start
const destroyReceiptDetail = 'Receipt/DestroyReceiptDetail'
const defaultBase64 = 'data:image/bmp;base64,Qk1AGQAAAAAAAD4AAAAoAAAAQAEAAKAAAAABAAEAAAAAAAIZAAASCwAAEgsAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////////////////////////////////wD///////////////////////////////////////////////////8A////////////////////////////////////////////////////AP///////////////////////////////////////////////////wDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8A8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAPP/////////////////////////////////////////////////zwDz/////////////////////////////////////////////////88A8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwDzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM8A8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwDzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM8A8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwDzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM8A8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwDzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM8A8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAzwDzAAAf4AAAAP4AAAH+AAAAB/gAAADwAAAf8AAAAf8AAAAH/AAAAM8A8wAAH+AAAAD+AAAB/gAAAAf4AAAD/AAAH/AAAAH/AAAAB/wAAADPAPMAAB/mAAAA/gAAAf///gAH+AAAB/4AAB/wAAAB///////8AAAAzwDzAAAf7/AAAP4AAAH///4AB/gAAA//AAAf8AAAAf///////AAAAM8A8wAAH+//gAD+AAAB///+AAf4AAAP/4AAH/AAAAH///////wAAADPAPMAAB/v//gA/gAAAf///gAH+AAAB//AAB/wAAAB///////8AAAAzwDzAAAf7///gP4AAAH///4AB/gAAAH/4AAf8AAAAf///////AAAAM8A8wAAH+////j+fgAB///+AAf4AAAAf/AAH/AAAAH/AAAAB/wAAADPAPMAAB/v///8/v+AAf4B/gAH+AAAAH/wAB/4AAAB/wAAAAf8AAAAzwDzAAAf5////P7/gAH+AP4AB/gAAf/////////AAf///////AAAAM8A8wAAH+P///z+/8AB/gD+AAf4AAH/////////wAH///////wAAADPAPMAAB/j+f/8/v/AAf4A/gAH+AAB/////////8AB///////8AAAAzwDzAAAf4/n//P//wAH+AP4AB/gAAf/////////AAf///////AAAAM8A8wAAH+P5/3z//8AB///+AAf4AAH/////////wAH///////wAAADPAPMAAB/j+f8M///AAf///gAH+AAB/////////8AB/wAAAAf8AAAAzwDzAAAf4/n/AP4/wAH///4AB/gAAAAH/gAf+AAAAf8AAAAH/AAAAM8A8wAAH+P5/wD+P8AB///+AAf4AAAAA/wAH/AAAAH///////wAAADPAPMAAB/j+f8A/j/AAf///gAH+AAAAAP+AB/wAAAB///////8AAAAzwDzAAEf4/n/AP4/wAH///4AB/gAAAf///////AAAf///////AAAAM8A8wABn+P5/wD+P8AAAAAAAAf4AAAH///////wAAH///////wAAADPAPMAAd/j+f/8/j/AAAAAAAAH+AAAB///////8AAB///////8AAAAzwDzAAP/4/n//P4/wAAAAAAAB/gAAAf///////AAAf///////AAAAM8A8wAD/+P5//z+P8AB///+AAf4AAAH///////wAAAAAAAAAAAAAADPAPMAA//j+f/8/j/AAf///gAH+AAAB/wAAAAf8AA/////////4AAAzwDzAAP/4/n//P4/wAH///4AB/gAAAf8AAAAH/AAP////////+AAAM8A8wAD/+P5//z+P8AB///+AAf4AAAH///////wAD/////////gAADPAPMAA//j+f/8/j/AAf///gAH+AAAB///////8AA/////////4AAAzwDzAAP/4/n/AP4/wAH///4AB/gAAAf///////AAP////////+AAAM8A8wAA/+P5/wD+P8AAAAAAAAf4AAAH///////wAAAAAD/gAAAAAADPAPMAAH/wAf8A/j/AAAAAAAAH+AAAB///////8AAAAAA/4AAAAAAAzwDzAAA/+AH/AP4/wAAAAAAAB/gAAAf8AAAAH/AAB////////wAAAM8A8wAAH/wB/wD+P8AB///+f////wAH/AAAAB/wAAf///////8AAADPAPMAAA/////8/j/AAf///n////8AB///////8AAH////////AAAAzwDzAAAH/////P4/wAH///5/////AAf///////AAB////////wAAAM8A8wAAA/////z+P8AB///+f////wAH///////wAAf///////8AAADPAPMAAAP////8/j/AAf///n////8AB///////8AAAAAA/4AAAAAAAzwDzAAAB/////P4/wAH///5/////AAf8AAAAH/AAAf///////AAAAM8A8wAAAP////z+P8AAAAAAf////wAH/AAAAB/wAAH///////wAAADPAPMAAAB////8/j/AAAAAAH////4AB///////8AAB///////8AAAAzwDzAABAfwH/AP4/wAAAAAAAB/gAACf///////AAAf///////AAAAM8A8wAA8D5h/wD+P8AH////gAf4AAB3///////wAAAAAD/gB/wAAADPAPMAAPgY8f8A/j/AB////4AH+AAAf///////8AAAAAA/4Af8AAAAzwDzAAD8AfH/AP4/wAf///+AB/gAAP////////AAf/////////AAAM8A8wAB/gf5/wD+P8AH////gAf4AAD////////wAH/////////wAADPAPMAAf8P+f8A/j/AB////4AH+AAB/wP8H4D/AAB/////////8AAAzwDzAAH/h////P4/wAf///+AB/gAAf+H/H/h/wAAf/////////AAAM8A8wAB/8P///z+P8AH////gAf4AAH/x/h/4f8AAH/////////wAADPAPMAAP/h///8/j/AAAAAAAAH+AAA/+/4f/P/AAB/////////8AAAzwDzAAB/8f///P8/wAAAAAAAB/gAAH////////+AAAAAP+AH/AAAAM8A8wAAP/j///z//8AB///+AAf4AAA/////////gAAAAD/gB/wAAADPAPMAAB/8///8///AAf///gAH+AAAH////////4AB///////8AAAAzwDzAAAP/H///P//wAH///4AB/gAAA////v///+AAf///////AAAAM8A8wAAB/5/gAD//8AB///+AAf4AAAH///5////gAH///////wAAADPAPMAAAP/P4AA///AAf///gAH+AAAB///+f///4AB///////8AAAAzwDzAAAB/j/AAP//wAH///4AB/gAAAP///j///+AAf///////AAAAM8A8wAAAPw/wAD//8AB///8AAf4AAAB/gAAf8AAAAAAAD/gAAAAAADPAPMAAAB4H8AAAAAAAAAAAAAH+AAAAf8AAH/AAAAAAAA/4AAAAAAAzwDzAAAAIB/AAAAAAAAAAAAAAAAAAAD+AAA/gAAAAAAAP+AAAAAAAM8A8wAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAMAAAAAAAAD/gAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwDzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM8A8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwDzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM8A8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwDzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM8A8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwDzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM8A8//////////////////////////////////////////////////PAPP/////////////////////////////////////////////////zwDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8A8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAP///////////////////////////////////////////////////wD///////////////////////////////////////////////////8A////////////////////////////////////////////////////AP///////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='

const dateregex = new RegExp(/^(([0-1]{1}\d{1})|(2[0-3]{1})):([0-5]{1}\d{1})$/)
// G001.00.0 Add-End

export default {
  name: 'ReceiptSetting',
  data () {
    return {
      // G013.00.0 Add-Start
      permissions: [],
      // G013.00.0 Add-End
      // G008.00.0 Add-Start
      showFlag: false,
      // G008.00.0 Add-End
      isProcessing: false,

      targetStoreCodes: [],
      planningCode: '',
      planningName: '',
      // G001.00.0 Add-Start
      planningCodeErrorMsg: '',
      focusItem: null,
      // G007.00.0 Update-Start
      // receiptType: 0,
      receiptType: '',
      // G007.00.0 Update-End
      receiptTypeLabels: [
        { name: this.$i18n.t('F322b3.S002'), value: 0 },
        { name: this.$i18n.t('F322b3.S003'), value: 1 }
        /* KSD V001.000 AS */
        , { name: this.$i18n.t('F322b3.S098'), value: 2 }
        /* KSD V001.000 AE */
      ],
      targetStoreCode: '',
      picUrl: defaultBase64,
      /* KSD V001.000 AS */
      picStatementOfAccount: defaultBase64,
      /* KSD V001.000 AE */
      headquartersAuthority: 1,
      // G001.00.0 Add-End

      setting: null,
      dateFrom: '',
      timeFrom: '00:00',
      dateTo: '',
      timeTo: '23:59',
      weekLabels: ['日', '月', '火', '水', '木', '金', '土'],
      weekSelected: [],

      headerLogoFileName: null,

      // G001.00.0 Delete-Start
      // itemDetailLabels: [
      //   { name: 'PLUコード印字する', value: true },
      //   { name: 'しない', value: false }
      // ],
      // taxClassificationLabels: [
      //   { name: 'あり', value: true },
      //   { name: 'なし', value: false }
      // ],
      // receiptInformationLabels: [
      //   { name: '責任者No＋名称', value: 1 },
      //   { name: '責任者Noのみ', value: 0 }
      // ],
      // ryosyuInformationLabels: [
      //   { name: '責任者情報印字する', value: true },
      //   { name: 'しない', value: false }
      // ]
      // G001.00.0 Delete-End
      // G001.00.0 Add-Start
      receiptInformationLabels: {
        1: '責任者No＋名称',
        0: '責任者Noのみ'
      },
      ryosyuInformationLabels: {
        true: '責任者情報印字する',
        false: '責任者情報印字しない'
      }
      // G001.00.0 Add-End
    }
  },
  computed: {
    allWeekSelected: {
      get () {
        return this.weekSelected.every(e => e)
      },
      set (newValue) {
        for (let index in this.weekSelected) {
          this.$set(this.weekSelected, index, newValue)
        }
      }
    },
    // G001.00.0 Add-Start
    disabledPlanClearBtn () {
      return !(this.setting)
    },
    disabledPlanDelBtn () {
      return !(this.setting && this.setting.id)
    },
    disabledPlanCheckBtn () {
      if (this.headquartersAuthority === 0) {
        // G008.00.0 Update-Start
        // return !(this.targetStoreCodes && this.targetStoreCodes.length > 0 && this.planningCode && !this.planningCodeErrorMsg)
        return !(this.targetStoreCodes && this.targetStoreCodes.length > 0 && this.showFlag)
        // G008.00.0 Update-End
      }
      return !(this.targetStoreCodes && this.targetStoreCodes.length > 0)
    },
    // G001.00.0 Add-End
    disabledPlanCopyBtn () {
      // G001.00.0 Add-Start
      if (this.headquartersAuthority === 0) {
        // G008.00.0 Update-Start
        // return !(this.targetStoreCodes && this.targetStoreCodes.length > 0 && this.planningCode && !this.planningCodeErrorMsg)
        return !(this.targetStoreCodes && this.targetStoreCodes.length > 0 && this.showFlag)
        // G008.00.0 Update-End
      }
      // G001.00.0 Add-End
      // G001.00.0 Update-Start
      // return !(this.setting && this.setting.id)
      return !(this.targetStoreCodes && this.targetStoreCodes.length > 0)
      // G001.00.0 Update-End
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    dateInput,
    receiptListDialog,
    radioButton,
    // G001.00.0 Add-Start
    ryosyuInformationDialog,
    ryosyuMessageDialog,
    receiptHeaderLogoDialog,
    receiptInformationDialog,
    receiptProductDialog,
    // G001.00.0 Add-End
    receiptCopyDialog
    /* KSD V001.000 AS */
    , receiptCommercialMessageDialog,
    receiptDealSearchBarcodeDialog,
    receiptFooterLogoDialog,
    receiptFooterMessageDialog,
    receiptMerchantNameDialog,
    receiptHorizontalSettingDialog,
    ReceiptTaxOfficePrintingImageDialog,
    ReceiptHorizontalPrintMessageDialog,
    EntranceSlipOptionalCommentDialog,
    EntranceSlipAdmissionTicketQrcodeDialog
    /* KSD V001.000 AE */
  },
  methods: {
    async initialize () {
      this.weekSelected = this.weekLabels.map(_ => false)
    },
    async onChangePlanCode () {
      // G001.00.0 Delete-Start
      // const node = this.targetStoreCodes[0]

      // const corpId = node.substring(0, 15)
      // const storeId = node.substring(15)

      // await this.getReceiptDetail(corpId, storeId)
      // G001.00.0 Delete-End

      // G001.00.0 Add-Start
      this.checkPlanningCode(true)
      // G001.00.0 Add-End
    },
    checkPlanningCode (clearStoreCodeFlag) {
      // G001.00.0 Add-Start
      this.initErrorMessage()
      this.focusItem = null
      this.setting = null
      // G015.00.0 Delete-Start
      // this.clearStoreCode(clearStoreCodeFlag)
      // G015.00.0 Delete-End
      const availableCodes = ['1', '2', '3', '4', '5', '01', '02', '03', '04', '05']
      if (!availableCodes.includes('' + this.planningCode)) {
        // G008.00.0 Add-Start
        this.showFlag = false
        // G008.00.0 Add-End
        this.planningCodeErrorMsg = [this.$i18n.t('F322b3.E001')]
        this.focusItem = this.$refs.planningCodeText
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '', false, this.setFocus, false, null)
        return false
      }
      // G002.00.0 Update-Start
      // if (this.headquartersAuthority === 0) {
      //   this.selectedReceiptDetail()
      // }
      // G008.00.0 Add-Start
      this.showFlag = true
      // G008.00.0 Add-End
      this.selectedReceiptDetail()
      // G002.00.0 Update-End
      // G001.00.0 Add-End

      // G001.00.0 Delete-Start
      // const availableCodes = ["1", "2", "3", "4", "5", "01", "02", "03", "04", "05"]
      // if (!availableCodes.includes("" + this.planningCode)) {
      //   alert("企画コードは01〜05で入力してください。")
      //   return false;
      // }
      // G001.00.0 Delete-End
      return true
    },

    async getReceiptDetail (corpId, storeId) {
      // G001.00.0 Add-Start
      this.initErrorMessage()
      this.focusItem = null
      this.dateFrom = ''
      this.dateTo = ''
      this.timeFrom = '00:00'
      this.timeTo = '23:59'
      this.$set(this.weekSelected, 0, false)
      this.$set(this.weekSelected, 1, false)
      this.$set(this.weekSelected, 2, false)
      this.$set(this.weekSelected, 3, false)
      this.$set(this.weekSelected, 4, false)
      this.$set(this.weekSelected, 5, false)
      this.$set(this.weekSelected, 6, false)
      // G001.00.0 Add-End
      // G001.00.0 Delete-Start
      // if (!this.checkPlanningCode()) {
      //   return
      // }
      // G001.00.0 Delete-End
      this.isProcessing = true

      axios.put(this.$i18n.t('prop.url') + fetchReceiptDetail, {
        companyCode: corpId,
        storeCode: storeId,
        planningCode: this.planningCode
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          this.isProcessing = false
          if (response.data.responseModel) {
            // G001.00.0 Delete-Start
            // this.setting = response.data.responseModel
            // if (this.setting.startDateTime) {
            //   const dateFrom = new moment(this.setting.startDateTime)
            //   this.dateFrom = dateFrom.format('YYYY-MM-DD')
            //   this.timeFrom = dateFrom.format('HH:mm')
            // }
            // if (this.setting.endDateTime) {
            //   const dateTo = new moment(this.setting.endDateTime)
            //   this.dateTo = dateTo.format('YYYY-MM-DD')
            //   this.timeTo = dateTo.format('HH:mm')
            // }
            // this.weekSelected[0] = this.setting.sundayFlag === 1
            // this.weekSelected[1] = this.setting.mondayFlag === 1
            // this.weekSelected[2] = this.setting.tuesdayFlag === 1
            // this.weekSelected[3] = this.setting.wednesdayFlag === 1
            // this.weekSelected[4] = this.setting.thursdayFlag === 1
            // this.weekSelected[5] = this.setting.fridayFlag === 1
            // this.weekSelected[6] = this.setting.saturdayFlag === 1
            // G001.00.0 Delete-End

            // G001.00.0 Add-Start
            this.handleReceiptDetail(response.data.responseModel)
            // G001.00.0 Add-End
          } else {
            // G005.00.0 Add-Start
            if (response.data.result.code == -10) {
              this.$refs.pop.open(3, '', '通信に失敗しました。ネットワークの接続を確認してください。', '', false, null, false, null)
              return
            }
            // G005.00.0 Add-End
            this.setting = {
              storeCode: storeId,
              planningCode: this.planningCode,
              startDateTime: '',
              endDateTime: '',
              sundayFlag: 0,
              mondayFlag: 0,
              tuesdayFlag: 0,
              wednesdayFlag: 0,
              thursdayFlag: 0,
              fridayFlag: 0,
              saturdayFlag: 0,
              // G002.00.0 Update-Start
              // headerLogoFileName: "",
              /* KSD V001.000 DS */
              // headerLogoFileName: 'headerlogo' + '0' + this.planningCode + '.bmp',
              /* KSD V001.000 DE */
              /* KSD V001.000 AS */
              headerLogoFileName: 'headerlogo' + this.hasPlanningCode(this.planningCode) + '.bmp',
              /* KSD V001.000 AE */
              // G002.00.0 Update-End
              headerLogoHashValue: '',
              // G002.00.0 Update-Start
              // headerLogoBase64EncodedString: "",
              // itemDetails: true,
              headerLogoBase64EncodedString: defaultBase64,
              itemDetails: false,
              // G002.00.0 Update-End
              // G006.00.0 Update-Start
              // sellingPriceChangeMark: "",
              sellingPriceChangeMark: '?',
              // G006.00.0 Update-End
              // G002.00.0 Update-Start
              // taxClassification: true,
              // receiptInformation: 1,
              // ryosyuInformation: true,
              taxClassification: false,
              receiptInformation: 0,
              ryosyuInformation: false,
              // G002.00.0 Update-End
              ryosyuMessage_1: '',
              ryosyuMessage_2: '',
              ryosyuMessage_3: '',
              ryosyuMessage_4: '',
              ryosyuMessage_5: '',
              ryosyuMessage_6: '',
              ryosyuMessage_7: '',
              ryosyuMessage_8: '',
              ryosyuMessage_9: '',
              ryosyuMessage_10: '',
              ryosyuMessage_11: '',
              ryosyuMessage_12: '',
              companyCode: corpId
               /* KSD V001.000 AS */
              , receiptOrientation: 'vertical',
              searchBarcodePrint: false,
              commercialMessage_1: '',
              commercialMessage_2: '',
              commercialMessage_3: '',
              commercialMessage_4: '',
              commercialMessage_5: '',
              footerLogoFileName: 'footerlogo' + this.hasPlanningCode(this.planningCode) + '.bmp',
              footerLogoHashValue: '',
              footerLogoBase64EncodedString: defaultBase64,
              footerMessage_1: '',
              footerMessage_2: '',
              footerMessage_3: '',
              footerMessage_4: '',
              footerMessage_5: '',
              footerMessage_6: '',
              footerMessage_7: '',
              footerMessage_8: '',
              footerMessage_9: '',
              footerMessage_10: '',
              merchantName_1: '',
              merchantName_2: '',
              revenueStampLogoFileName: '',
              revenueStampLogoHashValue: '',
              revenueStampLogoBase64EncodedString: '',
              optionalComment: ['', '', '', '', ''],
              enterRoomQrCodeUrl: ''
               /* KSD V001.000 AE */
            }
          }
          // G001.00.0 Add-Start
          // G007.00.0 Update-Start
          // this.receiptType = 0
          this.receiptType = ''
          // G007.00.0 Update-End
          this.picUrl = this.setting.headerLogoBase64EncodedString ? this.setting.headerLogoBase64EncodedString : defaultBase64
          // G001.00.0 Add-End
        })
        .catch(error => {
          console.log(error)
          this.isProcessing = false
          // G011.00.0 Add-Start
          this.setting = null
          this.clearStoreCode(true)
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // G011.00.0 Add-End
        })
    },
    async onReceiptUpdate () {
      // G001.00.0 Add-Start
      if (!dateregex.test(this.timeFrom)) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b3.E003'), '', false, null, false, null)
        return
      }
      if (!dateregex.test(this.timeTo)) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b3.E004'), '', false, null, false, null)
        return
      }
      this.initErrorMessage()
      this.focusItem = null
      // G001.00.0 Add-End
      try {
        // G001.00.0 Delete-Start
        // if (!this.checkPlanningCode()) {
        //   return
        // }
        // G001.00.0 Delete-End
        var params = this.setting

        // G003.00.0 Update-Start
        // params.startDateTime = new Date(this.dateFrom + " " + this.timeFrom)
        // params.endDateTime = new Date(this.dateTo + " " + this.timeTo)
        const startDateStr = (this.dateFrom + ' ' + this.timeFrom).replace(/-/g, '/')
        const endDateStr = (this.dateTo + ' ' + this.timeTo).replace(/-/g, '/')
        params.startDateTime = new Date(startDateStr)
        params.endDateTime = new Date(endDateStr)
        // G003.00.0 Update-End
        // G001.00.0 Add-Start
        if (params.startDateTime && params.endDateTime) {
          if (params.startDateTime > params.endDateTime) {
            // G012.00.0 Update-Start
            // this.$refs.pop.open(3, '', this.$i18n.t('F322b3.E005'), '', false, null, false, null)
            this.$refs.pop.open(3, '', this.$i18n.t('F322b3.E006'), '', false, null, false, null)
            // G012.00.0 Update-End
            return
          }
        }
        // G001.00.0 Add-End
        // G004.00.0 Add-Start
        const isNotSelectedWeek = this.weekSelected.every((day) => !day)
        if (isNotSelectedWeek) {
          this.$refs.pop.open(3, '', this.$i18n.t('F322b3.W007'), '', false, null, false, null)
          return
        }
        // G004.00.0 Add-End
        params.sundayFlag = this.weekSelected[0] === true ? 1 : 0
        params.mondayFlag = this.weekSelected[1] === true ? 1 : 0
        params.tuesdayFlag = this.weekSelected[2] === true ? 1 : 0
        params.wednesdayFlag = this.weekSelected[3] === true ? 1 : 0
        params.thursdayFlag = this.weekSelected[4] === true ? 1 : 0
        params.fridayFlag = this.weekSelected[5] === true ? 1 : 0
        params.saturdayFlag = this.weekSelected[6] === true ? 1 : 0

        this.isProcessing = true

        const response = await axios.put(this.$i18n.t('prop.url') + updateReceiptDetail, params, commonUtils.methods.addApiHeader({}))

        const {result} = response.data

        if (result.code === 0) {
          // G001.00.0 Add-Start
          if (response.data.responseModel) {
            this.handleReceiptDetail(response.data.responseModel)
            // G007.00.0 Delete-Start
            // this.receiptType = 0
            // G007.00.0 Delete-End
            this.picUrl = this.setting.headerLogoBase64EncodedString ? this.setting.headerLogoBase64EncodedString : defaultBase64
          }
          // G001.00.0 Add-End
          // G001.00.0 Update-Start
          // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W002'), result.code, false, null, false, null)
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // G001.00.0 Update-End

        // G001.00.0 Add-Start
        } else if (result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        // G001.00.0 Add-End
        } else {
          let globalErrorMsg = result.errorMessageMap['global'].toString()
          this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      this.isProcessing = false
    },
    /* KSD V001.000 AS */
    hasPlanningCode (pCode) {
      if (pCode === null || !pCode) {
        return '00'
      }
      return pCode.toString().length < 2 ? `0${pCode}` : pCode
    },
    /* KSD V001.000 AE */
    // G001.00.0 Add-Start
    onReceiptClear () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.executeReceiptClear, false, null)
    },
    executeReceiptClear () {
      this.planningCode = null
      this.setting = null
      // G002.00.0 Update-Start
      // this.clearStoreCode()
      this.clearStoreCode(true)
      // G002.00.0 Update-End
      this.picUrl = defaultBase64
      // G008.00.0 Add-Start
      this.showFlag = false
      // G008.00.0 Add-End
    },
    onReceiptDestroy () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.executeReceiptDestroy, false, null)
    },
    async executeReceiptDestroy () {
      this.isProcessing = true

      var params = this.setting

      try {
        const response = await axios.post(this.$i18n.t('prop.url') + destroyReceiptDetail, params, commonUtils.methods.addApiHeader({}))

        if (response.data.result.code === 0 || response.data.result.code === 2) {
          // G014.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322b3.W003'), '', false, null, false, null)
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // G014.00.0 Update-End
          this.planningCode = null
          this.setting = null
          // G002.00.0 Update-Start
          // this.clearStoreCode()
          this.clearStoreCode(true)
          // G002.00.0 Update-End
          // G008.00.0 Add-Start
          this.showFlag = false
          // G008.00.0 Add-End
        } else if (response.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else {
          this.$refs.pop.open(3, '', response.data.result.errorMessageMap.global[0], response.data.result.code, false, null, false, null)
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }

      this.isProcessing = false
    },
    editRyosyuMessage () {
      this.$refs.ryosyuMessageDialog.open(this.setting)
    },
    /* KSD V001.000 AS */
    editReceiptCommercialMessage () {
      this.$refs.receiptCommercialMessageDialog.open(this.setting)
    },
    editEntranceSlipOptionalCommentDialog () {
      this.$refs.entranceSlipOptionalCommentDialog.open(this.setting)
    },
    editReceiptFooterMessage () {
      this.$refs.receiptFooterMessageDialog.open(this.setting)
    },
    editReceiptMerchant () {
      this.$refs.receiptMerchantNameDialog.open(this.setting)
    },
    editReceiptHorizontalSetting () {
      this.$refs.receiptHorizontalSettingDialog.open(this.setting)
    },
    editReceiptTaxOfficePrintingImageDialog () {
      this.$refs.receiptTaxOfficePrintingImageDialog.open(this.setting)
    },
    editEntranceSlipAdmissionTicketQrcodeDialog () {
      this.$refs.entranceSlipAdmissionTicketQrcodeDialog.open(this.setting)
    },
    editReceiptHorizontalPrintMessageDialog () {
      this.$refs.receiptHorizontalPrintMessageDialog.open(this.setting)
    },
    editReceiptDealSearchBarcode () {
      this.$refs.receiptDealSearchBarcodeDialog.open(this.setting)
    },
    editReceiptFooterLogo () {
      this.$refs.receiptFooterLogoDialog.open(this.setting)
    },
    /* KSD V001.000 AE */
    editRyosyuInformation () {
      this.$refs.ryosyuInformationDialog.open(this.setting)
    },
    editReceiptInformation () {
      this.$refs.receiptInformationDialog.open(this.setting)
    },
    editReceiptProduct () {
      this.$refs.receiptProductDialog.open(this.setting)
    },
    editReceiptHeaderLogo () {
      this.$refs.receiptHeaderLogoDialog.open(this.setting)
    },
    onEditDialogClickOk (setting) {
      this.setting = setting
    },
    onImgDialogClickOk (setting) {
      this.setting = setting
      this.picUrl = this.setting.headerLogoBase64EncodedString ? this.setting.headerLogoBase64EncodedString : defaultBase64
    },
    changedStore (storeIds) {
      this.targetStoreCodes = storeIds
      // G010.00.0 Update-Start
      // if (this.targetStoreCodes.length !== 0 && this.targetStoreCode !== this.targetStoreCodes[0]) {
      if (this.targetStoreCodes.length !== 0) {
      // G010.00.0 Update-End
        this.selectedReceiptDetail()
        // G015.00.0 Add-Start
        this.clearplanningCode(true)
        // G015.00.0 Add-End
      }
    },
    // G015.00.0 Add-Start
    clearplanningCode (clearPlanningCodeFlag) {
      if (clearPlanningCodeFlag && this.headquartersAuthority === 1) {
        this.planningCode = ''
        this.showFlag = false
      }
    },
    // G015.00.0 Add-Start
    selectedReceiptDetail () {
      if (this.planningCode && this.targetStoreCodes.length > 0) {
        this.targetStoreCode = this.targetStoreCodes[0]
        const node = this.targetStoreCodes[0]
        const corpId = node.substring(0, 15)
        const storeId = node.substring(15)
        this.getReceiptDetail(corpId, storeId)
      }
    },
    handleReceiptDetail (resultData) {
      this.setting = resultData
       /* KSD V001.000 AS */
      if (!this.setting.id) {
        this.setting.receiptOrientation = 'vertical'
        this.setting.searchBarcodePrint = false
        this.setting.commercialMessage_1 = ''
        this.setting.commercialMessage_2 = ''
        this.setting.commercialMessage_3 = ''
        this.setting.commercialMessage_4 = ''
        this.setting.commercialMessage_5 = ''
        this.setting.footerMessage_1 = ''
        this.setting.footerMessage_2 = ''
        this.setting.footerMessage_3 = ''
        this.setting.footerMessage_4 = ''
        this.setting.footerMessage_5 = ''
        this.setting.footerMessage_6 = ''
        this.setting.footerMessage_7 = ''
        this.setting.footerMessage_8 = ''
        this.setting.footerMessage_9 = ''
        this.setting.footerMessage_10 = ''
        this.setting.merchantName_1 = ''
        this.setting.merchantName_2 = ''
        this.setting.ryosyuMessage_1 = '',
        this.setting.ryosyuMessage_2 = '',
        this.setting.ryosyuMessage_3 = '',
        this.setting.ryosyuMessage_4 = '',
        this.setting.ryosyuMessage_5 = '',
        this.setting.ryosyuMessage_6 = '',
        this.setting.ryosyuMessage_7 = '',
        this.setting.ryosyuMessage_8 = '',
        this.setting.ryosyuMessage_9 = '',
        this.setting.ryosyuMessage_10 = '',
        this.setting.ryosyuMessage_11 = '',
        this.setting.ryosyuMessage_12 = '',
        this.setting.optionalComment = ['', '', '', '', '']
        this.setting.enterRoomQrCodeUrl = ''
        this.setting.footerLogoFileName = 'footerlogo' + this.hasPlanningCode(this.setting.planningCode) + '.bmp',
        this.setting.footerLogoHashValue = ''
        this.setting.footerLogoBase64EncodedString = defaultBase64
        this.setting.revenueStampLogoFileName = ''
        this.setting.revenueStampLogoHashValue = ''
        this.setting.revenueStampLogoBase64EncodedString = ''
      }
      /* KSD V001.000 AE */
      if (this.setting.startDateTime) {
        const dateFrom = moment(this.setting.startDateTime)
        this.dateFrom = dateFrom.format('YYYY-MM-DD')
        this.timeFrom = dateFrom.format('HH:mm')
      } else {
        this.dateFrom = ''
        this.timeFrom = '00:00'
      }
      if (this.setting.endDateTime) {
        const dateTo = moment(this.setting.endDateTime)
        this.dateTo = dateTo.format('YYYY-MM-DD')
        this.timeTo = dateTo.format('HH:mm')
      } else {
        this.dateTo = ''
        this.timeTo = '23:59'
      }
      this.$set(this.weekSelected, 0, this.setting.sundayFlag === 1)
      this.$set(this.weekSelected, 1, this.setting.mondayFlag === 1)
      this.$set(this.weekSelected, 2, this.setting.tuesdayFlag === 1)
      this.$set(this.weekSelected, 3, this.setting.wednesdayFlag === 1)
      this.$set(this.weekSelected, 4, this.setting.thursdayFlag === 1)
      this.$set(this.weekSelected, 5, this.setting.fridayFlag === 1)
      this.$set(this.weekSelected, 6, this.setting.saturdayFlag === 1)
    },
    // G002.00.0 Delete-Start
    // clearStoreCode () {
    //   if (this.headquartersAuthority === 1) {
    //     this.targetStoreCodes = []
    //     this.targetStoreCode = ''
    //   }
    // },
    // G002.00.0 Delete-End
    // G002.00.0 Add-Start
    clearStoreCode (clearStoreCodeFlag) {
      if (clearStoreCodeFlag && this.headquartersAuthority === 1) {
        this.targetStoreCodes = []
        this.targetStoreCode = ''
      }
    },
    // G002.00.0 Add-End
    // G001.00.0 Add-End
    onSelectHeaderLogoFile (event) {
      this.headerLogoFileName = event.target.files[0].name
    },
    toggleWeek (index) {
      this.$set(this.weekSelected, index, !this.weekSelected[index])
    },
    toggleAllWeek () {
      this.allWeekSelected = !this.allWeekSelected
    },
    // G001.00.0 Update-Start
    // async copyPlan (newPlanningCode) {
    //   try {
    //     var params = JSON.parse(JSON.stringify(this.setting))
    async copyPlan (data) {
      const { newPlanningCode, fromSetting } = data
      try {
        var params = JSON.parse(JSON.stringify(fromSetting))
        // G001.00.0 Update-End
        delete params.id
        delete params.version

        params.planningCode = newPlanningCode
        // G001.00.0 Add-Start
        params.headerLogoFileName = params.headerLogoFileName ? 'headerlogo' + '0' + params.planningCode + '.bmp' : ''
        // G001.00.0 Add-End
        // G001.00.0 Delete-Start
        // params.sundayFlag = this.weekSelected[0] === true ? 1 : 0
        // params.mondayFlag = this.weekSelected[1] === true ? 1 : 0
        // params.tuesdayFlag = this.weekSelected[2] === true ? 1 : 0
        // params.wednesdayFlag = this.weekSelected[3] === true ? 1 : 0
        // params.thursdayFlag = this.weekSelected[4] === true ? 1 : 0
        // params.fridayFlag = this.weekSelected[5] === true ? 1 : 0
        // params.saturdayFlag = this.weekSelected[6] === true ? 1 : 0
        // G001.00.0 Delete-End
        this.isProcessing = true

        const response = await axios.put(this.$i18n.t('prop.url') + updateReceiptDetail, params, commonUtils.methods.addApiHeader({}))

        const {result} = response.data

        if (result.code === 0) {
          // G001.00.0 Add-Start
          if (response.data.responseModel && this.planningCode === response.data.responseModel.planningCode + '') {
            this.handleReceiptDetail(response.data.responseModel)
            // G007.00.0 Delete-Start
            // this.receiptType = 0
            // G007.00.0 Delete-End
            this.picUrl = this.setting.headerLogoBase64EncodedString ? this.setting.headerLogoBase64EncodedString : defaultBase64
          }
          // G001.00.0 Add-End
          // G001.00.0 Update-Start
          // this.$refs.pop.open(1, '', '企画を保存しました。', result.code, false, null, false, null)
          this.$refs.pop.open(2, '', this.$i18n.t('F322b3.S052'), '', false, null, false, null)
          // G001.00.0 Update-End
        // G001.00.0 Add-Start
        } else if (result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        // G001.00.0 Add-End
        } else {
          let globalErrorMsg = result.errorMessageMap['global'].toString()
          this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }

      this.isProcessing = false
    },
    /* ----- サイドバー ----- */
    async backToTop () {
      this.$router.push('/TopPage')
    },
    // G009.00.0 Update-Start
    // onReceiptConfirm () {
    async onReceiptConfirm () {
    // G009.00.0 Update-End
      if (this.targetStoreCodes.length > 0) {
        const node = this.targetStoreCodes[0]

        const corpId = node.substring(0, 15)
        const storeId = node.substring(15)

        // G009.00.0 Delete-Start
        // this.$refs.receiptListDialog.open(corpId, storeId)
        // G009.00.0 Delete-End
        // G009.00.0 Add-Start
        let result = await this.getReceiptList(corpId, storeId)
        if (result && result.length > 0) {
          this.$refs.receiptListDialog.open(corpId, storeId, result)
        }
        // G009.00.0 Add-End
      }
    },
    // G009.00.0 Update-Start
    // onReceiptCopy () {
    async onReceiptCopy () {
    // G009.00.0 Update-End
      // G001.00.0 Delete-Start
      // if (this.targetStoreCodes.length > 0 && this.setting.id) {
      //   this.$refs.receiptCopyDialog.open()
      // G001.00.0 Delete-End
      // G001.00.0 Add-Start
      if (this.targetStoreCodes.length > 0) {
        const node = this.targetStoreCodes[0]
        const corpId = node.substring(0, 15)
        const storeId = node.substring(15)
        // G009.00.0 Delete-Start
        // this.$refs.receiptCopyDialog.open(corpId, storeId)
        // G009.00.0 Delete-End
        // G009.00.0 Add-Start
        let result = await this.getReceiptList(corpId, storeId)
        if (result && result.length > 0) {
          this.$refs.receiptCopyDialog.open(corpId, storeId, result)
        }
        // G009.00.0 Add-End
      // G001.00.0 Add-End
      } else {

      }
    },
    // G009.00.0 Add-Start
    async getReceiptList (corpId, storeId) {
      this.isProcessing = true
      let resultData = []
      try {
        let response = await axios.get(
          this.$i18n.t('prop.url') + ApiPath.ReceiptSetting.ReceiptList + '?companyCode=' + corpId + '&storeCode=' + storeId,
          commonUtils.methods.getApiHeader({})
        )
        this.isProcessing = false
        const {result} = response.data
        if (result.code === 0) {
          resultData = response.data.responseModel
        } else if (result.code === 2) {
          this.$refs.pop.open(2, '', this.$i18n.t('F322b3.W002'), '', false, null, false, null)
        } else if (result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322b3.W001'), '', false, null, false, null)
        }
      } catch (error) {
        console.log(error)
        this.isProcessing = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      return resultData
    },
    // G009.00.0 Add-End
    // G001.00.0 Add-Start
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    initErrorMessage () {
      this.planningCodeErrorMsg = ''
    },
    // G001.00.0 Add-End
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      this.planningCode = this.planningCode.toString().replace(/[^0-9]/gi, '')
    },
    numInputAlphaRegulation () {
      this.setting.sellingPriceChangeMark = this.setting.sellingPriceChangeMark.toString().replace(/[^a-zA-Z0-9!-/:-@¥[-`{-~]*$/gi, '')
    },
    onClickPlanLink (planCd) {
      this.$refs.receiptListDialog.closeDialog()
      this.planningCode = planCd
      // G002.00.0 Update-Start
      // this.onChangePlanCode()
      this.checkPlanningCode(false)
      // G002.00.0 Update-End
    },
    disabledFunc (date) {
      moment.locale('ja')
      let now = moment().subtract(1, 'd')
      let tmp = moment(date)
      return now.isAfter(tmp)
    },
    inputLimit (str, maxLength) {
      if (str == null) { return }
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
          if (this.setting.ryosyuMessage_1 == str) {
            this.setting.ryosyuMessage_1 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_2 == str) {
            this.setting.ryosyuMessage_2 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_3 == str) {
            this.setting.ryosyuMessage_3 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_4 == str) {
            this.setting.ryosyuMessage_4 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_5 == str) {
            this.setting.ryosyuMessage_5 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_6 == str) {
            this.setting.ryosyuMessage_6 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_7 == str) {
            this.setting.ryosyuMessage_7 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_8 == str) {
            this.setting.ryosyuMessage_8 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_9 == str) {
            this.setting.ryosyuMessage_9 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_10 == str) {
            this.setting.ryosyuMessage_10 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_11 == str) {
            this.setting.ryosyuMessage_11 = str.toString().substring(0, i)
          } else if (this.setting.ryosyuMessage_12 == str) {
            this.setting.ryosyuMessage_12 = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  },
  // G001.00.0 Add-Start
  async mounted () {
    // G012.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G012.00.0 Add-End
    this.$root.$on('getHeadquartersAuthority', (headquartersAuthority) => {
      this.headquartersAuthority = headquartersAuthority
    })
  },
  // G001.00.0 Add-End
  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322b3'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.initialize()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
