import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
const savePath = 'ProductMaster/Csv'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230112  bai.ry(Neusoft)    G001.00.0  issue課題#1172を対応します.
 * 20230310  bai.ry(Neusoft)    G002.00.0  issue課題#1652を対応します.
 * 20230313  xu.jh(Neusoft)    G003.00.0  issue課題#1692を対応します.
 * 20230725  qinshh(Neusoft)    G004.00.0  issue課題#975を対応します.
 */
export default {
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      storeCd: '',
      registerAuth: true,
      selectedScanner: 0,
      workers: [],
      tabletDataList: { tabletModels: [] },
      scannerList: [
        { code: 1, name: this.$i18n.t('F00013.S019') },
        { code: 2, name: this.$i18n.t('F00013.S020') }
      ],
      productDataList: [
        {
          storeCd: 0, // 店舗コード
          productId: 0, // ○バーコード
          name: '', // ○漢字名称
          kana: '', // カナ名称
          receipt: '', // レシート印字名称
          receiptPrintType: 1, // POS売上税区分
          taxType: 1, // レシート印字名称区分
          cost: '', // 原単価
          sellPrice: '', // ○売単価
          manufacturerPrice: '', // ○定価単価
          productType: 1, // ○商品区分
          ageCheckType: 2, // ○年齢確認商品
          discountType: 1, // ○割引区分
          premiunType: 1, // 割増区分
          pricedownType: 1, // ○値引区分
          priceChangeType: 1, // ○売変区分
          discountParType: 1, // 小計値引割引按分処理区分
          priceRequiredType: 1, // 強制金額入力
          zeroPriceType: 1, // 0円単価区分
          dutyFreeType: 1, // 免税区分
          paymentType: [], // 決済種別区分
          productTaxCodes: '', // POS売上税区分
          sellStartDate: '', // ○販売開始日
          sellEndDate: '', // ○販売終了日
          sellStopType: 1, // 販売停止区分
          lastUpdate: ''// ○最終更新日時
        }
      ],
      nameErrorMsg: '',
      terminalTypeErrorMsg: '',
      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      dispFileName: '選択されていません'
    }
  },
  components: {
    popup
  },
  methods: {
    open (storeCd, tabletDataList, refreshFunc, closeFunc) {
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.workers = []
      this.registerAuth = true
      this.storeCd = storeCd
      this.productDataList = []
      if (this.$refs.fileSelect) {
        // G001.00.0 Add-Start
        this.$refs.fileSelect.value = ''
        // G001.00.0 Add-End
      }
      this.dispFileName = '選択されていません'
    },
    openEnd () {
      this.initErrorMessage()
    },
    btnclick () {
      this.$refs.fileSelect.click()
    },
    loadCsvFile (e) {
      let headerTitles = [
        // 'skuId', 'kanji', 'kana', 'receipt', 'receiptPrint', 'productTaxCodes', 'unitPrice', 'price', 'manufacturerPrice',
        'skuId', 'kanji', 'kana', 'receipt', 'receiptPrint', 'productTaxCodes', 'price', 'unitPrice', 'manufacturerPrice',
        'productClassification', 'ageToBuy', 'discountable', 'priceChangeOperation', 'subTotalDiscountable',
        'priceRequired', 'paymentTypeExclusions', 'dutyFreeClassification',
        'startDate', 'endDate', 'notForSale'
      ]
      let productTemplate = {
        mode: 1,
        nodeId: this.storeCd, // 店舗コード
        itemId: null, // ○バーコード
        kanji: null, // ○漢字名称
        kana: null, // カナ名称
        receipt: null, // レシート印字名称
        receiptPrintType: null, // レシート印字名称区分
        taxType: null, // POS売上税区分
        cost: null, // 原単価
        sellPrice: null, // ○売単価
        manufacturerPrice: null, // ○定価単価
        productType: null, // ○商品区分
        ageToBuy: null, // ○年齢確認商品
        pricedownType: null, // ○値引区分
        priceChangeType: null, // ○売変区分
        discountParType: null, // 小計値引割引按分処理区分
        priceRequiredType: null, // 強制金額入力
        paymentTypeExclusions: null,// 決済種別区分
        // paymentType: null, // 決済種別区分
        startDate: null, // ○免税区分
        productTaxCodes: null, // POS売上税区分
        dutyFreeType: null, // ○販売開始日
        endDate: null, // ○販売終了日
        sellStopType: null // 販売停止区分
      }
      this.workers = []
      // this.message = "";
      this.message = ''
      this.registerAuth = true
      this.productDataList = []
      this.dispFileName = '選択されていません'
      let file = e.target.files[0]

      // if (!file.type.match("text/csv")) {
      if (!file.type.match('text/csv')) {
        let linesArr = []
        this.workers = linesArr
        // linesArr.push("CSVファイルを選択してください");
        linesArr.push('CSVファイルを選択してください')
        // this.workers = linesArr;
        this.$set(this.workers, linesArr)
        return
      }

      let reader = new FileReader()
      reader.readAsText(file)

      reader.onload = function () {
        // let lines = reader.result.split("\n");
        let lines = reader.result.split('\n')
        // 1行目はスキップ
        // lines.shift()
        // let linesArr = []
        let errArr = []
        let offset = {}
        // let cnt = 0
        var numregex = new RegExp(/^[-+]?[0-9]+(\.[0-9]+)?$/)
        // const isNumber = (value) => {
        //  return Number.isFinite(value)
        // }
        for (let i = 0; i < lines.length; i++) {
          let items = lines[i].split(',')
          items = items.map(function (value) {
            return value.trim().replace(/^"(.*)"$/, '$1').trim()
          })

          // var item = lines[i].split(",");
          // "skuId","kanji","kana","receipt","receiptPrint","productTaxCodes","unitPrice","price","manufacturerPrice","productClassification",
          // "ageToBuy","discountable","priceOverrideAllowed" ,"subTotaldiscountable","priceRequired","paymentExclusions","dutyFreeClassification","startDate","endDate","notForSale"
          // 001100110011,"商品738","null","null",false,"TAX2",null,0,null,null,
          // null,null,true,true,undefined,null,undefined,"2020-09-01T00:00:00Z","2025-09-01T00:00:00Z",undefined
          //          if(item != ""){
          //          if(item.length != 20){
          //          errArr.push("設定項目数に誤りがあります。（" + (i+1) + "行目）");
          //          }else if(item[0].trim() == ''){
          //          errArr.push("skuIdは必須です。（" + (i+1) + "行目）");
          //          }else if(item[1].trim() == ''){
          //          errArr.push("kanjiは必須です。（" + (i+1) + "行目）");
          //          }else if(item[4].trim() != 'true' && item[4].trim() != 'false' && item[4].trim() != 'undefined' && item[4].trim() != ''){
          //          errArr.push("receiptPrintにはtrueまたはfalseを入力してください。（" + (i+1) + "行目）");
          //          }else if(item[6].trim() != '' && !numregex.test(item[6].trim())){
          //          errArr.push("unitPriceには数値を入力してください。（" + (i+1) + "行目）");
          //          }else if(item[7].trim() != '' && !numregex.test(item[7].trim())){
          //          errArr.push("priceには数値を入力してください。（" + (i+1) + "行目）");
          //          }else if(item[8].trim() != '' && !numregex.test(item[8].trim())){
          //          errArr.push("manufacturerPriceには数値を入力してください。（" + (i+1) + "行目）");
          //          }else if(item[9].trim() != '' && !numregex.test(item[9].trim())){
          //          errArr.push("productClassificationには数値を入力してください。（" + (i+1) + "行目）");
          //          }else if(item[10].trim() != '' && item[10].trim() != '20'){
          //          errArr.push("ageToBuyには空白または20を入力してください。（" + (i+1) + "行目）");
          //          }else if(item[11].trim() != 'true' && item[12].trim() != 'false' && item[12].trim() != 'undefined' && item[12].trim() != ''){
          //          errArr.push("discountableにはtrueまたはfalseを入力してください。（" + (i+1) + "行目）");
          //          }else if(item[12].trim() != 'true' && item[13].trim() != 'false' && item[13].trim() != 'undefined' && item[13].trim() != ''){
          //          errArr.push("priceOverrideAllowedにはtrueまたはfalseを入力してください。（" + (i+1) + "行目）");
          //          }else if(item[13].trim() != 'true' && item[14].trim() != 'false' && item[14].trim() != 'undefined' && item[14].trim() != ''){
          //          errArr.push("subTotaldiscountableにはtrueまたはfalseを入力してください。（" + (i+1) + "行目）");
          //          }else if(item[14].trim() != 'true' && item[15].trim() != 'false' && item[15].trim() != 'undefined' && item[15].trim() != ''){
          //          errArr.push("priceRequiredにはtrueまたはfalseを入力してください。（" + (i+1) + "行目）");
          //          }else if(item[16].trim() != '' && !numregex.test(item[10].trim())){
          //          errArr.push("dutyFreeClassificationには数値を入力してください。（" + (i+1) + "行目）");
          //          }else if(item[19].trim() != 'true' && item[19].trim() != 'false' && item[19].trim() != 'undefined' && item[19].trim() != ''){
          //          errArr.push("notForSaleにはtrueまたはfalseを入力してください。（" + (i+1) + "行目）");
          //              if (item[0] && isNumber(Number(item[0]))) {
          //                if (item.length !== 20) {
          // let item = lines[i].split(',')
          if (i === 0) {
            headerTitles.forEach(function (element) {
              offset[element] = items.indexOf(element)
              if (offset[element] === -1) {
                errArr.push('設定項目に不足があります。(' + element + ')')
              }
            })
            if (errArr.length) {
              break
            }
          } else if (!items[1]) {
            continue
            //          } else if (!item[1]) {
            //            continue
            //          } else if (item.length !== 20) {
          } else if (items.length !== headerTitles.length) {
            errArr.push('設定項目数に誤りがあります。（' + (i + 1) + '行目）')
            /*                } else if (item[0].trim() === '') {
                  errArr.push('skuIdは必須です。（' + (i + 1) + '行目）')
                } else if (item[1].trim() === '') {
                  errArr.push('kanjiは必須です。（' + (i + 1) + '行目）')
                } else if (item[4].trim().toLowerCase() !== 'true' && item[4].trim().toLowerCase() !== 'false' && item[4].trim() !== 'undefined' && item[4].trim() !== '') {
                  errArr.push('receiptPrintにはtrueまたはfalseを入力してください。（' + (i + 1) + '行目）')
                } else if (item[6].trim() !== '' && !isNumber(Number(item[6]))) {
                  errArr.push('unitPriceには数値を入力してください。（' + (i + 1) + '行目）')
                } else if (item[7].trim() !== '' && !isNumber(Number(item[7]))) {
                  errArr.push('priceには数値を入力してください。（' + (i + 1) + '行目）')
                } else if (item[8].trim() !== '' && !isNumber(Number(item[8]))) {
                  errArr.push('manufacturerPriceには数値を入力してください。（' + (i + 1) + '行目）')
                } else if (item[9].trim() !== '' && !isNumber(Number(item[9]))) {
                  errArr.push('productClassificationには数値を入力してください。（' + (i + 1) + '行目）')
                } else if (item[10].trim() !== '' && item[10].trim() !== '20') {
                  errArr.push('ageToBuyには空白または20を入力してください。（' + (i + 1) + '行目）')
                } else if (item[11].trim().toLowerCase() !== 'true' && item[11].trim().toLowerCase() !== 'false' && item[11].trim() !== 'undefined' && item[11].trim() !== '') {
                  errArr.push('discountableにはtrueまたはfalseを入力してください。（' + (i + 1) + '行目）')
                } else if (item[12].trim().toLowerCase() !== 'true' && item[12].trim().toLowerCase() !== 'false' && item[12].trim() !== 'undefined' && item[12].trim() !== '') {
                  errArr.push('priceOverrideAllowedにはtrueまたはfalseを入力してください。（' + (i + 1) + '行目）')
                } else if (item[13].trim().toLowerCase() !== 'true' && item[13].trim().toLowerCase() !== 'false' && item[13].trim() !== 'undefined' && item[13].trim() !== '') {
                  errArr.push('subTotaldiscountableにはtrueまたはfalseを入力してください。（' + (i + 1) + '行目）')
                } else if (item[14].trim().toLowerCase() !== 'true' && item[14].trim().toLowerCase() !== 'false' && item[14].trim() !== 'undefined' && item[14].trim() !== '') {
                  errArr.push('priceRequiredにはtrueまたはfalseを入力してください。（' + (i + 1) + '行目）')
                } else if (item[16].trim() !== '' && !isNumber(Number(item[16]))) {
                  errArr.push('dutyFreeClassificationには数値を入力してください。（' + (i + 1) + '行目）')
                } else if (item[19].trim().toLowerCase() !== 'true' && item[19].trim().toLowerCase() !== 'false' && item[19].trim() !== 'undefined' && item[19].trim() !== '') {
                  errArr.push('notForSaleにはtrueまたはfalseを入力してください。（' + (i + 1) + '行目）')
        }else{
            for(var j=0; j<20; j++){
              item[j] = item[j].toString().trim()
            }
            item[1] = item[1].toString().replaceAll('"', '')
            item[2] = item[2].toString().replaceAll('"', '')
            item[3] = item[3].toString().replaceAll('"', '')
          if(item[4] == 'true'){
          item[4] = 1
          }
          if(item[4] == 'false'){
          item[4] = 2
          }
          if(item[5] == 'TAX1'){
          item[5] = 1
          }
          if(item[5] == 'TAX2'){
          item[5] = 2
          }
          if(item[5] == 'TAX3'){
          item[5] = 3
          }
          if(item[5] == 'TAX4'){
          item[5] = 4
          }
          if(item[5] == 'TAX5'){
          item[5] = 5
          }
          if(item[11] == 'true'){
          item[11] = 1
          }
          if(item[11] == 'false'){
          item[11] = 2
          }
          if(item[12] == 'true'){
          item[12] = 1
          }
          if(item[12] == 'false'){
          item[12] = 2
          }
          if(item[13] == 'true'){
          item[13] = 1
          }
          if(item[13] == 'false'){
          item[13] = 2
          }
          if(item[16] == 'true'){
          item[16] = 1
          }
          if(item[16] == 'false'){
          item[16] = 2
          }
          if(item[19] == 'true'){
          item[19] = 1
          }
          if(item[19] == 'false'){
          item[19] = 2
          }
      //var productData = {
                    let productData = {
        mode:1,
        nodeId: this.storeCd,// 店舗コード
        itemId: item[0],// ○バーコード
        kanji: item[1],// ○漢字名称
        kana: item[2],// カナ名称
        receipt: item[3],// レシート印字名称
        receiptPrintType: item[4],// レシート印字名称区分
        taxType: item[5],// POS売上税区分
        cost: item[6],// 原単価
        sellPrice: item[7],// ○売単価
        manufacturerPrice: item[8],// ○定価単価
        productType: item[9],// ○商品区分
        ageToBuy: item[10],// ○年齢確認商品
        pricedownType: item[11],// ○値引区分
        priceChangeType: item[12],// ○売変区分
        discountParType: item[13],// 小計値引割引按分処理区分
        priceRequiredType: item[14],// 強制金額入力
        paymentType: item[15],// 決済種別区分
        startDate: item[16],// ○免税区分
        dutyFreeType: item[17],// ○販売開始日
        endDate: item[18],// ○販売終了日
        sellStopType: item[19]// 販売停止区分
      }
      this.productDataList.push(productData)
          cnt++
          }
          }
        }
        this.workers = errArr
        //if(errArr.length == 0 && cnt > 0){
        if (errArr.length === 0 && cnt > 0) {
        this.registerAuth = false
            this.dispFileName = file.name
        }
  }.bind(this)
    }, */
          } else {
            let temp = {...productTemplate}
            Object.entries(offset).forEach(([key, value]) => {
              let word = ''
              let aryVal = []
              let required = ''

              if (key === 'paymentTypeExclusions') {
                //                aryVal = item[value].split(';').map(function (element) {
                //                  return element.replace(/^"/, '').replace(/"$/, '').trim()
                aryVal = items[value].split(';').map(function (element) {
                  return element.trim().replace(/^"(.*)"$/, '$1').trim()
                })
              } else {
                //                word = item[value].replace(/^"/, '').replace(/"$/, '').trim()
                word = items[value]
              }
              if (key === 'productTaxCodes') {
                aryVal.push(items[value])
                word = items[value]
              }
              // 必須チェック
              switch (key) {
                case 'unitPrice':
                case 'price':
                case 'manufacturerPrice':
                  if (word === '') {
                    word = '0'
                  }
                  break
                case 'skuId':
                case 'kanji':
                case 'receiptPrint':
                case 'productClassification':
                case 'discountable':
                case 'priceChangeOperation':
                case 'subTotalDiscountable':
                case 'priceRequired':
                case 'dutyFreeClassification':
                case 'notForSale':
                  if (word === '') {
                    //                    errArr.push(key + 'は必須です。（' + (i + 1) + '行目）')
                    required = '※必須'
                  }
                  break
              }
              // true / false
              // 書式チェック
              switch (key) {
                case 'receiptPrint':
                case 'discountable':
                case 'priceChangeOperation':
                case 'subTotalDiscountable':
                case 'priceRequired':
                case 'notForSale':
                  if (word.toLowerCase() === 'true') {
                    word = 1
                  } else if (word.toLowerCase() === 'false') {
                    word = 2
                  } else {
                    //                    errArr.push(key + 'にはtrueまたはfalseを入力してください。(' + (i + 1) + '行目）')
                    errArr.push(key + 'にはtrueまたはfalseを入力してください。' + required + '(' + (i + 1) + '行目）')
                  }
                  break
                  //              }
                  //              // num check
                  //              switch (key) {
                  //                case 'skuId':
                  //                case 'unitPrice':
                  //                case 'price':
                  //                case 'manufacturerPrice':
                  //                case 'productClassification':
                  //                case 'dutyFreeClassification':
                  //                  if (word !== '' && !numregex.test(word)) {
                  //                    errArr.push(key + 'には数値を入力してください。（' + (i + 1) + '行目）')
                  //                  }
                  //                  break
                  //              }
                  //              // etc
                  //              switch (key) {
                case 'ageToBuy':
                  if (word !== '' && word !== '20') {
                    //                    errArr.push(key + 'には空白または20を入力してください。（' + (i + 1) + '行目）')
                    errArr.push(key + 'には空白または20を入力してください。' + required + '（' + (i + 1) + '行目）')
                  }
                  break
                case 'productTaxCodes':
                  if ((word !== 'TAX1') && (word !== 'TAX2') && (word !== 'TAX3') && (word !== 'TAX4') && (word !== 'TAX5')) {
                    //                    errArr.push(key + 'はTAX1～TAX5の何れかを設定してください。（' + (i + 1) + '行目）')
                    errArr.push(key + 'にはTAX1～TAX5の何れかを設定してください。' + required + '（' + (i + 1) + '行目）')
                  }
                  break
                case 'dutyFreeClassification':
                  //                  if ((word !== '') && (word !== '0') && (word !== '1') && (word !== '2')) {
                  //                    errArr.push(key + 'は0～2の何れかを設定してください。（' + (i + 1) + '行目）')
                  if ((word !== '0') && (word !== '1') && (word !== '2')) {
                    errArr.push(key + 'には0～2の何れかを設定してください。' + required + '（' + (i + 1) + '行目）')
                  }
                  break
                case 'productClassification':
                  //                  if ((word !== '') && (word !== '0') && (word !== '1')) {
                  //                    errArr.push(key + 'は0:通常商品、1:売上外商品の何れかを設定してください。（' + (i + 1) + '行目）')
                  if ((word !== '0') && (word !== '1')) {
                    errArr.push(key + 'には0:通常商品、1:売上外商品の何れかを設定してください。' + required + '（' + (i + 1) + '行目）')
                  }
                  break
                case 'kanji':
                case 'kana':
                case 'receipt':
                  // console.log(this.getLen(word), 'getLen(' + key + ')')
                  if (this.getLen(word) > 40) {
                    //                    errArr.push(key + '半角40文字、全角20文字以内で設定してください。（' + (i + 1) + '行目）')
                    errArr.push(key + 'には半角40文字、全角20文字以内で設定してください。' + required + '（' + (i + 1) + '行目）')
                  }
                  break
                case 'skuId':
                  //                  if (word.length > 14) {
                  //                    errArr.push(key + '数字14文字以内で設定してください。（' + (i + 1) + '行目）')
                  if ((word === '') || !numregex.test(word) || (word.length > 14)) {
                    errArr.push(key + 'には数字14文字以内で設定してください。' + required + '（' + (i + 1) + '行目）')
                  }
                  break
                case 'unitPrice':
                case 'price':
                case 'manufacturerPrice':
                  //                  if (word.length > 7) {
                  //                    errArr.push(key + '数字７桁以内で設定してください。（' + (i + 1) + '行目）')
                  if ((word === '') || !numregex.test(word) || (word.length > 7)) {
                    errArr.push(key + 'には数字７桁以内で設定してください。' + required + '（' + (i + 1) + '行目）')
                  } else {
                    word = Number(word)
                  }
                  break
                case 'startDate':
                case 'endDate':
                  if (word !== '') {
                    let date = new Date(word)
                    if (isNaN(date.getDate())) {
                      //                      errArr.push(key + '日付書式(YY/MM/DD)を設定してください。（' + (i + 1) + '行目）')
                      errArr.push(key + 'には日付書式(YYYY-MM-DD)を設定してください。' + required + '（' + (i + 1) + '行目）')
                    }
                    word = this.formatDate(word)
                  }
                  break
              }
              // 要素名変更
              switch (key) {
                case 'skuId':
                  temp.itemId = word
                  break
                case 'receiptPrint':
                  temp.receiptPrintType = word
                  break
                case 'productTaxCodes':
                  // for (let idx = 1; idx < 6; idx++) {
                  //  if (word === ('TAX' + idx)) {
                  //    temp.taxType = idx
                  //  }
                  // }
                  temp.productTaxCodes = aryVal
                  break
                case 'price':
                  // temp.sellPrice = word
                  temp.sellPrice = Number(word)
                  break
                case 'unitPrice':
                  // temp.cost = word
                  temp.cost = Number(word)
                  break
                  //                case 'price':
                  //                  temp.sellPrice = word
                  //                  break
                case 'productClassification':
                  temp.productType = Number(word)
                  break
                case 'discountable':
                  temp.pricedownType = word
                  break
                case 'priceChangeOperation':
                  temp.priceChangeType = word
                  break
                case 'subTotalDiscountable':
                  temp.discountParType = word
                  break
                case 'priceRequired':
                  temp.priceRequiredType = word
                  break
                case 'paymentTypeExclusions':
                  temp.paymentType = aryVal
                  break
                case 'dutyFreeClassification':
                  temp.dutyFreeType = Number(word)
                  break
                case 'notForSale':
                  temp.sellStopType = word
                  break
                case 'startDate':
                  if (word === '') {
                    word = '2022/01/01'
                  }
                  temp.startDate = word
                  break
                case 'endDate':
                  if (word === '') {
                    word = '2999/12/31'
                  }
                  temp.endDate = word
                  break
                default:
                  temp[key] = word
                  break
              }
            })
            if (temp.startDate > temp.endDate) {
              errArr.push('販売開始日 < 販売終了日が不正です。（' + (i + 1) + '行目）')
            }
            if (!errArr.length) {
              this.productDataList.push(temp)
            }
          }
        }
        if (errArr.length === 0 && !this.productDataList.length) {
          errArr.push('有効なデータ行が存在していません。')
        }
        //        console.log(this.productDataList, 'this.productDataList')
        this.workers = errArr
        if (errArr.length === 0 && this.productDataList.length > 0) {
          this.registerAuth = false
          this.dispFileName = file.name
        }
      }.bind(this)
    },
    formatDate (str) {
      /*
      let dt = new Date(str)
      let y = dt.getFullYear()
      let m = ('00' + (dt.getMonth() + 1)).slice(-2)
      let d = ('00' + dt.getDate()).slice(-2)
      return (y + '/' + m + '/' + d)
      */
      return str.substr(0, 10).replace(/-/g, '/')
    },
    getLen (str) {
      let count = 0
      let c = ''
      for (let i = 0, len = str.length; i < len; i++) {
        c = str.charCodeAt(i)
        if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
          count += 1
        } else {
          count += 2
        }
      }
      return count
    },
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
      this.$refs.pop.open(1, '', 'CSVファイルを入力します。よろしいですか？', '', true, this.runCSV, false, null)
    },
    async runCSV () {
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (await this.executeSave() === true) {
        // G002.00.0 Update-Start
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
        // this.dialog = false
        setTimeout(() => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => {
            this.dialog = false
            this.$emit('initializeAfterCsvInput')
          }, false, null)
        }, 1)
        // G002.00.0 Update-Start
        // this.$router.go({path: this.$router.currentRoute.path, force: true})
      }
    },
    async executeSave () {
      var result = false
      try {
        // const params = {
        // 暫定対応コード：コントローラの配列対応後に差し替え
        /*
        let params = {
          productDataList: this.productDataList.map(function (row) {
            if (typeof row.paymentType !== 'undefined' && row.paymentType.length) {
              row.paymentType = row.paymentType[0]
            } else {
              row.paymentType = ''
            }
            return row
          })
        }
        */
        // 差し替えコード
        const params = {
          productDataList: this.productDataList
        }
        // 保存
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
          // G002.00.0 Add-Start
          // this.$emit('initializeAfterCsvInput')
          // G002.00.0 Add-End
          // G004.00.0 Add-Start
        } else if (response.data.result.code === -30) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G004.00.0 Add-End
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        // G003.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F00001.E005'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // G003.00.0 Update-End
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
      } else if (result.code === -10) { // G003.00.0 Add-Start
        this.$refs.pop.open(3, '', '通信に失敗しました。ネットワークの接続を確認してください。', '', false, null, false, null)
      } else { // G003.00.0 Add-End
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
    }
  }
}
