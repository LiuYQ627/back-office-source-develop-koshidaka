import popup from '@/resource/templates/CommonDesign/Popup'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230425 dingxin(Neusoft)   G001.00.0  issue#1662.
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
      drawerMenu: []
      // KSD V001.000 AS
      , oesFlag1: null,
      unpaidListActive: null,
      hiddenUnpaidList: false
      // KSD V001.000 AE
    }
  },
  components: {
    popup
  },
  methods: {
    fetchConfig () {
      this.config = require('./_config.json')
    },
    // G001.00.0 Update-Start
    // async open (drawerMenu, index) {
    // KSD V001.000 DS
    // async open (permissions, drawerMenu, index) {
    // KSD V001.000 DE
    // KSD V001.000 AS
    async open (permissions, drawerMenu, index, oesFlag1, hiddenUnpaidList) {
    // KSD V001.000 AE
      this.permissions = permissions
      // G001.00.0 Update-End
      this.drawerMenu = drawerMenu
      this.index = index
      this.displayed = true
      // KSD V001.000 AS
      this.oesFlag1 = oesFlag1
      this.hiddenUnpaidList = hiddenUnpaidList
      let updatedDrawerMenu = []
      drawerMenu.forEach(item => {
        if (this.config.drawerMenuName[item[0]] !== undefined) {
          updatedDrawerMenu.push(item)
        }
      })
      this.drawerMenu = updatedDrawerMenu
      this.unpaidListActive = drawerMenu.filter(([key, value]) => key === 'unpaidList')[index][1].active
      // KSD V001.000 AE
    },
    // KSD V001.000 AS
    displayItem (key) {
      return !(key === 'unpaidList' && this.hiddenUnpaidList)
    },
    // KSD V001.000 AE
    toggleActive (index) {
      this.drawerMenu[index][1].active = !this.drawerMenu[index][1].active
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickSave () {
      this.displayed = false
      this.$emit('clickSave', this.drawerMenu, this.index)
    }
  },

  filters: {
    drawer_menu: function (value) {
      const config = require('./_config.json')
      return config.drawerMenuName[value] || null
    }
  },

  created () {
    this.fetchConfig()
  }
}
