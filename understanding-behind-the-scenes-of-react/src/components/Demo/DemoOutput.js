import React from 'react';
import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING');
  // return <p>{props.show ? 'This is new!' : ''}</p>;

  /* Here whenever this DemoOutput component function is executed then the
    MyParagraph will also get executed even in this case MyParagraph
    doesn't receive any props from its parent. */
  return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

// export default DemoOutput;

/* Unnecessary execution of DemoOutput in the cases:
1. when no prop is passed to it
2. when the passed prop's value doesn't change
by using the React.memo() in DemoOutput component and passing the DemoOutput
component as argument to React.memo().  */
export default React.memo(DemoOutput);
