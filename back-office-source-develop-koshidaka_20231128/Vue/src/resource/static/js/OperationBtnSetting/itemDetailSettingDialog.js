import popup from '@/resource/templates/CommonDesign/Popup'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221222 duyouwei(Neusoft)  G001.00.0  issue課題#1204,#1161を対応します.
 * 20230425 dingxin(Neusoft)   G002.00.0  issue課題#1662を対応します.
 */

export default {
  data () {
    return {
      // G002.00.0 Add-Start
      permissions: [],
      // G002.00.0 Add-End
      config: {},
      displayed: false,
      index: 0,
      itemDetail: {
        displayName: {}
      },
      // G001.00.0 Add-Start
      title: '',
      presetPlaceholder: this.$i18n.t('O00004.S073'),
      nameErrorMsg: '',
      // transactionNoErrorMsg: ''
      // KSD V001.000 DS
      // transactionNoErrorMsgStr: '01から99の範囲で入力してください。',
      // transactionNoErrorMsgExists: 'この取引別No.は既に使用されています。別の値を入力してください。',
      // KSD V001.000 DE
      // KSD V001.000 AS
      transactionNoErrorMsgStr: this.$i18n.t('F322b1.W002'),
      transactionNoErrorMsgExists: this.$i18n.t('F322b1.W003'),
      // KSD V001.000 AE
      transactionNoErrorMsg: '',
      // G001.00.0 Add-End
      presetErrorMsg: '',
      //      presetErrorMsgStr: '割引時: 100 以下', // should be in language_ja.json
      // KSD V001.000 DS
      // presetErrorMsgStr: '0から100の範囲で入力してください。', // should be in language_ja.json
      // KSD V001.000 DE
      // KSD V001.000 AS
      presetErrorMsgStr: this.$i18n.t('F322b1.W004'),
      // KSD V001.000 AE
      transactionNoUpper: 0,
      transactionNoLower: 0,
      // trNoPlaceholder: this.$i18n.t('O00004.S075'),
      // initFlag: true
      initFlag: true,
      listTrNo: [],
      oldTrNo: '',
      transactionNoAfter: '0'
      // KSD V001.000 AS
      , taxRates: []
      // KSD V001.000 AE
    }
  },
  components: {
    popup
  },
  methods: {
    fetchConfig () {
      this.config = require('./_config.json')
    },
    // G001.00.0 Update-Start
    // async open (itemDetail, index) {
    // G002.00.0 Update-Start
    // open (itemDetail, index, title, listTrNo, dialogName) {
    // KSD V001.000 DS
    // open (permissions, itemDetail, index, title, listTrNo, dialogName) {
    // KSD V001.000 DE
    // KSD V001.000 AS
    open (permissions, itemDetail, index, title, listTrNo, dialogName, taxRates) {
      // KSD V001.000 AE
      this.permissions = permissions
      // G002.00.0 Update-End
      // async open (itemDetail, index, title) {
      this.initFlag = true
      this.transactionNoAfter = (dialogName === 'itemDetailSettingDialog') ? '0' : '1'
      this.itemDetail = {}
      this.title = title
      this.listTrNo = listTrNo
      this.oldTrNo = (typeof itemDetail.transactionNo !== 'undefined' && itemDetail.transactionNo !== null && itemDetail.transactionNo !== '') ? itemDetail.transactionNo : ''
      // G001.00.0 Update -End
      this.itemDetail = {
        ...itemDetail,
        active: true
      }
      // this.itemDetail = { ...itemDetail, active: true }
      this.index = index
      this.displayed = true
      // G001.00.0 Add-Start
      this.nameErrorMsg = ''
      this.transactionNoErrorMsg = ''
      this.presetErrorMsg = ''
      // G001.00.0 Add-End
      if (this.itemDetail.transactionNo - 0) {
        this.transactionNoUpper = this.itemDetail.transactionNo.toString().padStart(6, '0').slice(3, 4)
        this.transactionNoLower = this.itemDetail.transactionNo.toString().padStart(6, '0').slice(4, 5)
      } else {
        this.transactionNoUpper = '0'
        this.transactionNoLower = '0'
        // this.trNoPlaceholder = this.$i18n.t('O00004.S075')
      }
      // KSD V001.000 AS
      this.taxRates = taxRates
      // KSD V001.000 AE
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickSave () {
      // G001.00.0 Add-Start
      if (this.itemDetail.displayName.default === '' || this.itemDetail.displayName.default === null) {
        this.nameErrorMsg = this.$i18n.t('O00004.W014')
      } else {
        this.nameErrorMsg = ''
      }
      // if (!(this.itemDetail.transactionNo - 0)) {
      //  this.itemDetail.transactionNo = null
      // }

      this.itemDetail.transactionNo = this.transactionNoBefore + this.transactionNoUpper + this.transactionNoLower + this.transactionNoAfter
      // if (this.itemDetail.transactionNo === '' || this.itemDetail.transactionNo === null) {
      //  this.transactionNoErrorMsg = this.$i18n.t('O00004.W014')
      if (this.itemDetail.transactionNo === '' || this.itemDetail.transactionNo === null || (!(this.transactionNoLower - 0) && !(this.transactionNoUpper - 0))) {
        // this.transactionNoErrorMsg = this.$i18n.t('O00004.W014')
        // KSD V001.000 AS
        if ((this.transactionNoLower === '0' && this.transactionNoUpper === '0') && (this.itemDetail.kind === 3 || this.itemDetail.kind === 4)) {
          this.transactionNoErrorMsg = ''
        } else {
        // KSD V001.000 AE
          this.transactionNoErrorMsg = this.transactionNoErrorMsgStr
        // KSD V001.000 AS
        }
        // KSD V001.000 AE
      } else if (this.listTrNo.includes(this.itemDetail.transactionNo) && (this.itemDetail.transactionNo !== this.oldTrNo)) {
        console.log(this.itemDetail.transactionNo, 'original: ' + this.oldTrNo)
        this.transactionNoErrorMsg = this.transactionNoErrorMsgExists
      } else {
        this.transactionNoErrorMsg = ''
      }

      if (this.itemDetail.preset > 100 && this.itemDetail.kind === 1) {
        this.presetErrorMsg = this.presetErrorMsgStr
      } else {
        this.presetErrorMsg = ''
      }
      // if (this.nameErrorMsg !== '' || this.transactionNoErrorMsg !== '') {
      // if (this.nameErrorMsg !== '' || this.transactionNoErrorMsg !== '' || this.presetErrorMsg !== '') {
      // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
      if (this.itemDetail.displayName.default === '' || this.itemDetail.displayName.default === null ||
        this.itemDetail.transactionNo === '' || this.itemDetail.transactionNo === null || (!(this.transactionNoLower - 0) && !(this.transactionNoUpper - 0)) ||
        (this.listTrNo.includes(this.itemDetail.transactionNo) && (this.itemDetail.transactionNo !== this.oldTrNo)) ||
        (this.itemDetail.preset > 100 && this.itemDetail.kind === 1)) {
        // KSD V001.000 AS
        if (this.transactionNoErrorMsg !== '' || this.presetErrorMsg !== '' || this.nameErrorMsg !== '') {
        // KSD V001.000 AE
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
          return
        // KSD V001.000 AS
        }
        // KSD V001.000 AE
      }
      // G001.00.0 Add-End
      this.displayed = false
      this.$emit('clickSave', this.itemDetail, this.index)
    },
    // G001.00.0 Add-Start
    //    changeKind (selectedVal) {
    //      if (selectedVal.target.value === '0') {
    //        this.presetPlaceholder = this.$i18n.t('O00004.S073')
    //      } else {
    //        this.presetPlaceholder = this.$i18n.t('O00004.S074')
    //      }
    //    },
    // KSD V001.000 AS
    disableTransNo () {
      return this.itemDetail.kind === 3 || this.itemDetail.kind === 4
    },
    // KSD V001.000 AE
    inputLimit (str, maxLength, inputItem) {
      if (str == null || str === undefined) { return }
      //      if (inputItem === 'name') {
      //        this.nameErrorMsg = ''
      //      } else if (inputItem === 'preset') {
      //      } else if (inputItem === 'transactionNo') {
      //        if (str === '00') {
      //          this.itemDetail.transactionNo = null
      //        } else {
      //          this.transactionNoErrorMsg = ''
      //        }
      //      }
      var strLen = str.toString().length
      // byte数の取得
      var byteLen = 0
      for (var i = 0; i < strLen; i++) {
        var codeUnitNo = str.toString().charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) || (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          if (this.itemDetail.displayName.default == str) {
            this.itemDetail.displayName.default = str.toString().substring(0, i)
          } else if (this.itemDetail.preset == str) {
            this.itemDetail.preset = str.toString().substring(0, i)
          } else if (this.itemDetail.transactionNo == str) {
            this.transactionNoErrorMsg = ''
            this.itemDetail.transactionNo = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
      // G001.00.0 Add-End
    },
    getLen (str) {
      let count = 0
      let c = ''
      for (let i = 0, len = str.length; i < len; i++) {
        c = str.charCodeAt(i)
        if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
          count += 1
        } else {
          count += 2
        }
      }
      return count
    }
  },
  watch: {
    // 'itemDetail.kind': function (val) {
    'itemDetail.kind': function (val, old) {
      // KSD V001.000 AS
      if (val === 3 || val === 4) {
        this.transactionNoLower = '0'
        this.transactionNoUpper = '0'
      }
      // KSD V001.000 AE
      if (this.initFlag === true || typeof old === 'undefined') {
        this.initFlag = false
      } else {
        this.itemDetail.preset = null
      }
      this.presetErrorMsg = ''
      switch (val) {
        case 1: // 割引き
          this.presetPlaceholder = this.$i18n.t('O00004.S074')
          break
        case 2: // 売価変更
        case 0: // 値引き
        default:
          this.presetPlaceholder = this.$i18n.t('O00004.S073')
          break
      }
    },
    'itemDetail.preset': function (newValue) {
      let maxLen = 7
      // this.presetErrorMsg = ''
      switch (this.itemDetail.kind) {
        case 0: // 値引き
          break
        case 1: // 割引き
          maxLen = 3
          // if (newValue > 100) {
          //  this.presetErrorMsg = this.presetErrorMsgStr
          // }
          break
        case 2: // 売価変更
          break
      }
      // if (newValue) {
      if (typeof newValue !== 'undefined' && newValue !== '' && newValue !== null) {
        if (maxLen < this.getLen(newValue)) {
          newValue = newValue.substring(0, maxLen)
        }
        //        this.itemDetail.preset = newValue.replace(/\D/g, '')
        this.itemDetail.preset = newValue.toString().replace(/\D/g, '')
      }
    },
    transactionNoUpper: function (val) {
      let trNo = '00'
      //      if (val) {
      //        this.transactionNoUpper = val.replace(/\D/g, '')
      if (typeof val !== 'undefined' && val !== null && val !== '') {
        this.transactionNoUpper = val.toString().replace(/\D/g, '')
        trNo = this.transactionNoUpper.slice(-1) + this.transactionNoLower
      }
      if (val - 0) {
        // this.trNoPlaceholder = ''
        this.itemDetail.transactionNo = this.transactionNoBefore + trNo + this.transactionNoAfter
      // } else {
      //  this.trNoPlaceholder = this.$i18n.t('O00004.S075')
      }
      //      if (this.itemDetail.transactionNo - 0) {
      //        this.transactionNoErrorMsg = ''
      //      }
    },
    transactionNoLower: function (val) {
      let trNo = '00'
      // if (val) {
      //  this.trNoPlaceholder = ''
      if (typeof val !== 'undefined' && val !== null && val !== '') {
        this.transactionNoLower = val.toString().replace(/\D/g, '')
        this.transactionNoLower = val.replace(/\D/g, '')
        trNo = this.transactionNoUpper + this.transactionNoLower.slice(-1)
      }
      if (val - 0) {
        // this.trNoPlaceholder = ''
        this.itemDetail.transactionNo = this.transactionNoBefore + trNo + this.transactionNoAfter
      // } else {
      //  this.trNoPlaceholder = this.$i18n.t('O00004.S075')
      }
      //      if (this.itemDetail.transactionNo - 0) {
      //        this.transactionNoErrorMsg = ''
      //      }
    }
  },
  computed: {
    transactionNoBefore: function () {
      let retVal = '000'
      // if (this.itemDetail.transactionNo) {
      //  retVal = this.itemDetail.transactionNo.toString().padStart(6, '0').substring(0, 3)
      // }
      // return retVal
      // },
      // transactionNoAfter: function () {
      //  let retVal = '0'
      //  if (this.itemDetail.transactionNo) {
      //    retVal = this.itemDetail.transactionNo.toString().padStart(6, '0').slice(-1)
      switch (this.itemDetail.kind) {
        case 1: // 割引き
          retVal = '201'
          break
        case 2: // 売価変更
          retVal = '203'
          break
        case 0: // 値引き
        default:
          retVal = '202'
          break
      }
      return retVal
    }
  },
  created () {
    this.fetchConfig()
  }
}
