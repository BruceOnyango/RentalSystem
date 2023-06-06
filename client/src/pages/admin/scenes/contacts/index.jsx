import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
const [user, setUsers]=useState([])
  useEffect(() => {
    async function fetchUsers(){
      const  response =  await axios.get(
          "http://localhost:3001/api/user/all"
      );
      console.log(response.data)
      setUsers(response.data)
  }
  fetchUsers()
}, []);

  const columns = [
    { field: "user_id", headerName: "ID", flex: 0.5 },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="USERS"
        subtitle="List of Users"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={user}
          columns={columns}
          getRowId={(user) =>  user.user_id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
