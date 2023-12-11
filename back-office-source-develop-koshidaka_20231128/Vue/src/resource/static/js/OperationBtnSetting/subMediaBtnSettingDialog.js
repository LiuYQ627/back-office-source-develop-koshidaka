import popup from '@/resource/templates/CommonDesign/Popup'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230109 bai.ry(Neusoft)  G001.00.0  issue課題#1204を対応します.
 * 20230420 bai.ry(Neusoft)  G002.00.0  issue課題#1452を対応します.
 * 20230425 dingxin(Neusoft) G003.00.0  issue課題#1662を対応します.
 */
export default {
  data () {
    return {
      // G003.00.0 Add-Start
      permissions: [],
      // G003.00.0 Add-End
      displayed: false,
      index: 0,
      itemDetail: {
        displayName: {},
        subType: ''
      },
      subMediaList: [],
      // G001.00.0 Add-Start
      subTypeErrorMsg: ''
      // G001.00.0 Add-End
    }
  },
  components: {
    popup
  },
  methods: {
    // G002.00.0 Add-Start
    getNameFromSetting (type) {
      if (type) {
        const media = this.subMediaList.find(item => item.name === type)
        return media.displayName.default
      } else {
        return ''
      }
    },
    // G002.00.0 Add-End
    // G003.00.0 Update-Start
    // async open (itemDetail, index, submediaList) {
    async open (permissions, itemDetail, index, submediaList) {
      this.permissions = permissions
      // G003.00.0 Update-End
      this.itemDetail = {
        ...itemDetail,
        active: true
      }
      this.index = index
      this.displayed = true
      this.subMediaList = submediaList
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false; this.subTypeErrorMsg = '' }, false, null)
    },
    onClickSave () {
      // G001.00.0 Add-Start
      if (this.itemDetail.subType === '' || this.itemDetail.subType === null) {
        this.subTypeErrorMsg = this.$i18n.t('O00004.W014')
        return
      }
      // G001.00.0 Add-End
      this.displayed = false
      this.$emit('clickSave', this.itemDetail, this.index)
    },
    mediaSelected (selectedVal) {
      // G001.00.0 Add-Start
      this.subTypeErrorMsg = ''
      // G001.00.0 Add-End
      let selectName = this.subMediaList.find((item) => {
        return item.name === selectedVal.target.value
      })
      this.itemDetail.displayName.default = selectName.displayName.default
    }
  }
}
