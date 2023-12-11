/**
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221216  dingxin(Neusoft)  G001.00.0  issue課題#1212、#1032を対応します.
 * 20221229  dingxin(Neusoft)  G002.00.0  issue課題#1225を対応します.
 * 20230131  duyouwei(Neusoft) G003.00.0  issue課題#1473を対応します.
 * 20230209  dingxin(Neusoft)  G004.00.0  issue課題#1403を対応します.
 * 20230209  dingxin(Neusoft)  G005.00.0  issue課題#1507を対応します.
 * 20230209  xu.jh(Neusoft) G006.00.0  issue課題#1210を対応します.
 * 20230231  dingxin(Neusoft)  G007.00.0  issue課題#1583を対応します.
 * 20230222  dingxin(Neusoft)  G008.00.0  issue課題#981を対応します.
 * 20230306  xu.jh(Neusoft) G009.00.0  issue課題#1218を対応します.
 * 20230331  xu.jh(Neusoft)  G010.00.0  issue課題#1618を対応します.
 * 20230418  wangchunmei(Neusoft)  G011.00.0  issue課題#1444を対応します.
 * 20230423  dingxin(Neusoft)  G012.00.0  issue課題#1662を対応します.
 * 20230615  wangchunmei(Neusoft)  G013.00.0  issue課題#983を対応します.
 */
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
// G001.00.0 Update start
// import radioButton from '@/resource/templates/CommonInput/RadioButton'
import radioButton from '@/resource/templates/BarcodeSetting/RadioButton'
// G001.00.0 Update end
import conversionEditDialog from '@/resource/templates/BarcodeSetting/BarcodeConversionEditDialog'
import flagEditDialog from '@/resource/templates/BarcodeSetting/BarcodeFlagEditDialog'
import configSelectCommonCondition from '@/resource/templates/ConfigSelect/ConfigSelectCommonCondition'
// G005.00.0 Add start
import Moment from 'moment'
// G005.00.0 Add end

const configSelectPath = '/F322a2/バーコードフラグ設定'
const settingType = 'BARCODE_SETTINGS'

const conversionKeyPrefix = 'conversionparam'
const flagKeyPrefix = 'flagdef'
// G003.00.0 Update-Start
// const fetchCurrentConfiguration = "Reservation/FetchConfiguration"
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'
// G003.00.0 Update-End
const putCurrentConfiguration = 'Reservation/UpdateConfiguration'
const fetchReservationDetail = 'Reservation/FetchDetail'
const putReservationDetail = 'Reservation/UpdateDetail'
const destroyReservationDetail = 'Reservation/DestroyDetail'

export default {
  name: 'BarcodeSetting',
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
      // G012.00.0 Add-Start
      permissions: [],
      // G012.00.0 Add-End
      // G001.00.0 Add start
      disabledFixedBtn: this.typeOfSetting == 'past',
      disabledDeleteBtn: this.isCloning || this.typeOfSetting == 'current',
      radioButtonDisabled: false,
      // G001.00.0 Add end
      config: {},
      barcodeOption: {},
      barcodeConversion: {},
      barcodeFlag: {},
      setting: {},
      changeDateText: this.propChangeDateText,
      isCloning: false,
      // G004.00.0 Add-Start
      futureDateText: '',
      // G004.00.0 Add-End

      doLabels: [
        // G008.00.0 Update-Start
        // { name: 'する', value: 1 },
        // { name: 'しない', value: 0 }
        { name: 'あり', value: 1 },
        { name: 'なし', value: 0 }
        // G008.00.0 Update-End
      ],
      leadingZeroLabels: [
        // G009.00.0 Update start
        // { name: 'JAN', value: 1 },
        // { name: 'UPC', value: 0 }
        { name: 'JAN', value: 0 },
        { name: 'UPC', value: 1 }
        // G009.00.0 Update start
      ],

      screenStep: 1,
      processing: false
    }
  },
  computed: {
    typeOfSettingWithCloning () {
      return this.isCloning ? 'new' : this.typeOfSetting
    },
    // G001.00.0 Delete start
    // disabledFixedBtn() {
    //   return this.typeOfSetting == 'past'
    // },
    // G001.00.0 Delete end
    disabledCloneBtn () {
      return this.isCloning || this.typeOfSetting != 'past'
    },
    // G001.00.0 Delete start
    // disabledDeleteBtn() {
    //   return this.isCloning || this.typeOfSetting == 'current'
    // },
    // G001.00.0 Delete end
    disabledPrevBtn () {
      return this.screenStep <= 1
    },
    disabledNextBtn () {
      return this.screenStep >= 3
    },
    barcodeConversionKeys () {
      // G006.00.0 Update start
      // return Object.keys(this.barcodeConversion)
      return Object.keys(this.barcodeConversion).sort((index1, index2) => { return this.barcodeConversion[index1].order - this.barcodeConversion[index2].order })
      // G006.00.0 Update start
    },
    barcodeFlagKeys () {
      // G006.00.0 Update start
      // return Object.keys(this.barcodeFlag)
      return Object.keys(this.barcodeFlag).sort((index1, index2) => { return this.barcodeFlag[index1].order - this.barcodeFlag[index2].order })
      // G006.00.0 Update start
    }
  },
  components: {
    popup,
    maintButton,
    conversionEditDialog,
    flagEditDialog,
    radioButton,
    configSelectCommonCondition
  },

  methods: {
    fetchConfig () {
      this.config = require('./_config.json')
    },
    initialize () {
      if (this.typeOfSetting === 'new' || this.typeOfSetting === 'current') {
        // G001.00.0 Add start
        this.disabledDeleteBtn = true
        // G001.00.0 Add end
        this.getCurrentSetting(this.targetStoreCodes[0])
      } else {
        // G004.00.0 Add-Start
        this.futureDateText = this.changeDateText
        // G004.00.0 Add-End
        this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      }
    },
    setNewConfiguration (setting) {
      this.setting = {
        configurationSetting: {
          SYSTEM_OPTION_BARCODE: JSON.parse(JSON.stringify(setting.configurations.SYSTEM_OPTION_BARCODE)),
          BARCODE_CONVERSION: JSON.parse(JSON.stringify(setting.configurations.BARCODE_CONVERSION)),
          BARCODE_FLAG: JSON.parse(JSON.stringify(setting.configurations.BARCODE_FLAG))
        },
        configurationType: 'BARCODE_SETTINGS'
      }

      this.barcodeOption = {
        upcConversion: this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting1.row[1],
        upcCD: this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting2.row[1],
        leadingZero: this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting3.row[1]
      }
      this.barcodeConversion = this.setting.configurationSetting.BARCODE_CONVERSION.value.rows
      this.barcodeFlag = this.setting.configurationSetting.BARCODE_FLAG.value.rows
    },
    setCurrentConfiguration (setting) {
      this.setting = setting

      this.barcodeOption = {
        upcConversion: this.setting.configurations.SYSTEM_OPTION_BARCODE.value.rows.setting1.row[1],
        upcCD: this.setting.configurations.SYSTEM_OPTION_BARCODE.value.rows.setting2.row[1],
        leadingZero: this.setting.configurations.SYSTEM_OPTION_BARCODE.value.rows.setting3.row[1]
      }
      this.barcodeConversion = this.setting.configurations.BARCODE_CONVERSION.value.rows
      this.barcodeFlag = this.setting.configurations.BARCODE_FLAG.value.rows
    },
    setConfigurationSetting (setting) {
      this.setting = setting

      this.barcodeOption = {
        upcConversion: this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting1.row[1],
        upcCD: this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting2.row[1],
        leadingZero: this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting3.row[1]
      }
      this.barcodeConversion = this.setting.configurationSetting.BARCODE_CONVERSION.value.rows
      this.barcodeFlag = this.setting.configurationSetting.BARCODE_FLAG.value.rows
    },
    loadChangedCurrentSetting () {
      // const _SYSTEM_OPTION_BARCODE = JSON.parse(JSON.stringify(this.setting.configurations.SYSTEM_OPTION_BARCODE))
      // const _BARCODE_CONVERSION = JSON.parse(JSON.stringify(this.setting.configurations.BARCODE_CONVERSION))
      // const _BARCODE_FLAG = JSON.parse(JSON.stringify(this.setting.configurations.BARCODE_FLAG))
      // this.setting.configurations = {
      //   SYSTEM_OPTION_BARCODE: _SYSTEM_OPTION_BARCODE,
      //   BARCODE_CONVERSION: _BARCODE_CONVERSION,
      //   BARCODE_FLAG: _BARCODE_FLAG,
      // }
      this.setting.configurations.SYSTEM_OPTION_BARCODE.value.rows.setting1.row[1] = this.barcodeOption.upcConversion
      this.setting.configurations.SYSTEM_OPTION_BARCODE.value.rows.setting2.row[1] = this.barcodeOption.upcCD
      this.setting.configurations.SYSTEM_OPTION_BARCODE.value.rows.setting3.row[1] = this.barcodeOption.leadingZero
      this.setting.configurations.BARCODE_CONVERSION.value.rows = this.barcodeConversion
      this.setting.configurations.BARCODE_FLAG.value.rows = this.barcodeFlag
    },
    loadChangedConfigurationSetting () {
      this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting1.row[1] = this.barcodeOption.upcConversion
      this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting2.row[1] = this.barcodeOption.upcCD
      this.setting.configurationSetting.SYSTEM_OPTION_BARCODE.value.rows.setting3.row[1] = this.barcodeOption.leadingZero
      this.setting.configurationSetting.BARCODE_CONVERSION.value.rows = this.barcodeConversion
      this.setting.configurationSetting.BARCODE_FLAG.value.rows = this.barcodeFlag
    },
    emptyConfigurationSetting () {
      this.setting = {}
      this.barcodeOption = {}
    },
    async getCurrentSetting (nodeId) {
      // G013.00.0 Update-Start
      // this.processing = true
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W016'), '', false, null, false, null)
      // G013.00.0 Update-End
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
          nodeId: nodeId,
          excludeFields: false,
          type: settingType
        }, commonUtils.methods.getApiHeader())
        // G013.00.0 Add-Start
        this.$refs.pop.closeFunction()
        // G013.00.0 Add-End
        if (response.data.responseModel) {
          if (this.typeOfSetting === 'new') {
            this.setNewConfiguration(response.data.responseModel)
          } else {
            this.setCurrentConfiguration(response.data.responseModel)
          }
        } else {
          this.emptyConfigurationSetting()
        }
      } catch (error) {
        console.log(error)
        // G002.00.0 Add-Start
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
          this.$router.push(configSelectPath)
        }, false, null)
        // G002.00.0 Add-End
      }
      // G013.00.0 Delete-Start
      // this.processing = false
      // G013.00.0 Delete-End
    },
    async getReservationDetail (nodeId, dateText) {
      // G013.00.0 Update-Start
      // this.processing = true
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W016'), '', false, null, false, null)
      // G013.00.0 Update-End
      // G001.00.0 Add start
      // G005.00.0 Update start
      // let a = new Date()
      // a = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate()
      let a = new Moment().format('YYYY-MM-DD')
      // if (new Date(a) < new Date(dateText)) {
      if (a < dateText) {
      // G005.00.0 Update end
        this.radioButtonDisabled = false
      } else {
        this.radioButtonDisabled = true
      }
      // G001.00.0 Add end

      try {
        const response = await axios.put(this.$i18n.t('prop.url') + fetchReservationDetail, {
          nodeId: nodeId,
          excludeFields: false,
          type: settingType,
          executionDate: dateText
        }, commonUtils.methods.getApiHeader())
        // G013.00.0 Add-Start
        this.$refs.pop.closeFunction()
        // G013.00.0 Add-End
        if (response.data.responseModel) {
          const settings = response.data.responseModel

          if (settings.length > 0) {
            this.setConfigurationSetting(settings[0])
          } else {
            this.emptyConfigurationSetting()
          }
        } else {
          this.emptyConfigurationSetting()
        }
      } catch (error) {
        console.log(error)
        // G011.00.0 Add-Start
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
          this.$router.push(configSelectPath)
        }, false, null)
        // G011.00.0 Add-End
      }
      this.processing = false
    },
    // G006.00.0 Add start
    backToConfigSelect () {
      this.$router.push(configSelectPath)
    },
    // G006.00.0 Add end
    async close () {
      // G010.00.0 Update start
      // this.$refs.pop.open(1, '終了', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      // G010.00.0 Update end
    },
    backToTopPage () {
      this.$router.push({
        name: 'TopPage'
      })
    },
    async fixed () {
      // G013.00.0 Delete-Start
      // this.processing = true
      // G013.00.0 Delete-End

      try {
        // G002.00.0 Add-Start
        if (this.changeDateText == null || this.changeDateText == '') {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a2.W003'), '', false, null, false, null)
          // G013.00.0 Delete-Start
          // this.processing = false
          // G013.00.0 Delete-End
          return
        }
        // G002.00.0 Add-End
        if (this.typeOfSetting === 'current') {
          this.loadChangedCurrentSetting()
          await this.saveCurrentSetting(this.targetStoreCodes[0])
        } else {
          if (!this.changeDateText) {
            this.$refs.pop.open(3, '保存', '変更基準日入れてください。', '', false, () => {}, false, () => {})
            // G013.00.0 Delete-Start
            // this.processing = false
            // G013.00.0 Delete-End
            return
          }
          this.loadChangedConfigurationSetting()
          if (this.isCloning || this.typeOfSetting === 'new') {
            this.setting.nodeId = this.targetStoreCodes[0]
            this.setting.executionDate = this.changeDateText
          }
          await this.saveReservationDetail(this.targetStoreCodes[0], this.changeDateText)
        }

        // G013.00.0 Delete-Start
        // this.processing = false
        // G013.00.0 Delete-End
      } catch (error) {
        console.log(error)

        // G013.00.0 Delete-Start
        // this.processing = false
        // G013.00.0 Delete-End

        this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E001'), '', true, () => {
          this.$router.push(configSelectPath)
        }, false, null)
      }
    },
    async saveCurrentSetting (nodeId) {
      // G013.00.0 Add-Start
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // G013.00.0 Add-End
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putCurrentConfiguration, {
          nodeId: nodeId,
          type: settingType,
          configuration: this.setting,
          mode: 0
        }, commonUtils.methods.getApiHeader())

        // G001.00.0 Update start
        // if (response.data.responseModel) {
        if (response.data.result.code == 0) {
        // G001.00.0 Update end
          // G001.00.0 Update start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a2.W001'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
          // G001.00.0 Update end
            this.$router.push(configSelectPath)
          }, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E001'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E001'), '', false, null, false, null)
      }
    },
    async saveReservationDetail (nodeId, dateText) {
      // G013.00.0 Add-Start
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // G013.00.0 Add-End
      // G001.00.0 Add start
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
      // G001.00.0 Add end
      // G004.00.0 Add-Start
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
      // G004.00.0 Add-End
      // G007.00.0 Add-Start
      if (this.isCloning) {
        this.setting.version = null
        this.setting.id = null
      }
      // G007.00.0 Add-End
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putReservationDetail, {
          nodeId: nodeId,
          type: settingType,
          executionDate: dateText,
          configuration: this.setting
        }, commonUtils.methods.getApiHeader())

        if (response.data.responseModel) {
          // G001.00.0 Update start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a2.W001'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
          // G001.00.0 Add end
            this.$router.push(configSelectPath)
          }, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E001'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E001'), '', false, null, false, null)
      }
    },
    clone () {
      // G010.00.0 Update start
      // this.$refs.pop.open(1, '再利用', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => {})
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => {})
      // G010.00.0 Update end
    },
    async copyCurrentSetting () {
      await this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      this.changeDateText = null
      this.isCloning = true
      // G001.00.0 Add start
      this.disabledFixedBtn = false
      this.disabledDeleteBtn = true
      this.radioButtonDisabled = false
      // G001.00.0 Add end
    },
    next () {
      this.screenStep = this.screenStep + 1
    },
    prev () {
      this.screenStep = this.screenStep - 1
    },
    stop () {
      // G010.00.0 Update start
      // this.$refs.pop.open(1, '中止', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => {})
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => {})
      // G010.00.0 Update end
    },
    backToSelect () {
      this.$router.push({
        name: 'F322a2',
        params: {
          paramTargetStoreCodes: this.targetStoreCodes
        }
      })
    },
    del () {
      // G010.00.0 Update start
      // this.$refs.pop.open(1, '削除', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => {})
      this.$refs.pop.open(1, '確認', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => {})
      // G010.00.0 Update end
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

        if (response.data.responseModel) {
          // G001.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a2.W002'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
          // G001.00.0 Update -End
            this.$router.push(configSelectPath)
          }, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E002'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E002'), '', false, null, false, null)
      }
    },
    disabledFunc (date) {
      return date <= new Date()
    },
    openConversionEditDialog (index) {
      const conversion = JSON.parse(JSON.stringify(this.barcodeConversion[index]))
      // G001.00.0 Update-Start
      // this.$refs.conversionEditDialog.open(conversion, index)
      this.$refs.conversionEditDialog.open(conversion, index, 2)
      // G001.00.0 Update -End
    },
    onNewConversion () {
      const order = this.barcodeConversionKeys.length + 1
      const newKey = conversionKeyPrefix + order

      const conversion = {
        order: order,
        row: [order, 0, 0, 0, 0, 0, 0]
      }
      // G001.00.0 Update-Start
      // this.$refs.conversionEditDialog.open(conversion, newKey)
      this.$refs.conversionEditDialog.open(conversion, newKey, 1)
      // G001.00.0 Update -End
    },
    conversionSaveCallback (conversion, index) {
      this.$set(this.barcodeConversion, index, conversion)
    },
    openFlagEditDialog (index) {
      const flag = JSON.parse(JSON.stringify(this.barcodeFlag[index]))
      // G001.00.0 Update-Start
      // this.$refs.flagEditDialog.open(flag, index)
      this.$refs.flagEditDialog.open(flag, index, 2)
      // G001.00.0 Update -End
    },
    onNewFlag () {
      const order = this.barcodeFlagKeys.length + 1
      const newKey = flagKeyPrefix + order
      // G001.00.0 Update start
      // const row0 = this.barcodeFlag[this.barcodeFlagKeys[this.barcodeFlagKeys.length - 1]].row[0] + 1

      // const flag = {
      //   order: order,
      //   row: [row0, 0, 0, 0, 1, 0, 0, 1]
      // }
      const flag = {
        order: order,
        row: [order, 0, 0, 0, 1, 0, 0, 1]
      }
      // G001.00.0 Update end
      // G001.00.0 Update-Start
      // this.$refs.flagEditDialog.open(flag, newKey)
      this.$refs.flagEditDialog.open(flag, newKey, 1)
      // G001.00.0 Update -End
    },
    flagSaveCallback (flag, index) {
      this.$set(this.barcodeFlag, index, flag)
    }
  },

  filters: {
    barcode_type: function (value) {
      const config = require('./_config.json')
      return config.BARCODE_TYPE[value] || null
    },
    barcode_digit_flag: function (value) {
      const config = require('./_config.json')
      return config.BARCODE_DIGIT_FLAG[value] || null
    },
    barcode_flag_range: function (value) {
      const config = require('./_config.json')
      const range = config.BARCODE_FLAG_RANGE.find(item => item.key == value)

      return range ? range.value : null
    },
    barcode_flag_process_type: function (value) {
      const config = require('./_config.json')
      const process = config.BARCODE_FLAG_PROCESS_TYPE.find(item => item.key == value)

      return process ? process.value : null
    }
  },

  created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322a2-edit'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.fetchConfig()
  },
  mounted () {
    // G012.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G012.00.0 Add-End
    this.initialize()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
