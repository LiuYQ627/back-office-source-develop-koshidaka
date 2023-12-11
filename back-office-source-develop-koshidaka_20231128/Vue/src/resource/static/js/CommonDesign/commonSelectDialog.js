// KSD V001.000 AS
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import transformUtils from '@/resource/static//js/Common/transformUtils'


export default {
  props: {
    tableHeaderTitle: {
      type: String,
      required: false,
      default: ''
    },
    tableLeftUpperLabel: {
      type: String,
      required: false,
      default: ''
    },
    tableRightUpperLabel: {
      type: String,
      required: false,
      default: ''
    },
    tableLeftFirstTitle: {
      type: String,
      required: false,
      default: ''
    },
    tableLeftSecondTitle: {
      type: String,
      required: false,
      default: ''
    },
    tableRightFirstTitle: {
      type: String,
      required: false,
      default: ''
    },
    tableRightSecondTitle: {
      type: String,
      required: false,
      default: ''
    },
    enableSort: {
      type: Boolean,
      required: false,
      default: false
    },
    sortStyleLeft: {
      type: String,
      required: false,
      default: 'display'
    },
    sortStyleRight: {
      type: String,
      required: false,
      default: 'code'
    },
    sortCandidateKey: {
      type: String,
      required: false,
      default: 'code'
    },
    enableSortSelected: {
      type: Boolean,
      required: false,
      default: false
    },
    enableSortSelectedOnSave: {
      type: Boolean,
      required: false,
      default: false
    },
    sortSelectedKey: {
      type: String,
      required: false,
      default: 'code'
    },
    isRoomNo: {
      type: Boolean,
      required: false,
      default: false
    },
    maxOptionsDisplay: {
      type: Number,
      required: false,
      default: 0
    },
    maxSelect: {
      type: Number,
      required: false,
      default: 0
    },
    forceDisableSelectAll: {
      type: Boolean,
      required: false,
      default: false
    },
    firstColWidth: {
      type: String,
      required: false,
      default: '150px'
    },
    secondColWidth: {
      type: String,
      required: false,
      default: '310px'
    }
  },
  components: {
    popup,
    axios
  },
  mixins: [transformUtils],
  data () {
    return {
      dialog: false,
      dataList: [],
      selectedDataList: [],
      isMultiMode: false,
      tempCandidateDataList: [],
      tempselectedDataList: [],
      prevSelected: [],
      buttons: {
        isSaveButtonDisabled: false
      }
    }
  },
  computed: {
    onClickAllSelectedDisable () {
      return this.forceDisableSelectAll || !this.isMultiMode || this.getCandidateList.length === 0 || (this.maxSelect !== 0 && this.getCandidateList.length > this.maxSelect)
    },
    onClickSelectedDisable () {
      return this.getCandidateList.length === 0 || this.tempCandidateDataList.length === 0 || (this.maxSelect !== 0 && this.getSelectedList.length >= this.maxSelect)
    },
    onClickDeleteDisable () {
      return this.getSelectedList.length === 0 || this.tempselectedDataList.length === 0
    },
    onClickAllDeleteDisable () {
      return !this.isMultiMode || this.getSelectedList.length === 0
    },
    getSelectedList () {
      let vue = this
      let selectedDatas = []
      vue.selectedDataList.forEach((code) => {
        let data = this.dataList.find((value) => {
          return value.code === code
        })

        if (data !== undefined) {
          selectedDatas.push(data)
        }
      })
      if (this.enableSortSelected) {
        switch (this.sortStyleRight) {
          case 'display':
            selectedDatas = this.sortDisplayOrder(selectedDatas)
            break
          case 'key':
            selectedDatas = this.sortByKey(selectedDatas, this.sortSelectedKey)
            break
        }
      }
      return selectedDatas
    },
    getCandidateList () {
      let candidateDatas = this.dataList.slice()
      let vue = this
      candidateDatas = candidateDatas.filter((data) => {
        if (vue.selectedDataList.indexOf(data.code) !== -1) {
          return false
        }
        return true
      })
      if (this.enableSort) {
        switch (this.sortStyleLeft) {
          case 'display':
            candidateDatas = this.sortDisplayOrder(candidateDatas)
            break
          case 'key':
            candidateDatas = this.sortByKey(candidateDatas, this.sortCandidateKey)
            break
        }
      }
      return candidateDatas
    }
  },
  methods: {
    open (dataList, selectedDataList, isMultiMode, isSaveButtonDisabled = false) {
      this.dataList = dataList
      if (this.maxOptionsDisplay !== 0) {
        this.dataList.splice(this.maxOptionsDisplay)
      }
      this.selectedDataList = selectedDataList
      this.prevSelected = [...selectedDataList]
      this.isMultiMode = isMultiMode
      this.dialog = true
      this.buttons = {
        isSaveButtonDisabled: isSaveButtonDisabled
      }
      setTimeout(() => {
        let dialogButtons = document.getElementsByClassName('select-init-tab')
        for (let i = 0; i < dialogButtons.length; i++) {
          if (dialogButtons.item(i).getAttribute("disabled") === null){
            dialogButtons.item(i).focus()
            break
          }
       }
      }, 100)
    },
    clickCandidateRow (code, isCtrl) {
      let isSelected = this.tempCandidateDataList.indexOf(code) !== -1
      if (!this.isMultiMode || !isCtrl) {
        this.tempCandidateDataList = []
      }
      if (isSelected && isCtrl && this.isMultiMode) {
        this.tempCandidateDataList.splice(this.tempCandidateDataList.indexOf(code), 1)
      } else {
        this.tempCandidateDataList.push(code)
      }
    },
    clickCandidateRowWithShift (code, isCtrl) {
      if (!this.isMultiMode) {
        this.tempCandidateDataList = []
        this.tempCandidateDataList.push(code)
        return
      }
      if (this.tempCandidateDataList.length === 0) {
        this.tempCandidateDataList.push(code)
      } else {
        if (this.tempCandidateDataList.includes(code)) {
          return
        }
        let basePointSelectedStoreCode = -1
        if (isCtrl) {
          basePointSelectedStoreCode = this.tempCandidateDataList.pop()
        } else {
          basePointSelectedStoreCode = this.tempCandidateDataList.shift()
          this.tempCandidateDataList = []
        }

        if (this.getCandidateList.length === 0) {
          return
        }

        let master = this.getCandidateList.slice()
        let isRangeSelect = false
        master.forEach(data => {
          if (data.code === basePointSelectedStoreCode || data.code === code) {
            isRangeSelect = !isRangeSelect
            if (!isRangeSelect) {
              this.tempCandidateDataList.push(data.code)
            }
          }
          if (isRangeSelect) {
            this.tempCandidateDataList.push(data.code)
          }
        })
      }
    },
    clickSelectedRow (code, isCtrl) {
      let isSelected = this.tempselectedDataList.indexOf(code) !== -1
      if (!this.isMultiMode || !isCtrl) {
        this.tempselectedDataList = []
      }

      if (isSelected && isCtrl && this.isMultiMode) {
        this.tempselectedDataList.splice(this.tempselectedDataList.indexOf(code), 1)
      } else {
        this.tempselectedDataList.push(code)
      }
    },
    clickSelectedRowWithShift (code, isCtrl) {
      if (!this.isMultiMode) {
        this.tempselectedDataList = []
        this.tempselectedDataList.push(code)
        return
      }

      if (this.tempselectedDataList.length === 0) {
        this.tempselectedDataList.push(code)
      } else {
        if (this.tempselectedDataList.includes(code)) {
          return
        }
        let basePointSelectedStoreCode = -1
        if (isCtrl) {
          basePointSelectedStoreCode = this.tempselectedDataList.pop()
        } else {
          basePointSelectedStoreCode = this.tempselectedDataList.shift()
          this.tempselectedDataList = []
        }

        let master = this.getSelectedList.slice()
        // 範囲選択中フラグ
        let isRangeSelect = false
        master.forEach(data => {
          if (data.name === basePointSelectedStoreCode || data.code === code) {
            isRangeSelect = !isRangeSelect
            if (!isRangeSelect) {
              this.tempselectedDataList.push(data.code)
            }
          }
          if (isRangeSelect) {
            this.tempselectedDataList.push(data.code)
          }
        })
      }
    },
    changeGroup () {
      this.tempCandidateDataList = []
    },
    backFunction () {
      let sortedList = []
      this.prevSelected.forEach((code) => {
        let data = this.dataList.find((data) => {
          return data.code === code
        })
        if (data !== undefined) {
          sortedList.push(data.code)
        }
      })
      this.$emit('clickSubmit', sortedList)
      this.dialog = false
      this.init()
    },
    disableSave() {
      if (this.getSelectedList.length === 0  || this.buttons.isSaveButtonDisabled) {
        return true
      } else {
        return false
      }
    },
    exeFunction () {
      let selectedDatas = this.enableSortSelectedOnSave ? this.sortDisplayOrder(this.getSelectedList) : this.getSelectedList
      if (this.enableSortSelectedOnSave) {
        switch (this.sortStyleRight) {
          case 'display':
            selectedDatas = this.sortDisplayOrder(selectedDatas)
            break
          case 'key':
            selectedDatas = this.sortByKey(selectedDatas, this.sortSelectedKey)
            break
        }
      }
      let sortedList = []
      selectedDatas.forEach(data => {
        sortedList.push(data.code)
      })
      this.$emit('clickSubmit', sortedList)
      this.dialog = false
      this.init()
    },
    onClickAllSelected () {
      let candidateDatas = this.getCandidateList.slice()
      let vue = this
      candidateDatas.filter((data) => {
        return vue.selectedDataList.indexOf(data.code) === -1
      }).forEach(data => {
        vue.selectedDataList.push(data.code)
      })
      this.tempCandidateDataList = []
    },
    onClickSelected () {
      if (this.tempCandidateDataList.length === 0) {
        return
      }
      if (!this.isMultiMode) {
        this.selectedDataList = []
      }
      let vue = this
      if (this.isMultiMode) {
        this.tempCandidateDataList.forEach(code => {
          vue.selectedDataList.push(code)
        })
      } else {
        this.selectedDataList.push(this.tempCandidateDataList[0])
      }
      this.tempCandidateDataList = []
      if (!this.isMultiMode) {
        this.tempselectedDataList = []
      }
    },
    onClickAllDelete () {
      this.selectedDataList = []
      this.tempselectedDataList = []
    },
    onClickDelete () {
      if (this.tempselectedDataList.length === 0) {
        return
      }
      let vue = this
      let type = typeof vue.tempselectedDataList[0]
      let deletedselectedDataList = this.selectedDataList.filter(code => {
        return vue.tempselectedDataList.indexOf(type === 'string' ? code.toString() : code) === -1
      })
      this.selectedDataList = deletedselectedDataList
      this.tempselectedDataList = []
    },
    sortDisplayOrder (list) {
    return list.sort((a, b) => {
        if (a.displayOrder === 0) a.displayOrder = 1000
        if (b.displayOrder === 0) b.displayOrder = 1000

        if (a.displayOrder > b.displayOrder) return 1
        if (a.displayOrder < b.displayOrder) return -1

        if (a.name > b.name) return 1
        if (a.name < b.name) return -1

        return 0
      })
    },
    init () {
      this.dataList = []
      this.selectedDataList = []
      this.isMultiMode = false
      this.tempCandidateDataList = []
      this.tempselectedDataList = []
    }
  }
}
// KSD V001.000 AE
