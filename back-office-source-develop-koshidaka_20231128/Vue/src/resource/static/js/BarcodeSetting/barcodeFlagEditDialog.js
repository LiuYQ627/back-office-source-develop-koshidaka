/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230116 duyouwei(Neusoft)  G001.00.0  issue課題#1248を対応します.
 * 20230313 dingxin(Neusoft)   G002.00.0  issue課題#1662を対応します.
 * 20230315 dingxin(Neusoft)   G003.00.0  issue課題#1716を対応します.
 * 20230320 dingxin(Neusoft)   G004.00.0  issue課題#1528を対応します.
 * 20230320 dingxin(Neusoft)   G005.00.0  issue課題#1528を対応します.
 * 20230423 dingxin(Neusoft)   G005.00.1  issue課題#1528を対応します.
 * 20230428 dingxin(Neusoft)   G006.00.0  issue課題#1528を対応します.
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
      flag: {
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
    // async open (flag, index) {
    async open (flag, index, mode) {
    // G001.00.0 Update -End
      this.flag = flag
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
      this.$emit('clickSave', this.flag, this.index)
    },
    // 文字入力規制(半角数字のみ)
    numInputRegulation () {
      // G003.00.0 Update-Start
      // this.flag.row[1] = this.flag.row[1].toString().replace(/[^0-9]/gi, '')
      // this.flag.row[2] = this.flag.row[2].toString().replace(/[^0-9]/gi, '')
      // this.flag.row[3] = this.flag.row[3].toString().replace(/[^0-9]/gi, '')
      // this.flag.row[5] = this.flag.row[5].toString().replace(/[^0-9]/gi, '')
      // this.flag.row[6] = this.flag.row[6].toString().replace(/[^0-9]/gi, '')
      // G004.00.0 Update Start
      // this.flag.row[1] = parseInt(this.flag.row[1].toString().replace(/[^0-9]/gi, ''))
      // this.flag.row[2] = parseInt(this.flag.row[2].toString().replace(/[^0-9]/gi, ''))
      // this.flag.row[3] = parseInt(this.flag.row[3].toString().replace(/[^0-9]/gi, ''))
      // this.flag.row[5] = parseInt(this.flag.row[5].toString().replace(/[^0-9]/gi, ''))
      // this.flag.row[6] = parseInt(this.flag.row[6].toString().replace(/[^0-9]/gi, ''))
      // G006.00.0 Add-Start
      this.flag.row[1] = this.flag.row[1].toString().replace(/[^0-9]/gi, '')
      // G006.00.0 Add-End
      if (this.flag.row[1] != '') {
        this.flag.row[1] = parseInt(this.flag.row[1].toString().replace(/[^0-9]/gi, ''))
      } else {
        this.flag.row[1] = 0
      }
      // G006.00.0 Add-Start
      this.flag.row[2] = this.flag.row[2].toString().replace(/[^0-9]/gi, '')
      // G006.00.0 Add-End
      if (this.flag.row[2] != '') {
        this.flag.row[2] = parseInt(this.flag.row[2].toString().replace(/[^0-9]/gi, ''))
      } else {
        this.flag.row[2] = 0
      }
      // G006.00.0 Add-Start
      this.flag.row[3] = this.flag.row[3].toString().replace(/[^0-9]/gi, '')
      // G006.00.0 Add-End
      if (this.flag.row[3] != '') {
        this.flag.row[3] = parseInt(this.flag.row[3].toString().replace(/[^0-9]/gi, ''))
      } else {
        this.flag.row[3] = 0
      }
      // G006.00.0 Add-Start
      this.flag.row[5] = this.flag.row[5].toString().replace(/[^0-9]/gi, '')
      // G006.00.0 Add-End
      if (this.flag.row[5] != '') {
        // G005.00.0 Update-Start
        // this.flag.row[5] = parseInt(this.flag.row[5].toString().replace(/[^0-9]/gi, ''))
        // G005.00.1 Update-Start
        // this.flag.row[5] = this.flag.row[5].toString().replace(/[^0-9]/gi, '')
        let str1 = this.flag.row[5].toString().replace(/[^0-9]/gi, '')
        if (str1.length > 1) {
          if (str1.charAt(0) == '0') {
            this.flag.row[5] = str1.substring(1, str1.length)
          } else {
            this.flag.row[5] = str1
          }
        } else {
          this.flag.row[5] = str1
        }
        // G005.00.1 Update-End
        // G005.00.0 Update-End
      } else {
        this.flag.row[5] = 0
      }
      // G006.00.0 Add-Start
      this.flag.row[6] = this.flag.row[6].toString().replace(/[^0-9]/gi, '')
      // G006.00.0 Add-End
      if (this.flag.row[6] != '') {
        // G005.00.0 Update-Start
        // this.flag.row[6] = parseInt(this.flag.row[6].toString().replace(/[^0-9]/gi, ''))
        // G005.00.1 Update-Start
        // this.flag.row[6] = this.flag.row[6].toString().replace(/[^0-9]/gi, '')
        let str12 = this.flag.row[6].toString().replace(/[^0-9]/gi, '')
        if (str12.length > 1) {
          if (str12.charAt(0) == '0') {
            this.flag.row[6] = str12.substring(1, str12.length)
          } else {
            this.flag.row[6] = str12
          }
        } else {
          this.flag.row[6] = str12
        }
        // G005.00.1 Update-End
        // G005.00.0 Update-End
      } else {
        this.flag.row[6] = 0
      }
      // G004.00.0 Update End
      // G003.00.0 Update-End
    }
  },

  created () {
    this.fetchConfig()
  },
  // G002.00.0 Add start
  mounted () {
    this.$root.$on('getPermissions', (permissions) => {
      this.permissions = permissions
    })
  }
  // G002.00.0 Add end
}
