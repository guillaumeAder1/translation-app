
const t = {
  "en": {
    "key": "attendance.markteachinggroup.saveforothersessions",
    "value": "",
    "file": "messages_en.properties",
    "id": 41405
  },
  "no": {
    "key": "attendance.markteachinggroup.saveforothersessions",
    "value": "Klassen har flere timer idag. Vil du føre fravær for disse også?",
    "file": "messages_no.properties",
    "id": 65878
  }
}

const t2 = {
  "en": {},
  "ga": {
    "key": "common.go",
    "value": "go",
    "file": "messages_en.properties",
    "id": 6816105
  }
}

const t3 = {
  "en": {
    "key": "0",
    "value": "dc test pop remove",
    "file": "messages_en.properties",
    "id": 6855413
  }
}

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
export const formatObject = (obj, toLang) => {
  normalizeObj(obj, toLang)
  // find correct keys and filename values... 
  const _key = findKeyValue(obj, 'key')
  const _file = findKeyValue(obj, 'file')
  const validObject = flattenTranslation(obj, _key, _file) 
  const newObj = {
    key: _key, // use for display and filtering
    filename: _file, // can be used for filtering, optional...
    missTranslation: hasTranslationMissing(validObject), // helper for filtering, optional
    translations: validObject // used for component
  }
  return newObj
}

const findKeyValue = (obj, key) => {
  const values = Object.keys(obj).filter(element => {
    return obj[element] && obj[element][key] != null
  })
  return (values.length && obj[values[0]][key]) || ''
}

const hasTranslationMissing = (obj) => {
  const valueIsEmpty = Object.keys(obj).filter(element => obj[element].value === '').length
  return !!valueIsEmpty
}

formatObject(t3, 'no')

hasTranslationMissing(t3)

/**
 * TODO
 * handle en to en transaltion
 * verify only one key in obj
 * en key is missing in obj...
 * 
 */