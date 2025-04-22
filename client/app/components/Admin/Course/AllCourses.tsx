'use client';

import React, { useMemo, useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  Box,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useTheme as useNextTheme } from 'next-themes';
import {
  useGetAllCoursesQuery,
  useDeleteCoursesMutation,
} from '@/redux/features/courses/coursesApi';
import { format } from 'timeago.js';

const AllCourses = () => {
  const { resolvedTheme } = useNextTheme();
  const { isLoading, data , refetch } = useGetAllCoursesQuery({}, {refetchOnMountOrArgChange:true});
  const [deleteCourse, { isLoading: deleteLoading,isSuccess , error  }] = useDeleteCoursesMutation();

  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedCourseId(id);
    setOpen(true);
  };


  const handleConfirmDelete = async () => {
    if (selectedCourseId) {
      try {
        await deleteCourse(selectedCourseId).unwrap();
        setOpen(false);
        setSelectedCourseId(null);
        refetch(); 
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Course deleted successfully!');
    }
    if (error) {
      toast.error('Failed to delete the course!');
    }
  }, [isSuccess, error]);

  const handleClose = () => {
    setOpen(false);
    setSelectedCourseId(null);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === 'dark' ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          background: {
            default: resolvedTheme === 'dark' ? '#121212' : '#f9f9f9',
            paper: resolvedTheme === 'dark' ? '#1e1e1e' : '#fff',
          },
        },
      }),
    [resolvedTheme]
  );

  const rows =
    data?.courses?.map((course: any) => ({
      id: course._id,
      title: course.name,
      rating: course.rating || 0,
      purchased: course.purchased || 0,
      createdAt: format(course.createdAt),
    })) || [];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'rating', headerName: 'Rating', width: 120 },
    { field: 'purchased', headerName: 'Purchased', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" gap={1}>
          <IconButton href={`/admin/edit-course/${params.row.id}`} color="primary">
            <AiFillEdit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <AiFillDelete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        mt={10}
        px={2}
        width="100%"
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            height: 500,
            width: '100%',
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <DataGrid
            loading={isLoading}
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '.MuiDataGrid-columnHeaders': {
                backgroundColor:
                  resolvedTheme === 'dark' ? '#2c2c2c' : '#f0f0f0',
              },
            }}
          />
        </Box>
      </Box>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this course?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AllCourses;
