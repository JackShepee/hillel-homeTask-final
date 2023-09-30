import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder, setError } from "../../slices/orderSlice";
import { clearCart } from "../../slices/smoothieSlice";
import axios from "axios";
import Modal from "../utils/Modal";

const OrderForm = ({ isOpen, onClose, smoothies }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    deliveryType: "delivery",
    phone: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const totalPrice = smoothies.reduce(
        (total, smoothie) => total + smoothie.price,
        0
      );

      const response = await axios.post("http://localhost:5000/order", {
        ...formData,
        price: totalPrice,
        smoothie: smoothies,
      });

      dispatch(addOrder(response.data));
      dispatch(clearCart());
      setOrderSuccess(true);
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  if (orderSuccess) {
    return (
      <Modal isOpen={true} title="Order Successful!" onClose={() => {}}>
        <p>Your order has been successfully placed!</p>
        <button
          onClick={() => {
            setOrderSuccess(false);
            onClose();
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} title="Place your order" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        {formErrors.name && (
          <p className="text-red-500 text-xs">{formErrors.name}</p>
        )}

        <input
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <select
          name="deliveryType"
          value={formData.deliveryType}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
        </select>

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        {formData.deliveryType === "delivery" && (
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        )}

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Place Order
        </button>
      </form>
    </Modal>
  );
};

export default OrderForm;
