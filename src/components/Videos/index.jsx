import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as videoModal from '../../actions/videoModal'

import './index.scss'

class Videos extends Component {
  render() {
    return (
      <div className="page-template__block videos">
        <h1>Видео</h1>
        <div className="videos__container">
          {
            this.props.videos.map((video, index) =>
              <div key={ `video-${index}` } className="video">
                <picture className="video__pic" onClick={ () => this.props.openModal(true, video) }>
                  <source media="all" srcSet={ `${API_URL}${video.file.thumb.url}` }></source>
                  <img className="pic__image" src={ `${API_URL}${video.file.thumb.url}` } />
                </picture>
                <span className="video__title">{ video.title }</span>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

Videos.propTypes = {
  videos: PropTypes.any
}

const mapStateToProps = state => ({
  videos: state.siteData.videos
})

const mapDispatchToProps = dispatch => ({
  openModal: (open, video) => dispatch(videoModal.toggle(open, video))
})

export default connect(mapStateToProps, mapDispatchToProps)(Videos)