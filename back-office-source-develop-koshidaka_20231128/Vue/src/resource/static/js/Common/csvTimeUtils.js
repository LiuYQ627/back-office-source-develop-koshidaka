// KSD V001.000 AS
const csvTimeUtils = {
  methods: {
    /**
     * Returns calculated permission roles
     *
     * @param {number} num - Value to calculate
     * @param {number} [multiplier=1000] - Multiplier
     * @returns {number} Processed value
     */
    csvCalc (num, multiplier = 1000) {
      return num * multiplier
    }
  }
}

export default csvTimeUtils
// KSD V001.000 AE
