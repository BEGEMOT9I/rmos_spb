import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import * as categories from '../../actions/categories'

import CategoryIcon from '../../containers/CategoryIcon'

import './index.scss'

class Categories extends Component {
  render() {
    return (
      <ul className={ classNames('categories', { 'categories_mini': this.props.mini }) }>
        {
          this.props.categories.map(category =>
            <li key={ `category-${category.id}` } className="category">
              <CategoryIcon
                category={ category }
                selected={ this.props.selectedCategories[category.id] }
                onClick={
                  (e) => {
                    e.stopPropagation()
                    return this.props.toggleCategory(category)
                  }
                }/>
            </li>
          )
        }
      </ul>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.object,
  mini: PropTypes.bool,
}

const mapStateToProps = state => ({
  selectedCategories: state.categories.selected,
})

const mapDispatchToProps = dispatch => ({
  toggleCategory: category => dispatch(categories.toggle(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)