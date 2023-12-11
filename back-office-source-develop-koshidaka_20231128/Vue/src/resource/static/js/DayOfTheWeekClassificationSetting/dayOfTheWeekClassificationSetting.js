//  KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/DayOfTheWeekClassificationSetting/DayOfTheWeekClassificationEditDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import { convertCode } from '../../js/Common/jsUtils'

const weekdayDivPath = 'RentalsWeekdayDivision/Query'
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'
const settingType = 'WEEKDAY_COLOR_LIST'

export default {
  name: 'DayOfTheWeekClassificationSetting',
  data () {
    return {
      dispDataList: [],
      findDataList: [],
      resultCount: 0,
      classData: [],
      storeCdData: '',
      dayCdData: '',
      displayData: [],
      editDlgOpen: false,
      headquartersAuthority: 0,
      targetStoreText: '',
      targetStoreCd: 0,
      masters: {},
      operationLock: true,
      operationLockStore: true,
      initialized: false,
      timeout: null,
      colorSetting: false,
      colorSet: [],
      initFetchConfRec: true,
      defaultData: {
        nodeId: '',
        textColorCode: '',
        backColorCode: '',
        weekdayCode: '',
        weekdayName: '',
        weekdayShortName: ''
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
      if (this.initialized) return
      this.initialized = true
      if (this.targetStoreCd) {
        if (await this.getCurrentSetting() === false) return
        if (await this.getColorSetting() === false) return
      }
      if (this.headquartersAuthority === 1) {
        if (await this.getMasters() === false) {
          this.classData = []
          this.findDataList = []
          this.dispDataList = []
          return
        }
        await this.setStore(this.targetStoreCd)
      } else {
        this.$nextTick(() => {
          this.$nextTick(() => {
            const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
            const target = [...focusable].find(x => !x.disabled)
            target.focus()
          })
        })
      }
      this.operationLock = true
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
    async storeSelect () {
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      this.classData = []
      this.findDataList = []
      this.dispDataList = []
      this.targetStoreCd = 0
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
      if (await this.getCurrentSetting() === false) return
      if (await this.getColorSetting() === false) return
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      this.operationLockStore = true
      if (this.masters.storeMasters !== null) {
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.targetStoreText = `${convertCode(this.masters.storeMasters[index].name)}:${this.masters.storeMasters[index].displayName.default}`
          this.operationLockStore = false
        }
      }
    },
    async morphData (response) {
      var found = false
      let data = []
      this.displayData = []
      if (response === true) {
        for (var i = 1; i <= 10; i++) {
          for (var j = 0; j < this.classData.length; j++) {
            if (this.classData[j].weekdayCode === i) {
              found = true
              data = this.classData[j]
            }
          }
          if (found === false) {
            data = {weekdayCode: i, weekdayName: '', weekdayShortName: '', textColorCode: '#000000', backColorCode: '#ffffff', mode: 1}
            this.displayData.push(data)
          } else {
            data['mode'] = 2
            this.displayData.push(data)
            data = []
            found = false
          }
        }
      } else {
        for (var x = 1; x <= 10; x++) {
          data = {weekdayCode: x, weekdayName: '', weekdayShortName: '', textColorCode: '#000000', backColorCode: '#ffffff', mode: 1}
          this.displayData.push(data)
        }
      }
      this.resultCount = this.displayData === null ? 0 : this.classData.filter(res => res.weekdayCode).length
    },
    async getCurrentSetting () {
      var result = false
      this.resultCount = 0
      this.displayData = []
      try {
        const params = {
          weekdayCode: 0,
          nodeId: this.targetStoreCd,
          orderBy: 'weekdayCode',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        }
        let response = await axios.post(`${this.$i18n.t('prop.url')}${weekdayDivPath}`, params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          this.classData = response.data.responseModel
          this.classData.forEach(element => {
            element.textColorCode = this.colorConverter(element.textColorCode)
            element.backColorCode = this.colorConverter(element.backColorCode)
          })
          // this.filtering()
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する端末管理情報なし
          this.classData = []
          result = true
        } else {
          this.targetStoreCd = 0
          this.targetStoreText = ''
          this.operationLockStore = true
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.targetStoreCd = 0
        this.targetStoreText = ''
        this.operationLockStore = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    colorConverter (number) {
      let x = ''
      let hex = number.toString(16)
      let finalHex = '#'
      if (hex.length < 6) {
        x = 6 - hex.length
        for (let y = 1; y <= x; y++) {
          finalHex += '0'
        }
        finalHex += hex
      } else {
        finalHex += hex
      }
      return finalHex
    },
    closeTab () {
      this.$router.push('/TopPage')
    },
    async refresh () {
      if (await this.getCurrentSetting() === true) {
        await this.morphData(true)
        return true
      } else {
        return false
      }
    },
    weekdayCodeInput () {
      this.dayCdData = this.dayCdData.replace(/[^0-9]/gi, '')
    },
    integerInRange (value, min, max) {
      if (value.target.value < min || value.target.value > max) {
        this.dayCdData = ''
      }
    },
    selectedColorSetting (item, index) {
      index = index + 1
      const params = {
        weekdayCode: index,
        nodeId: this.targetStoreCd,
        orderBy: 'weekdayCode',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      axios.post(`${this.$i18n.t('prop.url')}${weekdayDivPath}`, params, commonUtils.methods.addApiHeader({}))
        .then(response => {
          if (response.data.result.code === 0) {
            const res = response.data.responseModel.length ? response.data.responseModel[0] : [response.data.responseModel]
            const result = res.weekdayCode === index ? res : {...this.defaultData, weekdayCode: index, textColorCode: 0, backColorCode: 16777215}
            if (result.length) {
              result.textColorCode = this.colorConverter(result.textColorCode)
              result.backColorCode = this.colorConverter(result.backColorCode)
            }
            this.$refs.editDialog.open(2, this.targetStoreCd, result, this.refresh, this.editDlgClose, this.colorSetting, this.colorSet)
            this.timeout = setTimeout(() => {
              this.$refs.editDialog.openEnd()
            }, 50)
            this.editDlgOpen = true
          } else if (response.data.result.code === 2) {
            if (item.mode === 2) {
              this.searchErrorMapping(response.data.result)
              this.editDlgOpen = false
            } else {
              const result = {...this.defaultData, weekdayCode: index, textColorCode: 0, backColorCode: 16777215}
              this.$refs.editDialog.open(1, this.targetStoreCd, result, this.refresh, this.editDlgClose, this.colorSetting, this.colorSet)
              this.timeout = setTimeout(() => {
                this.$refs.editDialog.openEnd()
              }, 50)
              this.editDlgOpen = true
            }
          } else {
            this.searchErrorMapping(response.data.result)
          }
        })
        .catch(error => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
      this.editDlgOpen = true
      this.initFetchConfRec = false
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        let errorMessage = result.errorMessageMap['weekdayCode'].toString().split(',').join('')
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
    async editDlgClose () {
      this.editDlgOpen = false
      this.dayCdData = ''
    },
    confirmUnload (event) {
      if (this.editDlgOpen) {
        event.returnValue = ''
      }
    },
    async getColorSetting () {
      this.check = false
      this.colorSet = []
      let tempSet = []
      let rowX = []
      let row = []
      try {
        let response = await axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
          nodeId: this.nodeId,
          type: settingType,
          excludeFields: false
        }, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          this.responseSet = response.data.responseModel.configurations.WEEKDAY_COLOR_LIST.value
          for (var i = 1; i <= Object.keys(this.responseSet).length; i++) {
            if (i % 7 === 0) {
              row.push(this.colorConverter(this.responseSet[`color` + ('0' + i).slice(-2)]))
              rowX.push(this.responseSet[`color` + ('0' + i).slice(-2)])
              tempSet.push(rowX)
              this.colorSet.push(row)
              rowX = []
              row = []
            } else if (i === Object.keys(this.responseSet).length) {
              row.push(this.colorConverter(this.responseSet[`color` + ('0' + i).slice(-2)]))
              rowX.push(this.responseSet[`color` + ('0' + i).slice(-2)])
              tempSet.push(rowX)
              this.colorSet.push(row)
              rowX = []
              row = []
            } else {
              row.push(this.colorConverter(this.responseSet[`color` + ('0' + i).slice(-2)]))
              rowX.push(this.responseSet[`color` + ('0' + i).slice(-2)])
            }
          }
          this.colorSetting = true
          await this.morphData(true)
          return true
        } else {
          this.displayData = []
          this.resultCount = 0
          this.targetStoreCd = 0
          this.targetStoreText = ''
          this.operationLockStore = true
          this.colorSetting = false
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.displayData = []
        this.resultCount = 0
        this.targetStoreCd = 0
        this.targetStoreText = ''
        this.operationLockStore = true
        this.colorSetting = false
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    }
  },
  created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'C00214'
    window.addEventListener('beforeunload', this.confirmUnload)
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
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.headquartersAuthority = headquartersAuthority
      if (headquartersAuthority !== 1) {
        if (targetStoreCd) {
          vue.targetStoreText = `${belongStoreCdStr}:${belongStoreNameStr}`
          vue.targetStoreCd = targetStoreCd
          vue.operationLockStore = false
        }
      }
      await this.initialize()
      await this.$nextTick()

      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementById('storeSelectBtn').focus()
        }
      }, 200)
    })
  }
}
//  KSD V001.000 AE
