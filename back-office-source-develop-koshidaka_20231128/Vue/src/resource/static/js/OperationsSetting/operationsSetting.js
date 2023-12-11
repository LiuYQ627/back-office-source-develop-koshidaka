/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221207  dingxin(Neusoft)  G001.00.0  issue課題#1097を対応します.
 * 20221223  dingxin(Neusoft)  G002.00.0  issue課題#1212を対応します.
 * 20221229  dingxin(Neusoft)  G003.00.0  issue課題#1225を対応します.
 * 20230109  duyouwei(Neusoft) G004.00.0  issue課題#1377を対応します.
 * 20230129  duyouwei(Neusoft) G005.00.0  issue課題#1032を対応します.
 * 20230208  dingxin(Neusoft)  G006.00.0  issue課題#1510を対応します.
 * 20230209  dingxin(Neusoft)  G007.00.0  issue課題#1403を対応します.
 * 20230209  xu.jh(Neusoft)  G008.00.0  issue課題#1484を対応します.
 * 20230231  dingxin(Neusoft)  G009.00.0  issue課題#1583を対応します.
 * 20230316  xu.jh(Neusoft)  G010.00.0  issue課題#1444を対応します.
 * 20230331  xu.jh(Neusoft)  G011.00.0  issue課題#1618を対応します.
 * 20230418  dingxin(Neusoft)  G012.00.0  issue課題#1377を対応します.
 * 20230423  dingxin(Neusoft)  G013.00.0  issue課題#1662を対応します.
 * 20230425  dingxin(Neusoft)  G014.00.0  issue課題#1377を対応します.
 * 20230516  dingxin(Neusoft)  G015.00.0  issue課題#1377を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import radioButton from '@/resource/templates/CommonInput/RadioButton'
// G002.00.0 Update-Start
// import configSelectCommonCondition from '@/resource/templates/ConfigSelect/ConfigSelectCommonCondition'
import configCommonCondition from '@/resource/templates/ConfigSelect/ConfigCommonCondition'
// G002.00.0 Update-End
import commonUtils from '../Common/commonUtils'
import axios from 'axios'

const configSelectPath = '/F322a5/運用設定'
const settingType = 'OPERATIONS_SETTINGS'

// G004.00.0 Update-Start
// const fetchCurrentConfiguration = 'Reservation/FetchConfiguration
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'
// G004.00.0 Update -End
const putCurrentConfiguration = 'Reservation/UpdateConfiguration'
const fetchReservationDetail = 'Reservation/FetchDetail'
const putReservationDetail = 'Reservation/UpdateDetail'
// G002.00.0 Add-Start
const destroyReservationDetail = 'Reservation/DestroyDetail'
// G002.00.0 Add-End
// KSD V001.000 AS
const getTax = 'TaxTaxes/Query'
// KSD V001.000 AE

export default {
  name: 'OperationsSetting',
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
      // G013.00.0 Add-Start
      permissions: [],
      // G013.00.0 Add-End
      // G002.00.0 Add-Start
      disabledFixedBtn: this.typeOfSetting == 'past',
      disabledDeleteBtn: this.isCloning || this.typeOfSetting == 'current',
      disabledCloneBtn: this.isCloning || this.typeOfSetting != 'past',
      isCloning: false,
      // G002.00.0 Add-End
      setting: {},
      // KSD V001.000 AS
      taxStorage: {},
      selectedCourseTaxRate: {},
      matchingTaxRate: {},
      getAllTax: {},
      // KSD V001.000 AE
      config: [
        {logoutTime: 60},
        {passwordMin: 60},
        {passwordMax: 60}
        // KSD V001.000 AS
        ,{earlyLeavingTime: 10},
        {leaveGraceTime: 15},
        {timePayingUnit: 30},
        {predictedCleaningTime: 10},
        {courseTaxRate: 'TAX1'},
        {selfCheckInExtensionTimeForReservation: 60},
        {autoCancelReservationTime: 15},
        {roomStatusThresholdTime1: 11},
        {roomStatusThresholdTime2: [0, 10]},
        {roomStatusThresholdTime3: [-1, -15]},
        {roomStatusThresholdTime4: -16}
        // KSD V001.000 AE
      ],
      // KSD V001.000 AS
      dataModel: {
        roomStatusThresholdTime2: {
          value1: '', value2: ''
        },
        roomStatusThresholdTime3: {
          value1: '', value2: ''
        }
      },
      // KSD V001.000 AE
      changeDateText: this.propChangeDateText,
      // G006.00.0 Delete-Start
      // businessDayStartTime: '',
      // G006.00.0 Delete-End
      // G007.00.0 Add-Start
      futureDateText: '',
      // G007.00.0 Add-End

      // 20221128 MOD S TEC.Gotou #1234
      passwordRuleLabels: [
        { name: '0（英字+数字）', value: 0 },
        { name: '1（英字大+英字小+数字（推奨））', value: 1 },
        { name: '2（英字、数字の組み合わせ自由）', value: 2 },
        { name: '3（英字大+英字小+数字+記号）', value: 3 }
      ],
      // 20221128 MOD E TEC.Gotou #1234
      // G008.00.0 Add-Start
      focusItem: null,
      // KSD V001.000 DS
      // timeErrorMsg: null,
      // KSD V001.000 DE
      // G014.00.0 Add-Start
      compareHighErrorMsg: null,
      // G014.00.0 Add-End
      // G012.00.0 Update-Start
      // passwordErrorMsg: null
      passwordErrorMsgMin: null,
      passwordErrorMsgMax: null
      // G012.00.0 Update-End
      // G008.00.0 Add-End
      // KSD V001.000 AS
      ,earlyLeavingTimeErrorMsg: null,
      leaveGraceTimeErrorMsg: null,
      timePayingUnitErrorMsg: null,
      predictedCleaningTimeErrorMsg: null,
      selfCheckInExtensionTimeForReservationErrorMsg: null,
      autoCancelReservationTimeErrorMsg: null,
      roomStatusThresholdTime1ErrorMsg: null,
      roomStatusThresholdTime2ErrorMsg: null,
      roomStatusThresholdTime2ErrorMsgMax: null,
      roomStatusThresholdTime2ErrorMsgMin: null,
      roomStatusThresholdTime3ErrorMsg: null,
      roomStatusThresholdTime3ErrorMsgMin: null,
      roomStatusThresholdTime3ErrorMsgMax: null,
      roomStatusThresholdTime4ErrorMsg: null
      // KSD V001.000 AE
    }
  },
  components: {
    popup,
    maintButton,
    radioButton,
    // G002.00.0 Update-Start
    // configSelectCommonCondition
    configCommonCondition
    // G002.00.0 Update-End
  },
  // G002.00.0 Add-Start
  computed: {
    typeOfSettingWithCloning () {
      return this.isCloning ? 'new' : this.typeOfSetting
    }
  },
  // G002.00.0 Add-End
  methods: {
    fetchConfig () {
      // G001.00.0 Update-Start
      // if (this.typeOfSetting === 'current') {
      if (this.typeOfSetting === 'current' || this.typeOfSetting === 'new') {
      // G001.00.0 Update-End
        this.getCurrentSetting(this.targetStoreCodes[0])
        // G002.00.0 Add-Start
        this.disabledDeleteBtn = true
        // G002.00.0 Add-End
      } else {
        // G007.00.0 Add-Start
        this.futureDateText = this.changeDateText
        // G007.00.0 Add-End
        this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      }
    },
    // G002.00.0 Update-Start
    // getReservationDetail (nodeId, dateText) {
    async getReservationDetail (nodeId, dateText) {
    // G002.00.0 Update-End
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
            // KSD V001.000 DS
            //  console.log(settings, 'settingssettingssettings')
            // KSD V001.000 DE
            if (settings.length > 0) {
              // KSD V001.000 AS
              this.getTaxQuery()
              // KSD V001.000 AE
              this.setConfigurationSetting(settings[0])
            } else {
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // G002.00.0 Add-Start
    clone () {
      // G011.00.0 Update start
      // this.$refs.pop.open(1, '再利用', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => { })
      // G011.00.0 Update end
    },
    async copyCurrentSetting () {
      await this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      this.getTaxQuery()
      this.changeDateText = null
      this.isCloning = true
      this.disabledFixedBtn = false
      this.disabledCloneBtn = true
      this.disabledDeleteBtn = true
    },
    del () {
      // G011.00.0 Update start
      // this.$refs.pop.open(1, '削除', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => { })
      // G011.00.0 Update end
    },
    deleteConfiguration () {
      this.destroyReservationDetail(this.targetStoreCodes[0], this.changeDateText)
    },
    async destroyReservationDetail (nodeId, dateText) {
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + destroyReservationDetail, {
          nodeId: null,
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
          // G005.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a5.W003'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
          // G005.00.0 Update -End
            this.$router.push(configSelectPath)
          }, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E002'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E002'), '', false, null, false, null)
      }
    },
    stop () {
      // G011.00.0 Update start
      // this.$refs.pop.open(1, '中止', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => { })
      // G011.00.0 Update end
    },
    backToSelect () {
      this.$router.push({
        name: 'F322a5',
        params: {
          paramTargetStoreCodes: this.targetStoreCodes
        }
      })
    },
    // G002.00.0 Add-End
    setConfigurationSetting (setting) {
      this.setting = setting
      this.config = setting.configurationSetting.OPERATIONS_SETTINGS.value
      // KSD V001.000 AS
      const roomStatusThreshold2values = this.config.roomStatusThresholdTime2
      const roomStatusThreshold3values = this.config.roomStatusThresholdTime3

      this.dataModel.roomStatusThresholdTime2 = {
        value1: roomStatusThreshold2values[0],
        value2: roomStatusThreshold2values[1]
      }
      this.dataModel.roomStatusThresholdTime3 = {
        value1: roomStatusThreshold3values[0],
        value2: roomStatusThreshold3values[1]
      }
      this.selectedCourseTaxRate = setting.configurationSetting.OPERATIONS_SETTINGS.value.courseTaxRate
      this.matchingTaxRate = this.getAllTax.find(item => item.name === this.selectedCourseTaxRate)
      if (this.matchingTaxRate) {
        this.config.courseTaxRate = this.matchingTaxRate.displayName.default
      } else {
        this.config.courseTaxRate = ''
      }
      // KSD V001.000 AE
    },
    loadChangedCurrentSetting () {
      // G006.00.0 Delete-Start
      // this.setting.configurations.BUSINESS_DAY_START_TIME.value = this.businessDayStartTime
      // G006.00.0 Delete-End
      this.setting.configurations.OPERATIONS_SETTINGS.value = this.config
    },
    loadChangedConfigurationSetting () {
      this.setting.configurationSetting.OPERATIONS_SETTINGS.value = this.config
    },
    async saveCurrentSetting (nodeId) {
      // KSD V001.000 AS
      const findTax = this.getAllTax.filter(res => res.displayName.default === this.config.courseTaxRate)
      const courseTaxRate = findTax.length ? findTax[0].name : ''
      const updatedSetting = {
        ...this.setting,
        configurations: {
          ...this.setting.configurations,
          OPERATIONS_SETTINGS: {
            ...this.setting.configurations.OPERATIONS_SETTINGS,
            value: {
              ...this.setting.configurations.OPERATIONS_SETTINGS.value,
              autoCancelReservationTime: Number(this.$refs.autoCancelReservationTimeText.value),
              earlyLeavingTime: Number(this.$refs.earlyLeavingTimeText.value),
              leaveGraceTime: Number(this.$refs.leaveGraceTimeText.value),
              // KSD V001.000 DS
              // logoutTime: Number(this.$refs.logoutTimeText.value),
              // KSD V001.000 DE
              // KSD V001.000 AS
              passwordMin: Number(this.$refs.passwordMinText.value),
              passwordMax: Number(this.$refs.passwordMaxText.value),
              // KSD V001.000 AE
              predictedCleaningTime: Number(this.$refs.predictedCleaningTimeText.value),
              roomStatusThresholdTime1: Number(this.$refs.roomStatusThresholdTime1Text.value),
              roomStatusThresholdTime2: [
                Number(this.$refs.roomStatusThresholdTime2MinText.value),
                Number(this.$refs.roomStatusThresholdTime2MaxText.value)
              ],
              roomStatusThresholdTime3: [
                Number(this.$refs.roomStatusThresholdTime3MinText.value),
                Number(this.$refs.roomStatusThresholdTime3MaxText.value)
              ],
              roomStatusThresholdTime4: Number(this.$refs.roomStatusThresholdTime4Text.value),
              selfCheckInExtensionTimeForReservation: Number(this.$refs.selfCheckInExtensionTimeForReservationText.value),
              timePayingUnit: Number(this.$refs.timePayingUnitText.value),
              courseTaxRate
            }
          }
        }
      }
      // KSD V001.000 AE
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putCurrentConfiguration, {
          nodeId: nodeId,
          type: settingType,
          // KSD V001.000 DS
          // configuration: this.setting,
          // KSD V001.000 DE
          // KSD V001.000 AS
          configuration: updatedSetting,
          // KSD V001.000 AE
          mode: 0
        }, commonUtils.methods.getApiHeader())

        // G002.00.0 Update-Start
        // if (response.data.responseModel) {
        if (response.data.result.code == 0) {
          // G005.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a5.W001'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
          // G005.00.0 Update-End
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
          this.$refs.pop.open(3, '', this.$i18n.t('F322a5.E001'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a5.E001'), '', false, null, false, null)
      }
    },
    async saveReservationDetail (nodeId, dateText) {
      // G002.00.0 Add-Start
      if (this.isCloning || this.typeOfSetting === 'new') {
        try {
          const response = await axios.put(this.$i18n.t('prop.url') + fetchReservationDetail, {
            nodeId: null,
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
      // G007.00.0 Add-Start
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
      // G007.00.0 Add-End
      // G009.00.0 Add-Start
      if (this.isCloning) {
        this.setting.version = null
        this.setting.id = null
      }
      // KSD V001.000 AS
      this.selectedCourseTaxRate = this.setting.configurationSetting.OPERATIONS_SETTINGS.value.courseTaxRate
      const findTax = this.getAllTax.filter(res => res.displayName.default === this.selectedCourseTaxRate)
      const courseTaxRate = findTax.length ? findTax[0].name : ''
      const updatedSetting = {
        ...this.setting,
        configurationSetting: {
          ...this.setting.configurationSetting,
          OPERATIONS_SETTINGS: {
            ...this.setting.configurationSetting.OPERATIONS_SETTINGS,
            value: {
              ...this.setting.configurationSetting.OPERATIONS_SETTINGS.value,
              autoCancelReservationTime: Number(this.$refs.autoCancelReservationTimeText.value),
              earlyLeavingTime: Number(this.$refs.earlyLeavingTimeText.value),
              leaveGraceTime: Number(this.$refs.leaveGraceTimeText.value),
              // KSD V001.000 DS
              // logoutTime: Number(this.$refs.logoutTimeText.value),
              // KSD V001.000 DE
              // KSD V001.000 AS
              passwordMin: Number(this.$refs.passwordMinText.value),
              passwordMax: Number(this.$refs.passwordMaxText.value),
              // KSD V001.000 AE
              predictedCleaningTime: Number(this.$refs.predictedCleaningTimeText.value),
              roomStatusThresholdTime1: Number(this.$refs.roomStatusThresholdTime1Text.value),
              roomStatusThresholdTime2: [
                Number(this.$refs.roomStatusThresholdTime2MinText.value),
                Number(this.$refs.roomStatusThresholdTime2MaxText.value)
              ],
              roomStatusThresholdTime3: [
                Number(this.$refs.roomStatusThresholdTime3MinText.value),
                Number(this.$refs.roomStatusThresholdTime3MaxText.value)
              ],
              roomStatusThresholdTime4: Number(this.$refs.roomStatusThresholdTime4Text.value),
              selfCheckInExtensionTimeForReservation: Number(this.$refs.selfCheckInExtensionTimeForReservationText.value),
              timePayingUnit: Number(this.$refs.timePayingUnitText.value),
              courseTaxRate
            }
          }
        }
      }
      // KSD V001.000 AE
      // G009.00.0 Add-End
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putReservationDetail, {
          nodeId: nodeId,
          type: settingType,
          executionDate: dateText,
          // KSD V001.000 DS
          // configuration: this.setting
          // KSD V001.000 DE
          // KSD V001.000 AS
          configuration: updatedSetting
          // KSD V001.000 AE
        }, commonUtils.methods.getApiHeader())

        // KSD V001.000 AS
        if (response.data && response.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$t('O00004.W008'), response.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
          return
        }
        // KSD V001.000 AE
        if (response.data.responseModel) {
          // G002.00.0 Add-Start
          // G005.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a5.W001'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
            // G005.00.0 Update-End
            this.$router.push(configSelectPath)
          }, false, null)
          // G002.00.0 Add-End
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a5.E001'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a5.E001'), '', false, null, false, null)
      }
    },
    // G008.00.0 Add-Start
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    checkError () {
      this.focusItem = null
      let flag = false
      // KSD V001.000 AS
      let max2 = false
      let max2minCheck = false
      let max3minCheck = false
      let emptyCheck = false
      let minCheck = false
      let min2Check = false
      let minRangeCheck = false
      let minRange3Check = false
      let thresholdCheck = false
      let maxCheck = false
      // KSD V001.000 AE
      // KSD V001.000 DS
      // if (this.$refs.logoutTimeText.value === '' || this.$refs.logoutTimeText.value == undefined) {
      //   this.focusItem = this.$refs.logoutTimeText
      //   this.timeErrorMsg = '必ず入力してください。'
      //   // G014.00.0 Add-Start
      //   this.compareHighErrorMsg = null
      //   // G014.00.0 Add-End
      //   flag = true
      // }
      // KSD V001.000 DE
      if (this.$refs.passwordMinText.value === '' || this.$refs.passwordMinText.value == undefined) {
        this.focusItem = this.$refs.passwordMinText
        this.passwordErrorMsgMin = '必ず入力してください。'
        // G014.00.0 Add-Start
        this.compareHighErrorMsg = null
        // G014.00.0 Add-End
        flag = true
      }
      if (this.$refs.passwordMaxText.value === '' || this.$refs.passwordMaxText.value == undefined) {
        this.focusItem = this.$refs.passwordMaxText
        this.passwordErrorMsgMax = '必ず入力してください。'
        // G014.00.0 Add-Start
        this.compareHighErrorMsg = null
        // G014.00.0 Add-End
        flag = true
      }
      // KSD V001.000 AS
      if (this.$refs.earlyLeavingTimeText.value === '' || this.$refs.earlyLeavingTimeText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.earlyLeavingTimeText
        this.earlyLeavingTimeErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (parseInt(this.$refs.earlyLeavingTimeText.value) < 1 || parseInt(this.$refs.earlyLeavingTimeText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.earlyLeavingTimeText
        this.earlyLeavingTimeErrorMsg = this.$i18n.t('F322a5.E011')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (this.$refs.leaveGraceTimeText.value === '' || this.$refs.leaveGraceTimeText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.leaveGraceTimeText
        this.leaveGraceTimeErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (parseInt(this.$refs.leaveGraceTimeText.value) < 0 || parseInt(this.$refs.leaveGraceTimeText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.leaveGraceTimeText
        this.leaveGraceTimeErrorMsg = this.$i18n.t('F322a5.E010')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (this.$refs.timePayingUnitText.value === '' || this.$refs.timePayingUnitText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.timePayingUnitText
        this.timePayingUnitErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (parseInt(this.$refs.timePayingUnitText.value) < 10 || parseInt(this.$refs.timePayingUnitText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.timePayingUnitText
        this.timePayingUnitErrorMsg = this.$i18n.t('F322a5.E012')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (this.$refs.predictedCleaningTimeText.value === '' || this.$refs.predictedCleaningTimeText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.predictedCleaningTimeText
        this.predictedCleaningTimeErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (parseInt(this.$refs.predictedCleaningTimeText.value) < 0 || parseInt(this.$refs.predictedCleaningTimeText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.predictedCleaningTimeText
        this.predictedCleaningTimeErrorMsg = this.$i18n.t('F322a5.E010')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (this.$refs.selfCheckInExtensionTimeForReservationText.value === '' || this.$refs.selfCheckInExtensionTimeForReservationText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.selfCheckInExtensionTimeForReservationText
        this.selfCheckInExtensionTimeForReservationErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (parseInt(this.$refs.selfCheckInExtensionTimeForReservationText.value) < 0 || parseInt(this.$refs.selfCheckInExtensionTimeForReservationText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.selfCheckInExtensionTimeForReservationText
        this.selfCheckInExtensionTimeForReservationErrorMsg = this.$i18n.t('F322a5.E010')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (this.$refs.autoCancelReservationTimeText.value === '' || this.$refs.autoCancelReservationTimeText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.autoCancelReservationTimeText
        this.autoCancelReservationTimeErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (parseInt(this.$refs.autoCancelReservationTimeText.value) < 0 || parseInt(this.$refs.autoCancelReservationTimeText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.autoCancelReservationTimeText
        this.autoCancelReservationTimeErrorMsg = this.$i18n.t('F322a5.E010')
        this.compareHighErrorMsg = null
        flag = true
      }
      if (this.$refs.roomStatusThresholdTime1Text.value === '' || this.$refs.roomStatusThresholdTime1Text.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime1Text
        this.roomStatusThresholdTime1ErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
        thresholdCheck = true
      }
      if (thresholdCheck === false) {
        if (parseInt(this.$refs.roomStatusThresholdTime1Text.value) < -60 || parseInt(this.$refs.roomStatusThresholdTime1Text.value) > 60) {
          this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime1Text
          this.roomStatusThresholdTime1ErrorMsg = this.$i18n.t('F322a5.E013')
          this.compareHighErrorMsg = null
          flag = true
          thresholdCheck = true
        }
      }
      if (thresholdCheck === false) {
        if (parseInt(this.$refs.roomStatusThresholdTime2MinText.value) !== parseInt(this.$refs.roomStatusThresholdTime1Text.value) - 1) {
          this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime1Text
          this.roomStatusThresholdTime1ErrorMsg = this.$i18n.t('F322a5.E014')
          this.compareHighErrorMsg = null
          flag = true
          thresholdCheck = true
        }
      }
      if (this.$refs.roomStatusThresholdTime2MinText.value === '' || this.$refs.roomStatusThresholdTime2MinText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime2MinText
        this.roomStatusThresholdTime2ErrorMsgMin = this.$i18n.t('O00004.W014')
        this.roomStatusThresholdTime2ErrorMsg = this.$i18n.t('O00004.W014')
        thresholdCheck = true
        this.compareHighErrorMsg = null
        flag = true
      }
      if (parseInt(this.$refs.roomStatusThresholdTime2MinText.value) < -60 || parseInt(this.$refs.roomStatusThresholdTime2MinText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime2MinText
        this.roomStatusThresholdTime2ErrorMsgMin = this.$i18n.t('F322a5.E013')
        this.roomStatusThresholdTime2ErrorMsg = this.$i18n.t('F322a5.E013')
        this.compareHighErrorMsg = null
        thresholdCheck = true
        minRangeCheck = true
        max2minCheck = true
        flag = true
      }
      if (this.$refs.roomStatusThresholdTime2MaxText.value === '' || this.$refs.roomStatusThresholdTime2MaxText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime2MaxText
        this.roomStatusThresholdTime2ErrorMsgMax = this.$i18n.t('O00004.W014')
        this.roomStatusThresholdTime2ErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        emptyCheck = true
        thresholdCheck = true
        flag = true
      }
      if (parseInt(this.$refs.roomStatusThresholdTime2MaxText.value) < -60 || parseInt(this.$refs.roomStatusThresholdTime2MaxText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime2MaxText
        this.roomStatusThresholdTime2ErrorMsgMax = this.$i18n.t('F322a5.E013')
        this.roomStatusThresholdTime2ErrorMsg = this.$i18n.t('F322a5.E013')
        this.compareHighErrorMsg = null
        max2 = true
        thresholdCheck = true
        flag = true
      }
      if (minRangeCheck === false) {
        if (parseInt(this.$refs.roomStatusThresholdTime2MinText.value) === parseInt(this.$refs.roomStatusThresholdTime2MaxText.value)) {
          if (max2minCheck === false) {
            this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime2MinText
          }
          minCheck = true
          this.roomStatusThresholdTime2ErrorMsgMin = this.$i18n.t('F322a5.E014')
          this.compareHighErrorMsg = null
          thresholdCheck = true
          flag = true
        }
        if (parseInt(this.$refs.roomStatusThresholdTime2MinText.value) < parseInt(this.$refs.roomStatusThresholdTime2MaxText.value)) {
          if (max2minCheck === false) {
            this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime2MinText
          }
          minCheck = true
          this.roomStatusThresholdTime2ErrorMsgMin = this.$i18n.t('F322a5.E014')
          this.compareHighErrorMsg = null
          thresholdCheck = true
          flag = true
        }
      }
      if (max2 === false && emptyCheck === false) {
        if (parseInt(this.$refs.roomStatusThresholdTime3MinText.value) !== parseInt(this.$refs.roomStatusThresholdTime2MaxText.value) - 1) {
          if (minCheck === false) {
            this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime2MaxText
          }
          this.roomStatusThresholdTime2ErrorMsgMax = this.$i18n.t('F322a5.E014')
          this.roomStatusThresholdTime2ErrorMsg = this.$i18n.t('F322a5.E014')
          this.compareHighErrorMsg = null
          flag = true
          thresholdCheck = true
        }
      }
      if (this.$refs.roomStatusThresholdTime3MinText.value === '' || this.$refs.roomStatusThresholdTime3MinText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime3MinText
        this.roomStatusThresholdTime3ErrorMsgMin = this.$i18n.t('O00004.W014')
        this.roomStatusThresholdTime3ErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
        thresholdCheck = true
      }
      if (parseInt(this.$refs.roomStatusThresholdTime3MinText.value) < -60 || parseInt(this.$refs.roomStatusThresholdTime3MinText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime3MinText
        this.roomStatusThresholdTime3ErrorMsgMin = this.$i18n.t('F322a5.E013')
        this.roomStatusThresholdTime3ErrorMsg = this.$i18n.t('F322a5.E013')
        this.compareHighErrorMsg = null
        flag = true
        thresholdCheck = true
        minRange3Check = true
        max3minCheck = true
      }
      if (this.$refs.roomStatusThresholdTime3MaxText.value === '' || this.$refs.roomStatusThresholdTime3MaxText.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime3MaxText
        this.roomStatusThresholdTime3ErrorMsgMax = this.$i18n.t('O00004.W014')
        this.roomStatusThresholdTime3ErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
        maxCheck = true
      }
      if (parseInt(this.$refs.roomStatusThresholdTime3MaxText.value) < -60 || parseInt(this.$refs.roomStatusThresholdTime3MaxText.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime3MaxText
        this.roomStatusThresholdTime3ErrorMsgMax = this.$i18n.t('F322a5.E013')
        this.roomStatusThresholdTime3ErrorMsg = this.$i18n.t('F322a5.E013')
        this.compareHighErrorMsg = null
        flag = true
        maxCheck = true
      }
      if (minRange3Check === false) {
        if (parseInt(this.$refs.roomStatusThresholdTime3MinText.value) === parseInt(this.$refs.roomStatusThresholdTime3MaxText.value)) {
          if (max3minCheck === false) {
            this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime3MinText
          }
          min2Check = true
          this.roomStatusThresholdTime3ErrorMsgMin = this.$i18n.t('F322a5.E014')
          this.compareHighErrorMsg = null
          thresholdCheck = true
          flag = true
        }
        if (parseInt(this.$refs.roomStatusThresholdTime3MinText.value) < parseInt(this.$refs.roomStatusThresholdTime3MaxText.value)) {
          if (max3minCheck === false) {
            this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime3MinText
          }
          min2Check = true
          this.roomStatusThresholdTime3ErrorMsgMin = this.$i18n.t('F322a5.E014')
          this.compareHighErrorMsg = null
          thresholdCheck = true
          flag = true
        }
      }
      if (maxCheck === false) {
        if (parseInt(this.$refs.roomStatusThresholdTime4Text.value) !== parseInt(this.$refs.roomStatusThresholdTime3MaxText.value) - 1) {
          if (min2Check === false) {
            this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime3MaxText
          }
          this.roomStatusThresholdTime3ErrorMsgMax = this.$i18n.t('F322a5.E014')
          this.roomStatusThresholdTime3ErrorMsg = this.$i18n.t('F322a5.E014')
          this.compareHighErrorMsg = null
          flag = true
          thresholdCheck = true
          maxCheck = true
        }
      }
      if (this.$refs.roomStatusThresholdTime4Text.value === '' || this.$refs.roomStatusThresholdTime4Text.value === undefined) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime4Text
        this.roomStatusThresholdTime4ErrorMsg = this.$i18n.t('O00004.W014')
        this.compareHighErrorMsg = null
        flag = true
        thresholdCheck = true
      }
      if (parseInt(this.$refs.roomStatusThresholdTime4Text.value) < -60 || parseInt(this.$refs.roomStatusThresholdTime4Text.value) > 60) {
        this.focusItem = this.focusItem || this.$refs.roomStatusThresholdTime4Text
        this.roomStatusThresholdTime4ErrorMsg = this.$i18n.t('F322a5.E013')
        this.compareHighErrorMsg = null
        flag = true
        thresholdCheck = true
      }
      if (flag && this.focusItem) {
        this.focusItem.focus()
      }
      // KSD V001.000 AE
      // G015.00.0 Add-Start
      if (parseInt(this.config.passwordMax) < parseInt(this.config.passwordMin)) {
        this.compareHighErrorMsg = '8~15の範囲内で正しく入力してください。'
        flag = true
      } else {
        this.compareHighErrorMsg = null
      }
      // G015.00.0 Add-End
      return flag
    },
    // G008.00.0 Add-End
    async fixed () {
      // G012.00.0 Add-Start
      // KSD V001.000 DS
      // if (this.config.logoutTime !== '') {
      //   this.timeErrorMsg = null
      // }
      // KSD V001.000 DE
      if (this.config.passwordMin !== '') {
        this.passwordErrorMsgMin = null
      }
      if (this.config.passwordMax !== '') {
        this.passwordErrorMsgMax = null
      }
      // KSD V001.000 AS
      if (this.config.earlyLeavingTime !== '') {
        this.earlyLeavingTimeErrorMsg = null
      }
      if (this.config.leaveGraceTime !== '') {
        this.leaveGraceTimeErrorMsg = null
      }
      if (this.config.timePayingUnit !== '') {
        this.timePayingUnitErrorMsg = null
      }
      if (this.config.predictedCleaningTime !== '') {
        this.predictedCleaningTimeErrorMsg = null
      }
      if (this.config.selfCheckInExtensionTimeForReservation !== '') {
        this.selfCheckInExtensionTimeForReservationErrorMsg = null
      }
      if (this.config.autoCancelReservationTime !== '') {
        this.autoCancelReservationTimeErrorMsg = null
      }
      if (this.config.roomStatusThresholdTime1 !== '') {
        this.roomStatusThresholdTime1ErrorMsg = null
      }
      if (this.config.roomStatusThresholdTime2[0] !== '') {
        this.roomStatusThresholdTime2ErrorMsgMin = null
        this.roomStatusThresholdTime2ErrorMsg = null
      }
      if (this.config.roomStatusThresholdTime2[1] !== '') {
        this.roomStatusThresholdTime2ErrorMsgMax = null
        this.roomStatusThresholdTime2ErrorMsg = null
      }
      if (this.config.roomStatusThresholdTime3[0] !== '') {
        this.roomStatusThresholdTime3ErrorMsgMin = null
        this.roomStatusThresholdTime3ErrorMsg = null
      }
      if (this.config.roomStatusThresholdTime3[1] !== '') {
        this.roomStatusThresholdTime3ErrorMsgMax = null
        this.roomStatusThresholdTime3ErrorMsg = null
      }
      if (this.config.roomStatusThresholdTime4 !== '') {
        this.roomStatusThresholdTime4ErrorMsg = null
      }
      // KSD V001.000 AE
      // G012.00.0 Add-End
      // console.log(this.settingList, 'this.settingLIst')
      // G002.00.0 Add-Start
      if (this.changeDateText == null || this.changeDateText == '') {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a5.W002'), '', false, null, false, null)
        return
      }
      // G002.00.0 Add-End
      // G008.00.0 Add-Start
      if (this.checkError()) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.setFocus, false, null)
        return
      }
      // G008.00.0 Add-End
      // G014.00.0 Add-Start
      // G015.00.0 Del-Start
      //  if(parseInt(this.config.passwordMax) < parseInt(this.config.passwordMin)) {
      //   this.compareHighErrorMsg = this.config.passwordMin + 'より大きい値を入力してください。'
      //   this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.setFocus, false, null)
      //   return
      // } else {
      //   this.compareHighErrorMsg = null
      // }
      // G015.00.0 Del-End
      // G014.00.0 Add-End
      if (this.typeOfSetting === 'current') {
        this.loadChangedCurrentSetting()
        await this.saveCurrentSetting(this.targetStoreCodes[0])
      } else {
        this.loadChangedConfigurationSetting()
        // G002.00.0 Add-Start
        if (this.typeOfSetting === 'new') {
          this.setting.nodeId = this.targetStoreCodes[0]
          this.setting.executionDate = this.changeDateText
        }
        // G002.00.0 Add-End
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
            // KSD V001.000 AS
            this.selectedCourseTaxRate = response.data.responseModel.configurations.OPERATIONS_SETTINGS.value.courseTaxRate
            this.getTaxQuery()
            // KSD V001.000 AE
            this.setCurrentConfiguration(response.data.responseModel)
          } else {
            this.emptyConfigurationSetting()
          }
        })
        .catch(error => {
          console.log(error)
          // G003.00.0 Add-Start
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
          // G003.00.0 Add-End
        })
    },
    // KSD V001.000 AS
    async getTaxQuery () {
      this.taxStorage = {}
      this.getAllTax = {}
      try {
        const params = {
          nodeId: this.sessionBusinessUnitCd
        }
        let response = await axios.post(this.$i18n.t('prop.url') + getTax, params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          this.getAllTax = response.data.responseModel
          this.matchingTaxRate = this.getAllTax.find(item => item.name === this.selectedCourseTaxRate)
          if (this.matchingTaxRate) {
            this.config.courseTaxRate = this.matchingTaxRate.displayName.default
          } else {
            this.config.courseTaxRate = ''
          }
          this.taxStorage = response.data.responseModel.map(({ displayName }) => displayName.default)
        } else if (response.data.result.code === 2) {
          this.$refs.pop.closeFunction()
          this.$refs.pop.open(3, '', this.$i18n.t('F322a5.E015'), response.data.result.code, false, () => { this.$router.push(configSelectPath) }, false, null)
        } else {
          this.globalErrorMapping(response)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },
    globalErrorMapping (response, msg = '', func = null) {
      if (response === null) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', this.$t(msg), '', false, func, false, null)
      } else if (response.data.result.code === -10 || response.data.result.code === -20 || response.data.result.code === -30) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', response.data.result.errorMessageMap.global, response.data.result.code, false, () => { this.$router.push(configSelectPath) }, false, null)
      } else if (response.data.result.code === -90) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(2, '', this.$t('O00004.W008'), response.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
      } else {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', response.data.result.errorMessageMap.global, response.data.result.code, false, () => { this.$router.push(configSelectPath) }, false, null)
      }
    },

    // KSD V001.000 AE
    emptyConfigurationSetting () {
      this.config = {}
    },
    // G006.00.0 Delete-Start
    // fetchBusinessDayStartTime () {
    //   this.businessDayStartTime = '00:00'
    // },
    // G006.00.0 Delete-End
    async backToConfigSelect () {
      this.$router.push(configSelectPath)
    },
    // G010.00.0 Add-Start
    async close () {
      // G011.00.0 Update start
      // this.$refs.pop.open(1, '終了', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      // G011.00.0 Update end
    },
    backToTopPage () {
      this.$router.push({
        name: 'TopPage'
      })
    },
    // G010.00.0 Add-End
    setCurrentConfiguration (setting) {
      // G002.00.0 Update-Start
      if (this.typeOfSetting === 'new') {
        // G006.00.0 Delete-Start
        // this.businessDayStartTime = setting.configurations.BUSINESS_DAY_START_TIME.value
        // G006.00.0 Delete-End
        this.config = setting.configurations.OPERATIONS_SETTINGS.value
        // KSD V001.000 AS
        const roomStatusThreshold2values = this.config.roomStatusThresholdTime2
        const roomStatusThreshold3values = this.config.roomStatusThresholdTime3

        this.dataModel.roomStatusThresholdTime2 = {
          value1: roomStatusThreshold2values[0],
          value2: roomStatusThreshold2values[1]
        }
        this.dataModel.roomStatusThresholdTime3 = {
          value1: roomStatusThreshold3values[0],
          value2: roomStatusThreshold3values[1]
        }
        // KSD V001.000 AE
        let value1 = setting.configurations.OPERATIONS_SETTINGS.value
        // G006.00.0 Delete-Start
        // let value2 = setting.configurations.BUSINESS_DAY_START_TIME.value
        // G006.00.0 Delete-End
        this.setting = {
          configurationSetting: {
            'OPERATIONS_SETTINGS': {
              'name': 'OPERATIONS_SETTINGS',
              'value': value1,
              'type': 'Map',
              'group': 'OPERATIONS',
              'subGroup': 'CONFIG'
            }
            // G006.00.0 Delete-Start
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
            // G006.00.0 Delete-End
          },
          configurationType: 'OPERATIONS_SETTINGS',
          executionDate: null,
          nodeId: null
        }
      } else {
        this.setting = setting
        // G006.00.0 Delete-Start
        // this.businessDayStartTime = setting.configurations.BUSINESS_DAY_START_TIME.value
        // G006.00.0 Delete-End
        this.config = setting.configurations.OPERATIONS_SETTINGS.value
        // KSD V001.000 AS
        const roomStatusThreshold2values = this.config.roomStatusThresholdTime2
        const roomStatusThreshold3values = this.config.roomStatusThresholdTime3

        this.dataModel.roomStatusThresholdTime2 = {
          value1: roomStatusThreshold2values[0],
          value2: roomStatusThreshold2values[1]
        }
        this.dataModel.roomStatusThresholdTime3 = {
          value1: roomStatusThreshold3values[0],
          value2: roomStatusThreshold3values[1]
        }
        // KSD V001.000 AE
      }
      // this.setting = setting
      // this.businessDayStartTime = setting.configurations.BUSINESS_DAY_START_TIME.value
      // this.config = setting.configurations.OPERATIONS_SETTINGS.value
      // G002.00.0 Update-End
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      // KSD V001.000 DS
      // this.config.logoutTime = this.config.logoutTime.toString().replace(/[^0-9]/gi, '')
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.config.earlyLeavingTime = this.config.earlyLeavingTime.toString().replace(/[^0-9]/gi, '')
      this.config.leaveGraceTime = this.config.leaveGraceTime.toString().replace(/[^0-9]/gi, '')
      this.config.timePayingUnit = this.config.timePayingUnit.toString().replace(/[^0-9]/gi, '')
      this.config.predictedCleaningTime = this.config.predictedCleaningTime.toString().replace(/[^0-9]/gi, '')
      this.config.selfCheckInExtensionTimeForReservation = this.config.selfCheckInExtensionTimeForReservation.toString().replace(/[^0-9]/gi, '')
      this.config.autoCancelReservationTime = this.config.autoCancelReservationTime.toString().replace(/[^0-9]/gi, '')
      this.config.roomStatusThresholdTime1 = this.config.roomStatusThresholdTime1.toString().replace(/[^0-9-]/gi, '')
      this.dataModel.roomStatusThresholdTime2.value1 = this.dataModel.roomStatusThresholdTime2.value1.toString().replace(/[^0-9-]/gi, '')
      this.dataModel.roomStatusThresholdTime2.value2 = this.dataModel.roomStatusThresholdTime2.value2.toString().replace(/[^0-9-]/gi, '')
      this.dataModel.roomStatusThresholdTime3.value1 = this.dataModel.roomStatusThresholdTime3.value1.toString().replace(/[^0-9-]/gi, '')
      this.dataModel.roomStatusThresholdTime3.value2 = this.dataModel.roomStatusThresholdTime3.value2.toString().replace(/[^0-9-]/gi, '')
      this.config.roomStatusThresholdTime4 = this.config.roomStatusThresholdTime4.toString().replace(/[^0-9-]/gi, '')
      // KSD V001.000 AE
      // G012.00.0 Delete-Start
      // this.config.passwordMin = this.config.passwordMin.toString().replace(/[^0-9]/gi, '')
      // this.config.passwordMax = this.config.passwordMax.toString().replace(/[^0-9]/gi, '')
      // // G008.00.0 Add-Start
      // if (this.config.logoutTime !== '') {
      //   this.timeErrorMsg = null
      // }
      // if (this.config.passwordMin !== '' && this.config.passwordMax !== '') {
      //   this.passwordErrorMsg = null
      // }
      // // G008.00.0 Add-End
      // G012.00.0 Delete-End
    },
    // 文字入力規制(パスワード)
    numInputPassRegulation () {
      // 20221128 MOD S TEC.Gotou #986#note_359960
      // G002.00.0 Add-Start
      this.config.passwordMin = this.config.passwordMin.toString().replace(/[^0-9]/gi, '')
      this.config.passwordMax = this.config.passwordMax.toString().replace(/[^0-9]/gi, '')
      // G002.00.0 Add-End
      if (!this.config.passwordMin.match(/^[8-9]$|^1[0-5]$/)) {
      	this.config.passwordMin = ''
      }
      if (!this.config.passwordMax.match(/^[8-9]$|^1[0-5]$/)) {
      	this.config.passwordMax = ''
      }
      // G012.00.0 Delete-Start
      // // G008.00.0 Add-Start
      // if (this.config.passwordMin !== '' && this.config.passwordMax !== '') {
      //   this.passwordErrorMsg = null
      // }
      // // G008.00.0 Add-End
      // // 20221128 MOD E TEC.Gotou #986#note_359960
      // G012.00.0 Delete-End
    }
  },
  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322a5-edit'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.fetchConfig()
    // G006.00.0 Delete-Start
    // this.fetchBusinessDayStartTime()
    // G006.00.0 Delete-End
  },
  // G013.00.0 Add-Start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // KSD V001.000 AS
    this.$root.$once('getBusinessUnitCdStr', async (businessUnitCdStr) => {
      this.sessionBusinessUnitCd = businessUnitCdStr
    })
    // KSD V001.000 AE
  },
  // G013.00.0 Add-End
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
