/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221220  litie(Neusoft)        G001.00.0  issue課題#937を対応します.
 * 20230131  litie(Neusoft)        G002.00.0  issue課題#835を対応します.
 */
export default {
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
    // G001.00.0 Update-Start
    hasResetButton: {
      type: Boolean,
      default: false
    },
    // G001.00.0 Update-End
    hasOKButton: {
      type: Boolean,
      default: true
    },
    // AS KSD V001.000 83800
    hasDisplayButton: {
      type: Boolean,
      default: true
    },
    // AE KSD V001.000 83800
    // G002.00.0 Update-Start
    disabledOKButton: {
      type: Boolean,
      default: false
    },
    // G002.00.0 Update-End
    width: {
      type: Number,
      default: 560
    }
    // KSD V001.000 AS
    , hasModeLabel: {
      type: Boolean,
      default: false
    },
    isNewMode: {
      type: Boolean,
      default: false
    },
    newModeLabel: {
      type: String,
      default: ''
    },
    editModeLabel: {
      type: String,
      default: ''
    },
    backBtnLabel: {
      type: String,
      default: ''
    },
    deleteBtnLabel: {
      type: String,
      default: ''
    }
    // KSD V001.000 AE
  },
  methods: {
    onClickDelete () {
      this.$emit('clickDelete')
    },
    // G001.00.0 Update-Start
    onClickReset () {
      this.$emit('clickReset')
    },
    // G001.00.0 Update-End
    onClickBack () {
      this.$emit('clickBack')
    },
    onClickOk () {
      this.$emit('clickOk')
    }
    // KSD V001.000 AS
    , handleTabKey (e) {
      this.$emit('keydown', e)
    }
    // KSD V001.000 AE
  }
}
