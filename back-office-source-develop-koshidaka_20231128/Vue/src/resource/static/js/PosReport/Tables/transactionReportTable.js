/* KSD V001.000 AS */
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'

export default {
  name: 'TransactionReportTable',
  mixins: [posReportUtils],
  props: {
    data: {
      type: Object | Array,
      required: true
    },
    request: {
      type: Object | Array,
      required: true
    },
    headers: {
      type: Object | Array,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    maskItem (data) {
      return this.maskExcessDigits(data)
    },
    addZeros (data) {
      return this.addLeadingZeros(data, 6)
    }
  }
}
/* KSD V001.000 AE */
