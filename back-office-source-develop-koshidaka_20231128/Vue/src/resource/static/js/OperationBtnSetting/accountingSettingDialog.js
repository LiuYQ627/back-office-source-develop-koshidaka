import popup from '@/resource/templates/CommonDesign/Popup'

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221222 duyouwei(Neusoft)  G001.00.0  issue課題#1161,#1204を対応します.
 * 20230113 bai.ry(Neusoft)  G002.00.0  issue課題#1370を対応します.
 * 20230412 bai.ry(Neusoft)  G003.00.0  issue課題#1452を対応します.
 * 20230425 dingxin(Neusoft)   G004.00.0  issue課題#1662を対応します.
 * 20231018 hql(Neusoft)       G005.00.0  issue課題#1194を対応します.
 */

export default {
  props: {
    mediaList: {
      type: Array,
      required: true,
      default: []
    }
  },
  data () {
    return {
      // G004.00.0 Add-Start
      permissions: [],
      // G004.00.0 Add-End
      config: {},
      displayed: false,
      index: 0,
      setting: {
        displayName: {}
      },
      // G001.00.0 Add-Start
      nameDisable: false,
      kindErrorMsg: '',
      nameErrorMsg: '',
      paymentTypeErrorMsg: ''
      // G001.00.0 Add-End
    }
  },
  components: {
    popup
  },
  methods: {
    // G003.00.0 Add-Start
    getNameFromSetting (paymentType) {
      if (paymentType) {
        const media = this.mediaList.find(item => item.key === paymentType)
        return media.displayName.default
      } else {
        return ''
      }
    },
    // G003.00.0 Add-End
    fetchConfig () {
      this.config = require('./_config.json')
    },
    // G004.00.0 Update-Start
    // async open (setting, index) {
    async open (permissions, setting, index) {
      this.permissions = permissions
      // G004.00.0 Update-End
      this.setting = {
        displayName: {
          default: null
        },
        ...setting
      }
      this.index = index
      this.cancelErrorMsg()
      this.displayed = true
    },
    // G001.00.0 Add-Start
    cancelErrorMsg () {
      this.kindErrorMsg = ''
      this.nameErrorMsg = ''
      this.paymentTypeErrorMsg = ''
    },
    // G005.00.0 Update-Start
    // nameInput () {
    nameInput (setting, maxLength) {
      const str = setting.displayName.default
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
          setting.displayName.default = str.toString().substring(0, i)
          break
        } else {
          // maxLength以下は何もしない
        }
      }
      // G005.00.0 Update-End
      //      if (this.setting.kind != 1 && (this.setting.displayName.default === '' || this.setting.displayName.default == null)) {
      // STEP1 V001.000 DS
      // if (this.setting.kind !== 1 && (this.setting.displayName.default === '' || this.setting.displayName.default == null)) {
      //   this.nameErrorMsg = this.$i18n.t('O00004.W014')
      //      }else{
      //        this.nameErrorMsg = '';
      // }
      // STEP1 V001.000 DE
    },
    // G001.00.0 Add-End
    onClickReturn () {
      // G001.00.0 Update-Start
      //      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false;this.cancelErrorMsg();}, false, null)
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => {
        this.displayed = false
        this.cancelErrorMsg()
      }, false, null)
      // G001.00.0 Update-End
    },
    onClickSave () {
      // G001.00.0 Add-Start
      if (this.setting.kind === '' || this.setting.kind === null) {
        this.kindErrorMsg = this.$i18n.t('O00004.W014')
        return
        //      }
        //      if (this.setting.kind !== 1 && (this.setting.displayName.default === '' || this.setting.displayName.default == null)) {
      } else if (this.setting.kind && (this.setting.paymentType === '' || this.setting.paymentType === null)) {
        this.paymentTypeErrorMsg = this.$i18n.t('O00004.W014')
        return
      } else if (this.setting.kind !== 1 && (this.setting.displayName.default === '' || this.setting.displayName.default == null)) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
        this.nameErrorMsg = this.$i18n.t('O00004.W014')
        return
      }
      //      if (this.setting.kind === 1 && (this.setting.paymentType=== '' || this.setting.paymentType === null)) {
      //        this.paymentTypeErrorMsg = this.$i18n.t('O00004.W014')
      //        return
      //      }
      // G001.00.0 Add-End
      this.displayed = false
      //      // G002.00.0 Add-Start
      //      delete this.setting.displayName
      //      // G002.00.0 Add-End
      if (this.setting.kind) {
        delete this.setting.displayName
      } else {
        delete this.setting.paymentType
      }
      this.$emit('clickSave', this.setting, this.index)
    },
    // G001.00.0 Add-Start
    mediaChange (event) {
      // G003.00.0 Add-Start
      this.setting = Object.assign({}, this.setting)
      // G003.00.0 Add-End
      // STEP1 V001.000 DS
      // this.paymentTypeErrorMsg = ''
      // STEP1 V001.000 DE
      // G002.00.0 Delete-Start
      // const media = this.mediaList.find(item => item.key === event.target.value)
      // if (media) {
      //   this.setting.displayName.default = media.displayName.default
      // }
      // G002.00.0 Delete-End
    },
    kindChange (event) {
      // G001.00.0 Add-Start
      this.cancelErrorMsg()
      // G001.00.0 Add-End
      this.setting.paymentType = null
      this.setting.displayName.default = null
      if (event.target.value === '1') {
        this.nameDisable = true
      } else {
        this.nameDisable = false
      }
    }
    // G001.00.0 Add-End
  },
  created () {
    this.fetchConfig()
  }
}
