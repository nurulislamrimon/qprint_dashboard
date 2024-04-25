interface ProductColorIndicatorProps {
  indicatorBgColor?: string;
  containerStyle?: string;
}

const ProductColorIndicator = ({
  indicatorBgColor,
  containerStyle,
}: ProductColorIndicatorProps) => {
  return (
    <div
      className={`border flex items-center justify-center rounded-custom-5px p-3.5 h-[50px]  ${containerStyle} `}
    >
      <span
        className="w-5 h-5 rounded-full"
        style={{ backgroundColor: indicatorBgColor }}
      ></span>
    </div>
  );
};

export default ProductColorIndicator;
