import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import VIDEOTYPES from '../../constants/VideoTypes'
import DOCTYPES from '../../constants/DocTypes'

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
    const { title, start_time, file, description, video } = this.data
    const documents = [...this.data.documents, ...this.data.external_documents]

    return (
      <div className="page-template">
        <section className="page-template__block main-block">
          <div className="main-block__image" style={{ backgroundImage: `url(${API_URL}${file.url}` }}>
          </div>
          <div className="main-block__skin">
          </div>
          <h1 className="main-block__title">{ title }</h1>
          <time className="main-block__time">{ moment(start_time).format('DD/MM/YYYY') }</time>
        </section>
        {
          !!documents.length &&
          <section className="page-template__block event__documents">
            <ul className="documents__list">
              {
                documents.map(doc =>
                  <li key={ `doc-${doc.id}` } className="doc__item">
                    <img className="doc__icon" src={ DOCTYPES[doc.extension].icon } alt=""/>
                    <a href={ API_URL + doc.file.url } className="doc__title" target="_blank" style={{ color: DOCTYPES[doc.extension].color }}>{ `${doc.title}.${doc.extension}` }</a>
                  </li>
                )
              }
            </ul>
          </section>
        }
        <section className="page-template__block event-info">
          {
            video.url &&
            <video className="event-info__video" playsInline controls>
              <source src={ `${API_URL}${video.url}` } type={ VIDEOTYPES[video.extension].type }></source>
            </video>
          }
          <span className="event-info__description" dangerouslySetInnerHTML={{ __html: description }}></span>
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
