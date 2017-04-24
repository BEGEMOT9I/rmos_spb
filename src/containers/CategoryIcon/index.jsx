import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import './index.scss'

class CategoryIcon extends Component {
  render() {
    return (
      <div className={ classNames('category-icon', {'category-icon_selected': this.props.selected}) } style={{ backgroundColor: this.props.category.color }} onClick={ this.props.onClick } >
        <img className="icon__image" src={ `${API_URL}${this.props.category.image.url}` } alt={ this.props.category.title } title={ this.props.category.title }/>
      </div>
    )
  }
}

CategoryIcon.propTypes = {
  category: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
}

export default CategoryIcon
