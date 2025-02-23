import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (finalPrice, item) => finalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" name="full-name" id="full-name" />
        <Input
          label="E-mail Address"
          type="email"
          name="full-name"
          id="email"
        />
        <Input
          label="Street Address"
          type="text"
          name="full-name"
          id="street"
        />
        <div className="control-row">
          <Input
            label="Postal Coded"
            type="text"
            name="full-name"
            id="postal-code"
          />
          <Input label="City" type="text" name="full-name" id="city" />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
