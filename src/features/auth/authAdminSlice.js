import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admin: null,
    token: null,
    isAuthenticated: false,
    expiresIn: 0,
};

const authAdminSlice = createSlice({
    name: 'authAdmin',
    initialState,
    reducers: {
       
        loginSuccessAdmin: (state, action) => {
            state.isAuthenticated = true;
            state.admin = action.payload.user;
            state.token = action.payload.token;
            state.expiresIn = action.payload.expiresIn;
        },
        logoutAdmin: (state) => {
            state.isAuthenticated = false;
            state.admin = null;
            state.token = null;
            state.expiresIn = 0;
        }
       
    },
});

export const {  loginSuccessAdmin, logoutAdmin } = authAdminSlice.actions;
export default authAdminSlice.reducer;