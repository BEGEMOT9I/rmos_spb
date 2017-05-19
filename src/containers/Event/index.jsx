import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

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
        <section className="page-template__block main-block">
          <div className="main-block__image" style={{ backgroundImage: `url(${API_URL}${this.data.file.url}` }}>
          </div>
          <div className="main-block__skin">
          </div>
          <h1 className="main-block__title">{ this.data.title }</h1>
          <time className="main-block__time">{ moment(this.data.start_time).format('DD/MM/YYYY') }</time>
        </section>
        <section className="page-template__block">
        </section>
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
