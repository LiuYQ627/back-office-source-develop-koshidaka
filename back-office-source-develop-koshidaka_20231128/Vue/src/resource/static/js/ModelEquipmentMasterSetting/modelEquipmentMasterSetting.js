//  KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import editDialog from '@/resource/templates/ModelEquipmentMasterSetting/ModelEquipmentMasterSettingEditDialog'

const getAllDataPath = 'RentalsModel/Query'
const getEquipMaster = 'RentalsEquipment/Query'

export default {
  name: 'ModelEquipmentMasterSetting',
  data () {
    return {
      allEquipList: [],
      headquartersAuthority: 0,
      initialized: false,
      lastSearchData: '',
      masters: {},
      modelSettingData: [],
      modelSettingDataDisplay: [],
      operationLock: true,
      resultCount: 0,
      settingCdInputData: '',
      searchData: '',
      sessionBusinessUnitCd: '',
      timeout: null
    }
  },
  components: {
    popup,
    maintButton,
    dialogStoreSelect,
    editDialog
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
    },
    async fetchData () {
      if (this.sessionBusinessUnitCd === null || this.sessionBusinessUnitCd === '' || this.sessionBusinessUnitCd === undefined) return
      if (await this.getAllEquipments() === false) return
      if (await this.getModelSettingData() === false) return
      this.operationLock = false
      await this.$nextTick(() => {
        if (this.$refs.settingCdText != null) {
          this.$refs.settingCdText.focus()
        }
      })
    },
    async getAllEquipments () {
      this.allEquipList = []
      let result = false
      try {
        const params = {
          equipNo: 0,
          nodeId: this.sessionBusinessUnitCd,
          orderBy: 'equipNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0 }
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getEquipMaster}`, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.allEquipList = response.data.responseModel
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する店舗なし
          this.allEquipList = []
          result = true
        } else {
          this.operationLock = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    async getModelSettingData () {
      this.modelSettingData = null
      this.modelSettingDataDisplay = null
      let result = false
      this.resultCount = 0
      try {
        const params = {
          modelNo: 0,
          nodeId: this.sessionBusinessUnitCd,
          orderBy: 'modelNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getAllDataPath}`, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.modelSettingData = response.data.responseModel
          this.modelSettingDataDisplay = this.modelSettingData
          this.modelSettingDataDisplay.forEach(element => {
            element['equipName'] = ''
            for (let i = 0; i < this.allEquipList.length; i++) {
              if (element.equipNo === this.allEquipList[i].equipNo) {
                element['equipName'] = this.allEquipList[i].equipName
                break
              }
            }
          })
          this.resultCount = this.modelSettingData === null ? 0 : this.modelSettingData.length
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する店舗なし
          result = true
        } else {
          this.operationLock = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.operationLock = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
        return false
      }
    },
    settingCdInput () {
      this.settingCdInputData = this.settingCdInputData.replace(/[^0-9]/gi, '')
    },
    getSessionBusinessUnitCd () {
      let vue = this
      this.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
        vue.sessionBusinessUnitCd = businessUnitCdStr
        vue.fetchData()
      })
    },
    async directInput () {
      let dataList = []
      let newSet = {
        nodeId: this.sessionBusinessUnitCd,
        modelNo: Math.abs(Number(this.$refs.settingCdText.value)),
        modelName: '',
        modelShortName: '',
        equipNo: 0
      }
      if (Math.abs(this.$refs.settingCdText.value) === 0 || this.$refs.settingCdText.value === '') {
        this.settingCdInputData = ''
      } else {
        this.dataList = []
        const params = {
          modelNo: Number(this.$refs.settingCdText.value),
          nodeId: this.sessionBusinessUnitCd,
          orderBy: 'modelNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }
        try {
          if (!await this.$refs.editDialog.getAllEquipments(this.sessionBusinessUnitCd)) return
          let response = await axios.post(`${this.$i18n.t('prop.url')}${getAllDataPath}`, params, commonUtils.methods.addApiHeader({}))
          if (response.data.result.code === 0) {
            // 0:正常
            this.modelSettingData = response.data.responseModel
            dataList = this.modelSettingData
            if (dataList.length > 0) {
              this.$refs.editDialog.open(this.sessionBusinessUnitCd, dataList[0], this.refresh, this.editDlgClose, this.$i18n.t('C00219.S012'))
              this.timeout = setTimeout(() => {
                this.$refs.editDialog.openEnd()
              }, 50)
              this.editDlgOpen = true
            } else {
              this.$refs.editDialog.open(this.sessionBusinessUnitCd, newSet, this.refresh, this.editDlgClose, this.$i18n.t('C00219.S013'))
              this.timeout = setTimeout(() => {
                this.$refs.editDialog.openEnd()
              }, 50)
              this.editDlgOpen = true
            }
          } else if (response.data.result.code === 2) {
            this.$refs.editDialog.open(this.sessionBusinessUnitCd, newSet, this.refresh, this.editDlgClose, this.$i18n.t('C00219.S013'))
            this.timeout = setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else {
            this.searchErrorMapping(response.data.result)
          }
        } catch (error) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        }
      }
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        let errorMessage = result.errorMessageMap['modelNo'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    closeTab () {
      this.$router.push('/TopPage')
    },
    async selectedModelSetting (index) {
      this.dataList = []
      let checker = 0
      const params = {
        modelNo: index,
        nodeId: this.sessionBusinessUnitCd,
        orderBy: 'modelNo',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      try {
        if (!await this.$refs.editDialog.getAllEquipments(this.sessionBusinessUnitCd)) return
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getAllDataPath}`, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.modelSettingData = response.data.responseModel
          for (let i = 0; i < this.modelSettingData.length; i++) {
            if (this.modelSettingData[i].modelNo === index) {
              this.$refs.editDialog.open(this.sessionBusinessUnitCd, this.modelSettingData[i], this.refresh, this.editDlgClose, this.$i18n.t('C00219.S012'))
              this.timeout = setTimeout(() => {
                this.$refs.editDialog.openEnd()
              }, 50)
              this.editDlgOpen = true
              break
            }
            checker = i + 1
          }

          if (checker === this.modelSettingData.length) {
            this.$refs.editDialog.open(this.sessionBusinessUnitCd, this.modelSettingData[0], this.refresh, this.editDlgClose, this.$i18n.t('C00219.S012'))
            this.timeout = setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          }
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },
    async editDlgClose () {
      this.editDlgOpen = false
      this.settingCdInputData = ''
    },
    async refresh () {
      this.modelSettingData = []
      this.modelSettingDataDisplay = []
      this.allEquipList = []
      if (await this.getAllEquipments() === true && await this.getModelSettingData() === true) {
        return true
      } else {
        return false
      }
    },
    confirmUnload (event) {
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    }
  },
  created () {
    this.getSessionBusinessUnitCd()
    this.$root.winId = 'C00219'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
    clearTimeout(this.timeout)
  },
  async mounted () {
    this.searchData = ''
    await this.initialize()
    await this.$nextTick()
  }
}
//  KSD V001.000 AE
