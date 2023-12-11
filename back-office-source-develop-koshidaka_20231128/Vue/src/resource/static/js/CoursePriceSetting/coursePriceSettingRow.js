// KSD V001.000 AS
import NumericTimeInput from '@/resource/templates/CommonInput/NumericTimeInput'
import PriceInput from '@/resource/templates/CommonInput/PriceInput'
import CheckboxInput from '@/resource/templates/CommonInput/CheckboxInput'
import validationUtils from '../Common/validationUtils'

const DEFAULT_DATA_MODEL = {
  priceApplyingTime: {
    start: null,
    end: null
  },
  displayTime: {
    start: null,
    end: null
  },
  courseEndTime: {
    start: null,
    end: null
  },
  nextDayFlag: false,
  base: {
    room: null,
    drink: null
  },
  extend: {
    room: null,
    drink: null
  }
}

const HEADING_LABEL = [
  ['C00211.S014', 'C00211.S015', 'C00211.S018', 'C00211.S020'],
  ['C00211.S021', 'C00211.S022', 'C00211.S023', 'C00211.S024'],
  ['C00211.S025', 'C00211.S026', 'C00211.S027', 'C00211.S028'],
  ['C00211.S029', 'C00211.S030', 'C00211.S031', 'C00211.S032']
]

export default {
  name: 'CoursePriceSettingRow',
  mixins: [validationUtils],
  props: {
    value: {
      type: Object,
      default: null
    },
    indexNo: {
      type: Number,
      default: 0
    },
    payType: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearOnDisabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL)),
      validations: {
        priceApplyingTime: {
          start: [['required'], ['minlength', 4], ['maxlength', 4], ['numericTime']],
          end: [['required'], ['minlength', 4], ['maxlength', 4], ['numericTime']]
        },
        displayTime: {
          start: [['required'], ['minlength', 4], ['maxlength', 4], ['numericTime']],
          end: [['required'], ['minlength', 4], ['maxlength', 4], ['numericTime']]
        },
        nextDayFlag: [['required'], ['boolean']],
        base: {
          room: [['required'], ['range', 0, 99999], ['numeric'], ['integer']],
          drink: [['required'], ['range', 0, 99999], ['numeric'], ['integer']]
        },
        extend: {
          room: [['required'], ['range', 0, 99999], ['numeric'], ['integer']],
          drink: [['required'], ['range', 0, 99999], ['numeric'], ['integer']]
        }
      },
      validations2: {
        courseEndTime: {
          end: [['required'], ['minlength', 4], ['maxlength', 4], ['numericTime']]
        }
      },
      basePriceTotal: null,
      extendPriceTotal: null
    }
  },
  components: {
    NumericTimeInput,
    PriceInput,
    CheckboxInput
  },
  computed: {
    isDisabled () {
      return this.value === null
    }
  },
  methods: {
    getLabel (labelIndex) {
      return this.indexNo <= HEADING_LABEL.length
        ? (
          labelIndex < HEADING_LABEL[this.indexNo - 1].length
            ? this.$i18n.t(HEADING_LABEL[this.indexNo - 1][labelIndex])
            : ''
        )
        : ''
    },
    isBlank () {
      return this.dataModel.priceApplyingTime.start === '0000' &&
        this.dataModel.priceApplyingTime.end === '0000' &&
        this.dataModel.displayTime.start === '0000' &&
        this.dataModel.displayTime.end === '0000'
    },
    isDefaultPrice () {
      return this.dataModel.base.room === '0' &&
        this.dataModel.base.drink === '0' &&
        this.dataModel.extend.room === '0' &&
        this.dataModel.extend.drink === '0'
    },
    isCourseEndTimeBlank () {
      return this.dataModel.courseEndTime.end === '0000'
    },
    isNextDayFlag () {
      return this.dataModel.nextDayFlag
    },
    validateForm () {
      if (!this.isBlank() || !this.isDefaultPrice()) {
        this.validate(this.dataModel, this.validations)
      }
      const validation1Result = this.validationErrors && this.validationErrors.size <= 0
      if (validation1Result !== true) {
        return validation1Result
      }
      if (this.payType !== 1) {
        this.validate(this.dataModel, this.validations2)
        const validation2Result = this.validationErrors && this.validationErrors.size <= 0
        if (validation2Result !== true) {
          return validation2Result
        }
      }
      const validation3Result = this.validationErrors && this.validationErrors.size <= 0
      if (validation3Result !== true) {
        return validation3Result
      }
      return true
    },
    setValidationError (key, value) {
      this.validationErrors.set(key, value)
      this.$forceUpdate()
    },
    clearValidationErrors () {
      this.validationErrors.clear()
      this.$forceUpdate()
    },
    hasError (key) {
      return this.validationErrors && this.validationErrors.has(key)
    },
    getTimeRanges () {
      return [
        [this.dataModel.priceApplyingTime.start, this.dataModel.priceApplyingTime.end],
        [this.dataModel.displayTime.start, this.dataModel.displayTime.end],
        [this.dataModel.courseEndTime.end]
      ]
    },
    validateTimeRanges () {
      const unsetValue = ['0000', '0000'].toString()
      const timeRanges = this.getTimeRanges()
      const applyTimeRange = timeRanges[0]
      const displayTimeRange = timeRanges[1]
      let result = true
      const error = ['time-range-error']
      //  未使用設定チェック
      if (applyTimeRange.toString() !== unsetValue && displayTimeRange.toString() === unsetValue) {
        this.setValidationError('priceApplyingTime.start', error)
        this.setValidationError('priceApplyingTime.end', error)
        result = false
      }
      if (displayTimeRange.toString() !== unsetValue && applyTimeRange.toString() === unsetValue) {
        this.setValidationError('displayTime.start', error)
        this.setValidationError('displayTime.end', error)
        result = false
      }
      // 時刻重複チェック２
      if (applyTimeRange[0] > applyTimeRange[1]) {
        this.setValidationError('priceApplyingTime.start', error)
        this.setValidationError('priceApplyingTime.end', error)
        result = false
      }
      if (displayTimeRange[0] > displayTimeRange[1]) {
        this.setValidationError('displayTime.start', error)
        this.setValidationError('displayTime.end', error)
        result = false
      }
      return result
    },
    getTotalBasePrice (data) {
      this.basePriceTotal = data.room + data.drink
    },
    getTotalExtendPrice (data) {
      this.extendPriceTotal = data.room + data.drink
    }
  },
  watch: {
    value (value) {
      if (value === null || value === undefined) {
        this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
      } else {
        this.dataModel = value
      }
    },
    dataModel (value) {
      this.getTotalBasePrice(value.base)
      this.getTotalExtendPrice(value.extend)
      this.$emit('input', value)
    }
  }
}
// KSD V001.000 AE
