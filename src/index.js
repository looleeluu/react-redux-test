import reportWebVitals from './reportWebVitals';
import './index.css';

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/reducers';
import App from './components/TasksBox';

const store = createStore(reducers);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

reportWebVitals();