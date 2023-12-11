import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'
import dateInput from '@/resource/templates/CommonInput/DateInput'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import dialogRegisterSelect from '@/resource/templates/PosReport/RegisterSelectDialog'
import commonUtils from '../Common/commonUtils'
import Moment from 'moment'
import radioButton from '@/resource/templates/StoreOperationsSetting/RadioButton'

/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221220  litie(Neusoft)        G001.00.0  issue課題#937を対応します.
 * 20230103  litie(Neusoft)        G002.00.0  issue課題#939を対応します.
 * 20230113  litie(Neusoft)        G003.00.0  issue課題#835を対応します.
 * 20230113  litie(Neusoft)        G004.00.0  issue課題#1430を対応します.
 * 20230131  litie(Neusoft)        G005.00.0  issue課題#835を対応します.
 * 20230505  wangchunmei(Neusoft)  G006.00.0  issue課題#1827を対応します.
 * 20230508  zxh(Neusoft)          G007.00.0  issue課題#1457を対応します.
 * 20230510  wangchunmei(Neusoft)  G008.00.0  issue課題#908を対応します.
 * 20230616  qinshh(Neusoft)       G010.00.0  issue課題#1527を対応します.
 */

const endpointPath = 'Audit/Endpoint'
export default {
  data () {
    return {
      displayed: false,
      saveSelectedDisabled: false,
      saveSelected: true,
      targetStoreCodes: [],
      selectedRegisterIds: [],
      registerSelectDisplayed: false,
      availableRegisterIds: [],
      businessDateStart: '',
      businessDateEnd: '',
      password: '',
      // G010.00.0 Add-Start
      passwordVisible: false,
      config: {
        totalPriceDiscount: true
      },
      radioButtonDisabled: false,
      allowanceLabels: [
        { name: '1件', value: true },
        { name: '全件', value: false }
      ]
      // G010.00.0 Add-End
    }
  },
  computed: {
    selectedRegisterIdsText () {
      return this.selectedRegisterIds.join('、')
    },
    // G005.00.0 Update-Start
    hasAllRequiredCondition () {
      if (this.saveSelected) {
        return this.password !== undefined && this.password !== null && this.password !== ''
      } else {
        return this.targetStoreCodes &&
          this.targetStoreCodes.length > 0 &&
          this.businessDateStart &&
          this.businessDateEnd &&
          this.selectedRegisterIds &&
          this.selectedRegisterIds.length > 0 &&
          this.password !== undefined && this.password !== null && this.password !== ''
      }
    }
    // G005.00.0 Update-Start
  },
  components: {
    popup,
    commonDialog,
    dateInput,
    storeSelect,
    dialogRegisterSelect,
    // G010.00.0 Add-Start
    radioButton
    // G010.00.0 Add-End
  },
  methods: {
    // G010.00.0 Update-Start
    // async open (saveSelectedDisabled) {
    async open (saveSelectedDisabled, targetStoreCodes, businessDateStart, businessDateEnd, selectedRegisterIds) {
    // G010.00.0 Update-End
      this.saveSelectedDisabled = saveSelectedDisabled
      this.saveSelected = !saveSelectedDisabled
      // G010.00.0 Update-Start
      // this.targetStoreCodes = []
      this.targetStoreCodes = targetStoreCodes
      // this.selectedRegisterIds = []
      this.selectedRegisterIds = selectedRegisterIds
      // G010.00.0 Update-End
      this.registerSelectDisplayed = false
      this.availableRegisterIds = []
      // G003.00.0 Update-Start
      // this.businessDateStart = '';
      // this.businessDateEnd = '';
      // G010.00.0 Update-Start
      // this.businessDateStart = new Moment().format('YYYY/MM/DD')
      // this.businessDateEnd = new Moment().format('YYYY/MM/DD')
      this.businessDateStart = businessDateStart
      this.businessDateEnd = businessDateEnd
      // G010.00.0 Update-End
      // G003.00.0 Update-End
      this.password = ''
      this.passwordVisible = false
      this.displayed = true
    },
    async onShowRegisterIdsDialog () {
      // G002.00.0 Update-Start
      if (this.targetStoreCodes.length === 0) {
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W009'), '', false, null, false, null)
        return
      }
      // G002.00.0 Update-End
      // G009.00.0 Delete-Start
      // this.registerSelectDisplayed = true
      // G009.00.0 Delete-End
      this.availableRegisterIds = await this.getRegisterIds()
    },
    async getRegisterIds () {
      try {
        let temp = this.targetStoreCodes.length > 0 ? [this.targetStoreCodes[0]] : []
        const params = { nodeIds: temp }
        // G009.00.0 Add-Start
        let ids = []
        // G009.00.0 Add-End
        let response = await axios.put(this.$i18n.t('prop.url') + endpointPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          // 0:正常
          // G009.00.0 Delete-Start
          // var ids = []
          // G009.00.0 Delete-End
          for (var i = 0; i < response.data.responseModel.length; i++) {
            if (!ids.includes(response.data.responseModel[i].endpointId)) {
              ids.push(response.data.responseModel[i].endpointId)
            }
          }
          // G009.00.0 Delete-Start
          // return ids
          // G009.00.0 Delete-End
        } else if (response.data.result.code === 2) {
          // 2:該当する端末管理情報なし
          // G009.00.0 Delete-Start
          // return []
          // G009.00.0 Delete-End
          // G006.00.0 Add-Start
        } else if (response.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
          // G006.00.0 Add-End
          // G009.00.0 Add-Start
          return ids
          // G009.00.0 Add-End
        } else {
        }
        // G009.00.0 Add-Start
        this.registerSelectDisplayed = true
        return ids
        // G009.00.0 Add-End
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
        // G009.00.0 Add-Start
        return []
        // G009.00.0 Add-End
      }
    },
    closeDialog () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickOk () {
      if (!this.saveSelected) {
        if (this.targetStoreCodes.length === 0) {
          this.$refs.pop.open(3, '', this.$i18n.t('F32271.W009'), '', false, null, false, null)
          return
        }
        if (this.selectedRegisterIds.length === 0) {
          this.$refs.pop.open(3, '', this.$i18n.t('F32271.W007'), '', false, null, false, null)
          return
        }
        if (this.businessDateStart === '') {
          this.$refs.pop.open(3, '', this.$i18n.t('F32271.W008'), '', false, null, false, null)
          return
        }
        if (this.businessDateEnd === '') {
          this.$refs.pop.open(3, '', this.$i18n.t('F32271.W008'), '', false, null, false, null)
          return
        }
        // G004.00.0 Update-Start
        // const aYearAgo = new moment().add(-1, 'years');
        // const now = new moment();
        // if (!(new moment(this.businessDateStart, 'YYYY/MM/DD').isBetween(aYearAgo, now))
        //   || !(new moment(this.businessDateEnd, 'YYYY/MM/DD').isBetween(aYearAgo, now))) {
        //   this.$refs.pop.open(3, '', this.$i18n.t('F32271.W012'), '', false, null, false, null)
        //   return
        // }
        if (this.businessDateStart > this.businessDateEnd) {
          // G007.00.0 Update-Start
          // this.$refs.pop.open(3, '', this.$i18n.t('F32271.W012'), '', false, null, false, null)
          this.$refs.pop.open(3, '', this.$i18n.t('F32271.W014'), '', false, null, false, null)
          // G007.00.0 Update-End
          return
        }
        // G004.00.0 Update-End
      }
      if (this.password === '') {
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W010'), '', false, null, false, null)
        return
      } else if (!/^[\da-z]+$/i.test(this.password)) {
        this.$refs.pop.open(3, '', this.$i18n.t('F32271.W011'), '', false, null, false, null)
        return
      }
      // G010.00.0 Add-Start
      if (!this.config.totalPriceDiscount) {
        this.saveSelected = false
      }
      // G010.00.0 Add-End
      this.$emit('clickOk', this.saveSelected, this.targetStoreCodes[0], this.selectedRegisterIds[0], this.businessDateStart, this.businessDateEnd, this.password)
      this.displayed = false
    },
    // G004.00.0 Update-Start
    businessDateDisabledFunc (date) {
      const now = new Moment()
      const aYearAgo = new Moment().add(-1, 'years').add(-1, 'days')
      return !(new Moment(date).isBetween(aYearAgo, now))
    }
    // G004.00.0 Update-End
  }
}
