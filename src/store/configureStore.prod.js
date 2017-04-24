import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

export default function configureStore() {
	const initialState = {}

	const store = createStore(
		reducers,
		initialState,
		compose(
			applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory))
		)
	)

	return store
}
