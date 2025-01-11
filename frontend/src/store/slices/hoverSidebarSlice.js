import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hover: false,
};

const hoverSidebarSlice = createSlice({
  name: 'hover',
  initialState,
  reducers: {
    changeOnHover: (state) => {
      state.hover = !state.hover;
    },
  },
});

export const { changeOnHover } = hoverSidebarSlice.actions;
export default hoverSidebarSlice.reducer;
