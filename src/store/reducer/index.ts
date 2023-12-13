import { combineReducers } from '@reduxjs/toolkit';
import { authSlice, productSlice } from '../slices';

const rootReducer = combineReducers({
  authKoga: authSlice,
  productKoga: productSlice,
});

export default rootReducer;
