import {createSlice} from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visible : false,
    editIndex: null,
  },
  reducers: {
    changeVisibility: (state) => {
        state.visible = !state.visible;
    },
    setEditIndex: (state, action) => {
        state.editIndex = action.payload;
    }
  },
});

export const { changeVisibility, setEditIndex } = modalSlice.actions;

export default modalSlice.reducer;