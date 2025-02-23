import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
export default function Header() {
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Dining table at a resturant" />
        <h1>Foodie</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
