import React from 'react';

import './ExpensesFilter.css';

/* Note this ExpensesFilter is a controlled component because it is being controlled by
its parent component. If we see this ExpensesFilter component then we find that the UI
gets its initial value from its parent component and also the selected year value is 
managed by a function inside the parent component. 
If the value and changes to value in the component are handled there itself in that 
component then we call that component an un-controlled component. */
const ExpensesFilter = (props) => {

  const dropDownChangedHandler = (event) => {
    // console.log(event);
    props.onChangeFilter(event.target.value)
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select value={props.selectedYear} onChange={dropDownChangedHandler}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
