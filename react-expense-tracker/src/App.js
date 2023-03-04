/* We import the ExpenseItem component. Note it is mandatory to have custom React 
components name begin with an uppercase letter otherwise we would get error. This is
because React uses a simple rule to distinguish the built in and custom HTML elements we 
write in the JSX code. This rule says that built in HTML element must begin with lower case
and the custom HTML element must begin with upercase. */
// import ExpenseItem from "./components/ExpenseItem";
// import Expenses from "./components/Expenses";
import Expenses from "./components/Expenses/Expenses";
import React, { useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense";

/* The strange thing about this App() is that it returns HTML code. This is a feature 
called JSX a special syntax invented and introduced by the React Team. 
The reason why this HTML code inside JavaScript file works without any error is because of 
the project setup that does some transformation behind the scenes.

JSX stands for JavaScript XML and is bascially HTML code inside JavaScript. This is just a 
developer friendly syntax which will be transformed into code that will run in the browser
by the "npm start" process. We can see the transformed code for index.js and the App.js
in the developer tools > Sources tab > localhost:3000 > static/js > bundle.js file. 

Note: This App() which appears to be a function is a component which we export from this
file as "App" and then import in the index.js file and use it as custom HTML element in
the root.render() in index.js file.

And we create this custom HTML element which basically is a component, in a declarative
fashion. If we see in App() we return the JSX syntax which tells the end result we want
whenever this "App" component is rendered on the webpage. So we are not specifying each step
to produce this result which if we do would be called the imperative approach.

See we also specify that we want a <p> inside the <div> element. React will figure out the 
DOM instructions required to produce this end result declared using the JSX syntax.

*/
// function App() {
//   return (
//     <div>
//       <h2>Let's get started!</h2>

//       <p>This is also visible!</p>

//       <ExpenseItem></ExpenseItem>
//     </div>
//   );
// }

/* Here we reuse the ExpenseItem component but doing so results in the components having
same data. This is because we have the dynamic data placed inside the function in  
ExpenseItem component. To make the ExpenseItem component consigurable we need to be 
able to pass parameters to it just in the same way we make functions configurable. */
// function App() {
//   return (
//     <div>
//       <h2>Let's get started!</h2>

//       <p>This is also visible!</p>

//       <ExpenseItem></ExpenseItem>
//       <ExpenseItem></ExpenseItem>
//       <ExpenseItem></ExpenseItem>
//       <ExpenseItem></ExpenseItem>
//     </div>
//   );
// }

/* Here we use the "props" concept in React which allows us to pass data between 
components. To pass Data from this App to ExpenseItem component we set attributes on
the custom HTML elements corresponding to ExpenseItem component and then we use the
a parameter in the function of ExpenseItem component. This is an object injected
by React which would contain the set attributes on <ExpenseItem> as key-value pairs. 

Note we can use embedded expression(i.e. is curly braces) to set the values for the 
attributes to our custom HTML elements. And we can use any name for these attributes but 
we used title, name, date because those are the fitting names.
*/
// function App() {
//   const expenses = [
//     {
//       id: "e1",
//       title: "Toilet Paper",
//       amount: 94.12,
//       date: new Date(2020, 7, 14),
//     },
//     { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
//     {
//       id: "e3",
//       title: "Car Insurance",
//       amount: 294.67,
//       date: new Date(2021, 2, 28),
//     },
//     {
//       id: "e4",
//       title: "New Desk (Wooden)",
//       amount: 450,
//       date: new Date(2021, 5, 12),
//     },
//   ];
//   return (
//     <div>
//       <h2>Let's get started!</h2>

//       <p>This is also visible!</p>

//       <ExpenseItem
//         title={expenses[0].title}
//         amount={expenses[0].amount}
//         date={expenses[0].date}
//       ></ExpenseItem>
//       <ExpenseItem
//         title={expenses[1].title}
//         amount={expenses[1].amount}
//         date={expenses[1].date}
//       ></ExpenseItem>
//        <ExpenseItem
//         title={expenses[2].title}
//         amount={expenses[2].amount}
//         date={expenses[2].date}
//       ></ExpenseItem>
//        <ExpenseItem
//         title={expenses[3].title}
//         amount={expenses[3].amount}
//         date={expenses[3].date}
//       ></ExpenseItem>
//     </div>
//   );
// }

/* Here we write ExpenseItem as a self closing element because it has no content between 
the opening and closing tag. */
// function App() {
//   const expenses = [
//     {
//       id: "e1",
//       title: "Toilet Paper",
//       amount: 94.12,
//       date: new Date(2020, 7, 14),
//     },
//     { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
//     {
//       id: "e3",
//       title: "Car Insurance",
//       amount: 294.67,
//       date: new Date(2021, 2, 28),
//     },
//     {
//       id: "e4",
//       title: "New Desk (Wooden)",
//       amount: 450,
//       date: new Date(2021, 5, 12),
//     },
//   ];
//   return (
//     <div>
//       <h2>Let's get started!</h2>

//       <ExpenseItem
//         title={expenses[0].title}
//         amount={expenses[0].amount}
//         date={expenses[0].date}
//       />
//       <ExpenseItem
//         title={expenses[1].title}
//         amount={expenses[1].amount}
//         date={expenses[1].date}
//       />
//        <ExpenseItem
//         title={expenses[2].title}
//         amount={expenses[2].amount}
//         date={expenses[2].date}
//       />
//        <ExpenseItem
//         title={expenses[3].title}
//         amount={expenses[3].amount}
//         date={expenses[3].date}
//       />
//     </div>
//   );
// }

/* Here we have extracted the 'ExpenseItem' components that were rendered directly
from this 'App' component's JSX code into the component 'Expenses' as part of practice
exercise for practicing "components" and "props" concept. 

Now what we have done is that we have created some components and then combined it together 
to create the user interface that we see at this point. This process of creating the user 
interface from smaller building blocks is called Composition. And we use it all the time
while building React apps. */
// function App() {

/* Here we use the arrow functions instead of the functions defined using "function" 
keyword. This change does not give any added advantage but is a matter of personal choice
because this approach is more modern.
*/
// const App = () => {
//   const expenses = [
//     {
//       id: "e1",
//       title: "Toilet Paper",
//       amount: 94.12,
//       date: new Date(2020, 7, 14),
//     },
//     { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
//     {
//       id: "e3",
//       title: "Car Insurance",
//       amount: 294.67,
//       date: new Date(2021, 2, 28),
//     },
//     {
//       id: "e4",
//       title: "New Desk (Wooden)",
//       amount: 450,
//       date: new Date(2021, 5, 12),
//     },
//   ];

/* This code in this return statement is what the JSX code commented below gets
  transformed to behind the scenes. We see that JSX code gets converted to methods
  called on React. Therefore we now also import React from 'react' at the top. 
  
  The 1st argument to React.createElement() is a string which represents the built in DOM
  element that we want. If we need a custom HTML element then use the component name
  without a string like the "Expenses" component shown below.
  
  The 2nd argument to React.createElement() is an object listing the attribues to be
  set on the element specified in the 1st argument. If no arguments are to be set then 
  pass an empty object.
  
  The 3rd argument onwards to React.createElement() we can pass an infinite number of
  arguments. This 3rd argument onwards represents the children of the element in 
  1st argument. Here we use a second React.createElement() to create the "h2" element
  and then a third React.createElement() side by side to create the "Expenses" custom 
  element. React will infer the DOM instructions required to create the "Expenses" element
  by having a look at the 'Expenses' component function's JSX code. And note that we have 
  an attribute set for this "Expenses" element by passing the "expenses" attribute and
  setting its value to "expenses" array defined above.

  So we now see what the JSX code gets transformed to behind the scenes. And we see that 
  React object from 'react' package is still being used under the hood for the JSX code 
  even if we omit the import for React from 'react' as we have done so far. But going 
  onward we will have this import even though it is technically not required. This is 
  done to emphasis that React from 'react' is still being used for tranforming the JSX 
  code. 
  
  In the past, in a lot of React projects there were imports for React from 'react' in 
  every JavaScript file containing the JSX code because then it was required but now in
  modern React projects created using "create-react-app" do not require it.

  From alternative for JSX code i.e. the React.createElement() method we can easily see
  why there must be only one root element per JSX code snippet. Because if it were not then 
  we would be returning two React.createElement() methods side by side, which would not
  work. 
  
  Since we have understood what JSX will be transformed to behind the scenes. We can now
  comment this React.createElement() way for creating user interface and uncomment the
  JSX code way. We see that using JSX is more readable and writable than this 
  React.createElement() aproach and hence this JSX code can also be called as a 
  "Syntactic Sugar".

  Now we organize our files i.e. create a "expenses" subfolder in the "components" folder 
  and move that expenses related JavaScript and CSS files into it. And we create a "UI" 
  folder in the "components" folder and move "Card" component files into it. This UI folder
  will hold the general user interface components that would be shared by more feature
  specific components. 
  As our projects grow this file organization is important otherwise we would have very 
  big folders with all components file in it.

  Since we have done this file organization our imports are to be updated now.

  */
// return React.createElement(
//   "div",
//   {},
//   React.createElement("h2", {}, "Let's get started!"),
//   React.createElement(Expenses, { expenses: expenses })
// );

//   return (
//     <div>
//       <h2>Let's get started!</h2>
//       <Expenses expenses={expenses}></Expenses>
//     </div>
//   );
// }

/* Here we add the NewExpense component. */
// const App = () => {
//   const expenses = [
//     {
//       id: "e1",
//       title: "Toilet Paper",
//       amount: 94.12,
//       date: new Date(2020, 7, 14),
//     },
//     { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
//     {
//       id: "e3",
//       title: "Car Insurance",
//       amount: 294.67,
//       date: new Date(2021, 2, 28),
//     },
//     {
//       id: "e4",
//       title: "New Desk (Wooden)",
//       amount: 450,
//       date: new Date(2021, 5, 12),
//     },
//   ];

//   return (
//     <div>
//       <NewExpense />
//       <Expenses expenses={expenses}></Expenses>
//     </div>
//   );
// }

/* Here we are lifting the state up from the NewExpense component. And the state being 
lifted up is the expenseData.  */
// const App = () => {
//   const expenses = [
//     {
//       id: "e1",
//       title: "Toilet Paper",
//       amount: 94.12,
//       date: new Date(2020, 7, 14),
//     },
//     { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
//     {
//       id: "e3",
//       title: "Car Insurance",
//       amount: 294.67,
//       date: new Date(2021, 2, 28),
//     },
//     {
//       id: "e4",
//       title: "New Desk (Wooden)",
//       amount: 450,
//       date: new Date(2021, 5, 12),
//     },
//   ];

//   const addExpenseHandler = (expense) => {
//     console.log("In App.js");
//     console.log(expense);
//   };

//   return (
//     <div>
//       <NewExpense onAddExpense={addExpenseHandler} />
//       <Expenses expenses={expenses}></Expenses>
//     </div>
//   );
// };

/* Here we dynmaically render the expense items. Note we use the function form of
the state updating function to update the expenses list. */
const App = () => {
  const [expenses, setExpenses] = useState(
    [
      {
        id: "e1",
        title: "Toilet Paper",
        amount: 94.12,
        date: new Date(2020, 7, 14),
      },
      { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
      {
        id: "e3",
        title: "Car Insurance",
        amount: 294.67,
        date: new Date(2021, 2, 28),
      },
      {
        id: "e4",
        title: "New Desk (Wooden)",
        amount: 450,
        date: new Date(2021, 5, 12),
      }
    ]
  );

  const addExpenseHandler = (expense) => {
    console.log("In App.js");
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses]
    });
    console.log(expenses);
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses}></Expenses>
    </div>
  );
};

/* This App that we export here is a component. And this is how we modularize code in 
JavaScript. */
export default App;
