import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import './styles/index.scss'

const store = configureStore();
const rootElement = document.getElementById('root');
const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    rootElement
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NextRoot = require('./containers/Root').default // eslint-disable-line global-require
        render(
            <AppContainer>
                <NextRoot store={store} history={history} />
            </AppContainer>,
            rootElement
        )
    });
}
