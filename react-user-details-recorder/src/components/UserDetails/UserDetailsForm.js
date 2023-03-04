import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import classes from "./UserDetailsForm.module.css";

const UserDetailsForm = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredUserAge, setEnteredUserAge] = useState("");
  const [error, setError] = useState(false);

  const addUserHandler = (event) => {
    event.preventDefault();

    if (
      enteredUsername.trim().length === 0 ||
      enteredUserAge.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values)!",
      });
      return;
    }

    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }

    const user = {
      name: enteredUsername,
      age: enteredUserAge,
    };
    props.onUserAdded(user);
    console.log(user);
    setEnteredUsername("");
    setEnteredUserAge("");
  };

  const nameHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageHandler = (event) => {
    setEnteredUserAge(event.target.value);
  };

  const onConfirmHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={onConfirmHandler}
        />
      )}
      <Card className={classes["user-details-form"]}>
        <form onSubmit={addUserHandler}>
          <label>Username</label>
          <input type="text" value={enteredUsername} onChange={nameHandler} />

          <label>Age (Years)</label>
          <input type="number" value={enteredUserAge} onChange={ageHandler} />

          <Button type="submit" onClick={addUserHandler}>
            Add User
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UserDetailsForm;
