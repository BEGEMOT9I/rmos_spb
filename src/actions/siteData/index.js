import * as axios from 'axios'

export const LOAD = 'LOAD'

export function load(data) {
  let object = {}

  data.events.forEach(event => {
    const date = new Date(event.start_time)
    const eventYear = date.getFullYear()
    const eventMonth = date.getMonth()
    const eventDay = date.getDate()

    if (!object[eventYear]) {
      object[eventYear] = {}
    }

    if (!object[eventYear][eventMonth]) {
      object[eventYear][eventMonth] = {}
    }

    if (!object[eventYear][eventMonth][eventDay]) {
      object[eventYear][eventMonth][eventDay] = []
    }

    object[eventYear][eventMonth][eventDay].push(event)
  })

  return { type: LOAD, payload: { ...data, date: object } }
}

export function getData() {
  return (dispatch) => {
    if (typeof API_URL !== 'undefined') {
      axios
        .get(`/data`)
        .then(response => dispatch(load(response.data)))
    } else {
      dispatch(load({ data: 'empty' }))
    }
  }
}
