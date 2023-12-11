/* KSD V001.000 AS */
import axios from 'axios'
import popup from '@/resource/templates/CommonDesign/Popup'
import FileInput from '@/resource/templates/CommonInput/FileInput'
import s3bucketUtils from '@/resource/static/js/Common/s3bucketUtils.js'
import { inputLimitation } from '../../js/Common/jsUtils'
import errorMappingUtils from '../Common/errorMappingUtils'
import validationUtils from '../Common/validationUtils'

export default {
  mixins: [s3bucketUtils, errorMappingUtils, validationUtils],
  props: {
    tableHeaderTitle: {
      type: String,
      required: false,
      default: ''
    },
    nodeIds: {
      type: Array,
      default: null
    }
  },
  components: {
    popup,
    axios,
    FileInput
  },
  data () {
    return {
      dialog: false,
      courseData: null,
      chargeCode: null,
      uploadedImageUrl: null,
      uploadedFile: null,
      courseImageFiletName: '',
      model: {
        courseExplanatory1: '',
        courseExplanatory2: '',
        courseExplanatory3: ''
      },
      companyCode: '',
      storeCode: '',
      newName: ''
    }
  },
  computed: {
    isSaveBtnDisabled() {
      if (this.model.courseExplanatory1 !== '' || this.model.courseExplanatory2 !== '' || this.model.courseExplanatory3 !== '') {
        if (this.uploadedImageUrl !== null) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
  },
  methods: {
    open (courseData, indexNo, uploadedFile) {
      this.courseData = { ...courseData }
      this.courseImageFiletName = courseData.courseImageFiletName != null ? courseData.courseImageFiletName : ''
      this.model.courseExplanatory1 = courseData.courseExplanatory1 != null ? courseData.courseExplanatory1 : ''
      this.model.courseExplanatory2 = courseData.courseExplanatory2 != null ? courseData.courseExplanatory2 : ''
      this.model.courseExplanatory3 = courseData.courseExplanatory3  != null ? courseData.courseExplanatory3 : ''
      if (indexNo !== this.chargeCode) {
        this.uploadedImageUrl = null
      }
      this.chargeCode = indexNo
      this.companyCode = this.nodeIds[0].substring(0, 15)
      this.storeCode = this.nodeIds[0].substring(15)
      this.dialog = true
      this.newName = this.courseImageFiletName
      this.uploadedImageUrl = null
      this.previewImage([this.courseImageFiletName], uploadedFile)
      this.setFocus()
    },
    close () {
      this.model.courseExplanatory1 = ''
      this.model.courseExplanatory2 = ''
      this.model.courseExplanatory3 = ''
      this.courseImageFiletName = ''
      this.newName = ''
    },
    async backFunction () {
      await this.close()
      this.dialog = false
    },
    exeFunction () {
      this.model.courseExplanatory1 = this.$refs.text1.value
      this.model.courseExplanatory2 = this.$refs.text2.value
      this.model.courseExplanatory3 = this.$refs.text3.value
      this.$emit('dataImage', { courseExplanatory1: this.model.courseExplanatory1,
        courseExplanatory2: this.model.courseExplanatory2,
        courseExplanatory3: this.model.courseExplanatory3,
        courseImageFiletName: this.courseImageFiletName,
        uploadedFile: this.uploadedFile
       })
      this.dialog = false
    },
    inputLimit (e, limit, inputObject, inputVariable) {
      return inputLimitation(e, limit, inputObject, inputVariable)
    },
    async handleImageUpload (event) {
      const uploadedFile = event.target.files[0] ? event.target.files[0] : 'cancel'
      const validate = validationUtils.methods
      if (validate.imageUploadSizeLimit(uploadedFile)) {
        this.$refs.pop.open(3, '', this.$i18n.t('C00215.E014'), -99, false, () => {return}, false, null)
        event.target.value = ''
        return
      }
      if (validate.fileUploadType(uploadedFile) && uploadedFile !== 'cancel') {
        this.$refs.pop.open(3, '', this.$i18n.t('C00215.E013'), -99, false, () => {return}, false, null)
        event.target.value = ''
        return
      }
      if (uploadedFile === 'cancel') {
        this.backFunction
      }
      this.uploadedFile = uploadedFile
      this.uploadedImageUrl = URL.createObjectURL(uploadedFile)
    },
    async previewImage (targetS3BucketFiles, uploadedFile) {
      if (uploadedFile != null) {
        this.uploadedImageUrl = URL.createObjectURL(uploadedFile)
      } else if (targetS3BucketFiles != null && targetS3BucketFiles.length > 0 && this.courseImageFiletName !== '') {
        try { 
          const response = await this.getS3BucketFiles('koshidaka', this.companyCode, this.storeCode, targetS3BucketFiles)
          if (response != null &&
            response.result != null &&
            response.result.code === 0 &&
            response.responseModel != null &&
            response.responseModel.length > 0) {
            const foundFile = response.responseModel.find(x => x.fileName === this.newName)
            if (foundFile != null) {
              this.uploadedImageUrl = foundFile.signedUrl
            }
          } else {
            this.globalErrorMapping(response.result)
          }
        } catch (err) {
          if (err.data == null) {
            this.openPopupDialog({
              mode: 3,
              message: this.$i18n.t('O00004.W010'),
              code: ''
            })
          } else {
            this.globalErrorMapping(err.data.result)
          }
          return false
        }
      }
    },
    setFocus () {
      setTimeout(() => {
        document.getElementById('text1').focus()
      }, 50)
    }
  }
}
/* KSD V001.000 AE */
