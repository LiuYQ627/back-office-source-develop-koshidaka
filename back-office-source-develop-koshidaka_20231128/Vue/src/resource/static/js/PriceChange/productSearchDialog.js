import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'

const productSearchPath = 'PriceChange/ProductSearch'
/*
* ---------+-----------------+----------+--------------------------------
*  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
* ---------+-----------------+----------+--------------------------------
* 20230209  xu.jh(Neusoft)  G001.00.0  issue課題#1218を対応します.
*/
export default {
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      janCode: '',
      productName: '',
      maxLenProductName: 40,

      janCodeErrorMsg: '',
      productNameErrorMsg: '',

      okFunc: null,
      closeFunc: null,
      focusItem: null,
      // G001.00.0 Add-Start
      targetStoreCd: ''
      // G001.00.0 Add-End
    }
  },
  components: {
    popup
  },
  methods: {
    open (storeCd, clientId, productData, okFunc, closeFunc) {
      this.dialog = true
      this.okFunc = okFunc
      this.closeFunc = closeFunc
      this.title = this.$i18n.t('F00109.S010')
      this.janCode = ''
      this.productName = ''
      // G001.00.0 Add-Start
      this.targetStoreCd = storeCd
      // G001.00.0 Add-End
    },
    openEnd () {
      document.getElementsByClassName('textProductName')[0].focus()
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
    // G001.00.0 Add-Start
    async onClickSave () {
      debugger
      axios.get(this.$i18n.t('prop.url') + 'PresetMaster/BarcodeAnalysis' + '?nodeId=' + this.targetStoreCd + '&barcode=' + this.janCode, commonUtils.methods.addApiHeader({}))
        .then((res) => {
          this.onClickSaveBase(res.data.analysisList[0].individualAnalysis.inquiryCode)
        }).catch((error) => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
    },
    // G001.00.0 Add-End
    // G001.00.0 Update-Start
    // async onClickSave () {
    async onClickSaveBase (janCode) {
    // G001.00.0 Update-End
      this.initErrorMessage()
      // this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // G001.00.0 Update-Start
      // if (await this.okFunc(this.janCode) === true) {
      if (await this.okFunc(janCode) === true) {
      // G001.00.0 Update-End
        // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
        this.closeFunc()
        this.dialog = false
      } else {
        this.$refs.janCodeText.focus()
        this.$refs.pop.closeFunction()
      }
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
      this.productNameErrorMsg = ''
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      this.janCode = this.janCode.toString().replace(/[^0-9]/gi, '')
    }
  },
  watch: {
    productName: function (str) {
      let strLen = str.toString().length
      let byteLen = 0
      for (let i = 0; i < strLen; i++) {
        const codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) || (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        if (byteLen > this.maxLenProductName) {
          this.productName = str.toString().substring(0, i)
          break
        }
      }
    }
  }
}
