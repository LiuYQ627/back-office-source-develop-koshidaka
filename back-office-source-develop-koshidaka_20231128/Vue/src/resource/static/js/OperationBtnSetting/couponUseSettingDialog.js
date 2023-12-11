// KSD V001.000 AS
import popup from '@/resource/templates/CommonDesign/Popup'

export default {
  name: 'CouponUseSettingDialog',
  data () {
    return {
      permissions: [],
      config: {},
      displayed: false,
      index: 0,
      couponUse: {
        displayName: {}
      },
      title: '',
      initFlag: true,
      couponUseCodeList: [],
      nodeId: 0,
      resTickets: [],
      resTicketsLen: 0,
      selectedData: {
        selectedIndex: '',
        cardIndex: '',
        rowData: ''
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
    open (permissions, couponUse, index, title, couponUseCodeList, nodeId, resTickets) {
      this.permissions = permissions
      this.nodeId = nodeId
      this.initFlag = true
      this.couponUse = {}
      this.title = title
      this.couponUseCodeList = couponUseCodeList
      this.couponUse = {
        ...couponUse,
        active: true
      }
      this.index = index
      this.displayed = true
      this.resTickets = resTickets
      this.resTicketsLen = resTickets.length
    },
    clicked (index, rowData) {
      this.selectedData = {
        selectedIndex: index,
        cardIndex: this.index,
        rowData
      }
      this.couponUse.selectedCouponIndex = index
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickSave () {
      this.$emit('clickSave', this.selectedData)
      this.displayed = false
      this.selectedData = {
        selectedIndex: '',
        cardIndex: '',
        rowData: ''
      }
    },
    showDoneOnTable (code) {
      return this.couponUseCodeList.includes(code)
    },
    isSelectedCoupon (resTicket) {
      const resTicketCodeString = this.codeToString(resTicket.Code)
      var selectedItemCodeString = null
      if (this.selectedData && this.selectedData.rowData && this.selectedData.rowData.Code) {
        selectedItemCodeString = this.codeToString(this.selectedData.rowData.Code)
      } else if (this.couponUse && this.couponUse.code) {
        selectedItemCodeString = this.codeToString(this.couponUse.code)
      }
      return resTicketCodeString === selectedItemCodeString
    },
    codeToString (Code) {
      const c = Number(Code)
      if (c < 10) {
        return '00' + c
      } else if (c > 9 && c < 100) {
        return '0' + c
      } else {
        return '' + c
      }
    }
  },
  computed: {
    tableScrollBar: function () {
      return this.resTickets.length > 6
    }
  },
  created () {
    this.fetchConfig()
  }
}
// KSD V001.000 AE
