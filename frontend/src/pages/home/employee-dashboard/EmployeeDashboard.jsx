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
  Tab
} from "@mui/material";

// Helper component for each winner row
const WinnerRow = ({ winner }) => {
  const [received, setReceived] = useState(false);

  const handleStatusClick = () => {
    setReceived(true);
    // Optionally, you can dispatch an action here to update the status in the backend.
  };

  return (
    <TableRow key={winner._id}>
      <TableCell>{winner.name}</TableCell>
      <TableCell>{winner.email}</TableCell>
      <TableCell>{winner.ticketCode}</TableCell>
      <TableCell>{winner.prize}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          style={{
            backgroundColor: received ? "green" : "orange",
            color: "white"
          }}
          onClick={handleStatusClick}
        >
          {received ? "gain reçu" : "en cours de traitement"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

const EmployeeDashboard = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state to control which tab is active ("users" or "winners")
  const [tab, setTab] = useState("users");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // Allow access only if the user is logged in and has role 2 (employee)
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
    fetch(`/users/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("User deleted:", data);
        dispatch(fetchUsers());
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Filter users to show only those with role 0 (regular users)
  const filteredUsers = users.filter((u) => u.role === 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* AppBar with Tabs */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user.name} to the Employee Dashboard
          </Typography>
          {/* Tabs for switching between "Users" and "Winners" views */}
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ marginRight: 2 }}
          >
            <Tab label="Users" value="users" />
            <Tab label="Winners" value="winners" />
          </Tabs>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Users Table Section */}
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role === 0 ? "User" : u.role}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteUser(u._id)}
                        >
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
      )}

      {/* Winners Table Section */}
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
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {winners.length > 0 ? (
                  winners.map((winner) => (
                    <WinnerRow key={winner._id} winner={winner} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No wins yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default EmployeeDashboard;
