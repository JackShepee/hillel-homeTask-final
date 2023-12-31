import React, { useState } from "react";
import Button from "../utils/Button";
import { addToCart } from "../../slices/smoothieSlice";
import { useDispatch } from "react-redux";
import Modal from "../utils/Modal";

const SmoothieCard = ({ smoothie }) => {
  const dispatch = useDispatch();
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });

  const displayedIngredients = showAllIngredients
    ? smoothie.ingredients
    : smoothie.ingredients.slice(0, 3);

  const addToCartHandler = () => {
    dispatch(addToCart(smoothie));
    setModalContent({
      title: "Success",
      content: `${smoothie.name} has been added to your cart!`,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="m-4 p-4 bg-white shadow-lg rounded-md flex flex-col items-center max-w-sm">
      <Modal
        isOpen={isModalOpen}
        title={modalContent.title}
        content={modalContent.content}
        onClose={() => setIsModalOpen(false)}
      />
      <img
        src={smoothie.image}
        alt={smoothie.name}
        className="w-full h-64 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold">{smoothie.name}</h3>
      <p className="text-green-600 text-xl font-bold">{smoothie.price}$</p>
      <ul className="overflow-hidden">
        {displayedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {smoothie.ingredients.length > 3 && (
        <button
          onClick={() => setShowAllIngredients(!showAllIngredients)}
          className="mt-2 text-blue-500 underline"
        >
          {showAllIngredients ? "Show Less" : "Show More Ingredients"}
        </button>
      )}
      <Button onClick={addToCartHandler} className="mt-5">
        Buy me now
      </Button>
    </div>
  );
};

export default SmoothieCard;
