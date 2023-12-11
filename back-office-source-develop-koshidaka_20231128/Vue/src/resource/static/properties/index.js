import jp from './language_ja.json'
import prop from './properties.json'

var data = mergeDeeply(prop, jp)

function mergeDeeply (target, source, opts) {
  const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj)
  const isConcatArray = opts && opts.concatArray
  let result = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    for (const [sourceKey, sourceValue] of Object.entries(source)) {
      const targetValue = target[sourceKey]
      if (isConcatArray && Array.isArray(sourceValue) && Array.isArray(targetValue)) {
        result[sourceKey] = targetValue.concat(...sourceValue)
      } else if (isObject(sourceValue) && target.hasOwnProperty(sourceKey)) {
        result[sourceKey] = mergeDeeply(targetValue, sourceValue, opts)
      } else {
        Object.assign(result, {[sourceKey]: sourceValue})
      }
    }
  }
  return result
}

export { data }
