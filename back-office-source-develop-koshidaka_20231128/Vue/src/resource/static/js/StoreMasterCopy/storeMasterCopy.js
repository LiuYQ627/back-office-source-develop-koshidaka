// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import StoreSelect from '@/resource/templates/CommonInput/StoreSelect'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import TableSelectInput from '@/resource/templates/CommonInput/TableSelectInput'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'

const COPY_STORE_MASTER_UPDATE = 'DataManagements/CopyStoreMaster'

const DEFAULT_DATA_MODEL = {
  snodeId: '',
  dnodeId: '',
  updateMode: 1,
  catalogsFlg: false,
  pricelistsFlg: false,
  barcodeFlg: false,
  tranNameFlg: false,
  stampFlg: false,
  storeOpeFlg: false,
  hourzoneFlg: false,
  devicesFlg: false,
  opBtnFlg: false,
  payBtnFlg: false,
  prdDivFlg: false,
  ticketFlg: false,
  weekdayDivFlg: false,
  calendarFlg: false,
  roomcourseFlg: false,
  drinkcourseFlg: false,
  roomRateFlg: false,
  roomRelationFlg: false,
  roomFlg: false,
  roomsubFlg: false,
  complianceFlg: false,
  restmcSysFixFlg: false,
  restmcSysChgFlg: false,
  restmcFscpFlg: false,
  restmcFhinpFlg: false,
  restmcFfloorFlg: false,
  restmcFtblFlg: false,
  restmpDishupFlg: false,
  restmpPossysopFlg: false,
  restmoOessysopFlg: false,
  restmoKcpsysopFlg: false,
  restmoKdsysopFlg: false,
  restmoFccpFlg: false,
  restmoFkpFlg: false,
  restmoFnerrmFlg: false,
  restmoFkcpsepFlg: false,
  restmcFkkbFlg: false,
  restmoSgosysopFlg: false,
  recpImageFlg: false,
  recpSettingFlg: false,
  restmpShopFlg: false
}

const FLAGS = [
  { name: 'catalogsFlg', value: 0 },
  { name: 'pricelistsFlg', value: 1 },
  { name: 'barcodeFlg', value: 2 },
  { name: 'tranNameFlg', value: 3 },
  { name: 'stampFlg', value: 4 },
  { name: 'storeOpeFlg', value: 5 },
  { name: 'hourzoneFlg', value: 6 },
  { name: 'devicesFlg', value: 7 },
  { name: 'opBtnFlg', value: 8 },
  { name: 'payBtnFlg', value: 9 },
  { name: 'prdDivFlg', value: 10 },
  { name: 'ticketFlg', value: 11 },
  { name: 'weekdayDivFlg', value: 12 },
  { name: 'calendarFlg', value: 13 },
  { name: 'roomcourseFlg', value: 14 },
  { name: 'drinkcourseFlg', value: 15 },
  { name: 'roomRateFlg', value: 16 },
  { name: 'roomRelationFlg', value: 17 },
  { name: 'roomFlg', value: 18 },
  { name: 'roomsubFlg', value: 19 },
  { name: 'complianceFlg', value: 20 },
  { name: 'restmcSysFixFlg', value: 21 },
  { name: 'restmcSysChgFlg', value: 22 },
  { name: 'restmcFscpFlg', value: 23 },
  { name: 'restmcFhinpFlg', value: 24 },
  { name: 'restmcFfloorFlg', value: 25 },
  { name: 'restmcFtblFlg', value: 26 },
  { name: 'restmpDishupFlg', value: 27 },
  { name: 'restmpPossysopFlg', value: 28 },
  { name: 'restmoOessysopFlg', value: 29 },
  { name: 'restmoKcpsysopFlg', value: 30 },
  { name: 'restmoKdsysopFlg', value: 31 },
  { name: 'restmoFccpFlg', value: 32 },
  { name: 'restmoFkpFlg', value: 33 },
  { name: 'restmoFnerrmFlg', value: 34 },
  { name: 'restmoFkcpsepFlg', value: 35 },
  { name: 'restmcFkkbFlg', value: 36 },
  { name: 'restmoSgosysopFlg', value: 37 },
  { name: 'recpImageFlg', value: 38 },
  { name: 'recpSettingFlg', value: 39 },
  { name: 'restmpShopFlg', value: 40 }
]

export default {
  name: 'StoreMasterCopy',
  mixins: [errorMappingUtils],
  data () {
    return {
      storeCode: {
        sourceStore: [],
        destinationStore: []
      },
      updateMethod: {
        value: 1,
        labels: [
          { name: this.$i18n.t('F32254.S004'), value: 1 },
          { name: this.$i18n.t('F32254.S005'), value: 2 },
          { name: this.$i18n.t('F32254.S006'), value: 3 }
        ]
      },
      updateFlags: [
        { name: this.$i18n.t('F32254.S101'), value: 0 },
        { name: this.$i18n.t('F32254.S102'), value: 1 },
        { name: this.$i18n.t('F32254.S103'), value: 2 },
        { name: this.$i18n.t('F32254.S104'), value: 3 },
        { name: this.$i18n.t('F32254.S105'), value: 4 },
        { name: this.$i18n.t('F32254.S106'), value: 5 },
        { name: this.$i18n.t('F32254.S107'), value: 6 },
        { name: this.$i18n.t('F32254.S108'), value: 7 },
        { name: this.$i18n.t('F32254.S109'), value: 8 },
        { name: this.$i18n.t('F32254.S110'), value: 9 },
        { name: this.$i18n.t('F32254.S111'), value: 10 },
        { name: this.$i18n.t('F32254.S201'), value: 11 },
        { name: this.$i18n.t('F32254.S202'), value: 12 },
        { name: this.$i18n.t('F32254.S203'), value: 13 },
        { name: this.$i18n.t('F32254.S204'), value: 14 },
        { name: this.$i18n.t('F32254.S205'), value: 15 },
        { name: this.$i18n.t('F32254.S206'), value: 16 },
        { name: this.$i18n.t('F32254.S207'), value: 17 },
        { name: this.$i18n.t('F32254.S208'), value: 18 },
        { name: this.$i18n.t('F32254.S209'), value: 19 },
        { name: this.$i18n.t('F32254.S210'), value: 20 },
        { name: this.$i18n.t('F32254.S211'), value: 21 },
        { name: this.$i18n.t('F32254.S212'), value: 22 },
        { name: this.$i18n.t('F32254.S213'), value: 23 },
        { name: this.$i18n.t('F32254.S214'), value: 24 },
        { name: this.$i18n.t('F32254.S215'), value: 25 },
        { name: this.$i18n.t('F32254.S216'), value: 26 },
        { name: this.$i18n.t('F32254.S217'), value: 27 },
        { name: this.$i18n.t('F32254.S218'), value: 28 },
        { name: this.$i18n.t('F32254.S219'), value: 29 },
        { name: this.$i18n.t('F32254.S220'), value: 30 },
        { name: this.$i18n.t('F32254.S221'), value: 31 },
        { name: this.$i18n.t('F32254.S222'), value: 32 },
        { name: this.$i18n.t('F32254.S223'), value: 33 },
        { name: this.$i18n.t('F32254.S224'), value: 34 },
        { name: this.$i18n.t('F32254.S226'), value: 35 },
        { name: this.$i18n.t('F32254.S227'), value: 36 },
        { name: this.$i18n.t('F32254.S228'), value: 37 },
        { name: this.$i18n.t('F32254.S229'), value: 38 },
        { name: this.$i18n.t('F32254.S230'), value: 39 },
        { name: this.$i18n.t('F32254.S231'), value: 40 }
      ],
      selectedFlags: [],
      dataModel: JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL)),
      validations: {
        dataModel: {
          snodeId: [['required']],
          dnodeId: [['required']]
        }
      },
      validationErrors: new Map(),
      discardFlag: false,
      screenHeight: window.innerHeight <= 800 ? 300 : 500
    }
  },
  components: {
    popup,
    maintButton,
    FormGroupLayout,
    StoreSelect,
    TableSelectInput,
    RadioButton
  },
  computed: {
    isCopyDisabled () {
      return !(this.storeCode.sourceStore.length > 0 &&
        this.storeCode.destinationStore.length > 0 &&
        this.selectedFlags.length > 0)
    }
  },
  methods: {
    async initialize () {
      this.initialized = true
      this.dataModel.snodeId = this.storeCode.sourceStore[0]
      this.dataModel.dnodeId = this.storeCode.destinationStore[0]
      this.dataModel.updateMode = this.updateMethod.value
    },
    checkAllRows () {
      this.selectedFlags = this.updateFlags.map(item => item.value)
    },
    uncheckAllRows () {
      this.selectedFlags = []
    },
    async handleCopyBtn () {
      let sourceStoreName = this.$refs.sourceStore.storesText
      let destinationStoreName = this.$refs.destinationStore.storesText
      if (sourceStoreName.slice(-1) === '店') {
        sourceStoreName = sourceStoreName.slice(0, -1)
      }
      if (destinationStoreName.slice(-1) === '店') {
        destinationStoreName = destinationStoreName.slice(0, -1)
      }
      let isValid = this.checkInputs()
      if (isValid === true) {
        this.$refs.pop.open(1, '',
          `${sourceStoreName}${this.$i18n.t('F32254.S011')}${destinationStoreName}${this.$i18n.t('F32254.S012')}`,
          '', true, () => {
            this.copyStoreMaster()
          }, false, () => {}
        )
      } else {
        await this.openPopupDialog({
          mode: 3,
          code: -99,
          messageCode: 'F32254.E002',
          okBtnCallback: () => {
            this.setFocus(this.$refs.destinationStore)
          }
        })
      }
    },
    async copyStoreMaster () {
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      axios.post(
        `${this.$i18n.t('prop.url')}${COPY_STORE_MASTER_UPDATE}`,
        { ...this.dataModel },
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        if (typeof response.data !== 'object' || response.data === null || Array.isArray(response.data)) {
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          return
        }
        switch (response.data.result.code) {
          case 0: // 0:正常
            await this.openPopupDialog({
              mode: 2,
              messageCode: 'O00004.W002'
            })
            break
          default: // その他
            throw response.data.result
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        this.globalErrorMapping(error)
      })
    },
    checkInputs () {
      return this.storeCode.sourceStore[0] !== this.storeCode.destinationStore[0]
    },
    async setFocus (focusableElement) {
      const rows = [focusableElement]
      const focusable = rows.flatMap(row => [...row.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')])
      if (focusable && focusable.length > 0) {
        const target = [...focusable].find(x => !x.disabled && [...x.classList].includes('rightArrowButton'))
        if (target) {
          await this.$nextTick(() => {
            target.focus()
          })
        }
      }
    },
    async backToTop () {
      if (!this.discardFlag) {
        this.$router.push('/TopPage')
      }
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.$router.push('/TopPage')
        }
      })
    },
    globalErrorMapping (result) {
      switch (result.code) {
        case -90:
          this.openPopupDialog({
            mode: 2,
            message: this.$i18n.t('O00004.W008'),
            code: result.code,
            okBtnCallback: () => {
              this.$router.push('/LoginPage')
            }
          })
          break
        default:
          const { code, message } = this.mapErrorMessage(result)
          this.openPopupDialog({
            mode: 3,
            message: message,
            code: code
          })
          break
      }
    },
    mapErrorMessage (result) {
      const errorMsgMap = (result && result.errorMessageMap) || null
      if (errorMsgMap === null || !('global' in result.errorMessageMap)) {
        return { code: '', message: this.$i18n.t('O00004.W010') }
      } else {
        return { code: result.code, message: errorMsgMap['global'].toString() }
      }
    }
  },
  watch: {
    selectedFlags (newItems) {
      if (newItems.length > 0) {
        this.discardFlag = true
      }
      const flags = JSON.parse(JSON.stringify(FLAGS))
      for (const key in this.dataModel) {
        if (typeof this.dataModel[key] === 'boolean') {
          this.dataModel[key] = false
        }
      }
      flags
        .filter(flag => newItems.includes(flag.value))
        .forEach(flag => {
          if (this.dataModel.hasOwnProperty(flag.name)) {
            this.dataModel[flag.name] = true
          }
        })
    }
  },
  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F32254'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.initialize()
  },
  async mounted () {
    this.setFocus(this.$refs.sourceStore)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
// KSD V001.000 AE
