import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners } from "../../../features/auth/winnerSlice";
import { fetchUsers, selectUsers } from "../../../features/auth/userSlice";

// Material-UI components
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

const EmployeeDashboard = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // Only allow access if logged in and user role is 2 (employee)
    if (!user || (user.data && user.data.user.role !== 2)) {
      navigate("/");
    }
    dispatch(fetchWinners());
    dispatch(fetchUsers());
    return () => {
      dispatch(reset());
    };
  }, [error, user, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleDeleteUser = (id) => {
    // Call the DELETE API to remove a user
    fetch(`/users/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("User deleted:", data);
        dispatch(fetchUsers()); // Refresh user list after deletion
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Filter the users to show only those with role 0
  const filteredUsers = users.filter((u) => u.role === 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* AppBar with welcome message and logout button */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user.name} to the Employee Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Users Table Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Users List (Role: User)
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role === 0 ? "User" : u.role}</TableCell>
                    <TableCell>
                      {/* Allow deletion only for users with role 0 */}
                      <Button variant="contained" color="error" onClick={() => handleDeleteUser(u._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Winners Table Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Winners List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ticket Code</TableCell>
                <TableCell>Prize</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {winners.length > 0 ? (
                winners.map((winner) => (
                  <TableRow key={winner._id}>
                    <TableCell>{winner.name}</TableCell>
                    <TableCell>{winner.email}</TableCell>
                    <TableCell>{winner.ticketCode}</TableCell>
                    <TableCell>{winner.prize}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No wins yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default EmployeeDashboard;
