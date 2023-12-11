// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import RoomInfoMasterSettingList from '@/resource/templates/RoomInfoMasterSetting/RoomInfoMasterSettingList'
import RoomInfoMasterSettingForm from '@/resource/templates/RoomInfoMasterSetting/RoomInfoMasterSettingForm'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'

const RESTAURANTS_TABLE_QUERY_URL = 'RestaurantsTable/Query'
const RESTAURANTS_TABLE_UPDATE_URL = 'RestaurantsTable/Update'
const RESTAURANTS_TABLE_UPDATE_DELETE_URL = 'RestaurantsTable/UpdateDelete'
const RENTALS_ROOM_QUERY_URL = 'RentalsRoom/Query'
const RENTALS_ROOM_UPDATE_URL = 'RentalsRoom/Update'
const RENTALS_ROOM_DELETE_URL = 'RentalsRoom/Delete'

const DEFAULT_DATA_MODEL = {
  indexNo: 0,
  table: {
    indexNo: 0,
    tblNo: '',
    restNo: 0,
    tblName: '',
    tblNameShort: '',
    sekiryo: 0,
    hoSts: 0,
    tblAutoNo: 0
  },
  room: {
    indexNo: null,
    tblNo: '',
    maxCount: null,
    // roomExtendAvailable: true,
    roomPlusPrice: null,
    roomPriority: null,
    drinkbarRoomPriority: null,
    freeFlowingDrinkRoomPriority: null,
    specialRoom: true,
    reservedAvailable: true
  }
}

export default {
  name: 'RoomInfoMasterSetting',
  mixins: [transformUtils, errorMappingUtils],
  data () {
    return {
      headquartersAuthorityCheckEnable: true,
      targetStoreCodes: [],
      restaurantsTableMasterList: [],
      rentalsRoomMasterList: [],
      selectedIndexNo: [],
      selectedDataModel: null,
      isRoomInfoMasterSettingListEnabled: false,
      isRoomInfoMasterSettingFormEnabled: false,
      isRoomInfoMasterSettingFormCreateMode: false
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    RoomInfoMasterSettingList,
    RoomInfoMasterSettingForm,
    FormGroupLayout
  },
  computed: {
    disableList: function () {
      return !this.isRoomInfoMasterSettingListEnabled || this.isRoomInfoMasterSettingFormEnabled
    },
    disableForm: function () {
      return !this.isRoomInfoMasterSettingListEnabled || !this.isRoomInfoMasterSettingFormEnabled
    },
    dataCount: function () {
      return Math.min(this.restaurantsTableMasterList.length, this.rentalsRoomMasterList.length)
    },
    disableFixedButton: function () {
      return !this.isRoomInfoMasterSettingFormEnabled
    },
    disableStopButton: function () {
      return !this.isRoomInfoMasterSettingFormEnabled
    },
    disableDelButton: function () {
      return !this.isRoomInfoMasterSettingFormEnabled || this.isRoomInfoMasterSettingFormCreateMode
    },
    disableCloseButton: function () {
      return this.isRoomInfoMasterSettingFormEnabled
    }
  },
  methods: {
    async initialize () { },
    async initializeRoomInfoMasterList () {
      this.rentalsRoomMasterList.length = 0
      this.restaurantsTableMasterList.length = 0
      this.rentalsRoomMasterList = []
      this.restaurantsTableMasterList = []
      let querySuccess = true
      // 部屋情報マスタ設定の取得
      // 「テーブルマスタ」を取得する
      await this.masterDataQuery(
        RESTAURANTS_TABLE_QUERY_URL,
        {
          nodeId: this.targetStoreCodes[0],
          IndexNo: 0,
          orderBy: 'IndexNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        },
        null,
        (responseModel) => {
          this.restaurantsTableMasterList.length = 0
          this.restaurantsTableMasterList = [...responseModel.map(room => this.uncapitalizeKeys(room))]
        }
      ).then(async (response) => {
        // 「部屋情報マスタ」を取得する
        await this.masterDataQuery(
          RENTALS_ROOM_QUERY_URL,
          {
            nodeId: this.targetStoreCodes[0],
            indexNo: 0,
            orderBy: 'indexNo',
            ascending: true,
            startIndex: 0,
            batchSize: 0
          },
          null,
          (responseModel) => {
            this.rentalsRoomMasterList.length = 0
            this.rentalsRoomMasterList = [...responseModel]
          }
        )
      }, (error) => {
        this.targetStoreCodes = []
        console.error(error)
        querySuccess = false
      }).catch((error) => {
        this.targetStoreCodes = []
        console.error(error)
        querySuccess = false
      }).finally(() => {
        // 部屋一覧を有効化状態とする
        this.isRoomInfoMasterSettingListEnabled = querySuccess
      })
    },
    resetForm () {
      // 部屋一覧の選択状態を解除する
      this.selectedIndexNo = []
      // 部屋設定項目欄に設定した内容を初期化する
      this.selectedDataModel = null
      // 部屋設定項目欄を無効化状態とする、部屋一覧を有効化状態とする
      this.isRoomInfoMasterSettingFormEnabled = false
      this.isRoomInfoMasterSettingFormCreateMode = false
    },
    preprocessData () {
      let { table, room } = this.selectedDataModel
      table.floorNo = Math.floor((Number(table.indexNo) - 1) / 50) + 1
      room.maxCount = this.zeroSuppress(room.maxCount)
      room.roomPlusPrice = this.zeroSuppress(room.roomPlusPrice)
      room.roomPriority = this.zeroSuppress(room.roomPriority)
      room.drinkbarRoomPriority = this.zeroSuppress(room.drinkbarRoomPriority)
      room.freeFlowingDrinkRoomPriority = this.zeroSuppress(room.freeFlowingDrinkRoomPriority)

      table.nodeId = this.targetStoreCodes[0]
      room.nodeId = this.targetStoreCodes[0]
      table = this.capitalizeKeys(table)
      return { table, room }
    },
    async updateMasterData () {
      const vue = this
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })

      let { table, room } = this.preprocessData()

        // KSD V001.000 AS 更新パラメータに余計なフィールドが含まれていてエラーになる対応
        delete table.createTimestamp
        delete table.lastModifiedTimestamp
        delete table.lastModifiedUserId
        delete table._id
        delete room.createTimestamp
        delete room.lastModifiedTimestamp
        delete room.lastModifiedUserId
        delete room._id
        // KSD V001.000 AE 更新パラメータに余計なフィールドが含まれていてエラーになる対応

      let success = true
      // 部屋設定項目欄に設定した内容をテーブルマスタに保存する
      table.TblNo = table.TblNo.padStart(5, ' ')
      room.tblNo = room.tblNo.padStart(5, ' ')
      await this.masterDataUpdate(
        RESTAURANTS_TABLE_UPDATE_URL,
        table,
        null,
        null
      ).then(async (response) => {
        // 部屋設定項目欄に設定した内容を部屋情報マスタに保存する
        await this.masterDataUpdate(
          RENTALS_ROOM_UPDATE_URL,
          room,
          null,
          null
        ).catch((error) => {
          console.log(error)
          success = false
        })
      }, (error) => {
        console.error(error)
        success = false
      }).catch((err) => {
        this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
        console.error(err)
      })
      if (success) {
        await vue.initializeRoomInfoMasterList()
        vue.resetForm()
        if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
        // 処理結果画面を表示する
        await vue.openPopupDialog({
          mode: 2,
          messageCode: 'O00004.W002'
        })
      }
    },
    async deleteMasterData () {
      const vue = this
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })

      let { table } = this.preprocessData()
      let success = true

      // 部屋の該当アイテムに対し、テーブルマスタを初期値で更新する
      await this.masterDataUpdate(
        RESTAURANTS_TABLE_UPDATE_DELETE_URL,
        Object.assign({}, table, this.capitalizeKeys(DEFAULT_DATA_MODEL.table), {
          IndexNo: this.selectedDataModel.table.indexNo,
          nodeId: this.targetStoreCodes[0]
        }),
        null,
        null
      ).then(async (response) => {
        // 部屋の該当アイテムに対し、部屋情報マスタから削除する
        let url = RENTALS_ROOM_DELETE_URL
        await this.masterDataDelete(
          url,
          {
            nodeId: this.targetStoreCodes[0],
            indexNo: this.selectedDataModel.indexNo
          },
          null
        ).catch((error) => {
          console.log(error)
          success = false
        })
      }, (error) => {
        console.error(error)
        success = false
      }).catch((err) => {
        console.error(err)
      })

      if (success) {
        await vue.initializeRoomInfoMasterList()
        vue.resetForm()
        if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
        // 処理結果画面を表示する
        await this.openPopupDialog({
          mode: 2,
          messageCode: 'O00004.W002'
        })
      }
    },
    inputCheck () {
      // 部屋設定項目欄に未入力の項目があるチェック
      return this.$refs.roomInfoMasterSettingForm.validateForm()
    },
    duplicateCheck () {
      // テーブルNoが、同ノードID内で重複しているチェック
      return this.$refs.roomInfoMasterSettingForm.validateUniqueForm()
    },
    masterDataQuery (url, requestPayload, queryParams, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (successCallback) {
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
        }, (err) => {
          this.targetStoreCodes = []
          this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(err)
          reject(err)
        }).catch((err) => {
          this.targetStoreCodes = []
          this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(err)
          reject(err)
        })
      })
    },
    masterDataUpdate (url, requestPayload, queryParams, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (successCallback) {
                successCallback(response.data.responseModel)
              }
              resolve(response)
              break
            default: // その他
              this.globalErrorMapping(response.data.result)
              reject(response)
              break
          }
        }, (err) => {
          this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(err)
          reject(err)
        }).catch((err) => {
          this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(err)
          reject(err)
        })
      })
    },
    masterDataDelete (url, requestPayload, queryParams, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then(async (response) => {
          switch (response.data.result.code) {
            case 0: // 0:正常
              if (successCallback) {
                successCallback(response.data.responseModel)
              }
              resolve(response)
              break
            default: // その他
              this.globalErrorMapping(response.data.result)
              reject(response)
              break
          }
        }, (err) => {
          this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(err)
          reject(err)
        }).catch((err) => {
          this.openPopupDialog({ mode: 3, messageCode: 'O00004.W010' })
          console.error(err)
          reject(err)
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
      this.isRoomInfoMasterSettingFormEnabled = true
      this.isRoomInfoMasterSettingFormCreateMode = this.selectedDataModel.isCreate
    },
    handleCloseMaintButton () {
      this.$router.push('/TopPage')
    },
    async handleFixedMaintButton () {
      let formFields = this.$refs.roomInfoMasterSettingForm.$children
      // 保存ボタン押下時
      const inputCheck = this.inputCheck()
      // 屋設定項目欄に未入力の項目がある場合
      if (inputCheck !== true) {
        await this.openPopupDialog({
          mode: 3,
          code: '-0099',
          messageCode: 'O00004.W006',
          okBtnCallback: () => {
            formFields.find((x) => { if (x.hasError) return setTimeout(() => { x.$children[0].$el.focus() }, 100) })
          }
        })
        return 0
      }
      const duplicateCheck = this.duplicateCheck()
      // テーブルNoが、同ノードID内で重複している場合
      if (duplicateCheck !== true) {
        await this.openPopupDialog({
          mode: 3,
          code: '-0099',
          messageCode: 'C00208.E015',
          okBtnCallback: () => {
            formFields.find((x) => { if (x.hasError) return setTimeout(() => { x.$children[0].$el.focus() }, 100) })
          }
        })
        return 0
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
      if (this.isRoomInfoMasterSettingFormEnabled) {
        event.returnValue = ''
      }
    }
  },
  watch: {
    targetStoreCodes: async function (storeCodes) {
      // 対象店舗が変わる場合、初期化する
      this.restaurantsTableMasterList = []
      this.rentalsRoomMasterList = []
      this.selectedIndexNo = []
      this.selectedDataModel = null
      this.isRoomInfoMasterSettingListEnabled = false
      this.isRoomInfoMasterSettingFormEnabled = false
      this.isRoomInfoMasterSettingFormCreateMode = false
      if (this.targetStoreCodes[0]) await this.initializeRoomInfoMasterList()
    }
  },
  created () {
    this.$root.winId = 'C00208'
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
    }, 100)
  }
}
// KSD V001.000 AE
