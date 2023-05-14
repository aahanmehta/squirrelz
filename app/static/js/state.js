console.log("I'm here")


var ajaxButton = document.getElementById("ajaxbut");
var ajaxFunc = () => {
  console.log("here");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "../../static/js/ajax_info.txt", true);
  xhttp.send();
}


ajaxButton.addEventListener("click", ajaxFunc)
// chart = Histogram(unemployment, {
//   value: d => d.rate,
//   label: "unemployment rate (%) →",
//   width,
//   height: 500,
//   color: "steelblue"
// })

const pElem = document.getElementById("p");
const selectElem = document.getElementById("sel_id");

var submitThis = function() {
  console.log(selectElem.options[selectElem.selectedIndex].id);
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function () {
  //   //this function is called when a response is received from the form's endpoint
  //   if (this.readyState === this.DONE) {
  //     //this code block executes when the response data is finished loading
  //     var responseText = xhttp.responseText; //handle this variable however you like
  //     //if you want to treat as JSON data, you can use this line
  //     //var json = JSON.parse(xhttp.responseText)
  //     alert("Response received: " + responseText);
  //   }
  // };

  // //opens a request to send the data to the URL form.action via form.method
  // //note the false at the end of the xhttp.open call
  // //if set to true, no javascript code will be run after the form is submitted, until the reponse from the form is returned
  // //if set to false, other javascript code will run while the xhttp object waits for the response
  // xhttp.open(formElement.method, formElement.action, false);

  // var data = new FormData(formElement); //gets the form's data as a FormData object
  // xhttp.send(data); //sends the FormData object
  // //because a FormData object is being sent, it will automatically send with the same encoding as an HTML form element would send its data
  // return false;
}
// submitThis();
selectElem.addEventListener("change", submitThis);