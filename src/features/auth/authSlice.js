import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    expiresIn: 0,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.expiresIn = action.payload.expiresIn;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.expiresIn = 0;
        }
       
    },
});

export const {  loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;