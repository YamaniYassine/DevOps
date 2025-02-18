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

// Chart.js imports
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

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

// Ticket Statistics
const totalTickets = 150;
const ticketsAttributed = 25; // Given that 25 tickets were assigned
const ticketsWon = winners.length; // Total tickets won

const percentageTicketsAttributed = Math.round((ticketsAttributed / totalTickets) * 100);
const percentageTicketsWon = Math.round((ticketsWon / totalTickets) * 100);

// Chart Data
const chartData = {
  labels: [
    `Total Tickets (100%)`, 
    `Tickets Attribués (${percentageTicketsAttributed}%)`, 
    `Tickets Gagnés (${percentageTicketsWon}%)`
  ],
  datasets: [
    {
      label: "Total Tickets",
      data: [100, 0, 0], // Only the first bar has a value
      backgroundColor: "#007bff", // Blue
    },
    {
      label: "Tickets Attribués",
      data: [0, percentageTicketsAttributed, 0], // Only the second bar has a value
      backgroundColor: "#ffcc00", // Yellow
    },
    {
      label: "Tickets Gagnés",
      data: [0, 0, percentageTicketsWon], // Only the third bar has a value
      backgroundColor: "#28a745", // Green
    },
  ],
};


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
            <Tab label="Test Check" value="test-check" />
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
          Ticket Statistics
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Paper>
      </Box>
      )}


      {/* Render the Test Check section if "test-check" tab is selected */}
      {tab === "test-check" && (
        <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Test Before</TableCell>
                <TableCell>Test After</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Login Test</TableCell>
                <TableCell>
                  <img
                    src="/login-page-before.png"
                    alt="Login Page Before"
                    style={{ maxWidth: "300px" }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src="/login-page-after.png"
                    alt="Login Page After"
                    style={{ maxWidth: "300px" }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      )}
    </Container>
  );
};

export default Dashboard;