//  KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'

export default {
  data () {
    return {
      dialog: false,
      title: '',
      closeFunc: null,
      colorSelected: '',
      returnColor: null,
      isActive: false,
      msg: '',
      colorSet: [],
      timeout: null
    }
  },
  components: {
    popup
  },
  methods: {
    open (selectedColor, colorSet, closeFunc, returnColor) {
      this.colorSelected = selectedColor
      this.colorSet = colorSet
      this.dialog = true
      this.title = this.$i18n.t('C00214.S009')
      this.closeFunc = closeFunc
      this.returnColor = returnColor
      this.$forceUpdate()
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, this.backConfirm, false, null)
      this.editDlgOpen = true
    },
    async onClickSave () {
      this.popupConfirm()
    },
    async onClickDelete () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W005'), '', true, this.runDelete, false, null)
      this.editDlgOpen = true
    },
    backConfirm () {
      this.dialog = false
      this.closeFunc()
    },
    popupConfirm () {
      this.dialog = false
      this.returnColor(this.colorSelected)
      this.closeFunc()
    },
    getColor (event, colorValue) {
      this.colorSelected = colorValue
    },
    hexToRGB (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      const r = parseInt(result[1], 16)
      const g = parseInt(result[2], 16)
      const b = parseInt(result[3], 16)
      const rgb = [r, g, b]
      return rgb
    },
    getBrightness (rgb) {
      const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                      (parseInt(rgb[1]) * 587) +
                      (parseInt(rgb[2]) * 114)) / 1000)
      return (brightness > 125)
    },
    colorItemCheck (colorItem, idx, colorIdx) {
      if (colorItem === this.colorSelected) {
        const focusIdx = (idx * 7) + colorIdx
        setTimeout(() => {
          document.getElementsByClassName('colorBox')[focusIdx].focus()
        }, 100)
        return true
      } else {
        return false
      }
    }
  }
}
//  KSD V001.000 AE
