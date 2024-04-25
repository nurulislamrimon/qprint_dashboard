import ShopSetupNavigationBar from "@/components/ShopSetup/ShopSetupNavigationBar";
import TopBar from "@/components/shared/TopBar";

const ShopSetupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <TopBar title={"Shop Setup"} />
      </div>
      <div className="bg-white h-[calc(100vh-90px)] overflow-y-auto mt-1">
        <div className="border-b">
          <ShopSetupNavigationBar />
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default ShopSetupLayout;
