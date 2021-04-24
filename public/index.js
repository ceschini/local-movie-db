// adding empty element function to prototype
HTMLElement.prototype.empty = function () {
  var that = this;
  while (that.hasChildNodes()) {
    that.removeChild(that.lastChild);
  }
};

function updateTable() {
  // fetching json file and creating table
  axios.get('http://localhost:3000/movies')
    .then(res => {
      let table = document.querySelector("#movie-table");
      table.empty();
      let movies = res.data
      let headers = Object.keys(movies[0]);
      generateTable(table, movies);
      generateTableHead(table, headers);
    }).catch(err => console.log('Request Failed', err));
}

// * Generating movie table
// https://www.valentinog.com/blog/html-table/

// Generating movie table headers
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement('th');
    th.onclick = function () { sortTable(key) };
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

    // ? Generating delete button
    let deleteButtonCell = row.insertCell();
    let deleteText = document.createTextNode('Delete');
    deleteButtonCell.onclick = function () { deleteRow(row) };
    deleteButtonCell.appendChild(deleteText);
    // styling
    deleteButtonCell.style.cursor = "pointer";
    deleteButtonCell.style.backgroundColor = "maroon";
    deleteButtonCell.style.color = "white";
  }
}

// * Insert new movie
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

  axios.post('http://localhost:3000/newmovie', movie)
    .then(() => updateTable())
    .catch(err => console.log('Request Failed', err))

  // clearing fields
  title.value = '';
  year.value = '';
  genre.value = '';
  director.value = '';
  writer.value = '';
}

// * Filtering movie titles
// https://www.w3schools.com/howto/howto_js_filter_table.asp

document.querySelector("#searchTitle").addEventListener("keyup", searchTitles);
function searchTitles() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.querySelector("#searchTitle");
  filter = input.value.toUpperCase();
  table = document.querySelector("#movie-table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0]; //title
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// * Sort table
// https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(row) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switched, n = 0;
  if (row == 'year') {
    n = 1;
  } else if (row == 'genre') {
    n = 2;
  } else if (row == 'director') {
    n = 3;
  } else if (row == 'writer') {
    n = 4;
  }

  table = document.querySelector("#movie-table");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switched = true;
    } else {
      if (!switched && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// * Delete row Button
function deleteRow(row) {
  if (confirm('Are you sure you want to delete this movie?')) {
    let index = row.rowIndex - 1
    axios.delete(`http://localhost:3000/deletemovie/${index}`).then(() => updateTable())
  }
}

updateTable();