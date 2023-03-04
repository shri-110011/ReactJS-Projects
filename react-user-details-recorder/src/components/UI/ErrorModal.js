import React from "react";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

import Button from "./Button";

const ErrorModal = (props) => {
  return (
    <div>
      <Card className={classes["modal"]}>
        <header className={classes["modal-header"]}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes["modal-body"]}>{props.message}</div>
        <footer className={classes["actions"]}>
          <Button type="button" onClick={props.onConfirm}>
            Okay
          </Button>
        </footer>
      </Card>
      <div className={classes["backdrop"]} onClick={props.onConfirm}></div>
    </div>
  );
};

export default ErrorModal;
