import { currencyFormatter } from "../util/formatting";

export default function CartItem({
  id,
  name,
  quantity,
  price,
  onIncrease,
  onDecrease
}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => onDecrease(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onIncrease({ id, name, price })}>+</button>
      </p>
    </li>
  );
}