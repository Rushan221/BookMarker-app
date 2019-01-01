//listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  //Get form values
  var siteName = document.getElementById("sietName").value;
  var siteUrl = documet.getElementById("siteUrl").value;

  console.log(siteName);
  console.log(siteUrl);

  //Prevent form from submitting
  e.preventDefault();
}
