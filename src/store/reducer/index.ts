import { combineReducers } from '@reduxjs/toolkit';
import { authReducer, cartReducer, productReducer } from '../slices';

const rootReducer = combineReducers({
  authKoga: authReducer,
  cartKoga: cartReducer,
  productKoga: productReducer,
});

export default rootReducer;
