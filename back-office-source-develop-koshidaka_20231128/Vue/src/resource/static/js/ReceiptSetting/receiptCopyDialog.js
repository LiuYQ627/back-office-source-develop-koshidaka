/**
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230209  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
 * 20230320  wangchunmei(Neusoft)  G002.00.0  issue課題#1586を対応します.
 * 20230321  wangchunmei(Neusoft)  G003.00.0  issue課題#1580を対応します.
 * 20230322  wangchunmei(Neusoft)  G004.00.0  issue課題#1588を対応します.
 */
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'

import {ApiPath} from '@/resource/static/properties/api_path'

export default {
  data () {
    return {
      // G003.00.0 Add-Start
      disabledOKButton: true,
      // G003.00.0 Add-End
      displayed: false,
      // G001.00.0 Add-Start
      planningCodeLabels: [{name: '1', value: 1}, {name: '2', value: 2}, {name: '3', value: 3}, {name: '4', value: 4}, {name: '5', value: 5}],
      items: [],
      fromPlanningCode: null,
      toPlanningCode: null
      // G001.00.0 Add-End
      // G001.00.0 Delete-Start
      // planningCode: null
      // G001.00.0 Delete-End
    }
  },
  components: {
    popup,
    commonDialog
  },
  // G003.00.0 Add-Start
  watch: {
    fromPlanningCode (newVal) {
      this.disabledOKButton = !(newVal && this.toPlanningCode)
    },
    toPlanningCode (newVal) {
      this.disabledOKButton = !(newVal && this.fromPlanningCode)
    }
  },
  // G003.00.0 Add-End
  methods: {
    // G001.00.0 Delete-Start
    // open () {
    //   this.planningCode = null
    //   this.displayed = true

    //   this.initialize()
    // },
    // G001.00.0 Delete-End
    // G001.00.0 Add-Start
    // G004.00.0 Update-Start
    // open (corpId, storeId) {
    //   this.items = []
    open (corpId, storeId, items) {
      this.items = items
      // G004.00.0 Update-End
      this.corpId = corpId
      this.storeId = storeId
      this.fromPlanningCode = null
      this.toPlanningCode = null
      this.displayed = true
      // G004.00.0 Delete-Start
      // this.initialize()
      // G004.00.0 Delete-End
    },
    // G001.00.0 Add-End
    closeDialog () {
      this.displayed = false
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickOk () {
      // G001.00.0 Delete-Start
      // if (!this.planningCode) {
      //   this.$refs.pop.open(1, '', this.$i18n.t('O00004.W013'), '', true, () => { }, false, null)
      //   return
      // }
      // G001.00.0 Delete-End
      // G001.00.0 Add-Start
      if (!this.fromPlanningCode) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b3.W004'), '', false, null, false, null)
        return
      }
      if (!this.toPlanningCode) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b3.W005'), '', false, null, false, null)
        return
      }
      if (this.toPlanningCode === this.fromPlanningCode) {
        this.$refs.pop.open(3, '', this.$i18n.t('F322b3.W006'), '', false, null, false, null)
        return
      }

      const findItem = this.items.find(item => item.planningCode === this.fromPlanningCode)
      // G001.00.0 Add-End
      // G001.00.0 Update-Start
      // this.$emit('clickOk', this.toPlanningCode)
      this.$emit('clickOk', { newPlanningCode: this.toPlanningCode, fromSetting: findItem })
      // G001.00.0 Update-End
      this.displayed = false
    },
    // G001.00.0 Delete-Start
    // // 文字入力規制(半角数字のみ)
    // numInputRegulation () {
    //   this.planningCode = this.planningCode.toString().replace(/[^0-9]/gi, '')
    // },
    // G001.00.0 Delete-End
    async initialize () {
      this.loading = true
      // G001.00.0 Update-Start
      // const corpId = '000000000000001'
      // const storeId = '000001'
      const corpId = this.corpId
      const storeId = this.storeId
      // G001.00.0 Update-End

      axios.get(
        this.$i18n.t('prop.url') + ApiPath.ReceiptSetting.ReceiptList + '?companyCode=' + corpId + '&storeCode=' + storeId,
        commonUtils.methods.getApiHeader({})
      ).then(response => {
        this.loading = false
        const {result} = response.data

        if (result.code === 0) {
          this.items = response.data.responseModel
        } else if (result.code === 2) {
          this.$refs.pop.open(2, '', this.$i18n.t('F322b3.W002'), '', false, null, false, null)
        // G001.00.0 Add-Start
        } else if (result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        // G001.00.0 Add-End
        } else {
          // G002.00.0 Update-Start
          // this.$refs.pop.open(2, '', this.$i18n.t('F322b3.W001'), '', false, null, false, null)
          this.$refs.pop.open(3, '', this.$i18n.t('F322b3.W001'), '', false, null, false, null)
          // G002.00.0 Update-End
        }
      }).catch(error => {
        this.loading = false
        // G002.00.0 Update-Start
        // this.$refs.pop.open(3, '', this.$i18n.t('F322b3.W001'), '', false, null, false, null)
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        // G002.00.0 Update-End
      })
    }
  }
}
