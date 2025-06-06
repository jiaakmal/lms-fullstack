import { get } from "http";
import { apiSlice } from "../api/apiSlice";

export const courseApi  = apiSlice.injectEndpoints({
    endpoints : (builder) =>  ({
        createCourse: builder.mutation({
            query : (data) => ({
                url:"create-course",
                method: "POST",
                body: data,
                credentials: "include" as const ,

            })
        }),
        getAllCourses: builder.query({
            query : () => ({
                url:"get-adminAll-courses",
                method: "GET",
                credentials: "include" as const ,

            })
        }),
        deleteCourses: builder.mutation({
            query : (id) => ({
                url:`delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const ,

            })
        }),
        editCourse: builder.mutation({
            query : ({id,data}) => ({
                url:`update-course/${id}`,
                method: "PUT",
                body:data,
                credentials: "include" as const ,

            })
        }),
        getAllUserCourses: builder.query({
            query : () => ({
                url:"get-courses",
                method: "GET",
                credentials: "include" as const ,

            })
        }),
        getCourseDetails: builder.query({
            query : (id) => ({
                url:`getSingle-course/${id}`,
                method: "GET",
                credentials: "include" as const ,

            })
        }),

    })
})

export const  {useCreateCourseMutation , useGetAllCoursesQuery, useDeleteCoursesMutation,useEditCourseMutation,useGetAllUserCoursesQuery,useGetCourseDetailsQuery} = courseApi;