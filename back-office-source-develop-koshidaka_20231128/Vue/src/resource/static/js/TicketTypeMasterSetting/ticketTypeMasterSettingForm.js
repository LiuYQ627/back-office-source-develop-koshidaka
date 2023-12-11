// KSD V001.000 AS
import radioButton from '@/resource/templates/BarcodeSetting/RadioButton'
import commonErrorMessageHandler from '@/resource/templates/CommonDesign/CommonErrorMessageHandler'
import { inputLimitation, inputNumberLimitation } from '@/resource/static/js/Common/jsUtils'
import CommonSelectDialog from '@/resource/templates/CommonDesign/CommonSelectDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import axios from 'axios'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'

const searchDivisionPath = 'ProductDivisions/divisionInfoSearch'
const searchListPath = 'ProductGroupMaster/ProductQuery/Page'

export default {
  name: 'ticketTypeMasterSettingForm',
  mixins: [validationUtils, errorMappingUtils],
  props: {
    inputModelValue: {
      type: Object,
      default: []
    },
    errMessage: {
      type: Object,
      default: []
    },
    disabledFields: {
      type: Boolean,
      default: false
    },
// KSD V001.000 AS refs #82112 対応(編集時は券種コード入力不可)
    isDisabledCode: {
      type: Boolean,
      default: false
    },
    targetStoreCd: {
      type: String,
      default: null
    }
// KSD V001.000 AE refs #82112 対応(編集時は券種コード入力不可)
  },
  data () {
    return {
      inputModel: {
        Code: '', // 券種コード
        Name: '', // 券名称
        LinkTotalNo: 71, // 売上集計リンクコード
        UseSts: 0, // 使用フラグ
        TermCheckSts: 0, // 有効期限チェック
        DrwOpenSts: 0, // 使用フラグ
        Identification: 0, // クーポン本人確認
        CheckExistence: 0, // クーポン存在確認
        Disc_Type1: 1, // 値引／割引種別
        DpCodeDesignation: [], // ＤＰコード指定
        TargetMenuCode: '', // メニューコード
        Disc_Type2: 0, // 値引／割引ステータス
        Tanka: 0 // プリセット単価 / プリセット割引率
      },
      labelsExpirationCheck: [
        { name: this.$i18n.t('F322c1.S013'), value: 0 },
        { name: this.$i18n.t('F322c1.S014'), value: 1 }
      ],
      labelsUseFlag: [
        { name: this.$i18n.t('F322c1.S010'), value: 0 },
        { name: this.$i18n.t('F322c1.S011'), value: 1 }
      ],
      labelsYesNoDrop: [
        { name: this.$i18n.t('F322c1.S016'), value: 0 },
        { name: this.$i18n.t('F322c1.S017'), value: 1 }
      ],
      discountTypeList: [
        { name: this.$i18n.t('F322c1.S040'), value: 1 },
        { name: this.$i18n.t('F322c1.S041'), value: 7 }
      ],
      labelsDiscountStatus: [
        { name: this.$i18n.t('F322c1.S024'), value: 0 },
        { name: this.$i18n.t('F322c1.S025'), value: 1 }
      ],
      labelsSalesSummaryLinkCodeList: [
        { name: `${this.$i18n.t('F322c1.S043')}１`, value: 71 },
        { name: `${this.$i18n.t('F322c1.S043')}２`, value: 72 },
        { name: `${this.$i18n.t('F322c1.S043')}３`, value: 73 },
        { name: `${this.$i18n.t('F322c1.S043')}４`, value: 74 },
        { name: `${this.$i18n.t('F322c1.S043')}５`, value: 75 },
        { name: `${this.$i18n.t('F322c1.S043')}６`, value: 76 },
        { name: `${this.$i18n.t('F322c1.S043')}７`, value: 77 },
        { name: `${this.$i18n.t('F322c1.S043')}８`, value: 78 },
        { name: `${this.$i18n.t('F322c1.S043')}９`, value: 79 },
        { name: `${this.$i18n.t('F322c1.S043')}１０`, value: 80 },
        { name: `${this.$i18n.t('F322c1.S043')}１１`, value: 81 },
        { name: `${this.$i18n.t('F322c1.S043')}１２`, value: 82 },
        { name: `${this.$i18n.t('F322c1.S043')}１３`, value: 83 },
        { name: `${this.$i18n.t('F322c1.S043')}１４`, value: 84 },
        { name: `${this.$i18n.t('F322c1.S043')}１５`, value: 85 }
      ],
      labelsDpCodeDesignation: [
        { name: '任意', value: false },
        { name: '強制', value: true }
      ],
      clientHeight: 0,
      clientWidth: 0,
      targetDPCodeText: '',
      selectedDPCodes: [],
      DPCodeData: [],
      productClassificationNumber: null
    }
  },
  components: {
    radioButton,
    commonErrorMessageHandler,
    CommonSelectDialog,
    popup
  },
  computed: {
    dpCodeText () {
      const DEFAULT = ''
      if (!this.selectedDPCodes ||
        this.selectedDPCodes.length <= 0) {
        return DEFAULT
      }
      return this.selectedDPCodes.join('、')
    }
  },
  methods: {
    onChange (name, value) {
      this.inputModel[name] = value
      this.$emit('update:inputModelValue', this.inputModel)
    },
    defaultValue () {
      this.inputModel = {
        Code: '', // 券種コード
        Name: '', // 券名称
        LinkTotalNo: 71, // 売上集計リンクコード
        UseSts: 0, // 使用フラグ
        TermCheckSts: 0, // 有効期限チェック
        DrwOpenSts: 0, // 使用フラグ
        Identification: 0, // クーポン本人確認
        CheckExistence: 0, // クーポン存在確認
        Disc_Type1: 1, // 値引／割引種別
        DpCodeDesignation: [], // ＤＰコード指定
        TargetMenuCode: '', // メニューコード
        Disc_Type2: 0, // 値引／割引ステータス
        Tanka: 0 // プリセット単価 / プリセット割引率
      }
    },
    inputLimit (e, maxLength, inputObject, inputVariable) {
      if (inputVariable === 'Name') this.inputModel.Name = validationUtils.methods.excludeProhibitedInput(this.inputModel.Name, /[\^\,\'\"\>\<\%\&]/g, this.inputModel, 'Name')
      return inputLimitation(e, maxLength, inputObject, inputVariable)
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    },
    async dialogSelect () {
      if (this.inputModel.Disc_Type1 === 7) {
        try {
          let params = { nodeId: this.targetStoreCd }
          let response = await axios.get(this.$i18n.t('prop.url') + searchDivisionPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
          if (response.data.result.code === 0) {
            // 0:正常
            if (response.data.responseModel !== null) {
              this.DPCodeData = response.data.responseModel.value.filter((division) => {
                return division.registrationType === 'dp'
              })
              if (this.DPCodeData.length > 0) {
                this.productClassificationNumber = this.DPCodeData[0].productClassificationNumber
                await this.searchListQuery()
              } else {
                this.$refs.pop.open(3, '', this.$i18n.t('F322c1.E018'), -99, false, null, false, null)
              }
            } else {
              this.globalErrorMapping(response.data.result)
            }
          } else {
            this.globalErrorMapping(response.data.result)
          }
        } catch (error) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        }
      }
    },
    async searchListQuery () {
      let result = false
      try {
        let params = {
          catalogName: this.targetStoreCd,
          productClassificationNumber: this.productClassificationNumber,
          orderBy: 'productId',
          ascending: true,
          batchSize: 99,
          startIndex: 0
        }
        let response = await axios.get(this.$i18n.t('prop.url') + searchListPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        if (response.data.result.code === 0) {
          if (response.data.responseModel !== null) {
            this.DPCodeData = response.data.responseModel
            this.DPCodeData.forEach(item => {
              item.productId = item.productId.toString()
            })
            this.$refs.commonSelectDialog.open(this.DPCodeData.map(res => ({
              code: res.productId,
              name: res.displayName.default
            })), this.selectedDPCodes, true)
            result = true
          } else {
            this.globalErrorMapping(response.data.result)
          }
        } else if (response.data.result.code === 2) {
          this.$refs.pop.open(3, '', this.$i18n.t('F322c1.E019'), -99, false, null, false, null)
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }

    },
    async DPSelectOk (selectedDPCodes) {
      await this.setDPCode(selectedDPCodes)
    },
    async setDPCode (selectedDPCodes) {
      this.selectedDPCodes = selectedDPCodes
      if (this.DPCodeData.length === 0) return
      this.targetDPCodeText = this.DPCodeData.filter(res => selectedDPCodes.includes(res.code)).map(({ code }) => code)
      this.setInputDPCodes(selectedDPCodes)
    },
    async setInputDPCodes (selectedDPCodes) {
      this.inputModel.DpCodeDesignation = selectedDPCodes
    },
    switchTanka () {
      this.inputModel.Tanka = 0
    }
  },
  async mounted () {
    this.clientHeight = document.getElementById('buttonRederer').clientHeight
    this.clientWidth = document.getElementById('buttonRederer').clientWidth
  },
  watch: {
    inputModelValue (value) {
      this.defaultValue()
      this.inputModel = {
        ...this.inputModel,
        ...value
      }
      let dpCodes = Object.keys(value).filter(key => key.includes('TargetDpCode') && value[key] !== 0).map(k => value[k].toString())
      this.inputModel.DpCodeDesignation = dpCodes
      this.setDPCode(dpCodes)
    },
    disabledFields (value) {
      if (!value) {
        this.$nextTick(() => {
          this.$refs.useTicketCode.focus()
        })
      }
    }
  }
}
// KSD V001.000 AE
