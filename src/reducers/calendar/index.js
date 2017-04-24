import { uniqueId } from 'lodash'

import { IsEqualDates, FormattingDate } from '../../modules/helpers'

import * as actions from '../../actions/calendar';

var today = new Date()

const initialState = {
  selectedDays: {},
  selectedMonth: today.getMonth(),
  selectedYear: today.getFullYear()
}

export const calendar = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_DAY:
      let selected = { ...state.selectedDays }
      const day = FormattingDate(action.payload)

      if (selected[day]) {
        delete selected[day]
      } else {
        selected[day] = true
      }

      return {
        ...state,
        id: uniqueId(),
        selectedDays: selected,
        selectedMonth: action.payload.getMonth(),
        selectedYear: action.payload.getFullYear()
      }
    case actions.SELECT_MONTH:
      return {
        ...state,
        selectedMonth: action.payload
      }
    case actions.SELECT_YEAR:
      return {
        ...state,
        selectedYear: action.payload
      }
    default:
      return state
  }
};