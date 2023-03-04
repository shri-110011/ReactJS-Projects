import React from 'react';
// import './Button.css';

/* Here the name that we are importing from the .module.css file is upto us it could be 
styles or classes. */
import styles from './Button.module.css';

// import styled from 'styled-components';

// const Button = props => {
//   return (
//     <button type={props.type} className="button" onClick={props.onClick}>
//       {props.children}
//     </button>
//   );
// };

/* Here we use the "styled-components" package to create components that have styles 
attached to them and these style would only affect the component to which they are 
attached to. We import styled object from "styled-components" and call the "button" method
to create a built in html button element and then we use the tagged template literal 
syntax to add the css styles between the backticks. Thus we are now adding css inside 
JavaScript.

If the styled target is a simple element (e.g. styled.div), styled-components passes 
through any known HTML attribute to the DOM. If it is a custom React component 
(e.g. styled(MyComponent)), styled-components passes through all props.

So all the props like "type", "className", "onClick" we set on the "Button" component 
inside "CourseInput" component are simply forwarded to the html button element by 
styled-components because the target element is a simple element i.e. it is a built in 
html element.
 */
// const Button = styled.button`
//     width: 100%;
//     font: inherit;
//     padding: 0.5rem 1.5rem;
//     border: 1px solid #8b005d;
//     color: white;
//     background: #8b005d;
//     box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//     cursor: pointer;

//     @media (min-width: 768px) {
//       width: auto;
//     }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `;

/* Here we make use of css modules concept which has the following benefits:
1. It enables scoping of the css styles to the components where we import those css files
and thus not causing styles spill over to other components.

2. There is also no worry about css selector naming conflicts.

3. It allows us to separate the css styles from JavaScript.

CSS modules can only be used in the projects that have been configured to make support CSS
modules. And with React apps created using create-react-app this configuration is done 
already.

CSS Modules allows the scoping of CSS by automatically creating a unique classname of the 
format [filename]\_[classname]\_\_[hash].

CSS Modules let you use the same CSS class name in different files without worrying about 
naming clashes. Learn more about CSS Modules here.

This is an optional feature. Regular <link> stylesheets and CSS files are fully supported. 
CSS Modules are turned on for files ending with the .module.css extension.

Note: While using css modules the id selector won't work but the tag selector will work.

*/
const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
