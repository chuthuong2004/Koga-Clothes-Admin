import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../slices';

const rootReducer = combineReducers({
  authKoga: authReducer,
});

export default rootReducer;
