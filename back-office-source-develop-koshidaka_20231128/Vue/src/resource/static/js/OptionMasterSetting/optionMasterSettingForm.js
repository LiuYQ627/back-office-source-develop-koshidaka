// KSD V001.000 AS
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import popup from '@/resource/templates/CommonDesign/Popup'

const DEFAULT_DATA_MODEL = {
  drinkCourseNo: null,
  option: {
    nodeId: '',
    drinkCourseNo: 0,
    drinkCourseName: '',
    drinkCourseListChargesName: '',
    optionType: 1,
    priceOption: 0,
    drinkCourseMenuCode1: null,
    drinkCourseMenuCode2: null
  },
  isCreate: false
}

const DEFAULT_MENU_CODE_DATA_MODEL = {
  skuId: null,
  name: null,
  price: null
}

const VIEW_MODE_DATA_MODEL = {
  drinkCourseNo: null,
  option: {
    nodeId: null,
    drinkCourseNo: null,
    drinkCourseName: '',
    drinkCourseListChargesName: '',
    optionType: 1,
    priceOption: 0,
    drinkCourseMenuCode1: null,
    drinkCourseMenuCode2: null
  }
}

const PRODUCT_QUERY = 'ProductMaster/ProductSearch'

export default {
  name: 'OptionMasterSettingForm',
  mixins: [validationUtils, transformUtils, errorMappingUtils],
  props: {
    value: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    targetStoreCodes: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify({ ...VIEW_MODE_DATA_MODEL })),
      drinkCourseMenuCode1DataModel: {
        skuId: null,
        name: null,
        price: null
      },
      drinkCourseMenuCode2DataModel: {
        skuId: null,
        name: null,
        price: null
      },
      generalValidations: {
        option: {
          drinkCourseName: [['required'], ['maxlength', 20]],
          drinkCourseListChargesName: [['optional'], ['maxlength', 20]],
          optionType: [['required'], ['range', 1, 5]],
          priceOption: [['required'], ['range', 0, 2]],
          drinkCourseMenuCode1: [['optional'], ['numeric'], ['range', 1, 9999999999998], ['banNumber', [9999]]],
          drinkCourseMenuCode2: [['optional'], ['numeric'], ['range', 1, 9999999999998], ['banNumber', [9999]]]
        }
      },
      isExistingValidations: {
        drinkCourseMenuCode1DataModel: {
          exists: [['requiredIfExists', 'option.drinkCourseMenuCode1'], ['boolean']]
        },
        drinkCourseMenuCode2DataModel: {
          exists: [['requiredIfExists', 'option.drinkCourseMenuCode2'], ['boolean']]
        }
      },
      isUniqueValidations: {
        option: {
          drinkCourseMenuCode1: 'unique',
          drinkCourseMenuCode2: 'unique'
        }
      },
      optionTypeOptions: [
        { name: this.$i18n.t('C00217.S014'), value: 1 }, // ワンオーダー
        { name: this.$i18n.t('C00217.S015'), value: 2 }, // ドリンクバー
        { name: this.$i18n.t('C00217.S016'), value: 3 }, // ソフト付DB
        { name: this.$i18n.t('C00217.S017'), value: 4 }, // 飲み放題
        { name: this.$i18n.t('C00217.S018'), value: 5 } // なし
      ],
      priceOptionOptions: [
        { name: this.$i18n.t('C00217.S018'), value: 0 }, // なし
        { name: this.$i18n.t('C00217.S019'), value: 1 }, // 固定料金
        { name: this.$i18n.t('C00217.S020'), value: 2 } // 時間課金
      ],
      hasChanged: false,
      isInitialized: false,
      debounce: null
    }
  },
  components: {
    FormGroupLayout,
    TextInput,
    SelectInput,
    popup
  },
  computed: {
    optionType () {
      return this.dataModel.option.optionType
    }
  },
  methods: {
    handleOptionSystemInput (event) {
      this.dataModel.option.priceOption = 0
      this.dataModel.option.drinkCourseMenuCode1 = null
      this.dataModel.option.drinkCourseMenuCode2 = null
      this.validationErrors.delete('option.drinkCourseMenuCode1')
      this.validationErrors.delete('option.drinkCourseMenuCode2')
      this.validationErrors.delete('drinkCourseMenuCode1DataModel.exists')
      this.validationErrors.delete('drinkCourseMenuCode2DataModel.exists')
      this.drinkCourseMenuCode1DataModel = {
        skuId: null,
        name: null,
        price: null
      }
      this.drinkCourseMenuCode2DataModel = {
        skuId: null,
        name: null,
        price: null
      }
      clearTimeout(this.debounce)
    },
    optionalValidator (value) {
      if (Array.isArray(value) && value[0][0] === '') return true
      if (value === null || value === '' || value === undefined) return true
      return false
    },
    uniqueValidator () {
      if (this.dataModel.option.optionType === 1) return
      if (Number(this.dataModel.option.drinkCourseMenuCode1) === 0) return
      return Number(this.dataModel.option.drinkCourseMenuCode1) !== Number(this.dataModel.option.drinkCourseMenuCode2)
    },
    async synchronizeInputs () {
      return new Promise(async (resolve) => {
        await this.$nextTick(async () => {
          if (this.debounce != null) {
            clearInterval(this.debounce)
          }
          if (Number(this.dataModel.option.drinkCourseMenuCode1) !== Number(this.drinkCourseMenuCode1DataModel.skuId)) {
            await this.getProductDetails(this.dataModel.option.drinkCourseMenuCode1, 'drinkCourseMenuCode1DataModel')
          }
          if (Number(this.dataModel.option.drinkCourseMenuCode2) !== Number(this.drinkCourseMenuCode2DataModel.skuId)) {
            await this.getProductDetails(this.dataModel.option.drinkCourseMenuCode2, 'drinkCourseMenuCode2DataModel')
          }
          if (Number(this.dataModel.option.optionType) === 5) {
            this.dataModel.option.priceOption = 0
          }
          return resolve(true)
        })
      })
    },
    validateInputs () {
      this.validate(this.dataModel, this.generalValidations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    validateExisting () {
      let optionType = Number(this.dataModel.option.optionType)
      if (![2, 3, 4].includes(optionType)) {
        this.dataModel.option.drinkCourseMenuCode2 = undefined
        this.drinkCourseMenuCode2DataModel = { ...DEFAULT_MENU_CODE_DATA_MODEL }
        if (optionType !== 1) {
          this.dataModel.option.drinkCourseMenuCode1 = undefined
          this.drinkCourseMenuCode1DataModel = { ...DEFAULT_MENU_CODE_DATA_MODEL }
        }
      }
      let validationModel = {
        ...this.dataModel,
        drinkCourseMenuCode1DataModel: this.drinkCourseMenuCode1DataModel,
        drinkCourseMenuCode2DataModel: this.drinkCourseMenuCode2DataModel
      }
      this.validate(validationModel, this.isExistingValidations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    validateUnique () {
      this.validate(this.dataModel, this.isUniqueValidations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    hasError (key) {
      return this.validationErrors && this.validationErrors.has(key)
    },
    errorText (key) {
      let topExtractedError = this.getTopFailedValidation(key)
      let errorMessages = {
        required: this.$i18n.t('C00217.E012'),
        unique: this.$i18n.t('C00217.E013'),
        existence: this.$i18n.t('C00217.E009'),
        range: this.$i18n.t('C00217.E014'),
        banNumber: this.$i18n.t('C00217.E015')
      }
      if (!topExtractedError) { return }
      switch (key) {
        case 'option.drinkCourseName':
          switch (topExtractedError) {
            case 'required':
              return errorMessages.required
          }
          return ''
        case 'option.drinkCourseListChargesName':
          switch (topExtractedError) {
            case 'required':
              return errorMessages.required
          }
          return ''
        case 'option.optionType':
          switch (topExtractedError) {
            case 'required':
              return ''
          }
          return ''
        case 'option.priceOption':
          switch (topExtractedError) {
            case 'required':
              return ''
          }
          return ''
        case 'option.drinkCourseMenuCode1':
          switch (topExtractedError) {
            case 'required':
              return errorMessages.required
            case 'unique':
              return errorMessages.unique
            case 'range':
              return errorMessages.range
            case 'banNumber':
              return errorMessages.banNumber
          }
          return topExtractedError
        case 'option.drinkCourseMenuCode2':
          switch (topExtractedError) {
            case 'required':
              return errorMessages.required
            case 'unique':
              return errorMessages.unique
            case 'range':
              return errorMessages.range
            case 'banNumber':
              return errorMessages.banNumber
          }
          return ''
        case 'drinkCourseMenuCode1DataModel.exists':
          switch (topExtractedError) {
            case 'boolean':
              return errorMessages.existence
          }
          return ''
        case 'drinkCourseMenuCode2DataModel.exists':
          switch (topExtractedError) {
            case 'boolean':
              return errorMessages.existence
          }
          return ''
      }
    },
    handleFormInput (event) {
      this.$emit('input', this.dataModel)
    },
    handleMenuCodeInput (model, event) {
      clearTimeout(this.debounce)
      this.$emit('input', this.dataModel)
      this.debounce = setTimeout(async () => {
        await this.getProductDetails(event, model)
        clearTimeout(this.debounce)
        this.debounce = null
      }, 1000)
    },
    async setFocus () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    },
    async handleBlurEvent (model1, model2, event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(async () => {
        await this.getProductDetails(event.target.value, model1)
        await this.defaultZeroBlank(event, model2)
        clearTimeout(this.debounce)
        this.debounce = null
      }, 1000)
    },
    async getProductDetails (drinkCourseMenuCode, model) {
      if (!drinkCourseMenuCode) {
        this[model] = { ...DEFAULT_MENU_CODE_DATA_MODEL }
        return
      }

      if (this[model].skuId && Number(this[model].skuId) === Number(drinkCourseMenuCode)) return

      let url = `${PRODUCT_QUERY}?_=dateTime_=${Date.now()}`
      let params = {
        nodeId: this.targetStoreCodes[0],
        itemId: this.zeroSupply(drinkCourseMenuCode, 14)
      }
      this[model] = { ...DEFAULT_MENU_CODE_DATA_MODEL, skuId: drinkCourseMenuCode }
      const productPromise = await this.masterDataQuery(url, params)
      return Promise
        .all([productPromise])
        .then(async (response) => {
          if (response[0].data.result.code === 0) {
            this[model] = {
              exists: true,
              name: response[0].data.responseModel.catalogs.displayName.default,
              price: response[0].data.responseModel.pricelists.price,
              skuId: drinkCourseMenuCode
            }
          } else {
            this[model] = { ...DEFAULT_MENU_CODE_DATA_MODEL, skuId: drinkCourseMenuCode }
          }
        }, (error) => {
          console.error(error)
        }).catch((error) => {
          console.error(error)
        })
    },
    defaultZeroBlank (event, model) {
      if (!event.target.value) {
        event.target.value = undefined
        this.dataModel.option[model] = undefined
      }
    },
    resetValues () {
      this.isInitialized = false
      this.hasChanged = false
      this.drinkCourseMenuCode1DataModel = { ...DEFAULT_MENU_CODE_DATA_MODEL }
      this.drinkCourseMenuCode2DataModel = { ...DEFAULT_MENU_CODE_DATA_MODEL }
      this.validationErrors = new Map()
      this.dataModel = { ...VIEW_MODE_DATA_MODEL }
    },
    masterDataQuery (url, queryParams, successCallback) {
      return new Promise((resolve, reject) => {
        axios.get(
          `${this.$i18n.t('prop.url')}${url}`,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (successCallback != null) {
                successCallback(response.data.responseModel)
              }
              resolve(response)
              break
            case 2: // 2:該当する情報なし
              resolve(response)
              break
            default: // -90：セッション不正
              await this.globalErrorMapping(response.data.result)
              reject(response)
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        }).catch(async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        })
      })
    }
  },
  watch: {
    async value (value) {
      this.dataModel = JSON.parse(JSON.stringify({ ...DEFAULT_DATA_MODEL }))
      if (value) {
        if (value.option) {
          this.dataModel = { ...DEFAULT_DATA_MODEL, ...value }
          this.dataModel.option.drinkCourseNo = value.drinkCourseNo
          let optionType = Number(this.dataModel.option.optionType)
          if (![2, 3, 4].includes(optionType)) {
            this.dataModel.option.drinkCourseMenuCode2 = null
            await this.getProductDetails(this.dataModel.option.drinkCourseMenuCode2, 'drinkCourseMenuCode2DataModel')

            if (optionType !== 1) {
              this.dataModel.option.drinkCourseMenuCode1 = null
              await this.getProductDetails(this.dataModel.option.drinkCourseMenuCode1, 'drinkCourseMenuCode1DataModel')
            }
          }
          if (!this.isCreate && !this.changed) {
            this.dataModel.option.drinkCourseMenuCode1 = value.option.drinkCourseMenuCode1 === '0' ? 0 : value.option.drinkCourseMenuCode1
            this.dataModel.option.drinkCourseMenuCode2 = value.option.drinkCourseMenuCode2 === '0' ? 0 : value.option.drinkCourseMenuCode2
            this.hasChanged = true
          }
          if (!this.isInitialized) {
            this.isInitialized = true
            await this.getProductDetails(this.dataModel.option.drinkCourseMenuCode1, 'drinkCourseMenuCode1DataModel')
            await this.getProductDetails(this.dataModel.option.drinkCourseMenuCode2, 'drinkCourseMenuCode2DataModel')
          }
        } else {
          this.dataModel.drinkCourseNo = value.drinkCourseNo
          this.dataModel.option.drinkCourseNo = value.drinkCourseNo
        }
        return
      }
      this.resetValues()
    },
    optionType (value) {
      if (value === 1) {
        this.dataModel.option.priceOption = 1
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
