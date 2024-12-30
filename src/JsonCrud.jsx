
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JsonCrud = () => {
  const [rows, setRows] = useState([]); // State to hold user data
  const navigate = useNavigate();

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setRows(response.data); // Set fetched data to rows
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users when the component is mounted
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    // Find the selected user
    const userToEdit = rows.find((row) => row.id === id);
    if (userToEdit) {
      // Navigate to the Adduser component and pass user data via state
      navigate("/add-user", { state: { user: userToEdit } });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers(); // Refresh the table after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleView = (row) => {
    alert(`Viewing user: ${JSON.stringify(row, null, 2)}`);
  };

  // Define the columns
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "emailid", headerName: "Email ID", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            size="small"
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: 10 }}
            onClick={() => handleView(params.row)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{ marginBottom: 10 }}
        onClick={() => navigate("/add-user")}
      >
        Add User
      </Button>
      <Paper sx={{ height: 400, width: "830px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default JsonCrud;
