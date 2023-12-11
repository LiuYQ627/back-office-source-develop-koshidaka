// KSD V001.000 AS
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import PriceListDisplayMasterSettingDefaultDisplay from '@/resource/templates/PriceListDisplayMasterSetting/PriceListDisplayMasterSettingDefaultDisplay'
import PriceListDisplayMasterSettingForm from '@/resource/templates/PriceListDisplayMasterSetting/PriceListDisplayMasterSettingForm'
import PriceListDisplayMasterSettingList from '@/resource/templates/PriceListDisplayMasterSetting/PriceListDisplayMasterSettingList'
import PriceListDisplayMasterSettingPairDisplay from '@/resource/templates/PriceListDisplayMasterSetting/PriceListDisplayMasterSettingPairDisplay'
import axios from 'axios'
import moment from 'moment'
import commonUtils from '@/resource/static/js/Common/commonUtils'

const FETCH_CONFIG_URL = 'Reservation/FetchConfigurationRecursive'
const ROOM_COURSE_QUERY_URL = 'RentalsRoomcourse/Query'
const RESERVATION_UPDATE_CONFIG_URL = 'Reservation/UpdateConfigurationBy5Step'

export default {
  name: 'PriceListDisplayMasterSetting',
  mixins: [transformUtils, errorMappingUtils],
  data () {
    return {
      headquartersAuthorityCheckEnable: true,
      targetStoreCodes: [],
      selectedIndexNo: [],
      selectedDataModel: null,
      setting: null,
      priceListDisplayList: [],
      priceListDisplayDefaultList: null,
      roomCourseList: [],
      isPriceListDisplayMasterSettingListEnabled: false,
      isPriceListDisplayMasterSettingFormEnabled: false,
      isPriceListDisplayMasterSettingFormCreateMode: false,
      displayPairScreen: false,
      displayDefaultScreen: false
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    PriceListDisplayMasterSettingList,
    PriceListDisplayMasterSettingForm,
    PriceListDisplayMasterSettingPairDisplay,
    PriceListDisplayMasterSettingDefaultDisplay,
    FormGroupLayout
  },
  computed: {
    disableList: function () {
      return !this.isPriceListDisplayMasterSettingListEnabled || this.isPriceListDisplayMasterSettingFormEnabled
    },
    disableForm: function () {
      return !this.isPriceListDisplayMasterSettingListEnabled || !this.isPriceListDisplayMasterSettingFormEnabled
    },
    disablePairDisplay: function () {
      return this.targetStoreCodes.length === 0
    },
    disableDefaultDisplay: function () {
      return this.targetStoreCodes.length === 0
    },
    dataCount: function () {
      return Math.min(this.priceListDisplayList.length)
    },
    disableFixedButton: function () {
      return !this.isPriceListDisplayMasterSettingFormEnabled && !this.displayDefaultScreen
    },
    disableStopButton: function () {
      return !this.isPriceListDisplayMasterSettingFormEnabled && !this.displayDefaultScreen
    },
    disableDelButton: function () {
      return !this.isPriceListDisplayMasterSettingFormEnabled || !this.isPriceListDisplayMasterSettingFormCreateMode || this.displayPairScreen
    },
    disableCloseButton: function () {
      return this.isPriceListDisplayMasterSettingFormEnabled || this.displayPairScreen || this.displayDefaultScreen
    },
    disablePairButton: function () {
      return this.isPriceListDisplayMasterSettingFormEnabled || this.displayPairScreen || this.displayDefaultScreen || this.targetStoreCodes.length === 0
    },
    disableDefaultButton: function () {
      return this.isPriceListDisplayMasterSettingFormEnabled || this.displayPairScreen || this.displayDefaultScreen || this.targetStoreCodes.length === 0
    },
    disableBackPreviousButton: function () {
      return !this.displayPairScreen
    },
    companyCode () {
      return this.targetStoreCodes[0].substring(0, 15)
    },
    storeCode () {
      return this.targetStoreCodes[0].substring(15)
    }
  },
  methods: {
    async initialize () { },
    async initPriceListDisplayList () {
      this.isPriceListDisplayMasterSettingListEnabled = false
      this.priceListDisplayList = []
      this.priceListDisplayDefaultList = null
      await this.putDataQuery(
        FETCH_CONFIG_URL,
        {
          nodeId: this.targetStoreCodes[0],
          priceDispNo: 0
        },
        (responseModel) => {
          this.setting = responseModel
          this.priceListDisplayList = [...responseModel.configurations.SELF_PRICINGTABLE.value]
          this.priceListDisplayDefaultList = { ...responseModel.configurations.SELF_PRICINGTABLE_DEFAULT_SETTINGS.value }
        }
      ).then((values) => {
        this.isPriceListDisplayMasterSettingListEnabled = true
      }, (err) => {
        this.targetStoreCodes = []
        this.globalErrorMapping(err)
      }).catch(() => {
        this.targetStoreCodes = []
        this.catchErrorPopup()
      })
    },
    async initRoomCourseList () {
      this.roomCourseList = []
      await this.postDataQuery(
        ROOM_COURSE_QUERY_URL,
        {
          nodeId: this.targetStoreCodes[0],
          chargeCode: 0
        },
        (responseModel) => {
          this.roomCourseList = [...responseModel]
        }
      ).then((values) => {
      }, (err) => {
        this.targetStoreCodes = []
        this.globalErrorMapping(err)
      }).catch(() => {
        this.targetStoreCodes = []
        this.catchErrorPopup()
      })
    },
    catchErrorPopup () {
      this.openPopupDialog({
        mode: 3,
        message: this.$i18n.t('O00004.W010'),
        code: ''
      })
    },
    resetForm () {
      this.selectedIndexNo = []
      this.selectedDataModel = null
      this.isPriceListDisplayMasterSettingFormEnabled = false
      this.isPriceListDisplayMasterSettingFormCreateMode = false
    },
    resetErrorMsg () {
      this.$refs.priceListDisplayMasterSettingForm.courseDispPosErrorMsg = null
      this.$refs.priceListDisplayMasterSettingForm.endDateErrorMsg = null
      this.$refs.priceListDisplayMasterSettingForm.priceDispPosErrorMsg = ''
      this.$refs.priceListDisplayMasterSettingForm.courseDispPosOK = true
      this.$refs.priceListDisplayMasterSettingForm.endDateOK = true
      this.$refs.priceListDisplayMasterSettingForm.priceDispPosSettingOK = true
      this.$refs.priceListDisplayMasterSettingForm.priceDispPosNoSettingOK = true
    },
    preprocessData () {
      let priceList = { ...this.selectedDataModel.priceList }
      priceList.name = 'SELF_PRICINGTABLE_' + this.zeroSupply(priceList.priceDispNo, 2)
      priceList.courseDispPos = Number(priceList.courseDispPos)
      priceList.priceDispPos = Number(priceList.priceDispPos)
      priceList.startDate = moment(priceList.startDate).set({ 'hours': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).toISOString()
      priceList.endDate = moment(priceList.endDate).set({ 'hours': 23, 'minute': 59, 'second': 59, 'millisecond': 999}).toISOString()
      return JSON.stringify(priceList)
    },
    async updateMasterData () {
      const vue = this
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      const priceList = JSON.parse(this.preprocessData())
      const params = {
        nodeId: this.targetStoreCodes[0],
        configuration: this.setting,
        mode: 0
      }
      params.configuration.configurations.SELF_PRICINGTABLE.value = this.getSelfPricingTableValues(params.configuration.configurations.SELF_PRICINGTABLE.value)
      if (params.configuration.configurations.SELF_PRICINGTABLE.value.filter(x => x.priceDispNo === priceList.priceDispNo).length > 0) {
        params.configuration.configurations.SELF_PRICINGTABLE.value.find(x => x.priceDispNo === priceList.priceDispNo).priceCourseName = priceList.priceCourseName
        params.configuration.configurations.SELF_PRICINGTABLE.value.find(x => x.priceDispNo === priceList.priceDispNo).chargeCode = priceList.chargeCode
        params.configuration.configurations.SELF_PRICINGTABLE.value.find(x => x.priceDispNo === priceList.priceDispNo).courseDispPos = priceList.courseDispPos
        params.configuration.configurations.SELF_PRICINGTABLE.value.find(x => x.priceDispNo === priceList.priceDispNo).priceDispPos = priceList.priceDispPos
        params.configuration.configurations.SELF_PRICINGTABLE.value.find(x => x.priceDispNo === priceList.priceDispNo).startDate = priceList.startDate
        params.configuration.configurations.SELF_PRICINGTABLE.value.find(x => x.priceDispNo === priceList.priceDispNo).endDate = priceList.endDate
      } else {
        const data = {
          ...priceList,
          order: params.configuration.configurations.SELF_PRICINGTABLE.value.length
        }
        params.configuration.configurations.SELF_PRICINGTABLE.value.push(data)
      }
      const update = this.masterDataUpdate(
        RESERVATION_UPDATE_CONFIG_URL,
        params,
        null,
        null
      )
      update.then(async (values) => {
        await vue.initPriceListDisplayList()
        vue.resetForm()
        if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
        await vue.openPopupDialog({
          mode: 2,
          messageCode: 'O00004.W002',
          okBtnCallback: async () => {
            this.closePopupDialog()
          }
        })
      }, async (err) => {
        this.globalErrorMapping(err)
      }).catch(async () => {
        this.catchErrorPopup()
      })
    },
    async deleteMasterData () {
      const vue = this
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      const priceDispNo = Number(this.selectedDataModel.indexNo)
      let url = RESERVATION_UPDATE_CONFIG_URL
      url = url.replace(':nodeId', this.targetStoreCodes[0])
      url = url.replace(':priceDispNo', this.selectedDataModel.indexNo)
      const params = {
        nodeId: this.targetStoreCodes[0],
        configuration: this.setting,
        mode: 0
      }
      const selfPricingValues = params.configuration.configurations.SELF_PRICINGTABLE.value
      params.configuration.configurations.SELF_PRICINGTABLE.value = []
      for (var i = 0; i < selfPricingValues.length; i++) {
        const currPriceList = selfPricingValues[i]
        if (currPriceList.priceDispNo !== priceDispNo) {
          params.configuration.configurations.SELF_PRICINGTABLE.value.push(currPriceList)
        }
      }
      params.configuration.configurations.SELF_PRICINGTABLE.value = this.getSelfPricingTableValues(params.configuration.configurations.SELF_PRICINGTABLE.value)
      const del = this.masterDataDelete(
        url,
        params,
        null
      )
      del.then(async (values) => {
        await vue.initPriceListDisplayList()
        vue.resetForm()
        if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
        await this.openPopupDialog({
          mode: 2,
          messageCode: 'O00004.W002',
          okBtnCallback: async () => {
            this.closePopupDialog
          }
        })
      }, (err) => {
        this.globalErrorMapping(err)
      }).catch(() => {
        this.catchErrorPopup()
      })
    },
    async updateDefaultData () {
      const vue = this
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })

      var priceListDefault = this.priceListDisplayDefaultList
      const params = {
        nodeId: this.targetStoreCodes[0],
        configuration: this.setting,
        mode: 0
      }
      params.configuration.configurations.SELF_PRICINGTABLE.value = this.getSelfPricingTableValues(params.configuration.configurations.SELF_PRICINGTABLE.value)
      params.configuration.configurations.SELF_PRICINGTABLE_DEFAULT_SETTINGS.value.memberPrice = priceListDefault.memberPrice
      params.configuration.configurations.SELF_PRICINGTABLE_DEFAULT_SETTINGS.value.ageDivisionCode = priceListDefault.ageDivisionCode
      params.configuration.configurations.SELF_PRICINGTABLE_DEFAULT_SETTINGS.value.countSetting = priceListDefault.countSetting
      params.configuration.configurations.SELF_PRICINGTABLE_DEFAULT_SETTINGS.value.courseNo = priceListDefault.courseNo
      const update = this.masterDataUpdate(
        RESERVATION_UPDATE_CONFIG_URL,
        params,
        null,
        null
      )
      update.then(async (values) => {
        vue.resetForm()
        if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
        await vue.openPopupDialog({
          mode: 2,
          messageCode: 'O00004.W002',
          okBtnCallback: async () => {
            this.initPriceListDisplayList()
            this.initRoomCourseList()
            this.closePopupDialog()
            this.displayDefaultScreen = false
          }
        })
      }, async (err) => {
        this.globalErrorMapping(err)
      }).catch(async () => {
        this.catchErrorPopup()
      })
    },
    inputCheck () {
      return this.displayDefaultScreen ? true : this.$refs.priceListDisplayMasterSettingForm.validateForm()
    },
    postDataQuery (url, requestPayload, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.getApiHeader()
        ).then((response) => {
          if (response.data.result.code === 0) {
            if (successCallback) {
              successCallback(response.data.responseModel)
            }
            resolve(response)
          } else if (response.data.result.code === 2) {
            this.priceListDisplayList = []
            this.openPopupDialog({
              mode: 3,
              message: this.$i18n.t('C00224.E004'),
              code: '',
              okBtnCallback: () => {
                this.targetStoreCodes = []
              }
            })
          } else {
            this.globalErrorMapping(response.data.result)
            reject(response.data.result)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    putDataQuery (url, requestPayload, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.getApiHeader()
        ).then((response) => {
          if (response.data.result.code === 0) {
            if (successCallback) {
              successCallback(response.data.responseModel)
            }
            resolve(response)
          } else if (response.data.result.code === 2) {
            resolve(response)
          } else {
            this.globalErrorMapping(response.data.result)
            reject(response.data.result)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    masterDataUpdate (url, requestPayload, queryParams, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then((response) => {
          if (response.data.result.code === 0) {
            if (successCallback) {
              successCallback(response.data.responseModel)
            }
            resolve(response)
          } else {
            this.globalErrorMapping(response.data.result)
            reject(response.data.result)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    masterDataDelete (url, requestPayload, queryParams, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then((response) => {
          if (response.data.result.code === 0) {
            if (successCallback) {
              successCallback(response.data.responseModel)
            }
            resolve(response)
          } else {
            this.globalErrorMapping(response.data.result)
            reject(response.data.result)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    async openPopupDialog ({
      mode = 1,
      title = '',
      messageCode = null,
      message = null,
      code = '',
      showBackBtn = false,
      okBtnCallback = null,
      isNonDispStatus = false,
      backBtnCallback = null
    } = {}) {
      if (messageCode !== null && message === null) {
        message = this.$i18n.t(messageCode)
      }
      await this.$refs.pop.open(mode, title, message, code, showBackBtn, okBtnCallback, isNonDispStatus, backBtnCallback)
    },
    closePopupDialog () {
      this.$refs.pop.closeFunction()
    },
    handleListSelectionChanged (selectedDataModel) {
      const result = JSON.parse(JSON.stringify(selectedDataModel))
      const selectedData = {
        ...result,
        priceList: {
          ...result.priceList
        }
      }
      this.selectedDataModel = selectedData
      this.isPriceListDisplayMasterSettingFormEnabled = true
      this.isPriceListDisplayMasterSettingFormCreateMode = this.selectedDataModel.isCreate
    },
    handleCloseMaintButton () {
      this.$router.push('/TopPage')
    },
    async handleFixedMaintButton () {
      if (this.displayDefaultScreen) {
        await this.updateDefaultData()
      } else {
        this.resetErrorMsg()
        const formFields = this.$refs.priceListDisplayMasterSettingForm.$children
        const inputCheck = this.inputCheck()
        if (inputCheck !== true) {
          await this.openPopupDialog({
            mode: 3,
            code: '-0099',
            messageCode: !this.$refs.priceListDisplayMasterSettingForm.courseDispPosOK ? 'C00224.E010' : 'O00004.W006',
            okBtnCallback: () => {
              formFields.find((x) => { if (x.hasError) return setTimeout(() => { x.$el.querySelector(".has-error").querySelectorAll('button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')[0].focus() }, 100) })
            }
          })
        } else {
          await this.updateMasterData()
        }
      }
    },
    handleStopMaintButton () {
      this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.resetForm()
          if (!this.displayDefaultScreen) this.resetErrorMsg()
          if (this.displayDefaultScreen) {
            this.displayDefaultScreen = false
            this.initPriceListDisplayList()
          }
        }
      })
    },
    handleDelMaintButton () {
      this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W005',
        showBackBtn: true,
        okBtnCallback: async () => {
          await this.deleteMasterData()
          this.resetErrorMsg()
        }
      })
    },
    handlePairMaintButton () {
      this.displayPairScreen = true
    },
    handleDefaultMaintButton () {
      this.displayDefaultScreen = true
      this.focusFirstFocusableElement()
    },
    handleBackPreviousButton () {
      this.isPriceListDisplayMasterSettingListEnabled = true
      this.displayPairScreen = false
      this.displayDefaultScreen = false
    },
    confirmUnload (event) {
      if (this.isPriceListDisplayMasterSettingFormEnabled || this.displayDefaultScreen) {
        event.returnValue = ''
      }
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        var focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!this.isShowOptionItemSettingPanel) {
          focusable = this.$el.querySelectorAll('button:not(.rightArrowButton), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        }
        const errorTarget = [...focusable].find(x => !x.disabled && x.classList.contains('error-text-box') && x.closest('div.pageHeader').style.display !== 'none')
        const target = [...focusable].find(x => !x.disabled && x.checkVisibility())
        errorTarget ? errorTarget.focus() : target.focus()
      })
    },
    getSelfPricingTableValues (params) {
      const selfPricingValues = params
      params = []
      for (let i = 0; i < selfPricingValues.length; i++) {
        const currPriceList = selfPricingValues[i]
        let priceList = {}
        priceList.order = i
        priceList.name = currPriceList.name
        priceList.priceDispNo = currPriceList.priceDispNo
        priceList.priceCourseName = currPriceList.priceCourseName
        priceList.chargeCode = currPriceList.chargeCode
        priceList.courseDispPos = currPriceList.courseDispPos
        priceList.priceDispPos = currPriceList.priceDispPos
        priceList.startDate = currPriceList.startDate
        priceList.endDate = currPriceList.endDate
        params.push(priceList)
      }
      return params
    }
  },
  watch: {
    targetStoreCodes: async function (storeCodes) {
      this.priceListDisplayList = []
      this.priceListDisplayDefaultList = null
      this.selectedIndexNo = []
      this.selectedDataModel = null
      this.isPriceListDisplayMasterSettingListEnabled = false
      this.isPriceListDisplayMasterSettingFormEnabled = false
      this.isPriceListDisplayMasterSettingFormCreateMode = false
      if (this.targetStoreCodes[0]) {
        this.initPriceListDisplayList()
        this.initRoomCourseList()
      }
    }
  },
  created () {
    this.$root.winId = 'C00224'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.$nextTick()
    await this.initialize()
    var authority = this.$refs.storeSelect.headquartersAuthorityCheckEnable
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 100)
  }
}
// KSD V001.000 AE
