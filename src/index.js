// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';

registerServiceWorker();
ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<App />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);
