// import React, {useCallback, useState} from 'react';
import React, {useCallback, useState, useMemo} from 'react';

import './App.css';
import Button from './components/UI/Button/Button';
// import DemoOutput from './components/Demo/DemoOutput';
import DemoList from './components/Demo/DemoList';

function App() {
  // const [showParagraph, setShowParagraph] = useState(false);
  // const [allowToggle, setAllowToggle] = useState(false);

  console.log('APP RUNNING');

  // // const toggleParagraphHandler = () => {
  // //   setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  // // };

  // /* Here we are using useCallback() React hook to save the function
  // assigned to toggleParagraphHandler so that on successive re-execution
  // of this App component this toggleParagraphHandler doesn't get a 
  // new reference to the function. This is basically done for
  // optimization purpose because this will cause React.memo() to work in 
  // case when we pass objects as props to the components. 
  
  // useCallback() requires a second argument which is the dependencies array
  // (just like the useEffet()) where we pass the dependencies for the function 
  // object we pass inside useCallback(). In this case the dependency is the 
  // "setShowParagraph" but since it is guaranteed to not change by React so 
  // we passes an empty array which means that this callback function passed 
  // to useCallback() has no dependencies. 
  // In case dependencies are specified then if any dependency changes then 
  // this new callback function passed to useCallback() will be assigned again 
  // to toggleParagraphHandler. So the previous callback function object won't 
  // be reused.

  // */
  // // const toggleParagraphHandler = useCallback(() => {
  // //   setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  // // }, []);

  // /* Here we pass the dependency "allowToggle" to the dependency array of 
  // useCallback(). This is because when first time this function object is
  // passed to "toggleParagraphHandler" the value of "allowToggle" was false 
  // andthis value got locked because functions in JavaScript are closures 
  // so thefunction(toggleParagraphHandler in this case) closes over the value that 
  // we are using inside it(inside toggleParagraphHandler) and which are 
  // defined outside it(outside toggleParagraphHandler) i.e in the App 
  // component over here. */
  // const toggleParagraphHandler = useCallback(() => {
  //   if(allowToggle) {
  //     setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  //   }
  // }, [allowToggle]);

  // const allowToggleHandler = () => {
  //   setAllowToggle(true);
  // };

  // /* From this example we see that whenever any state change occurs in a 
  // component then that component is re-evaluated and re-executed. 
  
  // In the browser developer tools we can see that on clicking the 
  // Toggle Paragraph! button the <p> element in the Elements tab flashes 
  // because this <p> element is being added and on clicking the Toggle 
  // Paragraph! button again the <div> containing  the <p> element flashes 
  // because now the <p> element is being removed.
  // */

  // // return (
  // //   <div className="app">
  // //     <h1>Hi there!</h1>
  // //     {showParagraph && <p>This is new!</p>}
  // //     <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
  // //   </div>
  // // );

  // /* From this example we see that whenever any state change occurs in a 
  // component then that component is re-evaluated and re-executed. 
  
  // And during this re-evaluation of the component function JSX code if any
  // custom component in the JSX code is found then it also will be 
  // re-evaluated and re-executed. Here we see it makes sense because the 
  // "show" prop passed to DemoOutput changes because of state change in App.
  //  */
  // // return (
  // //   <div className="app">
  // //     <h1>Hi there!</h1>
  // //     <DemoOutput show={showParagraph} />
  // //     <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
  // //   </div>
  // // );

  // /* Here we can see that whether or not the custom component in the JSX 
  // code receives a prop whose value is derived from a state in the parent or
  // the prop's value is hardcoded, that custom component
  // (DemoOutput in this case) will get re-evaluated and re-executed.

  // Here we see that unnecessarily the DemoOutput and MyParagraph inside
  // of DemoOutput are getting executed even when no prop change and no prop
  // was passed respectively.

  // We can prevent the unnecessary execution of child components in the
  // cases:
  // 1. when no prop is passed to them
  // 2. when the passed prop's value doesn't change 
  // by using the React.memo() in that child component and 
  // passing the child component as argument to React.memo().

  // But we see that even after using React.memo() inside the Button component
  // we Button component function is being re-executed and re-evaluated 
  // whenever the user clicks on the button. 

  // This is because on clicking the "Toggle Paragraph!"" button the state 
  // inside the App changes due to which the App component function is 
  // re-executed and re-evaluated and a new reference to the function 
  // toggleParagraphHandler is created and assigned to the "onClick" prop of 
  // Button. So since the prop of Button component changes hence it gets 
  // re-executed and re-evaluated.

  // Note: Although using React.memo() does optimize the app by preventing 
  // unnecessary execution of child components when no prop changes for the
  // child has occurred. Nonethless it should not be used for every component
  // in our app because we are trading the performance cost of component 
  // re-execution and re-evalutation for the performance cost of comparing the
  // current props of the component with their previous props.

  // So React.memo() should only be used in bigger apps at a higher level
  // in the component tree where comparision of current props of the component 
  // with their previous props could cut-off an entire branch of the component
  // tree from re-execution and re-evaluation.

  // For React.memo() to work in case when we pass objects as props to the 
  // components we use the useCallback() React hook and then pass the object
  // or function which we want to re-use between successive re-execution of 
  // the App. This is what has been done for the toggleParagraphHandler 
  // above.
  // */
  // // return (
  // //   <div className="app">
  // //     <h1>Hi there!</h1>
  // //     <DemoOutput show={false} />
  // //     <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
  // //   </div>
  // // );

  // /* Here we see the usage of useCallback() with the dependency parameter
  // specified for the toggleParagraphHandler. 

  // See readMe.txt for understanding how state change takes place in React. 
  // */

  // return (
  //   <div className="app">
  //     <h1>Hi there!</h1>
  //     <DemoOutput show={showParagraph} />
  //     <Button onClick={allowToggleHandler}>Allow Toggling!</Button>
  //     <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
  //   </div>
  // );

  // Here we understand the use of useMemo().
  const [listTitle, setListTitle] = useState('My List');

  /* Here we use useCallback() to ensure that a new function object is not
  created and assigned to changeTitleHandler everytime this App is
  re-executed, instead the function object created on the very first 
  execution of App is re-used. This happens because we passed an empty
  dependency array to useCallback(). */

  // let i = 1;
  const changeTitleHandler = useCallback(() => {
    // i += 1;
    setListTitle('New Title');
    // setListTitle('New Title' + i);
  }, []);

  /* Here we use useMemo() to store data i.e. an array here and to
  not re-create it for every re-execution of App. We also pass a 
  dependency array to useMemo that is used to determine when this array
  is to be re-created. So only if any of the dependencies have changed
  this array would be re-created otherwise not. */
  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      {/* <DemoList title={listTitle} items={[5, 3, 1, 10, 9]} /> */}
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
