// KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import { inputLimitation, inputNumberLimitation } from '../../js/Common/jsUtils'
const savePath = 'RentalsAgeDivision/Update'
const deletePath = 'RentalsAgeDivision/Delete'
const getAgeDivision = 'RentalsAgeDivision/Query'

export default {
  props: {
    oneOrderList: {
      type: Array,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      dialog: false,
      title: '',
      mode: 1,
      ageDivisionList: [],
      ageDivisionData: {
        businessUnitCd: null,
        ageDivisionCode: '',
        ageDivisionName: '',
        startAge: '',
        endAge: '',
        oneOrder: '',
        index: ''
      },
      refreshFunc: null,
      closeFunc: null,
      focusItem: null,
      sessionBusinessUnitCd: null,
      operationLock: true,
      hasErrorMessage: 0,
      errMessage: {
        ageDivisionName: '',
        startAge: '',
        endAge: '',
        oneOrder: ''
      },
      displayData: []
    }
  },
  components: {
    popup,
    dialogStoreSelect,
  },
  computed: {
    hasError: function() {
      return this.hasErrorMessage > 0
    },
  },
  methods: {
    async open (
      businessUnitCd,
      ageDivisionData,
      refreshFunc,
      closeFunc,
      sessionBusinessUnitCd,
      dialogMode
    ) {
      this.dialog = true
      this.operationLock = false
      this.refreshFunc = refreshFunc
      this.closeFunc = closeFunc
      this.businessUnitCd = businessUnitCd
      this.ageDivisionData = {...ageDivisionData}
      this.sessionBusinessUnitCd = sessionBusinessUnitCd
      this.hasErrorMessage = 0
      this.initErrorMessage()
      if (dialogMode === 2) {
        this.mode = 2
        this.title = this.$i18n.t('C00216.S010')
      } else {
        this.mode = 1
        this.title = this.$i18n.t('C00216.S011')
        this.ageDivisionData = {
          ageDivisionCode: ageDivisionData.ageDivisionCode,
          ageDivisionName: '',
          startAge: '',
          endAge: '',
          oneOrder: '',
          index: ''
        }
      }

    },
    openEnd () {
      document.getElementsByClassName('ageDivisionName')[0].focus()
      document.getElementById('baseTable').scrollTo(0, 0)
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.popupConfirm, false, null)
    },
    popupConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    async getAgeDivision (ageDivisionCode = 0) {
      this.ageDivisionList = []
      const params = {
        nodeId: this.sessionBusinessUnitCd,
        ageDivisionCode: ageDivisionCode,
        orderBy: 'ageDivisionCode',
        ascending: true,
        startIndex: 0,
        batchSize: 0
      }
      let result = false
      this.ageDivisionCount = 0
      this.displayData = []
      try {
        let response = await axios.post(`${this.$i18n.t('prop.url')}${getAgeDivision}`, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          let found = false
          let data = []
          this.ageDivisionList = response.data.responseModel
          for (let i = 1; i <= 6; i++) {
            for (let j = 0; j < this.ageDivisionList.length; j++) {
              if (this.ageDivisionList[j].ageDivisionCode === i) {
                found = true
                data = this.ageDivisionList[j]
              }
            }
            if (found === false) {
              data = {ageDivisionCode: i, ageDivisionName: '', startAge: '', endAge: '', oneOrder: '', found}
              this.displayData.push(data)
            } else {
              this.displayData.push(data)
              data = []
              found = false
            }
          }
          result = true
        } else if (response.data.result.code === 2) {
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      return result
    },
    async isValidate() {
      let focusItem = []
      let result = 0
      let bypass = true
      if (await this.getAgeDivision() === false) {
        result++
      }
      const data = this.displayData.filter(({ ageDivisionCode }) => ageDivisionCode === this.ageDivisionData.ageDivisionCode)
      if (data.length && data[0].startAge === this.ageDivisionData.startAge &&
        data[0].endAge === this.ageDivisionData.endAge) {
          bypass = false
      }
      if (this.ageDivisionData.ageDivisionName === '' ||
          this.ageDivisionData.startAge === '' ||
          this.ageDivisionData.endAge === '' ||
          this.ageDivisionData.oneOrder === '') {
          result++
          this.hasErrorMessage++
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
      }

      if (!this.ageDivisionData.ageDivisionName) {
        this.errMessage.ageDivisionName = this.$i18n.t('C00216.E009')
        result++
        this.hasErrorMessage++
        focusItem.push(this.$refs.useAgeDivisionName)
      }
      if (bypass) {
        if (this.ageDivisionData.startAge === '' && this.ageDivisionData.endAge === '') {
          this.errMessage.endAge = this.$i18n.t('C00216.E009')
          this.errMessage.startAge = this.$i18n.t('C00216.E009')
          this.hasErrorMessage++
          result++
          focusItem.push(this.$refs.useStartAge)
        } else if (this.ageDivisionData.startAge  === '') {
          this.errMessage.startAge = this.$i18n.t('C00216.E009')
          this.hasErrorMessage++
          result++
          focusItem.push(this.$refs.useStartAge)
        } else if (this.ageDivisionData.endAge === '') {
          this.errMessage.endAge = this.$i18n.t('C00216.E009')
          this.hasErrorMessage++
          result++
          focusItem.push(this.$refs.useEndAge)
        } else {
          if (Number(this.ageDivisionData.startAge) > Number(this.ageDivisionData.endAge)) {
            this.errMessage.endAge = this.$i18n.t('C00216.E012')
            this.errMessage.startAge = ''
            result++
            this.hasErrorMessage++
            focusItem.push(this.$refs.useEndAge)
            this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
          } else {
            let duplicateError = 0
            this.displayData.map(({ startAge, endAge }, index) => {
              if (index !== this.ageDivisionData.index) {
                if (this.ageDivisionData.startAge >= startAge && this.ageDivisionData.startAge <= endAge) {
                  this.errMessage.startAge = this.$i18n.t('C00216.E013')
                  result++
                  duplicateError++
                  this.hasErrorMessage++
                  focusItem.push(this.$refs.useStartAge)
                }
                if (this.ageDivisionData.endAge >= startAge && this.ageDivisionData.endAge <= endAge) {
                  this.errMessage.endAge = this.$i18n.t('C00216.E014')
                  result++
                  this.hasErrorMessage++
                  duplicateError += 10
                  focusItem.push(this.$refs.useEndAge)
                }
              }
            })
            switch (duplicateError) {
              case 1:
                this.$refs.pop.open(3, '', this.$i18n.t('C00216.E016'), -99, false, null, false, null)
                break
              case 10:
                this.$refs.pop.open(3, '', this.$i18n.t('C00216.E017'), -99, false, null, false, null)
                break
              case 11:
                this.$refs.pop.open(3, '', this.$i18n.t('C00216.E018'), -99, false, null, false, null)
                break
            }
          }
        }
      }
      if (this.ageDivisionData.oneOrder === '' ||
        this.ageDivisionData.oneOrder === null) {
        this.errMessage.oneOrder = this.$i18n.t('C00216.E010')
        result++
        this.hasErrorMessage++
        focusItem.push(this.$refs.useOneOrder)
      }
      if (focusItem.length > 0) focusItem[0].focus()

      return result > 0
    },
    async onClickSave () {
      this.initErrorMessage()
      if (await this.isValidate()) return
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
      let result = false
      this.mode === 1
      try {
        const { startAge, endAge} = this.ageDivisionData
        const data = this.ageDivisionData
        delete data.index;
        const params = {
           ...data,
           nodeId: this.sessionBusinessUnitCd,
           startAge: Number(startAge),
           endAge: Number(endAge)
        }

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
      }
      return result
    },
    async onClickDelete () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.runDelete, false, null)
    },
    async runDelete () {
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
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
      let result = false
      try {
        const params = {}
        const response = await axios.put(`${this.$i18n.t('prop.url')}${deletePath}`, {
          nodeId: this.sessionBusinessUnitCd,
          ageDivisionCode: this.ageDivisionData.ageDivisionCode
        }, commonUtils.methods.addApiHeader({params}))
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
      this.errMessage = {
        ageDivisionName: '',
        startAge: '',
        endAge: '',
        oneOrder: ''
      }
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    },
    inputNumberLimit (e, inputObject, inputVariable, limit) {
      return inputNumberLimitation(e, inputObject, inputVariable, limit)
    }
  }
}
// KSD V001.000 AE
