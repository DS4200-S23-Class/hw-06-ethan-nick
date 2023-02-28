var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#left")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/DS4200-S23-Class/hw-06-ethan-nick/master/data/iris.csv", function(data) {

  var x = d3.scaleLinear()
    .domain([0, 8])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([0, 7.0])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  var circles = svg.append('g')
  	.attr("id", "plane")
    .selectAll("point")
    .data(data)
    .enter()
    .append("circle")   	
      .attr("cx", function (d) { return x(d.Sepal_Length); } )
      .attr("cy", function (d) { return y(d.Petal_Length); } )
      .attr("r", 5)
      .attr("fill-opacity", 0.5)
      .attr("fill", function(d) {
        if (d.Species === "setosa") {
            return "#DC267F";
        } else if (d.Species === "versicolor") {
            return "#FE6100";
        } else if (d.Species === "virginica") {
            return "#FFB000";
        }
        });
});


var svg3 = d3.select("#middle")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/DS4200-S23-Class/hw-06-ethan-nick/master/data/iris.csv", function(data) {

  var xxx = d3.scaleLinear()
    .domain([0, 5.0])
    .range([ 0, width ]);
  svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xxx));

  var yyy = d3.scaleLinear()
    .domain([0, 3.0])
    .range([ height, 0]);
  svg3.append("g")
    .call(d3.axisLeft(yyy));

  var circles = svg3.append('g')
  	.attr("id", "plane")
    .selectAll("point")
    .data(data)
    .enter()
    .append("circle")   	
      .attr("cx", function (d) { return xxx(d.Sepal_Width); } )
      .attr("cy", function (d) { return yyy(d.Petal_Width); } )
      .attr("r", 5)
      .attr("fill-opacity", 0.5)
      .attr("fill", function(d) {
        if (d.Species === "setosa") {
            return "#DC267F";
        } else if (d.Species === "versicolor") {
            return "#FE6100";
        } else if (d.Species === "virginica") {
            return "#FFB000";
        }
          
        });

});




var svg2 = d3.select("#right")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/DS4200-S23-Class/hw-06-ethan-nick/master/data/iris.csv", function(bardata) {

var xx = d3.scaleBand()
  .range([0, width])
  .domain(["virginica", "versicolor", "setosa"])
  .padding(0.2);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xx))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-style", "normal");

var yy = d3.scaleLinear()
  .domain([0, 60])
  .range([height, 0]);
svg2.append("g")
  .call(d3.axisLeft(yy));

svg2.selectAll("mybar")
  .data(bardata)
  .enter()
  .append("rect")
    .attr("x", function(d) { return xx(d.Species); })
    .attr("y", 50)
    .attr("width", xx.bandwidth())
    .attr("height", function(d) { return height - 50; })
    .attr("fill", function(d) { // set fill color with 50% opacity
        if (d.Species === "setosa") {
        return "#DC267F";
      } else if (d.Species === "versicolor") {
        return "#FE6100";
      } else if (d.Species === "virginica") {
        return "#FFB000";
      }
    })

})
