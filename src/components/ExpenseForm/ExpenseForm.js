// ExpenseForm.js
import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, selectedExpense, onSaveEdit }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  useEffect(() => {
    if (selectedExpense) {
      expenseTextInput.current.value = selectedExpense.text;
      expenseAmountInput.current.value = selectedExpense.amount;
    }
  }, [selectedExpense]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;

    if (parseInt(expenseAmount) === 0) {
      return;
    }

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: selectedExpense ? selectedExpense.id : new Date().getTime(),
    };

    if (selectedExpense) {
      onSaveEdit(expense);
    } else {
      addExpense(expense);
    }

    clearInput();
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{selectedExpense ? "Edit transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {selectedExpense ? "Edit Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
