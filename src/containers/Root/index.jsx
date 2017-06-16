import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import Layout from '../Layout'
import Home from '../Home'
import Event from '../Event'

import { getData } from '../../actions/siteData'

class Root extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getData())
  }

  render() {
    if (!this.props.siteData) {
      return (<div/>)
    } else {
      const currentBranch = this.props.siteData.branch.current
      const defaultBranch = this.props.siteData.branch.default

      return (
        <Provider store={this.props.store}>
          <Router history={this.props.history}>
            <Redirect from="/" to={ '/spb' }/>
            <Route path="/" component={ Layout }>
              <Route path={ currentBranch.path } component={ Home } />
              <Route path={ `${currentBranch.path}/event/:event_id` } component={ Event }/>
            </Route>
          </Router>
        </Provider>
      )
    }
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  siteData: state.siteData
})

export default connect(mapStateToProps)(Root)
