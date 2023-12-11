import popup from '@/resource/templates/CommonDesign/Popup'
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
export default {
  components: {
    popup
  },
  data () {
    return {
      initImageInfo: {},
      dialog: false,
      // タイトル
      title: '',
      // 商品画像マスタ一覧(画面描画用)
      images: [],
      // 選択済み商品画像ソース
      imageInformation: {
        fileName: '',
        presignedUrl: '',
        ribbon: false
      },
      usedPresetImageSrcs: [],
      selectedIndex: -1,
      file: null,
      storeCode: -1,
      planningCode: -1,
      companyCode: -1
    }
  },
  methods: {
    /**
     * 表示処理
     * @param {*} storeCode 店舗コード
     * @param {*} planningCode 企画コード
     * @param {*} images 商品画像一覧
     */
    async open (planningCode, companyCode, storeCode, initImageInfo) {
      this.dialog = true
      this.title = '画像検索'
      this.selectedIndex = -1
      this.storeCode = storeCode
      this.planningCode = planningCode
      this.companyCode = companyCode
      this.initImageInfo = initImageInfo
      this.updateImages()
    },
    close () {
      this.dialog = false
    },
    /**
     * 商品画像一覧更新
     * @param {*} images 商品画像情報
     */
    async updateImages () {
      // AS KSD V001.000 86803
      try {
      // AE KSD V001.000 86803
        this.images = []
        this.imageInformation = {
          fileName: '',
          presignedUrl: '',
          ribbon: false
        }
        let images = []
        let params = {
          companyCode: this.companyCode,
          storeCode: this.storeCode,
          planningCode: this.planningCode
        }
        const res = await axios.get(
          `${this.$t('prop.url')}PresetMaster/SearchItemsImage`,
          commonUtils.methods.addApiHeader({params})
        )
        if (res.data.result.code == 0 || res.data.result.code == 2) {
          images = res.data.images
        } else if (res.data.result.code === 204) {
          images = []
        } else {
          this.globalErrorMapping(res)
          images = []
        }
        this.images = images.sort((a, b) => (a.fileName + '').localeCompare((b.fileName + '')))
        this.imageInformation = this.initImageInfo
        this.$nextTick(() => {
          this.selectedIndex = -1
        })
      // AS KSD V001.000 86803
      } catch (error) {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      }
      // AE KSD V001.000 86803
    },

    /**
     * 画像クリック処理
     * @param {*} imageInformation 画像情報
     * @param {*} rowIndex 選択行インデックス番号
     * @param {*} cellIndex 選択セルインデックス番号
     */
    onClickImage (imageInformation, index) {
      this.imageInformation = imageInformation
      this.selectedIndex = index
    },
    /**
     *  画像登録ボタンクリック処理
     */
    async onClickimageAdd () {
      this.$refs.imgFileSelect.accept = '.png'
      this.$refs.imgFileSelect.click()
    },
    selectedFile (e) {
      e.preventDefault()
      this.file = e.target.files[0]
      if (this.file.type != 'image/png') {
        // CS KSD V001.000 87009
        // this.$refs.pop.open(3, '', 'PNG形式のファイルのみを選択してください。', '', false, null, false, null)
        this.$refs.pop.open(3, '', 'ファイル名('+ this.file.name +')は登録の行えないファイル形式です。ファイル形式が「png」のファイルを選択してください。', '', false, null, false, null)
        e.target.value = ''
        // CE KSD V001.000 87009
        return
      }
      this.$refs.pop.open(4, '', 'データ取得処理を実行しています。', '', false, null, false, null)
      this.imageUpload()
    },
    /**
     * 画像アップロード
     */
    async imageUpload () {
      // DS KSD V001.000 84599
      // const params = new FormData()
      // params.append('file', this.file)
      // const res = await axios.post(
      //   `${this.$t('prop.url')}PresetMaster/AddImage?companyCode=${this.companyCode}`,
      //   params,
      //   commonUtils.methods.addApiHeader({})
      // )
      // this.$refs.pop.closeFunction()
      // document.getElementById('imgFileSelect').value = ''
      // if (res.data.result.code != 0) {
      //   this.globalErrorMapping(res)
      //   return
      // }
      // this.$refs.pop.open(2, '', this.$t('O00004.W002'), '', false, () => { this.updateImages() }, false, null)
      // DE KSD V001.000 84599
      // AS KSD V001.000 84599
      try {
        const params = new FormData()
        params.append('file', this.file)
        const res = await axios.post(
          `${this.$t('prop.url')}PresetMaster/AddImage?companyCode=${this.companyCode}`,
          params,
          commonUtils.methods.addApiHeader({})
        )
        this.$refs.pop.closeFunction()
        document.getElementById('imgFileSelect').value = ''
        if (res.data.result.code != 0) {
          this.globalErrorMapping(res)
          return
        }
        this.$refs.pop.open(2, '', this.$t('O00004.W002'), '', false, () => { this.updateImages() }, false, null)
      } catch (error) {
        if (error.message === 'Network Error' || (error.request && !error.response)) {
          this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        } else if (error.response && error.response.data && error.response.data.result && error.response.data.result.code === -90) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), error.response.data.result.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        }
        console.log(error)
      }
      // AE KSD V001.000 84599
    },

    globalErrorMapping (result, msg = '', func = null) {
      if (result === null) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', this.$t(msg), '', false, func, false, null)
      } else if (result.data.result.code === -10 || result.data.result.code === -20 || result.data.result.code === -30) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      } else if (result.data.result.code === -90) {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(2, '', this.$t('O00004.W008'), result.data.result.code, false, () => { this.$router.push('/LoginPage') }, false, null)
      } else {
        this.$refs.pop.closeFunction()
        this.$refs.pop.open(3, '', result.data.result.errorMessageMap.global[0], result.data.result.code, false, func, false, null)
      }
    },
    /**
     *  画像削除ボタンクリック処理
     * @param {*} imageInformation 画像情報
     */
    async onClickimageDelete (imageInformation) {
      this.$refs.pop.open(1, '', this.$i18n.t('F00002.S062'), '', true, () => {
        this.onClickimageDeleteOK(imageInformation)
      }, false, null)
    },
    /**
     *  画像削除確認ポップアップOKクリック処理
     * @param {*} imageInformation 画像情報
     */
    async onClickimageDeleteOK (imageInformation) {
      this.$refs.pop.open(4, '', this.$i18n.t('O00004.W009'), '', false, null, false, null)
      let params = {
        companyCode: this.companyCode,
        fileName: imageInformation.fileName.substring(0, imageInformation.fileName.lastIndexOf('.')),
        // KSD V001.000 AS issue #1373 対応
        fileType: imageInformation.fileName.substring(imageInformation.fileName.lastIndexOf('.') + 1)
        // KSD V001.000 AE issue #1373 対応
      }

      // CS KSD V001.000 #86711
      // const res = await axios.delete(
      //   `${this.$t('prop.url')}PresetMaster/DeleteImage`,
      //   commonUtils.methods.addApiHeader({params})
      // )
      // this.$refs.pop.closeFunction()
      // if (res.data.result.code != 0) {
      //   this.globalErrorMapping(res)
      //   return
      // }
      // this.$refs.pop.open(2, '', this.$t('O00004.W002'), '', false, () => { this.updateImages() }, false, null)
      try{
        const res = await axios.delete(
          `${this.$t('prop.url')}PresetMaster/DeleteImage`,
          commonUtils.methods.addApiHeader({params})
        )
        this.$refs.pop.closeFunction()
        if (res.data.result.code != 0) {
          this.globalErrorMapping(res,this.$i18n.t('O00004.W010'))
          return
        }
        this.$refs.pop.open(2, '', this.$t('O00004.W002'), '', false, () => { this.updateImages() }, false, null)
      }catch(e){
        this.globalErrorMapping(null,'O00004.W010')
      }
      // CE KSD V001.000 #86711
    },
    /**
     *  OKボタンクリック処理
     */
    onClickOk () {
      document.getElementById('scrollInformation').scrollTop = 0
      this.$emit('clickImageSubmit', this.imageInformation)
      this.dialog = false
    },
    /**
     * 戻るボタンクリック処理
     */
    onClickReturn () {
      // document.getElementById('scrollInformation').scrollTop = 0
      // this.$emit('clickReturn', this.getImages())
      this.dialog = false
    },
    /**
     * プリセット画像リスト取得
     * @returns プリセット画像リスト
     */
    getImages () {
      var imagesInfos = []
      this.images.forEach(x => {
        x.forEach(y => imagesInfos.push(y))
      })
      return imagesInfos
    },
    /**
     * ダイアログ表示後の処理
     */
    openEnd () {
      document.getElementById('imageAddBtn').focus()
    },
    /**
     * 削除ボタンの非活性判定
     * @returns true:非活性、false:活性
     */
    isDisabledForDeleteBtn () {
      let obj = JSON.parse(JSON.stringify(this.imageInformation))
      if (this.imageInformation.fileName === this.initImageInfo.fileName || this.imageInformation.fileName === 'noimage.png' || obj.ribbon) {
        return true
      }
      return false
    }
  }
}
