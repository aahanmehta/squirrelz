console.log("I'm here")



var btn = document.getElementById("button");
var buttontext = document.getElementById("btntext")
var boxtext = document.getElementById("checktext");
var checkbox = document.getElementById("checky");
var sidebar = document.getElementById("offcanvasLabel");
var buttonFunc = () => {
  if (buttontext.style.display == "block"){
    buttontext.style.display = "none";
    console.log("herby");
  } else {
    buttontext.style.display = "block";
    console.log("aaaaa");
  }
}
var checkBox = () => {
    if (checkbox.checked == true){
      boxtext.style.display = "block";
      console.log("qweor");
    } else {
      boxtext.style.display = "none";
      console.log("qwr")
    }
} 

btn.addEventListener("click", buttonFunc);
checkbox.addEventListener("click", checkBox);



var ajaxButton = document.getElementById("ajaxbut");
var ajaxFunc = () => {
  console.log("here");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "../../static/js/ajax_info.txt", true);
  xhttp.send();
}

ajaxButton.addEventListener("click", ajaxFunc)
//httpRequest.onreadystatechange = handler;
//
//httpRequest.open("GET", "http://www.example.org/some.file", true);
//httpRequest.send();
