// KSD V001.000 AS
import moment from 'moment'

const validationUtils = {
  data () {
    return {
      validationErrors: new Map(),
      _dataModel: null
    }
  },
  methods: {
    validate (dataModel, validations) {
      this._dataModel = this.flattenObject(dataModel)
      validations = this.flattenObject(validations)
      const results = new Map()
      Object.keys(validations).forEach((key, index) => {
        if (validations[key] && validations[key].length) {
          const value = this._dataModel[key]
          let validationRules = this.reorderSequence(validations[key])
          for (const validation of validationRules) {
            const result = this.validateValue(value, validation)
            if (['optional', 'requiredIfExists'].includes(validation[0])) {
              if (result == null) {
                break
              } else {
                continue
              }
            }
            if (result) {
              if (!results.has(key)) {
                results.set(key, [])
              }
              results.get(key).push(result)
            }
          }
        }
      })
      this.validationErrors = results
    },
    reorderSequence (validations) {
      const sequence = {
        required: 0,
        optional: 0,
        requiredIfExists: 0,
        maxlength: 1,
        range: 1,
        alphanumeric: 1,
        numeric: 1,
        integer: 1,
        boolean: 1,
        halfwidth: 1,
        maxbytelength: 1,
        isEqual: 1
      }
      return validations.sort((a, b) => {
        if (!sequence[a[0]] && sequence[a[0]] === undefined) {
          return 1
        }
        if (!sequence[b[0]] && sequence[b[0]] === undefined) {
          return -1
        }
        return sequence[a[0]] - sequence[b[0]]
      })
    },
    validateValue (value, validation) {
      const funcName = `${validation[0]}Validator`
      if (funcName in this) {
        const result = this[funcName](value, ...validation.slice(1))
        if (result === false) {
          return { value, validation, result }
        } else {
          return null
        }
      }
    },
    requiredValidator (value) {
      return value !== undefined &&
        value !== null &&
        String(value).trim().length > 0
    },
    requiredIfExistsValidator (value, checkExists) {
      if (!this.optionalValidator(this._dataModel[checkExists])) {
        return this.requiredValidator(value)
      }
      return true
    },
    optionalValidator (value) {
      return !this.requiredValidator(value)
    },
    isEqualValidator (value, checkValue, type = 'string') {
      type = type.toLowerCase()
      switch (type) {
        case 'number':
        case 'float':
        case 'double':
        case 'decimal':
          return Number(value) === Number(checkValue)
        case 'text':
        case 'string':
          return String(value) === String(checkValue)
        case 'bool':
        case 'boolean':
          return Boolean(value) === Boolean(checkValue)
        default:
          return value === checkValue
      }
    },
    maxlengthValidator (value, length) {
      return String(value).length <= Number(length)
    },
    rangeValidator (value, min, max) {
      return !Number.isNaN(String(value)) &&
        Number(value) >= Number(min) &&
        Number(value) <= Number(max)
    },
    alphanumericValidator (value) {
      const regex = /^[a-z0-9]+$/i
      return regex.test(String(value).trim())
    },
    numericValidator (value) {
      return !isNaN(String(value)) && String(value) !== ''
    },
    integerValidator (value) {
      return !isNaN(String(value)) &&
        Number.isInteger(Number(value))
    },
    booleanValidator (value) {
      return String(value).toLowerCase() === 'true' ||
        String(value).toLowerCase() === 'false'
    },
    halfwidthValidator (value) {
      const regex = /[\uff00-\uffff]/g
      return !regex.test(String(value).trim())
    },
    maxbytelengthValidator (value, length) {
      const byteLength = `${value}`.split('').reduce((total, char) => {
        const charCode = char.charCodeAt(0)
        const temp = charCode.toString(16).toUpperCase()
        if (charCode >= 0xff61 && charCode < 0xffa0) {
          return total + 2
        } else {
          return total + temp.length
        }
      }, 0)
      return (byteLength / 2) <= length
    },
    flattenObject (obj, prefix = '') {
      return Object.keys(obj).reduce((acc, key) => {
        const pre = prefix.length ? prefix + '.' : ''
        if (typeof obj[key] === 'object') {
          if (obj[key] === undefined) {
            acc[pre + key] = obj[key]
          } else if (obj[key] === null) {
            acc[pre + key] = obj[key]
          } else if (Array.isArray(obj[key])) {
            acc[pre + key] = obj[key]
          } else {
            Object.assign(acc, this.flattenObject(obj[key], pre + key))
          }
        } else if (typeof obj[key] === 'string') {
          acc[pre + key] = this.processString(obj[key])
        } else {
          acc[pre + key] = obj[key]
        }
        return acc
      }, {})
    },
    processString (object) {
      let result = object.replace(/ /g, '')
      result = result.split(/\|/g)
      result = result.map(item => item.split(/:|,/g).map((item, index) => index === 0 ? item : Number(item)))
      return result
    },
    getFailedValidations (key) {
      if (!this.validationErrors) return
      if (!this.validationErrors.has(key)) return
      return this.validationErrors.get(key).map((validationResult) => validationResult.validation[0])
    },
    getTopFailedValidation (key) {
      if (!this.validationErrors) return
      if (!this.validationErrors.has(key)) return
      return this.getFailedValidations(key)[0]
    },
    checkValidationResult (key, validation) {
      if (!this.validationErrors) return true
      if (!this.validationErrors.has(key)) return true
      return !this.getFailedValidations(key).includes(validation)
    },
    getErrorCount () {
      return this.validationErrors.size
    },
    fileUploadSizeLimit (file) {
      return file['size'] / 1024 / 1024 > 1
    },
    fileUploadType (file) {
      return file.type !== 'image/png'
    },
    imageUploadSizeLimit (file) {
      return file['size'] > 10 * 1024 * 1024
    },
    videoUploadSizeLimit (file) {
      return file['size'] > 50 * 1024 * 1024
    },
    audioUploadSizeLimit (file) {
      return file['size'] > 15 * 1024 * 1024
    },
    excludeProhibitedInput (value, prohibitedRgx, inputObject, inputVariable) {
      if (inputObject[inputVariable] === value) {
        const newStr = value.replace(prohibitedRgx, '')
        return newStr
      }
    },
    yearMonthDashFormat (value, allowedIndex = 4) {
      const newValue = value.split('').map((char, index) => {
        if ((index !== allowedIndex && char === '-') || (index === allowedIndex && !/[^0-9]/.test(char))) {
          return ''
        }
        return char;
      }).join('');

      if (newValue !== value) {
        return newValue
      }
      return value
    },
    ipv4FormatCheck (ipv4String) {
      return (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipv4String))
    },
    yyyymmCheck (dateString) {
      return (dateString) ? (/^\d{4}\-(0[1-9]|1[012])/).test(dateString) : false
    },
    yyyyCheck (dateString) {
      return (/^\d{4}$/).test(dateString)
    },
    checkDateRange (durationFrom, durationTo, errorCheckFlag) {
      if ((durationFrom !== null) && (durationFrom !== '') && (durationTo !== null) && (durationTo !== '')) {
        if (errorCheckFlag) {}
        let date1 = new Date(durationFrom)
        let date2 = new Date(durationTo)
        let msDifference = date2.getTime() - date1.getTime()
        let dayDifference = msDifference / (1000 * 3600 * 24)
        if ((dayDifference <= 366) && (dayDifference >= 0)) {
          return {
            durationFrom: durationFrom,
            durationTo: durationTo
          }
        } else if ((dayDifference < 0) && (errorCheckFlag === 1)) {
          return 1
        } else if ((dayDifference < 0) && (errorCheckFlag === 2)) {
          return 2
        } else if (dayDifference > 366 && (errorCheckFlag === 1)) {
          return 3
        } else if (dayDifference > 366 && (errorCheckFlag === 2)) {
          return 4
        }
      } else {
        return false
      }
    },
    leapDayCheck (yyyymmdd) {
      const date = moment(yyyymmdd, 'YYYY-MM-DD')
      const year = date.year()
      const month = date.month() + 1
      const day = date.date()
      return (moment([year]).isLeapYear() && (month === 2) && (day === 29))
    },
    dailyDurationValidation (durationFrom, durationTo, errorCheckFlag = 0) {
      let earliestPossibleDate = moment('2000-01-01', 'YYYY-MM-DD')
      const checkDateRangeResult = this.checkDateRange(durationFrom, durationTo, errorCheckFlag)
      if ((checkDateRangeResult) || (errorCheckFlag !== 0)) {
        return checkDateRangeResult
      } else if ((durationFrom === null || durationFrom === '') && (durationTo === null || durationTo === '')) {
        durationFrom = moment().subtract(1, 'years').add(1, 'days').format('YYYY-MM-DD')
        durationTo = moment().format('YYYY-MM-DD')
      } else if (durationFrom === null || durationFrom === '') {
        const tempFrom = moment(durationTo, 'YYYY-MM-DD').subtract(1, 'years').add(1, 'days')
        durationFrom = (tempFrom.diff(earliestPossibleDate) > 0) ? tempFrom.format('YYYY-MM-DD') : earliestPossibleDate.format('YYYY-MM-DD')
      } else if (durationTo === null || durationTo === '') {
        let tempTo = null
        if (this.leapDayCheck(durationFrom) || this.leapDayCheck(moment(durationFrom, 'YYYY-MM-DD').add(366, 'days').format('YYYY-MM-DD'))) {
          tempTo = moment(String(moment(durationFrom, 'YYYY-MM-DD').add(1, 'years').year()) + '-02-28')
        } else {
          tempTo = moment(durationFrom, 'YYYY-MM-DD').add(1, 'years').subtract(1, 'days')
        }
        console.log((tempTo.diff(moment()) < 0))
        durationTo = (tempTo.diff(moment()) < 0) ? tempTo.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
      }
      return {
        durationFrom: durationFrom,
        durationTo: durationTo
      }
    },
    banNumberValidator (value, bannedValues) {
      return !bannedValues.includes(Number(value))
    }
  }
}

export default validationUtils
// KSD V001.000 AE
