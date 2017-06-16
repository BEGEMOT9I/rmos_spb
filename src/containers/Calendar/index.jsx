import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import moment from 'moment'

import CalendarTooltip from '../../components/CalendarTooltip'
import Categories from '../../components/Categories'
import Month from '../../components/Month'

import * as calendar from '../../actions/calendar'

import './index.scss'

class Calendar extends Component {
  constructor(props) {
    super(props)

    const now = new Date()
    this.firstDay = (this.props.events[0]) ? new Date(this.props.events[0].start_time) : now
    this.lastDay = (this.props.events[this.props.events.length - 1]) ? new Date(this.props.events[this.props.events.length - 1].start_time) : now

    if (now.getTime() < this.firstDay.getTime()) {
      this.firstDay = now
    }

    if (now.getTime() > this.lastDay.getTime()) {
      this.lastDay = now
    }
  }

  componentDidMount() {
    this.tooltip = document.querySelector('.calendar-tooltip')
  }

  generateMonths() {
    let months = []
    let monthEvents = []

    for (let month = new Date(this.firstDay); month.getFullYear() === this.lastDay.getFullYear() && month.getMonth() <= this.lastDay.getMonth() || month.getFullYear() < this.lastDay.getFullYear(); month.setMonth( month.getMonth() + 1 )) {
      if (!!this.props.date[month.getFullYear()] && !!this.props.date[month.getFullYear()][month.getMonth()]) {
        monthEvents = this.props.date[month.getFullYear()][month.getMonth()]
      } else {
        monthEvents = {}
      }

      months.push(
        <Month
          key={ `month-${month.getTime()}` }
          year={ month.getFullYear() }
          month={ month.getMonth() }
          monthEvents={ monthEvents }
          className={ classNames('month', { 'month_selected' : this.props.selectedYear === month.getFullYear() && this.props.selectedMonth === month.getMonth() }) }
        />
      )
    }

    return months
  }

  changeYear(delta) {
    const { dispatch } = this.props
    let next_date = new Date(this.props.selectedYear + delta, this.props.selectedMonth)

    if (
      moment(next_date).isBefore(this.firstDay) &&
      (next_date.getFullYear() < this.firstDay.getFullYear() || next_date.getMonth() < this.firstDay.getMonth()) ||
      moment(next_date).isAfter(this.lastDay) &&
      (next_date.getFullYear() > this.lastDay.getFullYear() || next_date.getMonth() > this.lastDay.getMonth())) {
      return
    }

    dispatch(calendar.selectYear(next_date.getFullYear()))
    
    if (next_date.getMonth() < this.firstDay.getMonth() && next_date.getFullYear() == this.firstDay.getFullYear()) {
      dispatch(calendar.selectMonth(this.firstDay.getMonth()))
    }

    if (next_date.getMonth() > this.lastDay.getMonth() && next_date.getFullYear() == this.lastDay.getFullYear()) {
      dispatch(calendar.selectMonth(this.lastDay.getMonth()))
    }
  }

  changeMonth(delta) {
    const { dispatch } = this.props
    let next_date = new Date(this.props.selectedYear, this.props.selectedMonth + delta)

    if (
      moment(next_date).isBefore(this.firstDay) &&
      (next_date.getFullYear() < this.firstDay.getFullYear() || next_date.getMonth() < this.firstDay.getMonth()) ||
      moment(next_date).isAfter(this.lastDay) &&
      (next_date.getFullYear() > this.lastDay.getFullYear() || next_date.getMonth() > this.lastDay.getMonth())) {
      return
    }
    
    if (next_date.getFullYear() !== this.props.selectedYear) {
      dispatch(calendar.selectYear(next_date.getFullYear()))
    }

    dispatch(calendar.selectMonth(next_date.getMonth()))
  }

  moveTooltip = event => {
    const parentRect = event.currentTarget.parentNode.getBoundingClientRect()
    const tooltipRect = this.tooltip.getBoundingClientRect()
    this.tooltip.style.top = event.pageY + 'px'
    this.tooltip.style.left = event.pageX - parentRect.left - tooltipRect.width / 2 + 'px'
  }

  render() {
    return (
      <div className="page-template__block calendar">
        <CalendarTooltip/>
        <Categories categories={ this.props.categories }/>
        <nav className="calendar__nav">
          <svg className="nav__arrow nav__arrow_left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175" onClick={ this.changeYear.bind(this, -1) }>
            <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>
          </svg>
          <svg className="nav__arrow nav__arrow_left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175" onClick={ this.changeMonth.bind(this, -1) }>
            <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>
          </svg>
          <span className="nav__title">{ this.props.selectedMonth + 1 } { this.props.selectedYear }</span>
          <svg className="nav__arrow nav__arrow_right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175" onClick={ this.changeMonth.bind(this, 1) }>
            <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/>
          </svg>
          <svg className="nav__arrow nav__arrow_right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175" onClick={ this.changeYear.bind(this, 1) }>
            <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/>
          </svg>
        </nav>
        <div className="calendar__container" onMouseMove={ this.moveTooltip }>
          { this.generateMonths() }
        </div>
      </div>
    )
  }
}

Calendar.propTypes = {
  categories: PropTypes.array,
  events: PropTypes.array,
  selectedMonth: PropTypes.number,
  selectedYear: PropTypes.number
}

const mapStateToProps = state => ({
  categories: state.siteData.categories,
  events: state.siteData.events,
  date: state.siteData.date,
  selectedMonth: state.calendar.selectedMonth,
  selectedYear: state.calendar.selectedYear
})

export default connect(mapStateToProps)(Calendar)
