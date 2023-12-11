// KSD V001.000 AS
import moment from 'moment'
export default {
  name: 'CourseMasterSettingList',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    courseMasterList: {
      type: Array,
      default: () => []
    },
    isMultiMode: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedIndexNo: this.value
    }
  },
  computed: {
    courseDataModel () {
      const vue = this
      // 「1」～「20」昇順で固定表示する。
      return [...Array(20).keys()].map(x => {
        const course = vue.courseMasterList && vue.courseMasterList.length > 0
          ? vue.courseMasterList.find(y => y.chargeCode === (x + 1))
          : null
        return {
          indexNo: x + 1,
          course: course != null ? course : null,
          isCreate: course != null
        }
      })
    }
  },
  methods: {
    dateInRange (startDate, endDate) {
      const curr = new Date()
      const start = new Date(startDate)
      const end = new Date(endDate)
      return !(start !== curr && end !== curr) || (curr <= end && curr >= start) 
    },
    clickSelectedRow (rowDataModel, isCtrl) {
      let isSelected = this.selectedIndexNo.indexOf(rowDataModel.indexNo) !== -1
      if (!this.isMultiMode || !isCtrl) {
        this.selectedIndexNo = []
      }
      if (isSelected && isCtrl && this.isMultiMode) {
        this.selectedIndexNo.splice(this.selectedIndexNo.indexOf(rowDataModel.indexNo), 1)
      } else {
        this.selectedIndexNo.push(rowDataModel.indexNo)
      }
      this.$emit('input', this.selectedIndexNo)
      if (this.selectedIndexNo && this.selectedIndexNo.length > 0) {
        const selectedDataModel = this.courseDataModel.find(x => x.indexNo === this.selectedIndexNo[0])
        this.$emit('selectionChanged', selectedDataModel)
      } else {
        this.$emit('selectionChanged', null)
      }
    },
    clickSelectedRowWithShift (rowDataModel, isCtrl) {
      if (!this.isMultiMode) {
        this.selectedIndexNo = []
        this.selectedIndexNo.push(rowDataModel.indexNo)
        return
      }
      if (this.selectedIndexNo.length === 0) {
        this.selectedIndexNo.push(rowDataModel.indexNo)
      } else {
        if (this.selectedIndexNo.includes(rowDataModel.indexNo)) {
          return
        }
        let basePointSelectedIndexNo = -1
        if (isCtrl) {
          basePointSelectedIndexNo = this.selectedIndexNo.pop()
        } else {
          basePointSelectedIndexNo = this.selectedIndexNo.shift()
          this.selectedIndexNo = []
        }
        let masterCourseDataModel = this.courseDataModel.slice()
        let isRangeSelect = false
        masterCourseDataModel.forEach(masterRowDataModel => {
          if (masterRowDataModel.name === basePointSelectedIndexNo || masterRowDataModel.name === rowDataModel.indexNo) {
            isRangeSelect = !isRangeSelect
            if (!isRangeSelect) {
              this.selectedIndexNo.push(masterRowDataModel.name)
            }
          }
          if (isRangeSelect) {
            this.selectedIndexNo.push(masterRowDataModel.name)
          }
        })
      }
      this.$emit('input', this.selectedIndexNo)
      if (this.selectedIndexNo && this.selectedIndexNo.length > 0) {
        const selectedDataModel = this.courseDataModel.find(x => x.indexNo === this.selectedIndexNo[0])
        this.$emit('selectionChanged', selectedDataModel)
      } else {
        this.$emit('selectionChanged', null)
      }
    },
    formatDateToRead(date) {
      return date !== '' ? moment(date).format('YYYY/MM/DD') : ''
    }
  },
  watch: {
    value (value) {
      this.selectedIndexNo = value
    }
  }
}
// KSD V001.000 AE