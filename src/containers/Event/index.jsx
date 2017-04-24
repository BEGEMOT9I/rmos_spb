import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './index.scss'

class Event extends Component {
  constructor(props) {
    super(props)
    this.data = this.props.events.filter((e) => +this.props.params.event_id === e.id )[0]
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="page-template">
        <div className="main-block">
          <div className="main-block__image" style={{ backgroundImage: `url(${API_URL}${this.data.file.url}` }}>
          </div>
          <div className="main-block__skin">
          </div>
          <span className="main-block__title">{ this.data.title }</span>
        </div>
      </div>
    )
  }
}

Event.propTypes = {
  events: PropTypes.array
}

const mapStateToProps = state => ({
  events: state.siteData.events
})

export default connect(mapStateToProps)(Event)
