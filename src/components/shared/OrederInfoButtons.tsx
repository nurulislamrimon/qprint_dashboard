"use client"

const OrederInfoButtons = ({ setOpenShippingModal }: any) => {
    return (
        <div className='flex items-center gap-3.5'>
            <button>Cancel</button>
            <button onClick={() => setOpenShippingModal(true)} className='border px-[18px] py-2 text-fuchsia-500 text-base  bg-main-bg-color-opacity-32 rounded-custom-5px'>Paid?</button>
        </div>
    );
};

export default OrederInfoButtons;