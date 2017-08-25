var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

module.exports = createReactClass({
  render () {
    return (
      <ReactPivot compact='true' rows={rows} dimensions={dimensions}
        reduce={reduce} calculations={calculations}
        activeDimensions={['Date', 'Host']} defaultStyles='false'
        csvTemplateFormat='false' />
    )
  }
})

var rows = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date', className: 'react-pivot-date'},
  {value: 'host', title: 'Host'}
]

var reduce = function (row, memo) {
  if (row.type === 'impression') memo.impressions = ++memo.impressions || 1
  if (row.type === 'display') memo.displays = ++memo.displays || 1
  if (row.type === 'load') memo.loads = ++memo.loads || 1
  return memo
}

var calculations = [
  {
    title: 'Impression',
    value: 'impressions',
    template: function (val) {
      return val.toString()
    }
  },
  {
    title: 'Loads',
    value: 'loads',
    template: function (val) {
      return val.toString()
    }
  },
  {
    title: 'Displays',
    value: 'displays',
    template: function (val) {
      return val.toString()
    }
  },
  {
    title: 'Load Rate',
    value: function (row) {
      return ((row.loads / row.impressions) * 100)
    },
    template: function (val) {
      return val.toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate',
    value: function (row) {
      return ((row.displays / row.loads) * 100)
    },
    template: function (val) {
      return val.toFixed(1) + '%'
    },
    className: 'react-pivot-display-date'
  }
]
