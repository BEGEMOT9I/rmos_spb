import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './index.scss'

import Header from '../../components/Header'
import VideoModal from '../../components/VideoModal'

const Layout = ({ children }) => (
    <div id="layout">
        <Header/>
        { children }
        <VideoModal/>
    </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
