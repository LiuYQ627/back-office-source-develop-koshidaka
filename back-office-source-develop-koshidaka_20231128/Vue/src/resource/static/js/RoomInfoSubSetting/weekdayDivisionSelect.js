//  KSD V001.000 AS
export default {
  name: 'WeekdayDivisionSelect',
  props: {
    weekdayDivisionList: {
      type: Array,
      required: true,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      weekdayDivision: {}
    }
  }
}
//  KSD V001.000 AE
