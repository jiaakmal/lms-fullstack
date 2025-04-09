// Import the `createSlice` function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the authentication slice
const initialState = {
    user: "",     // Stores the user information (e.g., username or user object)
    token: "",    // Stores the authentication token (e.g., JWT or session token)
};

// Create the authentication slice using `createSlice`
export const authSlice = createSlice({
    name: "auth", // Name of the slice, used as a prefix for generated action types
    initialState, // The initial state of the slice
    reducers: {   // Reducers define how the state is updated
        // Reducer for handling user registration
        userRegistration: (state, action) => {
            state.token = action.payload.token; // Update the token in the state with the payload
        },
        // Reducer for handling user login
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;         // Update the user information in the state
            state.token = action.payload.accessToken; // Update the token in the state with the access token
        },
        // Reducer for handling user logout
        userLoggedOut: (state) => {
            state.user = "";  // Clear the user information from the state
            state.token = ""; // Clear the token from the state
        }
    }
});

// Export the `userRegistration` action for use in other parts of the application
export const { userRegistration , userLoggedIn, userLoggedOut        } = authSlice.actions;

// The `authSlice` object contains the reducer and actions for managing authentication 
export default authSlice.reducer;