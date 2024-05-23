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
  maxLength?: number;
  minLength?: number;
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
  maxLength,
  minLength,
  onChange,
}: CustomGlobalNumberInputProps) => {
  return (
    <div className={`flex flex-col gap-2.5 w-full ${containerStyle}`}>
      {/* Custom Input Label */}
      {label && (
        <label htmlFor={label?.toLowerCase()} className="text-black-opacity-60">
          {label}
        </label>
      )}
      <div
        className={`${className} border py-3 px-3.5 bg-transparent outline-none rounded-custom-5px active:border-main-border-color focus:border-main-border-color flex items-center`}
      >
        <label htmlFor="" className="pr-1">
          +974
        </label>
        <input
          id={label?.toLowerCase()}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
          pattern="\974[0-9]{3,8}"
          maxLength={8}
          minLength={3}
          defaultValue={defaultValue}
          className="border-none outline-none w-full"
        />
      </div>
    </div>
  );
};

export default CustomGlobalNumberInput;
