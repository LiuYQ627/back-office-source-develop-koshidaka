// KSD V001.000 AS
import commonUtils from '@/resource/static/js/Common/commonUtils'
import { inputLimitation } from '@/resource/static/js/Common/jsUtils'
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
const searchQueryPath = 'ProductGroupMaster/ProductQuery/limit'

export default {
  name: 'productMasterLinkCode',
  data () {
    return {
      dialog: false,
      title: this.$i18n.t('F00108.S180'),
      permissions: [],
      tableScrollBar: false,
      dataModel: {
        search: null
      },
      itemList: [],
      targetStoreCd: 0,
      selectedItem: {},
      selectedIndex: -1,
      itemListLimit: 0
    }
  },
  components: {
    popup
  },
  methods: {
    async open (targetStoreCd, itemListLimit) {
      this.selectedItem = {}
      this.itemList = []
      this.dataModel.search = ''
      this.selectedIndex = -1,
      this.targetStoreCd = targetStoreCd
      this.dialog = true
      this.itemListLimit = itemListLimit
    },
    async onClickSearch () {
      try {
        this.itemList = []
        const searchParams = {
          productClassificationNumber: 8,
          displayName: {
            kanji: '/^' + this.dataModel.search + '/'
          }
        }
        const params = {
          nodeId: this.targetStoreCd,
          queryMode: 'ALL',
          queryLimit: this.itemListLimit + 1,
          searchParams: JSON.stringify(searchParams)
        }
        const response = await axios.get(
          this.$i18n.t('prop.url') + searchQueryPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({ params })
        )
        if (response.data.result.code === 0) {
          this.itemList = response.data.responseModel
        } else if (response.data.result.code === 2) {
          this.dataModel = []
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },
    onClickReturn () {
      this.popupConfirm()
    },
    popupConfirm () {
      this.dialog = false
    },
    clickRow (item, index) {
      this.selectedItem = item
      this.selectedIndex = index
    },
    onClickSave () {
      this.$emit('clickSubmit', this.selectedItem)
      this.dialog = false
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap !== null && result.errorMessageMap.hasOwnProperty('global') ? result.errorMessageMap['global'].toString() : this.$i18n.t('O00004.W010')
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    }
  },
  async mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
}
// KSD V001.000 AE
