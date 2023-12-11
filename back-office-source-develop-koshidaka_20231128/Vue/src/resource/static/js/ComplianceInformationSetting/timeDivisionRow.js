//  KSD V001.000 AS
import TimeTextInput from '@/resource/templates/ComplianceInformationSetting/TimeTextInput'

export default {
  name: 'TimeDivisionRow',
  components: {
    TimeTextInput
  },
  props: {
    value: {
      type: Object,
      default: {
        start: '',
        end: ''
      }
    },
    div1Label: {
      type: String,
      default: ''
    },
    div2Label: {
      type: String,
      default: ''
    },
    displayDiv1: {
      type: Boolean,
      default: true
    },
    displayStartTime: {
      type: Boolean,
      default: null
    },
    displayEndTime: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      dataModel: this.value
    }
  },
  methods: {
    reassignStartTime (val) {
      this.dataModel.start = val
    },
    reassignEndTime (val) {
      this.dataModel.end = val
    }
  },
  watch: {
    value: function (newVal) {
      if (newVal != null) {
        this.dataModel = newVal
      }
    }
  }
}
//  KSD V001.000 AE
