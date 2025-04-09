import { apiSlice } from "../api/apiSlice";
import { userRegistration ,userLoggedIn, userLoggedOut} from "./authSlice";
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
      query: ({ activation_token, activation_code }) => ({
        method: "POST",
        url: "activate-user",
        body: {
          activationToken: activation_token,
          activationCode: activation_code,
        }, // Ensure keys match the backend
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        method: "POST",
        url: "login",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name,avatar }) => ({
        method: "POST",
        url: "social-auth",
        body: { email, name, avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        method: "GET",
        url: "logout",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(
            userLoggedOut()
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation ,useLoginMutation , useSocialAuthMutation, useLogoutQuery} = authApi;
