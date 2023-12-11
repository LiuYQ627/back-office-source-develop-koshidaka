import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from './../Common/commonUtils'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230214  xu.jh(Neusoft)        G001.00.0  issue課題#1054を対応します.
 * 20230404  wangchunmei(Neusoft)  G002.00.0  issue課題#1656を対応します.
 */

const checkSession = 'Top/CheckSession'

export default {
  name: 'Top',
  data () {
    return {
      subMenuId: 0,
      portalFlag: true,
      mntFlag: false,
      seFlag: false,
      authorityList: [],
      mainMenuMap: [],
      subMenuMap: [],
      businessMenuMap: [],
      // G001.00.0 Add-Start
      sessionResult: [],
      permissions: [],
      menuInfoList: [
        // 左
        {'menuitemCd': '0200000000', 'permissionName': '', 'name': 'バックオフィス業務', 'menuFlg': 1, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 0},
        // メニュー
        // システム設定
        {'menuitemCd': '0201000000', 'permissionName': '',                                'name': 'システム設定',   'menuFlg': 2, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 1},
        {'menuitemCd': '0201F00004', 'permissionName': 'CLOUDPOS_CORP_EXECUTE',           'name': '企業マスタ登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 1},
        {'menuitemCd': '0201F32212', 'permissionName': 'CLOUDPOS_DATA_RETENTION_EXECUTE', 'name': 'データ保持設定', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 1},
        {'menuitemCd': '0201F32213', 'permissionName': 'CLOUDPOS_DATA_CLEAR_EXECUTE',     'name': 'データクリア',   'menuFlg': 3, 'displayOrder': 3, 'mainmenuCd': 2, 'submenuCd': 1},
        // ポータル
        {'menuitemCd': '0202000000', 'permissionName': '',                                'name': 'ポータル', 'menuFlg': 2, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 2},
        // 売上管理
        {'menuitemCd': '0203F32231', 'permissionName': 'CLOUDPOS_REPORT_EXECUTE', 'name': 'POSレポート出力',  'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 3},
        // ユーザ管理
        {'menuitemCd': '0204000000', 'permissionName': '',                          'name': 'ユーザ管理',       'menuFlg': 2, 'displayOrder': 4, 'mainmenuCd': 2, 'submenuCd': 4},
        {'menuitemCd': '0204F00001', 'permissionName': 'CLOUDPOS_USER_EXECUTE',     'name': 'ユーザマスタ登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 4},
        {'menuitemCd': '0204C00227', 'permissionName': 'CLOUDPOS_EMPLOYEE_EXECUTE', 'name': '従業員コード印字', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 4},
        {'menuitemCd': '0204F32242', 'permissionName': 'CLOUDPOS_ACCESS_EXECUTE',   'name': 'アクセス権限登録', 'menuFlg': 3, 'displayOrder': 3, 'mainmenuCd': 2, 'submenuCd': 4},
        // 店舗管理
        {'menuitemCd': '0205000000', 'permissionName': '',                            'name': '店舗管理',           'menuFlg': 2, 'displayOrder': 5, 'mainmenuCd': 2, 'submenuCd': 5},
        // KSD V001.000 AS
        {'menuitemCd': '0205F32251', 'permissionName': 'CLOUDPOS_GRP1_EXECUTE',       'name': '店舗グループ１登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 5},
        {'menuitemCd': '0205F32252', 'permissionName': 'CLOUDPOS_GRP2_EXECUTE',       'name': '店舗グループ２登録', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 5},
        // KSD V001.000 AE
        {'menuitemCd': '0205F00003', 'permissionName': 'CLOUDPOS_STORE_EXECUTE',      'name': '店舗マスタ登録',     'menuFlg': 3, 'displayOrder': 3, 'mainmenuCd': 2, 'submenuCd': 5},
        // KSD V001.000 AS
        {'menuitemCd': '0205F32254', 'permissionName': 'CLOUDPOS_STORE_COPY_EXECUTE', 'name': '店舗マスタコピー',   'menuFlg': 3, 'displayOrder': 4, 'mainmenuCd': 2, 'submenuCd': 5},
        // KSD V001.000 AE
        // 端末管理
        {'menuitemCd': '0206000000', 'permissionName': '',                              'name': '端末管理', 'menuFlg': 2, 'displayOrder': 6, 'mainmenuCd': 2, 'submenuCd': 6},
        {'menuitemCd': '0206F00013', 'permissionName': 'CLOUDPOS_DEVICE_EXECUTE',       'name': '端末設定', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 6},
        // KSD V001.000 AS
        {'menuitemCd': '0206F322b6', 'permissionName': 'CLOUDPOS_DENOMINATION_EXECUTE', 'name': '金種設定', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 6},
        // KSD V001.000 AE
        {'menuitemCd': '0206F00107', 'permissionName': 'CLOUDPOS_STATUS_EXECUTE',       'name': '状態管理', 'menuFlg': 3, 'displayOrder': 3, 'mainmenuCd': 2, 'submenuCd': 6},
        // 監査
        {'menuitemCd': '0207000000', 'permissionName': '',                         'name': '監査',             'menuFlg': 2, 'displayOrder': 6, 'mainmenuCd': 2, 'submenuCd': 7},
        {'menuitemCd': '0207F32271', 'permissionName': 'CLOUDPOS_JOURNAL_EXECUTE', 'name': '電子ジャーナル',   'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 7},
        {'menuitemCd': '0207F32231', 'permissionName': 'CLOUDPOS_REPORT_EXECUTE',  'name': 'POSレポート出力',  'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 7},
        // KSD V001.000 AS
        {'menuitemCd': '0207F32232', 'permissionName': 'CLOUDPOS_AUDIT_EXECUTE',   'name': '監査レポート出力', 'menuFlg': 3, 'displayOrder': 3, 'mainmenuCd': 2, 'submenuCd': 7},
        // KSD V001.000 AE
        // 商品構成
        {'menuitemCd': '0208000000', 'permissionName': '',                                   'name': '商品構成',                   'menuFlg': 2, 'displayOrder': 8, 'mainmenuCd': 2, 'submenuCd': 8},
        // KSD V001.000 AS
        {'menuitemCd': '0208F00203', 'permissionName': 'CLOUDPOS_PRODUCT_DIVISIONS_EXECUTE', 'name': '商品分類階層設定',           'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 8},
        {'menuitemCd': '0208F00204', 'permissionName': 'CLOUDPOS_CATALOG_EXECUTE',           'name': '商品構成マスタ登録',         'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 8},
        // KSD V001.000 AE
        {'menuitemCd': '0208F00108', 'permissionName': 'CLOUDPOS_ITEM_EXECUTE',              'name': '商品マスタ登録',             'menuFlg': 3, 'displayOrder': 3, 'mainmenuCd': 2, 'submenuCd': 8},
        // KSD V001.000 AS
        {'menuitemCd': '0208F32283', 'permissionName': '',                                   'name': '飲食オーダーガイダンス設定', 'menuFlg': 3, 'displayOrder': 4, 'mainmenuCd': 2, 'submenuCd': 8},
        // KSD V001.000 AE
        {'menuitemCd': '0208F32282', 'permissionName': 'CLOUDPOS_PRESET_EXECUTE',            'name': 'プリセットマスタ登録',       'menuFlg': 3, 'displayOrder': 5, 'mainmenuCd': 2, 'submenuCd': 8},
        // 売価変更
        {'menuitemCd': '0209000000', 'permissionName': '',                       'name': '売価変更', 'menuFlg': 2, 'displayOrder': 9, 'mainmenuCd': 2, 'submenuCd': 9},
        {'menuitemCd': '0209F00109', 'permissionName': 'CLOUDPOS_PRICE_EXECUTE', 'name': '売価変更', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 9},
        // クラウドPOS運用設定
        {'menuitemCd': '0210000000', 'permissionName': '',                                 'name': 'クラウドPOS運用設定',  'menuFlg': 2, 'displayOrder': 10, 'mainmenuCd': 2, 'submenuCd': 10},
        {'menuitemCd': '0210F322a2', 'permissionName': 'CLOUDPOS_BARCODE_EXECUTE',         'name': 'バーコードフラグ設定', 'menuFlg': 3, 'displayOrder': 2,  'mainmenuCd': 2, 'submenuCd': 10},
        {'menuitemCd': '0210F322a3', 'permissionName': 'CLOUDPOS_TRANSACTION_EXECUTE',     'name': '取引別名称設定',       'menuFlg': 3, 'displayOrder': 3,  'mainmenuCd': 2, 'submenuCd': 10},
        {'menuitemCd': '0210F322a4', 'permissionName': 'CLOUDPOS_REVENUE_STAMP_EXECUTE',   'name': '収入印紙設定',         'menuFlg': 3, 'displayOrder': 4,  'mainmenuCd': 2, 'submenuCd': 10},
        {'menuitemCd': '0210F322a5', 'permissionName': 'CLOUDPOS_OPERATION_EXECUTE',       'name': '運用設定',             'menuFlg': 3, 'displayOrder': 5,  'mainmenuCd': 2, 'submenuCd': 10},
        {'menuitemCd': '0210F322a6', 'permissionName': 'CLOUDPOS_STORE_OPERATION_EXECUTE', 'name': '店別運用設定',         'menuFlg': 3, 'displayOrder': 6,  'mainmenuCd': 2, 'submenuCd': 10},
        {'menuitemCd': '0210F322b3', 'permissionName': 'CLOUDPOS_RECEIPT_EXECUTE',         'name': 'レシート設定',         'menuFlg': 3, 'displayOrder': 7,  'mainmenuCd': 2, 'submenuCd': 10},
        // KSD V001.000 AS
        {'menuitemCd': '0210F322b4', 'permissionName': 'CLOUDPOS_TAX_EXECUTE',             'name': '税率設定',             'menuFlg': 3, 'displayOrder': 8,  'mainmenuCd': 2, 'submenuCd': 10},
        {'menuitemCd': '0210F322b5', 'permissionName': 'CLOUDPOS_TIME_EXECUTE',            'name': '時間帯設定',           'menuFlg': 3, 'displayOrder': 9,  'mainmenuCd': 2, 'submenuCd': 10},
        {'menuitemCd': '0210F322b7', 'permissionName': 'CLOUDPOS_TIME_EXECUTE',            'name': 'OES連携名称設定',      'menuFlg': 3, 'displayOrder': 10, 'mainmenuCd': 2, 'submenuCd': 10},
        // KSD V001.000 AE
        // クラウドPOS店舗運用設定
        {'menuitemCd': '0211000000', 'permissionName': '',                                'name': 'クラウドPOS店舗運用設定', 'menuFlg': 2, 'displayOrder': 11, 'mainmenuCd': 2, 'submenuCd': 11},
        {'menuitemCd': '0211F322b1', 'permissionName': 'CLOUDPOS_OPERATION_BTN_EXECUTE',  'name': '操作ボタン設定',          'menuFlg': 3, 'displayOrder': 1,  'mainmenuCd': 2, 'submenuCd': 11},
        {'menuitemCd': '0211F322b2', 'permissionName': 'CLOUDPOS_TIGHTENING_BTN_EXECUTE', 'name': '締めボタン設定',          'menuFlg': 3, 'displayOrder': 2,  'mainmenuCd': 2, 'submenuCd': 11}
        // KSD V001.000 AS
        // 全店共通設定
        ,{'menuitemCd': '0212000000', 'permissionName': '',                              'name': '全店共通設定',           'menuFlg': 2, 'displayOrder': 12, 'mainmenuCd': 2, 'submenuCd': 12}
        ,{'menuitemCd': '0212C00218', 'permissionName': 'CLOUDPOS_EQUIPMENT_EXECUTE',    'name': '機材マスタ設定',         'menuFlg': 3, 'displayOrder': 1,  'mainmenuCd': 2, 'submenuCd': 12}
        ,{'menuitemCd': '0212C00219', 'permissionName': 'CLOUDPOS_MODEL_EXECUTE',        'name': '機種設備マスタ設定',     'menuFlg': 3, 'displayOrder': 2,  'mainmenuCd': 2, 'submenuCd': 12}
        ,{'menuitemCd': '0212C00216', 'permissionName': 'CLOUDPOS_AGE_DIVISION_EXECUTE', 'name': '年齢区分マスタ設定',     'menuFlg': 3, 'displayOrder': 3,  'mainmenuCd': 2, 'submenuCd': 12}
        ,{'menuitemCd': '0212C00213', 'permissionName': 'CLOUDPOS_MEMBER_RANK_EXECUTE',  'name': '会員ランクマスタ設定',   'menuFlg': 3, 'displayOrder': 4,  'mainmenuCd': 2, 'submenuCd': 12}
        // 店舗固有設備設定
        ,{'menuitemCd': '0213000000', 'permissionName': '',                               'name': '店舗固有設備設定',         'menuFlg': 2, 'displayOrder': 13, 'mainmenuCd': 2, 'submenuCd': 13}
        ,{'menuitemCd': '0213C00208', 'permissionName': 'CLOUDPOS_ROOM_EXECUTE',          'name': '部屋情報マスタ設定',       'menuFlg': 3, 'displayOrder': 1,  'mainmenuCd': 2, 'submenuCd': 13}
        ,{'menuitemCd': '0213C00220', 'permissionName': 'CLOUDPOS_ROOM_RELATION_EXECUTE', 'name': '部屋関連情報マスタ設定',   'menuFlg': 3, 'displayOrder': 2,  'mainmenuCd': 2, 'submenuCd': 13}
        ,{'menuitemCd': '0213C00221', 'permissionName': 'CLOUDPOS_ROOM_SUB_EXECUTE',      'name': '部屋情報サブ設定',         'menuFlg': 3, 'displayOrder': 3,  'mainmenuCd': 2, 'submenuCd': 13}
        ,{'menuitemCd': '0213C00223', 'permissionName': 'CLOUDPOS_CODEPAY_EXECUTE',       'name': 'コード決済通信マスタ設定', 'menuFlg': 3, 'displayOrder': 4,  'mainmenuCd': 2, 'submenuCd': 13}
        ,{'menuitemCd': '0213C00224', 'permissionName': 'CLOUDPOS_TARIFF_EXECUTE',        'name': '料金表表示マスタ設定',     'menuFlg': 3, 'displayOrder': 5,  'mainmenuCd': 2, 'submenuCd': 13}
        // 店舗固有POS設定
        ,{'menuitemCd': '0214000000', 'permissionName': '',                            'name': '店舗固有POS設定',                'menuFlg': 2, 'displayOrder': 14, 'mainmenuCd': 2, 'submenuCd': 14}
        ,{'menuitemCd': '0214F322c1', 'permissionName': 'CLOUDPOS_TICKET_EXECUTE',     'name': '券種マスタ設定',                 'menuFlg': 3, 'displayOrder': 1,  'mainmenuCd': 2, 'submenuCd': 14}
        ,{'menuitemCd': '0214C00210', 'permissionName': 'CLOUDPOS_COMPLIANCE_EXECUTE', 'name': 'コンプライアンス情報マスタ設定', 'menuFlg': 3, 'displayOrder': 2,  'mainmenuCd': 2, 'submenuCd': 14}
        // KSD V001.000 DS
        // ,{'menuitemCd': '0214C00222', 'permissionName': 'CLOUDPOS_SELFPOS_EXECUTE',    'name': 'セルフPOSマスタ設定',            'menuFlg': 3, 'displayOrder': 3,  'mainmenuCd': 2, 'submenuCd': 14}
        // KSD V001.000 DE
        // KSD V001.000 AS
        ,{'menuitemCd': '0214C00222', 'permissionName': 'CLOUDPOS_SELFPOS_EXECUTE',    'name': 'セルフ/客面POSマスタ設定',            'menuFlg': 3, 'displayOrder': 3,  'mainmenuCd': 2, 'submenuCd': 14}
        // KSD V001.000 AE
        // 店舗固有料金設定
        ,{'menuitemCd': '0215000000', 'permissionName': ''                          ,        'name': '店舗固有料金設定',     'menuFlg': 2, 'displayOrder': 15, 'mainmenuCd': 2, 'submenuCd': 15}
        ,{'menuitemCd': '0215C00214', 'permissionName': 'CLOUDPOS_WEEKDAY_DIVISION_EXECUTE', 'name': '曜日区分マスタ設定',   'menuFlg': 3, 'displayOrder': 1,  'mainmenuCd': 2, 'submenuCd': 15}
        ,{'menuitemCd': '0215C00212', 'permissionName': 'CLOUDPOS_CALENDER_EXECUTE' ,        'name': 'カレンダーマスタ設定', 'menuFlg': 3, 'displayOrder': 2,  'mainmenuCd': 2, 'submenuCd': 15}
        ,{'menuitemCd': '0215C00211', 'permissionName': 'CLOUDPOS_COURSE_RATE_EXECUTE',      'name': 'コース料金設定',       'menuFlg': 3, 'displayOrder': 3,  'mainmenuCd': 2, 'submenuCd': 15}
        ,{'menuitemCd': '0215C00217', 'permissionName': 'CLOUDPOS_DRINKCOURCE_EXECUTE',      'name': 'オプションマスタ設定', 'menuFlg': 3, 'displayOrder': 4,  'mainmenuCd': 2, 'submenuCd': 15}
        ,{'menuitemCd': '0215C00215', 'permissionName': 'CLOUDPOS_ROOMCOURCE_EXECUTE',       'name': 'コースマスタ設定',     'menuFlg': 3, 'displayOrder': 5,  'mainmenuCd': 2, 'submenuCd': 15}
        // KSD V001.000 AE
      ]
      // G001.00.0 Add-end
    }
  },
  components: {
    popup,
    PerfectScrollbar
  },
  methods: {
    getMenu () {
      this.createdMenuInfo()
      //      axios.get(this.$i18n.t('prop.url') + loginPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader()
      //      )
      //        .then(response => {
      //          this.authorityList = response.data
      //          if (this.authorityList.result.code === -90) {
      //            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), this.authorityList.result.code, false, () => {
      //              this.$router.push('/LoginPage')
      //            }, false, null)
      //          } else if (this.authorityList.result.code !== 0) {
      //            var globalErrorMsg = this.authorityList.result.errorMessageMap['global'].toString()
      //            this.$refs.pop.open(2, '', globalErrorMsg, this.authorityList.result.code, false, null, false, null)
      //          } else {
      //            this.createdMenuInfo()
      //          }
      //        })
      //        .catch(error => {
      //          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      //          console.log(error)
      //        })
    },
    portalMenu (index) {
      for (var i = 0; i < this.mainMenuMap.length; i++) {
        if (this.mainMenuMap[i].mainmenuCd === index) {
          this.$root.title = this.mainMenuMap[i].name
          break
        }
      }
      this.subMenuId = index
    },
    createdMenuInfo () {
      // G001.00.0 Update-Start
      let menuInfoList = this.menuInfoList
      // var menuInfoList = [
      //   // 左
      //   {'menuitemCd': '0200000000', 'name': 'バックオフィス業務', 'menuFlg': 1, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 0},
      //   // メニュー
      //   // システム設定
      //   {'menuitemCd': '0201000000', 'name': 'システム設定', 'menuFlg': 2, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 1},
      //   {'menuitemCd': '0201F00004', 'name': '企業マスタ登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 1},
      //   {'menuitemCd': '0201F32212', 'name': 'データ保持設定', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 1},
      //   {'menuitemCd': '0201F32213', 'name': 'データクリア', 'menuFlg': 3, 'displayOrder': 3, 'mainmenuCd': 2, 'submenuCd': 1},
      //   // ポータル
      //   {'menuitemCd': '0202000000', 'name': 'ポータル', 'menuFlg': 2, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 2},
      //   // 売上管理
      //   {'menuitemCd': '0203F32231', 'name': 'POSレポート出力', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 3},
      //   // ユーザ管理
      //   {'menuitemCd': '0204000000', 'name': 'ユーザ管理', 'menuFlg': 2, 'displayOrder': 4, 'mainmenuCd': 2, 'submenuCd': 4},
      //   {'menuitemCd': '0204F00001', 'name': 'ユーザマスタ登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 4},
      //   {'menuitemCd': '0204F32242', 'name': 'アクセス権限登録', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 4},
      //   // 店舗管理
      //   {'menuitemCd': '0205000000', 'name': '店舗管理', 'menuFlg': 2, 'displayOrder': 5, 'mainmenuCd': 2, 'submenuCd': 5},
      //   // KSD V001.000 AS
      //   {'menuitemCd': '0205F32251', 'name': '店舗グループ１登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 5},
      //   {'menuitemCd': '0205F32252', 'name': '店舗グループ２登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 5},
      //   // KSD V001.000 AE
      //   {'menuitemCd': '0205F00003', 'name': '店舗マスタ登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 5},
      //   // 端末管理
      //   {'menuitemCd': '0206000000', 'name': '端末管理', 'menuFlg': 2, 'displayOrder': 6, 'mainmenuCd': 2, 'submenuCd': 6},
      //   {'menuitemCd': '0206F00013', 'name': '端末設定', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 6},
      //   {'menuitemCd': '0206F00107', 'name': '状態管理', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 6},
      //   // 監査
      //   {'menuitemCd': '0207000000', 'name': '監査', 'menuFlg': 2, 'displayOrder': 6, 'mainmenuCd': 2, 'submenuCd': 7},
      //   {'menuitemCd': '0207F32271', 'name': '電子ジャーナル', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 7},
      //   {'menuitemCd': '0207F32231', 'name': 'POSレポート出力', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 7},
      //   // 商品構成
      //   {'menuitemCd': '0208000000', 'name': '商品構成', 'menuFlg': 2, 'displayOrder': 8, 'mainmenuCd': 2, 'submenuCd': 8},
      //   // KSD V001.000 AS
      //   {'menuitemCd': '0208F00203', 'name': '商品分類階層設定', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 8},
      //   {'menuitemCd': '0208F00204', 'name': '商品構成マスタ登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 8},
      //   // KSD V001.000 AE
      //   {'menuitemCd': '0208F00108', 'name': '商品マスタ登録', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 8},
      //   {'menuitemCd': '0208F32282', 'name': 'プリセットマスタ登録', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 8},
      //   // 売価変更
      //   {'menuitemCd': '0209000000', 'name': '売価変更', 'menuFlg': 2, 'displayOrder': 9, 'mainmenuCd': 2, 'submenuCd': 9},
      //   {'menuitemCd': '0209F00109', 'name': '売価変更', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 9},
      //   // クラウドPOS運用設定
      //   {'menuitemCd': '0210000000', 'name': 'クラウドPOS運用設定', 'menuFlg': 2, 'displayOrder': 10, 'mainmenuCd': 2, 'submenuCd': 10},
      //   {'menuitemCd': '0210F322a2', 'name': 'バーコードフラグ設定', 'menuFlg': 3, 'displayOrder': 2, 'mainmenuCd': 2, 'submenuCd': 10},
      //   {'menuitemCd': '0210F322a3', 'name': '取引別名称設定', 'menuFlg': 3, 'displayOrder': 3, 'mainmenuCd': 2, 'submenuCd': 10},
      //   {'menuitemCd': '0210F322a4', 'name': '収入印紙設定', 'menuFlg': 3, 'displayOrder': 4, 'mainmenuCd': 2, 'submenuCd': 10},
      //   {'menuitemCd': '0210F322a5', 'name': '運用設定', 'menuFlg': 3, 'displayOrder': 5, 'mainmenuCd': 2, 'submenuCd': 10},
      //   {'menuitemCd': '0210F322a6', 'name': '店別運用設定', 'menuFlg': 3, 'displayOrder': 6, 'mainmenuCd': 2, 'submenuCd': 10},
      //   {'menuitemCd': '0210F322b3', 'name': 'レシート設定', 'menuFlg': 3, 'displayOrder': 7, 'mainmenuCd': 2, 'submenuCd': 10},
      //   // クラウドPOS店舗運用設定
      //   {'menuitemCd': '0211000000', 'name': 'クラウドPOS店舗運用設定', 'menuFlg': 2, 'displayOrder': 11, 'mainmenuCd': 2, 'submenuCd': 11},
      //   {'menuitemCd': '0211F322b1', 'name': '操作ボタン設定', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 11},
      //   {'menuitemCd': '0211F322b2', 'name': '締めボタン設定', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 11}
      //   // KSD V001.000 AS
      //   // ルーム関連設定
      //   ,{'menuitemCd': '0212000000', 'name': 'ルーム関連設定',   'menuFlg': 2, 'displayOrder': 12, 'mainmenuCd': 2, 'submenuCd': 12}
      //   ,{'menuitemCd': '0212F322b9', 'name': 'フロアマスタ設定',       'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 12}
      //   ,{'menuitemCd': '0212C00208', 'name': '部屋情報マスタ設定',     'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 12}
      //   ,{'menuitemCd': '0212C00220', 'name': '部屋関連情報マスタ設定', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 12}
      //   ,{'menuitemCd': '0212C00221', 'name': '部屋情報サブ設定',       'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 12}
      //   // 料金関連設定
      //   ,{'menuitemCd': '0213000000', 'name': '料金関連設定', 'menuFlg': 2, 'displayOrder': 13, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213C00210', 'name': 'コンプライアンス情報マスタ設定', 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213C00211', 'name': 'コース料金設定',                 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213C00212', 'name': 'カレンダーマスタ設定',           'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213C00213', 'name': '会員ランクマスタ設定',           'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213C00214', 'name': '曜日区分マスタ設定',             'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213C00215', 'name': 'コースマスタ設定',         'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213C00216', 'name': '年齢区分マスタ設定',             'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213C00217', 'name': 'オプションマスタ設定',       'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   ,{'menuitemCd': '0213F322c1', 'name': '券種マスタ設定',                 'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 13}
      //   // 機材関連設定
      //   ,{'menuitemCd': '0214000000', 'name': '機材関連設定', 'menuFlg': 2, 'displayOrder': 14, 'mainmenuCd': 2, 'submenuCd': 14}
      //   ,{'menuitemCd': '0214C00218', 'name': '機材マスタ設定',         'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 14}
      //   ,{'menuitemCd': '0214C00219', 'name': '機種設備マスタ設定',     'menuFlg': 3, 'displayOrder': 1, 'mainmenuCd': 2, 'submenuCd': 14}
      //   // KSD V001.000 AE
      // ]
      // G001.00.0 Update-end
      //      var menuInfoList = this.authorityList.menuitemInfos
      //
      //      var startLebel = 'startLevel' + this.authorityList.roleCode
      var mainMenu = []
      var subMenu = new Map()
      var businessMenu = new Map()
      // G001.00.0 Add-start
      let routerList = []
      // G001.00.0 Add-end
      for (var i = 0; i < menuInfoList.length; i++) {
        // G001.00.0 Add-start
        let permissionName = menuInfoList[i].permissionName
// KSD DS アクセス権が全て返ってくるまで実施しない
//        if (permissionName !== '' && this.permissions && this.permissions.indexOf(permissionName) === -1) {
//          continue
//        }
// KSD DE アクセス権が全て返ってくるまで実施しない
        // G001.00.0 Add-end
        switch (menuInfoList[i].menuFlg) {
          case 1:
            //            if (menuInfoList[i][startLebel] === 0 || this.authorityList.approvalFlag === 1) {
            mainMenu.push(menuInfoList[i])
            //            }
            break
          case 2:
            //            if (menuInfoList[i][startLebel] === 0 || this.authorityList.approvalFlag === 1) {
            var key = menuInfoList[i].mainmenuCd.toString() + menuInfoList[i].submenuCd.toString()
            subMenu.set(key, menuInfoList[i])
            //            }
            break
          case 3:
            //            if (menuInfoList[i][startLebel] === 0 || this.authorityList.approvalFlag === 1) {
            key = menuInfoList[i].mainmenuCd.toString() + menuInfoList[i].submenuCd.toString()
            menuInfoList[i].menuitemCd = menuInfoList[i].menuitemCd.toString().slice(-6)
            // G001.00.0 Add-start
            routerList.push(menuInfoList[i].menuitemCd)
            // G001.00.0 Add-end

            // 業務リストの生成
            var businessMenuList = []
            if (businessMenu.has(key)) {
              // 既にサブメニューに設定中の業務がある場合
              businessMenuList = businessMenu.get(key)
            }
            businessMenuList.push(menuInfoList[i])
            businessMenu.set(key, businessMenuList)
            //            }
            break
        }
      }

      mainMenu.sort((a, b) => {
        if (a.displayOrder < b.displayOrder) {
          return -1
        } else {
          return 1
        }
      })
      // G002.00.0 Add-Start
      const subMenuKeys = Array.from(subMenu.keys())
      for (let i = 0; i < subMenuKeys.length; i++) {
        const key = subMenuKeys[i]
        const business = businessMenu.get(key)
        if (business === undefined) {
          subMenu.delete(key)
        }
      }
      // G002.00.0 Add-End
      this.mainMenuMap = mainMenu
      this.subMenuMap = subMenu
      this.businessMenuMap = businessMenu
      this.subMenuId = this.mainMenuMap[0].mainmenuCd
      this.$root.title = this.mainMenuMap[0].name
      this.$root.winId = 'O00002'
      // G001.00.0 Add-start
      window.localStorage.setItem('AuthorizedRouter', routerList.toString())
      // G001.00.0 Add-end
    },
    objectSort (object) {
      var sorted = {}
      var array = []
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          array.push(key)
        }
      }
      array.sort()
      for (var i = 0; i < array.length; i++) {
        sorted[array[i]] = object[array[i]]
      }
      return sorted
    },
    forword (winId, titles) {
      axios.get(this.$i18n.t('prop.url') + checkSession + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        .then(response => {
          this.sessionResult = response.data
          if (this.sessionResult.code !== 0) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), this.sessionResult.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
          } else {
            let route = this.$router.resolve({ name: winId, params: { title: titles } })
            // window.open(route.href, '_blank')
            this.$router.push(route.href)
          }
        })
        .catch(error => {
          console.log(error)
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        })
    },
    getSubManu () {
      return Array.from(this.subMenuMap).filter(x => x[1].mainmenuCd === this.subMenuId)
    },
    /**
     * サブメニューに紐づく業務情報を返す
     * @param {*} mainSubMenuCode subMenuMapのKey(メイン・サブメニューコード)
     * @returns サブメニューに紐づく業務情報(紐づく業務情報がない場合は空の配列)
     */
    getBusinessMenu (mainSubMenuCode) {
      var business = this.businessMenuMap.get(mainSubMenuCode)
      return business === undefined ? [] : business
    }
  },
  mounted () {
    document.title = this.$route.meta.title
    this.$root.title = this.$i18n.t('O00002.S001')
    this.$root.winId = 'O00002'
    // G001.00.0 Add-start
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
      // G001.00.0 Add-end
      this.getMenu()
    // G001.00.0 Add-start
    })
    // G001.00.0 Add-end
    this.portalFlag = true
    this.mntFlag = false
    this.seFlag = false
    document.documentElement.style.minWidth = 'unset'
  }
}
