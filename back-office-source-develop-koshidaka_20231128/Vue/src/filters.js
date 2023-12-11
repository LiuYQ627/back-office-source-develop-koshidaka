export default {
  numberPutComma (value) {
    if (Number(value) === 0) {
      return 0
    }
    let installVal = value
    if (Number(value)) {
      // if(!value) return '0.00'
      value = Number(value).toFixed(0)
      let intPart = Math.trunc(value)
      let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      let floatPart = ''
      let value2Array = value.split('.')
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString()
        if (floatPart.length === 1) {
          return intPartFormat + '.' + floatPart + '0'
        } else {
          if (installVal < 0 && intPartFormat === '0') {
            return '-' + intPartFormat + '.' + floatPart
          } else {
            return intPartFormat + '.' + floatPart
          }
        }
      } else {
        return intPartFormat + floatPart
      }
    }
  }
  // KSD V001.000 AS
  , CommaSeparated (value) {
    if (!value) return 0
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  // KSD V001.000 AE
}
