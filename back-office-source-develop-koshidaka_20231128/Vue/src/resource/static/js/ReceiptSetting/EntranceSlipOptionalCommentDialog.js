/* KSD V001.000 AS */
import Popup from '@/resource/templates/CommonDesign/Popup'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'

export default {
  name: 'EntranceSlipOptionalCommentDialog',
  data () {
    return {
      permissions: [],
      optionalCommentMessageDisplayed: false,
      params: {},
      optionalComment: {
        optionalCommentMessage_1: '',
        optionalCommentMessage_2: '',
        optionalCommentMessage_3: '',
        optionalCommentMessage_4: '',
        optionalCommentMessage_5: ''
      },
      timeout: null
    }
  },
  components: {
    Popup,
    RadioButton
  },
  methods: {
    open (setting) {
      this.params = JSON.parse(JSON.stringify(setting))
      const optionalCommentList = this.params.optionalComment
      if (optionalCommentList.length) {
        for (let ctr = 0; ctr < optionalCommentList.length; ctr++) {
          this.optionalComment[`optionalCommentMessage_${ctr + 1}`] = optionalCommentList[ctr]
        }
      }
      this.optionalCommentMessageDisplayed = true
      this.timeout = setTimeout(() => {
        document.getElementById('optionalCommentMessage_1').focus()
      }, 0)
    },
    closeDialog () {
      clearTimeout(this.timeout)
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.optionalCommentMessageDisplayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', {
        ...this.params,
        optionalComment: [
          this.optionalComment.optionalCommentMessage_1,
          this.optionalComment.optionalCommentMessage_2,
          this.optionalComment.optionalCommentMessage_3,
          this.optionalComment.optionalCommentMessage_4,
          this.optionalComment.optionalCommentMessage_5
        ]
      })
      this.optionalCommentMessageDisplayed = false
    },
    inputLimit (str, maxLength) {
      if (str == null) return
      const strLen = str.toString().length
      let byteLen = 0
      for (let i = 0; i < strLen; i++) {
        const codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
          (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        if (byteLen > maxLength) {
          if (this.optionalComment.optionalCommentMessage_1 === str) {
            this.optionalComment.optionalCommentMessage_1 = str.toString().substring(0, i)
          } else if (this.optionalComment.optionalCommentMessage_2 === str) {
            this.optionalComment.optionalCommentMessage_2 = str.toString().substring(0, i)
          } else if (this.optionalComment.optionalCommentMessage_3 === str) {
            this.optionalComment.optionalCommentMessage_3 = str.toString().substring(0, i)
          } else if (this.optionalComment.optionalCommentMessage_4 === str) {
            this.optionalComment.optionalCommentMessage_4 = str.toString().substring(0, i)
          } else if (this.optionalComment.optionalCommentMessage_5 === str) {
            this.optionalComment.optionalCommentMessage_5 = str.toString().substring(0, i)
          }
          break
        }
      }
    }
  },
  mounted () {
    this.$root.$once('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
}
/* KSD V001.000 AE */
