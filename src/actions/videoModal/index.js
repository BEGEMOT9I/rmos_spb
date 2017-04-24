export const SELECT_VIDEO = 'SELECT_VIDEO'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export function selectVideo(video) {
  return { type: SELECT_VIDEO, payload: video }
}

export function toggle(open, video) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_MODAL, payload: open })

    if (open) {
      dispatch(selectVideo(video))
    }
  }
}