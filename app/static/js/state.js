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

var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 1280 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
  }))
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.json("https://ergo.newjeans.live:4999/scatter-car-drunk", function(data) {
  console.log(Object.values(data));
  var data = Object.values(data);


  // Add X axis
  var x = d3.scaleLinear()
    .domain([1, 4])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(-"+width/2+",0)")
  .attr("x", width)
  .attr("y", height + 40)
  .text("Ethanol Per Capita");

  // Add Y axis
  var y = d3.scaleLog()
    .domain([1, 300000])
    .range([ height, 5]);
  svg.append("g")
    .call(d3.axisLeft(y));

  svg.append("text")
  .attr("class", "y label")
  .attr("transform", "rotate(-90),translate(-"+height/2+", -50)")
  .attr("text-anchor", "middle")
  .attr("dy", ".75em")
  .text("Number of Car Accidents");
  
  var tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("position", "absolute")
  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  }

  var mousemove = function(d) {
   tooltip
     .html(d.STATE + ": " + d.ethanol_per_capita + " gallons, " + d.car_accidents + " car accidents" )
     .style("left", d3.event.pageX + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
     .style("top", d3.event.pageY + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }
  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.ethanol_per_capita); } )
      .attr("cy", function (d) { return y(d.car_accidents); } )
      .attr("r", 10)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "white")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

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
