/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230331  bai.ry(Neusoft)    G001.00.0  issue課題#1697を対応します.
 * 20230404  bai.ry(Neusoft)    G002.00.0  issue課題#1601を対応します.
 */

import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'
const QueryCatalogDetail = 'PresetMaster/PresetCatalogDetails'
const authPlanCode = {
  0: [1, 20],
  1: [21, 50]
}
export default {
  data () {
    return {
      displayed: false,
      plans: [],
      selectedPlanCode: '',
      planningCode: '',
      headquartersAuthority: 1,
      storeId: ''
    }
  },
  components: {
    popup,
    commonDialog
  },
  methods: {
    open (companyCode, storeId, headquartersAuthority) {
      this.headquartersAuthority = headquartersAuthority

      // DS KSD V001.000 #86860
      // this.displayed = true
      // DE KSD V001.000 #86860
      this.selectedPlanCode = ''
      this.planningCode = ''
      this.storeId = storeId
      // CS KSD V001.000 #86860
      // this.getPresets(companyCode, storeId)
      const checkSession = 'CommonDesign/Header'
      axios.get(this.$i18n.t('prop.url') + checkSession + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
      .then(response => {
        const sessionResult = response.data.result
        if (sessionResult.code !== 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), sessionResult.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else {
          this.displayed = true
          this.getPresets(companyCode, storeId)
        }
      })
      .catch(error => {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      })
    // CE KSD V001.000 #86860
    },
    planningCodeInputRegulation () {
      this.planningCode = this.planningCode.toString().replace(/[^0-9]/gi, '')
      let reg = /^(([1-9])|(1\d{1})|(20))$/
      if (this.headquartersAuthority === 1) {
        reg = /^(([2-5])|(2[1-9]{1})|([3-4]\d{1})|(50))$/
      }
      if (!reg.test(this.planningCode)) {
        this.planningCode = this.planningCode.substring(0, this.planningCode.length - 1)
      }
      // G002.00.0 Add-Start
      if (!reg.test(this.planningCode)) {
        this.planningCode = this.planningCode.substring(0, this.planningCode.length - 1)
      }
      // G002.00.0 Add-End
    },
    async getPresets (companyCode, storeId) {
      try {
        const response = await axios.get(this.$i18n.t('prop.url') +
          'PresetMaster/List' +
          '?companyCode=' + companyCode +
          '&storeCode=' + storeId,
        commonUtils.methods.addApiHeader({}))
        const {result} = response.data
        if (response.status === 200) {
          const range = authPlanCode[this.headquartersAuthority]
          const filterPlans = response.data.responseModel.filter((pl) => {
            return pl.planningCode >= range[0] && pl.planningCode <= range[1]
          })
          this.plans = filterPlans
        } else if (response.status === 204) {
          this.plans = []
        } else {
          this.globalErrorMapping(response)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
    },
    closeDialog () {
      this.displayed = false
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickOk () {
      if (!this.selectedPlanCode || !this.planningCode) {
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W013'), '', false, () => { }, false, null)
      } else {
        // 本部企画（企画コード：21～50）の場合
        if (this.headquartersAuthority === 1) {
          if (parseInt(this.planningCode) <= 20 || parseInt(this.planningCode) > 50) {
            document.getElementById('planningCode').blur()
            this.$refs.pop.open(3, '', this.$i18n.t('F00002.S065'), '', false, null, false, null)
            return
          }
        } else {
          if (parseInt(this.planningCode) < 1 || parseInt(this.planningCode) > 20) {
            this.$refs.pop.open(3, '', this.$i18n.t('F00002.S064'), '', false, null, false, null)
            return
          }
        }

        // AS KSD V001.000 86765
        // 店舗、本部間のコピーチェック
        if ((parseInt(this.planningCode) <= 20  && parseInt(this.selectedPlanCode) > 20) || (parseInt(this.selectedPlanCode) <= 20 && parseInt(this.planningCode) > 20)) {
          this.$refs.pop.open(3, '', this.$i18n.t('F32282.E039'), '', false, null, false, null)
          return
        }
        // AE KSD V001.000 86765

        const filterPlan = this.plans.filter((plan) => {
          return plan.planningCode === Number(this.planningCode)
        })
        if (filterPlan.length > 0) {
          // G001.00.0 Update-Start
          // this.$refs.pop.open(3, '', this.$i18n.t('F32282.E038'), '', false, null, false, null)
          // CS KSD V001.000 #84117
          //this.$refs.pop.open(3, '', '同一の企画コードが設定されています。異なる企画コードを選択して下さい。', '', false, null, false, null)
          // CS KSD V001.000 86765
          //this.$refs.pop.open(3, '', 'コピー先企画が既に存在しています。コピー先企画コードを変更して保存ボタンをクリックしてください。', '', false, null, false, null)
          this.$refs.pop.open(3, '', this.$i18n.t('F32282.E028'), '', false, null, false, null)
          // CE KSD V001.000 86765
          // CE KSD V001.000 #84117
          // G001.00.0 Update-End
          return
        }

        this.getParams(this.plans, this.selectedPlanCode).then((params) => {
          if (JSON.stringify(params) === '{}') {
            return
          }
          this.$emit('clickOk', params)
          this.displayed = false
        })
      }
    },
    async getParams (plans, selectedPlanCode) {
      const filterPlan = plans.filter((plan) => {
        return plan.planningCode === Number(selectedPlanCode)
      })
      let fplan = filterPlan[0]

      const response = await axios.get(this.$i18n.t('prop.url') + QueryCatalogDetail +
         '?planningCode=' + fplan.planningCode + '&companyCode=' + fplan.companyCode + '&storeCode=' + this.storeId,
      commonUtils.methods.addApiHeader({}))

      // CS KSD V001.000 84267
      // if (response.status === 200) {
      if (response.data.result.code === 0) {
      // CE KSD V001.000 84267
        let plan = response.data.responseModel
        delete plan.id
        delete plan.createTimestamp
        delete plan.lastModifiedTimestamp
        delete plan.version
        delete plan.lastModifiedUserId
        delete plan.status
        plan.planningCode = this.planningCode
        return plan
      } else {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        return {}
      }
    },
    globalErrorMapping (result, msg = '', func = null) {
      if (result === null) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', this.$t(msg), '', false, func, false, null)
      } else if (result.data.result.code === -10 || result.data.result.code === -20 || result.data.result.code === -30) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      } else if (result.data.result.code === -90) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(2, '', this.$t('O00004.W008'), result.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
      } else {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      }
    }
  }
}
