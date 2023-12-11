// KSD V001.000 AS
import commonUtils from '@/resource/static/js/Common/commonUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import CommonSelectDialog from '@/resource/templates/CommonDesign/CommonSelectDialog'
import axios from 'axios'

const RestaurantsTableQuery = 'Audit/RestaurantsTableQuery'
export default {
  name: 'roomSelect',
  mixins: [transformUtils],
  props: {
    roomCodes: {
      type: Array,
      required: true
    },
    roomDataList: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    headquartersAuthorityCheckEnable: {
      type: Boolean,
      default: false
    },
    hasCodeName: {
      type: Boolean,
      default: false
    },
    isDisabledEmpty: {
      type: Boolean,
      default: false,
      required: false
    },
    isRoomNo: {
      type: Boolean,
      default: false,
      required: false
    },
    storeCodes: {
      type: Array,
      required: false
    }
  },
  components: {
    CommonSelectDialog
  },
  data () {
    return {
      masterRooms: [],
      // KSD V001.000 DS merge_requests 228対応(tblNo⇒indexNo)
      // selectedItems: this.roomCodes.map((x) => x.tblNo),
      // KSD V001.000 DE merge_requests 228対応(tblNo⇒indexNo)
      // KSD V001.000 AS merge_requests 228対応(tblNo⇒indexNo)
      selectedItems: this.roomCodes.map((x) => x.indexNo),
      // KSD V001.000 AE merge_requests 228対応(tblNo⇒indexNo)
      roomsText: this.roomCodes.map((x) => x.tblName)
    }
  },
  computed: {
    valueText () {
      return this.roomsText.join(this.$i18n.t('F32231.S261'))
    }
  },
  model: {
    prop: 'roomCodes',
    event: 'change'
  },
  watch: {
    disabled (newValue) {
      if (newValue === true && this.isDisabledEmpty) {
        this.roomsText = []
        this.selectedItems = []
      }
    }
  },
  methods: {
    async openDialog () {
      let hasError = false
      if (this.isRoomNo) {
        const roomParams = {
          nodeId: this.storeCodes[0],
          IndexNo: 0,
          orderBy: 'IndexNo',
          ascending: true,
          startIndex: 0,
          batchSize: 0,
          getTableExistsInRoomInfo: true
        }
        try {
          const response = await axios.post(this.$i18n.t('prop.url') + RestaurantsTableQuery, roomParams, commonUtils.methods.addApiHeader({}))
          if (response.data.result.code === 0) {
            if (response.data.responseModel !== null) {
              this.roomDataList = response.data.responseModel.map(room => this.uncapitalizeKeys(room))
              this.roomDataList = this.roomDataList.filter(room => {
                if ((room.tblName !== '') && (room.tblNo !== '')) return room
              })
            }
          } else if (response.data.result.code === 2) {
            this.roomDataList = []
          } else {
            hasError = true
            this.$emit('globalError', response.data.result)
          }
        } catch (error) {
          hasError = true
          this.$emit('catchError')
          console.error(error)
        }
      }
      if (hasError === false) {
        this.$refs.commonSelectDialog.open(this.roomDataList.map(res => ({
          // KSD V001.000 DS merge_requests 228対応(tblNo⇒indexNo)
          // code: res.tblNo,
          // KSD V001.000 DE merge_requests 228対応(tblNo⇒indexNo)
          // KSD V001.000 AS merge_requests 228対応(tblNo⇒indexNo)
          code: res.indexNo,
          // KSD V001.000 AE merge_requests 228対応(tblNo⇒indexNo)
          name: res.tblName
        })), this.selectedItems, this.multiple)
      }
    },
    async handleRoomChange (resultObj) {
      this.selectedItems = resultObj
      // KSD V001.000 DS merge_requests 228対応(tblNo⇒indexNo)
      // const data = this.roomDataList.filter(res => this.selectedItems.includes(res.tblNo))
      // KSD V001.000 DE merge_requests 228対応(tblNo⇒indexNo)
      // KSD V001.000 AS merge_requests 228対応(tblNo⇒indexNo)
      const data = this.roomDataList.filter(res => this.selectedItems.includes(res.indexNo))
      // KSD V001.000 AE merge_requests 228対応(tblNo⇒indexNo)
      this.roomsText = data.map(({ tblName }) => tblName)
      const obj = data
      this.$emit('change', obj)
    },
    clearRoomSelect () {
      this.roomsText = []
      this.selectedItems = []
    }
  }
}
// KSD V001.000 AE
