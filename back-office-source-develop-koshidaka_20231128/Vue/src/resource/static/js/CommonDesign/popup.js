/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230116  litie(Neusoft)        G001.00.0  issue課題#835を対応します.
 */

export default {
  // KSD V001.000 AS
  props: {
    yscroll: {
      type: String,
      default: undefined
    }
  },
  // KSD V001.000 AE
  data () {
    const modeSettingInformation = [
      // 確認
      {
        mode: 1,
        icon: require('@/assets/ico_popup_question.png'),
        title: this.$i18n.t('O00004.S051'),
        style: {
          border: 'popup-line-blue',
          button: 'popup-fotter-button-orenge'
        }
      // 通知
      }, {
        mode: 2,
        icon: require('@/assets/ico_popup_info.png'),
        title: this.$i18n.t('O00004.S052'),
        style: {
          border: 'popup-line-blue',
          button: 'popup-fotter-button-orenge'
        }
      // 警告
      }, {
        mode: 3,
        icon: require('@/assets/ico_popup_warning.png'),
        title: this.$i18n.t('O00004.S053'),
        style: {
          border: 'popup-line-pink',
          button: 'popup-fotter-button-pink'
        }
      // 処理中
      }, {
        mode: 4,
        icon: '',
        title: this.$i18n.t('O00004.S054'),
        style: {
          border: 'popup-line-blue',
          button: ''
        }
      },
      // G001.00.0 Update-Start
      {
        mode: 5,
        icon: '',
        title: this.$i18n.t('O00004.S054'),
        style: {
          border: 'popup-line-blue',
          button: ''
        }
      }
      // G001.00.0 Update-End
    ]
    return {
      modeSettingInformation,
      dialog: false,
      title: '', // タイトル
      message: '', // メッセージ
      mode: 1, // 1:確認, 2:通知, 3:警告
      code: '', // 応答コード
      isBackBtn: false, // 戻るボタン表示フラグ,
      okFunc: null, // OKボタンクリック時の実行処理,
      backFunc: null, // 戻るボタンクリック時の実行処理
      isNonDispStatus: false // ステータス(アイコン、応答コード)
    }
  },
  methods: {
    open (mode, title, message, code, isBackBtn, okFunc, isNonDispStatus, backFunc) {
      this.dialog = true
      this.mode = mode
      this.message = message
      this.isBackBtn = isBackBtn
      this.okFunc = okFunc
      this.isNonDispStatus = isNonDispStatus
      this.backFunc = backFunc

      // titleが空値なら既定のタイトルを設定
      this.title = title === '' ? this.modeSettingInformation.find(x => x.mode === this.mode).title : title

      // 応答コードが空値でない場合
      if (code === '') {
        this.code = code
      // 応答コードが0以上の場合
      } else if (code >= 0) {
        this.code = ('0000' + code).slice(-4)
      // 応答コードが0未満の場合
      } else {
        this.code = '-' + ('0000' + Math.abs(code)).slice(-4)
      }

      // フォーカスのセット
      // G001.00.0 Update-Start
      // if (mode !== 4) {
      if (mode !== 4 && mode !== 5) {
      // G001.00.0 Update-End
        var focusInItemId = isBackBtn ? 'popupBtBack' : 'popupBtExe'
        setTimeout(() => {
          document.getElementById(focusInItemId).focus()
        }, 100)
      } else if (mode === 4) {
        setTimeout(() => {
          document.getElementById('hiddenInput').focus()
        }, 5)
      } else if (mode === 5) { // G001.00.0 Update-Start
        setTimeout(() => {
          const popupBtStop = document.getElementById('popupBtStop')
          if (popupBtStop) {
            popupBtStop.focus()
          }
        }, 100)
      }
      // G001.00.0 Update-End
    },
    getIconSrc () {
      return this.modeSettingInformation.find(x => x.mode === this.mode).icon
    },
    getBorderColorClass () {
      return this.modeSettingInformation.find(x => x.mode === this.mode).style.border
    },
    getFotterButtonClass () {
      return this.modeSettingInformation.find(x => x.mode === this.mode).style.button
    },
    exeFunction () {
      this.dialog = false

      if (this.okFunc !== null) {
        this.okFunc()
      }
    },
    backFunction () {
      this.dialog = false

      if (this.backFunc !== null) {
        this.backFunc()
      }
    },
    // G001.00.0 Update-Start
    stopFunction () {
      this.dialog = false
      if (this.okFunc !== null) {
        this.okFunc()
      }
    },
    // G001.00.0 Update-End
    closeFunction () {
      this.dialog = false
    }
  }
}
