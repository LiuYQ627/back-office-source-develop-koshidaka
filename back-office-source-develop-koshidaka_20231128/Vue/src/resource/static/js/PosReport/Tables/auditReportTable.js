/* KSD V001.000 AS  */
import moment from 'moment'
import posReportUtils from '@/resource/static/js/PosReport/posReportUtils.js'

export default {
  name: 'AuditReportTable',
  mixins: [posReportUtils],
  props: {
    data: {
      type: Object | Array,
      required: true
    },
    headers: {
      type: Object | Array,
      required: true
    },
    duration: {
      type: Object | Array,
      required: true
    }
  },
  data () {
    return {}
  },
  components: {},
  methods: {
    maskExcessDigits (value, maxLength = 10, fillString = '?') {
      if (Number(value) < 0) {
        if (String(value).slice(1).length > maxLength) {
          return Array(Math.max(maxLength)).fill(fillString).join('')
        }
      }
      if (Number(value) > 0 && String(value).length > maxLength) {
        return Array(maxLength).fill(fillString).join('')
      }
      if (value === '0') {
        return '0'
      }
      const convertTotal = String(value)
      const lastDigit = convertTotal[convertTotal.length - 1]
      const nonZeroPart = convertTotal.substring(0, convertTotal.length - 1).replace(/^0+/, '')
      const combineResult = nonZeroPart + lastDigit
      return combineResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    commaSeparated (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    MaxFormatDisplay (item, charCount) {
      const convertValue = String(item)
      const formattedString = convertValue.padStart(charCount, '0')
      return formattedString
    },
    removeLeadingZerosExceptLast (item, withoutComma = false) {
      const conversionValue = String(item)

      if (conversionValue === '0') {
        return '0'
      }

      const lastDigit = conversionValue[conversionValue.length - 1]
      const nonZeroPart = conversionValue.substring(0, conversionValue.length - 1).replace(/^0+/, '')
      const combineResult = nonZeroPart + lastDigit
      return combineResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, withoutComma ? '' : ',')
    },
    formattedDate (number) {
      // KSD V001.000 DS issue #1728 対応(UTCへの変換を行ってしまっていたため修正)
      // const momentDate = moment.utc(number)
      // KSD V001.000 DE issue #1728 対応(UTCへの変換を行ってしまっていたため修正)
      // KSD V001.000 AS issue #1728 対応(UTCへの変換を行ってしまっていたため修正)
      const momentDate = moment(number, '')
      // KSD V001.000 AE issue #1728 対応(UTCへの変換を行ってしまっていたため修正)
      if (!momentDate.isValid()) {
        return ''
      }
      const formattedDate = momentDate.format('YYYY年MM月DD日 HH:mm')
      return formattedDate
    }
  },
  async mounted () {}
}
/* KSD V001.000 AE */
