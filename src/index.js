import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './Context/Context';
import { ContextReducer, initialState } from './Context/ContextReducer';
import { SpeechProvider } from '@speechly/react-client';
import './index.css';

ReactDOM.render(
	<SpeechProvider appId='8d1e2f63-1fee-4cfb-be47-f2f695e74c15' language='en-US'>
		<Provider reducer={ContextReducer} initialState={initialState}>
			<App />
		</Provider>
	</SpeechProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
