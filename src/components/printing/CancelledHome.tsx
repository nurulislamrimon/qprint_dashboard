"use client"
import { usePrintingRequestsQuery } from "@/store/features/printingRequest/printingRequestApi";
import PrintingTableHead from "./PrintingTableHead";
import PrintingTableRow from "./PrintingTableRow";
import PrintingRequestDrawer from "./PrintingRequestDrawer";
import { useState } from "react";
import TableSkeleton from "../shared/skeleton/TableSkeleton";
import PrintingEmptyState from "./PrintingEmptyState";

export type PrintingTableData = {
    fullName?: string;
    orderStatus?: {
        status: string;
        time: string;
        _id: string;
    };
    status?: string;
}

const CancelledHome = () => {
    const { data: cancelledData, isLoading } = usePrintingRequestsQuery("orderStatus.status=Cancelled");
    // console.log(cancelledData);
    const [openModal, setOpenModal] = useState<string | false>(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    return (
        <div className="bg-[#F4F4F5] mt-5">
            {cancelledData?.data?.length === 0 ? (
                <PrintingEmptyState />
            ) :
                <table className="w-full">
                    <thead className="bg-[#F4F4F5] text-black-opacity-60 text-xs md:text-base text-center sticky top-0">
                        <PrintingTableHead />
                    </thead>
                    <tbody>
                        {

                            isLoading ? ([...Array(15)].map((_, index) => {
                                return (
                                    <tr key={index} className="animate-pulse w-full bg-white">
                                        <TableSkeleton />
                                    </tr>
                                )
                            })

                            ) :
                                cancelledData?.data?.map((data: any, index: number) => (
                                    <tr onClick={() => setOpenModal(data?._id)} key={index.toString()} className='hover:bg-table-row-hover cursor-pointer transition-all text-center bg-white'>
                                        <PrintingTableRow
                                            data={data}
                                        />

                                    </tr>
                                ))
                        }
                    </tbody>
                </table>}
            {
                openModal &&
                <PrintingRequestDrawer openModal={true} handleCloseModal={handleCloseModal} id={openModal} />
            }
        </div>
    );
};

export default CancelledHome;