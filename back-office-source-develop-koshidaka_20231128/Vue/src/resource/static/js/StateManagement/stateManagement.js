import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import flatPickr from 'vue-flatpickr-component'
import '@/resource/static/css/CommonLibraryTool/flatPickr.css'
import {Japanese} from 'flatpickr/dist/l10n/ja.js'

/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221230  litie(Neusoft)        G001.00.0  issue課題#1014を対応します.
 * 20230615  wangchunmei(Neusoft)  G002.00.0  issue課題#1639を対応します.
 */

const searchPath = 'StateManagement/DevicesStatusQuery'

export default {
  name: 'stateManagement',
  data () {
    return {
      dispDataList: [],
      resultCount: 0,
      headquartersAuthority: 0,
      targetStoreCd: 0,
      targetStoreText: '',
      searchData: '',
      lastSearchData: '',
      operationLock: true,
      masters: {},

      // 開始日付文字列
      startDateStr: '',
      // 開始日付カレンダーアイコンパス
      startCalenderImgScr: require('@/assets/ico_calendar_h.png'),
      // カレンダー表示日付
      calenderDate: null,
      // カレンダーの設定情報
      config: {
        locale: Japanese,
        allowInput: true,
        monthSelectorType: 'static',
        dateFormat: 'Y/m/d',
        onClose: function (selectedDates, dateStr) {
        },
        onOpen: function (selectedDates, dateStr) {
        }
      },
      initialized: false
    }
  },
  components: {
    maintButton,
    popup,
    dialogStoreSelect,
    flatPickr
  },
  methods: {
    async initialize () {
      if (this.initialized) return
      this.initialized = true
      // G001.00.0 Update-Start
      if (this.targetStoreCd) { // G001.00.0 Update-End
        if (await this.getTerminal() === false) return
      }
      if (this.headquartersAuthority === 1) {
        if (await this.getMasters() === false) {
          this.dispDataList = []
          this.resultCount = 0
          return
        }
        await this.setStore(this.targetStoreCd)
      }
      this.operationLock = false
    },
    async getMasters () {
      let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },
    async getTerminal () {
      var result = false
      this.dispDataList = []
      this.resultCount = 0
      try {
        const params = { nodeId: this.targetStoreCd }
        this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
        let response = await axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        this.$refs.pop.closeFunction()
        if (response.data.result.code === 0) {
          // 0:正常
          this.dispDataList = response.data.responseModel
          this.resultCount = this.dispDataList === null ? 0 : this.dispDataList.length
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当する端末管理情報なし
          this.resultCount = this.dispDataList === null ? 0 : this.dispDataList.length
          result = true
        } else {
          this.targetStoreCd = 0
          this.targetStoreText = ''
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.targetStoreCd = 0
        this.targetStoreText = ''
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    async refresh () {
      if (await this.getTerminal() === true) {
        return true
      } else {
        return false
      }
    },
    async storeSelect () {
      // G002.00.0 Add-Start
      if (this.headquartersAuthority !== 1) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W019'), '', false, null, false, null)
        return
      }
      // G002.00.0 Add-End
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
      this.getTerminal()
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      if (this.masters.storeMasters !== null) {
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.targetStoreText = this.masters.storeMasters[index].displayName.default
        }
      }
    },
    /**
     * カレンダー表示処理
     * flatPickrのインスタンスが1つしか生成できない（flatPickrを複数使用しても日付や設定がすべて上書きされる）ため、1つのflatPickrを使いまわす
     * カレンダー表示するたびにflatPickrの設定を開始・終了で切り替える
     * @param {*} displayFlag 表示フラグ(0:開始日付、1:終了日付)
     */
    showCalender (displayFlag) {
      let vue = this
      // カレンダー表示した時に呼ばれる処理を設定
      this.$refs.flatPickr.fp.set('onOpen', function (selectedDates, dateStr) {
        // tabキー押下判定フラグをリセット
        vue.isTabKey = false
      })
      if (displayFlag === 0) {
        // 開始日付カレンダーを閉じた時に呼ばれる処理を設定
        this.$refs.flatPickr.fp.set('onClose', function (selectedDates, dateStr) {
          if (vue.isTabKey === false) {
            document.getElementById('inputStartDay').focus()
          }
          // 日付選択された場合は、選択された日付を表示用のdataオプションに設定し、日付チェックを起動する
          if (dateStr !== '') {
            let { newDate } = vue.dateCheck(dateStr)
            vue.startDateCheckFlg = false
            vue.calenderDate = newDate
            vue.startDateStr = dateStr
            vue.startDateFormatCheck()
          }
        })
        // 開始日付の入力がない場合は開始日付の日付型をnullに変更
        if (this.startDateStr === '') {
          this.startDate = null
        }
        // カレンダー表示日付を開始日付に変更
        this.calenderDate = this.startDate
        // is_active切り替えで開始日付の枠線オレンジ
        document.getElementById('startDateInput').classList.add('is_active')
        // 表示位置を開始日付inputの直下に設定
        this.$set(this.$refs.flatPickr.fp, '_positionElement', document.getElementById('startDateInput'))
      }
      this.$refs.flatPickr.fp.open()
    },
    /**
     * 開始日付チェックとボタン制御処理
     */
    startDateFormatCheck () {
      if (!this.startDateCheckFlg) {
        // チェック結果リセット
        this.startDateCheckResult = false
        if (this.startDateStr !== '') {
          // チェックフラグを済みに更新
          this.startDateCheckFlg = true
          // 入力日付チェック処理呼出
          let {result, inputDateStr, date} = this.inputDateCheck(this.startDateStr)
          this.startDateStr = inputDateStr
          if (!result) {
            // チェックエラーの場合は、チェック結果をNGに更新してinputにフォーカスを当てる
            this.startDate = null
            document.getElementById('inputStartDay').focus()
          } else {
          // チェックOKの場合は、カレンダー表示日付に設定してチェック結果をOKに更新
            this.startDate = date
            this.calenderDate = date
            this.startDateCheckResult = true
          }
        } else {
          // 入力値が削除された場合は、カレンダー表示日付をリセットしてチェック結果をNGに更新
          this.startDate = null
          this.calenderDate = null
        }
        if (this.startDateCheckResult) {
          this.disableCsvOutputBtn = false
        } else {
          this.disableCsvOutputBtn = true
        }
      }
    },
    /**
     * 入力日付チェック処理
     * @param {*} strDate チェック対象日付文字列
     */
    inputDateCheck (strDate) {
      // 入力フォーマットチェック呼出
      let { formatResult, dateStr } = this.formatCheck(strDate)
      let result = formatResult
      let inputDateStr = strDate
      let date = new Date()
      if (result) {
        // フォーマットチェックがOKの場合は有効日付チェックを呼びだす
        var { validateResult, newDate } = this.dateCheck(dateStr)
        result = validateResult
        date = newDate
        if (!result) {
          // 有効日付チェックがNGの場合、有効日付エラーメッセージを表示
          this.disableCsvOutputBtn = true
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.S031'), '', false, null, false, null)
        } else {
          inputDateStr = dateStr
        }
      } else {
        // フォーマットチェックがNGの場合はフォーマットエラーメッセージを表示
        this.disableCsvOutputBtn = true
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.S031'), '', false, null, false, null)
      }
      // 入力日付チェックの結果とフォーマット変換後の日付を返す
      return {result, inputDateStr, date}
    },
    /**
     * 日付フォーマットチェック
     * @param {*} strDate チェック対象日付文字列
     */
    formatCheck (strDate) {
      var formatResult = false
      var dateStr = strDate
      if (strDate.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
        formatResult = true
      } else {
        if (strDate.length === 8) {
          if (strDate.match(/(\d{4})(\d{2})(\d{2})/)) {
          // 年,月,日を取得する
            dateStr = strDate.substr(0, 4) + '/' + strDate.substr(4, 2) + '/' + strDate.substr(6, 2)
            formatResult = true
          }
        }
      }
      return { formatResult, dateStr }
    },
    /**
     * 有効日付チェック
     * @param {*} strDate チェック対象日付文字列
     */
    dateCheck (strDate) {
      var validateResult = true
      let dateSplit = strDate.split('/')
      let y = parseInt(dateSplit[0])
      let m = parseInt(dateSplit[1]) - 1
      let d = parseInt(dateSplit[2])
      let newDate = new Date(y, m, d)
      if (newDate.getFullYear() !== y || newDate.getMonth() !== m || newDate.getDate() !== d) {
        validateResult = false
      }
      return { validateResult, newDate }
    },
    /**
     * マウスホバー時のアイコン表示画像切替処理
     * @param {*} iname 切替対象のアイコンを区別するための要素id
     */
    changeImg (iname) {
      switch (iname) {
        case 'startCalender':
          this.startCalenderImgScr = require('@/assets/ico_calendar_h.png')
          break
      }
    },
    /**
     * マウスリーブ時のアイコン表示画像切替処理
     * @param {*} iname 切替対象のアイコンを区別するための要素id
     */
    returnImg (iname) {
      switch (iname) {
        case 'startCalender':
          this.startCalenderImgScr = require('@/assets/ico_calendar_n.png')
          break
      }
    },
    /**
     * 入力文字数チェック
     * @param {*} value チェック対象文字列
     */
    stringCount (value) {
      let result = false
      // 文字数のカウント
      if (value !== '') {
        if (value.length >= 8) {
          result = true
        }
      }
      return result
    },
    closeTab () {
      //      window.close()
      this.$router.push('/TopPage')
    },
    searchErrorMapping (result) {
      if (result.code === -99) {
        var errorMessage = result.errorMessageMap['clientId'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    }
  },
  created () {
    this.$root.winId = 'F00107'
    document.title = this.$route.meta.title
    this.$root.title = this.$route.params.title
  },
  destroyed () {
  },
  async mounted () {
    this.searchData = ''
    let vue = this
    // STEP0では企業コードで利用
    // vue.$root.$on('getBelongStoreCd', (belongStoreCd) => {
    // G001.00.0 Update-Start
    // vue.$root.$on('getBusinessUnitCdStr', (belongStoreCd) => {
    //   // 対象店舗コード = headerで保持している所属店舗コード
    //   vue.targetStoreCd = belongStoreCd
    // })
    // vue.$root.$on('getHeadquartersAuthority', (headquartersAuthority) => {
    //   // 本部権限 = headerで保持している本部権限(基本true)
    //   vue.headquartersAuthority = headquartersAuthority
    //   this.initialize()
    // })
    // await this.$nextTick()
    // setTimeout(() => {
    //   if (this.headquartersAuthority === 1) {
    //     document.getElementById('storeSelectBtn').focus()
    //   } else {
    //     document.getElementById('inputStartDay').focus()
    //   }
    // }, 200)
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
          vue.targetStoreText = belongStoreNameStr
          vue.targetStoreCd = targetStoreCd
        }
      }
      await this.initialize()
      await this.$nextTick()
      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementById('storeSelectBtn').focus()
        }
      }, 200)
    })
    // G001.00.0 Update-End
  },
  watch: {
    searchData: function (val) {
      // コード入力の場合、半角数値以外を除去
      if (document.getElementById('searchCode').checked) {
        var inputText = val.replace(/[^0-9]/gi, '')
        this.searchData = inputText
        if (inputText === this.lastSearchData) return
        this.lastSearchData = inputText
      } else {
        this.lastSearchData = val
      }
      if (this.lastSearchData === '') {
        this.dispDataList = []
        this.getTerminal()
      } else {
        if (this.findDataList === null || this.findDataList.terminalInfos.length === 0) return
        this.filtering()
      }
    }
  }
}
