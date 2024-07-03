const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const auth = require('../api/auth')
require('dotenv').config();

const PORT = process.env.PORT || 2001
const dbURL = process.env.DB_URL

app.use(cors())
app.use(express.json())

mongoose.connect(`${dbURL}`,)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error(err));


app.use('/api', auth)


app.listen(`${PORT}`, () => {
    console.log('server started on Port', `${PORT}`)
  })