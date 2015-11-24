import d3 from 'd3'
import uuid from 'uuid'
import tpl from '../templates/d3.hbs'

function draw(id) {
  const svg = d3.select(`#${id}`)

  svg
    .append('circle')
    .attr('cx', 400)
    .attr('cy', 300)
    .attr('r', 100)
    .style('fill', 'yellow')

  const group = svg
    .append('g')
    .attr('transform', `translate(0, 200)`)

  group.append('rect')
      .attr('x', 0)
      .attr('y', 50)
      .attr('width', 500)
      .attr('height', 10)


  group.append('text')
      .attr('class', 'text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '1em')
      .text('Hallo Bachelor & Master Studierende')

}

export default function(containerId) {
  const container = document.getElementById(containerId)
  const width = 800
  const height = 600
  const viewBox = `0 0 ${width} ${height}`

  const id = 'chart-' + uuid.v4()
  const svg = tpl({
    id,
    viewBox
  })

  container.innerHTML = svg

  draw(id, width, height)
}
