import TopBar from "@/components/shared/TopBar";

const BrandLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div>
                <TopBar title="Brand" />
            </div>
            <div className="mt-1 h-[calc(100vh-90px)] overflow-y-scroll  bg-white">
                {children}
            </div>
        </div>
    );
};

export default BrandLayout;