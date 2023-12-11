// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'

const TAX_TAXES_RESERVATION_LIST = 'TaxTaxes/ReservationList'

export default {
  name: 'TaxRateSettingSelect',
  mixins: [errorMappingUtils],
  data () {
    return {
      reservationsList: [
        { executionDate: '現在の設定', id: '-1' }
      ],
      nodeId: '',
      selectedDate: '',
      validationErrors: new Map()
    }
  },
  components: {
    popup,
    maintButton,
    FormGroupLayout
  },
  methods: {
    async initialize () {
      await this.focusFirstFocusableElement()
    },
    // 予約日付取得処理
    async postTaxReservationsList () {
      await axios.put(
        `${this.$i18n.t('prop.url')}${TAX_TAXES_RESERVATION_LIST}`,
        {
          nodeId: this.nodeId,
          excludeFields: true
        },
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        switch (response.data.result.code) {
          case 0: // 0:正常
            const dateList = response.data.responseModel.map(model => {
              return {
                executionDate: model.executionDate,
                id: model.id
              }
            })
            this.reservationsList.push(...dateList)
            break
          case 2: // 2:該当する情報なし
            break
          default: // その他
            throw response.data.result
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        await this.globalErrorMapping(error)
      })
    },
    getNodeId () {
      this.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
        this.nodeId = businessUnitCdStr
        this.postTaxReservationsList()
      })
    },
    sortDateList (dateList) {
      const firstElement = dateList[0]
      const sortedList = dateList.slice(1).sort((a, b) => b.name.localeCompare(a.name))
      sortedList.unshift(firstElement)
      return sortedList
    },
    // ボタンハンドル
    handleAddButton () {
      const setting = {
        id: null,
        executionDate: null
      }
      this.handleDateChange(setting)
    },
    handleDateChange (setting) {
      const typeOfSetting =
        setting.executionDate === '現在の設定' ? 'current'
          : setting.executionDate === null ? 'new'
            : new Date(setting.executionDate) < new Date() ? 'past'
              : 'future'
      const datesList = typeOfSetting === 'future'
        ? this.reservationsList.slice(1).filter(item => item.executionDate !== setting.executionDate)
        : this.reservationsList.slice(1)
      this.$root.params = {
        id: setting.id,
        nodeId: this.nodeId,
        executionDate: setting.executionDate,
        typeOfSetting: typeOfSetting,
        reservationsList: datesList
      }
      this.$router.push({ path: '/F322b4-edit' })
    },
    // VALIDATIONS
    setValidationError (key, value) {
      this.validationErrors.set(key, value)
      this.$forceUpdate()
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('img, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    },
    async backToTop () {
      this.$router.push('/TopPage')
    }
  },
  async mounted () {
    await this.initialize()
  },
  async created () {
    this.getNodeId()
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322b4'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
// KSD V001.000 AE
