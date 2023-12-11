import maintButton from '@/resource/templates/CommonDesign/MaintButton'
/* KSD V001.000 AS */
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import popup from '@/resource/templates/CommonDesign/Popup'
import axios from 'axios'
import { inputNumberLimitation } from '../../js/Common/jsUtils'
import commonUtils from './../Common/commonUtils'
const mgmtRetentionQueryPath = 'DataManagement/DataRetentionSettings/Query'
const mgmtRetentionUpdatePath = 'DataManagement/DataRetentionSettings/Update'
const TOTALIZER = 'tgcp_totalizer'
const TRANSACTIONS = 'tgcp_transactions'
const RECEIPTS = 'tgcp_receipts_ejournal_ejournal'
/* KSD V001.000 AE */

export default {
  name: 'DataRetentionSetting',
  data () {
    return {
      /* KSD V001.000 MS */
      // dispDataList: [{
      //   dataId: 999999,
      //   displayName: 'テスト1',
      //   keepSpan: 12
      // },
      // {
      //   dataId: 111111,
      //   displayName: 'テスト2',
      //   keepSpan: 1
      // }]
      dispDataList: [],
      /* KSD V001.000 ME */
      /* KSD V001.000 AS */
      edited: false,
      nodeId: '',
      totalizerData: {},
      transactionsData: {},
      receiptsData: {},
      retentionPeriodIdx: [],
      totalizerDataExists: false,
      transactionsDataExists: false,
      receiptsDataExists: false,
      totalizerNodeIdFound: false,
      transactionsNodeIdFound: false,
      receiptsNodeIdFound: false
      /* KSD V001.000 AE */
    }
  },
  components: {
    maintButton
    /* KSD V001.000 AS */
    , popup,
    dialogStoreSelect
    /* KSD V001.000 AE */
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
      /* KSD V001.000 AS */
      if (await this.getRetentionSettings() === false) return
      /* KSD V001.000 AE */
    },
    /* KSD V001.000 AS */
    async getRetentionSettings () {
      let result = false
      this.retentionPeriodIdx = []
      try {
        if (await this.getTotalizerRetentionSettings()) {
          if (await this.getTransactionsRetentionSettings()) {
            if (await this.getReceiptsRetentionSettings()) {
              this.dispDataList = []
              if (this.totalizerDataExists) this.dispDataList = this.dispDataList.concat(JSON.parse(JSON.stringify(this.totalizerData)))
              if (this.transactionsDataExists) this.dispDataList = this.dispDataList.concat(JSON.parse(JSON.stringify(this.transactionsData)))
              if (this.receiptsDataExists) this.dispDataList = this.dispDataList.concat(JSON.parse(JSON.stringify(this.receiptsData)))
              result = true
            }
          }
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      this.focusFirstFocusableElement()
      return result
    },
    async getTotalizerRetentionSettings () {
      let result = false
      const totalizerParams = {'groupName': TOTALIZER}
      let totalizerResponse = await axios.post(`${this.$i18n.t('prop.url')}${mgmtRetentionQueryPath}`, totalizerParams, commonUtils.methods.addApiHeader({}))
      if (totalizerResponse.data.result.code === 0) {
        // 0:正常
        this.totalizerData = {}
        this.totalizerData = totalizerResponse.data.responseModel
        if (JSON.stringify(this.totalizerData) !== '{}') {
          this.totalizerNodeIdFound = false
          this.totalizerData.nodeRetentions.nodes.forEach((node, index) => {
            if (this.nodeId === node.nodeId) {
              this.retentionPeriodIdx.push(Number(index))
              this.totalizerNodeIdFound = true
            }
          })
          if (this.totalizerNodeIdFound === false) {
            this.totalizerData.nodeRetentions.nodes.push({
              'nodeId': this.nodeId,
              'nodeRetentionPeriod': 732
            })
            this.retentionPeriodIdx.push(this.totalizerData.nodeRetentions.nodes.length - 1)
            this.edited = true
          }
          this.totalizerDataExists = true
        }
        result = true
      } else if (totalizerResponse.data.result.code === 2) {
        this.totalizerData = {}
        result = true
      } else {
        this.globalErrorMapping(totalizerResponse.data.result)
      }
      return result
    },
    async getTransactionsRetentionSettings () {
      let result = false
      const transactionsParams = {'groupName': TRANSACTIONS}
      let transactionsResponse = await axios.post(`${this.$i18n.t('prop.url')}${mgmtRetentionQueryPath}`, transactionsParams, commonUtils.methods.addApiHeader({}))
      if (transactionsResponse.data.result.code === 0) {
        // 0:正常
        this.transactionsData = {}
        this.transactionsData = transactionsResponse.data.responseModel
        if (JSON.stringify(this.transactionsData) !== '{}') {
          this.transactionsNodeIdFound = false
          this.transactionsData.nodeRetentions.nodes.forEach((node, index) => {
            if (this.nodeId === node.nodeId) {
              this.retentionPeriodIdx.push(Number(index))
              this.transactionsNodeIdFound = true
            }
          })
          if (this.transactionsNodeIdFound === false) {
            this.transactionsData.nodeRetentions.nodes.push({
              'nodeId': this.nodeId,
              'nodeRetentionPeriod': 732
            })
            this.retentionPeriodIdx.push(this.transactionsData.nodeRetentions.nodes.length - 1)
            this.edited = true
          }
          this.transactionsDataExists = true
        }
        result = true
      } else if (transactionsResponse.data.result.code === 2) {
        this.transactionsData = {}
        result = true
      } else {
        this.globalErrorMapping(transactionsResponse.data.result)
      }
      return result
    },
    async getReceiptsRetentionSettings () {
      let result = false
      const receiptsParams = {'groupName': RECEIPTS}
      let receiptsResponse = await axios.post(`${this.$i18n.t('prop.url')}${mgmtRetentionQueryPath}`, receiptsParams, commonUtils.methods.addApiHeader({}))
      if (receiptsResponse.data.result.code === 0) {
        // 0:正常
        this.receiptsData = {}
        this.receiptsData = receiptsResponse.data.responseModel
        if (JSON.stringify(this.receiptsData) !== '{}') {
          this.receiptsNodeIdFound = false
          this.receiptsData.nodeRetentions.nodes.forEach((node, index) => {
            if (this.nodeId === node.nodeId) {
              this.retentionPeriodIdx.push(Number(index))
              this.receiptsNodeIdFound = true
            }
          })
          if (this.receiptsNodeIdFound === false) {
            this.receiptsData.nodeRetentions.nodes.push({
              'nodeId': this.nodeId,
              'nodeRetentionPeriod': 366
            })
            this.retentionPeriodIdx.push(this.receiptsData.nodeRetentions.nodes.length - 1)
            this.edited = true
          }
          this.receiptsDataExists = true
        }
        result = true
      } else if (receiptsResponse.data.result.code === 2) {
        this.receiptsData = {}
        result = true
      } else {
        this.globalErrorMapping(receiptsResponse.data.result)
      }
      return result
    },
    /* KSD V001.000 AE */
    closeTab () {
      /* KSD V001.000 AS */
      if (this.edited) {
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
      } else {
      /* KSD V001.000 AE */
        this.$router.push('/TopPage')
      /* KSD V001.000 AS */
      }
      /* KSD V001.000 AE */
    },
    /* KSD V001.000 AS */
    popupConfirm () {
      this.$router.push('/TopPage')
    },
    /* KSD V001.000 AE */
    async save () {
      /* KSD V001.000 DS */
      // alert('!!! UNIMPLEMENTED !!!');
      /* KSD V001.000 DE */
      /* KSD V001.000 AS */
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      let result = false
      let errorFlag = false
      try {
        let idx = 0
        if (!errorFlag && (idx < this.dispDataList.length) && (this.totalizerDataExists === true)) {
          const newTotalizerRetentionPeriod = this.dispDataList[idx].nodeRetentions.nodes[this.retentionPeriodIdx[idx]].nodeRetentionPeriod
          const oldTotalizerRetentionPeriod = this.totalizerData.nodeRetentions.nodes[this.retentionPeriodIdx[idx]].nodeRetentionPeriod
          idx += 1
          if ((!this.totalizerNodeIdFound) || (newTotalizerRetentionPeriod !== oldTotalizerRetentionPeriod)) {
            if (!await this.saveTotalizerRetentionSettings(newTotalizerRetentionPeriod)) errorFlag = true
          }
        }
        if (!errorFlag && (idx < this.dispDataList.length) && (this.transactionsDataExists === true)) {
          const newTransactionsRetentionPeriod = this.dispDataList[idx].nodeRetentions.nodes[this.retentionPeriodIdx[idx]].nodeRetentionPeriod
          const oldTransactionsRetentionPeriod = this.transactionsData.nodeRetentions.nodes[this.retentionPeriodIdx[idx]].nodeRetentionPeriod
          idx += 1
          if ((!this.transactionsNodeIdFound) || (newTransactionsRetentionPeriod !== oldTransactionsRetentionPeriod)) {
            if (!await this.saveTransactionsRetentionSettings(newTransactionsRetentionPeriod)) errorFlag = true
          }
        }
        if (!errorFlag && (idx < this.dispDataList.length) && (this.receiptsDataExists === true)) {
          const newReceiptsRetentionPeriod = this.dispDataList[idx].nodeRetentions.nodes[this.retentionPeriodIdx[idx]].nodeRetentionPeriod
          const oldReceiptsRetentionPeriod = this.receiptsData.nodeRetentions.nodes[this.retentionPeriodIdx[idx]].nodeRetentionPeriod
          idx += 1
          if ((!this.receiptsNodeIdFound) || (newReceiptsRetentionPeriod !== oldReceiptsRetentionPeriod)) {
            if (!await this.saveReceiptsRetentionSettings(newReceiptsRetentionPeriod)) errorFlag = true
          }
        }
        if (!errorFlag) {
          result = true
          if (await this.refresh() === true) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          }
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
      /* KSD V001.000 AE */
    },
    /* KSD V001.000 AS */
    async saveTotalizerRetentionSettings (newTotalizerRetentionPeriod) {
      let result = false
      const params = {
        'groupName': TOTALIZER,
        'nodeId': this.nodeId,
        'nodeRetentionPeriod': Number(newTotalizerRetentionPeriod)
      }
      // 保存
      let response = await axios.post(`${this.$i18n.t('prop.url')}${mgmtRetentionUpdatePath}`, params, commonUtils.methods.addApiHeader({}))
      if (response.data.result.code === 0) {
        result = true
      } else {
        this.globalErrorMapping(response.data.result)
      }
      return result
    },
    async saveTransactionsRetentionSettings (newTransactionsRetentionPeriod) {
      let result = false
      const params = {
        'groupName': TRANSACTIONS,
        'nodeId': this.nodeId,
        'nodeRetentionPeriod': Number(newTransactionsRetentionPeriod)
      }
      // 保存
      let response = await axios.post(`${this.$i18n.t('prop.url')}${mgmtRetentionUpdatePath}`, params, commonUtils.methods.addApiHeader({}))
      if (response.data.result.code === 0) {
        result = true
      } else {
        this.globalErrorMapping(response.data.result)
      }
      return result
    },
    async saveReceiptsRetentionSettings (newReceiptsRetentionPeriod) {
      let result = false
      const params = {
        'groupName': RECEIPTS,
        'nodeId': this.nodeId,
        'nodeRetentionPeriod': Number(newReceiptsRetentionPeriod)
      }
      // 保存
      let response = await axios.post(`${this.$i18n.t('prop.url')}${mgmtRetentionUpdatePath}`, params, commonUtils.methods.addApiHeader({}))
      if (response.data.result.code === 0) {
        result = true
      } else {
        this.globalErrorMapping(response.data.result)
      }
      return result
    },
    async refresh () {
      this.edited = false
      this.dispDataList = []
      this.totalizerData = {}
      this.transactionsData = {}
      this.receiptsData = {}
      this.retentionPeriodIdx = []
      this.totalizerDataExists = false
      this.transactionsDataExists = false
      this.receiptsDataExists = false
      if (await this.getRetentionSettings() === true) {
        return true
      } else {
        return false
      }
    },
    async inputNumberLimit (e, inputObject, index, inputVariable, limit) {
      this.edited = true
      if (this.dispDataList[index].nodeRetentions.nodes[this.retentionPeriodIdx[index]].nodeRetentionPeriod === '') {
        this.dispDataList[index].nodeRetentions.nodes[this.retentionPeriodIdx[index]].nodeRetentionPeriod = 0
        await this.$nextTick()
      }
      return inputNumberLimitation(e, this.dispDataList[index].nodeRetentions.nodes[this.retentionPeriodIdx[index]], inputVariable, limit)
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
    async focusFirstFocusableElement () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    },
    confirmUnload (event) {
      if (this.edited) {
        event.returnValue = ''
      }
    }
    /* KSD V001.000 AE */
  },
  created () {
    /* KSD V001.000 AS */
    this.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      this.nodeId = businessUnitCdStr
    })
    /* KSD V001.000 AE */
    this.$root.winId = 'F32212'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.initialize()
    await this.$nextTick()
  }
}
