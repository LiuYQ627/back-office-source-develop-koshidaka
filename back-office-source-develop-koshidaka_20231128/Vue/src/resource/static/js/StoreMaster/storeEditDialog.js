/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230216  dingxin(Neusoft)      G001.00.0  issue課題#1054を対応します.
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
// KSD V001.000 AS
import dataUtils from '@/resource/static/js/Common/dataUtils'
// KSD V001.000 AE
const savePath = 'StoreMaster/StoreInfoRegist'
const deletePath = 'StoreMaster/StoreInfoDeleted'
// KSD V001.000 AS
const storeGroupPath = 'Reservation/FetchConfigurationRecursive'
const settingType = ''
// KSD V001.000 AE
export default {
  // KSD V001.000 AS
  mixins: [dataUtils],
  // KSD V001.000 AE
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      selectedOpr: 1,
      selectedGrp1: 1,
      selectedGrp2: 1,
      storeData: {
        storeCd: 0,
        storeCdStr: '000000',
        name: '',
        postNo: '',
        address: '',
        phone: '',
        fax: '',
        operationalForm: 0,
        eatIn: 0,
        storeGroup1: 0,
        storeGroup2: 0,
        // KSD V001.000 AS
        group1Input: '',
        group2Input: '',
        sessionBusinessUnitCd: '',
        BUSINESS_DAY_START_TIME: '',
        BUSINESS_DAY_SOFT_END_TIME: '',
        BUSINESS_DAY_HARD_END_TIME: '23:59',
        configurations: { 
          BUSINESS_DAY_START_TIME: { 
            value: ''
          }, 
          BUSINESS_DAY_SOFT_END_TIME: { 
            value: ''
          }
        }, 
        corporateData: null,
        // KSD V001.000 AE
        displayOrder: 0,
        masterUpdate: ''
      },
      operationalDataList: [
        {
          'storeOperationalFormName': '権限1',
          'storeOperationalFormCd': '1'
        },
        {
          'storeOperationalFormName': '権限2',
          'storeOperationalFormCd': '2'
        }
      ],
      // KSD V001.000 MS
      // group1DataList: [],
      // group2DataList: [],
      group1DataList: { storeGroupInfos: { value: [] } },
      group2DataList: { storeGroupInfos: { value: [] } },
      // KSD V001.000 ME
      // G001.00.0 Add start
      permissions: [],
      // G001.00.0 Add end
      displayOrder: '',
      nameErrorMsg: '',
      postNoErrorMsg: '',
      addressErrorMsg: '',
      telNoErrorMsg: '',
      faxNoErrorMsg: '',
      dspOrderErrorMsg: '',
      refreshFunc: null,
      closeFunc: null,
      focusItem: null
      // KSD V001.000 AS
      , isNew: false,
      startTime: ''
      // KSD V001.000 AE
    }
  },
  components: {
    popup
  },
  methods: {
    // KSD V001.000 MS
    // open (storeCd, storeData, operationalDataList, group1DataList, group2DataList, refreshFunc, closeFunc) {
    async open (storeCd, storeData, operationalDataList, refreshFunc, closeFunc, isNew) {
    // KSD V001.000 ME
      // KSD V001.000 DS
      // this.dialog = true
      // KSD V001.000 DE
      this.refreshFunc = refreshFunc
      // KSD V001.000 AS
      await this.getStoreGroup()
      this.dialog = true
      // KSD V001.000 AE
      this.closeFunc = closeFunc
      this.operationalDataList = operationalDataList
      this.isNew = isNew
      // KSD V001.000 DS
      // this.group1DataList = group1DataList
      // this.group2DataList = group2DataList
      // KSD V001.000 DE
      if (storeData !== null) {
        this.mode = 2
        this.title = this.$i18n.t('F00003.S011')
        this.storeData = storeData
        // KSD V001.000 AS
        this.startTime = storeData.configurations.BUSINESS_DAY_START_TIME.value
        if (this.storeData.configurations.BUSINESS_DAY_START_TIME.value === '') {
          this.storeData.configurations.BUSINESS_DAY_START_TIME.value = this.startTime = '00:00'
        }
        // KSD V001.000 AE
      } else {
        // KSD V001.000 AS
        const CONFIG_KEYS = {
          START: 'configurations.BUSINESS_DAY_START_TIME.value'
        }
        // KSD V001.000 AE
        this.mode = 1
        this.title = this.$i18n.t('F00003.S010')
        this.storeData = {
          storeCd: ('000000' + storeCd).slice(-6),
          storeCdStr: ('000000' + storeCd).slice(-6),
          name: '',
          postNo: '',
          address: '',
          phone: '',
          fax: '',
          operationalForm: 0,
          //          eatIn: 0,
          //          storeGroup1: group1DataList.storeGroupInfos.length === 0 ? 0 : group1DataList.storeGroupInfos[0].storeGroupValue,
          //          storeGroup2: group2DataList.storeGroupInfos.length === 0 ? 0 : group2DataList.storeGroupInfos[0].storeGroupValue,
          displayOrder: 0
          // KSD V001.000 AS
          , storeGroup1: 0,
          storeGroup2: 0,
          BUSINESS_DAY_START_TIME: '',
          configurations: {
            BUSINESS_DAY_START_TIME: {
              value: this.checkKeyHasValue(this.corporateData, CONFIG_KEYS.START, []) ? this.corporateData.configurations.BUSINESS_DAY_START_TIME.value : '00:00'
            }, 
            BUSINESS_DAY_SOFT_END_TIME: { 
              value: this.checkKeyHasValue(this.corporateData, CONFIG_KEYS.START, []) ? this.corporateData.configurations.BUSINESS_DAY_START_TIME.value : '00:00'
            }
          },
          BUSINESS_DAY_SOFT_END_TIME: '',
          BUSINESS_DAY_HARD_END_TIME: '23:59'
          // KSD V001.000 AE
          //          masterUpdate: ''
        }
        // KSD V001.000 AS
        this.startTime = this.checkKeyHasValue(this.corporateData, CONFIG_KEYS.START, []) ? this.corporateData.configurations.BUSINESS_DAY_START_TIME.value : '00:00'
        // KSD V001.000 AE
      }
      this.selectedOpr = this.storeData.operationalForm
      //      this.selectedGrp1 = this.storeData.storeGroup1
      //      this.selectedGrp2 = this.storeData.storeGroup2
      this.displayOrder = this.storeData.displayOrder
      //      this.masterUpdate = this.storeData.masterUpdate
      this.initErrorMessage()
    },
    openEnd () {
      document.getElementsByClassName('textStoreName')[0].focus()
      document.getElementById('baseTable').scrollTo(0, 0)

      // 対象店舗の店舗グループが存在するかチェック
      //      if (this.mode === 1) {
      //        // 新規モードの場合は以下の処理を行わない
      //        return
      //      }
      //      const result1 = this.group1DataList.storeGroupInfos.some((u) => u.storeGroupValue === this.storeData.storeGroup1)
      //      const result2 = this.group2DataList.storeGroupInfos.some((s) => s.storeGroupValue === this.storeData.storeGroup2)
      //      // 存在しない場合はエラーポップアップを表示して、「0:設定なし」を選択状態に変更
      //      if (!result1 || !result2) {
      //        if (!result1) {
      //          this.selectedGrp1 = 0
      //        }
      //        if (!result2) {
      //          this.selectedGrp2 = 0
      //        }
      //        this.$refs.pop.open(3, '', this.$i18n.t('F00003.S030'), '', false, null, false, null)
      //      }
    },
    enterValid () {
      document.getElementById('eatInValid').checked = true
      this.onRadioChange()
    },
    enterInvalid () {
      document.getElementById('eatInInvalid').checked = true
      this.onRadioChange()
    },
    onRadioChange () {
      if (document.getElementById('eatInValid').checked) {
        this.storeData.eatIn = 1
      } else {
        this.storeData.eatIn = 0
      }
    },
    // KSD V001.000 AS
    async getStoreGroup () {
      var result = false
      this.group1DataList = { storeGroupInfos: { value: [] } }
      this.group2DataList = { storeGroupInfos: { value: [] } }
      try {
        const params = {
          nodeId: this.sessionBusinessUnitCd,
          excludeFields: false,
          type: settingType
        }
        let response = await axios.put(this.$i18n.t('prop.url') + storeGroupPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          this.corporateData = response.data.responseModel
          // 0:正常
          Object.entries(response.data.responseModel.configurations).forEach(([key, value]) => {
            if (key === 'STORE_GROUP_1') {
              this.group1DataList.storeGroupInfos = value
            }
            if (key === 'STORE_GROUP_2') {
              this.group2DataList.storeGroupInfos = value
            }
          })
          if (response.data.storeGroupInfos === null) {
            // 店舗グループマスタが0件(null)の場合は処理を終了
            return true
          }
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E003'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    // KSD V001.000 AE
    postNoTextInput (str) {
      if (str == 'postno') {
        this.storeData.postNo = this.storeData.postNo.replace(/[^0-9-]/gi, '')
      } else if (str == 'telNo') {
        this.storeData.phone = this.storeData.phone.replace(/[^0-9-]/gi, '')
      } else if (str == 'faxNo') {
        this.storeData.fax = this.storeData.fax.replace(/[^0-9-]/gi, '')
      }
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    async onClickSave () {
      // KSD V001.000 AS
      if (!this.isNew && this.storeData.configurations.BUSINESS_DAY_START_TIME.value !== this.$refs.startTime.value) {
        this.$refs.pop.open(1, '', this.$i18n.t('F00003.E019'), '', true, this.confirmSave, false, null)
      } else {
        this.confirmSave()
      }
    },
    async confirmSave () {
      this.storeData.configurations.BUSINESS_DAY_START_TIME.value = this.startTime
      // KSD V001.000 AE
      this.initErrorMessage()
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (await this.executeSave() === true) {
        if (await this.refreshFunc() === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.closeFunc()
          this.dialog = false
        } else {
          this.$refs.pop.closeFunction()
        }
      }
    },
    async executeSave () {
      var result = false
      // KSD V001.000 AS
      const startTime = this.storeData.configurations.BUSINESS_DAY_START_TIME
      const softEndTime = this.storeData.configurations.BUSINESS_DAY_SOFT_END_TIME
      const hardEndTime = this.storeData.configurations.BUSINESS_DAY_HARD_END_TIME
      // KSD V001.000 AE
      try {
        const params = {
          stores: [
            {
              storeCd: this.storeData.storeCd,
              storeCdStr: ('000000' + this.storeData.storeCd).slice(-6),
              name: this.$refs.nameText.value,
              postNo: this.$refs.postNoText.value,
              address: this.$refs.addressText.value,
              phone: this.$refs.telNoText.value,
              fax: this.$refs.faxNoText.value,
              operationalForm: this.$refs.operationalFormText.value,
              //              eatIn: this.storeData.eatIn,
              //              storeGroup1: this.$refs.storeGroup1Text.value,
              //              storeGroup2: this.$refs.storeGroup2Text.value,
              displayOrder: this.$refs.dspOrderText.value,
              //              masterUpdate: this.storeData.masterUpdate,
              mode: this.mode
              // KSD V001.000 AS
              , storeGroup1: this.$refs.storeGroup1Text.value === '' ? 0 : Number(this.$refs.storeGroup1Text.value),
              storeGroup2: this.$refs.storeGroup2Text.value === '' ? 0 : Number(this.$refs.storeGroup2Text.value),
              configurations: {
                BUSINESS_DAY_START_TIME: {
                  ...startTime, 
                  value: this.$refs.startTime.value
                },
                BUSINESS_DAY_SOFT_END_TIME: {
                  ...softEndTime, 
                  value: this.$refs.startTime.value
                },
                BUSINESS_DAY_HARD_END_TIME: {
                  ...hardEndTime, 
                  value: '23:59'
                }
              }
              // KSD V001.000 AE
            }
          ]
        }
        // 更新
        let response = await axios.put(this.$i18n.t('prop.url') + savePath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00003.E007'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    async onClickDelete () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.runDelete, false, null)
    },
    async runDelete () {
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // 削除
      if (await this.executeDelete() === true) {
        if (await this.refreshFunc() === true) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          this.closeFunc()
          this.dialog = false
        } else {
          this.$refs.pop.closeFunction()
        }
      }
    },
    async executeDelete () {
      var result = false
      try {
        var storeCd = this.storeData.storeCd
        let response = await axios.delete(this.$i18n.t('prop.url') + deletePath + '/' + storeCd, commonUtils.methods.addApiHeader({data: 'storeCd'}))
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00003.E010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    saveErrorMapping (result) {
      this.focusItem = null
      if (result.code === -99) {
        // 画面項目の下から順に評価
        if (result.errorMessageMap['stores[0].displayOrder'] !== undefined) {
          this.dspOrderErrorMsg = result.errorMessageMap['stores[0].displayOrder'].toString().split(',')
          this.focusItem = this.$refs.dspOrderText
        }
        if (result.errorMessageMap['stores[0].faxNo'] !== undefined) {
          this.faxNoErrorMsg = result.errorMessageMap['stores[0].faxNo'].toString().split(',')
          this.focusItem = this.$refs.faxNoText
        }
        if (result.errorMessageMap['stores[0].phone'] !== undefined) {
          this.telNoErrorMsg = result.errorMessageMap['stores[0].phone'].toString().split(',')
          this.focusItem = this.$refs.telNoText
        }
        if (result.errorMessageMap['stores[0].fax'] !== undefined) {
          this.faxNoErrorMsg = result.errorMessageMap['stores[0].fax'].toString().split(',')
          this.focusItem = this.$refs.faxNoText
        }
        if (result.errorMessageMap['stores[0].address'] !== undefined) {
          this.addressErrorMsg = result.errorMessageMap['stores[0].address'].toString().split(',')
          this.focusItem = this.$refs.addressText
        }
        if (result.errorMessageMap['stores[0].postNo'] !== undefined) {
          this.postNoErrorMsg = result.errorMessageMap['stores[0].postNo'].toString().split(',')
          this.focusItem = this.$refs.postNoText
        }
        if (result.errorMessageMap['stores[0].name'] !== undefined) {
          this.nameErrorMsg = result.errorMessageMap['stores[0].name'].toString().split(',')
          this.focusItem = this.$refs.nameText
        }
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), result.code, false, this.setFocus, false, null)
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
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    initErrorMessage () {
      this.nameErrorMsg = ''
      this.postNoErrorMsg = ''
      this.addressErrorMsg = ''
      this.telNoErrorMsg = ''
      this.faxNoErrorMsg = ''
      this.dspOrderErrorMsg = ''
    },
    // 住所欄にテキスト貼り付けを行った際に改行を削除する
    pasteAddressText () {
      setTimeout(() => {
        this.storeData.address = this.storeData.address.toString().replace(/\r?\n/g, '')
      }, 50)
    },
    inputLimit (str, maxLength) {
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
          if (this.storeData.name == str) {
            this.storeData.name = str.toString().substring(0, i)
          } else if (this.storeData.address == str) {
            this.storeData.address = str.toString().substring(0, i)
          }
          break
        } else {
          // maxLength以下は何もしない
        }
      }
    }
    // KSD V001.000 AS
    , timeInputRegulation () {
      if (this.startTime === '') {
        this.startTime = '00:00'
      }
    }
    // KSD V001.000 AE
  },
  // G001.00.0 Add start
  async mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    }) 
    // KSD V001.000 AS
    this.$root.$once('getBusinessUnitCdStr', async (businessUnitCdStr) => {
      this.sessionBusinessUnitCd = businessUnitCdStr
    })
    // KSD V001.000 AE
  },
  // G001.00.0 Add end
  watch: {
    displayOrder: function (val) {
      this.displayOrder = this.displayOrder.toString().replace(/[^0-9]/gi, '')
    }
  }
}
