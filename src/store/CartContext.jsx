import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart:()=>{},
});

function CartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedCartItems = [...state.items];
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    if (existingItemIndex > -1) {
      const currentItem = state.items[existingItemIndex];
      const updatedCartItem = {
        ...currentItem,
        quantity: currentItem.quantity + 1,
      };
      updatedCartItems[existingItemIndex] = updatedCartItem;
    } else {
      updatedCartItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedCartItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingItemIndex];
    const updatedCartItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedCartItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedCartItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedCartItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(CartReducer, { items: [] });
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  function clearCart(){
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartCtx = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };
  console.log("cart", cartCtx);

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}

export default CartContext;
