/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230116 duyouwei(Neusoft)  G001.00.0  issue課題#1248を対応します.
 * 20230302 dingxin(Neusoft)   G002.00.0  issue課題#1662を対応します.
 * 20230315 dingxin(Neusoft)   G003.00.0  issue課題#1716を対応します.
 * 20230320 dingxin(Neusoft)   G004.00.0  issue課題#1528を対応します.
 * 20230428 dingxin(Neusoft)   G005.00.0  issue課題#1528を対応します.
 */
import popup from '@/resource/templates/CommonDesign/Popup'

export default {
  data () {
    return {
      // G002.00.0 Add start
      permissions: [],
      // G002.00.0 Add end
      config: {},
      displayed: false,
      index: 0,
      // G001.00.0 Add-Start
      mode: 1,
      // G001.00.0 Add-End
      conversion: {
        order: null,
        row: []
      }
    }
  },
  components: {
    popup
  },
  methods: {
    fetchConfig () {
      this.config = require('./_config.json')
    },
    // G001.00.0 Update-Start
    // async open (conversion, index) {
    async open (conversion, index, mode) {
    // G001.00.0 Update -End
      this.conversion = conversion
      this.index = index
      this.displayed = true
      // G001.00.0 Add-Start
      this.mode = mode
      // G001.00.0 Add-Start
    },
    onClickReturn () {
      this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.displayed = false }, false, null)
    },
    onClickSave () {
      this.displayed = false
      this.$emit('clickSave', this.conversion, this.index)
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      // // G003.00.0 Update Start
      // this.conversion.row[2] = this.conversion.row[2].toString().replace(/[^0-9]/gi, '')
      // this.conversion.row[4] = this.conversion.row[4].toString().replace(/[^0-9]/gi, '')
      // this.conversion.row[5] = this.conversion.row[5].toString().replace(/[^0-9]/gi, '')
      // this.conversion.row[6] = this.conversion.row[6].toString().replace(/[^0-9]/gi, '')
      // G004.00.0 Update Start
      // this.conversion.row[2] = parseInt(this.conversion.row[2].toString().replace(/[^0-9]/gi, ''))
      // G005.00.0 Add-Start
      this.conversion.row[2] = this.conversion.row[2].toString().replace(/[^0-9]/gi, '')
      // G005.00.0 Add-End
      if (this.conversion.row[2] != '') {
        this.conversion.row[2] = parseInt(this.conversion.row[2].toString().replace(/[^0-9]/gi, ''))
      } else {
        this.conversion.row[2] = 0
      }
      // G005.00.0 Add-Start
      this.conversion.row[4] = this.conversion.row[4].toString().replace(/[^0-9]/gi, '')
      // G005.00.0 Add-End
      if (this.conversion.row[4] != '') {
        this.conversion.row[4] = parseInt(this.conversion.row[4].toString().replace(/[^0-9]/gi, ''))
      } else {
        this.conversion.row[4] = 0
      }
      // G005.00.0 Add-Start
      this.conversion.row[5] = this.conversion.row[5].toString().replace(/[^0-9]/gi, '')
      // G005.00.0 Add-End
      if (this.conversion.row[5] != '') {
        this.conversion.row[5] = parseInt(this.conversion.row[5].toString().replace(/[^0-9]/gi, ''))
      } else {
        this.conversion.row[5] = 0
      }
      // G005.00.0 Add-Start
      this.conversion.row[6] = this.conversion.row[6].toString().replace(/[^0-9]/gi, '')
      // G005.00.0 Add-End
      if (this.conversion.row[6] != '') {
        this.conversion.row[6] = parseInt(this.conversion.row[6].toString().replace(/[^0-9]/gi, ''))
      } else {
        this.conversion.row[6] = 0
      }
      // G004.00.0 Update End
      // G003.00.0 Update End
    }
  },

  // G002.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  },
  // G002.00.0 Add end
  created () {
    this.fetchConfig()
  }
}
