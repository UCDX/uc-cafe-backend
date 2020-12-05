// Environment variables. Keep loading environment variables at the top
// or stuff that depends on thery won't work.
const path =  require('path')
let envpath = path.join(__dirname, '..', 'etc', '.env')
let res = require('dotenv').config({ path: envpath })
if(res.error) {
  console.error(".env file not found")
  console.error(res.error.message)
  process.exit(1)
}

// Including dependencies.
const express = require('express')
const morgan = require('morgan')
const general = require('./middlewares/general')

const app = express()

// Middlewares.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(general.allowExternalConnections)
app.use(general.apiSection)
app.use(general.appAuth)
app.use(morgan('dev'))
app.use('/api/v1/', require('./api/interfaces'))

module.exports = app
