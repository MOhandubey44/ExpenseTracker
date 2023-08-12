// App.js
import React, { useState, useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_EXPENSE":
      return {
        expenses: [payload.expense, ...state.expenses],
      };
    case "REMOVE_EXPENSE":
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id),
      };
    case "UPDATE_EXPENSE":
      return {
        expenses: state.expenses.map((expense) =>
          expense.id === payload.expense.id ? payload.expense : expense
        ),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [selectedExpense, setSelectedExpense] = useState(null);

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };

  const updateExpense = (expense) => {
    dispatch({ type: "UPDATE_EXPENSE", payload: { expense } });
  };

  const changeExpenseToUpdate = (expense, index) => {
    setSelectedExpense({ ...expense, index }); // Set the index of the selected expense
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          selectedExpense={selectedExpense}
          onSaveEdit={(editedExpense) => {
            updateExpense(editedExpense);
            setSelectedExpense(null); // Clear the selectedExpense after edit
          }}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={changeExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
