console.log("I'm here");

var ajaxButton = document.getElementById("ajaxbut");
var ajaxFunc = () => {
  //console.log("here");
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

var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.json("https://ergo.newjeans.live:4999/agg-data-drunk", function(data) {
  console.log(Object.values(data));
  var data = Object.values(data);


  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 4000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 500000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.GrLivArea); } )
      .attr("cy", function (d) { return y(d.SalePrice); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

})
const form = document.getElementById("form");
const selectElem = document.getElementById("sel_id");

var submitThis = function() {
  console.log(selectElem.options[selectElem.selectedIndex].id);
  //var formElem = selectElem.options[selectElem.selectedIndex].id;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    //this function is called when a response is received from the form's endpoint
    if (this.readyState === this.DONE) {
      //this code block executes when the response data is finished loading
      var responseText = xhttp.responseText; //handle this variable however you like
      //if you want to treat as JSON data, you can use this line
      //var json = JSON.parse(xhttp.responseText)
      alert("Response received: " + responseText);
    }
  };
  //opens a request to send the data to the URL form.action via form.method
  //note the false at the end of the xhttp.open call
  xhttp.open(form.method, form.action, true);
  console.log(form.action);
  var data = new FormData(form); //gets the form's data as a FormData object
  xhttp.send(data); //sends the FormData object
  //because a FormData object is being sent, it will automatically send with the same encoding as an HTML form element would send its data
  return false;
}
selectElem.addEventListener("change", submitThis);
