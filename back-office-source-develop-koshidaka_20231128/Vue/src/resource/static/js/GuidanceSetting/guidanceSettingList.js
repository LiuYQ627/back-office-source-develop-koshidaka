// KSD V001.000 AS
export default {
  name: 'GuidanceSettingList',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    guidanceSettingList: {
      type: Array,
      default: () => []
    },
    selectDataOption: {
      type: Number
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
    tableDataModel () {
      const vue = this
      // 「1」～「300」昇順で固定表示する。
      return [...Array(450).keys()].map(x => {
        const guidanceSetting = vue.guidanceSettingList && vue.guidanceSettingList.length > 0
          ? vue.guidanceSettingList.find(y => y.ScpNo === (x + 1))
          : null
        return {
          indexNo: x + 1,
          guidanceSetting: guidanceSetting || {
            ScpNo: x + 1,
            GidName: '',
            MinQty: 0,
            MaxQty: 1,
            MenuCodes: []
          },
          isCreate: guidanceSetting == null
        }
      }).filter(({ indexNo }) => {
        if (this.selectDataOption === 1) return true
        let val = (indexNo % 150)
        val = val === 0 ? 150 : val
        const range = [35, 40, 50, 100, 150]
        const min = this.selectDataOption === 2 ? 0 : range[this.selectDataOption - 3]
        const max = range[this.selectDataOption - 2]
        return ((min < val && val <= max))
      })
    }
  },
  methods: {
    clickSelectedRow (rowDataModel, isCtrl) {
      const isSelected = this.selectedIndexNo.indexOf(rowDataModel.indexNo) !== -1
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
        const selectedDataModel = this.tableDataModel.find(x => x.indexNo === this.selectedIndexNo[0])
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
        const masterGuidanceDataModel = this.guidanceSettingList.slice()
        let isRangeSelect = false
        masterGuidanceDataModel.forEach(masterRowDataModel => {
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
        const selectedDataModel = this.tableDataModel.find(x => x.indexNo === this.selectedIndexNo[0])
        this.$emit('selectionChanged', selectedDataModel)
      } else {
        this.$emit('selectionChanged', null)
      }
    }
  },
  watch: {
    value (value) {
      this.selectedIndexNo = value
    }
  }
}
// KSD V001.000 AE
