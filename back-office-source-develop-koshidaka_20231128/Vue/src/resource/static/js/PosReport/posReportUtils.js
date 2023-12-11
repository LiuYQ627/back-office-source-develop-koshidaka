// KSD V001.000 AS
import moment from 'moment'

const posResportCommonUtil = {
  methods: {
    convertNumberstoSingleByte: (data) => {
      if (!data) return ''
      const rex = /[\uFF10-\uFF19]/g
      data = data.replace(rex, (ch) => {
        return String.fromCharCode(ch.charCodeAt(0) - 65248)
      })
      return Number(data)
    },
    convertStringToHalfWidth: (data) => {
      return data.replace(/[！-～]/g, halfwidthChar => String.fromCharCode(halfwidthChar.charCodeAt(0) - 0xfee0))
    },
    convertStringToFullWidth: (data) => {
      return data.replace(/[!-~]/g, fullwidthChar => String.fromCharCode(fullwidthChar.charCodeAt(0) + 0xfee0))
    },
    /**
     * Converts number based on Z's and 9's format layout
     * @param {*} data raw data to be converted
     * @param {*} format Z9時間Z9分 - use format provide, supported Z and 9, extra strings are OK
     */
    NumberDisplayFormatter: function (data, format) {
      if (!data) return ''
      if (!format) return parseInt(data)
      if (typeof parseFloat(data) === 'number' && String(data).includes('%')) {
        data = String(parseFloat(data).toFixed(1))
      }
      const literals = ['Z', '9']
      let dataNum = []
      const layouts = this.checkReplaceable(format)
      let tempData = data

      if (layouts.length === 1) {
        dataNum.push(tempData.toString())
      } else {
        for (let layout of layouts) {
          if (dataNum.length > 0 && tempData !== tempData.split(dataNum.join(''))[0]) {
            tempData = tempData.split(dataNum.join('').trim())[1]
          }
          if (!literals.includes(layout.charAt(0))) {
            dataNum.push(tempData.split(layout)[0].trim())
            dataNum.push(layout)
          }
        }
      }
      if (dataNum.length !== layouts.length) {
        console.warn('NumberDisplayFormatter => Layout or DATA error, default returned')
        return data
      }

      let newData = []
      let isDecimal = false
      for (let i = 0; i <= dataNum.length; i++) {
        let dt = dataNum[i]
        let lt = layouts[i]
        let nd = []

        isDecimal = dt === '.' | isDecimal
        if (dt !== lt) {
          if (lt.length > dt.length) dt = dt.padStart(lt.length, '0')
          if (isDecimal && lt.length < dt.length) dt = dt.slice(0, lt.length)
          if (!isDecimal && lt.length < dt.length) {
            nd.push(parseInt(dt))
          } else {
            for (let j = 0; j <= lt.length; j++) {
              if (!(lt[j] === 'Z' && dt[j] === '0') || ((!isDecimal && dt[0] !== '0' && lt[j] === 'Z'))) {
                nd[j] = dt[j]
              }
            }
          }
        } else {
          nd.push(dt)
        }
        newData[i] = nd.join('')
      }
      return newData.join('')
    },
    checkReplaceable: function (data) {
      const literals = ['Z', '9']
      let toFormat = []
      let tempStr = ''
      for (let i = 0; i < data.length; i++) {
        const char = data.charAt(i)
        if (tempStr.length <= 0) {
          tempStr = char
          continue
        }

        if (!(literals.includes(tempStr[0]) ^ literals.includes(char))) {
          tempStr += char
        } else {
          toFormat.push(tempStr)
          tempStr = char
        }

        if (i === data.length - 1) {
          toFormat.push(tempStr)
        }
      }
      return toFormat
    },
    async openPopupDialog ({
      mode = 1,
      title = '',
      messageCode = null,
      message = null,
      code = '',
      showBackBtn = false,
      okBtnCallback = null,
      isNonDispStatus = false,
      backBtnCallback = null
    } = {}) {
      if (messageCode !== null && message === null) {
        message = this.$i18n.t(messageCode)
      }
      await this.$refs.pop.open(mode, title, message, code, showBackBtn, okBtnCallback, isNonDispStatus, backBtnCallback)
    },
    maskExcessDigits (value = 0, maxLength = 10, fillString = '?') {
      if (Number(value) < 0) {
        if (String(value).slice(1).length > maxLength) {
          return Array(Math.max(maxLength)).fill(fillString).join('')
        }
      }
      if (Number(value) > 0 && String(value).length > maxLength) {
        return Array(maxLength).fill(fillString).join('')
      }
      return Number(value).toLocaleString()
    },
    errorMapper (result) {
      switch (result.code) {
        case -90:
          this.openPopupDialog({
            mode: 2,
            message: this.$i18n.t('O00004.W008'),
            code: result.code,
            okBtnCallback: () => {
              this.$router.push('/LoginPage')
            }
          })
          break
        default:
          const { code, message } = this.mapErrorMessage(result)
          this.openPopupDialog({
            mode: 3,
            message: message,
            code: code,
            okBtnCallback: () => { this.$router.push('F32231/POSレポート出力') }
          })
          break
      }
    },
    mapErrorMessage (result) {
      const errorMsgMap = (result && result.errorMessageMap) || null
      if (errorMsgMap === null || !('global' in result.errorMessageMap)) {
        return { code: '', message: this.$i18n.t('O00004.W010') }
      } else {
        return { code: result.code, message: errorMsgMap['global'].toString() }
      }
    },
    addLeadingZeros (data, max) {
      if (!data) return ''
      const result = Number(data).toString()
      const resultCount = result.length
      if (resultCount < max) {
        let zeros = '0'.repeat(max - resultCount)
        return zeros + result.toString()
      }
      return data
    },
    hourZoneFormatter (hourZone) {
      const timeList = hourZone.split(/[~-～]/g)
      let formattedTime = []
      for (const t of timeList) {
        const timeMoment = moment(t, 'HH:mm')
        formattedTime.push(timeMoment.format('HH:mm'))
      }
      return formattedTime.join(this.$t('F32231.S907'))
    },
    reportConditionDateFormatter (requestObj, responseObj) {
      if (requestObj.duration.type === 2) {
        if (responseObj.from) {
          return moment(responseObj.from, 'YYYY').format('YYYY')
        }
        return moment(requestObj.duration.from, 'YYYY').format('YYYY')
      }
      if (responseObj && (responseObj.from || responseObj.to)) {
        // Return response if available
        if (requestObj.duration.type === 1) {
          return `${moment(responseObj.from, 'YYYY-MM').format('YYYY-MM')} ${this.$t('F32231.S705')} ${moment(responseObj.to, 'YYYY-MM').format('YYYY-MM')}`
        }
        return `${responseObj.from} ${this.$t('F32231.S705')} ${responseObj.to}`
      } else {
        if (requestObj.duration.type === 1) {
          return `${moment(requestObj.duration.from, 'YYYY-MM').format('YYYY-MM')} ${this.$t('F32231.S705')} ${moment(requestObj.duration.to, 'YYYY-MM').format('YYYY-MM')}`
        }
        return `${requestObj.duration.from} ${this.$t('F32231.S705')} ${requestObj.duration.to}`
      }
    },
    hourFormatter (data) {
      if (!data) return ''
      const toSplit = '～'
      const time = data.split(toSplit)
      const returnTime = time.map(hm => moment(hm, 'HH:mm').format('HH:mm'))
      return returnTime.toString().replace(',', toSplit)
    },
    stringSlicer (str, limit, isCutEnd = true) {
      return isCutEnd ? str.slice(0, limit) : str.slice(str.length - limit)
    },
    doubleByteStringSlicer (str, limit) {
      if (!str) {
        return ''
      }
      let result = ''
      let byteCount = 0
      for (var char of str) {
        const codeUnitNo = char.charCodeAt(0)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
          (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteCount += 1
        } else {
          byteCount += 2
        }
        if (byteCount <= limit) result += char.toString()
        else break
      }
      return result
    }
  }
}

export default posResportCommonUtil
// KSD V001.000 AE
