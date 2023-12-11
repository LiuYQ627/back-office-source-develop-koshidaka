// KSD V001.000 AS
import axios from 'axios'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import commonUtils from '../Common/commonUtils'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import popup from '@/resource/templates/CommonDesign/Popup'
import moment from 'moment'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
const _ = require("lodash");

const calendarQuery = 'RentalsCalendar/Query'
const calendarWeekdayDivisionQuery = 'RentalsWeekdayDivision/Query'
const calendarSave = 'RentalsCalendar/Update'

export default {
  name: '',
  data () {
    return {
      targetStoreCodes: [],
      headquartersAuthority: 0,
      timeout: null,
      calendarTitle: '',
      navClicked: null,
      isDisableNavigateCalendar: {
        prev: false,
        next: false
      },
      calendarActiveDate: '',
      disabledFixedBtn: true,
      calendarQueryResultList: [],
      calendarWeekdayDivisionQueryResult: [],
      calendarWeekdayDivisionQueryClear: [{
        weekdayCode: '',
        weekdayName: '',
        weekdayShortName: '',
        textColorCode: '',
        backColorCode: 'fff'
      }],
      activeWeekdayDivision: null,
      isDraft: false,
      focus: '',
      type: 'month',
      events: [],
      isNewLoad: false,
      isDisableCalendarAction: false,
      isDisableCalendarButtonAction: false,
      dayCount: 0,
      isInitialLoad: true
    }
  },
  components: {
    maintButton,
    popup,
    storeSelect,
    FormGroupLayout
  },
  computed: {
    isCursorEnabled() {
      return this.targetStoreCodes.length && !this.isDisableCalendarAction && 
        !this.isDisableCalendarButtonAction && this.calendarWeekdayDivisionQueryResult.length && this.activeWeekdayDivision
    },
    isTabIndexEnabled() {
      return this.targetStoreCodes.length && !this.isDisableCalendarAction && !this.isDisableCalendarButtonAction && this.calendarWeekdayDivisionQueryResult.length
    }
  },
  methods: {
    async initialize () {
      const currentDate = moment(new Date()).format('YYYY-MM-DD')
      this.calendarActiveDate = currentDate
      this.isInitialLoad = true
      this.focus = ''
      this.isNewLoad = false
      if (await this.getCalendarQuery({ nodeId: this.targetStoreCodes[0] }) === false) return
      if (await this.getCalendarWeekdayDivisionQuery() === false) return
      this.calendarWeekdayDivisionQueryResult = this.calendarWeekdayDivisionQueryResultTemp
      this.timeout = setTimeout(() => {
        document.getElementsByClassName('left-navigation')[0].focus()
      })
    },
    storeClicked () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.proceedStoreClick, false, null)
    },
    changedStore () {
      if (this.targetStoreCodes[0]) this.initialize()
    },
    async backToMenu () {
      if (this.isDraft) {
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.toTopPage, false, null)
        return
      }
      this.toTopPage()
    },
    toTopPage () {
      this.isDraft = false
      this.isInitialLoad = true
      this.$router.push('/TopPage')
    },
    formatPayload () {
      const currentDate = new Date()
      const year = currentDate.getUTCFullYear();
      const month = currentDate.getUTCMonth() + 1;
      const includeFutureMonth = 3
      const startDate = new Date(`${year}-${month}-01`)
      return this.calendarQueryResultList.filter(rowData => new Date(`${rowData.yyDate}-${rowData.mmDate}-01`) >= startDate).map((rowData, index) => {
        if (index <= includeFutureMonth) {
          return rowData
        }
      }).filter(x => x).flatMap(({ dayData, ...res }) => ({ ...res, dayData: dayData.map(({ code }) => code)}))
    },
    async confirm () {
      this.isDraft = true
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      const params = this.formatPayload()
      const len = params.length
      this.disabledFixedBtn = true
      for (let index = 0; index < len; index++) {
        try {
          const response = await axios.post(this.$i18n.t('prop.url') + calendarSave, params[index], commonUtils.methods.addApiHeader({}))
          if (response.data.result.code === 0) {
            if (len === index + 1) {
              await this.mainQuery()
            }
          } else {
            this.disabledFixedBtn = false
            this.globalErrorMapping(response.data.result)
            break
          }
        } catch (error) {
          console.log(error)
          this.disabledFixedBtn = false
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          break
        }
      }
    },
    async mainQuery () {
      let result = false
      if (await this.getCalendarWeekdayDivisionQuery() === false) return result
      if (await this.getCalendarQuery({ nodeId: this.targetStoreCodes[0] }) === false) return
      this.isNewLoad = true
      this.calendarWeekdayDivisionQueryResult = this.calendarWeekdayDivisionQueryResultTemp
      this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
      this.isDraft = false
      result = true
      return result
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    weekDayName (date) {
      const WeekDays = [
        this.$i18n.t('C00212.S004'),
        this.$i18n.t('C00212.S005'),
        this.$i18n.t('C00212.S006'),
        this.$i18n.t('C00212.S007'),
        this.$i18n.t('C00212.S008'),
        this.$i18n.t('C00212.S009'),
        this.$i18n.t('C00212.S010')
      ]
      return WeekDays[date.weekday]
    },
    proceedStoreClick () {
      this.isDraft = false
      this.timeout = setTimeout(() => {
        this.$refs.selectStoreDialog.openDialog()
      }, 50)
    },
    async successButton () {
      this.isDraft = false
      this.disabledFixedBtn = true
      if (this.navClicked === 'prev') {
        this.$refs.calendar.prev()
      }
      if (this.navClicked === 'next') {
        this.$refs.calendar.next()
      }
    },
    prev () {
      if (this.isDisableNavigateCalendar.prev) {
        return
      }
      this.isInitialLoad = false
      this.defaultData()
      this.$refs.calendar.prev()
    },
    next () {
      if (this.isDisableNavigateCalendar.next) {
        return
      }
      this.isInitialLoad = false
      this.defaultData()
      this.$refs.calendar.next()
    },
    forceIntTwo (data) {
      return data.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    },
    setActiveWeekdayDivision (row) {
      this.activeWeekdayDivision = row.weekdayCode
    },
    getFullWidthNo (data) {
      const opts = {
        1: () => '１',
        2: () => '２',
        3: () => '３',
        4: () => '４',
        5: () => '５',
        6: () => '６',
        7: () => '７',
        8: () => '８',
        9: () => '９',
        10: () => '１０'
      }
      return opts[data] ? opts[data]() : ''
    },
    colorConverter (number) {
      let x = ''
      let hex = number.toString(16)
      let finalHex = '#'
      if (hex.length < 6) {
        x = 6 - hex.length
        for (let y = 1; y <= x; y++) {
          finalHex += '0'
        }
        finalHex += hex
      } else {
        finalHex += hex
      }
      return finalHex
    },
    checkEmptyName (data, stringName, labelType) {
      const { weekdayCode, weekdayShortName, weekdayName } = data
      if (!this.targetStoreCodes.length) return ''
      let label = {}
      const name = weekdayCode ? `${stringName}${this.getFullWidthNo(weekdayCode)}` : ''
      if (labelType === 'shortName') {
        label = {
          name: !weekdayShortName ? name : weekdayShortName
        }
      }
      if (labelType === 'longName') {
        label = {
          name: !weekdayName ? name : weekdayName
        }
      }

      return label.name
    },
    updateCalendarWeekdayCode ({ month, day, year, date, past }) {
      if (this.isDisableCalendarAction || this.isDisableCalendarButtonAction || past || this.activeWeekdayDivision === null) return
      this.isDraft = true
      this.disabledFixedBtn = false
      this.calendarQueryResultList = this.calendarQueryResultList.map(({ mmDate, yyDate, dayData, ...res }) => {
        if (mmDate === month && yyDate === year) {
          return {
            ...res,
            mmDate,
            yyDate,
            dayData: dayData.map(
              (res, index) => index + 1 === day && res.code !== this.activeWeekdayDivision ? 
              ({ code: this.activeWeekdayDivision, isActive: true }) : res),
          }
        }
        return {
          ...res,
          mmDate, 
          yyDate, 
          dayData,
          
        }
      })
    },
    isActiveCalendarCard (day, month, year) {
      if (this.calendarQueryResultList.length) {
        return this.calendarQueryResultList.filter(({ yyDate, mmDate, nodeId }) => yyDate === year && mmDate === month && nodeId === this.targetStoreCodes[0])
        .flatMap(({ dayData }) => dayData[day - 1] && dayData[day - 1].isActive ? dayData[day - 1].isActive : false)[0]
      }
      return false
    },
    defaultData () {
      this.calendarWeekdayDivisionQueryResultTemp = []
      this.calendarWeekdayDivisionQueryResult = []
      this.focus = 'empty'
      this.isNewLoad = false
    },
    async getCalendarQuery ({ nodeId, isOnload = true }) {
      let result = false
      this.isDisableCalendarAction = false
      this.activeWeekdayDivision = null
      this.isNewLoad = false
      if (isOnload === true) {
        this.disabledFixedBtn = true
        const yyDate = this.getCalendarYearRange()
        const batchSize = yyDate.length * 12 || 12
        try {
          const response = await axios.post(`${this.$i18n.t('prop.url')}${calendarQuery}`, {
            nodeId: `${nodeId}`,
            yyDate,
            mmDate: [],
            orderBy: 'mmDate',
            ascending: true,
            startIndex: 0,
            batchSize
          }, commonUtils.methods.addApiHeader({}))
          if (response.data.result.code === 0) {
            const calendarResult = _.sortBy(response.data.responseModel, ['yyDate', 'mmDate']).map(({ dayData, ...res }) => ({
              ...res,
              dayData: dayData.map(data => ({ code: data, isActive: false })),
            }))
            const calendarMonthResult = this.appendCalendarMonth(calendarResult)
            this.calendarQueryResultList = this.appendDaysInMonth(calendarMonthResult)
            result = true
            this.isNewLoad = true
          } else if (response.data.result.code === 2) {
            this.calendarQueryResultList = this.getCalendarData()
            result = true
            this.isNewLoad = true
          } else {
            this.targetStoreCodes = []
            this.globalErrorMapping(response.data.result)
            this.isDisableCalendarAction = true
          }
        } catch (error) {
          this.targetStoreCodes = []
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          this.isDisableCalendarAction = true
        }
        if (!result) {
          this.defaultData()
        }
      } else {
        result = true
        this.isNewLoad = true
      }
      return result
    },
    async getCalendarWeekdayDivisionQuery () {
      let result = false
      this.calendarWeekdayDivisionQueryResult = []
      this.isDisableCalendarButtonAction = false
      this.isNewLoad = false
      try {
        const response = await axios.post(`${this.$i18n.t('prop.url')}${calendarWeekdayDivisionQuery}`, {
          nodeId: this.targetStoreCodes[0],
          weekdayCode: 0,
          orderBy: 'weekdayCode',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          this.calendarWeekdayDivisionQueryResultTemp = response.data.responseModel
          this.calendarWeekdayDivisionQueryResultTemp.forEach(element => {
            element.textColorCode = this.colorConverter(element.textColorCode)
            element.backColorCode = this.colorConverter(element.backColorCode)
          })
          result = true
          this.isNewLoad = true
        } else if (response.data.result.code === 2) {
          this.calendarWeekdayDivisionQueryResultTemp = []
          result = true
          this.isNewLoad = true
        } else {
          this.globalErrorMapping(response.data.result)
          this.isDisableCalendarButtonAction = true
          this.targetStoreCodes = []
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        this.isDisableCalendarButtonAction = true
        this.targetStoreCodes = []
      }
      if (!result) {
        this.defaultData()
      }
      return result
    },
    appendCalendarMonth (data) {
      const yearsMonth = this.getCalendarData()
      return yearsMonth.map(rowData => {
        const responseData = data.filter(res => res.mmDate === rowData.mmDate && res.yyDate === rowData.yyDate)
        if (responseData.length) {
          return responseData[0]
        }
        return rowData
      })
    },
    appendDaysInMonth (data) {
      return data.map(rowData => {
        if (!rowData.dayData.length) {
          const dayData = this.getDaysInMonth (rowData.yyDate, rowData.mmDate)
          return {
            ...rowData,
            dayData: dayData.map(data => ({ code: data, isActive: false })),
          }
        }
        return rowData
      })
    },
    getCalendarYearRange () {
      const currentDate = moment()
      const addedThreeMonth = currentDate.add(3, 'M').get('year')
      const minusThirteenMonth = currentDate.subtract(13, 'M').get('year')
      return Array.from(
        { length: addedThreeMonth - minusThirteenMonth + 1 },
        (value, index) => minusThirteenMonth + index
      )
    },
    getDaysInMonth (yyDate, mmDate) {
      const daysInMonth = moment(`${yyDate}-${mmDate}`, "YYYY-MM").daysInMonth()
      return Array.from(
        { length: daysInMonth },
        (value, index) => 0
      )
    },
    getCalendarData () {
      const years = this.getCalendarYearRange()
      const calendar = []
      years.map(yyDate =>{
        for (let mmDate = 1; mmDate <= 12; mmDate++) {
          const dayData = this.getDaysInMonth(yyDate, mmDate)
          calendar.push({
            nodeId: this.targetStoreCodes[0],
            yyDate,
            mmDate,
            dayData : dayData.map(data => ({ code: data, isActive: false })),
          })
        }
      })
      return calendar
    },
    retrieveCalendarWeekdayDivisionQuery (day, date, month, year) {
      const currentDate = day - 1
      const list = this.calendarWeekdayDivisionQueryClear.concat(this.calendarWeekdayDivisionQueryResult)
      const code = this.calendarQueryResultList.filter(({ yyDate, mmDate }) => yyDate === year && mmDate === month).flatMap(({ dayData }) => dayData[currentDate] && dayData[currentDate].code ? dayData[currentDate].code : 0)
      const result = this.calendarWeekdayDivisionQueryResult.length && code
        ? list.filter(({ weekdayCode }) => Number(weekdayCode) === Number(code))[0]
        : this.calendarWeekdayDivisionQueryClear
      return result
    },
    hasChange ({ start, end }) {
      const { month, year, date } = start
      this.calendarActiveDate = date
      this.timeout = setTimeout(async () => {
        if (this.targetStoreCodes[0]) {
          if (await this.getCalendarQuery({ nodeId: this.targetStoreCodes[0], isOnload: false }) === false) return
          if (this.isInitialLoad === false) {
            if (await this.getCalendarWeekdayDivisionQuery() === false) return
            this.calendarWeekdayDivisionQueryResult = this.calendarWeekdayDivisionQueryResultTemp
          }
        }
      }, 200)
      this.calendarTitle = `${year}${this.$i18n.t('C00212.S002')} ${month}${this.$i18n.t('C00212.S003')}`

      // month navigate handler
      const presentDate = new Date()
      const presentDate2 = new Date()
      const addedThreeMonth = new Date(presentDate.setMonth(presentDate.getMonth() + 3))
      const minusThirteenMonth = new Date(presentDate2.setMonth(presentDate2.getMonth() - 13))
      const currentUserMonthClicked = moment(new Date(date)).format('YYYY-MM')
      const addedThreeMonthResult = moment(addedThreeMonth).format('YYYY-MM')
      const minusThirteenMonthResult = moment(minusThirteenMonth).format('YYYY-MM')

      this.isDisableNavigateCalendar = {
        prev: currentUserMonthClicked <= minusThirteenMonthResult,
        next: currentUserMonthClicked >= addedThreeMonthResult
      }
    },
    confirmUnload (event) {
      if (this.isDraft) {
        event.returnValue = ''
      }
    }
  },
  created () {
    this.$root.winId = 'C00212'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    clearTimeout(this.timeout)
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    this.$refs.calendar.checkChange()
    let vue = this
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.headquartersAuthority = headquartersAuthority
      this.timeout = setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementsByClassName('rightArrowButton')[0].focus()
        }
      }, 200)
    })
  },
  watch: {}
}
// KSD V001.000 AE
