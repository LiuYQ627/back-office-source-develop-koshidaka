// KSD V001.000 AS
const permissionRoleUtils = {
  methods: {
    /**
     * Returns calculated permission roles
     *
     * @param {number} num - Value to calculate
     * @param {number} [multiplier=1000] - Multiplier
     * @returns {number} Processed value
     */
    permissionsRolesCalc (num, multiplier = 1000) {
      return num * multiplier
    }
  }
}

export default permissionRoleUtils
// KSD V001.000 AE
