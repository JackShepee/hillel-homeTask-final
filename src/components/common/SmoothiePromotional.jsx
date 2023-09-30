import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotions } from "../../api/asyncActions";
import SmoothieCard from "./SmoothieCard";
import Modal from "../utils/Modal";

const SmoothiePromotional = () => {
  const dispatch = useDispatch();
  const { promotions, loading } = useSelector((state) => state.smoothie);
  const [modalContent, setModalContent] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  useEffect(() => {
    dispatch(fetchPromotions()).catch((error) => {
      console.error("Failed to fetch smoothies:", error);
      setModalContent({
        isOpen: true,
        title: "Error",
        content:
          "Failed to fetch promotional smoothies. Please try again later.",
      });
    });
  }, [dispatch]);

  const handleCloseModal = () => {
    setModalContent({
      isOpen: false,
      title: "",
      content: "",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <Modal
        isOpen={modalContent.isOpen}
        title={modalContent.title}
        content={modalContent.content}
        onClose={handleCloseModal}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center">
        {promotions.map((smoothie) => (
          <SmoothieCard key={smoothie._id} smoothie={smoothie} />
        ))}
      </div>
    </div>
  );
};

export default SmoothiePromotional;
