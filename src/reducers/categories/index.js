import { uniqueId } from 'lodash'

import * as actions from '../../actions/categories'

const initialState = {
  id: uniqueId(),
  selected: {},
}

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_CATEGORY:
      let selected = { ...state.selected }
      if (selected[action.payload.id]) {
        delete selected[action.payload.id]
      } else {
        selected[action.payload.id] = true
      }

      return { id: uniqueId(), selected }
    default:
      return state
  }
};