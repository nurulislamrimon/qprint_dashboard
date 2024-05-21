import counterReducer from "./features/counter/counter";
import { baseApi } from "./api/baseApi";
import authSlice from "./features/auth/authSlice";
import createBrandSlice from "./features/brand/createBrandSlice";
import replySlice from "./features/review/replySlice";
import shippingChargeSlice from "./features/shopSetup/shippingcharge/shippingChargeSlice";
import paperSizeSlice from "./features/shopSetup/printingSetup/paperSizeSlice";
import paperTypeSlice from "./features/shopSetup/printingSetup/paperTypeSlice";
import printingModeSlice from "./features/shopSetup/printingSetup/printingModeSlice";
import specialOfferSlice from "./features/shopSetup/specialOffer/specialOfferSlice";
import widgetSlice from "./features/DealsOfTheDayAndWidget/widgetSlice";
import userAdminSlice from "./features/users/userSlice";
import sliderSlice from "./features/slider/sliderSlice";
import seoSlice from "./features/shopSetup/seo/seoSlice";
import subCategoryPropsSlice from "./features/category/subCategoryPropsSlice";
import bestDealsSlice from "./features/bestDeals/bestDealsSlice";
import subCategorySlice from "./features/category/subCategorySlice";
import settingSlice from "./features/auth/settingSlice";
import updatePasswordSlice from "./features/auth/updatePasswordSlice";
import saleByCategorySlice from "./features/dashboard/saleByCategory/saleByCategorySlice";
import categorySlice from "./features/category/categorySlice";
import posCartSlice from "./features/pos/posCartSlice";
import posSaleSlice from "./features/pos/posSaleSlice";
import offerSlice from "./features/slider/offerSlice";
import socialMediaSlice from "./features/shopSetup/socialMedia/socialMediaSlice";
import imageSlice from "./features/globalImage/imageSlice";
import addProductSlice from "./features/product/addProductSlice";
import unitSlice from "./features/shopSetup/printingSetup/unitSlice";
import searchProductByCategorySlice from "./features/searchProductByCategory/searchProductByCategorySlice";
import editBrandSlice from "./features/brand/editBrandSlice";
import updateProductSlice from "./features/product/updateProductSlice";
import allOrderReportDetails from "./features/topSellingProduct/analytics/allOrderReportDetails";
import dealsOfTheDaySlice from "./features/DealsOfTheDayAndWidget/dealsOfTheDaySlice";
import updateProductStockSlice from "./features/product/updateProductStockSlice.ts";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  counter: counterReducer,
  widget: widgetSlice,
  authSlice: authSlice,
  createBand: createBrandSlice,
  reply: replySlice,
  shippingCharge: shippingChargeSlice,
  paperSize: paperSizeSlice,
  paperType: paperTypeSlice,
  printingColorMode: printingModeSlice,
  specialOfferSlice: specialOfferSlice,
  userAdminSlice: userAdminSlice,
  slider: sliderSlice,
  seoSlice: seoSlice,
  subCategoryPropsSlice: subCategoryPropsSlice,
  bestDealsSlice: bestDealsSlice,
  subCategorySlice: subCategorySlice,
  categorySlice: categorySlice,
  settingSlice: settingSlice,
  updatePasswordSlice: updatePasswordSlice,
  saleByCategorySlice: saleByCategorySlice,
  posCart: posCartSlice,
  posSaleSlice: posSaleSlice,
  offerSlice: offerSlice,
  socialMediaSlice: socialMediaSlice,
  image: imageSlice,
  product: addProductSlice,
  unitSlice: unitSlice,
  searchProductByCategorySlice: searchProductByCategorySlice,
  editBrandSlice: editBrandSlice,
  addProduct: addProductSlice,
  updateProduct: updateProductSlice,
  allOrderReportDetails: allOrderReportDetails,
  dealsOfTheDaySlice: dealsOfTheDaySlice,
  updateProductStockSlice: updateProductStockSlice,
};
