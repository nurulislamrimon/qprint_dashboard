import PrintingNavigationBar from '@/components/printing/PrintingNavigationBar';
import TopBar from '@/components/shared/TopBar';
const printingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* Topbar */}
            <div>
                <TopBar title='Printing Request' />
            </div>

            {/* Main Content*/}
            <div className='bg-white  mt-1 h-[calc(100vh-90px)] overflow-y-scroll'>
                <div className='md:px-7 md:pt-5 px-5'>
                    <PrintingNavigationBar />
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default printingLayout;