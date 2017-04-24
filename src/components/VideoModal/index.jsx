import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from 'jquery'
import _ from 'lodash'

import * as videoModal from '../../actions/videoModal'

import './index.scss'

class VideoModal extends Component {
  render() {
    return (
      <div className={ (this.props.opened) ? 'modal-window modal-window_opened' : 'modal-window' }>
        <ReactCSSTransitionGroup
          component="div"
          className="modal-window__video-wrapper"
          transitionName="video-animation"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {
            this.props.video &&
            <video key={ `modal-video-${this.props.video.id}` } className="video" playsInline controls>
              <source src={ `${API_URL}${this.props.video.file.url}` } type="video/mp4"></source>
            </video>
          }
        </ReactCSSTransitionGroup>
        <ul className="modal-window__videos">
          {
            this.props.videos.map(video =>
              <li key={ `modal-video-preview-${video.id}` } className="videos__item">
                <picture className="video__pic" onClick={ () => this.props.selectVideo(video) }>
                  <source media="all" srcSet={ `${API_URL}${video.file.thumb.url}` }></source>
                  <img className="pic__image" src={ `${API_URL}${video.file.thumb.url}` } />
                </picture>
                <span className="video__title">{ video.title }</span>
              </li>
            )
          }
        </ul>
        <div className="modal-window__closer" onClick={ () => this.props.closeModal(false) }></div>
      </div>
    )
  }
}

VideoModal.propTypes = {
  videos: PropTypes.array,
  video: PropTypes.object,
  opened: PropTypes.bool
}

const mapStateToProps = state => ({
  videos: state.siteData.videos,
  video: state.videoModal.video,
  opened: state.videoModal.opened
})

const mapDispatchToProps = dispatch => ({
  closeModal: open => dispatch(videoModal.toggle(open)),
  selectVideo: video => dispatch(videoModal.selectVideo(video))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal)