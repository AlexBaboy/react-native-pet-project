import {combineReducers} from '@reduxjs/toolkit';
import {recordReducer} from '../slices/recordSlice';

export const rootReducer = combineReducers({
  records: recordReducer,
});
