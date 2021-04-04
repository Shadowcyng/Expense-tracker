import React, { useEffect, useRef } from 'react';
import Details from './Components/Details/Details';
import { Grid } from '@material-ui/core';
import {
	PushToTalkButton,
	PushToTalkButtonContainer,
	ErrorPanel,
} from '@speechly/react-ui';
import useStyles from './Styles';
import Main from './Components/Main/Main';
import { SpeechState, useSpeechContext } from '@speechly/react-client';

function App() {
	const classes = useStyles();
	const main = useRef(null);

	const executeScroll = () => {
		main.current.scrollIntoView();
		console.log(`hello`);
	};
	const { speechState } = useSpeechContext();

	useEffect(() => {
		if (speechState === SpeechState.Recording) {
			executeScroll();
		}
	}, [speechState]);
	return (
		<div className='App'>
			<Grid
				className={classes.grid}
				container
				spacing={0}
				alignItems='center'
				justify='center'
				style={{ height: '100vh' }}
			>
				<Grid item xs={12} sm={4} className={classes.mobile}>
					<Details title='Income' />
				</Grid>
				<Grid item xs={12} sm={3} ref={main} className={classes.main}>
					<Main />
				</Grid>
				<Grid item xs={12} sm={4} className={classes.desktop}>
					<Details title='Income' />
				</Grid>
				<Grid item xs={12} sm={4} className={classes.last}>
					<Details title='Expense' />
				</Grid>
			</Grid>
			<PushToTalkButtonContainer>
				<PushToTalkButton />
				<ErrorPanel />
			</PushToTalkButtonContainer>
		</div>
	);
}

export default App;
