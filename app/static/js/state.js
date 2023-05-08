console.log("I'm here")

var btn = document.getElementById("button");
var buttontext = document.getElementById("btntext")
var boxtext = document.getElementById("checktext");
var checkbox = document.getElementById("checky");
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