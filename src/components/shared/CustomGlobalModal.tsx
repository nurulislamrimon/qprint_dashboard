interface CustomGlobalModalProps {
  children: React.ReactNode;
  modalControllerClassName?: string;
  childrenClassName?: string;
  mainClassName?: string;
  isVisible?: boolean | ((value: boolean) => void) | undefined;
  setOpenModal?: (value: boolean) => void;
}

const CustomGlobalModal = ({
  children,
  modalControllerClassName,
  childrenClassName,
  mainClassName,
  isVisible,
  setOpenModal,
}: CustomGlobalModalProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (setOpenModal) {
      setOpenModal(false);
    }
  };
  if (!isVisible) return null;

  return (
    <div
      onClick={handleClick}
      className={`${modalControllerClassName} cursor-pointer w-dvw h-dvh fixed inset-0 bg-black z-50 bg-opacity-40 flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${mainClassName} rounded-custom-10px bg-white cursor-auto`}
      >
        <div className={`${childrenClassName}`}>{children}</div>
      </div>
    </div>
  );
};

export default CustomGlobalModal;
