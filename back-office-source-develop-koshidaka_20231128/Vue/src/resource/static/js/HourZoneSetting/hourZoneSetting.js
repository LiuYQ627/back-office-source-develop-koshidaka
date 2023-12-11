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
import HourZoneSettingEditDialog from '@/resource/templates/HourZoneSetting/HourZoneSettingEditDialog'
import StoreSelect from '@/resource/templates/CommonInput/StoreSelect'
import ConfigSelectCommonCondition from '@/resource/templates/ConfigSelect/ConfigSelectCommonCondition'

const RESERVATION_FETCH_CONFIGURATION_RECURSIVE = 'Reservation/FetchConfigurationRecursive'
const RESERVATION_UPDATE_CONFIGURATION = 'Reservation/UpdateConfiguration'
const RESERVATION_FETCH_DETAIL = 'Reservation/FetchDetail'
const RESERVATION_UPDATE_DETAIL = 'Reservation/UpdateDetail'
const RESERVATION_DESTROY_DETAIL = 'Reservation/DestroyDetail'

const DEFAULT_CONFIG_DATA_MODEL = {
  configuration: null,
  executionDate: null,
  nodeId: null,
  type: 'HOUR_ZONE_SETTING'
}

const DEFAULT_HOUR_ZONE_DATA_MODEL = {
  group: null,
  subGroup: null,
  version: null,
  type: null,
  inherited: null,
  name: null,
  value: []
}

const DEFAULT_HOUR_ZONE_VALUE_MODEL = {
  order: null,
  hourZone: null,
  hourZoneNumber: null,
  printFlag: null
}

const DATE_STRING = '1900/01/01'

export default {
  name: 'HourZoneSetting',
  mixins: [errorMappingUtils, transformUtils, validationUtils],
  props: {
    configDataModel: {
      type: [Object, Array]
    }
  },
  data () {
    return {
      selectedSetting: {...this.$route.params},
      reservationDatesList: [],
      dataModel: JSON.parse(JSON.stringify(DEFAULT_HOUR_ZONE_DATA_MODEL)),
      hourZoneValueDataModel: JSON.parse(JSON.stringify(DEFAULT_HOUR_ZONE_VALUE_MODEL)),
      hourZoneValueList: [],
      businessDayStartTime: '',
      selectedHourZoneItem: {},
      printFlag: [
        { name: 'F322b5.S017', value: 0 },
        { name: 'F322b5.S018', value: 1 }
      ],
      validations: {
        executionDate: [['required']]
      },
      validationErrors: new Map(),
      showEditDialog: false,
      isReusing: false,
      isDateRequiredError: false
    }
  },
  components: {
    popup,
    maintButton,
    FormGroupLayout,
    DateInput,
    SelectInput,
    HourZoneSettingEditDialog,
    StoreSelect,
    ConfigSelectCommonCondition
  },
  computed: {
    configType () {
      return 'HOUR_ZONE_SETTING'
    },
    isCurrentReservation () {
      return this.selectedSetting.typeOfSetting === 'current'
    },
    isNewReservation () {
      return this.selectedSetting.typeOfSetting === 'new'
    },
    isPastReservation  () {
      return this.selectedSetting.typeOfSetting === 'past'
    },
    isFutureReservation () {
      return this.selectedSetting.typeOfSetting === 'future'
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
    }
  },
  methods: {
    async initializeHourZoneDetails () {
      this.generateTableRows()
      switch (this.selectedSetting.typeOfSetting) {
        case 'current':
        case 'new':
          this.dataModel = {...this.configDataModel.configuration.configurations.HOURZONE_LIST}
          this.hourZoneValueDataModel = this.dataModel.value
          if (this.hourZoneValueDataModel.length < 1) {
            this.hourZoneValueDataModel = [{
              order: 0,
              hourZone: moment(this.selectedSetting.businessDayStartTime, 'HH:mm').format(`${DATE_STRING} HH:mm`),
              hourZoneNumber: 1,
              printFlag: true
            }]
            this.dataModel.value = this.hourZoneValueDataModel
          }
          this.updateModelValues()
          break
        case 'past':
        case 'future':
          this.dataModel = {...this.configDataModel.configuration.configurationSetting.HOURZONE_LIST}
          this.hourZoneValueDataModel = [...this.dataModel.value]
          this.mapArrayToTable(this.hourZoneValueList, this.hourZoneValueDataModel)
          break
      }
    },
    generateTableRows () {
      if (this.hourZoneValueList.length < 24) {
        const count = this.hourZoneValueList.length
        for (let i = count; i < 24; i++) {
          const hourZoneValueModel = JSON.parse(JSON.stringify(DEFAULT_HOUR_ZONE_VALUE_MODEL))
          hourZoneValueModel.order = i
          hourZoneValueModel.hourZoneNumber = i + 1
          hourZoneValueModel.printFlag = false
          hourZoneValueModel.allowEditBtn = false
          this.hourZoneValueList.push(hourZoneValueModel)
        }
      }
    },
    inputCheck () {
      this.validate(this.dataModel, this.validations)
      const validationResult = this.validationErrors && this.validationErrors.size <= 0
      if (validationResult !== true) {
        return validationResult
      }
      return validationResult
    },
    // ナビゲーション ボタン イベント ハンドラー
    async handleFixedBtn () {
      if (!this.dateInputCheck()) {
        return
      } else if (!this.timeCheck()) {
        return
      }
      if (this.isCurrentReservation) {
        await this.putReservationUpdateConfiguration()
      } else {
        await this.putReservationUpdateDetail()
      }
    },
    async handleCloneBtn () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.selectedSetting.propChangeDateText = null
          this.selectedSetting.typeOfSetting = 'new'
          this.isReusing = true
          this.configDataModel.configuration.id = null
          this.configDataModel.configuration.version = null
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
        messageCode: 'O00004.W005',
        showBackBtn: true,
        okBtnCallback: () => {
          this.selectedSetting.propChangeDateText = this.$route.params.propChangeDateText
          this.putReservationDestroyDetail()
        }
      })
    },
    handleEditBtn (hourZone) {
      const hourSetting = JSON.parse(JSON.stringify(hourZone))
      this.selectedHourZoneItem = hourSetting
      const i = hourSetting.order
      if (hourSetting.order > 0) {
        this.selectedHourZoneItem.startTime = this.hourZoneValueList[i - 1].hourZone
      } else {
        this.selectedHourZoneItem.startTime = moment(this.selectedSetting.businessDayStartTime, 'HH:mm').format(`${DATE_STRING} HH:mm`)
      }
      if (hourZone.order < this.hourZoneValueList.length - 1) {
        this.selectedHourZoneItem.nextHourZone = this.hourZoneValueList[i + 1].hourZone
      } else {
        this.selectedHourZoneItem.nextHourZone = null
      }
      this.showEditDialog = !this.showEditDialog
    },
    // 編集ダイアログのイベントハンドラー
    handleUpdateHourZoneRow (data) {
      const i = this.hourZoneValueDataModel.findIndex(item => item.order === data.order)
      const businessStartTime = moment(this.selectedSetting.businessDayStartTime, 'HH:mm')
      const hourZoneMoment = moment(this.formattedTime(data.hourZone), 'HH:mm')
      const businessDayStartTimeMinutes = businessStartTime.diff(moment().startOf('day'), 'minutes')
      const updatedHourZone = hourZoneMoment.diff(moment().startOf('day'), 'minutes') <= businessDayStartTimeMinutes
        ? moment(data.hourZone, 'YYYY/MM/DD HH:mm').add(1, 'day').format('YYYY/MM/DD HH:mm')
        : data.hourZone
      const updatedData = {
        order: data.order,
        hourZone: updatedHourZone,
        hourZoneNumber: data.hourZoneNumber,
        printFlag: data.printFlag
      }
      if (i !== -1) {
        this.hourZoneValueDataModel[i] = updatedData
        if (hourZoneMoment.diff(moment().startOf('day'), 'minutes') === businessDayStartTimeMinutes) {
          this.hourZoneValueDataModel.splice(i + 1)
        }
      } else {
        if (this.hourZoneValueDataModel.length === 0) {
          this.hourZoneValueDataModel.push({
            order: 0,
            hourZone: data.hourZone,
            hourZoneNumber: 1,
            printFlag: data.printFlag
          })
        } else {
          this.hourZoneValueDataModel.push(updatedData)
        }
      }
      this.updateModelValues()
    },
    async handleDeleteHourZoneRow (value) {
      const defaultHourZone = moment('00:00', 'HH:mm').format(`${DATE_STRING} HH:mm`)
      if (this.hourZoneValueDataModel.length === 1) {
        this.hourZoneValueDataModel.forEach(item => {
          item.hourZone = defaultHourZone
          item.printFlag = false
        })
      } else {
        this.hourZoneValueDataModel = this.hourZoneValueDataModel.filter(item => item.order !== value)
        this.hourZoneValueDataModel.forEach((item, index) => {
          item.order = index
          item.hourZoneNumber = index + 1
        })
      }
      this.updateModelValues()
    },
    pastDateDisabled (date) {
      const now = moment().subtract(1, 'days')
      return moment(date).isBefore(now)
    },
    updateModelValues () {
      this.dataModel.value = [...this.hourZoneValueDataModel]
      if (this.configDataModel.configuration.hasOwnProperty('configurations')) {
        this.configDataModel.configuration.configurations.HOURZONE_LIST = {...this.dataModel}
      } else {
        this.configDataModel.configuration.configurationSetting.HOURZONE_LIST = {...this.dataModel}
      }
      this.hourZoneValueList = []
      this.generateTableRows()
      this.mapArrayToTable(this.hourZoneValueList, this.hourZoneValueDataModel)
      this.hourZoneValueList[0].startTime = moment(this.selectedSetting.businessDayStartTime, 'HH:mm').format(`${DATE_STRING} HH:mm`)
    },
    // API ハンドラー
    // 予約内容取得処理 の「現在の設定」 |  PUT Reservation/FetchConfigurationRecursive
    async putReservationFetchConfigRecursive (nodeId, nonCurrent = false) {
      await this.masterDataQuery(
        RESERVATION_FETCH_CONFIGURATION_RECURSIVE,
        {
          nodeId: nodeId,
          excludeFields: false,
          type: this.configType
        },
        null,
        (responseModel) => {
          if (responseModel) {
            this.configDataModel = {
              configuration: {...responseModel},
              mode: 0,
              nodeId: this.selectedSetting.targetStoreCodes[0],
              type: 'HOUR_ZONE_SETTING'
            }
            this.dataModel = {...responseModel.configurations.HOURZONE_LIST}
            this.hourZoneValueDataModel = this.dataModel.value
            if (this.hourZoneValueDataModel.length < 1) {
              this.hourZoneValueDataModel = [{
                order: 0,
                hourZone: moment(this.selectedSetting.businessDayStartTime, 'HH:mm').format(`${DATE_STRING} HH:mm`),
                hourZoneNumber: 1,
                printFlag: true
              }]
              this.dataModel.value = this.hourZoneValueDataModel
            }
            this.updateModelValues()
          } else {
            this.dataModel = {}
          }
        }
      ).then((values) => {
        /* NO-OP */
      }, (error) => {
        console.error(error)
      }).catch((error) => {
        console.error(error)
      })
    },
    async putReservationUpdateConfiguration (nodeId) {
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      // 時間帯設定は現在の設定は保存する
      await this.masterDataUpdate(RESERVATION_UPDATE_CONFIGURATION,
        {...this.configDataModel})
        .then(async (values) => {
          if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
          // 処理結果画面を表示する
          await this.openPopupDialog({
            mode: 2,
            messageCode: 'O00004.W002',
            okBtnCallback: () => { this.backToConfigSelect() }
          })
        }, (error) => {
          console.error(error)
        }).catch((error) => {
          console.error(error)
        })
    },
    // 予約情報更新処理 | PUT Reservaion/UpdateDetail
    async putReservationUpdateDetail () {
      // 処理中に表示する
      let result = true
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      if (this.isReusing || this.isNewReservation || (this.isFutureReservation && this.selectedSetting.propChangeDateText !== this.$route.params.propChangeDateText)) {
        await axios.put(
          `${this.$i18n.t('prop.url')}${RESERVATION_FETCH_DETAIL}`,
          {
            nodeId: this.configDataModel.nodeId,
            excludeFields: false,
            type: this.configType,
            executionDate: this.selectedSetting.propChangeDateText
          },
          commonUtils.methods.addApiHeader({
            params: null
          })
        ).then((response) => {
          if (response) {
            switch (response.data.result.code) {
              case 0: // 0:正常
                if (response.data.responseModel.length > 0) {
                  this.openPopupDialog({ mode: 3, messageCode: 'F322b5.W001' })
                  result = false
                }
                break
              case 204: // 2:該当する情報なし
                break
              default: // その他
                this.globalErrorMapping2(response.data.result)
                result = false
                break
            }
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          result = false
        }).catch(async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          result = false
        })
      }
      if (!result) return
      // 時間帯設定は保存する
      let configDataModelNew = {}
      if (this.isNewReservation) {
        configDataModelNew = {
          nodeId: this.configDataModel.nodeId,
          type: this.configDataModel.type,
          executionDate: this.selectedSetting.propChangeDateText,
          configuration: {
            configurationSetting: {
              HOURZONE_LIST: this.isReusing || this.isFutureReservation
                ? this.configDataModel.configuration.configurationSetting.HOURZONE_LIST
                : this.configDataModel.configuration.configurations.HOURZONE_LIST
            },
            configurationType: this.configDataModel.type,
            nodeId: this.configDataModel.nodeId,
            executionDate: this.isReusing
              ? this.$route.params.propChangeDateText
              : this.configDataModel.executionDate || this.selectedSetting.propChangeDateText
          }
        }
      } else {
        configDataModelNew = {...this.configDataModel, executionDate: this.selectedSetting.propChangeDateText}
      }
      await this.masterDataUpdate(RESERVATION_UPDATE_DETAIL,
        {...configDataModelNew})
        .then(async (values) => {
          if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
          // 処理結果画面を表示する
          await this.openPopupDialog({
            mode: 2,
            messageCode: 'O00004.W002',
            okBtnCallback: () => { this.backToConfigSelect() }
          })
        }, (error) => {
          console.error(error)
        }).catch((error) => {
          console.error(error)
        })
    },
    // 予約情報削除処理 || Reservation/DestroyDetail
    async putReservationDestroyDetail () {
      // 時間帯設定は削除処理する
      let params = {
        nodeId: this.selectedSetting.targetStoreCodes[0],
        type: this.configType,
        executionDate: this.selectedSetting.propChangeDateText
      }
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      await this.masterDataDelete(RESERVATION_DESTROY_DETAIL, params)
        .then(async (values) => {
          if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
          // 処理結果画面を表示する
          await this.openPopupDialog({
            mode: 2,
            messageCode: 'O00004.W002',
            okBtnCallback: () => { this.backToConfigSelect() }
          })
        }, (error) => {
          this.targetStoreCodes = []
          console.error(error)
        }).catch((error) => {
          this.targetStoreCodes = []
          console.error(error)
        })
    },
    // HELPERS
    numericToString (numValue) {
      return numValue === null ? '' : String(numValue + 1).padStart(2, '0')
    },
    formattedTime (timeInput) {
      return (timeInput === undefined || timeInput === null) ? '00:00' : moment(timeInput).format('HH:mm')
    },
    formattedPrintFlag (flag) {
      if (flag === null) return ''
      return flag
        ? this.$t('F322b5.S017')
        : this.$t('F322b5.S018')
    },
    mapArrayToTable (table, arr) {
      const valueMap = new Map(arr.map((item) => [item.order, item]))
      let prevHourZone = moment(this.selectedSetting.businessDayStartTime, 'HH:mm').format(`${DATE_STRING} HH:mm`)
      let isWholeDay = false
      table.forEach((tableItem, i) => {
        tableItem.startTime = prevHourZone
        const matchingItem = valueMap.get(tableItem.order)
        if (matchingItem) {
          Object.assign(tableItem, matchingItem)
        }
        prevHourZone = table[i].hourZone !== null ? tableItem.hourZone : null
        tableItem.allowEditBtn = tableItem.hourZone !== null
        if (tableItem.hourZone === null) {
          tableItem.startTime = null
        }
        if (arr.length === 24) {
          table[arr.length - 1].allowEditBtn = true
        } else {
          table[arr.length].allowEditBtn = true && moment(tableItem.hourZone).format('HH:mm') !== this.selectedSetting.businessDayStartTime
        }
        if (moment(tableItem.hourZone).format('HH:mm') === this.selectedSetting.businessDayStartTime) {
          isWholeDay = true
        }
      })
      if (isWholeDay && arr.length < table.length) {
        table[arr.length].allowEditBtn = false
      } else {
        if (arr.length === 0) {
          table[1].allowEditBtn = true
        }
        if (arr.length === 24) {
          table[arr.length - 1].allowEditBtn = true
        }
      }
    },
    // API FUNCTIONS
    masterDataQuery (url, requestPayload, queryParams, successCallback) {
      return new Promise((resolve, reject) => {
        axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          if (response) {
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
              default: // その他
                this.globalErrorMapping2(response.data.result)
                reject(response)
                break
            }
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010', okBtnCallback: () => { this.backToConfigSelect() } })
          reject(error)
        }).catch(async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010', okBtnCallback: () => { this.backToConfigSelect() } })
          reject(error)
        })
      })
    },
    masterDataUpdate (url, requestPayload, queryParams) {
      return new Promise((resolve, reject) => {
        axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              resolve(response)
              break
            default: // その他
              this.globalErrorMapping2(response.data.result)
              reject(response)
              break
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
    masterDataDelete (url, requestPayload, queryParams, successCallback) {
      return new Promise((resolve, reject) => {
        axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
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
            default: // その他
              this.globalErrorMapping2(response.data.result)
              reject(response)
              break
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
    // バリデーションチェック
    dateInputCheck () {
      if (!moment(this.selectedSetting.propChangeDateText).isValid() && !this.isCurrentReservation) {
        this.isDateRequiredError = true
        this.openPopupDialog({ mode: 3, messageCode: 'F322b5.E012' })
        return false
      }
      this.isDateRequiredError = false
      return true
    },
    timeCheck () {
      const itemsCount = this.dataModel.value.length
      if (itemsCount === 0) {
        this.openPopupDialog({ mode: 3, messageCode: 'F322b5.S021' })
        return false
      }
      const lastSetting = this.dataModel.value[itemsCount - 1]
      const startTime = moment(this.selectedSetting.businessDayStartTime, 'HH:mm')
      const endTime = moment(moment(lastSetting.hourZone).format('HH:mm'), 'HH:mm')
      if (!startTime.isSame(endTime)) {
        this.openPopupDialog({ mode: 3, messageCode: 'F322b5.S021' })
        return false
      }
      return true
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
    errorText (key) {
      let topExtractedError = this.getTopFailedValidation(key)
      if (!topExtractedError) { return }
      switch (key) {
        case 'executionDate':
          switch (topExtractedError) {
            case 'required':
              return this.$i18n.t('F322b5.E012')
            case '':
              return this.$i18n.t('F322b5.E014')
          }
      }
    },
    async backToConfigSelect () {
      this.$router.push({
        name: 'F322b5',
        path: '/F322b5/時間帯設定',
        fullPath: '/F322b5/時間帯設定',
        params: {
          title: this.$i18n.t('F32254.S107'),
          targetStoreCodes: this.selectedSetting.targetStoreCodes
        },
        meta: {title: this.$i18n.t('F32254.S107')}
      })
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
  watch: {
    // 'selectedSetting.propChangeDateText' (newValue) {
    //   this.configDataModel.executionDate = newValue
    // }
  },
  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322b5-edit'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  mounted () {
    if (Object.keys(this.$route.params).length === 0) {
      this.$router.push('/F322b5/時間帯設定')
      return
    }
    this.initializeHourZoneDetails()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}

// KSD V001.000 AE
