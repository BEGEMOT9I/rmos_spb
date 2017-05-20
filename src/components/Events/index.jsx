import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import EventItem from '../../components/EventItem'
import Filter from '../../components/Filter'

import './index.scss'

class Events extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      phrase: '',
      reverseDate: false,
    }

    this.filter(props, this.state)
  }

  componentWillUpdate(nextProps, nextState) {
    this.filter(nextProps, nextState)
  }

  filter(props, state) {
    const selectedCategoriesSize = Object.keys(props.selectedCategories).length
    const selectedDaysSize = Object.keys(props.selectedDays).length
    const { phrase } = state

    this.events = props.events.filter(event => {
      const hasSelectedCategory = !!event.categories.find((category) => props.selectedCategories[category.id])

      return (
        (!selectedCategoriesSize || hasSelectedCategory) &&
        (!selectedDaysSize || props.selectedDays[moment(event.start_time).format('DD/MM/YYYY')]) &&
        (!phrase || phrase && event.title.toLowerCase().indexOf(phrase.toLowerCase()) !== -1)
      )
    })

    if (state.reverseDate) {
      this.events.reverse()
    }
  }

  onInput = event => {
    this.setState({ ...this.state, phrase: event.currentTarget.value })
  }

  orderByDate = () => {
    this.setState({ ...this.state, reverseDate: !this.state.reverseDate })
  }

  render() {
    return (
      <div className="page-template__block events">
        <h1 className="block__title">События</h1>
        <Filter
          name="events"
          onInput={ this.onInput }
          orders={
            [
              {
                name: 'Дата',
                by: this.orderByDate,
                reverse: this.state.reverseDate,
              }
            ]
          }
        />
        {
          !this.events.length &&
          <h4 className="empty-phrase">Нет событий</h4>
        }
        {
          !!this.events.length &&
          <ul className="events__list">
            {
              this.events.map(event =>
                <EventItem key={ event.id } data={ event }/>
              )
            }
          </ul>
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
