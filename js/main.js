//listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  //Get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;
  //console.log(siteName);
  //console.log(siteUrl);

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
  }

  //Prevent form from submitting
  e.preventDefault();
}
