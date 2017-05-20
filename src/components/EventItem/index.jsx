import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'

import './index.scss'

class EventItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="event__item">
        <Link to={ `/event/${this.props.data.id}` } className="item__title">{ this.props.data.title }</Link>
        <time className="item__time">{ moment(this.props.data.start_time).format('DD/MM/YYYY') }</time>
      </li>
    )
  }
}

EventItem.propTypes = {
  data: PropTypes.object
}

export default EventItem