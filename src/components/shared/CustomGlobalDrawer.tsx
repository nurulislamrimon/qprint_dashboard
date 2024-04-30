import React, { useState, useEffect } from "react";

interface CustomGlobalDrawerProps {
  children: React.ReactNode;
  drawerControllerClassName?: string;
  childrenClassName?: string;
  isVisible?: boolean;
  setOpenDrawer?: (value: boolean) => void;
  modalWidthControlClassName?: string;
}

const CustomGlobalDrawer = ({
  children,
  drawerControllerClassName,
  childrenClassName,
  setOpenDrawer,
  isVisible,
  modalWidthControlClassName,
}: CustomGlobalDrawerProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isVisible || false);
  }, [isVisible]);

  const closeModal = () => {
    if (setOpenDrawer) {
      setOpenDrawer(false);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div
      onClick={closeModal}
      className={`${drawerControllerClassName} ${
        showModal
          ? "transition-all duration-500 ease-in-out"
          : "opacity-0 pointer-events-none "
      } fixed inset-0 cursor-pointer bg-black bg-opacity-50 flex items-center justify-center z-50 `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${modalWidthControlClassName} ${
          showModal
            ? "transform translate-x-0 transition-all duration-700"
            : "transform translate-x-full transition-all duration-700"
        } fixed top-0 right-0 bg-white`}
      >
        <div className={`${childrenClassName} h-screen`}>{children}</div>
      </div>
    </div>
  );
};

export default CustomGlobalDrawer;
