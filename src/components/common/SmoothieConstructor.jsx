import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../api/asyncActions";
import { addToCart } from "../../slices/smoothieSlice";
import IngredientSelect from "./IngredientSelect";
import Modal from "../utils/Modal";

const SmoothieConstructor = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredient.ingredients);

  const [selectedSize, setSelectedSize] = useState(250);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  useEffect(() => {
    dispatch(fetchIngredients()).catch((error) => {
      console.error("Failed to fetch ingredients:", error);
    });
  }, [dispatch]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setSelectedIngredients([]);
    setTotalPrice(0);
    setTotalVolume(0);
    setIsFull(false);
  };

  const handleAddIngredient = (ingredient, volume) => {
    const isIngredientSelected = selectedIngredients.some(
      (item) => item.ingredient.name === ingredient.name
    );

    const newTotalVolume = totalVolume + volume;

    if (newTotalVolume > selectedSize) {
      setIsModalOpen(true);
      return;
    }

    if (!isIngredientSelected && selectedIngredients.length >= 5) {
      setIsFull(true);
      return;
    }

    setIsFull(false);
    setTotalVolume(newTotalVolume);

    if (isIngredientSelected) {
      setSelectedIngredients(
        selectedIngredients.map((item) =>
          item.ingredient.name === ingredient.name
            ? { ingredient, volume }
            : item
        )
      );
    } else {
      setSelectedIngredients([...selectedIngredients, { ingredient, volume }]);
    }

    const price = ingredient.pricePerLiter * (volume / 1000);
    setTotalPrice((prevPrice) => prevPrice + price);
  };

  const handleCreateSmoothie = () => {
    if (selectedIngredients.length === 0) {
      setModalContent({
        isOpen: true,
        title: "No Ingredients Selected",
        content: "Please choose at least one ingredient for your smoothie.",
      });
      return;
    }

    const customSmoothie = {
      name: "Custom Smoothie",
      size: selectedSize,
      ingredients: selectedIngredients,
      price: totalPrice,
    };

    dispatch(addToCart(customSmoothie));
    setModalContent({
      isOpen: true,
      title: "Smoothie Added!",
      content: "Your custom smoothie has been added to the cart.",
    });
    handleClearSelections();
  };

  const handleClearSelections = () => {
    setSelectedSize(250);
    setSelectedIngredients([]);
    setTotalPrice(0);
    setTotalVolume(0);
    setIsFull(false);
  };

  const handleCloseModal = () => {
    setModalContent({
      isOpen: false,
      title: "",
      content: "",
    });
  };

  return (
    <div className="p-5">
      <Modal
        isOpen={isModalOpen}
        title="Volume Exceeded"
        content="This amount will exceed the total size. Please change the size or choose a smaller portion."
        onClose={() => setIsModalOpen(false)}
      />

      <Modal
        isOpen={modalContent.isOpen}
        title={modalContent.title}
        content={modalContent.content}
        onClose={handleCloseModal}
      />

      {isFull && (
        <div className="text-red-500">
          Cannot add more ingredients. Smoothie is full!
        </div>
      )}

      <label className="block mb-4">
        <span className="text-gray-700">Select Smoothie Size:</span>
        <select
          className="form-select mt-1 block w-full"
          value={selectedSize}
          onChange={handleSizeChange}
        >
          <option value={250}>250 ml</option>
          <option value={500}>500 ml</option>
          <option value={1000}>1 l</option>
        </select>
      </label>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {ingredients.map((ingredient) => (
          <div className="w-1/3 p-1" key={ingredient._id}>
            <IngredientSelect
              ingredient={ingredient}
              onAddIngredient={handleAddIngredient}
              selectedIngredients={selectedIngredients}
              selectedSize={selectedSize}
              isFull={isFull}
            />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-bold">
          Selected Ingredients (Total Volume: {totalVolume} ml):
        </h2>
        <ul>
          {selectedIngredients.map((item, index) => (
            <li key={index}>
              {item.ingredient.name}: {item.volume} ml
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold mt-3">
          Total Price: {totalPrice.toFixed(2)}$
        </h2>
      </div>

      <button
        onClick={handleCreateSmoothie}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
      >
        Create Smoothie
      </button>
      <button
        onClick={handleClearSelections}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-5 ml-3"
      >
        Clear Selections
      </button>
    </div>
  );
};

export default SmoothieConstructor;
