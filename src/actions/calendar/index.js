export const TOGGLE_DAY = 'TOGGLE_DAY'
export const SELECT_MONTH = 'SELECT_MONTH'
export const SELECT_YEAR = 'SELECT_YEAR'

export function toggleDay(day) {
  return { type: TOGGLE_DAY, payload: day }
}

export function selectMonth(month) {
  return { type: SELECT_MONTH, payload: month }
}

export function selectYear(year) {
  return { type: SELECT_YEAR, payload: year }
}