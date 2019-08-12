
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

const flattenTranslation = (obj) => {
  const asArray = Object.keys(obj)

  const flatten = asArray.map(value => {
    return {
      // ...obj[value],
      key: obj[value].key || '',
      value: obj[value].value || '',
      filename: obj[value].file || '',
      language: value || ''
    }
  })
  return flatten
}

const formatObject = (obj, toLang) => {
  // handle edge case where only one key
  // need to handle when 'en' key is missing
  if (!obj.hasOwnProperty(toLang)) {
    obj[toLang] = {}
  }
  const _key = findKeyValue(obj, 'key')
  const _file = findKeyValue(obj, 'file')
  const newObj = {
    key: _key,
    filename: _file.replace(/_en.|_no.|_ga./, '(0)'), // can be used as a template string if one 'file' field is missing...
    missTranslation: hasTranslationMissing(obj),
    translations: flattenTranslation(obj)
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
  const missingKey = Object.keys(obj).length !== 2 
  const valueIsEmpty = Object.keys(obj).filter(element => obj[element].value).length
  const missing = !!missingKey || !!valueIsEmpty
  return missing
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