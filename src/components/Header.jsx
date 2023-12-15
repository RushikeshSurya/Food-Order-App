import { useContext } from "react";
import foodLogo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const CartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const titalCartItems = CartCtx.items.reduce((totalCartItems, item) => {
    return totalCartItems + item.quantity;
  }, 0);

  function showCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={foodLogo} alt="food logo"></img>
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCart}>
          Cart ({titalCartItems})
        </Button>
      </nav>
    </header>
  );
}
