// KSD V001.000 AS
const unloadingUtils = {
  data () {
    return {
      enableUnloadHandling: {
        type: Boolean,
        default: true
      },
      enableF5Handling: {
        type: Boolean,
        default: true
      }
    }
  },
  methods: {
    confirmUnload (event) {
      if (!this.enableUnloadHandling) return
      event.returnValue = ''
    },
    handleF5 (event) {
      if (!this.enableF5Handling) return
      if (event.key === 'F5') {
        location.reload()
      }
    }
  }
}

export default unloadingUtils
// KSD V001.000 AE
