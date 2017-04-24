import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { siteData } from './siteData'
import { calendar } from './calendar'
import { videoModal } from './videoModal'
import { categories } from './categories'

export default combineReducers({
	routing,
	siteData,
  calendar,
  videoModal,
  categories
});
