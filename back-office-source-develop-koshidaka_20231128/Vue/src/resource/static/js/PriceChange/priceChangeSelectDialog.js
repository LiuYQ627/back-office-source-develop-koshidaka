import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'

const productSearchPath = 'PriceChange/ProductSearch'

export default {
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,

      priceChangeData: [],		// 売価変更Noリスト
      tempCadidatePriceChange: [], // 仮選択しているコードリスト

      okFunc: null,
      closeFunc: null,
      focusItem: null
    }
  },
  components: {
    popup
  },
  methods: {
    open (storeCd, priceChangeData, okFunc, closeFunc) {
      this.tempCadidatePriceChange = []
      this.priceChangeData = priceChangeData

      this.dialog = true
      this.okFunc = okFunc
      this.closeFunc = closeFunc
      this.title = this.$i18n.t('F00109.S022')
    },
    openEnd () {
      document.getElementById('baseTable').scrollTo(0, 0)
      this.$refs.typeText.value = this.productData.productType
      this.initErrorMessage()
    },
    onClickReturn () {
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
      // メッセージを出さずに終了
      this.popupConfirm()
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    // OKボタン
    async onClickSave () {
      this.initErrorMessage()
      // this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (await this.okFunc(this.tempCadidatePriceChange[0].slice(-10)) === true) {
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
        this.$refs.pop.closeFunction()
        this.closeFunc()
        this.dialog = false
      } else {
        this.$refs.pop.closeFunction()
      }
    },

    // 売価変更No取得
    getPriceChangeData () {
      return this.priceChangeData
    },
    // 売価変更No取得
    getSelectPriceChangeData () {
      return this.tempCadidatePriceChange
    },
    // 選択
    clickCandidateRow (priceChange, isCtrl) {
      // 他の選択行を解除する
      this.tempCadidatePriceChange = []
      // 選択状態
      this.tempCadidatePriceChange.push(priceChange)
    },

    saveErrorMapping (result) {
      this.focusItem = null
      // エラーメッセージ
      if (result.code === -99) {
        if (result.errorMessageMap['productInfos[0].name'] !== undefined) {
          this.janCodeErrorMsg = result.errorMessageMap['productInfos[0].name'].toString().split(',')
          this.focusItem = this.$refs.nameText
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
      this.janCodeErrorMsg = ''
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      this.janCode = this.janCode.toString().replace(/[^0-9]/gi, '')
    },
    // 文字入力規制(半角数字＋「/」のみ)
    dateInputRegulation () {
      //      this.productData.sellStartDate = this.productData.sellStartDate.toString().replace(/[^0-9\/]/gi, '')
      //      this.productData.sellEndDate = this.productData.sellEndDate.toString().replace(/[^0-9]/gi, '')
    }
  }
}
