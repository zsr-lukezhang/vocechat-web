import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuExpand: true,
  setting: false,
  channelSetting: null,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenuExpand(state) {
      state.menuExpand = !state.menuExpand;
    },
    toggleSetting(state) {
      state.setting = !state.setting;
    },
    toggleChannelSetting(state, action) {
      console.log("toggle channel setting payload", action);
      const id = action.payload;
      state.channelSetting = state.channelSetting ? null : id;
    },
  },
});
export const {
  toggleSetting,
  toggleMenuExpand,
  toggleChannelSetting,
} = uiSlice.actions;
export default uiSlice.reducer;
