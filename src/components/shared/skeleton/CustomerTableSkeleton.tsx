
const CustomerTableSkeleton = () => {
    return (
        <>
            <td className='md:table-cell hidden'>
                <div
                    className="block mx-auto w-10 h-3  bg-gray-200 rounded-full text-inherit">
                    &nbsp;
                </div>
            </td>
            <td>
                <div className="flex items-center justify-center gap-2 my-2 px-2">
                    <div
                        className="md:w-10 md:h-10 w-8 h-8  bg-gray-200 rounded-full text-inherit">
                        &nbsp;
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div
                            className="md:w-32 w-20 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                        <div
                            className="md:w-20 w-10 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center gap-2.5">
                        <div
                            className="md:w-32 w-20 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                        <div
                            className="md:w-20 w-10 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div
                    className="block mx-auto md:w-20 w-10 h-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
                    &nbsp;
                </div>
            </td>
            <td className='md:table-cell hidden'>
                <div
                    className="mx-auto  w-10 h-8  bg-gray-200 rounded-md text-inherit">
                    &nbsp;
                </div>
            </td>
        </>
    );
};

export default CustomerTableSkeleton;