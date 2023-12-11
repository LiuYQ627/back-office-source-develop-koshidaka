/**
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230223  wangchunmei(Neusoft)  G001.00.0  issue課題#1599を対応します.
 * 20230317  bai.ry(Neusoft)  G002.00.0  issue課題#1694を対応します.
 * 20230320  bai.ry(Neusoft)  G003.00.0  issue課題#1680を対応します.
 * 20230331  bai.ry(Neusoft)  G004.00.0  issue課題#1695を対応します.
 * 20230403  bai.ry(Neusoft)  G005.00.0  issue課題#1607を対応します.
 * 20230404  bai.ry(Neusoft)  G006.00.0  issue課題#1601を対応します.
 * 20230413  wangchunmei(Neusoft)  G007.00.0  issue課題#908を対応します.
 * 20230421  zxh(Neusoft)     G008.00.0  issue課題#1457を対応します.
 * 20230423  dingxin(Neusoft) G009.00.0  issue課題#1662を対応します.
 * 20230807  zyx(Neusoft)     G010.00.0  issue課題#1605を対応します.
 * 20230807  zyx(Neusoft)     G011.00.0  issue課題#1603を対応します.
 * 20230816  zxh(Neusoft)     G012.00.0  issue課題#1626を対応します.
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import moment from 'moment'

// ダイアログ
import categoryEditDialog from '@/resource/templates/PresetMaster/CategoryEditDialog'
import itemEditDialog from '@/resource/templates/PresetMaster/ItemEditDialog'
import presetListDialog from '@/resource/templates/PresetMaster/PresetListDialog'
import presetCopyDialog from '@/resource/templates/PresetMaster/PresetCopyDialog'
import presetDeleteDialog from '@/resource/templates/PresetMaster/PresetDeleteDialog'
import presetKeywordItems from '@/resource/templates/PresetMaster/PresetKeywordItems'

const QueryCatalogDetail = 'PresetMaster/PresetCatalogDetails'
const QueryConfigurationNode = 'Configuration/NodeDetail'
/* KSD V001.000 MS */
// const taxRatesPath = 'ProductMaster/TaxRates'
const taxRatesPath = 'TaxTaxes/Query'
/* KSD V001.000 ME */
const itemProps = ['order', 'itemName', 'title', 'presetName', 'barCode', 'skuId', 'fileName']
const disabledType = (headquartersAuthority) => {
  return {
    init: {
      isfixedBtnDisable: true,
      isplanCopyBtn: false,
      isplanCheckBtnDisable: true,
      isclearBtnDisable: true,
      isdelBtnDisable: true,
      planningCode: false,
      catalogName: true,
      targetStoreCode: headquartersAuthority,
      sourceStoreCodes: headquartersAuthority,
      dateFrom: true,
      timeFrom: true,
      dateTo: true,
      timeTo: true,
      weekLabels: true,
      categories: true
    },
    planQueryNull: {
      isfixedBtnDisable: true,
      isplanCopyBtn: false,
      isplanCheckBtnDisable: true,
      isclearBtnDisable: false,
      isdelBtnDisable: true,
      // G004.00.0 Update-Start
      // planningCode: false,
      planningCode: true,
      // G004.00.0 Update-End
      catalogName: false,
      targetStoreCode: false,
      sourceStoreCodes: false,
      dateFrom: true,
      timeFrom: true,
      dateTo: true,
      timeTo: true,
      weekLabels: true,
      categories: true
    },
    planCodeCheckSuccse: {
      isfixedBtnDisable: true,
      isplanCopyBtn: false,
      isplanCheckBtnDisable: true,
      isclearBtnDisable: headquartersAuthority,
      isdelBtnDisable: true,
      planningCode: false,
      catalogName: true,
      targetStoreCode: false,
      sourceStoreCodes: false,
      dateFrom: true,
      timeFrom: true,
      dateTo: true,
      timeTo: true,
      weekLabels: true,
      categories: true
    },
    all: {
      isfixedBtnDisable: false,
      isplanCopyBtn: true,
      isplanCheckBtnDisable: false,
      isclearBtnDisable: false,
      isdelBtnDisable: false,
      planningCode: true,
      catalogName: false,
      targetStoreCode: false,
      sourceStoreCodes: false,
      dateFrom: false,
      timeFrom: false,
      dateTo: false,
      timeTo: false,
      weekLabels: false,
      categories: false
    }
  }
}

export default {
  name: 'PresetMaster',
  data () {
    return {
      // G009.00.0 Add-Start
      permissions: [],
      // G009.00.0 Add-End
      // AS KSD V001.000 #83973
      masters: {},
      // AE KSD V001.000 #83973
      dateFrom: '',
      timeFrom: '',
      isTimeFromError: false,
      dateTo: '',
      timeTo: '',
      isTimeToError: false,
      weekLabels: ['日', '月', '火', '水', '木', '金', '土'],
      weekSelected: [],
      createTimestamp: '',
      categories: [],
      nextCategoryOrder: 0,
      selectedCategoryOrder: -1,
      draggedCategoryId: 0,

      presets: [],
      items: [],
      nextItemId: 0,
      selectedItemId: -1,
      draggedItemId: 0,
      createCategoryType: 'donwn',
      selectedCategory: {},
      createItemType: 'donwn',
      taxRates: {},
      selectStoreCd: '',
      // KSD V001.000 DS issue #1373 対応
      // headquartersAuthority: 1,
      // KSD V001.000 DE issue #1373 対応
      // KSD V001.000 AS issue #1373 対応
      headquartersAuthority: 0,
      // KSD V001.000 AE issue #1373 対応
      tempTargetStoreCode: [],
      tempStoreCode: [],
      companyCode: '',
      disables: {
        isfixedBtnDisable: true,
        isplanCopyBtn: false,
        isplanCheckBtnDisable: true,
        isclearBtnDisable: true,
        isdelBtnDisable: true,
        planningCode: false,
        catalogName: true,
        targetStoreCode: true,
        sourceStoreCodes: true,
        dateFrom: true,
        timeFrom: true,
        dateTo: true,
        timeTo: true,
        weekLabels: true,
        categories: true
      },
      requestParams: {
        version: '',
        id: '',
        createTimestamp: '',
        lastModifiedTimestamp: '',
        sundayFlag: '',
        mondayFlag: '',
        tuesdayFlag: '',
        wednesdayFlag: '',
        thursdayFlag: '',
        fridayFlag: '',
        saturdayFlag: '',
        companyCode: '',
        planningCode: '',
        catalogName: '',
        targetStoreCode: [],
        standardStoreCode: [],
        startDateTime: '',
        endDateTime: '',
        category: [],
        // KSD V001.000 AS issue #1373 対応
        planningClassification: false,
        allocation: 0
        // KSD V001.000 AE issue #1373 対応
      },
      // AS KSD V001.000 84560
      edited: true,
      // AE KSD V001.000 84560
      focusItem: null,
      planNameErrorMsg: null,
      targetStoreCodesErrorMsg: null,
      sourceStoreCodesErrorMsg: null,
      weekErrorMsg: null
    }
  },
  computed: {
    allWeekSelected: {
      get () {
        return this.weekSelected.every(e => e)
      },
      set (newValue) {
        for (let index in this.weekSelected) {
          this.$set(this.weekSelected, index, newValue)
        }
      }
    },
    // G003.00.0 Add-Start
    productBtnDisabled () {
      if (this.selectedCategoryOrder === -1) {
        return true
      } else if (this.selectedCategory.items.length >= 99) {
        return true
      } else {
        return false
      }
    }
    // G003.00.0 Add-End
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    dateInput,
    categoryEditDialog,
    itemEditDialog,
    presetListDialog,
    presetCopyDialog,
    presetDeleteDialog,
    presetKeywordItems
  },
  methods: {
    async initialize () {
      // AS KSD V001.000 84560
      this.edited = true
      // AE KSD V001.000 84560
      this.weekSelected = this.weekLabels.map(_ => false)
    },
    setDisAbled (type) {
      this.disables = Object.assign({}, disabledType(this.headquartersAuthority === 1)[type])
    },

    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      // KSD V001.000 DS issue #1373 対応
      // if (this.selectStoreCd !== selectedStoreCodes[0]) {
      // KSD V001.000 DE issue #1373 対応
      // KSD V001.000 AS issue #1373 対応
      if (this.headquartersAuthority === 1 && this.selectStoreCd !== selectedStoreCodes[0]) {
      // KSD V001.000 AE issue #1373 対応
        this.selectStoreCd = selectedStoreCodes[0]
        /* KSD V001.000 MS */
        // await this.getTaxRates(selectedStoreCodes[0])
        await this.getTaxRates(this.requestParams.companyCode || this.companyCode)
        /* KSD V001.000 ME */
      }
      // G007.00.0 Add-Start
      if (this.requestParams.standardStoreCode.length <= 0) {
        this.setDisAbled('planQueryNull')
      }
      // G007.00.0 Add-End
      // G007.00.0 Update-Start
      // if (this.headquartersAuthority === 1) {
      if (this.headquartersAuthority === 1 && this.requestParams.standardStoreCode.length > 0) {
        // G007.00.0 Update-End
        this.setDisAbled('all')
        // AS KSD V001.000 84560
        this.edited = true 
        // AE KSD V001.000 84560
      }
    },
    /* KSD V001.000 MS */
    // async getTaxRates (storeCd) {
    async getTaxRates (nodeId) {
    /* KSD V001.000 ME */
      // G007.00.0 Add-Start
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W016'), '', false, null, false, null)
      // G007.00.0 Add-End
      try {
        /* KSD V001.000 MS */
        // const params = { nodeId: storeCd }
        // let response = await axios.get(this.$i18n.t('prop.url') + taxRatesPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params }))
        const params = { nodeId: nodeId }
        let response = await axios.post(this.$i18n.t('prop.url') + taxRatesPath, params, commonUtils.methods.addApiHeader({}))
        /* KSD V001.000 ME */
        // G007.00.0 Add-Start
        this.$refs.pop.closeFunction()
        // G007.00.0 Add-End
        if (response.data.result.code === 0) {
          // 0:正常
          this.taxRates = response.data.responseModel
        /* KSD V001.000 AS */
        } else if (response.data.result.code === 2) {
          this.$refs.pop.open(3, '', this.$i18n.t('F32282.E042'), response.data.result.code, false, null, false, null)
        /* KSD V001.000 AE */
        } else {
          this.globalErrorMapping(response)
        }
      } catch (error) {
        // G007.00.0 Add-Start
        this.requestParams.standardStoreCode = []
        // G007.00.0 Add-End
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },
    globalErrorMapping (result, msg = '', func = null) {
      if (result === null) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', this.$t(msg), '', false, func, false, null)
      } else if (result.data.result.code === -10 || result.data.result.code === -20 || result.data.result.code === -30) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      } else if (result.data.result.code === -90) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(2, '', this.$t('O00004.W008'), result.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
      } else {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      }
    },
    toggleWeek (index) {
      this.$set(this.weekSelected, index, !this.weekSelected[index])
    },
    toggleAllWeek () {
      this.allWeekSelected = !this.allWeekSelected
    },
    calcCategoryNextOrder () {
      let returnOrder = 1
      if (this.categories.length > 0) {
        this.categories.forEach((v) => {
          if (v.order > returnOrder) {
            returnOrder = v.order
          }
        })
        returnOrder = returnOrder + 1
      }
      return returnOrder
    },
    /* ----- カテゴリ ----- */
    // ユーティリティ
    newCategory (categoryName = '', displayFlag = 1, hidden = 1) {
      const nextCategoryOrder = this.calcCategoryNextOrder()
      return {
        order: nextCategoryOrder,
        categoryCode: nextCategoryOrder,
        categoryName,
        displayFlag
      }
    },
    getCategoryIndexById (order) {
      return this.categories.findIndex(category => category.order === order)
    },
    // CRUD
    createCategory (type) {
      this.createCategoryType = type
      // G005.00.0 Update-Start
      // this.$refs.categoryEditDialog.open(this.newCategory())
      this.$refs.categoryEditDialog.open(this.newCategory(), 1)
      // G005.00.0 Update-End
    },
    editCategory (order) {
      const category = this.categories[this.getCategoryIndexById(order)]
      const clonedCategory = JSON.parse(JSON.stringify(category))
      // G005.00.0 Update-Start
      // this.$refs.categoryEditDialog.open(clonedCategory)
      this.$refs.categoryEditDialog.open(clonedCategory, 2)
      // G005.00.0 Update-End
    },
    updateCategory (category) {
      const index = this.getCategoryIndexById(category.order)
      this.selectedCategoryOrder = category.order
      if (index === -1) {
        category.items = []
        // if (this.selectedCategoryOrder === -1) {
        if (this.createCategoryType === 'donwn') {
          this.categories.splice(this.categories.length, 0, category)
        } else {
          this.categories.splice(0, 0, category)
        }
        // } else {
        //   const index = this.getCategoryIndexById(this.selectedCategoryOrder)
        //   if (this.createCategoryType === 'donwn') {
        //     this.categories.splice(index + 1, 0, category)
        //   } else {
        //     if (index === 0) {
        //       this.categories.splice(0, 0, category)
        //     } else {
        //       this.categories.splice(index, 0, category)
        //     }
        //   }
        // }
      } else {
        this.$set(this.categories, index, category)
      }
      this.selectedCategory = category
    },
    deleteCategory (order) {
      this.categories.splice(this.getCategoryIndexById(order), 1)
      if (this.selectedCategoryOrder === order || this.categories.length === 0) {
        this.selectedCategoryOrder = -1
      }
    },
    // ドラッグ移動
    dragCategory (order) {
      this.draggedCategoryId = order
    },
    dropCategory (index) {
      const draggedCategoryIndex = this.getCategoryIndexById(this.draggedCategoryId)
      const category = this.categories[draggedCategoryIndex]
      this.deleteCategory(this.draggedCategoryId)
      this.categories.splice(index, 0, category)
    },
    /* ----- 商品 ----- */
    calcCategoryItemsNextOrder () {
      let returnOrder = 1
      const items = this.selectedCategory.items
      if (items.length > 0) {
      	// KSD V001.000 DS issue #1373 対応
      	// const order = items[items.length - 1].order
        // returnOrder = order + 1
        // KSD V001.000 DE issue #1373 対応
        // KSD V001.000 AS issue #1373 対応
        items.forEach((v) => {
          if (v.order > returnOrder) {
            returnOrder = v.order
          }
        })
        returnOrder = returnOrder + 1
        // KSD V001.000 AE issue #1373 対応
      }
      return returnOrder
    },
    // ユーティリティ
    newItem (jancode = '', name = '', imgfile = '', price = 0) {
      const nextItemId = this.calcCategoryItemsNextOrder()
      return {
        order: nextItemId,
        barCode: '',
        title: '',
        presetName: '',
        skuId: '',
        itemName: '',
        fileName: '',
        presignedUrl: '',
        productTaxCodes: [],
        price: ''
      }
    },
    getItemIndexById (order) {
      return this.selectedCategory.items.findIndex(item => item.order === order)
    },
    // CRUD
    createItem (type) {
      this.createItemType = type
      const storeCode = this.requestParams.standardStoreCode[0].slice(-6)
      const companyCode = this.requestParams.standardStoreCode[0].slice(0, -6)
      // G011.00.0 Update-Start
      // this.$refs.itemEditDialog.open(this.newItem(), 1)
      this.$refs.itemEditDialog.open(this.newItem(), this.requestParams.planningCode, companyCode, storeCode, 1)
      // G011.00.0 Update-End
    },
    editItem (order) {
      const item = this.selectedCategory.items[this.getItemIndexById(order)]
      const clonedItem = JSON.parse(JSON.stringify(item))
      const storeCode = this.requestParams.standardStoreCode[0].slice(-6)
      const companyCode = this.requestParams.standardStoreCode[0].slice(0, -6)
      // G011.00.0 Update-Start
      // this.$refs.itemEditDialog.open(clonedItem, 2)
      this.$refs.itemEditDialog.open(clonedItem, this.requestParams.planningCode, companyCode, storeCode, 2)
      // G011.00.0 Update-End
    },
    updateItem (item) {
      const index = this.getItemIndexById(item.id)
      if (index === -1) {
        this.selectedCategory.items.push(item)
      } else {
        this.$set(this.selectedCategory.items, index, item)
      }
      this.selectedCategory = Object.assign({}, this.selectedCategory)
    },
    onAddItem (item) {
      const index = this.getItemIndexById(item.order)
      if (index === -1) {
        if (this.createItemType === 'donwn') {
          this.selectedCategory.items.splice(this.selectedCategory.items.length, 0, item)
        } else {
          this.selectedCategory.items.splice(0, 0, item)
        }
        this.selectedCategory = Object.assign({}, this.selectedCategory)
      } else {
        this.$set(this.selectedCategory.items, index, item)
      }
    },
    async copyPlan (params) {
      try {
        const response = await axios.post(this.$i18n.t('prop.url') + 'PresetMaster/Register', params, commonUtils.methods.addApiHeader({}))
        const {result} = response.data
        if (result.code === 0) {
          this.updating = false
          this.$refs.pop.open(1, '', this.$i18n.t('F32282.S068'), '', false, () => {
            this.requestParams.planningCode = params.planningCode
            this.onEnterPlanCode()
          }, false, null)
        } else {
          let globalErrorMsg = result.errorMessageMap['global'].toString()
          this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    async confirmPlan (planningCode) {
      this.requestParams.planningCode = planningCode
      this.onEnterPlanCode()
    },
    async deletePlan (planningId) {
      try {
        const params = {planningId}
        const response = await axios.delete(this.$i18n.t('prop.url') + 'PresetMaster/Delete', commonUtils.methods.addApiHeader({ data: params }))
        const {result} = response.data
        if (result.code === 0) {
          this.setDisAbled('init')
          this.initData()
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '0', false, null, false, null)
        } else {
          this.globalErrorMapping(response)
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    deleteItem (order) {
      this.selectedCategory.items.splice(this.getItemIndexById(order), 1)
      this.selectedCategory = Object.assign({}, this.selectedCategory)
    },
    // ドラッグ移動
    dragItem (id) {
      this.draggedItemId = id
    },
    dropItem (index) {
      const draggedItemIndex = this.getItemIndexById(this.draggedItemId)
      const item = this.selectedCategory.items[draggedItemIndex]
      this.deleteItem(this.draggedItemId)
      this.selectedCategory.items.splice(index, 0, item)
      this.selectedCategory = Object.assign({}, this.selectedCategory)
    },
    /* ----- サイドバー ----- */
    async backToTop () {
      if (this.requestParams.planningCode === '') {
        this.$router.push('/TopPage')
      } else {
        this.$refs.pop.open(1, '', '編集中のデータは破棄されます。よろしいですか？', '', true, () => {
          this.$router.push('/TopPage')
        }, false, null)
      }
    },
    async onEnterPlanCode () {
      if (this.requestParams.planningCode === '') {
        return
      }
      // 本部企画（企画コード：21～50）の場合
      if (this.headquartersAuthority === 1) {
        if (parseInt(this.requestParams.planningCode) <= 20 || parseInt(this.requestParams.planningCode) > 50) {
          document.getElementById('planningCode').blur()
          this.$refs.pop.open(3, '', this.$i18n.t('F00002.S064'), '', false, null, false, null)
          return
        }
      } else {
        if (parseInt(this.requestParams.planningCode) < 1 || parseInt(this.requestParams.planningCode) > 20) {
          this.$refs.pop.open(3, '', this.$i18n.t('F00002.S064'), '', false, null, false, null)
          return
        }
      }
      // AS KSD V001.000 #86860
      try{
        const checkSession = 'CommonDesign/Header'
        const response = await axios.get(this.$i18n.t('prop.url') + checkSession + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        const sessionResult = response.data.result
        if (sessionResult.code !== 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), sessionResult.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
          return
        }
      }catch(e){
        console.log(e)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        return
      }
      // AE KSD V001.000 #86860
      try {
        // G010.00.0 Add-Start
        var i = '00:00'
        var j = '23:59'
        // G010.00.0 Add-End
        const storeCode = this.headquartersAuthority === 1 ? '000000' : this.requestParams.standardStoreCode[0].slice(-6)
        const companyCode = this.headquartersAuthority === 1 ? this.companyCode : this.requestParams.standardStoreCode[0].slice(0, -6)
        const response = await axios.get(this.$i18n.t('prop.url') + QueryCatalogDetail +
         '?planningCode=' + this.requestParams.planningCode + '&companyCode=' + companyCode + '&storeCode=' + storeCode,
        commonUtils.methods.addApiHeader({}))
        if (response.status === 200) {
          this.requestParams = response.data.responseModel
          // AS KSD V001.000 86879
          if (this.validateStores() === false) {
            return
          }
          // AE KSD V001.000 86879
          /* KSD V001.000 MS */
          // this.getTaxRates(this.requestParams.companyCode + this.requestParams.standardStoreCode).then(()=>{
            this.getTaxRates(this.requestParams.companyCode).then(()=>{
              /* KSD V001.000 ME */
            this.requestParams.targetStoreCode = this.requestParams.targetStoreCode.map(code => this.requestParams.companyCode + code),
            this.requestParams.standardStoreCode = [this.requestParams.companyCode + this.requestParams.standardStoreCode]

            this.categories = response.data.responseModel.category
            if (this.categories.length > 0) {
              this.selectedCategoryOrder = this.categories[0].order
              this.selectedCategory = this.categories[0]
            }
            // AS KSD V001.000 83973
            // DS KSD V001.000 86879
            //this.validateStores()
            // DE KSD V001.000 86879
            // AE KSD V001.000 83973
            this.dateFrom = moment(response.data.responseModel.startDateTime).format('YYYY-MM-DD')
            this.timeFrom = moment(response.data.responseModel.startDateTime).format('HH:mm')
            this.dateTo = moment(response.data.responseModel.endDateTime).format('YYYY-MM-DD')
            this.timeTo = moment(response.data.responseModel.endDateTime).format('HH:mm')
            this.weekSelected = []
            this.weekSelected.push(response.data.responseModel.sundayFlag === 1)
            this.weekSelected.push(response.data.responseModel.mondayFlag === 1)
            this.weekSelected.push(response.data.responseModel.tuesdayFlag === 1)
            this.weekSelected.push(response.data.responseModel.wednesdayFlag === 1)
            this.weekSelected.push(response.data.responseModel.thursdayFlag === 1)
            this.weekSelected.push(response.data.responseModel.fridayFlag === 1)
            this.weekSelected.push(response.data.responseModel.saturdayFlag === 1)
            this.setDisAbled('all')
            setTimeout(() => {
              document.getElementById('planningName').focus()
            }, 100)
          })
        } else if (response.status === 204) {
          this.dateFrom = moment().format('YYYY-MM-DD')
          // G010.00.0 Update-Start
          this.timeFrom = i
          this.dateTo = moment().format('YYYY-MM-DD')
          this.timeTo = j
          // G010.00.0 Update-End
          if (this.headquartersAuthority === 1) {
            this.setDisAbled('planQueryNull')
          } else {
            this.setDisAbled('all')
          }
          setTimeout(() => {
            document.getElementById('planningName').focus()
          }, 100)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    async getConfigurationNode (nodeId) {
      try {
        const response = await axios.get(this.$i18n.t('prop.url') + QueryConfigurationNode + '?nodeId=' + nodeId, commonUtils.methods.addApiHeader({}))
        const {result} = response.data

        if (result.code === 0) {
          const node = response.data.responseModel
          console.log('店舗', node)
        } else if (result.code === 2) {
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    formatApiParams (params) {
      params.category.forEach((cg) => {
        cg.items.forEach((item) => {
          for (const key in item) {
            if (!itemProps.includes(key)) {
              delete item[key]
            }
          }
        })
      })
    },
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    clearMsg () {
      this.planNameErrorMsg = null
      this.targetStoreCodesErrorMsg = null
      this.sourceStoreCodesErrorMsg = null
      this.isTimeFromError = false
      this.isTimeToError = false
      this.weekErrorMsg = null
    },
    async onPlanUpdate () {
      // AS KSD V001.000 #86860
      try{
        const checkSession = 'CommonDesign/Header'
        const response = await axios.get(this.$i18n.t('prop.url') + checkSession + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        const sessionResult = response.data.result
        if (sessionResult.code !== 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), sessionResult.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
          return
        }
      }catch(e){
        console.log(e)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        return
      }
      // AE KSD V001.000 #86860
      this.clearMsg()
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (!this.requestParams.planningCode) {
        this.$refs.pop.closeFunction()
        return this.$refs.pop.open(2, '', '企画コードを入れてください', '', false, null, false, null)
      }
      if (!this.requestParams.catalogName.length) {
        this.focusItem = document.getElementById('planningName')
        this.planNameErrorMsg = '必ず入力してください。'
        this.$refs.pop.closeFunction()
        // return this.$refs.pop.open(2, '', '企画名を入れてください', '', false, this.setFocus, false, null)
        return this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, this.setFocus, false, null)
      }
      if (!this.requestParams.targetStoreCode.length) {
        this.targetStoreCodesErrorMsg = '必ず入力してください。'
        this.$refs.pop.closeFunction()
        return this.$refs.pop.open(3, '', '対象店舗を入れてください', '', false, null, false, null)
      }
      if (!this.requestParams.standardStoreCode.length) {
        this.sourceStoreCodesErrorMsg = '必ず入力してください。'
        this.$refs.pop.closeFunction()
        return this.$refs.pop.open(3, '', '基準店舗を選択ください', '', false, null, false, null)
      }
      if (!this.dateFrom || !this.dateTo) {
        this.$refs.pop.closeFunction()
        return this.$refs.pop.open(3, '', '期間を入れてください', '', false, null, false, null)
      }
      if (!this.valuesCheck()) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
        return
      }
      // 倫理チェック
      if (!this.logicCheck()) {
        return
      }
      // G001.00.0 Add-Start
      const isNotSelectedWeek = this.weekSelected.every((day) => !day)
      if (isNotSelectedWeek) {
        this.weekErrorMsg = '必ず入力してください。'
        this.$refs.pop.open(3, '', '選択されている曜日がありません。対象の曜日を選択し、再度保存ボタンを押してください。', '', false, null, false, null)
        return
      }
      // G001.00.0 Add-End
      const startDateTime = new Date(`${this.dateFrom}T${this.timeFrom}:00`).toISOString()
      const endDateTime = new Date(`${this.dateTo}T${this.timeTo}:00`).toISOString()
      try {
        const params = {
          'companyCode': this.requestParams.standardStoreCode[0].slice(0, -6),
          'catalogName': this.requestParams.catalogName,
          'planningCode': this.requestParams.planningCode,
          'targetStoreCode': this.requestParams.targetStoreCode.map(code => code.slice(-6)),
          'standardStoreCode': this.requestParams.standardStoreCode[0].slice(-6),
          'startDateTime': startDateTime,
          'endDateTime': endDateTime,
          'sundayFlag': this.weekSelected[0] ? 1 : 0,
          'mondayFlag': this.weekSelected[1] ? 1 : 0,
          'tuesdayFlag': this.weekSelected[2] ? 1 : 0,
          'wednesdayFlag': this.weekSelected[3] ? 1 : 0,
          'thursdayFlag': this.weekSelected[4] ? 1 : 0,
          'fridayFlag': this.weekSelected[5] ? 1 : 0,
          'saturdayFlag': this.weekSelected[6] ? 1 : 0,
          'category': this.categories,
          // KSD V001.000 AS issue #1373 対応
          'planningClassification': this.headquartersAuthority === 1 ? true : false,
          'allocation': this.requestParams.allocation
          // KSD V001.000 AE issue #1373 対応
        }

        if (this.requestParams.id !== '') {
          params.id = this.requestParams.id
          params.version = this.requestParams.version
          params.createTimestamp = this.requestParams.createTimestamp
          params.lastModifiedTimestamp = this.requestParams.lastModifiedTimestamp
        }
        // if (this.headquartersAuthority === 1) {
        //   params.targetStoreCode = ['000000']
        //   params.standardStoreCode = '000000'
        // }
        this.formatApiParams(params)
        const response = await axios.post(this.$i18n.t('prop.url') + 'PresetMaster/Register', params, commonUtils.methods.addApiHeader({}))
        const {result} = response.data
        if (result.code === 0) {
          this.initData()
          this.$refs.pop.closeFunction()
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '0', false, null, false, null)
        } else {
          let globalErrorMsg = result.errorMessageMap['global'].toString()
          this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        }
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    // AS KSD V001.000 83973
    onValidateStoresFailed () {
      // CS KSD V001.000 86879
      // this.$refs.pop.open(3, '', this.$i18n.t('F00002.S065'), '', false, () => {
      //   this.initData()
      //   this.clearMsg()
      // }, false, null)
      this.$refs.pop.open(3, '', this.$i18n.t('F32282.S063'), '', false, () => {
        this.initData()
        this.clearMsg()
      }, false, null)
      // CE KSD V001.000 86879
    }, validateStores () {
      this.masters =  this.$refs.storeSelect.masters
      if((this.masters.isError ||
        typeof this.masters.storeMasters === 'undefined' ||
        this.masters.storeMasters === null ||
        this.masters.storeMasters === '' ||
        this.masters.storeMasters.length === 0) && this.requestParams.planningCode !== ''){
        this.onValidateStoresFailed();
        // AS KSD V001.000 86879
        return false
        // AE KSD V001.000 86879
      }

      // CS KSD V001.000 86879
      // if(this.requestParams.standardStoreCode.filter( code => {
      //   return this.masters.storeMasters.findIndex( element => {
      //     if (element.name.length === code.length) {
      //       return element.name === code
      //     } else {
      //       return element.name === (code + element.parentName)
      //     }
      //   }) !== -1
      // }).length === 0){
      //   this.onValidateStoresFailed();
      // }
      let storeCode1 = this.masters.storeMasters.filter( element => {
          if (element.name.length === this.requestParams.standardStoreCode.length) {
            return element.name === this.requestParams.standardStoreCode
          } else {
            return element.name === (element.parentName + this.requestParams.standardStoreCode)
          }
      })
      
      if (storeCode1 === null || storeCode1 === '' || storeCode1.length === 0) {
        this.onValidateStoresFailed();
        return false
      }
      // CE KSD V001.000 86879

      // CS KSD V001.000 86879
      // if(this.requestParams.targetStoreCode.filter( code => {
      //   return this.masters.storeMasters.findIndex( element => {
      //     if (element.name.length === code.length) {
      //       return element.name === code
      //     } else {
      //       return element.name === (code + element.parentName)
      //     }
      //   }) !== -1
      // }).length === 0){
      //   this.onValidateStoresFailed();
      // }
      let storeCode2 = this.requestParams.targetStoreCode.filter( code => {
        return this.masters.storeMasters.findIndex( element => {
          if (element.name.length === code.length) {
            return element.name === code
          } else {
            return element.name === (element.parentName + code)
          }
        }) !== -1
      })

      if (storeCode2 === null || storeCode2 === '' || 
          storeCode2.length !== this.requestParams.targetStoreCode.length){
        this.onValidateStoresFailed();
        return false
      }
      return true
      // CE KSD V001.000 86879
      },
    // AE KSD V001.000 83973
    valuesCheck () {
      // 入力時刻チェック処理呼出
      let {result: timeFromResult, inputTimeStr: timeFromStr} = this.inputTimeCheck(this.timeFrom)
      if (!timeFromResult) {
        this.timeFrom = null
        this.isTimeFromError = true
        return false
      } else {
        // チェックOKの場合は、表示時刻に設定してチェック結果をOKに更新
        this.timeFrom = timeFromStr
      }

      // 入力時刻チェック処理呼出
      let {result: timeToResult, inputTimeStr: timeToStr} = this.inputTimeCheck(this.timeTo)
      if (!timeToResult) {
        // チェックエラーの場合は、チェック結果をNGに更新してinputにフォーカスを当てる
        this.timeTo = null
        this.isTimeToError = true
        return false
      } else {
      // チェックOKの場合は、表示時刻に設定してチェック結果をOKに更新
        this.timeTo = timeToStr
      }
      return true
    },
    /**
     * 入力時刻チェック処理
     * @param {*} strTime チェック対象時刻文字列
     */
    inputTimeCheck (strTime) {
      // 入力フォーマットチェック呼出
      let { formatResult, timeStr } = this.timeFormatCheck(strTime)
      let result = formatResult
      let inputTimeStr = strTime
      let time = new Date()
      if (result) {
        // フォーマットチェックがOKの場合は有効時刻チェックを呼びだす
        var { valitimeResult, newTime } = this.timeCheck(timeStr)
        result = valitimeResult
        time = newTime
        if (!result) {
          // 有効時刻チェックがNGの場合、有効時刻エラーメッセージを表示
          this.disableCsvOutputBtn = true
          this.$refs.pop.closeFunction()
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.S050'), '', false, null, false, null)
        } else {
          inputTimeStr = timeStr
        }
      } else {
        // フォーマットチェックがNGの場合はフォーマットエラーメッセージを表示
        this.disableCsvOutputBtn = true
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.S050'), '', false, null, false, null)
      }
      // 入力時刻チェックの結果とフォーマット変換後の時刻を返す
      return {result, inputTimeStr, time}
    },
    /**
     * 時刻フォーマットチェック
     * @param {*} strTime チェック対象時刻文字列
     */
    timeFormatCheck (strTime) {
      var formatResult = false
      var timeStr = strTime
      if (strTime.match(/^\d{2}:\d{2}$/)) {
        formatResult = true
      } else {
        if (strTime.length === 4) {
          if (strTime.match(/(\d{2})(\d{2})/)) {
          // 時,分を取得する
            timeStr = strTime.substr(0, 2) + ':' + strTime.substr(2, 2)
            formatResult = true
          }
        }
      }
      return { formatResult, timeStr }
    },
    /**
     * 有効時刻チェック
     * @param {*} strTime チェック対象時刻文字列
     */
    timeCheck (strTime) {
      var valitimeResult = true
      let timeSplit = strTime.split(':')
      let h = parseInt(timeSplit[0])
      let m = parseInt(timeSplit[1])
      let newTime = new Date()
      newTime.setHours(h, m)
      if (newTime.getHours() !== h || newTime.getMinutes() !== m) {
        valitimeResult = false
      }
      return { valitimeResult, newTime }
    },
    logicCheck () {
      // 新規モードの場合は開始日付のチェックを行う
      if (this.requestParams.id === '') {
        // 期間日付チェック
        var today = new Date()
        var todayStr = today.getFullYear() + '-' + ('00' + (today.getMonth() + 1)).slice(-2) + '-' + ('00' + today.getDate()).slice(-2)
        if (this.dateFrom < todayStr) {
          // 操作期間日付指定(From) < 現在日付の場合
          this.$refs.pop.closeFunction()
          this.$refs.pop.open(3, '', this.$i18n.t('F00002.S081'), -99, false, null)
          return false
        }
      }
      if (moment(this.dateTo).isBefore(moment(this.dateFrom))) {
        // 操作期間日付指定(From) >操作期間日付指定(to)の場合
        this.$refs.pop.closeFunction()
        // G008.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F00002.S082'), -99, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('F00002.S098'), -99, false, null)
        // G008.00.0 Update-End
        return false
      }

      // 期間時刻チェック
      if (this.dateFrom === this.dateTo && moment(this.timeTo, 'HH:mm').isBefore(moment(this.timeFrom, 'HH:mm'))) {
        // 操作期間日付指定(From) == 操作期間日付指定(to)且つ、操作期間時刻指定(From) >操作期間時刻指定(to)の場合
        this.$refs.pop.closeFunction()
        // G008.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F00002.S082'), -99, false, null)
        this.$refs.pop.open(3, '', this.$i18n.t('F00002.S098'), -99, false, null)
        // G008.00.0 Update-End
        return false
      }
      return true
    },
    // AS KSD V001.000 84560
    storeClicked () {
      if (this.headquartersAuthority !== 1 || this.requestParams.standardStoreCode.length <= 0) {
        this.proceedStoreClick()
      } else {
        this.$refs.pop.open(1, '', this.$i18n.t('F32282.W002'), '', true, this.proceedStoreClick, false, null)
      }
    },
    proceedStoreClick () {
      this.edited = false
      this.timeout = setTimeout(() => {
        this.$refs.storeSelect.openDialog()
      }, 50)
    },
    // AE KSD V001.000 84560
    onPlanCheck () {
      let storeCode = ''
      let companyCode = ''
      if (this.headquartersAuthority === 1) {
        storeCode = '000000'
        companyCode = this.companyCode
      } else {
        storeCode = this.requestParams.standardStoreCode[0].slice(-6)
        companyCode = this.requestParams.standardStoreCode[0].slice(0, -6)
      }
      this.$refs.presetListDialog.open(companyCode, storeCode, this.headquartersAuthority)
    },
    onPlanCopy () {
      let storeCode = ''
      let companyCode = ''
      if (this.headquartersAuthority === 1) {
        storeCode = '000000'
        companyCode = this.companyCode
      } else {
        storeCode = this.requestParams.standardStoreCode[0].slice(-6)
        companyCode = this.requestParams.standardStoreCode[0].slice(0, -6)
      }
      this.$refs.presetCopyDialog.open(companyCode, storeCode, this.headquartersAuthority)
    },
    initData () {
      let targetStoreCd = this.requestParams.targetStoreCode
      let standardStoreCode = this.requestParams.standardStoreCode
      this.requestParams = {
        version: '',
        id: '',
        sundayFlag: '',
        mondayFlag: '',
        tuesdayFlag: '',
        wednesdayFlag: '',
        thursdayFlag: '',
        fridayFlag: '',
        saturdayFlag: '',
        companyCode: '',
        createTimestamp: '',
        lastModifiedTimestamp: '',
        planningCode: '',
        catalogName: '',
        startDateTime: '',
        endDateTime: '',
        category: [],
        targetStoreCode: targetStoreCd,
        standardStoreCode: standardStoreCode,
        // KSD V001.000 AS issue #1373 対応
        planningClassification: false,
        allocation: 0
        // KSD V001.000 AE issue #1373 対応
      }
      if (this.headquartersAuthority === 1) {
        this.requestParams.targetStoreCode = []
        this.requestParams.standardStoreCode = []
      }
      this.selectedCategory = []
      this.dateFrom = ''
      this.timeFrom = ''
      this.dateTo = ''
      this.timeTo = ''
      this.categories = []
      this.selectedCategoryOrder = -1
      this.weekSelected = this.weekLabels.map(_ => false)
      this.nextItemId = 0
      this.selectedItemId = -1
      this.draggedItemId = 0
      this.createTimestamp = ''
      this.setDisAbled('init')
    },
    onPlanClear () {
      this.$refs.pop.open(1, '', '編集中のデータは破棄されます。よろしいですか？', '', true, () => {
        this.initData()
        // G001.00.0 Add-Start
        this.clearMsg()
        // G001.00.0 Add-End
      }, false, null)
    },
    onPlanDelete () {
      if (this.requestParams.id !== '') {
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, () => {
          this.deletePlan(this.requestParams.id)
        }, false, null)
      } else {
        this.$refs.pop.open(2, '', '登録されているプランがありません。', '', false, null, false, null)
      }
    },
    disabledDays (date) {
      moment.locale('ja')
      let now = moment().subtract(1, 'd')
      let tmp = moment(date)
      return now.isAfter(tmp)
    },
    planningCodeInputRegulation () {
      this.requestParams.planningCode = this.requestParams.planningCode.toString().replace(/[^0-9]/gi, '')
      let reg = /^(([1-9])|(1\d{1})|(20))$/
      if (this.headquartersAuthority === 1) {
        reg = /^(([2-5])|(2[1-9]{1})|([3-4]\d{1})|(50))$/
      }
      if (!reg.test(this.requestParams.planningCode)) {
        this.requestParams.planningCode = this.requestParams.planningCode.substring(0, this.requestParams.planningCode.length - 1)
      }
      // G006.00.0 Add-Start
      if (!reg.test(this.requestParams.planningCode)) {
        this.requestParams.planningCode = this.requestParams.planningCode.substring(0, this.requestParams.planningCode.length - 1)
      }
      // G006.00.0 Add-End
    },
    inputLimit (str, maxLength) {
      if (str == null) { return }
      var strLen = str.toString().length
      // byte数の取得
      var byteLen = 0
      for (var i = 0; i < strLen; i++) {
        var codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
            (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          if (this.requestParams.catalogName == str) {
            this.requestParams.catalogName = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
  },
  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F32282'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.initialize()
  },
  async mounted () {
    // G009.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G009.00.0 Add-End
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
      this.companyCode = businessUnitCdStr
      // 対象店舗コード = headerで保持している所属企業コード + headerで保持している所属店舗コード
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.headquartersAuthority = headquartersAuthority
      if (targetStoreCd) {
        vue.targetStoreText = belongStoreNameStr
        vue.targetStoreCd = targetStoreCd
        vue.operationLockStore = false
      }
      await this.$nextTick()
      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          this.setDisAbled('init')
          document.getElementById('planningCode').focus()
        } else {
          document.getElementById('planningCode').focus()
          this.selectStoreCd = targetStoreCd
          /* KSD V001.000 MS */
          // this.getTaxRates(targetStoreCd)
          this.getTaxRates(this.companyCode)
          /* KSD V001.000 ME */
        }
      }, 200)
    })
    // G002.00.0 Update-End
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
