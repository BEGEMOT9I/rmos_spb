export const TOGGLE_TOOLTIP = 'TOGGLE_TOOLTIP'

export function toggle(show, events) {
  return { type: TOGGLE_TOOLTIP, payload: { show, events } }
}