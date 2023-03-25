import { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || (enteredAmountNumber < 0 || enteredAmountNumber > 5)) {
      setAmountIsValid(false);
    }
    else {
      setAmountIsValid(true);
    }

    props.onAddToCart(enteredAmountNumber);
  };

  // return (
  //   <form className={classes.form}>
  //     <Input
  //       label="Amount"
  //       input={{
  //         id: "amount" + props.id,
  //         type: "number",
  //         min: "0",
  //         max: "10",
  //         step: "1",
  //         defaultValue: "1",
  //       }}
  //     />
  //     <button>+ Add</button>
  //   </form>
  // );

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "0",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button >+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
