const obj = {
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

const getFileValue = (item) => {
  const vals = Object.keys(item).map(element => item[element].file)
  return vals[0] && vals[0].replace(/_en.|_no.|_ga./, '(0)')
}

// const t = getFileValue(obj)
// console.log(t)

const isMissing = (item) => {
  let index = -1;
  for(let i in item) {
    console.log(item[i], i )
    item[i].value === '' && (index = i)
  }
}

const t = isMissing(obj)