// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogRegisterSelect from '@/resource/templates/PosReport/RegisterSelectDialog'

const endpointPath = 'Audit/Endpoint'

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    targetStoreCodes: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showButtonOnDisabled: {
      type: Boolean,
      default: false
    },
    popup: {
      default: () => {}
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  mixins: [errorMappingUtils],
  data () {
    return {
      isShowDialog: false,
      masterData: []
    }
  },
  computed: {
    valueText () {
      return this.value.join(this.$i18n.t('F32231.S261'))
    }
  },
  components: {
    dialogRegisterSelect,
    popup
  },
  methods: {
    async openDialog () {
      this.masterData = await this.getRegisterIds()
      if (this.masterData) { this.isShowDialog = true }
    },
    async getRegisterIds () {
      try {
        const params = { nodeIds: this.targetStoreCodes }
        let ids = []
        const response = await axios.put(this.$i18n.t('prop.url') + endpointPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          for (var i = 0; i < response.data.responseModel.length; i++) {
            if (!ids.includes(response.data.responseModel[i].endpointId)) {
              ids.push(response.data.responseModel[i].endpointId)
            }
          }
        } else if (response.data.result.code === 2) {
        } else {
          this.globalErrorMapping(response.data.result)
          return false
        }
        this.registerSelectDisplayed = true
        return ids
      } catch (error) {
        this.popup.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
        return false
      }
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
          console.log(result)
          const { code, message } = this.mapErrorMessage(result)
          this.openPopupDialog({
            mode: 3,
            message: message,
            code: code
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
  },
  async created () {
    await this.$nextTick()
  },
  async mounted () {
  }
}
// KSD V001.000 AE
