// KSD V001.000 AS
const errorMappingUtils = {
  methods: {
    async openPopupDialog ({
      mode = 1,
      title = '',
      messageCode = null,
      message = null,
      code = '',
      showBackBtn = false,
      okBtnCallback = null,
      isNonDispStatus = false,
      backBtnCallback = null
    } = {}) {
      if (messageCode !== null && message === null) {
        message = this.$i18n.t(messageCode)
      }
      await this.$refs.pop.open(mode, title, message, code, showBackBtn, okBtnCallback, isNonDispStatus, backBtnCallback)
    },
    globalErrorMapping (result) {
      switch (result.code) {
        case -90:
          this.openPopupDialog({
            mode: 2,
            message: this.$i18n.t('O00004.W008'),
            code: result.code,
            okBtnCallback: () => {
              this.$router.push('/LoginPage')
            }
          })
          break
        default:
          this.openPopupDialog({
            mode: 3,
            message: result.errorMessageMap['global'] ? result.errorMessageMap['global'].toString() : this.$i18n.t('O00004.W010'),
            code: result.errorMessageMap['global'] ? result.code : ''
          })
          break
      }
    },
    handleError (value, handlingOptions) {
      // TODO
    },
    globalErrorMapping2 (result, customMsg = null, okCallback = null) {
      switch (result.code) {
        case -90:
          this.openPopupDialog({
            mode: 2,
            message: this.$i18n.t('O00004.W008'),
            code: result.code,
            okBtnCallback: () => {
              this.$router.push('/LoginPage')
            }
          })
          break
        default:
          let { code, message } = this.mapErrorMessage(result)
          if (customMsg !== null) {
            code = result.code
            message = customMsg
          }
          this.openPopupDialog({
            mode: 3,
            message: message,
            code: code,
            okBtnCallback: okCallback === null ? null : okCallback
          })
          break
      }
    },
    mapErrorMessage (result) {
      const errorMsgMap = (result && result.errorMessageMap) || null
      if (errorMsgMap === null || errorMsgMap['global'] === null || !('global' in result.errorMessageMap)) {
        return { code: '', message: this.$i18n.t('O00004.W010') }
      } else {
        return { code: result.code, message: errorMsgMap['global'].toString() }
      }
    }
  }
}

export default errorMappingUtils
// KSD V001.000 AE
