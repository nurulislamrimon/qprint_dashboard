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
  if (!isVisible) return null;
  return (
    <div
      onClick={() => {
        if (setOpenDrawer) {
          setOpenDrawer(false);
        }
      }}
      className={`${drawerControllerClassName} w-dvw h-dvh fixed inset-0 cursor-pointer bg-black bg-opacity-50 flex items-center justify-center z-50`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${modalWidthControlClassName} fixed top-0 right-0 bg-white `}
      >
        <div className={`${childrenClassName} h-screen`}>{children}</div>
      </div>
    </div>
  );
};

export default CustomGlobalDrawer;
