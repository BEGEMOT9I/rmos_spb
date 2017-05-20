import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Filter from '../Filter'

import AUDIOTYPES from '../../constants/AudioTypes'

import * as media from '../../actions/media'

import './index.scss'

class Musics extends Component {
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

    this.musics = props.musics.filter(music => {
      return (
        (!phrase || phrase && `${music.title}.${music.extension}`.toLowerCase().indexOf(phrase.toLowerCase()) !== -1)
      )
    })
  }

  onInput = event => {
    this.setState({ ...this.state, phrase: event.currentTarget.value })
  }

  render() {
    return (
      <div className="page-template__block musics">
        <h1>Аудио</h1>
        <Filter
          name="musics"
          onInput={ this.onInput }
        />
        {
          !this.musics.length &&
          <h4 className="empty-phrase">Нет аудиозаписей</h4>
        }
        {
          !!this.musics.length &&
          <ul className="musics__list" onPlay={ this.props.updateMedia }>
          {
            this.musics.map(audio =>
              <li key={ `audio-${audio.id}` } className="music__item">
                <span className="audio__title">{ audio.title }</span>
                <audio id={ `audio-${audio.id}` } className="audio__content" controls>
                  <source src={ API_URL + audio.file.url } type={ AUDIOTYPES[audio.extension].type }></source>
                </audio>
              </li>
            )
          }
          </ul>
        }
      </div>
    )
  }
}

Musics.propTypes = {
  musics: PropTypes.array,
}

const mapStateToProps = state => ({
  musics: state.siteData.musics,
})

const mapDispatchToProps = dispatch => ({
  updateMedia: event => dispatch(media.update(event.target.getAttribute('id'))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Musics)
