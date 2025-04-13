import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: "",
    token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
        },
        /**
         * Logs the user out of the application by clearing the user and token state.
         * @param {object} state The current state of the application.
         */
        userLoggedOut: (state) => {
            // Clear the user state
            state.user = "";
            // Clear the token state
            state.token = "";
        }
    }
})

export const { userRegistration , userLoggedIn , userLoggedOut } = authSlice.actions;

export default authSlice.reducer;