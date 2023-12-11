/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221207  dingxin(Neusoft)  G001.00.0  issue課題#1097を対応します.
 * 20221222  dingxin(Neusoft)  G002.00.0  issue課題#1212、#1032を対応します.
 * 20221227  bai.ry(Neusoft)   G003.00.0  issue課題#1298を対応します.
 * 20221228  bai.ry(Neusoft)   G004.00.0  issue課題#1263を対応します.
 * 20221229  dingxin(Neusoft)  G005.00.0  issue課題#1225を対応します.
 * 20230116  duyouwei(Neusoft) G006.00.0  issue課題#1407,#1263を対応します.
 * 20230130 bai.ry(Neusoft)  G008.00.0  issue課題#1377を対応します.
 * 20230131  duyouwei(Neusoft) G009.00.0  issue課題#1473を対応します.
 * 20230209  dingxin(Neusoft)  G010.00.0  issue課題#1403を対応します.
 * 20230209  dingxin(Neusoft)  G011.00.0  issue課題#1507を対応します.
 * 20230231  dingxin(Neusoft)  G012.00.0  issue課題#1583を対応します.
 * 20230302  litie(Neusoft)    G013.00.0  issue課題#699を対応します.
 * 20230316  xu.jh(Neusoft)  G014.00.0  issue課題#1444を対応します.
 * 20230331  xu.jh(Neusoft)  G015.00.0  issue課題#1618を対応します.
 * 20230412  dingxin(Neusoft)  G016.00.0  issue課題#1377を対応します.
 * 20230412  dingxin(Neusoft)  G017.00.0  issue課題#1377を対応します.
 * 20230423  dingxin(Neusoft)  G018.00.0  issue課題#1662を対応します.
 * 20230424  dingxin(Neusoft)  G019.00.0  issue課題#1377を対応します.
 * 20230517  dingxin(Neusoft)  G020.00.0  issue課題#1377を対応します.
 * 20230613  wangchunmei(Neusoft)  G021.00.0  issue課題#1828を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
// G002.00.0 Update-Start
// import radioButton from '@/resource/templates/CommonInput/RadioButton'
import radioButton from '@/resource/templates/StoreOperationsSetting/RadioButton'
// G002.00.0 Update-End
import configSelectCommonCondition from '@/resource/templates/ConfigSelect/ConfigSelectCommonCondition'
import commonUtils from '../Common/commonUtils'
import axios from 'axios'
// G011.00.0 Add start
import Moment from 'moment'
// G011.00.0 Add end
// KSD V001.000 AS
import validationUtils from '@/resource/static/js/Common/validationUtils'
// KSD V001.000 AE

const configSelectPath = '/F322a6/店別運用設定'
const settingType = 'STORE_OPERATIONS_SETTINGS'

// G009.00.0 Update-Start
// const fetchCurrentConfiguration = 'Reservation/FetchConfiguration'
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'
// G004.00.0 Update-End
const putCurrentConfiguration = 'Reservation/UpdateConfiguration'
const fetchReservationDetail = 'Reservation/FetchDetail'
const putReservationDetail = 'Reservation/UpdateDetail'
// G002.00.0 Add-Start
const destroyReservationDetail = 'Reservation/DestroyDetail'
// G002.00.0 Add-End

export default {
  name: 'StoreOperationsSetting',
  props: {
    targetStoreCodes: {
      type: Array,
      required: true
    },
    typeOfSetting: {
      type: String,
      required: true
    },
    propChangeDateText: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // G018.00.0 Add-Start
      permissions: [],
      // G018.00.0 Add-End
      // G002.00.0 Add-Start
      disabledFixedBtn: this.typeOfSetting == 'past',
      disabledDeleteBtn: this.isCloning || this.typeOfSetting == 'current',
      disabledCloneBtn: this.isCloning || this.typeOfSetting != 'past',
      isCloning: false,
      radioButtonDisabled: false,
      // G002.00.0 Add-End
      setting: {},
      config: {},
      changeDateText: this.propChangeDateText,
      businessDayStartTime: '',
      // G010.00.0 Add-Start
      futureDateText: '',
      // G010.00.0 Add-End

      fractionLabels: [
        // G004.00.0 Update-Start
        // { name: '四捨五入', value: 0 },
        // { name: '切り上げ', value: 1 },
        // { name: '切り捨て', value: 2 }
        {name: '四捨五入', value: 'ROUND'},
        { name: '切り上げ', value: 'ROUND_UP' },
        { name: '切り捨て', value: 'ROUND_DOWN' }
        // G004.00.0 Update -End
      ],
      passwordRuleLabels: [
        { name: '0（英字+数字）', value: 0 },
        { name: '1（英字大+英字小+数字（推奨））', value: 1 },
        { name: '2（英字、数字の組み合わせ自由）', value: 2 },
        { name: '3（英字大+英字小+数字+記号）', value: 3 }
      ],
      allowanceLabels: [
        { name: '許可', value: true },
        { name: '禁止', value: false }
      ],
      requirementLabels: [
        { name: '必須', value: true },
        { name: '任意', value: false }
      ],
      doLabels: [
        { name: 'する', value: true },
        { name: 'しない', value: false }
      ],
      coinbarLabels: [
        { name: '50枚', value: 0 },
        { name: '20枚', value: 1 }
      ],
      // KSD V001.000 AS
      taxLabels: [
        { name: this.$i18n.t('F322a6.S086'), value: true },
        { name: this.$i18n.t('F322a6.S087'), value: false }
      ],
      updateLabels: [
        { name: this.$i18n.t('F322a6.S083'), value: 'NOT_AGGREGATE' },
        { name: this.$i18n.t('F322a6.S084'), value: 'ADD_AGGREGATE' },
        { name: this.$i18n.t('F322a6.S085'), value: 'MINUS_AGGREGATE' }
      ],
      haveLabels: [
        { name: this.$i18n.t('F322a6.S088'), value: true },
        { name: this.$i18n.t('F322a6.S089'), value: false }
      ],
      settlementLabels: [
        { name: this.$i18n.t('F322a6.S092'), value: 0 },
        { name: this.$i18n.t('F322a6.S093'), value: 1 },
        { name: this.$i18n.t('F322a6.S094'), value: 2 },
        { name: this.$i18n.t('F322a6.S095'), value: 3 }
      ],
      overwriteLabels: [
        { name: this.$i18n.t('F322a6.S096'), value: 'Addition' },
        { name: this.$i18n.t('F322a6.S097'), value: 'OverWrite' }
      ],
      allowanceLabelsNew: [
        { name: this.$i18n.t('F322a6.S090'), value: true },
        { name: this.$i18n.t('F322a6.S091'), value: false }
      ],
      doLabelsNew: [
        { name: this.$i18n.t('F322a6.S081'), value: true },
        { name: this.$i18n.t('F322a6.S082'), value: false }
      ],
      automateLabels: [
        { name: this.$i18n.t('F322a6.S056'), value: 'auto' },
        { name: this.$i18n.t('F322a6.S057'), value: 'manual' }
      ],
      includeLabels: [
        { name: this.$i18n.t('F322a6.S054'), value: true },
        { name: this.$i18n.t('F322a6.S055'), value: false }
      ],
      onOffLabels: [
        { name: this.$i18n.t('F322a6.S111'), value: true },
        { name: this.$i18n.t('F322a6.S112'), value: false }
      ],
      screenStep: 1,
      displayIntervalErrorMsg: null,
      reservationNotifyErrorMsg: null,
      firstDayErrorMsg: null,
      numOfAutoIssueErrorMsg: null,
      signOnCameraNoOperationTimeErrorMsg: null,
      communicationPosTerminalIDErrorMsg: null,
      operatingTimeErrorMsg: null,
      mobileAplPayPollingIntervalErrorMsg: null,
      mobileAplPayAutoOrderRelTmErrorMsg: null,
      remoteConciergeUrlErrorMsg: null,
      hasCloudPosAdminCheck: false,
      isCloudposAdmin: false,
      // KSD V001.000 AE
      focusItem: null,
      limitErrorMsg: null,
      logoutTimeErrorMsg: null,
      timeErrorMsg: null
    }
  },
  components: {
    popup,
    maintButton,
    radioButton,
    configSelectCommonCondition
  },
  // G002.00.0 Add-Start
  computed: {
    typeOfSettingWithCloning () {
      return this.isCloning ? 'new' : this.typeOfSetting
    }
    // KSD V001.000 AS
    , disabledPrevBtn () {
      return this.screenStep <= 1
    },
    disabledNextBtn () {
      return this.screenStep >= 4
    }
    // KSD V001.000 AE
  },
  // G002.00.0 Add-End
  methods: {
    fetchConfig () {
      if (this.typeOfSetting === 'new') {
        // G001.00.0 Delete-Start
        // const response = {
        //   configurationSetting: {
        //     'STORE_OPERATIONS_SETTINGS': {
        //       'name': 'STORE_OPERATIONS_SETTINGS',
        //       'value': {
        //         'discountFraction': 0,
        //         'taxFraction': 0,
        //         'totalPriceDiscount': true,
        //         'passwordInput': true,
        //         'passwordRule': 0,
        //         'logoutTime': 0,
        //         'numberOfPeople': true,
        //         'manualQuantity': true,
        //         'salesChangeDiscount': true,
        //         'zeroPriceRegistration': true,
        //         'climgingGold': 0,
        //         'itemListLimit': 0,
        //         '0sellingPrice': true,
        //         'coinbarCount': 0
        //       },
        //       'type': 'Map',
        //       'group': 'STORE_OPERATIONS',
        //       'subGroup': 'CONFIG'
        //     },
        //     'BUSINESS_DAY_START_TIME': {
        //       'version': 1,
        //       'description': {
        //         'default': 'DEPRECATED: Will only be used when BUSINESS_DAYS is not configured. Defines the business day start time in HH:mm:ss from 00:00:00 to 23:59:59. No till operations are allowed outside of the startTime to hardEndTime window.'
        //       },
        //       'type': 'Key',
        //       'group': 'CASH-MANAGEMENT',
        //       'inherited': true,
        //       'subGroup': 'CONFIG',
        //       'name': 'BUSINESS_DAY_START_TIME',
        //       'value': '00:00'
        //     }
        //   },
        //   configurationType: 'STORE_OPERATIONS_SETTINGS',
        //   executionDate: null,
        //   nodeId: null
        // }
        // this.setCurrentConfiguration(response)
        // G001.00.0 Delete-End
        // G001.00.0 Add-Start
        this.getCurrentSetting(this.targetStoreCodes[0])
        // G002.00.0 Add-Start
        this.disabledDeleteBtn = true
        // G002.00.0 Add-End
        // G001.00.0 Add-End
      } else if (this.typeOfSetting === 'current') {
        this.getCurrentSetting(this.targetStoreCodes[0])
        // G002.00.0 Add-Start
        this.disabledDeleteBtn = true
        // G002.00.0 Add-End
      } else {
        // G010.00.0 Add-Start
        this.futureDateText = this.changeDateText
        // G010.00.0 Add-End
        this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      }
    },
    // G002.00.0 Add-Start
    clone () {
      // G015.00.0 Update start
      // this.$refs.pop.open(1, '再利用', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => { })
      // G015.00.0 Update end
    },
    async copyCurrentSetting () {
      await this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      this.changeDateText = null
      this.isCloning = true
      this.disabledFixedBtn = false
      this.disabledCloneBtn = true
      this.disabledDeleteBtn = true
      this.radioButtonDisabled = false
      // KSD V001.000 AS
      this.focusFirstFocusableElement()
      // KSD V001.000 AE
    },
    // KSD V001.000 AS
    next () {
      this.screenStep = this.screenStep + 1
      if ((this.typeOfSetting !== 'past' && this.isCloudposAdmin) || this.isCloning) this.focusFirstFocusableElement()
    },
    prev () {
      this.screenStep = this.screenStep - 1
      if ((this.typeOfSetting !== 'past' && this.isCloudposAdmin) || this.isCloning) this.focusFirstFocusableElement()
    },
    // KSD V001.000 AE
    del () {
      // G015.00.0 Update start
      // this.$refs.pop.open(1, '削除', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => { })
      // G015.00.0 Update end
    },
    deleteConfiguration () {
      this.destroyReservationDetail(this.targetStoreCodes[0], this.changeDateText)
    },
    async destroyReservationDetail (nodeId, dateText) {
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + destroyReservationDetail, {
          nodeId: nodeId,
          type: settingType,
          executionDate: dateText,
          configuration: this.setting
        }, commonUtils.methods.getApiHeader())

        // KSD V001.000 AS
        if (response.data && response.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$t('O00004.W008'), response.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
          return
        }
        // KSD V001.000 AE
        if (response.data.responseModel) {
          // G007.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a6.W003'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
          // G007.00.0 Update -End
            this.$router.push(configSelectPath)
          }, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E002'), '', false, null, false, null)
        }
      } catch (error) {
        // KSD V001.000 DS
        // this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E002'), '', false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 AE
      }
    },
    stop () {
      // G015.00.0 Update start
      // this.$refs.pop.open(1, '中止', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => { })
      // G015.00.0 Update end
    },
    backToSelect () {
      this.$router.push({
        name: 'F322a6',
        params: {
          paramTargetStoreCodes: this.targetStoreCodes
        }
      })
    },
    // G002.00.0 Add-End
    // G002.00.0 Update-Start
    // getReservationDetail (nodeId, dateText) {
    async getReservationDetail (nodeId, dateText) {
    // G002.00.0 Update-End
    // G002.00.0 Add-start
    // G011.00.0 Update start
    // let a = new Date()
    // a = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate()
      let a = new Moment().format('YYYY-MM-DD')
      // if (new Date(a) < new Date(dateText)) {
      if (new Date(a) < new Date(dateText)) {
        // G011.00.0 Update end
        this.radioButtonDisabled = false
      } else {
        this.radioButtonDisabled = true
      }
      // G002.00.0 Add-end
      axios.put(this.$i18n.t('prop.url') + fetchReservationDetail, {
        nodeId: nodeId,
        excludeFields: false,
        type: settingType,
        executionDate: dateText
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          // KSD V001.000 AS
          if (response.data && response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$t('O00004.W008'), response.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
          }
          // KSD V001.000 AE
          if (response.data.responseModel) {
            const settings = response.data.responseModel
            console.log(settings, 'settingssettingssettings')
            if (settings.length > 0) {
              this.setConfigurationSetting(settings[0])
            } else {
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error)
          // KSD V001.000 AS
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
          // KSD V001.000 AE
        })
    },
    setConfigurationSetting (setting) {
      this.setting = setting
      this.config = setting.configurationSetting.STORE_OPERATIONS_SETTINGS.value
      // G003.00.0 Update-Start
      // if (setting.configurationSetting.BUSINESS_DAY_START_TIME) {
      if (setting.configurationSetting.STORE_OPERATIONS_SETTINGS.value.autoAdjustmentTime) {
        // this.businessDayStartTime = setting.configurationSetting.BUSINESS_DAY_START_TIME.value
        this.businessDayStartTime = setting.configurationSetting.STORE_OPERATIONS_SETTINGS.value.autoAdjustmentTime
        // G003.00.0 Update-End
      } else {
        this.fetchBusinessDayStartTime()
      }
    },
    loadChangedCurrentSetting () {
      // G003.00.0 Update-Start
      // this.setting.configurations.BUSINESS_DAY_START_TIME.value = this.businessDayStartTime
      this.setting.configurations.STORE_OPERATIONS_SETTINGS.value = this.config
      this.setting.configurations.STORE_OPERATIONS_SETTINGS.value.autoAdjustmentTime = this.businessDayStartTime
      // G003.00.0 Update-End
    },
    loadChangedConfigurationSetting () {
      this.setting.configurationSetting.STORE_OPERATIONS_SETTINGS.value = this.config
      // G003.00.0 Update-Start
      // if (this.setting.configurationSetting.BUSINESS_DAY_START_TIME) {
      //   this.setting.configurationSetting.BUSINESS_DAY_START_TIME.value = this.businessDayStartTime
      // } else {
      //   this.setting.configurationSetting.BUSINESS_DAY_START_TIME = {
      //     'version': 1,
      //     'description': {
      //       'default': 'DEPRECATED: Will only be used when BUSINESS_DAYS is not configured. Defines the business day start time in HH:mm:ss from 00:00:00 to 23:59:59. No till operations are allowed outside of the startTime to hardEndTime window.'
      //     },
      //     'type': 'Key',
      //     'group': 'CASH-MANAGEMENT',
      //     'inherited': true,
      //     'subGroup': 'CONFIG',
      //     'name': 'BUSINESS_DAY_START_TIME',
      //     'value': this.businessDayStartTime
      //   }
      // }
      if (this.setting.configurationSetting.STORE_OPERATIONS_SETTINGS.value) {
        this.setting.configurationSetting.STORE_OPERATIONS_SETTINGS.value.autoAdjustmentTime = this.businessDayStartTime
      }
      // G003.00.0 Update-End
    },
    async saveCurrentSetting (nodeId) {
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putCurrentConfiguration, {
          nodeId: nodeId,
          type: settingType,
          configuration: this.setting,
          mode: 0
        }, commonUtils.methods.getApiHeader())

        // G002.00.0 Update-Start
        // if (response.data.responseModel) {
        if (response.data.result.code == 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
        // G002.00.0 Update-End
        } 
        // KSD V001.000 AS
        else if (response.data && response.data.result.code == -90) {
          this.$refs.pop.open(2, '', this.$t('O00004.W008'), response.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
        }
        // KSD V001.000 AE
        else {
          // KSD V001.000 DS
          // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$refs.pop.open(3, '', this.$i18n.t('F322a6.E001'), '', false, null, false, null)
          // KSD V001.000 AE
        }
      } catch (error) {
        // KSD V001.000 DS
        // this.$refs.pop.open(3, '', this.$i18n.t('F322a6.E001'), '', false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 AE
      }
    },
    async saveReservationDetail (nodeId, dateText) {
      // G002.00.0 Add-Start
      if (this.isCloning || this.typeOfSetting === 'new') {
        try {
          const response = await axios.put(this.$i18n.t('prop.url') + fetchReservationDetail, {
            nodeId: nodeId,
            excludeFields: false,
            type: settingType,
            executionDate: dateText
          }, commonUtils.methods.getApiHeader())

          if (response.data.responseModel) {
            const settings = response.data.responseModel

            if (settings.length > 0) {
              this.$refs.pop.open(3, '', '指定の変更基準日には既に予約の設定があります。他の日付に変更するか、一覧に戻り指定の変更基準日の予約の設定をご確認ください。', '', false, null, false, null)
              return
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      // G002.00.0 Add-End
      // G010.00.0 Add-Start
      if (this.typeOfSetting === 'future') {
        if (this.futureDateText != this.changeDateText) {
          try {
            const response = await axios.put(this.$i18n.t('prop.url') + fetchReservationDetail, {
              nodeId: nodeId,
              excludeFields: false,
              type: settingType,
              executionDate: dateText
            }, commonUtils.methods.getApiHeader())

            if (response.data.responseModel) {
              const settings = response.data.responseModel

              if (settings.length > 0) {
                this.$refs.pop.open(3, '', '指定の変更基準日には既に予約の設定があります。他の日付に変更するか、一覧に戻り指定の変更基準日の予約の設定をご確認ください。', '', false, null, false, null)
                return
              }
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
      // G010.00.0 Add-End
      // G012.00.0 Add-Start
      if (this.isCloning) {
        this.setting.version = null
        this.setting.id = null
      }
      // G012.00.0 Add-End
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putReservationDetail, {
          nodeId: nodeId,
          type: settingType,
          executionDate: dateText,
          configuration: this.setting
        }, commonUtils.methods.getApiHeader())

        // KSD V001.000 AS
        if (response.data && response.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$t('O00004.W008'), response.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
          return
        }
        // KSD V001.000 AE
        if (response.data.responseModel) {
        // G002.00.0 Add-Start
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
        // G002.00.0 Add-End
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a6.E001'), '', false, null, false, null)
        }
      } catch (error) {
        // KSD V001.000 DS
        // this.$refs.pop.open(3, '', this.$i18n.t('F322a6.E001'), '', false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 AE
      }
    },
    // G008.00.0 Add-Start
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          // KSD V001.000 MS
          // focusItem.focus()
          const step = focusItem.parentElement.parentElement.parentElement
          this.screenStep = !isNaN(step.dataset.step)
            ? Number(step.dataset.step)
            : Number(step.parentElement.dataset.step)
          setTimeout(() => focusItem.focus(), 200)
          // KSD V001.000 ME
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    // KSD V001.000 AS
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        let target = null
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea')
        const errorTarget = [...focusable].find(x => !x.disabled && x.classList.contains('errorTextBox') && x.closest('div.screenHeader').style.display !== 'none')
        if (this.typeOfSetting === 'past' && !this.isCloudposAdmin) {
          target = [...focusable].find(x => !x.disabled)
        } else if (this.typeOfSetting !== 'past' || this.isCloudposAdmin || this.isCloning) {
          target = [...focusable].find(x => !x.disabled && x.closest('div.screenHeader').style.display !== 'none')
          if (target.classList.contains('flatpickr-input')) target = null
        }
        if (target !== null) errorTarget ? errorTarget.focus() : target.focus()
      })
    },
    // KSD V001.000 AE
    checkError () {
      this.focusItem = null
      let flag = false
      // KSD V001.000 AS
      if (this.config.copyReceipt.numOfAutoIssue === '' || this.config.copyReceipt.numOfAutoIssue == null) {
        this.focusItem = this.$refs.numOfAutoIssueText
        this.numOfAutoIssueErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      }
      if (this.config.firstDay === '' || this.config.firstDay == null) {
        this.focusItem = this.$refs.firstDayText
        this.firstDayErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      } else if (!this.dateRegulation(this.config.firstDay)) {
        this.focusItem = this.$refs.firstDayText
        this.firstDayErrorMsg = this.$i18n.t('F322a6.E013')
        flag = true
      }
      if ((this.config.remoteConciergeUrl === '' || this.config.remoteConciergeUrl == null) && this.config.remoteConciergeSettings === true) {
        this.focusItem = this.$refs.remoteConciergeUrlText
        this.remoteConciergeUrlErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      }
      if (this.config.operatingTime === '' || this.config.operatingTime == null) {
        this.focusItem = this.$refs.operatingTimeText
        this.operatingTimeErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      } else if (this.config.operatingTime < 1 || this.config.operatingTime > 1440) {
        this.focusItem = this.$refs.operatingTimeText
        this.operatingTimeErrorMsg = this.$i18n.t('F322a6.E019')
        flag = true
      }
      if (this.config.reservationNotifyTime === '' || this.config.reservationNotifyTime == null) {
        this.focusItem = this.$refs.reservationNotifyTimeText
        this.reservationNotifyErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      } else if (this.config.reservationNotifyTime < 1 || this.config.reservationNotifyTime > 24) {
        this.focusItem = this.$refs.reservationNotifyTimeText
        this.reservationNotifyErrorMsg = this.$i18n.t('F322a6.E011')
        flag = true
      }
      if (this.config.mobileAplPayAutoOrderRelTm === '' || this.config.mobileAplPayAutoOrderRelTm == null) {
        this.focusItem = this.$refs.mobileAplPayAutoOrderRelTmText
        this.mobileAplPayAutoOrderRelTmErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      } else if (this.config.mobileAplPayAutoOrderRelTm < 1 || this.config.mobileAplPayAutoOrderRelTm > 60) {
        this.focusItem = this.$refs.mobileAplPayAutoOrderRelTmText
        this.mobileAplPayAutoOrderRelTmErrorMsg = this.$i18n.t('F322a6.E017')
        flag = true
      }
      if (this.config.mobileAplPayPollingInterval === '' || this.config.mobileAplPayPollingInterval == null) {
        this.focusItem = this.$refs.mobileAplPayPollingIntervalText
        this.mobileAplPayPollingIntervalErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      } else if (this.config.mobileAplPayPollingInterval < 1 || this.config.mobileAplPayPollingInterval > 60) {
        this.focusItem = this.$refs.mobileAplPayPollingIntervalText
        this.mobileAplPayPollingIntervalErrorMsg = this.$i18n.t('F322a6.E017')
        flag = true
      }
      if (this.config.updateDisplayInterval === '' || this.config.updateDisplayInterval == null) {
        this.focusItem = this.$refs.updateDisplayIntervalText
        this.displayIntervalErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      } else if (this.config.updateDisplayInterval < 60 || this.config.updateDisplayInterval > 600) {
        this.focusItem = this.$refs.updateDisplayIntervalText
        this.displayIntervalErrorMsg = this.$i18n.t('F322a6.E010')
        flag = true
      }
      if (this.config.communicationPosTerminalID === '' || this.config.communicationPosTerminalID == null) {
        this.focusItem = this.$refs.communicationPosTerminalIDText
        this.communicationPosTerminalIDErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      } else if (this.config.communicationPosTerminalID < 1) {
        this.focusItem = this.$refs.communicationPosTerminalIDText
        this.communicationPosTerminalIDErrorMsg = this.$i18n.t('F322a6.E018')
        flag = true
      }
      // KSD V001.000 AE
      // G019.00.0 Update-Start
      // if (this.$refs.limitInputRegulationText.value === '' || this.$refs.limitInputRegulationText.value == undefined) {
      if (this.config.itemListLimit === '' || this.config.itemListLimit == null) {
      // G019.00.0 Update-End
        this.focusItem = this.$refs.limitInputRegulationText
        this.limitErrorMsg = '必ず入力してください。'
        flag = true
      }
      // KSD V001.000 AS
      if (this.config.signOnCameraNoOperationTime === '' || this.config.signOnCameraNoOperationTime == null) {
        this.focusItem = this.$refs.signOnCameraNoOperationTimeText
        this.signOnCameraNoOperationTimeErrorMsg = this.$i18n.t('O00004.W014')
        flag = true
      } else if (this.config.signOnCameraNoOperationTime < 1 || this.config.signOnCameraNoOperationTime > 30) {
        this.focusItem = this.$refs.signOnCameraNoOperationTimeText
        this.signOnCameraNoOperationTimeErrorMsg = this.$i18n.t('F322a6.E016')
        flag = true
      }
      // KSD V001.000 AE
      // G019.00.0 Update-Start
      // if (this.$refs.logoutTimeText.value === '' || this.$refs.logoutTimeText.value == undefined) {
      if (this.config.logoutTime === '' || this.config.logoutTime == null) {
      // G019.00.0 Update-End
        this.focusItem = this.$refs.logoutTimeText
        this.logoutTimeErrorMsg = '必ず入力してください。'
        flag = true
      }
      // G019.00.0 Update-Start
      // if (this.$refs.businessDayStartTimeText.value === '' || this.$refs.businessDayStartTimeText.value == undefined) {
      if (this.businessDayStartTime === '' || this.businessDayStartTime == null) {
      // G019.00.0 Update-End
        this.focusItem = this.$refs.businessDayStartTimeText
        this.timeErrorMsg = '必ず入力してください。'
        flag = true
      }
      return flag
    },
    // G008.00.0 Add-EnditemListLimit
    async fixed () {
      // G017.00.0 Add-Start
      if (!this.businessDayStartTime.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)) {
        this.businessDayStartTime = ''
        // G016.00.0 Add-Start
        this.timeErrorMsg = '必ず入力してください。'
        // G016.00.0 Add-End
      } else {
        this.timeErrorMsg = null
      }
      // G020.00.0 Update-Start
      // const reg1 = /^[1-9][0-9]?$/
      const reg1 = /^[1-9][0-9]?$|0/
      // G020.00.0 Update-End
      const reg2 = /^((10000)|([1-9]\d{0,3}))$/
      if (!reg1.test(this.config.logoutTime)) {
        this.config.logoutTime = this.config.logoutTime.substring(0, this.config.logoutTime.length - 1)
      } else {
        this.logoutTimeErrorMsg = null
      }
      if (!reg2.test(this.config.itemListLimit)) {
        this.config.itemListLimit = this.config.itemListLimit.toString().substring(0, this.config.itemListLimit.length - 1)
        if (this.config.itemListLimit.length > 0) {
          this.config.itemListLimit = parseFloat(this.config.itemListLimit)
        }
      } else {
        this.limitErrorMsg = null
      }
      // G017.00.0 Add-End
      // KSD V001.000 AS
      if (this.config.signOnCameraNoOperationTime >= 1 && this.config.signOnCameraNoOperationTime <= 30) {
        this.signOnCameraNoOperationTimeErrorMsg = null
      }
      if (this.config.communicationPosTerminalID >= 1) {
        this.communicationPosTerminalIDErrorMsg = null
      }
      if (this.config.updateDisplayInterval >= 60 && this.config.updateDisplayInterval <= 600) {
        this.displayIntervalErrorMsg = null
      }
      if (this.config.mobileAplPayPollingInterval >= 1 && this.config.mobileAplPayPollingInterval <= 60) {
        this.mobileAplPayPollingIntervalErrorMsg = null
      }
      if (this.config.mobileAplPayAutoOrderRelTm >= 1 && this.config.mobileAplPayAutoOrderRelTm <= 60) {
        this.mobileAplPayAutoOrderRelTmErrorMsg = null
      }
      if (this.config.operatingTime >= 1 && this.config.operatingTime <= 1440) {
        this.operatingTimeErrorMsg = null
      }
      if (this.config.reservationNotifyTime >= 1 && this.config.reservationNotifyTime <= 24) {
        this.reservationNotifyErrorMsg = null
      }
      if ((this.config.remoteConciergeUrl !== '' && this.config.remoteConciergeSettings === true) || this.config.remoteConciergeSettings !== true) {
        this.remoteConciergeUrlErrorMsg = null
      }
      if (this.dateRegulation(this.config.firstDay)) {
        this.firstDayErrorMsg = null
      }
      if (this.config.copyReceipt.numOfAutoIssue <= 9) {
        this.numOfAutoIssueErrorMsg = null
      }
      // KSD V001.000 AE
      // G008.00.0 Add-Start
      if (this.checkError()) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.setFocus, false, null)
        return
      }
      // G008.00.0 Add-End
      console.log(this.settingList, 'this.settingLIst')
      // G002.00.0 Add-Start
      if (this.changeDateText == null || this.changeDateText == '') {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a6.W004'), '', false, null, false, null)
        return
      }
      // G002.00.0 Add-End
      if (this.typeOfSetting === 'current') {
        // KSD V001.000 MS
        // this.loadChangedCurrentSetting()
        // await this.saveCurrentSetting(this.targetStoreCodes[0])
        this.$refs.pop.open(1, '', this.$i18n.t('F322a6.E014'), '', true, this.secondConfirmation, false, null)
        // KSD V001.000 ME
      } else {
        this.loadChangedConfigurationSetting()
        if (this.typeOfSetting === 'new') {
          this.setting.nodeId = this.targetStoreCodes[0]
          this.setting.executionDate = this.changeDateText
        }
        await this.saveReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      }

      // G002.00.0 Delete-Start
      // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', true, () => {
      //   this.$router.push(configSelectPath)
      // }, false, null)
      // G002.00.0 Delete-End
    },
    getCurrentSetting (nodeId) {
      axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
        nodeId: nodeId,
        excludeFields: false,
        type: settingType
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          // KSD V001.000 AS
          if (response.data && response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$t('O00004.W008'), response.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
          }
          // KSD V001.000 AE
          if (response.data.responseModel) {
            // G001.00.0 Add-Start
            if (response.data.responseModel.configurations.STORE_OPERATIONS_SETTINGS) {
              this.setCurrentConfiguration(response.data.responseModel)
            } else {
              // this.emptyConfigurationSetting1()
            }
            // G001.00.0 Add-End
            // G001.00.0 Delete-Start
            // this.setCurrentConfiguration(response.data.responseModel)
            // G001.00.0 Delete-End
          } else {
            this.emptyConfigurationSetting()
          }
        })
        .catch(error => {
          console.log(error)
          // G005.00.0 Add-Start
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
          // G005.00.0 Add-End
        })
    },
    emptyConfigurationSetting () {
      this.config = {}
    },
    // G001.00.0 Add-Start
    emptyConfigurationSetting1 () {
      const response = {
        configurations: {
          'STORE_OPERATIONS_SETTINGS': {
            'name': 'STORE_OPERATIONS_SETTINGS',
            'value': {
              // G004.00.0 Update-Start
              // 'discountFraction': 0,
              // 'taxFraction': 0,
              'discountFraction': 'ROUND',
              'taxFraction': 'ROUND',
              // G004.00.0 Update -End
              'totalPriceDiscount': true,
              'passwordInput': true,
              'passwordRule': 0,
              'logoutTime': 0,
              'numberOfPeople': true,
              'manualQuantity': true,
              'salesChangeDiscount': true,
              'zeroPriceRegistration': true,
              // G006.00.0 Update-Start
              // 'climgingGold': 0,
              // 'itemListLimit': 0,
              'climbingGold': 0,
              'itemListLimit': 50
              // G006.00.0 Update -End
              // G001.00.0 Delete-Start
              // '0sellingPrice': true,
              // 'coinbarCount': 0
              // G001.00.0 Delete-End
            },
            'type': 'Map',
            'group': 'STORE_OPERATIONS',
            'subGroup': 'CONFIG'
          }
          // G003.00.0 Delete-Start
          // ,
          // 'BUSINESS_DAY_START_TIME': {
          //   'version': 1,
          //   'description': {
          //     'default': 'DEPRECATED: Will only be used when BUSINESS_DAYS is not configured. Defines the business day start time in HH:mm:ss from 00:00:00 to 23:59:59. No till operations are allowed outside of the startTime to hardEndTime window.'
          //   },
          //   'type': 'Key',
          //   'group': 'CASH-MANAGEMENT',
          //   'inherited': true,
          //   'subGroup': 'CONFIG',
          //   'name': 'BUSINESS_DAY_START_TIME',
          //   'value': '00:00'
          // }
          // G003.00.0 Delete-End
        },
        configurationType: 'STORE_OPERATIONS_SETTINGS',
        executionDate: null,
        nodeId: null
      }
      this.setCurrentConfiguration(response)
    },
    // G001.00.0 Add-End
    fetchBusinessDayStartTime () {
      this.businessDayStartTime = '00:00'
    },
    async backToConfigSelect () {
      this.$router.push(configSelectPath)
    },
    // G014.00.0 Add-Start
    async close () {
      // G015.00.0 Update start
      // this.$refs.pop.open(1, '終了', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      // G015.00.0 Update end
    },
    backToTopPage () {
      this.$router.push({
        name: 'TopPage'
      })
    },
    // G0014.00.0 Add-End
    setCurrentConfiguration (setting) {
      // G002.00.0 Update-Start
      // this.setting = setting
      // G001.00.0 Update-Start
      // if (this.typeOfSetting === 'new') {
      //   console.log(setting, '_herereimportant')
      //   this.businessDayStartTime = setting.configurationSetting.BUSINESS_DAY_START_TIME.value
      //   this.config = setting.configurationSetting.STORE_OPERATIONS_SETTINGS.value
      // } else {
      //   this.businessDayStartTime = setting.configurations.BUSINESS_DAY_START_TIME.value
      //   this.config = setting.configurations.STORE_OPERATIONS_SETTINGS.value
      // }
      if (this.typeOfSetting === 'new') {
        // G003.00.0 Update-Start
        // this.businessDayStartTime = setting.configurations.BUSINESS_DAY_START_TIME.value
        this.businessDayStartTime = setting.configurations.STORE_OPERATIONS_SETTINGS.value.autoAdjustmentTime
        // G003.00.0 Update-End
        this.config = setting.configurations.STORE_OPERATIONS_SETTINGS.value
        let value1 = setting.configurations.STORE_OPERATIONS_SETTINGS.value
        // G003.00.0 Delete-Start
        // let value2 = setting.configurations.BUSINESS_DAY_START_TIME.value
        // G003.00.0 Delete-End
        this.setting = {
          configurationSetting: {
            'STORE_OPERATIONS_SETTINGS': {
              'name': 'STORE_OPERATIONS_SETTINGS',
              'value': value1,
              'type': 'Map',
              'group': 'STORE_OPERATIONS',
              'subGroup': 'CONFIG'
            }
            // G003.00.0 Delete-Start
            // ,
            // 'BUSINESS_DAY_START_TIME': {
            //   'version': 1,
            //   'description': {
            //     'default': 'DEPRECATED: Will only be used when BUSINESS_DAYS is not configured. Defines the business day start time in HH:mm:ss from 00:00:00 to 23:59:59. No till operations are allowed outside of the startTime to hardEndTime window.'
            //   },
            //   'type': 'Key',
            //   'group': 'CASH-MANAGEMENT',
            //   'inherited': true,
            //   'subGroup': 'CONFIG',
            //   'name': 'BUSINESS_DAY_START_TIME',
            //   'value': value2
            // }
            // G003.00.0 Delete-End
          },
          configurationType: 'STORE_OPERATIONS_SETTINGS',
          executionDate: null,
          nodeId: null
        }
      } else {
        this.setting = setting
        // G003.00.0 Update-Start
        // this.businessDayStartTime = setting.configurations.BUSINESS_DAY_START_TIME.value
        this.businessDayStartTime = setting.configurations.STORE_OPERATIONS_SETTINGS.value.autoAdjustmentTime
        // G003.00.0 Update-End
        this.config = setting.configurations.STORE_OPERATIONS_SETTINGS.value
      }
      // this.businessDayStartTime = setting.configurations.BUSINESS_DAY_START_TIME.value
      // this.config = setting.configurations.STORE_OPERATIONS_SETTINGS.value
      // G001.00.0 Update-End
      // G002.00.0 Update-End
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      // G021.00.0 Update-Start
      // this.config.logoutTime = this.config.logoutTime.toString().replace(/[^0-9]/gi, '')
      this.config.logoutTime = Number(this.config.logoutTime.toString().replace(/[^0-9]/gi, ''))
      // G021.00.0 Update-End
      // G017.00.0 Delete-Start
      // G008.00.0 Add-Start
      // const reg = /^[1-9][0-9]?$/
      // if (!reg.test(this.config.logoutTime)) {
      //   this.config.logoutTime = this.config.logoutTime.substring(0,this.config.logoutTime.length-1)
      // }else {
      //   this.logoutTimeErrorMsg = null
      // }
      // G008.00.0 Add-End
      // G017.00.0 Delete-End
    },
    // G008.00.0 Add-Start
    limitInputRegulation () {
      // G013.00.0 Update-Start
      // this.config.itemListLimit = this.config.itemListLimit.toString().replace(/[^0-9]/gi, '')
      // G019.00.0 Update-Start
      // let itemListLimit = this.config.itemListLimit.toString().replace(/[^0-9]/gi, '')
      // if (itemListLimit.length > 0) {
      //   this.config.itemListLimit = parseFloat(itemListLimit)
      // }
      this.config.itemListLimit = this.config.itemListLimit.toString().replace(/[^0-9]/gi, '')
      if (this.config.itemListLimit.length > 0) {
        this.config.itemListLimit = parseFloat(this.config.itemListLimit)
      }
      // G019.00.0 Update-End
      // G017.00.0 Delete-Start
      // // G013.00.0 Update-End
      // const reg = /^((10000)|([1-9]\d{0,3}))$/
      // // G013.00.0 Update-Start
      // // if (!reg.test(this.config.itemListLimit)) {
      // //   this.config.itemListLimit = this.config.itemListLimit.substring(0,this.config.itemListLimit.length-1)
      // if (!reg.test(itemListLimit)) {
      //   itemListLimit = itemListLimit.substring(0, itemListLimit.length - 1)
      //   if (itemListLimit.length > 0) {
      //     this.config.itemListLimit = parseFloat(itemListLimit)
      //   }
      // // G013.00.0 Update-End
      // }else{
      //   this.limitErrorMsg = null
      // }
      // G017.00.0 Delete-End
    },
    // G008.00.0 Add-End
    // 文字入力規制(時刻のみ)
    numInputTimeRegulation () {
      // G017.00.0 Delete-Start
      // if(!this.businessDayStartTime.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)){
      // this.businessDayStartTime = ''
      //   // G016.00.0 Add-Start
      //   this.timeErrorMsg = '必ず入力してください。'
      //   // G016.00.0 Add-End
      // }else{
      //   this.timeErrorMsg = null
      // }
      // G017.00.0 Delete-End
    }
    // KSD V001.000 AS
    , signOnCameraNoOperationTimeRegulation () {
      this.config.signOnCameraNoOperationTime = this.config.signOnCameraNoOperationTime.toString().replace(/[^0-9]/gi, '')
      if (this.config.signOnCameraNoOperationTime.length > 0) {
        this.config.signOnCameraNoOperationTime = parseFloat(this.config.signOnCameraNoOperationTime)
      }
    },
    communicationPosTerminalIDRegulation () {
      this.config.communicationPosTerminalID = this.config.communicationPosTerminalID.toString().replace(/[^0-9]/gi, '')
      if (this.config.communicationPosTerminalID.length > 0) {
        this.config.communicationPosTerminalID = parseFloat(this.config.communicationPosTerminalID)
      }
    },
    updateDisplayIntervalRegulation () {
      this.config.updateDisplayInterval = this.config.updateDisplayInterval.toString().replace(/[^0-9]/gi, '')
      if (this.config.updateDisplayInterval.length > 0) {
        this.config.updateDisplayInterval = parseFloat(this.config.updateDisplayInterval)
      }
    },
    mobileAplPayPollingIntervalRegulation () {
      this.config.mobileAplPayPollingInterval = this.config.mobileAplPayPollingInterval.toString().replace(/[^0-9]/gi, '')
      if (this.config.mobileAplPayPollingInterval.length > 0) {
        this.config.mobileAplPayPollingInterval = parseFloat(this.config.mobileAplPayPollingInterval)
      }
    },
    mobileAplPayAutoOrderRelTmRegulation () {
      this.config.mobileAplPayAutoOrderRelTm = this.config.mobileAplPayAutoOrderRelTm.toString().replace(/[^0-9]/gi, '')
      if (this.config.mobileAplPayAutoOrderRelTm.length > 0) {
        this.config.mobileAplPayAutoOrderRelTm = parseFloat(this.config.mobileAplPayAutoOrderRelTm)
      }
    },
    operatingTimeRegulation () {
      this.config.operatingTime = this.config.operatingTime.toString().replace(/[^0-9]/gi, '')
      if (this.config.operatingTime.length > 0) {
        this.config.operatingTime = parseFloat(this.config.operatingTime)
      }
    },
    reservationNotifyTimeRegulation () {
      this.config.reservationNotifyTime = this.config.reservationNotifyTime.toString().replace(/[^0-9]/gi, '')
      if (this.config.reservationNotifyTime.length > 0) {
        this.config.reservationNotifyTime = parseFloat(this.config.reservationNotifyTime)
      }
    },
    remoteConciergeUrlRegulation () {
      this.config.remoteConciergeUrl = this.config.remoteConciergeUrl.replace(/[^\x00-\x7F]/g, '')
      this.config.remoteConciergeUrl = validationUtils.methods.excludeProhibitedInput(this.config.remoteConciergeUrl, /[\\'\|\`\^\"\<\>\)\(\}\{\]\[]/g, this.config, 'remoteConciergeUrl')
    },
    numOfAutoIssueRegulation () {
      this.config.copyReceipt.numOfAutoIssue = this.config.copyReceipt.numOfAutoIssue.toString().replace(/[^0-9]/gi, '')
      if (this.config.copyReceipt.numOfAutoIssue.length > 0) {
        this.config.copyReceipt.numOfAutoIssue = parseFloat(this.config.copyReceipt.numOfAutoIssue)
      }
    },
    dateRegulation (dateString) {
      const date = Moment(dateString, 'MM/DD', true)
      return date.isValid() && date.format('MM/DD') === dateString
    },
    async secondConfirmation () {
      this.$refs.pop.open(1, '', this.$i18n.t('F322a6.E015'), '', true, this.execCurrentSetting, false, null)
    },
    async execCurrentSetting () {
      this.loadChangedCurrentSetting()
      await this.saveCurrentSetting(this.targetStoreCodes[0])
    }
    // KSD V001.000 AE
  },
  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322a6-edit'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.fetchConfig()
  },
  // G018.00.0 Add-Start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // KSD V001.000 AS
    this.$root.$once('getIsCloudposAdmin', (isCloudposAdmin) => {
      this.isCloudposAdmin = isCloudposAdmin
      this.hasCloudPosAdminCheck = true
      if (!this.isCloudposAdmin) this.radioButtonDisabled = true
      if (this.typeOfSetting !== 'past' && this.isCloudposAdmin) this.focusFirstFocusableElement()
    })
    // KSD V001.000 AE
  },
  // G018.00.0 Add-End
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
