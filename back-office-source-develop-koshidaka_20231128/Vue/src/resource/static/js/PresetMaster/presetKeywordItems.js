import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
// import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'

export default {
  components: {
    popup
  },
  data () {
    return {
      dialog: false,
      initClassificationCd: -1,
      // タイトル
      title: '',
      storeCode: '',
      companyCode: '',
      // 単品マスタ一覧
      items: [],
      // 検索パラメータ商品名
      searchName: '',
      // 選択済み単品マスタ
      selectedItem: {},
      headers: [
        '商品名',
        'JAN コード',
        '売単価'
      ],
      selectIndex: -1,
      itemListLimit: 0
    }
  },
  methods: {
    /**
     * 表示処理
     * @param {*} title ダイアログタイトル
     * @param {*} storeCode 店舗コード
     */
    open (companyCode, storeCode) {
      // 初期化処理
      this.selectedItem = {}
      this.items = []
      this.companyCode = companyCode
      this.storeCode = storeCode
      this.searchName = ''
      this.dialog = true
      this.selectedIndex = -1
    },
    /**
     * 検索ボタン活性/非活性制御
     */
    isSearch () {
      var isdisabled = true

      // 商品名が入力されているか
      if (this.searchName !== '') {
        isdisabled = false
      }

      return isdisabled
    },
    async getItemListLimit (nodeId) {
      const res = await axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
        nodeId: nodeId
      }, commonUtils.methods.getApiHeader())
      if (res.data.result.code !== 0) {
        this.globalErrorMapping(res)
        return
      }
      if (res.data.responseModel) {
        this.itemListLimit = res.data.responseModel.configurations.STORE_OPERATIONS_SETTINGS.value.itemListLimit
      }
      return this.itemListLimit
    },
    async fetchProducts (limit) {
      let keyword = {}
      if (this.searchName !== '' && this.searchName != null) {
        keyword = {displayName: {kanji: '/' + this.searchName + '/'}}
      }
      const params = { companyCode: this.companyCode, storeCode: this.storeCode, keyword: keyword, limit: limit + 1 }
      const res = await axios.get(
        this.$i18n.t('prop.url') +
        'PresetMaster/SearchItemsKeyword',
        commonUtils.methods.addApiHeader({ params })
      )
      if (res.data.result.code === 0) {
        this.items = res.data.items
        if (this.items.length > this.itemListLimit) {
          // 0:正常
          this.items.splice(this.itemListLimit, 1)
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W017'), '', false, null, false, null)
        }
      } else if (res.data.result.code === 2) {
        this.items = []
      } else {
        this.globalErrorMapping(res)
      }
    },
    /**
     * 検索ボタンクリック処理
     */
    async onClickSearch () {
      this.selectedIndex = -1
      this.selectedItem = {}
      const nodeId = this.companyCode + this.storeCode
      this.getItemListLimit(nodeId).then((limit) => {
        this.fetchProducts(limit)
      })
    },
    /**
     * 行クリック処理
     * @param {*} item 商品情報
     * @param {*} index 選択インデックス番号
     */
    clickRow (item, index) {
      this.selectedItem = item
      this.selectedIndex = index
    },
    /**
     * OKボタンクリック時処理
     */
    async onClickOk () {
      this.$emit('clickSubmit', this.selectedItem)
      this.dialog = false
    },
    close () {
      this.dialog = false
    },
    selectedFocus (elementName, focudFlag) {
      var element = document.getElementsByClassName(elementName)[0]
      if (focudFlag) {
        element.style.outline = '1px solid #ff9508'
      } else {
        element.style.outline = ''
      }
    },
    /**
     * ダイアログ表示完了後の処理
     */
    openEnd () {
      document.getElementById('inputone').focus()
    },
    globalErrorMapping (result, msg = '', func = null) {
      if (result === null) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', this.$t(msg), '', false, func, false, null)
      } else if (result.data.result.code === -10 || result.data.result.code === -20 || result.data.result.code === -30) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      } else if (result.data.result.code === -90) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(2, '', this.$t('O00004.W008'), result.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
      } else {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      }
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
          if (this.searchName == str) {
            this.searchName = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  }
}
