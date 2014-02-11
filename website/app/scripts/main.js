// From http://mkweb.bcgsc.ca/circos/guide/tables/
var matrix = []
var labels = [];

d3.text('data/titles502.csv', function(error, _data){
            labels = d3.csv.parseRows(_data); 
            
       d3.text('data/d3matrix502.csv', function(error, _data){
            matrix = d3.csv.parseRows(_data); 
            for (i=0;i<matrix.length;i++)
                for (j=0;j<matrix[i].length;j++)
                  matrix[i][j] = (Number(matrix[i][j])/50)
            visualize();
});

     
});
var visualize = function(){

  for (j=0;j<50;j++)
    for (i=0;i<labels.length;i++)
      $('#authors').html($('#authors').html() + ' ' + labels[i]);

  var chord = d3.layout.chord()
      .padding(.06)
      // .sortGroups(d3.descending)
      // .sortSubgroups(d3.descending)
      // .sortChords(d3.descending)
      .matrix(matrix);

  console.log(chord)

  var width = 960,
      height = 750,
      innerRadius = Math.min(width, height) * .40,
      outerRadius = innerRadius * 1.031;

  var fill = d3.scale.ordinal()
      .domain(d3.range(1))
      .range(["#2758BB"]);

  var svg = d3.select("#vis").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg.append("g").selectAll("path")
      .data(chord.groups)
    .enter().append("path")
      .style("fill", function(d) { return fill(d.index); })
      .style("stroke", function(d) { return fill(d.index); })
      .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
      .on("mouseover", fade(.0))
      .on("mouseout", fade(1));

  var ticks = svg.append("g").selectAll("g")
      .data(chord.groups)
    .enter().append("g").selectAll("g")
      .data(groupTicks)
    .enter().append("g")
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + outerRadius + ",0)";
      });

  // ticks.append("line")
  //     .attr("x1", 1)
  //     .attr("y1", 0)
  //     .attr("x2", 5)
  //     .attr("y2", 0)
  //     .style("stroke", "#000");


  ticks.append("text")
      .attr("x", 8)
      .attr("dy", ".35em")
      .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
      .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .text(function(d) { return d.label; });



  svg.append("g")
      .attr("class", "chord")
    .selectAll("path")
      .data(chord.chords)
    .enter().append("path")
      .attr("d", d3.svg.chord().radius(innerRadius))
      .style("fill", function(d) { return fill(d.target.index); })
      .style("opacity", 1);

  var g = svg.append("g").selectAll("g").data(chord.groups).enter()
  .append("svg:text")
          .attr("x", 6)
          .attr("dy", 15)
        .append("svg:textPath")
          .text(function(d) { return d.label });

  // Returns an array of tick angles and labels, given a group.
  function groupTicks(d) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, 1000).map(function(v, i) {
      return {
        angle: v * k + d.startAngle,
        label: labels[d.index]
      };
    });
  }

  // Returns an event handler for fading a given chord group.
  function fade(opacity) {
    return function(g, i) {
      svg.selectAll(".chord path")
          .filter(function(d) { return d.source.index != i && d.target.index != i; })
          .style("opacity", opacity);
    };
  }

t1 = 3000;
dt = 3000;
  setTimeout(function() {
    $('#title').css({'opacity':1});
  }, 00);

  setTimeout(function() {
    $('#t1').css({'opacity':0});
    $('#t2').css({'opacity':1});
  }, t1);

    setTimeout(function() {
    $('#t2').css({'opacity':0});
    $('#t3').css({'opacity':1});
    $('#authors').css({'opacity':0.4});
  }, t1+dt);

setTimeout(function() {
    $('#t3').css({'opacity':0});
    $('#t4').css({'opacity':1});
  }, t1+2*dt);

setTimeout(function() {
    $('#t4').css({'opacity':0});
    $('#t5').css({'opacity':1});
  }, t1+3*dt);

setTimeout(function() {
    $('#title').css({'opacity':0});
    $('#vis').css({'opacity':1});
  }, t1+3*dt);


  $('.center').css({'margin-top':'-'+$('.center').height()/2});
}
