import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './index.scss'

const CalendarTooltip = props => {
  const categoriesLength = Object.keys(props.categories).length
  const events = props.events.map(event => {
    const hasSelectedCategory = !!event.categories.find(category => props.categories[category.id])

    if (!categoriesLength || hasSelectedCategory) {
      return(
        <li key={ event.id } className="tooltip-item">
          <Link className="tooltip-item__link" to={ '/event/' + event.id }>{ event.title }</Link>
        </li>
      )
    }
  })

  return(
    <div className={ props.isVisible ? 'calendar-tooltip tooltip_show' : 'calendar-tooltip' }>
      <ul className="tooltip-list">
        { events.map(event => event) }
        {
          !events.length &&
          <li className="tooltip-item">
            <span className="tooltip-item__empty">В этот день событий нет</span>
          </li>
        }
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  categories: state.categories.selected,
  events: state.tooltip.events,
  isVisible: state.tooltip.isVisible,
})

export default connect(mapStateToProps)(CalendarTooltip)