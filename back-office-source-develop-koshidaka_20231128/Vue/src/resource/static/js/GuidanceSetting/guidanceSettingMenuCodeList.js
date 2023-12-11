// KSD V001.000 AS
export default {
  name: 'GuidanceSettingMenuCodeList',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    menuCodeList: {
      type: Array,
      default: () => []
    },
    globalMenuCodeList: {
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
      const DEFAULT_MENU_CODE = { Code: null, Name2: null }
      return [...Array(32).keys()].map(x => {
        let menuCode = []
        if (Number(vue.menuCodeList[x]) === 0) {
          menuCode = DEFAULT_MENU_CODE
        } else {
          if (vue.globalMenuCodeList && vue.globalMenuCodeList.length > 0 && vue.menuCodeList[x]) {
            const isExist = vue.globalMenuCodeList.find(y => y.Code === vue.menuCodeList[x])
            menuCode = isExist ? isExist : {
              Code: vue.menuCodeList[x],
              Name2: ''
            }
          } else {
            menuCode = DEFAULT_MENU_CODE
          }
        }
        return {
          indexNo: x + 1,
          menuCode: menuCode
        }
      })
    }
  },
  methods: {
    drag (e, index) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('index', index)
      e.dataTransfer.setData('origin', 'local')
    },
    onDrop (e, index) {
      const transferIndex = e.dataTransfer.getData('index')
      const origin = e.dataTransfer.getData('origin')
      const menuCode = origin === 'global' ? this.globalMenuCodeList[transferIndex].Code : this.menuCodeList[transferIndex]
      const data = {
        menuCode: menuCode,
        position: index
      }
      if (origin === 'global') {
        this.$emit('addMenuCode', data)
      } else {
        this.$emit('moveMenuCode', data)
      }
    },
    clickSelectedRow (rowDataModel, isCtrl) {
      if (!rowDataModel.menuCode.Code) return
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
      if (!rowDataModel.menuCode.Code) return
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
