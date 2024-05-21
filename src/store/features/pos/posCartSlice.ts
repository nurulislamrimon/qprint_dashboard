import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  variant: Variant;
  orderQuantity: number;
  variantName: string;
  variantId: string;
  discountPercentage: number;
  discountedPrice: number;
  inStock: number;
  isDefault: boolean;
  sellingPrice: number;
  stockAlert: number;
  price: number;
}

interface Variant {
  isDefault: boolean;
  discountedPrice?: number;
  sellingPrice: number;
}

interface CartState {
  products: Product[];
  subTotal: number;
  discount: number;
}

const initialState: CartState = {
  products: [],
  subTotal: 0,
  discount: 0,
};

// <== Function to save state || products into localStorage ==>
const saveStateToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

// <== Function to load more state from localStorage ==>
const loadStateFromLocalStorage = (): CartState | undefined => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

const calculateSubTotal = (products: Product[]): number => {
  return products.reduce((total, product) => {
    return total + product.price * product.orderQuantity;
  }, 0);
};

const posCartSlice = createSlice({
  name: "cart",
  initialState: loadStateFromLocalStorage() || initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const addedProduct = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product._id === addedProduct._id &&
          product.variantName === addedProduct.variantName
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].orderQuantity += 1;
      } else {
        state.products.push(addedProduct);
      }

      state.subTotal = calculateSubTotal(state.products);
      saveStateToLocalStorage(state);
    },
    removeOneFromCart: (state, action: PayloadAction<Product>) => {
      const removedProduct = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product._id === removedProduct._id &&
          product.variantName === removedProduct.variantName
      );

      if (
        existingProductIndex !== -1 &&
        state.products[existingProductIndex].orderQuantity > 1
      ) {
        state.products[existingProductIndex].orderQuantity -= 1;
      }

      state.subTotal = calculateSubTotal(state.products);
      saveStateToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const removedProduct = action.payload;
      state.products = state.products.filter(
        (product) =>
          !(
            product._id === removedProduct._id &&
            product.variantName === removedProduct.variantName
          )
      );

      state.subTotal = calculateSubTotal(state.products);
      saveStateToLocalStorage(state);
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    resetCart: (state) => {
      state.products = [];
      state.subTotal = 0;
      state.discount = 0;
      localStorage.removeItem("cartState");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeOneFromCart,
  setDiscount,
  resetCart,
} = posCartSlice.actions;
export default posCartSlice.reducer;
