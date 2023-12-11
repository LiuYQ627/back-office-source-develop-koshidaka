import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'

/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 */

const userPath = 'CommonDesign/Header'
const authPath = 'UserMaster/UserSearch'
const searchPath = 'ProductDivisions/divisionInfoSearch'
const registPath = 'ProductDivisions/divisionInfoRegist'

export default {
  name: 'productDivMaster',
  // [Vue.js]データオブジェクト定義
  data () {
    return {
      users: [],
      dispDataList: [],
      getDataList: [],
      headquartersAuthority: 0,
      targetStoreCd: 0,
      targetStoreText: '',
      operationLock: true,
      masters: {},
      initialized: false,
      topIndex: '',
      placeholderProductName: this.$i18n.t('F00203.S009'),
      disabledFixedBtn: true,
      useErrorMsg: [],
      nameErrorMsg: [],
      lengthErrorMsg: [],
      regTypeErrorMsg: [],
      focusItem: null,
      // 登録種別選択リスト
      registrationTypeList: [
        // 部門、クラス
        { code: "" , value: "" },
        { code: "dp" , value: this.$i18n.t('F00203.S007') },
        { code: "cls", value: this.$i18n.t('F00203.S008') },
      ]
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
,bWireMock: false
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
    }
  },
  // [Vue.js]ローカルコンポーネント登録
  components: {
    maintButton,
    popup,
    dialogStoreSelect
  },
  // [Vue.js]メソッド定義
  methods: {
    // [function]インスタンス初期処理
    async initialize () {
      if (this.initialized) return
      this.initialized = true
      if (await this.getMasters() === false) {
        this.dispDataList = []
      } else {
        if (this.headquartersAuthority === 0) {
          await this.setStore(this.targetStoreCd)
        }
        this.operationLock = false
      }
      this.initErrorMessage()
      console.log('initialize end, operationLock=', this.operationLock)
    },
    // [function]チェックエラー状態初期化
    initErrorMessage () {
      this.useErrorMsg = ['','','','','','','','']
      this.nameErrorMsg = ['','','','','','','','']
      this.lengthErrorMsg = ['','','','','','','','']
      this.regTypeErrorMsg = ['','','','','','','','']
    },
    // [function]店舗マスター取得
    async getMasters () {
      let result = false
      let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        result = true
      }
      return result
    },
    // [function]商品分類階層設定取得
    async getDivision () {
      let result = false
      this.disabledFixedBtn = true
      this.dispDataList = []
      this.getDataList = []
      try {
      let  params = { nodeId: this.targetStoreCd }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.targetStoreCd.slice(1)
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
        let response = await axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        console.log('*response*', response)
        if (response.data.result.code === 0) {
          // 0:正常
          if (response.data.responseModel === null) {
            this.targetStoreCd = 0
            this.targetStoreText = ''
            this.$refs.pop.open(3, '', this.$i18n.t('F00203.E001'), '', false, null, false, null)
          } else { // 商品分類階層設定が存在する
            this.getDataList = response.data.responseModel.value
            result = true
          }
        } else if (response.data.result.code === 2) {
          // 2:該当する情報なし
          this.targetStoreCd = 0
          this.targetStoreText = ''
          this.$refs.pop.open(3, '', this.$i18n.t('F00203.E002'),  response.data.result.code, false, null, false, null)
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
      if (result === true) {
        // UI用データリスト作成
        console.log('*getDataList*', this.getDataList)
        this.dispDataList = JSON.parse(JSON.stringify(this.getDataList))
        console.log('*dispDataList*', this.dispDataList)
        let _topIndex = '', _index = 0
        for (let _item of this.dispDataList) {
          if (_item.usedFlg === true) _topIndex = _index.toString()
          _index++;
        }
        this.topIndex = _topIndex
        this.disabledFixedBtn = false
      }
      return result
    },
    // [event]店舗コード選択
    async storeSelect () {
      let selectedStoreCodes = [this.targetStoreCd]
      // 店舗コード選択ダイアログ表示
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    // [event]店舗コード選択終了時ハンドラ
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
      this.getDivision()
    },
    // [function]選択店舗コードのセット
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      if (this.masters.storeMasters !== null) {
        let index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.targetStoreText = this.masters.storeMasters[index].displayName.default
        }
      }
    },
    // [event]「保存」ボタンクリック時ハンドラ
    async fixedTab () {
      let _err = -1
      let _index = 0
      this.initErrorMessage()
      this.focusItem = null
      // 「保存処理中」ポップアップ表示
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      // 妥当性チェック
      // １）名称
      for (_err = -1, _index = 0; _index < this.dispDataList.length; _index++) {
        if (_index >= Number(this.topIndex)) {
          // 最上位以下の階層の場合
          if (this.dispDataList[_index].productName.length === 0) {
            _err = _index
            break
          }
        }
      }
      if (_err >= 0) {
        this.$set(this.nameErrorMsg, _err, this.$i18n.t('F00203.W006'))
        this.focusItem = this.$refs.rowNam[_err]
        return this.$refs.pop.open(3, '', this.nameErrorMsg[_err], '', false, this.setFocus, false, null)
      }
      // ２）桁数
      for (_err = -1, _index = 0; _index < this.dispDataList.length; _index++) {
        if (_index >= Number(this.topIndex)) {
          // 最上位以下の階層の場合
          if (this.dispDataList[_index].length <= 0 || this.dispDataList[_index].length > 6) {
            _err = _index
            break
          }
        }
      }
      if (_err >= 0) {
        this.focusItem = this.$refs.rowLen[_err]
        this.$set(this.lengthErrorMsg, _err, this.$i18n.t('F00203.W002'))
        return this.$refs.pop.open(3, '', this.lengthErrorMsg[_err], '', false, this.setFocus, false, null)
      }

      // 設定内容の保存
      let result = await this.executeSave()
      if (result === true) {
        // 保存正常の場合
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W002'), '', false, null, false, null)
        // 最新設定の取得
        this.getDivision()
      }
    },
    // [function]商品分類階層設定保存処理
    async executeSave () {
      let result = false
      try {
        let params = {
          nodeId: this.targetStoreCd,
          value: []
        }
        // 最上位構成フラグの反映
        for (let _item of this.dispDataList) {
          _item.usedFlg = false
        }
        if (this.topIndex !== '') {
          this.dispDataList[Number(this.topIndex)].usedFlg = true
        }
        // パラメータ作成
        let _updFlag = false, _index = 0
        for (let _item of this.dispDataList) {
          if (_updFlag === true) {
            // 更新有効な階層
            params.value[_index] = JSON.parse(JSON.stringify(_item))
          } else {
            if (_item.usedFlg === true) {
              // 最上位階層⇒以降を更新有効とする
              _updFlag = true    // 以降更新有効
              params.value[_index] = JSON.parse(JSON.stringify(_item))
            } else {
              // 最上位以前はGUI設定内容は反映しない
              params.value[_index] = JSON.parse(JSON.stringify(this.getDataList[_index]))
              params.value[_index].usedFlg = false
            }
          }
          _index++
        }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (this.bWireMock === true) params.nodeId = '9' + this.targetStoreCd.slice(1)
//if (!params.value[7].usedFlg) params.value[7].usedFlg = true      // 最上位構成多重セットエラー
//params.value[5].productName = '123456789012345678901234567890123' // 商品構成名エラー
//params.value[4].registrationType = 'abc'                          // 登録種別エラー
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
          console.log('*params*', params)
        // 更新
        let response = await axios.put(this.$i18n.t('prop.url') + registPath + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          result = true
        } else {
          this.saveErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00203.W008'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    // [function]商品分類階層設定保存時エラー処理
    saveErrorMapping (result) {
      this.focusItem = null
      if (result.code === -99) {
        const _maxDiv = 8
        let _errorFlag = false
        let _count
        let _key
        let _msg
        // 階層設定数エラー
        if (result.errorMessageMap['value'] !== undefined) {
          _msg = result.errorMessageMap['value'].toString().split(',')[0]
          this.$refs.pop.open(3, '', _msg, result.code, false, null, false, null)
console.log('階層設定数エラー', _count, _msg)
          return
        }
        // 分類No値エラー
        for (_count = 0; _count < _maxDiv; _count++) {
          _key = 'value[' + String(_count) + '].productClassificationNumber'
          if (result.errorMessageMap[_key] !== undefined) {
console.log('分類No値エラー', _count, result.errorMessageMap[_key].toString().split(','))
            this.$refs.pop.open(3, '', this.$i18n.t('F00203.E003'), result.code, false, null, false, null)
            return
          }
        }
        // 分類Noシーケンスエラー
        if (result.errorMessageMap['productClassificationNumber'] !== undefined) {
          _msg = result.errorMessageMap['productClassificationNumber'].toString().split(',')[0]
            this.$refs.pop.open(3, '', _msg, result.code, false, null, false, null)
console.log('分類Noシーケンスエラー', _msg)
          return
        }
        // 最上位構成無エラー
        if (result.errorMessageMap['usedFlg'] !== undefined) {
          this.$set(this.useErrorMsg, 0, result.errorMessageMap['usedFlg'].toString().split(',')[0])
          this.focusItem = this.$refs.rowTop[0]
          this.$refs.pop.open(3, '', this.useErrorMsg[0], result.code, false, this.setFocus, false, null)
console.log('最上位構成無エラー', this.useErrorMsg[0])
          return
        }
        // 最上位構成多重セットエラー
        for (_count = 1; _count < _maxDiv; _count++) {
          _key = 'value[' + String(_count) + '].usedFlg'
          if (result.errorMessageMap[_key] !== undefined) {
            this.$set(this.useErrorMsg, _count, result.errorMessageMap[_key].toString().split(',')[0])
            this.focusItem = this.$refs.rowTop[_count]
            this.$refs.pop.open(3, '', this.useErrorMsg[_count], result.code, false, this.setFocus, false, null)
console.log('最上位構成多重セットエラー', _count, this.useErrorMsg[_count])
            return
          }
        }

        // 商品構成名エラー
        for (_count = 0; _count < _maxDiv; _count++) {
          _key = 'value[' + String(_count) + '].productName'
          if (result.errorMessageMap[_key] !== undefined) {
            this.$set(this.nameErrorMsg, _count, result.errorMessageMap[_key].toString().split(',')[0])
            if (this.focusItem === null) {
              this.focusItem = this.$refs.rowNam[_count]
              _errorFlag = true
            }
console.log('商品構成名エラー', _count, this.nameErrorMsg[_count])
            break
          }
        }
        // 商品コード桁数エラー
        for (_count = 0; _count < _maxDiv; _count++) {
          _key = 'value[' + String(_count) + '].length'
          if (result.errorMessageMap[_key] !== undefined) {
            this.$set(this.lengthErrorMsg, _count, result.errorMessageMap[_key].toString().split(',')[0])
            if (this.focusItem === null) {
              this.focusItem = this.$refs.rowLen[_count]
              _errorFlag = true
            }
console.log('桁数エラー', _count, this.lengthErrorMsg[_count])
            break
          }
        }
        // 登録種別エラー
        for (_count = 0; _count < _maxDiv; _count++) {
          _key = 'value[' + String(_count) + '].registrationType'
          if (result.errorMessageMap[_key] !== undefined) {
            this.$set(this.regTypeErrorMsg, _count, result.errorMessageMap[_key].toString().split(',')[0])
            this.focusItem = this.$refs.rowReg[_count]
            this.$refs.pop.open(3, '', this.regTypeErrorMsg[_count], result.code, false, this.setFocus, false, null)
console.log('登録種別エラー', _count, this.regTypeErrorMsg[_count])
            return
          }
        }
        if (_errorFlag === true) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W006'), result.code, false, this.setFocus, false, null)
        }
      } else {
        this.globalErrorMapping(result)
      }
    },
    // [event]「終了」ボタンクリック時ハンドラ
    async closeTab () {
      if (this.getDataList.length !== 0) {
        // 編集破棄確認ポップアップを表示
        this.$refs.pop.open(1, '', this.$i18n.t('O00004.W004'), '', true, this.closeTabConfirm, false, null)
      } else {
        this.$router.push('/TopPage')
      }
    },
    // [function]終了確認処理
    async closeTabConfirm() {
      this.$router.push('/TopPage')
    },
    // [function]保守ユーザー権限取得(userId:ユーザー名)
    async getMainteAuthority (userId) {
      let result = -1
      // 指定ユーザーの権限情報を取得
      try {
        const params = { userId: userId, searchFlg: 1 }
        let response = await axios.get(this.$i18n.t('prop.url') + authPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.addApiHeader({params}))
        if (response.data.result.code === 0) {
          // 権限情報取得正常の場合
          // 保守ユーザー権限有無を調べる
          let userData = response.data.responseModel
          if (userData.accessAuthority === "CLOUDPOS_ADMIN") {
            result = 1
          } else {
            result = 0
          }
        } else {
          // その他エラー発生の場合
          this.authErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('F00001.E004'), '', false, this.closeTabConfirm, false, null)
        console.log(error)
      }
      return result
    },
    // [function]ユーザー権限情報取得時エラー処理
    authErrorMapping (result) {
      if (result.code === -99) {
        let errorMessage = result.errorMessageMap['userId'].toString().split(',').join('')
        this.$refs.pop.open(3, '', errorMessage, result.code, false, null, false, null)
      } else {
        this.globalErrorMapping(result)
      }
    },
    // [function]エラー共通処理
    globalErrorMapping (result) {
      if (result.code === -90) {
        // KSD V001.000 DS
        // this.$refs.pop.open(3, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
        // KSD V001.000 DE
        // KSD V001.000 AS
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
        // KSD V001.000 AE
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    // [event]コンテンツアンロード時ハンドラ(event:??)
    confirmUnload (event) {
      // 対象店舗選択中なら変更確認ダイアログを表示する
      if (this.targetStoreCd !== 0) {
        event.returnValue = ''
      }
    },
    // [event]名称エリア入力時桁数チェック処理
    inputLimit (index,maxLength) {
      let str = this.dispDataList[index].productName
      if(str == null){return}
      let strLen = str.toString().length;
      // byte数の取得
      let byteLen = 0;
      for (let i = 0; i < strLen; i++) {
        let codeUnitNo = str.charCodeAt(i);
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0)
          || (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
            byteLen += 1;
        } else {
            byteLen += 2;
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          this.dispDataList[index].productName = str.toString().substring(0,i);
          break;
        } else {
          // maxLength以下は何もしない
        }
      }
    },
    // [event]数値入力項目の文字入力規制（半角数字のみ）
    numInputRegulation (index) {
      var safeData = ''
      if (this.dispDataList[index].length !== null) {
        safeData = this.dispDataList[index].length.toString().replace(/[^0-9]/gi, '')
      }
      if (safeData === '') {
        this.dispDataList[index].length = null
      } else {
        this.dispDataList[index].length = Number(safeData)
      }
    },
    // [function]フォーカスセット
    setFocus () {
      setTimeout((focusItem) => {
        if (focusItem !== null) {
          focusItem.focus()
        }
      }, 100, this.focusItem)
      this.focusItem = null
    },
    // [function]ログインユーザー情報の取得
    async getUser () {
      let result = false
      await axios.get(this.$i18n.t('prop.url') + userPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        .then((response) => {
          this.users = response.data
          result =true
      })
      .catch((error) => {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        this.$router.push('/LoginPage')
        console.log(error)
      })
      console.log('getUser', result, this.users.userCode)
      return result
    },
    // 最上位フラグボタンフォーカスでのTabキー押下イベントハンドラ
    onKeyTabAtUsedflg: function (e) {
      console.log(e)
      if (e.shiftKey === true) {
        if (e.target._value > 0 && e.target._value <= this.topIndex) {
          this.focusItem = this.$refs.rowTop[e.target._value - 1]
          this.setFocus()
          e.preventDefault()
        }
      }
      else {
        if (e.target._value < this.topIndex) {
          this.focusItem = this.$refs.rowTop[e.target._value + 1]
          this.setFocus()
          e.preventDefault()
        }
      }
    },
  },
  // [Vue.js]ページロード完了時フック
  created () {
    this.$root.winId = 'F00203'
    document.title = this.$route.meta.title       // router\index.js routes配列定義のmeta情報
    this.$root.title = this.$route.params.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  // [Vue.js]インスタンス消滅時フック
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  // [Vue.js]インスタンスDOMマウント時フック
  async mounted () {
    // 保守ユーザー権限ありの場合
    // 本部権限、所属店舗の取得
    let belongStoreCdStr = ''
    this.$root.$once('getBelongStoreCd', (belongStoreCd) => {
      // headerで保持している所属店舗コード
      belongStoreCdStr = belongStoreCd
    })
    let belongStoreNameStr = ''
    this.$root.$once('getBelongStoreName', (belongStoreName) => {
      // 対象店舗名 = headerで保持している所属店舗名
      belongStoreNameStr = belongStoreName
    })
    let targetStoreCd = ''
    this.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      // 対象店舗コード = headerで保持している所属企業コード + headerで保持している所属店舗コード
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    this.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      this.headquartersAuthority = headquartersAuthority
      if (targetStoreCd) {
        this.targetStoreText = belongStoreNameStr
        this.targetStoreCd = targetStoreCd
        this.operationLockStore = false
      }
      console.log('head', this.headquartersAuthority)
      console.log('store', this.targetStoreCd, this.targetStoreText)
      // ログイン中ユーザー情報を取得
      if (await this.getUser () === true) {
        // 取得正常の場合
        // 保守ユーザー権限取得
        // KSD V001.000 DS ユーザ情報取得でユーザコードの指定不正対応
        // let mainteAuthority = await this.getMainteAuthority(this.users.userCode)
        // KSD V001.000 DE ユーザ情報取得でユーザコードの指定不正対応
        // KSD V001.000 AS ユーザ情報取得でユーザコードの指定不正対応
        let mainteAuthority = await this.getMainteAuthority(this.users.userDataModel.userCode)
        // KSD V001.000 AE ユーザ情報取得でユーザコードの指定不正対応
        console.log("mainteAuthority", mainteAuthority)
        if (mainteAuthority === -1) {
          // ユーザー検索エラー
        }
        else if (mainteAuthority === 0) {
          // 保守ユーザー権限がない場合
          // 業務終了ポップアップ表示⇒業務終了
          this.$refs.pop.open(3, '', this.$i18n.t('F00203.W005'), '', false, this.closeTabConfirm, false, null)
        } else {
          await this.initialize()
          await this.$nextTick()
          setTimeout(() => {
            if (this.headquartersAuthority === 1) {
              document.getElementById('storeSelectBtn').focus()
            }
          }, 200)
        }
      } else {
        // 取得エラーの場合
        // エラーポップアップ表示⇒業務終了
        this.$refs.pop.open(3, '', this.$i18n.t('F00203.W007'), '', false, this.closeTabConfirm, false, null)
      }
    })
  },
}
