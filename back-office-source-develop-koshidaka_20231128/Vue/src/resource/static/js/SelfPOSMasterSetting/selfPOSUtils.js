// KSD V001.000 AS
function processSettings (settingsArray, response, initialValue) {
  return settingsArray.reduce((obj, fileName) => {
    const foundItem = response.responseModel.find(fileItem => {
      return fileItem.fileName === fileName
    })
    return {
      ...obj,
      [fileName]: foundItem != null ? foundItem.signedUrl : null
    }
  }, initialValue)
}

function loadFileModels (targetModel, fileMap, s3BucketBaseFileMap, s3BucketFileMap) {
  const fileModel = {}
  const fileModelCommon = {}
  const fileModelIndividual = {}
  let hasFileAuthenticatedUrl = false
  let hasFileAuthenticatedUrlCommon = false
  let hasFileAuthenticatedUrlIndividual = false

  for (const key of Object.keys(targetModel)) {
    const filename = targetModel[key]
    let authenticatedUrl = null
    let authenticatedUrlCommon = null
    let authenticatedUrlIndividual = null

    if (filename != null && filename.length !== 0 && fileMap != null) {
      if (filename in fileMap) {
        authenticatedUrl = fileMap[filename]
        hasFileAuthenticatedUrl = true
      }
      if (s3BucketBaseFileMap != null && filename in s3BucketBaseFileMap) {
        authenticatedUrlCommon = s3BucketBaseFileMap[filename]
        hasFileAuthenticatedUrlCommon = true
      }
      if (s3BucketFileMap != null && filename in s3BucketFileMap) {
        authenticatedUrlIndividual = s3BucketFileMap[filename]
        hasFileAuthenticatedUrlIndividual = true
      }
    }
    fileModel[key] = {
      filename: filename,
      authenticatedUrl: authenticatedUrl,
      uploadedFileObj: null,
      uploadedFileDataUri: null
    }
    fileModelCommon[key] = {
      filename: filename,
      authenticatedUrl: authenticatedUrlCommon,
      uploadedFileObj: null,
      uploadedFileDataUri: null
    }
    fileModelIndividual[key] = {
      filename: filename,
      authenticatedUrl: authenticatedUrlIndividual,
      uploadedFileObj: null,
      uploadedFileDataUri: null
    }
  }
  return { fileModel, fileModelCommon, fileModelIndividual, hasFileAuthenticatedUrl, hasFileAuthenticatedUrlCommon, hasFileAuthenticatedUrlIndividual }
}

function loadFileStatus (dataConfig, fileMap, fileStatusArray, fileExists, s3getFileFlag) {
  Object.values(dataConfig).forEach((file, index) => {
    if (file == null || file === '') {
      fileStatusArray[index] = false
    } else {
      const fileFind = Object.keys(fileMap).find(s3file => s3file === file)
      fileStatusArray[index] = fileFind === undefined ||
        fileMap[fileFind] === null ||
        fileMap[fileFind] === '' ||
        fileExists[fileFind] === 0 ||
        s3getFileFlag
    }
  })
}

function loadFileSelection (model) {
  return Object.entries(model)
    .filter(([key, value]) => value.authenticatedUrl !== null)
    .map(([key, value]) => ({
      name: value.filename,
      value: key
    }))
}

function getFileStatus (fileModel, e, isDel) {
  if (fileModel != null) {
    if (isDel) {
      return e.t('C00222.S069')
    }
    if (fileModel.uploadedFileObj != null && fileModel.uploadedFileDataUri != null) {
      return e.t('C00222.S071')
    } else if (fileModel.authenticatedUrl != null) {
      return e.t('C00222.S070')
    } else {
      return e.t('C00222.S069')
    }
  }
  return null
}

function handleFileUpload (refs, event, fileId, fileModel, fileStatusArray, fileName, forceUpdateCallback, isCusPage) {
  const uploadedFile = event.target.files[0]
  const filename = uploadedFile.name
  const x = filename.split('.').pop()
  const y = fileName
  const uploadedFilename = `${y}.${x}`
  const uploadedFileObj = new File([uploadedFile], uploadedFilename, {
    type: uploadedFile.type
  })
  const reader = new FileReader()

  reader.onload = () => {
    const keys = Object.keys(fileModel)
    const targetProp = keys[fileId - 1]
    const targetFileModel = fileModel[targetProp]
    targetFileModel.filename = uploadedFilename
    targetFileModel.uploadedFileObj = uploadedFileObj
    targetFileModel.uploadedFileDataUri = reader.result
    isCusPage ? refs.customerFilePreviewPanel.$forceUpdate() : refs.previewPanel.$forceUpdate()
    if (forceUpdateCallback) {
      forceUpdateCallback.call(this)
    }
  }
  reader.readAsDataURL(uploadedFileObj)
  fileStatusArray[fileId - 1] = false
}

function formatSettingConfig (isCommon, isIndividual, source, sourceCommon, sourceIndividual) {
  const formattedSetting = {}
  let config = null
  if (isCommon && !isIndividual) {
    config = { ...sourceCommon }
  } else if (!isCommon && isIndividual) {
    config = { ...sourceIndividual }
  } else if (isCommon && isIndividual) {
    config = merge(sourceCommon, sourceIndividual)
  } else {
    config = { ...source }
  }

  for (const key of Object.keys(config)) {
    formattedSetting[key] = config[key].filename
  }
  return formattedSetting
}

function removeDelFiles (customerFileSettingConfig, deleteFiles) {
  for (const key in customerFileSettingConfig) {
    if (deleteFiles.includes(key)) {
      customerFileSettingConfig[key] = ''
    }
  }
  return customerFileSettingConfig
}

function convertToInteger (obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'string' && obj[key] !== null && obj[key] !== '') {
      obj[key] = parseInt(obj[key])
    }
  }
  return obj
}

function merge (destination, source) {
  const merged = { ...destination }
  Object.keys(source).forEach((key) => {
    if (!merged[key]) {
      merged[key] = source[key]
    } else if (typeof source[key] === 'object' &&
      source[key] !== null &&
      typeof merged[key] === 'object' &&
      merged[key] !== null) {
      merged[key] = merge(merged[key], source[key])
    }
  })
  return merged
}

export {
  processSettings,
  loadFileModels,
  loadFileStatus,
  loadFileSelection,
  getFileStatus,
  handleFileUpload,
  formatSettingConfig,
  removeDelFiles,
  convertToInteger,
  merge
}

// KSD V001.000 AE
