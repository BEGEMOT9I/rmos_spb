import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './index.scss'

class NavLink extends Component {
  render() {
    return (
      <Link { ...this.props } activeClassName='active'>
        { this.props.name }
      </Link>
    )
  }
}

NavLink.propTypes = {
  name: PropTypes.node.isRequired
}

export default NavLink