import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import popup from '@/resource/templates/CommonDesign/Popup'
/* import pdfMake from 'pdfmake/build/pdfmake' */
import pdfMake from 'pdfmake'
import dialogStoreSelect from '@/resource/templates/CommonDesign/DialogStoreSelect'
// KSD V001.000 DS
// import pdfFonts from './../../../../../config/vfs_fonts.js'
// KSD V001.000 DE
/* import pdfFonts from '@/resource/static/font/vfs_fonts.js' */
// KSD V001.000 AS
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
// KSD V001.000 AE

const path = 'Authorization/EncodepwdGet'
// KSD V001.000 DS
// pdfMake.vfs = pdfFonts.pdfMake.vfs
// pdfMake.fonts = {
//   Roboto: {
//     normal: 'ipagp.ttf',
//     bold: 'ipagp.ttf'
//   }
// }
// KSD V001.000 DE
export default {
  name: 'EmployeeCodePrint',
  // KSD V001.000 AS
  mixins: [errorMappingUtils],
  // KSD V001.000 AE
  data () {
    return {
      findUserDataList: [],
      dispUserDataList: [],
      employeeSelected: [],
      printUserDataList: [],
      disabledPrintPdfBtn: true,
      searchData: '',
      lastSearchData: '',
      headquartersAuthority: 0,
      initialized: false,
      targetStoreCd: 0,
      targetStoreText: '',
      replaceTable: {
        0: 'h',
        1: 'Q',
        2: 'z',
        3: 'M',
        4: 's',
        5: 'b',
        6: 'A',
        7: 'C',
        8: 'o',
        9: 'J'
      },
      operationLock: true
    }
  },
  components: {
    maintButton,
    popup,
    // KSD V001.000 DS
    // dialogStoreSelect,
    // pdfMake,
    // pdfFonts
    // KSD V001.000 DE
    // KSD V001.000 AS
    dialogStoreSelect
    // KSD V001.000 AE
  },
  methods: {
    async initialize () {
      document.title = this.$route.meta.title
      this.$root.title = this.$route.params.title
      if (this.initialized) return
      this.initialized = true
      if (this.targetStoreCd) {
        if (await this.getUsers() === false) return
      }
      if (this.headquartersAuthority === 1) {
        if (await this.getMasters() === false) {
          this.findDataList = []
          this.dispDataList = []
          this.resultCount = 0
          return
        }
        await this.setStore(this.targetStoreCd)
      }
      this.operationLock = false
    },
    async storeSelect () {
      if (this.headquartersAuthority !== 1) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W019'), '', false, null, false, null)
        return
      }
      let selectedStoreCodes = [this.targetStoreCd]
      this.$refs.dialogStoreSelect.open(this.masters.storeMasters, selectedStoreCodes, this.masters.storeGroupMasters, false)
    },
    async storeSelectOk (selectedStoreCodes) {
      if (selectedStoreCodes.length <= 0) return
      if (selectedStoreCodes[0] === this.targetStoreCd) return
      await this.setStore(selectedStoreCodes[0])
      await this.getUsers()
    },
    async setStore (storeCd) {
      this.targetStoreCd = storeCd
      this.targetStoreText = ''
      this.operationLockStore = true
      if (this.masters.storeMasters !== null) {
        var index = this.masters.storeMasters.findIndex((element) => element.name === storeCd)
        if (index >= 0) {
          this.targetStoreText = this.masters.storeMasters[index].displayName.default
          this.operationLockStore = false
        }
      }
    },
    async getMasters () {
      let getMasters = this.$refs.dialogStoreSelect.getMasters(false)
      this.masters = await getMasters
      if (this.masters.isError === false) {
        return true
      } else {
        return false
      }
    },
    async getUsers () {
      let result = false
      this.findUserDataList = []
      this.dispUserDataList = []
      this.printUserDataList = []
      this.employeeSelected = []
      this.resultCount = 0
      try {
        // ユーザ一覧取得
        const params = { nodeId: this.targetStoreCd }
        let response = await axios.post(this.$i18n.t('prop.url') + path, params, commonUtils.methods.addApiHeader({}))
        if (response.data.result.code === 0) {
          // 0:正常
          this.findUserDataList = response.data.responseModel.userInformation
          this.findUserDataList.sort((a, b) => (a.userNumber < b.userNumber) ? -1 : 1)
          this.filtering()
          result = true
        } else if (response.data.result.code === 2) {
          // 2:該当するユーザなし
          this.filtering()
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('C00227.E003'), '', false, null, false, null)
        console.log(error)
      }
      return result
    },
    filtering () {
      // フィルタリング
      if (this.lastSearchData === '') {
        this.dispUserDataList = this.findUserDataList
      } else {
        var tempStr = ''
        var tempLen = this.lastSearchData.length
        this.dispUserDataList = []
        for (var i = 0; i < this.findUserDataList.length; i++) {
          if (document.getElementById('searchName').checked) {
            tempStr = this.findUserDataList[i].userName
          } else {
            tempStr = this.findUserDataList[i].userNumber + ''
          }
          if (tempStr == null) {
            tempStr = ''
          }
          // 前方一致
          if (tempStr.slice(0, tempLen) === this.lastSearchData) {
            this.dispUserDataList.push(this.findUserDataList[i])
          }
        }
      }
      this.dispUserDataList = this.dispUserDataList.filter((usr) => usr.userNumber.toLowerCase() !== 'tecsys')
      this.resultCount = this.dispUserDataList === null ? 0 : this.dispUserDataList.length
    },
    enterCode () {
      document.getElementById('searchCode').checked = true
      this.onRadioChange()
    },
    enterName () {
      document.getElementById('searchName').checked = true
      this.onRadioChange()
    },
    onRadioChange () {
      this.searchData = ''
    },
    toggleSelected (index) {
      this.$set(this.employeeSelected, index, !this.employeeSelected[index])
      this.updatePrintUserDataList()
    },
    updatePrintUserDataList () {
      this.printUserDataList = []
      for (let i = 0; i < this.dispUserDataList.length; i++) {
        if (this.employeeSelected[i]) {
          this.printUserDataList.push(this.dispUserDataList[i])
        }
      }
    },
    // KSD V001.000 DS
    // printPdf () {
    //   if (this.printUserDataList.length === 0) return
    //   this.generatePdf()
    // },
    // KSD V001.000 DE
    // KSD V001.000 AS
    async printPdf () {
      if (this.printUserDataList.length === 0) return
      await this.loadFonts();
      this.generatePdf()
    },
    async loadFonts() {
      const pdfFonts = await import('./../../../../../static/vfs_fonts.js')
      return new Promise((resolve) => {
        
        pdfMake.vfs = pdfFonts.pdfMake.vfs
        pdfMake.fonts = {
          Roboto: {
            normal: 'ipagp.ttf',
            bold: 'ipagp.ttf'
          }
        }
        resolve();
      });
    },
    // KSD V001.000 AE
    generatePdf () {
      const docDefinition = {
        pageMargins: [50, 40, 50, 40],
        content: this.createContent()
      }

      pdfMake.createPdf(docDefinition).open()
    },
    createContent () {
      const content = [
        {
          table: {
            widths: ['33%', '33%', '33%'],
            body: this.createBody()
          },
          layout: {
            paddingTop: function (i) {
              return ((i % 3) === 0) ? 8 : 2
            },
            paddingBottom: function (i) {
              return ((i % 3) === 2 || (i % 3) === 1) ? 24 : 2
            },
            hLineWidth: function (i, node) {
              return 0
            },
            vLineWidth: function (i) {
              return 0
            }
          }
        }
      ]
      return content
    },
    createBody () {
      let body = []
      let numbers = ['', '', '']
      let names = ['', '', '']
      let qrCodes = ['', '', '']
      let pwdtext = ''
      let counter = 0
      let colno = 0
      let max = this.printUserDataList.length
      for (let i = 0; i < max; i++) {
        colno = counter % 3
        numbers[colno] = this.replaceAlpha(this.printUserDataList[i].userNumber.slice(0, 8))
        names[colno] = this.printUserDataList[i].userName
        pwdtext = this.obfuscate(numbers[colno]) + this.printUserDataList[i].encodepwd
        qrCodes[colno] = pwdtext
        if (colno === 2 || counter === max - 1) {
          body.push(numbers)
          body.push(names)
          body.push(this.createColumns(qrCodes, 'qr'))
          numbers = ['', '', '']
          names = ['', '', '']
          qrCodes = ['', '', '']
        }
        counter++
      }
      return body
    },
    createColumns (arr, type = 'text') {
      let columns = []
      for (let i = 0; i < arr.length; i++) {
        columns.push(this.createColumn(arr[i], type))
      }
      return columns
    },
    createColumn (word, type = 'text') {
      if (word.length > 0 && type === 'qr') {
        return { qr: word, fit: 120 }
      } else {
        return word
      }
    },
    replaceAlpha (text) {
      const regex = /[0-9]/
      let newtext = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i].match(regex)) {
          newtext += text[i]
        } else {
          newtext += '9'
        }
      }
      return newtext
    },
    obfuscate (text) {
      const padded = text.padStart(8, '0')
      let s = ''
      for (let i = 0; i < 8; i++) {
        s += this.replaceTable[padded[i]]
      }
      return s[6] + s[2] + s[5] + s[7] + s[1] + s[0] + s[3] + s[4]
    },
    closeTab () {
      this.$router.push('/TopPage')
    }
  },
  created () {
    this.$root.winId = 'C00227'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    this.searchData = ''
    let vue = this
    let belongStoreCdStr = ''
    vue.$root.$once('getBelongStoreCd', (belongStoreCd) => {
      // headerで保持している所属店舗コード
      belongStoreCdStr = belongStoreCd
    })
    let belongStoreNameStr = ''
    vue.$root.$once('getBelongStoreName', (belongStoreName) => {
      // 対象店舗名 = headerで保持している所属店舗名
      belongStoreNameStr = belongStoreName
    })
    let targetStoreCd = ''
    vue.$root.$once('getBusinessUnitCdStr', (businessUnitCdStr) => {
      // 対象店舗コード = headerで保持している所属企業コード + headerで保持している所属店舗コード
      if (belongStoreCdStr) {
        targetStoreCd = businessUnitCdStr + belongStoreCdStr
      }
    })
    vue.$root.$once('getHeadquartersAuthority', async (headquartersAuthority) => {
      // 本部権限 = headerで保持している本部権限
      vue.headquartersAuthority = headquartersAuthority
      if (headquartersAuthority !== 1) {
        if (targetStoreCd) {
          vue.targetStoreText = belongStoreNameStr
          vue.targetStoreCd = targetStoreCd
          vue.operationLockStore = false
        }
      }
      await this.initialize()
      await this.$nextTick()
      setTimeout(() => {
        if (this.headquartersAuthority === 1) {
          document.getElementById('storeSelectBtn').focus()
        } else {
          this.$refs.clientIdText.focus()
        }
      }, 200)
    })
  },
  watch: {
    searchData: function (val) {
      // コード入力の場合、半角英数以外を除去
      if (document.getElementById('searchCode').checked) {
        var inputText = val.replace(/[^0-9a-z]/gi, '')
        this.searchData = inputText
        if (inputText === this.lastSearchData) return
        this.lastSearchData = inputText
      } else {
        this.lastSearchData = val
      }
      if (this.lastSearchData === '') {
        this.findUserDataList = []
        this.dispUserDataList = []
        this.getUsers()
      } else {
        if (this.findUserDataList === null || this.findUserDataList.length === 0) return
        this.filtering()
      }
    },
    targetStoreCd: function () {
      this.disabledPrintPdfBtn = !(this.targetStoreCd)
    }
  }
}
