import * as actions from '../../actions/videoModal'

const initialState = {
  video: undefined,
  opened: false
}

export const videoModal = (state = initialState, action) => {
  switch (action.type) {
    case actions.SELECT_VIDEO:
      return {
        ...state,
        video: action.payload
      }
    case actions.TOGGLE_MODAL:
      return {
        ...state,
        opened: action.payload
      }
    default:
      return state
  }
};