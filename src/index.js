import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import getRoutes from './routes';
import reducer from './redux/reducer'

const store = createStore(reducer)

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			
		</Router>
	</Provider>
)

