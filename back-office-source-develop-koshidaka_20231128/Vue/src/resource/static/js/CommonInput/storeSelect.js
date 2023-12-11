import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
// KSD V001.000 AS 
// カスタム画面に「店舗コード：店舗名称」で表示する
import { convertCode } from '../../js/Common/jsUtils'
// KSD V001.000 AE
/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230103  litie(Neusoft)        G001.00.0  issue課題#1058を対応します.
 * 20230103  litie(Neusoft)        G002.00.0  issue課題#939を対応します.
 * 20230614  wangchunmei(Neusoft)  G003.00.0  issue課題#1639を対応します.
 */

export default {
  props: {
    storeCodes: {
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
    // G001.00.0 Update-Start
    headquartersAuthorityCheckEnable: {
      type: Boolean,
      default: false
    },
    // KSD V001.000 AS
    // チェック 確認 進む
    confirmProceed: {
      type: Boolean,
      required: false,
      default: false
    },
    // カスタム画面に「店舗コード：店舗名称」で表示する
    hasCodeName: {
      type: Boolean,
      default: false
    }
    // KSD V001.000 AE 
    // G001.00.0 Update-End
  },
  model: {
    prop: 'storeCodes',
    event: 'change'
  },
  data () {
    return {
      // G001.00.0 Update-Start
      headquartersAuthority: 1,
      belongStoreCd: '',
      belongStoreName: '',
      // G001.00.0 Update-End
      // CS #1392
      // masters: {}
      masters: {},
      savedStoreText: ''
      // CE #1392
    }
  },
  computed: {
    storesText () {
      // G001.00.0 Update-Start
      if (this.belongStoreCd &&
        this.storeCodes &&
        this.storeCodes.length === 1 &&
        this.belongStoreCd === this.storeCodes[0]) {
      // KSD V001.000 MS 
      // カスタム画面に「店舗コード：店舗名称」で表示する
      // return this.belongStoreName
        return `${this.hasCodeName ? `${convertCode(this.storeCodes[0])}:${this.belongStoreName}`:`${this.belongStoreName}`}`
      // KSD V001.000 ME
      }
      if (!('storeMasters' in this.masters) && this.storeCodes && this.storeCodes.length > 0) {
        this.$nextTick(async () => {
          // G003.00.0 Update-Start
          // this.$refs.dialogStoreSelect.getMasters(false).then(response => {
          this.$refs.dialogStoreSelect.getMastersNoAuth(false).then(response => {
            // G003.00.0 Update-End
            this.masters = response
          })
        })
      }
      // G001.00.0 Update-End

      const vue = this

      if (typeof vue.masters.storeMasters === 'undefined' ||
        vue.masters.storeMasters === null ||
        vue.masters.storeMasters === '' ||
       // CS #1392
       // !vue.masters.storeMasters.length) return ''
       !vue.masters.storeMasters.length) {
        return this.savedStoreText
      }
      // CE #1392

      const text = vue.storeCodes.map(code => {
        let store = vue.masters.storeMasters.find(element => {
          if (element.name.length === code.length) {
            return element.name === code
          } else {
            return element.name === (code + element.parentName)
          }
        })
      // KSD V001.000 MS 
      // カスタム画面に「店舗コード：店舗名称」で表示する
      // return store === undefined ? undefined : store.displayName.default
        return store === undefined ? undefined : `${this.hasCodeName ? `${convertCode(code)}:${store.displayName.default}`: `${store.displayName.default}`}`
      // KSD V001.000 ME
      }).filter(name => name !== undefined).join('、')

      // AS #1392
      this.savedStoreText = text
      // AE #1392
      return text
    }
  },
  components: {
    dialogStoreSelect
  },
  methods: {
    // KSD V001.000 AS
    // カスタム画面に「店舗コード：店舗名称」で表示する
    convertCode(code) {
      return code.length ? code.substr(code.length - 6) : ''
    },
    // KSD V001.000 AE
    // カスタム画面に「店舗コード：店舗名称」で表示する
    // G002.00.0 Update-Start
    // openDialog () {
    async openDialog () {
    // KSD V001.000 AS
    // チェック 確認 進む
      if (this.confirmProceed) {
        this.$emit('click', [])
        return
      }
    // KSD V001.000 AE
      this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
      // G002.00.0 Update-End
      if (this.masters.storeMasters) {
        // G003.00.0 Add-Start
        if (this.masters.isError) {
          return
        }
        // G003.00.0 Add-End
        this.$refs.dialogStoreSelect.open(
          this.masters.storeMasters,
          this.storeCodes,
          this.masters.storeGroupMasters,
          this.multiple
        )
      }
    }
  },
  async created () {
    await this.$nextTick()
    // G002.00.0 Update-Start
    if (this.disabled) {
    // G002.00.0 Update-End
    // 描画後でないと dialogStoreSelect は参照できない
      // G003.00.0 Update-Start
      // this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await this.$refs.dialogStoreSelect.getMastersNoAuth(false)
      // G003.00.0 Update-End
      console.log('店舗マスター', this.masters)
    // G002.00.0 Update-Start
    }
    // G002.00.0 Update-End
  },
  async mounted () {
    // G001.00.0 Update-Start
    if (this.headquartersAuthorityCheckEnable) {
      const user = this.$root.$children[0].$children[0].$children[0].users
      if (user instanceof Array) {
        let vue = this
        let belongStoreCdStr = ''
        vue.$root.$once('getBelongStoreCd', (belongStoreCd) => {
          // headerで保持している所属店舗コード
          belongStoreCdStr = belongStoreCd
        })
        let belongStoreNameStr = ''
        vue.$root.$once('getBelongStoreName', (belongStoreName) => {
          // 対象店舗名 = headerで保持している所属店舗名
          belongStoreNameStr = belongStoreName
        })
        let targetStoreCd = ''
        vue.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
          // 対象店舗コード = headerで保持している所属企業コード + headerで保持している所属店舗コード
          if (belongStoreCdStr) {
            targetStoreCd = businessUnitCdStr + belongStoreCdStr
          }
        })
        vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
          // 本部権限 = headerで保持している本部権限
          vue.headquartersAuthority = headquartersAuthority
          if (headquartersAuthority != 1) {
            if (targetStoreCd) {
              vue.belongStoreName = belongStoreNameStr
              vue.belongStoreCd = targetStoreCd
              if (vue.storeCodes) {
                if (vue.storeCodes.length > 0) {
                  vue.storeCodes.splice(0, vue.storeCodes.length)
                }
                vue.storeCodes.push(targetStoreCd)
                vue.$emit('change', vue.storeCodes)
              } else {
                vue.$emit('change', [targetStoreCd])
              }
            }
          }
        })
      } else {
        this.headquartersAuthority = user.headquartersAuthority
        if (user.headquartersAuthority != 1) {
          if (user.belongStoreCd) {
            this.belongStoreName = user.belongStoreName
            const targetStoreCd = user.businessUnitCdStr + user.belongStoreCd
            this.belongStoreCd = targetStoreCd
            if (this.storeCodes) {
              if (this.storeCodes.length > 0) {
                this.storeCodes.splice(0, this.storeCodes.length)
              }
              this.storeCodes.push(targetStoreCd)
              this.$emit('change', this.storeCodes)
            } else {
              this.$emit('change', [targetStoreCd])
            }
          }
        }
      }
    }
    // G001.00.0 Update-End
  }
}
