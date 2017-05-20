import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Day from '../Day'

import './index.scss'

class Month extends Component {
  constructor(props) {
    super(props)
    this.firstDay = new Date(this.props.year, this.props.month)
  }

  filterEvents(day) {
    if (!!this.props.monthEvents[day.getDate()]) {
      return this.props.monthEvents[day.getDate()]
    } else {
      return []
    }
  }

  generateDays() {
    let weeks = [],
        days = [],
        day

    // Days from previous month and in the current week
    if (this.firstDay.getDay() !== 1) {
      for (day = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() - 1); day.getDay() >= 1; day.setDate(day.getDate() - 1)) {
        days.unshift(<Day key={ `day-${day.getTime()}` } date={ day.getTime() } events={ this.filterEvents(day) }/>)
      }
    }

    // Days from current month
    for (day = new Date(this.firstDay); day.getMonth() === this.firstDay.getMonth(); day.setDate(day.getDate() + 1)) {
      days.push(<Day key={ `day-${day.getTime()}` } date={ day.getTime() } events={ this.filterEvents(day) }/>)
    }

    // Days from current week and next month
    for (day; day.getDay() !== 1; day.setDate(day.getDate() + 1)) {
      days.push(<Day key={ `day-${day.getTime()}` } date={ day.getTime() } events={ this.filterEvents(day) }/>)
    }

    for (let week = new Date(this.firstDay), count = 0; week.getTime() < day.getTime(); week.setDate(week.getDate() + 7)) {
      weeks.push(
        <div key={ `week-${week.getTime()}` } className="week">
          { days.slice(count, count + 7) }
        </div>
      )
      count += 7
    }

    return weeks
  }

  render() {
    return (
      <div className={ this.props.className } data-year={ this.props.year } data-month={ this.props.month }>
        { this.generateDays() }
      </div>
    )
  }
}

Month.propTypes = {
  events: PropTypes.array,
  monthEvents: PropTypes.object,
}

export default Month
