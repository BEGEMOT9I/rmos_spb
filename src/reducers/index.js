import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { siteData } from './siteData'
import { calendar } from './calendar'
import { videoModal } from './videoModal'
import { categories } from './categories'
import { tooltip } from './tooltip'
import { media } from './media'

export default combineReducers({
	routing,
	siteData,
  calendar,
  videoModal,
  categories,
  tooltip,
  media,
})
