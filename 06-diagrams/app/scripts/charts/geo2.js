import d3 from 'd3'
import uuid from 'uuid'
import tpl from '../templates/d3.hbs'
import salzburg from '../data/salzburg.geo.json'
import redCrossLocations from '../data/redcross_locations_salzburg.json'

function draw(chartId, width, height) {
  const svg = d3.select(`#${chartId}`)
    svg
    .append("svg")
    .attr("width", width / 2).attr("height", height / 2)

  var center = d3.geo.centroid(salzburg)
  var scale  = 1;
  var offset = [width / 2, height / 2];
  var projection =
    d3.geo.mercator()
      .scale(scale)
      .center(center)
      .translate(offset);

  // create the path
  var path = d3.geo.path().projection(projection);

  // using the path determine the bounds of the current map and use
  // these to determine better values for the scale and translation
  var bounds  = path.bounds(salzburg);
  var hscale  = scale * width  / (bounds[1][0] - bounds[0][0]);
  var vscale  = scale * height / (bounds[1][1] - bounds[0][1]);
  var scale   = (hscale < vscale) ? hscale : vscale;
  var offset  = [width - (bounds[0][0] + bounds[1][0]) / 2.1,
    height - (bounds[0][1] + bounds[1][1]) / 2.4];

  projection = d3.geo.mercator().center(center)
    .scale(scale).translate(offset);
  path = path.projection(projection);

  svg.append("rect").attr('width', width).attr('height', height)
    .style('stroke', 'black').style('fill', 'none');

  svg.selectAll("path").data(salzburg.features).enter().append("path")
    .attr("d", path)
    .style("fill", "red")
    .style("stroke-width", "1")
    .style("stroke", "black")

  svg.selectAll('circle')
    .data(redCrossLocations.features)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return projection(d.geometry.coordinates)[0]
    })
    .attr('cy', function(d) {
      return projection(d.geometry.coordinates)[1]
    })
    .attr('r', 10)
    .attr('text',function(d) {
      return ""//d.attributes.DienstSt
    })
    .style('fill', 'yellow')
}

export default function(containerId) {
  const container = document.getElementById(containerId)
  const width = 850
  const height = 850
  const viewBox = `0 0 ${width * 2} ${height}`
  const id = 'chart-' + uuid.v4()
  const svg = tpl({
    id,
    viewBox
  })

  container.innerHTML = svg

  draw(id, width, height)
}
