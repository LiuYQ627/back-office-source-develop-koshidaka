
import popup from '@/resource/templates/CommonDesign/Popup'
import moment from 'moment'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
import commonUtils from '../Common/commonUtils'
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230625  wupsh(Neusoft)  G001.00.0  issue課題#1442を対応します.
 */
const posTransactionNamePath = '/F322a3-edit/取引別名称設定'
export default {
  name: 'F322a3-output',
  props: {
    list: {
      type: Array,
      required: false
    },
    storeName: {
      required: true
    },
    changeDateText: {
      type: String,
      required: true,
      default: ''
    },
    targetStoreCodes: {
      type: Array,
      required: true
    },
    typeOfSetting: {
      type: String,
      required: true
    },
    propChangeDateText: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      data: [{
        timestamp: ''
      }]
    }
  },
  computed: {
  },
  components: {
    maintButton,
    popup,
    moment,
    dialogStoreSelect,
    commonUtils
  },
  methods: {
    getNow () {
      const today = new Date()
      const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
      let time = today.getHours() + ':' + today.getMinutes()
      if (time < 10) { today.getMinutes() }
      time = today.getHours() + ':0' + today.getMinutes()
      const dateTime = date + ' ' + time
      this.timestamp = dateTime
    },
    toString (changeDateText) {
      changeDateText = this.changeDateText
      return changeDateText
    },
    printName (name) {
      return name || ''
    },
    // G001.00.0 Update-Start
    // dateFormatter (date, format = 'YYYY/MM/DD HH:mm') {
    //   return moment(date).format(format)
    // },
    // dateFormat (changeDateText, format = 'YYYY/MM/DD') {
    //   if (changeDateText == null || changeDateText == 'Invalid Date') {
    //     return ''
    //   } else {
    //     return moment(changeDateText).format(format)
    //   }
    // },
    dateFormatter (date, format = 'YYYY-MM-DD HH:mm') {
      return moment(date).format(format)
    },
    dateFormat (changeDateText, format = 'YYYY-MM-DD') {
      if (changeDateText == null || changeDateText === 'Invalid Date') {
        return ''
      } else if (changeDateText === '現在の設定') {
        return moment().format(format)
      } else {
        return moment(changeDateText).format(format)
      }
    },
    // G001.00.0 Update-End
    async clearButtonClicked () {
      this.$refs.pop.open(1, '終了', '編集中のデータは破棄されます。よろしいですか？', '', true, this.closeTab, false, null)
    },
    async closeTab () {
      this.$router.push('/TopPage')
    },
    async backToPrevious () {
      // this.$router.push(posTransactionNamePath)
      // this.$router.back()
      this.$router.push({
        name: 'F322a3-edit',
        params: {
          targetStoreCodes: this.targetStoreCodes,
          typeOfSetting: this.typeOfSetting,
          propChangeDateText: this.propChangeDateText
        }
      })
    },
    toSave () {
      let csv = '取引別No,名称,印字No,取引別名称（表示),取引別名称（印字）\n'
      this.list.forEach((row) => {
        csv += row.transactionNo + ',' + row.defaultName.default + ',' + row.printNo + ',' + row.displayName.default + ',' + row.printName.default
        csv += '\n'
      })
      const anchor = document.createElement('a')
      anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
      anchor.target = '_blank'
      anchor.download = '取引別名称設定.csv'
      anchor.click()
    }
  },

  created () {
    this.$root.winId = 'F322a3-output'
    setInterval(this.getNow(), 1000)
  },
  destroyed () {
  },
  async mounted () {
  }
}
