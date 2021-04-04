import { useContext } from 'react';
import { ExpenseTrackerContext } from './Context/Context';
import {
	incomeCategories,
	expenseCategories,
	resetCategories,
} from './constants/Categories';

const useTransactions = (title) => {
	resetCategories();
	const [{ transactions }] = useContext(ExpenseTrackerContext);
	const transactionPerType = transactions.filter((t) => t.type === title);

	const total = transactionPerType.reduce(
		(acc, currVal) =>
			(acc += Number(currVal.amount) !== NaN ? Number(currVal.amount) : 0),
		0
	);

	const categories = title === 'Income' ? incomeCategories : expenseCategories;
	transactionPerType.forEach((t) => {
		const category = categories.find((c) => c.type === t.category);
		if (category) category.amount += t.amount;
	});

	const filteredCategory = categories.filter((c) => c.amount > 0);

	const chartData = {
		datasets: [
			{
				data: filteredCategory.map((c) => c.amount),
				backgroundColor: filteredCategory.map((c) => c.color),
			},
		],
		labels: filteredCategory.map((c) => c.type),
	};
	return { total, chartData };
};

export default useTransactions;
