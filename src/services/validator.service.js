const Validator = require('better-validator')

function parseValidatorOutput(result) {
  let errors = []

  for (let row of result) {
    let msg = `In [${row.path.join(' -> ')}]: Failed rule [${row.failed}] with value [${row.value}]`
    errors.push(msg)
  }
  
  return errors
}

module.exports = {
  Validator,
  parseValidatorOutput
}