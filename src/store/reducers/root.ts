import {combineReducers} from '@reduxjs/toolkit';
import {recordReducer} from '../slices/recordSlice';
import {modalReducer} from "../slices/modalState";

export const rootReducer = combineReducers({
  records: recordReducer,
  modal: modalReducer,
});
