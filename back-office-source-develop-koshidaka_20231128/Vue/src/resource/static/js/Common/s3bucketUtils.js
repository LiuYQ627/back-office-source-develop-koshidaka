// KSD V001.000 AS
import axios from 'axios'
import commonUtils from '../Common/commonUtils'
import { createHash } from 'crypto'

const S3BUCKET_GETFILE_URL = 'S3bucket/GetFile'
const S3BUCKET_CAPTUREFILE_URL = 'S3bucket/CaptureFile'
const S3BUCKET_DELETEFILE_URL = 'S3bucket/DeleteFile'
const S3BUCKET_CREATEFOLDER_URL = 'S3bucket/CreateFolder'
const S3BUCKET_DELETEFOLDER_URL = 'S3bucket/DeleteFolder'

const s3bucketUtils = {
  methods: {
    // S3ファイル取得
    getS3BucketFiles (bucket, companyCode, storeCode, fileNames, apicaller = "callbo") {
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${S3BUCKET_GETFILE_URL}`,
          {
            bucket,
            companyCode,
            storeCode,
            apicaller
          },
          commonUtils.methods.addApiHeader({})
        ).then((response) => {
          if (response &&
            response.data &&
            response.data.result &&
            (response.data.result.code === 0 ||
            response.data.result.code === 2)) {
            resolve({
              ...response.data,
              responseModel: response.data.responseModel.filter(x => x.exists === 1)
            })
          } else {
            reject(response)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // S3ファイル登録
    async captureS3BucketFile (bucket, companyCode, storeCode, fileName, fileData, apicaller = "callbo") {
      const form = new FormData()
      form.append('bucket', bucket)
      form.append('companyCode', companyCode)
      form.append('storeCode', storeCode)
      form.append('fileName', fileName)
      form.append('apicaller', apicaller)
      form.append('fileHash', await this.getMd5Hash(fileData))
      form.append('fileContent', await this.getBase64(fileData))
// KSD V001.000 20230822 AS
      form.append('file', fileData)
// KSD V001.000 20230822 AE
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${S3BUCKET_CAPTUREFILE_URL}`,
          form,
          commonUtils.methods.addApiHeader({})
        ).then((response) => {
          if (response.data.result.code === 0) {
            resolve(response.data)
          } else {
            reject(response)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // S3ファイル削除
// KSD V001.000 202300904 DS 引数の修正("fileName"⇒"fileNames")
//    deleteS3BucketFile (bucket, companyCode, storeCode, fileName, apicaller = "callbo") {
// KSD V001.000 202300904 DE 引数の修正("fileName"⇒"fileNames")
// KSD V001.000 202300904 AS 引数の修正("fileName"⇒"fileNames")
    deleteS3BucketFile (bucket, companyCode, storeCode, fileNames, apicaller = "callbo") {
// KSD V001.000 202300904 AE 引数の修正("fileName"⇒"fileNames")
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${S3BUCKET_DELETEFILE_URL}`,
          {
            bucket,
            companyCode,
            storeCode,
// KSD V001.000 20230822 DS
//            fileName,
// KSD V001.000 20230822 DE
// KSD V001.000 20230822 AS
            fileNames,
// KSD V001.000 20230822 AE
            apicaller
          },
          commonUtils.methods.addApiHeader({})
        ).then((response) => {
          if (response.data.result.code === 0) {
            resolve(response.data)
          } else {
            reject(response)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // S3フォルダ作成
    createS3BucketFolder (bucket, companyCode, storeCode, apicaller = "callbo") {
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${S3BUCKET_CREATEFOLDER_URL}`,
          {
            bucket,
            companyCode,
            storeCode,
            apicaller
          },
          commonUtils.methods.addApiHeader({})
        ).then((response) => {
          if (response.data.result.code === 0) {
            resolve(response.data)
          } else {
            reject(response)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // S3フォルダ削除
    deleteS3BucketFolder (bucket, companyCode, storeCode) {
      return new Promise((resolve, reject) => {
        axios.post(
          `${this.$i18n.t('prop.url')}${S3BUCKET_DELETEFOLDER_URL}`,
          {
            bucket,
            companyCode,
            storeCode
          },
          commonUtils.methods.addApiHeader({})
        ).then((response) => {
          if (response.data.result.code === 0) {
            resolve(response.data)
          } else {
            reject(response)
          }
        }, (err) => {
          reject(err)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    async getBase64 (fileData) {
      const reader = new FileReader()
      reader.readAsDataURL(fileData)
      await new Promise(resolve => reader.onload = function(){ resolve() })
      return reader.result
    },
    async getMd5Hash (fileData) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const fileData = e.target.result
          const buffer = Buffer.from(fileData)
          const hashFunc = createHash('md5')
          hashFunc.update(buffer)
          const hash = hashFunc.digest('hex')
          resolve(hash)
        }
        reader.readAsArrayBuffer(fileData)
      })
    }
  }
}

export default s3bucketUtils
// KSD V001.000 AE
