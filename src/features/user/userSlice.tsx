// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// export interface UserState {
//   value: number;
// }

// const initialState: UserState = {
//   value: 0,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     createUser: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1;
//     },
//     getUser: (state) => {
//       state.value -= 1;
//     },
//     getAllUsers: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions;

// export default userSlice.reducer;