import { createContext, useReducer } from "react";


const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-07-21')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 23.99,
        date: new Date('2021-07-21')
    },
    {
        id: 'e3',
        description: 'T-shirt',
        amount: 17.99,
        date: new Date('2022-07-26')
    },
    {
        id: 'e4',
        description: 'Shorts',
        amount: 21.99,
        date: new Date('2020-02-04')
    },
    {
        id: 'e5',
        description: 'Mobile',
        amount: 259.99,
        date: new Date('2022-07-22')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-07-21')
    },
    {
        id: 'e7',
        description: 'A pair of trousers',
        amount: 23.99,
        date: new Date('2021-07-21')
    },
    {
        id: 'e8',
        description: 'T-shirt',
        amount: 17.99,
        date: new Date('2022-07-26')
    },
    {
        id: 'e9',
        description: 'Shorts',
        amount: 21.99,
        date: new Date('2020-02-04')
    },
    {
        id: 'e10',
        description: 'Mobile',
        amount: 259.99,
        date: new Date('2022-07-22')
    }

];

export const ExpensesContext = createContext({

    expenses: [

    ],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }

});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;

    }
}

function ExpensesContextProvider({ children }) {

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return (
        <ExpensesContext.Provider value={value} >{children}</ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider