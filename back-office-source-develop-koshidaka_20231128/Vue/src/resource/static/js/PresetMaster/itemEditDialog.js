import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
// G001.00.0 Update-Start
// import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'
import commonDialog from '@/resource/templates/PresetMaster/CommonDialog'
// G001.00.0 Update-End
import presetKeywordItems from '@/resource/templates/PresetMaster/PresetKeywordItems'
import dialogPresetImageSearch from '@/resource/templates/PresetMaster/DialogPresetImageSearch'
/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230315  dingxin(Neusoft)      G001.00.0  issue課題#1662を対応します.
 * 20230614  wangchunmei(Neusoft)  G002.00.0  issue課題#1696を対応します.
 * 20230807  zyx(Neusoft)          G003.00.0  issue課題#1603を対応します.
 */
export default {
  data () {
    return {
      displayed: false,
      enabled: false,
      planningCode: null,
      companyCode: null,
      storeCode: null,
      items: {
        order: 1,
        barCode: '',
        title: '',
        presetName: '',
        skuId: '',
        itemName: '',
        fileName: '',
        presignedUrl: '',
        productTaxCodes: [],
        price: ''
      },
      // G003.00.0 Add-Start
      itemMode: 1
      // G003.00.0 Add-End
      // KSD V001.000 AS issue #1373 対応
      ,barCodeErrorMsg: null,
      itemNameErrorMsg: null
      // KSD V001.000 AE issue #1373 対応
    }
  },
  components: {
    popup,
    commonDialog,
    presetKeywordItems,
    dialogPresetImageSearch
  },
  methods: {
    open (item, planningCode, companyCode, storeCode, itemMode) {
      this.items = item
      this.planningCode = planningCode
      this.companyCode = companyCode
      this.storeCode = storeCode
      this.displayed = true
      this.enabled = false
      // G003.00.0 Add-Start
      this.itemMode = itemMode
      // G003.00.0 Add-End
      // KSD V001.000 AS issue #1373 対応
      this.barCodeErrorMsg = null
      this.itemNameErrorMsg = null
      // KSD V001.000 AE issue #1373 対応
    },
    initData () {
      this.items = {
        order: 1,
        barCode: '',
        title: '',
        presetName: '',
        skuId: '',
        itemName: '',
        fileName: '',
        presignedUrl: '',
        taxCodes: '',
        price: ''
      }
      this.displayed = false
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => {
        this.initData()
      }, false, null)
    },
    // KSD V001.000 AS issue #1373 対応
    validateFields () {
      let itemsFocus = []
      if (this.$refs.barCodeInput.value === null || this.$refs.barCodeInput.value === '') {
        this.barCodeErrorMsg = this.$i18n.t('C00218.E009')
        itemsFocus.push(this.$refs.barCodeInput)
      }
      if (this.$refs.itemNameInput.value === null || this.$refs.itemNameInput.value === '') {
        this.itemNameErrorMsg = this.$i18n.t('C00218.E009')
        itemsFocus.push(this.$refs.itemNameInput)
      }
      this.focusItem = itemsFocus[0]
      return itemsFocus.length > 0
    },
    // KSD V001.000 AE issue #1373 対応
    onClickOk () {
      // KSD V001.000 DS issue #1373 対応
      // this.$emit('clickOk', this.items)
      // this.initData()
      // KSD V001.000 DE issue #1373 対応

      // KSD V001.000 AS issue #1373 対応
      this.initErrorMessage ()
      if (this.validateFields() === false) {
      this.$emit('clickOk', this.items)
      this.initData()
      }else{
      this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.setFocus, false, null)
      }
      // KSD V001.000 AE issue #1373 対応
    },
    async onBarcodeAnalysis () {
      try {
        const nodeId = this.companyCode + this.storeCode
        const barcode = this.items.barCode
        const response = await axios.get(this.$i18n.t('prop.url') + 'PresetMaster/BarcodeAnalysis' + '?nodeId=' + nodeId + '&barcode=' + barcode, commonUtils.methods.addApiHeader({}))
        const {result} = response.data
        if (result.code !== 0) {
          // G002.00.0 Add-Start
          if (result.code === 400) {
            this.$refs.pop.open(3, '', 'バーコード解析に失敗しました。入力したバーコードを確認してください。', '', false, null, false, null)
            return
          }
          // G002.00.0 Add-End
          // 結果コード：0・15~19以外の場合は、エラー処理をして処理終了
          this.globalErrorMapping(response)
          return
        }
        if (result.code === 0) {
          const data = response.data.product
          this.items.barCode = data.skuId
          this.items.skuId = data.skuId
          this.items.itemName = data.itemName
          this.items.presetName = data.itemName
          this.items.title = data.itemName
          this.items.productTaxCodes = [data.taxCodes]
          this.items.price = data.price
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    async onImageSearch () {
      const initImageInfo = {
        presignedUrl: this.items.presignedUrl,
        fileName: this.items.fileName
      }
      this.$refs.imageDialog.open(this.planningCode, this.companyCode, this.storeCode, initImageInfo)
    },
    onSelectProduct (data) {
      this.items.barCode = data.skuId
      this.items.skuId = data.skuId
      this.items.itemName = data.displayName.kanji
      this.items.presetName = data.displayName.kanji
      this.items.title = data.displayName.kanji
      this.items.productTaxCodes = [data.taxCodes]
      this.items.price = data.price
    },
    onSelectImage (data) {
      this.items.presignedUrl = data.preSignedUrl
      this.items.fileName = data.fileName
    },
    async onKeywordSearch () {
      this.$refs.presetKeywordItemsDialog.open(this.companyCode, this.storeCode)
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
    // KSD V001.000 AS issue #1373 対応
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    initErrorMessage () {
      this.barCodeErrorMsg = null
      this.itemNameErrorMsg = null
    },
    // KSD V001.000 AE issue #1373 対応
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
          if (this.items.itemName == str) {
            this.items.itemName = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  }
}
