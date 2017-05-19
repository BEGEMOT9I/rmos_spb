import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import DOCTYPES from '../../constants/DocTypes'

import './index.scss'

class Documents extends Component {
  render() {
    return (
      <div className="page-template__block documents">
        <h1>Документы</h1>
        <ul className="documents-list">
          {
            this.props.documents.map(doc =>
              <li key={ `doc-${Math.random() * doc.id}` } className="doc__item">
                <img className="doc__icon" src={ DOCTYPES[doc.extension].icon } alt=""/>
                <a href={ API_URL + doc.file.url } className="doc__title" target="_blank" style={{ color: DOCTYPES[doc.extension].color }}>{ `${doc.title}.${doc.extension}` }</a>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

Documents.propTypes = {
  documents: PropTypes.array
}

const mapStateToProps = state => ({
  documents: state.siteData.documents
})

export default connect(mapStateToProps)(Documents)
