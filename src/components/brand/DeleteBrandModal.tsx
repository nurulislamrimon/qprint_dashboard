import React from 'react';
import CustomGlobalModal from '../shared/CustomGlobalModal';
import { IconTrash } from '@tabler/icons-react';
import { useBrandQuery } from '@/store/features/brand/brandApi';
import GlobalActionButton from '../shared/GlobalActionButton';

const DeleteBrandModal = ({ openDeleteModal, handCloseleDeleteModal, id, deleteHandler, data }: any) => {
    const { data: brand, error, isLoading } = useBrandQuery(id);


    return (
        <div>
            <CustomGlobalModal isVisible={openDeleteModal} setOpenModal={handCloseleDeleteModal} mainClassName='md:w-[365px] w-[300px] h-[220px]  md:h-[250px]'>
                <div className='md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center'>
                    <div>
                        <IconTrash width={50} height={50} color='red' stroke={1.5} />
                    </div>
                    <span>Are you sure, delete <span className='font-semibold'>{brand?.data?.brandName}</span>?</span>
                    <div className='flex items-center gap-5'>
                        <button onClick={handCloseleDeleteModal} className='px-10 py-2.5 border rounded-custom-5px'>No</button>
                        <div onClick={() => deleteHandler(data?._id)}>
                            <GlobalActionButton type='submit' buttonText='Yes' buttonStyleClassName='px-10 py-2.5' />
                        </div>
                    </div>
                </div>
            </CustomGlobalModal>
        </div>
    );
};

export default DeleteBrandModal;