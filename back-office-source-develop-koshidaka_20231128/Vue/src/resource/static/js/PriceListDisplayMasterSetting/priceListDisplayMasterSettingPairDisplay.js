// KSD V001.000 AS
import moment from 'moment'
export default {
  name: 'PriceListDisplayMasterSettingPairDisplay',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    priceListDisplayList: {
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
    },
    //AS KSD V001.000 #83629
    roomCourseMasterList: {
      type: Array,
      default: () => []
    }
    //AE KSD V001.000 #83629
  },
  data () {
    return {
      selectedIndexNo: this.value,
      priceDispPosList: [
        { code: 0, name: this.$i18n.t('C00224.S035') },
        { code: 1, name: this.$i18n.t('C00224.S029') },
        { code: 2, name: this.$i18n.t('C00224.S030') },
        { code: 3, name: '' }
      ],
      tempNameRowSpan: null
    }
  },
  computed: {
    priceListDisplayDataModel () {
      const vue = this
      const data = vue.priceListDisplayList
      const nullData = {
        courseDispPos: 21
      }
      const newData = [...Array(20).keys()].map(x => {
        const priceList = data && data.length > 0
          ? data.find((y, i) => {
            if ((x + 1) === y.priceDispNo) {
              y.tempIdx = i
              //AS KSD V001.000 #83629
              y.roomCourseName = vue.getRoomCourseNameByCCode(y.chargeCode)
                //AE KSD V001.000 #83629
              return x + 1
            } else {
              return null
            }
          })
          : null
        let courseNameNo = 1
        let priceNo = 1

        if (priceList != null) {
          courseNameNo = this.pairPriceCourseName(priceList.priceCourseName, priceList.priceDispPos, priceList.courseDispPos, priceList.tempIdx).count
          priceNo = this.pairPriceDispPos(priceList.priceDispPos, priceList.tempIdx).count
        }
        const result = {
          rowspanCourseName: courseNameNo,
          rowspanPrice: priceNo,
          indexNo: x + 1,
          priceList: priceList != null ? priceList : nullData,
          isAddNextRow: false,
          isCourseNameHidden: false,
          isPriceHidden: false,
          group: null
        }
        return result
      })


      const allNewData = this.sortData(newData, 1)
      return this.groupDataList(allNewData)
    }
  },
  methods: {
     //AS KSD V001.000 #83629
    getRoomCourseNameByCCode(chargeCode){
      const roomCourseNameOfObj = this.roomCourseMasterList.filter(item=>{
        return item.chargeCode === chargeCode
      })[0]
      const roomCourseName = roomCourseNameOfObj && roomCourseNameOfObj.roomCourseName || ''
      return roomCourseName
    },
    //AE KSD V001.000 #83629
    handleMissing (data) {
      return data == null || data === undefined
    },
    groupDataList (data) {
      const explodedList = [...new Set(data)]
      let groupName = null
      for (let ctr = 0; ctr < explodedList.length; ctr++) {
        if (
          explodedList[ctr].rowspanPrice === 2 &&
          explodedList[ctr + 1].rowspanPrice === 2 &&
          explodedList[ctr].rowspanCourseName === 2 &&
          explodedList[ctr + 1].rowspanCourseName === 2 &&
          explodedList[ctr].priceList.courseDispPos === explodedList[ctr + 1].priceList.courseDispPos &&
          explodedList[ctr].rowspanCourseName === 2 &&
          explodedList[ctr + 1].rowspanCourseName === 2 &&
          explodedList[ctr].group === null) {
          if (groupName === null) {
            groupName = `priceDispPosBatch-${ctr}`
          }
          explodedList[ctr].group = `priceDispPosBatch-${ctr}`
          explodedList[ctr + 1].group = `priceDispPosBatch-${ctr}`
        }
        if (
          explodedList[ctr].rowspanPrice === 2 &&
          explodedList[ctr + 1].rowspanPrice === 2 &&
          explodedList[ctr].rowspanCourseName === 1 &&
          explodedList[ctr + 1].rowspanCourseName === 1 &&
          explodedList[ctr].priceList.courseDispPos === explodedList[ctr + 1].priceList.courseDispPos &&
          explodedList[ctr].group === null) {
          if (groupName === null) {
            groupName = `priceDispPosBatch-${ctr}`
          }
          explodedList[ctr].group = `priceDispPosBatch-${ctr}`
          explodedList[ctr + 1].group = `priceDispPosBatch-${ctr}`
        }

        if (groupName !== null) {
          groupName = null
        }
      }
      return this.sortGroupDataListPriceDis(explodedList)
    },
    sortGroupDataListPriceDis (data) {
      const explodedList = [...data]
      const indexCount = []
      let groupResult = []
      for (let ctr = 0; ctr < explodedList.length; ctr++) {
        groupResult[ctr] = explodedList.filter((res, index) => {
          if (res.group && Number(res.group.split('-')[1]) === ctr || res.group && Number(res.group.split('-')[1]) + 1 === ctr) {
            indexCount.push(index)
            return res
          }
          return null
        }).sort((a, b) => a.priceList.priceDispPos - b.priceList.priceDispPos)
      }
      const newIndexCount = [...new Set(indexCount)]
      return this.spanFormaterGroupDataListPriceDis(groupResult, explodedList, newIndexCount)
    },
    priceDispPosDataExplode (groupResult, data, indexCount) {
      const explodedList = [...data]
      const newResult = []
      let counter = 0
      for (let ctr = 0; ctr < explodedList.length; ctr++) {
        if (indexCount.includes(ctr)) {
          newResult.push(groupResult[ctr][counter])
          counter++
        } else {
          newResult.push(explodedList[ctr])
        }
        if (counter >= 2) {
          counter = 0
        }
      }
      return this.isAddrow(newResult)
    },
    isAddrow (newResult) {
      const explodedList = [...newResult]

      for (let ctr = 0; ctr < explodedList.length; ctr++) {
        if ((explodedList[ctr].rowspanPrice === 2 || explodedList[ctr].rowspanCourseName === 2) && explodedList[ctr].group === null) {
          if (explodedList[ctr].priceList.courseDispPos !== explodedList[ctr + 1].priceList.courseDispPos) {
            explodedList[ctr].isAddNextRow = true
          }
        } else {
          explodedList[ctr].isAddNextRow = false
        }
      }
      return this.addingEmptyObject(newResult)
    },
    addingEmptyObject (data) {
      const explodedList = [...data]
      const explodedNewList = []
      explodedList.forEach((item, index) => {
        if (item.isAddNextRow === true) {
          explodedNewList.push(item)
          explodedNewList.push({
            isAddNextRow: false,
            indexNo: '',
            priceCourseName: '',
            rowspanPrice: 1,
            isPriceHidden: true,
            isCourseNameHidden: true,
            rowspanCourseName: 1,
            priceList: {
              priceDispNo: '',
              priceCourseName: '',
              courseDispPos: '',
              startDate: '',
              endDate: ''
            }
          })
        } else {
          explodedNewList.push(item)
        }
      })
      return this.mergeEmptyRowToParent(explodedNewList)
    },
    mergeEmptyRowToParent (data) {
      const explodedList = [...data]
      explodedList.forEach((item, index) => {
        if ((item.rowspanPrice === 2 && item.rowspanCourseName === 1 && explodedList[index + 1].indexNo === '') || item.rowspanPrice === 2 && item.rowspanCourseName === 2 && explodedList[index + 1].indexNo === '') {
          item.rowspanCourseName = 2
          if (item.priceList.priceDispPos === 2) {
            explodedList[index + 1].priceList.priceDispPos = item.priceList.priceDispPos
            explodedList[index + 1].priceList.priceDispNo = item.priceList.priceDispNo
            explodedList[index + 1].priceList.priceCourseName = item.priceList.priceCourseName
            explodedList[index + 1].priceList.chargeCode = item.priceList.chargeCode
            //AS KSD V001.000 #83629
            explodedList[index + 1].priceList.roomCourseName = item.priceList.roomCourseName
            //AE KSD V001.000 #83629
            explodedList[index + 1].priceList.courseDispPos = item.priceList.courseDispPos
            explodedList[index + 1].priceList.startDate = item.priceList.startDate
            explodedList[index + 1].priceList.endDate = item.priceList.endDate
            explodedList[index + 1].isCourseNameHidden = true
            explodedList[index].hideDisplay = true
          }
        }
      })
      return explodedList
    },
    spanFormaterGroupDataListPriceDis (groupResult, explodedList, indexCount) {
      const resultList = [...groupResult]
      for (let ctr = 0; ctr < resultList.length; ctr++) {
        if (resultList[ctr].length === 2) {
          const index0 = resultList[ctr][0]
          const index1 = resultList[ctr][1]
          if (index0.rowspanCourseName === 2) {
            index0.isCourseNameHidden = false
            index1.isCourseNameHidden = true
          }
          if (index0.rowspanPrice === 2) {
            index0.isPriceHidden = false
            index1.isPriceHidden = true
          }
        }
      }
      return this.priceDispPosDataExplode(groupResult, explodedList, indexCount)
    },
    priceDispPosListVal (val) {
      return this.priceDispPosList[val].name
    },
    countName (name, courseDispPos) {
      return this.priceListDisplayList.filter(x => x.priceCourseName === name && x.courseDispPos === courseDispPos).length
    },
    pairPriceCourseName (name, course, courseDispPos, index) {
      return {
        count: course === 0 ? 1 : this.countName(name, courseDispPos) === 2 ? 2 : 1,
        idx: index
      }
    },
    pairPriceDispPos (data, index) {
      return {
        count: data === 0 ? 1 : 2,
        idx: index
      }
    },
    sortData (arr, type) {
      if (type === 1) {
        return arr.sort((a, b) => {
          return a.priceList.courseDispPos - b.priceList.courseDispPos
        })
      } else {
        return arr.sort((a, b) => {
          return a.priceDispNo - b.priceDispNo
        })
      }
    },
    formatDateToRead (date) {
      return date !== '' ? moment(date).format('YYYY/MM/DD') : ''
    }
  }
}
// KSD V001.000 AE
