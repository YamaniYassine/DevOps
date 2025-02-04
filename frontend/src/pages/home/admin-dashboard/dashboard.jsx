import React, { useEffect, useState } from "react";
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
  TableRow,
  Tabs,
  Tab,
  LinearProgress
} from "@mui/material";

const Dashboard = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state to control which tab is active ("users", "winners", or "statiques")
  const [tab, setTab] = useState("users");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // Only allow access if the user is logged in and has role 1 (admin)
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

  // Calculate the percentage of tickets claimed.
  // Assume each winner represents one ticket won.
  const totalTickets = 150;
  const winnersCount = winners.length;
  const percentage = Math.round((winnersCount / totalTickets) * 100);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header with AppBar and Tabs */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user.name} to the Dashboard
          </Typography>
          {/* Tabs for switching between views */}
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ marginRight: 2 }}
          >
            <Tab label="Users" value="users" />
            <Tab label="Winners" value="winners" />
            <Tab label="Statiques" value="statiques" />
          </Tabs>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Render the Users table if "users" tab is selected */}
      {tab === "users" && (
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
                    <TableCell>
                      {u.role === 1
                        ? "Admin"
                        : u.role === 2
                        ? "Employee"
                        : "User"}
                    </TableCell>
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
      )}

      {/* Render the Winners table if "winners" tab is selected */}
      {tab === "winners" && (
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
      )}

      {/* Render the Statistiques (Statiques) section if "statiques" tab is selected */}
      {tab === "statiques" && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Statistics
          </Typography>
          <Typography variant="body1" gutterBottom>
            {winnersCount} out of {totalTickets} tickets have been won.
          </Typography>
          <Typography variant="body1" gutterBottom>
            That's {percentage}% of total tickets.
          </Typography>
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress variant="determinate" value={percentage} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;