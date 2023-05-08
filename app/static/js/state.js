console.log("I'm here")

var button = document.getElementById("button")

var checkBox = function(whichBox) {
    var checkBox = document.getElementById(whichBox);
    var text = document.getElementById("checktext");
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
} 