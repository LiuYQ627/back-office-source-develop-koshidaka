// KSD V001.000 AS
export default {
  name: 'RoomInfoMasterSettingList',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    tableMasterList: {
      type: Array,
      default: () => []
    },
    roomMasterList: {
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
    tableDataModel () {
      const vue = this
      // 「1」～「300」昇順で固定表示する。
      return [...Array(300).keys()].map(x => {
        const table = vue.tableMasterList && vue.tableMasterList.length > 0
          ? vue.tableMasterList.find(y => y.indexNo === (x + 1))
          : null
        const room = vue.roomMasterList && vue.roomMasterList.length > 0
          ? vue.roomMasterList.find(y => y.indexNo === (x + 1))
          : null
        return {
          indexNo: x + 1,
          table: table != null && room != null ? table : null,
          room: table != null && room != null ? room : null,
          isCreate: table == null || room == null
        }
      })
    }
  },
  methods: {
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
        let masterTableDataModel = this.tableDataModel.slice()
        let isRangeSelect = false
        masterTableDataModel.forEach(masterRowDataModel => {
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