import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

export default function configureStore() {
    const initialState = {}

    const store = createStore(
        reducers,
        initialState,
        compose(
        applyMiddleware(thunkMiddleware, createLogger(), routerMiddleware(browserHistory)),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
        })
    }

    return store
}
