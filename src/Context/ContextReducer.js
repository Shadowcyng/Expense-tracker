export const initialState = {
	transactions: JSON.parse(localStorage.getItem('transactions')) || [
		{
			amount: 100,
			type: 'Income',
			category: 'Salary',
			date: '2021-04-05',
			id: '4c7dfc45-ee41-482b-920b-88af3bce4611',
		},
		{
			amount: 75,
			type: 'Income',
			category: 'Gifts',
			date: '2021-04-08',
			id: '4c7dfc45-ee41-482b-920b-88af3bce4610',
		},
		{
			amount: 100,
			type: 'Expense',
			category: 'Travel',
			date: '2021-04-05',
			id: '4c7dfc45-ee41-482b-920b-88af3bce4612',
		},
		{
			amount: 50,
			type: 'Expense',
			category: 'Car',
			date: '2021-04-10',
			id: '4c7dfc45-ee41-482b-920b-88af3bce461',
		},
	],
};

export const ContextReducer = (state = initialState, action) => {
	let trans;
	switch (action.type) {
		case 'DELETE_TRANSACTION':
			trans = state.transactions.filter((t) => t.id !== action.payload);
			localStorage.setItem('transactions', JSON.stringify(trans));
			return {
				transactions: trans,
			};

		case 'ADD_TRANSACTION':
			trans = [action.payload, ...state.transactions];
			localStorage.setItem('transactions', JSON.stringify(trans));
			return { transactions: trans };

		default:
			return state;
	}
};
