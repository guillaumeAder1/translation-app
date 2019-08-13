
// flatten obj and use placeholder value if keys are undefined
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
// clean and re-arrange data structure,
// and try to map to component props
export const formatObject = (obj, toLang) => {
  normalizeObj(obj, toLang)
  // find correct keys and filename values... 
  const _key = findKeyValue(obj, 'key')
  const _file = findKeyValue(obj, 'file')
  const validTranslation = flattenTranslation(obj, _key, _file) 
  const newObj = {
    key: _key, // use for display and filtering
    filename: _file, // can be used for filtering, optional...
    missTranslation: hasTranslationMissing(validTranslation), // helper for filtering, optional
    translations: validTranslation // used for component
  }
  return newObj
}
// fetch value of specified Key whithin Obj
const findKeyValue = (obj, key) => {
  const values = Object.keys(obj).filter(element => {
    return obj[element] && obj[element][key] != null
  })
  return (values.length && obj[values[0]][key]) || ''
}
// check if one value field is empty string
const hasTranslationMissing = (obj) => {
  const valueIsEmpty = Object.keys(obj).filter(element => obj[element].value === '').length
  return !!valueIsEmpty
}
