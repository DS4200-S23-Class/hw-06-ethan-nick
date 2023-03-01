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
      .attr("class", function (d) {return d.id;})
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
      })

var svg3 = d3.select("#middle")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

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
      .attr("class", function (d) {return d.id;})	
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
          })
      .attr("stroke", "none")
      .on("mouseover", function() {
          d3.select(this)
            .attr("stroke", "#FFA500")
            .attr("stroke-width", 2);
      })
      .on("mouseout", function() {
          d3.select(this)
            .attr("stroke", "none")
            .attr("fill-opacity", 0.2);
      });
      
  var brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("start brush end", brushed);

  svg3.append("g")
    .attr("class", "brush")
    .call(brush);


  function brushed() {
    // initialize list 
    var selectedPoints = [];

    // reset all shapes to default
    d3.selectAll("circle").attr("stroke", "none").attr("fill-opacity", 0.5);
    d3.selectAll(`[id='bar']`).attr("stroke", "none").attr("opacity", 0.02);

    // highlight selected points in middle plot
    if (d3.event.selection) {
      var [[x0, y0], [x1, y1]] = d3.event.selection;
      circles.filter(function(d) {
        var cx = xxx(d.Sepal_Width);
        var cy = yyy(d.Petal_Width);
        var selected = (cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1);
        if (selected) {
          selectedPoints.push(this);
        }
        return selected;
      }).attr("stroke", "#785EF0").attr("stroke-width", 2).attr("fill-opacity", 1);
    } else {
      circles.attr("stroke", "none").attr("fill-opacity", 0.5);
    };

    // highlight linked points in other plots for each selected point
    selectedPoints.forEach(function(current) {
      linked = current.getAttribute("class");
      d3.selectAll(`[class='${linked}']`)
          .attr("stroke", "#785EF0")
          .attr("stroke-width", 2)
          .attr("fill-opacity", 1)
          .attr("opacity", 1);
    });
  }

var svg2 = d3.select("#right")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var xx = d3.scaleBand()
  .range([0, width])
  .domain(["virginica", "versicolor", "setosa"])
  .padding(0.2);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xx))
  .selectAll("text")
    .style("text-anchor", "center")
    .style("font-style", "normal");

var yy = d3.scaleLinear()
  .domain([0, 60])
  .range([height, 0]);
svg2.append("g")
  .call(d3.axisLeft(yy));

svg2.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("id", "bar")
    .attr("class", function (d) {return d.id;}) 
    .attr("x", function(d) { return xx(d.Species); })
    .attr("y", 50)
    .attr("width", xx.bandwidth())
    .attr("height", 60)
    .attr("opacity", 0.02)
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

