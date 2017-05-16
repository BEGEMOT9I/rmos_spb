import * as actions from '../../actions/tooltip'

const initialState = {
  isVisible: false,
  events: [],
}

export const tooltip = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_TOOLTIP:
      return {
        ...state,
        isVisible: action.payload.show,
        events: action.payload.events || state.events,
      }
    default:
      return state
  }
};