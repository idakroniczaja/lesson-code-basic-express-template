document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


// When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}