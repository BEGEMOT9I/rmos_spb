import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import './index.scss'

class Musics extends Component {
  render() {
    return (
      <div className="page-template__block musics">
        <h1>Аудио</h1>
        {
          this.props.musics.map(audio =>
            <audio key={ `audio-${Math.random() * audio.id}` } className="audio__item" controls>
              <source src={ API_URL + audio.file.url } type="audio/mpeg"></source>
            </audio>
          )
        }
      </div>
    )
  }
}

Musics.propTypes = {
  musics: PropTypes.array
}

const mapStateToProps = state => ({
  musics: state.siteData.musics
})

export default connect(mapStateToProps)(Musics)
