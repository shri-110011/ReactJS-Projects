import './App.css';
// import {Fragment, useState} from 'react';
import {useState} from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  // return (
  //   <Fragment>
  //     {cartIsShown && <Cart onClose={hideCartHandler} />}
  //     <Header onShowCart={showCartHandler} />
  //     <Meals />
  //   </Fragment>
  // );

  // Added the CartContext.Provider instead of Fragment.
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;