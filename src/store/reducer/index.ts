import { combineReducers } from '@reduxjs/toolkit';
import { authSlice, chatSlice, productSlice } from '../slices';

const rootReducer = combineReducers({
  authKoga: authSlice,
  productKoga: productSlice,
  chatKoga: chatSlice
});

export default rootReducer;
