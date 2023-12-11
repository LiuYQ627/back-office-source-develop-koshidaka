/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221220  litie(Neusoft)        G001.00.0  issue課題#937を対応します.
 * 20230119  litie(Neusoft)        G002.00.0  issue課題#835を対応します.
 * 20230511  wangchunmei(Neusoft)  G001.00.1  issue課題#937を対応します.
 * 20230519  dingxin(Neusoft)      G001.00.2  issue課題#937を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'
import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'

export default {
  data () {
    return {
      displayed: false,
      businessTimeStart: '',
      businessTimeEnd: '',
      transactionNoStart: '',
      transactionNoEnd: '',
      keyword: '',
      // G001.00.0 Update-Start
      keywordCaseSensitive: false,
      businessTimeStartBk: '',
      businessTimeEndBk: '',
      transactionNoStartBk: '',
      transactionNoEndBk: '',
      keywordCaseSensitiveBk: false,
      keywordBk: '',
      // G001.00.0 Update-End
      // G002.00.0 Update-Start
      businessTimeStartErrorMsg: '',
      businessTimeEndErrorMsg: '',
      transactionNoStartErrorMsg: '',
      transactionNoEndErrorMsg: ''
      // G002.00.0 Update-End
    }
  },
  components: {
    popup,
    commonDialog
  },
  methods: {
    async open () {
      // G001.00.0 Update-Start
      this.businessTimeStart = this.businessTimeStartBk
      this.businessTimeEnd = this.businessTimeEndBk
      this.transactionNoStart = this.transactionNoStartBk
      this.transactionNoEnd = this.transactionNoEndBk
      this.keywordCaseSensitive = this.keywordCaseSensitiveBk
      this.keyword = this.keywordBk
      // G001.00.0 Update-End
      // G002.00.0 Update-Start
      this.initErrorMessage()
      // G002.00.0 Update-End
      this.displayed = true
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    // G001.00.0 Update-Start
    checkTransactionNo (transactionNo) {
      if (transactionNo === '') {
        return true
      }
      if (isFinite(transactionNo) && parseInt(transactionNo) === parseFloat(transactionNo)) {
        if (parseInt(transactionNo) > 0 && parseInt(transactionNo) <= 9999) {
          return true
        }
      }
      return false
    },
    // G001.00.0 Update-End
    onClickOk () {
      // G002.00.0 Update-Start
      this.initErrorMessage()
      let hasError = false
      if (this.$refs.businessTimeStartInput.validity.badInput || this.$refs.businessTimeEndInput.validity.badInput) {
        hasError = true
      } else if ((this.businessTimeStart && !this.businessTimeEnd) || (!this.businessTimeStart && this.businessTimeEnd)) {
        hasError = true
      }
      // KSD V001.000 AS #84020
      if (this.businessTimeStart > this.businessTimeEnd) {
        hasError = true
      }
      // KSD V001.000 AE #84020
      if ((this.transactionNoStart && !this.transactionNoEnd) || (!this.transactionNoStart && this.transactionNoEnd)) {
        hasError = true
      }
      // G001.00.2 Add-Start
      if (this.transactionNoStart && this.transactionNoEnd) {
        if (parseInt(this.transactionNoStart) > parseInt(this.transactionNoEnd)) {
          // KSD V001.000 DS #84060
          // this.transactionNoEndErrorMsg = '1~9999の間で正しく入力してください。'
          // KSD V001.000 DE #84060
          // KSD V001.000 AS #84060
          this.transactionNoEndErrorMsg = '開始 <= 終了で入力してください。'
          // KSD V001.000 AE #84060
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '', false, null, false, null)
          return
        } else {
          this.transactionNoEndErrorMsg = ''
        }
      }
      // G001.00.2 Add-End
      if (hasError) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '', false, () => {
          if (this.$refs.businessTimeStartInput.validity.badInput || this.$refs.businessTimeEndInput.validity.badInput) {
            if (!this.businessTimeStart) {
              this.businessTimeStartErrorMsg = this.$i18n.t('F32271.W013')
            }
            if (!this.businessTimeEnd) {
              this.businessTimeEndErrorMsg = this.$i18n.t('F32271.W013')
            }
          } else if ((this.businessTimeStart && !this.businessTimeEnd) || (!this.businessTimeStart && this.businessTimeEnd)) {
            if (!this.businessTimeStart) {
              this.businessTimeStartErrorMsg = this.$i18n.t('F32271.W013')
            } else {
              this.businessTimeEndErrorMsg = this.$i18n.t('F32271.W013')
            }
          // KSD V001.000 AS #84020
          } else if (this.businessTimeStart > this.businessTimeEnd) {
            this.businessTimeEndErrorMsg = '開始時刻＜＝終了時刻で入力してください。'
          // KSD V001.000 AE #84020
          }
          if ((this.transactionNoStart && !this.transactionNoEnd) || (!this.transactionNoStart && this.transactionNoEnd)) {
            if (!this.transactionNoStart) {
              this.transactionNoStartErrorMsg = this.$i18n.t('F32271.W013')
            } else {
              this.transactionNoEndErrorMsg = this.$i18n.t('F32271.W013')
            }
          }
        }, false, null)
        return
      }
      // G002.00.0 Update-End
      // G001.00.0 Update-Start
      // this.$emit('clickOk', this.businessTimeStart, this.businessTimeEnd, this.transactionNoStart, this.transactionNoEnd, this.keyword)
      if (!this.checkTransactionNo(this.transactionNoStart) || !this.checkTransactionNo(this.transactionNoEnd)) {
        // G001.00.2 Update-Start
        if (!this.checkTransactionNo(this.transactionNoStart)) {
          this.transactionNoStartErrorMsg = '1~9999の間で入力してください。'
        } else {
          this.transactionNoEndErrorMsg = '1~9999の間で入力してください。'
        }
        // this.$refs.pop.open(3, '', this.$i18n.t('F32271.W004'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '', false, null, false, null)
        // G001.00.2 Update-End
        return
      }
      this.businessTimeStartBk = this.businessTimeStart
      this.businessTimeEndBk = this.businessTimeEnd
      this.transactionNoStartBk = this.transactionNoStart
      this.transactionNoEndBk = this.transactionNoEnd
      this.keywordCaseSensitiveBk = this.keywordCaseSensitive
      this.keywordBk = this.keyword
      this.$emit('clickOk', this.businessTimeStart, this.businessTimeEnd, this.transactionNoStart, this.transactionNoEnd, this.keyword, this.keywordCaseSensitive)
      // G001.00.0 Update-End
      this.displayed = false
    },
    // G001.00.0 Update-Start
    onClickReset () {
      this.businessTimeStart = ''
      this.businessTimeEnd = ''
      this.transactionNoStart = ''
      this.transactionNoEnd = ''
      this.keywordCaseSensitive = false
      this.keyword = ''
      // G002.00.0 Update-Start
      this.initErrorMessage()
      // G002.00.0 Update-End
    },
    // G001.00.0 Update-End
    // G002.00.0 Update-Start
    initErrorMessage () {
      this.businessTimeStartErrorMsg = ''
      this.businessTimeEndErrorMsg = ''
      this.transactionNoStartErrorMsg = ''
      this.transactionNoEndErrorMsg = ''
    },
    transactionNoStartInputRegulation () {
      let value = this.transactionNoStart.replace(/[^0-9]/gi, '')
      // G001.00.1 Delete-Start
      // if (value === '0') {
      //   value = ''
      // }
      // G001.00.1 Delete-End
      this.transactionNoStart = value
    },
    transactionNoEndInputRegulation () {
      let value = this.transactionNoEnd.replace(/[^0-9]/gi, '')
      // G001.00.1 Delete-Start
      // if (value === '0') {
      //   value = ''
      // }
      // G001.00.1 Delete-End
      this.transactionNoEnd = value
    },
    // G002.00.0 Update-End
    changeKeyword () {
    }
  // CS KSD V001.000 #83851
  // }
  },
  // CE KSD V001.000 #83851
  // AS KSD V001.000 #83851
  watch: {
    'keyword': function (val, old) {
      let str = val
      let strLen = str.length
      let byteLen = 0
      for (let i = 0; i < strLen; i++) {
        let codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) || (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }

        if (byteLen > 40) {
          this.keyword = str.substring(0, i)
          break
        }
      }
    }
  }
  // AE KSD V001.000 #83851
}
