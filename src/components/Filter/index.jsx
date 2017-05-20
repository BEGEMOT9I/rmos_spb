import React, { PropTypes } from 'react'

import './index.scss'

const Filter = ({ name, onInput, sorters = [], orders = [] }) => (
  <form className="filter" action="/" method="get">
    <div className="filter__search">
      <label className="search__label" htmlFor={ `${name}_search` }>Поиск</label>
      <input
        id={ `${name}_search` }
        className="search__input"
        type="text"
        placeholder="..." 
        onInput={ onInput }
      />
    </div>
    {
      !!sorters.length &&
      <div className="filter__sorters">
        {
          sorters.map(sorter =>
            <button
              key={ 'sorter-' + sorter.name }
              className={ sorter.selected ? 'sorter sorter_selected' : 'sorter' }
              type="button"
              style={ sorter.style }
              onClick={ sorter.by.bind(this, sorter.name) }
            >
              <span className="sorter__name">{ sorter.name }</span>
            </button>
          )
        }
      </div>
    }
    {
      !!orders.length &&
      <div className="filter__orders">
        {
          orders.map(order =>
            <button
              key={ 'order-' + order.name }
              className="order"
              type="button"
              onClick={ order.by }
            >
              <span className="order__name">{ order.name }</span>
              <span className="order__arrow" dangerouslySetInnerHTML={{ __html: order.reverse ? "&#8593;" : "&#8595;" }}></span>
            </button>
          )
        }
      </div>
    }
  </form>
)

Filter.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Filter