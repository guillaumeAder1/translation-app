
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
// const isTranslationMissing = (obj) => {
//   const lang = []
//   const asArray = Object.keys(obj)
//   for (var i in asArray) {
//     lang.push(
//       {
//         key: obj[asArray[i]].key,
//         value: obj[asArray[i]].value,
//         file: obj[asArray[i]].file,
//         id: obj[asArray[i]].id
//       }
//     )
//   }
//   return lang
// }

const flattenTranslation = (obj) => {
  const asArray = Object.keys(obj)
  const flatten = asArray.map(value => {
    return {
      ...obj[value],
      language: value
    }
  })
  return flatten
}

export const formatObject = (obj) => {
  const asArray = Object.keys(obj)
  const newObj = {
    key: obj[asArray[0]].key,
    filename: obj[asArray[0]].file.replace(/_en.|_no.|_ga./, '(0)'),
    missTranslation: hasTranslationMissing(obj),
    translations: flattenTranslation(obj)
  }
  return newObj
}



const hasTranslationMissing = (obj) => {
  const missingKey = Object.keys(obj).length !== 2 
  const valueIsEmpty = Object.keys(obj).filter(element => obj[element].value === "").length
  const missing = !!missingKey || !!valueIsEmpty
  return missing
}

// console.log(formatObject(t))
