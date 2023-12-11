// KSD V001.000 AS
import moment from 'moment'
import TimeDivisionRow from '@/resource/templates/ComplianceInformationSetting/TimeDivisionRow'

const DEFAULT_TIME_RANGE_MODEL = {
  start: '0000',
  end: '0000'
}

const DEFAULT_TIME_SETTING_MODEL = {
  guardianTime: JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL)),
  under18Time: JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL)),
  under16Time: JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL))
}

export default {
  name: 'ComplianceInformationSettingTimeSetting',
  props: {
    dataModel: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      timeSettingDataModel: JSON.parse(JSON.stringify(DEFAULT_TIME_SETTING_MODEL)),
      focusItem: null,
      focusItemDup: null
    }
  },
  components: {
    TimeDivisionRow
  },
  methods: {
    validateTimeSettingDataModel () {
      const timePairs = this.timeDivisionsResetErrors()
      for (let i = 0; i < timePairs.length - 1; i = i + 2) {
        const startTime = timePairs[i]
        const endTime = timePairs[i + 1]
        const currentStartTime = this.getTimeAsInt(startTime.$refs.startTimeInput.time)
        const currentEndTime = this.getTimeAsInt(endTime.$refs.endTimeInput.time)
        if (isNaN(currentStartTime) && !isNaN(currentEndTime)) {
          startTime.$refs.startTimeInput.invalidTime = true
          this.focusItem = startTime.$refs.startTimeInput
          return true
        }
        if (isNaN(currentEndTime) && !isNaN(currentStartTime)) {
          endTime.$refs.endTimeInput.invalidTime = true
          this.focusItem = endTime.$refs.endTimeInput
          return true
        }
        if (isNaN(currentStartTime) && isNaN(currentEndTime)) {
          endTime.$refs.endTimeInput.invalidTime = true
          startTime.$refs.startTimeInput.invalidTime = true
          this.focusItem = endTime.$refs.startTimeInput
          this.focusItemDup = startTime.$refs.startTimeInput
          return true
        }
        if (currentStartTime === 0 && currentEndTime === 0) {
          endTime.$refs.endTimeInput.invalidTime = true
          this.focusItem = endTime.$refs.startTimeInput
          return true
        }
        if (currentStartTime >= currentEndTime &&
          (currentStartTime !== 0 && currentEndTime !== 0)) {
          endTime.$refs.endTimeInput.invalidTime = true
          this.focusItem = endTime.$refs.endTimeInput
          return true
        }
        if (currentStartTime > currentEndTime) {
          endTime.$refs.endTimeInput.invalidTime = true
          this.focusItem = endTime.$refs.endTimeInput
          return true
        }
      }
      return false
    },
    timeDivisionsResetErrors () {
      const timePairs = [
        this.$refs.guardianTimeStart,
        this.$refs.guardianTimeEnd,
        this.$refs.under18TimeStart,
        this.$refs.under18TimeEnd,
        this.$refs.under16TimeStart,
        this.$refs.under16TimeEnd
      ]
      for (let i = 0; i < timePairs.length - 1; i++) {
        timePairs[i].$refs.startTimeInput.invalidTime = false
        timePairs[i + 1].$refs.endTimeInput.invalidTime = false
      }
      return timePairs
    },
    getTimeAsInt (timeString) {
      const time = moment(timeString, 'HHmm')
      const minutesSinceMidnight = time.diff(moment().startOf('day'), 'minutes')
      return parseInt(minutesSinceMidnight)
    },
    isFocusItemDup () {
      return this.focusItemDup !== null
    }
  },
  watch: {
    dataModel: {
      handler (value) {
        if (this.dataModel.guardianTime == null) this.dataModel.guardianTime = JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL))
        if (this.dataModel.under18Time == null) this.dataModel.under18Time = JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL))
        if (this.dataModel.under16Time == null) this.dataModel.under16Time = JSON.parse(JSON.stringify(DEFAULT_TIME_RANGE_MODEL))
        this.timeSettingDataModel = JSON.parse(JSON.stringify(this.dataModel))
      },
      immediate: true,
      deep: true
    }
  }
}
// KSD V001.000 AE
