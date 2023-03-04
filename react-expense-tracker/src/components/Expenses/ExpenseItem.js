import './ExpenseItem.css';

import './ExpenseDate';
import ExpenseDate from './ExpenseDate';
// import Card from './Card';
import Card from '../UI/Card';

/* Adding this import for React from 'react' but it is not required because modern
React project setups use it behind the scenes for transforming the JSX code to 
React.createElement() method calls. */
import React from "react";

// Here we have a named import "useState" which is a function and a React hook. 
// import React, { useState } from "react";

/* In React a component in the end is just a function. This is a special kind of fuction 
because it return HTML code i.e. the JSX code(HTML inside JavaScript). 

A custom component's name should be in Pascal case that is it should start with an 
uppercase letter and the sub words in the compound word each should also start with an 
uppercase letter. 

A React application can be broken down into components which are nested inside the root
component(App) or inside other components and constitute a component tree. Bigger apps
would have a big component tree.

Also note that it is a best practice to have a file for each React component we create. 
And here we have a "components" folder to contain those files. But we have not moved the 
App.js file into that because this App.js is a special file because of its role in the React application
which is that it is the root component of the application.
*/
// function expenseItem() {
//     return <h2>Expense item!</h2>;
// }

/* Here we use some complex JSX code snippet which spans multiple lines.

We use parentheses to enclose the JSX code, this is required to signal JavaScript that
this entire JSX code snippet which could span multiple lines is one statement. Also we
can use shift+alt+f to auto-format this JSX code, this is beacuse we installed the 
Prettier Code Formatter extension. 

Note there is one important rule regarding the JSX code snippet we return from the custom
React component i.e. from the function in the component's JavaScript file. And that rule
says that there could be only be one root element in the the JSX code snippet per return 
statement, otherwise we would get error "JSX expressions must have one parent element.".

*/
// function expenseItem() {
//   return (
//     <div>
//       <div>Date</div>
//       <div>
//         <h2>Title</h2>
//         <div>Amount</div>
//       </div>
//     </div>
//   );
// }

/* Note for applying CSS classes we first imported the CSS file ExpenseItem.css at the top. 
This import would tell the build system to apply the respective CSS file to this 
ExpenseItem component.
Normally we have the component's CSS file next to its JavaScript file.

For applying the CSS classes for this ExpenseItem component we do not use the "class" 
attribute on the HTML element inside we use the "className" attribute. This is because
"class" is a reserved keyword in JavaScript, infact technically "class" would also work 
but it would give a warning in the browser console.

"react-dom.development.js:86 Warning: Invalid DOM property `class`. Did you mean `className`?"
*/
// function expenseItem() {
//     return (
//       <div className='expense-item'>
//         <div>January 22nd 2023</div>
//         <div className='expense-item__description'>
//           <h2 className='expense-item h2'>Car Insurance</h2>
//           <div className='expense-item__price'>$294.67</div>
//         </div>
//       </div>
//     );
// }

/* Till now we were harcoding HTML data inside the JSX code like the expense title,
expense price and expense date. 
Here we fake dynamic data by creating variables declared with 'const' keyword inside
ExpenseItem() and then use them inside JSX by wrapping it in curly braces({}). 
You can put any valid JavaScript expression inside the curly braces in JSX. For example, 
2 + 2, user.firstName, or formatName(user) are all valid JavaScript expressions.
*/
// function ExpenseItem() {
//     const expenseDate = new Date(2023, 0, 22);
//     const expenseTitle = "Car Insurance";
//     const expenseAmount = 294.67;

//     return (
//       <div className='expense-item'>
//         <div>{expenseDate.toISOString()}</div>
//         <div className='expense-item__description'>
//           <h2 className='expense-item h2'>{expenseTitle}</h2>
//           <div className='expense-item__price'>${expenseAmount}</div>
//         </div>
//       </div>
//     );
// }

/* We know that React is all about components and components have the following traits:
Reusability and Seperation of Concerns
To reuse a component we have to simply repeat the custom HTML element as many times as 
we want in the place where we want to render the component. But if we do so we would
get the same data.

So we use the concept of "props" which stands for "properties". The parameter to 
ExpenseItem() can be named anything but it is important to keep in mind that it is 
injected by React and is an object.

And now we do not need the variables expenseDate, expenseTitle, expenseAmount to be 
declared in ExpenseItem() so we removed them.

*/
// function ExpenseItem(props) {
//     return (
//       <div className='expense-item'>
//         <div>{props.date.toISOString()}</div>
//         <div className='expense-item__description'>
//           <h2 className='expense-item h2'>{props.title}</h2>
//           <div className='expense-item__price'>${props.amount}</div>
//         </div>
//       </div>
//     );
// }

// Next we add JavaScript logic to format the date in a readable format.
// function ExpenseItem(props) {
//   return (
//     <div className='expense-item'>
//       <div>
//         <div>{props.date.toLocaleString('en-US', {month: 'long'})}</div>
//         <div>{props.date.getFullYear()}</div>
//         <div>{props.date.toLocaleString('en-US', {day: '2-digit'})}</div>
//       </div>
//       <div className='expense-item__description'>
//         <h2 className='expense-item h2'>{props.title}</h2>
//         <div className='expense-item__price'>${props.amount}</div>
//       </div>
//     </div>
//   );
// }

/* Although we can embed JavaScript expressions inside curly braces but it is not
a best practice to embed the complex JavaScript logic inside JSX code therefore we 
put it outside of the JSX code and inside of the component function as constant
variables. */
// function ExpenseItem(props) {
//   const month = props.date.toLocaleString('en-US', {month: 'long'});
//   const year = props.date.getFullYear();
//   const day = props.date.toLocaleString('en-US', {day: '2-digit'});
//   return (
//     <div className='expense-item'>
//       <div>
//         <div>{month}</div>
//         <div>{year}</div>
//         <div>{day}</div>
//       </div>
//       <div className='expense-item__description'>
//         <h2 className='expense-item h2'>{props.title}</h2>
//         <div className='expense-item__price'>${props.amount}</div>
//       </div>
//     </div>
//   );
// }

/* Since our 'ExpenseItem' component function has become a bit bigger we extract the 
calendar date into its own component 'ExpenseDate' and we set the attribute on that
'ExpenseDate' component to pass the date information using the props concept. Note
that the attribute name on 'ExpenseDate' component is "date" because this is the 
attribute we are using in the 'ExpenseDate' component function. So here we see
that in the end we are passing the date info from the 'App' component to the 
'ExpenseDate' component through the 'ExpenseItem' component. 

Note: There is no hard rule which tells when to build a new custom component. If
we find that the custom component function growing then it might be time to extract some
JSX code into its own compoent. Here we extracted the calendar date because it will
receive its own style and was using const variables to format date. 
So splitting components into mutiple components help us to keep the component function 
relatively small, focused and its codebase manageable. 

As a note since this 'ExpenseDate' component has no content between the opening and closing
tag so we can write it as a self closing element like this <ExpenseDate />. 
And we do the same with 'ExpenseItem' component in App.js */

// function ExpenseItem(props) {

// Here we use a different function syntax.
// const ExpenseItem = (props) => {
//   return (
//     <Card className='expense-item'>
//       <ExpenseDate date={props.date}></ExpenseDate>
//       <div className='expense-item__description'>
//         <h2 className='expense-item h2'>{props.title}</h2>
//         <div className='expense-item__price'>${props.amount}</div>
//       </div>
//     </Card>
//   );
// }

/* Here we add an event listener to a built in HTML element, here i.e. a <button> to 
change the expense title.
To see all the events on any built in HTML element:
1. See MDN for html <button> for example.
2. Go to the technical summary at the bottom of that page.
3. Click on HTMLButtonElement link beside the DOMInterface category.
4. Click on the Element interface in the inheritance diagram shown at the top.
5. Select the Events section from the sidebar to scroll down to that.
6. Under this Events section you can see all the events supported by any built in HTML 
element.

In React there is an equivalent prop(property) for any of the default events that a built 
in HTML element can support. And that prop starts with "on" followed by the event_name
starting with capital letter. So we place this attribute or prop on the built in HTML 
element and assign a reference to a function or just give the function definition. React
will ensure to execute this function whenever the event occurs on that element.

For eg: below we added a "onClick" prop and assign the arrow function. 
*/
// const ExpenseItem = (props) => {

  /* Notice the name given to this event handler. It is a convention to add the word 
  "Handler" to the end so that it becomes clear that this function is called only in the
  JSX code where it is attached as a event handler.
   */
  // const clickHandler = () => {
  //   console.log("Clicked!!!");
  // }

  // return (
  //   <Card className='expense-item'>
  //     <ExpenseDate date={props.date}></ExpenseDate>
  //     <div className='expense-item__description'>
  //       <h2 className='expense-item h2'>{props.title}</h2>
  //       <div className='expense-item__price'>${props.amount}</div>
  //     </div>

//       {/* We want to add click listener to this temporary button which is there just
//       to learn about event handling in React. */}
//       {/* <button>Change Title</button> */}

//       {/* Here we assign a arrow funcion to "onClick" prop. */}
//       {/* <button onClick={()=>{console.log("Clicked!")}}>Change Title</button> */}

//       {/* We can also assign a function starting with "function" keyword, to "onClick" 
//       prop. */}
//       {/* <button onClick={function() {console.log("Clicked!")}}>Change Title</button> */}
    
//       {/* But it is a best practice to keep the JSX code lean so we can store a function
//       in a const upfront or define it using "function" keyword and then just pass the 
//       function name as value to this equivalent prop for the event. */}
//       {/* <button onClick={clickHandler}>Change Title</button>
//     </Card>
//   );
// } */}

/* Since we have learnt how to react to user events through event handlers now our aim is 
to change the expense title on the button click, so we create a variable "title" declared 
with let and assign it the "props.title" and then output "title" in the <h2> for the 
expense title. But we see that on clicking the button the event handler gets fired 
because the console logs is showing up but the expense title is not changing. 

This is because React does not work that way. 

How React works?
We see that we use custom components by just using them as custom HTML elements in the 
JSX code. And these custom HTML elements are translated to component function calls under 
the hood. When React parses the JSX code, it on confronting a custom HTML component then
calls its corresponding component function. For eg: in the Expenses we have 4 
ExpenseItem components being used by placing the custom HTML elements for that.
So React while parsing the JSX code will call the ExpenseItem component function 4 times.

And in ExpenseItem component function's JSX code we use ExpenseDate component, so now its
component function would be called. And React would keep calling the component function
for the custom HTML elements it confronts while parsing the JSX code until no custom HTML 
elements are there. And it then evaluates the overall results and then translates it
to DOM instructions, to render what we see on the screen.  
And all this is started by the index.js file where the App component gets rendered. And 
React goes through all these components and executes their component functions only once 
during the initial rendering of the application. This happens when user visits 
http://localhost:3000/.

In below component function whenever the value of "title" variable changes React simply
ignores it and does not re-execute this component function and that is why the UI did not
change even though the "clickHandler" function executes.

In Modern apps we want to change the UI when some event occurs like on a button click.
For this we need a way to tell React that something changed and a certain component must 
be re-evaluated. This is where the concept of "state" comes in.

*/
// const ExpenseItem = (props) => {
//   let title = props.title;

//   const clickHandler = () => {
//     title = "Updated!";
//     console.log(title);
//   }

//   return (
//     <Card className='expense-item'>
//       <ExpenseDate date={props.date}></ExpenseDate>
//       <div className='expense-item__description'>
//         <h2 className='expense-item h2'>{title}</h2>
//         <div className='expense-item__price'>${props.amount}</div>
//       </div>

//       <button onClick={clickHandler}>Change Title</button>
//     </Card>
//   );
// }

/* Here we use the "useState" function imported from "react" and this "useState" is also
one of the so called React hook. And all React hooks start with the "use" word as prefix. 

We use this "useState" function to create a state variable that is managed by React 
somewhere in memory and we do not see that variable. And we provide this state variable 
an initial value i.e. why we pass "props.title" to "useState" function to set the initial
value for the state variable. And this "useState" always returns an array where the 1st
element is the latest value of the state variable and the second element is a state 
updating function which we could use to change the value stored inside the state variable.

Beside returning the array as mentioned above this "useState" function also in turn results 
in re-execution of only the component function where this "useState" is registered, in 
this case this ExpenseItem component whenever the state variable created using 
"useState" changes. 

Another thing about this "useState" function is that it must be placed directly inside of 
the component function and not inside any nested function of this component function nor 
outside the component function otherwise we would get errors in the server console i.e.
in the command prompt where the server for React app is running. 

The reason why the "title" logged inside "clickHandler" function and after setTitle() 
does not reflect the latest value is because the setTitle() method does not change 
the state variable immediately rather it schedules it. But eventually this ExpenseItem
component function is called again and its JSX code is re-evaluated and therefore we see
the updated title on the screen.

To be precise "useState" function registers the state for a given component instance. In 
Expenses we have used 4 times the ExpenseItem component and all 4 will have a separate 
state independent of each other created and managed by React. So state is created on a 
per component instance basis.

And whenever the state of a specific component instance changes its component function is 
re-executed and then the JSX code is re-evalutaed by React. And if that component's JSX 
code has any custom component as well then that would also be evaluated and this chain 
would go on until no more custom components are there.

We may wonder that in this below component function when the state changes the component 
function is re-executed so would it not be overwriting the state changes with the 
props.title?

It turns out that react keeps track of when we call the "useState" in a given component 
instance for the first time. So therefter when this component function is re-executed 
because of state changes, React won't re-initalize the state, it will detect that
the state has already been initialized and therfore it would fetch the latest state and
return it.

*/
// const ExpenseItem = (props) => {
  
//   const [title, setTitle] = useState(props.title);
//   console.log("ExpenseItem evaluated by React");

//   // const clickHandler = () => {
//   //   setTitle("Updated!");
//   //   console.log(title);
//   // }

//   function clickHandler() {
//     setTitle("Updated!");
//     console.log(title);
//   }
  
//   return (
//     <Card className='expense-item'>
//       <ExpenseDate date={props.date}></ExpenseDate>
//       <div className='expense-item__description'>
//         <h2 className='expense-item h2'>{title}</h2>
//         <div className='expense-item__price'>${props.amount}</div>
//       </div>

//       <button onClick={clickHandler}>{title}</button>
//     </Card>
//   );
// }

/* Here we removed the button that we used earlier to understand the event handling and
state concepts of React.
And now this ExpenseItem is a so called stateless/dumb/presentational component because 
it does not have any internal state. It just output the JSX code or do some transformation 
of the data like the ExpenseDate which also is a stateless component. 

But components like Expenses which manage the "filteredYear" state or ExpenseForm are 
stateful components. In React apps we have more stateless components than statful 
components because we want to split our app into smaller pieces of reusable components
and this is possible only if the components do not have any state associated with it. */
// const ExpenseItem = (props) => {

//   console.log("ExpenseItem evaluated by React");
  
//   return (
//     <Card className='expense-item'>
//       <ExpenseDate date={props.date}></ExpenseDate>
//       <div className='expense-item__description'>
//         <h2 className='expense-item h2'>{props.title}</h2>
//         <div className='expense-item__price'>${props.amount}</div>
//       </div>
//     </Card>
//   );
// }

/* We could see a warning that says: 
Each child in a list should have a unique "key" prop.
This is because all the expense items in the list does not have the "key" prop which
is a way to help React uniquely identify the items in the list.

Without that "key" prop if we add a new item to the list then we can see in the inspector 
window that the last expense item flashes, even though we added a new item to the top of 
the list.

What happenes is that the new item gets added to the last position in the list and then 
React updates each item in the list so that the content matches the order of the items in
the array. 

So we can see that this has impact on the performance and even worse we can run into bugs 
i.e. when the item in the list would have state then it would get lost when a new item is 
added to the list, for this we again added the Change Title button and state to ExpenseItem 
and from the console logs we can see this bug. The state does not move to the correct item
after a new item is added. 
But after adding a unique "key" prop to each ExpenseItem these bugs won't occur since the
state will be associated with the correct ExpenseItem whenever a new ExpenseItem is 
added. */
// const ExpenseItem = (props) => {

//   console.log("ExpenseItem evaluated by React");

//   const [title, setTitle] = useState(props.title);
//   const clickHandler = () => {
//     setTitle("Updated!");
//     console.log(title);
//   }
  
//   return (
//     <Card className='expense-item'>
//       <ExpenseDate date={props.date}></ExpenseDate>
//       <div className='expense-item__description'>
//         <h2 className='expense-item h2'>{props.title}</h2>
//         <div className='expense-item__price'>${props.amount}</div>
//       </div>
//       <div><button onClick={clickHandler}>Change Title</button></div>
//     </Card>
//   );
// }

/* Here we have added the "key" prop to each ExpenseItem. */
// const ExpenseItem = (props) => {

//   console.log("ExpenseItem evaluated by React");
  
//   return (
//       <Card className='expense-item'>
//         <ExpenseDate date={props.date}></ExpenseDate>
//         <div className='expense-item__description'>
//           <h2 className='expense-item h2'>{props.title}</h2>
//           <div className='expense-item__price'>${props.amount}</div>
//         </div>
//       </Card>
//   );
// }

/* Here we wrap the JSX code inside a <li> tag so as to have semantic correctness i.e.
we are using <ul> tag in the ExpensesList component to wrap the list and it would be more
appropriate to have <li> instead of <div> for list items. */
const ExpenseItem = (props) => {

  console.log("ExpenseItem evaluated by React");
  
  return (
    <li>
      <Card className='expense-item'>
        <ExpenseDate date={props.date}></ExpenseDate>
        <div className='expense-item__description'>
          <h2 className='expense-item h2'>{props.title}</h2>
          <div className='expense-item__price'>${props.amount}</div>
        </div>
      </Card>
    </li>
  );
}

// We export this ExpenseItem component.
export default ExpenseItem;
