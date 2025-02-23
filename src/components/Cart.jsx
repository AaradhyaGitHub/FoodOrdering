// Cart.jsx
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  
  const cartTotal = cartCtx.items.reduce(
    (finalPrice, item) => finalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={cartCtx.addItem}
            onDecrease={cartCtx.removeItem}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCloseCart}>
          Proceed to Checkout
        </Button>
      </p>
    </Modal>
  );
}