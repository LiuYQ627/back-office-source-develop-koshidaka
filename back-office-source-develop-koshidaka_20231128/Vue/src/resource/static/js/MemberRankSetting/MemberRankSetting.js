//  KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/MemberRankSetting/MemberEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
const parentPath = 'RestaurantsMemberRank/Query'

export default {
  name: 'MemberRankSetting',
  data () {
    return {
      dispMemberList: [],
      findMemberList: [],
      parentDataList: [],
      displayData: [],
      MemberRank: [],
      resultCount: 0,
      businessUnitCdData: '',
      searchData: '',
      lastSearchData: '',
      editDlgOpen: false,
      operationLock: false,
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
      if (await this.getMember() === false) return
      this.operationLock = false
      this.focusFirstFocusableElement()
    },
    async morphData () {
      var found = false
      let data = []
      this.displayData = []

      if (this.findMemberList.length === 0) {
        for (var c = 1; c <= 10; c++) {
          data = { indexNo: c, memberRankNo: '', memberRankName: '', ticketNo: '', found: false }
          this.displayData.push(data)
        }
      } else {
        for (var i = 1; i <= 10; i++) {
          for (var j = 0; j < this.findMemberList.length; j++) {
            if (this.findMemberList[j].indexNo === i) {
              found = true
              data = { ...this.findMemberList[j],
                indexNo: this.findMemberList[j].indexNo,
                memberRankNo: this.findMemberList[j].memberRankNo,
                memberRankName: this.findMemberList[j].memberRankName,
                ticketNo: this.findMemberList[j].ticketNo,
                found }
            }
          }
          if (found === false) {
            data = { indexNo: i, memberRankNo: '', memberRankName: '', ticketNo: '', found }
            this.displayData.push(data)
          } else {
            this.displayData.push(data)
            data = []
            found = false
          }
        }
      }
    },
    async getMember () {
      let result = false
      this.dispMemberList = []
      this.displayData = []
      const params = { allFlg: 1 }
      this.editDlgOpen = false
      this.resultCount = 0
      try {
        // 企業マスタ取得
        let response = await axios.post(`${this.$i18n.t('prop.url')}${parentPath}`, {
          nodeId: `${this.sessionBusinessUnitCd}`,
          indexNo: 0,
          orderBy: 'indexNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.operationLock = false
          this.findMemberList = response.data.responseModel
          this.operationLock = false
          this.morphData()
          result = true
          this.resultCount = response.data.responseModel.filter(res => res.indexNo).length
        } else if (response.data.result.code === 2) {
          this.findMemberList = []
          this.morphData()
          // 2:該当する店舗なし
          this.resultCount = response.data.responseModel.filter(res => res.indexNo).length
          this.operationLock = false
          result = true
        } else {
          this.resultCount = 0
          this.operationLock = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      } finally {
      }
      return result
    },
    businessUnitCdInput () {
      this.businessUnitCdData = this.businessUnitCdData.replace(/[^0-9]/gi, '')
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
      const params = { 
        indexNo: row.indexNo,
        nodeId: this.sessionBusinessUnitCd,
        orderBy: 'indexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      axios.post(`${this.$i18n.t('prop.url')}${parentPath}`, params, commonUtils.methods.addApiHeader({}))
        .then(response => {
          if (response.data.result.code === 0) {
            const res = response.data.responseModel.length ? response.data.responseModel[0] : [response.data.responseModel]
            const result = res.indexNo === row.indexNo ? { ...row, indexNo: row.indexNo, memberRankNo: row.indexNo - 1, memberRankName: res.memberRankName, ticketNo: 989 + row.indexNo } : { indexNo: row.indexNo, memberRankNo: row.indexNo - 1, memberRankName: '', ticketNo: 989 + row.indexNo }
            this.$refs.editDialog.open(result, this.refresh, this.sessionBusinessUnitCd, this.editDlgClose, 2)
            this.timeout = setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            if (row.found == false) {
              const res = response.data.responseModel.length ? response.data.responseModel[0] : [response.data.responseModel]
              const result = res.indexNo === row.indexNo ? { ...row, indexNo: row.indexNo, memberRankNo: row.indexNo - 1, memberRankName: res.memberRankName, ticketNo: 989 + row.indexNo } : { indexNo: row.indexNo, memberRankNo: row.indexNo - 1, memberRankName: '', ticketNo: 989 + row.indexNo }
              this.$refs.editDialog.open(result, this.refresh, this.sessionBusinessUnitCd, this.editDlgClose, 1)
            } else {
              this.searchErrorMapping(response.data.result)
            }
            this.timeout = setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
    },
    async refresh () {
      if (await this.getMember() === true) {
        return true
      } else {
        return false
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.businessUnitCdData = ''
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
    setTicketName (data) {
      return data.ticketNo === 0 ? 'なし' : data.ticketName
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
    this.getSessionBusinessUnitCd()
    this.$root.winId = 'C00213'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
    clearTimeout(this.timeout)
  },
  async mounted () {
    this.searchData = ''
    await this.initialize()
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
        this.findMemberList = []
        this.dispMemberList = []
        this.getMember()
      } else {
        if (this.findMemberList === null || this.findMemberList.length === 0) return
        this.filtering()
      }
    }
  }
}
//  KSD V001.000 AE
