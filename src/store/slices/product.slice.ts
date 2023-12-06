import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { StoreProduct } from '@/types/entities';

type ProductState = {
  viewed: StoreProduct[];
};
const initialState: ProductState = {
  viewed: [],
};
export const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setViewedProduct: (state, action: PayloadAction<StoreProduct>) => {
      const foundProduct = state.viewed.find((item) => item._id === action.payload._id);
      if (foundProduct) {
        state.viewed = [
          foundProduct,
          ...state.viewed.filter((item) => item._id !== action.payload._id),
        ];
      } else {
        state.viewed = [action.payload, ...state.viewed];
      }
    },
  },
});

export const { setViewedProduct } = productSlice.actions;

export default productSlice.reducer;
