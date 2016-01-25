import d3 from 'd3'
import uuid from 'uuid'
import $ from 'jquery'
import tpl from '../templates/d3.hbs'
import burgenland from '../data/burgenland.geo.json'
import kaernten from '../data/kaernten.geo.json'
import niederoesterreich from '../data/niederoesterreich.geo.json'
import oberoesterreich from '../data/oberoesterreich.geo.json'
import salzburg from '../data/salzburg.geo.json'
import steiermark from '../data/steiermark.geo.json'
import tirol from '../data/tirol.geo.json'
import vorarlberg from '../data/vorarlberg.geo.json'
import wien from '../data/wien.geo.json'

function draw() {
  // Make geo data available
  const burgenlandGeo = burgenland
  const kaerntenGeo = kaernten
  const niederoesterreichGeo = niederoesterreich
  const oberoesterreichGeo = oberoesterreich
  const salzburgGeo = salzburg
  const steiermarkGeo = steiermark
  const tirolGeo = tirol
  const vorarlbergGeo = vorarlberg
  const wienGeo = wien

  // Select map container
  var $map = $("#map")

  // Create a new google map and define some settings
  var map = new google.maps.Map($map[0], {
    zoom: 7,
    minZoom: 7,
    maxZoom: 9,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(47.811195, 13.033229), // Salzburg
    styles:[{"stylers": [{"saturation": 0},{"lightness": 50}]}]
  })

  // Adapt the map container size and set the center of the map
  // to Salzburg (which approximately the middle of Austria)
  google.maps.event.addListener(map, 'bounds-changed', function() {
    $map.css({ height: '500px', width: '500px' })
    google.maps.event.trigger(map, 'resize')
    map.setCenter(new google.maps.LatLng(47.811195, 13.033229))
    google.maps.event.clearListeners(map, 'bounds-changed')
  })

  // Create a google maps overlay
  var overlay = new google.maps.OverlayView()

  // onAdd is called when the map's panes are ready and the overlay has been added to the map
  overlay.onAdd = function () {
    // Create a layer and select it with d3 for modification
    var layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "svg-overlay")

    // Create a svg element and append it to the layer
    // it has exactly the same dimensions as the map itself
    var svg = layer.append("svg")
      .attr("width", $map.width())
      .attr("height", $map.height())

    // Append one group for each state to the svg element
    var burgenlandGroup = svg.append("g").attr("class", "burgenland")
    var kaerntenGroup = svg.append("g").attr("class", "kaernten")
    var niederoesterreichGroup = svg.append("g").attr("class", "niederoesterreich")
    var oberoesterreichGroup = svg.append("g").attr("class", "oberoesterreich")
    var salzburgGroup = svg.append("g").attr("class", "salzburg")
    var steiermarkGroup = svg.append("g").attr("class", "steiermark")
    var tirolGroup = svg.append("g").attr("class", "tirol")
    var vorarlbergGroup = svg.append("g").attr("class", "vorarlberg")
    var wienGroup = svg.append("g").attr("class", "wien")

    // Draw the overlay onto the map
    overlay.draw = function () {
      var markerOverlay = this

      // Get the MapCanvasProjection for calculating the exact coordinates at which to anchor
      // the object's top right and bottom left points
      var overlayProjection = markerOverlay.getProjection()

      // Turn the overlay projection into a d3 projection
      var googleMapProjection = function (coordinates) {
        var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0])
        var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates)
        return [pixelCoordinates.x, pixelCoordinates.y]
      }

      // Add the data points of each states via paths onto the svg element
      var path = d3.geo.path().projection(googleMapProjection)
      burgenlandGroup.selectAll("path")
        .data(burgenlandGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#burgenland)")

      path = d3.geo.path().projection(googleMapProjection)
      kaerntenGroup.selectAll("path")
        .data(kaerntenGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#kaernten)")

      path = d3.geo.path().projection(googleMapProjection)
      niederoesterreichGroup.selectAll("path")
        .data(niederoesterreichGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#niederoesterreich)")

      path = d3.geo.path().projection(googleMapProjection)
      oberoesterreichGroup.selectAll("path")
        .data(oberoesterreichGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#oberoesterreich)")

      path = d3.geo.path().projection(googleMapProjection)
      salzburgGroup.selectAll("path")
        .data(salzburgGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#salzburg)")

      path = d3.geo.path().projection(googleMapProjection)
      steiermarkGroup.selectAll("path")
        .data(steiermarkGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#steiermark)")

      path = d3.geo.path().projection(googleMapProjection)
      tirolGroup.selectAll("path")
        .data(tirolGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#tirol)")

      path = d3.geo.path().projection(googleMapProjection)
      vorarlbergGroup.selectAll("path")
        .data(vorarlbergGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#vorarlberg)")

      path = d3.geo.path().projection(googleMapProjection)
      wienGroup.selectAll("path")
        .data(wienGeo.features)
        .attr("d", path) // update existing paths
        .enter().append("svg:path")
        .attr("d", path)
        .attr("style", "fill:url(#wien)")


      // Add state arm patterns to the paths
      var burgenlandPattern = svg.append('svg:defs')
      burgenlandPattern
        .append('svg:pattern')
        .attr('id', 'burgenland')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/burgenland.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 45)
        .attr('height', 45)

      var kaerntenPattern = svg.append('svg:defs')
      kaerntenPattern
        .append('svg:pattern')
        .attr('id', 'kaernten')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/kaernten.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', 50)

      var niederoesterreichPattern = svg.append('svg:defs')
      niederoesterreichPattern
        .append('svg:pattern')
        .attr('id', 'niederoesterreich')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/niederoesterreich.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 45)
        .attr('height', 45)

      var oberoesterreichPattern = svg.append('svg:defs')
      oberoesterreichPattern
        .append('svg:pattern')
        .attr('id', 'oberoesterreich')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/oberoesterreich.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', 50)

      var salzburgPattern = svg.append('svg:defs')
      salzburgPattern
        .append('svg:pattern')
        .attr('id', 'salzburg')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/salzburg.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', 50)

      var steiermarkPattern = svg.append('svg:defs')
      steiermarkPattern
        .append('svg:pattern')
        .attr('id', 'steiermark')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/steiermark.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', 50)

      var tirolPattern = svg.append('svg:defs')
      tirolPattern
        .append('svg:pattern')
        .attr('id', 'tirol')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/tirol.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 45)
        .attr('height', 45)

      var vorarlbergPattern = svg.append('svg:defs')
      vorarlbergPattern
        .append('svg:pattern')
        .attr('id', 'vorarlberg')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/vorarlberg.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 45)
        .attr('height', 45)

      var wienPattern = svg.append('svg:defs')
      wienPattern
        .append('svg:pattern')
        .attr('id', 'wien')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 60)
        .attr('height', 60)
        .append('svg:image')
        .attr('xlink:href', '../images/wien.svg')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', 50)
    }
  }

  // Add the overlay to the map
  overlay.setMap(map)
}

export default function(containerId) {
  draw()
}
