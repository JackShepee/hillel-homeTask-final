import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../../slices/smoothieSlice";
import { Link } from "react-router-dom";
import OrderForm from "../common/OrderForm";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.smoothie.cart);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, currentItem) => sum + currentItem.price,
    0
  );

  if (!cartItems.length) {
    return (
      <div className="p-5 mt-5 text-center">
        <h2 className="text-2xl font-bold mb-5">Your cart is empty!</h2>
        <p className="text-gray-600 mb-5">
          Looks like you haven't added any smoothies yet. Get started by adding
          some delicious blends to your cart!
        </p>
        <Link
          to="/smoothie-constructor"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          I Want Smoothie!
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <div key={index} className="border p-4 mb-4 rounded shadow relative">
            <button
              className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full p-1"
              onClick={() => dispatch(removeFromCart(index))}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">
              {item.name}: {item.price.toFixed(2)}$
            </h3>
            {item.size ? (
              <p className="text-lg text-gray-700 mb-2">Size: {item.size}ml</p>
            ) : (
              <p className="text-lg text-gray-700 mb-2">Size: 1000ml</p>
            )}
            {item.ingredients && item.ingredients.length > 0 && (
              <ul>
                {item.ingredients.map((ingredient, ingrIndex) =>
                  ingredient.ingredient ? (
                    <li key={ingrIndex} className="text-gray-600">
                      {ingredient.ingredient.name}: {ingredient.volume} ml
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        ))}
      </ul>
      <div className="mt-5">
        <h2 className="text-2xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
      </div>
      <div className="mt-5 flex space-x-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Order Smoothie
        </button>
        <OrderForm
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          onOrderSuccess={() => setOrderSuccess(true)}
          smoothies={cartItems}
        />
      </div>
    </div>
  );
};

export default Cart;
