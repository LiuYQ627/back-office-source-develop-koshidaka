/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221207  dingxin(Neusoft)  G001.00.0  issue課題#1097を対応します.
 * 20221222  dingxin(Neusoft)  G002.00.0  issue課題#1212、#1032を対応します.
 * 20221229  dingxin(Neusoft)  G003.00.0  issue課題#1225を対応します.
 * 20230131  duyouwei(Neusoft) G004.00.0  issue課題#1473を対応します.
 * 20230209  dingxin(Neusoft)  G005.00.0  issue課題#1403を対応します.
 * 20230209  dingxin(Neusoft)  G006.00.0  issue課題#1507を対応します.
 * 20230231  dingxin(Neusoft)  G007.00.0  issue課題#1583を対応します.
 * 20230316  xu.jh(Neusoft)  G008.00.0  issue課題#1444を対応します.
 * 20230331  xu.jh(Neusoft)  G009.00.0  issue課題#1618を対応します.
 * 20230423  dingxin(Neusoft)  G010.00.0  issue課題#1662を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/RevenueStampSetting/RevenueStampEditDialog'
// G002.00.0 Update-Start
// import radioButton from '@/resource/templates/CommonInput/RadioButton'
import radioButton from '@/resource/templates/RevenueStampSetting/RadioButton'
// G002.00.0 Update-End
import configSelectCommonCondition from '@/resource/templates/ConfigSelect/ConfigSelectCommonCondition'
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
// G006.00.0 Add start
import Moment from 'moment'
// G006.00.0 Add end

const configSelectPath = '/F322a4/収入印紙設定'
// G004.00.0 Update-Start
// const path = 'Reservation/FetchConfiguration'
const path = 'Reservation/FetchConfigurationRecursive'
// G004.00.0 Update-End

const settingType = 'REVENUE_STAMP_SETTINGS'
// G004.00.0 Update-Start
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
  name: 'RevenueStampSetting',
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
      // G010.00.0 Add-Start
      permissions: [],
      // G010.00.0 Add-End
      // G002.00.0 Add-Start
      disabledFixedBtn: this.typeOfSetting == 'past',
      disabledDeleteBtn: this.isCloning || this.typeOfSetting == 'current',
      disabledCloneBtn: this.isCloning || this.typeOfSetting != 'past',
      isCloning: false,
      radioButtonDisabled: false,
      // G002.00.0 Add-End
      config: {},
      changeDateText: this.propChangeDateText,
      businessDayStartTime: '',
      // G005.00.0 Add-Start
      futureDateText: '',
      // G005.00.0 Add-End

      //      stampDutyIntroducedLabels: [
      //        { name: '一括納付未導入', value: 0 },
      //        { name: '一括納付導入', value: 1 }
      stampTaxIntroductionClassLabels: [
        { name: '一括納付未導入', value: 'LUMP_SUM_PAYMENT_NOT_INTRODUCED' },
        { name: '一括納付導入', value: 'LUMP_SUM_PAYMENT_INTRODUCED' }
      ],
      taxLabels: [
        //        { name: '税込み', value: true },
        //        { name: '税抜き', value: false }
        { name: '税込み', value: 'TAX_INCLUDE' },
        { name: '税抜き', value: 'TAX_EXCLUDE' }
      ],
      doLabels: [
        { name: 'する', value: true },
        { name: 'しない', value: false }
      ],
      storeCode: null,
      setting: {},
      revenueStamp1: {},
      revenueStamp2: {},
      revenueStamp3: {},
      revenueStamp4: {},
      revenueStamp5: {},
      revenueStamp6: {},
      revenueStamp7: {},
      revenueStamp8: {},
      revenueStamp9: {},
      revenueStamp10: {}
    }
  },
  components: {
    popup,
    maintButton,
    radioButton,
    editDialog,
    configSelectCommonCondition
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
      this.config = require('./_mockConfig.json')
    },
    openEditDialog (index) {
      const setting = JSON.parse(JSON.stringify(this.config.stampDuty[index]))
      console.log(setting, 'special')
      this.$refs.editDialog.open(setting, index)
    },
    saveCallback (stampDuty, index) {
      let sDJ = parseInt(stampDuty.stampDutyJudgement)
      if ((typeof sDJ !== 'number') || !isFinite(sDJ)) {
        sDJ = null
      }
      let sDA = parseInt(stampDuty.stampDutyAmount)
      if ((typeof sDA !== 'number') || !isFinite(sDA)) {
        sDA = null
      }
      let temp = {
        order: stampDuty.order - 1,
        //        row: [parseInt(stampDuty.stampDutyJudgement), parseInt(stampDuty.stampDutyAmount)]
        row: [sDJ, sDA]
      }
      this.$set(this.config.stampDuty, index, temp)
    },
    async backToConfigSelect () {
      this.$router.push(configSelectPath)
    },
    // G008.00.0 Add-Start
    async close () {
      // G009.00.0 Update start
      // this.$refs.pop.open(1, '終了', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      // G009.00.0 Update end
    },
    backToTopPage () {
      this.$router.push({
        name: 'TopPage'
      })
    },
    // G008.00.0 Add-End
    // G002.00.0 Add-Start
    clone () {
      // G009.00.0 Update start
      // this.$refs.pop.open(1, '再利用', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => { })
      // G009.00.0 Update end
    },
    async copyCurrentSetting () {
      await this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      this.changeDateText = null
      this.isCloning = true
      this.disabledFixedBtn = false
      this.disabledCloneBtn = true
      this.disabledDeleteBtn = true
      this.radioButtonDisabled = false
    },
    del () {
      // G009.00.0 Update start
      // this.$refs.pop.open(1, '削除', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => { })
      // G009.00.0 Update end
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
          // G002.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a4.W003'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
          // G002.00.0 Update -End
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
      // G009.00.0 Update start
      // this.$refs.pop.open(1, '中止', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => { })
      // G009.00.0 Update end
    },
    backToSelect () {
      this.$router.push({
        name: 'F322a4',
        params: {
          paramTargetStoreCodes: this.targetStoreCodes
        }
      })
    },
    // G002.00.0 Add-End
    async initialize () {
      // G001.00.0 Add-Start
      if (this.typeOfSetting === 'new' || this.typeOfSetting === 'current') {
        // G002.00.0 Add-Start
        this.disabledDeleteBtn = true
        // G002.00.0 Add-End
        this.getCurrentSetting(this.targetStoreCodes[0])
      } else {
        // G005.00.0 Add-Start
        this.futureDateText = this.changeDateText
        // G005.00.0 Add-End
        this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      }
      // G001.00.0 Add-End
      // G001.00.0 Delete-Start
      // if (this.typeOfSetting === 'new') {
      //   const response = {
      //     configurationSetting: {
      //       'REVENUE_STAMP_SETTINGS': {
      //         'type': 'Map',
      //         'subGroup': 'CONFIG',
      //         'group': 'RECEIPT',
      //         'name': 'REVENUE_STAMP_SETTINGS',
      //         'value': {
      //           'printReceiptWhenSmartReceipt': false,
      //           'stampTaxIntroductionClass': '',
      //           'stampTaxDetermination': '',
      //           'stampDutyIntroduced': 0,
      //           'mediaTaxAmountPrintingCategory': false,
      //           'taxPrintWording': '',
      //           'depositStampTargetCategory': false,
      //           'taxSignature': '',
      //           'stampMemoryCountsForReceiptReissue': false
      //         }
      //       },
      //       'REVENUE_STAMP_CONFIGURATION': {
      //         'type': 'Table',
      //         'subGroup': 'CONFIG',
      //         'group': 'RECEIPT',
      //         'name': 'REVENUE_STAMP_CONFIGURATION',
      //         'value': {
      //           'headers': [
      //             {
      //               'type': 'Integer',
      //               'description': 'The starting target amount of revenue stamp table that the order total is greater than or equal.',
      //               'name': 'STAMP_TAX_JUDGMENT_AMOUNT'
      //             },
      //             {
      //               'type': 'Integer',
      //               'description': 'The amount of stamp tax to charge if order total falls within target range.',
      //               'name': 'STAMP_TAX_AMOUNT'
      //             }
      //           ],
      //           'rows': {
      //             'revenueStamp1': {
      //               'order': 0,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp2': {
      //               'order': 1,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp3': {
      //               'order': 2,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp4': {
      //               'order': 3,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp5': {
      //               'order': 4,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp6': {
      //               'order': 5,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp7': {
      //               'order': 6,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp8': {
      //               'order': 7,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp9': {
      //               'order': 8,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             },
      //             'revenueStamp10': {
      //               'order': 9,
      //               'row': [
      //                 0,
      //                 0
      //               ]
      //             }
      //           }
      //         }
      //       }
      //     },
      //     configurationType: 'REVENUE_STAMP_SETTINGS',
      //     executionDate: null,
      //     nodeId: null
      //   }

      //   this.setCurrentConfiguration(response)
      // } else if (this.typeOfSetting === 'current') {
      //   this.getCurrentSetting(this.targetStoreCodes[0])
      // } else {
      //   this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      // }
      // G001.00.0 Delete-End
    },
    getCurrentSetting (nodeId) {
      axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
        nodeId: nodeId,
        excludeFields: false,
        type: settingType
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          if (response.data.responseModel) {
            console.log(response.data.responseModel, 'response.data.responseModelresponse.data.responseModel')
            // G001.00.0 Add-Start
            if (response.data.responseModel.configurations.REVENUE_STAMP_CONFIGURATION) {
              this.setCurrentConfiguration(response.data.responseModel)
            } else {
              this.emptyConfigurationSetting1()
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
          // G003.00.0 Add-Start
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
          // G003.00.0 Add-End
        })
    },
    setCurrentConfiguration (setting) {
      this.setting = setting
      if (this.typeOfSetting === 'new') {
        this.config = {
          // stampDutyIntroduced: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampDutyIntroduced,
          stampTaxDetermination: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampTaxDetermination,
          stampTaxIntroductionClass: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampTaxIntroductionClass,
          mediaTaxAmount: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.mediaTaxAmountPrintingCategory,
          taxPrintWording: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.taxPrintWording,
          depositStampTargetCategory: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.depositStampTargetCategory,
          printReceiptWhenSmartReceipt: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.printReceiptWhenSmartReceipt,
          stampMemoryCountsForReceiptReissue: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampMemoryCountsForReceiptReissue,
          taxSignature: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.taxSignature,
          // stampDuty: Object.values(setting.configurations.REVENUE_STAMP_CONFIGURATION.value.rows)
          stampDuty: Object.values(setting.configurations.REVENUE_STAMP_CONFIGURATION.value.rows).sort((a, b) => a.order - b.order)
        }
        // G001.00.0 Add-Start
        if (this.config.stampDuty.length < 10) {
          for (let i = 0; i < 11 - this.config.stampDuty.length; i++) {
            this.config.stampDuty.push({
              'order': i + this.config.stampDuty.length,
              'row': [
                0,
                0
              ]
            })
          }
        }
        // G001.00.0 Add-End
        // G002.00.0 Add-Start
        let value1 = setting.configurations.REVENUE_STAMP_SETTINGS.value
        let value2 = setting.configurations.REVENUE_STAMP_CONFIGURATION.value
        this.setting = {
          configurationSetting: {
            'REVENUE_STAMP_SETTINGS': {
              'type': 'Map',
              'subGroup': 'CONFIG',
              'group': 'RECEIPT',
              'name': 'REVENUE_STAMP_SETTINGS',
              'value': value1
            },
            'REVENUE_STAMP_CONFIGURATION': {
              'type': 'Table',
              'subGroup': 'CONFIG',
              'group': 'RECEIPT',
              'name': 'REVENUE_STAMP_CONFIGURATION',
              'value': value2
            }
          },
          configurationType: 'REVENUE_STAMP_SETTINGS',
          executionDate: null,
          nodeId: null
        }
        // G002.00.0 Add-End
      } else {
        // let stampDuty = Object.values(this.setting.configurations.REVENUE_STAMP_CONFIGURATION.value.rows)
        let stampDuty = Object.values(this.setting.configurations.REVENUE_STAMP_CONFIGURATION.value.rows).sort((a, b) => a.order - b.order)
        // G001.00.0 Update-Start
        // for (let i = 0; i < 11 - stampDuty.length; i++) {
        //   stampDuty.push({
        //     'order': i + stampDuty.length,
        //     'row': [
        //       0,
        //       0
        //     ]
        //   })
        // }
        if (stampDuty.length < 10) {
          for (let i = 0; i < 11 - stampDuty.length; i++) {
            stampDuty.push({
              'order': i + stampDuty.length,
              'row': [
                0,
                0
              ]
            })
          }
        }
        // G001.00.0 Update-End
        this.config = {
          // stampDutyIntroduced: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampDutyIntroduced,
          stampTaxDetermination: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampTaxDetermination,
          stampTaxIntroductionClass: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampTaxIntroductionClass,
          mediaTaxAmount: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.mediaTaxAmountPrintingCategory,
          taxPrintWording: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.taxPrintWording,
          depositStampTargetCategory: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.depositStampTargetCategory,
          printReceiptWhenSmartReceipt: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.printReceiptWhenSmartReceipt,
          stampMemoryCountsForReceiptReissue: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampMemoryCountsForReceiptReissue,
          taxSignature: this.setting.configurations.REVENUE_STAMP_SETTINGS.value.taxSignature,
          stampDuty: stampDuty
        }
        // console.log(this.config, 'this.config')
      }
      console.log(this.config, 'this.config[' + this.typeOfSetting + ']')
    },
    loadChangedCurrentSetting () {
      // this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampDutyIntroduced = this.config.stampDutyIntroduced
      this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampTaxDetermination = this.config.stampTaxDetermination
      this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampTaxIntroductionClass = this.config.stampTaxIntroductionClass
      this.setting.configurations.REVENUE_STAMP_SETTINGS.value.mediaTaxAmountPrintingCategory = this.config.mediaTaxAmount
      this.setting.configurations.REVENUE_STAMP_SETTINGS.value.taxPrintWording = this.config.taxPrintWording
      this.setting.configurations.REVENUE_STAMP_SETTINGS.value.depositStampTargetCategory = this.config.depositStampTargetCategory
      this.setting.configurations.REVENUE_STAMP_SETTINGS.value.printReceiptWhenSmartReceipt = this.config.printReceiptWhenSmartReceipt
      this.setting.configurations.REVENUE_STAMP_SETTINGS.value.stampMemoryCountsForReceiptReissue = this.config.stampMemoryCountsForReceiptReissue
      this.setting.configurations.REVENUE_STAMP_SETTINGS.value.taxSignature = this.config.taxSignature
      let temp = {
        revenueStamp1: this.config.stampDuty[0],
        revenueStamp2: this.config.stampDuty[1],
        revenueStamp3: this.config.stampDuty[2],
        revenueStamp4: this.config.stampDuty[3],
        revenueStamp5: this.config.stampDuty[4],
        revenueStamp6: this.config.stampDuty[5],
        revenueStamp7: this.config.stampDuty[6],
        revenueStamp8: this.config.stampDuty[7],
        revenueStamp9: this.config.stampDuty[8],
        revenueStamp10: this.config.stampDuty[9]
      }
      this.setting.configurations.REVENUE_STAMP_CONFIGURATION.value.rows = temp
    },
    loadChangedConfigurationSetting () {
      // this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.stampDutyIntroduced = this.config.stampDutyIntroduced
      this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.stampTaxDetermination = this.config.stampTaxDetermination
      this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.stampTaxIntroductionClass = this.config.stampTaxIntroductionClass
      this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.mediaTaxAmountPrintingCategory = this.config.mediaTaxAmount
      this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.taxPrintWording = this.config.taxPrintWording
      this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.depositStampTargetCategory = this.config.depositStampTargetCategory
      this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.printReceiptWhenSmartReceipt = this.config.printReceiptWhenSmartReceipt
      this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.stampMemoryCountsForReceiptReissue = this.config.stampMemoryCountsForReceiptReissue
      this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.taxSignature = this.config.taxSignature
      let temp = {
        revenueStamp1: this.config.stampDuty[0],
        revenueStamp2: this.config.stampDuty[1],
        revenueStamp3: this.config.stampDuty[2],
        revenueStamp4: this.config.stampDuty[3],
        revenueStamp5: this.config.stampDuty[4],
        revenueStamp6: this.config.stampDuty[5],
        revenueStamp7: this.config.stampDuty[6],
        revenueStamp8: this.config.stampDuty[7],
        revenueStamp9: this.config.stampDuty[8],
        revenueStamp10: this.config.stampDuty[9]
      }
      this.setting.configurationSetting.REVENUE_STAMP_CONFIGURATION.value.rows = temp
    },
    emptyConfigurationSetting () {
      this.setting = {}
      this.config = {}
    },
    // G001.00.0 Add-Start
    emptyConfigurationSetting1 () {
      const response = {
        configurations: {
          'REVENUE_STAMP_SETTINGS': {
            'type': 'Map',
            'subGroup': 'CONFIG',
            'group': 'RECEIPT',
            'name': 'REVENUE_STAMP_SETTINGS',
            'value': {
              'printReceiptWhenSmartReceipt': false,
              'stampTaxIntroductionClass': '',
              'stampTaxDetermination': '',
              'stampDutyIntroduced': 0,
              'mediaTaxAmountPrintingCategory': false,
              'taxPrintWording': '',
              'depositStampTargetCategory': false,
              'taxSignature': '',
              'stampMemoryCountsForReceiptReissue': false
            }
          },
          'REVENUE_STAMP_CONFIGURATION': {
            'type': 'Table',
            'subGroup': 'CONFIG',
            'group': 'RECEIPT',
            'name': 'REVENUE_STAMP_CONFIGURATION',
            'value': {
              'headers': [
                {
                  'type': 'Integer',
                  'description': 'The starting target amount of revenue stamp table that the order total is greater than or equal.',
                  'name': 'STAMP_TAX_JUDGMENT_AMOUNT'
                },
                {
                  'type': 'Integer',
                  'description': 'The amount of stamp tax to charge if order total falls within target range.',
                  'name': 'STAMP_TAX_AMOUNT'
                }
              ],
              'rows': {
                'revenueStamp1': {
                  'order': 0,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp2': {
                  'order': 1,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp3': {
                  'order': 2,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp4': {
                  'order': 3,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp5': {
                  'order': 4,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp6': {
                  'order': 5,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp7': {
                  'order': 6,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp8': {
                  'order': 7,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp9': {
                  'order': 8,
                  'row': [
                    0,
                    0
                  ]
                },
                'revenueStamp10': {
                  'order': 9,
                  'row': [
                    0,
                    0
                  ]
                }
              }
            }
          }
        },
        configurationType: 'REVENUE_STAMP_SETTINGS',
        executionDate: null,
        nodeId: null
      }
      this.setCurrentConfiguration(response)
    },
    // G001.00.0 Add-End
    // G002.00.0 Update-Start
    // getReservationDetail (nodeId, dateText) {
    async getReservationDetail (nodeId, dateText) {
    // G002.00.0 Update-End
    // G002.00.0 Add-start
    // G006.00.0 Update start
    // let a = new Date()
    // a = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate()
      let a = new Moment().format('YYYY-MM-DD')
      // if (new Date(a) < new Date(dateText)) {
      if (new Date(a) < new Date(dateText)) {
        // G006.00.0 Update end
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
        })
        .catch(error => {
          console.log(error)
        })
    },
    setConfigurationSetting (setting) {
      this.setting = setting
      // let stampDuty = Object.values(setting.configurationSetting.REVENUE_STAMP_CONFIGURATION.value.rows)
      let stampDuty = Object.values(setting.configurationSetting.REVENUE_STAMP_CONFIGURATION.value.rows).sort((a, b) => a.order - b.order)
      // G002.00.0 Update-Start
      // for (let i = 0; i < 11 - stampDuty.length; i++) {
      //   stampDuty.push({
      //     'order': i + stampDuty.length,
      //     'row': [
      //       0,
      //       0
      //     ]
      //   })
      // }
      if (stampDuty.length < 10) {
        for (let i = 0; i < 11 - stampDuty.length; i++) {
          stampDuty.push({
            'order': i + stampDuty.length,
            'row': [
              0,
              0
            ]
          })
        }
      }
      // G002.00.0 Update-End
      this.config = {
        // stampDutyIntroduced: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.stampDutyIntroduced,
        stampTaxDetermination: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.stampTaxDetermination,
        stampTaxIntroductionClass: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.stampTaxIntroductionClass,
        mediaTaxAmount: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.mediaTaxAmountPrintingCategory,
        taxPrintWording: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.taxPrintWording,
        depositStampTargetCategory: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.depositStampTargetCategory,
        printReceiptWhenSmartReceipt: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.printReceiptWhenSmartReceipt,
        stampMemoryCountsForReceiptReissue: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.stampMemoryCountsForReceiptReissue,
        taxSignature: this.setting.configurationSetting.REVENUE_STAMP_SETTINGS.value.taxSignature,
        stampDuty: stampDuty
      }
    },
    async fixed () {
      // G002.00.0 Add-Start
      if (this.changeDateText == null || this.changeDateText == '') {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a4.W004'), '', false, null, false, null)
        return
      }
      // G002.00.0 Add-End
      if (this.typeOfSetting === 'current') {
        this.loadChangedCurrentSetting()
        await this.saveCurrentSetting(this.targetStoreCodes[0])
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
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a4.E001'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a4.E001'), '', false, null, false, null)
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
      // G005.00.0 Add-Start
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
      // G005.00.0 Add-End
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
          // G002.00.0 Add-Start
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
          // G002.00.0 Add-End
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a4.E001'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a4.E001'), '', false, null, false, null)
      }
    },
    inputLimit (str, maxLength) {
      if (str == null) { return }
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
          if (this.config.taxSignature == str) {
            this.config.taxSignature = str.toString().substring(0, i)
          } else if (this.config.taxPrintWording == str) {
            this.config.taxPrintWording = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  },
  async created () {
    this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322a4-edit'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  mounted () {
    // G010.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G010.00.0 Add-End
    this.initialize()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
