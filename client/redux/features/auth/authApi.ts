import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";
type RegistrationResponse = {
    message: string; // A success message from the backend
    activationToken: string; // The activation token returned by the backend
};
type RegistrationData = {}; // This can be expanded to include fields like name, email, and password

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                method: "POST", // HTTP method for the request
                url: "registration", // Endpoint URL (relative to the base URL)
                body: data, // Request body containing registration data
                credentials: "include" as const, // Include cookies in the request for authentication
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken, // Pass the activation token to the store
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            },
        }),
        activation: builder.mutation({
            query: ({activation_token, activation_code }) => ({
                method: "POST",
                url: "activate-user",
                body: { activationToken: activation_token, activationCode: activation_code }, // Ensure keys match the backend
            }),
        }),
    }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;