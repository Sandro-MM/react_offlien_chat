import { createSlice } from "@reduxjs/toolkit";
import {User} from "../interfaces";



const initialState: User[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.push({ ...action.payload, status: "online" });
    },
    updateUserAvatar(state, action) {
      const { userId, avatar } = action.payload;
      const userIndex = state.findIndex((u) => u.id === userId);

      if (userIndex !== -1) {
        // Update user with new avatar
        state[userIndex].avatar = avatar;
      }
    },
    markUserOffline(state, action) {
      const userId = action.payload;
      const userIndex = state.findIndex((u) => u.id === userId);

      if (userIndex !== -1) {
        state[userIndex].status = "offline";
      }
    },
  },
});

export const { addUser, updateUserAvatar, markUserOffline } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
