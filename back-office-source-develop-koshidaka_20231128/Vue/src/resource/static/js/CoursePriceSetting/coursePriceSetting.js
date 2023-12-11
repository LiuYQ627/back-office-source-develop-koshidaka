// KSD V001.000 AS
import axios from 'axios'
import moment from 'moment'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import CommonButton from '@/resource/templates/CommonInput/CommonButton'
import CoursePriceSettingRow from '@/resource/templates/CoursePriceSetting/CoursePriceSettingRow'
import CoursePriceSettingCopyDialog from '@/resource/templates/CoursePriceSetting/CoursePriceSettingCopyDialog'

const RENTALS_WEEKDAY_DIVISION_QUERY_URL = 'RentalsWeekdayDivision/Query'
const RENTALS_ROOM_COURSE_QUERY_URL = 'RentalsRoomcourse/Query'
const RENTALS_AGE_DIVISION_QUERY_URL = 'RentalsAgeDivision/Query'
const RENTALS_ROOM_COURSE_RATE_QUERY_URL = 'RentalsRoomcourseRate/Query'
const RENTALS_ROOM_COURSE_RATE_UPDATE_URL = 'RentalsRoomcourseRate/Update'

const DEFAULT_PARAMETER_DATA_MODEL = {
  weekdayCode: 0,
  chargeCode: 0,
  memberPrice: 0,
  ageDivisionCode: 0,
  countSetting: 0
}

const DEFAULT_DATA_MODEL = {
  data: [],
  timeDivision1: null,
  timeDivision2: null,
  timeDivision3: null,
  timeDivision4: null
}

const DEFAULT_TIME_DIVISION_DATA_MODEL = {
  priceApplyingTime: {
    start: '0000',
    end: '0000'
  },
  displayTime: {
    start: '0000',
    end: '0000'
  },
  courseEndTime: {
    start: '0000',
    end: '0000'
  },
  nextDayFlag: false,
  base: {
    room: 0,
    drink: 0
  },
  extend: {
    room: 0,
    drink: 0
  }
}

export default {
  name: 'CoursePriceSetting',
  data () {
    return {
      headquartersAuthorityCheckEnable: true,
      targetStoreCodes: [],
      targetCompanyCodes: [],
      showParameterSelectPanel: false,
      showTimeSettingPanel: false,
      weekdayDivisionOptions: [],
      roomCourseOptions: [],
      memberPriceOptions: [
        { name: this.$i18n.t('C00211.S034'), value: 1 },
        { name: this.$i18n.t('C00211.S035'), value: 2 }
      ],
      ageDivisionOptions: [],
      countSettingOptions: [
        { name: this.$i18n.t('C00211.S036'), value: 1 },
        { name: this.$i18n.t('C00211.S037'), value: 2 }
      ],
      parameterDataModel: JSON.parse(JSON.stringify(DEFAULT_PARAMETER_DATA_MODEL)),
      roomRateCode: -1,
      dataModel: JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL)),
      isEditButtonEnabled: false,
      isParameterSelectEnabled: true,
      isTimeSettingFormEnabled: false,
      isTimeSettingFormCreateMode: false,
      payType: null,
      roomCourseOptionsCopy: []
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    FormGroupLayout,
    SelectInput,
    CommonButton,
    CoursePriceSettingRow,
    CoursePriceSettingCopyDialog
  },
  computed: {
    disableCloseButton: function () {
      return this.isTimeSettingFormEnabled
    },
    disableFixedButton: function () {
      return !this.isTimeSettingFormEnabled
    },
    disableStopButton: function () {
      return !this.isTimeSettingFormEnabled
    },
    disableCopyButton: function () {
      return (!this.isTimeSettingFormEnabled && this.roomRateCode < 1) || this.isTimeSettingFormEnabled
    }
  },
  methods: {
    async initialize () {},
    async initializeAfterStoreSelect () {
      this.weekdayDivisionOptions = []
      this.roomCourseOptions = []
      this.memberPriceOptions = [...this.memberPriceOptions]
      this.ageDivisionOptions = []
      this.countSettingOptions = [...this.countSettingOptions]
      this.parameterDataModel = JSON.parse(JSON.stringify(DEFAULT_PARAMETER_DATA_MODEL))
      this.roomRateCode = -1
      this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
      this.isEditButtonEnabled = false
      this.isParameterSelectEnabled = true
      this.isTimeSettingFormEnabled = false
      this.isTimeSettingFormCreateMode = false
      this.initializeParameterSelectPanel()
      this.targetCompanyCodes = this.targetStoreCodes[0].slice(0,15)
    },
    async initializeParameterSelectPanel () {
      // 曜日区分
      this.masterDataQuery(
        RENTALS_WEEKDAY_DIVISION_QUERY_URL,
        {
          nodeId: this.targetStoreCodes[0],
          weekdayCode: 0,
          orderBy: 'weekdayCode',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        },
        null,
        (responseModel) => {
          if (responseModel !== null) {
            this.weekdayDivisionOptions = responseModel.map((value) => {
              return {
                name: value.weekdayName,
                value: value.weekdayCode
              }
            })
          } else {
            throw responseModel
          }
        }
      )
        .then(() => this.masterDataQuery(
          // コース
          RENTALS_ROOM_COURSE_QUERY_URL,
          {
            nodeId: this.targetStoreCodes[0],
            chargeCode: 0,
            orderBy: 'chargeCode',
            ascending: true,
            startIndex: 0,
            batchSize: 0
          },
          null,
          (responseModel) => {
            this.roomCourseOptions = responseModel.map((value) => {
              return {
                name: value.roomCourseName,
                value: value.chargeCode,
                payType: value.payType
              }
            })
          }
        ))
        .then(() => this.masterDataQuery(
          RENTALS_AGE_DIVISION_QUERY_URL,
          {
            // KSD V001.000 DS 不具合No.73：年齢区分取得APIのパラメータ不正対応
            // nodeId: this.targetStoreCodes[0],
            // KSD V001.000 DE 不具合No.73：年齢区分取得APIのパラメータ不正対応
            // KSD V001.000 AS 不具合No.73：年齢区分取得APIのパラメータ不正対応
            nodeId: this.targetStoreCodes[0].slice(0,15),
            // KSD V001.000 AE 不具合No.73：年齢区分取得APIのパラメータ不正対応
            ageDivisionCode: 0,
            orderBy: 'ageDivisionCode',
            ascending: true,
            startIndex: 0,
            batchSize: 0
          },
          null,
          (responseModel) => {
            this.ageDivisionOptions = responseModel.map((value) => {
              return {
                name: value.ageDivisionName,
                value: value.ageDivisionCode
              }
            })
          }
        ))
        .then(() => {
          let storeAuthority = this.$refs.storeSelect.headquartersAuthority === 1
          this.showParameterSelectPanel = true
          this.showTimeSettingPanel = true
          if (!storeAuthority) {
            this.focusFirstFocusableElement()
          }
        })
        .catch((error) => {
          console.error(error)
          this.targetStoreCodes = []
          this.showParameterSelectPanel = false
          this.showTimeSettingPanel = false
          // KSD V001.000 DS refs #81755 対応
          // const { code, message } = this.mapErrorMessage(error)
          // this.openPopupDialog({ mode: 3, messageCode: message, code: code })
          // KSD V001.000 DE refs #81755 対応
          // KSD V001.000 AS refs #81755 対応
          const { code, message } = this.mapErrorMessage(error)
          if(error.data.result.code === 2) {
            this.openPopupDialog({ mode: 3, messageCode: 'C00211.E007', code: code })
            }
            else{
            this.openPopupDialog({ mode: 3, messageCode: message, code: code })
            }
          // KSD V001.000 AE refs #81755 対応
        })
    },
    async initializeTimeSettingPanel () {
      this.$refs.timeDivision1Row.clearValidationErrors()
      this.$refs.timeDivision2Row.clearValidationErrors()
      this.$refs.timeDivision3Row.clearValidationErrors()
      this.$refs.timeDivision4Row.clearValidationErrors()
      this.roomRateCode = -1
      this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
      this.dataModel.data = [JSON.parse(JSON.stringify(this.parameterDataModel))]
      this.isTimeSettingFormCreateMode = false
      this.isEditButtonEnabled = false
      const payload = {
        nodeId: this.targetStoreCodes[0],
        weekdayCode: Number(this.parameterDataModel.weekdayCode),
        chargeCode: Number(this.parameterDataModel.chargeCode),
        memberPrice: Number(this.parameterDataModel.memberPrice),
        ageDivisionCode: Number(this.parameterDataModel.ageDivisionCode),
        countSetting: Number(this.parameterDataModel.countSetting),
        orderBy: 'roomRateCode',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${RENTALS_ROOM_COURSE_RATE_QUERY_URL}`,
          payload,
          commonUtils.methods.getApiHeader()
        ).then(async (response) => {
          if (typeof response.data !== 'object' || response.data === null || Array.isArray(response.data)) {
            this.isParameterSelectEnabled = true
            this.isTimeSettingFormEnabled = false
            if (this.$refs.coursePriceSettingCopyDialog) {
              this.$refs.coursePriceSettingCopyDialog.close()
            }
            await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
            return
          }
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (response.data.responseModel === null ||
                (Array.isArray(response.data.responseModel) && response.data.responseModel.length === 0)) {
                this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
                this.dataModel.nodeId = this.targetStoreCodes[0]
                this.dataModel.data[0] = JSON.parse(JSON.stringify(this.parameterDataModel))
                this.dataModel.timeDivision1 = JSON.parse(JSON.stringify(DEFAULT_TIME_DIVISION_DATA_MODEL))
                this.dataModel.timeDivision2 = JSON.parse(JSON.stringify(DEFAULT_TIME_DIVISION_DATA_MODEL))
                this.dataModel.timeDivision3 = JSON.parse(JSON.stringify(DEFAULT_TIME_DIVISION_DATA_MODEL))
                this.dataModel.timeDivision4 = JSON.parse(JSON.stringify(DEFAULT_TIME_DIVISION_DATA_MODEL))
                this.isTimeSettingFormCreateMode = true
                this.isEditButtonEnabled = true
                if (this.payType === 1) {
                  for (let i = 1; i <= 4; i++) {
                    this.dataModel[`timeDivision${i}`].courseEndTime.start = ''
                    this.dataModel[`timeDivision${i}`].courseEndTime.end = ''
                  }
                }
                resolve(response)
                break
              }
              this.roomRateCode = response.data.responseModel[0].roomRateCode
              Object.keys(this.dataModel).forEach(key => {
                if (response.data.responseModel[0][key]) {
                  this.dataModel[key] = response.data.responseModel[0][key]
                }
              })
              this.dataModel.nodeId = this.targetStoreCodes[0]
              this.dataModel.data[0] = JSON.parse(JSON.stringify(this.parameterDataModel))
              this.dataModel.data[0]['version'] = response.data.responseModel[0].version
              this.isTimeSettingFormCreateMode = false
              this.isEditButtonEnabled = true
              for (let i = 1; i <= 4; i++) {
                if (!this.dataModel[`timeDivision${i}`].base.room) {
                  this.dataModel[`timeDivision${i}`].base[`room`] = 0
                }
                if (!this.dataModel[`timeDivision${i}`].base.drink) {
                  this.dataModel[`timeDivision${i}`].base[`drink`] = 0
                }
                if (!this.dataModel[`timeDivision${i}`].extend.room) {
                  this.dataModel[`timeDivision${i}`].extend[`room`] = 0
                }
                if (!this.dataModel[`timeDivision${i}`].extend.drink) {
                  this.dataModel[`timeDivision${i}`].extend[`drink`] = 0
                }
              }

              if (this.payType !== 1) {
                for (let i = 1; i <= 4; i++) {
                  const courseEndTime = this.dataModel[`timeDivision${i}`].courseEndTime.end
                  this.dataModel[`timeDivision${i}`].courseEndTime.end = courseEndTime === '' ? '0000' : courseEndTime
                }
              }
              resolve(response)
              break
            case 2: // 2:該当する情報なし
              this.roomRateCode = 0
              this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
              this.dataModel.nodeId = this.targetStoreCodes[0]
              this.dataModel.data[0] = JSON.parse(JSON.stringify(this.parameterDataModel))
              this.dataModel.timeDivision1 = JSON.parse(JSON.stringify(DEFAULT_TIME_DIVISION_DATA_MODEL))
              this.dataModel.timeDivision2 = JSON.parse(JSON.stringify(DEFAULT_TIME_DIVISION_DATA_MODEL))
              this.dataModel.timeDivision3 = JSON.parse(JSON.stringify(DEFAULT_TIME_DIVISION_DATA_MODEL))
              this.dataModel.timeDivision4 = JSON.parse(JSON.stringify(DEFAULT_TIME_DIVISION_DATA_MODEL))
              this.isTimeSettingFormCreateMode = true
              this.isEditButtonEnabled = true
              if (this.payType === 1) {
                for (let i = 1; i <= 4; i++) {
                  this.dataModel[`timeDivision${i}`].courseEndTime.start = ''
                  this.dataModel[`timeDivision${i}`].courseEndTime.end = ''
                }
              }
              resolve(response)
              break
            case -90: // -90：セッション不正
              await this.openPopupDialog({ mode: 2, messageCode: 'O00004.W008', code: response.data.result.code, okBtnCallback: () => this.$router.push('/LoginPage') })
              break
            default: // その他
              throw response
          }
        }, async (error) => {
          this.isParameterSelectEnabled = true
          this.isTimeSettingFormEnabled = false
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(error)
          reject(error)
        }).catch(async (error) => {
          this.isParameterSelectEnabled = true
          this.isTimeSettingFormEnabled = false
          const { code, message } = this.mapErrorMessage(error)
          await this.openPopupDialog(
            { mode: 3,
              messageCode: message ? message : 'O00004.W010',
              ...(code ? {code: code} : null)
            })
          reject(error)
        })
      })
    },
    blankCheck () {
      const blanks = [
        this.$refs.timeDivision1Row.isBlank(),
        this.$refs.timeDivision1Row.isDefaultPrice(),
        this.$refs.timeDivision2Row.isBlank(),
        this.$refs.timeDivision2Row.isDefaultPrice(),
        this.$refs.timeDivision3Row.isBlank(),
        this.$refs.timeDivision3Row.isDefaultPrice(),
        this.$refs.timeDivision4Row.isBlank(),
        this.$refs.timeDivision4Row.isDefaultPrice()
      ]
      return blanks.reduce((prev, curr) => prev && curr, true)
    },
    formValidityCheck () {
      const validForms = [
        this.$refs.timeDivision1Row.validateForm(),
        this.$refs.timeDivision2Row.validateForm(),
        this.$refs.timeDivision3Row.validateForm(),
        this.$refs.timeDivision4Row.validateForm()
      ]
      return validForms.reduce((prev, curr) => prev && curr, true)
    },
    inputCheck () {
      // 未使用設定誤りチェック
      const blanks = [
        this.$refs.timeDivision1Row.isBlank(),
        this.$refs.timeDivision2Row.isBlank(),
        this.$refs.timeDivision3Row.isBlank(),
        this.$refs.timeDivision4Row.isBlank()
      ]
      const error = ['required-unused-setting-pattern-1']
      let result = true
      let divNum = 0
      for (let i = 0; i < blanks.length; i++) {
        if (blanks[i] && i < 3 && !blanks[i + 1]) {
          divNum = i + 2
          result = false
        }
        if (!blanks[i] && i <= blanks.length && !result) {
          this.$refs[`timeDivision${divNum}Row`].setValidationError('priceApplyingTime.start', error)
          this.$refs[`timeDivision${divNum}Row`].setValidationError('priceApplyingTime.end', error)
          this.$refs[`timeDivision${divNum}Row`].setValidationError('displayTime.start', error)
          this.$refs[`timeDivision${divNum}Row`].setValidationError('displayTime.end', error)
          divNum += 1
        }
      }
      return result
    },
    timeDivisionCheck () {
      const blanks = [
        this.$refs.timeDivision1Row.isBlank(),
        this.$refs.timeDivision2Row.isBlank(),
        this.$refs.timeDivision3Row.isBlank(),
        this.$refs.timeDivision4Row.isBlank()
      ]
      const div1Ranges = this.$refs.timeDivision1Row.getTimeRanges()
      const div2Ranges = this.$refs.timeDivision2Row.getTimeRanges()
      const div3Ranges = this.$refs.timeDivision3Row.getTimeRanges()
      const div4Ranges = this.$refs.timeDivision4Row.getTimeRanges()
      const timeRangeA = [div1Ranges[0], div2Ranges[0], div3Ranges[0], div4Ranges[0]]
      const timeRangeB = [div1Ranges[1], div2Ranges[1], div3Ranges[1], div4Ranges[1]]
      const error = ['time-range-error']
      let result = true
      const validateTimeRange = [
        this.$refs.timeDivision1Row.validateTimeRanges(),
        this.$refs.timeDivision2Row.validateTimeRanges(),
        this.$refs.timeDivision3Row.validateTimeRanges(),
        this.$refs.timeDivision4Row.validateTimeRanges()
      ]
      result = validateTimeRange.reduce((prev, curr) => prev && curr, true)
      for (let i = 0; i < timeRangeA.length; i++) {
        for (let j = 0; j < timeRangeA[i].length; j++) {
          if (i < 3) {
            if (timeRangeA[i][1] >= timeRangeA[i + 1][0] && !blanks[i + 1]) {
              this.$refs[`timeDivision${i + 1}Row`].setValidationError('priceApplyingTime.end', error)
              this.$refs[`timeDivision${i + 2}Row`].setValidationError('priceApplyingTime.start', error)
              result = false
            }
            if (timeRangeB[i][1] >= timeRangeB[i + 1][0] && !blanks[i + 1]) {
              this.$refs[`timeDivision${i + 1}Row`].setValidationError('displayTime.end', error)
              this.$refs[`timeDivision${i + 2}Row`].setValidationError('displayTime.start', error)
              result = false
            }
          }
        }
      }
      return result
    },
    courseEndTimeCheck () {
      const blanks = [
        this.$refs.timeDivision1Row.isBlank(),
        this.$refs.timeDivision2Row.isBlank(),
        this.$refs.timeDivision3Row.isBlank(),
        this.$refs.timeDivision4Row.isBlank()
      ]
      const nextDayFlags = [
        this.$refs.timeDivision1Row.isNextDayFlag(),
        this.$refs.timeDivision2Row.isNextDayFlag(),
        this.$refs.timeDivision3Row.isNextDayFlag(),
        this.$refs.timeDivision4Row.isNextDayFlag()
      ]
      const courseEndTimeBlanks = [
        this.$refs.timeDivision1Row.isCourseEndTimeBlank(),
        this.$refs.timeDivision2Row.isCourseEndTimeBlank(),
        this.$refs.timeDivision3Row.isCourseEndTimeBlank(),
        this.$refs.timeDivision4Row.isCourseEndTimeBlank()
      ]
      const error = ['multiple-next-day-flag']
      let result = true
      for (let i = 0; i < nextDayFlags.length; i++) {
        if ((!blanks[i] && !courseEndTimeBlanks[i] && !nextDayFlags[i] && this.payType !== 1) ||
          (nextDayFlags.filter(flag => flag === true).length > 1 && (!blanks[i] && nextDayFlags[i])) ||
          (nextDayFlags[i] && !blanks[i + 1] && i < 3) ||
          (blanks[i] && nextDayFlags[i])) {
          this.$refs[`timeDivision${i + 1}Row`].setValidationError('nextDayFlag', error)
          result = false
        }
      }
      return result
    },
    isTimeRangeOverlapping (ranges) {
      let result = false
      let prevTime = null
      let i = 0
      for (i = 0; i < ranges.length; i++) {
        if (ranges[i][0] === '0000' && ranges[i][0] === ranges[i][1]) {
          continue
        }
        const momentStartTime = this.convertToMomentTime(ranges[i][0])
        const momentEndTime = this.convertToMomentTime(ranges[i][1])
        result = result || momentStartTime.isSameOrBefore(prevTime)
        result = result || momentEndTime.isSameOrBefore(momentStartTime)
        if (result) {
          break
        }
        prevTime = momentEndTime
      }
      return [result, i]
    },
    convertToMomentTime: function (value, defaultValue) {
      if (!value || value.length <= 0 || isNaN(value)) {
        return defaultValue
      }
      const momentTime = moment(`${value}`.padStart(4, '0'), ['HHmm'])
      return momentTime.isValid() ? momentTime : defaultValue
    },
    masterDataQuery (url, requestPayload, queryParams, successCallback) {
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.getApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (response.data.responseModel != null) {
                successCallback(response.data.responseModel)
                resolve(response)
              } else {
                reject(response.data.responseModel)
              }
              break
            case -90: // -90：セッション不正
              await this.openPopupDialog({ mode: 2, messageCode: 'O00004.W008', code: response.data.result.code, okBtnCallback: () => this.$router.push('/LoginPage') })
              break
            default: // その他
              throw response
          }
        }, async (error) => {
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        }).catch(async (error) => {
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        })
      })
    },
    async openPopupDialog ({
      mode = 1,
      title = '',
      messageCode = null,
      message = null,
      code = '',
      showBackBtn = false,
      okBtnCallback = null,
      isNonDispStatus = false,
      backBtnCallback = null
    } = {}) {
      if (messageCode !== null && message === null) {
        message = this.$i18n.t(messageCode)
      }
      await this.$refs.pop.open(mode, title, message, code, showBackBtn, okBtnCallback, isNonDispStatus, backBtnCallback)
    },
    closePopupDialog () {
      this.$refs.pop.closeFunction()
    },
    async handleEditButtonClick (event) {
      this.isParameterSelectEnabled = false
      this.isTimeSettingFormEnabled = true
      this.focusFirstFocusableElement()
    },
    handleCloseMaintButton () {
      this.$router.push('/TopPage')
    },
    async handleFixedMaintButton () {
      this.$refs.timeDivision1Row.clearValidationErrors()
      this.$refs.timeDivision2Row.clearValidationErrors()
      this.$refs.timeDivision3Row.clearValidationErrors()
      this.$refs.timeDivision4Row.clearValidationErrors()

      // 妥当性チェック
      const checks = []
      if (!this.blankCheck()) {
        checks.push(this.formValidityCheck())
        checks.push(this.inputCheck())
        checks.push(this.timeDivisionCheck())
        checks.push(this.courseEndTimeCheck())
      }
      const isValid = checks.reduce((prev, curr) => prev && curr, true)
      if (isValid === true) {
        await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
        axios.post(
          `${this.$i18n.t('prop.url')}${RENTALS_ROOM_COURSE_RATE_UPDATE_URL}`,
          { ...this.dataModel },
          commonUtils.methods.getApiHeader({})
        ).then(async (response) => {
          if (typeof response.data !== 'object' || response.data === null || Array.isArray(response.data)) {
            await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
            this.isParameterSelectEnabled = true
            this.isTimeSettingFormEnabled = false
            return
          }
          switch (response.data.result.code) {
            case 0: // 0:正常
              await this.initializeTimeSettingPanel()
                .then(async () => {
                  this.isParameterSelectEnabled = true
                  this.isTimeSettingFormEnabled = false

                  await this.openPopupDialog({
                    mode: 2,
                    messageCode: 'O00004.W002'
                  })
                }, () => { /* NO-OP */ })
                .catch((error) => {
                  const { code, message } = this.mapErrorMessage(error)
                  this.openPopupDialog({ mode: 3, messageCode: message, code: code })
                })
              break
            case -90: // -90：セッション不正
              await this.openPopupDialog({ mode: 2, messageCode: 'O00004.W008', code: response.data.result.code, okBtnCallback: () => this.$router.push('/LoginPage') })
              break
            default: // その他
              throw response
          }
        }, async (error) => {
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(error)
        }).catch(async (error) => {
          const { code, message } = this.mapErrorMessage(error)
          await this.openPopupDialog({ mode: 3, messageCode: message, code: code })
        })
      } else {
        await this.openPopupDialog({
          mode: 3,
          code: '-0099',
          messageCode: 'O00004.W006',
          okBtnCallback: () => {
            this.setFocusOnError()
          }
        })
      }
    },
    async handleStopMaintButton () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.initializeTimeSettingPanel()
            .then(async () => {
              this.isParameterSelectEnabled = true
              this.isTimeSettingFormEnabled = false
            }, () => { /* NO-OP */ })
            .catch((error) => {
              const { code, message } = this.mapErrorMessage(error)
              this.openPopupDialog({ mode: 3, messageCode: message, code: code })
            })
        }
      })
    },
    async handleCopyMaintButton () {
      await this.$refs.coursePriceSettingCopyDialog.open()
    },
    handleParameterSelectionChanged () {
      const canSearch = this.parameterDataModel.weekdayCode > 0 &&
      this.parameterDataModel.chargeCode > 0 &&
      this.parameterDataModel.memberPrice > 0 &&
      this.parameterDataModel.ageDivisionCode > 0 &&
      this.parameterDataModel.countSetting > 0
      if (canSearch) {
        this.initializeTimeSettingPanel()
          .then(null, () => { /* NO-OP */ })
          .catch((error) => {
            const { code, message } = this.mapErrorMessage(error)
            this.openPopupDialog({ mode: 3, messageCode: message, code: code })
          })
      }
    },
    async handleCoursePriceSettingCopyDialogConfirm (data) {
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      const result = this.cartesian(
        data.weekdayCode,
        data.chargeCode,
        data.memberPrice,
        data.ageDivisionCode,
        data.countSetting
      )
      if (result != null && result.length > 0) {
        const copyDataModel = JSON.parse(JSON.stringify(this.dataModel))
        this.version = this.dataModel.data[0].version
        copyDataModel.data = []
        result.forEach(item => {
          const copyParameterDataModel = JSON.parse(JSON.stringify(this.parameterDataModel))
          copyParameterDataModel.weekdayCode = item[0]
          copyParameterDataModel.chargeCode = item[1]
          copyParameterDataModel.memberPrice = item[2]
          copyParameterDataModel.ageDivisionCode = item[3]
          copyParameterDataModel.countSetting = item[4]
          copyParameterDataModel.version = this.version
          copyDataModel.data.push(copyParameterDataModel)
        })
        axios.post(
          `${this.$i18n.t('prop.url')}${RENTALS_ROOM_COURSE_RATE_UPDATE_URL}`,
          copyDataModel,
          commonUtils.methods.getApiHeader({})
        ).then(async (response) => {
          if (typeof response.data !== 'object' || response.data === null || Array.isArray(response.data)) {
            await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
            this.isParameterSelectEnabled = true
            this.isTimeSettingFormEnabled = false
            return
          }
          switch (response.data.result.code) {
            case 0: // 0:正常
              await this.initializeTimeSettingPanel()
                .then(async () => {
                  this.$refs.coursePriceSettingCopyDialog.close()
                  await this.openPopupDialog({
                    mode: 2,
                    messageCode: 'C00211.W001'
                  })
                }, () => {
                  this.$refs.coursePriceSettingCopyDialog.close()
                })
                .catch((error) => {
                  const { code, message } = this.mapErrorMessage(error)
                  this.openPopupDialog({ mode: 3, messageCode: message, code: code })
                })
              break
            case -90: // -90：セッション不正
              await this.openPopupDialog({ mode: 2, messageCode: 'O00004.W008', code: response.data.result.code, okBtnCallback: () => this.$router.push('/LoginPage') })
              break
            default: // その他
              throw response
          }
        }, async (error) => {
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(error)
        }).catch(async (error) => {
          const { code, message } = this.mapErrorMessage(error)
          await this.openPopupDialog({ mode: 3, messageCode: message, code: code })
        })
      }
    },
    mapErrorMessage (response) {
      const errorMsgMap = response && response.data && response.data.result && response.data.result.errorMessageMap || null
      if (errorMsgMap === null || errorMsgMap['global'] === null) {
        return { code: '', message: this.$i18n.t('O00004.W010') }
      } else {
        return { code: response.data.result.code, message: errorMsgMap['global'].toString() }
      }
    },
    cartesian (...args) {
      var r = []
      function helper (arr, i) {
        for (var j = 0; j < (args[i].length); j++) {
          var a = arr.slice(0)
          a.push(args[i][j])
          if (i === (args.length - 1)) {
            r.push(a)
          } else {
            helper(a, i + 1)
          }
        }
      }
      helper([], 0)
      return r
    },
    async setFocusOnError () {
      const rows = this.$children.filter(child => child.$options.name === 'CoursePriceSettingRow')
      let focusable = []
      for (const row of rows) {
        focusable = focusable.concat([...row.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')])
      }
      if (focusable && focusable.length > 0) {
        const target = [...focusable].find(x => !x.disabled && [...x.classList].includes('has-error'))
        if (target) {
          await this.$nextTick(() => {
            target.focus()
          })
        }
      }
    },
    confirmUnload (event) {
      if (this.isTimeSettingFormEnabled) {
        event.returnValue = ''
      }
    },
    async focusFirstFocusableElement () {
      this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    }
  },
  watch: {
    targetStoreCodes: async function (storeCodes) {
      if (this.targetStoreCodes[0] && storeCodes.length > 0) {
        this.initializeAfterStoreSelect()
      }
    },
    parameterDataModel: {
      handler (value) {
        if (value.chargeCode) {
          const courseItem = this.roomCourseOptions.find(e => e.value === value.chargeCode)
          this.payType = courseItem.payType ? courseItem.payType : 1
          this.roomCourseOptionsCopy = this.payType === 1
            ? this.roomCourseOptions.filter(item => item.payType === 1)
            : this.roomCourseOptionsCopy = this.roomCourseOptions.filter(item => item.payType !== 1)
        }
        this.handleParameterSelectionChanged()
      },
      deep: true
    }
  },
  created () {
    this.$root.winId = 'C00211'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.$nextTick()
    await this.initialize()

    let authority = this.$refs.storeSelect.headquartersAuthority !== 0
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 200)
  }
}
// KSD V001.000 AE
