import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './index.scss'

class EventItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="event__item">
        <Link to={ `/event/${this.props.data.id}` } className="item__title">{ this.props.data.title }</Link>
      </div>
    )
  }
}

EventItem.propTypes = {
  data: PropTypes.object
}

export default EventItem