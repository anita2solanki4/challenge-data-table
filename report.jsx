var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')
var rows = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
]

var reduce = function (row, memo) {
  switch (row.type) {
    case 'impression': {
      memo.impressions = ++memo.impressions || 1
      break
    }
    case 'display': {
      memo.displays = ++memo.displays || 1
      break
    }
    case 'load': {
      memo.loads = ++memo.loads || 1
      break
    }
  }
  return memo
}

var calculations = [
  {
    title: 'Impression',
    value: 'impressions',
    template: function (val, row) {
      return val
    }
  },
  {
    title: 'Loads',
    value: 'loads',
    template: function (val, row) {
      return val
    }
  },
  {
    title: 'Displays',
    value: 'displays',
    template: function (val, row) {
      return val
    }
  },
  {
    title: 'Load Rate',
    value: 'loadrate',
    template: function (val, row) {
      return ((row.loads / row.impressions) * 100).toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate',
    value: 'displayrate',
    template: function (val, row) {
      return ((row.displays / row.loads) * 100).toFixed(1) + '%'
    }
  }
]

module.exports = createReactClass({
  render () {
    console.log(rows)
    return (
      <ReactPivot compact='true' rows={rows} dimensions={dimensions} reduce={reduce} calculations={calculations} activeDimensions={['Date', 'Host']} defaultStyles='false' csvTemplateFormat='false' />
    )
  }
})
