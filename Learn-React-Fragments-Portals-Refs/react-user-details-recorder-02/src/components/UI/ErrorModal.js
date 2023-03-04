import React from "react";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

import Button from "./Button";
// import Wrapper from "../Helpers/Wrapper";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes["backdrop"]} onClick={props.onConfirm}></div>;
};

const OverlayModal = (props) => {
  return (
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
  );
};

const ErrorModal = (props) => {
  // return (
  //   <div>
  //     <Card className={classes["modal"]}>
  //       <header className={classes["modal-header"]}>
  //         <h2>{props.title}</h2>
  //       </header>
  //       <div className={classes["modal-body"]}>{props.message}</div>
  //       <footer className={classes["actions"]}>
  //         <Button type="button" onClick={props.onConfirm}>
  //           Okay
  //         </Button>
  //       </footer>
  //     </Card>
  //     <div className={classes["backdrop"]} onClick={props.onConfirm}></div>
  //   </div>
  // );

  // return (
  //   /* Wrappper component which is an empty React component that simply renders the content
  //   * placed between its opening and closing tags. */
  //   <Wrapper>
  //     <Card className={classes["modal"]}>
  //       <header className={classes["modal-header"]}>
  //         <h2>{props.title}</h2>
  //       </header>
  //       <div className={classes["modal-body"]}>{props.message}</div>
  //       <footer className={classes["actions"]}>
  //         <Button type="button" onClick={props.onConfirm}>
  //           Okay
  //         </Button>
  //       </footer>
  //     </Card>
  //     <div className={classes["backdrop"]} onClick={props.onConfirm}></div>
  //   </Wrapper>
  // );

  /* We use the concept of Portals to move the ErrorModal html content to somewhere else in 
  the real DOM and still we can use this ErrorModal component inside other React components
  where we want to. 
  ReactDOM is the library that uses React to bring React's features and logic to the browser.
  ReactDom acts like an Adaptor for React to the browser. 
  ReactDOM.createPortal() takes two argmuments.
  1st argument must be some valid JSX code.
  2nd argument must be a reference to the DOM container where this JSX code should be 
  rendered. */
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <OverlayModal
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
