import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishList",
  initialState: [],
  reducers: {
    toggleWishlist(state, action) {
      const index = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(action.payload); 
      }
    },
  },
});

export const { toggleWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;