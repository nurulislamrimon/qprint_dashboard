import React from 'react';
import CustomGlobalDrawer from '../shared/CustomGlobalDrawer';

const AddNewProductsDrawer = ({ openMOdal, handleCloseModal }: any) => {
    return (
        <div>
            <CustomGlobalDrawer isVisible={openMOdal} drawerControllerClassName='z-50'>
                <div>

                </div>
            </CustomGlobalDrawer>
        </div>
    );
};

export default AddNewProductsDrawer;