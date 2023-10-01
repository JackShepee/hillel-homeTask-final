import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder, setError } from "../../slices/orderSlice";
import { clearCart } from "../../slices/smoothieSlice";
import axios from "axios";
import Modal from "../utils/Modal";

const OrderForm = ({ smoothies, onClose = () => {} }) => {
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
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};

    // Name and Surname validation
    const nameSurnameRegex = /^[a-zA-Z]+$/;
    if (!formData.name || !nameSurnameRegex.test(formData.name)) {
      errors.name = "Please enter a valid name.";
    }

    if (!formData.surname || !nameSurnameRegex.test(formData.surname)) {
      errors.surname = "Please enter a valid surname.";
    }

    // Phone validation
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number format should be xxx-xxx-xxxx.";
    }

    // Address validation
    if (formData.deliveryType === "delivery" && !formData.address.trim()) {
      errors.address = "Address is required for delivery.";
    }

    return errors;
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setStep(2);
    } else {
      setFormErrors(errors);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
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
      setOrderSuccess(true);
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  if (orderSuccess) {
    return (
      <Modal
        isOpen={true}
        title="Order Successful!"
        onClose={() => {
          dispatch(clearCart());
          setOrderSuccess(false);
          onClose();
        }}
      >
        <p className="pt-5">Your order has been successfully placed!</p>
        <button
          onClick={() => {
            dispatch(clearCart());
            setOrderSuccess(false);
            onClose();
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold mt-5 py-2 px-4 rounded"
        >
          Close
        </button>
      </Modal>
    );
  }

  if (orderSuccess) {
    return <div>Your order has been successfully placed!</div>;
  }

  if (step === 1) {
    return (
      <div className="p-5">
        <form onSubmit={handleNextStep} className="space-y-4">
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
          {formErrors.surname && (
            <p className="text-red-500 text-xs">{formErrors.surname}</p>
          )}
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
            placeholder="000-000-0000(Phone number)"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />

          {formErrors.phone && (
            <p className="text-red-500 text-xs">{formErrors.phone}</p>
          )}

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
          {formErrors.address && (
            <p className="text-red-500 text-xs">{formErrors.address}</p>
          )}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </form>
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="flex flex-col items-center justify-center p-5 h-full">
        <div className="w-full max-w-3xl">
          <h3 className="text-2xl font-bold mb-5">
            Please confirm your details:
          </h3>
          <div className="bg-gray-100 p-5 rounded shadow">
            <p className="mb-2">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="mb-2">
              <strong>Surname:</strong> {formData.surname}
            </p>
            <p className="mb-2">
              <strong>Delivery Type:</strong> {formData.deliveryType}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {formData.phone}
            </p>
            {formData.deliveryType === "delivery" && (
              <p className="mb-2">
                <strong>Address:</strong> {formData.address}
              </p>
            )}

            <div className="mt-5">
              <h4 className="text-xl font-bold mb-4">Smoothie Details:</h4>
              {smoothies.map((item, index) => (
                <div
                  key={index}
                  className="border p-3 mb-3 rounded shadow-sm bg-white"
                >
                  <h5 className="text-lg font-semibold mb-2">
                    {item.name}: ${item.price.toFixed(2)}
                  </h5>
                  <p className="text-sm text-gray-700 mb-2">
                    Size: {item.size ? `${item.size}ml` : "1000ml"}
                  </p>

                  {item.ingredients && item.ingredients.length > 0 && (
                    <div className="mt-2">
                      <ul className="list-disc pl-5 text-sm">
                        {item.ingredients.map((ingredient, ingrIndex) =>
                          ingredient.ingredient ? (
                            <li key={ingrIndex} className="text-gray-600">
                              {ingredient.ingredient.name}: {ingredient.volume}{" "}
                              ml
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mt-5">
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Order
            </button>
            <button
              onClick={handlePrevStep}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default OrderForm;
