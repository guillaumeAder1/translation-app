
/**
 * here is a list of helper functions, 
 * the goal is to format thw raw data received form the API
 * I tried to transform so the components won't have to manipulate 
 * the data in the future, and the outpu object could be used as props in its new shape
 */
/**
 * clean and re-arrange data structure,
 * to be mapped to component props
 * @param {Object} obj raw data from backend
 * @param {String} toLang language selected
 * @return Object
 */
export const formatObject = (obj, toLang) => {
  normalizeObj(obj, toLang)
  const _key = findKeyValue(obj, 'key')
  const _file = findKeyValue(obj, 'file')
  const validTranslation = flattenTranslation(obj, _key, _file) 
  const newObj = {
    key: _key, // String, used for display and filtering
    filename: _file, // String, can be used for filtering, optional
    missTranslation: hasTranslationMissing(validTranslation), // Boolean, helper for filtering, optional
    translations: validTranslation // used for component, Array
  }
  return newObj
}

// make sure object received has correct structure and key not missing 'keys'
// also need to handle 'en' edge case (only one key expected)
const normalizeObj = (obj, lang) => {
  const list = lang === 'en' ? ['en'] : ['en', lang]
  for (let i in list) {
    if (!obj.hasOwnProperty(list[i])){
      obj[list[i]] = {
        key: '',
        value: '',
        filename: '',
        language: list[i]
      }
    }
  }
}

// flatten obj in an Array and use placeholder value if keys are undefined
// I did not include the ID field, since we don't need it for the POST request
const flattenTranslation = (obj, key, file) => {
  const asArray = Object.keys(obj)
  const flatten = asArray.map(lang => {
    return {
      key: obj[lang].key || key,
      value: obj[lang].value || '',
      filename: file.replace(/_en.|_no.|_ga./, `_${lang}.`), // force correct filename
      language: lang
    }
  })
  return flatten
}

// fetch String value of specified Key whithin Obj
const findKeyValue = (obj, key) => {
  const values = Object.keys(obj).filter(element => {
    return obj[element] && obj[element][key] != null
  })
  return (values.length && obj[values[0]][key]) || ''
}
// check if one value field is empty string return as Boolean
const hasTranslationMissing = (obj) => {
  const valueIsEmpty = Object.keys(obj).filter(element => obj[element].value === '').length
  return !!valueIsEmpty
}
