// KSD V001.000 AS
export default {
  name: 'OptionMasterSettingList',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    optionMasterList: {
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
      selectedDrinkCourseNo: this.value
    }
  },
  computed: {
    tableDataModel () {
      const vue = this
      // 「1」～「30」昇順で固定表示する。
      return [...Array(30).keys()].map(x => {
        const option = vue.optionMasterList && vue.optionMasterList.length > 0
          ? vue.optionMasterList.find(y => y.drinkCourseNo === (x + 1))
          : null
        return {
          drinkCourseNo: x + 1,
          option: option,
          isCreate: option == null
        }
      })
    }
  },
  methods: {
    clickSelectedRow (rowDataModel, isCtrl) {
      let isSelected = this.selectedDrinkCourseNo.indexOf(rowDataModel.drinkCourseNo) !== -1
      if (!this.isMultiMode || !isCtrl) {
        this.selectedDrinkCourseNo = []
      }
      if (isSelected && isCtrl && this.isMultiMode) {
        this.selectedDrinkCourseNo.splice(this.selectedDrinkCourseNo.indexOf(rowDataModel.drinkCourseNo), 1)
      } else {
        this.selectedDrinkCourseNo.push(rowDataModel.drinkCourseNo)
      }
      this.$emit('input', this.selectedDrinkCourseNo)
      if (this.selectedDrinkCourseNo && this.selectedDrinkCourseNo.length > 0) {
        const selectedDataModel = this.tableDataModel.find(x => x.drinkCourseNo === this.selectedDrinkCourseNo[0])
        this.$emit('selectionChanged', selectedDataModel)
      } else {
        this.$emit('selectionChanged', null)
      }
    },
    clickSelectedRowWithShift (rowDataModel, isCtrl) {
      if (!this.isMultiMode) {
        this.selectedDrinkCourseNo = []
        this.selectedDrinkCourseNo.push(rowDataModel.drinkCourseNo)
        return
      }
      if (this.selectedDrinkCourseNo.length === 0) {
        this.selectedDrinkCourseNo.push(rowDataModel.drinkCourseNo)
      } else {
        if (this.selectedDrinkCourseNo.includes(rowDataModel.drinkCourseNo)) {
          return
        }
        let basePointSelectedDrinkCourseNo = -1
        if (isCtrl) {
          basePointSelectedDrinkCourseNo = this.selectedDrinkCourseNo.pop()
        } else {
          basePointSelectedDrinkCourseNo = this.selectedDrinkCourseNo.shift()
          this.selectedDrinkCourseNo = []
        }
        let masterTableDataModel = this.tableDataModel.slice()
        let isRangeSelect = false
        masterTableDataModel.forEach(masterRowDataModel => {
          if (masterRowDataModel.name === basePointSelectedDrinkCourseNo || masterRowDataModel.name === rowDataModel.drinkCourseNo) {
            isRangeSelect = !isRangeSelect
            if (!isRangeSelect) {
              this.selectedDrinkCourseNo.push(masterRowDataModel.name)
            }
          }
          if (isRangeSelect) {
            this.selectedDrinkCourseNo.push(masterRowDataModel.name)
          }
        })
      }
      this.$emit('input', this.selectedDrinkCourseNo)
      if (this.selectedDrinkCourseNo && this.selectedDrinkCourseNo.length > 0) {
        const selectedDataModel = this.tableDataModel.find(x => x.drinkCourseNo === this.selectedDrinkCourseNo[0])
        this.$emit('selectionChanged', selectedDataModel)
      } else {
        this.$emit('selectionChanged', null)
      }
    }
  },
  watch: {
    value (value) {
      this.selectedDrinkCourseNo = value
    }
  }
}
// KSD V001.000 AE
