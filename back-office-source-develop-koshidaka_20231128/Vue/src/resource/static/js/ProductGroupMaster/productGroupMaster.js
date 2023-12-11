/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/ProductGroupMaster/ProductGroupEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
// KSD V001.000 AS
import csvDialog from '@/resource/templates/CommonDesign/CsvDialog'
import csvExportUtils from '@/resource/static/js/CommonDesign/csvExportUtils'
import classificationNumberCsvDialog from '@/resource/templates/CommonDesign/ClassificationNumberCsvDialog'
const csvExportTimerData = require('../../properties/csvExportTimer.json')
// KSD V001.000 AE
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'

const searchDivisionPath = 'ProductDivisions/divisionInfoSearch'
const searchListPath = 'ProductGroupMaster/ProductQuery/Page'
const searchQueryPath = 'ProductGroupMaster/ProductQuery/limit'
const searchPath = 'ProductGroupMaster/ProductSearch'
const fetchCurrentConfigurationPath = 'Reservation/FetchConfigurationRecursive'
const maxListCount = 100

export default {
  name: 'productGroupMaster',
  // KSD V001.000 AS
  mixins: [csvExportUtils],
  // KSD V001.000 AE
  // [Vue.js]データオブジェクト定義
  data () {
    return {
      divisionList:[],
      dispDivisionList:[],
      productClassificationNumber: 0,
      dispDataList: [],
      findDataList: [],
      resultCount: 0,
      headquartersAuthority: 0,
      targetStoreCd: 0,
      targetStoreText: '',
      productIdData: '',
      searchData: '',
      editDlgOpen: false,
      operationLock: true,
      operationLockStore: true,
      operationLockDivision: true,
      masters: {},
      initialized: false,
      searchParams:{},
      itemListLimit:50,
      listCount: 0,
      screenStep: 1
      // KSD V001.000 AS
      ,authorityListSelect: [],
      csvDlgOpen: false,
      permissions: [],
      businessUnitCdStr: 0,
      timeout: null,
      globalStartTime: null,
      fileHandle: null,
      exportData: {
        response: null,
        data: null
      }
      // KSD V001.000 AE
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
,bWireMock: false
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
    }
  },
  // [Vue.js]算出プロパティ
  computed: {
    // [property]「前ページボタン」活性/非活性状態
    disabledPrevBtn() {
      return !(this.screenStep >= 2)
    },
    // [property]「次ページボタン」活性/非活性状態
    disabledNextBtn() {
      // CS KSD V001.000 83440
      // return !(this.screenStep >= 1 && this.listCount === maxListCount)
      return !(this.screenStep >= 1 && this.listCount > maxListCount)
      // CE KSD V001.000 83440
    },
    // KSD V001.000 AS
    disabledCsvInputBtn () {
      return !this.targetStoreCd || !this.permissions.includes('CLOUDPOS_CATALOG_OTHER_1')
    },
    disabledCsvOutputBtn () {
      return !this.targetStoreCd || !this.permissions.includes('CLOUDPOS_CATALOG_OTHER_2')
    }
    // KSD V001.000 AE
  },
  // [Vue.js]ローカルコンポーネント登録
  components: {
    maintButton,
    // KSD V001.000 AS
    csvDialog,
    classificationNumberCsvDialog,
    // KSD V001.000 AE
    editDialog,
    popup,
    dialogStoreSelect
  },
  // [Vue.js]メソッド定義
  methods: {
    // [function]インスタンス初期処理
    async initialize () {
      if (this.initialized) return
      this.initialized = true
      if (this.targetStoreCd) {
        if (await this.getDivision() === false) return
        if (await this.getItemListLimit(this.targetStoreCd) === false) return
      }
      if (this.headquartersAuthority === 1) {
        if (await this.getMasters() === false) {
          this.findDataList = []
          this.dispDataList = []
          this.listCount = 0
          this.resultCount = 0
          return
        }
        await this.setStore(this.targetStoreCd)
      }
      this.operationLock = true
    },
    // [function]店舗マスター取得
    async getMasters () {
      let result = false
      let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        result = true
      }
      return result
    },
    // [event]商品区分選択変更時ハンドラ
    divisionSelect() {
      // 検索条件、商品構成一覧を初期化する
      this.productIdData = ''
      this.searchData = ''
      this.screenStep = 1
      this.getProductGroup ()
      this.operationLockDivision = false
    },
    // [event]「次ページ」クリック時ハンドラ
    next () {
      this.screenStep += 1
      this.operationLockDivision = true
      this.getProductGroup ()
      this.operationLockDivision = false
    },
    // [event]「前ページ」クリック時ハンドラ
    prev () {
      this.screenStep -= 1
      this.operationLockDivision = true
      // CS KSD V001.000 83440
      // this.getProductGroup ()
      this.getProductGroup (true)
      // CE KSD V001.000 83440
      this.operationLockDivision = false
    },
    // KSD V001.000 AS
    async csvInput () {
      this.importCsv()
    },
    async importCsv () {
      this.$refs.csvDialog.open(this.refreshMain, this.csvDlgClose, this.businessUnitCdStr, this.targetStoreCd, csvExportTimerData.catalogsGroups)
      this.csvDlgOpen = true
    },
    async csvDlgClose () {
      this.csvDlgOpen = false
    },
    closeClassificationNumberCsvDialog () {
      this.$refs.classificationNumberCsvDialog.popupConfirm()
    },
    async csvOutput () {
      this.cancelExportFile()
      this.$refs.classificationNumberCsvDialog.open(() => {
        const params = {
          targetCollection: 'CATALOGS_GROUPS',
          companyCode: this.businessUnitCdStr,
          productClassificationNumber: this.$refs.classificationNumberCsvDialog.productClassificationNumberModel,
          storeCode: this.targetStoreCd.slice(15)
        }
        this.$refs.pop.open(1, '', this.$i18n.t('F32242.W001') , '', true, () => {
          this.exportCSV(params, this.$refs, this.$i18n, this.refreshMain, csvExportTimerData.catalogsGroups, this.closeClassificationNumberCsvDialog)
        }, false, null)
      })
    },
    changeName () {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
    // KSD V001.000 AE
    // [function]商品構成マスタ取得処理※商品区分選択時の一覧表示用
    // CS KSD V001.000 83440
    // async getProductGroup () {
    async getProductGroup (flg = false) {
    // CE KSD V001.000 83440
      let result = false
      let _index = (this.screenStep - 1) * maxListCount
      this.findDataList = []
      this.dispDataList = []
      this.listCount = 0
      this.resultCount = 0
      try {
        let params = { catalogName: this.targetStoreCd, productClassificationNumber:this.productClassificationNumber, startIndex:_index }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.catalogName = '9' + this.targetStoreCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
        // KSD V001.000 DS
        // this.$refs.pop.open(4, '', this.$i18n.t('O00004.W018'), '', false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        if (!this.$refs.csvDialog.isOpen()) {
          this.$refs.pop.open(4, '', this.$i18n.t('O00004.W018'), '', false, null, false, null)
        }
        // KSD V001.000 AE
        let response = await axios.get(this.$i18n.t('prop.url') + searchListPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        this.$refs.pop.closeFunction()
        if (response.data.result.code === 0) {
          // 0:正常
          this.findDataList = response.data.responseModel
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する商品情報なし
          result = true
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      if (result === true && this.findDataList.length > 0) {
        this.dispDataList = this.findDataList
        this.resultCount = this.dispDataList.length
        this.listCount = this.dispDataList.length
        // AS KSD V001.000 83440
        if (flg === true) {
          // 「前ページ」クリック時
          this.listCount += 1

        } else if (this.findDataList.length >= maxListCount) {
          let _nextIndex = this.screenStep * maxListCount
          let params = { catalogName: this.targetStoreCd, productClassificationNumber:this.productClassificationNumber, startIndex:_nextIndex }
          if (this.bWireMock === true) params.catalogName = '9' + this.targetStoreCd.slice(1)
          let nextResponse = await axios.get(this.$i18n.t('prop.url') + searchListPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
          if (nextResponse.data.result.code === 0 && nextResponse.data.responseModel.length > 0) {
            // 0:正常
            this.listCount += nextResponse.data.responseModel.length
          }
        }
        // AE KSD V001.000 83440
      }
      return result
    },
    // [function]商品構成マスタ条件取得処理
    async searchProductGroup () {
      let result = false
      this.findDataList = []
      this.dispDataList = []
      this.listCount = -1
      this.screenStep = 1
      this.resultCount = 0
      try {
        let params = { nodeId: this.targetStoreCd, queryMode: 'ALL', queryLimit: this.itemListLimit+1, searchParams: JSON.stringify(this.searchParams) }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.targetStoreCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
        // KSD V001.000 DS
        // this.$refs.pop.open(4, '', this.$i18n.t('O00004.W018'), '', false, null, false, null)
        // KSD V001.000 DE
        // KSD V001.000 AS
        if (!this.$refs.csvDialog.isOpen()) {
          this.$refs.pop.open(4, '', this.$i18n.t('O00004.W018'), '', false, null, false, null)
        }
        // KSD V001.000 AE
        let response = await axios.get(this.$i18n.t('prop.url') + searchQueryPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        this.$refs.pop.closeFunction()
        if (response.data.result.code === 0) {
          // 0:正常
          this.findDataList = response.data.responseModel
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する商品情報なし
          result = true
        } else {
          this.searchErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      if (result === true) {
        this.checkDataLength()
        this.dispDataList = this.findDataList
        this.resultCount = this.dispDataList === null ? 0 : this.dispDataList.length
      }
      return result
    },
    // [function]商品構成マスタ検索件数チェック処理
    checkDataLength() {
      if ( this.findDataList.length>this.itemListLimit) {
        this.findDataList.splice(this.itemListLimit,1)
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W017'), '', false, null, false, null)
      }
    },
    // [function]直接入力チェック処理
    productIdInput () {
      // KSD V001.000 DS
      // this.productIdData = this.productIdData.replace(/[^0-9]/gi, '')
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.productIdData = Number(this.productIdData.replace(/[^0-9]/gi, ''))
      this.productIdData = (this.productIdData === 0 ? '' : this.productIdData)
      // KSD V001.000 AE
    },
    // KSD V001.000 AS
    filterSearchCode() {
      if (document.getElementById('searchCode').checked) {
        this.searchData = this.searchData.slice(0, 6)
        if (isNaN(this.searchData))
        this.searchData = this.searchData.replace(/[^0-9]/gi, '')
        this.searchData = this.searchData.replace(/\s/g, '')
      } 
    },
    // KSD V001.000 AE
    // [event]コード新規/ダイレクト編集エリア入力時ハンドラ
    // 商品構成マスタ検索、存在していれば編集、存在していなければ新規
    directInput () {
      // KSD V001.000 AS
      if (this.$refs.productIdText.value.length === 0) return
      // KSD V001.000 AE
      // 入力値の桁数チェック
      if (this.$refs.productIdText.value.length > this.divisionList[this.productClassificationNumber - 1].length) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00204.W003'), '', false, null, false, null)
        console.log('入力桁:' + this.$refs.productIdText.value.length + '設定桁:' + this.divisionList[this.productClassificationNumber - 1].length)
        return;
      }
      let id = this.$refs.productIdText.value
      let params = { nodeId: this.targetStoreCd, productId: id, productClassificationNumber: this.productClassificationNumber }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.targetStoreCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            // KSD V001.000 DS
            // this.$refs.editDialog.open(this.targetStoreCd, this.divisionList, this.productClassificationNumber, id, response.data.responseModel, this.refresh, this.editDlgClose)
            // KSD V001.000 DE
            // KSD V001.000 AS
            this.$refs.editDialog.open(this.targetStoreCd, this.divisionList, this.productClassificationNumber, id, response.data.responseModel, this.refreshMain, this.editDlgClose)
            // KSD V001.000 AE
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            // 2:該当する商品情報なし
            // KSD V001.000 DS
            // this.$refs.editDialog.open(this.targetStoreCd, this.divisionList, this.productClassificationNumber, id, null, this.refresh, this.editDlgClose)
            // KSD V001.000 DE
            // KSD V001.000 AS
            this.$refs.editDialog.open(this.targetStoreCd, this.divisionList, this.productClassificationNumber, id, null, this.refreshMain, this.editDlgClose)
            // KSD V001.000 AE
            setTimeout(() => {
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
    // [event]マスタ検索条件入力エリア「コード」ボタン選択時ハンドラ
    enterCode () {
      document.getElementById('searchCode').checked = true
      this.onRadioChange()
    },
    // [event]マスタ検索条件入力エリア「名称」ボタン選択時ハンドラ
    enterName () {
      document.getElementById('searchName').checked = true
      this.onRadioChange()
    },
    // [function]マスタ検索条件入力エリアコード/名称ボタン切り替え時処理
    onRadioChange () {
      // 検索情報の初期化
      this.searchData = ''
    },
    // [event]商品構成一覧「編集アイコン」クリック時ハンドラ(index:対象商品構成一覧インデックス)
    // 商品が存在すること
    selectedListData (index) {
      let _productData = this.dispDataList[index]
      let params = { nodeId: this.targetStoreCd, productId: _productData.productId, productClassificationNumber: this.productClassificationNumber }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.targetStoreCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
      axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            // KSD V001.000 DS
            // this.$refs.editDialog.open(this.targetStoreCd, this.divisionList, this.productClassificationNumber, _productData.productId, response.data.responseModel, this.refresh, this.editDlgClose)
            // KSD V001.000 DE
            // KSD V001.000 AS
            this.$refs.editDialog.open(this.targetStoreCd, this.divisionList, this.productClassificationNumber, _productData.productId, response.data.responseModel, this.refreshMain, this.editDlgClose)
            // KSD V001.000 AE
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            this.globalErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
    },
    // [function]新規/編集ダイアログ更新時コールバック処理
    // KSD V001.000 DS
    // async refresh () {
    // KSD V001.000 DE
    // KSD V001.000 AS
    async refreshMain () {
    // KSD V001.000 AE
      let result = false
      if (this.listCount >= 0) {
        result = await this.getProductGroup ()
      } else{
        this.makeSearchParams()
        result = await this.searchProductGroup ()
      }
      this.$refs.productIdText.value = ''
      return result
    },
    // [function]新規/編集ダイアログ終了時コールバック処理
    editDlgClose () {
      this.editDlgOpen = false
      this.productIdData = ''
    },
    // [event]「店舗選択ボタン」クリック時ハンドラ
    storeSelect () {
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    // [event]店舗選択ダイアログ店舗確定時処理(selectedStoreCodes:選択店舗コード)
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      this.productClassificationNumber = 0
      this.findDataList = []
      this.dispDataList = []
      this.resultCount = 0
      await this.setStore(selectedStoreCodes[0])
      await this.getDivision()
      await this.getItemListLimit(selectedStoreCodes[0])
    },
    // [function]店舗選択情報保存処理(storeCd:選択店舗コード)
    setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      this.operationLock = true
      this.operationLockStore = true
      if (this.masters.storeMasters !== null) {
        let _index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (_index >= 0) {
          this.targetStoreText = this.masters.storeMasters[_index].displayName.default
          this.operationLock = false
          this.operationLockStore = false
        }
      }
    },
    // [function]商品分類階層情報取得処理
    async getDivision () {
      let result = false
      this.divisionList = []
      try {
        let params = { nodeId: this.targetStoreCd }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.targetStoreCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
        let response = await axios.get(this.$i18n.t('prop.url') + searchDivisionPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        if (response.data.result.code === 0) {
          // 0:正常
          if (response.data.responseModel === null) {
            this.$refs.pop.open(3, '', this.$i18n.t('F00204.E001'), '', false, null, false, null)
          } else { // 商品分類階層設定が存在する
            this.divisionList = response.data.responseModel.value
            result = true
          }
        } else if (response.data.result.code === 2) {
          // 2:該当する情報なし
          this.$refs.pop.open(3, '', this.$i18n.t('F00204.E002'),  response.data.result.code, false, null, false, null)
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      if (result === true) {
        // 取得正常の場合
        // GUI表示用データリスト作成
        this.dispDivisionList = []
        let _top = false
        for (let _item of this.divisionList) {
          if (_top === false) _top = _item.usedFlg
          // 最上位構成フラグ以降の階層のみリストセットする
          if (_top !== false) this.dispDivisionList.push(_item)
        }
      }
      return result
    },
    // [event]「終了」ボタンクリック時ハンドラ
    closeTab () {
      this.$router.push('/TopPage')
    },
    // [function]検索時エラー処理(result:レスポンス結果情報)
    searchErrorMapping (result) {
      if (result.code === -99) {
        let errorMessage = result.errorMessageMap['productId'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    // [function]エラー共通処理(result:レスポンス結果情報)
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
    // [event]コンテンツアンロード時ハンドラ(event:??)
    confirmUnload (event) {
      // マスタ新規・編集ダイアログ表示中なら変更確認ダイアログを表示する
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    },
    // [function]マスタ検索条件パラメータ作成処理
    makeSearchParams(){
      if (this.searchData !== '') {
        if (document.getElementById('searchCode').checked) {
          this.searchParams = { productClassificationNumber: this.productClassificationNumber, productId: '/^' + this.searchData + '/' }
        }else{
          this.searchParams = { productClassificationNumber: this.productClassificationNumber, displayName: { kanji: '/^' + this.searchData + '/' } }
        }
      }else {
        this.searchParams = { productClassificationNumber: this.productClassificationNumber }
      }
    },
    // [event]マスタ検索条件エリア「Enter」入力時ハンドラ
    searchDataEnter(){
      this.makeSearchParams()
      this.searchProductGroup()
    },
    // [function]検索件数上限数取得処理(nodeId:会社コード(15)+店舗コード(6))
    async getItemListLimit(nodeId) {
      try {
        this.itemListLimit = 50
        const response = await axios.put(this.$i18n.t('prop.url') + fetchCurrentConfigurationPath, {
          nodeId: nodeId,
          excludeFields: false
        }, commonUtils.methods.getApiHeader())
        if (response.data.result.code !== 0) {
          return false
        }
        if (response.data.responseModel) {
          this.itemListLimit = parseInt(response.data.responseModel.configurations.STORE_OPERATIONS_SETTINGS.value.itemListLimit)
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
  // [Vue.js]インスタンス生成時フック
  created () {
    this.$root.winId = 'F00204'
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  // [Vue.js]インスタンス消滅時フック
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  // [Vue.js]インスタンスDOMマウント時フック
  async mounted () {
    this.searchData = ''
    let vue = this
    let belongStoreCdStr = ''
    vue.$root.$once('getBelongStoreCd', (belongStoreCd) => {
      // headerで保持している所属店舗コード
      belongStoreCdStr = belongStoreCd
    })
    let belongStoreNameStr = ''
    vue.$root.$once('getBelongStoreName', (belongStoreName) => {
      // 対象店舗名 = headerで保持している所属店舗名
      belongStoreNameStr = belongStoreName
    })
    let targetStoreCd = ''
    vue.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      // 対象店舗コード = headerで保持している所属企業コード + headerで保持している所属店舗コード
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
      // KSD V001.000 AS
      if (businessUnitCdStr) {
        vue.businessUnitCdStr = businessUnitCdStr
      }
      // KSD V001.000 AE
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.headquartersAuthority = headquartersAuthority
      if (targetStoreCd) {
        vue.targetStoreText = belongStoreNameStr
        vue.targetStoreCd = targetStoreCd
        vue.operationLockStore = false
      }
      await this.initialize()
      await this.$nextTick()
      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementById('storeSelectBtn').focus()
        } else {
          this.operationLock = false
          this.$refs.productIdText.focus()
        }
      }, 200)
    })
    // KSD V001.000 AS
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // KSD V001.000 AE
  },
  // [Vue.js]ウォッチャー
  watch: {
  }
}
