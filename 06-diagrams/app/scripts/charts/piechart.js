import d3 from 'd3'
import uuid from 'uuid'
import tpl from '../templates/d3.hbs'

var counts = []
var nationalities = []
var countOfTeamsPerNationality = []
var percentagesOfTeamsPerNationality = []

function draw(id, legendid, data, width, height) {
  const svg = d3.select(`#${id}`)
  const leg = d3.select(`#${legendid}`)
  const radius = Math.min(width, height) / 2

  const color = d3.scale.category20()                                            // Builtin range of colors

  const vis = svg
    .data([data])                                                                // Associate the data with the document
    .attr("width", width)                                                        // Set the width and height of the visualization (these will be attributes of the <svg> tag
    .attr("height", height)
    .append("g")                                                                 // Make a group to hold the pie chart
    .attr("transform", "translate(" + radius + "," + radius + ")")               // Move the center of the pie chart from 0, 0 to radius, radius

  const arc = d3.svg.arc()                                                       // Create <path> elements for using arc data
    .outerRadius(radius)

  const pie = d3.layout.pie()                                                    // Create arc data for a given list of values
    .value(function(d, i) { return countOfTeamsPerNationality[i] })              // Define which data to use for slices

  const arcs = vis.selectAll("g.slice")                                          // Select all <g> elements with class slice
    .data(pie)                                                                   // Associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
    .enter()                                                                     // Create a <g> for every object in the data array
    .append("g")                                                                 // Create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
    .attr("class", "slice");                                                     // Set class which is used for styling of the slices (like text)

  arcs.append("path")
    .attr("fill", function(d, i) { return color(i) } )                           // Set the color for each slice to be chosen from the built in color range
    .attr("d", arc);                                                             // Create the actual SVG path using the associated data (pie) with the arc drawing function

  arcs.append("text")                                                            // Add a label to each slice
    .attr("transform", function(d) {                                             // Set the label's origin to the center of the arc
      d.innerRadius = 350                                                        // Set inner and outer radius
      d.outerRadius = radius
      return "translate(" + arc.centroid(d) + ")"                                // Get a pair of coordinates
    })
    .attr("text-anchor", "middle")                                               // Center the text on it's origin
    .text(function(d, i)
      { if (!isNaN(countOfTeamsPerNationality[i]))                               // Get the label from our array
          return countOfTeamsPerNationality[i] + "%"
      })

  // Create a legend which is appended to the svg
  const legend =
    svg
      .append("g")
      .selectAll("g")
      .data(nationalities)
      .enter()
      .append('g')
      .attr('class', 'leg')
      .attr('transform', function(d, i) {
        const height = 50;
        const x = 950;
        const y = i * height + 20;
        return 'translate(' + x + ',' + y + ')';
      });

  // Define colored rectangles for the legend
  legend.append('rect')
    .attr('width', 30)
    .attr('height', 30)
    .style('fill', color)
    .style('stroke', color);

  // Define text properties of the legend
  legend.append('text')
    .attr('x', 40)
    .attr('y', 20)
    .text(function(d) { return d; });

}

// Calculates the number of teams per nationality
function countTeamsPerNationality(data){
  const nationalities = data.map(function(d) {
    return d.nationality
  })
  nationalities.forEach(function(x) { counts[x] = (counts[x] || 0)+1 })
}

// Calculate the percentage of teams each nationality has related to the total amount of teams
function calcTeamPercentages(){
  let total = 0

  for (let i = 0; i < countOfTeamsPerNationality.length; i++)
    total += countOfTeamsPerNationality[i]

  for (let i = 0; i < countOfTeamsPerNationality.length; i++)
    percentagesOfTeamsPerNationality[i] = (countOfTeamsPerNationality[i] * 100) / total
}

export default function(containerId, data) {
  const container = document.getElementById(containerId)
  const width = 820
  const height = 1100
  const viewBox = `0 0 ${width + 300} ${height + 300}`

  const id = 'chart-' + uuid.v4()
  const legendid = 'legend-' + uuid.v4()
  const svg = tpl({
    id,
    viewBox
  })

  container.innerHTML = svg

  // Calculates the number of teams per nationality
  countTeamsPerNationality(data)

  // Store the nationalities in an array instead of an object
  nationalities = Object.keys(counts)

  // Store the counts per nationality in an array instead of an object
  let i = 0
  Object.keys(counts).forEach(function(key) {
    countOfTeamsPerNationality.push(counts[key]);
    i++
  })

  // Calculate the percentage of teams each nationality has related to the total amount of teams
  calcTeamPercentages()

  draw(id, legendid, data, width, height)
}
