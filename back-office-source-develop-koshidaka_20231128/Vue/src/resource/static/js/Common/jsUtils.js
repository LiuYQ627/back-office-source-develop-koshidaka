// KSD V001.000 AS
function convertCode (code) {
  return code.length ? code.substr(code.length - 6) : ''
}

function inputLimitation (e, maxLength, inputObject, inputVariable) {
  let { value } = e.target
  const strLen = value.toString().length
  let byteLen = 0
  for (let i = 0; i < strLen; i++) {
    const codeUnitNo = value.charCodeAt(i)
    if ((codeUnitNo >= 0x0 && codeUnitNo < 0x81) || (codeUnitNo === 0xf8f0) ||
      (codeUnitNo >= 0xff61 && codeUnitNo < 0xffa0) || (codeUnitNo >= 0xf8f1 && codeUnitNo < 0xf8f4)) {
      byteLen += 1
    } else {
      byteLen += 2
    }
    if (byteLen > maxLength) {
      if (inputObject[inputVariable] == value.toString()) {
        inputObject[inputVariable] = value.toString().substring(0, i)
      }
      break
    }
  }
}

function inputNumberLimitation (e, inputObject, inputVariable, limit = 3) {
  let { value } = e.target
  const strLen = value.toString().length
  if (strLen) {
    inputObject[inputVariable] = strLen ? value.replace(/[^0-9]/g, '') : 0
  } else {
    inputObject[inputVariable] = e.inputType === 'deleteContentBackward' ? '' : 0
  }
  if (strLen > limit) {
    inputObject[inputVariable] = value.slice(0, limit)
  }
}

function posReportDataLimit (data, hasTotal, limit = 300) {
  if (data == null) {
    return data
  }
  let dataCopy = JSON.parse(JSON.stringify(data))
  dataCopy.aggregateData = []
  if (Array.isArray(data.aggregateData) && data.aggregateData.length > 0) {
    let newAggregateData = []
    let recordCount = 0
    data.aggregateData.forEach(store => {
      let canOutputStoreTable = false
      if (store == null) {
        return
      }
      let storeCopy = JSON.parse(JSON.stringify(store))
      storeCopy.endpoints = []
      if (Array.isArray(store.endpoints) && store.endpoints.length > 0) {
        let newEndpoints = []
        store.endpoints.forEach(endpoint => {
          if (recordCount < limit) {
            recordCount++ // outputs header row
          } else {
            return
          }
          if (hasTotal) {
            if (recordCount < limit) {
              recordCount++ // outputs total row
            } else {
              recordCount-- // remove header row output
              return
            }
          }
          canOutputStoreTable |= true
          let endpointCopy = JSON.parse(JSON.stringify(endpoint))
          if (endpointCopy.data && Array.isArray(endpointCopy.data) && endpointCopy.data.length > 0) {
            let newDataItems = []
            endpointCopy.data.forEach(dataItem => {
              let dataItemCopy = JSON.parse(JSON.stringify(dataItem))
              if (dataItemCopy.terms && Array.isArray(dataItemCopy.terms) && dataItemCopy.terms.length > 0) {
                if (recordCount < limit) {
                  recordCount++ // outputs subheader row
                } else {
                  return
                }
                if (recordCount < limit) {
                  recordCount++ // outputs subtotal row
                } else {
                  recordCount-- // remove subheader row output
                  return
                }
                let newDataItemTerms = []
                dataItemCopy.terms.forEach(dataItemTerm => {
                  const dataItemTermCopy = JSON.parse(JSON.stringify(dataItemTerm))
                  if (recordCount < limit) {
                    newDataItemTerms.push(dataItemTermCopy)
                    recordCount++ // outputs data terms row
                  }
                })
                dataItemCopy.terms = newDataItemTerms
                newDataItems.push(dataItemCopy)
              } else {
                if (recordCount < limit) {
                  newDataItems.push(dataItemCopy)
                  recordCount++ // outputs data row
                }
              }
            })
            endpointCopy.data = newDataItems
          }
          newEndpoints.push(endpointCopy)
        })
        storeCopy.endpoints = newEndpoints
      }
      if (canOutputStoreTable) {
        newAggregateData.push(storeCopy)
      }
    })
    dataCopy.aggregateData = newAggregateData
  }
  return dataCopy
}

function posGenerateDisplayType (data, e) {
  const opts = {
    0: () => e.t('F32231.S782'), // '日別',
    1: () => e.t('F32231.S783'), // '月別',
    2: () => e.t('F32231.S784') // '年別'
  }
  return opts[data]() || ''
}

export {
  convertCode, inputLimitation,
  inputNumberLimitation, posGenerateDisplayType, posReportDataLimit
}
// KSD V001.000 AE
