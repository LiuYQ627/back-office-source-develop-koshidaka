import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import commonUtils from './../Common/commonUtils'
/*
 * ---------+-----------------+----------+---------------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+---------------------------------------
 * 20230412 bai.ry(Neusoft)  G001.00.0  issue課題#1391を対応します.
 * 20230418 qinshh(Neusoft)  G002.00.0  issue課題#1392を対応します.
 * 20230424 bai.ry(Neusoft)  G003.00.0  issue課題#1819を対応します.
 * 20230520 qinshh(Neusoft)  G002.00.1  issue課題#1392を対応します.
 * 20230614 wangchunmei(Neusoft)  G004.00.0  issue課題#1639を対応します.
 */

const uriStoreGroups = 'CommonDesign/storegroups'
const uriStores = 'CommonDesign/stores'
// KSD V001.000 AS
const groupList = 'Reservation/FetchConfigurationRecursive'
const path = 'CommonDesign/Header'
const settingType = ''
// KSD V001.000 AE
// G004.00.0 Add-Start
const uriStoresNoAuth = 'CommonDesign/storesNoAuth'
// G004.00.0 Add-End

export default {
  components: {
    popup,
    axios
  },
  data () {
    return {
      dialog: false,
      stores: [], // 店舗マスタ,
      selectedStoreCodes: [], // 選択した店舗の店舗コードリスト
      selectedIndustyValue: -1, // 選択した業態マスタのValue
      selectedAreaValue: -1, // 選択した地区マスタのValue
      industries: [], // 業態マスタ
      areas: [], // 地区マスタ
      isMultiMode: false, // 複数選択モード(true:複数選択モード, false:単一選択モード)
      tempCadidateStoreCodes: [], // 選択候補で仮選択している店舗コードリスト
      tempSelectedStoreCodes: [], // 選択結果で仮選択している店舗コードリスト
      prevSelected: []
      // KSD V001.000 AS
      ,group1DataList: { storeGroupInfos: [] },
      group2DataList: { storeGroupInfos: [] },
      selectedIndustyValueTemp: -1,
      selectedAreaValueTemp: -1,
      users: [],
      // KSD V001.000 AE
    }
  },
  methods: {
    /**
     * 表示処理
     * @param {*} stores 店舗マスタ
     * @param {*} selectedStoreCodes 選択済み店舗コードリスト
     * @param {*} storeGroupInfos 店舗グループマスタ
     * @param {*} isMultiMode 複数選択モード(true:複数選択モード, false:単一選択モード)
          */
    open (stores, selectedStoreCodes, storeGroupInfos, isMultiMode) {
      // 店舗マスタが0件の場合はエラーポップアップを表示
      if ((stores === null) || (stores.length === 0)) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W012'), '', false, null, false, null)
        return
      }
      // KSD V001.000 AS
      this.selectedIndustyValue = this.selectedIndustyValueTemp
      this.selectedAreaValue = this.selectedAreaValueTemp
      // KSD V001.000 AE

      // 初期化処理
      this.stores = stores
      // G003.00.0 Update-Start
      //  this.selectedStoreCodes = selectedStoreCodes
      let deepCloneSelectedStoreCodes = JSON.parse(JSON.stringify(selectedStoreCodes))
      this.selectedStoreCodes = deepCloneSelectedStoreCodes
      // G003.00.0 Update-End
      this.prevSelected = [...selectedStoreCodes]

      // 店舗グループの分別(data.areas/industriesに分別結果を代入)
      this.separatStoreGroup(storeGroupInfos)

      // 業態・地域に空の項目を追加する
      this.areas.unshift({storeGroupName: '', storeGroupValue: -1})
      this.industries.unshift({storeGroupName: '', storeGroupValue: -1})
      this.isMultiMode = isMultiMode
      this.dialog = true
      this.setFocus()
    },
    /**
     * 選択候補の行クリック（Ctrlキー押下+クリック含む)
     * @param {*} storeCd 選択した店舗の店舗コード
     * @param {*} isCtrl Ctrlキー押下フラグ(true:押下、false:Not押下)
     */
    clickCandidateRow (storeCd, isCtrl) {
      // 既に選択済みだったか判定
      let isSelected = this.tempCadidateStoreCodes.indexOf(storeCd) !== -1
      if (!this.isMultiMode || !isCtrl) {
        // 単一選択モードもしくはCtrlキー押下していない場合は他の選択行を解除する
        this.tempCadidateStoreCodes = []
      }

      if (isSelected && isCtrl && this.isMultiMode) {
        // 複数選択モードのみ且つ選択済みなら解除
        this.tempCadidateStoreCodes.splice(this.tempCadidateStoreCodes.indexOf(storeCd), 1)
      } else {
        // 選択済みでないなら選択状態
        this.tempCadidateStoreCodes.push(storeCd)
      }
    },
    /**
     * Shiftキー押下しながら選択結果の行クリック
     * @param {*} storeCd 選択した店舗の店舗コード
     * @param {*} isCtrl Ctrlキー押下フラグ(true:押下、false:Not押下)
     */
    clickCandidateRowWithShift (storeCd, isCtrl) {
      if (!this.isMultiMode) {
        // 単一選択の場合は、仮選択を更新して処理終了
        this.tempCadidateStoreCodes = []
        this.tempCadidateStoreCodes.push(storeCd)
        return
      }

      if (this.tempCadidateStoreCodes.length === 0) {
        // 仮選択行なしの場合は店舗コードを仮選択店舗
        this.tempCadidateStoreCodes.push(storeCd)
      } else {
        // 仮選択行あり

        // もし同じ行を選択している場合は処理終了
        if (this.tempCadidateStoreCodes.includes(storeCd)) {
          return
        }

        // 仮選択から最後以外を削除する
        let basePointSelectedStoreCode = -1
        if (isCtrl) {
          basePointSelectedStoreCode = this.tempCadidateStoreCodes.pop()
        } else {
          basePointSelectedStoreCode = this.tempCadidateStoreCodes.shift()
          this.tempCadidateStoreCodes = []
        }

        if (this.getCandidateStores().length === 0) {
          return
        }

        let master = this.getCandidateStores().slice()
        // 範囲選択中フラグ
        let isRangeSelect = false
        master.forEach(store => {
          if (store.storeCd === basePointSelectedStoreCode || store.storeCd === storeCd) {
            // 店舗コードが最終選択行の店舗コードもしくはクリックした行の店舗コードと同じ場合は、範囲選択中フラグを更新する
            isRangeSelect = !isRangeSelect
            if (!isRangeSelect) {
              // フラグがON→OFFに変わる場合には、仮選択店舗へ対象店舗を追加する(下記コードではフラグがFalseだから追加されないため)
              this.tempCadidateStoreCodes.push(store.storeCd)
            }
          }
          if (isRangeSelect) {
            // 範囲選択中の場合は、仮状態リストに対象店舗コードを追加する
            this.tempCadidateStoreCodes.push(store.storeCd)
          }
        })
      }
    },
    /**
     * 選択結果の行クリック（Ctrlキー押下+クリック含む)
     * @param {*} storeCd 選択した店舗の店舗コード
     * @param {*} isCtrl Ctrlキー押下フラグ(true:押下、false:Not押下)
     */
    clickSelectedRow (storeCd, isCtrl) {
      // 既に選択済みだったか判定
      let isSelected = this.tempSelectedStoreCodes.indexOf(storeCd) !== -1
      if (!this.isMultiMode || !isCtrl) {
        // 単一選択モードもしくはCtrlキー押下していない場合は他の選択行を解除する
        this.tempSelectedStoreCodes = []
      }

      if (isSelected && isCtrl && this.isMultiMode) {
        // 複数選択モードのみ且つ選択済みなら解除
        this.tempSelectedStoreCodes.splice(this.tempSelectedStoreCodes.indexOf(storeCd), 1)
      } else {
        // 選択済みでないなら選択状態
        this.tempSelectedStoreCodes.push(storeCd)
      }
    },
    /**
     * Shiftキー押下しながら選択結果の行クリック
     * @param {*} storeCd 選択した店舗の店舗コード
     * @param {*} isCtrl Ctrlキー押下フラグ(true:押下、false:Not押下)
     */
    clickSelectedRowWithShift (storeCd, isCtrl) {
      if (!this.isMultiMode) {
        // 単一選択の場合は、仮選択を更新して処理終了
        this.tempSelectedStoreCodes = []
        this.tempSelectedStoreCodes.push(storeCd)
        return
      }

      if (this.tempSelectedStoreCodes.length === 0) {
        // 仮選択行なしの場合は店舗コードを仮選択店舗
        this.tempSelectedStoreCodes.push(storeCd)
      } else {
        // 仮選択行あり

        // もし同じ行を選択している場合は処理終了
        if (this.tempSelectedStoreCodes.includes(storeCd)) {
          return
        }

        // 仮選択から最後以外を削除する
        let basePointSelectedStoreCode = -1
        if (isCtrl) {
          basePointSelectedStoreCode = this.tempSelectedStoreCodes.pop()
        } else {
          basePointSelectedStoreCode = this.tempSelectedStoreCodes.shift()
          this.tempSelectedStoreCodes = []
        }

        let master = this.getSelectedStores().slice()
        // 範囲選択中フラグ
        let isRangeSelect = false
        master.forEach(store => {
          //          if (store.storeCd === basePointSelectedStoreCode || store.storeCd === storeCd) {
          if (store.name === basePointSelectedStoreCode || store.name === storeCd) {
            // 店舗コードが最終選択行の店舗コードもしくはクリックした行の店舗コードと同じ場合は、範囲選択中フラグを更新する
            isRangeSelect = !isRangeSelect
            if (!isRangeSelect) {
              // フラグがON→OFFに変わる場合には、仮選択店舗へ対象店舗を追加する(下記コードではフラグがFalseだから追加されないため)
              //              this.tempSelectedStoreCodes.push(store.storeCd)
              this.tempSelectedStoreCodes.push(store.name)
            }
          }
          if (isRangeSelect) {
            // 範囲選択中の場合は、仮状態リストに対象店舗コードを追加する
            //            this.tempSelectedStoreCodes.push(store.storeCd)
            this.tempSelectedStoreCodes.push(store.name)
          }
        })
      }
    },
    // 業務・地区選択時の処理
    changeGroup () {
      // 選択中行を解除
      // KSD V001.000 DS
      // this.tempCadidateStoreCodes = []
      // KSD V001.000 DE
      // KSD V001.000 AS
        let candidateList = []
        this.getTempCandidate().map(res => {
          if (res.storeGroup1 === this.selectedIndustyValue && this.selectedIndustyValue !== -1 && this.selectedAreaValue === -1){
            candidateList.push(res)
          }
          if (res.storeGroup2 === this.selectedAreaValue && this.selectedAreaValue !== -1 && this.selectedIndustyValue === -1){
            candidateList.push(res)
          }
          if (res.storeGroup2 === this.selectedAreaValue && this.selectedAreaValue !== -1 && res.storeGroup1 === this.selectedIndustyValue && this.selectedIndustyValue !== -1){
            candidateList.push(res)
          }
        })
        if (this.selectedAreaValue !== -1 || this.selectedIndustyValue !== -1) {
          this.selectedStoreCodes = this.selectedStoreCodes.filter(code => candidateList.map(res => res.name).includes(code.toString()))
        }
      // KSD V001.000 AE
    },
    backFunction () {
      // G002.00.1 Update-Start
      this.$emit('back', [], [])
      let sortedList = []
      let sortedCorpList = []
      this.prevSelected.forEach((code) => {
        let store = this.stores.find((store) => {
          return store.name === code
        })
        if (store !== undefined) {
          sortedCorpList.push(store.parentName)
          sortedList.push(store.name)
        }
      })
      this.$emit('back', sortedList, sortedCorpList)
      this.dialog = false
      // 初期化
      this.init()
      // G002.00.0 Add-Start
      // this.dialog = false
      // this.$emit('clickSubmit', sortedList, sortedCorpList)
      // this.$emit('clickSubmit', [], [])
      // let sortedList = []
      // let sortedCorpList = []
      // this.prevSelected.forEach((code) => {
      //   let store = this.stores.find((store) => {
      //     return store.name === code
      //   })
      //   if (store !== undefined) {
      //     sortedCorpList.push(store.parentName)
      //     sortedList.push(store.name)
      //   }
      // })
      // this.$emit('clickSubmit', sortedList, sortedCorpList)
      // this.dialog = false
      // // 初期化
      // this.init()
      // G002.00.0 Add-End
      // G002.00.1 Update-End
    },
    exeFunction () {
      // 店舗コード順に並び替える
      let selectedStores = this.sortDisplayOrder(this.getSelectedStores())
      let sortedList = []
      let sortedCorpList = []
      selectedStores.forEach(store => {
        console.log(store)
        sortedCorpList.push(store.parentName)
        //        sortedList.push(store.storeCd)
        sortedList.push(store.name)
      })
      this.$emit('clickSubmit', sortedList, sortedCorpList)
      // KSD V001.000 AS
      this.selectedIndustyValueTemp = this.selectedIndustyValue
      this.selectedAreaValueTemp = this.selectedAreaValue
      // KSD V001.000 AE
      this.dialog = false
      // 初期化
      this.init()
    },
    /**
     * 全選択ボタン押下イベント
     */
    onClickAllSelected () {
      let candidateStores = this.getCandidateStores().slice()
      let vue = this

      // 店舗マスタより選択候補に存在する店舗のみを抽出し、選択結果へ移動する
      candidateStores.filter((store) => {
        //        return vue.selectedStoreCodes.indexOf(store.storeCd) === -1
        return vue.selectedStoreCodes.indexOf(store.name) === -1
      }).forEach(store => {
        //        vue.selectedStoreCodes.push(store.storeCd)
        vue.selectedStoreCodes.push(store.name)
      })

      // 仮選択を解除する
      this.tempCadidateStoreCodes = []
    },

    /**
     * 選択ボタン押下イベント
     */
    onClickSelected () {
      // 仮選択中の行が存在しない場合は処理を終了する
      if (this.tempCadidateStoreCodes.length === 0) {
        return
      }

      if (!this.isMultiMode) {
        // 単一選択モードの場合は、既に選択されている行を削除する
        this.selectedStoreCodes = []
      }

      // 選択結果へ追加
      let vue = this
      if (this.isMultiMode) {
        this.tempCadidateStoreCodes.forEach(storeCd => {
          vue.selectedStoreCodes.push(storeCd)
        })
      } else {
        this.selectedStoreCodes.push(this.tempCadidateStoreCodes[0])
      }

      // 仮選択を解除する
      this.tempCadidateStoreCodes = []
      if (!this.isMultiMode) {
        // 単一選択モードの場合は選択候補と選択結果が入れ替わる。
        // 選択結果も仮選択していた場合、選択結果に存在しない店舗が仮選択のままとなるので、選択結果の仮選択も解除する
        this.tempSelectedStoreCodes = []
      }
    },
    /**
   * 全削除ボタン押下イベント
   */
    onClickAllDelete () {
      // 選択結果より削除
      this.selectedStoreCodes = []
      // 仮選択を解除する
      this.tempSelectedStoreCodes = []
    },

    /**
     * 削除ボタン押下イベント
     */
    onClickDelete () {
      // 仮選択中の行が存在しない場合は処理を終了する
      if (this.tempSelectedStoreCodes.length === 0) {
        return
      }
      // 選択結果より削除
      let vue = this

      let deletedSelectedStoreCodes = this.selectedStoreCodes.slice().filter(storeCd => {
        return vue.tempSelectedStoreCodes.indexOf(storeCd) === -1
      })
      this.selectedStoreCodes = deletedSelectedStoreCodes

      // 仮選択を解除する
      this.tempSelectedStoreCodes = []
    },
    /**
     * 店舗マスタのソート
     */
    getCandidateStores () {
      let candidateStores = this.stores.slice()

      // 選択候補に表示する店舗マスタを絞り込み
      let vue = this
      candidateStores = candidateStores.filter((store) => {
        // 選択結果に存在する店舗マスタは非表示
        //        if (vue.selectedStoreCodes.indexOf(store.storeCd) !== -1) {
        if (vue.selectedStoreCodes.indexOf(store.name) !== -1) {
          return false
        }

        // 業態を選択中且つ、選択中の業態に属しない店舗マスタは非表示
        if (vue.selectedIndustyValue !== -1 && store.storeGroup1 !== vue.selectedIndustyValue) {
          return false
        }

        // 地域を選択中且つ、選択中の地域に属しない店舗マスタは非表示
        if (vue.selectedAreaValue !== -1 && store.storeGroup2 !== vue.selectedAreaValue) {
          return false
        }

        return true
      })

      // 並び替え
      return this.sortDisplayOrder(candidateStores)
    },
     // KSD V001.000 AS
    getTempCandidate () {
      let candidateStoresResult = this.stores
      let vue = this
      candidateStoresResult = candidateStoresResult.filter((store) => {
        if (vue.selectedIndustyValue !== -1 && store.storeGroup1 !== vue.selectedIndustyValue) {
          return false
        }
        if (vue.selectedAreaValue !== -1 && store.storeGroup2 !== vue.selectedAreaValue) {
          return false
        }
        return true
      })
      return this.sortDisplayOrder(candidateStoresResult)
    },
     // KSD V001.000 AE
    /**
     * 店舗マスタの表示順およびコード順にソートする
     * @param {*} list 店舗マスタリスト
     * @returns 店舗マスタの表示順およびコード順にソートした店舗マスタリスト
     */
    sortDisplayOrder (list) {
      return list.sort((a, b) => {
        // 表示順が0の場合は1000を代入する(0の場合は表示順番としては末尾となるため)
        if (a.displayOrder === 0) a.displayOrder = 1000
        if (b.displayOrder === 0) b.displayOrder = 1000

        if (a.displayOrder > b.displayOrder) return 1
        if (a.displayOrder < b.displayOrder) return -1

        // 表示順が同じ場合は店舗コードでソースする
        //        if (a.storeCd > b.storeCd) return 1
        //        if (a.storeCd < b.storeCd) return -1
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1

        return 0
      })
    },
    /**
     * 選択結果店舗取得
     */
    getSelectedStores () {
      let vue = this

      // 選択結果は追加順に並び替え
      let selectedStores = []
      vue.selectedStoreCodes.forEach((code) => {
        let store = this.stores.find((store) => {
          //          return store.storeCd === code
          return store.name === code
        })

        if (store !== undefined) {
          selectedStores.push(store)
        }
      })

      return selectedStores
    },
    /**
     * 店舗グループの分別(data.areas/industriesに分別結果を代入)
     * @param {*} storeGroupInfos 店舗マスタ
     */
    separatStoreGroup (storeGroupInfos) {
      if (storeGroupInfos === null) {
        // 店舗グループマスタが存在しない場合は処理終了
        return
      }

      // 店舗グループの並び替え
      storeGroupInfos = storeGroupInfos.slice().sort((a, b) => {
        // 表示順でソートする
        return a.storeGroupValue > b.storeGroupValue ? 1 : -1
      })
      // 店舗グループの振り分け
      storeGroupInfos.forEach((storeGroup) => {
        if (storeGroup.storeGroupNo === 1) {
          // 店舗グループ番号1は業態マスタ
          this.industries.push(storeGroup)
        } else if (storeGroup.storeGroupNo === 2) {
          // 店舗グループ番号2は地区マスタ
          this.areas.push(storeGroup)
        }
      })
    },
    /**
     * 初期化処理
     */
    init () {
      this.stores = []
      this.selectedStoreCodes = []
      // KSD V001.000 DS
      // this.selectedIndustyValue = -1
      // this.selectedAreaValue = -1
      // KSD V001.000 DE
      this.industries = []
      this.areas = []
      this.isMultiMode = false
      this.tempCadidateStoreCodes = []
      this.tempSelectedStoreCodes = []
    },
    // G004.00.0 Add-Start
    async getMastersNoAuth (isAllStoreMaster) {
      return this.getMasters(isAllStoreMaster, uriStoresNoAuth)
    },
    // G004.00.0 Add-End
    /**
     * 店舗マスタ/店舗グループマスタ情報の取得(店舗選択ダイアログの呼び出し元画面で呼び出すこと)
     * @params 全店舗取得フラグ(True:選択候補/結果に全ての店舗を表示する, False:選択候補/結果に所属・担当店舗のみを表示する)
     * @returns マスタ取得結果
     */
    // G004.00.0 Update-Start
    // async getMasters (isAllStoreMaster) {
    async getMasters (isAllStoreMaster, uri = uriStores) {
      // G004.00.0 Update-End
      let funcResponse = {
        storeMasters: [],
        storeGroupMasters: [],
        isError: false
      }
      // G004.00.0 Update-Start
      // let axiosStores = this.getStores(isAllStoreMaster)
      let axiosStores = this.getStores(isAllStoreMaster, uri)
      // G004.00.0 Update-End
      //      let axiosStoreGroups = this.getStoreGroups()

      // KSD V001.000 AS
      let getGroupList = this.getGroupList()
      let responseGroupList = null
      // KSD V001.000 AE
      let responseStores = null
      //      let responseStoreGroups = null

      try {
        responseStores = await axiosStores
        // KSD V001.000 AS
        responseGroupList = await getGroupList
        // KSD V001.000 AE
        //        responseStoreGroups = await axiosStoreGroups
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.log(error)
        funcResponse.isError = true
        // G001.00.0 Add-Start
        funcResponse.storeMasters = null
        // G001.00.0 Add-End
        return funcResponse
      }

      // KSD V001.000 DS
      // if (typeof responseStores === 'undefined' || responseStores === null || responseStores.isError) {
      // KSD V001.000 DE
      // KSD V001.000 AS
      if (typeof responseStores === 'undefined' || responseStores === null || responseStores.isError || responseGroupList === false || responseGroupList === undefined) {
      // KSD V001.000 AE
        funcResponse.isError = true
      } else {
        funcResponse.storeMasters = responseStores.responseModel
      }
      console.log('funcResponse.storeMasters', funcResponse.storeMasters)
      return funcResponse
    },
    /**
     * 店舗マスタ検索(所属・担当のみ取得)
     * @params 全店舗取得フラグ(True:選択候補/結果に全ての店舗を表示する, False:選択候補/結果に所属・担当店舗のみを表示する)
     * @returns 店舗マスタ(所属・担当のみ取得)のレスポンス
     */
    // G004.00.0 Update-Start
    // async getStores (isAllStoreMaster) {
    async getStores (isAllStoreMaster, uri) {
      // G004.00.0 Update-End
      let vue = this
      // 所属・担当店舗マスタ取得
      // G004.00.0 Update-Start
      // let response = await axios.get(vue.$i18n.t('prop.url') + uriStores + '?_=dateTime_=' + Date.now() + '&isAllStoreMaster=' + isAllStoreMaster, commonUtils.methods.getApiHeader())
      let response = await axios.get(vue.$i18n.t('prop.url') + uri + '?_=dateTime_=' + Date.now() + '&isAllStoreMaster=' + isAllStoreMaster, commonUtils.methods.getApiHeader())
      // G004.00.0 Update-End
      let responseData = response.data
      let isError = false
      if (responseData.result.code === -90) {
        // セッションタイムアウト
        vue.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), responseData.result.code, false, () => {
          vue.$router.push('/LoginPage')
        }, false, null)
        isError = true
        // G002.00.0 Add-Start
      } else if (responseData.result.code === -10) {
        vue.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), responseData.result.code, false, null, false, null)
        return
        // G002.00.0 Add-End
      } else if (responseData.result.code !== 0 && responseData.result.code !== 2) {
        // 例外
        var globalErrorMsg = responseData.result.errorMessageMap['global'].toString()
        vue.$refs.pop.open(3, '', globalErrorMsg, responseData.result.code, false, null, false, null)
        isError = true
      }
      //      let { result, storeInfos } = responseData
      let { result, responseModel } = responseData

      //      return { result, storeInfos, isError }
      return { result, responseModel, isError }
    },
    /**
     * 店舗グループマスタ検索(所属・担当のみ取得)
     * @returns 店舗グループ検索のレスポンス
     */
    async getStoreGroups () {
      let vue = this
      // 店舗グループマスタ取得
      let response = await axios.get(vue.$i18n.t('prop.url') + uriStoreGroups + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
      let responseData = response.data
      let isError = false
      if (responseData.result.code === -90) {
        // セッションタイムアウト
        vue.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), responseData.result.code, false, () => {
          vue.$router.push('/LoginPage')
        }, false, null)
        isError = true
      } else if (responseData.result.code !== 0 && responseData.result.code !== 2) {
        // 例外
        var globalErrorMsg = responseData.result.errorMessageMap['global'].toString()
        vue.$refs.pop.open(3, '', globalErrorMsg, responseData.result.code, false, null, false, null)
        isError = true
      }
      let { result, storeGroupInfos } = responseData
      return { result, storeGroupInfos, isError }
    },
    // KSD V001.000 AS
    async getGroupList () {
      let result = false
      await axios.get(this.$i18n.t('prop.url') + path + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        .then((response) => {
          if (this.$root.winId === 'O00001') return
          if (response.data.result.code === -90) {
            this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), response.data.result.code, false, () => {
              this.$router.push('/LoginPage')
            }, false, null)
            return
          }
          this.users = response.data.userDataModel
          if (this.users === null || this.users === undefined) {
            this.users = {
              businessUnitCdStr: ''
            }
          }
          result = this.getGroupData(this.users.businessUnitCdStr)
        })
        .catch((error) => {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
          console.log(error)
        })
        return result
    },
    async getGroupData (businessUnitCdStr) {
      let result = false
      this.group1DataList = { storeGroupInfos: [] }
      this.group2DataList = { storeGroupInfos: [] }
      try {
        const params = {
          nodeId: businessUnitCdStr,
          excludeFields: false,
          type: settingType
        }
        const response = await axios.put(this.$i18n.t('prop.url') + groupList + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          Object.entries(response.data.responseModel.configurations).forEach(([key, value]) => {
            if (key === 'STORE_GROUP_1') {
              this.group1DataList.storeGroupInfos = value.value
            }
            if (key === 'STORE_GROUP_2') {
              this.group2DataList.storeGroupInfos = value.value
            }
          })
          if (response.data.responseModel.storeGroupInfos === null) {
            result = true
            return result
          }
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        return
      }
      return result
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else if (result.code !== 0) {
        const globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    // KSD V001.000 AE
    // ダイアログ描画時にフォーカスをセット
    setFocus () {
      setTimeout(() => {
        // document.getElementsByClassName('pulldownStyle')[0].focus()
      }, 50)
    }
  }
}
