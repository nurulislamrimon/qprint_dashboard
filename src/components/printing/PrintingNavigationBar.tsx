"use client";
import { printingRequestNavMenu } from "@/constants/printing.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PrintingNavigationBarProps {
    key?: string,
    label?: string,
    href?: string | undefined,
}

const PrintingNavigationBar = () => {
    const activeRoute = usePathname();
    return (
        <div className="flex items-center gap-10 border-b overflow-x-auto">
            {printingRequestNavMenu.map(({ key, label, href }: PrintingNavigationBarProps) => (
                <div key={key} className={`py-2.5 border-b border-transparent  md:text-base text-sm text-black-opacity-70 whitespace-nowrap ${activeRoute === `/printing${href}` ? "main-text-color border-b-2   border-b-main-border-color" : "text-black-opacity-70"}`} >
                    <Link href={`/printing${href}`}>
                        {label}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default PrintingNavigationBar;