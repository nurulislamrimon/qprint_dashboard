interface GlobalCustomSelectProps {
  label?: string;
  className?: string;
  containerStyle?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  options?: Array<string | { label: string; value: string | number }>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GlobalCustomSelect = ({
  label,
  className,
  containerStyle,
  disabled,
  name,
  options,
  onChange,
}: GlobalCustomSelectProps) => {
  return (
    <div className={`flex flex-col w-full gap-2.5 ${containerStyle}`}>
      <label
        className="text-black-opacity-50 text-base"
        htmlFor={label?.toLowerCase()}
      >
        {label}
      </label>
      <select
        id={label?.toLowerCase()}
        name={name}
        disabled={disabled}
        onChange={onChange}
        className={`border  rounded-custom-5px py-3 px-3.5 outline-none active:border-fuchsia-800 focus:border-fuchsia-800 bg-transparent ${className}`}
      >
        <option value="" selected disabled>
          Please select
        </option>
        {options?.map((option) => {
          if (typeof option === "string") {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default GlobalCustomSelect;
