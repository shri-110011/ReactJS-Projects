import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

/* This index.js is the first code file that will be executed whenever we hit 
http://localhost:3000/. The code in this index.js file is not exactly what will get 
executed in the browser but a transformed version of it. The "npm start" process will not
only watch our code and show a preview of our application in the browser at 
http://localhost:3000/ but also do some transformation of our code before delivering that
to the browser. And this is possible because during the project setup some scripts were also 
added which transforms and optimize the code.

Basically here in this development environment i.e. in this React project we write code in 
an easy to read and development friendly way.

There are some not regular javascript syntax to be noted in this index.js file:
1. We use import './index.css'; to instruct the npm start process to include the index.css 
file into our overall application.

2. When we use root.render(<App />); we have some HTML like code inside the JavaScript code
which is not normal but this seems to work here because this is being transformed before it 
is delivered to the browser. That <App /> inside JavaScript code is the JSX syntax which
means HTML inside JavaScript code. And there we are using the "App" component which is
just a function imported from ./App.js file.

Other things to note in this index.js file is that we have:
1. import ReactDOM from 'react-dom/client';
This just import some ReactDOM object that this third-party library 'react-dom' exposes. 

2. Then we call a method on ReactDOM i.e. ReactDOM.createRoot() and pass the reference to 
the HTML element in the index.html in the ./public folder. So this ReactDOM.createRoot() 
tells React where this application i.e. the user interface that we build with React should 
be placed into the webpage that gets loaded. In other words we telling React the root node 
of our React Application.
And remember this index.html file is the one that gets loaded in the browser at 
http://localhost:3000/ and it is the only HTML file that will be used by our React 
application because React application is so called a Single Page Application(SPA) and all 
subsequent changes in the user interface would be handled by React.

3. ReactDOM.createRoot(document.getElementById('root')) returns a ReactDOM.Root type of
object which we then use to call the render(). And to that render() we pass the <App />. 
This custom HTML element <App /> is a component that we import from ./App using:
import 'App' from ./App; 
Note this 'App' is a component and it is in the end going to be rendered in the <div> 
element that has the id="root" in the index.html file because it is what we set up in the 
ReactDOM.createRoot().

*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
