// KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/AgeClassificationMaster/AgeClassificationMasterEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'

const getAgeDivision = 'RentalsAgeDivision/Query'

export default {
  name: 'AgeClassificationMaster',
  data () {
    return {
      ageDivisionList: [],
      ageDivisionCount: 0,
      resultCount: 0,
      editDlgOpen: false,
      operationLock: true,
      operationLockStore: true,
      sessionBusinessUnitCd: '',
      oneOrderList: [
        { label: this.$i18n.t('C00216.S015'), value: 0},
        { label: this.$i18n.t('C00216.S016'), value: 1}
      ],
      displayData: [],
      timeout: null
    }
  },
  components: {
    maintButton,
    editDialog,
    popup,
    storeSelect,
    dialogStoreSelect
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
    },
    async fetchData () {
      if (this.sessionBusinessUnitCd === null || this.sessionBusinessUnitCd === '' || this.sessionBusinessUnitCd === undefined) return
      if (await this.getAgeDivision() === false) return
      setTimeout(() => { this.focusFirstFocusableElement() }, 200)
    },
    async getAgeDivision (ageDivisionCode = 0) {
      this.operationLock = false
      this.operationLockStore = false
      this.ageDivisionList = []
      const params = {
        nodeId: this.sessionBusinessUnitCd,
        ageDivisionCode:ageDivisionCode,
        orderBy: 'ageDivisionCode',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      let result = false
      this.ageDivisionCount = 0
      this.displayData = []
      try {
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getAgeDivision}`, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          let found = false
          let data = []
          this.ageDivisionList = response.data.responseModel
          for (let i = 1; i <= 6; i++) {
            for (let j = 0; j < this.ageDivisionList.length; j++) {
              if (this.ageDivisionList[j].ageDivisionCode === i) {
                found = true
                data = this.ageDivisionList[j]
              }
            }
            if (found === false) {
              data = {ageDivisionCode: i, ageDivisionName: '', startAge: '', endAge: '', oneOrder: '', found}
              this.displayData.push(data)
            } else {
              this.displayData.push(data)
              data = []
              found = false
            }
          }
          this.ageDivisionCount = response.data.responseModel.filter(res => res.ageDivisionCode).length
          result = true
        } else if (response.data.result.code === 2) {
          this.displayData = []
          for (let x = 1; x <= 6; x++) {
            this.displayData.push({ageDivisionCode: x, ageDivisionName: '', startAge: '', endAge: '', oneOrder: '', found: false})
          }
          this.ageDivisionCount = response.data.responseModel.filter(res => res.ageDivisionCode).length
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
          this.operationLock = true
          this.operationLockStore = true
        }
      } catch (error) {
        this.operationLock = true
        this.operationLockStore = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      return result
    },
    selectedListDate (row, index) {
      const params = {
        nodeId: this.sessionBusinessUnitCd,
        ageDivisionCode: row.ageDivisionCode,
        orderBy: 'ageDivisionCode',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      axios.post(`${this.$i18n.t('prop.url')}${getAgeDivision}`, params,
       commonUtils.methods.addApiHeader({})
      )
      .then(response => {
          if (response.data.result.code === 0) {
            const result = response.data.responseModel.length ? response.data.responseModel[0] : response.data.responseModel
            if (result.ageDivisionCode === index + 1) {
              this.$refs.editDialog.open(
                this.sessionBusinessUnitCd,
                {...result, index},
                this.refresh,
                this.editDlgClose,
                this.sessionBusinessUnitCd,
                2,
                row
              )
              this.timeout = setTimeout(() => {
                this.$refs.editDialog.openEnd()
              }, 50)
              this.editDlgOpen = true
            } else {
              this.$refs.editDialog.open(
                this.sessionBusinessUnitCd,
                {ageDivisionCode: index + 1, ageDivisionName: '', startAge: '', endAge: '', oneOrder: ''},
                this.refresh,
                this.editDlgClose,
                this.sessionBusinessUnitCd,
                1,
                row
              )
              this.timeout = setTimeout(() => {
                this.$refs.editDialog.openEnd()
              }, 50)
              this.editDlgOpen = true
            }
          } else if (response.data.result.code === 2) {
            if (row.found == false) {
              const result = response.data.responseModel.length ? response.data.responseModel[0] : response.data.responseModel
              this.$refs.editDialog.open(
                this.sessionBusinessUnitCd,
                {...result, ageDivisionCode: index + 1},
                this.refresh,
                this.editDlgClose,
                this.sessionBusinessUnitCd,
                1,
                row
              )
            } else {
              this.globalErrorMapping(response.data.result)
            }
            this.timeout = setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            this.globalErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          console.log(error)
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        })
    },
    getOneOrderName (order) {
      const data = this.oneOrderList.filter(({ value}) => value === order)
      return data.length ? data[0].label : ''
    },
    async refresh () {
      if (await this.getAgeDivision() === true) {
        return true
      } else {
        return false
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
    },
    closeTab () {
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['businessUnitCd'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    getSessionBusinessUnitCd () {
      let vue = this
      this.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
        vue.sessionBusinessUnitCd = businessUnitCdStr
        vue.fetchData()
      })
    },
    confirmUnload (event) {
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    },
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    }
  },
  created () {
    this.$root.winId = 'C00216'
    this.getSessionBusinessUnitCd()
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
    clearTimeout(this.timeout)
  },
  async mounted () {
    this.searchData = ''
    await this.initialize()
    await this.$nextTick()
  },
  watch: {}
}
// KSD V001.000 AE
