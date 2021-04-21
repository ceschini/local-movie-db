const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const movies = require('./movies.json')
const axios = require('axios')

app.get('/movies', (req, res) => {
  res.send(movies)
})

// serving static files
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})