// KSD V001.000 AS
import TextInput from '@/resource/templates/CommonInput/TextInput'
export default {
  name: 'SelfPOSMasterSettingTimeSetting',
  props: {
    dataModel: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      timeSettingConfig: this.dataModel,
      nooperationtimeflag: null,
      waitscreentransitionflag: null,
      topscreentransitionflag: null,
      transittoomiokuriflag: null,
      stillimageplaytimeflag: null,
      movieplaynumflag: null,
      focusItem: null
    }
  },
  components: {
    TextInput
  },
  methods: {
    initialize () {
      this.focusItem = null
      this.nooperationtimeflag = null
      this.waitscreentransitionflag = null
      this.topscreentransitionflag = null
      this.transittoomiokuriflag = null
      this.stillimageplaytimeflag = null
      this.movieplaynumflag = null
    },
    isEmpty () {
      this.initialize()
      let flag = false
      if (this.timeSettingConfig.movieplaynum === '' || this.timeSettingConfig.movieplaynum == null) {
        this.focusItem = this.movieplaynumflag = this.$refs.movieplaynum
        flag = true
      }
      if (this.timeSettingConfig.stillimageplaytime === '' || this.timeSettingConfig.stillimageplaytime == null) {
        this.focusItem = this.stillimageplaytimeflag = this.$refs.stillimageplaytime
        flag = true
      }
      if (this.timeSettingConfig.transittoomiokuri === '' || this.timeSettingConfig.transittoomiokuri == null) {
        this.focusItem = this.transittoomiokuriflag = this.$refs.transittoomiokuri
        flag = true
      }
      if (this.timeSettingConfig.topscreentransition === '' || this.timeSettingConfig.topscreentransition == null) {
        this.focusItem = this.topscreentransitionflag = this.$refs.topscreentransition
        flag = true
      }
      if (this.timeSettingConfig.waitscreentransition === '' || this.timeSettingConfig.waitscreentransition == null) {
        this.focusItem = this.waitscreentransitionflag = this.$refs.waitscreentransition
        flag = true
      }
      if (this.timeSettingConfig.nooperationtime === '' || this.timeSettingConfig.nooperationtime == null) {
        this.focusItem = this.nooperationtimeflag = this.$refs.nooperationtime
        flag = true
      }
      return flag
    },
    regulateNumericInput (propertyName) {
      this.timeSettingConfig[propertyName] = this.timeSettingConfig[propertyName].toString().replace(/[^0-9]/gi, '')
    }
  },
  watch: {
    dataModel: {
      handler (value) {
        this.timeSettingConfig = JSON.parse(JSON.stringify(this.dataModel))
        Object.keys(this.timeSettingConfig).forEach(key => {
          this.timeSettingConfig[key] = this.timeSettingConfig[key].toString()
        })
      },
      immediate: true,
      deep: true
    }
  }
}
// KSD V001.000 AE
