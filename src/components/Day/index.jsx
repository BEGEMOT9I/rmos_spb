import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import moment from 'moment'

import * as calendar from '../../actions/calendar'
import * as tooltip from '../../actions/tooltip'

import Categories from '../Categories'

import './index.scss'

class Day extends Component {
  constructor(props) {
    super(props)
    this.date = new Date(this.props.date)
    this.categories = []

    let buffer = {}

    this.props.events.forEach(event => {
      event.categories.forEach(category => {
        if (!buffer[category.id]) {
          buffer[category.id] = category
        }
      })
    })

    for (let [key, value] of Object.entries(buffer)) {
      this.categories.push(value)
    }
  }

  showTooltip = () => {
    this.props.showTooltip(this.props.events)
  }

  hideTooltip = () => {
    this.props.hideTooltip()
  }

  render() {
    return (
      <div
        className={ classNames('day', { 'day_selected': this.props.selectedDays[moment(this.date).format('DD/MM/YYYY')] }) }
        onClick={ () => this.props.toggleDay(this.date) }
        onMouseEnter={ this.showTooltip }
        onMouseLeave={ this.hideTooltip }
      >
        <span>{ this.date.getDate() }</span>
        <Categories categories={ this.categories } mini/>
      </div>
    )
  }
}

Day.propTypes = {
  events: PropTypes.array,
  date: PropTypes.number,
  selectedDays: PropTypes.object,
}

const mapStateToProps = state => ({
  selectedDays: state.calendar.selectedDays,
})

const mapDispatchToProps = dispatch => ({
  toggleDay: day => dispatch(calendar.toggleDay(day)),
  showTooltip: events => dispatch(tooltip.toggle(true, events)),
  hideTooltip: () => dispatch(tooltip.toggle(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Day)
