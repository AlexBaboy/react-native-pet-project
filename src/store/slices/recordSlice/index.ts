import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RecordState} from "./types";

const initialState: RecordState[] = [];

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    add: (records, {payload}: PayloadAction<RecordState>) => {

      const recordItem: RecordState = {
        id: Date.now(),
        title: payload.title,
        description: payload.description,
        published: payload.published,
        createdAt: new Date().toLocaleString(),
        photoUrl: payload.photoUrl
      }
      records.push(recordItem);
    },
    remove: (records, {payload}: PayloadAction<number>) => {
      return records.filter(record => record.id !== payload);
    },
    clearAll: () => {
      return []
    }
  },
});

export const {
  add,
  remove,
  clearAll
} = recordSlice.actions;

export const recordReducer = recordSlice.reducer;