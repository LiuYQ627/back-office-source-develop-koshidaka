// KSD V001.000 AS
import axios from 'axios'
import moment from 'moment'
import commonUtils from '@/resource/static/js//Common/commonUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import DateInput from '@/resource/templates/CommonInput/DateInput'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import TaxRateSettingEditDialog from '@/resource/templates/TaxRateSetting/TaxRateSettingEditDialog'

const TAX_TAXES_QUERY = 'TaxTaxes/Query'
const TAX_TAXES_RESERVATION_UPDATE_REFLECT = 'TaxTaxes/ReservationUpdateReflect'
const TAX_TAXES_RESERVATIONS_GET = 'TaxTaxes/ReservationGet'
const TAX_TAXES_RESERVATIONS_UPDATE = 'TaxTaxes/ReservationUpdate'
const TAX_TAXES_RESERVATIONS_DELETE = 'TaxTaxes/ReservationDel'

const DEFAULT_DATA_MODEL = {
  nodeId: null,
  executionDate: null,
  taxRates: []
}

const DEFAULT_TAX_RATE_MODEL = {
  name: null,
  taxSet: null,
  taxType: null,
  type: null,
  taxMark: null,
  rate: null,
  roundingMode: null,
  jurisdictionType: null,
  originalTaxSource: null,
  reducedTax: null,
  indicator: null,
  displayName: {
    default: null
  }
}

export default {
  name: 'TaxRateSetting',
  mixins: [errorMappingUtils, transformUtils, validationUtils],
  data () {
    return {
      selectedSetting: this.$root.params,
      reservedDateList: [],
      taxReservationsDateList: [],
      dataModel: JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL)),
      taxRatesList: [],
      selectedTaxItem: JSON.parse(JSON.stringify(DEFAULT_TAX_RATE_MODEL)),
      validations: {
        nodeId: [['required']]
      },
      validationErrors: new Map(),
      showEditDialog: false,
      isFocused: false,
      isReusing: false,
      reservedTaxVersion: -1,
      reservedTaxId: -1
    }
  },
  components: {
    popup,
    maintButton,
    FormGroupLayout,
    DateInput,
    SelectInput,
    TaxRateSettingEditDialog
  },
  computed: {
    isCurrentReservation () {
      return this.selectedSetting
        ? this.selectedSetting.typeOfSetting === 'current'
        : false
    },
    isNewReservation () {
      return this.selectedSetting
        ? this.selectedSetting.typeOfSetting === 'new'
        : false
    },
    isPastReservation  () {
      return this.selectedSetting
        ? this.selectedSetting.typeOfSetting === 'past'
        : false
    },
    isFutureReservation () {
      return this.selectedSetting
        ? this.selectedSetting.typeOfSetting === 'future'
        : false
    },
    disabledFixedBtn () {
      return this.isPastReservation
    },
    disabledCloneBtn () {
      return !this.isPastReservation
    },
    disabledDelBtn () {
      return this.isCurrentReservation || this.isNewReservation || this.isReusing
    },
    allowEditBtn () {
      return !this.isPastReservation
    },
    showDateSelector () {
      if (this.isCurrentReservation || this.isPastReservation) {
        return false
      }
      return true
    },
    isNewTaxMaster () {
      if (this.dataModel.taxRates) {
        return !this.dataModel.taxRates.some(item => item.name === this.selectedTaxItem.name)
      }
      return true
    }
  },
  methods: {
    async initializeTaxRatesDetails () {
      this.generateTableRows()
      if (this.selectedSetting === undefined) {
        this.backToConfigSelect()
        return
      }
      switch (this.selectedSetting.typeOfSetting) {
        case 'current':
          await this.postTaxTaxesQuery()
          this.dataModel.executionDate = moment().format('YYYY-MM-DD')
          break
        case 'new':
          await this.postTaxTaxesQuery()
          this.dataModel.executionDate = this.selectedSetting.executionDate
          break
        case 'past':
        case 'future':
          await this.putTaxTaxesReservationGet()
      }
      this.focusFirstFocusableElement()
    },
    // パーサー
    generateTableRows () {
      if (this.taxRatesList.length < 10) {
        const count = this.taxRatesList.length
        for (let i = count; i < 10; i++) {
          const taxRateModel = JSON.parse(JSON.stringify(DEFAULT_TAX_RATE_MODEL))
          taxRateModel.name = `TAX${i + 1}`
          this.taxRatesList.push(taxRateModel)
        }
      }
    },
    formattedRate (value) {
      if (!value) return value === 0 ? '00.00' : ''
      return `${(value * 100).toFixed(2).padStart(5, '0')}`
    },
    formattedRateType (value) {
      switch (value) {
        case 'INTERNAL': return this.$t('F322b4.S014')
        case 'EXTERNAL': return this.$t('F322b4.S015')
        case 'EXEMPT': return this.$t('F322b4.S016')
        default: return ''
      }
    },
    formattedReducedTax (value) {
      switch (value) {
        case 1: return this.$t('F322b4.S017')
        case 0: return this.$t('F322b4.S018')
        default: return ''
      }
    },
    inputCheck () {
      if (this.dataModel.executionDate === null) {
        this.openPopupDialog({ mode: 3, messageCode: 'F322b4.W003' })
        return false
      }
      return true
    },
    validateDate () {
      const dateSelection = this.dataModel.executionDate
      const matchedDate = this.selectedSetting.reservationsList.find(item => {
        return moment(dateSelection).isSame(moment(item.executionDate))
      })
      if (matchedDate) {
        this.openPopupDialog({ mode: 3, messageCode: 'F322b4.W001' })
        return false
      }
      return true
    },
    // ボタンハンドル
    async handleFixedBtn () {
      let isValid = true
      isValid = isValid && this.inputCheck()
      if (!this.isCurrentReservation) {
        isValid = isValid && this.validateDate()
      }
      if (isValid) {
        await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
        if (this.isCurrentReservation) {
          this.postTaxTaxesReservationUpdateReflect()
        } else {
          this.postTaxRatesReservationUpdate()
        }
      }
    },
    async handleCloneBtn () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          const { version, id, executionDate } = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
          this.dataModel.executionDate = this.selectedSetting.executionDate = null
          this.selectedSetting.typeOfSetting = 'new'
          this.isReusing = true
          this.dataModel = {
            version,
            id,
            nodeId: this.dataModel.nodeId,
            executionDate,
            taxRates: this.dataModel.taxRates
          }
          this.focusFirstFocusableElement()
        }
      })
    },
    async handleStopBtn () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.backToConfigSelect()
        }
      })
    },
    async handleDelBtn () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'F322b4.W002',
        showBackBtn: true,
        okBtnCallback: () => {
          this.postTaxRatesReservationDelete()
        }
      })
    },
    handleEditBtn (taxItem) {
      this.selectedTaxItem = {
        name: taxItem.name,
        displayName: taxItem.displayName.default,
        taxType: taxItem.taxType,
        rate: this.formattedRate(taxItem.rate),
        taxMark: taxItem.taxMark,
        reducedTax: taxItem.reducedTax
      }
      this.showEditDialog = !this.showEditDialog
    },
    // ダイアログイベントハンドラ
    handleUpdateTaxRow (data) {
      const i = this.taxRatesList.findIndex(item => item.name === data.name)
      this.taxRatesList[i] = {
        name: data.name,
        displayName: {
          default: data.displayName
        },
        indicator: data.displayName,
        taxType: data.taxType,
        type: data.taxType,
        rate: parseFloat(parseFloat(parseFloat(data.rate) / 100).toFixed(4)),
        taxMark: data.taxMark,
        reducedTax: Number(data.reducedTax),
        taxSet: this.taxRatesList[i].taxSet === null ? this.dataModel.nodeId : this.taxRatesList[i].taxSet,
        jurisdictionType: this.dataModel.nodeId,
        roundingMode: 'HALF_DOWN',
        originalTaxSource: 'PROVIDER'
      }
      this.dataModel.taxRates = this.taxRatesList.filter(tax => tax.displayName.default !== null)
      this.selectedTaxItem = JSON.parse(JSON.stringify(DEFAULT_TAX_RATE_MODEL))
    },
    async handleDeleteTaxRow (value) {
      const i = this.taxRatesList.findIndex(item => item.name === value)
      if (i !== -1) {
        this.taxRatesList[i] = JSON.parse(JSON.stringify(DEFAULT_TAX_RATE_MODEL))
        this.taxRatesList[i].name = value
      }
      this.dataModel.taxRates = this.taxRatesList.filter(tax => tax.displayName.default !== null)
      this.selectedTaxItem = JSON.parse(JSON.stringify(DEFAULT_TAX_RATE_MODEL))
    },
    handleChange (data) {
      this.selectedTaxItem = data
      const i = this.taxRatesList.findIndex(item => item.name === data.name)
      this.dataModel.taxRates = this.taxRatesList.filter(tax => tax.taxType !== null)
      if (i !== -1) {
        this.taxRatesList[i] = data
      }
    },
    pastDateDisabled (date) {
      const now = moment().subtract(0, 'days')
      return moment(date).isBefore(now)
    },
    // APIハンドラー
    // 税情報取得処理 |  POST TaxTaxes/Query
    async postTaxTaxesQuery () {
      await axios.post(
        `${this.$i18n.t('prop.url')}${TAX_TAXES_QUERY}`,
        {
          nodeId: this.selectedSetting.nodeId
        },
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        switch (response.data.result.code) {
          case 0: // 0:正常
            this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
            this.dataModel.executionDate = moment().format('YYYY-MM-DD')
            this.dataModel.nodeId = this.selectedSetting.nodeId
            this.dataModel.taxRates = response.data.responseModel
            this.mapArrayToTable(this.taxRatesList, this.dataModel.taxRates)
            break
          case 2: // 2:該当する情報なし
            this.dataModel = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
            this.dataModel.nodeId = this.selectedSetting.nodeId
            this.mapArrayToTable(this.taxRatesList, this.dataModel.taxRates)
            break
          default: // その他
            throw response.data.result
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        await this.globalErrorMapping2(error)
      })
    },
    // 予約内容取得処理 | PUT TaxTaxes/ReservationGet
    async putTaxTaxesReservationGet () {
      await axios.put(
        `${this.$i18n.t('prop.url')}${TAX_TAXES_RESERVATIONS_GET}`,
        { id: this.selectedSetting.id },
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        switch (response.data.result.code) {
          case 0: // 0:正常
            // KSD V001.000 DS 予約データを選択すると予約取得API結果が通信エラーになる
            // const { version, id, nodeId, executionDate, taxRates } = response.data.responseModel[0]
            // KSD V001.000 DE 予約データを選択すると予約取得API結果が通信エラーになる
            // KSD V001.000 AS 予約データを選択すると予約取得API結果が通信エラーになる
            const { version, id, nodeId, executionDate, taxRates } = response.data.responseModel
            // KSD V001.000 AE 予約データを選択すると予約取得API結果が通信エラーになる
            if (this.isPastReservation) {
              this.dataModel = {
                nodeId: nodeId,
                executionDate: executionDate,
                taxRates: [...taxRates]
              }
            } else {
              this.dataModel = {
                version,
                id,
                nodeId,
                executionDate,
                taxRates: []
              }
            }
            this.mapArrayToTable(this.taxRatesList, taxRates)
            this.dataModel.taxRates = taxRates
            break
          case 2: // 2:該当する情報なし
            await this.openPopupDialog({
              mode: 3,
              messageCode: 'O00004.W010',
              okBtnCallback: () => {
                this.backToConfigSelect()
              }
            })
            break
          default: // その他
            throw response.data.result
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        await this.globalErrorMapping2(error)
      })
    },
    // 予約情報更新処理 | POST TaxTaxes/ReservationUpdateReflect
    async postTaxTaxesReservationUpdateReflect () {
      let result = true
      const reservation = this.selectedSetting.reservationsList.find(obj => obj.executionDate === this.dataModel.executionDate)
      if (reservation) {
        await axios.put(
          `${this.$i18n.t('prop.url')}${TAX_TAXES_RESERVATIONS_GET}`,
          { id: reservation.id },
          commonUtils.methods.getApiHeader({})
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              this.reservedTaxVersion = response.data.responseModel.version
              this.reservedTaxId = response.data.responseModel.id
              break
            case 2: // 2:データなし
              break
            default:
              throw response.data.result
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
            .then(() => {
              result = false
            })
        }).catch(async (error) => {
          await this.globalErrorMapping2(error)
            .then(() => {
              result = false
            })
        })
      }
      if (!result) {
        return
      }
      this.dataModel = this.reservedTaxVersion !== -1
        ? {...this.dataModel, version: this.reservedTaxVersion}
        : this.dataModel
      this.dataModel = this.reservedTaxId !== -1
        ? {...this.dataModel, id: this.reservedTaxId}
        : this.dataModel
      this.dataModel.taxRates.forEach(item => {
        item['startDateTime'] = '1971-01-01T00:00:00Z'
        delete item.jurisdictionName
        delete item.taxSource
        delete item.rateType
      })
      await axios.post(
        `${this.$i18n.t('prop.url')}${TAX_TAXES_RESERVATION_UPDATE_REFLECT}`,
        {...this.dataModel},
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        switch (response.data.result.code) {
          case 0: // 0:正常
            await this.openPopupDialog({
              mode: 2,
              messageCode: 'O00004.W002',
              okBtnCallback: () => { this.backToConfigSelect() }
            })
            break
          default: // その他
            throw response.data.result
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        await this.globalErrorMapping2(error)
      })
    },
    // 予約情報更新処理 | POST TaxTaxes/ReservationUpdate
    async postTaxRatesReservationUpdate () {
      this.dataModel.taxRates.forEach(item => {
        item['startDateTime'] = '1971-01-01T00:00:00Z'
        delete item.jurisdictionName
        delete item.taxSource
        delete item.rateType
      })
      await axios.post(
        `${this.$i18n.t('prop.url')}${TAX_TAXES_RESERVATIONS_UPDATE}`,
        {...this.dataModel},
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        switch (response.data.result.code) {
          case 0: // 0:正常
            await this.openPopupDialog({
              mode: 2,
              messageCode: 'O00004.W002',
              okBtnCallback: () => { this.backToConfigSelect() }
            })
            break
          default: // その他
            throw response.data.result
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        await this.globalErrorMapping2(error)
      })
    },
    // 予約情報削除処理 | POST TaxTaxes/ReservationDel
    async postTaxRatesReservationDelete () {
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      await axios.put(
        `${this.$i18n.t('prop.url')}${TAX_TAXES_RESERVATIONS_DELETE}`,
        { id: this.selectedSetting.id },
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        switch (response.data.result.code) {
          case 0: // 0:正常
            await this.openPopupDialog({
              mode: 2,
              messageCode: 'O00004.W002',
              okBtnCallback: () => { this.backToConfigSelect() }
            })
            break
          default: // その他
            throw response.data.result
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        await this.globalErrorMapping2(error)
      })
    },
    // ヘルパー
    mapArrayToTable (table, arr) {
      const valueMap = new Map(arr.map((item) => [item.name, item]))
      table.forEach((tableItem) => {
        const matchingItem = valueMap.get(tableItem.name)
        if (matchingItem) {
          Object.assign(tableItem, matchingItem)
        }
      })
    },
    // バリデーション
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
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('img, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    },
    async backToConfigSelect () {
      this.$router.push('/F322b4/税率設定')
    },
    async backToTop () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.$router.push('/TopPage')
        }
      })
    },
    async confirmUnload (event) {
      event.returnValue = ''
    }
  },
  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322b4-edit'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  mounted () {
    this.initializeTaxRatesDetails()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
// KSD V001.000 AE
