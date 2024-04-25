import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Q-print",
  description: "Q-print Dashboard",
};

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <div className={`w-full ${poppins.className} bg-[#F2F5FB]`}>
          <StoreProvider>{children}</StoreProvider>
        </div>
        <ToastContainer />
      </body>
    </html>
  );
};

export default MainLayout;
