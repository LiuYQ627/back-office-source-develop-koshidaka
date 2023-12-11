/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import productGroupKeywordItems from '@/resource/templates/ProductGroupMaster/ProductGroupKeywordItems'
const taxRatesPath = 'ProductMaster/TaxRates'
const paymentsPath = 'ProductMaster/Payments'
const registPath = 'ProductGroupMaster/ProductRegist'
const hierarchyPath = 'ProductGroupMaster/hierarchy'
const deletePath = 'ProductGroupMaster/ProductDeleted'
const TAX_TAXES_QUERY = 'TaxTaxes/Query'

export default {
  // [Vue.js]データオブジェクト定義
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      sellClass: false,     // 売上構成登録識別
      topLevel: false,      // 最上位構成識別
      permissions: [],
      productData: {
        storeCd: 0,                     // 店舗コード
        groupName: '',                  // グループ名称
        parentId: 0,                    // リンクコード
        parentName: '',                 // リンクコード名称
        productClassificationNumber: 0, // 分類No
        productId: 0,                   // 商品構成コード
        name: '',                       // 漢字名称
        taxType: -1,                    // POS売上税区分
        productType: -1,                // 商品区分
        ageCheckType: 2,                // 年齢確認商品
        pricedownType: -1,              // 値割引区分
        priceChangeType: -1,            // 売変区分
        discountParType: -1,            // 小計値引割引対象
        priceRequiredType: true,        // 金額強制入力
        dutyFreeType: -1,               // 免税区分
//        paymentType: -1,                // 決済種別
        sellStopType: -1,               // 販売停止区分
        lastUpdate: '',                 // 最終更新日時
      },

      // POS売上税区分
      // getTaxRates()にて初期化
      taxTypeList: [],

      // 商品区分
      productTypeList: [
        // 通常商品、売上外商品、上位参照
        { code:  0, value: this.$i18n.t('F00204.S055') },
        { code:  1, value: this.$i18n.t('F00204.S056') },
      ],

      // 年齢確認商品
      ageCheckTypeList: [
        // 対象、非対象
        { code:  1, value: this.$i18n.t('F00204.S058') },
        { code:  2, value: this.$i18n.t('F00204.S059') },
      ],

      // 値引区分
      pricedownTypeList: [
        // 許可、禁止、上位参照
        { code:  1, value: this.$i18n.t('F00204.S061') },
        { code:  2, value: this.$i18n.t('F00204.S062') },
      ],

      // 売変区分
      priceChangeTypeList: [
        // 許可、禁止、上位参照
        { code:  1, value: this.$i18n.t('F00204.S064') },
        { code:  2, value: this.$i18n.t('F00204.S065') },
      ],

      // 小計値引割引対象
      discountParTypeList: [
        // 対象、非対象、上位参照
        { code:  1, value: this.$i18n.t('F00204.S067') },
        { code:  2, value: this.$i18n.t('F00204.S068') },
      ],

      // 免税区分
      dutyFreeTypeList: [
        // 一般物品、消耗品、非対象、上位参照
        { code:  0, value: this.$i18n.t('F00204.S071') },
        { code:  1, value: this.$i18n.t('F00204.S072') },
        { code:  2, value: this.$i18n.t('F00204.S073') },
      ],

      // 決済種別区分
      // getPayments()にて初期化
      paymentTypeList: [],

      // 販売停止区分
      sellStopTypeList: [
        // 停止する、停止しない、上位参照
        { code:  1, value: this.$i18n.t('F00204.S075') },
        { code:  2, value: this.$i18n.t('F00204.S076') },
      ],

      linkErrorMsg: '',             // リンクコードエラー
      nameErrorMsg: '',             // 漢字エラー

      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      stockPaymentType: null        // DB決済種別保存用
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
,bWireMock: false
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
    }
  },
  // [Vue.js]ローカルコンポーネント登録
  components: {
    popup,
    productGroupKeywordItems
  },
  // [Vue.js]メソッド定義
  methods: {
    // [function]マスタ新規／編集ダイアログ表示処理
    // （storeCd：店舗コード、divisionList：商品分類階層情報、productClassificationNumber：分類No、
    //   productId：商品構成コード、productData：商品構成情報※新規の場合null、
    //   refreshFunc：「保存」操作時コールバック処理、closeFunc：「戻る」操作時コールバック処理）
    open (storeCd, divisionList, productClassificationNumber, productId, productData, refreshFunc, closeFunc) {
      this.dialog = true
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.divisionList = divisionList
      this.productData.storeCd = storeCd                                            // 店舗コード
      this.productData.productClassificationNumber = productClassificationNumber    // 分類No
      if (this.divisionList[this.productData.productClassificationNumber - 1].registrationType !== '') {
        this.sellClass = true    // 売上登録構成
      } else {
        this.sellClass = false  // 売上登録外構成
      }
      if (this.divisionList[this.productData.productClassificationNumber - 1].usedFlg === true) {
        this.topLevel = true    // 最上位構成
      } else {
        this.topLevel = false
      }
      let topSellClass = this.isTopSellClass(this.topLevel, this.sellClass, this.productData.productClassificationNumber)
      if (this.getTaxRates(storeCd, topSellClass) === false) return       // 税区分リスト作成
//      if (this.getPayments(storeCd) === false) return     // 決済種別リスト作成
      // 上位参照選択肢が存在する場合削除する
      if (this.productTypeList[this.productTypeList.length - 1].code === -1) this.productTypeList.pop()
      if (this.pricedownTypeList[this.pricedownTypeList.length - 1].code === -1) this.pricedownTypeList.pop()
      if (this.priceChangeTypeList[this.priceChangeTypeList.length - 1].code === -1) this.priceChangeTypeList.pop()
      if (this.discountParTypeList[this.discountParTypeList.length - 1].code === -1) this.discountParTypeList.pop()
      if (this.dutyFreeTypeList[this.dutyFreeTypeList.length - 1].code === -1) this.dutyFreeTypeList.pop()
      if (this.sellStopTypeList[this.sellStopTypeList.length - 1].code === -1) this.sellStopTypeList.pop()
      if (topSellClass === false) {
        // 上位参照選択肢の追加
        this.productTypeList.push({ code: -1, value: this.$i18n.t('F00204.S057') })
        this.pricedownTypeList.push({ code: -1, value: this.$i18n.t('F00204.S063') })
        this.priceChangeTypeList.push({ code: -1, value: this.$i18n.t('F00204.S066') })
        this.discountParTypeList.push({ code: -1, value: this.$i18n.t('F00204.S069') })
        this.dutyFreeTypeList.push({ code: -1, value: this.$i18n.t('F00204.S074') })
        this.sellStopTypeList.push({ code: -1, value: this.$i18n.t('F00204.S077') })
      }

      if (productData !== null) {
        // 更新
        this.mode = 2
        this.title = this.$i18n.t('F00204.S012')
        this.productData.groupName = productData.catalogs.name          // グループ名称
        this.productData.parentId = productData.catalogs.parentId       // リンクコード
        this.productData.parentName = productData.catalogs.parentName   // リンクコード名称
        this.productData.productId = productData.productId              // 商品構成コード
        this.productData.name = productData.catalogs.displayName.kanji  // 漢字名称
        // 商品区分
        if (productData.catalogs.namedAttributes.productClassification !== null) {
          this.productData.productType = productData.catalogs.namedAttributes.productClassification
        } else {
          this.productData.productType = -1
        }
        // 値引区分
        if (productData.catalogs.namedAttributes.discountable !== null) {
          if(productData.catalogs.namedAttributes.discountable){
            this.productData.pricedownType = 1    // 許可
          }else{
            this.productData.pricedownType = 2    // 禁止
          }
        } else {
          this.productData.pricedownType = -1
        }
        // 売変区分
        if (productData.catalogs.namedAttributes.priceChangeOperation !== null) {
          if(productData.catalogs.namedAttributes.priceChangeOperation){
            this.productData.priceChangeType = 1  // 許可
          }else{
            this.productData.priceChangeType = 2  // 禁止
          }
        } else {
          this.productData.priceChangeType = -1
        }
        // 小計値引割引対象
        if (productData.catalogs.namedAttributes.subTotalDiscountable !== null) {
          if(productData.catalogs.namedAttributes.subTotalDiscountable){
            this.productData.discountParType = 1  // 対象
          }else{
            this.productData.discountParType = 2  // 非対象
          }
        } else {
            this.productData.discountParType = -1
        }
        // 金額強制入力
        if (productData.catalogs.namedAttributes.priceRequired !== null) {
          this.productData.priceRequiredType = productData.catalogs.namedAttributes.priceRequired
        } else {
          this.productData.priceRequiredType = true
        }
        // 免税区分
        if (productData.catalogs.namedAttributes.dutyFreeClassification !== null) {
          this.productData.dutyFreeType = productData.catalogs.namedAttributes.dutyFreeClassification
        } else {
          this.productData.dutyFreeType = -1
        }
        // 販売停止区分
        if (productData.catalogs.namedAttributes.notForSale !== null) {
          if(productData.catalogs.namedAttributes.notForSale){
            this.productData.sellStopType = 1     // 停止する
          }else{
            this.productData.sellStopType = 2     // 停止しない
          }
        } else {
            this.productData.sellStopType = -1
        }
        // POS売上税区分
        if (productData.catalogs.namedAttributes.productTaxCodes !== null) {
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX1") {
            this.productData.taxType = 1
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX2") {
            this.productData.taxType = 2
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX3") {
            this.productData.taxType = 3
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX4") {
            this.productData.taxType = 4
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX5") {
            this.productData.taxType = 5
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX6") {
            this.productData.taxType = 6
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX7") {
            this.productData.taxType = 7
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX8") {
            this.productData.taxType = 8
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX9") {
            this.productData.taxType = 9
          }
          if (productData.catalogs.namedAttributes.productTaxCodes[0] === "TAX10") {
            this.productData.taxType = 10
          }
        } else {
          this.productData.taxType = -1
        }
        // 年齢確認商品
        if (productData.catalogs.namedAttributes.ageToBuy !== null &&
            productData.catalogs.namedAttributes.ageToBuy === 20) {
            this.productData.ageCheckType = 1             // 対象
        } else {
          this.productData.ageCheckType = 2             // 非対象
        }
        // 最終更新日時
        if (productData.catalogs.lastModifiedTimestamp != null) {
          this.productData.lastUpdate = productData.catalogs.lastModifiedTimestamp.substr(0, 10).replace(/-/g, '/')
        }
        // 決済種別
        if(productData.catalogs.namedAttributes.paymentRestrictions.paymentTypeExclusions != null && productData.catalogs.namedAttributes.paymentRestrictions.paymentTypeExclusions.length > 0){
//          this.productData.paymentType = null   // ※ダイアログ表示はしない
          this.stockPaymentType = productData.catalogs.namedAttributes.paymentRestrictions.paymentTypeExclusions.map(e => e.paymentType)    // DBから取得した決済種別内容を保存
        }
      } else {
        // 新規
        this.mode = 1
        this.title = this.$i18n.t('F00204.S011')
        // 初期化
        let _groupName = storeCd.slice(0, 15) + productClassificationNumber + productId
        this.productData = {
          storeCd: storeCd,                                           // 店舗コード
          groupName: _groupName,                                      // グループ名称
          parentId: 0,                                                // リンクコード
          parentName: '',                                             // リンクコード名称
          productClassificationNumber: productClassificationNumber,   // 分類No.
          productId: productId,                                       // 商品構成コード
          name: '',                                                   // 漢字名称
          taxType: 1,                                                 // POS売上税区分    初期値：税区分1
          productType: 0,                                             // 商品区分         初期値：通常商品
          ageCheckType: 2,                                            // 年齢確認商品     初期値：非対象
          pricedownType: 1,                                           // 値割引区分       初期値：許可
          priceChangeType: 1,                                         // 売変区分         初期値：許可
          discountParType: 1,                                         // 小計値引割引対象 初期値：対象
          priceRequiredType: true,                                    // 金額強制入力
          dutyFreeType: 0,                                            // 免税区分         初期値：一般物品
          sellStopType: 2,                                            // 販売停止区分     初期値：停止しない
          lastUpdate: '',                                             // 最終更新日時
//          paymentType: -1,                      // 決済種別
        }
        if (topSellClass === false) {
          // 上位参照部分を初期値に再セットする
          this.productData.taxType = -1            // POS売上税区分    初期値：上位参照
          this.productData.productType = -1        // 商品区分         初期値：上位参照
          this.productData.pricedownType = -1      // 値割引区分       初期値：上位参照
          this.productData.priceChangeType = -1    // 売変区分         初期値：上位参照
          this.productData.discountParType = -1    // 小計値引割引対象 初期値：上位参照
          this.productData.dutyFreeType = -1       // 免税区分         初期値：上位参照
          this.productData.sellStopType = -1       // 販売停止区分     初期値：上位参照
        }
      }
    },
    // [function]最上位の売上登録構成であるかを調べる※true:最上位の売上登録構成
    isTopSellClass(topLevel, sellClass, productClassificationNumber) {
      let result = false
      if (sellClass === true) {
        // 売上登録構成の場合
        let index = productClassificationNumber - 1
        if (topLevel === true || this.divisionList[index - 1].registrationType === '') {
          // 自身が最上位分類であるか、または、上位リンクが売上外構成登録の場合
          result = true
        }
      }
      return result
    },
    // [function]税区分リスト作成(storeCd:店舗コード)
    async getTaxRates (storeCd, topSellClass) {
      let result = false
      let taxRatesList = []
      await axios.post(
        `${this.$i18n.t('prop.url')}${TAX_TAXES_QUERY}`,
        {
          nodeId: storeCd.slice(0, 15)
        },
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        switch (response.data.result.code) {
          case 0: // 0:正常
            taxRatesList = response.data.responseModel
            result = true
            break
          default: // その他
            throw response.data.result
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        await this.globalErrorMapping(error)
      })
      if (result === true) {
        this.taxTypeList = []
        taxRatesList.forEach(taxRate => {
          if (taxRate.name === 'TAX1') { this.taxTypeList[0] = { code: 1, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX2') { this.taxTypeList[1] = { code: 2, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX3') { this.taxTypeList[2] = { code: 3, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX4') { this.taxTypeList[3] = { code: 4, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX5') { this.taxTypeList[4] = { code: 5, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX6') { this.taxTypeList[5] = { code: 6, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX7') { this.taxTypeList[6] = { code: 7, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX8') { this.taxTypeList[7] = { code: 8, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX9') { this.taxTypeList[8] = { code: 9, value: taxRate.displayName.default } }
          if (taxRate.name === 'TAX10') { this.taxTypeList[9] = { code: 10, value: taxRate.displayName.default } }
        })
        if (topSellClass === false) {
          this.taxTypeList.push({ code: -1, value: this.$i18n.t('F00204.S054') })
        }
      }
      console.log('result', result, 'taxList', this.taxTypeList)
      return result
    },
    // [function]決済種別リスト作成(storeCd:店舗コード)
    async getPayments (storeCd) {
      let result = false
      try {
        const params = {nodeId: storeCd }
        let response = await axios.get(this.$i18n.t('prop.url') + paymentsPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        if (response.data.result.code === 0) {
          // 0:正常
          this.paymentTypeList = []
          for (let key in response.data.responseModel['configurations']) {
            this.paymentTypeList.push(response.data.responseModel['configurations'][key].value.displayName.default)
          }
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
    // [function]ダイアログオープン後処理※ダイアログオープン呼び出し元からopen()正常後にCallされる
    openEnd () {
      this.initErrorMessage()
    },
    // [event]リンクコードボタンクリック時ハンドラ
    async linkCodeSelect () {
      // リンクコード設定ダイアログオープン
      let _index = this.productData.productClassificationNumber - 1
      this.$refs.productGroupKeywordItems.open(this.productData.storeCd, _index)
      // ダイアログオープン後処理
      setTimeout(() => {
        this.$refs.productGroupKeywordItems.openEnd()
      }, 50)
    },
    // [event]リンクコード設定ダイアログ「OK」ボタンクリック時ハンドラ
    onSelectLinkCode (data) {
      this.productData.parentId = data.productId
      this.productData.parentName = data.name
    },
    // [event]「戻る」ボタンクリック時ハンドラ
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    // [function]戻る確認ポップアップ「OK」ボタンクリック時コールバック処理
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    // [event]「保存」ボタンクリック時ハンドラ
    async onClickSave () {
      this.initErrorMessage()
      // 妥当性チェック
      // １）リンクコード、リンク名
      if (this.topLevel === false) {
        // 最上位構成以外の場合
        if (this.productData.parentId === 0 || this.productData.parentName === '') {
          this.linkErrorMsg = [this.$i18n.t('F00204.S078')]
          this.focusItem = this.$refs.linkText
          return this.$refs.pop.open(3, '', this.$i18n.t('F00204.W002'), '', false, this.setFocus, false, null)
        }
      }
      // 「保存処理中」ポップアップ表示
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // 商品構成情報保存
      if (await this.executeSave() === true) {
        // 処理正常の場合
        // 再表示処理※ダイアログオープン呼び出し元が指定した処理を呼び出す
        if (await this.refreshFunc() === true) {
          // 処理正常の場合
          // 処理完了ポップアップ表示
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.closeFunc()
          this.dialog = false
        } else {
          // 「保存処理中」ポップアップ消去
          this.$refs.pop.closeFunction()
        }
      }
    },
    // [function]商品構成情報保存処理
    async executeSave () {
      let result = false
      // 保存データ
      let params = {
        "nodeId": this.productData.storeCd,
        "name": this.productData.groupName,
        "productClassificationNumber": this.productData.productClassificationNumber,
        "productId" : this.productData.productId,
        "kanji": this.productData.name,
        "attributes": {},
      }
      if (this.topLevel === false) {
        // 最上位構成以外の場合
        params.parentId = this.productData.parentId
        params.parentName = this.productData.parentName
      }
      if (this.sellClass === true) {
        // 売上登録構成の場合
        // POS売上税区分
        if (this.productData.taxType !== -1) {
          // 上位参照以外
          params.productTaxCodes = ['TAX'+this.productData.taxType]
        }
        // 商品区分
        if (this.productData.productType !== -1) {
          // 上位参照以外
          params.productClassification = this.productData.productType
        }
        // 年齢確認商品
        switch (this.productData.ageCheckType) {
          case 1:   // 対象
            params.ageToBuy = 20
            break;
          default:  // 非対象
            break;
        }
        // 値引区分
        switch (this.productData.pricedownType) {
          case 1 :  // 許可
            params.discountable = true
            break;
          case 2 :  // 禁止
            params.discountable = false
            break;
          default:  // 上位参照
            break;
        }
        // 売変区分
        switch (this.productData.priceChangeType) {
          case 1 :  // 許可
            params.priceChangeOperation  = true
            break;
          case 2 :  // 禁止
            params.priceChangeOperation  = false
            break;
          default:  // 上位参照
            break;
        }
        // 小計値引割引対象
        switch (this.productData.discountParType) {
          case 1 :  // 対象
            params.subTotalDiscountable  = true
            break;
          case 2 :  // 非対象
            params.subTotalDiscountable  = false
            break;
          default:  // 上位参照
            break;
        }
        if (this.stockPaymentType !== null) {
          // 決済種別：DB取得状態をそのままセット
          params.paymentType = this.stockPaymentType
        }
        // 免税区分
        if (this.productData.dutyFreeType !== -1) {
          params.dutyFreeClassification = this.productData.dutyFreeType
        }
        // 販売停止区分
        switch (this.productData.sellStopType) {
          case 1 :  // 停止する
            params.notForSale  = true
            break;
          case 2 :  // 停止しない
            params.notForSale  = false
            break;
          default:  // 上位参照
            break;
        }
        // 金額強制入力
        params.priceRequired = this.productData.priceRequiredType
      }
      // 保存
      try {
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.productData.storeCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
        let response = await axios.put(this.$i18n.t('prop.url') + registPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
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
    // [event]「削除」ボタンクリック時ハンドラ
    async onClickDelete () {
      // リンク階層有無判定
      let result = await this.getLinkHierarchy(this.productData.groupName)
      if (result === 1) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00204.W001'), '', false, null, false, null)
        this.closeFunc()
        this.dialog = false
      } else if (result === 0) {
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.runDelete, false, null)
      }
    },
    // [function]削除確認ポップアップ「OK」ボタンクリック時コールバック処理
    async runDelete () {
      // 「処理中」ポップアップ表示
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // 削除
      if (await this.executeDelete(this.productData.productId) === true) {
        if (await this.refreshFunc() === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.closeFunc()
          this.dialog = false
        } else {
          this.$refs.pop.closeFunction()
        }
      }
    },
    // [function]商品構成情報削除処理
    async executeDelete (productId) {
      let result = false
      try {
        let params = { nodeId: this.productData.storeCd, productId: productId, productClassificationNumber: this.productData.productClassificationNumber }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.productData.storeCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
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
    // [function]リンクアイテム存在有無取得処理(name:商品構成名称) 0:削除可能/1:リンクアイテムが存在する/-1:エラー発生
    async getLinkHierarchy (name) {
      let result = -1
      try {
        let params = { catalogName: this.productData.storeCd, groupName: name, level: 1}
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.catalogName = '9' + this.productData.storeCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
        let response = await axios.get(this.$i18n.t('prop.url') + hierarchyPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        if (response.data.result.code === 0) {
          if (response.data.responseModel.linkHierarchy.length <= 1) {
            // 当該商品構成をリンクするアイテムなし
            result = 0  // 削除可能
          } else {
            // 当該商品構成をリンクするアイテムがある場合
            result = 1  // 削除不可
          }
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    // [function]保存時エラー処理(result:レスポンス結果情報)
    saveErrorMapping (result) {
      this.focusItem = null
      // エラーメッセージ
      if (result.code === -99) {
        // 漢字エラー
        if (result.errorMessageMap['kanji'] !== undefined) {
          this.nameErrorMsg = result.errorMessageMap['kanji'].toString().split(',')
          this.focusItem = this.$refs.nameText
        }
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), result.code, false, this.setFocus, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    // [function]エラー共通処理(result:レスポンス結果情報)
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
    // [function]保存エラーポップアップ確認操作時コールバック処理
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    // [function]エラーメッセージ初期化処理
    initErrorMessage () {
      this.linkErrorMsg = ''
      this.nameErrorMsg = ''
    },
    // [event]名称エリア入力時桁数チェック処理(str:入力内容、maxLength:桁数上限値)
    inputLimit (str,maxLength) {
      if(str == null){return}
      let strLen = str.toString().length;
      // byte数の取得
      let byteLen = 0;
      for (let i = 0; i < strLen; i++) {
        let codeUnitNo = str.charCodeAt(i);
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0)
          || (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
            byteLen += 1;
        } else {
            byteLen += 2;
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          if (this.productData.name == str) {
            this.productData.name = str.toString().substring(0,i);
          break;
          } else {
            // maxLength以下は何もしない
          }
        }
      }
    },
    // [Vue.js]インスタンスDOMマウント時フック
    async mounted() {
      this.$root.$on('getPermissions', (permissions) => {
        this.permissions = permissions
      })
    }
  }
}
