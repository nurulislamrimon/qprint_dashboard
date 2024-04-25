import React, { useState, useEffect } from "react";
import { IVariant } from "@/types";

// interface ProductColorSelectorProps {
//   variant: IVariant;
//   handleColorSelect: (variant: IVariant) => void;
// }
interface ProductColorSelectorProps {
  variant: IVariant;
  handleColorSelect: (variant: IVariant) => void;
  activeVariant?: IVariant | null; // Add activeVariant to the props interface
}

const ProductColorSelector = ({
  variant,
  handleColorSelect,
  activeVariant, // Receive activeVariant as prop
}: ProductColorSelectorProps) => {
  const colors =
    variant.variantName === "Not specified"
      ? ["#ffffff"]
      : [variant.variantName];

  const [selectedCircle, setSelectedCircle] = useState<number | null>(null);

  // useEffect(() => {
  //   const defaultIndex = variant.isDefault ? 0 : null;
  //   setSelectedCircle(defaultIndex);
  // }, [variant]);

  useEffect(() => {
    setSelectedCircle(activeVariant === variant ? 0 : null);
  }, [activeVariant, variant]);

  const handleClick = (index: number) => {
    setSelectedCircle(index === selectedCircle ? null : index);
    handleColorSelect(variant);
  };

  const renderCircles = () => {
    return colors.map((color, index) => (
      <div
        key={index}
        className={`w-5 h-5 rounded-full bg-white cursor-pointer flex items-center justify-center border ${index === selectedCircle
            ? `border-["${variant.variantName}"] border-2`
            : "border-none"
          }`}
        onClick={() => handleClick(index)}
      >
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    ));
  };

  return <>{renderCircles()}</>;
};

export default ProductColorSelector;
