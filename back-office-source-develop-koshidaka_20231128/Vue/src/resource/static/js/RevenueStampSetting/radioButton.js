/*
 * ---------+-----------------+----------+---------------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+---------------------------------------
 * 20221213  zhaomingyue(Neusoft) G001.00.0  issue課題#1198,#1199を対応します.
 */

export default {
  props: {
    value: {
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
