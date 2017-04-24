export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'

export function toggle(category) {
  return { type: TOGGLE_CATEGORY, payload: category }
}
