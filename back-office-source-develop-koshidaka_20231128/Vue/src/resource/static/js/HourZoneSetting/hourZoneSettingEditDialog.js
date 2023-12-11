// KSD V001.000 AS
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import CommonDialog from '@/resource/templates/CommonDesign/CommonDialog'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import popup from '@/resource/templates/CommonDesign/Popup'
import moment from 'moment'
import ErrorMessage from '@/resource/templates/CommonDesign/CommonErrorMessageHandler'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import NumericTimeInput from '@/resource/templates/CommonInput/NumericTimeInput'

const DATE_STRING = '1900/01/01'

export default {
  name: 'HourZoneSettingEditDialog',
  mixins: [errorMappingUtils, transformUtils, validationUtils],
  props: {
    value: {
      type: Object,
      required: true
    },
    showEditDialog: {
      type: Boolean,
      default: false
    },
    isNewMaster: {
      type: Boolean,
      default: true
    },
    businessDayStartTime: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify(this.value)),
      unZonedTime: {
        hourZone: this.formattedTime(this.value.hourZone),
        startTime: this.formattedTime(this.value.startTime),
        nextHourZone: this.formattedTime(this.value.nextHourZone),
        businessDayStartTime: this.businessDayStartTime
      },
      printFlags: [
        { name: this.$t('F322b5.S017'), value: true },
        { name: this.$t('F322b5.S018'), value: false }
      ],
      validationErrors: new Map(),
      errorText: ''
    }
  },
  components: {
    popup,
    CommonDialog,
    FormGroupLayout,
    TextInput,
    SelectInput,
    ErrorMessage,
    NumericTimeInput
  },
  computed: {
    displayOrder () {
      return String(this.dataModel.order + 1).padStart(2, '0')
    }
  },
  methods: {
    handleBlur (e) {
      this.dataModel.hourZone = moment(e.target.value, 'HH:mm').format(`${DATE_STRING} HH:mm`)
    },
    handleClockIconClick () {
      this.$refs.timePicker.$el.focus()
    },
    handleSaveBtn () {
      this.clearValidationErrors()
      const valid = this.inputCheck()
      if (valid) {
        this.$emit('submit', this.dataModel)
        this.closeEditDialog()
      }
    },
    async handleBackBtn () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.closeEditDialog()
        }
      })
    },
    async handleDeleteBtn () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W005',
        showBackBtn: true,
        okBtnCallback: () => {
          this.$emit('delete', this.dataModel.order)
          this.closeEditDialog()
        }
      })
    },
    inBetweenValidTimeSpan (input) {
      const startTime = moment(this.unZonedTime.startTime, 'HH:mm')
      const endTime = moment(this.businessDayStartTime, 'HH:mm')
      const inputMoment = moment(input, 'HH:mm')
      return inputMoment.isBetween(startTime, endTime, null, '[]')
    },
    handlePrintFlagChange (val) {
      this.dataModel.printFlag = val === 'true'
    },
    formattedTime (timeInput) {
      return (timeInput === undefined || timeInput === null) ? '' : moment(timeInput).format('HH:mm')
    },
    closeEditDialog () {
      this.$emit('update:showEditDialog', !this.showEditDialog)
    },
    inputCheck () {
      const day = 1440
      const previousTime = moment(this.unZonedTime.startTime, 'HH:mm')
      const currentTime = moment(this.unZonedTime.hourZone, 'HH:mm')
      const nextRowStartTime = moment(this.unZonedTime.nextHourZone, 'HH:mm')
      const busDayStartTime = moment(this.unZonedTime.businessDayStartTime, 'HH:mm')
      const businessDayStartTimeMinutes = busDayStartTime.diff(moment().startOf('day'), 'minutes')
      const businessDayEndTimeMinutes = moment(busDayStartTime).add(1, 'day').diff(moment().startOf('day'), 'minutes')
      const currentTimeMinutes = currentTime.diff(moment().startOf('day'), 'minutes') <= businessDayStartTimeMinutes
        ? currentTime.diff(moment().startOf('day'), 'minutes') + day
        : currentTime.diff(moment().startOf('day'), 'minutes')
      const previousTimeMinutes = previousTime.diff(moment().startOf('day'), 'minutes') < businessDayStartTimeMinutes
        ? previousTime.diff(moment().startOf('day'), 'minutes') + day
        : previousTime.diff(moment().startOf('day'), 'minutes')
      const nextTimeMinutes = nextRowStartTime.diff(moment().startOf('day'), 'minutes') < businessDayStartTimeMinutes
        ? nextRowStartTime.diff(moment().startOf('day'), 'minutes') + day
        : nextRowStartTime.diff(moment().startOf('day'), 'minutes')
      let result = true
      let errors = ['no-error']
      if (currentTimeMinutes === businessDayEndTimeMinutes) {
        return result
      }
      if (!currentTime.isValid()) {
        errors = ['required']
        this.openPopupDialog({ mode: 3, code: -99, messageCode: 'O00004.W006' })

        result = false
      }
      if (currentTimeMinutes <= previousTimeMinutes && currentTimeMinutes > businessDayStartTimeMinutes) {
        errors = ['before-start-time-error']
        this.openPopupDialog({ mode: 3, code: -99, messageCode: 'O00004.W006' })
        result = false
      }
      if (!result) {
        this.setValidationError('dataModel.hourZone', errors)
      }
      if (nextRowStartTime.isValid()) {
        if (currentTimeMinutes >= nextTimeMinutes && nextTimeMinutes !== businessDayStartTimeMinutes) {
          errors = ['after-next-start-time-error']
          this.openPopupDialog({ mode: 3, code: -99, messageCode: 'F322b5.E013' })
          result = false
        }
      }
      if (currentTimeMinutes >= businessDayEndTimeMinutes && nextRowStartTime.isValid()) {
        errors = ['after-business-day-start-time-error']
        this.openPopupDialog({ mode: 3, code: -99, messageCode: 'O00004.W006' })
        result = false
      }
      if (!result) {
        this.setValidationError('dataModel.hourZone', errors)
        switch (errors[0]) {
          case 'required':
            this.errorText = this.$i18n.t('F322b5.E011')
            break
          case 'before-start-time-error':
            this.errorText = this.$i18n.t('F322b5.S019')
            break
          case 'after-next-start-time-error':
            this.errorText = this.$i18n.t('F322b5.E014')
            break
          case 'after-business-day-start-time-error':
            this.errorText = this.$i18n.t('F322b5.S020')
            break
        }
        this.setFocus()
      }

      return result
    },
    setValidationError (key, value) {
      this.validationErrors.set(key, value)
      this.$forceUpdate()
    },
    clearValidationErrors () {
      this.validationErrors.clear()
      this.$forceUpdate()
    },
    hasError (key) {
      return this.validationErrors && this.validationErrors.has(key)
    },
    setFocus () {
      this.$nextTick(() => {
        document.querySelector('input#hour-zone').focus()
      })
    },
    handleOkKeydown (e) {
      e.preventDefault()
      this.setFocus()
    }
  },
  async mounted () {
    setTimeout(() => { this.setFocus() }, 200)
  },
  watch: {
    'unZonedTime.hourZone' (newValue, oldValue) {
      if (newValue === null) return
      const momentTime = moment(newValue, 'HH:mm')
      if (momentTime.isValid()) {
        this.dataModel.hourZone = moment(newValue, 'HH:mm').format(`${DATE_STRING} HH:mm`)
      }
    }
  }
}
// KSD V001.000 AE
