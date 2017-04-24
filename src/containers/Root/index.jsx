import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

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
        return (<div />)
    }

    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <Route path="/" component={ Layout }>
            <IndexRoute component={ Home } />
            <Route path="/event/:event_id" component={ Event }/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  siteData: PropTypes.any,
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  siteData: state.siteData
});

export default connect(mapStateToProps)(Root)
