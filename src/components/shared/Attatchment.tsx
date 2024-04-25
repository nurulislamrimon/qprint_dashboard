import { IconDownload } from '@tabler/icons-react';
import Image from 'next/image';
import pdfLogo from '@/assets/pdf_logo.png';
import React from 'react';

const Attatchment = () => {
    return (
        <div className='p-5 flex flex-col gap-2.5'>
            <span className='main-text-color text-base'>Attachment</span>
            <div className='flex items-center gap-5 border px-5 py-2.5 rounded-custom-10px md:w-2/4 w-full cursor-pointer'>
                <Image src={pdfLogo} alt='pdf-logo' />
                <span className='text-base text-black-opacity-70'>filename.pdf</span>
                <IconDownload stroke={1} width={20} height={20} />
            </div>
        </div>
    );
};

export default Attatchment;