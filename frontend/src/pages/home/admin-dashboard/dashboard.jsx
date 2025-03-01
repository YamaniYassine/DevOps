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
  const [emailFilter, setEmailFilter] = useState("");


  // Local state to control which tab is active ("users", "winners", or "statiques")
  const [tab, setTab] = useState("users");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const filteredWinners = winners.filter((winner) =>
  winner.email.toLowerCase().includes(emailFilter.toLowerCase())
  );


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

const [newEmployee, setNewEmployee] = useState({
  name: "",
  email: "",
  password: ""
});
const [isAdding, setIsAdding] = useState(false); // Toggle form visibility
const [loading, setLoading] = useState(false);

const handleInputChange = (e) => {
  setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
};

const handleAddEmployee = async () => {
  setLoading(true);
  try {
    const response = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newEmployee, role: 2 }) // Set role to 2 (Employee)
    });

    if (!response.ok) {
      throw new Error("Failed to add employee");
    }

    setNewEmployee({ name: "", email: "", password: "" }); // Reset form
    setIsAdding(false); // Hide form
    dispatch(fetchUsers()); // Refresh users list
  } catch (error) {
    console.error("Error adding employee:", error);
  } finally {
    setLoading(false);
  }
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
          {/* Add Employee Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? "Cancel" : "Add Employee"}
          </Button>

          {/* Employee Form */}
          {isAdding && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">Add New Employee</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newEmployee.password}
                  onChange={handleInputChange}
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAddEmployee}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Create Employee"}
                </Button>
              </Box>
            </Paper>
          )}
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

          {/* Email Filter Input */}
          <Box sx={{ mb: 2 }}>
            <input
              type="text"
              placeholder="Filter by email..."
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                maxWidth: "300px",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            />
            {emailFilter && (
              <button
                onClick={() => setEmailFilter("")}
                style={{
                  marginLeft: "10px",
                  padding: "6px 12px",
                  border: "none",
                  backgroundColor: "#d9534f",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "5px"
                }}
              >
                Clear
              </button>
            )}
          </Box>

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
                {(emailFilter ? filteredWinners : winners).map((winner) => (
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