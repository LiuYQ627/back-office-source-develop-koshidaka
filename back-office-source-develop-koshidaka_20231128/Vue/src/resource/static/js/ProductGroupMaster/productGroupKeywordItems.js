import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'
const searchQueryPath = 'ProductGroupMaster/ProductQuery/limit'

export default {
  // [Vue.js]データオブジェクト定義
  data () {
    return {
      dialog: false,
      // タイトル
      title: '',
      storeCode: '',
      parentClassificationNumber: 0,
      itemList: [],               // 商品構成マスタ一覧
      searchName: '',             // 検索パラメータ
      selectedItem: {},           // 選択済み商品構成情報
      // 一覧表タイトルリスト
      headers: [
        this.$i18n.t('F00204.S031'),
        this.$i18n.t('F00204.S032')
      ],
      placeholderSearchCond: this.$i18n.t('F00204.S033'),
      selectedIndex: -1,
      itemListLimit: 0
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
,bWireMock: false
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
    }
  },
  // [Vue.js]ローカルコンポーネント登録
  components: {
    popup
  },
  // [Vue.js]メソッド定義
  methods: {
     // [function]ダイアログ表示処理(storeCode:店舗コード、parentClassificationNumber:上位分類No)
    open (storeCode, parentClassificationNumber) {
      // 初期化処理
      this.selectedItem = {}
      this.itemList = []
      this.storeCode = storeCode
      this.parentClassificationNumber = parentClassificationNumber
      this.searchName = ''
      this.dialog = true
      this.selectedIndex = -1
    },
    // [function]検索上限数取得(nodeId:会社コード(15)+店舗コード(6))
    async getItemListLimit (nodeId) {
      const response = await axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
        nodeId: nodeId
      }, commonUtils.methods.getApiHeader())
        if (response.data.result.code !== 0) {
        this.globalErrorMapping(response)
        return
      }
      if (response.data.responseModel) {
        this.itemListLimit = response.data.responseModel.configurations.STORE_OPERATIONS_SETTINGS.value.itemListLimit
      }
      return this.itemListLimit
    },
    // [function]商品構成マスタ検索処理(limit:検索上限数)
    async fetchProductGroups (limit) {
      let json = {}
      if (this.searchName !== '' && this.searchName != null) {
        json = { productClassificationNumber: this.parentClassificationNumber, displayName: {kanji: '/^' + this.searchName + '/'} }
      }
      else {
        json = { productClassificationNumber: this.parentClassificationNumber }
      }
      const params = { nodeId: this.storeCode, queryMode: 'ALL', queryLimit: limit+1, searchParams: JSON.stringify(json) }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.storeCode.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
      const response = await axios.get(
        this.$i18n.t('prop.url') + searchQueryPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params })
      )
      if (response.data.result.code === 0) {
        // 検索正常の場合
        // KSD V001.000 DS
        // this.itemList = response.data.responseModel
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.itemList = response.data.responseModel.sort((a, b) => a.productId - b.productId)
        // KSD V001.000 AE
        if (this.itemList.length > limit) {
          // 検索件数が上限数以上ある場合、上限数までとし、上限オーバーポップを表示する
          this.itemList.splice(limit, 1)
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W017'), '', false, null, false, null)
        }
      } else if (response.data.result.code === 2) {
        // 該当なしの場合
        this.itemList = []
      } else {
        // エラー発生の場合
        this.globalErrorMapping(response)
      }
    },
     // [event]「検索する」ボタンクリック処理
    async onClickSearch () {
      this.selectedIndex = -1
      this.selectedItem = {}
      const nodeId = this.storeCode
      // 検索上限数取得
      this.getItemListLimit(nodeId).then((limit) => {
        // 商品構成マスタ検索処理
        this.fetchProductGroups(limit)
      })
    },
     // [event]商品構成一覧行クリック処理(item:該当行の商品構成情報, index:該当行インデックス)
    clickRow (item, index) {
      this.selectedItem = item
      this.selectedIndex = index
    },
     // [event]「OK」ボタンクリック時処理
    async onClickOk () {
      // 選択の商品構成情報インスタンスをパラメータとして、clickSubmitイベントを発生させる
      this.$emit('clickSubmit', this.selectedItem)
      this.dialog = false
    },
     // [event]「戻る」ボタンクリック時処理
    close () {
      this.dialog = false
    },
    // [function]ダイアログ表示完了後の処理
    openEnd () {
      // 検索条件入力欄にフォーカス
      document.getElementById('inputone').focus()
    },
    // [function]エラー共通処理(result:レスポンスデータ)
    globalErrorMapping (result, msg = '', func = null) {
      if (result === null) {
        this.$refs.pop.open(3, '', this.$t(msg), '', false, func, false, null)
      } else if (result.data.result.code === -10 || result.data.result.code === -20 || result.data.result.code === -30) {
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      } else if (result.data.result.code === -90) {
        this.$refs.pop.open(2, '', this.$t('O00004.W008'), result.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
      } else {
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      }
    },
    // [event]検索条件エリア入力時ハンドラ(str:入力内容, maxLength:最大桁数)
    inputLimit (str,maxLength) {
      if(str == null){return}
      var strLen = str.toString().length;
      // byte数の取得
      var byteLen = 0;
      for (var i = 0; i < strLen; i++) {
        var codeUnitNo = str.charCodeAt(i);
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0)
          || (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
            byteLen += 1;
        } else {
            byteLen += 2;
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          if (this.searchName== str) {
            this.searchName = str.toString().substring(0,i);
          }
          break;
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  }
}

