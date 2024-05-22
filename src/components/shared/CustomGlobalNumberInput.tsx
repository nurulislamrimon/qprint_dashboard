interface CustomGlobalNumberInputProps {
  label?: string;
  type?: "tel" | "number" | "string";
  placeholder?: string;
  className?: string;
  containerStyle?: string;
  disabled?: boolean;
  name?: string;
  value?: string | any;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomGlobalNumberInput = ({
  label,
  type,
  placeholder,
  className,
  containerStyle,
  disabled,
  name,
  value,
  defaultValue,
  onChange,
}: CustomGlobalNumberInputProps) => {
  return (
    <div className={`flex flex-col gap-2.5 w-full ${containerStyle}`}>
      {/* <== Custom Input Label ==> */}
      {label && (
        <label
          htmlFor={label?.toLowerCase()}
          className=" text-black-opacity-60"
        >
          {label}
        </label>
      )}
      <input
        id={label?.toLowerCase()}
        type={type}
        placeholder={placeholder}
        className={`${className} border py-3 px-3.5 bg-transparent outline-none rounded-custom-5px active:border-main-border-color focus:border-main-border-color`}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        pattern="\+974[0-9]{3,8}"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default CustomGlobalNumberInput;
