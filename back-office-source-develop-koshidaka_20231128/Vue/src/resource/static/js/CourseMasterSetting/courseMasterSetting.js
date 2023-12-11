// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import popup from '@/resource/templates/CommonDesign/Popup'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import CourseMasterSettingList from '@/resource/templates/CourseMasterSetting/CourseMasterSettingList'
import CourseMasterSettingForm from '@/resource/templates/CourseMasterSetting/CourseMasterSettingForm'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import transformUtils from '@/resource/static/js/Common/transformUtils'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import dataUtils from '@/resource/static/js/Common/dataUtils'
import moment from 'moment'
import s3bucketUtils from '@/resource/static/js/Common/s3bucketUtils.js'

const ROOM_COURSE_QUERY_URL = 'RentalsRoomcourse/Query'
const ROOM_COURSE_UPDATE_URL = 'RentalsRoomcourse/Update'
const ROOM_COURSE_DELETE_URL = 'RentalsRoomcourse/Delete'

export default {
  name: 'courseMasterSetting',
  mixins: [transformUtils, errorMappingUtils, s3bucketUtils, dataUtils],
  data () {
    return {
      headquartersAuthorityCheckEnable: true,
      targetStoreCodes: [],
      courseMasterList: [],
      selectedIndexNo: [],
      selectedDataModel: null,
      isCourseMasterSettingListEnabled: false,
      isCourseMasterSettingFormEnabled: false,
      isCourseMasterSettingFormCreateMode: false,
      uploadedFile: null,
      isCapturedFile: false
    }
  },
  components: {
    popup,
    maintButton,
    storeSelect,
    CourseMasterSettingList,
    CourseMasterSettingForm,
    FormGroupLayout
  },
  computed: {
    disableList: function () {
      return !this.isCourseMasterSettingListEnabled || this.isCourseMasterSettingFormEnabled
    },
    disableForm: function () {
      return !this.isCourseMasterSettingListEnabled || !this.isCourseMasterSettingFormEnabled
    },
    dataCount: function () {
      return Math.min(this.courseMasterList.length)
    },
    disableFixedButton: function () {
      return !this.isCourseMasterSettingFormEnabled
    },
    disableStopButton: function () {
      return !this.isCourseMasterSettingFormEnabled
    },
    disableDelButton: function () {
      return !this.isCourseMasterSettingFormEnabled || !this.isCourseMasterSettingFormCreateMode
    },
    disableCloseButton: function () {
      return this.isCourseMasterSettingFormEnabled
    },
    companyCode () {
      return this.targetStoreCodes[0].substring(0, 15)
    },
    storeCode () {
      return this.targetStoreCodes[0].substring(15)
    }
  },
  methods: {
    async initialize () { },
    async initializeCourseMasterList () {
      this.isCourseMasterSettingListEnabled = false
      this.courseMasterList.length = 0
      this.courseMasterList = []
      await this.masterDataQuery(
        ROOM_COURSE_QUERY_URL,
        {
          nodeId: this.targetStoreCodes[0],
          chargeCode: 0,
          orderBy: 'chargeCode',
          ascending: true,
          startIndex: 0,
          batchSize: 0
        },
        (responseModel) => {
          this.courseMasterList.length = 0
          this.courseMasterList = [...responseModel]
        }
      ).then((values) => {
        // コース一覧を有効化状態とする
        this.isCourseMasterSettingListEnabled = true
      }, (err) => {
        this.targetStoreCodes = []
        this.globalErrorMapping(err)
        throw err
      }).catch((err) => {
        this.targetStoreCodes = []
        this.globalErrorMapping2(err)
        throw err
      })
    },
    catchErrorPopup () {
      this.openPopupDialog({
        mode: 3,
        message: this.$i18n.t('O00004.W010'),
        code: ''
      })
    },
    resetForm () {
      // コース一覧の選択状態を解除する
      this.selectedIndexNo = []
      // コース設定項目欄に設定した内容を初期化する
      this.selectedDataModel = null
      // コース設定項目欄を無効化状態とする、コース一覧を有効化状態とする
      this.isCourseMasterSettingFormEnabled = false
      this.isCourseMasterSettingFormCreateMode = false
      this.uploadedFile = null
      this.isCapturedFile = false
    },
    preprocessData () {
      let course = { ...this.selectedDataModel.course }
      course.nodeId = this.targetStoreCodes[0]
      course.chargeCode = Number(course.chargeCode)
      course.minUserCount = Number(course.minUserCount)
      course.startDate = moment(course.startDate).set({ 'hours': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).toISOString()
      course.endDate = moment(course.endDate).set({ 'hours': 23, 'minute': 59, 'second': 59, 'millisecond': 999}).toISOString()
      course.selfDispPosition = course.selfDispPosition === '' || course.selfDispPosition == null ? null : Number(course.selfDispPosition)
      course.courseImageFiletName = course.courseImageFiletName ? course.courseImageFiletName : ""
      course.courseExplanatory1 = course.courseExplanatory1 ? course.courseExplanatory1 : ""
      course.courseExplanatory2 = course.courseExplanatory2 ? course.courseExplanatory2 : ""
      course.courseExplanatory3 = course.courseExplanatory3 ? course.courseExplanatory3 : ""
      return JSON.stringify(course)
    },
    async updateMasterData () {
      const vue = this
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })

      let course = JSON.parse(this.preprocessData())
      // コース設定項目欄に設定した内容をテーブルマスタに保存する

      if (this.uploadedFile !== null) {
        course.courseImageFiletName = this.renameImageFile()
        if (await this.uploadImage(this.renameImageFile()) === false) {
          return
        }
      }
      const update = this.masterDataUpdate(
        ROOM_COURSE_UPDATE_URL,
        course,
        null,
        null
      )
      update.then(async (values) => {
        // 処理結果画面を表示する
        await vue.initializeCourseMasterList()
          .then(async () => {
            vue.resetForm()
            this.uploadedFile = null
            await vue.openPopupDialog({
              mode: 2,
              messageCode: 'O00004.W002',
              okBtnCallback: async () => {
                this.closePopupDialog()
                this.dateConsecutivityCheck()
              }
            })
          }, (err) => {
            this.globalErrorMapping2(err)
          })
      }, async (err) => {
        this.globalErrorMapping2(err, null, async () => {
          if (this.isCapturedFile === true) {
            try {
              if (await this.deleteImageFile(course.courseImageFiletName) === false) return
              this.isCapturedFile = false
            } catch (err) {
              this.catchErrorPopup()
              return
            }
          }
        })
      }).catch(async () => {
        this.catchErrorPopup()
        if (this.isCapturedFile === false) return
        try {
          if (await this.deleteImageFile(course.courseImageFiletName) === false) return
          this.isCapturedFile = false
        } catch (err) {
          this.catchErrorPopup()
          return
        }
      })
    },
    async deleteMasterData () {
      const vue = this
      // 処理中に表示する
      await this.openPopupDialog({ mode: 4, messageCode: 'O00004.W009' })
      // コースの該当アイテムに対し、コース情報マスタから削除する
      let delCourse = { nodeId: this.targetStoreCodes[0], chargeCode: Number(this.selectedDataModel.indexNo) }
      let url = ROOM_COURSE_DELETE_URL
      url = url.replace(':nodeId', this.targetStoreCodes[0])
      url = url.replace(':chargeCode', this.selectedDataModel.indexNo)

      let course = { ...this.selectedDataModel.course }
      if (course.courseImageFiletName !== '') {
        try {
          if (await this.deleteImageFile(course.courseImageFiletName) === false) {
            return
          }
        } catch (err) {
          if (err.data === undefined || err.data.result.errorMessageMap === null) {
            this.catchErrorPopup()
            return
          } else {
            this.globalErrorMapping2(err.data.result)
            return
          }
        }
      }

      const del = this.masterDataDelete(
        url,
        delCourse,
        null
      )
      del.then(async (values) => {
        // 処理結果画面を表示する
        await vue.initializeCourseMasterList()
        vue.resetForm()
        if (this.$refs.pop.dialog && this.$refs.pop.mode === 3) return
        await this.openPopupDialog({
          mode: 2,
          messageCode: 'O00004.W002',
          okBtnCallback: async () => {
            this.closePopupDialog()
            this.dateConsecutivityCheck()
          }
        })
      }, (err) => {
        this.globalErrorMapping(err)
      }).catch(() => {
        this.catchErrorPopup()
      })
    },
    inputCheck () {
      // コース設定項目欄に未入力の項目があるチェック
      return this.$refs.courseMasterSettingForm.validateForm()
    },
    duplicateCheck () {
      // テーブルNoが、同ノードID内で重複しているチェック
      return this.$refs.courseMasterSettingForm.validateUniqueForm()
    },
    dateConsecutivityCheck () {
      if (this.courseMasterList.length <= 1) return
      const masterList = this.deepClone(this.courseMasterList)
      const START_DATE_KEY = 'startDate'
      const END_DATE_KEY = 'endDate'
      const PRECISION = 'day'
      const checkMoment = (date) => {
        return moment.isMoment(date) ? date : moment(date)
      }
      const sortMasterList = (list) => {
        return list.sort((a, b) => {
          const aStartMoment = checkMoment(a[START_DATE_KEY])
          const bStartMoment = checkMoment(b[START_DATE_KEY])
          const aEndMoment = checkMoment(a[END_DATE_KEY])
          const bEndMoment = checkMoment(b[END_DATE_KEY])
          if (aStartMoment.isSame(bStartMoment, PRECISION)) {
            if (aEndMoment.isBefore(bEndMoment, PRECISION)) {
              return -1
            }
            if (aEndMoment.isSame(bEndMoment, PRECISION)) {
              return 0
            }
            return 1
          }
          if (aStartMoment.isBefore(bStartMoment, PRECISION)) {
            return -1
          }
          return 1
        })
      }

      const sortedMasterList = sortMasterList(masterList)
      const min = sortedMasterList[0][START_DATE_KEY]
      const max = sortedMasterList.at(-1)[END_DATE_KEY]

      let hasDateGap = false
      sortedMasterList.forEach((item, index) => {
        const startMoment = checkMoment(item[START_DATE_KEY])
        const endMoment = checkMoment(item[END_DATE_KEY])
        const dur = moment.duration(1, 'days')
        const startCheck = startMoment.isSame(min, PRECISION) ? startMoment : moment(startMoment).subtract(dur)
        const endCheck = endMoment.isSame(max, PRECISION) ? endMoment : moment(endMoment).add(dur)
        let startBreakCheck = false
        let endBreakCheck = false
        sortedMasterList.forEach((itemBreakCheck, startFindIndex) => {
          if (index === startFindIndex) return
          if (startBreakCheck && endBreakCheck) return
          if (startMoment.isBetween(checkMoment(itemBreakCheck[START_DATE_KEY]), checkMoment(itemBreakCheck[END_DATE_KEY]), PRECISION) &&
            endMoment.isBetween(checkMoment(itemBreakCheck[START_DATE_KEY]), checkMoment(itemBreakCheck[END_DATE_KEY]), PRECISION)) {
            startBreakCheck = true
            endBreakCheck = true
          }
          if (checkMoment(itemBreakCheck[END_DATE_KEY]).isBetween(startCheck, endCheck, PRECISION, '[]') || startCheck.isSame(min, PRECISION)) {
            startBreakCheck = true
          }
          if (checkMoment(itemBreakCheck[START_DATE_KEY]).isBetween(startCheck, endCheck, PRECISION, '[]') || endCheck.isSame(max, PRECISION)) {
            endBreakCheck = true
          }
        })
        if (!startBreakCheck || !endBreakCheck) hasDateGap = true
      })

      if (hasDateGap) this.openPopupDialog({ mode: 3, messageCode: 'C00215.E020' })
    },
    masterDataQuery (url, requestPayload, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.getApiHeader()
        ).then((response) => {
          if (response.data.result.code === 0) {
            // 0:正常
            if (successCallback) {
              successCallback(response.data.responseModel)
            }
            resolve(response)
          } else if (response.data.result.code === 2) {
            // 2:該当する情報なし
            resolve(response)
          } else {
            this.globalErrorMapping(response.data.result)
            reject(response.data.result)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    masterDataUpdate (url, requestPayload, queryParams, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.post(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then((response) => {
          if (response.data.result.code === 0) {
            if (successCallback) {
              successCallback(response.data.responseModel)
            }
            resolve(response)
          } else {
            this.globalErrorMapping(response.data.result)
            reject(response.data.result)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    masterDataDelete (url, requestPayload, queryParams, successCallback) {
      return new Promise(async (resolve, reject) => {
        await axios.put(
          `${this.$i18n.t('prop.url')}${url}`,
          requestPayload,
          commonUtils.methods.addApiHeader({
            params: queryParams
          })
        ).then((response) => {
          if (response.data.result.code === 0) {
            if (successCallback) {
              successCallback(response.data.responseModel)
            }
            resolve(response)
          } else {
            this.globalErrorMapping(response.data.result)
            reject(response.data.result)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getUploadedFile (data) {
      this.uploadedFile = data.uploadedFile
    },
    renameImageFile () {
      return `RoomCourse${this.selectedDataModel.course.chargeCode}_image.png`
    },
    async uploadImage (fileName) {
      const uploadedFile = this.uploadedFile ? this.uploadedFile : ''
      const targetFile = new File([uploadedFile], fileName, { type: uploadedFile.type })
      if (!fileName) return
      try {
        const response1 = await this.createS3BucketFolder('koshidaka', this.companyCode, this.storeCode)
        if (response1.result.code !== 0) {
          this.globalErrorMapping2(response1.result)
          return false
        } else {
          await this.captureS3BucketFile('koshidaka', this.companyCode, this.storeCode, fileName, targetFile)
            .then(() => {
              this.isCapturedFile = true
            }, (error) => {
              throw error
            })
        }
      } catch (err) {
        this.globalErrorMapping2(err.data.result)
        return false
      }
    },
    async deleteImageFile (fileName) {
      if (!fileName) return
      try {
        await this.deleteS3BucketFile('koshidaka', this.companyCode, this.storeCode, fileName)
          .then(() => {
            return true
          }, (error) => {
            console.log(error)
            throw error
          })
      } catch (err) {
        this.globalErrorMapping2(err.data.result)
        return false
      }
    },
    async openPopupDialog ({
      mode = 1,
      title = '',
      messageCode = null,
      message = null,
      code = '',
      showBackBtn = false,
      okBtnCallback = null,
      isNonDispStatus = false,
      backBtnCallback = null
    } = {}) {
      if (messageCode !== null && message === null) {
        message = this.$i18n.t(messageCode)
      }
      await this.$refs.pop.open(mode, title, message, code, showBackBtn, okBtnCallback, isNonDispStatus, backBtnCallback)
    },
    closePopupDialog () {
      this.$refs.pop.closeFunction()
    },
    handleListSelectionChanged (selectedDataModel) {
      // コース一覧にてコースを選択状態とした場合
      const result = JSON.parse(JSON.stringify(selectedDataModel))
      const selectedData = {
        ...result,
        course: {
          ...result.course
        }
      }
      this.selectedDataModel = selectedData
      // コース一覧を無効化状態、コース設定項目欄を有効化状態とする
      this.isCourseMasterSettingFormEnabled = true
      this.isCourseMasterSettingFormCreateMode = this.selectedDataModel.isCreate
    },
    handleCloseMaintButton () {
      this.$router.push('/TopPage')
    },
    async handleFixedMaintButton () {
      // CS KSD V001.000 #84015
      // let formFields = this.$refs.courseMasterSettingForm.$children
      // // 保存ボタン押下時
      // const inputCheck = this.inputCheck()
      // // 屋設定項目欄に未入力の項目がある場合
      // if (inputCheck !== true) {
      //   await this.openPopupDialog({
      //     mode: 3,
      //     code: '-0099',
      //     messageCode: 'O00004.W006',
      //     okBtnCallback: () => {
      //       formFields.find((x) => { if (x.hasError) return setTimeout(() => { x.$el.querySelector(".has-error").querySelectorAll('button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')[0].focus() }, 100) })
      //     }
      //   })
      // } else {
      //   await this.updateMasterData()
      // }
      const checkSession = 'CommonDesign/Header'
      axios.get(this.$i18n.t('prop.url') + checkSession + '?_=dateTime_=' + Date.now(), commonUtils.methods.getApiHeader())
      .then(async response => {
        const sessionResult = response.data.result
        if (sessionResult.code !== 0) {
          this.$refs.pop.open(2, '', this.$i18n.t('O00004.W008'), sessionResult.code, false, () => {
            this.$router.push('/LoginPage')
          }, false, null)
        } else {
          let formFields = this.$refs.courseMasterSettingForm.$children
          // 保存ボタン押下時
          const inputCheck = this.inputCheck()
          // 屋設定項目欄に未入力の項目がある場合
          if (inputCheck !== true) {
            await this.openPopupDialog({
              mode: 3,
              code: '-0099',
              messageCode: 'O00004.W006',
              okBtnCallback: () => {
                formFields.find((x) => { if (x.hasError) return setTimeout(() => { x.$el.querySelector(".has-error").querySelectorAll('button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')[0].focus() }, 100) })
              }
            })
          } else {
            await this.updateMasterData()
          }

        }
      })
      .catch(error => {
        console.log(error)
        this.$refs.pop.open(3, '', this.$i18n.t('O00004.W010'), '', false, null, false, null)
      })
      // CE KSD V001.000 #84015
    },
    handleStopMaintButton () {
      // 中止ボタン押下時
      // 破棄確認画面を表示する
      this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W003',
        showBackBtn: true,
        okBtnCallback: () => {
          // 棄確認画面で「OK」を選択した場合
          this.resetForm()
        }
      })
    },
    handleDelMaintButton () {
      // 削除ボタン押下時
      // 削除確認画面を表示する
      this.openPopupDialog({
        mode: 1,
        messageCode: 'O00004.W005',
        showBackBtn: true,
        okBtnCallback: async () => {
          // 削除確認画面で「OK」を選択した場合
          await this.deleteMasterData()
        }
      })
    },
    confirmUnload (event) {
      if (this.isCourseMasterSettingFormEnabled) {
        event.returnValue = ''
      }
    }
  },
  watch: {
    targetStoreCodes: async function (storeCodes) {
      // 対象店舗が変わる場合、初期化する
      this.courseMasterList = []
      this.selectedIndexNo = []
      this.selectedDataModel = null
      this.isCourseMasterSettingListEnabled = false
      this.isCourseMasterSettingFormEnabled = false
      this.isCourseMasterSettingFormCreateMode = false
      if (this.targetStoreCodes[0]) await this.initializeCourseMasterList()
    }
  },
  created () {
    this.$root.winId = 'C00208'
    document.title = this.$root.title = this.$route.meta.title
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  },
  async mounted () {
    await this.$nextTick()
    await this.initialize()
    let authority = this.$refs.storeSelect.headquartersAuthorityCheckEnable
    setTimeout(() => {
      if (authority) {
        document.getElementsByClassName('rightArrowButton')[0].focus()
      }
    }, 100)
  }
}
// KSD V001.000 AE
