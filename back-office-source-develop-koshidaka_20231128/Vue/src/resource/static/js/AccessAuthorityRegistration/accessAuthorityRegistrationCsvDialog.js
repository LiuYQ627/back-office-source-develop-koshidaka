import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
// KSD V001.000 AS
import csvErrorDialog from '@/resource/templates/AccessAuthorityRegistration/AccessAuthorityRegistrationCsvErrorDialog'
// KSD V001.000 AE
const savePath = 'AccessAuthorityRegistration/Csv'
// KSD V001.000 AS
import permissionRoleUtils from '@/resource/static/js/AccessAuthorityRegistration/permissionRoleUtils'
const importFile = 'CsvConversionTasks/Import'
const csvTaskGetAPI = 'CsvConversionTasks/Get'
const csvExportTimerData = require('../../properties/csvExportTimer.json')
// KSD V001.000 AE

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230320  xu.jh(Neusoft)   G001.00.0  issue課題#1500を対応します.
 * 20230601  wangchunmei(Neusoft)   G002.00.0  issue課題#1728を対応します.
 */
// G002.00.0 Add-Start
const headerTitles = ['no', 'displayName', 'permissions']
// G002.00.0 Add-End
export default {
  // KSD V001.000 AS
  mixins: [permissionRoleUtils],
  // KSD V001.000 AE
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      registerAuth: true,
      selectedScanner: 0,
      authorityListSelect: [],
      authorityList1: [],
      authorityList2: [],
      authorityList3: [],
      authorityList4: [],
      authorityList5: [],
      authorityList6: [],
      authorityList7: [],
      authorityList8: [],
      authorityList9: [],
      authorityName1: '',
      authorityName2: '',
      authorityName3: '',
      authorityName4: '',
      authorityName5: '',
      authorityName6: '',
      authorityName7: '',
      authorityName8: '',
      authorityName9: '',
      workers: [],
      tabletDataList: { tabletModels: [] },
      scannerList: [
        { code: 1, name: this.$i18n.t('F00013.S019') },
        { code: 2, name: this.$i18n.t('F00013.S020') }
      ],
      nameErrorMsg: '',
      terminalTypeErrorMsg: '',
      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      dispFileName: '選択されていません'
      // KSD V001.000 AS
      ,globalTimeout: this.permissionsRolesCalc(csvExportTimerData.permissionsRoles),
      businessUnitCdStr: 0,
      toUploadfile: null
      // KSD V001.000 AE
    }
  },
  components: {
    popup
    // KSD V001.000 AS
    ,csvErrorDialog
    // KSD V001.000 AE
  },
  methods: {
    // KSD V001.000 DS
    // open (authorityListSelect, tabletDataList, refreshFunc, closeFunc) {
    // KSD V001.000 DE
    // KSD V001.000 AS
    open (authorityListSelect, tabletDataList, refreshFunc, closeFunc, businessUnitCdStr) {
    // KSD V001.000 AE
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.authorityListSelect = authorityListSelect
      this.workers = []
      this.registerAuth = true
      this.authorityList1 = []
      this.authorityList2 = []
      this.authorityList3 = []
      this.authorityList4 = []
      this.authorityList5 = []
      this.authorityList6 = []
      this.authorityList7 = []
      this.authorityList8 = []
      this.authorityList9 = []
      this.authorityName1 = ''
      this.authorityName2 = ''
      this.authorityName3 = ''
      this.authorityName4 = ''
      this.authorityName5 = ''
      this.authorityName6 = ''
      this.authorityName7 = ''
      this.authorityName8 = ''
      this.authorityName9 = ''
      if (this.$refs.fileSelect) {
        this.$refs.fileSelect.value = ''
      }
      this.dispFileName = '選択されていません'
      // KSD V001.000 AS
      this.businessUnitCdStr = businessUnitCdStr
      // KSD V001.000 AE
    },
    openEnd () {
      this.initErrorMessage()
    },
    btnclick () {
      this.$refs.fileSelect.click()
    },
    loadCsvFile (e) {
      this.workers = []
      // this.message = ""
      this.message = ''
      this.registerAuth = true
      this.dispFileName = '選択されていません'
      let file = e.target.files[0]
      // KSD V001.000 AS
      this.toUploadfile = e.target.files[0]
      let linesArr = []
      // KSD V001.000 AE
      // G002.00.0 Add-Start
      if (!file) {
        return
      }
      // G002.00.0 Add-End
      // if (!file.type.match("text/csv")) {
      // KSD V001.000 DS
      // if (!file.type.match('text/csv')) {
      //   let linesArr = []
      //   this.workers = linesArr
      //   // linesArr.push("CSVファイルを選択してください")
      //   linesArr.push('CSVファイルを選択してください')
      //   // this.workers = linesArr
      //   this.$set(this.workers, linesArr)
      //   return
      // }
      // KSD V001.000 DE
      // KSD V001.000 AS
      if (!file.type.match('text/csv') && !file.type.match('application/zip') && !file.type.match('application/zip-compressed') && !file.type.match('application/x-zip-compressed')) {
        this.workers = linesArr
        linesArr.push(this.$i18n.t('F32242.W005'))
        this.$set(this.workers, linesArr)
        return
      }
      const maxSizeBytes = 10 * 1024 * 1024
      if (this.toUploadfile.size > maxSizeBytes) {
        this.workers = linesArr
        linesArr.push(this.$i18n.t('F32242.E031'))
        this.$set(this.workers, linesArr)
        return
      }
      // KSD V001.000 AE

      // KSD V001.000 DS
      // let reader = new FileReader()
      // reader.readAsText(file)

      // reader.onload = function () {
      //   // let lines = reader.result.split("\n")
      //   let lines = reader.result.split('\n')
      //   // G002.00.0 Delete-Start
      //   // lines.shift()
      //   // G002.00.0 Delete-End
      //   this.authorityList1 = []
      //   this.authorityList2 = []
      //   this.authorityList3 = []
      //   this.authorityList4 = []
      //   this.authorityList5 = []
      //   this.authorityList6 = []
      //   this.authorityList7 = []
      //   this.authorityList8 = []
      //   this.authorityList9 = []
      //   this.authorityName1 = ''
      //   this.authorityName2 = ''
      //   this.authorityName3 = ''
      //   this.authorityName4 = ''
      //   this.authorityName5 = ''
      //   this.authorityName6 = ''
      //   this.authorityName7 = ''
      //   this.authorityName8 = ''
      //   this.authorityName9 = ''
      //   let linesArr = []
      //   let errArr = []
      //   let cnt = 0
      //   const isNumber = (value) => {
      //     return Number.isFinite(value)
      //   }
      //   // G002.00.0 Add-Start
      //   let newTitle = []
      //   // G002.00.0 Add-End
      //   for (let i = 0; i < lines.length; i++) {
      //     //        var item = lines[i].split(",");
      //     //        if(item != ""){
      //     //      if(item.length != 3){
      //     // errArr.push("設定項目数に誤りがあります。（" + (i+1) + "行目）");
      //     //      }else if(item[0].trim() != '1' && item[0].trim() != '2' && item[0].trim() != '3' && item[0].trim() != '4' && item[0].trim() != '5' && item[0].trim() != '6' && item[0].trim() != '7' && item[0].trim() != '8' && item[0].trim() != '9'){
      //     // errArr.push("役割No.に誤りがあります。（" + (i+1) + "行目）");
      //     //      //}else if(this.authorityListSelect.indexOf(item[1].trim()) == -1){
      //     //      //errArr.push("対象のロールが存在しませんでした。（" + (i+1) + "行目）");
      //     //      }else if(item[2].trim() != 'CLOUDPOS_REPORT_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_REPORT_OTHER_1' &&
      //     // item[2].trim() != 'CLOUDPOS_JOURNAL_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_JOURNAL_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_JOURNAL_OTHER_1' &&
      //     // item[2].trim() != 'CLOUDPOS_USER_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_USER_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_USER_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_USER_OTHER_1' &&
      //     // item[2].trim() != 'CLOUDPOS_ACCESS_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_ACCESS_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_ACCESS_OTHER_1' &&
      //     // item[2].trim() != 'CLOUDPOS_ACCESS_OTHER_2' &&
      //     // item[2].trim() != 'CLOUDPOS_STORE_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_STORE_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_STORE_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_DEVICE_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_DEVICE_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_DEVICE_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_STATUS_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_ITEM_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_ITEM_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_ITEM_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_ITEM_OTHER_1' &&
      //     // item[2].trim() != 'CLOUDPOS_ITEM_OTHER_2' &&
      //     // item[2].trim() != 'CLOUDPOS_PRESET_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_PRESET_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_PRESET_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_PRESET_OTHER_1' &&
      //     // item[2].trim() != 'CLOUDPOS_PRESET_OTHER_2' &&
      //     // item[2].trim() != 'CLOUDPOS_PRICE_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_PRICE_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_PRICE_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_PRICE_OTHER_1' &&
      //     // item[2].trim() != 'CLOUDPOS_BARCODE_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_BARCODE_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_BARCODE_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_TRANSACTION_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_TRANSACTION_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_TRANSACTION_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_REVENUE_STAMP_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_REVENUE_STAMP_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_REVENUE_STAMP_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_OPERATION_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_OPERATION_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_OPERATION_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_OPERATION_BTN_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_OPERATION_BTN_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_TIGHTENING_BTN_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_TIGHTENING_BTN_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_TIGHTENING_BTN_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_STORE_OPERATION_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_STORE_OPERATION_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_STORE_OPERATION_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_RECEIPT_EXECUTE' &&
      //     // item[2].trim() != 'CLOUDPOS_RECEIPT_DELETE' &&
      //     // item[2].trim() != 'CLOUDPOS_RECEIPT_UPDATE' &&
      //     // item[2].trim() != 'CLOUDPOS_RECEIPT_OTHER_1' &&
      //     // item[2].trim() != 'CLOUDPOS_RECEIPT_OTHER_2'){
      //     // errArr.push("対象の権限名が存在しませんでした。（" + (i+1) + "行目）");
      //     //      }else{
      //     // linesArr[i] = lines[i].split(",");
      //     // if(item[0].trim() == '1'){this.authorityList1.push(item[2].trim());this.authorityName1 = item[1].trim();}
      //     // if(item[0].trim() == '2'){this.authorityList2.push(item[2].trim());this.authorityName2 = item[1].trim();}
      //     // if(item[0].trim() == '3'){this.authorityList3.push(item[2].trim());this.authorityName3 = item[1].trim();}
      //     // if(item[0].trim() == '4'){this.authorityList4.push(item[2].trim());this.authorityName4 = item[1].trim();}
      //     // if(item[0].trim() == '5'){this.authorityList5.push(item[2].trim());this.authorityName5 = item[1].trim();}
      //     // if(item[0].trim() == '6'){this.authorityList6.push(item[2].trim());this.authorityName6 = item[1].trim();}
      //     // if(item[0].trim() == '7'){this.authorityList7.push(item[2].trim());this.authorityName7 = item[1].trim();}
      //     // if(item[0].trim() == '8'){this.authorityList8.push(item[2].trim());this.authorityName8 = item[1].trim();}
      //     // if(item[0].trim() == '9'){this.authorityList9.push(item[2].trim());this.authorityName9 = item[1].trim();}
      //     var item = lines[i].split(',')
      //     // G002.00.0 Add-Start
      //     if (i === 0) {
      //       for (let i = 0; i < item.length; i++) {
      //         newTitle.push(item[i].replaceAll('"', ''))
      //       }
      //       if (item.length !== 3) {
      //         errArr.push('設定項目に誤りがあります。CSVファイルを確認してください。（' + (i + 1) + '行目）')
      //       }
      //       headerTitles.forEach(function (element) {
      //         if (newTitle.indexOf(element) === -1) {
      //           errArr.push('設定項目に誤りがあります。CSVファイルを確認してください。(' + element + ')')
      //         }
      //       })
      //       if (errArr.length) {
      //         break
      //       }
      //       continue
      //     }
      //     // G002.00.0 Add-End
      //     if (item[0] && isNumber(Number(item[0]))) {
      //       if (item.length !== 3) {
      //         errArr.push('設定項目数に誤りがあります。（' + (i + 1) + '行目）')
      //       } else if (item[0].trim() !== '1' && item[0].trim() !== '2' && item[0].trim() !== '3' && item[0].trim() !== '4' && item[0].trim() !== '5' && item[0].trim() !== '6' && item[0].trim() !== '7' && item[0].trim() !== '8' && item[0].trim() !== '9') {
      //         errArr.push('役割No.に誤りがあります。（' + (i + 1) + '行目）')
      //         // G002.00.0 Add-Start
      //       } else if (item[1].trim() !== '' && this.getLen(item[1].trim()) > 20) {
      //         console.log(this.getLen(item[1].trim()))
      //         errArr.push('displayNameには全角10文字以内で設定してください。（' + (i + 1) + '行目）')
      //         // G002.00.0 Add-End
      //       } else if (item[2].trim() !== 'CLOUDPOS_REPORT_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_REPORT_OTHER_1' &&
      //       item[2].trim() !== 'CLOUDPOS_JOURNAL_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_JOURNAL_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_JOURNAL_OTHER_1' &&
      //       item[2].trim() !== 'CLOUDPOS_USER_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_USER_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_USER_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_USER_OTHER_1' &&
      //       item[2].trim() !== 'CLOUDPOS_ACCESS_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_ACCESS_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_ACCESS_OTHER_1' &&
      //       item[2].trim() !== 'CLOUDPOS_ACCESS_OTHER_2' &&
      //       item[2].trim() !== 'CLOUDPOS_STORE_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_STORE_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_STORE_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_DEVICE_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_DEVICE_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_DEVICE_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_STATUS_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_ITEM_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_ITEM_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_ITEM_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_ITEM_OTHER_1' &&
      //       item[2].trim() !== 'CLOUDPOS_ITEM_OTHER_2' &&
      //       item[2].trim() !== 'CLOUDPOS_PRESET_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_PRESET_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_PRESET_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_PRESET_OTHER_1' &&
      //       item[2].trim() !== 'CLOUDPOS_PRESET_OTHER_2' &&
      //       item[2].trim() !== 'CLOUDPOS_PRICE_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_PRICE_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_PRICE_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_PRICE_OTHER_1' &&
      //       item[2].trim() !== 'CLOUDPOS_BARCODE_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_BARCODE_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_BARCODE_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_TRANSACTION_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_TRANSACTION_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_TRANSACTION_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_REVENUE_STAMP_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_REVENUE_STAMP_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_REVENUE_STAMP_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_OPERATION_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_OPERATION_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_OPERATION_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_OPERATION_BTN_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_OPERATION_BTN_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_TIGHTENING_BTN_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_TIGHTENING_BTN_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_TIGHTENING_BTN_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_STORE_OPERATION_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_STORE_OPERATION_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_STORE_OPERATION_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_RECEIPT_EXECUTE' &&
      //       item[2].trim() !== 'CLOUDPOS_RECEIPT_DELETE' &&
      //       item[2].trim() !== 'CLOUDPOS_RECEIPT_UPDATE' &&
      //       item[2].trim() !== 'CLOUDPOS_RECEIPT_OTHER_1' &&
      //       item[2].trim() !== 'CLOUDPOS_RECEIPT_OTHER_2') {
      //         errArr.push('対象の権限名が存在しませんでした。（' + (i + 1) + '行目）')
      //       } else {
      //         linesArr[i] = lines[i].split(',')
      //         if (item[0].trim() === '1') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName1 && this.authorityName1 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList1.push(item[2].trim())
      //             this.authorityName1 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList1.push(item[2].trim())
      //           // this.authorityName1 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         if (item[0].trim() === '2') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName2 && this.authorityName2 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList2.push(item[2].trim())
      //             this.authorityName2 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList2.push(item[2].trim())
      //           // this.authorityName2 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         if (item[0].trim() === '3') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName3 && this.authorityName3 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList3.push(item[2].trim())
      //             this.authorityName3 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList3.push(item[2].trim())
      //           // this.authorityName3 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         if (item[0].trim() === '4') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName4 && this.authorityName4 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList4.push(item[2].trim())
      //             this.authorityName4 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList4.push(item[2].trim())
      //           // this.authorityName4 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         if (item[0].trim() === '5') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName5 && this.authorityName5 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList5.push(item[2].trim())
      //             this.authorityName5 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList5.push(item[2].trim())
      //           // this.authorityName5 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         if (item[0].trim() === '6') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName6 && this.authorityName6 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList6.push(item[2].trim())
      //             this.authorityName6 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList6.push(item[2].trim())
      //           // this.authorityName6 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         if (item[0].trim() === '7') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName7 && this.authorityName7 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList7.push(item[2].trim())
      //             this.authorityName7 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList7.push(item[2].trim())
      //           // this.authorityName7 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         if (item[0].trim() === '8') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName8 && this.authorityName8 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList8.push(item[2].trim())
      //             this.authorityName8 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList8.push(item[2].trim())
      //           // this.authorityName8 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         if (item[0].trim() === '9') {
      //           // G002.00.0 Add-Start
      //           if (this.authorityName9 && this.authorityName9 !== item[1].trim()) {
      //             errArr.push('CSVファイルのロール名称をご確認ください。（' + (i + 1) + '行目）')
      //           } else {
      //             this.authorityList9.push(item[2].trim())
      //             this.authorityName9 = item[1].trim()
      //           }
      //           // G002.00.0 Add-End
      //           // G002.00.0 Delete-Start
      //           // this.authorityList9.push(item[2].trim())
      //           // this.authorityName9 = item[1].trim()
      //           // G002.00.0 Delete-End
      //         }
      //         cnt++
      //       }
      //     }
      //   }
      //   this.workers = errArr
      //   // if(errArr.length == 0 && cnt > 0){
      //   if (errArr.length === 0 && cnt > 0) {
      //     this.registerAuth = false
      //     this.dispFileName = file.name
      //   // G002.00.0 Add-Start
      //   } else {
      //     this.authorityList1 = []
      //     this.authorityList2 = []
      //     this.authorityList3 = []
      //     this.authorityList4 = []
      //     this.authorityList5 = []
      //     this.authorityList6 = []
      //     this.authorityList7 = []
      //     this.authorityList8 = []
      //     this.authorityList9 = []
      //     this.authorityName1 = ''
      //     this.authorityName2 = ''
      //     this.authorityName3 = ''
      //     this.authorityName4 = ''
      //     this.authorityName5 = ''
      //     this.authorityName6 = ''
      //     this.authorityName7 = ''
      //     this.authorityName8 = ''
      //     this.authorityName9 = ''
      //   }
      //   // G002.00.0 Add-End
      // }.bind(this)
      // KSD V001.000 DE
      // KSD V001.000 AS
      if (file.type.match('application/zip') || file.type.match('application/zip-compressed') || file.type.match('application/x-zip-compressed') || file.type.match('text/csv')) {
        this.registerAuth = false
        this.dispFileName = file.name
      }
      // KSD V001.000 AE
    },
    // G002.00.0 Add-Start
    getLen (str) {
      let count = 0
      if (str) {
        for (var i = 0; i < str.length; i++) {
          let c = str.charCodeAt(i)
          if ((c >= 0x0 && c <= 0x00ff) || (c >= 0xFF61 && c <= 0xFF9F) || (c >= 0xFFE8 && c <= 0xFFEE)) {
            count++ // 半角
          } else {
            count += 2 // 全角
          }
        }
      }
      return count
    },
    // G002.00.0 Add-End
    onClickReturn () {
      this.popupConfirm()
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    // async onClickSave () {
    onClickSave () {
      // KSD V001.000 DS
      // this.$refs.pop.open(1, '', 'CSVファイルを入力します。よろしいですか？', '', true, this.runCSV, false, null)
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$refs.pop.open(1, '', this.$i18n.t('F32242.W002'), '', true, this.importCSV, false, null)
      // KSD V001.000 AE
    },
    // KSD V001.000 DS
    // async runCSV () {
    //   this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
    //   if (await this.executeSave() === true) {
    //     this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
    //     this.dialog = false
    //   // this.$router.go({path: this.$router.currentRoute.path, force: true})
    //   }
    // },
    // KSD V001.000 DE
    // KSD V001.000 AS
    async importCSV () {
      const formData = new FormData();
      formData.append('file', this.toUploadfile);
      formData.append('targetCollection', 'PERMISSIONS_ROLES');
      formData.append('companyCode', this.businessUnitCdStr);
      formData.append('fileName', this.dispFileName);
      try {
        this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
        const response = await axios.post(
          this.$i18n.t('prop.url') + importFile,
          formData,
          commonUtils.methods.getApiHeader()
        )
        if (response.data.result.code === 0) {
          const { id } = response.data.responseModel
          this.globalTimeout = this.permissionsRolesCalc(csvExportTimerData.permissionsRoles)
          await this.eventTimeout({ id })
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
    },
    recordDuration (start) {
      if (!start) return Date.now()
      return Date.now() - start
    },
    async eventTimeout ({ id }) {
      const vue = this
      const requestPromise = new Promise( async(resolve, reject) => {
        try {
          this.globalStartTime = this.recordDuration()
          const response = await axios.post(
            `${this.$i18n.t('prop.url')}${csvTaskGetAPI}`,
            {
              taskId: id
            },
            commonUtils.methods.getApiHeader()
          )
          if (response.data.result.code === 0 || response.data.result.code === -2 || response.data.result.code === 3 || response.data.result.code === -3) {
            const { status } = response.data.responseModel
            const data = response.data.responseModel
            const { errors } = data
            const opts = {
              suggestedName: data.fileName
            }

            if (status === 'EXECUTING') {
              const timeoutDuration = 1000
              const result = this.recordDuration(this.globalStartTime)
              this.globalTimeout -= result + timeoutDuration
              if (this.globalTimeout > 0) {
                this.timeout = setTimeout(() => {
                  vue.eventTimeout({ id })
                }, timeoutDuration)
              } else {
                this.$refs.pop.open(3, '',  this.$i18n.t('F32242.E026'), '', false, () => {
                  this.popupConfirm()
                }, false, null)
              }
            } else if (status === 'COMPLETE') {
              clearTimeout(this.timeout)
              resolve({ data })
            } else if (status === 'ERROR') {
              this.$refs.pop.closeFunction()
              this.$refs.csvErrorDialog.open(() => {
                this.popupConfirm()
              }, -3, errors)
            } else if (status === 'COMPLETE_WITH_ERROR') {
              this.$refs.pop.closeFunction()
              this.$refs.csvErrorDialog.open(() => {
                this.popupConfirm()
              }, -2, errors)
            } else  {
              this.$refs.pop.open(3, '',  this.$i18n.t('F32242.E026'), response.data.result.code, false, () => {
                this.popupConfirm()
              }, false, null)
            }
          } else if (response.data.result.code === -10) {
            this.$refs.pop.open(3, '',  this.$i18n.t('F32242.E023'), response.data.result.code, false, () => {
              this.popupConfirm()
            }, false, null)
          } else if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
          } else  {
            this.$refs.pop.open(3, '',  this.$i18n.t('F32242.E026'), response.data.result.code, false, () => {
              this.popupConfirm()
            }, false, null)
          }
        } catch (error) {
          reject(error)
        }
      })
      requestPromise.then(({ data }) => {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => {
          this.popupConfirm()
        }, false, null)
      }, (reject) => {
        console.error({ reject })
      })
    },
    // KSD V001.000 AE
    async executeSave () {
      var result = false
      try {
        const params = {
          authorityList1: this.authorityList1,
          authorityList2: this.authorityList2,
          authorityList3: this.authorityList3,
          authorityList4: this.authorityList4,
          authorityList5: this.authorityList5,
          authorityList6: this.authorityList6,
          authorityList7: this.authorityList7,
          authorityList8: this.authorityList8,
          authorityList9: this.authorityList9,
          authorityName1: this.authorityName1,
          authorityName2: this.authorityName2,
          authorityName3: this.authorityName3,
          authorityName4: this.authorityName4,
          authorityName5: this.authorityName5,
          authorityName6: this.authorityName6,
          authorityName7: this.authorityName7,
          authorityName8: this.authorityName8,
          authorityName9: this.authorityName9
        }
        // 保存
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
          this.$emit('changeName')
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        // G001.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F00001.E005'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // G001.00.0 Update-End
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
        // KSD V001.000 DS
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, () => {
          this.popupConfirm()
        }, false, null)
        // KSD V001.000 AE
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
    }
  }
}
