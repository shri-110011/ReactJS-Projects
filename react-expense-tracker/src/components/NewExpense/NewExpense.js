import React from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

/* Here we add the ExpenseForm component. We want to have the form controls to be in its
own component. */
// const NewExpense = () => {
//     const saveExpenseDataHandler = (enteredExpenseData) => {
//         const expenseData = {
//             id: Math.random().toString(),
//             ...enteredExpenseData
//         };
//         console.log(expenseData);
//     }

//     return (
//         <div className="new-expense">
//             <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
//         </div>
//     );
// }

/* Here we just pass/handover the state/data received from the ExpenseForm component to 
the App component which is the parent of this NewExpense component. */
const NewExpense = (props) => {
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            id: Math.random().toString(),
            ...enteredExpenseData
        };
        props.onAddExpense(expenseData);
    }

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
        </div>
    );
}

export default NewExpense;