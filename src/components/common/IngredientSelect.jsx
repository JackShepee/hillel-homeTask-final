import React, { useState } from "react";
import Button from "../utils/Button";

const IngredientSelect = ({
  ingredient,
  selectedIngredients,
  onAddIngredient,
  selectedSize,
  isFull,
}) => {
  const [selectedVolume, setSelectedVolume] = useState(0);

  const handleVolumeChange = (e) => {
    setSelectedVolume(Number(e.target.value));
  };

  const handleAddClick = () => {
    if (selectedVolume > 0) {
      onAddIngredient(ingredient, selectedVolume);
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-5 border rounded w-full ${
        ingredient.availability ? "" : "opacity-50 pointer-events-none"
      }`}
    >
      <div className="flex items-center">
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="ml-3 flex-grow">
          <span className="block text-gray-700 truncate">
            {ingredient.name}
          </span>
          <span className="block text-sm text-gray-500">
            Price per liter: {ingredient.pricePerLiter}
          </span>
        </div>
      </div>
      {ingredient.availability ? (
        <div className="flex items-center justify-center">
          <select
            className="form-select w-20"
            value={selectedVolume}
            onChange={handleVolumeChange}
          >
            <option value={0}>0 ml</option>
            {[...Array(selectedSize / 50).keys()].map((i) => (
              <option key={i} value={(i + 1) * 50}>
                {(i + 1) * 50} ml
              </option>
            ))}
          </select>
          <Button
            onClick={handleAddClick}
            className={`${
              isFull
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 ml-3 mt-0 rounded`}
            disabled={isFull}
          >
            Add
          </Button>
        </div>
      ) : (
        <span className="text-gray-500 ml-auto">Unavailable</span>
      )}
    </div>
  );
};

export default IngredientSelect;
