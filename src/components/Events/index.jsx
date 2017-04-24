import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { FormattingDate } from '../../modules/helpers'

import EventItem from '../../components/EventItem'

import './index.scss'

class Events extends Component {
  constructor(props) {
    super(props)
    this.filter(props)
  }

  componentWillReceiveProps(nextProps) {
    this.filter(nextProps)
  }

  filter(props) {
    const selectedCategoriesSize = Object.keys(props.selectedCategories).length
    const selectedDaysSize = Object.keys(props.selectedDays).length

    this.events = props.events.map(event => {
      const hasSelectedCategory = !!event.categories.find((category) => props.selectedCategories[category.id])

      if ((!selectedCategoriesSize || hasSelectedCategory) && (!selectedDaysSize || props.selectedDays[FormattingDate(event.start_time)])) {
        return(<EventItem key={ event.id } data={ event }></EventItem>)
      }
    })
  }

  render() {
    return (
      <div className="page-template__block events">
        <h1>События</h1>
        {
          this.events.map(event => event)
        }
      </div>
    )
  }
}

Events.propTypes = {
  events: PropTypes.any
}

const mapStateToProps = state => ({
  events: state.siteData.events,
  selectedCategories: state.categories.selected,
  selectedDays: state.calendar.selectedDays,
})

export default connect(mapStateToProps)(Events)
