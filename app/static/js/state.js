console.log("I'm here")

var btn = document.getElementById("button");
var buttontext = document.getElementById("btntext")
var boxtext = document.getElementById("checktext");
var checkbox = document.getElementById("checky");
var buttonFunc = () => {
  if (buttontext.style.display == "block"){
    buttontext.style.display = "none";
  } else {
    buttontext.style.display = "block";
  }
}
var checkBox = () => {
    if (checkbox.checked == true){
      boxtext.style.display = "block";
    } else {
      boxtext.style.display = "none";
    }
} 

btn.addEventListener("click", buttonFunc);
checkbox.addEventListener("click", checkBox);