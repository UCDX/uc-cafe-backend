const Validator = require('better-validator')

function parseValidatorOutput(result) {
  let errors = []

  for (let row of result) {
    let msg = `In [${row.path.join(' -> ')}]: Failed rule [${row.failed}] with value [${row.value}]`
    errors.push(msg)
  }
  
  return errors
}

function parseNumberIfApplicable(val) {
  if (!isNaN(val)) {
    return parseFloat(val)
  }
  return val
}

function parseNumberIfApplicableInt(val) {
  if (!isNaN(val)) {
    //console.log("funciono la funcion parse")
    return parseInt(val)
  }
  return val
}

function parseNumberFromGroupIfApplic(data) {
  if (data instanceof Array) {
    for (let i = 0; i < data.length; i++) {
      data[i] = parseNumberIfApplicable(data[i])
    }
  } else if (data instanceof Object) {
    for (let key in data) {
      data[key] = parseNumberIfApplicable(data[key])
    }
  }

  return data
}

function parseArrayIfApplic(data) {
  if (data && data[0] == '[' && data[data.length - 1] == ']') {
    return JSON.parse(data)
  }

  return data
}

module.exports = {
  Validator,
  parseValidatorOutput,
  parseNumberIfApplicable,
  parseNumberIfApplicableInt,
  parseNumberFromGroupIfApplic,
  parseArrayIfApplic
}