import popup from '@/resource/templates/CommonDesign/Popup'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230425 dingxin(Neusoft)    G001.00.0  issue#1662.
 */
export default {
  data () {
    return {
      // G001.00.0 Add-Start
      permissions: [],
      // G001.00.0 Add-End
      config: {},
      displayed: false,
      index: 0,
      subMediaList: [],
      itemDetail: {
        displayName: {}
      }
    }
  },
  components: {
    popup
  },
  methods: {
    fetchConfig () {
      this.config = require('./_config.json')
    },
    async open (itemDetail, index) {
      this.itemDetail = {
        ...itemDetail,
        active: true
      }
      this.index = index
      this.displayed = true
    },
    setSubMediaList (list) {
      this.subMediaList = list
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickSave () {
      this.displayed = false
      this.$emit('clickSave', this.itemDetail, this.index)
    }
  },

  created () {
    this.fetchConfig()
    // G001.00.0 Add-Start
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
    // G001.00.0 Add-End
  }
}
