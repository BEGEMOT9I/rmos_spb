import * as actions from '../../actions/siteData';

export const siteData = (state = null, action) => {
	switch (action.type) {
		case actions.LOAD:
			return { ...action.payload, events: action.payload.events.map(event => { 
        return {...event, start_time: new Date(event.start_time) }
      }) }
		default:
			return state
	}
};
