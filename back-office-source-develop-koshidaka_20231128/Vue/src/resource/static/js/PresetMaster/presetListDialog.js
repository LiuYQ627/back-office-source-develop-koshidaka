/**
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230320  bai.ry(Neusoft)  G001.00.0  issue課題#1670を対応します.
 * 20230322  bai.ry(Neusoft)  G002.00.0  issue課題#1635を対応します.
 * 20230807  zyx(Neusoft)     G003.00.0  issue課題#1624を対応します.
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'
import moment from 'moment'
const uriStores = 'CommonDesign/stores'
export default {
  data () {
    const daysDisplayInCalendar = 31
    return {
      displayed: false,
      items: [],

      daysDisplayInCalendar,
      presetPlans: [],
      creteriaDateFrom: null,
      creteriaDateTo: null,
      activeMode: 'calendar',
      isAllStoreMaster: false,
      storeMap: {},
      headquartersAuthority: 1
    }
  },
  components: {
    popup,
    commonDialog
  },
  filters: {
    formatDate (date) {
      return moment(date).format('YYYY/MM/DD')
    }
  },
  methods: {
    open (companyCode, storeId, headquartersAuthority) {
      this.presetPlans = []
      this.headquartersAuthority = headquartersAuthority
      // CS KSD V001.000 #86860
      // this.getStores(companyCode, storeId)
      const checkSession = 'CommonDesign/Header'
      axios.get(this.$i18n.t('prop.url') + checkSession + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
      .then(response => {
        const sessionResult = response.data.result
        if (sessionResult.code !== 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), sessionResult.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else {
          this.getStores(companyCode, storeId)
        }
      })
      .catch(error => {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      })
      // CE KSD V001.000 #86860
    },
    async getStores (companyCode, storeId) {
      try {
        let response = await axios.get(this.$i18n.t('prop.url') + uriStores + '?_=dateTime_=' + Date.now() + '&isAllStoreMaster=' + this.isAllStoreMaster, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          let map = {}
          response.data.responseModel.forEach((s) => {
            map[s.name.slice(-6)] = s.displayName.default
          })
          this.storeMap = map
          this.getPresets(companyCode, storeId)
        } else {
          this.globalErrorMapping(response)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    async getPresets (companyCode, storeId) {
      try {
        const response = await axios.get(this.$i18n.t('prop.url') +
          'PresetMaster/List' +
          '?companyCode=' + companyCode +
          '&storeCode=' + storeId,
        commonUtils.methods.addApiHeader({}))
        const {result} = response.data
        // G001.00.0 Add-Start
        if (response.status === 204) {
          this.presetPlans = []
          this.displayed = true
        // G001.00.0 Add-End
        } else if (result.code === 0) {
          this.items = response.data.responseModel
          // G002.00.0 Add-Start
          this.items.sort((a, b) => { return a.planningCode - b.planningCode })
          // G002.00.0 Add-End
          for (var i = 0; i < this.items.length; i++) {
            const startDateTime = this.items[i].startDateTime
            const endDateTime = this.items[i].endDateTime

            this.presetPlans.push({
              planCd: this.items[i].planningCode,
              dateFrom: moment(startDateTime).format('YYYYMMDD'),
              timeFrom: moment(startDateTime).format('hhmm'),
              dateTo: moment(endDateTime).format('YYYYMMDD'),
              timeto: moment(endDateTime).format('hhmm'),
  
              sundayFlg: this.items[i].sundayFlag,
              mondayFlg: this.items[i].mondayFlag,
              tuesdayFlg: this.items[i].tuesdayFlag,
              wednesdayFlg: this.items[i].wednesdayFlag,
              thursdayFlg: this.items[i].thursdayFlag,
              fridayFlg: this.items[i].fridayFlag,
              saturdayFlg: this.items[i].saturdayFlag
            })
          }
          this.displayed = true

          // 基点の日付に当月の1日を設定する
          var now = new Date()
          now.setDate(1)
          now.setHours(0)
          now.setMinutes(0)
          now.setSeconds(0)
          now.setMilliseconds(0)
          this.creteriaDateFrom = new Date(now)
          this.updateCreteriaDateTo()
        } else {
          this.globalErrorMapping(response)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    formatTargetStore (targetStoreCodes) {
      const result = targetStoreCodes.map(code => this.storeMap[code])
      return result.join(',')
    },
    formatWeek (plan) {
      let weeks = [
        plan.sundayFlag === 1 ? '日' : '',
        plan.mondayFlag === 1 ? '月' : '',
        plan.tuesdayFlag === 1 ? '火' : '',
        plan.wednesdayFlag === 1 ? '水' : '',
        plan.thursdayFlag === 1 ? '木' : '',
        plan.fridayFlag === 1 ? '金' : '',
        plan.saturdayFlag === 1 ? '土' : ''
      ]
      weeks = weeks.filter(item => item)
      return weeks.join(',')
    },
    closeDialog () {
      this.displayed = false
      this.activeMode = 'calendar'
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickOk () {
      this.$emit('clickOk', this.item)
      this.displayed = false
    },
    getPlanCodeFilledInZero (planCd) {
      // 企画は文字リソースから取得する
      // G003.00.0 Update-Start
      return this.$i18n.t('00' + planCd).slice(-2)
      // G003.00.0 Update-End
    },
    /**
     * 日付情報を返す
     * @param {*} type Month、Slash、Date、Weekday
     * @param {*} plusDays 基準日(From)からの加算日数
     * @param {*} presetPlan 企画マスタ
     * @returns typeに合わせた日付情報を返す
     */
    getDate (type, plusDays, presetPlan) {
      var targetDate = new Date(this.creteriaDateFrom)
      if (presetPlan === null) {
        // null = 日付部分の場合
      } else {
        // NotNull = 企画確認(オレンジ行)部分の場合
        var creteriaDateFromStr = this.convertDateToString(this.creteriaDateFrom)
        var creteriaDateToStr = this.convertDateToString(this.creteriaDateTo)
        if (creteriaDateFromStr <= presetPlan.dateTo && presetPlan.dateTo <= creteriaDateToStr) {
          // 表示期間内に企画が終了する場合
          var presetPlanDateTo = this.convertStringToDate(presetPlan.dateTo)
          var diff = ((presetPlanDateTo - this.creteriaDateFrom) / 86400000) + 1
          plusDays = plusDays + diff
        }
      }
      targetDate.setDate(targetDate.getDate() + plusDays)
      switch (type) {
        case 'Month':
          if (targetDate.getDate() === 1 || plusDays === 0) {
            // getMonthでは戻り値に+1することで当月を取得できる
            return targetDate.getMonth() + 1
          } else {
            return ''
          }
        case 'Slash':
          if (targetDate.getDate() === 1 || plusDays === 0) {
            return this.$i18n.t('F00002.S079')
          } else {
            return ''
          }
        case 'Date':
          return targetDate.getDate()
        case 'Weekday':
          return this.getWeekdayConvertedInJapanese(targetDate.getDay())
        default:
          return ''
      }
    },
    /**
     * 曜日に対応する日本語文字列を返す
     * @param {*} weekday 曜日(0:日曜日、1:月曜日...)
     * @returns 0:日、1:月、2:火、3:水、4:木、5:金、6:土
     */
    getWeekdayConvertedInJapanese (weekday) {
      switch (weekday) {
        case 0:
          return this.$i18n.t('F00002.S052')
        case 1:
          return this.$i18n.t('F00002.S053')
        case 2:
          return this.$i18n.t('F00002.S054')
        case 3:
          return this.$i18n.t('F00002.S055')
        case 4:
          return this.$i18n.t('F00002.S056')
        case 5:
          return this.$i18n.t('F00002.S057')
        case 6:
          return this.$i18n.t('F00002.S058')
      }
    },
    /**
     * 1日もしくは基準日かを判定する
     * @param {*} plusDays 加算日数(+1)
     * @returns 1日もしくは基準日だった場合はtrue、それ以外の場合はfalse
     */
    isFirstDayOrCreteriaDate (plusDays) {
      var targetDate = new Date(this.creteriaDateFrom)
      targetDate.setDate(targetDate.getDate() + plusDays - 1)
      if (targetDate.getDate() === 1 || targetDate === this.creteriaDateFrom) {
        // 1日もしくは基準日だった場合
        return true
      }
      return false
    },
    /**
     * 基準日を日単位で変更する
     * @param {*} plusDay 加算日数
     */
    moveDay (plusDay) {
      var targetDate = new Date(this.creteriaDateFrom)
      targetDate.setDate(targetDate.getDate() + plusDay)
      this.creteriaDateFrom = new Date(targetDate)
    },
    /**
     * 基準日を月単位で変更する(日付は1日固定)
     * @param {*} plusMonth 加算月数
     */
    moveMonth (plusMonth) {
      var targetDate = new Date(this.creteriaDateFrom)
      targetDate.setMonth(targetDate.getMonth() + plusMonth)
      targetDate.setDate(1)
      this.creteriaDateFrom = new Date(targetDate)
    },
    /**
     * 表示しているカレンダー上での対象日数を取得する(反映/非反映の数)
     * @param {*} presetPlan 企画マスタ
     * @returns 対象日数(反映/非反映の数)
     */
    getPresetPlanPeriodDaysOnCalendar (presetPlan) {
      var creteriaDateFromStr = this.convertDateToString(this.creteriaDateFrom)
      var creteriaDateToStr = this.convertDateToString(this.creteriaDateTo)

      if (presetPlan.dateTo < creteriaDateFromStr || creteriaDateToStr < presetPlan.dateFrom) {
        // 企画の期間がカレンダー表示外の場合は処理終了(0日を返す)
        return 0
      }

      // カレンダー上の期間開始日を取得する
      var planDateFrom = null
      if (presetPlan.dateFrom < creteriaDateFromStr) {
        // 期間開始日を基準日にする
        planDateFrom = this.convertStringToDate(creteriaDateFromStr)
      } else {
        // 期間開始日を企画.開始日にする
        planDateFrom = this.convertStringToDate(presetPlan.dateFrom)
      }

      // カレンダー上の期間終了日を取得する
      var planDateTo = null
      if (presetPlan.dateTo < creteriaDateToStr) {
        // 期間終了日を企画.終了日にする
        planDateTo = this.convertStringToDate(presetPlan.dateTo)
      } else {
        // 期間終了日を基準日+31日(カレンダーの終わり)に設定する
        planDateTo = this.convertStringToDate(creteriaDateToStr)
      }

      // 期間開始/終了日の差を求めて、カレンダー上に表示する日数を取得する
      var resetPlanPeriodDay = ((planDateTo - planDateFrom) / 86400000) + 1
      return resetPlanPeriodDay < 0 ? 0 : resetPlanPeriodDay
    },
    /**
     * 反映/非反映のクラス(css)を返す
     * @param {*} presetPlan 企画マスタ
     * @param {*} plusDay 基準日(From)からの加算日数(対象期間最終日の場合は-1)
     * @returns 反映/非反映のクラス(css)もしくは空文字(適用外の場合)
     */
    getClassForApply (presetPlan, plusDay) {
      // 有効日か判定をする

      var targetDate = new Date(this.creteriaDateFrom)
      var targetDay = null

      if (plusDay === -1) {
        // 対象期間最終日の場合
        var planTo = this.convertStringToDate(presetPlan.dateTo)
        var diff = (planTo - targetDate) / 86400000
        targetDate.setDate(targetDate.getDate() + diff)
      } else {
        // 対象期間最終日でない場合
        plusDay = this.getCreteriaDateBeforeFromPlanDateFrom(presetPlan) + plusDay
        targetDate.setDate(targetDate.getDate() + plusDay)
      }
      targetDay = targetDate.getDay()

      if (!this.isValidWeekday(presetPlan, targetDay)) {
        return ''
      }

      // 反映/非反映の判定をする
      var isApply = true
      var targetDateStr = this.convertDateToString(targetDate)
      var duplicatedPlans = []
      // 当日の開始日時
      var targetDateTimeFrom = presetPlan.dateFrom + presetPlan.timeFrom <= targetDateStr + '0000' ? targetDateStr + '0000' : presetPlan.dateFrom + presetPlan.timeFrom
      // 当日の終了日時
      var targetDateTimeTo = targetDateStr + '2359' <= presetPlan.dateTo + presetPlan.timeTo ? targetDateStr + '2359' : presetPlan.dateTo + presetPlan.timeTo

      this.presetPlans.some(plan => {
        if (presetPlan.planCd >= plan.planCd) {
          // 対象企画より優先順位が低い企画の場合はリターン
          return false
        }

        if (!this.isValidWeekday(plan, targetDay)) {
          // 対象曜日でない場合はリターン
          return false
        }

        // 開始/終了日付のチェック
        if (targetDateStr < plan.dateFrom || plan.dateTo < targetDateStr) {
          // 有効期限外の場合はリターン
          return false
        }

        if (plan.dateFrom < targetDateStr && targetDateStr < plan.dateTo) {
          // 上位企画の期間が対象日を包括した期間だった場合は非反映
          isApply = false
          return true
        } else {
          // 上位期間の開始/終了日の何れか(もしくは両方)が対象日と同じ日だった場合
          // 当日の開始日時
          var planDateTimeFrom = plan.dateFrom + plan.timeFrom <= targetDateStr + '0000' ? targetDateStr + '0000' : plan.dateFrom + plan.timeFrom
          // 当日の終了日時
          var planDateTimeTo = targetDateStr + '2359' <= plan.dateTo + plan.timeTo ? targetDateStr + '2359' : plan.dateTo + plan.timeTo

          if (planDateTimeFrom <= targetDateTimeFrom && targetDateTimeTo <= planDateTimeTo) {
            // 上位企画の期間が対象時間を包括した期間だった場合は非反映
            isApply = false
            return true
          }

          if ((targetDateTimeFrom <= planDateTimeTo && planDateTimeTo <= targetDateTimeTo) ||
              (targetDateTimeFrom <= planDateTimeFrom && planDateTimeFrom <= targetDateTimeTo)) {
            duplicatedPlans.push({
              from: planDateTimeFrom,
              to: planDateTimeTo
            })
          }
        }
      })

      if (duplicatedPlans.length <= 1) {
        // 日付レベルで重複していない場合は、ここで処理を終了させる
        return isApply ? 'orangeCircle' : 'whiteCircle'
      }

      duplicatedPlans.unshift({
        from: targetDateTimeFrom,
        to: targetDateTimeFrom
      })

      duplicatedPlans.push({
        from: targetDateTimeTo,
        to: targetDateTimeTo
      })

      // 期間(時間)の判定
      let sortedFrom = JSON.parse(JSON.stringify(duplicatedPlans))
      sortedFrom.sort((a, b) => {
        return a.from > b.from ? 1 : -1
      })
      let sortedTo = JSON.parse(JSON.stringify(duplicatedPlans))
      sortedTo.sort((a, b) => {
        return a.to > b.to ? 1 : -1
      })

      // フラグ初期化
      isApply = false
      for (var i = 0; i < duplicatedPlans.length - 1; i++) {
        var from = Number(sortedFrom[i + 1].from)
        var to = Number(sortedTo[i].to)

        if (to - from < 0) {
          isApply = true
          break
        }
      }

      return isApply ? 'orangeCircle' : 'whiteCircle'
    },
    /**
     * 企画に対して、引数「曜日」が対象な曜日かを返す
     * @param {*} presetPlan 企画マスタ
     * @param {*} weekday 曜日
     * @returns true:対象な曜日、false:対象外な曜日
     */
    isValidWeekday (presetPlan, weekday) {
      switch (weekday) {
        case 0:
          // 日曜日
          return presetPlan.sundayFlg === 1
        case 1:
          // 月曜日
          return presetPlan.mondayFlg === 1
        case 2:
          // 火曜日
          return presetPlan.tuesdayFlg === 1
        case 3:
          // 水曜日
          return presetPlan.wednesdayFlg === 1
        case 4:
          // 木曜日
          return presetPlan.thursdayFlg === 1
        case 5:
          // 金曜日
          return presetPlan.fridayFlg === 1
        case 6:
          // 土曜日
          return presetPlan.saturdayFlg === 1
      }
    },
    /**
     * 文字列(yyyyMMdd)をDate型に変換する
     * @param {*} str 文字列(yyyyMMdd)
     * @returns 引数の年月日で生成したDate型
     */
    convertStringToDate (str) {
      return new Date(str.substr(0, 4), str.substr(4, 2) - 1, str.substr(6, 2))
    },
    /**
     * Date型を文字列(yyyyMMdd)に変換する
     * @param {*} date 日付
     * @returns 引数のDate型で生成した年月日文字列(yyyyMMdd)
     */
    convertDateToString (date) {
      return String(date.getFullYear()) +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      ('00' + date.getDate()).slice(-2)
    },
    /**
     * 基準日(開始)より前からの企画か
     * @param {*} presetPlan 企画マスタ
     * return true:基準日(開始)より前に企画が開始する、false:基準日(開始)以前に企画が開始する
     */
    isCreteriaDateBeforeFromPlan (presetPlan) {
      var creteriaDateFromStr = this.convertDateToString(this.creteriaDateFrom)
      return presetPlan.dateFrom < creteriaDateFromStr
    },
    /**
     * 基準日(終了)より後に企画が終了するか
     * @param {*} presetPlan 企画マスタ
     * @returns true:基準日(終了)以より後に企画が終了する、false:基準日(終了日)以前に企画が終了する
     */
    isCreteriaDateAfterFromPlan (presetPlan) {
      var creteriaDateToStr = this.convertDateToString(this.creteriaDateTo)
      return creteriaDateToStr < presetPlan.dateTo
    },
    /**
     * 基準日(開始)より前に企画が終了するか
     * @param {*} presetPlan 企画マスタ
     * @returns true:基準日(終了)以より前に企画が終了する、false:基準日(終了日)以降に企画が終了する
     */
    isCreteriaDateBeforeFinishedPlan (presetPlan) {
      var creteriaDateFromStr = this.convertDateToString(this.creteriaDateFrom)
      return presetPlan.dateTo < creteriaDateFromStr
    },
    /**
     * 基準日(終了)より後に企画が開始するか
     * @param {*} presetPlan 企画マスタ
     * @returns true:基準日(終了)以より前に企画が終了する、false:基準日(終了日)以降に企画が終了する
     */
    isCreteriaDateAfterOpenPlan (presetPlan) {
      var creteriaDateToStr = this.convertDateToString(this.creteriaDateTo)
      return creteriaDateToStr < presetPlan.dateFrom
    },
    /**
     * 基準日(終了)以前に企画が開始するか
     * @param {*} presetPlan 企画マスタ
     * @returns true:基準日(終了)より前に企画が開始する、false:基準日(終了)より前に企画が開始する
     */
    isCreteriaDateToBeforeOpenPlan (presetPlan) {
      var creteriaDateToStr = this.convertDateToString(this.creteriaDateTo)
      return presetPlan.dateFrom <= creteriaDateToStr
    },
    /**
     * カレンダーに企画を表示するかどうか
     * @param {*} presetPlan 企画マスタ
     * @returns true:カレンダーに企画を表示する、false:カレンダーに企画を表示しない
     */
    isCalendarDisplay (presetPlan) {
      return !this.isCreteriaDateBeforeFinishedPlan(presetPlan) && !this.isCreteriaDateAfterOpenPlan(presetPlan)
    },
    /**
     * 基準日(開始)を基点とした企画開始日までの日数を取得
     * @param {*} presetPlan 企画マスタ
     * @returns 基準日(開始)を基点とした企画開始日までの日数(0未満の場合は0とする)
     */
    getCreteriaDateBeforeFromPlanDateFrom (presetPlan) {
      var planDateFrom = this.convertStringToDate(presetPlan.dateFrom)
      var diffDays = (planDateFrom - this.creteriaDateFrom) / 86400000
      if (diffDays < 0) diffDays = 0
      if (diffDays > this.daysDisplayInCalendar) diffDays = this.daysDisplayInCalendar
      return diffDays
    },
    /**
     * 基準日(終了)を基点とした企画終了日までの日数を取得
     * @param {*} presetPlan 企画マスタ
     * @returns 基準日(終了)を基点とした企画終了日までの日数を取得(0未満の場合は0とする)
     */
    getCreteriaDateAfterFromPlanDateTo (presetPlan) {
      var planDateTo = this.convertStringToDate(presetPlan.dateTo)
      console.log(planDateTo)
      var diffDays = (this.creteriaDateTo - planDateTo) / 86400000
      if (diffDays < 0) diffDays = 0
      if (diffDays > this.daysDisplayInCalendar) diffDays = this.daysDisplayInCalendar
      return diffDays
    },
    /**
     * 基準日(終了)の更新
     */
    updateCreteriaDateTo () {
      var creteriaDateTo = new Date(this.creteriaDateFrom)
      creteriaDateTo.setDate(creteriaDateTo.getDate() + (this.daysDisplayInCalendar - 1))
      // 基準日(終了)を更新する
      this.creteriaDateTo = creteriaDateTo
    },
    /**
     * カレンダーオレンジ部分のtd生成数を取得する
     * @param {*} presetPlan 企画マスタ
     * @returns カレンダーオレンジ部分のtd生成数(0未満の場合は0を返す)
     */
    getTdCreateCount (presetPlan) {
      var count = this.getPresetPlanPeriodDaysOnCalendar(presetPlan)
      if (!this.isCreteriaDateAfterFromPlan(presetPlan) && this.isCalendarDisplay(presetPlan)) {
        // 月を跨がない場合は「-1」する(行端の「＞」部分)
        count--
      }
      return count < 0 ? 0 : count
    },
    /**
     * カレンダーの期間内で企画が開始・終了するか
     * @param {*} presetPlan 企画マスタ
     * @returns true:期間内で企画が開始・終了する、false:期間内で企画が開始・終了しない
     */
    isCalendarWithinByPlanStartWithEnd (presetPlan) {
      return this.isCreteriaDateToBeforeOpenPlan(presetPlan) && this.isCreteriaDateAfterFromPlan(presetPlan)
    },
    /**
     * 企画コード押下時の処理
     * @param {*} presetPlan 企画マスタ
     */
    onClickPresetCd (presetPlan) {
      // 本部企画（企画コード：21～50）の場合
      if (this.headquartersAuthority === 1) {
        if (parseInt(presetPlan.planCd) <= 20 || parseInt(presetPlan.planCd) > 50) {
          this.$refs.pop.open(3, '', this.$i18n.t('F00002.S065'), '', false, null, false, null)
          return
        }
      } else {
        if (parseInt(presetPlan.planCd) < 1 || parseInt(presetPlan.planCd) > 20) {
          this.$refs.pop.open(3, '', this.$i18n.t('F00002.S064'), '', false, null, false, null)
          return
        }
      }
      this.$emit('clickLink', presetPlan.planCd)
      this.displayed = false
    },
    planWidthSize (presetPlan) {
      let colCount = this.getTdCreateCount(presetPlan)
      let widthSize = 29.1 * colCount
      let styleString = 'width:' + widthSize + 'px !important;'
      if (widthSize === 0) {
        styleString += 'border-left:none !important;'
      }
      return styleString
    },
    /**
     * 企画終了日に適用するTopクラスを取得する(三角部分のクラス)
     * @param {*} presetPlan 企画マスタ
     * @returns 企画終了日が土日その他毎のクラスを返す
     */
    getPlanEndTriangleClass (presetPlan, isTop) {
      var targetDate = new Date(this.convertStringToDate(presetPlan.dateTo))
      var day = targetDate.getDay()
      if (day === 0) {
        // 日曜日の場合
        return isTop ? 'planEndTopTriangle_Sunday' : 'planEndBottomTriangle_Sunday'
      } else if (day === 6) {
        // 土曜日の場合
        return isTop ? 'planEndTopTriangle_Saturday' : 'planEndBottomTriangle_Saturday'
      } else {
        // 土日以外
        return isTop ? 'planEndTopTriangle' : 'planEndBottomTriangle'
      }
    },
    /**
     * 土日の場合設定するクラスを取得する
     * @param {*} plusDays 基準日(From)からの加算日数
     * @param {*} presetPlan 企画マスタ
     * @returns 土日の場合設定するクラス
     */
    getWeekdayClass (plusDays, presetPlan) {
      var targetDate = new Date(this.creteriaDateFrom)
      if (presetPlan === null) {
        // null = 日付部分の場合
      } else {
        // NotNull = 企画確認(オレンジ行)部分の場合
        var creteriaDateFromStr = this.convertDateToString(this.creteriaDateFrom)
        var creteriaDateToStr = this.convertDateToString(this.creteriaDateTo)
        if (creteriaDateFromStr <= presetPlan.dateTo && presetPlan.dateTo <= creteriaDateToStr) {
          // 表示期間内に企画が終了する場合
          var presetPlanDateTo = this.convertStringToDate(presetPlan.dateTo)
          var diff = ((presetPlanDateTo - this.creteriaDateFrom) / 86400000) + 1
          plusDays = plusDays + diff
        }
      }
      targetDate.setDate(targetDate.getDate() + plusDays)
      var weekday = targetDate.getDay()
      if (weekday === 0) {
        // 日曜日の場合
        return 'sundayStyle'
      } else if (weekday === 6) {
        // 土曜日の場合
        return 'saturdayStyle'
      } else {
        // 土日以外
        return ''
      }
    },
    /**
     * 空白調整用の高さを計算する
     * @returns 空白調整用の高さ
     */
    getEmptyHeight () {
      // 現在表示されている高さ計算
      // 企画行の高さ63px、必ず表示する1行目の高さ25px
      let trHeightSize = this.presetPlans.length * 63 + 25

      // 空白調整用の行に必要な高さ計算
      // tbodyの高さ310px
      let emptyHight = 310 - trHeightSize
      return 'height:' + emptyHight + 'px'
    },
    selectCalendar (activeMode) {
      this.activeMode = activeMode
    }
  },

  watch: {
    /**
     * 基準日(開始)更新処理
     * @param {*} val 変更後の基準日(開始)
     */
    creteriaDateFrom: function (val) {
      this.updateCreteriaDateTo()
    }
  }
}
