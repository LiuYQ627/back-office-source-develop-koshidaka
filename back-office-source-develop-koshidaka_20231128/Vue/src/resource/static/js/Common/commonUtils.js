// spacekeyにイベントが設定されているものについて
// スクロールされないようにする
document.addEventListener('keydown', scrollkeyEvent)
function scrollkeyEvent (e) {
  var scrollNoneFlg = false
  // keydownイベント発火時、フォーカスが当たっている要素がスクロールされたくないものかどうか判定
  // classにscrollNoneが設定されているか
  for (var i = 0; i < this.activeElement.classList.length; i++) {
    if (this.activeElement.classList[i] === 'scrollNone') {
      scrollNoneFlg = true
    }
  }
  if (scrollNoneFlg) {
    var code = e.code
    if (code === 'Space') {
      e.preventDefault()
    }
  }
}

export default {
  data () {
    return {
      url: '',
      fileNameInNotSetting: ''
    }
  },
  methods: {
    /**
     * APIのHeadersに設定する情報を取得
     * @returns APIのHeadersに取得する情報
     */
    getApiHeader () {
      // var header = this.getHeader()
      return {withCredentials: true}
    },
    /**
     * APIのHeadersに設定する対象属性を追加した情報を取得
     * @param {*} data Header情報
     * @returns 対象属性を追加したHeader情報
     */
    addApiHeader (data) {
      data['withCredentials'] = true
      return data
    }
  }
}
