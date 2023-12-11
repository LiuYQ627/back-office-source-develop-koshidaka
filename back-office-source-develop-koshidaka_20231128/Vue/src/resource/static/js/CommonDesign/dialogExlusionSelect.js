/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230719  qinshh(Neusoft)  G001.00.0  issue課題#903を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'

export default {
  components: {
    popup
  },
  data () {
    return {
      dialog: false,
      exlusions: [],
      selectedExlusionCodes: [],
      isMultiMode: false, // 複数選択モード(true:複数選択モード, false:単一選択モード)
      tempCandidateExlusionCodes: [], // 選択候補で仮選択している店舗コードリスト
      tempSelectedExlusionCodes: [] // 選択結果で仮選択している店舗コードリスト
    }
  },
  methods: {
    /**
     * 表示処理
     * @param {*} exlusions 支払禁止
     * @param {*} selectedExlusionCodes 選択済み店舗コードリスト
     * @param {*} isMultiMode 複数選択モード(true:複数選択モード, false:単一選択モード)
     */
    open (exlusions, selectedExlusionCodes, isMultiMode) {
      // 店舗マスタが0件の場合はエラーポップアップを表示
      if ((exlusions === null) || (exlusions.length === 0)) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W012'), '', false, null, false, null)
        return
      }

      // 初期化処理
      this.exlusions = exlusions
      this.selectedExlusionCodes = selectedExlusionCodes

      this.isMultiMode = isMultiMode
      this.dialog = true
      this.setFocus()
    },
    clickCandidateRow (exlusion, isCtrl) {
      // 既に選択済みだったか判定
      let isSelected = this.tempCandidateExlusionCodes.indexOf(exlusion.value) !== -1
      if (!this.isMultiMode || !isCtrl) {
        // 単一選択モードもしくはCtrlキー押下していない場合は他の選択行を解除する
        this.tempCandidateExlusionCodes = []
      }

      if (isSelected && isCtrl && this.isMultiMode) {
        // 複数選択モードのみ且つ選択済みなら解除
        this.tempCandidateExlusionCodes.splice(this.tempCandidateExlusionCodes.indexOf(exlusion.value), 1)
      } else {
        // 選択済みでないなら選択状態
        this.tempCandidateExlusionCodes.push(exlusion.value)
      }
    },
    clickCandidateRowWithShift (exlusion, isCtrl) {
      if (!this.isMultiMode) {
        // 単一選択の場合は、仮選択を更新して処理終了
        this.tempCandidateExlusionCodes = []
        this.tempCandidateExlusionCodes.push(exlusion.value)
        return
      }

      if (this.tempCandidateExlusionCodes.length === 0) {
        // 仮選択行なしの場合は店舗コードを仮選択店舗
        this.tempCandidateExlusionCodes.push(exlusion.value)
      } else {
        // 仮選択行あり

        // もし同じ行を選択している場合は処理終了
        if (this.tempCandidateExlusionCodes.includes(exlusion.value)) {
          return
        }

        // 仮選択から最後以外を削除する
        let basePointSelectedStoreCode = -1
        if (isCtrl) {
          basePointSelectedStoreCode = this.tempCandidateExlusionCodes.pop()
        } else {
          basePointSelectedStoreCode = this.tempCandidateExlusionCodes.shift()
          this.tempCandidateExlusionCodes = []
        }

        if (this.exlusions.length === 0) {
          return
        }

        let master = this.exlusions.slice()
        // 範囲選択中フラグ
        let isRangeSelect = false
        master.forEach(item => {
          if (item.value === basePointSelectedStoreCode || item.value === exlusion.value) {
            // 店舗コードが最終選択行の店舗コードもしくはクリックした行の店舗コードと同じ場合は、範囲選択中フラグを更新する
            isRangeSelect = !isRangeSelect
            if (!isRangeSelect) {
              // フラグがON→OFFに変わる場合には、仮選択店舗へ対象店舗を追加する(下記コードではフラグがFalseだから追加されないため)
              this.tempCandidateExlusionCodes.push(item.value)
            }
          }
          if (isRangeSelect) {
            // 範囲選択中の場合は、仮状態リストに対象店舗コードを追加する
            this.tempCandidateExlusionCodes.push(item.value)
          }
        })
      }
    },
    clickSelectedRow (exlusion, isCtrl) {
      // 既に選択済みだったか判定
      let isSelected = this.tempSelectedExlusionCodes.indexOf(exlusion.value) !== -1
      if (!this.isMultiMode || !isCtrl) {
        // 単一選択モードもしくはCtrlキー押下していない場合は他の選択行を解除する
        this.tempSelectedExlusionCodes = []
      }

      if (isSelected && isCtrl && this.isMultiMode) {
        // 複数選択モードのみ且つ選択済みなら解除
        this.tempSelectedExlusionCodes.splice(this.tempSelectedExlusionCodes.indexOf(exlusion.value), 1)
      } else {
        // 選択済みでないなら選択状態
        this.tempSelectedExlusionCodes.push(exlusion.value)
      }
    },
    clickSelectedRowWithShift (exlusion, isCtrl) {
      if (!this.isMultiMode) {
        // 単一選択の場合は、仮選択を更新して処理終了
        this.tempSelectedExlusionCodes = []
        this.tempSelectedExlusionCodes.push(exlusion.value)
        return
      }

      if (this.tempSelectedExlusionCodes.length === 0) {
        // 仮選択行なしの場合は店舗コードを仮選択店舗
        this.tempSelectedExlusionCodes.push(exlusion.value)
      } else {
        // 仮選択行あり

        // もし同じ行を選択している場合は処理終了
        if (this.tempSelectedExlusionCodes.includes(exlusion.value)) {
          return
        }

        // 仮選択から最後以外を削除する
        let basePointSelectedStoreCode = -1
        if (isCtrl) {
          basePointSelectedStoreCode = this.tempSelectedExlusionCodes.pop()
        } else {
          basePointSelectedStoreCode = this.tempSelectedExlusionCodes.shift()
          this.tempSelectedExlusionCodes = []
        }

        let master = this.getSelectedStores().slice()
        // 範囲選択中フラグ
        let isRangeSelect = false
        master.forEach(item => {
          if (item.name === basePointSelectedStoreCode || item.value === exlusion.value) {
            // 店舗コードが最終選択行の店舗コードもしくはクリックした行の店舗コードと同じ場合は、範囲選択中フラグを更新する
            isRangeSelect = !isRangeSelect
            if (!isRangeSelect) {
              // フラグがON→OFFに変わる場合には、仮選択店舗へ対象店舗を追加する(下記コードではフラグがFalseだから追加されないため)
              this.tempSelectedExlusionCodes.push(item.value)
            }
          }
          if (isRangeSelect) {
            // 範囲選択中の場合は、仮状態リストに対象店舗コードを追加する
            this.tempSelectedExlusionCodes.push(item.value)
          }
        })
      }
    },
    backFunction () {
      this.dialog = false
      // 初期化
      this.init()
    },
    exeFunction () {
      // 店舗コード順に並び替える
      let selectedExlusions = this.getSelectedExlusions()
      this.$emit('clickSubmit', selectedExlusions)
      this.dialog = false
      // 初期化
      this.init()
    },
    /**
     * 全選択ボタン押下イベント
     */
    onClickAllSelected () {
      let candidateExlusions = this.getCandidateExlusions().slice()
      let vue = this

      // 店舗マスタより選択候補に存在する店舗のみを抽出し、選択結果へ移動する
      candidateExlusions.filter((exlusion) => {
        return vue.selectedExlusionCodes.indexOf(exlusion.value) === -1
      }).forEach(exlusion => {
        vue.selectedExlusionCodes.push(exlusion.value)
      })

      // 仮選択を解除する
      this.tempCandidateExlusionCodes = []
    },

    /**
     * 選択ボタン押下イベント
     */
    onClickSelected () {
      // 仮選択中の行が存在しない場合は処理を終了する
      if (this.tempCandidateExlusionCodes.length === 0) {
        return
      }

      if (!this.isMultiMode) {
        // 単一選択モードの場合は、既に選択されている行を削除する
        this.selectedExlusionCodes = []
      }

      // 選択結果へ追加
      let vue = this
      if (this.isMultiMode) {
        this.tempCandidateExlusionCodes.forEach(value => {
          vue.selectedExlusionCodes.push(value)
        })
      } else {
        this.selectedExlusionCodes.push(this.tempCandidateExlusionCodes[0])
      }

      // 仮選択を解除する
      this.tempCandidateExlusionCodes = []
      if (!this.isMultiMode) {
        // 単一選択モードの場合は選択候補と選択結果が入れ替わる。
        // 選択結果も仮選択していた場合、選択結果に存在しない店舗が仮選択のままとなるので、選択結果の仮選択も解除する
        this.tempSelectedExlusionCodes = []
      }
    },
    /**
     * 全削除ボタン押下イベント
     */
    onClickAllDelete () {
      // 選択結果より削除
      this.selectedExlusionCodes = []
      // 仮選択を解除する
      this.tempSelectedExlusionCodes = []
    },

    /**
     * 削除ボタン押下イベント
     */
    onClickDelete () {
      // 仮選択中の行が存在しない場合は処理を終了する
      if (this.tempSelectedExlusionCodes.length === 0) {
        return
      }
      // 選択結果より削除
      let vue = this

      let deletedSelectedExlusionCodes = this.selectedExlusionCodes.slice().filter(value => {
        return vue.tempSelectedExlusionCodes.indexOf(value) === -1
      })
      this.selectedExlusionCodes = deletedSelectedExlusionCodes

      // 仮選択を解除する
      this.tempSelectedExlusionCodes = []
    },
    getCandidateExlusions () {
      let candidateExlusions = this.exlusions.slice()

      // 選択候補に表示する店舗マスタを絞り込み
      let vue = this
      candidateExlusions = candidateExlusions.filter((exlusion) => {
        // 選択結果に存在する店舗マスタは非表示
        if (vue.selectedExlusionCodes.indexOf(exlusion.value) !== -1) {
          return false
        }

        return true
      })

      // 並び替え
      return candidateExlusions
    },
    /**
     * 選択結果店舗取得
     */
    getSelectedExlusions () {
      let selectedExlusions = []
      this.selectedExlusionCodes.forEach((code) => {
        let exlusion = this.exlusions.find((exlusion) => {
          return exlusion.value === code
        })

        if (exlusion !== undefined) {
          selectedExlusions.push(exlusion)
        }
      })

      return selectedExlusions
    },
    /**
     * 初期化処理
     */
    init () {
      this.exlusions = []
      this.selectedExlusionCodes = []
      this.isMultiMode = false
      this.tempCandidateExlusionCodes = []
      this.tempSelectedExlusionCodes = []
    },
    // ダイアログ描画時にフォーカスをセット
    setFocus () {
      setTimeout(() => {
      }, 50)
    }
  }
}
