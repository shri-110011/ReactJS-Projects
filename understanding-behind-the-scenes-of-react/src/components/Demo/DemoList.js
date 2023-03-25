import React, { useMemo } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props;

  /* Here we have used a closure that a self invoking function to return 
  the result of the sort() to sortedList. */
  // const sortedList = (() => {
  //   console.log('Items sorted');
  //   return items.sort((a, b) => a - b);
  // })(); 

  /* useMemo() is used here to store the result of sorting so that sorting 
  which is an performance intensive task is not perfomed again and 
  again whenever this DemoList component fucntion is re-executed and this 
  array that is getting sorted doesn't change(i.e. the elments in the array
  haven't changed).
   */
  const sortedList = useMemo(() => {
    console.log('Items sorted');
    return items.sort((a, b) => a - b);
  }, [items]);

  console.log('DemoList RUNNING');

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);
