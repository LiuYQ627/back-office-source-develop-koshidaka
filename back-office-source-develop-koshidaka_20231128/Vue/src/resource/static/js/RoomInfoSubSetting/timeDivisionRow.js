//  KSD V001.000 AS
import TimeTextInput from '@/resource/templates/RoomInfoSubSetting/TimeTextInput'
export default {
  name: 'TimeDivisionRow',
  components: {
    TimeTextInput
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: {
        applyingTime: {
          start: '',
          end: ''
        },
        minCount: ''
      }
    },
    divLabel: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dataModel: this.value,
      noValueOnSave: false
    }
  },
  methods: {
    reassignStartTime (val) {
      this.dataModel.applyingTime.start = val
    },

    reassignEndTime (val) {
      this.dataModel.applyingTime.end = val
    }
  },
  computed: {
    invalidNum () {
      if (this.dataModel.minCount !== '' || this.dataModel.minCount === undefined) {
        const number = parseInt(this.dataModel.minCount)
        return isNaN(number) || number < 0 || number > 100
      }
      return false
    }
  },
  watch: {
    value: function (newVal) {
      this.dataModel = newVal
    },
    'dataModel.minCount': function (newVal, oldVal) {
      const cleaned = parseInt(String(newVal).replace(/[^0-9]/g, ''))

      if (cleaned > 100) {
        this.dataModel.minCount = oldVal
      } else this.dataModel.minCount = (isNaN(cleaned) || cleaned === 0) ? '' : cleaned
    }
  }
}
//  KSD V001.000 AE
