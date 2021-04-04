import React, { useReducer, createContext } from 'react';

export const ExpenseTrackerContext = createContext();

export const Provider = ({ initialState, reducer, children }) => {
	return (
		<ExpenseTrackerContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</ExpenseTrackerContext.Provider>
	);
};
