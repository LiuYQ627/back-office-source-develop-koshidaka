import Vue from 'vue'
import VueRouter from 'vue-router'
/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230214  xu.jh(Neusoft)        G001.00.0  issue課題#1054を対応します.
 * 20230417  dingxin(Neusoft)      G002.00.0  issue課題#1442#1563を対応します.
 */
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    meta: { title: 'ログイン' },
    // KSD V001.000 AS
    alias: '/LoginPage/:userId:password:companyCode',
    // KSD V001.000 AE
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/Login/Login.vue'
      ),
    props: true
  },
  {
    path: '/PwUpdate',
    name: 'PwUpdate',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/Login/ChangePassword.vue'
      )
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    meta: { title: 'ログイン' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/Login/Login.vue'
      ),
    props: true
  },
  {
    path: '/TopPage',
    name: 'TopPage',
    meta: { title: 'メインメニュー' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/Top/TopPage.vue'
      ),
    props: true
  },
  // システム設定
  {
    path: '/F00004/:title',
    name: 'F00004',
    meta: { title: '企業マスタ登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/CorporateMaster/CorporateMaintenance.vue'
      ),
    props: true
  },
  {
    path: '/F32212/:title',
    name: 'F32212',
    meta: { title: 'データ保持設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/DataRetentionSetting/DataRetentionSetting.vue'
      ),
    props: true
  },
  {
    path: '/F32213/:title',
    name: 'F32213',
    meta: { title: 'データクリア' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/DataClear/DataClear.vue'
      ),
    props: true
  },
  {
    path: '/F32231/:title',
    name: 'F32231',
    meta: { title: 'POSレポート出力' ,
          // KSD V001.000 DS
          // // G002.00.0 Add-Start
            // keepAlive: true
          // // G002.00.0 Add-End
          // KSD V001.000 DE
        },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/PosReport/PosReport.vue'
      ),
    props: true
  },
  {
    path: '/F32231-output/',
    name: 'F32231-output',
    meta: { title: 'POSレポート出力' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/PosReport/PosReportOutput.vue'
      ),
    props: true
  },
  // KSD V001.000 AS
  {
    path: '/F32232/:title',
    name: 'F32232',
    meta: {
      title: '監査レポート出力',
      // KSD V001.000 DS
      // keepAlive: true
      // KSD V001.000 DE
    },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/PosReport/AuditReport.vue'
      ),
    props: true
  },
  {
    path: '/F32232-output/',
    name: 'F32232-output',
    meta: { title: '監査レポート出力' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/PosReport/AuditReportOutput.vue'
      ),
    props: true
  },
  // KSD V001.000 AE
  {
    path: '/F32271/:title',
    name: 'F32271',
    meta: { title: '電子ジャーナル' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/ElectronicJournal/ElectronicJournal.vue'
      ),
    props: true
  },
  {
    path: '/F00003/:title',
    name: 'F00003',
    meta: { title: '店舗マスタ登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/StoreMaster/StoreMaintenance.vue'
      ),
    props: true
  },
  {
    path: '/F00001/:title',
    name: 'F00001',
    meta: { title: 'ユーザマスタ登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/UserMaster/UserMaintenance.vue'
      ),
    props: true
  },
  {
    path: '/C00227/:title',
    name: 'C00227',
    meta: { title: '従業員コード印字' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/EmployeeCodePrint/EmployeeCodePrint.vue'
      ),
    props: true
  },
  {
    path: '/F32242/:title',
    name: 'F32242',
    meta: { title: 'アクセス権限登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/AccessAuthorityRegistration/AccessAuthorityRegistration.vue'
      ),
    props: true
  },
  {
    path: '/F00013/:title',
    name: 'F00013',
    meta: { title: '端末設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/DeviceSetting/DeviceSetting.vue'
      ),
    props: true
  },
  {
    path: '/F00107/:title',
    name: 'F00107',
    meta: { title: '状態管理' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/StateManagement/StateManagement.vue'
      ),
    props: true
  },
  // KSD V001.000 AS
  {
    path: '/F32251/:title',
    name: 'F32251',
    meta: { title: '店舗グループ１登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/StoreGroupOneRegistration/StoreGroupOneRegistration.vue'
      ),
    props: true
  },
  {
    path: '/F32252/:title',
    name: 'F32252',
    meta: { title: '店舗グループ２登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/StoreGroupTwoRegistration/StoreGroupTwoRegistration.vue'
      ),
    props: true
  },
  // KSD V001.000 AE
  {
    path: '/F00108/:title',
    name: 'F00108',
    meta: { title: '商品マスタ登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/ProductMaster/ProductMaster.vue'
      ),
    props: true
  },
  {
    path: '/F32282/:title',
    name: 'F32282',
    meta: { title: 'プリセットマスタ登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/PresetMaster/PresetMaster.vue'
      ),
    props: true
  },
  {
    path: '/F00109/:title',
    name: 'F00109',
    meta: { title: '売価変更' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/PriceChange/PriceChange.vue'
      ),
    props: true
  },
  {
    path: '/F322a2/:title',
    name: 'F322a2',
    meta: { title: 'バーコードフラグ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/BarcodeSetting/BarcodeSettingSelect.vue'
      ),
    props: true
  },
  {
    path: '/F322a2-edit/',
    name: 'F322a2-edit',
    meta: { title: 'バーコードフラグ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/BarcodeSetting/BarcodeSetting.vue'
      ),
    props: true
  },
  {
    path: '/F322a3/:title',
    name: 'F322a3',
    meta: { title: '取引別名称設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/TransactionNameSetting/TransactionNameSettingSelect.vue'
      ),
    props: true
  },
  {
    path: '/F322a3-edit/',
    name: 'F322a3-edit',
    meta: { title: '取引別名称設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/TransactionNameSetting/TransactionNameSetting.vue'
      ),
    props: true
  },
  // G002.00.0 Add-Start
  {
    path: '/F322a3-output/',
    name: 'F322a3-output',
    meta: { title: '取引別名称設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/TransactionNameSetting/TransactionNameOutput.vue'
      ),
    props: true
  },
  // G002.00.0 Add-End
  {
    path: '/F322a4/:title',
    name: 'F322a4',
    meta: { title: '収入印紙設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/RevenueStampSetting/ConfigSelect.vue'
      ),
    props: true
  },
  {
    path: '/F322a4-edit/',
    name: 'F322a4-edit',
    meta: { title: '収入印紙設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/RevenueStampSetting/RevenueStampSetting.vue'
      ),
    props: true
  },
  {
    path: '/F322a5/:title',
    name: 'F322a5',
    meta: { title: '運用設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/OperationsSetting/OperationsSettingSelect.vue'
      ),
    props: true
  },
  {
    path: '/F322a5-edit/',
    name: 'F322a5-edit',
    meta: { title: '運用設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/OperationsSetting/OperationsSetting.vue'
      ),
    props: true
  },
  {
    path: '/F322a6/:title',
    name: 'F322a6',
    meta: { title: '店別運用設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/StoreOperationsSetting/StoreOperationsSettingSelect.vue'
      ),
    props: true
  },
  {
    path: '/F322a6-edit/',
    name: 'F322a6-edit',
    meta: { title: '店別運用設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/StoreOperationsSetting/StoreOperationsSetting.vue'
      ),
    props: true
  },
  {
    path: '/F322b1/:title',
    name: 'F322b1',
    meta: { title: '操作ボタン設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/OperationBtnSetting/OperationBtnSetting.vue'
      ),
    props: true
  },
  {
    path: '/F322b2/:title',
    name: 'F322b2',
    meta: { title: '締めボタン設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/EndButtonSetting/EndButtonSetting.vue'
      ),
    props: true
  },
  {
    path: '/F322b3/:title',
    name: 'F322b3',
    meta: { title: 'レシート設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/ReceiptSetting/ReceiptSetting.vue'
      ),
    props: true
  }
  // KSD V001.000 AS
  ,{
    path: '/F322b4/:title',
    name: 'F322b4',
    meta: { title: '税率設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/TaxRateSetting/TaxRateSettingSelect.vue'
      ),
    props: true
  }
  ,{
    path: '/F322b4-edit',
    name: 'F322b4',
    meta: { title: '税率設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/TaxRateSetting/TaxRateSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/F322b5/:title',
    name: 'F322b5',
    meta: { title: '時間帯設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/HourZoneSetting/HourZoneSettingConfigSelect.vue'
      ),
    props: true
  }
  ,{
    path: '/F322b5-edit',
    name: 'F322b5-edit',
    meta: { title: '時間帯設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/HourZoneSetting/HourZoneSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/F00203/:title',
    name: 'F00203',
    meta: { title: '商品分類階層設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/ProductDivMaster/productDivMaster.vue'
      ),
    props: true
  }
  ,{
    path: '/F00204/:title',
    name: 'F00204',
    meta: { title: '商品構成マスタ登録' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/ProductGroupMaster/ProductGroupMaster.vue'
      ),
    props: true
  }
  ,{
    path: '/F322b9/:title',
    name: 'F322b9',
    meta: { title: 'フロアマスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/FloorMasterSetting/FloorMasterSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/F32283/:title',
    name: 'F32283',
    meta: { title: '飲食オーダーガイダンス設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/GuidanceSetting/GuidanceSettingMainLayout.vue'
      ),
    props: true
  }
  ,{
    path: '/C00208/:title',
    name: 'C00208',
    meta: { title: '部屋情報マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/RoomInfoMasterSetting/RoomInfoMasterSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00210/:title',
    name: 'C00210',
    meta: { title: 'コンプライアンス情報マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/ComplianceInformationSetting/ComplianceInformationSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00211/:title',
    name: 'C00211',
    meta: { title: 'コース料金設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/CoursePriceSetting/CoursePriceSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00212/:title',
    name: 'C00212',
    meta: { title: 'カレンダーマスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/CalendarSettings/CalendarSettings.vue'
      ),
    props: true
  }
  ,{
    path: '/C00213/:title',
    name: 'C00213',
    meta: { title: '会員ランクマスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/MemberRankSetting/MemberRankSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00214/:title',
    name: 'C00214',
    meta: { title: '曜日区分マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/DayOfTheWeekClassificationSetting/DayOfTheWeekClassificationSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00215/:title',
    name: 'C00215',
    meta: { title: 'コースマスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/CourseMasterSetting/CourseMasterSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00216/:title',
    name: 'C00216',
    meta: { title: '年齢区分マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/AgeClassificationMaster/AgeClassificationMaster.vue'
      ),
    props: true
  }
  ,{
    path: '/C00217/:title',
    name: 'C00217',
    meta: { title: 'オプションマスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/OptionMasterSetting/OptionMasterSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00218/:title',
    name: 'C00218',
    meta: { title: '機材マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/EquipmentMasterSetting/EquipmentMasterSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00219/:title',
    name: 'C00219',
    meta: { title: '機種設備マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/ModelEquipmentMasterSetting/ModelEquipmentMasterSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00220/:title',
    name: 'C00220',
    meta: { title: '部屋関連情報マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/RoomRelatedInformationSetting/RoomRelatedInformationSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00221/:title',
    name: 'C00221',
    meta: { title: '部屋情報サブ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/RoomInfoSubSetting/RoomInfoSubSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00222/:title',
    name: 'C00222',
    meta: { title: 'セルフ/客面POSマスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/SelfPOSMasterSetting/SelfPOSMasterSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/C00223/:title',
    name: 'C00223',
    meta: { title: 'コード決済通信マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/CodePaymentCommunicationMaster/CodePaymentCommunicationMaster.vue'
      ),
    props: true
  }
  ,{
    path: '/C00224/:title',
    name: 'C00224',
    meta: { title: '料金表表示マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/PriceListDisplayMasterSetting/PriceListDisplayMasterSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/F322c1/:title',
    name: 'F322c1',
    meta: { title: '券種マスタ設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../resource/templates/TicketTypeMasterSetting/TicketTypeMasterSetting.vue'
      ),
    props: true
  },
  {
    path: '/F32254/:title',
    name: 'F32254',
    meta: { title: '店舗マスタコピー' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../resource/templates/StoreMasterCopy/StoreMasterCopy.vue'
      ),
    props: true
  }
  ,{
    path: '/F322b6/:title',
    name: 'F322b6',
    meta: { title: '金種設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/DenominationSetting/DenominationSetting.vue'
      ),
    props: true
  }
  ,{
    path: '/F322b7/:title',
    name: 'F322b7',
    meta: { title: 'OES連携名称設定' },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '.././resource/templates/OESLinkageNameSetting/OESLinkageNameSetting.vue'
      ),
    props: true
  }
  // KSD V001.000 AE
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// G001.00.0 Add-Start
router.beforeEach((to, from, next) => {
  let authorizedRouter = window.localStorage.getItem('AuthorizedRouter')
  if (authorizedRouter !== null && authorizedRouter !== undefined) {
    let routerList = authorizedRouter.split(',')
    for (var i = 0; i < routerList.length; i++) {
      if (to.name !== 'TopPage' && to.name !== 'LoginPage' && to.name !== 'PwUpdate' && (routerList.indexOf(to.name) === -1 && routerList.indexOf(to.name.slice(0, 6)) === -1)) {
        next({path: '/TopPage'})
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/LoginPage' || to.path === '/TopPage') {
      next()
    } else {
      next({path: '/LoginPage'})
    }
  }
})
// G001.00.0 Add-end
export default router
