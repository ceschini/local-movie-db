let movies = [
  {
    title: "Taxi Driver",
    year: 1971,
    genre: "drama, thriller",
    director: "Martin Scorcese",
    writer: "Martin Scorcese"
  },
];

// Generating movie table
// https://www.valentinog.com/blog/html-table/

// Generating movie table headers
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement('th');
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

// Generating movie table items
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.querySelector("#movie-table");
let data = Object.keys(movies[0]);
generateTable(table, movies);
generateTableHead(table, data);

function insertMovie() {
  // prepping object
  let movie = {};
  let title = document.querySelector('[name="title"]');
  let year = document.querySelector('[name="year"]');
  let genre = document.querySelector('[name="genre"]');
  let director = document.querySelector('[name="director"]');
  let writer = document.querySelector('[name="writer"]');
  movie.title = title.value;
  movie.year = year.value;
  movie.genre = genre.value;
  movie.director = director.value;
  movie.writer = writer.value;

  let row = table.insertRow();
  for (key in movie) {
    let cell = row.insertCell();
    let text = document.createTextNode(movie[key]);
    cell.appendChild(text);
  }
  title.value = '';
  year.value = '';
  genre.value = '';
  director.value = '';
  writer.value = '';
}