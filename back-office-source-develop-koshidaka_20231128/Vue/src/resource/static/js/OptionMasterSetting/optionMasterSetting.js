// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import OptionMasterSettingList from '@/resource/templates/OptionMasterSetting/OptionMasterSettingList'
import OptionMasterSettingForm from '@/resource/templates/OptionMasterSetting/OptionMasterSettingForm'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'

const RENTALS_OPTION_QUERY_URL = 'RentalsDrinkcourse/Query'
const RENTALS_OPTION_UPDATE_URL = 'RentalsDrinkcourse/Update'
const RENTALS_OPTION_DELETE_URL = 'RentalsDrinkcourse/Delete'

export default {
  name: 'OptionMasterSetting',
  mixins: [transformUtils, errorMappingUtils],
  data () {
    return {
      headquartersAuthorityCheckEnable: true,
      targetStoreCodes: [],
      rentalsOptionMasterList: [],
      selectedDrinkCourseNo: [],
      selectedDataModel: null,
      isSelectDataMode: false,
      isOptionsMasterSettingListEnabled: false,
      isOptionsMasterSettingFormEnabled: false,
      isOptionsMasterSettingFormCreateMode: false
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    OptionMasterSettingList,
    OptionMasterSettingForm,
    FormGroupLayout
  },
  computed: {
    disableList: function () {
      return !this.isOptionsMasterSettingListEnabled || this.isOptionsMasterSettingFormEnabled
    },
    disableForm: function () {
      return !this.isOptionsMasterSettingListEnabled || !this.isOptionsMasterSettingFormEnabled
    },
    dataCount: function () {
      return this.rentalsOptionMasterList.length
    },
    disableFixedButton: function () {
      return !this.isOptionsMasterSettingFormEnabled
    },
    disableStopButton: function () {
      return !this.isOptionsMasterSettingFormEnabled
    },
    disableDelButton: function () {
      return !this.isOptionsMasterSettingFormEnabled || this.isOptionsMasterSettingFormCreateMode
    },
    disableCloseButton: function () {
      return this.isOptionsMasterSettingFormEnabled
    }
  },
  methods: {
    async initialize () { },
    async initializeOptionMasterList () {
      this.isOptionsMasterSettingListEnabled = false
      this.rentalsOptionMasterList.length = 0
      this.rentalsOptionMasterList = []
      await this.masterDataQuery(
        RENTALS_OPTION_QUERY_URL,
        {
          nodeId: this.targetStoreCodes[0],
          drinkCourseNo: 0,
          orderBy: 'drinkCourseNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        },
        null,
        (responseModel) => {
          this.rentalsOptionMasterList.length = 0
          this.rentalsOptionMasterList = [...responseModel]
        }
      ).then((values) => {
        this.isOptionsMasterSettingListEnabled = true
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
    resetForm () {
      // 部屋一覧の選択状態を解除する
      this.selectedDrinkCourseNo = []
      // 部屋設定項目欄に設定した内容を初期化する
      this.selectedDataModel = null
      // 部屋設定項目欄を無効化状態とする、部屋一覧を有効化状態とする
      this.isOptionsMasterSettingFormEnabled = false
      this.isOptionsMasterSettingFormCreateMode = false
    },
    preprocessData () {
      let { option } = this.selectedDataModel
      option.nodeId = this.targetStoreCodes[0]
      option.drinkCourseMenuCode1 = option.drinkCourseMenuCode1 !== undefined && Number(option.drinkCourseMenuCode1) !== 0 ? this.zeroSupply(option.drinkCourseMenuCode1, 14) : undefined
      option.drinkCourseMenuCode2 = option.drinkCourseMenuCode2 !== undefined && Number(option.drinkCourseMenuCode2) !== 0 ? this.zeroSupply(option.drinkCourseMenuCode2, 14) : undefined
      option.optionType = Number(option.optionType)
      option.priceOption = Number(option.priceOption)
      let payload = { ...this.selectedDataModel, ...option }
      delete payload.isCreate
      delete payload.option
      return payload
    },
    async updateMasterData () {
      const vue = this
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      // 部屋設定項目欄に設定した内容を部屋情報マスタに保存する
      await this.masterDataUpdate(RENTALS_OPTION_UPDATE_URL, this.preprocessData())
        .then(async (values) => {
          await vue.initializeOptionMasterList()
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
    async deleteMasterData () {
      const vue = this
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      // 部屋の該当アイテムに対し、部屋情報マスタから削除する
      let params = {
        nodeId: this.targetStoreCodes[0],
        drinkCourseNo: this.selectedDataModel.drinkCourseNo
      }
      await this.masterDataDelete(RENTALS_OPTION_DELETE_URL, params)
        .then(async (values) => {
          await vue.initializeOptionMasterList()
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
    inputCheck () {
      // 部屋設定項目欄に未入力の項目があるチェック
      return this.$refs.optionMasterSettingForm.validateInputs()
    },
    existenceCheck () {
      return this.$refs.optionMasterSettingForm.validateExisting()
    },
    uniqueCheck () {
      return this.$refs.optionMasterSettingForm.validateUnique()
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
        axios.put(
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
    async openPopupDialog ({
      mode = 1,
      title = '',
      messageCode = null,
      message = null,
      code = '',
      showBackBtn = false,
      okBtnCallback = null,
      isNonDispStatus = false,
      backBtnCallback = null
    } = {}) {
      if (messageCode !== null && message === null) {
        message = this.$i18n.t(messageCode)
      }
      await this.$refs.pop.open(mode, title, message, code, showBackBtn, okBtnCallback, isNonDispStatus, backBtnCallback)
    },
    closePopupDialog () {
      this.$refs.pop.closeFunction()
    },
    handleListSelectionChanged (selectedDataModel) {
      // 部屋一覧にて部屋を選択状態とした場合
      this.selectedDataModel = JSON.parse(JSON.stringify(selectedDataModel))
      // 部屋一覧を無効化状態、部屋設定項目欄を有効化状態とする
      this.isOptionsMasterSettingFormEnabled = true
      this.isOptionsMasterSettingFormCreateMode = this.selectedDataModel.isCreate
    },
    handleCloseMaintButton () {
      this.$router.push('/TopPage')
    },
    async handleFixedMaintButton () {
      let formFields = this.$refs.optionMasterSettingForm.$children
      await this.$refs.optionMasterSettingForm.synchronizeInputs()
      // 保存ボタン押下時
      const inputCheck = this.inputCheck()
      // 屋設定項目欄に未入力の項目がある場合
      if (inputCheck !== true) {
        await this.openPopupDialog({
          mode: 3,
          messageCode: 'O00004.W006',
          code: '-0099',
          okBtnCallback: () => {
            // エラーに焦点を当てる
            this.setErrorFocus(formFields)
          }
        })
        return
      }
      const existenceCheck = this.existenceCheck()
      if (existenceCheck !== true) {
        await this.$refs.optionMasterSettingForm.openPopupDialog({
          mode: 3,
          messageCode: 'C00217.E009',
          code: '-0099',
          okBtnCallback: () => {
            // エラーに焦点を当てる
            this.setErrorFocus(formFields)
          }
        })
        return
      }
      const uniqueCheck = this.uniqueCheck()
      if (uniqueCheck !== true) {
        await this.openPopupDialog({
          mode: 3,
          messageCode: 'C00217.E010',
          code: '-0099',
          okBtnCallback: () => {
            // エラーに焦点を当てる
            this.setErrorFocus(formFields)
          }
        })
        return
      }
      // エラーとならない場合
      await this.updateMasterData()
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
    confirmUnload (event) {
      if (this.isOptionsMasterSettingFormEnabled) {
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
    }
  },
  watch: {
    targetStoreCodes: async function (storeCodes) {
      // 対象店舗が変わる場合、初期化する
      this.rentalsOptionMasterList = []
      this.selectedDrinkCourseNo = []
      this.selectedDataModel = null
      this.isSelectDataMode = false
      this.isOptionsMasterSettingFormCreateMode = false
      this.isOptionsMasterSettingFormEnabled = false
      this.isOptionsMasterSettingListEnabled = false
      if (this.targetStoreCodes[0]) await this.initializeOptionMasterList()
    }
  },
  created () {
    this.$root.winId = 'C00217'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.$nextTick()
    await this.initialize()

    let authority = this.$refs.storeSelect.headquartersAuthorityCheckEnable
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 200)
  }
}
// KSD V001.000 AE
