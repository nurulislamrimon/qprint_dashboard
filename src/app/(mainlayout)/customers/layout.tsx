import TopBar from "@/components/shared/TopBar";

const CustomersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mb-1">
        <TopBar title={"Customers"} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CustomersLayout;
