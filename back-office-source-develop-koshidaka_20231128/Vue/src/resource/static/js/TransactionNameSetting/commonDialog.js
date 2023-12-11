/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230302 dingxin(Neusoft)   G001.00.0  issue課題#1662を対応します.
 * 20230315 dingxin(Neusoft)   G001.00.1  issue課題#1662を対応します.
 */
export default {
  // G001.00.0 Add start
  data () {
    return {
      permissions: [],
      // G001.00.1 Add-Start
      hasYesButton: true
      // G001.00.1 Add-End
    }
  },
  // G001.00.0 Add end
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    okLabel: {
      type: String,
      default: '保存'
    },
    hasDeleteButton: {
      type: Boolean,
      default: false
    },
    hasResetButton: {
      type: Boolean,
      default: false
    },
    hasOKButton: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 560
    },
    mode: {
      type: Number
    }
  },
  methods: {
    onClickDelete () {
      this.$emit('clickDelete')
    },
    onClickReset () {
      this.$emit('clickReset')
    },
    onClickBack () {
      this.$emit('clickBack')
    },
    onClickOk () {
      this.$emit('clickOk')
    }
  },
  // G001.00.0 Add start
  beforeCreate () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
      if (this.permissions.includes('CLOUDPOS_TRANSACTION_UPDATE')) {
        // G001.00.1 Update-Start
        // this.hasOKButton = true
        this.hasYesButton = true
        // G001.00.1 Update-End
      } else {
        // G001.00.1 Update-Start
        // this.hasOKButton = false
        this.hasYesButton = false
        // G001.00.1 Update-End
      }
    })
  }
  // G001.00.0 Add end
}
