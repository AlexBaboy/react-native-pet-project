import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {initialStateType, RecordState} from "./types";

const initialState: initialStateType = {
  records: [],
};

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    add: (state, {payload}: PayloadAction<RecordState>) => {

      const recordItem: RecordState = {
        id: Date.now(),
        title: payload.title,
        description: payload.description,
        published: payload.published,
        createdAt: new Date().toLocaleString(),
        photoUrl: payload.photoUrl
      }
      state.records.push(recordItem);

      console.log('25 recordItem', recordItem)

    },
    remove: (state, {payload}: PayloadAction<number>) => {
      state.records.filter(record => record.id !== payload);
    },
    clearAll: state => {
      state.records = []
    }
  },
});

export const {
  add,
  remove,
  clearAll
} = recordSlice.actions;

export const recordReducer = recordSlice.reducer;
