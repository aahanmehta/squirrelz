console.log("I'm here")

var button = document.getElementById("button")

var buttonFunc = function() {
  var text = document.getElementById("btntext");
  if (text.style.display == "block"){
    text.style.display = "none";
  } else {
    text.style.display = "block";
  }
}
var checkBox = function(whichBox) {
    var checkBox = document.getElementById(whichBox);
    var text = document.getElementById("checktext");
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
} 