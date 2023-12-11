/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230103  bai.ry(Neusoft)  G001.00.0  issue課題#1343を対応します.
 * 20230216  dingxin(Neusoft) G002.00.0  issue課題#1054を対応します.
 * 20230719  qinshh(Neusoft)  G003.00.0  issue課題#903を対応します.
 * 20230724  qinshh(Neusoft)  G004.00.0  issue課題#975を対応します.
 * 20230808  qinshh(Neusoft)  G005.00.0  issue課題#903を対応します.
 * 20230824  heqianlong(Neusoft)  G005.00.1  issue課題#903を対応します.
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogExlusionSelect from '@/resource/templates/CommonDesign/DialogExlusionSelect'

const taxRatesPath = 'ProductMaster/TaxRates'
const paymentsPath = 'ProductMaster/Payments'
const savePath = 'ProductMaster/ProductRegist'
const deletePath = 'ProductMaster/ProductDeleted'

export default {
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      // G002.00.0 Add start
      permissions: [],
      // G002.00.0 Add end
      // G003.00.0 Add start
      targetExlusionsName: '',
      data: {
        catalogs: {
          displayName: { default: null },
          productTaxCodes: [],
          paymentExlusions: [],
          priceChangeOperation: null
        },
        pricelists: {}
      },
      // G003.00.0 Add end
      productData: {
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
        productType: 0, // ○商品区分
        ageCheckType: 2, // ○年齢確認商品
        discountType: 1, // ○割引区分
        premiunType: 1, // 割増区分
        pricedownType: 1, // ○値引区分
        priceChangeType: 1, // ○売変区分
        discountParType: 1, // 小計値引割引按分処理区分
        priceRequiredType: 1, // 強制金額入力
        zeroPriceType: 1, // 0円単価区分
        dutyFreeType: 1, // 免税区分
        paymentType: 1, // 決済種別区分
        sellStartDate: '', // ○販売開始日
        sellEndDate: '', // ○販売終了日
        sellStopType: 1, // 販売停止区分
        lastUpdate: ''// ○最終更新日時
      },

      // POS売上税区分
      // getTaxRates()にて初期化
      taxTypeList: [],

      // 商品区分
      productTypeList: [
        // 通常商品、売上外商品
        { code: 0, value: this.$i18n.t('F00108.S043') },
        { code: 1, value: this.$i18n.t('F00108.S044') }
      ],

      // 年齢確認商品
      ageCheckTypeList: [
        // 対象、非対象
        { code: 1, value: this.$i18n.t('F00108.S045') },
        { code: 2, value: this.$i18n.t('F00108.S046') }
      ],

      // 割引区分
      discountTypeList: [
        // 許可、禁止
        { code: 1, value: this.$i18n.t('F00108.S047') },
        { code: 2, value: this.$i18n.t('F00108.S048') }
      ],

      // 割増区分
      premiunTypeList: [
        // 許可、禁止
        { code: 1, value: this.$i18n.t('F00108.S049') },
        { code: 2, value: this.$i18n.t('F00108.S050') }
      ],

      // 値引区分
      pricedownTypeList: [
        // 許可、禁止
        { code: 1, value: this.$i18n.t('F00108.S051') },
        { code: 2, value: this.$i18n.t('F00108.S052') }
      ],

      // 売変区分
      priceChangeTypeList: [
        // 許可、禁止
        { code: 1, value: this.$i18n.t('F00108.S053') },
        { code: 2, value: this.$i18n.t('F00108.S054') }
      ],

      // 小計値引割引按分処理区分
      discountParTypeList: [
        // 対象、非対象
        { code: 1, value: this.$i18n.t('F00108.S045') },
        { code: 2, value: this.$i18n.t('F00108.S046') }
      ],

      // 0円単価区分
      zeroPriceTypeList: [
        // 許可、禁止
        { code: 1, value: this.$i18n.t('F00108.S057') },
        { code: 2, value: this.$i18n.t('F00108.S058') }
      ],

      // 金額構成入力
      priceRequiredTypeList: [
        // 許可、禁止
        { code: 1, value: this.$i18n.t('F00108.S068') },
        { code: 2, value: this.$i18n.t('F00108.S069') }
      ],

      // 免税区分
      dutyFreeTypeList: [
        // 許可、禁止
        { code: 0, value: this.$i18n.t('F00108.S059') },
        { code: 1, value: this.$i18n.t('F00108.S060') },
        { code: 2, value: this.$i18n.t('F00108.S061') }
      ],

      // 決済種別区分
      // getPayments()にて初期化
      paymentTypeList: [],

      // 販売停止区分
      sellStopTypeList: [
        // 許可、禁止
        { code: 1, value: this.$i18n.t('F00108.S063') },
        { code: 2, value: this.$i18n.t('F00108.S062') }
      ],

      // レシート印字区分
      receiptPrintTypeList: [
        // 許可、禁止
        { code: 1, value: this.$i18n.t('F00108.S016') },
        { code: 2, value: this.$i18n.t('F00108.S018') }
      ],

      nameErrorMsg: '', // 漢字エラー
      kanaErrorMsg: '', // カナ名称エラー
      receiptErrorMsg: '', // レシート印字エラー
      costErrorMsg: '', // 原単価エラー
      sellPriceErrorMsg: '', // 売単価エラー
      manufacturerPriceErrorMsg: '', // 定価単価エラー
      sellStartDateErrorMsg: '', // 販売開始日エラー
      sellEndDateErrorMsg: '', // 販売終了日エラー

      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      // Step1 暫定仕様 決済種別(除外)を編集しない.
      // G005.00.0 Update-Start
      // stockPaymentType: []
      stockPaymentType: ['']
      // G005.00.0 Update-End
    }
  },
  components: {
    popup,
    dialogExlusionSelect
  },
  methods: {
    // G003.00.0 Update Start
    // open (storeCd, productId, productData, refreshFunc, closeFunc) {
    open (data, storeCd, productId, productData, refreshFunc, closeFunc, priceList) {
      this.data = {...data}
      this.data.pricelists.priceList = priceList
      // G003.00.0 Update End
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.productDataBase = productData
      // G003.00.0 Update Start
      this.getPayments(storeCd)
      this.getTaxRates(storeCd)
      // if (this.getTaxRates(storeCd) === false) return
      // if (this.getPayments(storeCd) === false) return
      // G003.00.0 Update End
      if (productData !== null) {
        // 更新
        this.mode = 2
        this.title = this.$i18n.t('F00108.S012')
        this.productData.priceId = productData.pricelists.id
        this.productData.storeCd = storeCd
        this.productData.productId = productId// ○バーコード
        this.productData.name = productData.catalogs.displayName.kanji// ○漢字名称
        this.productData.kana = productData.catalogs.displayName.kana// カナ名称
        this.productData.receipt = productData.catalogs.displayName.receipt// レシート印字名称
        this.productData.receiptPrintType = productData.catalogs.receiptPrint// レシート印字名称区分
        if (productData.catalogs.receiptPrint == true) {
          this.productData.receiptPrintType = 1
        }
        if (productData.catalogs.receiptPrint == false) {
          this.productData.receiptPrintType = 2
        }
        this.productData.taxType = productData.catalogs.productTaxCodes// POS売上税区分
        this.productData.cost = productData.pricelists.unitPrice// 原単価
        this.productData.sellPrice = productData.pricelists.price// ○売単価
        this.productData.manufacturerPrice = productData.pricelists.manufacturerPrice// ○定価単価

        this.productData.productType = productData.catalogs.productClassification
        // DEL S Gotou STDIssue#753
        // this.productData.ageToBuy = productData.catalogs.ageToBuy
        // DEL E Gotou STDIssue#753
        this.productData.pricedownType = productData.catalogs.discountable
        // G001.00.0 Update-Start
        // this.productData.priceChangeType = productData.catalogs.priceOverrideAllowed
        this.productData.priceChangeType = productData.catalogs.priceChangeOperation
        // G001.00.0 Update-End
        this.productData.discountParType = productData.catalogs.subTotalDiscountable
        this.productData.priceRequiredType = productData.catalogs.priceRequired
        this.productData.dutyFreeType = productData.catalogs.dutyFreeClassification
        this.productData.sellStopType = productData.catalogs.notForSale
        // G001.00.0 Update-Start
        // this.productData.priceOverrideAllowed = productData.catalogs.priceOverrideAllowed
        this.productData.priceChangeOperation = productData.catalogs.priceChangeOperation
        // G001.00.0 Update-End
        this.startDate = this.productData.sellStartDate
        this.endDate = this.productData.sellEndDate

        if (productData.catalogs.categories == null) {
          productData.catalogs.categories = ''
        }

        if (this.productData.pricedownType) {
          this.productData.pricedownType = 1
        } else {
          this.productData.pricedownType = 2
        }

        if (this.productData.priceChangeType) {
          this.productData.priceChangeType = 1
        } else {
          this.productData.priceChangeType = 2
        }

        if (this.productData.discountParType) {
          this.productData.discountParType = 1
        } else {
          this.productData.discountParType = 2
        }

        if (this.productData.priceRequiredType) {
          this.productData.priceRequiredType = 1
        } else {
          this.productData.priceRequiredType = 2
        }

        if (this.productData.sellStopType) {
          this.productData.sellStopType = 1
        } else {
          this.productData.sellStopType = 2
        }
        // G001.00.0 Update-Start
        // if(this.productData.priceOverrideAllowed){
        // this.productData.priceOverrideAllowed = 1
        // }else{
        // this.productData.priceOverrideAllowed = 2
        // }
        if (this.productData.priceChangeOperation) {
          this.productData.priceChangeOperation = 1
        } else {
          this.productData.priceChangeOperation = 2
        }
        // G001.00.0 Update-End
        // ○POS売上税区分
        if (productData.catalogs.taxCodes == 'TAX1') {
          this.productData.taxType = 1
        }
        if (productData.catalogs.taxCodes == 'TAX2') {
          this.productData.taxType = 2
        }
        if (productData.catalogs.taxCodes == 'TAX3') {
          this.productData.taxType = 3
        }
        if (productData.catalogs.taxCodes == 'TAX4') {
          this.productData.taxType = 4
        }
        if (productData.catalogs.taxCodes == 'TAX5') {
          this.productData.taxType = 5
        }

        /*
        // ○商品区分
        if (productData.catalogs.categories.indexOf('productToNotRecordSales') >= 0) {
            this.productData.productType = 1
        } else {
            this.productData.productType = 0
        }
        */
        // ADD S Gotou STDIssue#753
        // ○年齢確認商品
        if (productData.catalogs.ageToBuy == '20') {
          this.productData.ageCheckType = 1
        } else {
          this.productData.ageCheckType = 2
        }
        // ADD E Gotou STDIssue#753
        /*
        // ○割引区分
        if (productData.catalogs.categories.indexOf('nonDivision') >= 0) {
            this.productData.discountType = 2
        } else {
            this.productData.discountType = 1
        }
        this.productData.premiunType = 1// 割増区分
        // ○値引区分
        if (productData.catalogs.discountable) {
            this.productData.pricedownType = 1
        } else {
            this.productData.pricedownType = 2
        }
        // ○売変区分
        if (productData.catalogs.priceOverrideAllowed) {
            this.productData.priceChangeType = 1
        } else {
            this.productData.priceChangeType = 2
        }
        // ○POS売上税区分
        if (productData.catalogs.taxCodes == "TAX1") {
            this.productData.taxType = 1
        }
        if (productData.catalogs.taxCodes == "TAX2") {
            this.productData.taxType = 2
        }
        if (productData.catalogs.taxCodes == "TAX3") {
            this.productData.taxType = 3
        }
        if (productData.catalogs.taxCodes == "TAX4") {
            this.productData.taxType = 4
        }
        if (productData.catalogs.taxCodes == "TAX5") {
            this.productData.taxType = 5
        }
        if (productData.catalogs.taxCodes == "TAX6") {
            this.productData.taxType = 6
        }
        if (productData.catalogs.taxCodes == "TAX7") {
            this.productData.taxType = 7
        }
        if (productData.catalogs.taxCodes == "TAX8") {
            this.productData.taxType = 8
        }
        if (productData.catalogs.taxCodes == "TAX9") {
            this.productData.taxType = 9
        }
        if (productData.catalogs.taxCodes == "TAX10") {
            this.productData.taxType = 10
        }
        // ○レシート印字区分
        if (productData.catalogs.receiptPrintAllowed) {
            this.productData.receiptPrintType = 1
        } else {
            this.productData.preceiptPrintType = 2
        }
        this.productData.discountParType = 1// 小計値引割引按分処理区分
        this.productData.priceRequiredType = 1// 金額強制入力
        this.productData.zeroPriceType = 1// 0円単価区分
        this.productData.dutyFreeType = 1// 免税区分
        this.productData.paymentType = 1// 決済種別区分
        */

        if (productData.pricelists.startDate == null) {
          this.productData.sellStartDate = ''// ○販売開始日
        } else {
          this.productData.sellStartDate = productData.pricelists.startDate.substr(0, 10).replace(/-/g, '/')// ○販売開始日
        }
        if (productData.pricelists.endDate == null) {
          this.productData.sellEndDate = ''// ○販売終了日
        } else {
          this.productData.sellEndDate = productData.pricelists.endDate.substr(0, 10).replace(/-/g, '/')// ○販売終了日
        }

        if (productData.catalogs.lastModifiedTimestamp == null) {
          this.productData.lastUpdate = ''// ○最終更新日時
        } else {
          this.productData.lastUpdate = productData.catalogs.lastModifiedTimestamp.substr(0, 10).replace(/-/g, '/')// ○最終更新日時
        }
        // G003.00.0 Delete Start
        // if (productData.catalogs.paymentRestrictions.paymentTypeExclusions != null && productData.catalogs.paymentRestrictions.paymentTypeExclusions.length > 0) {
        //   // Step1 暫定仕様 決済種別(除外)を編集しない.
        //   this.productData.paymentType = null
        //   this.stockPaymentType = productData.catalogs.paymentRestrictions.paymentTypeExclusions.map(e => e.paymentType)
        // }
        // G003.00.0 Delete End
      } else {
        // 新規
        this.mode = 1
        this.title = this.$i18n.t('F00108.S011')
        var date = new Date()
        date.setDate(date.getDate() + 1)
        var startDate = date.getFullYear() + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0')
        // 初期化
        this.productData = {
          storeCd: storeCd, // 店舗コード
          productId: productId, // ○バーコード
          name: '', // ○漢字名称
          kana: '', // カナ名称
          receipt: '', // レシート印字名称
          receiptPrint: 1, // POS売上税区分
          receiptPrintType: 1,
          taxType: 1, // レシート印字名称区分
          cost: '', // 原単価
          sellPrice: '', // ○売単価
          manufacturerPrice: '', // ○定価単価
          productType: 0, // ○商品区分
          ageCheckType: 2, // ○年齢確認商品
          discountType: 1, // ○割引区分
          premiunType: 1, // 割増区分
          pricedownType: 1, // ○値引区分
          priceChangeType: 1, // ○売変区分
          discountParType: 1, // 小計値引割引按分処理区分
          priceRequiredType: 2, // 金額強制入力区分
          zeroPriceType: 1, // 0円単価区分
          dutyFreeType: 2, // 免税区分
          paymentType: 1, // 決済種別区分
          sellStartDate: startDate, // ○販売開始日
          sellEndDate: '2999/12/31', // ○販売終了日
          sellStopType: 2, // 販売停止区分
          lastUpdate: ''// ○最終更新日時
        }
      }
    },
    async getTaxRates (storeCd) {
      var result = false
      try {
        const params = { nodeId: storeCd }
        let response = await axios.get(this.$i18n.t('prop.url') + taxRatesPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        if (response.data.result.code === 0) {
          // 0:正常
          this.taxTypeList = []
          var taxRates = response.data.responseModel
          if (taxRates['TAX1'].indicator != null) { this.taxTypeList.push({ code: 1, value: taxRates['TAX1'].indicator }) }
          if (taxRates['TAX2'].indicator != null) { this.taxTypeList.push({ code: 2, value: taxRates['TAX2'].indicator }) }
          if (taxRates['TAX3'].indicator != null) { this.taxTypeList.push({ code: 3, value: taxRates['TAX3'].indicator }) }
          if (taxRates['TAX4'].indicator != null) { this.taxTypeList.push({ code: 4, value: taxRates['TAX4'].indicator }) }
          if (taxRates['TAX5'].indicator != null) { this.taxTypeList.push({ code: 5, value: taxRates['TAX5'].indicator }) }
          if (taxRates['TAX6'].indicator != null) { this.taxTypeList.push({ code: 6, value: taxRates['TAX6'].indicator }) }
          if (taxRates['TAX7'].indicator != null) { this.taxTypeList.push({ code: 7, value: taxRates['TAX7'].indicator }) }
          if (taxRates['TAX8'].indicator != null) { this.taxTypeList.push({ code: 8, value: taxRates['TAX8'].indicator }) }
          if (taxRates['TAX9'].indicator != null) { this.taxTypeList.push({ code: 9, value: taxRates['TAX9'].indicator }) }
          if (taxRates['TAX10'].indicator != null) { this.taxTypeList.push({ code: 10, value: taxRates['TAX10'].indicator }) }
          result = true
          // G004.00.0 Add-Start
        } else if (response.data.result.code === -30) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G004.00.0 Add-End
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    // G003.00.0 Update Start
    // async getPayments (storeCd) {
    //   var result = false
    //   try {
    //     const params = { nodeId: storeCd }
    //     let response = await axios.get(this.$i18n.t('prop.url') + paymentsPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
    //     if (response.data.result.code === 0) {
    //       // 0:正常
    //       var payments = response.data.responseModel
    //       this.paymentTypeList = []
    //       // this.paymentTypeList = response.data.responseModel
    //       for (let key in response.data.responseModel['configurations']) {
    //       // console.log('key:' + key + ' value:' + response.data.responseModel['configurations'][key].value.displayName.default);
    //         this.paymentTypeList.push(response.data.responseModel['configurations'][key].value.displayName.default)
    //       }
    //       result = true
    //     } else {
    //       this.globalErrorMapping(response.data.result)
    //     }
    //   } catch (error) {
    //     this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
    //     console.log(error)
    //   }
    //   return result
    // },
    async getPayments (storeCd) {
      var result = false
      try {
        const params = { nodeId: storeCd }
        let response = await axios.get(this.$i18n.t('prop.url') + paymentsPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        if (response.data.result.code === 0) {
          // 0:正常
          // G005.00.1 Update-Start
          // var countValue = 1
          this.paymentTypeList = []
          for (let key in response.data.responseModel['configurations']) {
            if (response.data.responseModel['configurations'][key].value.displayName) {
              const name = response.data.responseModel['configurations'][key].name
              const group = response.data.responseModel['configurations'][key].group
              if (name.startsWith('PAYMENT_') && name.length === 10 && group === 'PAYMENT') {
                const num = parseInt(name.split('_')[1])
                if (num > -1) {
                  this.paymentTypeList.push({ value: num, name: response.data.responseModel['configurations'][key].value.displayName.default })
                }
              }
              // this.paymentTypeList.push({ value: countValue, name: response.data.responseModel['configurations'][key].value.displayName.default })
              // countValue += 1
              // G005.00.1 Update-End
            }
          }
          result = true
          // G004.00.0 Add-Start
        } else if (response.data.result.code === -30) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G004.00.0 Add-End
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      this.setExlusionInit()
      return result
    },
    // G003.00.0 Update End
    // G003.00.0 Add Start
    onExlusionSelected (selectedExlusions) {
      this.data.catalogs.paymentRestrictions.paymentTypeExclusions = selectedExlusions.map(item => ({ paymentType: 'PAYMENT_' + item.value.toString().padStart(2, '0') }))
      this.setExlusion(selectedExlusions)
    },
    setExlusion (exlusions) {
      const exlusionNames = exlusions.map(item => item.name)
      this.targetExlusionsName = exlusionNames.join(', ')
      // G005.00.1 Add-Start
      if (this.data.catalogs.paymentRestrictions.paymentTypeExclusions != null && this.data.catalogs.paymentRestrictions.paymentTypeExclusions.length > 0) {
        this.stockPaymentType = this.data.catalogs.paymentRestrictions.paymentTypeExclusions.map(e => e.paymentType)
      } else {
        this.stockPaymentType = ['']
      }
      // G005.00.1 Add-End
    },
    selectPaymentExlusions () {
      let selectedItems = []
      if (typeof this.data.catalogs.paymentRestrictions.paymentTypeExclusions === 'undefined' ||
        this.data.catalogs.paymentRestrictions.paymentTypeExclusions === null) {
        // G005.00.0 Update-Start
        // this.$refs.pop.open(2, '', '決済種別区分にデータがありません', '', false, () => {
        this.$refs.pop.open(2, '', '決済種別(除外)にデータがありません', '', false, () => {
          this.$refs.dialogExlusionSelect.open(this.paymentTypeList, selectedItems, true)
        }, false, null)
        // G005.00.0 Update-End
      } else {
        selectedItems = [...this.data.catalogs.paymentRestrictions.paymentTypeExclusions.map(obj => parseInt(obj.paymentType.split('_')[1]))]
        this.$refs.dialogExlusionSelect.open(this.paymentTypeList, selectedItems, true)
      }
    },
    setExlusionInit () {
      let selectedExlusions = []
      if (typeof this.data.catalogs.paymentRestrictions.paymentTypeExclusions !== 'undefined' &&
        this.data.catalogs.paymentRestrictions.paymentTypeExclusions !== null &&
        this.data.catalogs.paymentRestrictions.paymentTypeExclusions.length) {
        this.data.catalogs.paymentRestrictions.paymentTypeExclusions.forEach((obj) => {
          let exlusion = this.paymentTypeList.find((exlusion) => {
            return parseInt(exlusion.value) === parseInt(obj.paymentType.split('_')[1])
          })
          if (typeof exlusion !== 'undefined') {
            selectedExlusions.push(exlusion)
          }
        })
      }

      this.setExlusion(selectedExlusions)
    },
    // G003.00.0 Add End
    openEnd () {
      // document.getElementsByClassName('textName')[0].focus()
      // document.getElementById('baseTable').scrollTo(0, 0)
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
        // 保存データ
        var params = {
          mode: this.mode,
          priceId: this.productData.priceId,
          nodeId: this.productData.storeCd,
          itemId: this.productData.productId,
          kanji: this.productData.name,
          kana: this.productData.kana,
          receipt: this.productData.receipt,
          receiptPrintType: this.productData.receiptPrintType,
          taxType: this.productData.taxType,
          sellPrice: this.productData.sellPrice,
          cost: this.productData.cost,
          manufacturerPrice: this.productData.manufacturerPrice,
          productType: this.productData.productType,
          ageToBuy: this.productData.ageCheckType,
          pricedownType: this.productData.pricedownType,
          priceChangeType: this.productData.priceChangeType,
          discountParType: this.productData.discountParType,
          priceRequiredType: this.productData.priceRequiredType,
          dutyFreeType: this.productData.dutyFreeType,
          sellStopType: this.productData.sellStopType,

          // Step1 暫定仕様 決済種別(除外)を編集しない.
          // paymentType : this.productData.paymentType,
          paymentType: this.stockPaymentType,

          // G001.00.0 Update-Start
          // priceOverrideAllowed: false,
          priceChangeOperation: false,
          // G001.00.0 Update-End
          startDate: this.productData.sellStartDate,
          endDate: this.productData.sellEndDate,
          taxCode: ''
        }

        if (this.mode == 2) {
          // 変更時
          params.pricelistRecordId = this.productDataBase.pricelists.id
        }

        // 売単価
        if (this.productData.sellPrice == null || this.productData.sellPrice == '') {
          params.price = 0
        }

        // 原単価
        if (this.productData.cost == null || this.productData.cost == '') {
          params.cost = 0
        }
        // 定価単価
        if (this.productData.manufacturerPrice == null || this.productData.manufacturerPrice == '') {
          params.manufacturerPrice = 0
        }
        // 商品区分
        if (this.productData.productType == 1) {
          // 売上外商品
          params.productToNotRecordSales = 'productToNotRecordSales'
        }
        // 年齢確認商品
        if (this.productData.ageCheckType == 1) {
          // 対象
          params.ageToBuy = '20'
        }
        // 割引区分
        if (this.productData.discountType == 2) {
          // 禁止
          params.nonDivision = 'nonDivision'
        }
        // 値引区分
        if (this.productData.pricedownType == 2) {
          // 禁止
          params.discountable = false
        } else {
          // 許可
          params.discountable = true
        }
        // 売変区分
        if (this.productData.priceChangeType == 2) {
          // 禁止
          // G001.00.0 Update-Start
          // params.priceOverrideAllowed = false
          params.priceChangeOperation = false
          // G001.00.0 Update-End
        } else {
          // 許可
          // G001.00.0 Update-Start
          // params.priceOverrideAllowed = true
          params.priceChangeOperation = true
          // G001.00.0 Update-End
        }
        // レシート印字区分
        if (this.productData.receiptPrintType == 2) {
          // 禁止
          params.receiptPrintAllowed = false
        } else {
          // 許可
          params.receiptPrintAllowed = true
        }
        // POS売上税区分
        params.taxCode = this.productData.taxType

        // 保存
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
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
        // G004.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
        // G004.00.0 Update-End
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
    // 削除
    async executeDelete () {
      var result = false
      try {
        var params = {nodeId: this.productData.storeCd, itemId: this.productData.productId, pricelistRecordId: this.productDataBase.pricelists.id}
        let response = await axios.delete(this.$i18n.t('prop.url') + deletePath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ data: params }))
        if (response.data.result.code === 0) {
          result = true
          // G004.00.0 Add start
        } else if (response.data.result.code === -30) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G004.00.0 Add End
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        // G004.00.0 Update start
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
        // G004.00.0 Update End
        console.log(error)
      }
      return result
    },
    saveErrorMapping (result) {
      this.focusItem = null
      // エラーメッセージ
      if (result.code === -99) {
        // 販売終了日エラー
        if (result.errorMessageMap['endDate'] !== undefined) {
          this.sellEndDateErrorMsg = result.errorMessageMap['endDate'].toString().split(',')
          this.focusItem = this.$refs.sellEndDateText
        }
        // 販売開始日エラー
        if (result.errorMessageMap['startDate'] !== undefined) {
          this.sellStartDateErrorMsg = result.errorMessageMap['startDate'].toString().split(',')
          this.focusItem = this.$refs.sellStartDateText
        }
        // 売単価エラー
        if (result.errorMessageMap['price'] !== undefined) {
          this.sellPriceErrorMsg = result.errorMessageMap['price'].toString().split(',')
          this.focusItem = this.$refs.sellPriceText
        }
        // 売単価エラー
        if (result.errorMessageMap['sellPrice'] !== undefined) {
          this.sellPriceErrorMsg = result.errorMessageMap['price'].toString().split(',')
          this.focusItem = this.$refs.sellPriceText
        }
        // 定価単価エラー
        if (result.errorMessageMap['manufacturerPrice'] !== undefined) {
          this.manufacturerPriceErrorMsg = result.errorMessageMap['manufacturerPrice'].toString().split(',')
          this.focusItem = this.$refs.manufacturerPriceText
        }
        // 原単価エラー対象外
        // レシート印字エラー対象外
        // カナ名称エラー対象外
        // 漢字エラー
        if (result.errorMessageMap['kanji'] !== undefined) {
          this.nameErrorMsg = result.errorMessageMap['kanji'].toString().split(',')
          this.focusItem = this.$refs.nameText
        }
        if (result.errorMessageMap['kana'] !== undefined) {
          this.kanaErrorMsg = result.errorMessageMap['kana'].toString().split(',')
          this.focusItem = this.$refs.kanaText
        }
        if (result.errorMessageMap['receipt'] !== undefined) {
          this.receiptErrorMsg = result.errorMessageMap['receipt'].toString().split(',')
          this.focusItem = this.$refs.receiptText
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
      this.kanaErrorMsg = ''
      this.receiptErrorMsg = ''
      this.costErrorMsg = ''
      this.sellPriceErrorMsg = ''
      this.manufacturerPriceErrorMsg = ''
      this.sellStartDateErrorMsg = ''
      this.sellEndDateErrorMsg = ''
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      this.productData.sellPrice = this.productData.sellPrice.toString().replace(/[^0-9]/gi, '')
      this.productData.manufacturerPrice = this.productData.manufacturerPrice.toString().replace(/[^0-9]/gi, '')
      this.productData.cost = this.productData.cost.toString().replace(/[^0-9]/gi, '')
    },
    // 文字入力規制(半角数字＋「/」のみ)
    dateInputRegulation () {
      this.productData.sellStartDate = this.productData.sellStartDate.toString().replace(/[^0-9\/]/gi, '')
      this.productData.sellEndDate = this.productData.sellEndDate.toString().replace(/[^0-9\/]/gi, '')
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
          if (this.productData.name == str) {
            this.productData.name = str.toString().substring(0, i)
          } else if (this.productData.kana == str) {
            this.productData.kana = str.toString().substring(0, i)
          } else if (this.productData.receipt == str) {
            this.productData.receipt = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  },
  // G002.00.0 Add start
  async mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G002.00.0 Add end
}
