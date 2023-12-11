/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221220  litie(Neusoft)        G001.00.0  issue課題#835を対応します.
 * 20221220  litie(Neusoft)        G002.00.0  issue課題#937を対応します.
 * 20230103  litie(Neusoft)        G003.00.0  issue課題#939を対応します.
 * 20230113  litie(Neusoft)        G004.00.0  issue課題#1426を対応します.
 * 20230113  litie(Neusoft)        G005.00.0  issue課題#1430を対応します.
 * 20230228  litie(Neusoft)        G006.00.0  issue課題#1649を対応します.
 * 20230421  zxh(Neusoft)          G007.00.0  issue課題#1457を対応します.
 * 20230422  wangchunmei(Neusoft)  G009.00.0  issue課題#1827を対応します.
 * 20230427  zxh(Neusoft)          G010.00.0  issue課題#1457を対応します.
 * 20230508  zxh(Neusoft)          G011.00.0  issue課題#1457を対応します.
 * 20230510  wangchunmei(Neusoft)  G012.00.0  issue課題#908を対応します.
 * 20230616  qinshh(Neusoft)       G013.00.0  issue課題#1527を対応します.
 */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import timeInput from '@/resource/templates/CommonInput/TimeInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
// G002.00.0 Update-Start
import saveDialog from '@/resource/templates/ElectronicJournal/SaveDialog'
// G002.00.0 Update-End
import conditionDialog from '@/resource/templates/ElectronicJournal/ConditionDialog'
import dialogRegisterSelect from '@/resource/templates/PosReport/RegisterSelectDialog'
import commonUtils from '../Common/commonUtils'
// G006.00.0 Update-Start
// import html2pdf from "html2pdf.js"
// G006.00.0 Update-End
// G001.00.0 Update-Start
// import FileSaver from "file-saver"
// G001.00.0 Update-End
// G006.00.0 Update-Start
import FileSaver from 'file-saver'
// G006.00.0 Update-End
import Moment from 'moment'

const path = 'ElectronicJournal/EJournalSearch'
// G006.00.0 Update-Start
const pathEJournalSave = 'ElectronicJournal/EJournalSave'
// G006.00.0 Update-End
const endpointPath = 'Audit/Endpoint'
export default {
  name: 'ElectronicJournal',
  data () {
    return {
      targetStoreCodes: [],
      // G001.00.0 Update-Start
      // businessDateStart: '',
      // businessDateEnd: '',
      businessDateStart: new Moment().format('YYYY/MM/DD'),
      businessDateEnd: new Moment().format('YYYY/MM/DD'),
      // G001.00.0 Update-End
      businessTimeStart: '',
      businessTimeEnd: '',
      selectedRegisterIds: [],
      registerSelectDisplayed: false,
      availableRegisterIds: [],
      transactionNoStart: '',
      transactionNoEnd: '',
      keyword: '',
      results: [
        {
          id: '62cd03049b2c5f666f9c8be0',
          createTimestamp: '2022-07-12T05:13:47.997Z',
          lastModifiedTimestamp: '2022-07-12T05:13:47.997Z',
          version: 1,
          // G001.00.0 Update-Start
          // lastModifiedUserId: 'User',
          // isSystem: false,
          total: 0,
          // G001.00.0 Update-End
          businessDate: '20220712',
          businessTime: '141340',
          nodeId: 'STORE_DEV_TTEC',
          endpointId: '0001',
          transactionNo: '0001',
          type: 'SALE',
          formattedOutput: '2022年07月12日(火) 14:13 No:0001\n★★      トレーニング      ★★\n              人数         2名  \nスマレシID    123456789012345678\n  JPAS002                    \n     冷蔵庫                  \n                   外       ?250\n  割引    10%                -21\n  JPAS001                    \n     バナナ                  \n 単1,150,000x  2個 ＊ ?2,300,000\n  TEST003                    \n     アイテム3               \n 単1,150,000x  2個 非 ?2,300,000\n  TEST004                    \n     アイテム4               \n 単1,150,000x  2個 内 ?2,300,000\n  TEST005                    \n     アイテム5               \n 単1,150,000x  2個 ＊ ?2,300,000\nFixed Amount Off Order  \n                            -100\nPercent Off Order 10%   \n           10%               -47\n小 計                       \\447\n  小計(税抜10%)      \\12,345,678\n    消費税等(10%)    \\12,345,678\n  小計(税抜8%)       \\12,345,678\n    消費税等(8%)     \\12,345,678\n  小計(税込10%)      \\12,345,678\n  小計(税込8%)       \\12,345,678\n  非課税対象額       \\12,345,678\n合 計                       \\447\n  8%対象額          \\12,345,678\n (8%税額           \\12,345,678)\n  10%対象額          \\12,345,678\n (10%税額           \\12,345,678)\n＊印は、軽減税率(8%)適用商品です\n支払名称                        \n1010\n会計明細取消\nメディア１           \\12,345,678\n会計明細取消\nSALE_SubtotalAmountOff          \n                     -12,345,678\n会計明細取消\nSALE_SubtotalPercentOff         \n         10%         -12,345,678\nお釣り                      \\500\n********************************\n*     裏面に収入印紙を貼り     *\n*     割印してください。       *\n********************************\n★★      トレーニング      ★★\n事業者番号:00T9999999999999     \n          責No:99999999\n取引No1234      3点買\n'
        }
      ],
      // G001.00.0 Update-Start
      // tempResults: [],
      tempResults: null,
      // G001.00.0 Update-End
      // G002.00.0 Update-Start
      // password: null,
      keywordCaseSensitive: false,
      resultsSelectIndex: -1,
      that: this,
      // G006.00.0 Update-Start
      // saveSize: 0,
      // saveFormattedOutputs: [],
      // G006.00.0 Update-End
      // G002.00.0 Update-End
      // G006.00.0 Update-Start
      isLoading: false
      // G006.00.0 Update-End
    }
  },
  computed: {
    targetReportConditions () {
      return this.targetReport === -1 ? [] : this.targetReportList[this.targetReport].conditions
    },
    selectedRegisterIdsText () {
      return this.selectedRegisterIds.join('、')
    },
    // G001.00.0 Update-Start
    hasDetailCondition () {
      return this.businessTimeStart || this.businessTimeEnd || this.transactionNoStart || this.transactionNoEnd || this.keyword || this.keywordCaseSensitive
    },
    hasAllRequiredCondition () {
      return this.targetStoreCodes &&
        this.targetStoreCodes.length > 0 &&
        this.businessDateStart &&
        this.businessDateEnd &&
        this.selectedRegisterIds &&
        this.selectedRegisterIds.length > 0
    }
    // G001.00.0 Update-End
  },

  components: {
    maintButton,
    popup,
    dateInput,
    storeSelect,
    dialogRegisterSelect,
    timeInput,
    // G002.00.0 Update-Start
    saveDialog,
    // G002.00.0 Update-End
    conditionDialog
  },
  methods: {
    async initialize () {
      // G003.00.0 Update-Start
      // await this.getRegisterIds()
      // G003.00.0 Update-End
    },
    backToMenu () {
      this.$router.push('/TopPage')
    },
    async onShowRegisterIdsDialog () {
      // G003.00.0 Update-Start
      if (this.targetStoreCodes.length === 0) {
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W009'), '', false, null, false, null)
        return
      }
      // G003.00.0 Update-End
      // G012.00.0 Delete-Start
      // this.registerSelectDisplayed = true
      // G012.00.0 Delete-End
      this.availableRegisterIds = await this.getRegisterIds()
    },
    async getRegisterIds () {
      try {
        let temp = this.targetStoreCodes.length > 0 ? [this.targetStoreCodes[0]] : []
        const params = { nodeIds: temp }
        // G012.00.0 Add-Start
        let ids = []
        // G012.00.0 Add-End
        let response = await axios.put(this.$i18n.t('prop.url') + endpointPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          // G012.00.0 Delete-Start
          // var ids = []
          // G012.00.0 Delete-End
          for (var i = 0; i < response.data.responseModel.length; i++) {
            if (!ids.includes(response.data.responseModel[i].endpointId)) {
              ids.push(response.data.responseModel[i].endpointId)
            }
          }
          // G012.00.0 Delete-Start
          // return ids
          // G012.00.0 Delete-End
        } else if (response.data.result.code === 2) {
          // 2:該当する端末管理情報なし
          // G012.00.0 Delete-Start
          // return []
          // G012.00.0 Delete-End
        // G009.00.0 Add-Start
        } else if (response.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
          // G009.00.0 Add-End
          // G012.00.0 Add-Start
          return ids
          // G012.00.0 Add-End
        } else {
        }
        // G012.00.0 Add-Start
        this.registerSelectDisplayed = true
        return ids
        // G012.00.0 Add-End
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
        // G012.00.0 Add-Start
        return []
        // G012.00.0 Add-End
      }
    },
    changeKeyword () {
      // G001.00.0 Update-Start
      if (!this.results) {
        this.tempResults = null
        return
      }
      // G001.00.0 Update-End
      this.tempResults = this.results.filter(item => {
        // G002.00.0 Update-Start
        // return item.formattedOutput.includes(this.keyword)
        if (this.keywordCaseSensitive) {
          return item.formattedOutput.includes(this.keyword)
        } else {
          const formattedOutputLowerCase = item.formattedOutput.toLowerCase()
          const keywordLowerCase = this.keyword.toLowerCase()
          return formattedOutputLowerCase.includes(keywordLowerCase)
        }
        // G002.00.0 Update-End
      })
    },
    async searchProc () {
      if (this.targetStoreCodes.length === 0) {
        // G001.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F32271.E004'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W009'), '', false, null, false, null)
        // G001.00.0 Update-End
        return
      }
      if (this.selectedRegisterIds.length === 0) {
        // G001.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F32271.E001'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W007'), '', false, null, false, null)
        // G001.00.0 Update-End
        return
      }
      if (this.businessDateStart === '') {
        // G001.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F32271.E002'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W008'), '', false, null, false, null)
        // G001.00.0 Update-End
        return
      }
      if (this.businessDateEnd === '') {
        // G001.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F32271.E002'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W008'), '', false, null, false, null)
        // G001.00.0 Update-End
        return
      }
      // G005.00.0 Update-Start
      if (this.businessDateStart > this.businessDateEnd) {
        // G007.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F32271.W012'), '', false, null, false, null)
        // G010.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F32271.W014'), '', false, null, false, null)
        // G011.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F32271.W015'), '', false, null, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W014'), '', false, null, false, null)
        // G011.00.0 Update-End
        // G010.00.0 Update-End
        // G007.00.0 Update-End
        return
      }
      // G005.00.0 Update-End
      // G001.00.0 Update-Start
      // if (this.businessTimeStart === '') {
      //   this.$refs.pop.open(3, '', this.$i18n.t('F32271.E003'), '', false, null, false, null)
      //   return
      // }
      // if (this.businessTimeEnd === '') {
      //   this.$refs.pop.open(3, '', this.$i18n.t('F32271.E003'), '', false, null, false, null)
      //   return
      // }
      // axios.put(this.$i18n.t('prop.url') + path, {
      //   nodeId: this.targetStoreCodes[0],
      //   endpointId: this.selectedRegisterIds[0],
      //   businessDateStart: this.businessDateStart,
      //   businessDateEnd: this.businessDateEnd,
      //   businessTimeStart: this.businessTimeStart,
      //   businessTimeEnd: this.businessTimeEnd,
      //   transactionNoStart: this.transactionNoStart,
      //   transactionNoEnd: this.transactionNoEnd,
      //   offset: 0
      // }, commonUtils.methods.getApiHeader())
      //   .then(response => {
      //     this.results = response.data.responseModel.data
      //     this.tempResults = this.results
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
      this.results = await this.searchEJournal(
        this.targetStoreCodes[0],
        this.selectedRegisterIds[0],
        this.businessDateStart,
        this.businessDateEnd,
        this.businessTimeStart,
        this.businessTimeEnd,
        this.transactionNoStart,
        this.transactionNoEnd
      )
      this.resultsSelectIndex = -1
      this.changeKeyword()
      if (this.tempResults && this.tempResults.length === 0) {
        this.$refs.pop.open(2, '', this.$i18n.t('F32271.W006'), '', false, null, false, null)
      }
      // G001.00.0 Update-End
    },
    // G001.00.0 Update-Start
    async searchEJournal (nodeId, endpointId, businessDateStart, businessDateEnd, businessTimeStart, businessTimeEnd, transactionNoStart, transactionNoEnd) {
      try {
        let results = []
        let searchEndFlag = false
        this.$refs.pop.open(5, '', this.$i18n.t('O00004.W016'), '', false, () => {
          searchEndFlag = true
        }, false, null)
        let offset = 0
        // KSD V001.000 AS #84151
        let sessionTimeout = false
        // KSD V001.000 AE #84151
        while (!searchEndFlag) {
          const response = await axios.put(this.$i18n.t('prop.url') + path, {
            nodeId: nodeId,
            endpointId: endpointId,
            businessDateStart: businessDateStart,
            businessDateEnd: businessDateEnd,
            businessTimeStart: businessTimeStart,
            businessTimeEnd: businessTimeEnd,
            transactionNoStart: transactionNoStart,
            transactionNoEnd: transactionNoEnd,
            offset: offset
          }, commonUtils.methods.getApiHeader())
          if (searchEndFlag) {
            break
          }
          // KSD V001.000 AS #84151
          if (response.data.result.code === -90) {
            sessionTimeout = true
            break
          }
          // KSD V001.000 AE #84151
          if (response.data.result.code !== 0 && response.data.result.code !== 2) {
            this.$refs.pop.open(3, '', this.$i18n.t('F32271.E007'), '', false, null, false, null)
            return null
          }
          results = results.concat(response.data.responseModel.data)
          if (response.data.responseModel.size !== response.data.responseModel.limit) {
            searchEndFlag = true
            break
          }
          offset += 100
        }
        this.$refs.pop.closeFunction()
        // KSD V001.000 AS #84151
        if (sessionTimeout) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), -90, false, () => {
            console.log('inner push loginpage.')
            this.$router.push('/LoginPage')
          }, false, null)
          console.log('after push loginpage.')
          return null
        }
        // KSD V001.000 AE #84151
        return results
      } catch (error) {
        // KSD V001.000 DS #84151
      	// this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // KSD V001.000 DE #84151
        // KSD V001.000 AS #84151
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.E007'), '', false, null, false, null)
        // KSD V001.000 AE #84151
        console.log(error)
        return null
      }
    },
    // G001.00.0 Update-End
    async toSave () {
      // if (this.tempResults.length == 0) {
      //   this.$refs.pop.open(3, '保存', '電子ジャーナル情報がありません。', '', false, () => {}, false, () => {})
      //   return
      // }

      // G002.00.0 Update-Start
      // if (!this.password) {
      //   this.$refs.pop.open(3, '保存', 'パスワードを入力してください。', '', false, () => {}, false, () => {})
      //   return
      // }
      //
      // G013.00.0 Update-Start
      // this.$refs.saveDialog.open(this.resultsSelectIndex === -1)
      this.$refs.saveDialog.open(this.resultsSelectIndex === -1, this.targetStoreCodes, this.businessDateStart, this.businessDateEnd, this.selectedRegisterIds)
      // G013.00.0 Update-Update
    },
    async toSaveCallback (saveSelected, targetStoreCode, selectedRegisterId, businessDateStart, businessDateEnd, password) {
      if (!saveSelected) {
        const datas = await this.searchEJournal(
          targetStoreCode,
          selectedRegisterId,
          businessDateStart,
          businessDateEnd,
          undefined,
          undefined,
          undefined,
          undefined
        )
        if (datas) {
          if (datas.length > 0) {
            const allFormattedOutput = datas.map(item => item.formattedOutput).join('-------------------------------- \n')
            const fileName = 'JNL_' + businessDateStart.replace(/\//g, '') + '_' + businessDateEnd.replace(/\//g, '') + '_' + selectedRegisterId
            // G006.00.0 Update-Start
            // this.toCreateSaveResult(allFormattedOutput, datas.length, password, fileName);
            this.toCreateSaveResult(allFormattedOutput, password, fileName)
            // G006.00.0 Update-End
          } else {
            this.$refs.pop.open(2, '', this.$i18n.t('F32271.W006'), '', false, null, false, null)
          }
        }
      } else {
        const fileName = 'JNL_' + new Moment().format('YYYYMMDD') + '_' + this.selectedRegisterIds[0]
        // G006.00.0 Update-Start
        // this.toCreateSaveResult(this.tempResults[this.resultsSelectIndex].formattedOutput, 1, password, fileName);
        this.toCreateSaveResult(this.tempResults[this.resultsSelectIndex].formattedOutput, password, fileName)
        // G006.00.0 Update-End
      }
    },
    // G006.00.0 Update-Start
    // toCreateSaveResult(allFormattedOutput, size, password, fileName) {
    async toCreateSaveResult (allFormattedOutput, password, fileName) {
    // G006.00.0 Update-End
      // G006.00.0 Update-Start
      this.isLoading = true
      // G006.00.0 Update-End
      // G006.00.0 Update-Start
      // let allFormattedOutputRows = allFormattedOutput.split('\n');
      // let saveFormattedOutputs = [];
      // while (allFormattedOutputRows.length > 0) {
      //   // G006.00.0 Update-Start
      //   // saveFormattedOutputs.push(allFormattedOutputRows.splice(0, 62).join('\n'));
      //   let group = null;
      //   if (saveFormattedOutputs.length === 0) {
      //     group = [];
      //     saveFormattedOutputs.push(group);
      //   } else {
      //     group = saveFormattedOutputs[saveFormattedOutputs.length - 1];
      //     if (group.length === 58 && group[group.length - 1].length === 3) {
      //       group = [];
      //       saveFormattedOutputs.push(group);
      //     }
      //   }
      //   let page = null;
      //   if (group.length === 0) {
      //     page = [];
      //     group.push(page);
      //   } else {
      //     page = group[group.length - 1];
      //     if (page.length === 3) {
      //       page = [];
      //       group.push(page);
      //     }
      //   }
      //   page.push(allFormattedOutputRows.splice(0, 62).join('\n'));
      //   // G006.00.0 Update-End
      // }
      // this.saveFormattedOutputs = saveFormattedOutputs;
      // this.saveSize = size;
      // this.$nextTick(async () => {
      //   await this.toSaveResult(password, fileName);
      //   this.saveFormattedOutputs = [];
      //   this.saveSize = 0;
      //   // G006.00.0 Update-Start
      //   this.isLoading = false;
      //   // G006.00.0 Update-End
      // });
      try {
        const response = await axios.post(this.$i18n.t('prop.url') + pathEJournalSave, {
          saveData: allFormattedOutput
        }, commonUtils.methods.getApiHeader())

        if (response.data.result.code !== 0) {
          this.$refs.pop.open(3, '', this.$i18n.t('F32271.E011'), '', false, null, false, null)
          return null
        }
        const pdfBase64 = response.data.responseModel

        // 日本語の文字化けに対処するためBOMを作成する。
        let bom = new Uint8Array([0xEF, 0xBB, 0xBF])
        let bin = atob(pdfBase64.replace(/^.*,/, ''))
        let buffer = new Uint8Array(bin.length)
        for (var i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i)
        }
        let pdfBlob = new Blob([bom, buffer.buffer], { type: 'application/pdf' })
        await this.toSaveResult(pdfBlob, password, fileName)
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.E011'), '', false, null, false, null)
      }
      this.isLoading = false
      // G006.00.0 Update-End
    },
    // G006.00.0 Update-Start
    // async toSaveResult(password, fileName) {
    async toSaveResult (pdfBlob, password, fileName) {
    // G006.00.0 Update-End
      // G006.00.0 Update-Start
      // // G002.00.0 Update-End
      // var element = document.getElementById('pdf-result');
      // // G002.00.0 Update-Start
      // // var pdfBlob = await html2pdf().from(element).outputPdf('blob');
      // // G006.00.0 Update-Start
      // // var pdfBlob = await html2pdf().set({ pagebreak: { avoid: 'div' }, }).from(element).outputPdf('blob');
      // const groupElements = element.children;
      // let worker = html2pdf().set({ pagebreak: { avoid: 'div' }, }).from(groupElements[0]);
      // worker = worker.toPdf();
      // if (groupElements.length > 1) {
      //   for (let i = 1; i < groupElements.length; i++) {
      //     worker = worker.get('pdf')
      //       .then(pdf => { pdf.addPage() })
      //       .from(groupElements[i])
      //       .toContainer()
      //       .toCanvas()
      //       .toPdf();
      //   }
      // }
      // const pdfBlob = await worker.outputPdf('blob');
      // // G006.00.0 Update-End
      // // G002.00.0 Update-End
      // G006.00.0 Update-End

      const zipFileStream = new TransformStream()
      const zipFileBlobPromise = new Response(zipFileStream.readable).blob()
      const helloWorldReadable = pdfBlob.stream()

      const zipWriter = new zip.ZipWriter(zipFileStream.writable)
      // G001.00.0 Update-Start
      // await zipWriter.add("電子ジャーナル.pdf", helloWorldReadable, {
      await zipWriter.add(fileName + '.pdf', helloWorldReadable, {
        zipCrypto: true,
        // G001.00.0 Update-Start
        // G002.00.0 Update-Start
        // password: this.password,
        password: password
        // G002.00.0 Update-End
      })
      await zipWriter.close()

      const zipFileBlob = await zipFileBlobPromise

      // G001.00.0 Update-Start
      // FileSaver.saveAs(zipFileBlob, "電子ジャーナル_" + now.format('YYYYMMDD') + ".zip");
      // G006.00.0 Update-Start
      // const opts = {
      //   suggestedName: fileName,
      //   types: [
      //     {
      //       description: 'zip file',
      //       accept: { 'application/zip': ['.zip'] }
      //     }
      //   ]
      // }
      // const fileHandle = await window.showSaveFilePicker(opts)
      // const writable = await fileHandle.createWritable()
      // await writable.write(zipFileBlob)
      // await writable.close()
      // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
      FileSaver.saveAs(zipFileBlob, fileName + '.zip')
      // G006.00.0 Update-End
      // G001.00.0 Update-End

      // G002.00.0 Update-Start
      // this.password = null;
      // G002.00.0 Update-End
    },
    showDetailCondition () {
      this.$refs.conditionDialog.open()
    },
    // G002.00.0 Update-Start
    // saveCallback (businessTimeStart, businessTimeEnd, transactionNoStart, transactionNoEnd, keyword) {
    saveCallback (businessTimeStart, businessTimeEnd, transactionNoStart, transactionNoEnd, keyword, keywordCaseSensitive) {
      this.keywordCaseSensitive = keywordCaseSensitive
      // G002.00.0 Update-End
      this.businessTimeStart = businessTimeStart
      this.businessTimeEnd = businessTimeEnd
      this.transactionNoStart = transactionNoStart
      this.transactionNoEnd = transactionNoEnd
      this.keyword = keyword
    },
    // G001.00.0 Update-Start
    clickResultsRow (index, isCtrl) {
      if (isCtrl) {
        if (this.resultsSelectIndex === index) {
          this.resultsSelectIndex = -1
        } else {
          this.resultsSelectIndex = index
        }
      } else {
        this.resultsSelectIndex = index
      }
    },
    // G001.00.0 Update-End
    // G005.00.0 Update-Start
    businessDateDisabledFunc (date) {
      const now = new Moment()
      const aYearAgo = new Moment().add(-1, 'years').add(-1, 'days')
      return !(new Moment(date).isBetween(aYearAgo, now))
    }
    // G005.00.0 Update-End
  },
  // G001.00.0 Update-Start
  filters: {
    filterBusinessDate (businessDate) {
      businessDate = businessDate.substr(0, 4) + '/' + businessDate.substr(4, 2) + '/' + businessDate.substr(6, 2)
      return businessDate
    },
    filterBusinessTime (businessTime) {
      businessTime = businessTime.substr(0, 2) + ':' + businessTime.substr(2, 2)
      return businessTime
    },
    filterTotal: (total, type, that) => {
      let showStr = ''
      switch (type) {
        case 'SALE':
        case 'POST_VOID':
          if (total !== undefined && total !== null) {
            showStr = '¥' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          break
        case 'SIGNIN':
          // G004.00.0 Update-Start
          showStr = that.$i18n.t('F32271.S026')
          break
          // G004.00.0 Update-End
        case 'SIGNOUT':
          // G004.00.0 Update-Start
          // showStr = that.$i18n.t('F32271.S026');
          showStr = that.$i18n.t('F32271.S038')
          // G004.00.0 Update-End
          break
        case 'VOID':
          showStr = that.$i18n.t('F32271.S027')
          break
        case 'RECEIPT':
          showStr = that.$i18n.t('F32271.S028')
          break
        case 'SUSPEND':
          showStr = that.$i18n.t('F32271.S029')
          break
        case 'TILL_PAYIN':
          showStr = that.$i18n.t('F32271.S030')
          break
        case 'TILL_PAYOUT':
          showStr = that.$i18n.t('F32271.S031')
          break
        case 'SALE_REPRINT':
          showStr = that.$i18n.t('F32271.S032')
          break
        case 'CHANGE_RESERVE':
          showStr = that.$i18n.t('F32271.S033')
          break
        case 'STAMP':
          showStr = that.$i18n.t('F32271.S034')
          break
        case 'CALCULATE':
          showStr = that.$i18n.t('F32271.S035')
          break
        case 'MESSAGE':
          showStr = that.$i18n.t('F32271.S039')
          break
        // KSD V001.000 AS issue#1334対応
        case 'TILL_PAYIN_VOID':
          showStr = that.$i18n.t('F32271.S041')
          break
        case 'TILL_PAYOUT_VOID':
          showStr = that.$i18n.t('F32271.S042')
          break
        case 'TILL_LOAN_VOID':
          showStr = that.$i18n.t('F32271.S043')
          break
        case 'CHANGE_RESERVE_VOID':
          showStr = that.$i18n.t('F32271.S044')
          break
        case 'SALE_LATER':
          showStr = that.$i18n.t('F32271.S045')
          break
        case 'CASH_CHANGER_BALANCE':
          showStr = that.$i18n.t('F32271.S046')
          break
        case 'CASH_CHANGER_BALANCE_VOID':
          showStr = that.$i18n.t('F32271.S047')
          break
        case 'CASH_CHANGER_REMAIN':
          showStr = that.$i18n.t('F32271.S048')
          break
        case 'CASH_CHANGER_REMAIN_VOID':
          showStr = that.$i18n.t('F32271.S049')
          break
        case 'CASH_CHANGER_CONNECT':
          showStr = that.$i18n.t('F32271.S050')
          break
        case 'CASH_CHANGER_CONNECT_VOID':
          showStr = that.$i18n.t('F32271.S051')
          break
        case 'TILL_EXCHANGE':
          showStr = that.$i18n.t('F32271.S052')
          break
        case 'TILL_EXCHANGE_VOID':
          showStr = that.$i18n.t('F32271.S053')
          break
        case 'CODEPAY_ERRORHANDLING':
          showStr = that.$i18n.t('F32271.S054')
          break
        case 'CODEPAY_COMERROR':
          showStr = that.$i18n.t('F32271.S055')
          break
        case 'TID_SETTING_ACQUISITION':
          showStr = that.$i18n.t('F32271.S056')
          break
        case 'TERMINAL_IDENTIFICATION_NUMBER':
          showStr = that.$i18n.t('F32271.S057')
          break
        case 'TERMINAL_SETTING_INFORMATION':
          showStr = that.$i18n.t('F32271.S058')
          break
        case 'TERMINAL_INFO_DOWNLOAD':
          showStr = that.$i18n.t('F32271.S059')
          break
        case 'UNKNOWN_TRAN':
          showStr = that.$i18n.t('F32271.S060')
          break
        case 'TIMER_VOLUME_SETTING':
          showStr = that.$i18n.t('F32271.S061')
          break
        case 'EDY_FIRST_COMMUNICATIONS':
          showStr = that.$i18n.t('F32271.S062')
          break
        case 'EDY_REMOVAL':
          showStr = that.$i18n.t('F32271.S063')
          break
        case 'EDY_STATUS_ACQUISITION':
          showStr = that.$i18n.t('F32271.S064')
          break
        case 'OES_SET':
          showStr = that.$i18n.t('F32271.S065')
          break
        case 'OES_PROGRAM':
          showStr = that.$i18n.t('F32271.S066')
          break
        case 'OES_TIME':
          showStr = that.$i18n.t('F32271.S067')
          break
        case 'UNPAID_DELETE':
          showStr = that.$i18n.t('F32271.S068')
          break
        case 'UNPAID_LIST':
          showStr = that.$i18n.t('F32271.S069')
          break
        case 'CHANGE_ROOM':
          showStr = that.$i18n.t('F32271.S070')
          break
        case 'CALCULATE_SALES':
          showStr = that.$i18n.t('F32271.S071')
          break
        case 'EXTEND_TIME':
          showStr = that.$i18n.t('F32271.S072')
          break
        case 'CHECK_CHARGE':
          showStr = that.$i18n.t('F32271.S073')
          break
        case 'SERVICE_TIME':
          showStr = that.$i18n.t('F32271.S074')
          break
        case 'CHANGE_ROOM_COURSE':
          showStr = that.$i18n.t('F32271.S075')
          break
        case 'CHANGE_DRINK_COURSE':
          showStr = that.$i18n.t('F32271.S076')
          break
        case 'ENTER_ROOM':
          showStr = that.$i18n.t('F32271.S077')
          break
        case 'INT_ENTER_ROOM':
          showStr = that.$i18n.t('F32271.S078')
          break
        case 'INT_LEAVE_ROOM':
          showStr = that.$i18n.t('F32271.S079')
          break
        case 'CANCEL_ENTRY':
          showStr = that.$i18n.t('F32271.S080')
          break
        case 'SELF_START':
          showStr = that.$i18n.t('F32271.S081')
          break
        case 'SELF_END':
          showStr = that.$i18n.t('F32271.S082')
          break
        case 'CASH_HANDS_AMOUNT':
          showStr = that.$i18n.t('F32271.S083')
          break
        case 'EDY_DAILY_LOG':
          showStr = that.$i18n.t('F32271.S084')
          break
        case 'QUICPAY_DAILY_LOG':
          showStr = that.$i18n.t('F32271.S085')
          break
        case 'FORCE_TERMINATION':
          showStr = that.$i18n.t('F32271.S086')
          break
        case 'RECEIPT_STOP':
          showStr = that.$i18n.t('F32271.S087')
          break
        case 'RECEIPT_START':
          showStr = that.$i18n.t('F32271.S088')
          break
        case 'SIM_DUTCH':
          showStr = that.$i18n.t('F32271.S089')
          break
        case 'USERS_CODE':
          showStr = that.$i18n.t('F32271.S090')
          break
        case 'SALE_COPY':
          showStr = that.$i18n.t('F32271.S091')
          break
        case 'CALLING_MAINTENANCE':
          showStr = that.$i18n.t('F32271.S092')
          break
        case 'DEVICE_INFORMATION':
          showStr = that.$i18n.t('F32271.S093')
          break
        case 'UNKNOWN_ERROR_CREDIT':
          showStr = that.$i18n.t('F32271.S094')
          break
        case 'UNKNOWN_ERROR_UNIONPAY':
          showStr = that.$i18n.t('F32271.S095')
          break
        case 'HISTORY_INQUIRY_WAON':
          showStr = that.$i18n.t('F32271.S096')
          break
        case 'BALANCE_INQUIRY_NANACO':
          showStr = that.$i18n.t('F32271.S097')
          break
        case 'BALANCE_INQUIRY_WAON':
          showStr = that.$i18n.t('F32271.S098')
          break
        case 'BALANCE_INQUIRY_EDY':
          showStr = that.$i18n.t('F32271.S099')
          break
        case 'BALANCE_INQUIRY_TRANSPORTATION':
          showStr = that.$i18n.t('F32271.S100')
          break
        case 'ALARM_NANACO':
          showStr = that.$i18n.t('F32271.S101')
          break
        case 'ALARM_WAON':
          showStr = that.$i18n.t('F32271.S102')
          break
        case 'ALARM_EDY':
          showStr = that.$i18n.t('F32271.S103')
          break
        case 'ALARM_TRANSPORTATION':
          showStr = that.$i18n.t('F32271.S104')
          break
        case 'ERROR_NANACO':
          showStr = that.$i18n.t('F32271.S105')
          break
        case 'ERROR_QUICPAY':
          showStr = that.$i18n.t('F32271.S106')
          break
        case 'ERROR_WAON':
          showStr = that.$i18n.t('F32271.S107')
          break
        case 'ERROR_EDY':
          showStr = that.$i18n.t('F32271.S108')
          break
        case 'ERROR_TRANSPORTATION':
          showStr = that.$i18n.t('F32271.S109')
          break
        // KSD V001.000 AE issue#1334対応
        default:
          break
      }
      return showStr
    },
    filterFormattedOutput (formattedOutput) {
      // 文字部分を置き換える
      formattedOutput = formattedOutput.replace(/\n/g, '\n ')
      formattedOutput = formattedOutput.replace(/\\/g, '¥')
      formattedOutput = ' ' + formattedOutput
      return formattedOutput
    }
  },
  // G001.00.0 Update-End
  created () {
    this.$root.winId = 'F32271'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.$nextTick()
    // G002.00.0 Add-Start
    // let Script = document.createElement("script");
    // Script.setAttribute("src", "https://deno.land/x/zipjs@v2.6.52/dist/zip-full.min.js");
    // document.head.appendChild(Script);
    // G002.00.0 Add-End
    await this.initialize()
  }
}
