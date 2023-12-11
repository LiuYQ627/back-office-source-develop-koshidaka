// KSD V001.000 AS
import axios from 'axios'
import commonUtils from './../Common/commonUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'
import CommonDialog from '@/resource/templates/CommonDesign/CommonDialog'
import popup from '@/resource/templates/CommonDesign/Popup'
import ErrorMessage from '@/resource/templates/CommonDesign/CommonErrorMessageHandler'
import TextInput from '@/resource/templates/CommonInput/TextInput'

const searchPath = 'StoreMaster/StoreAllSearch'

export default {
  name: 'StoreGroupEditDialog',
  mixins: [errorMappingUtils, transformUtils, validationUtils],
  props: {
    value: {
      type: Object,
      required: true
    },
    showEditDialog: {
      type: Boolean,
      default: false
    },
    isNewMaster: {
      type: Boolean,
      default: true
    },
    settingType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dataModel: JSON.parse(JSON.stringify(this.value)),
      validationErrors: new Map(),
      errorText: ''
    }
  },
  components: {
    popup,
    CommonDialog,
    TextInput,
    ErrorMessage
  },
  methods: {
    handleSaveBtn (value) {
      this.clearValidationErrors()
      if (this.inputCheck(value)) {
        this.$emit('submit', this.dataModel)
        this.closeEditDialog()
      }
    },
    async handleBackBtn () {
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          this.closeEditDialog()
        }
      })
    },
    async handleDeleteBtn () {
      // 削除
      await this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W005',
        showBackBtn: true,
        okBtnCallback: async () => {
          if (await this.getStoreAll() === true) {
            this.$emit('delete', this.dataModel.code)
            this.closeEditDialog()
          }
        }
      })
    },
    async getStoreAll () {
      let result = false
      try {
        // 検索
        let response = await axios.get(this.$i18n.t('prop.url') + searchPath + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
        if (response.data.result.code === 0) {
          this.codeStorage = []
          if (this.settingType === 'STORE_GROUP_1') {
            for (let i = 0; i < response.data.storeInfos.length; i++) {
              this.codeStorage[i] = response.data.storeInfos[i].storeGroup1
            }
          } else {
            this.codeStorage = []
            for (let i = 0; i < response.data.storeInfos.length; i++) {
              this.codeStorage[i] = response.data.storeInfos[i].storeGroup2
            }
          }
          const data = this.codeStorage.filter(num => Number(num) === Number(this.dataModel.code))
          const ifExist = !!data.length
          if (ifExist === true) {
            this.$refs.pop.open(3, '', this.modalType === 1 ? this.$i18n.t('F32251.E007') : this.$i18n.t('F32251.E007'), '', false, null, false, null)
          } else {
            result = true
          }
        } else if (response.data.result.code === 2) {
          // 2:該当する店舗なし
          result = true
        } else {
          this.globalErrorMapping(response.data.result)
        }
      } catch (error) {
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
        console.error(error)
      }
      return result
    },
    closeEditDialog () {
      this.$emit('update:showEditDialog', !this.showEditDialog)
    },
    inputLimit (str, maxLength) {
      let strLen = str.toString().length
      // byte数の取得
      let byteLen = 0
      for (let i = 0; i < strLen; i++) {
        let codeUnitNo = str.charCodeAt(i)
        if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
          (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
          byteLen += 1
        } else {
          byteLen += 2
        }
        // byte数チェック
        if (byteLen > maxLength) {
          // maxLengthより上の場合、maxLength以内の文字列を取得
          if (this.dataModel.displayName.default === str) {
            this.dataModel.displayName.default = str.toString().substring(0, i)
            this.$refs.groupName.$el.value = str.toString().substring(0, i)
          }
          break
        }
      }
    },
    inputCheck (value) {
      let result = true
      let errors = ['no-error']
      if (String(value.displayName.default).length === 0 || value.displayName.default === null) {
        errors = ['required']
        this.openPopupDialog({ mode: 3, code: -99, messageCode: 'O00004.W006' })
        result = false
      }
      if (!result) {
        this.setValidationError('dataModel.displayName.default', errors)
        this.errorText = this.$i18n.t('O00004.W014')
      }
      return result
    },
    setValidationError (key, value) {
      this.validationErrors.set(key, value)
      this.$forceUpdate()
      this.setFocus()
    },
    clearValidationErrors () {
      this.validationErrors.clear()
      this.$forceUpdate()
    },
    handleOkKeydown () {
      this.setFocus()
    },
    hasError (key) {
      return this.validationErrors && this.validationErrors.has(key)
    },
    setFocus () {
      this.$nextTick(() => {
        document.getElementById('group-name').focus()
      })
    }
  },
  async mounted () {
    setTimeout(() => { this.setFocus() }, 200)
  }
}
// KSD V001.000 AE
