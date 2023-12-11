import axios from 'axios'
// KSD V001.000 DS
// import axios from 'axios'
// import commonUtils from './../Common/commonUtils'
// KSD V001.000 DE
import commonUtils from '@/resource/static/js/Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
// KSD V001.000 DS
// import dialogRegisterSelect from '@/resource/templates/PosReport/RegisterSelectDialog'
// // AS #1544,#1546
// import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
// // AE #1544,#1546
// import moment from 'moment'
// KSD V001.000 DE
// KSD V001.000 AS
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import CheckboxInput from '@/resource/templates/CommonInput/CheckboxInput'
import RadioButton from '@/resource/templates/CommonInput/RadioButton'
import RegisterSelect from '@/resource/templates/CommonInput/RegisterSelect'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import TextInput from '@/resource/templates/CommonInput/TextInput'
import roomSelect from '@/resource/templates/RoomInfoSubSetting/RoomSelect'
import moment from 'moment'
// KSD V001.000 AE
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230329  xu.jh(Neusoft)  G001.00.0  issue課題#1675を対応します.
 * 20230419  qinshh(Neusoft) G002.00.0  issue課題#1563を対応します.
 * 20230420  wangchunmei(Neusoft)  G003.00.0  issue課題#908を対応します.
 * 20230421  zxh(Neusoft)    G004.00.0  issue課題#1457、#1827を対応します.
 * 20230423  dingxin(Neusoft)  G005.00.0  issue課題#1662を対応します.
 * 20230510  wangchunmei(Neusoft)  G003.00.1  issue課題#908を対応します.
 * 20230614  wangchunmei(Neusoft)  G006.00.0  issue課題#1639を対応します.
 */
const posReportOutputPathName = 'F32231-output'
// KSD V001.000 AS
const divisionInfoSearchPath = 'Audit/divisionInfoSearch'
// KSD V001.000 AE
const endpointPath = 'Audit/Endpoint'

export default {
  name: 'PosReport',
  // KSD V001.000 AS
  mixins: [errorMappingUtils, transformUtils],
  // KSD V001.000 AE
  data () {
    return {
      // G005.00.0 Add-Start
      permissions: [],
      // G005.00.0 Add-End
      // KSD V001.000 DS
      // headquartersAuthority: true,
      // registerSelectDisplayed: false,

      // targetReport: -1,
      // targetReportList: [
      //   {name: '取引別レポート', conditions: ['store', 'register', 'duration']},
      //   {name: '部門別レポート', conditions: []},
      //   {name: 'PLU 別レポート', conditions: ['store', 'register', 'duration', 'plu']},
      //   {name: 'ユーザ別レポート', conditions: ['store', 'register', 'duration', 'responsible']},
      //   {name: '時間帯別レポート', conditions: ['store', 'register', 'duration']},
      //   {name: '客層時間帯別レポート', conditions: ['store', 'register', 'duration', 'customers']}
      // ],
      // targetReportKeys: [
      //   'TRANSACTION',
      //   'TRANSACTION',
      //   'PLU',
      //   'TRANSACTION',
      //   'HOURZONE',
      //   'TRANSACTION'
      // ],

      // targetStoreCodes: [],
      // availableRegisterIds: [],
      // selectedRegisterIds: [],
      // durationFrom: '',
      // durationTo: '',
      // pluCode: '',
      // responsibleNo: '',
      // customersCode: '',
      // // AS #1544,#1546
      // masters: {}
      // // AE #1544,#1546
      // KSD V001.000 DE
      // KSD V001.000 AS
      reportTypeData: [
        // POSレポート出力(取引別レポート)
        {
          reportName: 'TRANSACTION',
          reportFormat: 'JSON',
          reportType: 'TransactionReport',
          name: this.$i18n.t('F32231.S111'),
          conditions: ['store', 'register', 'durationType', 'duration']
        },
        // POSレポート出力(商品構成別レポート)
        {
          reportName: 'GROUP',
          reportFormat: 'JSON',
          reportType: 'GroupReport',
          name: this.$i18n.t('F32231.S112'),
          conditions: ['store', 'register', 'itemStructure', 'durationType', 'duration', 'groupHourZone', 'detailedOutput']
        },
        // POSレポート出力(PLU別レポート)
        {
          reportName: 'PLU',
          reportFormat: 'JSON',
          reportType: 'PluReport',
          name: this.$i18n.t('F32231.S113'),
          conditions: ['store', 'register', 'pluCode', 'durationType', 'duration', 'hourZone', 'timeDetail']
        },
        // POSレポート出力(時間帯別レポート)
        {
          reportName: 'HOURZONE',
          reportFormat: 'JSON',
          reportType: 'HourzoneReport',
          name: this.$i18n.t('F32231.S114'),
          conditions: ['store', 'register', 'date', 'hourZone', 'sales', 'aggregationTime']
        },
        // POSレポート出力(ユーザ別レポート)
        {
          reportName: 'USER',
          reportFormat: 'JSON',
          reportType: 'UserReport',
          name: this.$i18n.t('F32231.S115'),
          conditions: ['store', 'register', 'durationType', 'duration', 'hourZone', 'timeDetail']
        },
        // POSレポート出力(券種別レポート)
        {
          reportName: 'TICKET',
          reportFormat: 'JSON',
          reportType: 'TicketReport',
          name: this.$i18n.t('F32231.S116'),
          conditions: ['store', 'register', 'durationType', 'duration', 'ticketCode']
        },
        // POSレポート出力(部屋別レポート)
        {
          reportName: 'ROOM',
          reportFormat: 'JSON',
          reportType: 'RoomReport',
          name: this.$i18n.t('F32231.S117'),
          conditions: ['store', 'roomReportDuration', 'hourZone', 'roomNo']
        }
      ],
      request: {
        reportName: null, // レポート種類
        reportFormat: 'JSON', // 出力形式
        storeName: [], // ノードID
        predefinedStoreName: [],
        transactionCode: null, // 対象transactionNo
        printNoCheckFlg: false, // printNoを確認するか否か
        endpointId: [], // 端末コード
        storeTotalize: true, // 店舗計出力
        duration: { // 出力対象期間
          type: 0, // 年月日指定
          from: null, // 出力対象開始日
          to: null, // 出力対象終了日
          totalize: true // 合算指定
        },
        roomReportDuration: {
          from: null,
          to: null
        },
        classificationNo: '', // 商品構成
        groupHourZoneDuration: { // 時間帯範囲
          from: '', // 出力対象開始時間帯
          to: '' // 出力対象終了時間帯
        },
        hourZoneDuration: { // 時間帯範囲
          from: '', // 出力対象開始時間帯
          to: '' // 出力対象終了時間帯
        },
        detailOutput: 0, // 明細出力
        codeDuration: { // コード
          from: null, // 出力対象開始コード
          to: null // 出力対象終了コード
        },
        timeDetail: 0, // 時間明細指定
        sale: 1, // 売上指定
        aggregateTime: 0, // 集計時間指定
        roomNo: [], // 部屋No
        pluCode: { // PLUコード
          from: null,
          to: null
        },
        singleDate: null
      },
      defaultRequestData: {},
      durationTypeOptions: [
        { name: this.$i18n.t('F32231.S171'), value: 0 },
        { name: this.$i18n.t('F32231.S172'), value: 1 },
        { name: this.$i18n.t('F32231.S173'), value: 2 }
      ],
      itemStructureOptions: [],
      hourZoneOptions: [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
        { name: '11', value: 11 },
        { name: '12', value: 12 },
        { name: '13', value: 13 },
        { name: '14', value: 14 },
        { name: '15', value: 15 },
        { name: '16', value: 16 },
        { name: '17', value: 17 },
        { name: '18', value: 18 },
        { name: '19', value: 19 },
        { name: '20', value: 20 },
        { name: '21', value: 21 },
        { name: '22', value: 22 },
        { name: '23', value: 23 },
        { name: '24', value: 24 }
      ],
      detailedOutputOptions: [
        { name: this.$i18n.t('F32231.S211'), value: 0 },
        { name: this.$i18n.t('F32231.S212'), value: 1 },
        { name: this.$i18n.t('F32231.S213'), value: 2 }
      ],
      timeDetailOptions: [
        { name: this.$i18n.t('F32231.S221'), value: 0 },
        { name: this.$i18n.t('F32231.S222'), value: 1 }
      ],
      saleOptions: [
        { name: this.$i18n.t('F32231.S231'), value: 1 },
        { name: this.$i18n.t('F32231.S232'), value: 2 },
        { name: this.$i18n.t('F32231.S233'), value: 3 },
        { name: this.$i18n.t('F32231.S234'), value: 4 }
      ],
      aggregateTimeOptions: [
        { name: this.$i18n.t('F32231.S241'), value: 0 },
        { name: this.$i18n.t('F32231.S242'), value: 1 }
      ],
      timeZoneOptions: [

      ],
      errorMsg: {
        plu: '',
        duration: '',
        roomReportDuration: '',
        codeDuration: ''
      },
      rangeErrors: {
        durationFrom: false,
        durationTo: false,
        pluFrom: false,
        pluTo: false,
        codeDurationFrom: false,
        codeDurationTo: false
      },
      durationFormatErrorFlag: false,
      masterRooms: [],
      headquartersAuthority: 0,
      storeCodes: [],
      sortedStoreCodes: [],
      hourZoneDisableBtn: false,
      groupHourZoneDisableBtn: false,
      productDisableBtn: false,
      productName: '',
      oldDurationValues: {
        from: '',
        to: ''
      }
      // KSD V001.000 AE
    }
  },
  computed: {
    targetReportConditions () {
      // KSD V001.000 DS
      // return this.targetReport === -1 ? [] : this.targetReportList[this.targetReport].conditions
      // },
      // KSD V001.000 DE
      // KSD V001.000 AS
      var targetReportData = this.reportTypeData.find(data => data.reportName === this.request.reportName)
      return (targetReportData && targetReportData.reportName) ? targetReportData.conditions : null
      // KSD V001.000 AE
    }
    // KSD V001.000 DS
    // selectedRegisterIdsText () {
    //   return this.selectedRegisterIds.join('、')
    // }
    // KSD V001.000 DE
  },

  components: {
    maintButton,
    popup,
    dateInput,
    storeSelect,
    // KSD V001.000 DS
    // dialogRegisterSelect,
    // // AS #1544,#1546
    // dialogStoreSelect
    // // AS #1544,#1546
    // KSD V001.000 DE
    // KSD V001.000 AS
    CheckboxInput,
    FormGroupLayout,
    RadioButton,
    RegisterSelect,
    SelectInput,
    TextInput,
    roomSelect,
    dialogStoreSelect
    // KSD V001.000 AE
  },
  methods: {
    // KSD V001.000 DS
    // // CS #1544,#1546
    // // async initialize () {},
    // async initialize () {
    //   // G006.00.0 Update-Start
    //   // this.masters = await this.$refs.dialogStoreSelect.getMasters(true)
    //   this.masters = await this.$refs.dialogStoreSelect.getMastersNoAuth(true)
    //   // G006.00.0 Update-End
    // },
    // // CE #1544,#1546
    // KSD V001.000 DE
    // KSD V001.000 AS
    async initialize () {
      this.storeCodes = (await this.$refs.dialogStoreSelect.getMastersNoAuth(true)).storeMasters.map(obj => obj.name)
      this.sortedStoreCodes = this.storeCodes.map(value => ({ original: value, parsed: parseInt(value, 10) }))
        .sort((a, b) => a.parsed - b.parsed)
        .map(obj => obj.original)
      this.defaultRequestData = JSON.parse(JSON.stringify(this.request))
    },
    // KSD V001.000 AE
    // KSD V001.000 DS
    // // CE #1544,#1546
    // async onShowRegisterIdsDialog () {
    //   // G003.00.0 Delete-Start
    //   // this.registerSelectDisplayed = true
    //   // G003.00.0 Delete-End
    //   this.availableRegisterIds = await this.getRegisterIds()
    // },
    // async getRegisterIds () {
    //   try {
    //     const params = { nodeIds: this.targetStoreCodes }
    //     // G003.00.0 Add-Start
    //     let ids = []
    //     // G003.00.0 Add-End
    //     let response = await axios.put(this.$i18n.t('prop.url') + endpointPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
    //     if (response.data.result.code === 0) {
    //       // 0:正常
    //       // G003.00.0 Delete-Start
    //       // var ids = []
    //       // G003.00.0 Delete-End
    //       for (var i = 0; i < response.data.responseModel.length; i++) {
    //         if (!ids.includes(response.data.responseModel[i].endpointId)) {
    //           ids.push(response.data.responseModel[i].endpointId)
    //         }
    //       }
    //       // G003.00.0 Delete-Start
    //       // return ids
    //       // G003.00.0 Delete-End
    //     } else if (response.data.result.code === 2) {
    //       // 2:該当する端末管理情報なし
    //       // G003.00.0 Delete-Start
    //       // return []
    //       // G003.00.0 Delete-End
    //     // G004.00.0 Add-Start
    //     } else if (response.data.result.code === -90) {
    //       this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
    //         this.$router.push('/LoginPage')
    //       }, false, null)
    //       return ids
    //     // G004.00.0 Add-End
    //     } else {
    //     }
    //     // G003.00.0 Add-Start
    //     this.registerSelectDisplayed = true
    //     return ids
    //     // G003.00.0 Add-End
    //   } catch (error) {
    //     this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
    //     console.log(error)
    //     // G003.00.1 Add-Start
    //     return []
    //     // G003.00.1 Add-End
    //   }
    // },
    // KSD V001.000 DE
    backToMenu () {
      // G002.00.0 Add-Start
      window.open('/TopPage', '_self')
      // G002.00.0 Add-End
      // this.$router.push('/TopPage')
    },
    // KSD V001.000 DS
    // async goToOutput () {
    //   // G001.00.0 Add-Start
    //   if (moment(this.durationTo).isBefore(moment(this.durationFrom))) {
    //     // 操作期間日付指定(From) >操作期間日付指定(to)の場合
    //     this.$refs.pop.closeFunction()
    //     // G004.00.0 Update-Start
    //     // this.$refs.pop.open(3, '', this.$i18n.t('F00002.S082'), -99, false, null)
    //     this.$refs.pop.open(3, '', this.$i18n.t('F00002.S098'), -99, false, null)
    //     // G004.00.0 Update-End
    //     return false
    //   }
    //   // G001.00.0 Add-End
    //   // Step1 では取引別レポートのみ実装
    //   if (this.targetReport !== 0) {
    //     alert('Step1 対象外')
    //   } else {
    //     // AS #1544,#1546
    //     if (!this.targetStoreCodes.length) {
    //       this.targetStoreCodes = this.masters.storeMasters.map(obj => obj.name)
    //       this.selectedRegisterIds = await this.getRegisterIds()
    //     }
    //     if (!this.selectedRegisterIds.length) {
    //       this.selectedRegisterIds = await this.getRegisterIds()
    //     }
    //     // AE #1544,#1546
    //     this.$router.push({name: posReportOutputPathName,
    //       params: {
    //         targetReport: this.targetReportList[this.targetReport].name,
    //         targetReportKey: this.targetReportKeys[this.targetReport],
    //         storeCodes: this.targetStoreCodes,
    //         // CS #1544,#1546
    //         // masters: this.$refs.storeSelectDlg[0].masters,
    //         masters: this.masters,
    //         // CE #1544,#1546
    //         registerIds: this.selectedRegisterIds,
    //         durationFrom: this.durationFrom,
    //         durationTo: this.durationTo
    //       }})
    //   }
    // },
    // KSD V001.000 DE
    // KSD V001.000 AS
    async handleStoreChange (store) {
      if (store && store.length <= 0) return
      this.request.roomNo = []
      if (this.request.storeName.length > 1) {
        this.request.storeTotalize = true
      }
      if (this.request.storeName.toString() !== this.request.predefinedStoreName.toString()) {
        this.request.endpointId = []
        if (this.targetReportConditions.includes('roomNo') && this.$refs.roomSelectDialog[0]) {
          this.$refs.roomSelectDialog[0].clearRoomSelect()
        }
      }
      this.request.predefinedStoreName = this.request.storeName
      if (this.targetReportConditions.includes('itemStructure') && (this.headquartersAuthority === 1)) {
        let nodeId = ''
        this.storeNode = this.request.storeName.map(value => ({ original: value, parsed: parseInt(value, 10) }))
          .sort((a, b) => a.parsed - b.parsed)
          .map(obj => obj.original)
        this.storeNodeValue = this.storeNode[0]
        nodeId = (this.request.storeName.length !== 0) ? this.storeNodeValue : this.sortedStoreCodes[0]
        try {
          const productGroupResponse = await axios.post(this.$i18n.t('prop.url') + divisionInfoSearchPath, {
            nodeId: nodeId
          }, commonUtils.methods.getApiHeader())
          if ((productGroupResponse.data.result.code === 0) && (productGroupResponse.data.responseModel !== undefined) && (productGroupResponse.data.responseModel.value.length > 1)) {
            const usedFlgTrueOption = productGroupResponse.data.responseModel.value.find((option) => {
              return option.usedFlg
            })
            this.itemStructureOptions = productGroupResponse.data.responseModel.value.filter((option) => {
              return option.productClassificationNumber >= usedFlgTrueOption.productClassificationNumber
            })
            this.productDisableBtn = false
          } else if (productGroupResponse.data.result.code === 2) {
            this.itemStructureOptions = []
            this.productDisableBtn = true
          } else {
            this.globalErrorMapping(productGroupResponse.data.result)
            this.request.reportName = null
            this.request = JSON.parse(JSON.stringify(this.defaultRequestData))
          }
        } catch (error) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          this.request.reportName = null
          this.request = JSON.parse(JSON.stringify(this.defaultRequestData))
          console.error(error)
        }
      }
    },
    roomNoCatchError () {
      this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
    },
    async handleReportChange () {
      if (this.targetReportConditions.includes('itemStructure')) {
        await this.$nextTick()
        let nodeId = ''
        this.storeNode = this.request.storeName.map(value => ({ original: value, parsed: parseInt(value, 10) }))
          .sort((a, b) => a.parsed - b.parsed)
          .map(obj => obj.original)
        this.storeNodeValue = this.storeNode[0]
        nodeId = (this.request.storeName.length !== 0) ? this.storeNodeValue : this.sortedStoreCodes[0]
        try {
          let productGroupResponse = await axios.post(this.$i18n.t('prop.url') + divisionInfoSearchPath, {
            nodeId: nodeId
          }, commonUtils.methods.getApiHeader())
          if ((productGroupResponse.data.result.code === 0) && (productGroupResponse.data.responseModel !== undefined) && (productGroupResponse.data.responseModel.value.length > 1)) {
            if (productGroupResponse.data.responseModel !== undefined) {
              const usedFlgTrueOption = productGroupResponse.data.responseModel.value.find((option) => {
                return option.usedFlg
              })
              this.itemStructureOptions = productGroupResponse.data.responseModel.value.filter((option) => {
                return option.productClassificationNumber >= usedFlgTrueOption.productClassificationNumber
              })
            }
            this.productDisableBtn = false
          } else if (productGroupResponse.data.result.code === 2) {
            this.itemStructureOptions = []
            this.productDisableBtn = true
          } else {
            this.globalErrorMapping(productGroupResponse.data.result)
            this.request.reportName = null
            this.request = JSON.parse(JSON.stringify(this.defaultRequestData))
          }
        } catch (error) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          this.request.reportName = null
          this.request = JSON.parse(JSON.stringify(this.defaultRequestData))
          console.error(error)
        }
      }
    },
    async getRegisterIds () {
      try {
        const params = { nodeIds: this.request.storeName }
        let ids = []
        const response = await axios.put(this.$i18n.t('prop.url') + endpointPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          for (var i = 0; i < response.data.responseModel.length; i++) {
            if (!ids.includes(response.data.responseModel[i].endpointId)) {
              ids.push(response.data.responseModel[i].endpointId)
            }
          }
        } else if (response.data.result.code === 2) {
        } else {
          this.globalErrorMapping(response.data.result)
          return false
        }
        this.registerSelectDisplayed = true
        return ids
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
        return []
      }
    },
    handleProductChange (name) {
      this.productName = name
    },
    async goToOutput (e) {
      let dailyValidationResult = ''
      let requestParams = {}
      requestParams = Object.assign(requestParams, { 'reportName': JSON.parse(JSON.stringify(this.request.reportName)) })
      requestParams = Object.assign(requestParams, { 'reportFormat': JSON.parse(JSON.stringify(this.request.reportFormat)) })
      requestParams = Object.assign(requestParams, { 'storeName': JSON.parse(JSON.stringify(this.request.storeName)) })
      for (let key in this.errorMsg) { this.errorMsg[key] = '' }
      for (let key in this.rangeErrors) { this.rangeErrors[key] = false }
      this.focusField = []
      this.durationFormatErrorFlag = false
      if (this.targetReportConditions.includes('register')) {
        requestParams = Object.assign(requestParams, { 'endpointId': JSON.parse(JSON.stringify(this.request.endpointId)) })
        requestParams = Object.assign(requestParams, { 'storeTotalize': JSON.parse(JSON.stringify(this.request.storeTotalize)) })
        if ((this.request.storeName.length === 1) && (requestParams.endpointId.length === 0) && !this.request.storeTotalize) {
          requestParams.endpointId = await this.getRegisterIds()
        }
      }
      if (this.targetReportConditions.includes('itemStructure')) {
        requestParams = Object.assign(requestParams, { 'classificationNo': JSON.parse(JSON.stringify(this.request.classificationNo)) })
        requestParams.classificationNo = Number(requestParams.classificationNo)
      }
      if (this.targetReportConditions.includes('pluCode')) {
        requestParams = Object.assign(requestParams, { 'codeDuration': JSON.parse(JSON.stringify(this.request.pluCode)) })
        if (requestParams.codeDuration.from === null || requestParams.codeDuration.from === '') {
          requestParams.codeDuration.from = '0000000000001'
        } else {
          this.request.pluCode.from = requestParams.codeDuration.from.padStart(13, '0')
          requestParams.codeDuration.from = requestParams.codeDuration.from.padStart(13, '0')
        }
        if (requestParams.codeDuration.to === null || requestParams.codeDuration.to === '') {
          requestParams.codeDuration.to = '9999999999999'
        } else {
          this.request.pluCode.to = requestParams.codeDuration.to.padStart(13, '0')
          requestParams.codeDuration.to = requestParams.codeDuration.to.padStart(13, '0')
        }
        if (Number(requestParams.codeDuration.from) === 0 && Number(requestParams.codeDuration.to) === 0) {
          this.rangeErrors.pluFrom = true
          this.rangeErrors.pluTo = true
          this.errorMsg.plu = this.$i18n.t('F32231.E151')
          this.focusField.push(this.$refs.pluFrom[0])
        } else if (Number(requestParams.codeDuration.from) === 0) {
          this.rangeErrors.pluFrom = true
          this.errorMsg.plu = this.$i18n.t('F32231.E152')
          this.focusField.push(this.$refs.pluFrom[0])
        } else if (Number(requestParams.codeDuration.to) === 0) {
          this.rangeErrors.pluTo = true
          this.errorMsg.plu = this.$i18n.t('F32231.E153')
          this.focusField.push(this.$refs.pluTo[0])
        } else if (Number(requestParams.codeDuration.from) > Number(requestParams.codeDuration.to)) {
          this.rangeErrors.pluFrom = true
          this.rangeErrors.pluTo = true
          this.errorMsg.plu = this.$i18n.t('F32231.E154')
          this.focusField.push(this.$refs.pluFrom[0])
        }
      }
      if (this.targetReportConditions.includes('duration')) {
        requestParams = Object.assign(requestParams, { 'duration': {} })
        requestParams.duration.totalize = this.request.duration.totalize
        requestParams.duration.type = this.request.duration.type
        let currentDate = new Date()
        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth() + 1
        let inputYearFrom = ''
        let inputMonthFrom = ''
        let inputYearTo = ''
        let inputMonthTo = ''
        if (requestParams.duration.type === 0) {
          dailyValidationResult = validationUtils.methods.dailyDurationValidation(this.request.duration.from, this.request.duration.to)
          if (typeof (dailyValidationResult) !== 'number') {
            requestParams.duration.from = dailyValidationResult.durationFrom
            requestParams.duration.to = dailyValidationResult.durationTo
          } else {
            if (dailyValidationResult === 1) {
              this.request.duration.from = ''
              this.focusField.push(this.$refs.durationYMDFrom[0])
            } else if (dailyValidationResult === 2) {
              this.request.duration.to = ''
              this.focusField.push(this.$refs.durationYMDTo[0])
            } else if (dailyValidationResult === 3) {
              this.request.duration.from = ''
              this.focusField.push(this.$refs.durationYMDFrom[0])
            } else if (dailyValidationResult === 4) {
              this.request.duration.to = ''
              this.focusField.push(this.$refs.durationYMDTo[0])
            }
          }
        } else if (requestParams.duration.type === 1) {
          if (this.request.duration.from.includes('-')) {
            let durationDateFrom = this.request.duration.from.split('-')
            inputYearFrom = durationDateFrom[0]
            inputMonthFrom = durationDateFrom[1]
            if (inputMonthFrom !== null) { inputMonthFrom = inputMonthFrom.padStart(2, '0') }
            this.request.duration.from = inputYearFrom + '-' + inputMonthFrom
            requestParams.duration.from = inputYearFrom + '-' + inputMonthFrom
          }
          if (this.request.duration.to.includes('-')) {
            let durationDateTo = this.request.duration.to.split('-')
            inputYearTo = durationDateTo[0]
            inputMonthTo = durationDateTo[1]
            if (inputMonthTo !== null) { inputMonthTo = inputMonthTo.padStart(2, '0') }
            this.request.duration.to = inputYearTo + '-' + inputMonthTo
            requestParams.duration.to = inputYearTo + '-' + inputMonthTo
          }
          if ((this.request.duration.from === null || this.request.duration.from === '') && (this.request.duration.to === null || this.request.duration.to === '')) {
            if (currentMonth !== 12) {
              requestParams.duration.from = (currentYear - 1) + '-' + String(currentMonth + 1).padStart(2, '0')
            } else {
              requestParams.duration.from = currentYear + '-' + '01'
            }
            requestParams.duration.to = currentYear + '-' + String(currentMonth).padStart(2, '0')
          } else if (this.request.duration.to === null || this.request.duration.to === '') {
            if (validationUtils.methods.yyyymmCheck(requestParams.duration.from)) {
              if ((Number(inputYearFrom) >= 2000) && ((Number(inputYearFrom) < currentYear) || ((Number(inputYearFrom) === currentYear) && (Number(inputMonthFrom) <= currentMonth)))) {
                let older11MonthsCheck = false
                if ((Number(inputYearFrom) < currentYear - 1) || ((Number(inputYearFrom) === currentYear - 1) && (inputMonthFrom <= currentMonth))) {
                  older11MonthsCheck = true
                }
                if (older11MonthsCheck === true) {
                  if (inputMonthFrom === '01') {
                    requestParams.duration.to = inputYearFrom + '-' + '12'
                  } else {
                    requestParams.duration.to = (Number(inputYearFrom) + 1) + '-' + String(Number(inputMonthFrom) - 1).padStart(2, '0')
                  }
                } else {
                  requestParams.duration.to = currentYear + '-' + String(currentMonth).padStart(2, '0')
                }
              } else {
                this.focusField.push(this.$refs.durationYMFrom[0])
              }
            } else {
              this.rangeErrors.durationFrom = true
              this.errorMsg.duration = this.$i18n.t('F32231.E003')
              this.focusField.push(this.$refs.durationYMFrom[0])
              this.durationFormatErrorFlag = true
            }
          } else if (this.request.duration.from === null || this.request.duration.from === '') {
            if (validationUtils.methods.yyyymmCheck(requestParams.duration.to)) {
              if ((Number(inputYearTo) >= 2000) && ((Number(inputYearTo) < currentYear) || ((Number(inputYearTo) === currentYear) && (Number(inputMonthTo) <= currentMonth)))) {
                if (inputYearTo !== '2000') {
                  if (inputMonthTo !== '12') {
                    requestParams.duration.from = (Number(inputYearTo) - 1) + '-' + String(Number(inputMonthTo) + 1).padStart(2, '0')
                    let durationDateFrom = requestParams.duration.from.split('-')
                    inputYearFrom = durationDateFrom[0]
                    inputMonthFrom = durationDateFrom[1]
                  } else {
                    requestParams.duration.from = inputYearTo + '-' + '01'
                    let durationDateFrom = requestParams.duration.from.split('-')
                    inputYearFrom = durationDateFrom[0]
                    inputMonthFrom = durationDateFrom[1]
                  }
                } else {
                  requestParams.duration.from = '2000-01'
                  let durationDateFrom = requestParams.duration.from.split('-')
                  inputYearFrom = durationDateFrom[0]
                  inputMonthFrom = durationDateFrom[1]
                }
              } else {
                this.focusField.push(this.$refs.durationYMTo[0])
              }
            } else {
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E004')
              this.focusField.push(this.$refs.durationYMTo[0])
              this.durationFormatErrorFlag = true
            }
          }
          if (this.focusField.length === 0) {
            if ((!validationUtils.methods.yyyymmCheck(requestParams.duration.from)) && (!validationUtils.methods.yyyymmCheck(requestParams.duration.to))) {
              this.rangeErrors.durationFrom = true
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E002')
              this.focusField.push(this.$refs.durationYMFrom[0])
              this.durationFormatErrorFlag = true
            } else if (!validationUtils.methods.yyyymmCheck(requestParams.duration.from)) {
              this.rangeErrors.durationFrom = true
              this.errorMsg.duration = this.$i18n.t('F32231.E003')
              this.focusField.push(this.$refs.durationYMFrom[0])
              this.durationFormatErrorFlag = true
            } else if (!validationUtils.methods.yyyymmCheck(requestParams.duration.to)) {
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E004')
              this.focusField.push(this.$refs.durationYMTo[0])
              this.durationFormatErrorFlag = true
            }
          }
          if (this.durationFormatErrorFlag === false) {
            if (inputYearFrom && inputYearTo && ((Number(inputYearFrom) < 2000) || (Number(inputYearFrom) > currentYear)) && ((Number(inputYearTo) < 2000) || (Number(inputYearTo) > currentYear))) {
              this.rangeErrors.durationFrom = true
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E009')
              this.focusField.push(this.$refs.durationYMFrom[0])
            } else if (inputYearFrom && ((Number(inputYearFrom) < 2000) || (Number(inputYearFrom) > currentYear))) {
              this.rangeErrors.durationFrom = true
              this.errorMsg.duration = this.$i18n.t('F32231.E010')
              this.focusField.push(this.$refs.durationYMTo[0])
            } else if (inputYearTo && ((Number(inputYearTo) < 2000) || (Number(inputYearTo) > currentYear))) {
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E011')
              this.focusField.push(this.$refs.durationYMTo[0])
            } else if (inputYearFrom && inputYearTo && inputMonthFrom && inputMonthTo && (Number(inputYearFrom) === currentYear) && (Number(inputYearTo) === currentYear) && (Number(inputMonthFrom) > currentMonth) && (Number(inputMonthTo) > currentMonth)) {
              this.rangeErrors.durationFrom = true
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E009')
              this.focusField.push(this.$refs.durationYMFrom[0])
            } else if (inputYearFrom && inputMonthFrom && (Number(inputYearFrom) === currentYear) && (Number(inputMonthFrom) > currentMonth)) {
              this.rangeErrors.durationFrom = true
              this.errorMsg.duration = this.$i18n.t('F32231.E010')
              this.focusField.push(this.$refs.durationYMTo[0])
            } else if (inputYearTo && inputMonthTo && (Number(inputYearTo) === currentYear) && (Number(inputMonthTo) > currentMonth)) {
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E011')
              this.focusField.push(this.$refs.durationYMTo[0])
            } else if (inputYearFrom && inputYearTo && inputMonthFrom && ((Number(inputYearFrom) > Number(inputYearTo)) || ((Number(inputYearFrom) === Number(inputYearTo)) && (Number(inputMonthFrom) > Number(inputMonthTo))))) {
              this.rangeErrors.durationFrom = true
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E014')
              this.focusField.push(this.$refs.durationYMFrom[0])
            } else if (inputYearFrom && inputYearTo && inputMonthFrom && inputMonthTo && ((Number(inputYearTo) - Number(inputYearFrom) > 1) || ((Number(inputYearTo) - Number(inputYearFrom) === 1) && (Number(inputMonthFrom) <= Number(inputMonthTo))))) {
              this.rangeErrors.durationFrom = true
              this.rangeErrors.durationTo = true
              this.errorMsg.duration = this.$i18n.t('F32231.E015')
              this.focusField.push(this.$refs.durationYMFrom[0])
            } else {
              requestParams.duration.from = requestParams.duration.from + '-00'
              requestParams.duration.to = requestParams.duration.to + '-00'
            }
          }
        } else if (requestParams.duration.type === 2) {
          if (this.request.duration.from === null || this.request.duration.from === '') {
            requestParams.duration.from = String(currentYear)
          } else {
            requestParams.duration.from = this.request.duration.from.padStart(4, '0')
            this.request.duration.from = requestParams.duration.from
          }
          if (!validationUtils.methods.yyyyCheck(requestParams.duration.from)) {
            this.request.duration.from = requestParams.duration.from
            this.rangeErrors.durationFrom = true
            this.errorMsg.duration = this.$i18n.t('F32231.E005')
            this.focusField.push(this.$refs.durationY[0])
            this.durationFormatErrorFlag = true
          }
          if (this.durationFormatErrorFlag === false) {
            if ((requestParams.duration.from < 2000) || (requestParams.duration.from > currentYear)) {
              this.request.duration.from = requestParams.duration.from
              this.rangeErrors.durationFrom = true
              this.errorMsg.duration = this.$i18n.t('F32231.E012')
              this.focusField.push(this.$refs.durationY[0])
            } else {
              requestParams.duration.from = requestParams.duration.from + '-00-00'
            }
          }
          requestParams.duration.to = requestParams.duration.from
        }
      }
      if (this.targetReportConditions.includes('roomReportDuration')) {
        requestParams = Object.assign(requestParams, { 'duration': {} })
        dailyValidationResult = validationUtils.methods.dailyDurationValidation(this.request.roomReportDuration.from, this.request.roomReportDuration.to)
        if (typeof (dailyValidationResult) !== 'number') {
          requestParams.duration.from = dailyValidationResult.durationFrom
          requestParams.duration.to = dailyValidationResult.durationTo
        } else {
          if (dailyValidationResult === 1) {
            this.request.roomReportDuration.from = ''
            this.focusField.push(this.$refs.roomReportDurationYMDFrom[0])
          } else if (dailyValidationResult === 2) {
            this.request.roomReportDuration.to = ''
            this.focusField.push(this.$refs.roomReportDurationYMDTo[0])
          } else if (dailyValidationResult === 3) {
            this.request.roomReportDuration.from = ''
            this.focusField.push(this.$refs.roomReportDurationYMDFrom[0])
          } else if (dailyValidationResult === 4) {
            this.request.roomReportDuration.to = ''
            this.focusField.push(this.$refs.roomReportDurationYMDTo[0])
          }
        }
      }
      if (this.targetReportConditions.includes('date')) {
        requestParams = Object.assign(requestParams, { 'duration': {} })
        requestParams.duration.totalize = true
        requestParams.duration.type = 0
        if (!this.request.singleDate) {
          let currentDate = (new Date()).toISOString().split('T')[0]
          requestParams.duration.from = currentDate
          requestParams.duration.to = currentDate
        } else {
          dailyValidationResult = validationUtils.methods.dailyDurationValidation(this.request.singleDate, this.request.singleDate)
          if (typeof (dailyValidationResult) !== 'number') {
            requestParams.duration.from = dailyValidationResult.durationFrom
            requestParams.duration.to = dailyValidationResult.durationTo
          }
        }
      }
      if (this.targetReportConditions.includes('groupHourZone')) {
        requestParams = Object.assign(requestParams, { 'hourZoneDuration': JSON.parse(JSON.stringify(this.request.groupHourZoneDuration)) })
        requestParams.hourZoneDuration.from = (requestParams.hourZoneDuration.from) ? Number(requestParams.hourZoneDuration.from) : null
        requestParams.hourZoneDuration.to = (requestParams.hourZoneDuration.to) ? Number(requestParams.hourZoneDuration.to) : null
      }
      if (this.targetReportConditions.includes('hourZone')) {
        requestParams = Object.assign(requestParams, { 'hourZoneDuration': JSON.parse(JSON.stringify(this.request.hourZoneDuration)) })
        requestParams.hourZoneDuration.from = (requestParams.hourZoneDuration.from) ? Number(requestParams.hourZoneDuration.from) : null
        requestParams.hourZoneDuration.to = (requestParams.hourZoneDuration.to) ? Number(requestParams.hourZoneDuration.to) : null
      }
      if (this.targetReportConditions.includes('detailedOutput')) {
        requestParams = Object.assign(requestParams, { 'detailOutput': JSON.parse(JSON.stringify(this.request.detailOutput)) })
      }
      if (this.targetReportConditions.includes('timeDetail')) {
        requestParams = Object.assign(requestParams, { 'timeDetail': JSON.parse(JSON.stringify(this.request.timeDetail)) })
      }
      if (this.targetReportConditions.includes('sales')) {
        requestParams = Object.assign(requestParams, { 'sale': JSON.parse(JSON.stringify(this.request.sale)) })
      }
      if (this.targetReportConditions.includes('aggregationTime')) {
        requestParams = Object.assign(requestParams, { 'aggregateTime': JSON.parse(JSON.stringify(this.request.aggregateTime)) })
      }
      if (this.targetReportConditions.includes('ticketCode')) {
        requestParams = Object.assign(requestParams, { 'codeDuration': JSON.parse(JSON.stringify(this.request.codeDuration)) })
        if (requestParams.codeDuration.from === null || requestParams.codeDuration.from === '') {
          requestParams.codeDuration.from = '001'
        } else {
          this.request.codeDuration.from = requestParams.codeDuration.from.padStart(3, '0')
          requestParams.codeDuration.from = requestParams.codeDuration.from.padStart(3, '0')
        }
        if (requestParams.codeDuration.to === null || requestParams.codeDuration.to === '') {
          requestParams.codeDuration.to = '999'
        } else {
          this.request.codeDuration.to = requestParams.codeDuration.to.padStart(3, '0')
          requestParams.codeDuration.to = requestParams.codeDuration.to.padStart(3, '0')
        }
        if (Number(requestParams.codeDuration.from) === 0 && Number(requestParams.codeDuration.to) === 0) {
          this.rangeErrors.codeDurationFrom = true
          this.rangeErrors.codeDurationTo = true
          this.errorMsg.codeDuration = this.$i18n.t('F32231.E251')
          this.focusField.push(this.$refs.codeDurationFrom[0])
        } else if (Number(requestParams.codeDuration.from) === 0) {
          this.rangeErrors.codeDurationFrom = true
          this.errorMsg.codeDuration = this.$i18n.t('F32231.E252')
          this.focusField.push(this.$refs.codeDurationFrom[0])
        } else if (Number(requestParams.codeDuration.to) === 0) {
          this.rangeErrors.codeDurationTo = true
          this.errorMsg.codeDuration = this.$i18n.t('F32231.E253')
          this.focusField.push(this.$refs.codeDurationTo[0])
        } else if (Number(requestParams.codeDuration.from) > Number(requestParams.codeDuration.to)) {
          this.rangeErrors.codeDurationFrom = true
          this.rangeErrors.codeDurationTo = true
          this.errorMsg.codeDuration = this.$i18n.t('F32231.E254')
          this.focusField.push(this.$refs.codeDurationFrom[0])
        }
      }
      if (this.targetReportConditions.includes('roomNo')) {
        let roomNo = []
        if (this.request.roomNo.length === 0) {
          this.masterRooms.forEach((room) => {
            roomNo.push(room.tblNo)
          })
        } else {
          this.request.roomNo.forEach((room) => {
            roomNo.push(room.tblNo)
          })
        }
        requestParams = Object.assign(requestParams, { 'endpointId': [], 'roomNo': roomNo })
      }
      if (this.focusField.length > 0) {
        this.openPopupDialog({
          mode: 3,
          message: this.$i18n.t('O00004.W006'),
          code: -99
        })
        this.$nextTick(() => {
          this.focusField[0].$el.focus()
        })
      } else {
        if (this.request.storeName.length === 0) { requestParams.storeName = this.storeCodes }
        var targetReportData = this.reportTypeData.find(data => data.reportName === requestParams.reportName)
        if (targetReportData && targetReportData.reportName && requestParams.endpointId) {
          if (targetReportData.reportName === 'TRANSACTION') {
            requestParams = Object.assign(requestParams, { 'transactionCode': [] })
            requestParams = Object.assign(requestParams, { 'printNoCheckFlg': false })
          }
          this.$router.push({
            name: posReportOutputPathName,
            params: {
              request: requestParams,
              reportTitle: targetReportData.name,
              additionalProps: (targetReportData.reportName === 'GROUP') ? { ...{}, [targetReportData.reportName]: this.productName } : undefined
            }
          })
        }
      }
    },
    dailyErrorCheck (e, errorCheckFlag) {
      this.focusField = []
      let dailyValidationResult = ''
      // DS KSD V001.000 #84261
      // let popupMessage = ''
      // DE KSD V001.000 #84261
      if (this.targetReportConditions.includes('duration')) {
        dailyValidationResult = validationUtils.methods.dailyDurationValidation(this.request.duration.from, this.request.duration.to, errorCheckFlag)
        if (typeof (dailyValidationResult) === 'number') {
          if (dailyValidationResult === 1) {
            // DS KSD V001.000 #84261
            // this.request.duration.from = ''
            // DE KSD V001.000 #84261
            this.focusField.push(this.$refs.durationYMDFrom[0])
            // CS KSD V001.000 #84261
            // popupMessage = this.$i18n.t('F32231.E181')
            this.errorMsg.duration = this.$i18n.t('F32231.E181')
            // CE KSD V001.000 #84261
          } else if (dailyValidationResult === 2) {
            // DS KSD V001.000 #84261
            // this.request.duration.to = ''
            // DE KSD V001.000 #84261
            this.focusField.push(this.$refs.durationYMDTo[0])
            // CS KSD V001.000 #84261
            // popupMessage = this.$i18n.t('F32231.E182')
            this.errorMsg.duration = this.$i18n.t('F32231.E182')
            // CE KSD V001.000 #84261
          } else if (dailyValidationResult === 3) {
            this.focusField.push(this.$refs.durationYMDFrom[0])
            // DS KSD V001.000 #84261
            // this.request.duration.from = ''
            // DE KSD V001.000 #84261
            // CS KSD V001.000 #84261
            // popupMessage = this.$i18n.t('F32231.E183')
            this.errorMsg.duration = this.$i18n.t('F32231.E183')
            // CE KSD V001.000 #84261
          } else if (dailyValidationResult === 4) {
            this.focusField.push(this.$refs.durationYMDTo[0])
            // DS KSD V001.000 #84261
            // this.request.duration.to = ''
            // DE KSD V001.000 #84261
            // CS KSD V001.000 #84261
            // popupMessage = this.$i18n.t('F32231.E183')
            this.errorMsg.duration = this.$i18n.t('F32231.E183')
            // CE KSD V001.000 #84261
          }
        }
      } else if (this.targetReportConditions.includes('roomReportDuration')) {
        dailyValidationResult = validationUtils.methods.dailyDurationValidation(this.request.roomReportDuration.from, this.request.roomReportDuration.to, errorCheckFlag)
        if (typeof (dailyValidationResult) === 'number') {
          if (dailyValidationResult === 1) {
            // DS KSD V001.000 #84261
            // this.request.roomReportDuration.from = ''
            // DE KSD V001.000 #84261
            this.focusField.push(this.$refs.roomReportDurationYMDFrom[0])
            // CS KSD V001.000 #84261
            // popupMessage = this.$i18n.t('F32231.E181')
            this.errorMsg.roomReportDuration = this.$i18n.t('F32231.E181')
            // CE KSD V001.000 #84261
          } else if (dailyValidationResult === 2) {
            // DS KSD V001.000 #84261
            // this.request.roomReportDuration.to = ''
            // DE KSD V001.000 #84261
            this.focusField.push(this.$refs.roomReportDurationYMDTo[0])
            // CS KSD V001.000 #84261
            // popupMessage = this.$i18n.t('F32231.E182')
            this.errorMsg.roomReportDuration = this.$i18n.t('F32231.E182')
            // CE KSD V001.000 #84261
          } else if (dailyValidationResult === 3) {
            // DS KSD V001.000 #84261
            // this.request.roomReportDuration.from = ''
            // DE KSD V001.000 #84261
            this.focusField.push(this.$refs.roomReportDurationYMDFrom[0])
            // CS KSD V001.000 #84261
            // popupMessage = this.$i18n.t('F32231.E183')
            this.errorMsg.roomReportDuration = this.$i18n.t('F32231.E183')
            // CE KSD V001.000 #84261
          } else if (dailyValidationResult === 4) {
            // DS KSD V001.000 #84261
            // this.request.roomReportDuration.to = ''
            // DE KSD V001.000 #84261
            this.focusField.push(this.$refs.roomReportDurationYMDTo[0])
            // CS KSD V001.000 #84261
            // popupMessage = this.$i18n.t('F32231.E183')
            this.errorMsg.roomReportDuration = this.$i18n.t('F32231.E183')
            // CE KSD V001.000 #84261
          }
        }
      }
      // DS KSD V001.000 #84261
      // if (this.focusField.length > 0) {
      //   this.openPopupDialog({
      //     mode: 3,
      //     message: popupMessage,
      //     code: -99,
      //     okBtnCallback: () => {
      //       const focusElem = this.focusField[0].$el.querySelector(`#calendarImg`)
      //       this.$nextTick(() => {
      //         this.focusField[0].$refs.flatPickr.fp.clear()
      //         this.focusField[0].$refs.flatPickr.fp.close()
      //         focusElem.focus()
      //       })
      //       this.$refs.pop.closeFunction()
      //     }
      //   })
      //   this.$nextTick(() => {
      //     this.focusField[0].$el.focus()
      //   })
      // }
      // DE KSD V001.000 #84261
      // AS KSD V001.000 #84261
      if (this.focusField.length > 0) {
        this.openPopupDialog({
          mode: 3,
          message: this.$i18n.t('O00004.W006'),
          code: -99
        })
        this.$nextTick(() => {
          this.focusField[0].$el.focus()
        })
      } else {
        this.rangeErrors.durationFrom = false
        this.rangeErrors.durationTo = false
        this.errorMsg.duration = ''
        this.errorMsg.roomReportDuration = ''
      }
      // AE KSD V001.000 #84261
    },
    inputLimit (value, inputObject, innerInputObject, inputVariable, prohibitFlag = null, maxByteLength = null) {
      const oldValue = value
      let byteCount = 0
      if (maxByteLength > 0) {
        const output = `${value}`.split('').reduce((out, char) => {
          if (/[^0-9-]/gm.test(char.toString())) return out
          const temp = char.charCodeAt(0).toString(16).toUpperCase()
          if (out.byteCount + (temp.length / 2) <= maxByteLength) {
            out.byteCount += temp.length / 2
            out.value += '' + char
          }
          return out
        }, {
          byteCount: 0,
          value: ''
        })
        value = `${output.value}`
        byteCount = `${output.byteCount}`
      }
      if (Number(byteCount) <= Number(maxByteLength)) {
        this.request[innerInputObject][inputVariable] = value
      }
      if (prohibitFlag === 'num') {
        this.request[innerInputObject][inputVariable] = validationUtils.methods.excludeProhibitedInput(value, /[^0-9]/g, this.request[innerInputObject], inputVariable)
        if (innerInputObject === 'pluCode') {
          if (inputVariable === 'from') { this.$refs.pluFrom[0].$el.value = this.request[innerInputObject][inputVariable] }
          if (inputVariable === 'to') { this.$refs.pluTo[0].$el.value = this.request[innerInputObject][inputVariable] }
        }
        if (innerInputObject === 'duration') {
          if (inputVariable === 'from') { this.$refs.durationY[0].$el.value = this.request[innerInputObject][inputVariable] }
        }
        if (innerInputObject === 'codeDuration') {
          if (inputVariable === 'from') { this.$refs.codeDurationFrom[0].$el.value = this.request[innerInputObject][inputVariable] }
          if (inputVariable === 'to') { this.$refs.codeDurationTo[0].$el.value = this.request[innerInputObject][inputVariable] }
        }
      } else if (prohibitFlag === 'yyyy-mm') {
        let yearMonth = ''
        let skipFormatting = false
        const selectionStart = this.$refs[`durationYM${inputVariable.charAt(0).toUpperCase()}${inputVariable.slice(1)}`][0].$el.selectionStart
        if (selectionStart === 5 && value.charAt(4) !== '-') {
          this.request[innerInputObject][inputVariable] = this.oldDurationValues[inputVariable]
          skipFormatting = true
        } else if (oldValue.match(/^[0-9]{5,6}-[0-9]{1,2}$/gm)) {
          yearMonth = oldValue.substring(0, 7)
        } else {
          yearMonth = validationUtils.methods.excludeProhibitedInput(value, /[^0-9\-]/g, this.request[innerInputObject], inputVariable)
        }
        if (oldValue.match(/^[0-9]{7,8}-*$/gm) && !skipFormatting) {
          let dashlessVal = oldValue.replace('-', '')
          if (dashlessVal.length > 7) {
            this.request[innerInputObject][inputVariable] = this.oldDurationValues[inputVariable]
          } else {
            this.request[innerInputObject][inputVariable] = dashlessVal
          }
        } else {
          if (selectionStart !== 5) {
            let deleteEvent = false
            let replaceEvent = false
            if (yearMonth && this.oldDurationValues[inputVariable]) {
              deleteEvent = this.oldDurationValues[inputVariable].length > yearMonth.length
              replaceEvent = this.oldDurationValues[inputVariable].length === yearMonth.length
            }
            let invalid = false
            if (deleteEvent) {
              this.request[innerInputObject][inputVariable] = yearMonth
            } else {
              let skipAmount = 0
              this.request[innerInputObject][inputVariable] = yearMonth.split('').reduce((out, val, index) => {
                if (invalid) {
                  return out
                }
                if (this.oldDurationValues[inputVariable].charAt(index - skipAmount) !== val) {
                  if (val === '-') {
                    if (replaceEvent) {
                      out = this.oldDurationValues[inputVariable]
                      invalid = true
                    }
                    return out
                  } else {
                    skipAmount += 1
                  }
                }
                if (this.oldDurationValues[inputVariable].charAt(index - skipAmount) === '-' && (val === '-')) {
                  out += '-'
                  return out
                }
                out += /[0-9]/.test(val) ? val : ''
                return out
              }, '')
            }
          }
        }
        if (/^[0-9]{1,4}(-{1}[0-9]{0,2}){0,1}$/gm.test(value)) {
          this.request[innerInputObject][inputVariable] = value
        }
      }
      if (innerInputObject === 'duration') {
        if (inputVariable === 'from') {
          this.$refs.durationYMFrom[0].$el.value = this.request[innerInputObject][inputVariable]
          this.oldDurationValues.from = this.request[innerInputObject][inputVariable]
        }
        if (inputVariable === 'to') {
          this.$refs.durationYMTo[0].$el.value = this.request[innerInputObject][inputVariable]
          this.oldDurationValues.to = this.request[innerInputObject][inputVariable]
        }
      }
    },
    checkDisableGroupHourZone () {
      if ((!this.request.groupHourZoneDuration.from && this.request.groupHourZoneDuration.to) || ((this.request.groupHourZoneDuration.from && !this.request.groupHourZoneDuration.to))) {
        this.groupHourZoneDisableBtn = true
      } else {
        this.groupHourZoneDisableBtn = false
      }
    },
    checkDisableHourZone () {
      if ((!this.request.hourZoneDuration.from && this.request.hourZoneDuration.to) || ((this.request.hourZoneDuration.from && !this.request.hourZoneDuration.to))) {
        this.hourZoneDisableBtn = true
      } else {
        this.hourZoneDisableBtn = false
      }
    },
    durationTypeChange (durationType) {
      this.errorMsg.duration = ''
      this.request.duration.from = ''
      this.request.duration.to = ''
      // AS KSD V001.000 #83461
      this.rangeErrors.durationFrom = false
      this.rangeErrors.durationTo = false
      // AE KSD V001.000 #83461
    },
    detailedOutputChange (detailedOutput) {
      if (detailedOutput === 1) {
        this.request.groupHourZoneDuration.from = ''
        this.request.groupHourZoneDuration.to = ''
        this.groupHourZoneDisableBtn = false
      }
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
      if (errorMsgMap === null || errorMsgMap['global'] === null || !('global' in result.errorMessageMap)) {
        return { code: '', message: this.$i18n.t('O00004.W010') }
      } else {
        return { code: result.code, message: errorMsgMap['global'].toString() }
      }
    },
    disabledDays (date) {
      moment.locale('ja')
      let now = moment()
      let tmp = moment(date)
      return now.isBefore(tmp)
    }
    // KSD V001.000 AE
  },
  // KSD V001.000 DS
  // watch: {
  //   targetStoreCodes: function (storeCodes) {
  //     if (storeCodes.length > 1) {
  //       // this.targetReportList 内の '取引別レポート' 位置を 0 に固定
  //       this.targetReportList[0].conditions = this.targetReportList[0].conditions.filter(function (item) {
  //         return item !== 'register'
  //       })
  //       this.selectedRegisterIds = []
  //     } else {
  //       if (this.targetReportList[0].conditions.indexOf('register') === -1) {
  //         // this.targetReportList[0].conditions 内の 'register' 位置を 1 に固定
  //         this.targetReportList[0].conditions.splice(1, 0, 'register')
  //       }
  //     }
  //   }
  // },
  // KSD V001.000 DE
  created () {
    this.$root.winId = 'F32231'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    // G005.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G005.00.0 Add-End
    // KSD V001.000 AS
    this.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      this.headquartersAuthority = headquartersAuthority
    })
    // KSD V001.000 AE
    await this.$nextTick()
    await this.initialize()
  }
}
