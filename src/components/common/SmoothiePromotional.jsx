import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotions } from "../../api/asyncActions";
import SmoothieCard from "./SmoothieCard";

const SmoothiePromotional = () => {
  const dispatch = useDispatch();
  const { promotions, loading } = useSelector((state) => state.smoothie);

  useEffect(() => {
    dispatch(fetchPromotions()).catch((error) => {
      console.error("Failed to fetch smoothies:", error);
    });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center">
      {promotions.map((smoothie) => (
        <SmoothieCard key={smoothie._id} smoothie={smoothie} />
      ))}
    </div>
  );
};

export default SmoothiePromotional;
