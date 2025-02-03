import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners } from "../../../features/auth/winnerSlice";
import { fetchUsers, selectUsers } from "../../../features/auth/userSlice";

// Import Material-UI components
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, AppBar, Toolbar } from "@mui/material";

const Dashboard = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (!user || (user.data && user.data.user.role !== 1)) {
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
    fetch(`/users/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("User deleted:", data);
        dispatch(fetchUsers());
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header remains the same */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user.name} to the Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Users Section (unchanged) */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Users List
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
              {users.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role === 1 ? "Admin" : "User"}</TableCell>
                  <TableCell>
                    {u.role !== 1 && (
                      <Button variant="contained" color="error" onClick={() => handleDeleteUser(u._id)}>
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Updated Winners (Tickets) Section */}
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
              {winners.map((winner) => (
                <TableRow key={winner._id}>
                  <TableCell>{winner.name}</TableCell>
                  <TableCell>{winner.email}</TableCell>
                  <TableCell>{winner.ticketCode}</TableCell>
                  <TableCell>{winner.prize}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Dashboard;
