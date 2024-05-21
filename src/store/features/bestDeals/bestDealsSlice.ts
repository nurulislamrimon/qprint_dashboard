// WidgetSlice.ts (Redux slice)
import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBestDealsProduct {
  productPhoto: string;
  productName: string;
  brandName: string;
  stock: string;
  sellingPrice: string;
  discountPercentage: string;
  discountPrice: string;
  link: string;
  productId: string;
  averageRating: number;
  _id: string;
}
interface IBestDealsSlice {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  products: IBestDealsProduct[];
  searchProduct: string;
  backgroundColor: string;
  bestDealsFiles: {
    backgroundPhoto: File | null;
    firstProductPhoto: File | null;
    secondProductPhoto: File | null;
  };

  isBgColorSelected: boolean;
}

const initialState: IBestDealsSlice | Record<string, unknown> = {};

const bestDealsSlice = createSlice({
  name: "bestDeals",
  initialState,
  reducers: {
    setBestDeals: (state, action: PayloadAction<Partial<IBestDealsSlice>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    setBestDealsFiles: (state: { bestDealsFiles?: File | null }, action) => {
      if ("bestDealsFiles" in state) {
        state.bestDealsFiles = {
          ...state.bestDealsFiles,
          ...action.payload,
        };
      } else {
        state.bestDealsFiles = action.payload;
      }
    },
    addProductToBestDeals: (
      state: { products?: IBestDealsProduct[] },
      action: PayloadAction<IProduct>
    ) => {
      const newProduct = action.payload;
      if (state?.products) {
        return {
          ...state,
          products: [...state?.products, newProduct],
        };
      } else {
        return {
          ...state,
          products: [newProduct],
        };
      }
    },

    removeProductFromBestDeals: (
      state: { products?: IBestDealsProduct[] },
      action: PayloadAction<{ _id: string }>
    ) => {
      return {
        ...state,
        products: (state.products || []).filter(
          (product: any) => product._id !== action.payload._id
        ),
      };
    },
    handleModalOfBestDealsProduct: (state) => {
      return { ...state, searchProduct: "" };
    },
  },
});

export const {
  setBestDeals,
  addProductToBestDeals,
  removeProductFromBestDeals,
  setBestDealsFiles,
  handleModalOfBestDealsProduct,
} = bestDealsSlice.actions;

export default bestDealsSlice.reducer;
