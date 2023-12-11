// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/FloorMasterSetting/FloorMasterEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import transformUtils from '@/resource/static/js/Common/transformUtils'

const getFloorPath = 'RestaurantsFloor/Query'

export default {
  name: 'FloorMasterSetiing',
  mixins: [transformUtils],
  data () {
    return {
      dispFloorDataList: [],
      findFloorDataList: [],
      resultCount: 0,
      businessUnitCdData: '',
      searchData: '',
      lastSearchData: '',
      editDlgOpen: false,
      operationLock: true,
      operationLockStore: true,
      initialized: false,
      sessionBusinessUnitCd: '',
      masters: {},
      targetStoreCd: 0,
      targetStoreText: '',
      displayData: [],
      classData: [],
      headquartersAuthority: 0,
      timeout: null,
      defaultData: { 
        indexNo: '', 
        floorNo: 0, 
        floorName: '',
        floorNameShort: '',
        ccpNo: 1, 
        errKcpNo: 1,
        isDefault: true
      }
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

      if (this.initialized) return
      this.initialized = true

      if (this.targetStoreCd) {
        if (await this.getFloor() === false) return
      }

      if (this.headquartersAuthority === 1) {
        if (await this.getMasters() === false) {
          this.findDataList = []
          this.dispDataList = []
          this.resultCount = 0
          return
        }
        await this.setStore(this.targetStoreCd)
      }

      this.operationLock = false
    },
    async getMasters () {
      let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },

    async getFloor () {
      let result = false
      this.findFloorDataList = []
      this.dispFloorDataList = []
      this.resultCount = 0
      this.classData = []
      this.operationLockStore = true
      try {
        // フロアマスタ取得
        const params = {
          IndexNo: 0,
          nodeId: this.targetStoreCd,
          orderBy: 'IndexNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }
        let response = await axios.post(
          `${this.$i18n.t('prop.url')}${getFloorPath}`,
          params,
          commonUtils.methods.addApiHeader({})
        )
        if (response.data.result.code === 0) {
          // 0:正常
          this.classData = response.data.responseModel.map(res =>  this.uncapitalizeKeys(res))
          this.morphData(0)
          this.findFloorDataList = this.displayData
          this.filtering()
          result = true
          this.operationLockStore = false
        } else if (response.data.result.code === 2) {
          // 2:該当する店舗なし
          this.morphData(2)
          this.findFloorDataList = this.displayData
          this.filtering()
          result = true
          this.operationLockStore = false
        } else {
          this.targetStoreCd = 0
          this.targetStoreText = ''
          this.operationLock = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.targetStoreCd = 0
        this.targetStoreText = ''
        this.operationLock = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    async storeSelect () {
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      this.targetStoreCd = 0
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
      this.getFloor()
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      this.operationLock = true
      this.operationLockStore = true
      if (this.masters.storeMasters !== null) {
        let index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.targetStoreText = this.masters.storeMasters[index].displayName.default
          this.operationLock = false
          this.operationLockStore = false
        }
      }
    },
    morphData () {
      let found = false
      let data = []
      this.displayData = []

      for (let i = 1; i <= 99; i++) {
        for (let j = 0; j < this.classData.length; j++) {
          if (this.classData[j].indexNo === i) {
            found = true
            if (this.classData[j].floorName === '' || this.classData[j].floorName == null) {
              this.classData[j].floorName = ''
            }
            if (this.classData[j].floorNameShort === '' || this.classData[j].floorNameShort == null) {
              this.classData[j].floorNameShort = ''
            }
            data = this.classData[j]
          }
        }
        if (found === false) {
          data = {indexNo: i, floorNo: 0, floorName: '', floorNameShort: '', ccpNo: 1, errKcpNo: 1}
          this.displayData.push(data)
        } else {
          this.displayData.push(data)
          data = []
          found = false
        }
      }
      this.resultCount = this.displayData === null ? 0 : this.displayData.filter(res => res.floorNo != 0).length
    },
    filtering () {
      if (this.lastSearchData === '') {
        this.dispFloorDataList = this.findFloorDataList
      } else {
        let tempStr = ''
        let tempLen = this.lastSearchData.length
        this.dispFloorDataList = []
        for (let i = 0; i < this.findFloorDataList.length; i++) {
          if (document.getElementById('searchName').checked) {
            if (this.findFloorDataList[i].floorName != null && this.findFloorDataList[i].floorName != null) {
              tempStr = this.findFloorDataList[i].floorName
            }
          } else {
            tempStr = this.findFloorDataList[i].floorNo + ''
          }
          if (tempStr == null) {
            tempStr = ''
          }
          // 前方一致
          if (tempStr.substr(0, tempLen) === this.lastSearchData) {
            this.dispFloorDataList.push(this.findFloorDataList[i])
          }
        }
      }
      this.resultCount = this.dispFloorDataList === null ? 0 :this.dispFloorDataList.filter(res => res.floorNo != 0).length
    },
    businessUnitCdInput () {
      this.businessUnitCdData = this.businessUnitCdData.replace(/[^0-9]/gi, '')
    },
    directInput () {
      if (Number(this.$refs.directInputNoText.value) !== 0) {
        let floorData = this.findFloorDataList[this.$refs.directInputNoText.value-1]
        const params = { 
          IndexNo: Number(this.$refs.directInputNoText.value),
          nodeId: this.targetStoreCd,
          orderBy: 'IndexNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        } 
        axios.post(
          `${this.$i18n.t('prop.url')}${getFloorPath}`, 
          params, 
          commonUtils.methods.addApiHeader({})
          )
          .then(response => {
            if (response.data.result.code === 0) {
              const query = response.data.responseModel.map(res =>  this.uncapitalizeKeys(res))
              const res = query.length ? query.filter(res => res.indexNo === floorData.indexNo) : [query]
              let result = res.length ? res[0] : JSON.parse(JSON.stringify(this.defaultData))
              result.indexNo =  Number(this.$refs.directInputNoText.value)
              this.$refs.editDialog.open(this.targetStoreCd, result, this.refresh, this.editDlgClose)
              setTimeout(() => {
                this.$refs.editDialog.openEnd()
              }, 50)
              this.editDlgOpen = true
            } else if (response.data.result.code === 2) {
              this.classData = []
              this.$refs.editDialog.open(this.targetStoreCd, {...this.defaultData, indexNo: Number(this.$refs.directInputNoText.value)}, this.refresh, this.editDlgClose)
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
        } else {
          this.$refs.directInputNoText.value = ''
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
    selectedIndex (index) {
      let floorData = this.findFloorDataList[index-1]
      const params = { 
        IndexNo: floorData.indexNo,
        nodeId: this.targetStoreCd,
        orderBy: 'IndexNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      axios.post(
        `${this.$i18n.t('prop.url')}${getFloorPath}`, 
        params, 
        commonUtils.methods.addApiHeader({})
        )
        .then(response => {
          if (response.data.result.code === 0) {
            // 0:正常
            const query = response.data.responseModel.map(res =>  this.uncapitalizeKeys(res))
            const res = query.length ? query.filter(res => res.indexNo === floorData.indexNo) : [query]
            let result = res.length ? res[0] : JSON.parse(JSON.stringify(this.defaultData))
            result.indexNo =  index
            result.isDefault = result.floorNo === 0
            this.$refs.editDialog.open(this.targetStoreCd, result, this.refresh, this.editDlgClose)
            setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            this.classData = []
            this.$refs.editDialog.open(this.targetStoreCd, {...this.defaultData, indexNo: index}, this.refresh, this.editDlgClose)
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
    async refresh () {
      if (await this.getFloor() === true) {
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
      this.$router.push('/TopPage')
    },
    globalErrorMapping (result) {
      if (result.code === -99) {
        let errorMessage = result.errorMessageMap['indexNo'].toString().split(',').join('')
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
      })
    }
  },
  created () {
    this.$root.winId = 'F322b9'
    window.addEventListener('beforeunload', this.confirmUnload)
    this.getSessionBusinessUnitCd()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
    clearTimeout(this.timeout)
  },
  async mounted () {
    this.searchData = ''
    let vue = this
    let belongStoreCdStr = ''
    vue.$root.$once('getBelongStoreCd', (belongStoreCd) => {
      belongStoreCdStr = belongStoreCd;
    })
    let belongStoreNameStr = ''
    vue.$root.$once('getBelongStoreName', (belongStoreName) => {
      belongStoreNameStr = belongStoreName
    })
    let targetStoreCd = ''
    vue.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      vue.headquartersAuthority = headquartersAuthority
      if (headquartersAuthority !== 1) {
        if (targetStoreCd) {
          vue.targetStoreText = belongStoreNameStr
          vue.targetStoreCd = targetStoreCd
          vue.operationLockStore = false
        }
      }
      await this.initialize()
      await this.$nextTick()
      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementById('storeSelectBtn').focus()
        } else {
          this.$refs.directInputNoText.focus()
        }
      }, 200)
    })
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
        this.findFloorDataList = []
        this.dispFloorDataList = []
        this.getFloor()
      } else {
        if (this.findFloorDataList === null || this.findFloorDataList.length === 0) return
        this.filtering()
      }
    }
  }
}
// KSD V001.000 AE
