/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221207  dingxin(Neusoft)  G001.00.0  issue課題#1097を対応します.
 * 20221221  dingxin(Neusoft)  G002.00.0  issue課題#1212、#1032を対応します.
 * 20221229  dingxin(Neusoft)  G003.00.0  issue課題#1225を対応します.
 * 20230104  duyouwei(Neusoft) G004.00.0  issue課題#1029を対応します.
 * 20230109  bai.ry(Neusoft) G005.00.0  issue課題#1378を対応します.
 * 20230208  dingxin(Neusoft)  G006.00.0  issue課題#1403を対応します.
 * 20230231  dingxin(Neusoft)  G007.00.0  issue課題#1583を対応します.
 * 20230316  xu.jh(Neusoft)  G008.00.0  issue課題#1444を対応します.
 * 20230331  xu.jh(Neusoft)  G009.00.0  issue課題#1618を対応します.
 * 20230417  dingxin(Neusoft)  G010.00.0  issue課題#1442を対応します.
 * 20230419  wangchunmei(Neusoft)  G010.00.0  issue課題#1558を対応します.
 * 20230423  dingxin(Neusoft)  G011.00.0  issue課題#1662を対応します.
 * 20230614  wangchunmei(Neusoft)  G012.00.0  issue課題#1639を対応します.
 * 20230728  qurn(Neusoft)     G013.00.0  issue課題#1060を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import editDialog from '@/resource/templates/TransactionNameSetting/TransactionNameEditDialog'
import configSelectCommonCondition from '@/resource/templates/ConfigSelect/ConfigSelectCommonCondition'
// G010.00.0 Add-Start
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
// G010.00.0 Add-End
import commonUtils from '../Common/commonUtils'
import axios from 'axios'

const configSelectPath = '/F322a3/取引別名称設定'
const settingType = 'NAME_TRANSACTION_SETTINGS'

// G004.00.0 Update-Start
// const fetchCurrentConfiguration = 'Reservation/FetchConfiguration'
const fetchCurrentConfiguration = 'Reservation/FetchConfigurationRecursive'
// G004.00.0 Update -End
const putCurrentConfiguration = 'Reservation/UpdateConfiguration'
const fetchReservationDetail = 'Reservation/FetchDetail'
const putReservationDetail = 'Reservation/UpdateDetail'
// G002.00.0 Add-Start
const destroyReservationDetail = 'Reservation/DestroyDetail'
// G002.00.0 Add-End

export default {
  name: 'TransactionNameSetting',
  props: {
    targetStoreCodes: {
      type: Array,
      required: true
    },
    typeOfSetting: {
      type: String,
      required: true
    },
    propChangeDateText: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      searchIndexFlg: -1,
      searchIndexTemp: -1,
      selectedIndex: -1,
      // G011.00.0 Add-Start
      permissions: [],
      // G011.00.0 Add-End
      // G002.00.0 Add-Start
      disabledFixedBtn: this.typeOfSetting === 'past',
      disabledDeleteBtn: this.isCloning || this.typeOfSetting === 'current',
      disabledCloneBtn: this.isCloning || this.typeOfSetting !== 'past',
      isCloning: false,
      // G002.00.0 Add-End
      settingList: [],
      setting: {},
      changeDateText: this.propChangeDateText,
      // G010.00.0 Add-Start
      storeName: '',
      // G010.00.0 Add-End
      // G006.00.0 Add-Start
      futureDateText: '',
      // G006.00.0 Add-End

      settingListSortKeys: [{
        displayName: '取引別No順',
        key: 'transactionNo'
      },
      {
        displayName: '印字No順',
        key: 'printNo'
      }],
      sortIndex: 0,

      searchWord: '',
      matchingIndices: [],
      searchIndex: 0
    }
  },
  computed: {
    // G002.00.0 Add-Start
    typeOfSettingWithCloning () {
      return this.isCloning ? 'new' : this.typeOfSetting
    },
    // G002.00.0 Add-End
    noMatching () {
      return this.matchingIndices.length === 0
    },
    matchingIndex () {
      return this.noMatching ? null : this.matchingIndices[this.searchIndex]
    }
  },
  components: {
    popup,
    maintButton,
    editDialog,
    configSelectCommonCondition,
    // G010.00.0 Add-Start
    dialogStoreSelect
    // G010.00.0 Add-End
  },
  methods: {
    /* ----- API から取得 ----- */
    async fetchSettingList () {
    },
    swapArray (arrayObject, index1, index2) {
      arrayObject.splice(index2, 1, ...arrayObject.splice(index1, 1, arrayObject[index2]))
    },
    /* ----- 検索 ----- */
    addSearchIndex (step) {
      // G013.00.0 Update-Start
      const len = this.matchingIndices.length
      this.searchIndex = ((this.searchIndex + step) % len + len) % len
      // this.$refs['chip' + this.searchIndex][0].focus()
      this.$refs['chip' + this.matchingIndices[this.searchIndex]][0].focus()
      // this.selectedIndex = this.searchIndex
      this.selectedIndex = this.matchingIndices[this.searchIndex]
      // G005.00.0 Add-Start
      // setTimeout(() => {
      //   const offsetTop = document.getElementsByClassName('selected')[0].offsetTop
      //   if (offsetTop > (window.screen.height - 410)) {
      //     window.scrollTo({
      //       top: offsetTop,
      //       behavior: 'smooth'
      //     })
      //   }
      // }, 200)

      // G005.00.0 Add-End
      // G013.00.0 Update-End
    },
    searchByWord () {
      const word = this.searchWord

      if (word === '') {
        // 無入力の場合はマッチングなし
        this.matchingIndices = []
      } else {
        // word を含む設定の index をフィルタリング
        this.matchingIndices = this.settingList.map((setting, index) => {
          if (setting.displayName.default.includes(word) ||
          // G002.00.0 Update-Start
          // setting.displayName.print.includes(word)) {
              setting.printName.default.includes(word)) {
            // G002.00.0 Update-End
            return index
          } else {
            return null
          }
        }).filter(index => index !== null)
      }

      this.searchIndex = 0
    },
    /* ----- ソート ----- */
    incrementSortIndex () {
      const len = this.settingListSortKeys.length
      this.sortIndex = (this.sortIndex + 1) % len
    },
    sortSettingList () {
      const key = this.settingListSortKeys[this.sortIndex].key
      this.settingList.sort((lhs, rhs) => {
        const lvalue = lhs[key]
        const rvalue = rhs[key]
        if (key === 'printNo') {
          // 印字Noが0(非表示)のものは末尾へ
          if (lvalue === 0 && rvalue === 0) {
            return 0
          } else if (lvalue === 0 && rvalue !== 0) {
            return 1
          } else if (lvalue !== 0 && rvalue === 0) {
            return -1
          }
        }
        return lvalue < rvalue ? -1 : lvalue > rvalue ? 1 : 0
      })
    },
    /* ----- 編集ダイアログ ----- */
    openEditDialog (index) {
      const setting = JSON.parse(JSON.stringify(this.settingList[index]))
      this.$refs.editDialog.open(setting, index)
    },
    saveCallback (setting, index) {
      this.$set(this.settingList, index, setting)
    },
    /* ----- サイドバー ----- */
    async backToConfigSelect () {
      this.$router.push(configSelectPath)
    },
    // G008.00.0 Add-Start
    async close () {
      // G009.00.0 Update start
      // this.$refs.pop.open(1, '終了', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToTopPage, false, () => {})
      // G009.00.0 Update end
    },
    backToTopPage () {
      this.$router.push({
        name: 'TopPage'
      })
    },
    // G008.00.0 Add-End
    // G002.00.0 Add-Start
    clone () {
      // G009.00.0 Update start
      // this.$refs.pop.open(1, '再利用', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.copyCurrentSetting, false, () => { })
      // G009.00.0 Update end
    },
    async copyCurrentSetting () {
      await this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      this.changeDateText = null
      this.isCloning = true
      this.disabledFixedBtn = false
      this.disabledCloneBtn = true
      this.disabledDeleteBtn = true
    },
    del () {
      // G009.00.0 Update start
      // this.$refs.pop.open(1, '削除', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータを削除してよろしいですか？', '', true, this.deleteConfiguration, false, () => { })
      // G009.00.0 Update end
    },
    deleteConfiguration () {
      this.destroyReservationDetail(this.targetStoreCodes[0], this.changeDateText)
    },
    async destroyReservationDetail (nodeId, dateText) {
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + destroyReservationDetail, {
          nodeId: nodeId,
          type: settingType,
          executionDate: dateText,
          configuration: this.setting
        }, commonUtils.methods.getApiHeader())

        if (response.data.responseModel) {
          // G002.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322a3.W003'), '', true, () => {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
          // G002.00.0 Update -End
            this.$router.push(configSelectPath)
          }, false, null)
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E002'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a2.E002'), '', false, null, false, null)
      }
    },
    stop () {
      // G009.00.0 Update start
      // this.$refs.pop.open(1, '中止', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => { })
      this.$refs.pop.open(1, '確認', '編集中のデータは破棄されます。よろしいですか？', '', true, this.backToSelect, false, () => { })
      // G009.00.0 Update end
    },
    backToSelect () {
      this.$router.push({
        name: 'F322a3',
        params: {
          paramTargetStoreCodes: this.targetStoreCodes
        }
      })
    },
    // G002.00.0 Add-End
    initialize () {
      // G002.00.0 Update-Start
      // if (this.typeOfSetting === 'new') {
      //   this.getCurrentSetting(this.targetStoreCodes[0])
      // } else if (this.typeOfSetting === 'current') {
      //   this.getCurrentSetting(this.targetStoreCodes[0])
      if (this.typeOfSetting === 'new' || this.typeOfSetting === 'current') {
        this.disabledDeleteBtn = true
        this.getCurrentSetting(this.targetStoreCodes[0])
      // G002.00.0 Update-End
      } else {
        // G006.00.0 Add-Start
        this.futureDateText = this.changeDateText
        // G006.00.0 Add-End
        this.getReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      }
      // G010.00.0 Add-Start
      const vue = this
      if (!('storeMasters' in vue.masters)) return ''
      let store = vue.masters.storeMasters.find(element => element.name === this.targetStoreCodes[0])
      this.storeName = store === undefined ? undefined : store.displayName.default
      // G010.00.0 Add-End
    },
    async getReservationDetail (nodeId, dateText) {
      axios.put(this.$i18n.t('prop.url') + fetchReservationDetail, {
        nodeId: nodeId,
        excludeFields: false,
        type: settingType,
        executionDate: dateText
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          if (response.data.responseModel) {
            const settings = response.data.responseModel
            if (settings.length > 0) {
              this.setConfigurationSetting(settings[0])
              // G010.00.0 Add-Start
              this.sortSettingList()
              // G010.00.0 Add-End
            } else {
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    setConfigurationSetting (setting) {
      this.setting = setting
      this.settingList = setting.configurationSetting.NAME_TRANSACTION_SETTINGS.value
    },
    getCurrentSetting (nodeId) {
      axios.put(this.$i18n.t('prop.url') + fetchCurrentConfiguration, {
        nodeId: nodeId,
        excludeFields: false,
        type: settingType
      }, commonUtils.methods.getApiHeader())
        .then(response => {
          if (response.data.responseModel) {
            this.setCurrentConfiguration(response.data.responseModel)
            // G010.00.0 Add-Start
            this.sortSettingList()
            // G010.00.0 Add-End
          } else {
            this.emptyConfigurationSetting()
          }
        })
        .catch(error => {
          console.log(error)
          // G003.00.0 Add-Start
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
          // G003.00.0 Add-End
        })
    },
    setCurrentConfiguration (setting) {
      if (this.typeOfSetting === 'new') {
        let value = setting.configurations.NAME_TRANSACTION_SETTINGS.value
        // G001.00.0 Delete-Start
        // value = value.map(item => {
        //   return {
        //     ...item,
        //     'displayName': {
        //       'default': '',
        //       'print': ''
        //     },
        //     'printNo': ''
        //   }
        // })
        // G001.00.0 Delete-End
        this.setting = {
          configurationSetting: {
            'NAME_TRANSACTION_SETTINGS': {
              'type': 'List',
              'subGroup': 'CONFIG',
              'group': 'STORE_OPERATIONS',
              'name': 'NAME_TRANSACTION_SETTINGS',
              'value': value
            }
          },
          configurationType: 'NAME_TRANSACTION_SETTINGS',
          executionDate: null,
          nodeId: null
        }
        this.settingList = value
      } else {
        this.setting = setting
        this.settingList = setting.configurations.NAME_TRANSACTION_SETTINGS.value
      }
    },
    async fixed () {
      console.log(this.settingList, 'this.settingLIst')
      // G002.00.0 Add-Start
      if (this.changeDateText == null || this.changeDateText === '') {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a3.W004'), '', false, null, false, null)
        return
      }
      // G002.00.0 Add-End
      if (this.typeOfSetting === 'current') {
        this.loadChangedCurrentSetting()
        await this.saveCurrentSetting(this.targetStoreCodes[0])
      } else {
        this.loadChangedConfigurationSetting()
        if (this.typeOfSetting === 'new') {
          this.setting.nodeId = this.targetStoreCodes[0]
          this.setting.executionDate = this.changeDateText
        }
        await this.saveReservationDetail(this.targetStoreCodes[0], this.changeDateText)
      }

      // G002.00.0 Delete-Start
      // this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', true, () => {
      //   this.$router.push(configSelectPath)
      // }, false, null)
      // G002.00.0 Delete-End
    },
    // G010.00.0 Add-Start
    async listButtonClicked () {
      this.$router.push({name: 'F322a3-output',
        params: {
          list: this.settingList,
          storeName: this.storeName,
          changeDateText: this.changeDateText,
          targetStoreCodes: this.targetStoreCodes,
          typeOfSetting: this.typeOfSetting,
          propChangeDateText: this.propChangeDateText
        }})
    },
    // G010.00.0 Add-End
    async saveReservationDetail (nodeId, dateText) {
      // G002.00.0 Add-Start
      if (this.isCloning || this.typeOfSetting === 'new') {
        try {
          const response = await axios.put(this.$i18n.t('prop.url') + fetchReservationDetail, {
            nodeId: nodeId,
            excludeFields: false,
            type: settingType,
            executionDate: dateText
          }, commonUtils.methods.getApiHeader())

          if (response.data.responseModel) {
            const settings = response.data.responseModel

            if (settings.length > 0) {
              this.$refs.pop.open(3, '', '指定の変更基準日には既に予約の設定があります。他の日付に変更するか、一覧に戻り指定の変更基準日の予約の設定をご確認ください。', '', false, null, false, null)
              return
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      // G002.00.0 Add-End
      // G006.00.0 Add-Start
      if (this.typeOfSetting === 'future') {
        if (this.futureDateText !== this.changeDateText) {
          try {
            const response = await axios.put(this.$i18n.t('prop.url') + fetchReservationDetail, {
              nodeId: nodeId,
              excludeFields: false,
              type: settingType,
              executionDate: dateText
            }, commonUtils.methods.getApiHeader())

            if (response.data.responseModel) {
              const settings = response.data.responseModel

              if (settings.length > 0) {
                this.$refs.pop.open(3, '', '指定の変更基準日には既に予約の設定があります。他の日付に変更するか、一覧に戻り指定の変更基準日の予約の設定をご確認ください。', '', false, null, false, null)
                return
              }
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
      // G006.00.0 Add-End
      // G007.00.0 Add-Start
      if (this.isCloning) {
        this.setting.version = null
        this.setting.id = null
      }
      // G007.00.0 Add-End
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putReservationDetail, {
          nodeId: nodeId,
          type: settingType,
          executionDate: dateText,
          configuration: this.setting
        }, commonUtils.methods.getApiHeader())

        if (response.data.responseModel) {
          // G002.00.0 Add-Start
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
          // G002.00.0 Add-End
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a3.E001'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a3.E001'), '', false, null, false, null)
      }
    },
    loadChangedCurrentSetting () {
      this.setting.configurations.NAME_TRANSACTION_SETTINGS.value = this.settingList
    },
    loadChangedConfigurationSetting () {
      this.setting.configurationSetting.NAME_TRANSACTION_SETTINGS.value = this.settingList
    },
    async saveCurrentSetting (nodeId) {
      try {
        const response = await axios.put(this.$i18n.t('prop.url') + putCurrentConfiguration, {
          nodeId: nodeId,
          type: settingType,
          configuration: this.setting,
          mode: 0
        }, commonUtils.methods.getApiHeader())

        // G002.00.0 Update-Start
        // if (response.data.responseModel) {
        if (response.data.result.code === 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), response.data.result.code, false, () => {
            this.$router.push(configSelectPath)
          }, false, null)
        // G002.00.0 Update-End
        } else {
          this.$refs.pop.open(3, '', this.$i18n.t('F322a3.E001'), '', false, null, false, null)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322a3.E001'), '', false, null, false, null)
      }
    }
  },
  watch: {
    sortIndex () {
      this.sortSettingList()
    },
    searchWord () {
      this.selectedIndex = -1
      this.searchByWord()
    },
    settingList () {
      this.searchByWord()
    }
  },

  async created () {
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322a3-edit'
    window.addEventListener('beforeunload', this.confirmUnload)
    await this.fetchSettingList()
  },
  async mounted () {
    // G011.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G011.00.0 Add-End
    await this.$nextTick()
    // G010.00.0 Add-Start
    // G012.00.0 Update-Start
    // this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
    this.masters = await this.$refs.dialogStoreSelect.getMastersNoAuth(false)
    // G012.00.0 Update-End
    // G010.00.0 Add-End
    this.initialize()
    // this.sortSettingList()
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
