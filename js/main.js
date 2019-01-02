//listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  //Get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;
  //console.log(siteName);
  //console.log(siteUrl);

  if (validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  //console.log(bookmark);

  //Test for already added bookmarks
  if (localStorage.getItem("bookmarks") === null) {
    //bookmarks array
    var bookmarks = [];
    bookmarks.push(bookmark);
    //set to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //fetch from localstorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //adding to the array
    bookmarks.push(bookmark);
    //reset it to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  fetchBookmarks();

  //Prevent form from submitting
  e.preventDefault();
}

//fetch bookmarks

function fetchBookmarks() {
  //getting bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  console.log(bookmarks);

  //get outputid
  var bookmarksResults = document.getElementById("bookmarksResults");

  //build output
  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="jumbotron">' +
      "<h3>" +
      name +
      '   <a class="btn btn-primary" target="_blank" href="' +
      url +
      '">Visit </a>' +
      "   <a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete </a>' +
      "</h3>" +
      "</div>";
  }
}

function deleteBookmark(url) {
  //get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  //reset local storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  //refetch bookmarks
  fetchBookmarks();
}

function validateForm(siteName, siteUrl) {
  //validation for empty form
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use valid URL");
    return false;
  }

  return true;
}
