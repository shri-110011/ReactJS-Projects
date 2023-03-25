// import React from "react";
// import React, {useEffect, useRef} from "react";
// import React, {useRef} from "react";
import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

// const Input = (props) => {

//   const inputRef = useRef();

//   /* Here we use ref to get a reference to this input DOM object and then call
//   the focus() on it just once after this Input component renders. But on doing so
//   we don't get the required behavior which is to just bring the focus to the
//   first input field in Login component that is invalid.
//   */
//   // useEffect(()=> {
//   //   inputRef.current.focus();
//   // }, []);

//   const activate = () => {
//     inputRef.current.focus();
//   };

//   // return (
//   //   <div
//   //     className={`${classes.control} ${
//   //       props.isValid === false ? classes.invalid : ""
//   //     }`}
//   //   >
//   //     <label htmlFor={props.id}>{props.label}</label>
//   //     <input
//   //       type={props.type}
//   //       id={props.id}
//   //       value={props.value}
//   //       onChange={props.onChange}
//   //       onBlur={props.onBlur}
//   //       autoComplete={props.autoComplete}
//   //     />
//   //   </div>
//   // );

//   // Here we use ref to get a reference to this input DOM object.
//   return (
//     <div
//       className={`${classes.control} ${
//         props.isValid === false ? classes.invalid : ""
//       }`}
//     >
//       <label htmlFor={props.id}>{props.label}</label>
//       <input
//         ref={inputRef}
//         type={props.type}
//         id={props.id}
//         value={props.value}
//         onChange={props.onChange}
//         onBlur={props.onBlur}
//         autoComplete={props.autoComplete}
//       />
//     </div>
//   );
// };

/* Note in the paramater list of a function component we also get the "ref" 
parameter provided by React apart form the "props". But in most of the case 
"props" is enough. When we use useImperativeHandle() hook we need to pass this 
"ref" as the first argument to it. 
 */
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  /* useImperativeHandle() hook allows us to expose the functionalities of this 
  component to be available in its parent component by the use of ref. */
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        autoComplete={props.autoComplete}
      />
    </div>
  );
});

export default Input;
