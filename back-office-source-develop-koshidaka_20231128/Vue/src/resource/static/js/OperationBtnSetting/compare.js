var compareUtil = {
  compare: function (oldData, newData) {
    if (oldData === newData) return true
    if (compareUtil.isObject(oldData) && compareUtil.isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length) {
      for (const key in oldData) {
        if (oldData.hasOwnProperty(key)) {
          if (!compareUtil.compare(oldData[key], newData[key])) {
            return false
          }
        }
      }
    } else if (compareUtil.isArray(oldData) && compareUtil.isArray(oldData) && oldData.length === newData.length) {
      for (let i = 0, length = oldData.length; i < length; i++) {
        if (!compareUtil.compare(oldData[i], newData[i])) {
          return false
        }
      }
    } else {
      return false
    }
    return true
  },
  isObject: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },
  isArray: function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
}
export default compareUtil
