import * as actions from '../../actions/media'

const initialState = {
  id: void 0
}

export const media = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_MEDIA:
      if (state.id && state.id !== action.payload) {
        let element = document.getElementById(state.id)

        if (element) {
          element.pause()
        }
      }
      return { ...state, id: action.payload }
    default:
      return state
  }
}