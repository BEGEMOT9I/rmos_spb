import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import './index.scss'

class Documents extends Component {
  render() {
    return (
      <div className="page-template__block documents">
        <h1>Документы</h1>
        {
          this.props.documents.map(doc =>
            <div key={ `doc-${Math.random() * doc.id}` } className="doc__item">
              <a href={ API_URL + doc.file.url } className="doc__title" target="_blank">{ doc.title }</a>
            </div>
          )
        }
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
