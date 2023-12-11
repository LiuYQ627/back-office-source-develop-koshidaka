// KSD V001.000 AS
export default {
  name: 'GuidanceSettingGlobalMenuCodeList',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    globalMenuCodeList: {
      type: Array,
      default: () => []
    },
    menuCodeList: {
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
      // 「1」～「30」昇順で固定表示する。
      return [...Array(3000).keys()].map(x => {
        const globalMenuCode = vue.globalMenuCodeList[x] ? vue.globalMenuCodeList[x] : { Code: null, Name2: null }
        return {
          indexNo: x + 1,
          globalMenuCode: globalMenuCode,
          selected: globalMenuCode.Code ? vue.menuCodeList.includes(vue.globalMenuCodeList[x].Code) : false
        }
      })
    }
  },
  methods: {
    drag (e, index) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('index', index)
      e.dataTransfer.setData('origin', 'global')
    },
    clickSelectedRow (rowDataModel, isCtrl) {
      if (!rowDataModel.globalMenuCode.Code) return
      if (rowDataModel.selected) return
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
      if (!rowDataModel.globalMenuCode.Code) return
      if (rowDataModel.selected) return
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
    },
    tableDataModel () {
      this.$emit('selectedMenuCodes', this.tableDataModel.filter((code) => code.selected).map((code) => code.globalMenuCode.Code))
    }
  }
}
// KSD V001.000 AE
