// KSD V001.000 AS
import CommonSelectDialog from '@/resource/templates/CommonDesign/CommonSelectDialog'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import popup from '@/resource/templates/CommonDesign/Popup'
import DateInput from '@/resource/templates/CommonInput/DateInput'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import moment from 'moment'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'

const DEFAULT_DATA_MODEL = {
  indexNo: null,
  priceList: {
    name: '',
    priceDispNo: null,
    priceCourseName: '',
    chargeCode: null,
    courseDispPos: null,
    priceDispPos: null,
    startDate: '',
    endDate: ''
  },
  isCreate: false
}

export default {
  name: 'PriceListDisplayMasterSettingForm',
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
    },
    roomCourseMasterList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify({ ...DEFAULT_DATA_MODEL })),
      priceDispPosList: [
        { code: 0, name: this.$i18n.t('C00224.S028') },
        { code: 1, name: this.$i18n.t('C00224.S029') },
        { code: 2, name: this.$i18n.t('C00224.S030') }
      ],
      validations: {
        priceList: {
          priceCourseName: [['required'], ['maxbytelength', 16]],
          courseDispPos: [['required'], ['range', 1, 20], ['numeric'], ['integer']],
          startDate: [['required']],
          endDate: [['required']]
        }
      },
      validationErrors: new Map(),
      targetStoreCd: [],
      targetStoreText: '',
      startDateVal: '',
      endDateVal: '',
      endDateOK: true,
      courseDispPosOK: true,
      priceDispPosSettingOK: true,
      priceDispPosNoSettingOK: true,
      roomCourseTopMostVal: null,
      courseDispPosErrorMsg: null,
      endDateErrorMsg: null,
      priceDispPosErrorMsg: ''
    }
  },
  components: {
    CommonSelectDialog,
    FormGroupLayout,
    TextInput,
    DateInput,
    popup
  },
  computed: {
    targetStoreCodes () {
      return this.$parent.targetStoreCodes[0]
    },
    chargeCodeList () {
      const vue = this
      return vue.roomCourseMasterList
    },
    chargeCodeDefVal () {
      return this.chargeCodeList[0].chargeCode
    }
  },
  methods: {
    validateForm () {
      this.validate(this.dataModel, this.validations)
      const endDateOK = this.endDateValid(this.startDateVal, this.endDateVal)
      const courseDispPosOK = this.uniqueValidator(Number(this.dataModel.priceList.courseDispPos))
      const priceDispPosOK = this.priceDispPosValid(this.dataModel.priceList.courseDispPos, this.dataModel.priceList.priceDispPos)
      return this.validationErrors && this.validationErrors.size <= 0 && endDateOK && courseDispPosOK && priceDispPosOK
    },
    uniqueValidator (currCourseDispPos) {
      const findSelf = this.masterList.filter(x => x.priceDispNo === Number(this.dataModel.priceList.priceDispNo))
      this.courseDispPosOK = this.courseDispPosValid()
      if (findSelf) {
        if (findSelf[0] === undefined) return true
        if (findSelf[0].courseDispPos === currCourseDispPos) return true
      }
      return this.courseDispPosOK
    },
    courseDispPosValid () {
      const currCourseDispPos = Number(this.dataModel.priceList.courseDispPos)
      const currPriceDispNo = Number(this.dataModel.priceList.priceDispNo)
      const findPair = this.masterList.filter(x => x.courseDispPos === currCourseDispPos && x.priceDispNo !== currPriceDispNo)
      if (findPair.length === 0) return true
      else if (findPair.length === 1) {
        var priceDispPosVal = findPair[0].priceDispPos
        if (priceDispPosVal === 0) return false
        else return true
      } else if (findPair.length === 2) return false
    },
    priceDispPosValid (currCourseDispPos, currPriceDispPos) {
      this.priceDispPosSettingOK = true
      this.priceDispPosNoSettingOK = true
      const matchRowsCourseDispPos = this.masterList.filter(x => x.courseDispPos === Number(currCourseDispPos))
      const matchRowsPriceDispNo = this.masterList.filter(x => x.priceDispNo === this.dataModel.priceList.priceDispNo)
      const getPairedRows = matchRowsCourseDispPos.filter(x => x.priceDispNo !== this.dataModel.priceList.priceDispNo)
      const isNewCourseDispPos = matchRowsCourseDispPos.length === 0
      const isNewPriceDispNo = matchRowsPriceDispNo.length === 0
      if (!(isNewPriceDispNo && isNewCourseDispPos) && getPairedRows[0] !== undefined) {
        if (currPriceDispPos === 0) {
          if ((matchRowsCourseDispPos.length > 1) ||
              getPairedRows.length > 0 ||
              getPairedRows[0].priceDispPos !== 0) {
            this.priceDispPosNoSettingOK = false
          }
        } else if (currPriceDispPos !== 0) {
          if ((matchRowsCourseDispPos.length > 2) ||
              getPairedRows.length > 1 ||
              (getPairedRows[0].priceDispPos === 0 || (currPriceDispPos === getPairedRows[0].priceDispPos))) {
            this.priceDispPosSettingOK = false
          }
        }
      }
      return this.priceDispPosSettingOK && this.priceDispPosNoSettingOK
    },
    endDateValid (start, end) {
      this.endDateOK = true
      if (!this.dataModel.priceList.endDate) return
      if (new Date(end) >= new Date(start)) this.endDateOK = true
      else this.endDateOK = false
      return this.endDateOK
    },
    hasError (key) {
      return this.validationErrors && this.validationErrors.has(key)
    },
    errorText (key) {
      var topExtractedError = this.getTopFailedValidation(key)
      if (!this.courseDispPosOK) {
        this.courseDispPosErrorMsg = this.$i18n.t('C00224.E014')
      }
      if (!topExtractedError && !this.priceDispPosSettingOK) {
        this.priceDispPosErrorMsg = this.$i18n.t('C00224.E012')
      }
      if (!topExtractedError && !this.priceDispPosNoSettingOK) {
        this.priceDispPosErrorMsg = this.$i18n.t('C00224.E011')
      }
      if (!this.endDateOK) {
        this.endDateErrorMsg = this.$i18n.t('C00224.E013')
      }
      if (!topExtractedError) { }
      switch (key) {
        case 'priceList.priceCourseName':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00224.E009')
          }
          return ''
        case 'priceList.courseDispPos':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00224.E009')
            case 'numeric':
            case 'integer':
            case 'range':
              return this.$i18n.t('C00224.E015')
          }
          return ''
        case 'priceList.startDate':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00224.E009')
          }
          return ''
        case 'priceList.endDate':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('C00224.E009')
          }
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
      if (value) {
        if (value.priceList) {
          this.dataModel = { ...DEFAULT_DATA_MODEL, ...value }
          this.dataModel.priceList.priceDispNo = value.indexNo
          if (this.dataModel.priceList.startDate) {
            this.dataModel.priceList.startDate = moment(this.dataModel.priceList.startDate).format('YYYY/MM/DD')
            this.startDateVal = this.dataModel.priceList.startDate
          }
          if (this.dataModel.priceList.endDate) {
            this.dataModel.priceList.endDate = moment(this.dataModel.priceList.endDate).format('YYYY/MM/DD')
            this.endDateVal = this.dataModel.priceList.endDate
          }
          if (!value.priceList.priceDispPos) {
            value.priceList.priceDispPos = 0
          }
          if (!value.priceList.chargeCode) {
            value.priceList.chargeCode = this.chargeCodeDefVal
          }
        } else {
          this.dataModel.indexNo = value.indexNo
        }
        return
      }
      this.validationErrors = new Map()
    },
    disabled (value) {
      if (value === false) {
        this.setFocus()
      } else {
        this.targetStoreText = ''
        this.endDateOK = true
      }
    }
  }
}
// KSD V001.000 AE
