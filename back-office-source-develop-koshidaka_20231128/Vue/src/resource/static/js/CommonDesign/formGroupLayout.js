// KSD V001.000 AS
import commonErrorMessageHandler from '@/resource/templates/CommonDesign/CommonErrorMessageHandler.vue'

export default {
  name: 'FormGroupLayout',
  props: {
    headerCols: {
      type: Number,
      default: 5
    },
    bodyCols: {
      type: Number,
      default: 7
    },
    title: {
      type: String,
      default: null
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: null
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    colSpacer: {
      type: Boolean,
      default: true
    },
    leftSpacing: {
      type: String,
      default: null
    },
    errorPadding: {
      type: String,
      default: 'padding: 5px 0px 15px 0;'
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    headerWidth: {
      type: Number,
      default: 200
    },
    headerHeight: {
      type: Number,
      default: null
    },
    errorRenderHTML: {
      type: Boolean,
      default: false
    }
  },
  components: {
    commonErrorMessageHandler
  }
}
// KSD V001.000 AE
