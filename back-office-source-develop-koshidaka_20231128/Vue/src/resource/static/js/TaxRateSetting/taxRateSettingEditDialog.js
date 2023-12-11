// KSD V001.000 AS
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import CommonDialog from '@/resource/templates/CommonDesign/CommonDialog'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import popup from '@/resource/templates/CommonDesign/Popup'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import NumericInputSingleDigit from '@/resource/templates/CommonInput/NumericInputSingleDigit'
import ErrorMessage from '@/resource/templates/CommonDesign/CommonErrorMessageHandler'

const DEFAULT_DATA_MODEL = {
  name: null,
  displayName: null,
  taxType: null,
  rate: '',
  taxMark: null,
  reducedTax: null
}

export default {
  name: 'TaxRateSettingEditDialog',
  mixins: [errorMappingUtils, transformUtils, validationUtils],
  props: {
    value: {
      type: Object,
      default: () => { return {} }
    },
    showEditDialog: {
      type: Boolean,
      default: false
    },
    isNewTaxMaster: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify(this.value)),
      validations: {
        displayName: [['required'], ['minlength', 1]],
        rate: [['required'], ['range', 0, 99.99], ['float']],
      },
      validationErrors: new Map(),
      rateTypeOptions: [
        { name: this.$t('F322b4.S014'), value: 'INTERNAL' },
        { name: this.$t('F322b4.S015'), value: 'EXTERNAL' },
        { name: this.$t('F322b4.S016'), value: 'EXEMPT' }
      ],
      reducedTaxOptions: [
        { name: this.$t('F322b4.S017'), value: 1 },
        { name: this.$t('F322b4.S018'), value: 0 }
      ]
    }
  },
  components: {
    popup,
    CommonDialog,
    FormGroupLayout,
    TextInput,
    SelectInput,
    NumericInputSingleDigit,
    ErrorMessage
  },
  computed: {
    isTaxExempt () {
      return this.dataModel.taxType === 'EXEMPT' || false
    },
    disabledSaveBtn () {
      DEFAULT_DATA_MODEL.name = this.dataModel.name
      return JSON.stringify(this.dataModel).length === JSON.stringify(DEFAULT_DATA_MODEL).length
    },
    maxCharsName () {
      return this.maxInputChars(this.dataModel.displayName, 12)
    },
    maxCharsMark () {
      return this.maxInputChars(this.dataModel.taxMark, 2)
    }
  },
  methods: {
   // AS KSD V001.000 #84581
    inputLimit (str, maxLength) {
      // AS KSD V001.000 #84581
      if(!str) return
      // AE KSD V001.000 #84581
      var strLen = str.toString().length
      // byte数の取得
      var byteLen = 0
      for (var i = 0; i < strLen; i++) {
        var codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
          (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          if (this.dataModel.displayName == str) {
            this.dataModel.displayName = str.toString().substring(0, i)
          } 
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    },
    // AE KSD V001.000 #84581
    handleSelectTaxType (val) {
      if (!this.isTaxExempt) {
        this.dataModel.type = val
        return
      }
      this.$refs.rateInput.zeroAssign()
      Object.assign(this.dataModel, {
        rate: '00.00',
        reducedTax: 0,
        type: val
      })
    },
    handleSaveBtn () {
      const valid = this.inputCheck()
      if (valid) {
        this.$emit('update', this.dataModel)
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
        messageCode: 'F322b4.W002',
        showBackBtn: true,
        okBtnCallback: () => {
          this.$emit('delete', this.dataModel.name)
          this.closeEditDialog()
        }
      })
    },
    handleOkKeydown () {
      document.getElementById('tax-name').focus()
    },
    closeEditDialog () {
      this.$emit('update:showEditDialog', !this.showEditDialog)
    },
    handleRateChange (val) {
      if (!this.$refs.rateInput.hasBlank()) {
        this.dataModel.rate = val
      }
    },
    inputCheck () {
      this.validate(this.dataModel, this.validations)
      const validationResult = this.validationErrors && this.validationErrors.size <= 0
      const rateHasBlank = this.$refs.rateInput.hasBlank()
      if (rateHasBlank) {
        this.validationErrors.set('rate', [{result: false, validation: ['required']}])
      }
      let result = true
      if (!validationResult || rateHasBlank) {
        this.openPopupDialog({
          mode: 3,
          code: -99,
          messageCode: 'O00004.W006',
          okBtnCallback: () => {
            this.validationErrors.has('displayName')
              ? this.setFocus()
              : setTimeout(() => {
                document.querySelector('input[type="number"]').focus()
              }, 100)
          }
        })
        result = false
      }
      return result
    },
    hasError (key) {
      return this.validationErrors && this.validationErrors.has(key)
    },
    maxInputChars (data, max) {
      if (String(data).length === 0) {
        return max / 2
      }
      if (String(data).charCodeAt(0) > 255) {
        return max / 2
      } else {
        return max
      }
    },
    async setFocus () {
      await this.$nextTick(() => {
        const focusable = document.querySelectorAll('input#tax-name')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    }
  },
  mounted () {
    if (this.isNewTaxMaster) {
      this.dataModel.taxType = 'EXEMPT'
      this.handleSelectTaxType(this.dataModel.taxType)
    }
    setTimeout(() => {
      this.setFocus()
    }, 100)
  }
}
// KSD V001.000 AE
