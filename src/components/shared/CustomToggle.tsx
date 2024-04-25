interface CustomToggleProps {
  dynamicId: string | number;
}

const CustomToggle = ({ dynamicId }: CustomToggleProps) => {
  console.log(dynamicId);
  return (
    <>
      <input type="checkbox" id={`${dynamicId}`} className="toggle-input" />
      <label htmlFor={`${dynamicId}`} className="toggle-label">
        Toggle
      </label>
    </>
  );
};

export default CustomToggle;
