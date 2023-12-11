// KSD V001.000 AS
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import radioButton from '@/resource/templates/CommonInput/RadioButton'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import validationUtils from '../Common/validationUtils'

const DEFAULT_DATA_MODEL = {
  indexNo: null,
  table: {
    indexNo: null,
    tblNo: null,
    restNo: 0,
    tblName: null,
    tblNameShort: '',
    sekiryo: 0,
    hoSts: 0,
    tblAutoNo: 0
  },
  room: {
    indexNo: null,
    tblNo: null,
    maxCount: null,
    // roomExtendAvailable: true,
    roomPlusPrice: 0,
    roomPriority: null,
    drinkbarRoomPriority: null,
    freeFlowingDrinkRoomPriority: null,
    specialRoom: true,
    reservedAvailable: true
  },
  isCreate: false
}

export default {
  name: 'RoomInfoMasterSettingForm',
  mixins: [validationUtils],
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
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify({ ...DEFAULT_DATA_MODEL })),
      validations: {
        table: {
          tblNo: [['required'], ['maxlength', 5], ['halfwidth'], ['alphanumeric']],
          tblName: [['required'], ['maxbytelength', 10]],
          tblNameShort: [['required', ['maxbytelength', 8]]]
        },
        room: {
          maxCount: [['required'], ['range', 1, 100], ['numeric'], ['integer']],
          roomPlusPrice: [['required'], ['range', 0, 999999], ['numeric'], ['integer']],
          roomPriority: [['required'], ['range', 1, 999], ['numeric'], ['integer']],
          drinkbarRoomPriority: [['required'], ['range', 1, 999], ['numeric'], ['integer']],
          freeFlowingDrinkRoomPriority: [['required'], ['range', 1, 999], ['numeric'], ['integer']],
          specialRoom: [['required'], ['boolean']],
          reservedAvailable: [['required'], ['boolean']]
        }
      },
      uniqueValidations: {
        table: {
          tblNo: [['unique']]
        }
      },
      validationErrors: new Map(),
      labelsDo: [
        { name: this.$i18n.t('C00208.S014'), value: true },
        { name: this.$i18n.t('C00208.S015'), value: false }
      ]
    }
  },
  components: {
    FormGroupLayout,
    radioButton,
    TextInput
  },
  methods: {
    validateForm () {
      this.validate(this.dataModel, this.validations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    validateUniqueForm () {
      this.validate(this.dataModel, this.uniqueValidations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    uniqueValidator () {
      const findResult = this.masterList.find(table => {
        return table.indexNo !== this.dataModel.table.indexNo &&
          table.tblNo.trimLeft() === this.dataModel.table.tblNo
      })
      return findResult === undefined || findResult == null
    },
    hasError (key) {
      return this.validationErrors && this.validationErrors.has(key)
    },
    errorText (key) {
      let topExtractedError = this.getTopFailedValidation(key)
      if (!topExtractedError) { return }
      switch (key) {
        case 'table.tblNo':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
            case 'maxlength':
            case 'halfwidth':
            case 'alphanumeric':
              // 半角英数字 1 文字以上 5 文字以下で入力してください。
              return this.$i18n.t('C00208.E026')
            case 'unique':
              // 同じ部屋Noが複数設定されています。入力値を確認してください。
              return this.$i18n.t('C00208.E017')
          }
          return ''
        case 'table.tblName':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
            case 'maxbytelength':
              // 全角の場合は 1 文字以上 5 文字以下、半角の場合は 1 文字以上 10 文字以下で入力してください。
              return this.$i18n.t('C00208.E027')
          }
          return ''
        case 'table.tblNameShort':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
          }
          return ''
        case 'room.maxCount':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
            case 'numeric':
            case 'integer':
            case 'range':
              // 1 以上 100 以下の値で入力してください。
              return this.$i18n.t('C00208.E019')
          }
          return ''
        case 'room.roomPlusPrice':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
            case 'numeric':
            case 'integer':
            case 'range':
              // 1 以上 999999 以下の値で入力してください。
              return this.$i18n.t('C00208.E030')
          }
          return ''
        case 'room.roomPriority':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
            case 'numeric':
            case 'integer':
            case 'range':
              // 1 以上 999 以下の値で入力してください。
              return this.$i18n.t('C00208.E021')
          }
          return ''
        case 'room.drinkbarRoomPriority':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
            case 'numeric':
            case 'integer':
            case 'range':
              // 1 以上 999 以下の値で入力してください。
              return this.$i18n.t('C00208.E021')
          }
          return ''
        case 'room.freeFlowingDrinkRoomPriority':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
            case 'numeric':
            case 'integer':
            case 'range':
              // 1 以上 999 以下の値で入力してください。
              return this.$i18n.t('C00208.E021')
          }
          return ''
        case 'room.specialRoom':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
          }
          return ''
        case 'room.reservedAvailable':
          switch (topExtractedError) {
            case 'required':
              // 必ず入力してください。
              return this.$i18n.t('C00208.E016')
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
    async handleFormInput (event, inputField) {
      await this.$nextTick()
      this.$emit('input', this.dataModel)
      switch (inputField) {
        case 'tblNo':
          this.dataModel.table.tblNo = validationUtils.methods.excludeProhibitedInput(this.dataModel.table.tblNo, /[^A-Z0-9]/g, this.dataModel['table'], 'tblNo')
          break
        case 'tblName':
          this.dataModel.table.tblName = validationUtils.methods.excludeProhibitedInput(this.dataModel.table.tblName, /[\^\,\'\"\>\<\%\&]/g, this.dataModel['table'], 'tblName')
          break
        case 'tblNameShort':
          this.dataModel.table.tblNameShort = validationUtils.methods.excludeProhibitedInput(this.dataModel.table.tblNameShort, /[\^\,\'\"\>\<\%\&]/g, this.dataModel['table'], 'tblNameShort')
          break
      }
    },
    handleTblNoFocusout () {
      if (this.dataModel && this.dataModel.table && this.dataModel.table.tblNo) {
        this.dataModel.table.tblNo = this.dataModel.table.tblNo.replace(/\b0+/, '')
      }
    }
  },
  watch: {
    value (value) {
      this.dataModel = JSON.parse(JSON.stringify({ ...DEFAULT_DATA_MODEL }))
      if (value) {
        if (value.table && value.room) {
          this.dataModel = { ...DEFAULT_DATA_MODEL, ...value }
          this.dataModel.table.indexNo = value.indexNo
          this.dataModel.room.indexNo = value.indexNo
        } else {
          this.dataModel.indexNo = value.indexNo
          this.dataModel.table.indexNo = value.indexNo
          this.dataModel.room.indexNo = value.indexNo
        }
        if (this.dataModel.table.tblNo) this.dataModel.table.tblNo = this.dataModel.table.tblNo.trim()
        return
      }
      this.validationErrors = new Map()
    },
    'dataModel.table.tblNo' (newValue) {
      if (this.dataModel.room) {
        this.dataModel.room.tblNo = newValue
      }
    },
    disabled (value) {
      if (value === false) {
        this.setFocus()
      }
    }
  }
}
// KSD V001.000 AE
