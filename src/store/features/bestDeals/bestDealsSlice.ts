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
  bestDealsFiles: Record<string, File>;
  backgroundPhoto: File | null;
  backgroundColor: string;
}

const initialState: any | Record<string, unknown> = {};

const bestDealsSlice = createSlice({
  name: "bestDeals",
  initialState,
  reducers: {
    setBestDeals: (
      state,
      action: PayloadAction<Partial<IBestDealsSlice> | false>
    ) => {
      if (action.payload === false) {
        return initialState;
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    },

    setBestDealsFiles: (state, action) => {
      state.bestDealsFiles = { ...state.bestDealsFiles, ...action.payload };
    },
    clearBackgroundPhoto: (state) => {
      if (state.bestDealsFiles?.backgroundPhoto?.name) {
        state.bestDealsFiles.backgroundPhoto = null;
      }
      state.backgroundPhoto = null;
    },
    setBackgroundColor: (state) => {
      state.backgroundColor = "";
    },

    addToBestDeals: (state, action: PayloadAction<IProduct>) => {
      const newProduct = action.payload;
      return {
        ...state,
        products: [...(state.products || []), newProduct],
      };
    },

    removeFromBestDeals: (state, action: PayloadAction<string>) => {
      console.log(action);
      return {
        ...state,
        products: (state.products || []).filter(
          //@ts-ignore
          (product: any) => product._id !== action.payload._id
        ),
      };
    },
    setSearchProductEmpty: (state) => {
      state.searchProduct = "";
    },
  },
});

export const {
  setBestDeals,
  addToBestDeals,
  removeFromBestDeals,
  setBestDealsFiles,
  setSearchProductEmpty,
  clearBackgroundPhoto,
  setBackgroundColor,
} = bestDealsSlice.actions;

export default bestDealsSlice.reducer;
