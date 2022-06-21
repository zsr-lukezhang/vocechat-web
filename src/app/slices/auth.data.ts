import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KEY_EXPIRE, KEY_PWA_INSTALLED, KEY_REFRESH_TOKEN, KEY_TOKEN, KEY_UID } from "../config";
import { AuthData, AuthToken } from "../../types/auth";

interface State {
  initialized: boolean;
  uid: string | null;
  token: string | null;
  expireTime: string | number; // todo
  refreshToken: string | null;
}

const initialState: State = {
  initialized: true,
  uid: null,
  token: localStorage.getItem(KEY_TOKEN),
  expireTime: localStorage.getItem(KEY_EXPIRE) || +new Date(),
  refreshToken: localStorage.getItem(KEY_REFRESH_TOKEN)
};

const emptyState: State = {
  initialized: true,
  uid: null,
  token: null,
  expireTime: +new Date(),
  refreshToken: null
};

const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<AuthData>) {
      const {
        initialized = true,
        user: { uid },
        token,
        refresh_token,
        expired_in = 0
      } = action.payload;
      state.initialized = initialized;
      state.uid = `${uid}`;
      state.token = token;
      state.refreshToken = refresh_token;
      // 当前时间往后推expire时长
      console.log("expire", expired_in);
      const expireTime = +new Date() + Number(expired_in) * 1000;
      state.expireTime = expireTime;
      // set local data
      localStorage.setItem(KEY_EXPIRE, `${expireTime}`);
      localStorage.setItem(KEY_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
      localStorage.setItem(KEY_UID, `${uid}`);
    },
    resetAuthData() {
      console.log("clear auth data");
      // remove local data
      localStorage.removeItem(KEY_EXPIRE);
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_REFRESH_TOKEN);
      localStorage.removeItem(KEY_UID);
      localStorage.removeItem(KEY_PWA_INSTALLED);

      return emptyState;
    },
    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload;
      console.log("set uid original");
    },
    updateInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
    updateToken(state, action: PayloadAction<AuthToken>) {
      const { token, refresh_token, expired_in } = action.payload;
      console.log("refresh token");
      state.token = token;
      const et = +new Date() + Number(expired_in) * 1000;
      state.expireTime = et;
      state.refreshToken = refresh_token;
      localStorage.setItem(KEY_EXPIRE, `${et}`);
      localStorage.setItem(KEY_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
    }
  }
});

export const { updateInitialized, setAuthData, resetAuthData, setUid, updateToken } =
  authDataSlice.actions;
export default authDataSlice.reducer;
