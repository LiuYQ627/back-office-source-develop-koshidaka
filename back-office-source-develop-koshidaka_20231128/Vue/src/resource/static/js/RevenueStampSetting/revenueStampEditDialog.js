/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230302 dingxin(Neusoft)   G001.00.0  issue課題#1662を対応します.
 * 20230411 dingxin(Neusoft)   G002.00.0  issue課題#1222を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'

export default {
  data () {
    return {
      // G001.00.0 Add start
      permissions: [],
      // G001.00.0 Add end
      displayed: false,
      index: 0,
      stampDuty: {
        stampDutyJudgement: 0,
        stampDutyAmount: 0,
        order: 0
      },
      judgeErrorMsg: '',
      amountErrorMsg: ''
    }
  },
  components: {
    popup
  },
  methods: {
    async open (stampDuty, index) {
      this.stampDuty = {
        order: stampDuty.order + 1,
        stampDutyJudgement: stampDuty.row[0],
        stampDutyAmount: stampDuty.row[1]
      }
      this.judgeErrorMsg = ''
      this.amountErrorMsg = ''
      this.index = index
      this.displayed = true
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickSave () {
      if (this.stampDuty.stampDutyJudgement === '' || this.stampDuty.stampDutyAmount === '') {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), -99, false, null, false, null)
        // G002.00.0 Update-Start
        // if (this.stampDuty.stampDutyJudgement === '') {
        //   this.judgeErrorMsg = ' 必ず入力してください。'
        // }
        // if (this.stampDuty.stampDutyAmount === '') {
        //   this.amountErrorMsg = ' 必ず入力してください。'
        // }
        if (this.stampDuty.stampDutyJudgement === '') {
          this.judgeErrorMsg = ' 必ず入力してください。'
        } else {
          this.judgeErrorMsg = ''
        }
        if (this.stampDuty.stampDutyAmount === '') {
          this.amountErrorMsg = ' 必ず入力してください。'
        } else {
          this.amountErrorMsg = ''
        }
        // G002.00.0 Update-End
        return
      }
      this.displayed = false
      this.$emit('clickSave', this.stampDuty, this.index)
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      this.stampDuty.stampDutyJudgement = this.stampDuty.stampDutyJudgement.toString().replace(/[^0-9]/gi, '')
      this.stampDuty.stampDutyAmount = this.stampDuty.stampDutyAmount.toString().replace(/[^0-9]/gi, '')
    }
  },
  // G001.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G001.00.0 Add end
}
