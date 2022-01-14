function resolveType (value) {
  if (value.match(/^\[*.+\]$/)) {
    let arrayString = value.replace(/^\[(.+)\]$/, '$1')
    let array = arrayString.split(',')

    array = array.map(item => resolveType(item))
    
    return array
  } else if (value.trim().length < 1) {
    return null
  } else if (!isNaN(value)) {
    return value.indexOf('.') > -1
      ? parseFloat(value, 10)
      : parseInt(value, 10)
  } else if (value.match(/^true$/i)) {
    return true
  } else if (value.match(/^false$/i)) {
    return false
  } else if (value.match(/^null$/i)) {
    return null
  } else if (value.match(/^undefined$/i)) {
    return undefined
  } else {
    return value
  }
}

function parseIFFY (string = '') {
  let object = {}
  let childObject = null
  const lines = string.split(/(\r\n|\r|\n)/)

  for (var line of lines) {
    // find sections
    if (line.startsWith('[') && line.match(/^\[*.+\]$/)) {
      let key = line.replace(/^\[(.+)\]$/, '$1')

      if (!object.hasOwnProperty(key)) {
        object[key] = {}
      }

      childObject = key
    }
    
    // parse each line
    else if (line.trim() !== '' && !line.startsWith('#')) {
      const keyValuePair = line.split(/\s*:\s*/)
      const key = keyValuePair[0]
      let value = keyValuePair[1]

      if (childObject) {
        object[childObject][key] = resolveType(value)
      } else {
        object[key] = resolveType(value)
      }
    }
  }

  return object
}

export default parseIFFY
