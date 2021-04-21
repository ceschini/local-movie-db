const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const movies = require('./movies.json')

app.use(express.json())

app.get('/movies', (req, res) => {
  res.send(movies)
})

app.post('/newmovie', (req, res) => {
  // adding new movie to object
  movies.push(req.body)
  // updating movie object to file
  try {
    const data = JSON.stringify(movies, null, 4);
    fs.writeFileSync('./movies.json', data, 'utf8');
    console.log('file written successfully!');
  } catch (err) {
    console.log(`error writing file: ${err}`);
  }
  res.send('post complete')
})

app.delete('/deletemovie/:movieid', (req, res) => {
  movies.splice(req.params.movieid, 1)
  // updating movie list file
  try {
    const data = JSON.stringify(movies, null, 4);
    fs.writeFileSync('./movies.json', data, 'utf8');
    console.log('file written successfully!');
  } catch (err) {
    console.log(`error writing file: ${err}`);
  }
  res.send('delete complete')
})
// serving static files
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})