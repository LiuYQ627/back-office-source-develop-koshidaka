// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import CommonSelectDialog from '@/resource/templates/CommonDesign/CommonSelectDialog'
import dialogImageUpload from '@/resource/templates/CommonDesign/DialogImageUpload'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import radioButton from '@/resource/templates/CommonInput/RadioButton'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import DateInput from '@/resource/templates/CommonInput/DateInput'
import validationUtils from '../Common/validationUtils'
import errorMappingUtils from '../Common/errorMappingUtils'
import moment from 'moment'
import popup from '@/resource/templates/CommonDesign/Popup'

const DRINK_COURSE_QUERY_URL = 'RentalsDrinkcourse/Query'

const DEFAULT_DATA_MODEL = {
  indexNo: null,
  course: {
    chargeCode: null,
    roomCourseName: '',
    roomCourseShortName: '',
    payType: null,
    minUserCount: null,
    maxUseTime: null,
    memberFlag: null,
    dispDrinkCourseNo: [],
    startDate: null,
    endDate: null,
    selfDispPosition: null,
    courseImageFiletName: '',
    courseExplanatory1: '',
    courseExplanatory2: '',
    courseExplanatory3: ''
  },
  isCreate: false
}

export default {
  name: 'CourseMasterSettingForm',
  mixins: [validationUtils, errorMappingUtils],
  props: {
    value: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    masterList: {
      type: Array,
      default: []
    },
    nodeIds: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify({ ...DEFAULT_DATA_MODEL })),
      drinkCourseMasterList: [],
      payTypeList: [
        { code: 1, name: this.$i18n.t('C00215.S020') },
        { code: 2, name: this.$i18n.t('C00215.S021') },
        { code: 3, name: this.$i18n.t('C00215.S022') }
      ],
      maxUseTimeList: [
        { code: 0, name: this.$i18n.t('C00215.S023') },
        { code: 1, name: this.$i18n.t('C00215.S024') },
        { code: 2, name: this.$i18n.t('C00215.S025') },
        { code: 3, name: this.$i18n.t('C00215.S026') },
        { code: 4, name: this.$i18n.t('C00215.S027') },
        { code: 5, name: this.$i18n.t('C00215.S028') },
        { code: 6, name: this.$i18n.t('C00215.S029') },
        { code: 7, name: this.$i18n.t('C00215.S030') },
        { code: 8, name: this.$i18n.t('C00215.S031') },
        { code: 9, name: this.$i18n.t('C00215.S032') },
        { code: 10, name: this.$i18n.t('C00215.S033') },
        { code: 11, name: this.$i18n.t('C00215.S034') },
        { code: 12, name: this.$i18n.t('C00215.S035') }
      ],
      memberFlagList: [
        { code: 1, name: this.$i18n.t('C00215.S036') },
        { code: 2, name: this.$i18n.t('C00215.S037') },
        { code: 3, name: this.$i18n.t('C00215.S038') },
        { code: 4, name: this.$i18n.t('C00215.S039') }
      ],
      validations: {
        course: {
          roomCourseName: [['required'], ['maxbytelength', 16]],
          roomCourseShortName: [['required'], ['maxbytelength', 8]],
          payType: [['required']],
          minUserCount: [['required'], ['range', 1, 99], ['numeric'], ['integer']],
          maxUseTime: [['required']],
          memberFlag: [['required']],
          startDate: [['required']],
          endDate: [['required']],
          selfDispPosition: [['optional'], ['range', 1, 999], ['numeric'], ['integer']]
        }
      },
      validationErrors: new Map(),
      labelsDo: [
        { name: '対象', value: true },
        { name: '非対象', value: false }
      ],
      targetStoreCd: [],
      targetStoreText: '',
      drinkCourseInit: false,
      startDateVal: '',
      endDateVal: '',
      endDateOK: true,
      uploadedFile: null,
      resCode: null,
      dialogPop: true,
      commonSelectDialogBtn: {
        save: false
      },
      statusCodeQuery: 0,
      payTypeMaxUseTimeOK: true
    }
  },
  components: {
    CommonSelectDialog,
    dialogImageUpload,
    FormGroupLayout,
    radioButton,
    TextInput,
    DateInput,
    popup
  },
  computed: {
    targetStoreCodes () {
      return this.$parent.targetStoreCodes[0]
    },
    drinkCourseDataMap () {
      return this.drinkCourseMasterList.map(({drinkCourseNo, drinkCourseName, ...res}) => ({...res, code: drinkCourseNo, name: drinkCourseName}))
    }
  },
  methods: {
    async getDrinkCourse () {
      this.dialogPop = true
      await this.masterDataQuery(
        DRINK_COURSE_QUERY_URL,
        {
          nodeId: this.targetStoreCodes,
          drinkCourseNo: 0,
          orderBy: 'drinkCourseNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        },
        (responseModel) => {
          this.drinkCourseMasterList = [...responseModel]
        }
      ).then(() => {
        const result = {
          data: this.statusCodeQuery === 0 ? this.drinkCourseDataMap : [],
          isDisabledSave: this.statusCodeQuery !== 0
        }
        this.checkEmptyResultData(result, this.targetStoreCd)
        if (this.checkNameEmpty(result)) {
          this.$refs.commonSelectDialog.open(result.data, this.targetStoreCd, true, true)
        } else {
          this.$refs.commonSelectDialog.open(result.data, this.targetStoreCd, true, result.isDisabledSave)
        }
      }).catch((err) => { this.globalErrorMapping2(err) })
    },
    masterDataQuery (url, requestPayload, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.getApiHeader()
        ).then((response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              successCallback(response.data.responseModel)
              resolve(response)
              break
            case 2: // 該当する情報なし
              resolve(response)
              break
            default:
              reject(response.data.result)
          }
        }, (err) => {
          console.error(err)
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    async dialogImageUpload () {
      // CS KSD V001.000 #84015
      // this.$refs.dialogImageUpload.open(this.dataModel.course, this.dataModel.indexNo, this.uploadedFile)
      const checkSession = 'CommonDesign/Header'
      axios.get(this.$i18n.t('prop.url') + checkSession + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
      .then(async response => {
        const sessionResult = response.data.result
        if (sessionResult.code !== 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), sessionResult.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else {
          this.$refs.dialogImageUpload.open(this.dataModel.course, this.dataModel.indexNo, this.uploadedFile)
        }
      })
      .catch(error => {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      })
      // CE KSD V001.000 #84015
    },
    imageUploadOk (data) {
      this.dataModel.course.courseImageFiletName = data.courseImageFiletName
      this.dataModel.course.courseExplanatory1 = data.courseExplanatory1
      this.dataModel.course.courseExplanatory2 = data.courseExplanatory2
      this.dataModel.course.courseExplanatory3 = data.courseExplanatory3
      this.uploadedFile = data.uploadedFile
      this.$emit('uploadedFile', { uploadedFile: this.uploadedFile })
    },
    async dialogSelect () {
      await this.getDrinkCourse()
    },
    checkEmptyResultData (result, targetStoreCd) {
      const resultData = result.data.map((item) => item.code)
      const emptyResultData = targetStoreCd.filter((code) => !resultData.includes(code))
      for (const code of emptyResultData) {
        const emptyObject = { code, name: '' }
        const insertIndex = result.data.findIndex((item) => item.code > code)
        if (insertIndex === -1) {
          result.data.push(emptyObject)
        } else {
          result.data.splice(insertIndex, 0, emptyObject)
        }
      }
    },
    checkNameEmpty (result) {
      let nameFlag = false
      result.data.forEach((item) => {
        if (item.name.trim() === '') {
          nameFlag = true
        } else {
          nameFlag = false
        }
      })
      return nameFlag
    },
    async storeSelectOk (selectedStoreCodes) {
      await this.setStoreOk(selectedStoreCodes)
    },
    async setStoreOk (selectedStoreCodes) {
      this.targetStoreCd = selectedStoreCodes
      this.targetStoreText = this.drinkCourseDataMap.filter(res => selectedStoreCodes.includes(res.code)).map(({ code }) => code)
      this.dataModel.course.dispDrinkCourseNo = selectedStoreCodes
    },
    async setStore (selectedStoreCodes) {
      this.targetStoreCd = []
      this.targetStoreText = []
      this.dataModel.course.dispDrinkCourseNo = []
      if (selectedStoreCodes != null) {
        this.targetStoreCd = selectedStoreCodes
        this.targetStoreText = selectedStoreCodes
        this.dataModel.course.dispDrinkCourseNo = selectedStoreCodes
      }
    },
    validateForm () {
      this.validate(this.dataModel, this.validations)
      let endDateOK = this.endDateValid(this.startDateVal, this.endDateVal)
      this.payTypeMaxUseTimeOK = this.payTypeMaxUseTimeValid(this.dataModel.course.payType, this.dataModel.course.maxUseTime, this.dataModel.course.memberFlag)
      return this.validationErrors && this.validationErrors.size <= 0 && endDateOK && this.payTypeMaxUseTimeOK
    },
    validateUniqueForm () {
      this.validate(this.dataModel, this.uniqueValidations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    uniqueValidator () {
      const findResult = this.masterList.find(course => {
        return course.chargeCode !== this.dataModel.course.chargeCode
      })
      return findResult === undefined || findResult == null
    },
    endDateValid (start, end) {
      this.endDateOK = true
      if (new Date(end) >= new Date(start)) this.endDateOK = true
      else this.endDateOK = false
      return this.endDateOK
    },
    payTypeMaxUseTimeValid (payType, maxUseTime, memberFlag) {
      return !(payType === 3 && maxUseTime === 0) && !(maxUseTime === 0 && memberFlag === 3) && !(payType === 2 && maxUseTime !== 0)
    },
    hasError (key) {
      return this.validationErrors && this.validationErrors.has(key)
    },
    errorText (key) {
      let topExtractedError = this.getTopFailedValidation(key)
      if (!topExtractedError && !this.endDateOK && key === 'course.endDate') { return this.$i18n.t('C00215.E015') }
      if (!topExtractedError && !this.payTypeMaxUseTimeOK && key === 'course.maxUseTime') { return this.$i18n.t('C00215.E017') }
      if (!topExtractedError) { return }
      switch (key) {
        case 'course.roomCourseName':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00215.E010')
          }
          return ''
        case 'course.roomCourseShortName':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00215.E010')
          }
          return ''
        case 'course.payType':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00215.E016')
          }
          return ''
        case 'course.minUserCount':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00215.E010')
            case 'numeric':
            case 'integer':
            case 'range':
              return this.$i18n.t('C00215.E011')
          }
          return ''
        case 'course.maxUseTime':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00215.E016')
          }
          return ''
        case 'course.memberFlag':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00215.E016')
          }
          return ''
        case 'course.startDate':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00215.E016')
          }
          return ''
        case 'course.endDate':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00215.E016')
          }
          return ''
        case 'course.selfDispPosition':
          switch (topExtractedError) {
            case 'numeric':
            case 'integer':
            case 'range':
              return this.$i18n.t('C00215.E012')
          }
          return ''
      }
    },
    async setFocus () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    },
    handleFormInput (event) {
      this.$emit('input', this.dataModel)
    }
  },
  watch: {
    async value (value) {
      this.dataModel = JSON.parse(JSON.stringify({ ...DEFAULT_DATA_MODEL }))
      this.targetStoreCd = []
      this.targetStoreText = ''
      this.dataModel.course.dispDrinkCourseNo = []
      if (value) {
        if (value.course) {
          this.dataModel = { ...DEFAULT_DATA_MODEL, ...value }
          this.dataModel.course.chargeCode = value.indexNo
          let course = this.dataModel.course
          if (course.startDate || course.endDate || course.roomCourseName ||
            course.roomCourseShortName || course.minUserCount || course.selfDispPosition
          ) this.drinkCourseInit = false
          if (this.dataModel.course.startDate) {
            this.dataModel.course.startDate = moment(this.dataModel.course.startDate).format('YYYY/MM/DD')
            this.startDateVal = this.dataModel.course.startDate
          }
          if (this.dataModel.course.endDate) {
            this.dataModel.course.endDate = moment(this.dataModel.course.endDate).format('YYYY/MM/DD')
            this.endDateVal = this.dataModel.course.endDate
          }
          if (!this.drinkCourseInit) {
            await this.setStore(value.course.dispDrinkCourseNo)
            this.drinkCourseInit = true
          }
        } else {
          this.dataModel.indexNo = value.indexNo
        }
        return
      }
      this.uploadedFile = null
      this.drinkCourseInit = false
      this.validationErrors = new Map()
    },
    disabled (value) {
      if (value === false) {
        this.setFocus()
      } else {
        this.targetStoreText = ''
        this.endDateOK = true
        this.payTypeMaxUseTimeOK = true
      }
    }
  }
}
// KSD V001.000 AE
