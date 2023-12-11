import axios from 'axios'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
// import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
// KSD V001.000 DS
// import csvDialog from '@/resource/templates/AccessAuthorityRegistration/AccessAuthorityRegistrationCsvDialog'
// KSD V001.000 DE
import editDialog from '@/resource/templates/AccessAuthorityRegistration/AccessAuthorityRegistrationEditDialog'

const accessAuthorityTablePath = 'AccessAuthorityRegistration/AccessAuthorityTable'
const savePath = 'AccessAuthorityRegistration/AccessInfoRegist'
// KSD V001.000 AS
import csvDialog from '@/resource/templates/CommonDesign/CsvDialog'
import csvExportUtils from '@/resource/static/js/CommonDesign/csvExportUtils'
const csvExportTimerData = require('../../properties/csvExportTimer.json')
// KSD V001.000 AE
// const csvPath = 'AccessAuthorityRegistration/Csv'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230112  bai.ry(Neusoft)  G001.00.0  issue課題#1172を対応します.
 * 20230301  dingxin(Neusoft)  G002.00.0  issue課題#715を対応します.
 * 20230320  xu.jh(Neusoft)  G003.00.0  issue課題#1500を対応します.
 * 20230331  xu.jh(Neusoft)  G004.00.0  issue課題#1656を対応します.
 * 20230423  dingxin(Neusoft)  G005.00.0  issue課題#1662を対応します.
 * 20230713  zxh(Neusoft)      G006.00.0  issue#1125課題を対応します.
 * 20230721  zxh(Neusoft)      G007.00.0  issue#1131課題を対応します.
 */
export default {
  name: 'AccessAuthorityRegistration',
  // KSD V001.000 AS
  mixins: [csvExportUtils],
  // KSD V001.000 AE
  data () {
    return {
      // G005.00.0 Add-Start
      permissions: [],
      // G005.00.0 Add-End
      initialized: false,
      authority: 0,
      authoritys: 0,
      refresh: false,
      refreshFunc: null,
      closeFunc: null,
      csvDlgOpen: false,
      editDlgOpen: false,
      disabledNameBtn: false,
      displayedMainMenuCodes: [],
      menuitemProperties: [],
      authorityListSelect: [],
      menuInfoList: [],
      mainMenuList: [],
      subMenuList: [],
      businessMenuList: [],
      dataMenu: [],
      // G006.00.0 Add-Start
      brandIDError: '',
      brandIDErrorShow: false,
      brandIDErrorStyle: 'font-size: 22px;',
      checkFlg: ''
      // G006.00.0 Add-End
      // KSD V001.000 AS
      ,businessUnitCdStr: 0,
      timeout: null
      // KSD V001.000 AE
    }
  },
  computed: {
    disabledFixedBtn () {
      // G005.00.0 Update-Start
      // return !this.initialized || this.authority === 0
      return (!this.initialized || this.authority === 0) || !this.permissions.includes('CLOUDPOS_ACCESS_UPDATE')
      // G005.00.0 Update-End
    },
    disabledClearBtn () {
      return !this.initialized || this.authority === 0
    },
    disabledCsvInputBtn () {
      //      return false
      // G005.00.0 Update-Start
      // return !(this.authority === 0)
      return (!(this.authority === 0)) || !this.permissions.includes('CLOUDPOS_ACCESS_OTHER_1')
      // G005.00.0 Update-End
    },
    disabledCsvOutputBtn () {
      //      return !this.initialized || this.authority == 0
      // G005.00.0 Update-Start
      // return !(this.authority === 0)
      return (!(this.authority === 0)) || !this.permissions.includes('CLOUDPOS_ACCESS_OTHER_2')
      // G005.00.0 Update-End
    }
  },
  components: {
    maintButton,
    csvDialog,
    editDialog,
    popup
  },
  methods: {
    /** API からデータを受け取り、画面表示に必要な項目を初期化する */
    async getMenu () {
      // properties.json から「表示対象メインメニューコード一覧」と「メニューアイテムプロパティ」を取得
      this.displayedMainMenuCodes = this.$i18n.t('prop.accessRegistoryDisplayMainMenuCd')
      this.menuitemProperties = this.$i18n.t('prop.menuitemCdProperties')
    },
    changeName () {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
    /** 表示用のデータを取得 */
    async getDataList () {
      try {
        // データ取得中ポップアップ
        // this.$refs.pop.open(4, '', this.$i18n.t('F00006.S009'), '', false, null, false, null)
        this.disabledNameBtn = true
        this.authorityListSelect = []
        const params = { }
        const response = await axios.get(
          this.$i18n.t('prop.url') + accessAuthorityTablePath,
          commonUtils.methods.addApiHeader({ params })
        )

        this.$refs.pop.closeFunction()

        if (response.data.result.code === 0) {
          // 正常
          // this.authorityListSelect = response.data.tables
          this.authorityListSelect = response.data.tables.map(function (displayName) {
            let obj = response.data.responseModel.find(e => e.displayName.default === displayName)
            if (obj) {
              return { displayName: displayName, name: obj.name }
            } else {
              return { displayName: '', name: '' }
            }
          })
          this.initialized = true
          let jsondata = require('./mockResponse.json')
          this.createMenuInfo(jsondata.data)
          return true
        } else {
          // G002.00.0 Update-Start
          if (response.data.result.code === 2) {
            this.$refs.pop.open(2, '', '対象データが存在しません。', '', false, null, false, null)
          } else {
            this.globalErrorMapping('F00006.S006', response.data.result, null)
          }
          // 失敗
          // this.globalErrorMapping('F00006.S006', response.data.result, null)
          // G002.00.0 Update-End
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return false
    },

    /** `mainMenuList`, `subMenuList`, `businessMenuList`, `authorityListSelect` の初期化 */
    createMenuInfo (response) {
      this.menuInfoList = response.menuitemInfos

      // `mainMenuList`, `subMenuList`, `businessMenuList` の初期化
      this.mainMenuList = []
      this.subMenuList = []
      this.businessMenuList = []
      for (let menuInfo of this.menuInfoList) {
        // 表示対象でない場合は無視
        if (!this.displayedMainMenuCodes.includes(menuInfo.mainmenuCd)) continue

        switch (menuInfo.menuFlg) {
          case 1: {
            // メインメニュー
            menuInfo.checked = false
            this.mainMenuList.push(menuInfo)
            break
          }
          case 2: {
            // サブメニュー
            menuInfo.checked = false
            this.subMenuList.push(menuInfo)
            break
          }
          case 3: {
            // 業務メニュー

            // 画面コード(FXXXXX)のみを切り出す
            menuInfo.menuitemCd = menuInfo.menuitemCd.slice(-6)

            menuInfo.checked = {
              start: false,
              register: false,
              delete: false,
              other1: false,
              other2: false,
              s: false,
              r: false,
              d: false,
              o1: false,
              o2: false
            }
            this.businessMenuList.push(menuInfo)
            break
          }
        }
      }

      // 権限種別の追加
      // 無選択用の権限で初期化
      // this.authorityListSelect = [{name: '', roleCd: '0', validApprovalFlg: '0', roleDisplay: '0'}]
      // for (let roleInfo of response.roleInfos) {
      // if (parseInt(roleInfo.roleDisplay) === 0) {
      // this.authorityListSelect.push(roleInfo)
      // }
      // }
    },

    /** 権限種別の変更 */
    async changeAuthority (event) {
      // G006.00.0 Add-Start
      this.initialized = true
      // G006.00.0 Add-End
      const oldAuthority = this.authority
      const newAuthority = parseInt(event.target.value)

      if (newAuthority == 0) {
        this.disabledNameBtn = true
      } else {
        this.disabledNameBtn = false
      }

      this.authority = newAuthority
      if (newAuthority !== oldAuthority) {
        // 変更しない場合は元に戻す
        await this.$refs.pop.open(1, '', '編集中のデータは破棄されます。よろしいですか？', '', true, this.setToggleButton(newAuthority), false, () => { this.authority = oldAuthority })
        this.$refs.pop.closeFunction()
      }
    },

    /** メニューアイテム名のバイト長を計算し、縦幅調整が必要かを返す */
    isLongTitle (menuitemCd) {
      let menuItem = this.menuInfoList.find(elem => elem.menuitemCd === menuitemCd)
      if (menuItem === undefined) return false

      let name = menuItem.name
      if (name === undefined) return false

      let bytes = Array.from(name).reduce((sum, c) => {
        if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
          return sum + 1
        } else {
          return sum + 2
        }
      }, 0)

      return bytes > 16
    },

    /**
     * トグルスイッチを全て設定し直す
     *
     * 実際は権限種別に合わせてセットするが、仮実装として全てOFFにする
     */
    async setToggleButton (newAuthority) {
      this.setAllToggleButton()
      this.getData(newAuthority)
    },
    async getData (newAuthority) {
      this.setAllToggleButton()
      // データ反映
      const params = { }
      const response = await axios.get(
        this.$i18n.t('prop.url') + accessAuthorityTablePath,
        commonUtils.methods.addApiHeader({ params })
      )

      if (response.data.result.code === 0) {
        // 正常
        // データ反映
        this.clearAllToggleButton()
        // KSD V001.000 DS 追加業務のアクセス権取得追加
        // for (var i = 0; i < 18; i++) {
        // KSD V001.000 DE 追加業務のアクセス権取得追加
        // KSD V001.000 AS 追加業務のアクセス権取得追加
        for (var i = 0; i < 47; i++) {
        // KSD V001.000 AE 追加業務のアクセス権取得追加
        // this.businessMenuList[i].checked = response.data.responseModel[newAuthority-1].bussinessList.businessMenuList[i]
          // this.$set(this.businessMenuList[i], 'checked', response.data.responseModel[newAuthority-1].bussinessList.businessMenuList[i]);
          this.$set(this.businessMenuList[i].checked, 's', response.data.responseModel[newAuthority - 1].bussinessList.businessMenuList[i].s)
          this.$set(this.businessMenuList[i].checked, 'r', response.data.responseModel[newAuthority - 1].bussinessList.businessMenuList[i].r)
          this.$set(this.businessMenuList[i].checked, 'd', response.data.responseModel[newAuthority - 1].bussinessList.businessMenuList[i].d)
          this.$set(this.businessMenuList[i].checked, 'o1', response.data.responseModel[newAuthority - 1].bussinessList.businessMenuList[i].o1)
          this.$set(this.businessMenuList[i].checked, 'o2', response.data.responseModel[newAuthority - 1].bussinessList.businessMenuList[i].o2)
        }
        // if(newAuthority == 4){this.businessMenuList[2].checked.s = false}

        // this.resetAllToggleButton()
      } else {
        // 失敗
        this.globalErrorMapping('F00006.S006', response.data.result, null)
      }
    },

    /**
     * トグルスイッチを全て設定し直す
     *
     * 実際は権限種別に合わせてセットするが、仮実装として全てOFFにする
     */
    setAllToggleButton () {
      this.mainMenuList.forEach((mainMenu, index) => {
        mainMenu.checked = true
        this.$set(this.mainMenuList, index, mainMenu)
      })
      this.subMenuList.forEach((subMenu, index) => {
        subMenu.checked = true
        this.$set(this.subMenuList, index, subMenu)
      })
      this.businessMenuList.forEach((businessMenu, index) => {
        this.$set(this.businessMenuList, index, businessMenu)
      })
    },

    /** トグルスイッチをを反映する */
    resetAllToggleButton () {
      this.mainMenuList.forEach((mainMenu, index) => {
        mainMenu.checked = true
        this.$set(this.mainMenuList, index, mainMenu)
      })
      this.subMenuList.forEach((subMenu, index) => {
        subMenu.checked = true
        this.$set(this.subMenuList, index, subMenu)
      })
      this.businessMenuList.forEach((businessMenu, index) => {
        this.$set(this.businessMenuList, index, businessMenu)
      })
    },

    /** トグルスイッチを全てOFFにする */
    clearAllToggleButton () {
      this.mainMenuList.forEach((mainMenu, index) => {
        mainMenu.checked = true
        this.$set(this.mainMenuList, index, mainMenu)
      })
      this.subMenuList.forEach((subMenu, index) => {
        subMenu.checked = true
        this.$set(this.subMenuList, index, subMenu)
      })
      /**
      this.businessMenuList.forEach((businessMenu, index) => {
        businessMenu.checked = {
          start: false,
          register: false,
          delete: false,
          other1: false,
          other2: false,
          s: false,
          r: false,
          d: false,
          o1: false,
          o2: false
        }
        this.$set(this.businessMenuList, index, businessMenu)
      })
      **/
    },

    /** メインメニューのトグル */
    toggleMain (mainIndex) {
      let mainMenu = this.mainMenuList[mainIndex]
      mainMenu.checked = !mainMenu.checked
      // this.$set を介さないとビューに反映されない
      this.$set(this.mainMenuList, mainIndex, mainMenu)

      // オフになったら子のサブメニュー、業務メニューを全てOFFにする
      if (!mainMenu.checked) {
        this.subMenuList.forEach((subMenu, index) => {
          if (mainMenu.mainmenuCd === subMenu.mainmenuCd) {
            subMenu.checked = false
            this.$set(this.subMenuList, index, subMenu)
          }
        })

        this.businessMenuList.forEach((businessMenu, index) => {
          if (mainMenu.mainmenuCd === businessMenu.mainmenuCd) {
            businessMenu.checked = {
              start: false,
              register: false,
              delete: false,
              other1: false,
              other2: false,
              s: false,
              r: false,
              d: false,
              o1: false,
              o2: false
            }
            this.$set(this.businessMenuList, index, businessMenu)
          }
        })
      }
    },

    /** サブメニューのトグル */
    toggleSub (subIndex) {
      let subMenu = this.subMenuList[subIndex]
      subMenu.checked = !subMenu.checked
      // this.$set を介さないとビューに反映されない
      this.$set(this.subMenuList, subIndex, subMenu)

      // オンになったら親のメインメニューをONにする
      if (subMenu.checked) {
        this.mainMenuList.forEach((mainMenu, index) => {
          if (subMenu.mainmenuCd === mainMenu.mainmenuCd) {
            mainMenu.checked = true
            this.$set(this.mainMenuList, index, mainMenu)
          }
        })
      }

      // オフになったら子の業務メニューを全てOFFにする
      if (!subMenu.checked) {
        this.businessMenuList.forEach((businessMenu, index) => {
          if (subMenu.submenuCd === businessMenu.submenuCd) {
            businessMenu.checked = {
              start: false,
              register: false,
              delete: false,
              other1: false,
              other2: false,
              s: false,
              r: false,
              d: false,
              o1: false,
              o2: false
            }
            this.$set(this.businessMenuList, index, businessMenu)
          }
        })
      }
    },

    /** ビジネスメニューのトグル */
    toggleBusiness (businessIndex, mode) {
      let businessMenu = this.businessMenuList[businessIndex]
      // G004.00.0 Update-Start
      // businessMenu.checked[mode] = !businessMenu.checked[mode]
      businessMenu.checked[mode.toLowerCase()] = !businessMenu.checked[mode.toLowerCase()]
      // G004.00.0 Update-End
      // this.$set を介さないとビューに反映されない
      this.$set(this.businessMenuList, businessIndex, businessMenu)
    },

    /** ボタンが有効か否か */
    isButtonDisabled (menuitemCd, buttonName) {
      let menuItem = this.menuitemProperties.find(elem => elem.MainMenuCd === menuitemCd)
      return menuItem === undefined ? true : menuItem[buttonName + 'Btn'] !== 1
    },
    /** 「その他」に表示する文字列を取得 */
    getOtherLabel (menuitemCd, otherId) {
      let menuItem = this.menuitemProperties.find(elem => elem.MainMenuCd === menuitemCd)
      return menuItem === undefined ? '' : menuItem['Other' + otherId + 'Label']
    },

    /** 終了ボタン */
    async closeTab () {
      if (this.authority > 0) {
        // 終了ボタン確認ダイアログ
        await this.$refs.pop.open(1, '', '終了します（編集中のデータは破棄されます）。よろしいですか？', '', true, this.runClose, false, null)
      } else {
        this.runClose()
      }
    },
    /** メニュー画面へ戻る */
    runClose () {
      this.$router.push('/TopPage')
    },
    /** 保存ボタン */
    async fixedTab () {
      // G006.00.0 Update-Start
      this.check()
      if (this.checkFlg !== true) {
      // G006.00.0 Update-End
        this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
        if (await this.executeSave() === true) {
        // if (await this.refreshFunc(0) === true) {
          // G007.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, this.runClear, false, null)
          // G007.00.0 Update-End
          // this.closeFunc()
          this.dialog = false
        // } else {
        // this.$refs.pop.closeFunction()
        // }
        }
      }
    },
    // G006.00.0 Add-Start
    pops () {
      this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '-99', false, () => {
      }, false, null)
    },
    /**
     * エラーdivを隠す
     */
    errorShowStyle () {
      this.brandIDError = ''
      this.brandIDErrorShow = false
      this.brandIDErrorStyle = 'font-size: 22px;'
    },
    check () {
      this.errorShowStyle()
      this.brandIDErrorStyle = ''
      if (this.authorityListSelect[this.authority].name === '') {
        this.pops()
        this.brandIDError = '必ず入力してください。'
        this.brandIDErrorShow = true
        this.brandIDErrorStyle = 'font-size: 22px;border-color: red;background-color: #fcd4d4 !important ;width: 354px;height: 49px;'
        this.checkFlg = true
        return
      }
      if (this.changeByte(this.authorityListSelect[this.authority].name) > 20) {
        this.pops()
        this.brandIDError = '半角20文字/全角10文字で入力してください。'
        this.brandIDErrorShow = true
        this.brandIDErrorStyle = 'font-size: 22px;border-color: red;background-color: #fcd4d4 !important ;width: 354px;height: 49px;'
        this.checkFlg = true
        return
      }
      this.errorShowStyle()
      this.checkFlg = 'true'
    },
    changeByte (str) {
      let count = 0
      if (str) {
        for (var i = 0; i < str.length; i++) {
          let c = str.charCodeAt(i)
          if ((c >= 0x0 && c <= 0x00ff) || (c >= 0xFF61 && c <= 0xFF9F) || (c >= 0xFFE8 && c <= 0xFFEE)) {
            count++
          } else {
            count += 2
          }
        }
      }
      return count
    },
    // G006.00.0 Add-End
    async executeSave () {
      // 保存
      console.log(this.authorityListSelect[this.authority].name)
      var result = false
      try {
        const params = {
          authority: this.authority,
          name: this.authorityListSelect[this.authority].name,
          authorityName: this.$refs.authority.selectedOptions[0].text,
          // KSD V001.000 M 記載順を、確認の為並び替える（コメントも追加）、又、途中行への追加はコメントで判断可能にする
          //                但し、表示行数により格納する配列位置を合わせる必要がある為、ここは表示順になる。
          // ■売上管理
          // 1行目
          cloudposReportExecute: this.businessMenuList[0].checked.s,                        // POSレポート出力：起動
          cloudposReportOther1: this.businessMenuList[0].checked.o1,                        // POSレポート出力：その他１（PDF出力）
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 2行目
          cloudposAuditExecute:  this.businessMenuList[1].checked.s,                        // 監査レポート出力：起動
          cloudposAuditOther1: this.businessMenuList[1].checked.o1,                         // 監査レポート出力：その他１（PDF出力）
          // KSD V001.000 AE 追加業務のアクセス権取得追加
          // 3行目
          cloudposJournalExecute: this.businessMenuList[2].checked.s,                       // 電子ジャーナル：起動
          cloudposJournalUpdate: this.businessMenuList[2].checked.r,                        // 電子ジャーナル：保存
          cloudposJournalOther1: this.businessMenuList[2].checked.o1,                       // 電子ジャーナル：その他１（PDF出力）

          // ■ユーザ管理
          // 4行目
          cloudposUserExecute: this.businessMenuList[3].checked.s,                          // ユーザマスタ登録：起動
          cloudposUserDelete: this.businessMenuList[3].checked.d,                           // ユーザマスタ登録：削除
          cloudposUserUpdate: this.businessMenuList[3].checked.r,                           // ユーザマスタ登録：保存
          cloudposUserOther1: this.businessMenuList[3].checked.o1,                          // ユーザマスタ登録：その他１（PWロック）
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 5行目
          cloudposEmployeeExecute: this.businessMenuList[4].checked.s,                      // 従業員コード印字：起動
          cloudposEmployeeOther1: this.businessMenuList[4].checked.o1,                      // 従業員コード印字：その他１（PDF出力）
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 6行目
          cloudposAccessExecute: this.businessMenuList[5].checked.s,                        // アクセス権限登録：起動
          cloudposAccessUpdate: this.businessMenuList[5].checked.r,                         // アクセス権限登録：保存
          cloudposAccessOther1: this.businessMenuList[5].checked.o1,                        // アクセス権限登録：その他１（CSV入力）
          cloudposAccessOther2: this.businessMenuList[5].checked.o2,                        // アクセス権限登録：その他２（CSV出力）

          // ■店舗管理
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 7行目
          cloudposGrp1Execute: this.businessMenuList[6].checked.s,                          // 店舗グループ１登録：起動
          cloudposGrp1Delete: this.businessMenuList[6].checked.d,                           // 店舗グループ１登録：削除
          cloudposGrp1Update: this.businessMenuList[6].checked.r,                           // 店舗グループ１登録：保存
          // 8行目
          cloudposGrp2Execute: this.businessMenuList[7].checked.s,                          // 店舗グループ２登録：起動
          cloudposGrp2Delete: this.businessMenuList[7].checked.d,                           // 店舗グループ２登録：削除
          cloudposGrp2Update: this.businessMenuList[7].checked.r,                           // 店舗グループ２登録：保存
          // KSD V001.000 AE 追加業務のアクセス権取得追加
          // 9行目
          cloudposStoreExecute: this.businessMenuList[8].checked.s,                         // 店舗マスタ登録：起動
          cloudposStoreDelete: this.businessMenuList[8].checked.d,                          // 店舗マスタ登録：削除
          cloudposStoreUpdate: this.businessMenuList[8].checked.r,                          // 店舗マスタ登録：保存
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 10行目
          cloudposStoreCcpyExecute: this.businessMenuList[9].checked.s,                     // 店舗マスタコピー：起動
          cloudposStoreCcpyDelete: this.businessMenuList[9].checked.d,                      // 店舗マスタコピー：削除
          cloudposStoreCcpyUpdate: this.businessMenuList[9].checked.r,                      // 店舗マスタコピー：保存
          cloudposStoreCcpyOther1: this.businessMenuList[9].checked.o1,                     // 店舗マスタコピー：その他１（ｺﾋﾟｰ実行）
          // KSD V001.000 AE 追加業務のアクセス権取得追加

          // ■端末管理
          // 11行目
          cloudposDeviceExecute: this.businessMenuList[10].checked.s,                       // 端末設定：起動
          cloudposDeviceDelete: this.businessMenuList[10].checked.d,                        // 端末設定：削除
          cloudposDeviceUpdate: this.businessMenuList[10].checked.r,                        // 端末設定：保存
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 12行目
          cloudposDenominationExecute: this.businessMenuList[11].checked.s,                 // 金種設定：起動
          cloudposDenominationUpdate: this.businessMenuList[11].checked.r,                  // 金種設定：保存
          cloudposDenominationOther1: this.businessMenuList[11].checked.o1,                 // 金種設定：その他１（ｺﾋﾟｰ実行）
          // KSD V001.000 AE 追加業務のアクセス権取得追加
          // 13行目
          cloudposStatusExecute: this.businessMenuList[12].checked.s,                       // 状態管理：起動

          // ■商品構成管理
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 14行目
          cloudposProductDivisionsExecute: this.businessMenuList[13].checked.s,             // 商品分類階層設定：起動
          cloudposProductDivisionsUpdate: this.businessMenuList[13].checked.r,              // 商品分類階層設定：保存
          // 15行目
          cloudposCatalogExecute: this.businessMenuList[14].checked.s,                      // 商品構成マスタ登録：起動
          cloudposCatalogDelete: this.businessMenuList[14].checked.d,                       // 商品構成マスタ登録：削除
          cloudposCatalogUpdate: this.businessMenuList[14].checked.r,                       // 商品構成マスタ登録：保存
          cloudposCatalogOther1: this.businessMenuList[14].checked.o1,                      // 商品構成マスタ登録：その他１（CSV入力）
          cloudposCatalogOther2: this.businessMenuList[14].checked.o2,                      // 商品構成マスタ登録：その他２（CSV出力）
          // KSD V001.000 AE 追加業務のアクセス権取得追加
          // 16行目
          cloudposItemExecute: this.businessMenuList[15].checked.s,                          // 商品マスタ登録：起動
          cloudposItemDelete: this.businessMenuList[15].checked.d,                           // 商品マスタ登録：削除
          cloudposItemUpdate: this.businessMenuList[15].checked.r,                           // 商品マスタ登録：保存
          cloudposItemOther1: this.businessMenuList[15].checked.o1,                          // 商品マスタ登録：その他１（CSV入力）
          cloudposItemOther2: this.businessMenuList[15].checked.o2,                          // 商品マスタ登録：その他２（CSV出力）
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 17行目
          cloudposRestaurantScpExecute: this.businessMenuList[16].checked.s,                 // 飲食オーダーガイダンス設定：起動
          cloudposRestaurantScpDelete: this.businessMenuList[16].checked.d,                  // 飲食オーダーガイダンス設定：削除
          cloudposRestaurantScpUpdate: this.businessMenuList[16].checked.r,                  // 飲食オーダーガイダンス設定：保存
          // KSD V001.000 AE 追加業務のアクセス権取得追加
          // 18行目
          cloudposPresetExecute: this.businessMenuList[17].checked.s,                        // プリセットマスタ：起動
          cloudposPresetDelete: this.businessMenuList[17].checked.d,                         // プリセットマスタ：削除
          cloudposPresetUpdate: this.businessMenuList[17].checked.r,                         // プリセットマスタ：保存
          cloudposPresetOther1: this.businessMenuList[17].checked.o1,                        // プリセットマスタ：その他１（企画ｺﾋﾟｰ）
          cloudposPresetOther2: this.businessMenuList[17].checked.o2,                        // プリセットマスタ：その他２（運用確認）

          // ■売価変更
          // 19行目
          cloudposPriceExecute: this.businessMenuList[18].checked.s,                         // 売価変更：起動
          cloudposPriceDelete: this.businessMenuList[18].checked.d,                          // 売価変更：削除
          cloudposPriceUpdate: this.businessMenuList[18].checked.r,                          // 売価変更：保存
          cloudposPriceOther1: this.businessMenuList[18].checked.o1,                         // 売価変更：その他１（出力）

          // ■クラウドPOS運用設定
          // 20行目
          cloudposBarcodeExecute: this.businessMenuList[19].checked.s,                      // バーコードフラグ設定：起動
          cloudposBarcodeDelete: this.businessMenuList[19].checked.d,                       // バーコードフラグ設定：削除
          cloudposBarcodeUpdate: this.businessMenuList[19].checked.r,                       // バーコードフラグ設定：保存
          // 21行目
          cloudposTransactionExecute: this.businessMenuList[20].checked.s,                  // 取引別名称設定：起動
          cloudposTransactionDelete: this.businessMenuList[20].checked.d,                   // 取引別名称設定：削除
          cloudposTransactionUpdate: this.businessMenuList[20].checked.r,                   // 取引別名称設定：保存
          // 22行目
          cloudposRevenueStampExecute: this.businessMenuList[21].checked.s,                 // 収入印紙一括納付設定：起動
          cloudposRevenueStampDelete: this.businessMenuList[21].checked.d,                  // 収入印紙一括納付設定：削除
          cloudposRevenueStampUpdate: this.businessMenuList[21].checked.r,                  // 収入印紙一括納付設定：保存
          // 23行目
          cloudposOperationExecute: this.businessMenuList[22].checked.s,                    // 運用設定：起動
          cloudposOperationDelete: this.businessMenuList[22].checked.d,                     // 運用設定：削除
          cloudposOperationUpdate: this.businessMenuList[22].checked.r,                     // 運用設定：保存
          // 24行目
          cloudposStoreOperationExecute: this.businessMenuList[23].checked.s,               // 店別運用設定：起動
          cloudposStoreOperationDelete: this.businessMenuList[23].checked.d,                // 店別運用設定：削除
          cloudposStoreOperationUpdate: this.businessMenuList[23].checked.r,                // 店別運用設定：保存
          // 25行目
          cloudposReceiptExecute: this.businessMenuList[24].checked.s,                      // レシート設定：起動
          cloudposReceiptDelete: this.businessMenuList[24].checked.d,                       // レシート設定：削除
          cloudposReceiptUpdate: this.businessMenuList[24].checked.r,                       // レシート設定：保存
          cloudposReceiptOther1: this.businessMenuList[24].checked.o1,                      // レシート設定：その他１（企画ｺﾋﾟｰ）
          cloudposReceiptOther2: this.businessMenuList[24].checked.o2,                      // レシート設定：その他２（企画確認）
          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // 26行目
          cloudposTaxExecute: this.businessMenuList[25].checked.s,                          // 税率設定：起動
          cloudposTaxDelete: this.businessMenuList[25].checked.d,                           // 税率設定：削除
          cloudposTaxUpdate: this.businessMenuList[25].checked.r,                           // 税率設定：保存
          // 27行目
          cloudposTimeExecute: this.businessMenuList[26].checked.s,                         // 時間帯設定：起動
          cloudposTimeDelete: this.businessMenuList[26].checked.d,                          // 時間帯設定：削除
          cloudposTimeUpdate: this.businessMenuList[26].checked.r,                          // 時間帯設定：保存
          // 28行目
          cloudposRestaurantConnectnameExecute: this.businessMenuList[27].checked.s,        // OES連携名称設定：起動
          cloudposRestaurantConnectnameUpdate: this.businessMenuList[27].checked.r,         // OES連携名称設定：保存
          // KSD V001.000 AE 追加業務のアクセス権取得追加

          // ■クラウドPOS店舗運用設定
          // 29行目
          cloudposOperationBtnExecute: this.businessMenuList[28].checked.s,                 // 操作ボタン設定：起動
          cloudposOperationBtnUpdate: this.businessMenuList[28].checked.r,                  // 操作ボタン設定：保存
          // 30行目
          cloudposTighteningBtnExecute: this.businessMenuList[29].checked.s,                // 締めボタン設定：起動
          cloudposTighteningBtnDelete: this.businessMenuList[29].checked.d,                 // 締めボタン設定：削除
          cloudposTighteningBtnUpdate: this.businessMenuList[29].checked.r,                 // 締めボタン設定：保存

          // KSD V001.000 AS 追加業務のアクセス権取得追加
          // ■全店共通設定
          // 31行目
          cloudposEquipmentExecute: this.businessMenuList[30].checked.s,                    // 機材マスタ設定：起動
          cloudposEquipmentDelete: this.businessMenuList[30].checked.d,                     // 機材マスタ設定：削除
          cloudposEquipmentUpdate: this.businessMenuList[30].checked.r,                     // 機材マスタ設定：保存
          // 32行目
          cloudposModelExecute: this.businessMenuList[31].checked.s,                        // 機種設備マスタ設定：起動
          cloudposModelDelete: this.businessMenuList[31].checked.d,                         // 機種設備マスタ設定：削除
          cloudposModelUpdate: this.businessMenuList[31].checked.r,                         // 機種設備マスタ設定：保存
          // 33行目
          cloudposAgeDivisionExecute: this.businessMenuList[32].checked.s,                  // 年齢区分マスタ設定：起動
          cloudposAgeDivisionDelete: this.businessMenuList[32].checked.d,                   // 年齢区分マスタ設定：削除
          cloudposAgeDivisionUpdate: this.businessMenuList[32].checked.r,                   // 年齢区分マスタ設定：保存
          // 34行目
          cloudposMemberRankExecute: this.businessMenuList[33].checked.s,                   // 会員ランクマスタ設定：起動
          cloudposMemberRankDelete: this.businessMenuList[33].checked.d,                    // 会員ランクマスタ設定：削除
          cloudposMemberRankUpdate: this.businessMenuList[33].checked.r,                    // 会員ランクマスタ設定：保存

          // ■店舗固有設備設定
          // 35行目
          cloudposRoomExecute: this.businessMenuList[34].checked.s,                         // 部屋情報マスタ設定：起動
          cloudposRoomDelete: this.businessMenuList[34].checked.d,                          // 部屋情報マスタ設定：削除
          cloudposRoomUpdate: this.businessMenuList[34].checked.r,                          // 部屋情報マスタ設定：保存
          // 36行目
          cloudposRoomRelationExecute: this.businessMenuList[35].checked.s,                 // 部屋関連情報マスタ設定：起動
          cloudposRoomRelationDelete: this.businessMenuList[35].checked.d,                  // 部屋関連情報マスタ設定：削除
          cloudposRoomRelationUpdate: this.businessMenuList[35].checked.r,                  // 部屋関連情報マスタ設定：保存
          // 37行目
          cloudposRoomSubExecute: this.businessMenuList[36].checked.s,                      // 部屋情報サブ設定：起動
          cloudposRoomSubUpdate: this.businessMenuList[36].checked.r,                       // 部屋情報サブ設定：保存
          cloudposRoomSubOther1: this.businessMenuList[36].checked.o1,                      // 部屋情報サブ設定：その他１（ｺﾋﾟｰ）
          // 38行目
          cloudposCodepayExecute: this.businessMenuList[37].checked.s,                      // コード決済通信マスタ設定：起動
          cloudposCodepayUpdate: this.businessMenuList[37].checked.r,                       // コード決済通信マスタ設定：保存
          // 39行目
          cloudposTariffExecute: this.businessMenuList[38].checked.s,                       // 料金表表示マスタ設定：起動
          cloudposTariffDelete: this.businessMenuList[38].checked.d,                        // 料金表表示マスタ設定：削除
          cloudposTariffUpdate: this.businessMenuList[38].checked.r,                        // 料金表表示マスタ設定：保存

          // ■店舗固有POS設定
          // 40行目
          cloudposTicketExecute: this.businessMenuList[39].checked.s,                       // 券種マスタ設定：起動
          cloudposTicketDelete: this.businessMenuList[39].checked.d,                        // 券種マスタ設定：削除
          cloudposTicketUpdate: this.businessMenuList[39].checked.r,                        // 券種マスタ設定：保存
          // 41行目
          cloudposComplianceExecute: this.businessMenuList[40].checked.s,                   // コンプライアンス情報マスタ設定：起動
          cloudposComplianceUpdate: this.businessMenuList[40].checked.r,                    // コンプライアンス情報マスタ設定：保存
          // 42行目
          cloudposSelfposExecute: this.businessMenuList[41].checked.s,                      // セルフPOSマスタ設定：起動
          cloudposSelfposUpdate: this.businessMenuList[41].checked.r,                       // セルフPOSマスタ設定：保存

          // ■店舗固有料金設定
          // 43行目
          cloudposWeekdayDivisionExecute: this.businessMenuList[42].checked.s,              // 曜日区分マスタ設定：起動
          cloudposWeekdayDivisionDelete: this.businessMenuList[42].checked.d,               // 曜日区分マスタ設定：削除
          cloudposWeekdayDivisionUpdate: this.businessMenuList[42].checked.r,               // 曜日区分マスタ設定：保存
          // 44行目
          cloudposCalenderExecute: this.businessMenuList[43].checked.s,                     // カレンダーマスタ設定：起動
          cloudposCalenderUpdate: this.businessMenuList[43].checked.r,                      // カレンダーマスタ設定：保存
          // 45行目
          cloudposCourseRateExecute: this.businessMenuList[44].checked.s,                   // コース料金設定：起動
          cloudposCourseRateUpdate: this.businessMenuList[44].checked.r,                    // コース料金設定：保存
          cloudposCourseRateOther1: this.businessMenuList[44].checked.o1,                   // コース料金設定：その他１（ｺﾋﾟｰ）
          // 46行目
          cloudposDrinkCourseExecute: this.businessMenuList[45].checked.s,                  // オプションマスタ設定：起動
          cloudposDrinkCourseDelete: this.businessMenuList[45].checked.d,                   // オプションマスタ設定：削除
          cloudposDrinkCourseUpdate: this.businessMenuList[45].checked.r,                   // オプションマスタ設定：保存
          // 47行目
          cloudposRoomCourseExecute: this.businessMenuList[46].checked.s,                   // コースマスタ設定：起動
          cloudposRoomCourseDelete: this.businessMenuList[46].checked.d,                    // コースマスタ設定：削除
          cloudposRoomCourseUpdate: this.businessMenuList[46].checked.r                     // コースマスタ設定：保存
          // KSD V001.000 AE 追加業務のアクセス権取得追加
        }
        // 保存
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        //        this.$refs.pop.open(3, '', this.$i18n.t('F00009.E008'), '', false, null, false, null)
        //        this.$refs.pop.open(3, '', 'メニューアイテムの登録に失敗しました。もう一度同じ操作を行ってください。', '', false, null, false, null)
        this.$refs.pop.open(3, '', 'アクセス権限登録に失敗しました。もう一度保存ボタンをクリックしてください。', '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    /** 編集破棄ボタン */
    async clearTab () {
      await this.$refs.pop.open(1, '', '編集中のデータは破棄されます。よろしいですか？', '', true, this.runClear, false, null)
    },
    /** 権限種別を空にし、トグルスイッチをリセットする */
    // G007.00.0 Update-Start
    runClear () {
      this.authority = 0
      this.authoritys = 0
      this.setAllToggleButton()
    },
    // G007.00.0 Update-End
    /** CSV入力ボタン */
    async csvInput () {
      this.importCsv()
      // this.$refs.pop.open(1, '', 'CSVファイルを入力します。よろしいですか？', '', true, this.importCsv, false, null)
    },
    /** CSV出力ボタン */
    async csvOutput () {
      // KSD V001.000 DS
      // this.$refs.pop.open(1, '', 'CSVファイルを出力します。よろしいですか？', '', true, this.runCSV, false, null)
      // KSD V001.000 DE
      // KSD V001.000 AS
      const params = {
        targetCollection: 'PERMISSIONS_ROLES',
        companyCode: this.businessUnitCdStr
      }
      this.$refs.pop.open(1, '', this.$i18n.t('F32242.W001') , '', true, () => this.exportCSV(params, this.$refs, this.$i18n, this.refresh, csvExportTimerData.permissionsRoles), false, null)
      // KSD V001.000 AE
    },
    /** 名称変更ボタン */
    async nameInput () {
      // this.$refs.pop.open(1, '', '権限名称を入力します。よろしいですか？', '', true, this.runChangeName, false, null)
      this.runChangeName()
    },
    // KSD V001.000 DS
    // async runCSV () {
    //   const params = { }
    //   const response = await axios.get(
    //     this.$i18n.t('prop.url') + accessAuthorityTablePath,
    //     commonUtils.methods.addApiHeader({ params })
    //   )

    //   this.$refs.pop.closeFunction()

    //   if (response.data.result.code === 0) {
    //     // 正常
    //     var csv = '"no","displayName","permissions"\n'
    //     // G001.00.0 Update-Start
    //     // for(var j=0; j<9; j++){
    //     for (var j = 0; j < response.data.responseModel.length; j++) {
    //     // G001.00.0 Update-End
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[0].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_REPORT_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[0].o1 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_REPORT_OTHER_1' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[1].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_JOURNAL_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[1].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_JOURNAL_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[1].o1 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_JOURNAL_OTHER_1' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[2].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_USER_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[2].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_USER_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[2].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_USER_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[2].o1 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_USER_OTHER_1' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[3].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ACCESS_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[3].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ACCESS_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[3].o1 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ACCESS_OTHER_1' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[3].o2 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ACCESS_OTHER_2' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[4].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_STORE_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[4].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_STORE_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[4].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_STORE_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[5].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_DEVICE_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[5].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_DEVICE_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[5].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_DEVICE_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[6].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_STATUS_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[7].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ITEM_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[7].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ITEM_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[7].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ITEM_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[7].o1 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ITEM_OTHER_1' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[7].o2 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_ITEM_OTHER_2' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[8].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRESET_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[8].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRESET_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[8].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRESET_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[8].o1 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRESET_OTHER_1' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[8].o2 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRESET_OTHER_2' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[9].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRICE_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[9].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRICE_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[9].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRICE_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[9].o1 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_PRICE_OTHER_1' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[10].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_BARCODE_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[10].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_BARCODE_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[10].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_BARCODE_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[11].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_TRANSACTION_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[11].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_TRANSACTION_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[11].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_TRANSACTION_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[12].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_REVENUE_STAMP_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[12].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_REVENUE_STAMP_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[12].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_REVENUE_STAMP_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[13].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_OPERATION_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[13].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_OPERATION_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[13].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_OPERATION_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[14].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_OPERATION_BTN_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[14].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_OPERATION_BTN_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[15].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_TIGHTENING_BTN_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[15].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_TIGHTENING_BTN_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[15].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_TIGHTENING_BTN_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[16].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_STORE_OPERATION_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[16].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_STORE_OPERATION_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[16].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_STORE_OPERATION_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[17].s == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_RECEIPT_EXECUTE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[17].d == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_RECEIPT_DELETE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[17].r == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_RECEIPT_UPDATE' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[17].o1 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_RECEIPT_OTHER_1' + '\n' }
    //       if (response.data.responseModel[j].bussinessList.businessMenuList[17].o2 == true) { csv += (j + 1) + ',' + response.data.responseModel[j].name + ' ,' + 'CLOUDPOS_RECEIPT_OTHER_2' + '\n' }
    //     }
    //     // var blob =new Blob([csv],{type:"text/csv"}); //配列に上記の文字列(str)を設定
    //     // var link =document.createElement('a');
    //     // link.href = URL.createObjectURL(blob);
    //     // link.download ="アクセス権限登録.csv";
    //     // link.click();
    //     let dt = new Date()
    //     const filename = dt.getFullYear() + ('00' + (dt.getMonth() + 1)).slice(-2) + ('00' + (dt.getDate())).slice(-2) +
    //       ('00' + (dt.getHours())).slice(-2) + ('00' + (dt.getMinutes())).slice(-2) + ('00' + (dt.getSeconds())).slice(-2) + '_アクセス権限登録'

    //     let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    //     const opts = {
    //       suggestedName: filename,
    //       types: [
    //         {
    //           description: 'CSV file',
    //           accept: { 'text/csv': ['.csv'] }
    //         }
    //       ]
    //     }
    //     let err = false
    //     try {
    //       const fileHandle = await window.showSaveFilePicker(opts)
    //       const writable = await fileHandle.createWritable()
    //       await writable.write(blob)
    //       await writable.close()
    //     } catch (e) {
    //       // console.log((e.message !== 'The user aborted a request'), e.message)
    //       err = true
    //       if (!e.message.match(/aborted/)) {
    //         // G003.00.0 Update-Start
    //         // this.$refs.pop.open(3, e.message, 'ファイルのエクスポートに失敗しました。ファイルが保存できる状態か確認してください。', e.code, false, null, false, null)
    //         this.$refs.pop.open(3, '', 'ファイルのエクスポートに失敗しました。ファイルが保存できる状態か確認してください。', e.code, false, null, false, null)
    //         // G003.00.0 Update-End
    //       }
    //     }
    //     if (!err) {
    //       this.$refs.pop.open(1, '', 'CSVファイルをエクスポートしました。', 200, false, null, false, null)
    //     }
    //   } else {
    //     // 失敗
    //     this.globalErrorMapping('F00006.S006', response.data.result, null)
    //   }
    // },
    // KSD V001.000 DE
    /** CSVインポート */
    async importCsv () {
      // KSD V001.000 DS
      // this.$refs.csvDialog.open(this.authorityListSelect, null, this.refresh, this.csvDlgClose)
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$refs.csvDialog.open(this.refresh, this.csvDlgClose, this.businessUnitCdStr, 0, csvExportTimerData.permissionsRoles)
      // KSD V001.000 AE
      setTimeout(() => {
        this.$refs.csvDialog.openEnd()
      }, 50)
      this.csvDlgOpen = true
    },
    async csvDlgClose () {
      this.csvDlgOpen = false
      this.clientIdData = ''
    },
    /** 権限名称変更 */
    async runChangeName () {
      this.$refs.editDialog.open(this.authority, this.$refs.authority.selectedOptions[0].text, this.refresh, this.editDlgClose)
      setTimeout(() => {
        this.$refs.editDialog.openEnd()
      }, 50)
      this.editDlgOpen = true
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.clientIdData = ''
    }
    // KSD V001.000 AS
    , globalErrorMapping2 (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        const globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    }
    // KSD V001.000 AE
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
    // KSD V001.000 AS
    clearInterval(this.timeout)
    // KSD V001.000 AE
  },
  // G001.00.0 Add-Start
  mounted () {
    // KSD V001.000 AS
    let belongStoreCdStr = ''
    let vue = this
    // KSD V001.000 AE
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // KSD V001.000 AS
    vue.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      if (businessUnitCdStr) {
        vue.businessUnitCdStr = businessUnitCdStr
      }
    })
    // KSD V001.000 AE
  },
  // G001.00.0 Add-End
  async created () {
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    this.$root.winId = 'F32242'
    window.addEventListener('beforeunload', this.confirmUnload)
    await this.getMenu()
    await this.getDataList()
    await this.$nextTick()
  }
}
