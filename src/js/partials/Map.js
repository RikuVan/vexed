import {h} from 'hyperapp' // eslint-disable-line no-unused-vars
import {select, geoPath, geoAlbers, json, queue} from 'd3'
import {memoize} from '../helpers/utils'
const feature = require('topojson').feature

const colors = {
  SELECTED: '#c9c048',
  LAST_SELECTED: 'red',
  NONE: 'none',
  STROKE: 'lightgray'
}

const init = (data, correct) => {
  const numbers = {
    MAP_CENTER: [0, 85],
    MAP_WIDTH: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    MAP_HEIGHT: 100,
    SCALE: [150]
  }

  const projection = geoAlbers()
    .center(numbers.MAP_CENTER)
    .translate([numbers.MAP_WIDTH / 2, numbers.MAP_HEIGHT])
    .scale(numbers.SCALE)

  const path = geoPath().projection(projection)

  const body = select('body')

  body.selectAll('.map-container').remove()

  const svgContainer =
    body.append('div')
      .attr('class', 'map-container')

  const svg = svgContainer
    .append('svg')
    .attr('id', 'background-map')
    .attr('width', numbers.MAP_WIDTH)
    .attr('height', numbers.MAP_HEIGHT * 10)

  const geojson = feature(data, data.objects.countries).features

  const countries = svg.append('g')
    .attr('class', 'countries')
    .selectAll('path')
    .data(geojson)

  countries.exit().remove()

  countries
    .enter(countries)
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', d => {
      // if (correct.indexOf(d.properties.iso_a2) === correct.length - 1) return colors.LAST_SELECTED
      if (correct.indexOf(d.properties.iso_a2) > -1) return colors.SELECTED
      return colors.NONE
    })
    .attr('stroke', d => {
      return colors.STROKE
    })
}

const Map = memoize(({correct}) => {
  let data = {}
  queue()
    .defer(json, 'topo.json')
    .await((error, response) => {
      if (error) return null
      data = response
      init(data, correct)
      select(window).on('resize', () => init(data, correct))
    })

  return <div />
})

export default Map
