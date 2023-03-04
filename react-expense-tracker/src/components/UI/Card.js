import "./Card.css";

/* Adding this import for React from 'react' but it is not required because modern
React project setups use it behind the scenes for transforming the JSX code to 
React.createElement() method calls. */
import React from "react";

/* We created this Card component so as to demonstrate a wrapper component that all
does is to wrap content between the opening and closing tag and such a wrappper
component is different from the other components like 'Expenses', 'ExpenseItem', and
'ExpenseDate' in the sense that the latter are more feature specific.

The purpose of this wrapper component is to reduce the CSS styles duplication. If you see
the 'box-shadow' and 'border-radius' css attributes repeat inside Expenses.css and 
ExpenseItem.css files. 

Not only this, such wrapper components can also help in avoiding the HTML structure i.e the 
JSX code duplication. If you see in 'Expenses' and 'ExpenseItem' components JSX code there 
the root JSX element is <div> so we extract such common wrappers into a separate component 
like 'Card' over here. In web development a "card" is just a container around a user
interface. So that's why we name this component as 'Card'

Here we don't gain much in terms of reducing CSS styles and HTML structure duplication 
but as our project grows this would defintely help. 
 */
// function Card() {
//   return <div className="card"></div>;
// }

/* Even though this 'Card' component is a wrapper component we added the "props" parameter
because there may be other CSS classes that would be added to this 'Card' component's HTML
element, so to have that styling effect to take place for the content wrapped by 'Card' 
component we need to extract the "className" attribute set on 'Card' component's HTML
element. And that "className" attribute is available on the "props" object's "className"
property. 
*/
// function Card(props) {
//     const classes = 'card ' + props.className;
//   return <div className={classes}></div>;
// }

/* To make this 'Card' component render the content it is wrapping we need to set the
value of the "props" object's "children" property. */
function Card(props) {
    const classes = 'card ' + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Card;
