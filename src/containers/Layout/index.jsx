import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import './index.scss'

import Header from '../../components/Header'
import VideoModal from '../../components/VideoModal'

const Layout = ({ siteData, children }) => {
  if (!siteData) {
    return (<div></div>)
  } else {
    return(
      <div id="layout">
        <Header/>
        { children }
        <VideoModal/>
      </div>
    )
  }
}

Layout.propTypes = {
  siteData: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const mapStateToProps = state => ({
  siteData: state.siteData
})

export default connect(mapStateToProps)(Layout)
