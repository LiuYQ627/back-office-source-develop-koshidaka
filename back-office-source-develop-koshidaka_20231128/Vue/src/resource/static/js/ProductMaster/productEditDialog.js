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
// KSD V001.000 DS
// import popup from '@/resource/templates/CommonDesign/Popup'
// KSD V001.000 DE
import dialogExlusionSelect from '@/resource/templates/CommonDesign/DialogExlusionSelect'
// KSD V001.000 AS
import { inputNumberLimitation } from '@/resource/static/js/Common/jsUtils'
import linkCodeDialog from '@/resource/templates/ProductMaster/ProductLinkCodeDialog'
// KSD V001.000 AE
const taxRatesPath = 'ProductMaster/TaxRates'
const paymentsPath = 'ProductMaster/Payments'
const savePath = 'ProductMaster/ProductRegist'
const deletePath = 'ProductMaster/ProductDeleted'
// KSD V001.000 AS
const saveMenuPath = 'Restaurants/mc_fumenu'
const deleteMenuPath = 'Restaurants/mc_fumenuDelete'
const queryPathFumenu = 'RestaurantsSetTool/DbSelect'
const Projection = {
  version: 1,
  Code: 1,
  OwnCompanyCode: 1,
  Name1: 1,
  Name2: 1,
  Name3: 1,
  SubTanka_TaxIn: 1,
  TankaFFU2_TaxOut: 1,
  TankaFFU10_TaxIn: 1,
  TankaFFU10_TaxOut: 1,
  TOSts: 1,
  TankaSts: 1,
  TicketSts: 1,
  HoSts: 1,
  AddQtySts: 1,
  StlDiscSts: 1,
  ScpSts1_No: 1,
  ScpSts2_No: 1,
  ScpSts3_No: 1,
  ScpSts4_No: 1,
  ScpSts5_No: 1,
  ScpSts6_No: 1,
  ScpSts7_No: 1,
  ScpSts8_No: 1,
  ScpSts9_No: 1,
  ScpSts10_No: 1,
  ScpSts11_No: 1,
  ScpSts12_No: 1,
  OESMenuSts: 1,
  MenuAttr: 1,
  AutoTP: 1,
  SoldOutSts: 1,
  CautionMark: 1,
  FreeSts: 1,
  FreePrtSts: 1,
  KcpPtnEdtFlg: 1,
  KcpSts1: 1,
  KcpSts2: 1,
  KcpSts3: 1,
  KcpSts4: 1,
  KcpSts5: 1,
  KcpSts6: 1,
  KcpSts7: 1,
  KcpSts8: 1,
  KcpSts9: 1,
  KcpSts10: 1,
  KcpSts11: 1,
  KcpSts12: 1,
  KcpSts13: 1,
  KcpSts14: 1,
  KcpSts15: 1,
  KcpSts16: 1,
  KcpSts17: 1,
  KcpSts18: 1,
  KcpSts19: 1,
  KcpSts20: 1,
  KcpSts21: 1,
  KcpSts22: 1,
  KcpSts23: 1,
  KcpSts24: 1,
  KcpSts25: 1,
  KcpSts26: 1,
  KcpSts27: 1,
  KcpSts28: 1,
  KcpSts29: 1,
  KcpSts30: 1,
  KcpSts31: 1,
  KcpSts32: 1,
  PrtPriorityNo: 1,
  CcpPrtPosi: 1,
  CcpPrtSts: 1,
  KdPosiMark: 1,
  KdPassTime1: 1,
  KdPassTime2: 1,
  OESMenuCode: 1,
  RestNo: 1,
  LinKDpCode: 1,
  KeyFFU: 1,
  Name4: 1,
  Name5: 1,
  Name6: 1,
  Name7: 1,
  ImageFileName: 1,
  Tanka_TaxIn: 1,
  Tanka_TaxOut: 1,
  SubTanka_TaxOut: 1,
  TankaFFU1_TaxIn: 1,
  TankaFFU1_TaxOut: 1,
  TankaFFU2_TaxIn: 1,
  TankaFFU3_TaxIn: 1,
  TankaFFU3_TaxOut: 1,
  TankaFFU4_TaxIn: 1,
  TankaFFU4_TaxOut: 1,
  TankaFFU5_TaxIn: 1,
  TankaFFU5_TaxOut: 1,
  TankaFFU6_TaxIn: 1,
  TankaFFU6_TaxOut: 1,
  TankaFFU7_TaxIn: 1,
  TankaFFU7_TaxOut: 1,
  TankaFFU8_TaxIn: 1,
  TankaFFU8_TaxOut: 1,
  TankaFFU9_TaxIn: 1,
  TankaFFU9_TaxOut: 1,
  Genka: 1,
  GenkaFFU: 1,
  DpTanka1_DpCode: 1,
  DpTanka1: 1,
  DpTanka1_Genka: 1,
  DpTanka2_DpCode: 1,
  DpTanka2: 1,
  DpTanka2_Genka: 1,
  DpTanka3_DpCode: 1,
  DpTanka3: 1,
  DpTanka3_Genka: 1,
  DpTanka4_DpCode: 1,
  DpTanka4: 1,
  DpTanka4_Genka: 1,
  DpTanka5_DpCode: 1,
  DpTanka5: 1,
  DpTanka5_Genka: 1,
  PackSts: 1,
  Pack_TaxAmt: 1,
  Pack_HoAmt: 1,
  Pack_TaxTargetAmt: 1,
  Pack_HoTargetAmt: 1,
  TaxSts: 1,
  LinkMatomeCode: 1,
  LinkMMCode: 1,
  ScpSts1_MaxQty: 1,
  ScpSts2_MaxQty: 1,
  ScpSts3_MaxQty: 1,
  ScpSts4_MaxQty: 1,
  ScpSts5_MaxQty: 1,
  ScpSts6_MaxQty: 1,
  ScpSts7_MaxQty: 1,
  ScpSts8_MaxQty: 1,
  ScpSts9_MaxQty: 1,
  ScpSts10_MaxQty: 1,
  ScpSts11_MaxQty: 1,
  ScpSts12_MaxQty: 1,
  Teiban: 1,
  EtcDpSts: 1,
  MaeukeSts: 1,
  KcpPtnNum: 1,
  HtlBackColor: 1,
  SearchSts1: 1,
  SearchSts2: 1,
  SearchSts3: 1,
  SearchSts4: 1,
  SearchSts5: 1,
  SearchSts6: 1,
  SearchSts7: 1,
  SearchSts8: 1,
  SearchSts9: 1,
  SearchSts10: 1,
  SearchSts11: 1,
  SearchSts12: 1,
  SearchSts13: 1,
  SearchSts14: 1,
  SearchSts15: 1
}
const DEFAULT_VAL = {
  storeCd: 0,
  productId: 0,
  name: '',
  kana: '',
  receipt: '',
  receiptPrintType: 1,
  taxType: 1,
  cost: '',
  sellPrice: '',
  manufacturerPrice: '',
  productType: 0,
  ageCheckType: 2,
  discountType: 1,
  premiunType: 1,
  pricedownType: 1,
  priceChangeType: 1,
  discountParType: 1,
  priceRequiredType: 1,
  zeroPriceType: 1,
  dutyFreeType: 1,
  paymentType: 1,
  sellStartDate: '',
  sellEndDate: '',
  sellStopType: 1,
  lastUpdate: '',
  Code: '',
  OwnCompanyCode: '',
  Name2: '',
  Name3: '',
  SubTanka_TaxIn: '',
  TankaSts: '',
  TicketSts: '',
  AddQtySts: '',
  StlDiscSts: '',
  TOSts: '',
  HoSts: '',
  AutoTP: '',
  TankaFFU2_TaxOut: '',
  TankaFFU10_TaxIn: '',
  TankaFFU10_TaxOut: '',
  MenuAttr: '',
  OESMenuSts: '',
  SoldOutSts: '',
  CautionMark: '',
  FreeSts: '',
  FreePrtSts: '',
  KcpPtnEdtFlg: '',
  PrtPriorityNo: '',
  CcpPrtPosi: '',
  CcpPrtSts: '',
  KdPosiMark: '',
  KdPassTime1: '',
  KdPassTime2: '',
  ScpSts_No: [],
  KcpSts: [],
  linkCode: ''
}
const fuMenuUserParamsNames = Object.keys(Projection)
const fuMenuStringParams = ['Code', 'OwnCompanyCode', 'Name1', 'Name2', 'Name3', 'Name4', 'Name5', 'Name6', 'Name7', 'OESMenuCode', 'ImageFileName']
// KSD V001.000 AE

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
        // KSD V001.000 AS
        ,Code: '',
        OwnCompanyCode: '',
        Name2: 'その他メニュー',
        Name3: '',
        SubTanka_TaxIn: '',
        TankaSts: 0,
        TicketSts: 0,
        AddQtySts: 0,
        StlDiscSts: 0,
        TOSts: 0,
        HoSts: 0,
        AutoTP: 0,
        TankaFFU2_TaxOut: 0,
        TankaFFU10_TaxIn: 0,
        TankaFFU10_TaxOut: 0,
        MenuAttr: 0,
        OESMenuSts: 0,
        SoldOutSts: 0,
        CautionMark: '',
        FreeSts: '',
        FreePrtSts: '',
        KcpPtnEdtFlg: 0,
        PrtPriorityNo: '',
        CcpPrtPosi: '',
        CcpPrtSts: 0,
        KdPosiMark: '',
        KdPassTime1: '',
        KdPassTime2: '',
        ScpSts_No: Array(12).fill(0),
        KcpSts: Array(32).fill(0),
        linkCode: '',
        itemListLimit: 0,
        timeout: null
        // KSD V001.000 AE
      },
      // KSD V001.000 AS
      isMenuCode: false,
      hasErrorMessage: 0,
      // KSD V001.000 AE

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
      // KSD V001.000 AS
      // 単価ステータス
      unitPriceStatusList: [
        // プリセット, オープン
        { code: 0, value: this.$i18n.t('F00108.S082') },
        { code: 1, value: this.$i18n.t('F00108.S083') }
      ],
      // チケット発行対象メニュー
      ticketIssueTargetMenuList: [
        // 非対象, 対象
        { code: 0, value: this.$i18n.t('F00108.S046') },
        { code: 1, value: this.$i18n.t('F00108.S045') }
      ],
      // 数量加算
      quantityAddedList: [
        // 不加算, 加算
        { code: 0, value: this.$i18n.t('F00108.S086') },
        { code: 1, value: this.$i18n.t('F00108.S087') }
      ],
      // 小計割引／割増
      subTotalDiscountSurchargeList: [
        // 対象, 非対象
        { code: 0, value: this.$i18n.t('F00108.S045') },
        { code: 1, value: this.$i18n.t('F00108.S046') }
      ],
      // 持帰ステータス
      takeHomeStatusList: [
        // 飲食のみ, 飲食持帰り可, 持帰りのみ
        { code: 0, value: this.$i18n.t('F00108.S090') },
        { code: 1, value: this.$i18n.t('F00108.S091') },
        { code: 2, value: this.$i18n.t('F00108.S092') }
      ],
      // 奉仕料ステータス
      serviceFeeStatusList: [
        // 奉仕料対象外, 奉仕料対象, 奉仕料込み
        { code: 0, value: this.$i18n.t('F00108.S094') },
        { code: 3, value: this.$i18n.t('F00108.S095') },
        { code: 5, value: this.$i18n.t('F00108.S096') }
      ],
      // 自動トッピング
      autoToppingList: [
        // なし, あり
        { code: 0, value: this.$i18n.t('F00108.S069') },
        { code: 1, value: this.$i18n.t('F00108.S068') }
      ],
      // 主メニュー(前払いセルフ)
      mainMenuAdvSelfPayList: [
        // する, しない
        { code: 0, value: this.$i18n.t('F00108.S099') },
        { code: 1, value: this.$i18n.t('F00108.S100') }
      ],
      // ワンオーダー対象メニュー
      oneOrderMenuList: [
        // 非対象, 対象
        { code: 0, value: this.$i18n.t('F00108.S046') },
        { code: 1, value: this.$i18n.t('F00108.S045') }
      ],
      // アルコールステータス
      alcoholStatusList: [
        // 非対象, 対象
        { code: 0, value: this.$i18n.t('F00108.S046') },
        { code: 1, value: this.$i18n.t('F00108.S045') }
      ],
      // メニュー属性
      menuAttributesList: [
        // メインメニュー, コメントメニュ, サブメニュー, セットメニュー
        { code: 0, value: this.$i18n.t('F00108.S104') },
        { code: 1, value: this.$i18n.t('F00108.S105') },
        { code: 2, value: this.$i18n.t('F00108.S106') },
        { code: 3, value: this.$i18n.t('F00108.S178') }
      ],
      // OESメニュー使用区分
      OESMenuUseClassList: [
        // する, しない
        { code: 0, value: this.$i18n.t('F00108.S099') },
        { code: 1, value: this.$i18n.t('F00108.S100') }
      ],
      // 品切れ
      outOfStockList: [
        // リセット, セット
        { code: 0, value: this.$i18n.t('F00108.S122') },
        { code: 1, value: this.$i18n.t('F00108.S123') }
      ],
      // 注意記号対象(KD-100のみ)
      cautionSymbolTargetList: [
        // しない, する
        { code: 0, value: this.$i18n.t('F00108.S100') },
        { code: 1, value: this.$i18n.t('F00108.S099') }
      ],
      // フリー宣言
      freeDeclarationList: [
        // 禁止, 許可
        { code: 0, value: this.$i18n.t('F00108.S048') },
        { code: 1, value: this.$i18n.t('F00108.S049') }
      ],
      // KSD V001.000 AE
      nameErrorMsg: '', // 漢字エラー
      kanaErrorMsg: '', // カナ名称エラー
      receiptErrorMsg: '', // レシート印字エラー
      costErrorMsg: '', // 原単価エラー
      sellPriceErrorMsg: '', // 売単価エラー
      manufacturerPriceErrorMsg: '', // 定価単価エラー
      sellStartDateErrorMsg: '', // 販売開始日エラー
      sellEndDateErrorMsg: '', // 販売終了日エラー
      // KSD V001.000 AS
      name2ErrorMsg: '',
      name3ErrorMsg: '',
      ScpSts_NoErrorMsg: Array(12).fill(''),
      // KSD V001.000 AE
      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      // Step1 暫定仕様 決済種別(除外)を編集しない.
      // G005.00.0 Update-Start
      // stockPaymentType: []
      stockPaymentType: ['']
      // G005.00.0 Update-End
      // KSD V001.000 AS
      ,defaultValues: {
        ccpPrtStslist: [
          {
            value: this.$i18n.t('F00108.S171'), // 印字しない
            code: 0
          },
          {
            value: this.$i18n.t('F00108.S172'), // 印字する
            code: 1
          }
        ],
        kcpStsList: [
          {
            value: this.$i18n.t('F00108.S164'), // 出力しない
            code: 0
          },
          {
            value: this.$i18n.t('F00108.S165'), // 出力する
            code: 1
          }
        ],
        kcpPtnEdtFlgList: [
          {
            value: this.$i18n.t('F00108.S130'), // 変更無し
            code: 0
          },
          {
            value: this.$i18n.t('F00108.S131'), // 改
            code: 1
          }
        ],
        freePrtStsList: [
          {
            value: this.$i18n.t('F00108.S170'), // CCP印字
            code: 0
          },
          {
            value: this.$i18n.t('F00108.S128'), // 印字無
            code: 1
          }
        ]
      },
      errorMsgMap: {
        ownCompanyCode: '',
        scpSts_No: [...Array(12).fill('')],
        prtPriorityNo: '',
        ccpPrtPosi: '',
        kdPosiMark: '',
        kdPassTime1: '',
        kdPassTime2: '',
        linkCode: ''
      },
      errorMsg: {
        pleaseBeSureToInput: this.$i18n.t('F00108.E038'), // 必ず入力してください
        pleaseBeSureToSelect: this.$i18n.t('F00108.E039'), // 必ず選択してください
        inputRangeCheck: this.$i18n.t('F00108.E040'), // ○○以上○○○以下の値で入力してください。
        enterZeroCheck: this.$i18n.t('F00108.E041') // 0を入力してください。

      }
      // KSD V001.000 AE
    }
  },
  // KSD V001.000 AS
  computed: {
    scpInstructionPlaceholder () {
      switch (Number(this.productData.MenuAttr)) {
        case 0:
          return this.$i18n.t('F00108.S184')
        case 1:
          return this.$i18n.t('F00108.S185')
        case 2:
          return this.$i18n.t('F00108.S186')
        case 3:
          return this.$i18n.t('F00108.S186')
        default:
          return this.$i18n.t('F00108.S119')
      }
    },
    tgcpRestaurantsMcFuMenu () {
      if (this.productData.productId.length !== 14) return null

      let fumenuDefaultParams = {
        RestNo: 1,
        Name1: 'ｿﾉﾀﾒﾆｭｰ',
        Name4: '',
        Name5: 'その他メニュー',
        Name6: 'sonotamenyu',
        Name7: '',
        Genka: 0,
        Tanka_TaxIn: 0,
        LinkMatomeCode: 0,
        LinkMMCode: 0,
        TaxSts: 0,
        HtlBackColor: 0,
        ImageFileName: '',
        PackSts: 0,
        Teiban: 0,
        EtcDpSts: 0,
        KcpPtnNum: 0,
        OESMenuCode: '9998',
        Pack_HoAmt: 0,
        Pack_HoTargetAmt: 0,
        Pack_TaxAmt: 0,
        Pack_TaxTargetAmt: 0,
        KeyFFU: 0,
        GenkaFFU: 0,
        MaeukeSts: 0,
        LinKDpCode: 9999,
        Tanka_TaxOut: 0,
        SubTanka_TaxOut: 0
      }

      let fuMenuUserParams = {}

      fuMenuUserParamsNames.forEach((name) => {
        if (this.productData.hasOwnProperty(name)) {
          fuMenuUserParams[name] = fuMenuStringParams.includes(name) ? this.productData[name] || '' : Number(this.productData[name]) || 0
        }
      })

      this.productData.ScpSts_No.forEach((item, index) => {
        const indexValue = `ScpSts${index + 1}_No`
        if (item === null || item === undefined) {
          fuMenuUserParams[indexValue] = 0
        } else {
          fuMenuUserParams[indexValue] = Number(item)
        }
      })

      this.productData.KcpSts.forEach((item, index) => {
        const indexValue = `KcpSts${index + 1}`
        if (item !== null && item !== undefined) {
          fuMenuUserParams[indexValue] = item
        } else {
          fuMenuUserParams[indexValue] = ''
        }
      })

      if (this.mode === 1) {
        const _temp = [...Array(15).keys()].forEach((item, index) => {
          let trueIndex = index + 1
          fumenuDefaultParams[`SearchSts${trueIndex}`] = 0
          if (trueIndex <= 12) {
            fumenuDefaultParams[`ScpSts${trueIndex}_MaxQty`] = 0
          }
          if (trueIndex <= 9) {
            fumenuDefaultParams[`TankaFFU${trueIndex}_TaxIn`] = 0
            if (trueIndex !== 2) {
              fumenuDefaultParams[`TankaFFU${trueIndex}_TaxOut`] = 0
            }
          }
          if (trueIndex <= 5) {
            fumenuDefaultParams[`DpTanka${trueIndex}_DpCode`] = 0
            fumenuDefaultParams[`DpTanka${trueIndex}_Genka`] = 0
            fumenuDefaultParams[`DpTanka${trueIndex}`] = 0
          }
        })
      }
      let tgcpRestaurantsMcFuMenu = Object.assign({}, this.mode === 1 ? fumenuDefaultParams : {}, fuMenuUserParams)

      return tgcpRestaurantsMcFuMenu
    },
    hasError: function() {
      return this.hasErrorMessage > 0
    },
  },
  // KSD V001.000 AE
  components: {
    // KSD V001.000 DS
    // popup
    // KSD V001.000 DE
    dialogExlusionSelect
    // KSD V001.000 AS
    ,linkCodeDialog
    // KSD V001.000 AE
  },
  methods: {
    // G003.00.0 Update Start
    // open (storeCd, productId, productData, refreshFunc, closeFunc) {
    // KSD V001.000 DS
    //open (data, storeCd, productId, productData, refreshFunc, closeFunc, priceList) {
    // KSD V001.000 DE
    // KSD V001.000 DS
    // async open (storeCd, productId, productData, refreshFunc, closeFunc, itemListLimit) {
    // KSD V001.000 DE
    // KSD V001.000 AS
    async open (data, storeCd, productId, productData, refreshFunc, closeFunc, priceList, itemListLimit) {
      this.isMenuCode = productId.length === 14
      this.hasErrorMessage = 0
      this.itemListLimit = itemListLimit
    // KSD V001.000 AE
      this.data = {...data}
      this.data.pricelists.priceList = priceList
      // G003.00.0 Update End
      // KSD V001.000 DS
      // this.dialog = true
      // KSD V001.000 DE
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      // KSD V001.000 AS
      this.productData = JSON.parse(JSON.stringify(DEFAULT_VAL))
      // KSD V001.000 AE
      this.productDataBase = productData
      // KSD V001.000 DS
      //// G003.00.0 Update Start
      //this.getPayments(storeCd)
      //this.getTaxRates(storeCd)
      //// if (this.getTaxRates(storeCd) === false) return
      //// if (this.getPayments(storeCd) === false) return
      //// G003.00.0 Update End
      // KSD V001.000 DE
      // KSD V001.000 AS
      if (this.$parent.taxTypeList.length <= 0) return
      this.taxTypeList = this.$parent.taxTypeList
      if (await this.getPayments(storeCd) === false) return
      // KSD V001.000 AE
      // KSD V001.000 DS
      // this.$children[0].$refs.content.querySelector('#baseTable').scrollTop = 0
      // KSD V001.000 DE

      if (productData !== null) {
        // 更新
        this.mode = 2
        // KSD V001.000 AS
        if (this.isMenuCode) {
          const fumenuData = await this.getMenuCodeData(storeCd, productId)
          if (fumenuData === false) {
            this.dialog = false
            return
          }
          fuMenuUserParamsNames.forEach((item) => {
            if (fumenuData.hasOwnProperty(item)) {
              this.productData[item] = fumenuData[item]
            }
          })
          this.productData.Code = productId
          this.productData.ScpSts_No = [...Array(12)].map((item, index) => {
            const indexValue = `ScpSts${index + 1}_No`
            if (fumenuData.hasOwnProperty(indexValue)) {
              const temp = fumenuData[indexValue]
              return temp
            }
          })
          this.productData.KcpSts = [...Array(32)].map((item, index) => {
            const indexValue = `KcpSts${index + 1}`
            if (fumenuData.hasOwnProperty(indexValue)) {
              const temp = fumenuData[indexValue]
              return temp
            }
          })
        }
        // KSD V001.000 AE
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
        // KSD V001.000 AS
        this.productData.linkCode = productData.catalogs.groupName
        // KSD V001.000 AE
        // KSD V001.000 DS
        // this.productData.taxType = productData.catalogs.productTaxCodes// POS売上税区分
        // KSD V001.000 DE
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
        // KSD V001.000 DS
        // if (productData.catalogs.taxCodes == 'TAX1') {
        //   this.productData.taxType = 1
        // }
        // if (productData.catalogs.taxCodes == 'TAX2') {
        //   this.productData.taxType = 2
        // }
        // if (productData.catalogs.taxCodes == 'TAX3') {
        //   this.productData.taxType = 3
        // }
        // if (productData.catalogs.taxCodes == 'TAX4') {
        //   this.productData.taxType = 4
        // }
        // if (productData.catalogs.taxCodes == 'TAX5') {
        //   this.productData.taxType = 5
        // }
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.productData.taxType = productData.catalogs.taxCodes || this.taxTypeList[0].code
        // KSD V001.000 AE
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
          // KSD V001.000 DS
          // taxType: 1, // レシート印字名称区分
          // KSD V001.000 DE
          // KSD V001.000 AS
          taxType: this.taxTypeList[0].code, // レシート印字名称区分
          // KSD V001.000 AE
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
          // KSD V001.000 AS
          ,Code: productId,
          linkCode: '',
          OwnCompanyCode: '',
          Name2: '',
          Name3: '',
          RestNo: 1,
          Name1: 'ｿﾉﾀﾒﾆｭｰ',
          Name4: '',
          Name5: 'その他メニュー',
          Name6: 'sonotamenyu',
          Name7: '',
          Genka: 0,
          Tanka_TaxIn: 0,
          LinkMatomeCode: 0,
          LinkMMCode: 0,
          TaxSts: 0,
          HtlBackColor: 0,
          ImageFileName: '',
          PackSts: 0,
          Teiban: 0,
          EtcDpSts: 0,
          KcpPtnNum: 0,
          OESMenuCode: '9998',
          Pack_HoAmt: 0,
          Pack_HoTargetAmt: 0,
          Pack_TaxAmt: 0,
          Pack_TaxTargetAmt: 0,
          KeyFFU: 0,
          GenkaFFU: 0,
          MaeukeSts: 0,
          LinKDpCode: 9999,
          Tanka_TaxOut: 0,
          SubTanka_TaxOut: 0,
          TankaSts: '',
          TicketSts: '',
          AddQtySts: '',
          StlDiscSts: '',
          TOSts: '',
          HoSts: '',
          AutoTP: '',
          TankaFFU2_TaxOut: '',
          TankaFFU10_TaxIn: '',
          TankaFFU10_TaxOut: '',
          MenuAttr: '',
          OESMenuSts: '',
          SoldOutSts: '',
          CautionMark: '',
          FreeSts: '',
          FreePrtSts: '',
          KcpPtnEdtFlg: '',
          PrtPriorityNo: '',
          CcpPrtPosi: '',
          CcpPrtSts: '',
          KdPosiMark: '',
          KdPassTime1: '',
          KdPassTime2: '',
          ScpSts_No: Array(12).fill(0),
          KcpSts: Array(32).fill('')
          // KSD V001.000 AE
        }
        // KSD V001.000 AS
        if (this.isMenuCode) {
          this.productData.OwnCompanyCode = '00000000009998'
          this.productData.Name2 = 'その他メニュー'
          this.productData.TankaSts = 0
          this.productData.TicketSts = 0
          this.productData.AddQtySts = 0
          this.productData.StlDiscSts = 0
          this.productData.TOSts = 0
          this.productData.HoSts = 0
          this.productData.AutoTP = 0
          this.productData.TankaFFU2_TaxOut = 0
          this.productData.TankaFFU10_TaxIn = 0
          this.productData.TankaFFU10_TaxOut = 0
          this.productData.MenuAttr = 0
          this.productData.OESMenuSts = 0
          this.productData.SoldOutSts = 0
          this.productData.CautionMark = 0
          this.productData.FreeSts = 0
          this.productData.FreePrtSts = 0
          this.productData.KcpPtnEdtFlg = 0
          this.productData.KcpSts = Array(32).fill(0)
          this.productData.CcpPrtSts = 0
        }
        // KSD V001.000 AE
      }
      // KSD V001.000 AS
      this.dialog = true
      this.$nextTick(() => {
        this.$children[0].$refs.content.querySelector('#baseTable').scrollTop = 0
      })
      // KSD V001.000 AE
    },
    // KSD V001.000 AS
    changeMenuAttribute (event) {
      const value = Number(event.target.value)
      this.errorMsgMap.scpSts_No = []
      switch (value) {
        case 0:
          [...Array(12)].forEach((val, index) => {
            this.productData.ScpSts_No[index] = 0
          })
          break
        default:
          [...Array(12)].forEach((val, index) => {
            this.productData.ScpSts_No[index] = ''
          })
      }
    },
    async getMenuCodeData (storeCd, itemId) {
      let result = null
      let params = {
        table: 'tgcp_restaurants_mc_fumenu',
        query: {
          $and: [
            {
              nodeId: storeCd,
              Code: itemId
            }
          ]
        },
        projection: JSON.parse(JSON.stringify(Projection)),
        sort: [ { Code: 1 } ],
        apicaller: 'callbo_orderguid'
      }
      await axios.post(this.$i18n.t('prop.url') + queryPathFumenu, params, commonUtils.methods.getApiHeader()).then(response => {
        const resultCode = response.data.result.code
        if (resultCode === 0) {
          result = response.data.responseModel.resultInfo.records[0]
          if (!result) {
            this.globalErrorMapping(response.data.result)
            result = false
          }
        } else {
          this.globalErrorMapping(response.data.result)
          result = false
        }
      }).catch((e) => {
        this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        result = false
      })
      return result
    },
    // KSD V001.000 AE
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
          // KSD V001.000 DS
          // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 AE
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G004.00.0 Add-End
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        // KSD V001.000 DS
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 AE
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
          // KSD V001.000 DS
          // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 AE
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G004.00.0 Add-End
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        // KSD V001.000 DS
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 AE
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
        // KSD V001.000 DS
        // this.$refs.pop.open(2, '', '決済種別(除外)にデータがありません', '', false, () => {
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$parent.$refs.pop.open(2, '', '決済種別(除外)にデータがありません', '', false, () => {
        // KSD V001.000 AE
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
      // KSD V001.000 DS
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$parent.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
      // KSD V001.000 AE
    },
    popupConfirm () {
      this.dialog = false
      // KSD V001.000 AS
      this.$children[0].$refs.content.querySelector('#baseTable').scrollTop = 0
      // KSD V001.000 AE
      this.closeFunc()
    },
    async onClickSave () {
      this.initErrorMessage()
      // KSD V001.000 AS
      if (await this.isValidate()) return
      // KSD V001.000 AE
      // KSD V001.000 DS
      // this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$parent.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // KSD V001.000 AE
      if (await this.executeSave() === true) {
        if (await this.refreshFunc() === true) {
          // KSD V001.000 DS
          // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$parent.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // KSD V001.000 AE
          this.closeFunc()
          this.dialog = false
        } else {
          // KSD V001.000 DS
          // this.$refs.pop.closeFunction()
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$parent.$refs.pop.closeFunction()
          // KSD V001.000 AE
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
          // KSD V001.000 DS
          // taxCode: ''
          // KSD V001.000 DE
          // KSD V001.000 AS
          linkCode: '',
          taxCode: this.productData.taxCode
          // KSD V001.000 AE
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
        // KSD V001.000 AS
        params.linkCode = this.productData.linkCode || ''

        if (this.isMenuCode) {
          this.tgcpRestaurantsMcFuMenu.OwnCompanyCode = this.zeroSupply(this.tgcpRestaurantsMcFuMenu.OwnCompanyCode, 14)
          let response = await axios.post(this.$i18n.t('prop.url') + saveMenuPath,
            Object.assign({}, this.tgcpRestaurantsMcFuMenu, { nodeId: this.productData.storeCd }), commonUtils.methods.addApiHeader({}))
          if (response.data.result.code !== 0) {
            this.saveErrorMapping(response.data.result)
            return false
          }
        }
        // KSD V001.000 AE
        // 保存
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
          // G004.00.0 Add-Start
        } else if (response.data.result.code === -30) {
          // KSD V001.000 DS
          // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 AE
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G004.00.0 Add-End
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        // KSD V001.000 DS
        //// G004.00.0 Update-Start
        //// this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
        //// G004.00.0 Update-End
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
        // KSD V001.000 AE
        console.log(error)
      }
      return result
    },
    async onClickDelete () {
      // KSD V001.000 DS
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.runDelete, false, null)
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$parent.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.runDelete, false, null)
      // KSD V001.000 AE
    },
    async runDelete () {
      // KSD V001.000 DS
      // this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$parent.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // KSD V001.000 AE
      // 削除
      // KSD V001.000 DS
      // if (await this.executeDelete() === true) {
      //   if (await this.refreshFunc() === true) {
      //     this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
      //     this.closeFunc()
      //     this.dialog = false
      //   } else {
      //     this.$refs.pop.closeFunction()
      //   }
      // }
      // KSD V001.000 DE
      // KSD V001.000 AS
      if (this.isMenuCode) {
        if (await this.executeDelete() === true) {
          if (await this.executeDeleteMenu() === true) {
            if (await this.refreshFunc() === true) {
              // KSD V001.000 DS
              // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
              // KSD V001.000 DE
              // KSD V001.000 AS
              this.$parent.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
              // KSD V001.000 AE
              this.closeFunc()
              this.dialog = false
            } else {
              // KSD V001.000 DS
              // this.$refs.pop.closeFunction()
              // KSD V001.000 DE
              // KSD V001.000 AS
              this.$parent.$refs.pop.closeFunction()
              // KSD V001.000 AE
            }
          }
        }
      } else {
        if (await this.executeDelete() === true) {
          if (await this.refreshFunc() === true) {
            // KSD V001.000 DS
            // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
            // KSD V001.000 DE
            // KSD V001.000 AS
            this.$parent.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
            // KSD V001.000 AE
            this.closeFunc()
            this.dialog = false
          } else {
            // KSD V001.000 DS
            // this.$refs.pop.closeFunction()
            // KSD V001.000 DE
            // KSD V001.000 AS
            this.$parent.$refs.pop.closeFunction()
            // KSD V001.000 AE
          }
        }
      }
      // KSD V001.000 AE
    },
    // 削除
    async executeDelete () {
      var result = false
      try {
        // KSD V001.000 DS
        // var params = {nodeId: this.productData.storeCd, itemId: this.productData.productId, pricelistRecordId: this.productDataBase.pricelists.id}
        // KSD V001.000 DE
        // KSD V001.000 AS
        const params = {
          nodeId: this.productData.storeCd,
          itemId: this.productData.productId,
          pricelistRecordId: this.productDataBase.pricelists.id,
          linkCode: this.productData.linkCode || ''
        }
        // KSD V001.000 AE
        let response = await axios.delete(this.$i18n.t('prop.url') + deletePath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ data: params }))
        if (response.data.result.code === 0) {
          result = true
          // G004.00.0 Add start
        } else if (response.data.result.code === -30) {
          // KSD V001.000 DS
          // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 AE
          setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
          // G004.00.0 Add End
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        // KSD V001.000 DS
        //// G004.00.0 Update start
        //// this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
        //// G004.00.0 Update End
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W020'), '', false, null, false, null)
        // KSD V001.000 AE
        console.log(error)
      }
      return result
    },
    // KSD V001.000 AS
    async executeDeleteMenu () {
      var result = false
      try {
        const params = {
          nodeId: this.productData.storeCd,
          Code: this.productData.productId
        }
        let response = await axios.delete(this.$i18n.t('prop.url') + deleteMenuPath, commonUtils.methods.addApiHeader({ data: params }))
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        // KSD V001.000 DS
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
          this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 AE
      }
      return result
    },
    async isValidate () {
      let focusItem = []
      let result = 0
      if (this.isMenuCode) {
        if (this.productData.OwnCompanyCode === '') {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.ownCompanyCode = this.errorMsg.pleaseBeSureToInput
          focusItem.push(this.$refs.ownCompanyCodeText)
        }
      }
      if (this.productData.linkCode === '' || !this.productData.linkCode) {
        result++
        this.hasErrorMessage++
        this.errorMsgMap.linkCode = this.errorMsg.pleaseBeSureToSelect
        focusItem.push(this.$refs.linkCodeDialogTextButton.$el)
      }
      if (this.isMenuCode) {
        this.productData.ScpSts_No.map((rowData, index) => {
          if (rowData === '' || rowData === undefined) {
            result++
            this.hasErrorMessage++
            this.errorMsgMap.scpSts_No[index] = this.errorMsg.pleaseBeSureToInput
            focusItem.push(this.$refs[`scpStsNoText` + index][0])
          }
          let min
          let max
          switch (Number(this.productData.MenuAttr)) {
            case 0:
              min = 0
              max = 0
              break
            case 1:
              min = 1
              max = 4
              break
            case 2:
              min = 5
              max = 12
              break
            case 3:
              min = 5
              max = 12
              break
            default:
              min = 0
              max = 12
          }
          if (rowData !== '' && (rowData > max || rowData < min)) {
            result++
            this.hasErrorMessage++
            if (this.productData.MenuAttr === 0) {
              this.errorMsgMap.scpSts_No[index] = this.errorMsg.enterZeroCheck
            } else {
              this.errorMsgMap.scpSts_No[index] = this.errorMsg.inputRangeCheck.replace('○○', min).replace('○○○', max)
            }
            focusItem.push(this.$refs[`scpStsNoText` + index][0])
          }
        })
        if (this.productData.PrtPriorityNo === '') {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.prtPriorityNo = this.errorMsg.pleaseBeSureToInput
          focusItem.push(this.$refs.prtPriorityNoText)
        }
        if (this.productData.PrtPriorityNo !== '' && this.productData.PrtPriorityNo > 63) {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.prtPriorityNo = this.errorMsg.inputRangeCheck.replace('○○', 0).replace('○○○', 63)
          focusItem.push(this.$refs.prtPriorityNoText)
        }
        if (this.productData.CcpPrtPosi === '') {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.ccpPrtPosi = this.errorMsg.pleaseBeSureToInput
          focusItem.push(this.$refs.ccpPrtPosiText)
        }
        if (this.productData.CcpPrtPosi !== '' && this.productData.CcpPrtPosi > 6) {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.ccpPrtPosi = this.errorMsg.inputRangeCheck.replace('○○', 0).replace('○○○', 6)
          focusItem.push(this.$refs.ccpPrtPosiText)
        }
        if (this.productData.KdPosiMark === '') {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.kdPosiMark = this.errorMsg.pleaseBeSureToInput
          focusItem.push(this.$refs.kdPosiMarkText)
        }
        if (this.productData.KdPosiMark !== '' && this.productData.KdPosiMark > 15) {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.kdPosiMark = this.errorMsg.inputRangeCheck.replace('○○', 0).replace('○○○', 15)
          focusItem.push(this.$refs.kdPosiMarkText)
        }
        if (this.productData.KdPassTime1 === '') {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.kdPassTime1 = this.errorMsg.pleaseBeSureToInput
          focusItem.push(this.$refs.kdPassTime1Text)
        }
        if (this.productData.KdPassTime2 === '') {
          result++
          this.hasErrorMessage++
          this.errorMsgMap.kdPassTime2 = this.errorMsg.pleaseBeSureToInput
          focusItem.push(this.$refs.kdPassTime2Text)
        }
        // AS KSD V001.000 86855
        // 漢字名称のチェック
        if (!this.productData.name || this.productData.name.trim() === '') {
          result++
          this.hasErrorMessage++
          this.nameErrorMsg = this.errorMsg.pleaseBeSureToInput
          focusItem.push(this.$refs.nameText)
        } else {
          const byteLength = this.calculateByteLength(this.productData.name)
          if (byteLength < 1 || byteLength > 40) {
            result++
            this.hasErrorMessage++
            this.nameErrorMsg = '1文字以上40文字以下で入力してください。'
            focusItem.push(this.$refs.nameText)
          }
        }
        // 販売開始日の日付チェック
        if (this.productData.sellStartDate && !this.inputDateCheck(this.productData.sellStartDate)) {
          result++
          this.hasErrorMessage++
          this.sellStartDateErrorMsg = 'YYYY/MM/DDの書式で日付を入力してください。'
          focusItem.push(this.$refs.sellStartDateText)
        }
        // 販売終了日の日付チェック
        if (this.productData.sellEndDate && !this.inputDateCheck(this.productData.sellEndDate)) {
          result++
          this.hasErrorMessage++
          this.sellEndDateErrorMsg = 'YYYY/MM/DDの書式で日付を入力してください。'
          focusItem.push(this.$refs.sellEndDateText)
        }
        // 販売開始日と終了日の相関チェック
        let sellStartDate = new Date(this.productData.sellStartDate)
        let sellEndDate = new Date(this.productData.sellEndDate)
        if (sellStartDate > sellEndDate) {
          result++
          this.hasErrorMessage++
          this.sellStartDateErrorMsg = '「販売開始日、販売終了日の範囲指定に誤りがあります。正しい範囲で入力してください。'
          focusItem.push(this.$refs.sellStartDateText)
          focusItem.push(this.$refs.sellEndDateText)
        }
        // AE KSD V001.000 86855
      }
      // KSD V001.000 DS
      // if (result > 0) this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, () => {
      // KSD V001.000 DE
      // KSD V001.000 AS
      if (result > 0) this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, () => {
        // KSD V001.000 AE
        this.timeout = setTimeout(() => {
          if (focusItem.length > 0) {
            focusItem[0].focus()
          }
        }, 100)
      }, false, null)
      return result > 0
    },
    // KSD V001.000 AE
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
        // KSD V001.000 DS
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), result.code, false, this.setFocus, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$parent.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), result.code, false, this.setFocus, false, null)
        // KSD V001.000 AE
      } else {
        this.globalErrorMapping(result)
      }
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        // KSD V001.000 DS
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$parent.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          // KSD V001.000 AE
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        // KSD V001.000 DS
        // let globalErrorMsg = result.errorMessageMap['global'].toString()
        // this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        let globalErrorMsg = result.errorMessageMap !== null && result.errorMessageMap.hasOwnProperty('global') ? result.errorMessageMap['global'].toString() : this.$i18n.t('O00004.W010')
        this.$parent.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
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
      this.kanaErrorMsg = ''
      this.receiptErrorMsg = ''
      this.costErrorMsg = ''
      this.sellPriceErrorMsg = ''
      this.manufacturerPriceErrorMsg = ''
      this.sellStartDateErrorMsg = ''
      this.sellEndDateErrorMsg = ''
      // KSD V001.000 AS
      this.name2ErrorMsg = ''
      this.name3ErrorMsg = ''
      this.ScpSts_NoErrorMsg = Array(12).fill('')
      this.errorMsgMap =  {
        ownCompanyCode: '',
        scpSts_No: [...Array(12).fill('')],
        prtPriorityNo: '',
        ccpPrtPosi: '',
        kdPosiMark: '',
        kdPassTime1: '',
        kdPassTime2: '',
        linkCode: ''
      }
      // KSD V001.000 AE
    },
    // KSD V001.000 AS
    onSelectLinkCode (data) {
      this.productData.linkCode = data.name
    },
    // KSD V001.000 AE
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      this.productData.sellPrice = this.productData.sellPrice.toString().replace(/[^0-9]/gi, '')
      this.productData.manufacturerPrice = this.productData.manufacturerPrice.toString().replace(/[^0-9]/gi, '')
      this.productData.cost = this.productData.cost.toString().replace(/[^0-9]/gi, '')
      // KSD V001.000 AS
      this.productData.SubTanka_TaxIn = this.productData.SubTanka_TaxIn.toString().replace(/[^0-9]/gi, '')
      // KSD V001.000 AE
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
          // KSD V001.000 AS
          } else if (this.productData.Name2 == str) {
            this.productData.Name2 = str.toString().substring(0, i)
          } else if (this.productData.Name3 == str) {
            this.productData.Name3 = str.toString().substring(0, i)
          // KSD V001.000 AE
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
    // KSD V001.000 AS
    ,openLinkCodeDialog () {
      this.$refs.linkCodeDialogPopup.open(this.productData.storeCd, this.itemListLimit)
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      inputNumberLimitation(e, inputObject, inputVariable, limit)
    },
    zeroSupply (value, length) {
      return ('0'.repeat(length) + value).slice(-length)
    // AS KSD V001.000 86855
    },
    // 入力日付チェック処理
    inputDateCheck (strDate) {
      // 入力フォーマットチェック呼出
      const { formatResult, dateStr } = this.formatCheck(strDate)

      // フォーマットチェックNGの場合
      if (!formatResult) return false

      // フォーマットチェックがOKの場合は有効日付チェックを呼びだす
      return this.dateCheck(dateStr)
    },
    // 日付フォーマットチェック
    formatCheck (strDate) {
      var formatResult = false
      var dateStr = strDate
      if (strDate.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
        formatResult = true
      } else {
        if (strDate.length === 8) {
          if (strDate.match(/(\d{4})(\d{2})(\d{2})/)) {
          // 年,月,日を取得する
            dateStr = strDate.substr(0, 4) + '/' + strDate.substr(4, 2) + '/' + strDate.substr(6, 2)
            formatResult = true
          }
        }
      }
      return { formatResult, dateStr }
    },
    // 文字列のバイト長を計算する
    calculateByteLength (str) {
      let length = 0
      for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i)
        if ((charCode >= 0x00 && charCode < 0x81) ||
            (charCode === 0xf8f0) ||
            (charCode >= 0xff61 && charCode < 0xffa0) ||
            (charCode >= 0xf8f1 && charCode < 0xf8f4)) {
          length += 1
        } else {
          length += 2
        }
      }
      return length
    },
    // 有効日付チェック
    dateCheck (strDate) {
      let dateSplit = strDate.split('/')
      let y = parseInt(dateSplit[0])
      let m = parseInt(dateSplit[1]) - 1
      let d = parseInt(dateSplit[2])
      let newDate = new Date(y, m, d)

      return newDate.getFullYear() === y && newDate.getMonth() === m && newDate.getDate() === d
    // AE KSD V001.000 86855
    }
    // KSD V001.000 AE
  },
  // KSD V001.000 AS
  destroyed () {
    clearTimeout(this.timeout)
  },
  // KSD V001.000 AE
  // G002.00.0 Add start
  async mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G002.00.0 Add end
}
