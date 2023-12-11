// KSD V001.000 AS
import moment from 'moment'

const transformUtils = {
  methods: {
    zeroSuppress (num) {
      return Number(num)
    },
    zeroSupply (num, length) {
      return ('0'.repeat(length) + num).slice(-length)
    },
    capitalizeKeys (data, { except = ['nodeId', 'createTimestamp', 'lastModifiedTimestamp', 'version', 'lastModifiedUserId'], reverse = false } = {}) {
      let obj = {}
      Object.keys(data)
        .forEach(key => {
          if (!except.includes(key) ^ reverse) {
            obj[key.at(0).toUpperCase() + key.slice(1)] = data[key]
          } else {
            obj[key] = data[key]
          }
        })
      return obj
    },
    uncapitalizeKeys (data, { except = ['nodeId', 'createTimestamp', 'lastModifiedTimestamp', 'version', 'lastModifiedUserId'], reverse = false } = {}) {
      let obj = {}
      Object.keys(data)
        .forEach(key => {
          if (!except.includes(key) ^ reverse) {
            obj[key.at(0).toLowerCase() + key.slice(1)] = data[key]
          } else {
            obj[key] = data[key]
          }
        })
      return obj
    },
    extractNumerics (str) {
      const numericRegex = /\d+(\.\d+)?/

      if (!str) {
        return null
      }
      const matches = str.match(numericRegex)

      if (matches && matches.length > 0) {
        const numericValue = parseFloat(matches[0])
        return numericValue
      }
      return null
    },
    /**
     * Sort array of objects by key
     *
     * @param {Object[]} list - List of objects to sort
     * @param {String} key - Key to sort array with (must be numeric)
     * @returns {Object[]} Sorted list by key
     */
    sortByKey (list, key) {
      return list.sort((a, b) => {
        return (Number(a[key]) - Number(b[key]))
      })
    },
    sortDates (list, precision = 'day') {
      const checkMoment = (date) => {
        return moment.isMoment(date) ? date : moment(date)
      }
      return list.sort((a, b) => {
        const aMoment = checkMoment(a)
        const bMoment = checkMoment(b)
        if (aMoment.isBefore(bMoment, precision)) {
          return -1
        }
        if (aMoment.isSame(bMoment, precision)) {
          return 0
        }
        return 1
      })
    }
  }
}

export default transformUtils
// KSD V001.000 AE
