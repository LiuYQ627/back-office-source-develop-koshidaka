// KSD V001.000 AS
import commonUtils from '@/resource/static/js/Common/commonUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
import SelectInput from '@/resource/templates/CommonInput/SelectInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import GuidanceSettingForm from '@/resource/templates/GuidanceSetting/GuidanceSettingForm.vue'
import GuidanceSettingList from '@/resource/templates/GuidanceSetting/GuidanceSettingList.vue'
import axios from 'axios'

const GUIDANCE_SETTING_SAVE_URL = 'RestaurantsMcFscp/Update'
const GUIDANCE_SETTING_QUERY_URL = 'RestaurantsMcFscp/Query'
const GUIDANCE_SETTING_DELETE_URL = 'RestaurantsMcFscp/Delete'
const GUIDANCE_SETTING_GLOBAL_MENU_QUERY_URL = 'RestaurantsSetTool/DbSelect'

export default {
  name: 'GuidanceSettingMainLayout',
  mixins: [transformUtils, errorMappingUtils],
  data () {
    return {
      dataModel: {
        selectData: 1
      },
      selectDataOptions: [
        { name: this.$i18n.t('F32283.S003'), value: 1 },
        { name: this.$i18n.t('F32283.S004'), value: 2 },
        { name: this.$i18n.t('F32283.S005'), value: 3 },
        { name: this.$i18n.t('F32283.S006'), value: 4 },
        { name: this.$i18n.t('F32283.S007'), value: 5 },
        { name: this.$i18n.t('F32283.S008'), value: 6 }
      ],
      headquartersAuthorityCheckEnable: true,
      targetStoreCodes: [],
      guidanceSettingList: [],
      globalMenuCodesObject: null,
      selectedIndexNo: [],
      selectedDataModel: null,
      isGuidanceSettingListEnabled: false,
      isGuidanceSettingFormEnabled: false,
      isGuidanceSettingFormCreateMode: false
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    FormGroupLayout,
    SelectInput,
    GuidanceSettingList,
    GuidanceSettingForm
  },
  computed: {
    disableList: function () {
      return !this.isGuidanceSettingListEnabled || this.isGuidanceSettingFormEnabled
    },
    disableForm: function () {
      return !this.isGuidanceSettingListEnabled || !this.isGuidanceSettingFormEnabled
    },
    disableFixedButton: function () {
      return !this.isGuidanceSettingFormEnabled
    },
    disableStopButton: function () {
      return !this.isGuidanceSettingFormEnabled
    },
    disableDelButton: function () {
      return !this.isGuidanceSettingFormEnabled || this.isGuidanceSettingFormCreateMode
    },
    disableCloseButton: function () {
      return this.isGuidanceSettingFormEnabled
    },
    disableSelectionList: function () {
      return this.isGuidanceSettingFormEnabled
    },
    dataCount: function () {
      return this.guidanceSettingList.length
    },
    globalMenuCodesList () {
      if (!this.globalMenuCodesObject) return []
      if (!this.globalMenuCodesObject.resultInfo) return []
      return this.globalMenuCodesObject.resultInfo.records
    },
    hideScreenContent () {
      if (!this.targetStoreCodes) return false
      if (this.targetStoreCodes.length === 0) return false
      return true
    }
  },
  methods: {
    async initializeData () {
      if (this.targetStoreCodes.length === 0) return
      await this.getGlobalMenuCodeTable()
      if (this.globalMenuCodesObject === null) return
      await this.getSCPTable()
    },
    async getGlobalMenuCodeTable () {
      this.globalMenuCodesObject = null
      await this.masterDataQuery(
        GUIDANCE_SETTING_GLOBAL_MENU_QUERY_URL,
        {
          table: 'tgcp_restaurants_mc_fumenu',
          query: {
            $and: [
              {
                nodeId: this.targetStoreCodes[0]
              },
              {
                $or: [
                  {
                    MenuAttr: 1
                  },
                  {
                    MenuAttr: 2
                  },
                  {
                    MenuAttr: 3
                  }
                ]
              }
            ]
          },
          projection: {
            Code: 1,
            Name2: 1,
            MenuAttr: 1
          },
          sort: [ { Code: 1 } ],
          apicaller: 'callbo_orderguid'
        },
        null,
        (responseModel) => {
          this.globalMenuCodesObject = responseModel
        }
      ).then((values) => {
        if (values.data.result.code === 2) {
          this.globalMenuCodesObject = {}
        }
        this.isGuidanceSettingListEnabled = true
        // 部屋一覧を有効化状態とする
        this.isSelectDataMode = true
      }, (error) => {
        this.targetStoreCodes = []
        console.error(error)
      }).catch((error) => {
        this.targetStoreCodes = []
        console.error(error)
      })
    },
    async getSCPTable () {
      this.isGuidanceSettingListEnabled = false
      this.guidanceSettingList.length = 0
      this.guidanceSettingList = []
      await this.masterDataQuery(
        GUIDANCE_SETTING_QUERY_URL,
        {
          nodeId: this.targetStoreCodes[0],
          ScpNo: 0,
          orderBy: 'ScpNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        },
        null,
        (responseModel) => {
          this.guidanceSettingList.length = 0
          this.guidanceSettingList = [...responseModel].map((guidanceSetting) => {
            const menuCodes = [...Array(32).keys()].map(x => {
              return guidanceSetting[`MenuCode${x + 1}`]
            }).filter((menuCode) => Number(menuCode) !== 0)
            return {
              ScpNo: guidanceSetting.ScpNo,
              GidName: guidanceSetting.GidName,
              MinQty: guidanceSetting.MinQty,
              MaxQty: guidanceSetting.MaxQty,
              MenuCodes: menuCodes,
              version: guidanceSetting.version
            }
          }
          )
        }
      ).then((values) => {
        this.isGuidanceSettingListEnabled = true
        // 部屋一覧を有効化状態とする
        this.isSelectDataMode = true
      }, (error) => {
        this.targetStoreCodes = []
        console.error(error)
      }).catch((error) => {
        this.targetStoreCodes = []
        console.error(error)
      })
    },
    handleCloseMaintButton () {
      this.$router.push('/TopPage')
    },
    handleStopMaintButton () {
      // 中止ボタン押下時
      // 破棄確認画面を表示する
      this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          // 棄確認画面で「OK」を選択した場合
          this.resetForm()
        }
      })
    },
    inputRequiredCheck () {
      // 部屋設定項目欄に未入力の項目があるチェック
      return this.$refs.GuidanceSettingForm.validateInputCheck()
    },
    inputRequiredQuantityCheck () {
      // 部屋設定項目欄に未入力の項目があるチェック
      return this.$refs.GuidanceSettingForm.validateInputQuantityCheck()
    },
    minMaxInputCheck () {
      // 部屋設定項目欄に未入力の項目があるチェック
      return this.$refs.GuidanceSettingForm.validateMinMax()
    },
    preprocessData () {
      let { guidanceSetting } = JSON.parse(JSON.stringify(this.selectedDataModel))
      Array(32).fill(0).forEach((x, i) => {
        const index = i
        guidanceSetting[`MenuCode${index + 1}`] = guidanceSetting.MenuCodes[index] ? guidanceSetting.MenuCodes[index] : '0'.repeat(14)
      })
      guidanceSetting.MinQty = Number(guidanceSetting.MinQty)
      guidanceSetting.MaxQty = Number(guidanceSetting.MaxQty)
      if (guidanceSetting.MaxQty === 0 && this.getGuidanceType(guidanceSetting.ScpNo) === 4) {
        guidanceSetting.MaxQty = 1
      }
      const nodeId = this.targetStoreCodes[0]
      delete guidanceSetting.MenuCodes
      return {...guidanceSetting, nodeId}
    },
    async updateMasterData () {
      const vue = this
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      // 部屋設定項目欄に設定した内容を部屋情報マスタに保存する
      await this.masterDataUpdate(GUIDANCE_SETTING_SAVE_URL, this.preprocessData())
        .then(async (values) => {
          await vue.getSCPTable()
          vue.resetForm()
          if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
          // 処理結果画面を表示する
          await vue.openPopupDialog({
            mode: 2,
            messageCode: 'O00004.W002'
          })
        }, (error) => {
          console.error(error)
        }).catch((error) => {
          console.error(error)
        })
    },
    async handleFixedMaintButton () {
      this.$refs.GuidanceSettingForm.errorFound = true
      this.$refs.GuidanceSettingForm.saveSelected = true
      // 保存ボタン押下時
      const inputRequiredNameCheck = this.inputRequiredCheck()
      // 屋設定項目欄に未入力の項目がある場合
      if (inputRequiredNameCheck !== true) {
        await this.openPopupDialog({
          mode: 3,
          messageCode: 'F32283.S026',
          code: '-0099'
        })
        this.$refs.GuidanceSettingForm.saveSelected = false
        return
      }
      if (this.$refs.GuidanceSettingForm.getGuidanceType === 4) {
        const inputRequiredQuantityCheck = this.inputRequiredQuantityCheck()
        // 屋設定項目欄に未入力の項目がある場合
        if (inputRequiredQuantityCheck !== true) {
          await this.openPopupDialog({
            mode: 3,
            messageCode: 'F32283.S027',
            code: '-0099'
          })
          this.$refs.GuidanceSettingForm.saveSelected = false
          return
        }
        const minMaxInputCheck = this.minMaxInputCheck()
        if (minMaxInputCheck !== true) {
          await this.openPopupDialog({
            mode: 3,
            messageCode: 'F32283.W001',
            code: '-0099'
          })
          this.$refs.GuidanceSettingForm.saveSelected = false
          return
        }
      }
      // エラーとならない場合
      await this.updateMasterData()
      this.$refs.GuidanceSettingForm.saveSelected = false
    },
    handleDelMaintButton () {
      // 削除ボタン押下時
      // 削除確認画面を表示する
      this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W005',
        showBackBtn: true,
        okBtnCallback: async () => {
          // 削除確認画面で「OK」を選択した場合
          await this.deleteMasterData()
        }
      })
    },
    async deleteMasterData () {
      const vue = this
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      // 部屋の該当アイテムに対し、部屋情報マスタから削除する
      const params = {
        nodeId: this.targetStoreCodes[0],
        ScpNo: this.selectedDataModel.guidanceSetting.ScpNo
      }
      await this.masterDataDelete(GUIDANCE_SETTING_DELETE_URL, params)
        .then(async (values) => {
          await vue.getSCPTable()
          vue.resetForm()
          if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
          // 処理結果画面を表示する
          await this.openPopupDialog({
            mode: 2,
            messageCode: 'O00004.W002'
          })
        }, (error) => {
          console.error(error)
        }).catch((error) => {
          console.error(error)
        })
    },
    resetForm () {
      // 部屋一覧の選択状態を解除する
      this.selectedIndexNo = []

      this.$refs.GuidanceSettingForm.resetForm()
      // 部屋設定項目欄に設定した内容を初期化する
      this.selectedDataModel = null
      // 部屋設定項目欄を無効化状態とする、部屋一覧を有効化状態とする
      this.isGuidanceSettingFormEnabled = false
      this.isGuidanceSettingFormCreateMode = false
    },
    handleListSelectionChanged (selectedDataModel) {
      // 部屋一覧にて部屋を選択状態とした場合
      this.selectedDataModel = JSON.parse(JSON.stringify(selectedDataModel))
      // 部屋一覧を無効化状態、部屋設定項目欄を有効化状態とする
      this.isGuidanceSettingFormEnabled = true
      this.isGuidanceSettingFormCreateMode = this.selectedDataModel.isCreate
    },
    masterDataQuery (url, requestPayload, queryParams, successCallback) {
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (successCallback != null) {
                successCallback(response.data.responseModel)
              }
              resolve(response)
              break
            case 2: // 2:該当する情報なし
              resolve(response)
              break
            default: // その他
              this.globalErrorMapping(response.data.result)
              reject(response)
              break
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        }).catch(async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        })
      })
    },
    masterDataUpdate (url, requestPayload, queryParams) {
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              resolve(response)
              break
            default: // その他
              this.globalErrorMapping(response.data.result)
              reject(response)
              break
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        }).catch(async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        })
      })
    },
    masterDataDelete (url, requestPayload, queryParams, successCallback) {
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (successCallback != null) {
                successCallback(response.data.responseModel)
              }
              resolve(response)
              break
            default: // その他
              this.globalErrorMapping(response.data.result)
              reject(response)
              break
          }
        }, async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        }).catch(async (error) => {
          console.error(error)
          await this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          reject(error)
        })
      })
    },
    confirmUnload (event) {
      if (this.isGuidanceSettingFormEnabled) {
        event.returnValue = ''
      }
    },
    setErrorFocus (fields) {
      fields.find((x) => {
        if (x.hasError) {
          if (x.$children[0].$el.tagName === 'DIV') return setTimeout(() => x.$children[0].$el.children[0].focus(), 100)
          else return setTimeout(() => x.$children[0].$el.focus(), 100)
        }
      })
    },
    getGuidanceType (scpNo) {
      const range = [35, 40, 50, 100, 150, 185, 190, 200, 250, 300, 335, 340, 350, 400, 450]
      const result = range.indexOf(range.find((element) => scpNo <= element))
      return (result % 5) + 1
    }
  },
  created () {
    this.$root.winId = 'F32283'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.$nextTick()
    await this.initializeData()
    const authority = this.$refs.storeSelect.headquartersAuthorityCheckEnable
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 100)
  },
  watch: {
    targetStoreCodes: async function (storeCodes) {
      // 対象店舗が変わる場合、初期化する
      this.guidanceSettingList = []
      this.selectedIndexNo = []
      this.selectedDataModel = null
      this.isSelectDataMode = false
      this.isGuidanceSettingFormCreateMode = false
      this.isGuidanceSettingFormEnabled = false
      this.isGuidanceSettingListEnabled = false
      if (this.targetStoreCodes[0]) await this.initializeData()
    }
  }
}
// KSD V001.000 AE
