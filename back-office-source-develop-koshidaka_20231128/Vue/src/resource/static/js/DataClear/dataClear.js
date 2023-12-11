import axios from 'axios'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'

/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221230  litie(Neusoft)        G001.00.0  issue課題#1058を対応します.
 * 20230303  xu.jh(Neusoft)        G002.00.0  issue課題#1038を対応します.
 * 20230615  wangchunmei(Neusoft)  G003.00.0  issue課題#1639を対応します.
 * 20231025  qinshh(Neusoft)       G004.00.0  issue課題#1152を対応します.
 * 20231115  qinshh(Neusoft)       G004.00.1  issue課題#1152を対応します.
 * 20231121  wupsh(Neusoft)        G005.00.0  issue課題#1877を対応します.
 */

const dataClearTablePath = 'DataClear/DataClearTable'
const execClearTablePath = 'DataClear/DeleteDataClearTable'

export default {
  name: 'DataClear',
  data () {
    return {
      // G001.00.0 Update-Start
      // headquartersAuthority: true,
      headquartersAuthority: 0,
      // G001.00.0 Update-End
      masters: {},
      initialized: false,
      targetStoreText: '',
      targetStoreCd: 0,
      clearTarget: '',
      clearTableList: [],
      tableCategory: -1,
      // G005.00.0 Update-Start
      // tableKindList: []
      disabledClearBtn: true,
      tableKindList: [
        { tableCategory: 0, categoryName: 'マスタ系' },
        { tableCategory: 1, categoryName: '取引系' }
      ]
      // G005.00.0 Update-End
    }
  },
  components: {
    maintButton,
    dialogStoreSelect,
    popup
  },
  methods: {
    async initialize () {
      if (this.initialized) return
      // G001.00.0 Update-Start
      if (this.headquartersAuthority === 1) { // G001.00.0 Update-End
        if (await this.getMasters() !== true) return
      }
      // クリア種別ラジオボタンを初期化
      this.clearTarget = 'beforeOperation'
      this.initialized = true
      // G005.00.0 Update-Start
      // this.disabledClearBtn = true
      // G005.00.0 Update-End
    },
    /**
     * マスタの取得
     * @returns エラーがなければtrue、あればfalse
     */
    async getMasters () {
      // G002.00.0 Update-Start
      // this.masters = await this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await this.$refs.dialogStoreSelect.getMasters(true)
      // G002.00.0 Update-End
      return this.masters.isError === false
    },

    /** 表示用のデータを取得 */
    async getClearTableListAndTableKindsList () {
      this.clearTableList = []
      // G005.00.0 Update-Start
      // this.tableKindList = []
      // 正しく指定されていない場合
      // if (this.targetSelected !== true) return
      if (this.targetSelected !== true && this.targetStoreCd === 0) {
        return
      } else {
        if (this.tableCategory === -1) {
          return
        }
      }
      // G005.00.0 Update-End
      // 「利用停止」を選択している場合はnull
      const storeCd =
        this.clearTarget === 'stopUsing' ? null : this.targetStoreCd
      // G005.00.0 Update-Start
      // const params = { storeCd }
      const params = { storeCd: storeCd, tableCategory: this.tableCategory }
      // G005.00.0 Update-End
      try {
        // データ取得中ポップアップ
        this.$refs.pop.open(4, '', this.$i18n.t('F00006.S009'), '', false, null, false, null)

        const response = await axios.get(
          this.$i18n.t('prop.url') + dataClearTablePath,
          commonUtils.methods.addApiHeader({ params })
        )

        this.$refs.pop.closeFunction()

        if (response.data.result.code === 0) {
          // 正常
          this.clearTableList = response.data.dataClearTableResponseModelList
          // G005.00.0 Update-Start
          // this.tableKindList = response.data.dataClearTableKindMappingModelList
          // G005.00.0 Update-End

          // 全てに checked 属性を付ける
          this.clearTableList.forEach(clearTable => {
            clearTable.checked = false
          })
          // G005.00.0 Update-Start
          this.disabledClearBtn = false
          // G005.00.0 Update-End
          return true
        } else {
          // 失敗
          this.targetStoreText = ''
          this.targetStoreCd = 0
          // G005.00.0 Update-Start
          this.disabledClearBtn = true
          // G005.00.0 Update-End
          // G004.00.0 Update-Start
          // this.globalErrorMapping('F00006.S006', response.data.result, null)
          this.globalErrorMapping(response.data.result)
          // G004.00.0 Update-End
        }
      } catch (error) {
        this.targetStoreText = ''
        this.targetStoreCd = 0
        // G005.00.0 Update-Start
        this.disabledClearBtn = true
        // G005.00.0 Update-End
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return false
    },
    // G004.00.0 Add-Start
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
        // G004.00.0 Add-End
      } else if (result.code !== 0) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00006.S006'), result.code, false, null, false, null)
      }
    },
    // G004.00.0 Add-End
    /** 店舗選択ボタン押し下げ時の処理 */
    async storeSelect () {
      // G003.00.0 Add-Start
      if (this.headquartersAuthority !== 1) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W019'), '', false, null, false, null)
        return
      }
      // G003.00.0 Add-End
      const selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(
        this.masters.storeMasters,
        selectedStoreCodes,
        this.masters.storeGroupMasters,
        false
      )
    },
    /**
     * 店舗選択ダイアログのコールバック関数
     * @param selectedStoreCodes
     */
    async storeSelectOk (selectedStoreCodes) {
      // 選択無し
      if (selectedStoreCodes.length <= 0) return
      const selectedStoreCd = selectedStoreCodes[0]

      // 変化なし
      if (selectedStoreCd === this.targetStoreCd) return
      this.targetStoreCd = selectedStoreCd

      // 表示名の更新
      if (this.masters.storeMasters !== null) {
        // マスタから検索
        const store = this.masters.storeMasters.find(
          element => element.name === selectedStoreCd
        )
        if (store !== undefined) {
          this.targetStoreText = store.displayName.default
        }
      }
    },

    /**
     * チェックボックスの状態を反転
     * @param index `clearTableList` 内におけるインデックス
     */
    toggleClearTableChecked (index) {
      let clearTable = this.clearTableList[index]
      clearTable.checked = !clearTable.checked
      // this.$set を介さないとビューに反映されない
      this.$set(this.clearTableList, index, clearTable)
    },

    /**
     * 全チェックボックスの状態をセット
     *
     * ただしレコード件数が0のものとテーブル種別が異なるものは常にオフ
     *
     * @param value セットしたい値
     */
    setAllCheckbox (value) {
      // deep copy
      let newClearTableList = JSON.parse(JSON.stringify(this.clearTableList))

      for (let clearTable of newClearTableList) {
        if (clearTable.dataCount === '0' || clearTable.tableCategory !== this.tableCategory) {
          clearTable.checked = false
        } else {
          clearTable.checked = value
        }
      }
      if (this.clearTableList.length > 0) {
        this.disabledClearBtn = false
      }
      this.clearTableList = newClearTableList
    },

    /** 終了ボタン */
    closeTab () {
      this.$router.push('/TopPage')
    },
    /** クリア実行ボタン */
    async onClickDelete () {
      this.$refs.pop.open(1, '', this.$i18n.t('F00006.W001'), '', true, this.executeDataClear, false, null)
    },
    async executeDataClear () {
      try {
        // データ取得中ポップアップ
        this.$refs.pop.open(4, '', this.$i18n.t('F00006.S016'), '', false, null, false, null)

        const storeCd =
        this.clearTarget === 'stopUsing' ? null : this.targetStoreCd
        // G005.00.0 Update-Start
        // const params = { storeCd }
        const params = { storeCd: storeCd, tableCategory: this.tableCategory }
        // G005.00.0 Update-End
        const response = await axios.get(
          this.$i18n.t('prop.url') + execClearTablePath,
          commonUtils.methods.addApiHeader({ params })
        )

        this.$refs.pop.closeFunction()
        if (response.data.result.code === 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, this.finishDataClear, false, null)
        } else {
          // 失敗
          // G004.00.1 Update-Start
          // this.globalErrorMapping('F00006.S006', response.data.result, null)
          this.globalErrorMapping(response.data.result)
          // G004.00.1 Update-End
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
    },
    async finishDataClear () {
      this.targetStoreText = ''
      this.targetStoreCd = 0
      this.tableCategory = -1
      this.getClearTableListAndTableKindsList()
      this.disabledClearBtn = true
    }
  },
  computed: {
    /** クリア種別・店舗が適切に設定されているか */
    targetSelected () {
      // G005.00.0 Update-Start
      if (this.clearTarget === 'stopUsing') {
        return true
      } else {
        return false
      }
      // return (
      //   this.clearTarget === 'stopUsing' ||
      //   (this.clearTarget === 'beforeOperation' && this.targetStoreCd !== 0)
      // )
      // G005.00.0 Update-End
    },
    /** テーブル種別及びクリア種別・店舗が適切に設定されているか */
    tableCategorySelected () {
      return this.targetSelected && this.tableCategory !== -1
    },
    /** 1つでもチェックがついているか */
    anyChecked () {
      return this.clearTableList.some(clearTable => clearTable.checked)
    },
    /** チェックがついているテーブルのリスト */
    checkedTableList () {
      return this.clearTableList.filter(clearTable => clearTable.checked)
    }
  },
  watch: {
    /**
     * 「クリア種別」変更時にデータを更新する
     * 店舗情報、テーブル種別を消す
     */
    clearTarget () {
      // G001.00.0 Update-Start
      if (this.headquartersAuthority === 1) {
      // G001.00.0 Update-End
        this.targetStoreText = ''
        this.targetStoreCd = 0
      // G001.00.0 Update-Start
      }
      // G001.00.0 Update-End
      // G005.00.0 Update-Start
      if (this.clearTarget === 'beforeOperation') {
        this.tableCategory = 1
      } else {
        this.tableCategory = -1
      }
      // G005.00.0 Update-End

      this.getClearTableListAndTableKindsList()
      this.disabledClearBtn = true
    },
    /**
     * 店舗変更時にデータを更新する
     * テーブル種別を消す
     */
    targetStoreCd () {
      // G005.00.0 Dalete-Start
      // this.tableCategory = -1
      // this.disabledClearBtn = true
      // G005.00.0 Dalete-End
      this.getClearTableListAndTableKindsList()
    },
    /** チェックボックス全消し */
    tableCategory () {
      this.setAllCheckbox(false)
      // G005.00.0 Add-Start
      this.getClearTableListAndTableKindsList()
      // G005.00.0 Add-End
    }
  },

  created () {
    this.$root.winId = 'F32213'
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    // G001.00.0 Update-Start
    // await this.$nextTick()
    // await this.initialize()
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
      if (headquartersAuthority !== 1) {
        if (targetStoreCd) {
          vue.targetStoreText = belongStoreNameStr
          vue.targetStoreCd = targetStoreCd
        }
      }
      await this.$nextTick()
      await this.initialize()
    })
    // G001.00.0 Update-End
  }
}
