import {apiSlice} from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                method: "PUT",
                url: "update-user-avatar",
                body: {avatar},
                credentials: "include" as const,
            }),
        }),
        editProfile: builder.mutation({
            query: ({name}) => ({
                method: "PUT",
                url: "update-user-info",
                body: {name},
                credentials: "include" as const,
            }),
        }),
        updatePassword: builder.mutation({
            query: ({oldPassword,newPassword}) => ({
                method: "PUT",
                url: "update-user-password",
                body: {oldPassword,newPassword},
                credentials: "include" as const,
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                method: "GET",
                url: "get-all-users",
                credentials: "include" as const,
            }),
        })
    }),
});     

export const { useUpdateAvatarMutation , useEditProfileMutation , useUpdatePasswordMutation,useGetAllUsersQuery} = authApi