// KSD V001.000 AS
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import html2pdf from 'html2pdf.js'
import auditReportTable from '@/resource/templates/PosReport/Tables/AuditReportTable'
import unloadingUtils from '@/resource/static/js/Common/unloadingUtils'
import moment from 'moment'

const auditReportPath = '/F32232/監査レポート出力'
const path = 'Audit/PosReport'
const pathPDF = 'Audit/PosReport2'

export default {
  name: 'AuditReportOutput',
  props: {
    targetReport: {
      type: String,
      required: true
    },
    targetReportKey: {
      type: String,
      required: true
    },
    storeCodes: {
      type: Array,
      required: true
    },
    registerIds: {
      type: Array,
      required: true
    },
    auditClassification: {
      type: Array,
      required: true
    },
    auditCategory: {
      type: Array,
      required: true
    },
    durationFrom: {
      type: String,
      required: true
    },
    autofillRequestDateFrom: {
      type: String,
      required: true
    },
    autofillRequestDateTo: {
      type: String,
      required: true
    },
    durationTo: {
      type: String,
      required: true
    }
  },
  mixins: [posReportUtils, unloadingUtils],
  data () {
    return {
      data: [],
      emptyHeader: {
        text: null,
        align: 'start',
        sortable: false,
        value: null,
        width: ''
      },
      overDispDataMsg: null,
      duration: [],
      dataMasters: {},
      registerIdStorage: [],
      headers: [
        [
          {
            text: this.$i18n.t('F32232.S701'),
            align: 'start',
            sortable: false,
            value: 'auditName',
            width: '259px'
          },
          {
            text: this.$i18n.t('F32232.S704'),
            align: 'start',
            sortable: false,
            value: 'transactionNumber',
            width: '110px'
          },
          {
            text: this.$i18n.t('F32232.S705'),
            align: 'start',
            sortable: false,
            value: 'slipNo',
            width: '106px'
          },
          {
            text: this.$i18n.t('F32232.S706'),
            align: 'start',
            sortable: false,
            value: 'posUserName',
            width: '175px'
          },
          {
            text: this.$i18n.t('F32232.S702'),
            align: 'start',
            sortable: false,
            value: 'userName',
            width: '255px'
          },
          {
            text: this.$i18n.t('F32232.S708'),
            align: 'end',
            sortable: false,
            value: 'orderBillTimestamp',
            width: '270px'
          }
        ],
        [
          {...this.emptyHeader, width: '475px'},
          {
            text: this.$i18n.t('F32232.S721'),
            align: 'start',
            sortable: false,
            value: 'tantoNo',
            width: '175px'
          },
          {
            text: this.$i18n.t('F32232.S709'),
            align: 'start',
            sortable: false,
            value: 'tantoName',
            width: '255px'
          },
          {
            text: this.$i18n.t('F32232.S710'),
            align: 'end',
            sortable: false,
            value: 'deleteTimestamp',
            width: '270px'
          }
        ],
        [
          {...this.emptyHeader, width: '259px'},
          {
            text: this.$i18n.t('F32232.S711'),
            align: 'start',
            sortable: false,
            value: 'originalSequenceNumber',
            width: '216px'
          },
          {
            text: this.$i18n.t('F32232.S712'),
            align: 'start',
            sortable: false,
            value: 'originalPosUserName',
            width: '175px'
          },
          {
            text: this.$i18n.t('F32232.S713'),
            align: 'start',
            sortable: false,
            value: 'originalUserName',
            width: '255px'
          },
          {
            text: this.$i18n.t('F32232.S723'),
            align: 'end',
            sortable: false,
            value: 'total',
            width: '270px'
          }
        ],
        [
          {...this.emptyHeader, width: '475px'},
          {
            text: this.$i18n.t('F32232.S722'),
            align: 'start',
            sortable: false,
            value: 'originalTantoNo',
            width: '175px'
          },
          {
            text: this.$i18n.t('F32232.S715'),
            align: 'start',
            sortable: false,
            value: 'originalTantoName',
            width: '255px'
          },
          {
            text: this.$i18n.t('F32232.S714'),
            align: 'end',
            sortable: false,
            value: 'reasonCode',
            width: '270px'
          }
        ],
        [
          {...this.emptyHeader, width: '259px'},
          {
            text: this.$i18n.t('F32232.S716'),
            align: 'start',
            sortable: false,
            value: 'menuCode',
            width: '216px'
          },
          {
            text: this.$i18n.t('F32232.S717'),
            align: 'start',
            sortable: false,
            value: 'menuCode',
            width: '700px'
          }
        ],
        [
          {...this.emptyHeader, width: '475px'},
          {
            text: this.$i18n.t('F32232.S718'),
            align: 'start',
            sortable: false,
            value: 'menuTypeName',
            width: '175px'
          },
          {...this.emptyHeader, width: '255px'},
          {
            text: this.$i18n.t('F32232.S719'),
            align: 'end',
            sortable: false,
            value: 'menuName',
            width: '270px'
          }
        ],
        [
          {...this.emptyHeader, width: '905px'},
          {
            text: this.$i18n.t('F32232.S720'),
            align: 'end',
            sortable: false,
            value: 'itemQuantity',
            width: '270px'
          }
        ]
      ],
      processing: false,
      isDialogOpen: false,
      timeout: null
    }
  },
  computed: {
    registerIdsText () {
      return this.registerIds.join('、')
    },
    auditClassificationText () {
      const emptySelect = this.$i18n.t('F32232.S804')
      if (this.auditClassification.includes(this.$i18n.t('F32232.S341'))) {
        return emptySelect
      } else {
        return this.auditClassification.join('、')
      }
    },
    storeNames () {
      const vue = this
      if (!('storeMasters' in vue.dataMasters)) return ''
      return vue.storeCodes.map(name => {
        const store = vue.dataMasters.storeMasters.find(element => element.name === name)
        return store === undefined ? undefined : store.displayName.default
      }).filter(name => name !== undefined).join('、')
    }
  },
  components: {
    maintButton,
    popup,
    dialogStoreSelect,
    auditReportTable
  },
  methods: {
    async getReportResult () {
      this.registerIdStorage = this.registerIds

      if (this.registerIdStorage.includes('全選択')) {
        this.registerIdStorage = []
      } else {
        this.registerIdStorage = this.registerIds
      }
      this.processing = true
      await axios.post(this.$i18n.t('prop.url') + path, {
        reportName: this.targetReportKey,
        reportFormat: 'JSON',
        storeName: this.storeCodes,
        endpointId: this.registerIdStorage,
        duration: {
          from: this.autofillRequestDateFrom,
          to: this.autofillRequestDateTo
        },
        auditCategory: this.auditCategory
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          if (response.data.result.code === 0) {
            this.data = []
            const result = response.data.responseModel
            this.duration = []
            this.data = result.aggregateData
            if (this.data.length <= 0) {
              this.doCatchError(this.$i18n.t('O00004.W010'))
            }
            if (result.OverDispDataMsg) {
              this.openPopupDialog({
                mode: 2,
                messageCode: 'F32231.W001'
              })
              this.overDispDataMsg = result.OverDispDataMsg
            }
            this.duration = result.duration
          } else if (response.data.result.code === 2) {
            this.$refs.pop.open(2, '', this.$i18n.t('F32231.E501'), '', false, () => {
              this.$root.$emit('clearStoreCodes')
              this.$router.back()
            }, false, null)
          } else if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              window.open('/LoginPage', '_self')
            }, false, null)
          } else {
            this.$root.$emit('clearStoreCodes')
            let globalErrorMsg = response.data.result.errorMessageMap['global'].toString()
            this.$refs.pop.open(3, '', globalErrorMsg, response.data.result.code, false, () => {
              this.$router.back()
            }, false, null)
          }
        })
        .catch(error => {
          this.doCatchError(error)
        })
      this.processing = false
    },
    doCatchError (error) {
      this.processing = false
      if (typeof error !== 'undefined') {
        console.error(error)
      }
      this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
        this.$root.$emit('clearStoreCodes')
        this.$router.back()
      }, false, null)
    },
    async outPutPDF (element, fileName) {
      this.processing = true
      await html2pdf(element, {
        margin: 5,
        filename: fileName
      })
      this.processing = false
    },
    backToAuditReport () {
      window.open(auditReportPath, '_self')
    },
    toTopPage () {
      window.open('/TopPage', '_self')
    },
    backToPrevious () {
      this.$root.$emit('clearStoreCodes')
      this.$router.back()
    },
    async onPDFOutput () {
      if (this.isDialogOpen) {
        return;
      }
      this.isDialogOpen = true;
      const formattedDurationFrom = moment(this.autofillRequestDateFrom).format('YYYYMMDD')
      const formattedDurationTo = moment(this.autofillRequestDateTo).format('YYYYMMDD')
      const fileName = `AuditReport_${formattedDurationFrom}_${formattedDurationTo}.pdf`
      const base64Str = await this.getReportPDF()
      if (base64Str === undefined || !base64Str.length) {
        // KSD V001.000 AE
        return
      }

      const opts = {
        suggestedName: fileName,
        types: [{description: 'PDF file', accept: { 'application/pdf': ['.pdf'] }}]
      }

      let err = false
      try {
        let bom = new Uint8Array([0xEF, 0xBB, 0xBF])

        let bin = atob(base64Str.replace(/^.*,/, ''))
        let buffer = new Uint8Array(bin.length)
        for (var i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i)
        }

        let blob = new Blob([bom, buffer.buffer], { type: 'application/pdf' })

        const handle = await window.showSaveFilePicker(opts)
        const writable = await handle.createWritable()
        await writable.write(blob)
        await writable.close()
      } catch (e) {
        err = true
        if (!e.message.match(/aborted/)) {
          this.$refs.pop.open(3, '', this.$i18n.t('F32232.E504'), e.code, false, null, false, null)
          this.isDialogOpen = false
        }
      }
      if (!err) {
        this.$refs.pop.open(2, '', this.$i18n.t('F32232.E503'), '', false, null, false, null)
        this.isDialogOpen = false
      }
      this.timeout = setTimeout(() => {
        this.isDialogOpen = false
      }, 300)
    },
    async getReportPDF () {
      this.registerIdStorage = this.registerIds

      if (this.registerIdStorage.includes('全選択')) {
        this.registerIdStorage = []
      } else {
        this.registerIdStorage = this.registerIds
      }
      let buf = ''
      this.processing = true
      await axios.post(this.$i18n.t('prop.url') + pathPDF, {
        reportName: this.targetReportKey,
        reportFormat: 'PDF',
        storeName: this.storeCodes,
        endpointId: this.registerIdStorage,
        duration: {
          from: this.autofillRequestDateFrom,
          to: this.autofillRequestDateTo
        },
        auditCategory: this.auditCategory
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          if (response.data.result.code === 0) {
            buf = ''
            buf = response.data.responseModel.outputData
            if (buf === undefined || !buf.length) {
              this.$refs.pop.open(3, '', this.$i18n.t('F32231.E502'), 404, false, null, false, null)
            }
          } else if (response.data.result.code === 2) {
            this.$refs.pop.open(2, '', this.$i18n.t('F32231.E501'), '', false, null, false, null)
          } else if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              window.open('/LoginPage', '_self')
            }, false, null)
          } else {
            let globalErrorMsg = response.data.result.errorMessageMap['global'].toString()
            this.$refs.pop.open(3, '', globalErrorMsg, response.data.result.code, false, null, false, null)
          }
        })
        .catch(error => {
          if (typeof error !== 'undefined') {
            console.error(error)
          }
          this.$refs.pop.open(3, '', this.$i18n.t('F32231.E502'), 404, false, null, false, null)
        })
      this.processing = false
      this.isDialogOpen = false
      return buf
    },
    handleF5 (event) {
      if (!this.enableF5Handling) return
      if (event.key === 'F5') {
        event.preventDefault()
        this.backToAuditReport()
      }
    },
    confirmUnload () {
      clearTimeout(this.timeout)
    }
  },

  created () {
    this.$root.winId = 'F32232-output'
    document.title = this.$root.title = this.$route.meta.title
    this.enableUnloadHandling = false
    window.addEventListener('beforeunload', this.confirmUnload)
    window.addEventListener('keydown', this.handleF5)
    if (Object.keys(this.$route.params).length <= 0) this.backToAuditReport()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.$nextTick()
    this.dataMasters = await this.$refs.dialogStoreSelect.getMasters(false)
    this.getReportResult()
  }
}
// KSD V001.000 AE
