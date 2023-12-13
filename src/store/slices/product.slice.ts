import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { UploadFile } from 'antd';

type ProductState = {
  formProduct: {
    formMedias: Record<string, { imageSmall: UploadFile<any>[]; imageMedium: UploadFile<any>[]; images: UploadFile<any>[] }>;
  };
};
type ChangeFileMedias = {
  fileList: UploadFile<any>[]
  type_image: 'images' | 'imageSmall' | 'imageMedium';
  colorName: string;
};
const initialState: ProductState = {
  formProduct: {
    formMedias: {},
  },
};
export const productSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFormMedias: (state, action: PayloadAction<ProductState['formProduct']['formMedias']>) => {
      state.formProduct.formMedias = action.payload;
    },
    setFileChangeMedias: (state, action: PayloadAction<ChangeFileMedias>) => {
      state.formProduct.formMedias = {
        ...state.formProduct.formMedias,
        [action.payload.colorName]: {
          ...state.formProduct.formMedias[action.payload.colorName],
          [action.payload.type_image]: action.payload.fileList,
        },
      };
    },
  },
});

export const selectFormMedias = (state: RootState) => state.productKoga.formProduct.formMedias;

export const { setFormMedias, setFileChangeMedias } = productSlice.actions;

export default productSlice.reducer;
