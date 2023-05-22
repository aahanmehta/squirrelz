import { statesData } from "./statemap.js";

//leaflet map
var map = L.map('map').setView([38.09302572405113, -96.76474497954052], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.geoJson(statesData).addTo(map);
function style(feature) {
    return {
        fillColor: '#dbab6c',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
var geojson;
// ... our listeners
geojson = L.geoJson(statesData);

function showSpecificGraph(e) {
    //currently just zooms
    //map.fitBounds(e.target.getBounds());

    //add show graph functionalityk
  //
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: showSpecificGraph
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

//ethanol consumption to car accidents graph
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
    .domain([1, 5])
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
  .text("Ethanol Consumed Per Capita");

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
//ethanol consumption to ufo sightings graph
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 1280 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg2 = d3.select("#state_specific_graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .call(d3.zoom().on("zoom", function () {
       svg2.attr("transform", d3.event.transform)
  }))
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// Parse the Data
d3.json("https://ergo.newjeans.live:4999/scatter-ufo-drunk", function(data) {
  console.log(Object.values(data));
  var data = Object.values(data);


  // Add X axis
  var x = d3.scaleLinear()
    .domain([1, 5])
    .range([ 0, width ]);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg2.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(-"+width/2+",0)")
  .attr("x", width)
  .attr("y", height + 40)
  .text("Ethanol Consumed Per Capita");

  // Add Y axis
  var y = d3.scaleLog()
    .domain([1, 10000])
    .range([ height, 5]);
  svg2.append("g")
    .call(d3.axisLeft(y));

  svg2.append("text")
  .attr("class", "y label")
  .attr("transform", "rotate(-90),translate(-"+height/2+", -50)")
  .attr("text-anchor", "middle")
  .attr("dy", ".75em")
  .text("Number of UFO Sightings");
  
  var tooltip = d3.select("#state_specific_graph")
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
     .html(d.STATE + ": " + d.ethanol_per_capita + " gallons, " + d.ufo_sighting + "UFO sightings" )
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
  svg2.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.ethanol_per_capita); } )
      .attr("cy", function (d) { return y(d.ufo_sightings); } )
      .attr("r", 10)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "white")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

 })

//ethanol consumption to ufo sightings graph per year (state specific)
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 1280 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg2 = d3.select("#state_specific_graph2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .call(d3.zoom().on("zoom", function () {
       svg2.attr("transform", d3.event.transform)
  }))
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.json("https://ergo.newjeans.live:4999/state_specific", function(data) {
  console.log(Object.values(data));
  var data = Object.values(data);


  // Add X axis
  var x = d3.scaleLinear()
    .domain([1, 5])
    .range([ 0, width ]);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg2.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(-"+width/2+",0)")
  .attr("x", width)
  .attr("y", height + 40)
  .text("Ethanol Consumed Per Capita");

  // Add Y axis
  var y = d3.scaleLog()
    .domain([1, 10000])
    .range([ height, 5]);
  svg2.append("g")
    .call(d3.axisLeft(y));

  svg2.append("text")
  .attr("class", "y label")
  .attr("transform", "rotate(-90),translate(-"+height/2+", -50)")
  .attr("text-anchor", "middle")
  .attr("dy", ".75em")
  .text("Number of UFO Sightings");
  
  var tooltip = d3.select("#state_specific_graph2")
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
     .html(d.STATE + ": " + d.ethanol_per_capita + " gallons, " + d.ufo_sighting + "UFO sightings" )
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
  svg2.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.ethanol_per_capita); } )
      .attr("cy", function (d) { return y(d.ufo_sightings); } )
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
console.log("im on the server");
