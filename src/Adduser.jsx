
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Adduser = () => {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to get state passed via navigate
  const userToEdit = location.state?.user; // Get user data from state (if any)

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
  });

  // Pre-fill the form if editing
  useEffect(() => {
    if (userToEdit) {
      setData(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const saveData = async (e) => {
    e.preventDefault();
    try {
      if (userToEdit) {
        // Update user if editing
        await axios.put(`http://localhost:3000/users/${userToEdit.id}`, data);
      } else {
        // Create new user
        await axios.post("http://localhost:3000/users", data);
      }
      navigate("/"); // Redirect to Jsoncrud after adding/updating user
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          id="firstname"
          label="First Name"
          name="firstname"
          variant="outlined"
          onChange={handleChange}
          value={data.firstname}
        />
        <TextField
          id="lastname"
          label="Last Name"
          name="lastname"
          variant="outlined"
          onChange={handleChange}
          value={data.lastname}
        />
        <TextField
          id="emailid"
          label="Email ID"
          name="emailid"
          variant="outlined"
          onChange={handleChange}
          value={data.emailid}
        />
        <button onClick={saveData}>
          {userToEdit ? "Update User" : "Add User"}
        </button>
      </Box>
    </div>
  );
};

export default Adduser;
