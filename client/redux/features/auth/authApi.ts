import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";
type RegistrationResponse = {
    message: string;
    activationToken: string;
};
type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                method: "POST",
                url: "registration",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            },
        }),
        activation: builder.mutation({


            query: ({ activation_token, activation_code }) => ({
                method: "POST",
                url: "activate-user",
                body: { activation_token, activation_code },

            }),
        }),
    }),
})
export const { useRegisterMutation, useActivationMutation } = authApi;