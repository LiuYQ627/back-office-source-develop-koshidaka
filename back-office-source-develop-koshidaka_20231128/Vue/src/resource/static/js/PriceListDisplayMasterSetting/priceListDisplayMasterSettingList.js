// KSD V001.000 AS
import moment from 'moment'
export default {
  name: 'PriceListDisplayMasterSettingList',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    priceListDisplayMasterList: {
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
    priceListDisplayDataModel () {
      const vue = this
      return [...Array(20).keys()].map(x => {
        const priceList = vue.priceListDisplayMasterList && vue.priceListDisplayMasterList.length > 0
          ? vue.priceListDisplayMasterList.find(y => y.priceDispNo === (x + 1))
          : null
        return {
          indexNo: x + 1,
          priceList: priceList != null ? priceList : null,
          isCreate: priceList != null
        }
      })
    }
  },
  methods: {
    clickSelectedRow (rowDataModel, isCtrl) {
      let indexValidation = this.getIndexValidation()
      if (!indexValidation[rowDataModel.indexNo - 1]) return
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
        const selectedDataModel = this.priceListDisplayDataModel.find(x => x.indexNo === this.selectedIndexNo[0])
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
        const masterPriceListDisplayDataModel = this.priceListDisplayDataModel.slice()
        let isRangeSelect = false
        masterPriceListDisplayDataModel.forEach(masterRowDataModel => {
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
        const selectedDataModel = this.priceListDisplayDataModel.find(x => x.indexNo === this.selectedIndexNo[0])
        this.$emit('selectionChanged', selectedDataModel)
      } else {
        this.$emit('selectionChanged', null)
      }
    },
    formatDateToRead (date) {
      return date !== '' ? moment(date).format('YYYY/MM/DD') : ''
    },
    getIndexValidation () {
      let setEmptyRowValid = false
      let priceDispNos = []
      let validPriceDispNos = []
      let priceDispNo = this.priceListDisplayMasterList.length > 0 ? this.priceListDisplayMasterList[this.priceListDisplayMasterList.length - 1].priceDispNo : 0
      this.priceListDisplayMasterList.forEach(priceList => { validPriceDispNos.push(priceList.priceDispNo) })
      
      for (let i = 0; i < 20; i++) {
        if (i === 0 || validPriceDispNos.includes(i + 1)) {
          priceDispNos.push(true)
          if (!validPriceDispNos.includes(i + 1)) setEmptyRowValid = true
        } else if (i + 1 > priceDispNo) {
          if (!setEmptyRowValid) {
            priceDispNos.push(true)
            setEmptyRowValid = true
          } else {
            priceDispNos.push(false)
          }
        } else {
          if (validPriceDispNos.includes(i)) {
            if (!setEmptyRowValid) {
              priceDispNos.push(true)
              setEmptyRowValid = true
            } else {
              priceDispNos.push(false)
            }
          } else {
            priceDispNos.push(false)
          }
        }
      }
      return priceDispNos
    }
  },
  watch: {
    value (value) {
      this.selectedIndexNo = value
    }
  }
}
// KSD V001.000 AE
