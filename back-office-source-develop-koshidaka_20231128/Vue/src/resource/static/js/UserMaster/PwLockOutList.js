import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
const path = 'UserMaster/PwUnLock'

export default {
  data () {
    return {
      dialog: false,
      title: '', // タイトル
      updateFunc: null,
      lockUserDataList: [],
      dataFlag: false
    }
  },
  components: {
    popup
  },
  methods: {
    open (title, dataList, updateFunc) {
      this.dialog = true
      this.updateFunc = updateFunc
      this.title = title
      if (dataList !== null) {
        this.lockUserDataList = dataList
        this.dataFlag = true
      }
    },
    openEnd () {
      for (var i = 0; i < this.lockUserDataList.userInfos.length; i++) {
        document.getElementById('check' + i).checked = false
      }
      if (this.lockUserDataList.userInfos.length > 0) {
        document.getElementsByClassName('checkLabel0')[0].focus()
      }
      document.getElementById('scroll-target').scrollTo(0, 0)
    },
    onCheckKey (index) {
      var check = document.getElementById('check' + index).checked
      document.getElementById('check' + index).checked = !check
    },
    onClickOk () {
      var pwUnLockList = []
      if (this.dataFlag) {
        for (var i = 0; i < this.lockUserDataList.userInfos.length; i++) {
          var elementId = 'check' + i
          if (document.getElementById(elementId).checked) {
            var pwUnLock = {
              userId: this.lockUserDataList.userInfos[i].userId,
              accountClassification: 0
            }
            pwUnLockList.push(pwUnLock)
          }
        }
      }
      if (pwUnLockList.length !== 0) {
        const params = {
          userStatuses: pwUnLockList
        }
        axios.put(this.$i18n.t('prop.url') + path + '?_=dateTime_=' + Date.now(), params, commonUtils.methods.getApiHeader())
          .then(response => {
            if (response.data.result.code === 0) {
              this.updateFunc(pwUnLockList)
              this.dialog = false
            } else {
              this.globalErrorMapping(response.data.result)
            }
          })
          .catch(error => {
            this.$refs.pop.open(3, '', this.$i18n.t('F00001.E014'), '', false, null, false, null)
            console.log(error)
          })
      } else {
        this.dialog = false
        this.updateFunc()
      }
    },
    globalErrorMapping (result) {
      if (result.code === -90) {
        this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), result.code, false, () => {
          this.$router.push('/LoginPage')
        }, false, null)
      } else {
        let globalErrorMsg = result.errorMessageMap['global'].toString()
        this.$refs.pop.open(3, '', globalErrorMsg, result.code, false, null, false, null)
      }
    },
    getIconSrc () {
      return require('@/assets/ico_popup_question.png')
    }
  }
}
