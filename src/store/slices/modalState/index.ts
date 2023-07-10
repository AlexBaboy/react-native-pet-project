import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    visible: true
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeVisible: (state, {payload}: PayloadAction<boolean>) => {
            state.visible = payload
        }
    },
});

export const {
    changeVisible
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
