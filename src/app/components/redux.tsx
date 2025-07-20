// Example: Show cart in a React component
'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const CartDebugger = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  console.log("Cart Items:", cartItems);

  return (
    <div>
      <h2>Cart Debugger</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          <p>Name: {item.productName.original}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Color: {item.selectedColor}</p>
          <p>In Stock: {item.inStock ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default CartDebugger;
