//  KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/EquipmentMasterSetting/EquipmentEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
const getEquipmentPath = 'RentalsEquipment/Query'

export default {
  name: 'EquipmentMasterSetting',
  data () {
    return {
      dispMemberList: [],
      findEquipmentList: [],
      findTicketList: [],
      parentDataList: [],
      displayData: [],
      mode: 1,
      MemberRank: [],
      resultCount: 0,
      ticketNo: 0,
      ticketName: '',
      equipCdData: '',
      searchData: '',
      lastSearchData: '',
      editDlgOpen: false,
      operationLock: true,
      sessionBusinessUnitCd: '',
      masters: {},
      timeout: null
    }
  },
  components: {
    maintButton,
    editDialog,
    popup,
    dialogStoreSelect
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
    },
    async fetchData () {
      if (this.sessionBusinessUnitCd === null || this.sessionBusinessUnitCd === '' || this.sessionBusinessUnitCd === undefined) return
      if (await this.getEquipment() === false) return
      this.operationLock = false
      await this.$nextTick(() => {
        this.$refs.directInputText.focus()
      })
    },
    async getEquipment () {
      if (this.$refs.directInputText != null) {
        this.$refs.directInputText.focus()
      }
      let result = false
      this.dispMemberList = []
      const params = { allFlg: 1 }
      this.resultCount = 0
      try {
        // 企業マスタ取得
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getEquipmentPath}`, {
          nodeId: `${this.sessionBusinessUnitCd}`,
          equipNo: 0,
          orderBy: 'equipNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.findEquipmentList = response.data.responseModel
          this.resultCount = this.findEquipmentList.length
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する店舗なし
          this.resultCount = this.findEquipmentList.length
          result = true
        } else {
          this.operationLock = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      } finally {
      }
      return result
    },
    equipCdInput () {
      this.equipCdData = this.equipCdData.replace(/[^0-9]/gi, '')
    },
    async directInput () {
      const params = { equipNo: 0, nodeId: this.sessionBusinessUnitCd }
      let dataList = []
      let newSet = {
        equipNo: Math.abs(Number(this.equipCdData)),
        equipName: '',
        equipShortName: ''
      }
      if (this.equipCdData === '0' || this.equipCdData === '' || this.equipCdData === '00') {
        this.equipCdData = ''
      } else {
        dataList = this.findEquipmentList
        const params = { allFlg: 1 }
        try {
          // 企業マスタ取得
          let response = await axios.post(`${this.$i18n.t('prop.url')}${getEquipmentPath}`, {
            nodeId: `${this.sessionBusinessUnitCd}`,
            equipNo: Math.abs(this.equipCdData),
            orderBy: 'equipNo',
            ascending: true,
            startIndex: 0,
            batchSize: 0
          }, commonUtils.methods.addApiHeader({}))
          if (response.data.result.code === 0) {
            // 0:正常
            const res = response.data.responseModel.length ? response.data.responseModel[0] : [response.data.responseModel]
            const result = res ? res : {equipNo: Math.abs(this.equipCdData), equipName: '', equipShortName: ''}
            this.$refs.editDialog.open({...result, equipNo: Math.abs(this.equipCdData)}, this.refresh, this.sessionBusinessUnitCd, this.editDlgClose, 2, null)
            this.timeout = setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            this.$refs.editDialog.open(newSet, this.refresh, this.sessionBusinessUnitCd, this.editDlgClose, this.mode, Math.abs(this.equipCdData))
            this.timeout = setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            // this.operationLock = true
            this.globalErrorMapping(response.data.result)
          }
        } catch (error) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        }
      }
    },
    enterCode () {
      document.getElementById('searchCode').checked = true
      this.onRadioChange()
    },
    enterName () {
      document.getElementById('searchName').checked = true
      this.onRadioChange()
    },
    onRadioChange () {
      this.searchData = ''
    },
    async selectedListDate (row) {
      const params = { allFlg: 1 }
      try {
        // 企業マスタ取得
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getEquipmentPath}`, {
          nodeId: `${this.sessionBusinessUnitCd}`,
          equipNo: row.equipNo,
          orderBy: 'equipNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          // 0:正常
          const res = response.data.responseModel.length ? response.data.responseModel[0] : [response.data.responseModel]
          const result = res ? res : {equipNo: row.equipNo, equipName: '', equipShortName: ''}
          this.$refs.editDialog.open(result, this.refresh, this.sessionBusinessUnitCd, this.editDlgClose, 2, null)
          this.timeout = setTimeout(() => {
            this.$refs.editDialog.openEnd()
          }, 50)
          this.editDlgOpen = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    async refresh () {
      this.findEquipmentList = []
      if (await this.getEquipment() === true) {
        return true
      } else {
        return false
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.equipCdData = ''
    },
    closeTab () {
//      window.close()
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        let errorMessage = result.errorMessageMap['businessUnitCd'].toString().split(',').join('')
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
    confirmUnload (event) {
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    },
    getSessionBusinessUnitCd () {
      let vue = this
      this.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
        vue.sessionBusinessUnitCd = businessUnitCdStr
        vue.fetchData()
      })
    },
    getNodeId () {
      return `${this.sessionBusinessUnitCd}`
    },
  },
  created () {
    this.getSessionBusinessUnitCd()
    this.$root.winId = 'C00218'
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
  watch: {
    searchData: function (val) {
      if (document.getElementById('searchCode').checked) {
        let inputText = val.replace(/[^0-9]/gi, '')
        this.searchData = inputText
        if (inputText === this.lastSearchData) return
        this.lastSearchData = inputText
      } else {
        this.lastSearchData = val
      }
      if (this.lastSearchData === '') {
        this.findEquipmentList = []
        this.dispMemberList = []
        this.getEquipment()
      } else {
        if (this.findEquipmentList === null || this.findEquipmentList.length === 0) return
        this.filtering()
      }
    }
  }
}
//  KSD V001.000 AE
