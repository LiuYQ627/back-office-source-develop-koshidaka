/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221208  zhaomingyue(Neusoft)  G001.00.0  issue課題#1176を対応します.
 * 20221221  dingxin(Neusoft)      G002.00.0  issue課題#1212を対応します.
 * 20230203  wangchunmei(Neusoft)  G003.00.0  issue課題#836を対応します.
 * 20230215  dingxin(Neusoft)      G004.00.0  issue課題#1054を対応します.
 * 20230313  dingxin(Neusoft)      G005.00.0  issue課題#1662を対応します.
 * 20230316  dingxin(Neusoft)      G005.00.1  issue課題#1662を対応します.
 * 20230411  qinshh(Neusoft)       G006.00.0  issue課題#1563を対応します.
 * 20230417  dingxin(Neusoft)      G007.00.0  issue課題#1442#1459を対応します.
 * 20230421  dingxin(Neusoft)      G008.00.0  issue課題#1662を対応します.
 * 20230508  dingxin(Neusoft)      G009.00.0  issue課題#1662を対応します.
 */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from './../Common/commonUtils'

const authPath = 'CommonDesign/Auth'

export default {
  data () {
    // ユーザマスタ画面
    const UserMaster = [
      {btnName: this.$i18n.t('O00004.S011'), param: 'passLockList', class: 'blue-button min-font', auth: 'other1Auth', bindName: 'isButtonPwLock'}]
    // アクセス権限登録
    const AccessAuthorityRegistration = [
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'},
      {btnName: this.$i18n.t('O00004.S009'), param: 'clear', class: 'blue-button', auth: 'all', bindName: 'isclearBtn'},
      {btnName: this.$i18n.t('O00004.S046'), param: 'csvInput', class: 'blue-button', auth: 'other1Auth', bindName: 'iscsvInputBtn'},
      {btnName: this.$i18n.t('O00004.S047'), param: 'csvOutput', class: 'blue-button', auth: 'other2Auth', bindName: 'iscsvOutputBtn'}]
    // 商品マスタ
    // KSD V001.000 DS
    // const ProductMaster = [
    //   {btnName: this.$i18n.t('O00004.S046'), param: 'csvInput', class: 'blue-button', auth: 'other1Auth', bindName: 'iscsvInputBtn'},
    //   {btnName: this.$i18n.t('O00004.S047'), param: 'csvOutput', class: 'blue-button', auth: 'other2Auth', bindName: 'iscsvOutputBtn'}]
    // KSD V001.000 DE
    // KSD V001.000 MS
    // // 店舗マスタコピー
    // const StoreMasterCopy = [
    //   {btnName: this.$i18n.t('O00004.S048'), param: 'copy', class: 'orange-button', auth: 'other1Auth', bindName: 'copyBtn'}]
    // F32254: 店舗マスタコピー
    const StoreMasterCopy = [
      { btnName: this.$i18n.t('F32254.S010'), param: 'copy', class: 'orange-button', auth: 'all', bindName: 'copyBtn' }
    ]
    // KSD V001.000 ME
    // プリセットマスタ画面
    const presetMaster = [
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'},
      {btnName: this.$i18n.t('O00004.S039'), param: 'planCopy', class: 'blue-button', auth: 'other1Auth', bindName: 'isplanCopyBtn'},
      // G004.00.0 Update start
      // {btnName: this.$i18n.t('O00004.S040'), param: 'planCheck', class: 'blue-button', auth: 'all', bindName: 'isplanCheckBtn'},
      {btnName: this.$i18n.t('O00004.S040'), param: 'planCheck', class: 'blue-button', auth: 'other2Auth', bindName: 'isplanCheckBtn'},
      // G004.00.0 Update end
      //{btnName: this.$i18n.t('O00004.S041'), param: 'opeSet', class: 'blue-button', auth: 'other2Auth', bindName: 'isopeSetBtn'},
      {btnName: this.$i18n.t('O00004.S042'), param: 'clear', class: 'blue-button', auth: 'all', bindName: 'isclearBtn'},
      {btnName: this.$i18n.t('O00004.S043'), param: 'del', class: 'blue-button', auth: 'deleteAuth', bindName: 'isdelBtn'}]
    // データ保持設定
    const DataRetentionSetting = [
      // KSD V001.000 MS
      // {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth'}]
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'}]
      // KSD V001.000 ME
    // データクリア
    const DataClear = [
      {btnName: this.$i18n.t('O00004.S044'), param: 'dataClear', class: 'orange-button', auth: 'other1Auth', bindName: 'dataClearBtn'}]
    // POSレポート出力
    const PosReport = [
      {btnName: '表示', param: 'output', class: 'orange-button', auth: 'other1Auth', bindName: 'isoutputBtn'}]
    // POSレポート出力
    const PosReportOutput = [
      {btnName: 'PDF出力', param: 'output', class: 'orange-button', auth: 'other1Auth', bindName: 'isoutputBtn'},
      // G006.00.0 Add-Start
      {btnName: '戻る', param: 'backPrevious', class: 'orange-button', auth: 'other1Auth', bindName: 'isbackPreviousBtn'}]
      // G006.00.0 Add-End
    // KSD V001.000 AS
    // 監査レポート出力
    const AuditReport = [
      {btnName: this.$i18n.t('F32232.S003'), param: 'output', class: 'orange-button', auth: 'other1Auth', bindName: 'isoutputBtn'}]
    // 監査レポート出力
    const AuditReportOutput = [
      {btnName: this.$i18n.t('F32232.S004'), param: 'output', class: 'orange-button', auth: 'other1Auth', bindName: 'isoutputBtn'},
      {btnName: this.$i18n.t('F32232.S005'), param: 'backPrevious', class: 'orange-button', auth: 'other1Auth', bindName: 'isbackPreviousBtn'}]
    // 店舗グループ１登録
    const StoreGroup1Registration = [
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'}
    ]
    // 店舗グループ２登録
    const StoreGroup2Registration = [
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'}
    ]
    // KSD V001.000 AE
    // 電子ジャーナル
    const EJournal = [
      // G004.00.0 Update start
      // {btnName: '保存', param: 'toSave', class: 'orange-button', auth: 'other1Auth'}]
      // G008.00.0 Update-Start
      // {btnName: '保存', param: 'toSave', class: 'orange-button', auth: 'registerAuth'}]
      {btnName: '保存', param: 'toSave', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'}]
       // G008.00.0 Update-End
      // G004.00.0 Update end
    // 利用料金出力
    const UsageChargeOutput = [
      { btnName: this.$i18n.t('O00004.S045'), param: 'csvOutput', class: 'orange-button', auth: 'other1Auth', bindName: 'isButtonCsvOutput' }]
    // 売価変更
    const PriceChangeSetting = [
      // G004.00.0 Update start
      // {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn'},
      // {btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn'},
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'},
      {btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'deleteAuth', bindName: 'isdelBtn'},
      // G004.00.0 Update end
      {btnName: this.$i18n.t('O00004.S056'), param: 'clear', class: 'orange-button', auth: 'all', bindName: 'isclearBtn'}]
    // 変更基準日選択画面
    const ConfigSelect = [
      { btnName: '追加', param: 'add', class: 'orange-button', auth: 'all', bindName: 'isaddBtn' }]
    // バーコードフラグ設定画面
    const BarcodeSetting = [
      // G004.00.0 Update start
      // { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn' },
      // G004.00.0 Update end
      { btnName: '再利用', param: 'clone', class: 'orange-button', auth: 'all', bindName: 'isCloneBtn' },
      { btnName: '中止', param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      // G004.00.0 Update start
      // { btnName: '削除', param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn'},
      { btnName: '削除', param: 'del', class: 'orange-button', auth: 'deleteAuth', bindName: 'isdelBtn'},
      // G004.00.0 Update end
      { btnName: '前ページ', param: 'prev', class: 'blue-button', auth: 'all', bindName: 'isPrevBtn' },
      { btnName: '次ページ', param: 'next', class: 'blue-button', auth: 'all', bindName: 'isNextBtn' }
    ]
    // 収入印紙設定画面
    const RevenueStampSetting = [
      // G004.00.0 Update start
      // { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn' },
      // G004.00.0 Update end
      { btnName: '再利用', param: 'clone', class: 'orange-button', auth: 'all', bindName: 'isCloneBtn' },
      { btnName: '中止', param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      // G004.00.0 Update start
      // { btnName: '削除', param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn'}
      { btnName: '削除', param: 'del', class: 'orange-button', auth: 'deleteAuth', bindName: 'isdelBtn'}
      // G004.00.0 Update end
    ]

    // 取引別名称設定
    const TransactionNameSetting = [
      // G004.00.0 Update start
      // { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn' },
      // G004.00.0 Update end
      { btnName: '再利用', param: 'clone', class: 'orange-button', auth: 'all', bindName: 'isCloneBtn' },
      { btnName: '中止', param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      // G002.00.0 Add-Start
      // G004.00.0 Update start
      // { btnName: '削除', param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn'}
      { btnName: '削除', param: 'del', class: 'orange-button', auth: 'deleteAuth', bindName: 'isdelBtn'},
      // G004.00.0 Update end
      // G002.00.0 Add-End
      // G007.00.0 Add-Start
      { btnName: '一覧', param: 'list', class: 'orange-button', auth: 'all', bindName: 'islistBtn' }
      // G007.00.0 Add-End
    ]

    // G007.00.0 Add-Start
    const TransactionNamePrint = [
      {btnName: '出力', param: 'toSave', class: 'orange-button', auth: 'other1Auth', bindName: 'isreturnBtn'},
      {btnName: '戻る', param: 'backPrevious', class: 'orange-button', auth: 'all', bindName: 'isbackPreviousBtn'}]
    // G007.00.0 Add-End
    // 取引別名称設定
    const TransactionNameSettingSelect = [
      { btnName: '追加', param: 'add', class: 'orange-button', auth: 'all', bindName: 'isaddBtn' }
    ]
    // 店別運用設定
    const StoreOperationsSetting = [
      // G004.00.0 Update start
      // { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn' },
      // G004.00.0 Update end
      { btnName: '再利用', param: 'clone', class: 'orange-button', auth: 'all', bindName: 'isCloneBtn' },
      { btnName: '中止', param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      // G002.00.0 Add-Start
      // G004.00.0 Update start
      // { btnName: '削除', param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn'}
      { btnName: '削除', param: 'del', class: 'orange-button', auth: 'deleteAuth', bindName: 'isdelBtn'}
      // G004.00.0 Update end
      // G002.00.0 Add-End
      // KSD V001.000 AS
      , { btnName: this.$i18n.t('F322a6.S105'), param: 'prev', class: 'blue-button', auth: 'all', bindName: 'isPrevBtn' },
      { btnName: this.$i18n.t('F322a6.S106'), param: 'next', class: 'blue-button', auth: 'all', bindName: 'isNextBtn' }
      // KSD V001.000 AS
    ]
    const StoreOperationsSettingSelect = [
      { btnName: '追加', param: 'add', class: 'orange-button', auth: 'all', bindName: 'isaddBtn' }
    ]
    // G001.00.0 Update-Start
    // const OperationsSetting = [
    //   { btnName: '追加', param: 'add', class: 'orange-button', auth: 'all', bindName: 'isaddBtn' }
    // ]
    // // 運用設定
    // const OperationsSettingSelect = [
    //   { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' }
    // ]
    // 運用設定
    const OperationsSetting = [
      // G004.00.0 Update start
      // { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn' },
      // G004.00.0 Update end
      // G002.00.0 Add-Start
      { btnName: '再利用', param: 'clone', class: 'orange-button', auth: 'all', bindName: 'isCloneBtn' },
      { btnName: '中止', param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      // G004.00.0 Update start
      // { btnName: '削除', param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn'}
      { btnName: '削除', param: 'del', class: 'orange-button', auth: 'deleteAuth', bindName: 'isdelBtn'}
      // G004.00.0 Update end
      // G002.00.0 Add-End
    ]
    // 運用設定
    const OperationsSettingSelect = [
      { btnName: '追加', param: 'add', class: 'orange-button', auth: 'all', bindName: 'isaddBtn' }
    ]
    // G001.00.0 Update-End

    // 締めボタン設定
    const EndButtonSetting = [
      // G004.00.0 Update start
      // { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' }
      { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn' }
      // G004.00.0 Update end
    ]

    // 操作ボタン設定
    const OperationBtnSetting = [
      // G004.00.0 Update start
      // { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' }
      { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn' }
      // G004.00.0 Update end
    ]

    // レシート設定
    const ReceiptBtnSetting = [
      // G003.00.0 Add-Start
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'},
      {btnName: this.$i18n.t('O00004.S039'), param: 'planCopy', class: 'blue-button', auth: 'other1Auth', bindName: 'isplanCopyBtn'},
      // G004.00.0 Update start
      // {btnName: this.$i18n.t('O00004.S040'), param: 'planCheck', class: 'blue-button', auth: 'all', bindName: 'isplanCheckBtn'},
      {btnName: this.$i18n.t('O00004.S040'), param: 'planCheck', class: 'blue-button', auth: 'other2Auth', bindName: 'isplanCheckBtn'},
      // G004.00.0 Update end
      {btnName: this.$i18n.t('O00004.S042'), param: 'clear', class: 'blue-button', auth: 'all', bindName: 'isclearBtn'},
      {btnName: this.$i18n.t('O00004.S043'), param: 'del', class: 'blue-button', auth: 'deleteAuth', bindName: 'isdelBtn'}
      // G003.00.0 Add-End
      // G003.00.0 Delete-Start
      // {btnName: this.$i18n.t('F322b3.B000'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'},
      // {btnName: this.$i18n.t('F322b3.B001'), param: 'planCopy', class: 'blue-button', auth: 'other1Auth', bindName: 'isplanCopyBtn'},
      // {btnName: this.$i18n.t('F322b3.B002'), param: 'planCheck', class: 'blue-button', auth: 'all', bindName: 'isplanCheckBtn'},
      // G003.00.0 Delete-End
      // {btnName: this.$i18n.t('F322b3.B003'), param: 'opeSet', class: 'blue-button', auth: 'other2Auth', bindName: 'isopeSetBtn'},
      // {btnName: this.$i18n.t('F322b3.B004'), param: 'clear', class: 'blue-button', auth: 'all', bindName: 'isclearBtn'},
      // {btnName: this.$i18n.t('F322b3.B005'), param: 'del', class: 'blue-button', auth: 'deleteAuth', bindName: 'isdelBtn'}
    ]
    // KSD V001.000 AS
    // F322b4: 税率設定
    const TaxRateSettingSelect = [
      { btnName: this.$i18n.t('追加'), param: 'add', class: 'orange-button', auth: 'all', bindName: 'isaddBtn' }
    ]
    // F322b4-edit: 税率設定
    // 保存 , 再利用 , 中止 , 削除
    const TaxRateSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('F322b4.S019'), param: 'clone', class: 'orange-button', auth: 'all', bindName: 'isCloneBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ]
    // F00203: 商品分類階層設定
    const ProductDivMaster = [
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn'}
    ]
    // F00204: 商品構成マスタ登録
    const ProductGroupMaster = [
      { btnName: '前ページ', param: 'prev', class: 'blue-button', auth: 'all', bindName: 'isPrevBtn' },
      { btnName: '次ページ', param: 'next', class: 'blue-button', auth: 'all', bindName: 'isNextBtn' }
      // KSD V001.000 AS
      ,{ btnName: this.$i18n.t('O00004.S046'), param: 'csvInput', class: 'blue-button', auth: 'other1Auth', bindName: 'iscsvInputBtn' },
      { btnName: this.$i18n.t('O00004.S047'), param: 'csvOutput', class: 'blue-button', auth: 'other2Auth', bindName: 'iscsvOutputBtn' }
      // KSD V001.000 AE
    ]
    // F322b5: 時間帯設定
    const HourZoneSettingConfigSelect = [
      { btnName: this.$i18n.t('追加'), param: 'add', class: 'orange-button', auth: 'all', bindName: 'isaddBtn' }
    ]
    // F322b5-edit: 時間帯設定
    // 保存 , 再利用 , 中止 , 削除
    const HourZoneSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('F322b5.S022'), param: 'clone', class: 'orange-button', auth: 'all', bindName: 'isCloneBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ]
    // C00208: 部屋情報マスタ設定
    const RoomInfoMasterSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ]
    // C00210: コンプライアンス情報マスタ設定
    const ComplianceInformationSetting = [
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn'},
      {btnName: this.$i18n.t('C00210.S028'), param: 'imageSetting', class: 'blue-button', auth: 'all', bindName: 'isimageSettingBtn'},
      {btnName: this.$i18n.t('C00210.S029'), param: 'timeSetting', class: 'blue-button', auth: 'all', bindName: 'istimeSettingBtn'}
    ]
    // C00211: コース料金設定
    const CoursePriceSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('F322b3.B001'), param: 'copy', class: 'blue-button', auth: 'other1Auth', bindName: 'isCopyBtn' }
    ]
    // C00212: カレンダーマスタ設定
    const CalendarSettings = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' }
    ]
    // C00213: 会員ランクマスタ設定
    /* const C00213 = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ] */
    // C00214: 曜日区分マスタ設定
    /* const C00214 = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ] */
    // C00215: コースマスタ設定
    /* const C00215 = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ] */
    // C00216: 年齢区分マスタ設定
    /* const C00216 = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ] */
    // C00217: オプションマスタ設定
    const OptionMasterSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ]
    // C00218: 機材マスタ設定
    /* const C00218 = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ] */
    // C00219: 機種設備マスタ設定
    /* const C00219 = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ] */
    // C00220: 部屋関連情報マスタ設定
    /* const C00220 = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ] */
    // C00221: 部屋情報サブ設定
    const RoomInfoSubSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('F322b3.B001'), param: 'copy', class: 'blue-button', auth: 'all', bindName: 'copyBtn' }
    ]
    // C00224: 料金表表示マスタ設定
    const PriceListDisplayMasterSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' },
      { btnName: this.$i18n.t('C00224.S016'), param: 'pair', class: 'blue-button', auth: 'all', bindName: 'ispairBtn' },
      { btnName: this.$i18n.t('C00224.S017'), param: 'default', class: 'blue-button', auth: 'all', bindName: 'isdefaultBtn' },
      { btnName: this.$i18n.t('C00224.S018'), param: 'backPrevious', class: 'gray-button', auth: 'all', bindName: 'isbackPreviousBtn' }
    ]
    // C00222: セルフPOSマスタ設定
    const SelfPOSMasterSetting = [
      {btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn'},
      {btnName: this.$i18n.t('C00222.S002'), param: 'optionItemSetting', class: 'blue-button', auth: 'all', bindName: 'isOptionItemSettingBtn'},
      {btnName: this.$i18n.t('C00222.S003'), param: 'timeSetting', class: 'blue-button', auth: 'all', bindName: 'istimeSettingBtn'},
      {btnName: this.$i18n.t('C00222.S004'), param: 'paymentSetting', class: 'blue-button', auth: 'all', bindName: 'isPaymentSettingBtn'},
      {btnName: this.$i18n.t('C00222.S005'), param: 'messageSetting', class: 'blue-button', auth: 'all', bindName: 'isMessageSettingBtn'},
      {btnName: this.$i18n.t('C00222.S006'), param: 'imageAudioSetting', class: 'blue-button', auth: 'all', bindName: 'isImageAudioSettingBtn'},
      {btnName: this.$i18n.t('C00222.S008'), param: 'customerOptionSetting', class: 'blue-button', auth: 'all', bindName: 'isCustomerOptionSetting'},
      {btnName: this.$i18n.t('C00222.S009'), param: 'customerFileSetting', class: 'blue-button font-20', auth: 'all', bindName: 'isCustomerFileSetting'},
      {btnName: this.$i18n.t('C00222.S007'), param: 'iconPositionSetting', class: 'blue-button font-20', auth: 'all', bindName: 'isIconPositionSettingBtn'}
    ]
    // F322c1: 券種マスタ設定
    const TicketTypeMasterSetting = [
      { btnName: this.$i18n.t('F322c1.S044'), param: 'add', class: 'orange-button', auth: 'all', bindName: 'isaddBtn' },
      { btnName: this.$i18n.t('O00004.S008'), param: 'toSave', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'clear', class: 'orange-button', auth: 'all', bindName: 'isclearBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' },
    ]
    // F32283: 飲食オーダーガイダンス設定
    const GuidanceMasterSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' },
      { btnName: this.$i18n.t('O00004.S024'), param: 'del', class: 'orange-button', auth: 'all', bindName: 'isdelBtn' }
    ]
    // F322b6: 金種設定
    const DenominationSetting = [
      { btnName: this.$i18n.t('F322b6.S011'), param: 'copy', class: 'blue-button', auth: 'other1Auth', bindName: 'isCopyBtn' }
    ]
    // F322b7: OES連携名称設定
    const OESLinkageNameSetting = [
      { btnName: this.$i18n.t('O00004.S008'), param: 'fixed', class: 'orange-button', auth: 'all', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('O00004.S056'), param: 'stop', class: 'orange-button', auth: 'all', bindName: 'isStopBtn' }
    ]
    // C00223: コード決済通信マスタ設定
    const CodePaymentCommunicationSetting = [
      { btnName: '保存', param: 'fixed', class: 'orange-button', auth: 'registerAuth', bindName: 'isfixedBtn' },
      { btnName: this.$i18n.t('C00223.S002'), param: 'commSetting1', class: 'blue-button', auth: 'all', bindName: 'iscommSettingBtn1' },
      { btnName: this.$i18n.t('C00223.S003'), param: 'commSetting2', class: 'blue-button', auth: 'all', bindName: 'iscommSettingBtn2' },
      { btnName: this.$i18n.t('C00223.S004'), param: 'messSetting', class: 'blue-button', auth: 'all', bindName: 'ismessSettingBtn' }
    ]
    // C00227: 従業員コード印字
    const EmployeeCodePrint = [
      {btnName: this.$i18n.t('C00227.S012'), param: 'printPdf', class: 'orange-button', auth: 'other1Auth', bindName: 'isprintPdfBtn'}
    ]
    // KSD V001.000 AE
    return {
      UserMaster,
      EmployeeCodePrint, // F00207: 従業員コードプリント
      AccessAuthorityRegistration,
      // KSD V001.000 DS
      // ProductMaster,
      // KSD V001.000 DE
      StoreMasterCopy,
      presetMaster,
      DataRetentionSetting,
      DataClear,
      PosReport,
      PosReportOutput,
      // KSD V001.000 AS
      AuditReport,
      AuditReportOutput,
      StoreGroup1Registration,
      StoreGroup2Registration,
      // KSD V001.000 AE
      UsageChargeOutput,
      EJournal,
      PriceChangeSetting,
      ConfigSelect,
      BarcodeSetting,
      RevenueStampSetting,
      TransactionNameSetting,
      // G007.00.0 Add-Start
      TransactionNamePrint,
      // G007.00.0 Add-End
      TransactionNameSettingSelect,
      StoreOperationsSetting,
      StoreOperationsSettingSelect,
      OperationsSetting,
      OperationsSettingSelect,
      EndButtonSetting,
      OperationBtnSetting,
      ReceiptBtnSetting,
      // KSD V001.000 AS
      TaxRateSettingSelect, // F322b4: 税率設定
      TaxRateSetting, // F322b4: 税率設定-Add
      ProductDivMaster,   // F00203: 商品分類階層設定
      ProductGroupMaster, // F00204: 商品構成マスタ登録
      HourZoneSetting, // F322b5-edit: 時間帯設定
      HourZoneSettingConfigSelect, // F322b5: 時間帯設定
      RoomInfoMasterSetting, // C00208: 部屋情報マスタ設定
      ComplianceInformationSetting, // C00210: コンプライアンス情報マスタ設定
      CoursePriceSetting, // C00211: コース料金設定
      CalendarSettings, // C00212: カレンダーマスタ設定
      // C00213, // C00213: 会員ランクマスタ設定
      // C00214, // C00214: 曜日区分マスタ設定
      // C00215, // C00215: コースマスタ設定
      // C00216, // C00216: 年齢区分マスタ設定
      OptionMasterSetting, // C00217: オプションマスタ設定
      // C00218, // C00218: 機材マスタ設定
      // C00219, // C00219: 機種設備マスタ設定
      // C00220, // C00220: 部屋関連情報マスタ設定
      RoomInfoSubSetting, // C00221: 部屋情報サブ設定
      SelfPOSMasterSetting, // C00222: セルフPOSマスタ設定
      TicketTypeMasterSetting, // F322c1: 券種マスタ設定
      DenominationSetting, // F322b6: 金種設定
      OESLinkageNameSetting, // F322b7: OES連携名称設定
      CodePaymentCommunicationSetting, // C00223: コード決済通信マスタ設定
      PriceListDisplayMasterSetting, // C00224: 料金表表示マスタ設定
      GuidanceMasterSetting, // F32283: 飲食オーダーガイダンス設定
      // KSD V001.000 AE
      isOpen: true,
      registerAuth: true,
      modifyAuth: true,
      deleteAuth: true,
      other1Auth: true,
      other2Auth: true,
      // G005.00.0 Update-Start
      // approvalFlg: true,
      approvalFlg: false,
      // G005.00.0 Update-End
      winId: '',
      authList: [],
      scrollButtonActive: false,
      scroll: 0,
      subArea: false,
      subAreaDatas: [],
      buttonDisableds: {}
    }
  },
  // KSD V001.000 AS
  computed: {
    isCloseDisabled: function () {
      return this.isCloseBtn !== undefined && this.isCloseBtn !== null ? this.isCloseBtn : false
    }
  },
  // KSD V001.000 AE
  components: {
    popup
  },
  props: [
    'Mode',
    'isButtonPwLock',
    'isfixedBtn',
    'dataClearBtn',
    'copyBtn',
    'isButtonCsvOutput',
    'isclearBtn',
    'iscsvInputBtn',
    'isoutputBtn',
    // G006.00.0 Add-Start
    'isbackPreviousBtn',
    // G006.00.0 Add-End
    'iscsvOutputBtn',
    'isplanCopyBtn',
    'isplanCheckBtn',
    'isopeSetBtn',
    'isdelBtn',
    'isaddBtn',
    'isNextBtn',
    'isPrevBtn',
    'isStopBtn',
    'isCloneBtn',
    // KSD V001.000 AS
    'isCloseBtn',
    'isCopyBtn',
    'isimageSettingBtn',
    'istimeSettingBtn',
    'isOptionItemSettingBtn',
    'isPaymentSettingBtn',
    'isMessageSettingBtn',
    'isImageAudioSettingBtn',
    'isCustomerOptionSetting',
    'isCustomerFileSetting',
    'isIconPositionSettingBtn',
    // KSD V001.000 AE
    // G007.00.0 Add-Start
    'islistBtn',
    'isreturnBtn'
    // G007.00.0 Add-End
    // KSD V001.000 AS
    , 'iscommSettingBtn1',
    'iscommSettingBtn2',
    'ismessSettingBtn',
    'ispairBtn',
    'isdefaultBtn'
    ,'isprintPdfBtn'
    // KSD V001.000 AE
  ],
  methods: {
    // アコーディオン開閉処理
    toggleAccordion () {
      this.isOpen = !this.isOpen
    },
    // タブを閉じる処理
    closeTab () {
      this.$emit('close')
    },
    // 保存ボタン処理
    fixed () {
      this.$emit('fixed')
    },
    toSave () {
      this.$emit('toSave')
    },
    // 削除ボタン処理
    del () {
      this.$emit('del')
    },
    // 編集破棄ボタン処理
    clear () {
      this.$emit('clear')
    },
    // G007.00.0 Add-Start
    list () {
      this.$emit('list')
    },
    // G007.00.0 Add-End
    // PWロック処理
    passLockList () {
      this.$emit('pwLock')
    },
    // PDF出力
    printPdf () {
      this.$emit('printPdf')
    },
    // CSV入力
    csvInput () {
      this.$emit('csvInput')
    },
    // CSV入力
    csvOutput () {
      this.$emit('csvOutput')
    },
    // 出力
    output () {
      this.$emit('output')
    },
    // G006.00.0 Add-Start
     // 戻る
     backPrevious () {
      this.$emit('backPrevious')
    },
    // G006.00.0 Add-End
    // ハイライト設定画面
    highlightSetting () {
      this.$emit('highlightSetting')
    },
    // 企画コピー
    planCopy () {
      this.$emit('planCopy')
    },
    // 企画確認
    planCheck () {
      this.$emit('planCheck')
    },
    // 運用設定
    opeSet () {
      this.$emit('opeSet')
    },
    // クリア実行
    dataClear () {
      this.$emit('dataClear')
    },
    // コピー実行
    copy () {
      this.$emit('copy')
    },
    // 追加
    add () {
      this.$emit('add')
    },
    // 前ページ
    prev () {
      this.$emit('prev')
    },
    // 次ページ
    next () {
      this.$emit('next')
    },
    // 中止
    stop () {
      this.$emit('stop')
    },
    // 再利用
    clone () {
      this.$emit('clone')
    },
    // KSD V001.000 AS
    imageSetting () {
      this.$emit('imageSetting')
    },
    timeSetting () {
      this.$emit('timeSetting')
    },
    optionItemSetting () {
      this.$emit('optionItemSetting')
    },
    paymentSetting () {
      this.$emit('paymentSetting')
    },
    messageSetting () {
      this.$emit('messageSetting')
    },
    imageAudioSetting () {
      this.$emit('imageAudioSetting')
    },
    customerOptionSetting () {
      this.$emit('customerOptionSetting')
    },
    customerFileSetting () {
      this.$emit('customerFileSetting')
    },
    iconPositionSetting () {
      this.$emit('iconPositionSetting')
    },
    commSetting1 () {
      this.$emit('commSetting1')
    },
    commSetting2 () {
      this.$emit('commSetting2')
    },
    messSetting () {
      this.$emit('messSetting')
    },
    pair () {
      this.$emit('pair')
    },
    default () {
      this.$emit('default')
    },
    // KSD V001.000 AE
    getAuth () {
      const params = { windowsId: this.winId }
      // KSD V001.000 MS
      // var vue = this
      const vue = this
      // KSD V001.000 ME
      axios.get(this.$i18n.t('prop.url') + authPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        .then(response => {
          if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
            return
          }
          vue.authList = response.data
          // G005.00.1 Update-Start
          // vue.registerAuth = this.authList.registerAuth
          // vue.modifyAuth = this.authList.modifyAuth
          // vue.deleteAuth = this.authList.deleteAuth
          // vue.other1Auth = this.authList.other1Auth
          // vue.other2Auth = this.authList.other2Auth
          // vue.approvalFlg = this.authList.approvalFlg
          // vue.$root.registerAuth = this.authList.registerAuth
          // vue.$root.modifyAuth = this.authList.modifyAuth
          // vue.$root.deleteAuth = this.authList.deleteAuth
          // vue.$root.other1Auth = this.authList.other1Auth
          // vue.$root.other2Auth = this.authList.other2Auth
          // vue.$root.approvalFlg = this.authList.approvalFlg
          vue.registerAuth = true
          vue.modifyAuth = true
          vue.deleteAuth = true
          vue.other1Auth = true
          vue.other2Auth = true
          vue.approvalFlg = false
          vue.$root.registerAuth = true
          vue.$root.modifyAuth = true
          vue.$root.deleteAuth = true
          vue.$root.other1Auth = true
          vue.$root.other2Auth = true
          vue.$root.approvalFlg = false
          // G005.00.1 Update-End
          // サブエリアボタンの描画処理
          // G004.00.0 Delete start
          // this.subBtnArea()
          // G004.00.0 Delete end
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // G007.00.0 Add-Start
          // this.$router.push('/LoginPage')
          // G007.00.0 Add-End
          console.log(error)
        })
    },
    // サブボタンエリアの表示処理
    // G004.00.0 Update start
    // subBtnArea () {
    subBtnArea (permissions) {
    // G004.00.0 Update end
      let authDecision = ''
      switch (this.winId) {
        // ユーザマスタ
        case 'F00001':
          this.subArea = true
          authDecision = this.UserMaster
          // 活性非活性処理用配列
          this.buttonDisableds['isButtonPwLock'] = this.isButtonPwLock
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_USER_OTHER_1')) {
            // G009.00.0 Delete-Start
            // G008.00.0 Add-Start
            // this.buttonDisableds['isButtonPwLock'] = false
            // G008.00.0 Add-End
            // G009.00.0 Delete-End
            this.other1Auth = true
          } else {
            // G009.00.0 Delete-Start
            // G008.00.0 Add-Start
            // this.buttonDisableds['isButtonPwLock'] = true
            // G008.00.0 Add-End
            // G009.00.0 Delete-End
            this.other1Auth = false
          }
          // G004.00.0 Add end
          break
        // アクセス権限登録
        case 'F32242':
          this.subArea = true
          authDecision = this.AccessAuthorityRegistration
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isclearBtn'] = this.isclearBtn
          this.buttonDisableds['iscsvInputBtn'] = this.iscsvInputBtn
          this.buttonDisableds['iscsvOutputBtn'] = this.iscsvOutputBtn
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_ACCESS_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_ACCESS_OTHER_1')) {
            this.other1Auth = true
          } else {
            this.other1Auth = false
          }
          if (permissions.includes('CLOUDPOS_ACCESS_OTHER_2')) {
            this.other2Auth = true
          } else {
            this.other2Auth = false
          }
          // G004.00.0 Add end
          break
        // 商品マスタ
        case 'F00108':
          this.subArea = true
          // KSD V001.000 DS
          // authDecision = this.ProductMaster
          // 活性非活性処理用配列
          // this.buttonDisableds['iscsvInputBtn'] = this.iscsvInputBtn
          // this.buttonDisableds['iscsvOutputBtn'] = this.iscsvOutputBtn
          //// G004.00.0 Add start
          // if (permissions.includes('CLOUDPOS_ITEM_OTHER_1')) {
          //   this.other1Auth = true
          // } else {
          //   this.other1Auth = false
          // }
          // if (permissions.includes('CLOUDPOS_ITEM_OTHER_2')) {
          //   this.other2Auth = true
          // } else {
          //   this.other2Auth = false
          // }
          //// G004.00.0 Add end
          // KSD V001.000 DE
          break
        //  店舗マスタコピー
        // KSD V001.000 MS
        // case 'F00012':
        //   this.subArea = true
        //   authDecision = this.StoreMasterCopy
        //   // 活性非活性処理用配列
        //   this.buttonDisableds['copyBtn'] = this.copyBtn
        //   break
        case 'F32254':
          this.subArea = true
          authDecision = this.StoreMasterCopy
          this.buttonDisableds['copyBtn'] = this.copyBtn
          break
        // KSD V001.000 ME
        // プリセットマスタ登録
        case 'F32282':
          this.subArea = true
          authDecision = this.presetMaster
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isplanCopyBtn'] = this.isplanCopyBtn
          this.buttonDisableds['isplanCheckBtn'] = this.isplanCheckBtn
          this.buttonDisableds['isopeSetBtn'] = this.isopeSetBtn
          this.buttonDisableds['isclearBtn'] = this.isclearBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_PRESET_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_PRESET_DELETE')) {
            this.deleteAuth = true
          } else {
            this.deleteAuth = false
          }
          if (permissions.includes('CLOUDPOS_PRESET_OTHER_1')) {
            this.other1Auth = true
          } else {
            this.other1Auth = false
          }
          if (permissions.includes('CLOUDPOS_PRESET_OTHER_2')) {
            this.other2Auth = true
          } else {
            this.other2Auth = false
          }
          // G004.00.0 Add end
          break
        // 電子ジャーナル
        case 'F32271':
          this.subArea = true
          authDecision = this.EJournal
          // 活性非活性処理用配列
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_JOURNAL_UPDATE')) {
            // G008.00.0 Add-Start
            this.buttonDisableds['isfixedBtn'] = false
            // G008.00.0 Add-End
            this.registerAuth = true
          } else {
            // G008.00.0 Add-Start
            this.buttonDisableds['isfixedBtn'] = true
            // G008.00.0 Add-End
            this.registerAuth = false
          }
          // G004.00.0 Add end
          break
        // データ保持設定
        case 'F32212':
          this.subArea = true
          authDecision = this.DataRetentionSetting
          // KSD V001.000 AS
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          // KSD V001.000 AE
          break
        // データクリア
        case 'F32213':
          this.subArea = true
          authDecision = this.DataClear
          // 活性非活性処理用配列
          this.buttonDisableds['dataClearBtn'] = this.dataClearBtn
          break
        // データクリア
        case 'F32231':
          this.subArea = true
          authDecision = this.PosReport
          // 活性非活性処理用配列
          this.buttonDisableds['isoutputBtn'] = this.isoutputBtn
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_REPORT_OTHER_1')) {
            this.other1Auth = true
          } else {
            this.other1Auth = false
          }
          // G004.00.0 Add end
          break
        case 'F32231-output':
          this.subArea = true
          authDecision = this.PosReportOutput
          // 活性非活性処理用配列
          this.buttonDisableds['isoutputBtn'] = this.isoutputBtn
          break
          // KSD V001.000 AS
        case 'F32232':
          this.subArea = true
          authDecision = this.AuditReport
          this.buttonDisableds['isoutputBtn'] = this.isoutputBtn
          if (permissions.includes('CLOUDPOS_REPORT_OTHER_1')) {
            this.other1Auth = true
          } else {
            this.other1Auth = false
          }
          break
        case 'F32232-output':
          this.subArea = true
          authDecision = this.AuditReportOutput
          // 活性非活性処理用配列
          this.buttonDisableds['isoutputBtn'] = this.isoutputBtn
          break
        case 'F32251':
          this.subArea = true
          authDecision = this.StoreGroup1Registration
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          break
        case 'F32252':
          this.subArea = true
          authDecision = this.StoreGroup2Registration
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          break
          // KSD V001.000 AE
        // 利用料金出力
        case 'F00008':
          this.subArea = true
          authDecision = this.UsageChargeOutput
          // 活性非活性処理用配列
          this.buttonDisableds['isButtonCsvOutput'] = this.isButtonCsvOutput
          break
        // 売価変更
        case 'F00109':
          this.subArea = true
          authDecision = this.PriceChangeSetting
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isclearBtn'] = this.isclearBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_PRICE_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_PRICE_DELETE')) {
            this.deleteAuth = true
          } else {
            this.deleteAuth = false
          }
          // G004.00.0 Add end
          break
        // 変更基準日選択画面
        case 'F322a0':
          this.subArea = true
          authDecision = this.ConfigSelect
          // 活性非活性処理用配列
          this.buttonDisableds['isaddBtn'] = this.isaddBtn
          break
        // バーコードグラフ設定画面
        case 'F322a2-edit':
          this.subArea = true
          authDecision = this.BarcodeSetting
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isCloneBtn'] = this.isCloneBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          this.buttonDisableds['isPrevBtn'] = this.isPrevBtn
          this.buttonDisableds['isNextBtn'] = this.isNextBtn
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_BARCODE_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_BARCODE_DELETE')) {
            this.deleteAuth = true
          } else {
            this.deleteAuth = false
          }
          // G004.00.0 Add end
          break
        // 収入印紙設定画面
        case 'F322a4':
          this.subArea = true
          authDecision = this.ConfigSelect
          // 活性非活性処理用配列
          break
        // 収入印紙設定画面
        case 'F322a4-edit':
          this.subArea = true
          authDecision = this.RevenueStampSetting
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isCloneBtn'] = this.isCloneBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_REVENUE_STAMP_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_REVENUE_STAMP_DELETE')) {
            this.deleteAuth = true
          } else {
            this.deleteAuth = false
          }
          // G004.00.0 Add end
          break
        // 取引別名称設定設定画面
        case 'F322a3':
          this.subArea = true
          authDecision = this.TransactionNameSettingSelect
          break
        // 取引別名称設定設定画面
        case 'F322a3-edit':
          this.subArea = true
          authDecision = this.TransactionNameSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isCloneBtn'] = this.isCloneBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          // G002.00.0 Add-Start
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          // G002.00.0 Add-End
          // 活性非活性処理用配列
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_TRANSACTION_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_TRANSACTION_DELETE')) {
            this.deleteAuth = true
          } else {
            this.deleteAuth = false
          }
          // G004.00.0 Add end
          break
        // G007.00.0 Add-Start
        // 取引別名称設定一覧出力画面
        case 'F322a3-output':
          this.subArea = true
          authDecision = this.TransactionNamePrint
          break
        // G007.00.0 Add-End
        // 操作ボタン設定
        case 'F322b1':
          this.subArea = true
          authDecision = this.OperationBtnSetting
          // G008.00.0 Add-Start
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          // G008.00.0 Add-End
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          // G004.00.0 Add end
          // AS #1589
          // 活性非活性処理用配列
          // G008.00.0 Delete-Start
          // this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          // G008.00.0 Delete-End
          // AE #1589

          break
        //case 'F322a5-edit':
        //this.subArea = true
        //authDecision = this.TransactionNameSetting
        // 活性非活性処理用配列
        //break
        case 'F322a6-edit':
          this.subArea = true
          authDecision = this.StoreOperationsSetting
          // 活性非活性処理用配列
          // G002.00.0 Add-Start
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isCloneBtn'] = this.isCloneBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          // KSD V001.000 AS
          this.buttonDisableds['isPrevBtn'] = this.isPrevBtn
          this.buttonDisableds['isNextBtn'] = this.isNextBtn
          // KSD V001.000 AE
          // G002.00.0 Add-End
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_STORE_OPERATION_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_STORE_OPERATION_DELETE')) {
            this.deleteAuth = true
          } else {
            this.deleteAuth = false
          }
          // G004.00.0 Add end
          break
        // 締めボタン設定
        case 'F322b2':
          this.subArea = true
          authDecision = this.EndButtonSetting
          // AS #1589
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          // AE #1589

          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_TIGHTENING_BTN_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          // G004.00.0 Add end
          break
        case 'F322b3':
          this.subArea = true
          authDecision = this.ReceiptBtnSetting
          // 活性非活性処理用配列
          this.buttonDisableds['isplanCopyBtn'] = this.isplanCopyBtn
          // G003.00.0 Add-Start
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isclearBtn'] = this.isclearBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          this.buttonDisableds['isplanCheckBtn'] = this.isplanCheckBtn
          // G003.00.0 Add-End
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_RECEIPT_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_RECEIPT_DELETE')) {
            this.deleteAuth = true
          } else {
            this.deleteAuth = false
          }
          if (permissions.includes('CLOUDPOS_RECEIPT_OTHER_1')) {
            this.other1Auth = true
          } else {
            this.other1Auth = false
          }
          if (permissions.includes('CLOUDPOS_RECEIPT_OTHER_2')) {
            this.other2Auth = true
          } else {
            this.other2Auth = false
          }
          // G004.00.0 Add end
          break
        // KSD V001.000 AS
        case 'F322b4': // 税率設定
          this.subArea = true
          authDecision = this.TaxRateSettingSelect
          this.buttonDisableds['isaddBtn'] = this.isaddBtn
          break
        case 'F322b4-edit': // 税率設定
          this.subArea = true
          authDecision = this.TaxRateSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isCloneBtn'] = this.isCloneBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          break
        case 'F322b5': // 時間帯設定
          this.subArea = true
          authDecision = this.HourZoneSettingConfigSelect
          this.buttonDisableds['isaddBtn'] = this.isaddBtn
          break
        case 'F322b5-edit': // 時間帯設定
          this.subArea = true
          authDecision = this.HourZoneSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isCloneBtn'] = this.isCloneBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          break
        // KSD V001.000 AE
        case 'F322a6':
          this.subArea = true
          authDecision = this.StoreOperationsSettingSelect
          // KSD V001.000 AS
          this.buttonDisableds['isaddBtn'] = this.isaddBtn
          // KSD V001.000 AE
          break
        case 'F322a5':
          this.subArea = true
          authDecision = this.OperationsSettingSelect
          // G001.00.0 Add-Start
          break
        // G001.00.0 Add-End
        case 'F322a5-edit':
          this.subArea = true
          authDecision = this.OperationsSetting
          // 活性非活性処理用配列
          // G002.00.0 Add-Start
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isCloneBtn'] = this.isCloneBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          // G002.00.0 Add-End
          // G004.00.0 Add start
          if (permissions.includes('CLOUDPOS_OPERATION_UPDATE')) {
            this.registerAuth = true
          } else {
            this.registerAuth = false
          }
          if (permissions.includes('CLOUDPOS_OPERATION_DELETE')) {
            this.deleteAuth = true
          } else {
            this.deleteAuth = false
          }
          // G004.00.0 Add end
          break
        // KSD V001.000 AS
        case 'F00203': // 商品分類階層設定
          this.subArea = true
          authDecision = this.ProductDivMaster
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          break
        case 'F00204': // 商品構成マスタ登録
          this.subArea = true
          authDecision = this.ProductGroupMaster
          // 活性非活性処理用配列
          this.buttonDisableds['isPrevBtn'] = this.isPrevBtn
          this.buttonDisableds['isNextBtn'] = this.isNextBtn
          this.buttonDisableds['iscsvInputBtn'] = this.iscsvInputBtn
          this.buttonDisableds['iscsvOutputBtn'] = this.iscsvOutputBtn
          if (permissions.includes('CLOUDPOS_CATALOG_OTHER_1')) {
            this.other1Auth = true
          } else {
            this.other1Auth = false
          }
          if (permissions.includes('CLOUDPOS_CATALOG_OTHER_2')) {
            this.other2Auth = true
          } else {
            this.other2Auth = false
          }
          break
        case 'F32283': // 飲食オーダーガイダンス設定
          this.subArea = true
          authDecision = this.GuidanceMasterSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          break
        case 'C00208': // 部屋情報マスタ設定
          this.subArea = true
          authDecision = this.RoomInfoMasterSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          break
        case 'C00210': // コンプライアンス情報マスタ設定
          this.subArea = true
          authDecision = this.ComplianceInformationSetting
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isimageSettingBtn'] = this.isimageSettingBtn
          this.buttonDisableds['istimeSettingBtn'] = this.istimeSettingBtn
          break
        case 'C00211': // コース料金設定
          this.subArea = true
          authDecision = this.CoursePriceSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isCopyBtn'] = this.isCopyBtn
          break
        case 'C00212': // カレンダーマスタ設定
          this.subArea = true
          authDecision = this.CalendarSettings
          // 活性非活性処理用配列
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          break
        case 'C00213': // 会員ランクマスタ設定
          break
        case 'C00214': // 曜日区分マスタ設定
          break
        case 'C00215': // コースマスタ設定
          break
        case 'C00216': // 年齢区分マスタ設定
          break
        case 'C00217': // オプションマスタ設定
          this.subArea = true
          authDecision = this.OptionMasterSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          break
        case 'C00218': // 機材マスタ設定
          break
        case 'C00219': // 機種設備マスタ設定
          break
        case 'C00220': // 部屋関連情報マスタ設定
          break
        case 'C00221': // 部屋情報サブ設定
          this.subArea = true
          authDecision = this.RoomInfoSubSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['copyBtn'] = this.copyBtn
          break
        case 'C00222': // セルフPOSマスタ設定
          this.subArea = true
          authDecision = this.SelfPOSMasterSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isOptionItemSettingBtn'] = this.isOptionItemSettingBtn
          this.buttonDisableds['istimeSettingBtn'] = this.istimeSettingBtn
          this.buttonDisableds['isPaymentSettingBtn'] = this.isPaymentSettingBtn
          this.buttonDisableds['isMessageSettingBtn'] = this.isMessageSettingBtn
          this.buttonDisableds['isImageAudioSettingBtn'] = this.isImageAudioSettingBtn
          this.buttonDisableds['isCustomerOptionSetting'] = this.isCustomerOptionSetting
          this.buttonDisableds['isCustomerFileSetting'] = this.isCustomerFileSetting
          this.buttonDisableds['isIconPositionSettingBtn'] = this.isIconPositionSettingBtn
          break
        // 従業員コード印字
        case 'C00227':
          this.subArea = true
          authDecision = this.EmployeeCodePrint
          this.buttonDisableds['isprintPdfBtn'] = this.isprintPdfBtn
          break
        case 'F322c1': // 券種マスタ設定
          this.subArea = true
          authDecision = this.TicketTypeMasterSetting
          this.buttonDisableds['isaddBtn'] = this.isaddBtn
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isclearBtn'] = this.isclearBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          break
        case 'F322b6': // F322b6: 金種設定
          this.subArea = true
          authDecision = this.DenominationSetting
          this.buttonDisableds['isCopyBtn'] = this.isCopyBtn
          break
        case 'F322b7': // OES連携名称設定
          this.subArea = true
          authDecision = this.OESLinkageNameSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          break
        case 'C00223': // コード決済通信マスタ設定
          this.subArea = true
          authDecision = this.CodePaymentCommunicationSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['iscommSettingBtn1'] = this.iscommSettingBtn1
          this.buttonDisableds['iscommSettingBtn2'] = this.iscommSettingBtn2
          this.buttonDisableds['ismessSettingBtn'] = this.ismessSettingBtn
          break
        case 'C00224': // 料金表表示マスタ設定
          this.subArea = true
          authDecision = this.PriceListDisplayMasterSetting
          this.buttonDisableds['isfixedBtn'] = this.isfixedBtn
          this.buttonDisableds['isStopBtn'] = this.isStopBtn
          this.buttonDisableds['isdelBtn'] = this.isdelBtn
          this.buttonDisableds['ispairBtn'] = this.ispairBtn
          this.buttonDisableds['isdefaultBtn'] = this.isdefaultBtn
          this.buttonDisableds['isbackPreviousBtn'] = this.isbackPreviousBtn
          break
        // KSD V001.000 AE
      }
      if (this.subArea === true) {
        authDecision = this.btnAuthFunction(authDecision)
        this.subAreaDatas = authDecision
      }
    },
    // ユーザの権限とボタンの表示を切り替える処理
    btnAuthFunction (btnList) {
      // G008.00.0 Delete-Start
      // // 承認権限があれば削除処理は行わない
      // if (this.approvalFlg !== true) {
      //   let delColList = []
      //   for (let i = 0; i < btnList.length; i++) {
      //     switch (btnList[i].auth) {
      //       case 'registerAuth':
      //         if (this.registerAuth === false) {
      //           delColList.unshift(i)
      //         }
      //         break
      //       case 'modifyAuth':
      //         if (this.modifyAuth === false) {
      //           delColList.push(i)
      //         }
      //         break
      //       case 'deleteAuth':
      //         if (this.deleteAuth === false) {
      //           delColList.unshift(i)
      //         }
      //         break
      //       case 'other1Auth':
      //         if (this.other1Auth === false) {
      //           delColList.unshift(i)
      //         }
      //         break
      //       case 'other2Auth':
      //         if (this.other2Auth === false) {
      //           delColList.unshift(i)
      //         }
      //         break
      //     }
      //   }
      //   // 権限によって表示しないボタン情報の行を削除
      //   for (let n = 0; n < delColList.length; n++) {
      //     btnList.splice(delColList[n], 1)
      //   }
      // }
      // G008.00.0 Delete-End
      return btnList
    },
    // サブボタンのクリック時の処理受け渡し用
    handleFunctionCall (functionName) {
      this[functionName]()
    },
    // スクロールジャンプボタン 画面TOPに移動処理
    returnTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    // スクロールジャンプボタン表示・非表示切り替え
    scrollWindow () {
      const top = 90 // アイコンの出現位置
      this.scroll = window.scrollY
      if (top <= this.scroll) {
        this.scrollButtonActive = true
      } else {
        this.scrollButtonActive = false
      }
    },
    // スクロールジャンプボタン ホバー処理
    changeImg (iname) {
      let onImgSrc = ''
      let elm = ''

      switch (iname) {
        case 'scrl':
          onImgSrc = require('@/assets/btn_scrl_jump_h.png')
          break
      }
      elm = document.getElementById(iname)
      elm.src = onImgSrc
      return elm
    },
    returnImg (iname) {
      let offImgSrc = ''
      let elm = ''

      switch (iname) {
        case 'scrl':
          offImgSrc = require('@/assets/btn_scrl_jump_n.png')
          break
      }
      elm = document.getElementById(iname)
      elm.src = offImgSrc
      return this.elm
    }
  },
  mounted () {
    this.winId = this.$root.winId
    // G004.00.0 Add-start
    this.$root.$once('getPermissions', (permissions) => {
      this.subBtnArea(permissions)
    })
    // G004.00.0 Add-end
    // G005.00.0 Delete-Start
    // G005.00.1 Update-Start
    // this.getAuth()
    this.getAuth()
    // G005.00.1 Update-End
    // G005.00.0 Delete-End
    window.addEventListener('scroll', this.scrollWindow)
  },
  watch: {
    // 各ボタンの活性非活性フラグを監視
    // 変更時に値を再代入、画面に反映させる
    isButtonPwLock (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isButtonPwLock'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isfixedBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isfixedBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    dataClearBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['dataClearBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    copyBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['copyBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isButtonCsvOutput (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isButtonCsvOutput'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isclearBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isclearBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    iscsvInputBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['iscsvInputBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    iscsvOutputBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['iscsvOutputBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isoutputBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isoutputBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    // G006.00.0 Add-Start
    isbackPreviousBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isbackPreviousBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    // G006.00.0 Add-End
    isplanCopyBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isplanCopyBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isplanCheckBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isplanCheckBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isopeSetBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isopeSetBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isdelBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isdelBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isaddBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isaddBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isPrevBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isPrevBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isNextBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isNextBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isStopBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isStopBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isCloneBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isCloneBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    }
    // KSD V001.000 AS
    ,isCopyBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isCopyBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isimageSettingBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isimageSettingBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    istimeSettingBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['istimeSettingBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isOptionItemSettingBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isOptionItemSettingBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isPaymentSettingBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isPaymentSettingBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isMessageSettingBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isMessageSettingBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isImageAudioSettingBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isImageAudioSettingBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isCustomerOptionSetting (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isCustomerOptionSetting'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isCustomerFileSetting (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isCustomerFileSetting'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isIconPositionSettingBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isIconPositionSettingBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    iscommSettingBtn1 (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['iscommSettingBtn1'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    iscommSettingBtn2 (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['iscommSettingBtn2'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    ismessSettingBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['ismessSettingBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isprintPdfBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isprintPdfBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    ispairBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['ispairBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    },
    isdefaultBtn (newdisabled) {
      let copybuttonDisableds = JSON.parse(JSON.stringify(this.buttonDisableds))
      copybuttonDisableds['isdefaultBtn'] = newdisabled
      this.buttonDisableds = copybuttonDisableds
    }
    // KSD V001.000 AE
  }
}
