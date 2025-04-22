'use client';

import React, { useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useTheme as useNextTheme } from 'next-themes';
import {format} from 'timeago.js'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { IconButton, Tooltip } from '@mui/material';

import { MdEmail } from 'react-icons/md';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 120 },
    {
      field: 'courses',
      headerName: 'Courses',
      width: 150,
      renderCell: (params) => (
        <span>{params.row.courses.length}</span>
      )
    },
    {
      field: 'mail',
      headerName: 'Mail',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Send Mail">
          <IconButton
            component="a"
            href={`mailto:${params.row.email}`}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <MdEmail />
          </IconButton>
        </Tooltip>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      renderCell: () => (
        <Tooltip title="Edit User">
          <IconButton color="secondary">
            <AiFillEdit />
          </IconButton>
        </Tooltip>
      )
    }
  ];
  
  
  

const AllCourses = () => {
  const { isLoading, data, error } = useGetAllUsersQuery({});

  const rows = data?.users?.map((user: any) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    courses: user.courses || [],
  })) || [];
  

  const { resolvedTheme } = useNextTheme();

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
                backgroundColor: resolvedTheme === 'dark' ? '#2c2c2c' : '#f0f0f0',
              },
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AllCourses;
