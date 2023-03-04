"useState" hook doubts
const ExpenseItem = (props) => {
  
  const [title, setTitle] = useState(props.title); // Line 1
  console.log("ExpenseItem evaluated by React"); // Line 2
 
  const clickHandler = () => {
    setTitle("Updated!"); // Line 3
    console.log(title); // Line 4
  }
  
  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date}></ExpenseDate>
      <div className='expense-item__description'>
        <h2 className='expense-item h2'>{title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
 
      <button onClick={clickHandler}>{title}</button>
    </Card>
  );
}

In the lectures 48 and 49 where the "useState" hook has been introduced, I have some doubts regarding the way state is updated. When I click the button for the 1st time I see that the UI changes but the title in the console still logs the old value. This part I understood because the "title" in console.log(title); (Line 4)  points to the title variable created in the scope when the ExpenseItem component function was called for a specific component instance for the first time. Now in the lecture, Max mentioned that "setTitle" (Line 3) does not update the state variable value immediately, it rather schedules it. So my question is if this update occurs after this clickHandler() finishes or if it occurs asynchronously by React.



And when I click the button for the same component instance the 2nd time I see the "title" in console.log(title); (Line 4) reflects the latest state value (since (Line 1) again ran after the 1st click and resulted in fetching the latest value of the state variable and the function expression for the clickHandler also got re-assigned after the 1st click) but the component function for this same component instance again gets executed because 2nd time also the (Line 2) gets printed to the console.

Why is this so even when setTitle() sets the same value to the state variable? And does the button gets the latest clickHandler every time when the component function re-executes?



But for the 3rd time when I click on the button only the console.log(title); (Line 4) gets logged and the

component function is not called this time.



These questions are troubling me. Please help to answer these.



Output:

4 ExpenseItem.js:11 ExpenseItem evaluated by React //After initial rendering

ExpenseItem.js:15 Toilet Paper // After 1st click

ExpenseItem.js:11 ExpenseItem evaluated by React // After 1st click

ExpenseItem.js:15 Updated! // After 2nd click

ExpenseItem.js:11 ExpenseItem evaluated by React // After 2nd click

ExpenseItem.js:15 Updated! // After 3rd click