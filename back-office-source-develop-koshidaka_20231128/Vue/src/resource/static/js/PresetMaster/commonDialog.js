/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230315  dingxin(Neusoft)      G001.00.0  issue課題#1662を対応します.
 */
export default {
  data () {
    return {
      permissions: [],
      hasYesButton: true
    }
  },
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
    disabledOKButton: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 560
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
  beforeCreate () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
      if (this.permissions.includes('CLOUDPOS_PRESET_UPDATE')) {
        this.hasYesButton = true
      } else {
        this.hasYesButton = false
      }
    })
  }
}
