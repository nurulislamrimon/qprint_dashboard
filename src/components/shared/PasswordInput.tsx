"use client";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

interface PasswordInputProps {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  className?: string;
  inputStyle?: string;
  label?: string;
  value?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  onChange,
  placeholder,
  className,
  inputStyle,
  label,
  value,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={`w-full flex flex-col ${label ? "gap-2.5" : ""}`}>
      <label htmlFor="input label" className="text-black-opacity-60">
        {label}
      </label>
      <div className={`relative ${className}`}>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`border py-3 pl-5 bg-transparent outline-none rounded-lg active:border-main-border-color focus:border-main-border-color active:shadow-boxShadow focus:shadow-boxShadow w-full ${inputStyle}`}
        />
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute top-3.5 right-0 flex items-center px-3 text-gray-500"
        >
          {showPassword ? (
            <IconEye width={20} height={20} />
          ) : (
            <IconEyeOff width={20} height={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
