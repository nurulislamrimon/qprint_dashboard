import SideNav from "@/components/SideNav/SideNav";
const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex lg:gap-1 gap-0 ">
      {/* ==SideBar Nav== */}
      <div className="md:block hidden ">
        <SideNav />
      </div>
      {/* ==Main Content== */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
