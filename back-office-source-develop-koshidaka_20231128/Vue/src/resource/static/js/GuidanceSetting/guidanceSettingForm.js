// KSD V001.000 AS
import commonUtils from '@/resource/static/js/Common/commonUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import popup from '@/resource/templates/CommonDesign/Popup'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import GlobalMenuCodeList from '@/resource/templates/GuidanceSetting/GuidanceSettingGlobalMenuCodeList.vue'
import MenuCodeList from '@/resource/templates/GuidanceSetting/GuidanceSettingMenuCodeList.vue'
import axios from 'axios'
import dataUtils from '@/resource/static/js/Common/dataUtils'

const DEFAULT_DATA_MODEL = {
  indexNo: null,
  guidanceSetting: {
    ScpNo: null,
    GidName: '',
    MinQty: 0,
    MaxQty: 1,
    MenuCodes: []
  },
  isCreate: false
}

const VIEW_MODE_DATA_MODEL = {
  indexNo: null,
  guidanceSetting: {
    ScpNo: null,
    GidName: '',
    MinQty: '',
    MaxQty: '',
    MenuCodes: []
  }
}

export default {
  name: 'GuidanceSettingForm',
  mixins: [validationUtils, transformUtils, errorMappingUtils, dataUtils],
  saveSelected: false,
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
    },
    globalMenuCodes: {
      type: Array,
      default: []
    },
    selectDataOption: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify({ ...VIEW_MODE_DATA_MODEL })),
      filteredGlobalMenuCodesList: [],
      scpNo: 0,
      generalValidations: {
        guidanceSetting: {
          GidName: 'required'
        }
      },
      quantityValidations: {
        guidanceSetting: {
          MinQty: [['range', 0, 9]],
          MaxQty: [['range', 1, 9]]
        }
      },
      minMaxValidations: {
        guidanceSetting: {
          MaxQty: 'minMax'
        }
      },
      hasChanged: false,
      isInitialized: false,
      selectDataOptions: [
        { name: this.$i18n.t('F32283.S003'), value: 1 },
        { name: this.$i18n.t('F32283.S004'), value: 2 },
        { name: this.$i18n.t('F32283.S005'), value: 3 },
        { name: this.$i18n.t('F32283.S006'), value: 4 },
        { name: this.$i18n.t('F32283.S007'), value: 5 },
        { name: this.$i18n.t('F32283.S008'), value: 6 }
      ],
      selectedMenuCode: [],
      selectedGlobalMenuCode: this.globalMenuCodes,
      selectedCode: null,
      processedMenuCodeList: [],
      departmentOptions: [
        { name: this.$i18n.t('F32283.S017'), value: 1 }
      ]
    }
  },
  computed: {
    scpNoValue () {
      if (!this.dataModel.indexNo) return ''
      return this.zeroSupply(this.dataModel.indexNo, 3)
    },
    getGuidanceType () {
      const scpNo = this.dataModel.indexNo
      const range = [35, 40, 50, 100, 150, 185, 190, 200, 250, 300, 335, 340, 350, 400, 450]
      const result = range.indexOf(range.find((element) => scpNo <= element))
      return (result % 5) + 1
    },
    disableAddMenuCode () {
      if (!this.selectedCode) return true
      if (this.dataModel.guidanceSetting.MenuCodes.length === 32) return true
      return !(Object.getOwnPropertyNames(this.selectedCode)).includes('globalMenuCode')
    },
    disableRemoveMenuCode () {
      if (!this.selectedCode) return true
      return (Object.getOwnPropertyNames(this.selectedCode)).includes('globalMenuCode')
    },
    disableMinMax () {
      return (this.getGuidanceType !== 4 || !this.dataModel.indexNo)
    }
  },
  components: {
    FormGroupLayout,
    TextInput,
    SelectInput,
    popup,
    MenuCodeList,
    GlobalMenuCodeList
  },
  methods: {
    resetForm () {
      this.selectedMenuCode = []
      this.selectedGlobalMenuCode = []
      this.selectedCode = null
      this.filteredGlobalMenuCodesList = []
    },
    validateInputCheck () {
      this.validate(this.dataModel, this.generalValidations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    validateInputQuantityCheck () {
      if (this.dataModel.guidanceSetting.MinQty === '' && this.getGuidanceType === 4) {
        this.dataModel.guidanceSetting.MinQty = 0
      }
      if (this.dataModel.guidanceSetting.MaxQty === '' && this.getGuidanceType === 4) {
        this.dataModel.guidanceSetting.MaxQty = 1
      }
      this.validate(this.dataModel, this.quantityValidations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    validateMinMax () {
      this.validate(this.dataModel, this.minMaxValidations)
      return this.validationErrors && this.validationErrors.size <= 0
    },
    hasError (key) {
      const withError = this.validationErrors && this.validationErrors.has(key)
      if (withError && this.saveSelected) {
        this.focusErrorField(key)
      }
      return withError
    },
    minMaxValidator () {
      return Number(this.dataModel.guidanceSetting.MinQty) <= Number(this.dataModel.guidanceSetting.MaxQty)
    },
    handleFormInput (event) {
      this.$emit('input', this.dataModel)
    },
    async setFocus () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    },
    resetValues () {
      this.isInitialized = false
      this.hasChanged = false
      this.validationErrors = new Map()
      this.dataModel = { ...VIEW_MODE_DATA_MODEL }
      this.filteredGlobalMenuCodesList = []
    },
    addMenuCode (transferData) {
      if (transferData) {
        this.dataModel.guidanceSetting.MenuCodes.splice(transferData.position, 0, transferData.menuCode)
      } else {
        if (!(Object.getOwnPropertyNames(this.selectedCode)).includes('globalMenuCode')) return
        if (this.processedMenuCodeList.includes(this.selectedCode.globalMenuCode.Code)) return
        this.dataModel.guidanceSetting.MenuCodes.push(this.selectedCode.globalMenuCode.Code)
      }
      this.selectedGlobalMenuCode = []
      this.selectedCode = null
    },
    removeMenuCode (moveCode) {
      this.dataModel.guidanceSetting.MenuCodes = this.dataModel.guidanceSetting.MenuCodes.filter(code => code !== this.nullCoalesce(moveCode, this.selectedCode && this.selectedCode.menuCode.Code))
      this.selectedMenuCode = []
      this.selectedCode = null
    },
    moveMenuCode (transferData) {
      this.removeMenuCode(transferData.menuCode)
      this.addMenuCode(transferData)
    },
    getProcessedGlobalMenuCodeList (data) {
      this.processedMenuCodeList = data
    },
    handleListSelectionChanged (selectedDataModel) {
      this.selectedCode = JSON.parse(JSON.stringify(selectedDataModel))
      if ((Object.getOwnPropertyNames(selectedDataModel)).includes('globalMenuCode')) {
        this.selectedMenuCode = []
      } else {
        this.selectedGlobalMenuCode = []
      }
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
    },
    focusErrorField (key) {
      if (key === 'guidanceSetting.GidName') {
        document.getElementById('gid-name-input').focus()
      } else if (key === 'guidanceSetting.MaxQty') {
        document.getElementById('max-quantity-input').focus()
      }
    },
    getGuidanceMenuType (scpNo) {
      let range = [35, 40, 50, 100, 150, 185, 190, 200, 250, 300, 335, 340, 350, 400, 450]
      let result = range.indexOf(range.find((element) => scpNo <= element))
      return (result % 5) + 2
    }
  },
  watch: {
    async value (value) {
      this.dataModel = JSON.parse(JSON.stringify({ ...DEFAULT_DATA_MODEL }))
      if (value) {
        if (value.guidanceSetting) {
          Object.assign(this.dataModel, DEFAULT_DATA_MODEL, value)
          this.selectedMenuCode = this.dataModel.guidanceSetting.MenuCodes
          this.scpNo = this.dataModel.guidanceSetting.ScpNo
          if (this.disableMinMax && !this.hasChanged && value.isCreate) {
            this.dataModel.guidanceSetting.MinQty = 0
            if (this.getGuidanceType === 4) {
              this.dataModel.guidanceSetting.MaxQty = 1
            } else {
              this.dataModel.guidanceSetting.MaxQty = 0
            }
            this.hasChanged = true
          }
        } else {
          this.dataModel.indexNo = value.indexNo
        }
        return
      }
      this.resetValues()
      this.validationErrors = new Map()
    },
    disabled (value) {
      if (value === false) {
        this.setFocus()
      }
    },
    'dataModel.guidanceSetting.MenuCodes' (value) {
      const MenuAttrs = {
        2: 1,
        3: 1,
        4: 1,
        5: 2,
        6: 3
      }
      this.filteredGlobalMenuCodesList = !this.disabled ? this.globalMenuCodes.filter((code) => code.MenuAttr === MenuAttrs[this.getGuidanceMenuType(this.scpNo)]) : []
    }
  }
}
// KSD V001.000 AE
