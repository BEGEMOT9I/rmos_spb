import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import Filter from '../Filter'

import * as videoModal from '../../actions/videoModal'

import './index.scss'

class Videos extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      phrase: '',
    }

    this.filter(props, this.state)
  }

  componentWillUpdate(nextProps, nextState) {
    this.filter(nextProps, nextState)
  }

  filter(props, state) {
    const { phrase } = state

    this.videos = props.videos.filter(video => {
      return (
        (!phrase || phrase && `${video.title}.${video.extension}`.toLowerCase().indexOf(phrase.toLowerCase()) !== -1)
      )
    })
  }

  onInput = event => {
    this.setState({ ...this.state, phrase: event.currentTarget.value })
  }

  render() {
    return (
      <div className="page-template__block videos">
        <h1 className="block__title">Видео</h1>
        <Filter
          name="videos"
          onInput={ this.onInput }
        />
        {
          !this.videos.length &&
          <h4 className="empty-phrase">Нет видео</h4>
        }
        {
          !!this.videos.length &&
          <ul className="videos__list">
            {
              this.props.videos.map((video, index) =>
                <li key={ `video-${index}` } className="video">
                  <picture className="video__pic" onClick={ () => this.props.openModal(true, video) }>
                    <source media="all" srcSet={ `${API_URL}${video.file.thumb.url}` }></source>
                    <img className="pic__image" src={ `${API_URL}${video.file.thumb.url}` } />
                  </picture>
                  <span className="video__title">{ video.title }</span>
                </li>
              )
            }
          </ul>
        }
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