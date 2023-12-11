// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '@/resource/static/js/Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import ticketTypeMasterSettingTemplate from '@/resource/templates/CommonDesign/MasterSettingLayout'
import tableRenderer from '@/resource/templates/CommonDesign/TableRenderer'
import buttonRenderer from '@/resource/templates/TicketTypeMasterSetting/TicketTypeMasterSettingForm'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import popup from '@/resource/templates/CommonDesign/Popup'

const getRestaurantsTicket = 'RestaurantsTicket/Query'
const savePath = 'RestaurantsTicket/Update'
const deletePath = 'RestaurantsTicket/Delete'

export default {
  name: 'ticketTypeMasterSetting',
  data () {
    return {
      targetStoreCodesData: [],
      operationStoreLock: true,
      disableAction: {
        table: true,
        fields: true,
        save: true,
        cancel: true,
        delete: true,
        add: true
      },
      // KSD V001.000 AS refs #82112 対応(編集時は券種コード入力不可)
      isDisabledCode: true,
      // KSD V001.000 AE refs #82112 対応(編集時は券種コード入力不可)
      dataTable: [],
      dataTableLen: 0,
      errMessage: {
        Code: '',
        Name: '',
        LinkTotalNo: '',
        UseSts: '',
        TermCheckSts: '',
        DrwOpenSts: '',
        Disc_Type1: '',
        DpCodeDesignation: '',
        TargetMenuCode: '',
        Disc_Type2: '',
        TankaPrice: '',
        TankaPercent: '',
        Cpn_ChangeSts: ''
      },
      tableProperties: {
        header: [
          {
            label: this.$i18n.t('F322c1.S003'),
            cols: 2,
            class: 'text-left',
            style: { minWidth: '10%', maxWidth: '10%' }
          }, {
            label: this.$i18n.t('F322c1.S004'),
            cols: 4,
            class: 'text-left',
            style: { minWidth: '45%', maxWidth: '45%' }
          }, {
            label: this.$i18n.t('F322c1.S005'),
            cols: 3,
            class: 'text-left',
            style: { minWidth: '25%', maxWidth: '25%' }
          }, {
            label: this.$i18n.t('F322c1.S006'),
            cols: 3,
            class: 'text-left',
            style: { minWidth: '20%', maxWidth: '20%' }
          }

        ]
      },
      dataRender: ['Code', 'Name', 'DiscountType', 'DiscountStatus'],
      selectedRow: {},
      editMode: false,
      discountTypeList: [
        { name: this.$i18n.t('F322c1.S040'), value: 1 },
        { name: this.$i18n.t('F322c1.S041'), value: 7 }
      ],
      labelsDiscountStatus: [
        { name: this.$i18n.t('F322c1.S024'), value: 0 },
        { name: this.$i18n.t('F322c1.S025'), value: 1 }
      ]
    }
  },
  components: {
    maintButton,
    ticketTypeMasterSettingTemplate,
    storeSelect,
    tableRenderer,
    buttonRenderer,
    popup
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
    },
    async getTableMaster (reload = false) {
      this.dataTable = []
      this.dataTableLen = 0
      if (reload) {
        this.disableAction = {
          table: false,
          fields: true,
          save: true,
          cancel: true,
          delete: true,
          add: true
        },
      // KSD V001.000 AS refs #82112 対応(編集時は券種コード入力不可)
      this.isDisabledCode = true
      // KSD V001.000 AE refs #82112 対応(編集時は券種コード入力不可)
      } else {
        this.disableAction = {
          table: true,
          fields: true,
          save: true,
          cancel: true,
          delete: true,
          add: true
        },
      // KSD V001.000 AS refs #82112 対応(編集時は券種コード入力不可)
      this.isDisabledCode = true
      // KSD V001.000 AE refs #82112 対応(編集時は券種コード入力不可)
      }
      this.dataTableLen = 0
      const params = {
        nodeId: this.targetStoreCodesData[0],
        Code: 0,
        orderBy: 'Code',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      let result = false
      try {
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getRestaurantsTicket}`, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          this.dataTable = response.data.responseModel.map(res => (
            {
              ...res,
              DiscountType: this.labelMappers(this.discountTypeList, res.Disc_Type1),
              DiscountStatus: this.labelMappers(this.labelsDiscountStatus, res.Disc_Type2)
            }))
          this.dataTableLen = response.data.responseModel.length
          result = true
          this.disableAction.add = false
        } else if (response.data.result.code === 2) {
          this.dataTable = []
          this.dataTableLen = 0
          result = true
          this.disableAction.add = false
        } else {
          this.targetStoreCodesData = []
          this.dataTable = []
          this.dataTableLen = 0
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.targetStoreCodesData = []
        this.dataTable = []
        this.dataTableLen = 0
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      } finally {
        this.$refs.inputRenderer.defaultValue()
      }
      return result
    },
    labelMappers (origin, data) {
      const result = origin.filter(({ value }) => value === data)
      return result.length ? result[0].name : ''
    },
    globalErrorMapping (result) {
      this.focusItem = null
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    changedStore (data) {
      if (data.length <= 0) return
      this.targetStoreCodesData = data
      this.initErrorMessage()
      this.$refs.tableRenderer.unSelect()
      this.getTableMaster()
    },
    isValidate () {
      let focusField = []
      let result = false
      const {
        Code,
        Name,
        LinkTotalNo,
        UseSts,
        TermCheckSts,
        DrwOpenSts,
        Disc_Type1,
        DpCodeDesignation,
        TargetMenuCode,
        Disc_Type2,
        TankaPrice,
        TankaPercent,
        Cpn_ChangeSt,
        Tanka
      } = this.$refs.inputRenderer.inputModel

      let errorMessage = {
        REQUIRED: this.$i18n.t('F322c1.E010'),
        REQUIRED_SELECT: this.$i18n.t('F322c1.E011'),
        RANGE_PERCENT: this.$i18n.t('F322c1.E016'),
        RANGE_CODE: this.$i18n.t('F322c1.E013')
      }

      if (Number(Code) === 0) {
        this.errMessage['Code'] = errorMessage.RANGE_CODE
        result = true
        focusField.push(this.$refs.inputRenderer.$refs.useTicketCode)
      }

      if (Code === '') {
        this.errMessage['Code'] = errorMessage.REQUIRED
        result = true
        focusField.push(this.$refs.inputRenderer.$refs.useTicketCode)
      }
      if (Name === '') {
        this.errMessage['Name'] = errorMessage.REQUIRED
        result = true
        focusField.push(this.$refs.inputRenderer.$refs.useTicketName)
      }
      if (LinkTotalNo === '') {
        this.errMessage['LinkTotalNo'] = errorMessage.REQUIRED_SELECT
        result = true
      }
      if (UseSts === '') {
        this.errMessage['UseSts'] = errorMessage.REQUIRED_SELECT
        result = true
      }
      if (TermCheckSts === '') {
        this.errMessage['TermCheckSts'] = errorMessage.REQUIRED_SELECT
        result = true
      }
      if (DrwOpenSts === '') {
        this.errMessage['DrwOpenSts'] = errorMessage.REQUIRED_SELECT
        result = true
      }
      if (Disc_Type1 === '') {
        this.errMessage['Disc_Type1'] = errorMessage.REQUIRED_SELECT
        result = true
      }

      if (DpCodeDesignation.length === 0 && Disc_Type1 === 7) {
        this.errMessage['DpCodeDesignation'] = errorMessage.REQUIRED_SELECT
        focusField.push(this.$refs.inputRenderer.$refs.dpCodeBtn.$el)
        result = true
      }

      if (Disc_Type2 === '') {
        this.errMessage['Disc_Type2'] = errorMessage.REQUIRED
        result = true
      }

      if (Number(Tanka) < 0) {
        if (Disc_Type2 === 0) {
          this.errMessage['TankaPrice'] = errorMessage.RANGE.replace(':min', '0').replace(':max', '�X�X�X�X�X�X')
          focusField.push(this.$refs.inputRenderer.$refs.usePresetUnitPrice)
          result = true
        }
        if (Disc_Type2 === 1) {
          this.errMessage['TankaPercent'] = errorMessage.RANGE_PERCENT
          result = true
          focusField.push(this.$refs.inputRenderer.$refs.usePresetDiscountRate)
        }
      }
      if (Number(Tanka) > 100 && Disc_Type2 === 1) {
        this.errMessage['TankaPercent'] = errorMessage.RANGE_PERCENT
        result = true
        focusField.push(this.$refs.inputRenderer.$refs.usePresetDiscountRate)
      }

      if (Tanka === '') {
        if (Disc_Type2 == 0) {
          this.errMessage['TankaPrice'] = errorMessage.REQUIRED
          focusField.push(this.$refs.inputRenderer.$refs.usePresetUnitPrice)
        } else {
          this.errMessage['TankaPercent'] = errorMessage.REQUIRED
          focusField.push(this.$refs.inputRenderer.$refs.usePresetDiscountRate)
        }
        result = true
      }
      if (result) {
        this.focusItem = focusField.length > 0 ? focusField[0] : null
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), '-0099', false, this.setFocus, false, null)
      }
      return result
    },
    isUnique () {
      let result = true
      let focusField = []
      const { Code } = this.$refs.inputRenderer.inputModel
      let errorMessage = {
        UNIQUE: this.$i18n.t('F322c1.E012')
      }
      if (this.dataTable.filter(res => Number(res.Code) === Number(Code)).length > 0) {
        if (Number(Code) !== Number(this.selectedRow.Code)) {
          this.errMessage['Code'] = errorMessage.UNIQUE
          focusField.push(this.$refs.inputRenderer.$refs.useTicketCode)
          result = false
        }
      }
      if (!result) {
        this.focusItem = focusField.length > 0 ? focusField[0] : null
        this.$refs.pop.open(3, '', this.$i18n.t('F322c1.E009'), '-0099', false, this.setFocus, false, null)
      }
      return result
    },
    initErrorMessage () {
      this.errMessage = {
        Code: '',
        Name: '',
        LinkTotalNo: '',
        UseSts: '',
        TermCheckSts: '',
        DrwOpenSts: '',
        Disc_Type1: '',
        DpCodeDesignation: '',
        TargetMenuCode: '',
        Disc_Type2: '',
        TankaPrice: '',
        TankaPercent: '',
        Cpn_ChangeSts: ''
      }
    },
    toSave () {
      this.onClickSave()
    },
    async onClickSave () {
      this.initErrorMessage()

      if (this.isValidate()) {
        return
      }

      if (!this.isUnique()) {
        return
      }

      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      if (await this.executeSave() === true) {
        if (await this.refreshFunc() === true) {
          this.$refs.tableRenderer.unSelect()
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, () => {
          }, false, null)
        }
      }
    },
    zeroSuppress (value) {
      return Number(value)
    },
    zeroSupply (value, length) {
      return ('0'.repeat(length) + value).slice(-length)
    },
    async executeSave () {
      let result = false
      const defaultData = {
        Type: 3,
        RestNo: 1,
        EmpInpSts: 0,
        ShopCodeCheckSts: 0,
        TaxSts: 0,
        Cpn_ChangeSts: 0,
        Cpn_PointTargetSts: 0,
        Cpn_InshiSts: 0,
        Name2: 'waribiki',
        ImageFileName: '',
        TargetPluCode: '0',
        Disc_ChangeSts: 0
      }

      let { Code, TargetMenuCode, Tanka, DpCodeDesignation } = this.$refs.inputRenderer.inputModel

      try {
        let params = {
          ...this.selectedRow,
          ...this.$refs.inputRenderer.inputModel,
          nodeId: this.targetStoreCodesData[0],
          Code: this.zeroSuppress(Code),
          TargetMenuCode: this.zeroSupply(TargetMenuCode, 14),
          Tanka: this.zeroSuppress(Tanka)
        }
        for (let i = 1; i <= 50; i++) {
          params[`TargetDpCode${i}`] = 0
        }
        if (params.Disc_Type1 !== 8) {
          params.TargetMenuCode = '0'
        }
        if (params.Disc_Type1 === 7) {
          DpCodeDesignation.forEach((code, index) => {
            params[`TargetDpCode${index + 1}`] = Number(code)
          })
        }
        if (!this.editMode) {
          params = {
            ...params,
            ...defaultData
          }
        }

        delete params.DpCodeDesignation
        delete params.DiscountStatus
        delete params.DiscountType

        // KSD V001.000 AS 更新パラメータに余計なフィールドが含まれていてエラーになる対応
        delete params.createTimestamp
        delete params.lastModifiedTimestamp
        delete params.lastModifiedUserId
        delete params._id
        // KSD V001.000 AE 更新パラメータに余計なフィールドが含まれていてエラーになる対応

        let response = await axios.post(`${this.$i18n.t('prop.url')}${savePath}`, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    async refreshFunc () {
      return await this.getTableMaster(true) === true
    },
    cancel () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.discard, false, null)
    },
    async del () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, async () => {
        this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
        if (await this.executeDelete() === true) {
          if (await this.refreshFunc() === true) {
            this.$refs.tableRenderer.unSelect()
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
          }
        }
      }, false, null)
    },
    async executeDelete () {
      let result = false
      try {
        let response = await axios.put(`${this.$i18n.t('prop.url')}${deletePath}`, {
          nodeId: this.targetStoreCodesData[0],
          Code: this.selectedRow.Code
        }, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      return result
    },
    add () {
      if (this.dataTableLen < 400 ) {
        this.editMode = false
        this.disableAction = {
          table: true,
          fields: false,
          save: false,
          cancel: false,
          delete: true,
          add: true
        }
        this.selectedRow = {}
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('F322c1.E017'), '-0099', false, null, false, null)
      }
      // KSD V001.000 AS refs #82112 対応(編集時は券種コード入力不可)
      this.isDisabledCode = false,
      // KSD V001.000 AE refs #82112 対応(編集時は券種コード入力不可)
      this.selectedRow = {}
    },
    discard () {
      this.disableAction = {
        table: false,
        fields: true,
        save: true,
        cancel: true,
        delete: true,
        add: false
      },
      // KSD V001.000 AS refs #82112 対応(編集時は券種コード入力不可)
      this.isDisabledCode = true,
      // KSD V001.000 AE refs #82112 対応(編集時は券種コード入力不可)
      this.initErrorMessage()
      this.$refs.tableRenderer.unSelect()
      this.$refs.inputRenderer.defaultValue()
    },
    confirmUnload () {
      if (this.disableAction.save === false) {
        event.returnValue = ''
      }
    },
    selectedData (data) {
      this.editMode = true
      this.disableAction = {
        table: true,
        fields: false,
        save: false,
        cancel: false,
        delete: false,
        add: true
      },
      // KSD V001.000 AS refs #82112 対応(編集時は券種コード入力不可)
      this.isDisabledCode = true,
      // KSD V001.000 AE refs #82112 対応(編集時は券種コード入力不可)
      this.selectedRow = data.data
    },
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    }
  },
  created () {
    this.$root.winId = 'F322c1'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.initialize()
    setTimeout(() => {
      document.getElementsByClassName('rightArrowButton')[0].focus()
    }, 100)
  },
  watch: {
    targetStoreCodesData: function (val) {
      if (val) {
        this.disableAction.table = false
      }
    }
  }
}
// KSD V001.000 AE
