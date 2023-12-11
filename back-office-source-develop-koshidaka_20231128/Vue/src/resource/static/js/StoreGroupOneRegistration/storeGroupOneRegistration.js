// KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeGroupEditDialog from '@/resource/templates/StoreMaster/StoreGroupEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'

const storeGroupOne = 'Reservation/FetchConfigurationRecursive'
const STORE_GROUP_1_MASTER_UPDATE = 'StoreGroup1Master/Update'

const DEFAULT_DATA_MODEL = {
  order: null,
  code: null,
  displayName: {
    default: null
  }
}

export default {
  name: 'StoreGroupOne',
  mixins: [errorMappingUtils],
  data () {
    return {
      storeGroupList: [],
      dataModel: {},
      originalDataModelStr: '',
      storeCdData: '',
      searchData: '',
      lastSearchData: '',
      showEditDialog: false,
      operationLock: true,
      sessionBusinessUnitCd: '',
      selectedStoreGroup: JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL)),
      disabledFixedBtn: true
    }
  },
  components: {
    maintButton,
    storeGroupEditDialog,
    popup
  },
  computed: {
    resultCount () {
      return this.storeGroupList.length
    },
    settingType () {
      return 'STORE_GROUP_1'
    }
  },
  methods: {
    async initialize () {
      if (await this.getStoreGroupMaster() === false) return
      this.operationLock = false
    },
    async getStoreGroupMaster (reloadDataOnly = false) {
      let result = false
      if (!reloadDataOnly) {
        this.storeGroupList = []
      }
      try {
        let response = await axios.put(this.$i18n.t(`prop.url`) + storeGroupOne, {
          nodeId: this.sessionBusinessUnitCd,
          excludeFields: false,
          type: this.settingType
        }, commonUtils.methods.getApiHeader())
        switch (response.data.result.code) {
          case 0:
            this.configData = response.data.responseModel
            this.dataModel = {...this.configData.configurations[this.settingType]}
            this.dataModel.value.sort((a, b) => a.code - b.code)
            this.originalDataModelStr = JSON.stringify([...this.dataModel.value])
            this.storeGroupList = [...this.dataModel.value]
            this.disableSaveBtn()
            result = true
            break
          default:
            const code = response.data.result.code
            this.globalErrorMapping2(response.data.result, code === -10 ? this.$t('F32251.E001') : this.$t('F32251.E002'))
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    filterStore () {
      if (document.getElementById('searchCode').checked) {
        if (isNaN(this.searchData)) this.searchData = ''
        this.searchData = String(this.searchData).replace(/[^0-9]/gi, '')
        this.storeGroupList = this.dataModel.value.filter(e => String(e.code).startsWith(this.searchData))
      } else {
        this.storeGroupList = this.dataModel.value.filter(e => String(e.displayName.default).startsWith(String(this.searchData)))
      }
      if (String(this.searchData).length === 0) {
        this.storeGroupList = this.dataModel.value
      }
      this.storeGroupList.sort((a, b) => a.code - b.code)
      this.disableSaveBtn()
    },
    disableSaveBtn () {
      this.disabledFixedBtn = JSON.stringify(this.dataModel.value) === this.originalDataModelStr
    },
    storeCdInput () {
      this.storeCdData = this.storeCdData.replace(/[^0-9]/gi, '')
    },
    async directInput () {
      if (String(this.storeCdData).length === 0 || Number(this.storeCdData) === 0) {
        return
      }
      this.selectedStoreGroup = JSON.parse(JSON.stringify(DEFAULT_DATA_MODEL))
      this.selectedStoreGroup.code = Number(this.storeCdData)
      this.dataModel.value.forEach(x => {
        if (Number(x.code) === Number(this.storeCdData)) {
          this.selectedStoreGroup = {...x}
        }
      })
      this.showEditDialog = true
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
      this.filterStore()
    },
    async updateStoreGroup (index) {
      this.selectedStoreGroup = this.storeGroupList[index]
      this.showEditDialog = true
    },
    async refresh () {
      return await this.getStoreGroupMaster() === true
    },
    async editDlgClose () {
      this.showEditDialog = false
      this.storeCdData = ''
    },
    async handleFixedBtn () {
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      await this.postStoreGroup1MasterUpdate()
    },
    handleUpdateStoreGroup (e) {
      const i = this.dataModel.value.findIndex(item => item.code === e.code)
      if (i === -1) {
        this.dataModel.value.push({ ...e, order: this.storeGroupList.length })
      } else {
        this.storeGroupList = this.dataModel.value.map(item => {
          if (item.code === e.code) {
            return { ...item, displayName: { default: e.displayName.default }, order: e.order }
          }
          return item
        })
        this.dataModel.value = this.storeGroupList
      }
      this.filterStore()
      this.storeCdData = ''
    },
    handleDeleteStoreGroup (e) {
      this.storeGroupList = this.dataModel.value.filter(item => item.code !== e)
      this.dataModel.value = this.storeGroupList
      this.filterStore()
      this.storeCdData = ''
    },
    async postStoreGroup1MasterUpdate () {
      let orderedList = []
      for (let i = 0; i < this.dataModel.value.length; i++) {
        orderedList.push({...this.dataModel.value[i], order: i + 1})
      }
      this.dataModel.value = orderedList
      await axios.put(
        `${this.$i18n.t('prop.url')}${STORE_GROUP_1_MASTER_UPDATE}`,
        {STORE_GROUP_1: {...this.dataModel}},
        commonUtils.methods.getApiHeader({})
      ).then(async (response) => {
        switch (response.data.result.code) {
          case 0: // 0:正常
            if (await this.getStoreGroupMaster() === true) this.openPopupDialog({mode: 2, messageCode: 'O00004.W002'})
            this.filterStore()
            break
          default:
            const code = response.data.result.code
            this.globalErrorMapping2(response.data.result, code === -10 ? this.$t('F32251.E003') : this.$t('F32251.E006'))
        }
      }, async (error) => {
        console.error(error)
        await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
      }).catch(async (error) => {
        await this.globalErrorMapping2(error)
      })
    },
    closeTab () {
      if (this.disabledFixedBtn) {
        this.$router.push('/TopPage')
        return
      }
      this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.$router.push('/TopPage')
        }
      })
    },
    confirmUnload (event) {
      // マスタ新規・編集ダイアログ表示中なら変更確認ダイアログを表示する
      if (this.showEditDialog || !this.disabledFixedBtn) {
        event.returnValue = ''
      }
    }
  },
  created () {
    this.$root.winId = 'F32251'
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    this.searchData = ''
    this.$root.$once('getBusinessUnitCdStr', async (businessUnitCdStr) => {
      this.sessionBusinessUnitCd = businessUnitCdStr
      await this.initialize()
      await this.$nextTick()
      if (this.$refs.storeCdText != null) {
        this.$refs.storeCdText.focus()
      }
    })
  },
  watch: {
    showEditDialog: async function (newVal) {
      if (!newVal) {
        this.storeCdData = ''
        await this.$nextTick().then(() => {
          this.$refs.storeCdText.focus()
        })
      }
    }
  }
}
// KSD V001.000 AE
