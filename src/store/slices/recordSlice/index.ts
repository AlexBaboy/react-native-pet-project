import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RecordState} from "./types";

const initialState: RecordState[] = [];

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    addRecord: (records, {payload}: PayloadAction<RecordState>) => {

      const recordItem: RecordState = {
        id: Date.now(),
        title: payload.title,
        description: payload.description,
        published: payload.published,
        createdAt: new Date().toLocaleString(),
        photoUrl: payload.photoUrl
      }
      return [
          ...records,
          recordItem
      ]
    },
    removeRecord: (records, {payload}: PayloadAction<number>) => {
      return records.filter(record => record.id !== payload);
    },
    clearAllRecords: () => {
      return []
    }
  },
});

export const {
  addRecord,
  removeRecord,
  clearAllRecords
} = recordSlice.actions;

export const recordReducer = recordSlice.reducer;