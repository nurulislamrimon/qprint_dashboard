const PrintingRequestCardSkeleton = () => {
    return (
        <div className='animate-pulse w-[200px] flex flex-col gap-2.5'>
            <div className="bg-gray-200 w-[150px] h-[100px] rounded-md"></div>
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="flex flex-col gap-2">
                    <div className="bg-gray-200 h-2 w-28 rounded-full"></div>
                    <div className="bg-gray-200 h-2 w-20 rounded-full"></div>
                </div>
            </div>

        </div>
    );
};

export default PrintingRequestCardSkeleton;