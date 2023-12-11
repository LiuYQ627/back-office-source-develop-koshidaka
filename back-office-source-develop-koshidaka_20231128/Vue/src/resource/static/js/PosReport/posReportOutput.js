import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
// KSD V001.000 DS
// import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
// KSD V001.000 DE
import commonUtils from '../Common/commonUtils'
// KSD V001.000 DS
// import html2pdf from 'html2pdf.js'
// KSD V001.000 DE
// KSD V001.000 AS
import PosReportTransactionReport from '@/resource/templates/PosReport/Reports/PosReportTransactionReport'
import PosReportGroupReport from '@/resource/templates/PosReport/Reports/PosReportGroupReport'
import PosReportPLUReport from '@/resource/templates/PosReport/Reports/PosReportPLUReport'
import PosReportHourZoneReport from '@/resource/templates/PosReport/Reports/PosReportHourZoneReport'
import PosReportUserReport from '@/resource/templates/PosReport/Reports/PosReportUserReport'
import PosReportTicketReport from '@/resource/templates/PosReport/Reports/PosReportTicketReport'
import PosReportRoomReport from '@/resource/templates/PosReport/Reports/PosReportRoomReport'
import unloadingUtils from '@/resource/static/js/Common/unloadingUtils'
// KSD V001.000 AE
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230320  xu.jh(Neusoft)  G001.00.0  issue課題#1500を対応します.
 * 20230329  xu.jh(Neusoft)  G002.00.0  issue課題#1676を対応します.
 * 20230411  qinshh(Neusoft) G003.00.0  issue課題#1563を対応します.
 * 20230613  qinshh(Neusoft) G004.00.0  issue課題#1555を対応します.
 */
const posReportPath = '/F32231/POSレポート出力'
// KSD V001.000 DS
// const path = 'Audit/PosReport'
// KSD V001.000 DE
// AS #1673-1674
const pathPDF = 'Audit/PosReport2'
// AE #1673-1674

export default {
  name: 'PosReportOutput',
  // KSD V001.000 AS
  mixins: [unloadingUtils],
  // KSD V001.000 AE
  props: {
    // KSD V001.000 DS
    // targetReport: {
    //   type: String,
    //   required: true
    // },
    // targetReportKey: {
    //   type: String,
    //   required: true
    // },
    // storeCodes: {
    //   type: Array,
    //   required: true
    // },
    // registerIds: {
    //   type: Array,
    //   required: true
    // },
    // durationFrom: {
    //   type: String,
    //   required: true
    // },
    // durationTo: {
    //   type: String,
    //   required: true
    // },
    // masters: {
    //   type: Object
    // }
    // KSD V001.000 DE
    request: {
      type: Object,
      required: true
    },
    reportTitle: {
      type: String,
      required: true
    },
    additionalProps: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  // KSD V001.000 AS
  data () {
    return {
      isDialogOpen: false,
      timeout: null
    }
  },
  // KSD V001.000 AE
  // KSD V001.000 DS
  // data () {
  //   return {
  //     data: [],
  //     headers: [
  //       {
  //         text: '取引別No.',
  //         align: 'start',
  //         //          sortable: false,
  //         //          value: 'name',
  //         sortable: true,
  //         value: 'code',
  //         // G002.00.0 Add-Start
  //         width: '150px'
  //         // G002.00.0 Add-End
  //       },
  //       {
  //         text: '名称',
  //         align: 'start',
  //         //          sortable: false,
  //         //          value: 'calories',
  //         sortable: true,
  //         value: 'name',
  //         // G002.00.0 Add-Start
  //         width: '300px'
  //         // G002.00.0 Add-End
  //       },
  //       {
  //         text: '回数',
  //         align: 'end',
  //         //          sortable: false,
  //         //          value: 'fat',
  //         sortable: true,
  //         value: 'occurrence',
  //         // G002.00.0 Add-Start
  //         width: '100px'
  //         // G002.00.0 Add-End
  //       },
  //       {
  //         // CS #1673,#1674
  //         // text: '客数/人数',
  //         text: '客数',
  //         // CE #1673,#1674
  //         align: 'end',
  //         sortable: false,
  //         //          value: 'carbs',
  //         // CS #1673,#1674
  //         // value: 'customer'
  //         value: 'customerCount',
  //         // CE #1673,#1674
  //         // G002.00.0 Add-Start
  //         width: '150px'
  //         // G002.00.0 Add-End
  //       },
  //       {
  //         // AS #1673-1674
  //         text: '点数',
  //         align: 'end',
  //         sortable: false,
  //         value: 'itemQuantity',
  //         // G002.00.0 Add-Start
  //         width: '150px'
  //         // G002.00.0 Add-End
  //       },
  //       {
  //         // AE #1673-1674
  //         text: '金額',
  //         align: 'end',
  //         //          sortable: false,
  //         //          value: 'protein',
  //         //        },
  //         sortable: true,
  //         value: 'amount',
  //         // G002.00.0 Add-Start
  //         width: '150px'
  //         // G002.00.0 Add-End
  //       }
  //     // ],
  //     ],
  //     // AS #1544,#1546
  //     processing: false
  //     // AE #1544,#1546
  //     // masters: {}
  //   }
  // },
  // KSD V001.000 DE
  // KSD V001.000 DS
  // computed: {
  //   registerIdsText () {
  //     return this.registerIds.join('、')
  //   },
  //   storeNames () {
  //     const vue = this
  //     if (!('storeMasters' in vue.masters)) return ''

  //     return vue.storeCodes.map(code => {
  //       let store = vue.masters.storeMasters.find(element => element.name === code)
  //       return store === undefined ? undefined : store.displayName.default
  //     }).filter(name => name !== undefined).join('、')
  //   }
  // },
  // KSD V001.000 DE
  components: {
    maintButton,
    popup,
    // KSD V001.000 DS
    // dialogStoreSelect
    // KSD V001.000 DE
    // KSD V001.000 AS
    PosReportTransactionReport,
    PosReportGroupReport,
    PosReportPLUReport,
    PosReportHourZoneReport,
    PosReportUserReport,
    PosReportTicketReport,
    PosReportRoomReport
    // KSD V001.000 AE
  },
  methods: {
    // KSD V001.000 DS
    // // CS #1544,#1546
    // // getReportResult () {
    // async getReportResult () {
    //   this.processing = true
    //   // CE #1544,#1546
    //   // console.log(this.$i18n.t('prop.url') + path);
    //   // CS #1544,#1546
    //   // axios.post(this.$i18n.t('prop.url') + path, {
    //   await axios.post(this.$i18n.t('prop.url') + path, {
    //   // CE #1544,#1546
    //     reportName: this.targetReportKey,
    //     // reportFormat: "PDF",
    //     reportFormat: 'JSON',
    //     // AS #1544,#1546
    //     includeZeroData: true,
    //     printNoCheckFlg: false,
    //     // AE #1544,#1546
    //     storeName: this.storeCodes,
    //     endpointId: this.registerIds,
    //     duration: {
    //       from: this.durationFrom,
    //       //  to: this.durationTo,
    //       // },
    //       to: this.durationTo
    //     }
    //   }, commonUtils.methods.getApiHeader())
    //     .then(response => {
    //       // console.log(response.data);
    //       if (response.data.result.code === 0) {
    //         // CS #1544,#1546
    //         // this.setDataToTable(response.data.responseModel)
    //         this.data = []
    //         this.data = response.data.responseModel
    //         // CE #1544,#1546
    //       } else if (response.data.result.code === 2) {
    //         // this.$refs.pop.open(3, '', '対象データが存在しません。', '', false, null, false, null)
    //         this.$refs.pop.open(2, '', '対象データが存在しません。', '', false, null, false, null)
    //       } else {
    //         // CS #1673-1674
    //         // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
    //         let globalErrorMsg = response.data.result.errorMessageMap['global'].toString()
    //         this.$refs.pop.open(3, '', globalErrorMsg, response.data.result.code, false, null, false, null)
    //         // CE #1673-1674
    //       }
    //     })
    //     .catch(error => {
    //       // CS #1673-1674
    //       // if (error !== null) {
    //       if (typeof error !== 'undefined') {
    //       // CE #1673-1674
    //         console.log(error)
    //       }
    //       this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
    //     })
    //   // AS #1544,#1546
    //   this.processing = false
    //   // AE #1544,#1546
    // },
    // // DS #1544,#1546
    // /*
    // setDataToTable (dataArray) {
    //   this.data = []
    //   dataArray.forEach(stores =>
    //     stores.endpoints.forEach(endpoint =>
    //       endpoint.data.forEach(function (rec) {
    //         rec.customer = rec.itemQuantity + '/' + rec.customerCount
    //         this.data.push(rec)
    //       }, this)
    //     )
    //   )
    //   // console.log(dataArray[0].endpoints[0].data, 'setDataToTable')
    //   // this.data = dataArray[0].endpoints[0].data
    // },
    // */
    // // DE #1544,#1546
    // // CS #1673-1674
    // // onPDFOutput() {
    // onPDFOutput_disuse () {
    // // CE #1673-1674
    //   // DS #1544,#1546
    //   /*
    //   // html2pdf(document.getElementById("pdf-result"), {
    //   // margin: 1,
    //   // filename: "POSレポート.pdf",
    //   // });
    //   html2pdf(document.getElementById('pdf-result'), {
    //     margin: 1, filename: 'POSレポート.pdf'
    //   */
    //   // DE #1544,#1546
    //   // AS #1544,#1546
    //   this.data.forEach(function (e, index) {
    //     let dt = new Date()
    //     const fileName = dt.getFullYear() + ('00' + (dt.getMonth() + 1)).slice(-2) + ('00' + (dt.getDate())).slice(-2) +
    //       ('00' + (dt.getHours())).slice(-2) + ('00' + (dt.getMinutes())).slice(-2) + ('00' + (dt.getSeconds())).slice(-2) +
    //       index.toString().padStart(2, '0') + '_POSレポート_' + e.storeName + '.pdf'
    //     this.outPutPDF(document.getElementById('store' + index.toString().padStart(2, '0')), fileName)
    //   }, this)
    // },
    // async outPutPDF (element, fileName) {
    //   this.processing = true
    //   await html2pdf(element, {
    //     margin: 5,
    //     filename: fileName
    //   // AE #1544,#1546
    //   })
    //   // AS #1544,#1546
    //   this.processing = false
    //   // AE #1544,#1546
    // },
    // KSD V001.000 DE
    backToPosReport () {
      // G003.00.0 Add-Start
      window.open(posReportPath, '_self')
      // this.$router.push(posReportPath)
      // G003.00.0 Add-End
      // AS #1673-1674
    },
    // G003.00.0 Add-Start
    backToPrevious () {
      this.$router.back()
    },
    // KSD V001.000 AS
    backToTopPage () {
      window.open('/TopPage', '_self')
    },
    // KSD V001.000 AE
    // G003.00.0 Add-End
    async onPDFOutput () {
      // KSD V001.000 AS
      if (this.isDialogOpen) {
        return;
      }
      this.isDialogOpen = true;
      // KSD V001.000 AE
      let dt = new Date()
      // KSD V001.000 DS
      // // G004.00.0 Update-Start
      // // const fileName = dt.getFullYear() + ('00' + (dt.getMonth() + 1)).slice(-2) + ('00' + (dt.getDate())).slice(-2) +
      // //   ('00' + (dt.getHours())).slice(-2) + ('00' + (dt.getMinutes())).slice(-2) + ('00' + (dt.getSeconds())).slice(-2) + '_POSレポート.pdf'
      // const fileName = 'PosReport_' + this.durationFrom.replace(/-/g, '') + '_' + dt.getFullYear() + ('00' + (dt.getMonth() + 1)).slice(-2) + ('00' + (dt.getDate())).slice(-2) + '.pdf'
      // // G004.00.0 Update-End
      // KSD V001.000 DE
      // KSD V001.000 AS
      const durationFrom = String(this.request.duration.from).replace(/-/g, '').padEnd(8, '0')
      const durationTo = String(this.request.duration.to).replace(/-/g, '').padEnd(8, '0')
      const fileName = `PosReport_${durationFrom}_${durationTo}.pdf`
      // KSD V001.000 AE

      let base64Str = await this.getReportPDF()
      // KSD V001.000 DS
      // if (!base64Str.length) {
      // this.$refs.pop.open(3, '', 'PDFデータの取得に失敗しました。', 404, false, null, false, null)
      // KSD V001.000 DE
      // KSD V001.000 AS
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
        // 日本語の文字化けに対処するためBOMを作成する。
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
          // G001.00.0 Update-Start
          // this.$refs.pop.open(3, e.message, 'ファイルのエクスポートに失敗しました。ファイルが保存できる状態か確認してください。', e.code, false, null, false, null)
          // KSD V001.000 DS
          // this.$refs.pop.open(3, '', 'ファイルのエクスポートに失敗しました。ファイルが保存できる状態か確認してください。', e.code, false, null, false, null)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$refs.pop.open(3, '', this.$i18n.t('F32231.E504'), e.code, false, null, false, null)
          this.isDialogOpen = false
          // KSD V001.000 AE
          // G001.00.0 Update-End
        }
      }
      if (!err) {
        // KSD V001.000 DS
        // this.$refs.pop.open(1, '', 'PDFファイルをエクスポートしました。', 200, false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$refs.pop.open(2, '', this.$i18n.t('F32231.E503'), '', false, null, false, null)
        this.isDialogOpen = false
        // KSD V001.000 AE
      }
      // KSD V001.000 AS
      this.timeout = setTimeout(() => {
        this.isDialogOpen = false
      }, 300)
      // KSD V001.000 AE
    },
    async getReportPDF () {
      let buf = ''
      this.processing = true
      // KSD V001.000 DS
      // await axios.post(this.$i18n.t('prop.url') + pathPDF, {
      //   reportName: this.targetReportKey,
      //   reportFormat: 'PDF',
      //   includeZeroData: true,
      //   printNoCheckFlg: false,
      //   storeName: this.storeCodes,
      //   endpointId: this.registerIds,
      //   duration: {
      //     from: this.durationFrom,
      //     to: this.durationTo
      //   }
      // }, commonUtils.methods.getApiHeader())
      // KSD V001.000 DE
      // KSD V001.000 AS
      const params = {
        ...this.request,
        reportFormat: 'PDF'
      }
      await axios.post(this.$i18n.t('prop.url') + pathPDF, params, commonUtils.methods.getApiHeader())
        // KSD V001.000 AE
        .then(response => {
          if (response.data.result.code === 0) {
            buf = ''
            buf = response.data.responseModel.outputData
            // KSD V001.000 AS
            if (buf === undefined || !buf.length) {
              this.$refs.pop.open(3, '', this.$i18n.t('F32231.E502'), 404, false, null, false, null)
            }
            // KSD V001.000 AE
          } else if (response.data.result.code === 2) {
            // KSD V001.000 DS
            // this.$refs.pop.open(2, '', '対象データが存在しません。', '', false, null, false, null)
            // KSD V001.000 DE
            // KSD V001.000 AS
            this.$refs.pop.open(2, '', this.$i18n.t('F32231.E501'), '', false, null, false, null)
          } else if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              window.open('/LoginPage', '_self')
            }, false, null)
            // KSD V001.000 AE
          } else {
            let globalErrorMsg = response.data.result.errorMessageMap['global'].toString()
            this.$refs.pop.open(3, '', globalErrorMsg, response.data.result.code, false, null, false, null)
          }
        })
        .catch(error => {
          if (typeof error !== 'undefined') {
            console.log(error)
          }
          // KSD V001.000 DS
          // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          // KSD V001.000 DE
          // KSD V001.000 AS
          this.$refs.pop.open(3, '', this.$i18n.t('F32231.E502'), 404, false, null, false, null)
          // KSD V001.000 AE
        })
      this.processing = false
      this.isDialogOpen = false
      return buf
      // AE #1673-1674
    }
    // KSD V001.000 AS
    , handleF5 (event) {
      if (!this.enableF5Handling) return
      if (event.key === 'F5') {
        event.preventDefault()
        this.backToPosReport()
      }
    },
    doErrorProcess (messageStr, code, callback) {
      this.$refs.pop.open(3, '', messageStr, code, false, callback, false, null)
    },
    confirmUnload () {
      clearTimeout(this.timeout)
    }
    // KSD V001.000 AE
  },

  created () {
    this.$root.winId = 'F32231-output'
    document.title = this.$root.title = this.$route.meta.title
    // KSD V001.000 AS
    this.enableUnloadHandling = false
    window.addEventListener('beforeunload', this.confirmUnload)
    window.addEventListener('keydown', this.handleF5)
    if (Object.keys(this.$route.params).length <= 0) this.backToPosReport()
    // KSD V001.000 AE
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.$nextTick()
    // console.log(this.registerIds)
    // KSD V001.000 DS
    // this.getReportResult()
    // KSD V001.000 DE
  }
}
