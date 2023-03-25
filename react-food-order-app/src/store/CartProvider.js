import CartContext from "./cart-context";
// import React from "react";
import React, {useReducer} from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if(action.type === "ADD") {
    /* Note: We used concat() because we don't want to edit the "state" in a 
    mutable way instead we want a new array to be created that also contain our
    newly added item. That's is why we didn't use push(). */
    let updatedItems;
    const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;

    const existingCartItemIndex = state.items.findIndex(cartItem => cartItem.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];


    if(existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else {
      updatedItems = state.items.concat(action.item);
    }
    
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  else if(action.type === "REMOVE") {
    const indexOfCartItemToBeRemoved = state.items.findIndex(cartItem => cartItem.id === action.id);
    const cartItemToBeRemoved = state.items[indexOfCartItemToBeRemoved];
    const updatedTotalAmount = state.totalAmount - 1 * cartItemToBeRemoved.price;

    let updatedItems;
    
    if(cartItemToBeRemoved) {
      if(cartItemToBeRemoved.amount === 1) {
        updatedItems = state.items.filter(cartItem => cartItem.id !== action.id);
      }
      else {
        updatedItems = [...state.items];
        const updatedItem = {
          ...cartItemToBeRemoved,
          amount: cartItemToBeRemoved.amount-1
        };
        updatedItems[indexOfCartItemToBeRemoved] = updatedItem;
      }
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  return defaultCartState;
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id
    });
  };

  // const cartContext = {
  //   items: [],
  //   totalAmount: 0,
  //   addItem: addItemToCartHandler,
  //   removeItem: removeItemFromCartHandler,
  // };

  /* Replacing the empty items array and the hard coded "totalAmount" with actual 
  values. */
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
