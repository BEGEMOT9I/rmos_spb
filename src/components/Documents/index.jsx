import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Filter from '../Filter'

import DOCTYPES from '../../constants/DocTypes'

import './index.scss'

class Documents extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      phrase: '',
      sorters: [],
    }

    this.sorters = Object.keys(DOCTYPES).map(name => {
      return {
        name,
        style: {
          color: DOCTYPES[name].color,
        }
      }
    })

    this.filter(props, this.state)
  }

  componentWillUpdate(nextProps, nextState) {
    this.filter(nextProps, nextState)
  }

  filter(props, state) {
    const { phrase, sorters } = state

    this.documents = props.documents.filter(doc => {
      return (
        (!phrase || phrase && `${doc.title}.${doc.extension}`.toLowerCase().indexOf(phrase.toLowerCase()) !== -1) &&
        (!sorters.length || sorters.length && sorters.includes(doc.extension))
      )
    })
  }

  onInput = event => {
    this.setState({ ...this.state, phrase: event.currentTarget.value })
  }

  sortBy = extension => {
    const sorters = [...this.state.sorters]
    const index = sorters.indexOf(extension)

    index !== -1 ? sorters.splice(index, 1) : sorters.push(extension)

    this.setState({ ...this.state, sorters })
  }

  render() {
    return (
      <div className="page-template__block documents">
        <h1 className="block__title">Документы</h1>
        <Filter
          name="documents"
          onInput={ this.onInput }
          sorters={ this.sorters.map(sorter => {
            sorter.selected = this.state.sorters.includes(sorter.name)
            sorter.by = this.sortBy
            return sorter
          }) }
        />
        {
          !this.documents.length &&
          <h4 className="empty-phrase">Нет документов</h4>
        }
        {
          !!this.documents.length &&
          <ul className="documents__list">
            {
              this.documents.map(doc => 
                <li key={ `doc-${doc.id}` } className="doc__item">
                  <img className="doc__icon" src={ DOCTYPES[doc.extension].icon } alt=""/>
                  <a href={ API_URL + doc.file.url } className="doc__title" target="_blank" style={{ color: DOCTYPES[doc.extension].color }}>{ `${doc.title}.${doc.extension}` }</a>
                </li>
              )
            }
          </ul>
        }
      </div>
    )
  }
}

Documents.propTypes = {
  documents: PropTypes.array
}

const mapStateToProps = state => ({
  documents: state.siteData.documents
})

export default connect(mapStateToProps)(Documents)
