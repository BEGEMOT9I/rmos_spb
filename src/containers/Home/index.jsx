import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import Calendar from '../Calendar'

import Events from '../../components/Events'
import Documents from '../../components/Documents'
import Musics from '../../components/Musics'
import Gallery from '../../components/Gallery'
import Videos from '../../components/Videos'

class Home extends Component {
  render() {
    return (
      <div className="page-template">
        <Calendar/>
        <Events/>
        <Documents/>
        <Musics/>
        <Gallery/>
        <Videos/>
      </div>
    )
  }
}

export default Home
