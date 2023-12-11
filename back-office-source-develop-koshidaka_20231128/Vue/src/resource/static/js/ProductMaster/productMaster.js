/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230103  bai.ry(Neusoft)  G001.00.0  issue課題#699を対応します.
 * 20230103  litie(Neusoft)   G002.00.0  issue課題#1038を対応します.
 * 20230313  xu.jh(Neusoft)   G003.00.0  issue課題#1693を対応します.
 * 20230320  xu.jh(Neusoft)   G004.00.0  issue課題#1500を対応します.
 * 20230413  wangchunmei(Neusoft)   G005.00.0  issue課題#908を対応します.
 * 20230424  bai.ry(Neusoft)   G006.00.0  issue課題#1696を対応します.
 * 20230423  dingxin(Neusoft) G007.00.0  issue課題#1662を対応します.
 * 20230615  wangchunmei(Neusoft)  G008.00.0  issue課題#1639を対応します.
 * 20230630  qinshh(Neusoft)  G009.00.0  issue課題#1647を対応します.
 * 20230719  qinshh(Neusoft)  G010.00.0  issue課題#903を対応します.
 * 20230724  qinshh(Neusoft)  G011.00.0  issue課題#975を対応します.
 */
import axios from 'axios'
// import encoding from 'encoding-japanese';
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/ProductMaster/ProductEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
// KSD V001.000 DS
// import csvDialog from '@/resource/templates/ProductMaster/ProductCsvDialog'
// KSD V001.000 DE

const queryPath = 'ProductMaster/ProductQuery'
const searchPath = 'ProductMaster/ProductSearch'
const queryPathV2 = 'ProductMaster/ProductQuery/limit'
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'
// KSD V001.000 AS
const taxQuery = 'TaxTaxes/Query'
// KSD V001.000 AE

export default {
  name: 'productMaster',
  data () {
    return {
      // G007.00.0 Add-Start
      permissions: [],
      // G007.00.0 Add-End
      dispDataList: [],
      findDataList: [],
      tabletDataList: [],
      resultCount: 0,
      headquartersAuthority: 0,
      targetStoreCd: 0,
      targetStoreText: '',
      productIdData: '',
      searchData: '',
      lastSearchData: '',
      editDlgOpen: false,
      operationLock: true,
      operationLockStore: true,
      // KSD V001.000 DS
      // iscsvInputBtn: true,
      // iscsvOutputBtn: false,
      // KSD V001.000 DE
      masters: {},
      initialized: false,
      // KSD V001.000 DS
      // csvDlgOpen: false,
      // csvFlg: false,
      // csvInFlg: false,
      // KSD V001.000 DE
      // G001.00.0 Update-Start
      // showMaxLengthTip:false,
      searchedFlg: false,
      // G001.00.0 Update-End
      searchParams: {},
      // KSD V001.000 AS
      businessUnitCdStr: null,
      timeout: null,
      // KSD V001.000 AE
      itemListLimit: 50
    }
  },
  components: {
    maintButton,
    editDialog,
    // KSD V001.000 DS
    // csvDialog,
    // KSD V001.000 DE
    popup,
    dialogStoreSelect
  },
  computed: {
    // KSD V001.000 DS
    // disabledCsvInputBtn () {
    //   // G007.00.0 Update-Start
    //   // return !this.csvInFlg
    //   return !this.csvInFlg || !this.permissions.includes('CLOUDPOS_ITEM_OTHER_1')
    //   // G007.00.0 Update-End
    // },
    // disabledCsvOutputBtn () {
    //   // G007.00.0 Update-Start
    //   // return !this.csvFlg
    //   return !this.csvFlg || !this.permissions.includes('CLOUDPOS_ITEM_OTHER_2')
    //   // G007.00.0 Update-End
    // }
    // KSD V001.000 DE
  },
  methods: {
    async initialize () {
      if (this.initialized) return
      this.initialized = true
      // KSD V001.000 DS
      // this.csvFlg = false
      // this.csvInFlg = false
      // KSD V001.000 DE
      // if (await this.getProduct() === false) return
      // G002.00.0 Update-Start
      if (this.targetStoreCd) {
        // G001.00.0 Add-Start
        if (await this.getItemListLimit(this.targetStoreCd) === false) return
        // G001.00.0 Add-End
        // G001.00.0 Update-Start
        // if (await this.getProduct() === false) return
        if (await this.getProduct(this.itemListLimit + 1) === false) return
        // G001.00.0 Update-End
        // KSD V001.000 AS
        this.getTaxRates(this.businessUnitCdStr)
        // KSD V001.000 AE
      }
      // G002.00.0 Update-End
      // G009.00.0 Delete-Add
      // if (this.headquartersAuthority === 1) {
      // G009.00.0 Delete-End
      if (await this.getMasters() === false) {
        this.findDataList = []
        this.dispDataList = []
        this.resultCount = 0
        return
      }
      // KSD V001.000 DS
      // await this.setStore(this.targetStoreCd)
      // // G009.00.0 Delete-Add
      // // }
      // // G009.00.0 Delete-End
      // //      this.operationLock = false
      // this.operationLock = true
      // KSD V001.000 DE
      // KSD V001.000 AS
      if (this.headquartersAuthority === 1) {
        this.operationLock = true
      }
      // KSD V001.000 AE
    },
    // KSD V001.000 DS
    // G002.00.0 Add-Start
    // async initializeAfterCsvInput () {
    //   // CS #1139
    //   // this.initialized = false
    //   // this.targetStoreCd = null
    //   // this.findDataList = []
    //   // this.dispDataList = []
    //   // this.resultCount = 0
    //   // this.initialize()
    //   // CE #1139
    //   this.refresh()
    // },
    // G002.00.0 Add-End
    // /** CSV入力ボタン */
    // async csvInput () {
    //   this.importCsv()
    //   // this.$refs.pop.open(1, '', 'CSVファイルを入力します。よろしいですか？', '', true, this.importCsv, false, null)
    // },
    // /** CSV出力ボタン */
    // async csvOutput () {
    //   this.$refs.pop.open(1, '', 'CSVファイルを出力します。よろしいですか？', '', true, this.runCSV, false, null)
    // },
    // async runCSV () {
    //   const params = { nodeId: this.targetStoreCd }
    //   // G003.00.0 Add-Start
    //   try {
    //     let response = await axios.get(this.$i18n.t('prop.url') + queryPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
    //     // G003.00.0 Add-End
    //     this.$refs.pop.closeFunction()

    //     //    if (response.data.result.code === 0) {
    //     if (response.data.result.code === 2) {
    //     // 2:該当する商品情報なし
    //       this.$refs.pop.open(3, '', 'CSV出力対象の登録データがありません。', 404, false, null, false, null)
    //     } else if (response.data.result.code === -10) { // G003.00.0 Add-Start
    //       this.$refs.pop.open(3, '', '通信に失敗しました。ネットワークの接続を確認してください。', '', false, null, false, null)
    //     } else if (response.data.result.code === 0) { // G003.00.0 Add-End
    //       // 正常
    //       /*      var csv = '"skuId","kanji","kana","receipt","receiptPrint","productTaxCodes","unitPrice","price","manufacturerPrice","productClassification","ageToBuy","discountable","priceOverrideAllowed","subTotaldiscountable","priceRequired","paymentExclusions","dutyFreeClassification","startDate","endDate","notForSale"\n'
    //         //this.findDataList = response.data.responseModel
    //         for(var i=0 ; i<response.data.responseModel.length; i++){
    //         csv += response.data.responseModel[i].skuId + ','
    //         if(response.data.responseModel[i].catalogs.displayName != null && response.data.responseModel[i].catalogs.displayName.kanji !=null){
    //         csv += '"' + response.data.responseModel[i].catalogs.displayName.kanji + '",'
    //         }else{
    //         csv += '"' + '",'
    //         }
    //         if(response.data.responseModel[i].catalogs.displayName != null && response.data.responseModel[i].catalogs.displayName.kana !=null){
    //         csv += '"' + response.data.responseModel[i].catalogs.displayName.kana + '",'
    //         }else{
    //         csv += '"' + '",'
    //         }
    //         if(response.data.responseModel[i].catalogs.displayName != null && response.data.responseModel[i].catalogs.displayName.receipt !=null){
    //         csv += '"' + response.data.responseModel[i].catalogs.displayName.receipt + '",'
    //         }else{
    //         csv += '"' + '",'
    //         }
    //         csv += response.data.responseModel[i].catalogs.receiptPrint + ','
    //         if(response.data.responseModel[i].catalogs.productTaxCodes != null){
    //         csv += '"' + response.data.responseModel[i].catalogs.productTaxCodes[0] + '",'
    //         }else{
    //         csv += '"' + '",'
    //         }
    //         if(response.data.responseModel[i].pricelists != null && response.data.responseModel[i].pricelists.unitPrice !=null){
    //         csv += response.data.responseModel[i].pricelists.unitPrice + ','
    //         }else{
    //         csv += ','
    //         }
    //         if(response.data.responseModel[i].pricelists != null && response.data.responseModel[i].pricelists.price !=null){
    //         csv += response.data.responseModel[i].pricelists.price + ','
    //         }else{
    //         csv += ','
    //         }
    //         if(response.data.responseModel[i].pricelists != null && response.data.responseModel[i].pricelists.manufacturerPrice !=null){
    //         csv += response.data.responseModel[i].pricelists.manufacturerPrice + ','
    //         }else{
    //         csv += ','
    //         }
    //         csv += response.data.responseModel[i].catalogs.productClassification + ','
    //         csv += response.data.responseModel[i].catalogs.ageToBuy + ','
    //         csv += response.data.responseModel[i].catalogs.discountable + ','
    //         csv += response.data.responseModel[i].catalogs.priceOverrideAllowed + ','
    //         csv += response.data.responseModel[i].catalogs.subTotalDiscountable + ','
    //         csv += response.data.responseModel[i].catalogs.priceRequired + ','
    //         if(response.data.responseModel[i].catalogs.paymentRestrictions != null && response.data.responseModel[i].catalogs.paymentRestrictions.paymentTypeExclusions != null && response.data.responseModel[i].catalogs.paymentRestrictions.paymentTypeExclusions.length > 0){
    //         csv += response.data.responseModel[i].catalogs.paymentRestrictions.paymentTypeExclusions[0].paymentType + ','
    //         }else{
    //         csv += ','
    //         }
    //         csv += response.data.responseModel[i].catalogs.dutyFreeClassification + ','
    //         if(response.data.responseModel[i].pricelists != null && response.data.responseModel[i].pricelists.startDate !=null){
    //         csv += '"' + response.data.responseModel[i].pricelists.startDate + '",'
    //         }else{
    //         csv += '"' + '",'
    //         }
    //         if(response.data.responseModel[i].pricelists != null && response.data.responseModel[i].pricelists.endDate !=null){
    //         csv += '"' + response.data.responseModel[i].pricelists.endDate + '",'
    //         }else{
    //         csv += '"' + '",'
    //         }
    //         if(response.data.responseModel[i].catalogs != null && response.data.responseModel[i].catalogs.notForSale !=null){
    //         csv += response.data.responseModel[i].catalogs.notForSale + '\n'
    //         }else{
    //         csv += '\n'
    //         }
    //         csv = csv.replaceAll("null", "")
    //         csv = csv.replaceAll("undefined", "")
    //         }
    //         //str = Encoding.stringToCode(csv);
    //           //convert = Encoding.convert(str, 'sjis', 'unicode');
    //         //u8a = new Uint8Array(convert);
    //         //var blob =new Blob([u8a],{type:"text/csv"});
    //       //  var blob =new Blob([csv],{type:"text/csv"});
    //       //  var link =document.createElement('a');
    //       //  link.href = URL.createObjectURL(blob);
    //       //  link.download ="商品マスタ登録.csv";
    //       //  link.click();
    //       */
    //       let headerTitles = [
    //         //          'skuId', 'kanji', 'kana', 'receipt', 'receiptPrint', 'productTaxCodes', 'unitPrice', 'price', 'manufacturerPrice',
    //         'skuId', 'kanji', 'kana', 'receipt', 'receiptPrint', 'productTaxCodes', 'price', 'unitPrice', 'manufacturerPrice',
    //         'productClassification', 'ageToBuy', 'discountable', 'priceChangeOperation', 'subTotalDiscountable',
    //         'priceRequired', 'paymentTypeExclusions', 'dutyFreeClassification',
    //         'startDate', 'endDate', 'notForSale'
    //       ]
    //       let csv = headerTitles.join(',') + '\n'
    //       csv += response.data.responseModel.map(function (src) {
    //         return headerTitles.map(function (item) {
    //           let val = ''
    //           switch (item) {
    //             case 'kanji':
    //             case 'kana':
    //             case 'receipt':
    //               if ((typeof src.catalogs.displayName !== 'undefined') && (src.catalogs.displayName[item] != null)) {
    //                 val = src.catalogs.displayName[item]
    //               }
    //               break
    //             case 'productTaxCodes':
    //               if ((typeof src.catalogs.productTaxCodes !== 'undefined') && (src.catalogs.productTaxCodes != null)) {
    //                 val = src.catalogs.productTaxCodes[0]
    //               }
    //               break
    //             case 'unitPrice':
    //             case 'price':
    //             case 'manufacturerPrice':
    //               if ((typeof src.pricelists[item] !== 'undefined') && (src.pricelists[item] != null)) {
    //                 val = src.pricelists[item]
    //               }
    //               break
    //             case 'paymentTypeExclusions':
    //               if ((typeof src.catalogs.paymentRestrictions.paymentTypeExclusions !== 'undefined') &&
    //               (src.catalogs.paymentRestrictions.paymentTypeExclusions !== null) &&
    //               (src.catalogs.paymentRestrictions.paymentTypeExclusions.length > 0)) {
    //                 val = src.catalogs.paymentRestrictions.paymentTypeExclusions.flatMap(e => (e.paymentType !== null && e.paymentType !== '') ? e.paymentType : []).join(';')
    //               }
    //               break
    //             case 'startDate':
    //             case 'endDate':
    //               if ((typeof src.catalogs.allowableTimeOfSale !== 'undefined') &&
    //               (src.catalogs.allowableTimeOfSale !== null) &&
    //               (src.catalogs.allowableTimeOfSale[item] !== null)) {
    //                 val = src.catalogs.allowableTimeOfSale[item]
    //               }
    //               break
    //             case 'receiptPrint':
    //             case 'discountable':
    //             case 'priceChangeOperation':
    //             case 'subTotalDiscountable':
    //             case 'priceRequired':
    //             case 'notForSale':
    //               if ((typeof src.catalogs[item] === 'undefined') || (src.catalogs[item] === null) || src.catalogs[item] === '') {
    //                 val = 'false'
    //               } else {
    //                 val = (src.catalogs[item]) ? 'true' : 'false'
    //               }
    //               break
    //             case 'ageToBuy':
    //             case 'dutyFreeClassification':
    //             case 'productClassification':
    //               if ((typeof src.catalogs[item] !== 'undefined') && (src.catalogs[item] !== null)) {
    //                 val = src.catalogs[item].toString()
    //               }
    //               break
    //             default:
    //               if ((typeof src[item] !== 'undefined') && (src[item] !== null)) {
    //               // val = src[item]
    //                 val = src[item].toString()
    //               }
    //               break
    //           }
    //           return (isNaN(val) && (val !== '')) ? '"' + val + '"' : val
    //         }).join(',')
    //       }).join('\n')
    //       // var csv = '"skuId","kanji","kana","receipt","receiptPrint","productTaxCodes","unitPrice","price","manufacturerPrice","productClassification","ageToBuy","discountable","priceOverrideAllowed","subTotaldiscountable","priceRequired","paymentExclusions","dutyFreeClassification","startDate","endDate","notForSale"\n'
    //       /* for (let i = 0; i < response.data.responseModel.length; i++) {
    //         let src = response.data.responseModel[i]
    //         csv += src.skuId + ','
    //         if (src.catalogs.displayName != null && src.catalogs.displayName.kanji != null) {
    //           csv += '"' + src.catalogs.displayName.kanji + '"'
    //         }
    //         csv += ','
    //         if (src.catalogs.displayName != null && src.catalogs.displayName.kana != null) {
    //           csv += '"' + src.catalogs.displayName.kana + '"'
    //         }
    //         csv += ','
    //         if (src.catalogs.displayName != null && src.catalogs.displayName.receipt != null) {
    //           csv += '"' + src.catalogs.displayName.receipt + '"'
    //         }
    //         csv += ','
    //         csv += src.catalogs.receiptPrint + ','
    //         if (src.catalogs.productTaxCodes != null) {
    //           csv += '"' + src.catalogs.productTaxCodes[0] + '"'
    //         }
    //         csv += ','
    //         if (src.pricelists != null && src.pricelists.unitPrice != null) {
    //           csv += src.pricelists.unitPrice
    //         }
    //         csv += ','
    //         if (src.pricelists != null && src.pricelists.price != null) {
    //           csv += src.pricelists.price
    //         }
    //         csv += ','
    //         if (src.pricelists != null && src.pricelists.manufacturerPrice != null) {
    //           csv += src.pricelists.manufacturerPrice
    //         }
    //         csv += ','
    //         csv += src.catalogs.productClassification + ','
    //         csv += src.catalogs.ageToBuy + ','
    //         csv += src.catalogs.discountable + ','
    //         src.catalogs.priceChangeOperation = (src.catalogs.priceChangeOperation) ? 'true' : 'false'
    //         csv += src.catalogs.priceChangeOperation + ','
    //         csv += src.catalogs.subTotalDiscountable + ','
    //         csv += src.catalogs.priceRequired + ','
    //         if (src.catalogs.paymentRestrictions != null && src.catalogs.paymentRestrictions.paymentTypeExclusions != null && src.catalogs.paymentRestrictions.paymentTypeExclusions.length > 0) {
    //           let paymentTypeExclusions = ''
    //           for (let j = 0; j < src.catalogs.paymentRestrictions.paymentTypeExclusions.length; j++) {
    //             if (paymentTypeExclusions !== '') {
    //               paymentTypeExclusions += ';'
    //             }
    //             paymentTypeExclusions += '"' + src.catalogs.paymentRestrictions.paymentTypeExclusions[j].paymentType + '"'
    //           }
    //           csv += paymentTypeExclusions
    //         }
    //         csv += ','
    //         csv += src.catalogs.dutyFreeClassification + ','
    //         if (src.pricelists != null && src.pricelists.startDate != null) {
    //           csv += '"' + src.pricelists.startDate + '"'
    //         }
    //         csv += ','
    //         if (src.pricelists != null && src.pricelists.endDate != null) {
    //           csv += '"' + src.pricelists.endDate + '"'
    //         }
    //         csv += ','
    //         if (src.catalogs != null && src.catalogs.notForSale != null) {
    //           csv += src.catalogs.notForSale
    //         }
    //         csv += '\n'
    //         csv = csv.replaceAll('null', '')
    //         csv = csv.replaceAll('undefined', '')
    //       }
    //       */
    //       let dt = new Date()
    //       const filename = dt.getFullYear() + ('00' + (dt.getMonth() + 1)).slice(-2) + ('00' + (dt.getDate())).slice(-2) +
    //       ('00' + (dt.getHours())).slice(-2) + ('00' + (dt.getMinutes())).slice(-2) + ('00' + (dt.getSeconds())).slice(-2) + '_商品マスタ登録'

    //       let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    //       const opts = {
    //         suggestedName: filename,
    //         types: [
    //           {
    //             description: 'CSV file',
    //             accept: { 'text/csv': ['.csv'] }
    //           }
    //         ]
    //       }
    //       let err = false
    //       try {
    //         const fileHandle = await window.showSaveFilePicker(opts)
    //         const writable = await fileHandle.createWritable()
    //         await writable.write(blob)
    //         await writable.close()
    //       } catch (e) {
    //       // console.log((e.message !== 'The user aborted a request'), e.message)
    //         err = true
    //         if (!e.message.match(/aborted/)) {
    //         // G004.00.0 Update-Start
    //         // this.$refs.pop.open(3, e.message, 'ファイルのエクスポートに失敗しました。ファイルが保存できる状態か確認してください。', e.code, false, null, false, null)
    //           this.$refs.pop.open(3, '', 'ファイルのエクスポートに失敗しました。ファイルが保存できる状態か確認してください。', e.code, false, null, false, null)
    //         // G004.00.0 Update-End
    //         }
    //       }
    //       if (!err) {
    //         this.$refs.pop.open(1, '', 'CSVファイルをエクスポートしました。', 200, false, null, false, null)
    //       }
    //     } else {
    //       // 失敗
    //       this.globalErrorMapping('F00006.S006', response.data.result, null)
    //     }
    //     // G003.00.0 Add-Start
    //   } catch (error) {
    //     this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
    //     console.log(error)
    //   }
    //   // G003.00.0 Add-End
    // },
    // /** CSVインポート */
    // async importCsv () {
    //   this.$refs.csvDialog.open(this.targetStoreCd, null, this.refresh, this.csvDlgClose)
    //   setTimeout(() => {
    //     this.$refs.csvDialog.openEnd()
    //   }, 50)
    //   this.csvDlgOpen = true
    // },
    // async csvDlgClose () {
    //   this.csvDlgOpen = false
    //   this.clientIdData = ''
    // },
    // KSD V001.000 DE
    async getMasters () {
      let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },
    // G001.00.0 Add-Start
    checkDataLength () {
      if (this.findDataList.length > this.itemListLimit) {
        this.findDataList.splice(this.itemListLimit, 1)
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W017'), '', false, null, false, null)
      }
    },
    // G001.00.0 Add-end
    // async getProduct () {
    // G001.00.0 Update-Start
    // async getProduct (refresh = true) {
    async getProduct (itemListLimitParam, refresh = true) {
    // G001.00.0 Update-End
      let result = false
      this.findDataList = []
      this.dispDataList = []
      this.resultCount = 0
      try {
        // G001.00.0 Update-start
        // const params = { nodeId: this.targetStoreCd }
        // const params = { nodeId: this.targetStoreCd ,searchParams:JSON.stringify(this.searchParams),itemListLimit:this.itemListLimit+1}
        this.searchedFlg = true
        const params = {nodeId: this.targetStoreCd, searchParams: JSON.stringify(this.searchParams), itemListLimit: itemListLimitParam}
        // G001.00.0 Update-end
        // G001.00.0 Update-Start
        this.$refs.pop.open(4, '', this.$i18n.t('O00004.W018'), '', false, null, false, null)
        // G001.00.0 Update-End
        let response = await axios.get(this.$i18n.t('prop.url') + queryPathV2 + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        // G001.00.0 Update-Start
        this.$refs.pop.closeFunction()
        // G001.00.0 Update-End
        if (response.data.result.code === 0) {
          // 0:正常
          this.findDataList = response.data.responseModel
          // check length is > this.itemListLimit
          // G001.00.0 Add-Start
          this.checkDataLength()
          // G001.00.0 Add-end
          if (refresh) {
            this.filtering()
          }
          result = true
          // KSD V001.000 DS
          // this.csvFlg = true
          // this.csvInFlg = true
          // KSD V001.000 DE
        } else if (response.data.result.code === 2) {
          // 2:該当する商品情報なし
          this.filtering()
          result = true
          // this.csvInFlg = true
          // G011.00.0 Add-Start
        } else if (response.data.result.code === -30) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G011.00.0 Add-End
        } else {
          this.targetStoreCd = 0
          this.targetStoreText = ''
          this.operationLock = true
          this.operationLockStore = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.targetStoreCd = 0
        this.targetStoreText = ''
        this.operationLock = true
        this.operationLockStore = true
        // G011.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
        // G011.00.0 Update-End
        console.log(error)
      }
      return result
    },
    filtering () {
      if (this.lastSearchData === '') {
        this.dispDataList = this.findDataList
      } else {
        var tempStr = ''
        var tempLen = this.lastSearchData.length
        this.dispDataList = []
        for (var i = 0; i < this.findDataList.length; i++) {
          // G001.00.0 Update-Start
          if (document.getElementById('searchName').checked) {
            // tempStr = this.findDataList[i].catalogs.displayName.kanji
            if (this.findDataList[i].displayName == null) {
              tempStr = ''
            } else {
              tempStr = this.findDataList[i].displayName.kanji
            }
          } else {
            tempStr = this.findDataList[i].productId + ''
          }
          // G001.00.0 Update-end
          if (tempStr == null) {
            tempStr = ''
          }
          // 前方一致
          if (tempStr.substr(0, tempLen) === this.lastSearchData) {
            this.dispDataList.push(this.findDataList[i])
          }
        }
      }
      this.resultCount = this.dispDataList === null ? 0 : this.dispDataList.length
    },

    // 直接入力チェック
    productIdInput () {
      this.productIdData = this.productIdData.replace(/[^0-9]/gi, '')
    },

    // 直接入力
    // 商品マスタ検索、存在していれば編集、存在していなければ新規
    directInput () {
      // if (this.$refs.productIdText.value.length < 1 && 14 < this.$refs.productIdText.value.length) {
      //   // 1-14文字以外は反応させない
      //   return;
      // }
      // G003.00.0 Add-Start
      // KSD V001.000 AS
      const barcode = this.$refs.productIdText.value
      const numBarcode = Number(barcode)
      let leadZeroCount = 0
      if (barcode[0] === '0') {
        leadZeroCount = barcode.match(/^0+/)[0].length
      }
      if (barcode === '00000000009999' || barcode === '09999999999999' || (barcode.length === 14 && (leadZeroCount === 12 || leadZeroCount === 13)) || ((leadZeroCount === 1) && (numBarcode >= 9000000000001) && (numBarcode <= 9000000001001))) {
        // 使用できないメニューコードです。<br>再度入力してください。
        this.$refs.pop.open(3, '', this.$i18n.t('F00108.E037'), -99, false, null, false, null)
        return
      }
      const storeCodesLength = this.targetStoreCd.length
      let nodeIdVariable = ''
      if (storeCodesLength === 21) {
        nodeIdVariable = this.targetStoreCd
      } else {
        nodeIdVariable = this.targetStoreCd + this.businessUnitCd
      }
      // KSD V001.000 AE
      axios.get(this.$i18n.t('prop.url') + 'PresetMaster/BarcodeAnalysis' + '?nodeId=' + this.targetStoreCd + '&barcode=' + this.$refs.productIdText.value, commonUtils.methods.addApiHeader({}))
        // KSD V001.000 DS
        // .then((res) => {
        // KSD V001.000 DE
        // KSD V001.000 AS
        .then(async (res) => {
        // KSD V001.000 AE
          // G006.00.0 Add-Start
          if (res.data.result.code === 400) {
            this.$refs.pop.open(3, '', 'バーコード解析に失敗しました。入力したバーコードを確認してください。', '', false, null, false, null)
            return
          }
          // G006.00.0 Add-End

          // G003.00.0 Add-End
          // G003.00.0 Update-Start
          // const params = { nodeId: this.targetStoreCd, itemId: this.$refs.productIdText.value }
          // KSD V001.000 DS
          // const params = { nodeId: this.targetStoreCd, itemId: res.data.analysisList[0].individualAnalysis.inquiryCode }
          // KSD V001.000 DE
          // KSD V001.000 AS
          if (res.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), res.data.result.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
          } else {
            const itemId = barcode.length === 14 ? res.data.analysisList[0].basicAnalysis[0].barcode : res.data.analysisList[0].individualAnalysis.inquiryCode
            const params = { nodeId: this.targetStoreCd, itemId }
          // KSD V001.000 AE
            // G003.00.0 Update-End
            axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
              // KSD V001.000 DS
              // .then(response => {
              //    if (response.data.result.code === 0 || res.data.analysisList == null) {
              // KSD V001.000 DE
              // KSD V001.000 AS
              .then(async response => {
                if (response.data.result.code === 0 && (barcode.length === 14 ? res.data.analysisList[0].basicAnalysis[0] : res.data.analysisList[0].individualAnalysis) !== null) {
              // KSD V001.000 AE
                  // G003.00.0 Update-Start
                  // 0:正常
                  // this.$refs.editDialog.open(this.targetStoreCd, this.$refs.productIdText.value, response.data.responseModel, this.refresh, this.editDlgClose)
                  // KSD V001.000 DS
                  // this.$refs.editDialog.open(this.targetStoreCd, res.data.analysisList[0].individualAnalysis.inquiryCode, response.data.responseModel, this.refresh, this.editDlgClose)
                  // this.$refs.editDialog.open(this.targetStoreCd, itemId, response.data.responseModel, this.refresh, this.editDlgClose, this.itemListLimit)
                  // KSD V001.000 DE
                  // KSD V001.000 AS
                  this.$refs.editDialog.open(JSON.parse(JSON.stringify(response.data.responseModel)), this.targetStoreCd, itemId, response.data.responseModel, this.refresh, this.editDlgClose, nodeIdVariable, this.itemListLimit)
                  // KSD V001.000 AE
                  // G003.00.0 Update-End
                  setTimeout(() => {
                    this.$refs.editDialog.openEnd()
                  }, 50)
                  this.editDlgOpen = true
                } else if (response.data.result.code === 2) {
                  // 2:該当する商品情報なし
                  // G003.00.0 Update-Start
                  // this.$refs.editDialog.open(this.targetStoreCd, this.$refs.productIdText.value, null, this.refresh, this.editDlgClose)
                  // KSD V001.000 DS
                  // this.$refs.editDialog.open(this.targetStoreCd, res.data.analysisList[0].individualAnalysis.inquiryCode, null, this.refresh, this.editDlgClose)
                  // this.$refs.editDialog.open(this.targetStoreCd, itemId, null, this.refresh, this.editDlgClose, this.itemListLimit)
                  // KSD V001.000 DE
                  // KSD V001.000 AS
                  this.$refs.editDialog.open(JSON.parse(JSON.stringify(response.data.responseModel)), this.targetStoreCd, itemId, null, this.refresh, this.editDlgClose, nodeIdVariable, this.itemListLimit)
                  // KSD V001.000 AE
                  // G003.00.0 Update-End
                  setTimeout(() => {
                    this.$refs.editDialog.openEnd()
                  }, 50)
                  this.editDlgOpen = true
                  // G011.00.0 Add-Start
                } else if (response.data.result.code === -30) {
                  this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
                  setTimeout(() => {
                    this.$refs.editDialog.openEnd()
                  }, 50)
                  this.editDlgOpen = true
                  // G011.00.0 Add-End
                } else {
                  this.searchErrorMapping(response.data.result)
                }
              })
              .catch(error => {
                // G011.00.0 Update-Start
                // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
                this.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
                // G011.00.0 Update-End
                console.log(error)
              })
          // G003.00.0 Add-Start
          // KSD V001.000 AS
          }
          // KSD V001.000 AE
        })
        .catch((error) => {
          // G011.00.0 Update-Start
          // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
          // G011.00.0 Update-End
          console.log(error)
        })
        // G003.00.0 Add-End
    },

    // コード選択
    enterCode () {
      document.getElementById('searchCode').checked = true
      this.onRadioChange()
    },
    // 名称選択
    enterName () {
      document.getElementById('searchName').checked = true
      this.onRadioChange()
    },

    onRadioChange () {
      this.searchData = ''
    },

    // 商品選択
    // 商品が存在すること
    // KSD V001.000 DS
    // selectedListDate (index) {
    // KSD V001.000 DE
    // KSD V001.000 AS
    async selectedListDate (index) {
    // KSD V001.000 AE
      var productData = this.dispDataList[index]
      // G001.00.0 Update-Start
      var params = { nodeId: this.targetStoreCd, itemId: productData.skuId }
      // G001.00.0 Update-end
      // G010.00.0 Add-Start
      const storeCodesLength = this.targetStoreCd.length
      var nodeIdVariable = ''
      if (storeCodesLength === 21) {
        nodeIdVariable = this.targetStoreCd
      } else {
        nodeIdVariable = this.targetStoreCd + this.businessUnitCd
      }
      // G010.00.0 Add-End
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常

            // G010.00.0 Update-Start
            // this.$refs.editDialog.open(this.targetStoreCd, productData.skuId, response.data.responseModel, this.refresh, this.editDlgClose)
            // KSD V001.000 DS
            // this.$refs.editDialog.open(JSON.parse(JSON.stringify(response.data.responseModel)), this.targetStoreCd, productData.skuId, response.data.responseModel, this.refresh, this.editDlgClose, nodeIdVariable)
            // KSD V001.000 DE
            // KSD V001.000 AS
            this.$refs.editDialog.open(JSON.parse(JSON.stringify(response.data.responseModel)), this.targetStoreCd, productData.skuId, response.data.responseModel, this.refresh, this.editDlgClose, nodeIdVariable, this.itemListLimit)
            // KSD V001.000 AE
            // G010.00.0 Update-End
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
            // G011.00.0 Add-Start
          } else if (response.data.result.code === 2) {
            this.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
            // G011.00.0 Add-End
          }  else if (response.data.result.code === -30) {
            this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
            // G011.00.0 Add-End
          } else {
            this.globalErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          // G011.00.0 Update-Start
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // G011.00.0 Update-End
          console.log(error)
        })
    },
    async refresh () {
      // G001.00.0 Update-Start
      // if (await this.getProduct() === true) {
      if (!this.searchedFlg) {
        return true
      }
      if (await this.getProduct(this.itemListLimit) === true) {
      // G001.00.0 Update-End
        return true
      } else {
        return false
      }
    },
    //    async editDlgClose () {
    editDlgClose () {
      this.editDlgOpen = false
      this.productIdData = ''
    },
    // 店舗選択ボタン押下
    //    async storeSelect () {
    storeSelect () {
      // G009.00.0 Delete-Start
      // G008.00.0 Add-Start
      // if (this.headquartersAuthority !== 1) {
      //   this.$refs.pop.open(3, '', this.$i18n.t('O00004.W019'), '', false, null, false, null)
      //   return
      // }
      // G008.00.0 Add-End
      // G009.00.0 Delete-End
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      this.findDataList = []
      this.dispDataList = []
      this.resultCount = 0
      await this.setStore(selectedStoreCodes[0])
      // G001.00.0 Update-Start
      // this.getProduct()
      // this.getItemListLimit(selectedStoreCodes[0])
      // await this.getItemListLimit(selectedStoreCodes[0])
      // await this.getProduct(false)
      // this.csvInFlg = !(this.findDataList.length)
      // this.csvFlg = !!(this.findDataList.length)

      await this.getItemListLimit(selectedStoreCodes[0])
      // G005.00.0 Add-Start
      // KSD V001.000 DS
      // if (this.targetStoreText !== '' && this.targetStoreCd !== 0) {
      //   this.csvInFlg = true
      //   this.csvFlg = true
      // } else {
      //   this.csvInFlg = false
      //   this.csvFlg = false
      // }
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.getProduct(this.itemListLimit)
      this.getTaxRates(this.businessUnitCdStr)
      // KSD V001.000 AE
      // G005.00.0 Add-End
      // G005.00.0 Delete-Start
      // this.csvInFlg = true
      // this.csvFlg = true
      // G005.00.0 Delete-End
      // G001.00.0 Update-end
    },
    //    async setStore (storeCd) {
    setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      this.operationLock = true
      this.operationLockStore = true
      if (this.masters.storeMasters !== null) {
        //        var index = this.masters.storeMasters.findIndex((element) => element.storeCd === storeCd)
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          //          this.targetStoreText = this.masters.storeMasters[index].name
          this.targetStoreText = this.masters.storeMasters[index].displayName.default
          this.operationLock = false
          this.operationLockStore = false
        }
      }
    },
    closeTab () {
      //      window.close()
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['itemId'].toString().split(',').join('')
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
    confirmUnload (event) {
      // マスタ新規・編集ダイアログ表示中なら変更確認ダイアログを表示する
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    },
    // G001.00.0 Add-Start
    searchDataEnter () {
      if (this.searchData !== '') {
        if (document.getElementById('searchCode').checked) {
          // G001.00.0 Update-Start
          // this.searchParams = {skuId:this.searchData}
          this.searchParams = { skuId: '/^' + this.searchData + '/' }
          // G001.00.0 Update-End
        } else {
          // G001.00.0 Update-Start
          // this.searchParams = {displayName: {default: this.searchData}}
          this.searchParams = { displayName: { kanji: '/^' + this.searchData + '/' } }
          // G001.00.0 Update-End
        }
      } else {
        this.searchParams = {}
      }
      // G001.00.0 Update-Start
      // this.getProduct()
      this.getProduct(this.itemListLimit + 1)
      // G001.00.0 Update-End
    },
    async getItemListLimit (nodeId) {
      // G005.00.0 Add-Start
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W016'), '', false, null, false, null)
      // G005.00.0 Add-End
      try {
        this.itemListLimit = 50
        const response = await axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
          nodeId: nodeId,
          excludeFields: false
        }, commonUtils.methods.getApiHeader())
        // G005.00.0 Add-Start
        this.$refs.pop.closeFunction()
        // G005.00.0 Add-End
        if (response.data.result.code !== 0) {
          return false
        }
        if (response.data.responseModel) {
          this.itemListLimit = parseInt(response.data.responseModel.configurations.STORE_OPERATIONS_SETTINGS.value.itemListLimit)
        }
        return true
      } catch (error) {
        console.log(error)
        // G005.00.0 Add-Start
        this.targetStoreCd = 0
        this.targetStoreText = ''
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // G005.00.0 Add-End
        return false
      }
    }
    // G001.00.0 Add-end
    // KSD V001.000 AS
    ,async getTaxRates (storeCd) {
      let result = false
      try {
        const params = { nodeId: storeCd }
        let response = await axios.post(this.$i18n.t('prop.url') + taxQuery, params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          this.taxTypeList = []
          const taxData = response.data.responseModel
          Array.forEach(taxData, (item) => {
            this.taxTypeList.push({code: item.name, value: item.displayName.default})
          })
          result = true
        } else {
          this.targetStoreCd = 0
          this.targetStoreText = ''
          this.findDataList = []
          this.dispDataList = []
          this.operationLock = true
          this.operationLockStore = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.targetStoreCd = 0
        this.targetStoreText = ''
        this.findDataList = []
        this.dispDataList = []
        this.operationLock = true
        this.operationLockStore = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    }
    // KSD V001.000 AE
  },
  created () {
    this.$root.winId = 'F00108'
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
    // KSD V001.000 AS
    clearTimeout(this.timeout)
    // KSD V001.000 AE
  },
  async mounted () {
    // G007.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G007.00.0 Add-End
    this.searchData = ''
    let vue = this
    // STEP0では企業コードで利用
    // vue.$root.$on('getBelongStoreCd', (belongStoreCd) => {
    // G002.00.0 Update-Start
    // vue.$root.$on('getBusinessUnitCdStr', (belongStoreCd) => {
    //   // 対象店舗コード = headerで保持している所属店舗コード
    //   vue.targetStoreCd = belongStoreCd
    // })
    // vue.$root.$on('getHeadquartersAuthority', (headquartersAuthority) => {
    //   // 本部権限 = headerで保持している本部権限
    //   vue.headquartersAuthority = headquartersAuthority
    //   this.initialize()
    // })
    // await this.$nextTick()
    // setTimeout(() => {
    //   if (this.headquartersAuthority === 1) {
    //     document.getElementById('storeSelectBtn').focus()
    //   } else {
    //     this.$refs.productIdText.focus()
    //   }
    // }, 200)
    let belongStoreCdStr = ''
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
      // KSD V001.000 AS
      vue.businessUnitCdStr = businessUnitCdStr
      // KSD V001.000 AE
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    // G009.00.0 Delete-Start
    // vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
    // 本部権限 = headerで保持している本部権限
    // vue.headquartersAuthority = headquartersAuthority
    // G009.00.0 Delete-End
    // KSD V001.000 DS
    //if (targetStoreCd) {
    //  vue.targetStoreText = belongStoreNameStr
    //  vue.targetStoreCd = targetStoreCd
    //  vue.operationLockStore = false
    //}
    //await this.initialize()
    //await this.$nextTick()
    //setTimeout(() => {
    //  // G009.00.0 Update-Start
    //  document.getElementById('storeSelectBtn').focus()
    //  // if (this.headquartersAuthority === 1) {
    //  //   document.getElementById('storeSelectBtn').focus()
    //  // } else {
    //  //   this.operationLock = false
    //  //   this.$refs.productIdText.focus()
    //  // }
    //  // G009.00.0 Update-End
    //}, 200)
    // KSD V001.000 DE
    // G009.00.0 Delete-Start
    // })
    // G009.00.0 Delete-End
    // G002.00.0 Update-End
    // KSD V001.000 AS
    vue.$root.$once('getHeadquartersAuthority', (headquartersAuthority) => {
      this.timeout = setTimeout(async () => {
        this.headquartersAuthority = headquartersAuthority
        if (this.headquartersAuthority !== 1) {
          this.targetStoreText = belongStoreNameStr
          this.operationLock = false
          this.operationLockStore = false
          this.targetStoreCd = targetStoreCd
        }
        await this.initialize()
        await this.$nextTick()
        if (this.headquartersAuthority === 1) {
          document.getElementById('storeSelectBtn').focus()
        } else {
          this.$refs.productIdText.focus()
        }
      })
    }, 200)
    // KSD V001.000 AE
  },
  watch: {
    // G001.00.0 Update-Start
    // searchData: function (val) {
    //   // コード入力の場合、半角数値以外を除去
    //   if (document.getElementById('searchCode').checked) {
    //     var inputText = val.replace(/[^0-9]/gi, '')
    //     this.searchData = inputText
    //     if (inputText === this.lastSearchData) return
    //     this.lastSearchData = inputText
    //   } else {
    //     this.lastSearchData = val
    //   }
    //   if (this.lastSearchData === '') {
    //     this.findDataList = []
    //     this.dispDataList = []
    //     this.getProduct()
    //   } else {
    //     if (this.findDataList === null || this.findDataList.length === 0) return
    //     this.filtering()
    //   }
    // }
    // G001.00.0 Update-End
    // KSD V001.000 AS
    searchData: function (val) {
      if (document.getElementById('searchCode').checked) {
        this.searchData = this.searchData.replace(/[^0-9]/gi, '')
        this.searchData = this.searchData.replace(/\s/g, '')
      } 
    }
   // KSD V001.000 AE
  }
}
