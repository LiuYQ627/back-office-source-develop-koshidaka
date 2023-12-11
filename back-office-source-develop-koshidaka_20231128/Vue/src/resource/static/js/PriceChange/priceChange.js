import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/PriceChange/productSearchDialog'
import selectDialog from '@/resource/templates/PriceChange/priceChangeSelectDialog'

import popup from '@/resource/templates/CommonDesign/Popup'

import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'

import flatPickr from 'vue-flatpickr-component'
import '@/resource/static/css/CommonLibraryTool/flatPickr.css'
import {Japanese} from 'flatpickr/dist/l10n/ja.js'

const searchPath = 'PriceChange/PriceChangeSearch'
const queryPath = 'PriceChange/PriceChangeQuery'
const selectPath = 'PriceChange/PriceChangeSelect'
const priceChangeNameSetPath = 'PriceChange/PriceChangeNameSet'
const priceChangeDateSetPath = 'PriceChange/PriceChangeDateSet'
const priceChangeNoteSetPath = 'PriceChange/PriceChangeNoteSet'
const productSearchPath = 'PriceChange/ProductSearch'
const productPriceChangePath = 'PriceChange/ProductPriceChange'
const productDeletePath = 'PriceChange/ProductDelete'
const priceChangeSavePath = 'PriceChange/PriceChangeSave'
const priceChangeClearPath = 'PriceChange/PriceChangeClear'
const priceChangeDeletePath = 'PriceChange/PriceChangeDelete'
const priceChangeExitPath = 'PriceChange/PriceChangeExit'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230110 bai.ry(Neusoft)  G001.00.0  issue課題#1159を対応します.
 * 20230111 litie(Neusoft)   G002.00.0  issue課題#1058を対応します.
 * 20230423 dingxin(Neusoft) G003.00.0  issue課題#1662を対応します.
 * 20230615  wangchunmei(Neusoft)  G004.00.0  issue課題#1639を対応します.
 */
export default {
  // name: 'priceChange',
  data () {
    return {
      // G003.00.0 Add-Start
      permissions: [],
      // G003.00.0 Add-End
      dispDataList: [], // 商品データ
      changePlanName: '', // 実行計画名
      changePlanVersion: 0, // 実行計画バージョン
      priceLists: '', // プライスリスト情報
      // findDataList: [],
      // tabletDataList: [],
      // resultCount: 0,
      headquartersAuthority: 0,
      targetStoreCd: 0,
      targetStoreText: '',

      // productIdData: '',
      // searchData: '',
      // lastSearchData: '',
      editDlgOpen: false,

      operationLock: true,
      priceChangeNameEnterLock: false,
      priceChangeDateEnterLock: false,
      priceChangeNewPriceEnterLock: false,
      // priceChangeLock: true,

      priceChangeNo: '', // 売価変更No
      priceChangeName: '', // 売価変更名称
      priceChangeNote: '', // 売価変更備考
      entryPriceChangeName: '', // 登録した売価変更名称
      entryStartDate: '', // 登録した売価変更開始日
      entryEndDate: '', // 登録した売価変更終了日
      entryPriceChangeNote: '', // 登録した売価変更備考
      changeFlg: false, // 編集可否情報

      masters: {},
      initialized: false,

      disabledStoreSelectBtn: true, // 店舗選択ボタン
      disabledPriceChangeText: true, // 売価変更No入力
      disabledPriceChangeBtn: true, // 売価変更Noボタン
      disabledPriceChangeNameText: true, // 売価変更名称入力
      disabledPriceChangeDate: true, // 売価変更期間
      disabledPriceChangeNodeText: true, // 備考入力
      disabledproductSearchBtn: true, // 商品検索ボタン

      disabledFixedBtn: true, // 保存ボタン
      disabledDelBtn: true, // 削除ボタン
      disabledClearBtn: true, // 中止ボタン

      // 抽出タイプ(0:請求日 / 1:日付指定)
      extractionType: 0,
      // CSV出力ボタン制御(True:非活性 / False:活性)
      disableCsvOutputBtn: false,
      // 期間入力制御(True:非活性 / False:活性)
      isBillingDay: false,
      // CSVデータ
      csv: null,
      // 開始日付文字列
      startDateStr: '',
      // 終了日付文字列
      endDateStr: '',
      // 開始日付日付型
      startDate: null,
      // 終了日付日付型
      endDate: null,
      // カレンダー表示日付
      calenderDate: null,
      // 開始日付フォーマットチェックフラグ(True:実施済み / False:未実施)
      startDateCheckFlg: false,
      // 終了日付フォーマットチェックフラグ(True:実施済み / False:未実施)
      endDateCheckFlg: false,
      // 開始日付フォーマットチェック結果(True:OK / False:NG)
      startDateCheckResult: false,
      // 終了日付フォーマットチェック結果(True:OK / False:NG)
      endDateCheckResult: false,
      // 開始日付カレンダーアイコンパス
      startCalenderImgScr: require('@/assets/ico_calendar_n.png'),
      // 終了日付カレンダーアイコンパス
      endCalenderImgScr: require('@/assets/ico_calendar_n.png'),
      // カレンダー表示中のtabキー押下判定フラグ(True:押下あり / False:押下なし)
      isTabKey: false,
      // カレンダーの設定情報
      config: {
        locale: Japanese,
        allowInput: true,
        monthSelectorType: 'static',
        dateFormat: 'Y/m/d',
        onClose: function (selectedDates, dateStr) {
        },
        onOpen: function (selectedDates, dateStr) {
        }
      }
    }
  },
  components: {
    maintButton,
    editDialog,
    selectDialog,
    popup,
    dialogStoreSelect,
    flatPickr
  },
  methods: {
    async initialize () {
      if (this.initialized) return
      await this.disabledMode(0)// 全て抑止
      this.initialized = true
      if (this.headquartersAuthority === 1) {
        if (await this.getStoreMasters() === false) {
          return
        }
        await this.setStore(this.targetStoreCd)
      }
      this.disabledMode(1)// 初期状態
    },
    // 店舗情報取得
    async getStoreMasters () {
      let getMastersFunc = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMastersFunc
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },

    // 売価変更No入力チェック
    priceChangeNoInput () {
      this.priceChangeNo = this.priceChangeNo.replace(/[^0-9]/gi, '')
    },

    // 売価変更No入力[Enter]
    priceChangeNoEnter () {
      // G001.00.0 Add-Start
      // if (this.priceChangeNo.length != 10) {
      //   // 10文字以外は反応させない
      //   return;
      // }
      // G001.00.0 Add-End
      // 売価変更No取得処理
      // ★PriceChangeSearchを呼び出し
      const params = {
        nodeId: this.targetStoreCd,
        priceChangeNo: this.priceChangeNo
      }
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 1) {
            // 警告メッセージあり
            this.searchErrorMapping(response.data.result)
          } else if (response.data.result.code === 0) {
            // 0:正常
          } else {
            // 異常なので処理を抜ける
            this.searchErrorMapping(response.data.result)
            return
          }

          // 取得データをもとに設定
          this.setPricelistsData(response)
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
    },

    async setPricelistsData (response) {
      // 各種項目設定
      this.changePlanName = response.data.responseModel.changePlanName
      this.changePlanVersion = response.data.responseModel.changePlanVersion
      this.priceLists = response.data.responseModel.priceLists
      // 商品設定
      // response.data.responseModel.productLists// 商品
      this.dispDataList = []
      // 商品があれば商品も設定
      if (response.data.responseModel.productLists != null) {
        for (let i = 0; i < response.data.responseModel.productLists.length; i++) {
          var productname = ''
          var oldprice = ''
          var newprice = ''
          if (response.data.responseModel.productLists[i].catalogs == null ||
            response.data.responseModel.productLists[i].catalogs.displayName == null) {

            // 商品名無し
          } else {
            productname = response.data.responseModel.productLists[i].catalogs.displayName.kanji
          }

          if (response.data.responseModel.productLists[i].pricelistsbase == null) {
            // 旧売価なし
          } else {
            oldprice = response.data.responseModel.productLists[i].pricelistsbase.price
          }

          if (response.data.responseModel.productLists[i].pricelists == null) {
            // 新売価なし
          } else {
            newprice = response.data.responseModel.productLists[i].pricelists.price
          }

          let item = {
            jancode: response.data.responseModel.productLists[i].pricelists.skuId,
            productname: productname,
            oldprice: oldprice,
            newprice: newprice,
            entrynewprice: '',
            productModel: response.data.responseModel.productLists[i]// 商品
          }
          this.dispDataList.push(item)
        }
        // 追加したJANコードをソートしておく
        this.dispDataList.sort((a, b) => (a.jancode < b.jancode) ? -1 : 1)
      }
      // this.priceChangeNo = this.priceLists.name.slice(-10)
      this.priceChangeName = this.priceLists.displayName
      if (this.priceLists.startDate == null) {
        this.startDateStr = ''
      } else {
        this.startDateStr = this.priceLists.startDate.substr(0, 10).replace(/-/g, '/')
      }
      if (this.priceLists.endDate == null) {
        this.endDateStr = ''
      } else {
        this.endDateStr = this.priceLists.endDate.substr(0, 10).replace(/-/g, '/')
      }

      this.priceChangeNote = ''
      this.entryPriceChangeName = this.priceChangeName
      this.entryStartDate = this.startDateStr
      this.entryEndDate = this.endDateStr
      this.entryPriceChangeNote = this.priceChangeNote
      this.changeFlg = true// 取り込んで保存もありえる

      this.disabledMode(2)// 売価変更編集中
    },

    // 売価変更Noボタン押下
    async priceChangeSelect () {
      // 売価変更No一覧取得処理
      // ★PriceChangeQueryを呼び出し
      const params = {
        nodeId: this.targetStoreCd
      }
      axios.get(this.$i18n.t('prop.url') + queryPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            // 売価変更リストダイアログ表示
            this.$refs.selectDialog.open(this.targetStoreCd, response.data.responseModel, this.priceChangeSelectOk, this.selectDialogClose)
          } else if (response.data.result.code === 2) {
            // 2:商品なし
            // 売価変更リストダイアログ表示(空欄表示)
            response.data.responseModel = []
            this.$refs.selectDialog.open(this.targetStoreCd, response.data.responseModel, this.priceChangeSelectOk, this.selectDialogClose)
          } else {
            // 異常なので処理を抜ける
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
    },
    // 売価変更リストダイアログ＞確定ボタン
    async priceChangeSelectOk (selectedPriceChangeNo) {
      try {
        // ★PriceChangeSelectを呼び出し
        const params = {
          nodeId: this.targetStoreCd,
          priceChangeNo: selectedPriceChangeNo
        }
        let response = await axios.get(this.$i18n.t('prop.url') + selectPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        if (response.data.result.code === 1) {
          // 警告メッセージあり
          this.searchErrorMapping(response.data.result)
        } else if (response.data.result.code === 0) {
          // 0:正常
        } else {
          // 異常なので処理を抜ける
          this.searchErrorMapping(response.data.result)
          return false
        }

        // 売価変更Noを設定
        this.priceChangeNo = selectedPriceChangeNo

        // 取得データをもとに設定
        this.setPricelistsData(response)
        return true
      } catch (error) {
        this.priceChangeNameEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
        return false
      }
    },
    // 売価変更リストダイアログクローズ
    async selectDialogClose () {
      return true
    },

    // 売価変更名称[Enter]
    async priceChangeNameEnter () {
      try {
        if (this.priceChangeName != this.entryPriceChangeName) {
          // 通信中は処理させない
          if (this.priceChangeNameEnterLock) {
            return
          }
          this.priceChangeNameEnterLock = true
          // ★PriceChangeSelectを呼び出し
          var params = {
            nodeId: this.targetStoreCd, // 店舗(21)
            priceChangeNo: this.priceChangeNo, // 売価変更No(10)
            changePlanName: this.changePlanName, // 実行計画名
            priceChangeName: this.priceChangeName// 売価変更名称
          }
          let response = await axios.put(this.$i18n.t('prop.url') + priceChangeNameSetPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
          this.priceChangeNameEnterLock = false
          if (response.data.result.code === 0) {
            this.entryPriceChangeName = this.priceChangeName// 登録した名称を保持
            this.changeFlg = true
            this.disabledMode(2)// 売価変更編集中
          } else if (response.data.result.code === -99) {
            this.searchErrorMapping(response.data.result)
            // バリデーションエラーなので戻しておく
            this.entryPriceChangeName = this.priceChangeName// 登録した名称を保持
          } else {
            this.searchErrorMapping(response.data.result)
          }
        }
      } catch (error) {
        this.priceChangeNameEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    // 売価変更期間[Enter]
    async priceChangeDateEnter () {
      try {
        if (this.startDateStr != this.entryStartDate || this.endDateStr != this.entryEndDate) {
          // 通信中は処理させない
          if (this.priceChangeDateEnterLock) {
            return
          }
          this.priceChangeDateEnterLock = true
          // ★PriceChangeDateSetを呼び出し
          var params = {
            nodeId: this.targetStoreCd, // 店舗(21)
            priceChangeNo: this.priceChangeNo, // 売価変更No(10)
            changePlanName: this.changePlanName, // 実行計画名
            startDate: this.startDateStr, // 売価変更開始日
            endDate: this.endDateStr// 売価変更終了日
          }
          let response = await axios.put(this.$i18n.t('prop.url') + priceChangeDateSetPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
          this.priceChangeDateEnterLock = false
          if (response.data.result.code === 0) {
            this.entryStartDate = this.startDateStr
            this.entryEndDate = this.endDateStr
            this.changeFlg = true
            this.disabledMode(2)// 売価変更編集中
          } else {
            this.searchErrorMapping(response.data.result)
          }
        }
      } catch (error) {
        this.priceChangeDateEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    // 備考[Enter]
    async priceChangeNoteEnter () {
      try {
      // 対象外
        //        if (this.priceChangeNote != this.entryPriceChangeNote) {
        //          // ★PriceChangeSelectを呼び出し
        //          this.entryPriceChangeNote = this.priceChangeNote// 登録した備考を保持
        //          this.changeFlg = true
        //          this.disabledMode(2)// 売価変更編集中
        //        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    // 商品検索入力ボタン押下
    async productSearch () {
      // 商品検索ダイアログ表示
      this.$refs.editDialog.open(this.targetStoreCd, '', null, this.productSearchOk, this.editDlgClose)
    },
    // 商品検索ダイアログ＞ＯＫボタン
    async productSearchOk (jancode) {
      try {
        // 同一商品登録チェック
        if (this.dispDataList.findIndex((item) => item.jancode == jancode) >= 0) {
          this.$refs.pop.open(3, '', this.$i18n.t('F00109.W001'), '', false, null, false, null)
          return false
        }

        // ★ProductSearchを呼び出し
        var params = {
          nodeId: this.targetStoreCd, // 店舗(21)
          priceChangeNo: this.priceChangeNo, // 売価変更No(10)
          changePlanName: this.changePlanName, // 実行計画名
          priceChangeName: this.priceChangeName, // 売価変更名称
          skuId: jancode,
          startDate: this.startDateStr, // 売価変更開始日
          endDate: this.endDateStr// 売価変更終了日
        }
        let response = await axios.get(this.$i18n.t('prop.url') + productSearchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        if (response.data.result.code === 2) {
          this.$refs.pop.open(3, '', this.$i18n.t('F00109.W003'), '', false, null, false, null)
        } else if (response.data.result.code === 0) {
          // 商品を追加
          if (response.data.responseModel.productLists != null) {
            for (let i = 0; i < response.data.responseModel.productLists.length; i++) {
              var pricelists = response.data.responseModel.productLists[i]
              // 商品が既に存在する場合は何もしない(一応の対応)
              if (this.dispDataList.findIndex((item) => item.jancode == pricelists.pricelists.skuId) < 0) {
                // 商品の追加
                var productname = ''
                var oldprice = ''
                if (response.data.responseModel.productLists[i].catalogs == null ||
                  response.data.responseModel.productLists[i].catalogs.displayName == null) {

                  // 商品名無し
                } else {
                  productname = response.data.responseModel.productLists[i].catalogs.displayName.kanji
                }
                if (response.data.responseModel.productLists[i].pricelistsbase == null) {
                  // 旧売価なし
                } else {
                  oldprice = response.data.responseModel.productLists[i].pricelistsbase.price
                }

                let item = {
                  jancode: response.data.responseModel.productLists[i].pricelists.skuId,
                  productname: productname,
                  oldprice: oldprice,
                  newprice: '',
                  entrynewprice: '',
                  productModel: response.data.responseModel.productLists[i]// 商品
                }
                this.dispDataList.push(item)
              }
            }
          }

          // 追加したJANコードをソートしておく
          this.dispDataList.sort((a, b) => (a.jancode < b.jancode) ? -1 : 1)
          this.changeFlg = true
          this.disabledMode(2)// 売価変更編集中
          return true
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.priceChangeNameEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },
    // 商品検索ダイアログの終了
    async editDlgClose () {
      this.editDlgOpen = false
      return true
    },
    // 新売価入力
    // 新売価入力チェック
    async newPriceInput (index) {
      this.dispDataList[index].newprice = this.dispDataList[index].newprice.replace(/[^0-9]/gi, '')
    },

    // 新売価入力[Enter]
    async newPriceEnter (index) {
      try {
        if (this.dispDataList[index].newprice != this.dispDataList[index].entrynewprice) {
          // 通信中は処理させない
          if (this.priceChangeNewPriceEnterLock) {
            return
          }
          this.priceChangeNewPriceEnterLock = true
          // ★PUT:ProductPriceChangeを呼び出し
          var params = {
            nodeId: this.targetStoreCd, // 店舗(21)
            priceChangeNo: this.priceChangeNo, // 売価変更No(10)
            changePlanName: this.changePlanName, // 実行計画名
            priceChangeName: this.priceChangeName, // 売価変更名称
            skuId: this.dispDataList[index].jancode, // JANコード(14)
            price: this.dispDataList[index].newprice,
            productModel: this.dispDataList[index].productModel, // 商品情報
            startDate: this.startDateStr, // 売価変更開始日
            endDate: this.endDateStr// 売価変更終了日
          }
          let response = await axios.put(this.$i18n.t('prop.url') + productPriceChangePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
          this.priceChangeNewPriceEnterLock = false
          if (response.data.result.code === 0) {
            this.dispDataList[index].entrynewprice = this.dispDataList[index].newprice// 登録した名称を保持
            this.changeFlg = true
            this.disabledMode(2)// 売価変更編集中
          } else {
            this.searchErrorMapping(response.data.result)
          }
        }
      } catch (error) {
        this.priceChangeNewPriceEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    // 商品削除
    async deleteListDate (index) {
      try {
        // ★DELETE:ProductDeleteを呼び出し
        var params = {
          nodeId: this.targetStoreCd, // 店舗(21)
          priceChangeNo: this.priceChangeNo, // 売価変更No(10)
          changePlanName: this.changePlanName, // 実行計画名
          priceChangeName: this.priceChangeName, // 売価変更名称
          skuId: this.dispDataList[index].jancode, // JANコード(14)
          productModel: this.dispDataList[index].productModel// 商品情報
        }
        let response = await axios.delete(this.$i18n.t('prop.url') + productDeletePath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ data: params }))
        this.priceChangeNewPriceEnterLock = false
        if (response.data.result.code === 0) {
          // 削除したレコードを削除
          this.dispDataList.splice(index, 1)
          this.changeFlg = true
          this.disabledMode(2)// 売価変更編集中
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.priceChangeNewPriceEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    // 業務メニュー保存ボタンクリック処理
    async save () {
      try {
        console.log('業務メニュー保存')
        // ★PriceChangeSaveを呼び出し
        var params = {
          nodeId: this.targetStoreCd, // 店舗(21)
          priceChangeNo: this.priceChangeNo, // 売価変更No(10)
          changePlanName: this.changePlanName, // 実行計画名
          changePlanVersion: this.changePlanVersion// 実行計画
        }
        let response = await axios.put(this.$i18n.t('prop.url') + priceChangeSavePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        this.priceChangeNewPriceEnterLock = false
        if (response.data.result.code === 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // 全体をクリア
          this.changeFlg = false
          this.disabledMode(1)// 売価変更編集中
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.priceChangeNewPriceEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    // 業務メニュー中止ボタンクリック処理
    async clear () {
      // "編集中のデータは破棄されます。<br/>よろしいですか？",
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.clearConfirm, false, null)
    },
    async clearConfirm () {
      try {
        console.log('業務メニュー中止')
        // ★PriceChangeClearを呼び出し
        var params = {
          nodeId: this.targetStoreCd, // 店舗(21)
          priceChangeNo: this.priceChangeNo, // 売価変更No(10)
          changePlanName: this.changePlanName// 実行計画名
        }
        let response = await axios.put(this.$i18n.t('prop.url') + priceChangeClearPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        this.priceChangeNewPriceEnterLock = false
        if (response.data.result.code === 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // 全体をクリア
          this.changeFlg = false
          this.disabledMode(1)// 売価変更編集中
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.priceChangeNewPriceEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    // 業務メニュー削除ボタンクリック処理
    async del () {
      console.log('業務メニュー削除')
      // "編集中のデータは削除されます。<br/>よろしいですか？",
      this.$refs.pop.open(1, '', this.$i18n.t('F00109.W002'), '', true, this.delConfirm, false, null)
    },
    async delConfirm () {
      try {
        console.log('業務メニュー削除')
        // ★PriceChangeDeleteを呼び出し
        var params = {
          nodeId: this.targetStoreCd, // 店舗(21)
          priceChangeNo: this.priceChangeNo, // 売価変更No(10)
          changePlanName: this.changePlanName, // 実行計画名
          changePlanVersion: this.changePlanVersion// 実行計画
        }
        let response = await axios.delete(this.$i18n.t('prop.url') + priceChangeDeletePath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ data: params }))
        this.priceChangeNewPriceEnterLock = false
        if (response.data.result.code === 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // 全体をクリア
          this.changeFlg = false
          this.disabledMode(1)// 売価変更編集中
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.priceChangeNewPriceEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    // 業務メニュー終了ボタンクリック処理
    async closeTab () {
      if (!this.disabledFixedBtn) {
        // "終了します。(編集中のデータは破棄されます)よろしいですか？"
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W004'), '', true, this.closeTabConfirm, false, null)
      } else {
        //        window.close()
        this.$router.push('/TopPage')
      }
    },
    async closeTabConfirm () {
      //      window.close()
      //      this.$router.push('/TopPage')

      try {
        console.log('業務メニュー終了')
        // ★PriceChangeClearを呼び出し
        var params = {
          nodeId: this.targetStoreCd, // 店舗(21)
          priceChangeNo: this.priceChangeNo, // 売価変更No(10)
          changePlanName: this.changePlanName// 実行計画名
        }
        let response = await axios.put(this.$i18n.t('prop.url') + priceChangeExitPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        this.priceChangeNewPriceEnterLock = false
        if (response.data.result.code === 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // 全体をクリア
          this.changeFlg = false
          this.disabledMode(1)// 売価変更編集中
          this.$router.push('/TopPage')
        } else {
          this.searchErrorMapping(response.data.result)
          this.$router.push('/TopPage')
        }
      } catch (error) {
        this.$router.push('/TopPage')
        this.priceChangeNewPriceEnterLock = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },

    async disabledMode (mode) {
      switch (mode) {
        case 0:// 全て抑止（終了のみOK）
          this.operationLock = true
          this.dispDataList = []// 商品データ
          this.priceChangeNo = ''// 売価変更No
          this.priceChangeName = ''// 売価変更名称
          this.startDateStr = ''// 売価変更開始日
          this.endDateStr = ''// 売価変更終了日
          this.priceChangeNote = ''// 売価変更備考
          this.entryPriceChangeName = ''// 登録した売価変更名称
          this.entryStartDate = ''// 登録した売価変更開始日
          this.entryEndDate = ''// 登録した売価変更終了日
          this.entryPriceChangeNote = ''// 登録した売価変更備考
          this.changeFlg = false// 編集可否情報

          this.disabledStoreSelectBtn = true// 店舗選択ボタン
          this.disabledPriceChangeText = true// 売価変更No入力
          this.disabledPriceChangeBtn = true// 売価変更Noボタン

          this.disabledPriceChangeNameText = true// 売価変更名称入力
          this.disabledPriceChangeDate = true// 売価変更期間
          this.disabledPriceChangeNodeText = true// 備考入力

          this.disabledproductSearchBtn = true// 商品検索ボタン
          this.disabledFixedBtn = true// 保存ボタン
          this.disabledDelBtn = true// 削除ボタン
          this.disabledClearBtn = true// 中止ボタン
          break
        case 1:// 初期状態
          this.operationLock = false
          this.dispDataList = []// 商品データ
          this.priceChangeNo = ''// 売価変更No
          this.priceChangeName = ''// 売価変更名称
          this.startDateStr = ''// 売価変更開始日
          this.endDateStr = ''// 売価変更終了日
          this.priceChangeNote = ''// 売価変更備考
          this.entryPriceChangeName = ''// 登録した売価変更名称
          this.entryStartDate = ''// 登録した売価変更開始日
          this.entryEndDate = ''// 登録した売価変更終了日
          this.entryPriceChangeNote = ''// 登録した売価変更備考
          this.changeFlg = false// 編集可否情報

          this.disabledStoreSelectBtn = false// 店舗選択ボタン
          if (this.targetStoreText == '') {
            this.disabledPriceChangeText = true// 売価変更No入力
            this.disabledPriceChangeBtn = true// 売価変更Noボタン
          } else {
            this.disabledPriceChangeText = false// 売価変更No入力
            this.disabledPriceChangeBtn = false// 売価変更Noボタン
          }
          this.disabledPriceChangeNameText = true// 売価変更名称入力
          this.disabledPriceChangeDate = true// 売価変更期間
          this.disabledPriceChangeNodeText = true// 備考入力

          this.disabledproductSearchBtn = true// 商品検索ボタン
          this.disabledFixedBtn = true// 保存ボタン
          this.disabledDelBtn = true// 削除ボタン
          this.disabledClearBtn = true// 中止ボタン
          break
        case 2:// 売価変更の情報入力
          this.operationLock = false
          this.disabledStoreSelectBtn = true// 店舗選択ボタン
          this.disabledPriceChangeText = true// 売価変更No入力
          this.disabledPriceChangeBtn = true// 売価変更Noボタン

          this.disabledPriceChangeNameText = false// 売価変更名称入力
          this.disabledPriceChangeDate = false// 売価変更期間
          this.disabledPriceChangeNodeText = false// 備考入力

          this.disabledproductSearchBtn = false// 商品検索ボタン
          this.disabledFixedBtn = false// 保存ボタン
          this.disabledDelBtn = false// 削除ボタン
          this.disabledClearBtn = false// 中止ボタン
          break
        case 3:// 売価変更No検索情報入力
          this.disabledPriceChangeText = false// 売価変更No入力
          this.disabledPriceChangeBtn = false// 売価変更Noボタン
          break
      }
    },

    // 再表示
    async refresh () {
    },

    // 店舗選択ボタン押下
    async storeSelect () {
      // G004.00.0 Add-Start
      if (this.headquartersAuthority !== 1) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W019'), '', false, null, false, null)
        return
      }
      // G004.00.0 Add-End
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      if (this.masters.storeMasters !== null) {
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.targetStoreText = this.masters.storeMasters[index].displayName.default
        }
        this.disabledMode(3)// 売価変更No検索
      }
    },
    // エラーメッセージ
    searchErrorMapping (result) {
      if (result.code === -99) {
        if (result.errorMessageMap['priceChangeName'] !== undefined) {
          var errorMessage = result.errorMessageMap['priceChangeName'].toString().split(',').join('')
        }
        this.$refs.pop.open(3, '', '売価変更名称は' + errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    confirmUnload (event) {
    },
    /**
     * カレンダー表示処理
     * flatPickrのインスタンスが1つしか生成できない（flatPickrを複数使用しても日付や設定がすべて上書きされる）ため、1つのflatPickrを使いまわす
     * カレンダー表示するたびにflatPickrの設定を開始・終了で切り替える
     * @param {*} displayFlag 表示フラグ(0:開始日付、1:終了日付)
     */
    showCalender (displayFlag) {
      this.$refs.flatPickr.fp.set('minDate', 'today')
      let vue = this
      // カレンダー表示した時に呼ばれる処理を設定
      this.$refs.flatPickr.fp.set('onOpen', function (selectedDates, dateStr) {
        // tabキー押下判定フラグをリセット
        vue.isTabKey = false
      })
      if (displayFlag === 0) {
        // 開始日付カレンダーを閉じた時に呼ばれる処理を設定
        this.$refs.flatPickr.fp.set('onClose', function (selectedDates, dateStr) {
          if (vue.isTabKey === false) {
            document.getElementById('inputStartDay').focus()
          }
          // 日付選択された場合は、選択された日付を表示用のdataオプションに設定し、日付チェックを起動する
          if (dateStr !== '') {
            let { newDate } = vue.dateCheck(dateStr)
            vue.startDateCheckFlg = false
            vue.calenderDate = newDate
            vue.startDateStr = dateStr
            vue.startDateFormatCheck()
          }
        })
        // 開始日付の入力がない場合は開始日付の日付型をnullに変更
        if (this.startDateStr === '') {
          this.startDate = null
        }
        // カレンダー表示日付を開始日付に変更
        this.calenderDate = this.startDate
        // is_active切り替えで開始日付の枠線オレンジ
        document.getElementById('startDateInput').classList.add('is_active')
        // 表示位置を開始日付inputの直下に設定
        this.$set(this.$refs.flatPickr.fp, '_positionElement', document.getElementById('startDateInput'))
      } else {
        // 終了日付カレンダーを閉じた時に呼ばれる処理を設定
        this.$refs.flatPickr.fp.set('onClose', function (selectedDates, dateStr) {
          if (vue.isTabKey === false) {
            document.getElementById('inputEndDay').focus()
          }
          // 日付選択された場合は、選択された日付を表示用のdataオプションに設定し、日付チェックを起動する
          if (dateStr !== '') {
            let { newDate } = vue.dateCheck(dateStr)
            vue.endDateCheckFlg = false
            vue.calenderDate = newDate
            vue.endDateStr = dateStr
            vue.endDateFormatCheck()
          }
        })
        // 終了日付の入力がない場合は終了日付の日付型をnullに変更
        if (this.endtDateStr === '') {
          this.endDate = null
        }
        // カレンダー表示日付を終了日付に変更
        this.calenderDate = this.endDate
        // is_active切り替えで終了日付の枠線オレンジ
        document.getElementById('endDateInput').classList.add('is_active')
        // 表示位置を終了日付inputの直下に設定
        this.$set(this.$refs.flatPickr.fp, '_positionElement', document.getElementById('endDateInput'))
      }
      this.$refs.flatPickr.fp.open()
    },
    /**
     * 開始日付チェックとボタン制御処理
     */
    async startDateFormatCheck () {
      if (!this.startDateCheckFlg) {
        // チェック結果リセット
        this.startDateCheckResult = false
        if (this.startDateStr !== '') {
          // チェックフラグを済みに更新
          this.startDateCheckFlg = true
          // 入力日付チェック処理呼出
          let {result, inputDateStr, date} = this.inputDateCheck(this.startDateStr)
          this.startDateStr = inputDateStr
          if (!result) {
            // チェックエラーの場合は、チェック結果をNGに更新してinputにフォーカスを当てる
            this.startDate = null
            document.getElementById('inputStartDay').focus()
          } else {
          // チェックOKの場合は、カレンダー表示日付に設定してチェック結果をOKに更新
            this.startDate = date
            this.calenderDate = date
            this.startDateCheckResult = true
          }
        } else {
          // 入力値が削除された場合は、カレンダー表示日付をリセットしてチェック結果をNGに更新
          this.startDate = null
          this.calenderDate = null
        }
        if (this.startDateCheckResult && this.endDateCheckResult) {
          // ★両方正しくなったので処理
          await this.priceChangeDateEnter()

          this.disableCsvOutputBtn = false
        } else {
          this.disableCsvOutputBtn = true
        }
      }
    },
    /**
     * 終了日付チェックとボタン制御処理
     */
    async endDateFormatCheck () {
      if (!this.endDateCheckFlg) {
        // チェック結果リセット
        this.endDateCheckResult = false
        if (this.endDateStr !== '') {
        // チェック済みフラグセット
          this.endDateCheckFlg = true
          // 入力日付チェック処理呼出
          var {result, inputDateStr, date} = this.inputDateCheck(this.endDateStr)
          this.endDateStr = inputDateStr
          if (!result) {
            // チェックエラーの場合は、チェック結果をNGに更新してinputにフォーカスを当てる
            this.endDate = null
            document.getElementById('inputEndDay').focus()
          } else {
          // チェックOKの場合は、カレンダー表示日付に設定してチェック結果をOKに更新
            this.endDate = date
            this.calenderDate = date
            this.endDateCheckResult = true
          }
        } else {
          // 入力値が削除された場合は、カレンダー表示日付をリセットしてチェック結果をNGに更新
          this.endDate = null
          this.calenderDate = null
        }
        if (this.startDateCheckResult && this.endDateCheckResult) {
          // ★両方正しくなったので処理
          await this.priceChangeDateEnter()

          this.disableCsvOutputBtn = false
        } else {
          this.disableCsvOutputBtn = true
        }
      }
    },
    /**
     * 入力日付チェック処理
     * @param {*} strDate チェック対象日付文字列
     */
    inputDateCheck (strDate) {
      // 入力フォーマットチェック呼出
      let { formatResult, dateStr } = this.formatCheck(strDate)
      let result = formatResult
      let inputDateStr = strDate
      let date = new Date()
      if (result) {
        // フォーマットチェックがOKの場合は有効日付チェックを呼びだす
        var { validateResult, newDate } = this.dateCheck(dateStr)
        result = validateResult
        date = newDate
        if (!result) {
          // 有効日付チェックがNGの場合、有効日付エラーメッセージを表示
          this.disableCsvOutputBtn = true
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.S031'), '', false, null, false, null)
        } else {
          inputDateStr = dateStr
        }
      } else {
        // フォーマットチェックがNGの場合はフォーマットエラーメッセージを表示
        this.disableCsvOutputBtn = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.S031'), '', false, null, false, null)
      }
      // 入力日付チェックの結果とフォーマット変換後の日付を返す
      return {result, inputDateStr, date}
    },
    /**
     * 日付フォーマットチェック
     * @param {*} strDate チェック対象日付文字列
     */
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
    /**
     * 有効日付チェック
     * @param {*} strDate チェック対象日付文字列
     */
    dateCheck (strDate) {
      var validateResult = true
      let dateSplit = strDate.split('/')
      let y = parseInt(dateSplit[0])
      let m = parseInt(dateSplit[1]) - 1
      let d = parseInt(dateSplit[2])
      let newDate = new Date(y, m, d)
      if (newDate.getFullYear() !== y || newDate.getMonth() !== m || newDate.getDate() !== d) {
        validateResult = false
      }
      return { validateResult, newDate }
    },
    /**
     * API呼び出しのエラーコード処理
     * @param {*} result 処理結果情報
     */
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
    /**
     * 期間のinputにフォーカスが当たった時の処理
     * @param {*} displayFlag 表示フラグ(0:開始日付、1:終了日付)
     */
    borderFocus (displayFlag) {
      if (displayFlag === 0) {
      // is_active切り替えで開始日付の枠線オレンジ
        document.getElementById('startDateInput').classList.add('is_active')
      } else {
      // is_active切り替えで終了日付の枠線オレンジ
        document.getElementById('endDateInput').classList.add('is_active')
      }
    },
    /**
     * 期間のinputからフォーカスが外れた時の処理
     * @param {*} displayFlag 表示フラグ(0:開始日付、1:終了日付)
     */
    borderBlur (displayFlag) {
      if (displayFlag === 0) {
      // is_active切り替えで開始日付の枠線オレンジ除去
        document.getElementById('startDateInput').classList.remove('is_active')
      } else {
      // is_active切り替えで終了日付の枠線オレンジ除去
        document.getElementById('endDateInput').classList.remove('is_active')
      }
    },
    /**
     * マウスホバー時のアイコン表示画像切替処理
     * @param {*} iname 切替対象のアイコンを区別するための要素id
     */
    changeImg (iname) {
      switch (iname) {
        case 'startCalender':
          this.startCalenderImgScr = require('@/assets/ico_calendar_h.png')
          break
        case 'endCalender':
          this.endCalenderImgScr = require('@/assets/ico_calendar_h.png')
          break
      }
    },
    /**
     * マウスリーブ時のアイコン表示画像切替処理
     * @param {*} iname 切替対象のアイコンを区別するための要素id
     */
    returnImg (iname) {
      switch (iname) {
        case 'startCalender':
          this.startCalenderImgScr = require('@/assets/ico_calendar_n.png')
          break
        case 'endCalender':
          this.endCalenderImgScr = require('@/assets/ico_calendar_n.png')
          break
      }
    },
    /**
     * 入力文字数チェック
     * @param {*} value チェック対象文字列
     */
    stringCount (value) {
      let result = false
      // 文字数のカウント
      if (value !== '') {
        if (value.length >= 8) {
          result = true
        }
      }
      return result
    },
    iputKeyEvent (event) {
      if (event.code === 'Tab') {
        this.isTabKey = true
      }
    },
    inputLimit (str, maxLength) {
      var strLen = str.toString().length
      // バイト数の取得
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
          this.priceChangeName = str.toString().substring(0, i)
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  },
  created () {
    this.$root.winId = 'F00109'
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    // window.addEventListener('beforeunload', this.confirmUnload)
    window.addEventListener('keydown', this.iputKeyEvent)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    // G003.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G003.00.0 Add-End
    //    this.searchData = ''
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
    //     this.$refs.priceChangeInputText.focus()
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
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.headquartersAuthority = headquartersAuthority
      if (headquartersAuthority != 1) {
        if (targetStoreCd) {
          vue.targetStoreText = belongStoreNameStr
          vue.targetStoreCd = targetStoreCd
        }
      }
      await this.initialize()
      await this.$nextTick()
      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementById('storeSelectBtn').focus()
        } else {
          this.$refs.priceChangeInputText.focus()
        }
      }, 200)
    })
    // G002.00.0 Update-End
  },
  watch: {
    //    searchData: function (val) {
    //      // コード入力の場合、半角数値以外を除去
    //      if (document.getElementById('searchCode').checked) {
    //        var inputText = val.replace(/[^0-9]/gi, '')
    //        this.searchData = inputText
    //        if (inputText === this.lastSearchData) return
    //        this.lastSearchData = inputText
    //      } else {
    //        this.lastSearchData = val
    //      }
    //      if (this.lastSearchData === '') {
    //        this.findDataList = []
    //        this.dispDataList = []
    //        this.getProduct()
    //      } else {
    //        if (this.findDataList === null || this.findDataList.productInfos.length === 0) return
    //        this.filtering()
    //      }
    //    },
    startDateStr: function (newValue) {
      this.startDateStr = newValue.toString().replace(/[^0-9/]/gi, '')
      // csv出力ボタンを非活性に変更、チェックフラグリセット
      this.disableCsvOutputBtn = true
      this.startDateCheckFlg = false
      // 開始日付と終了日付の入力時文字数が8文字以上の場合はcsv出力ボタンを活性化
      let startResult = this.stringCount(newValue)
      if (startResult) {
        if (this.endDateCheckResult) {
          // csv出力ボタンを活性に変更
          this.disableCsvOutputBtn = false
        }
      }
    },
    endDateStr: function (newValue) {
      this.endDateStr = newValue.toString().replace(/[^0-9/]/gi, '')
      // csv出力ボタンを非活性に変更、チェックフラグリセット
      this.disableCsvOutputBtn = true
      this.endDateCheckFlg = false
      // 開始日付と終了日付の入力時文字数が8文字以上の場合はcsv出力ボタンを活性化
      let endResult = this.stringCount(newValue)
      if (endResult) {
        if (this.startDateCheckResult) {
          // csv出力ボタンを活性に変更
          this.disableCsvOutputBtn = false
        }
      }
    }
  }
}
