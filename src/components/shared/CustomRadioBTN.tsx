const CustomRadioBTN = ({ type, isChecked, dynamicRadioId }: any) => {
  return (
    <div className="custom-radio-button-container">
      <input
        title="radio-btn"
        id={dynamicRadioId}
        type={type}
        name="radio custom-radio-btn"
        className="hidden"
        checked
      />
      <label
        htmlFor={dynamicRadioId}
        className="flex items-center cursor-pointer custom-radio-btn-label"
      >
        <span
          className={`w-5 h-5 inline-block mr-1 rounded-full border border-grey custom-radio-btn-span 
        ${type === "radio" && isChecked ? "bg-main-bg-color" : ""} `}
        ></span>
      </label>
    </div>
  );
};

export default CustomRadioBTN;
