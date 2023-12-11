// KSD V001.000 AS
const dataUtils = {
  methods: {
    /**
     * Returns the first non-null item or null
     *
     * @param {*} ...values - Values to check for null
     * @returns {*|null}
     * @example
     * this.nullCoalesce(a,b)
     * // if a is null returns b
     * // returns null if both are null
     */
    nullCoalesce (...values) {
      for (const value of values) {
        if (value !== null && value !== undefined) {
          return value
        }
      }
    },
    /**
     * Returns a deep copy of value
     *
     * @param {*|*[]} value - Value to clone
     * @returns {*|*[]} Deep copy of value
     */
    deepClone (value) {
      return JSON.parse(JSON.stringify(value))
    },
    /**
     * Validates the existence of a key
     *
     * @param {{}} object - Object to validate
     * @param {string} keyString - Key path to use
     * @returns {boolean}
     * @example
     * this.checkKeyExists(object,'path.to.check')
     * // if object.path || object.path.to || object.path.to.check does not exist returns false
     */
    checkKeyExists (object, keyString) {
      let current = object
      let keys = keyString.split('.')
      let exists = true
      keys.forEach(key => {
        if (!exists) return
        if (!current.hasOwnProperty(key)) {
          exists = false
        } else {
          current = current[key]
        }
      })
      return exists
    },
    /**
     * Validates the existence of a key and if it has a value
     *
     * @param {{}} object - Object to validate
     * @param {string} keyString - Key path to use
     * @param {string[]} rules - Rules to use [includeZeroCheck]
     * @returns {boolean}
     * @example
     * this.checkKeyHasValue(object,'path.to.check')
     * // if object.path || object.path.to || object.path.to.check does not exist returns false
     * // if object.path.to.check is 0 || null || '' returns false
     * this.checkKeyHasValue(object,'path.to.check', [])
     * // Same as above but allows object.path.to.check to be 0
     */
    checkKeyHasValue (object, keyString, rules = ['includeZeroCheck']) {
      if (!this.checkKeyExists(object, keyString)) return false
      let current = object
      keyString.split('.').forEach((key) => {
        current = current[key]
      })
      const isZero = () => {
        if (rules.includes('includeZeroCheck')) {
          if (current === 0) return true
        }
        return false
      }
      if (current === null || current === '' || isZero()) return false
      return true
    }
  }
}

export default dataUtils
// KSD V001.000 AE
