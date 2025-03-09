import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners, updateWinnerStatus } from "../../../features/auth/winnerSlice";
import { fetchUsers, selectUsers } from "../../../features/auth/userSlice";
import { css, keyframes } from "@emotion/react";
// import CircularProgress
import CircularProgress from '@mui/material/CircularProgress';

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
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  

//   const checkmark = keyframes`
//   0% { transform: scale(0); opacity: 0; }
//   80% { transform: scale(1.2); }
//   100% { transform: scale(1); opacity: 1; }
// `;

const handleStatusClick = async () => {
  try {
    setIsUpdating(true);
    await dispatch(updateWinnerStatus({ 
      id: winner._id, 
      status: "gain reçu" 
    })).unwrap();
    console.error("mise à jour du status done");
  } catch (err) {
    console.error("Erreur de mise à jour :", err);
  } finally {
    setIsUpdating(false);
  }
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
        sx={{
          position: 'relative',
          backgroundColor: winner.status === "gain reçu" ? '#4CAF50' : '#FF9800',
          color: 'white',
          transition: 'all 0.3s ease',
          '&:hover:not(:disabled)': {
            backgroundColor: winner.status === "gain reçu" ? '#45a049' : '#e68a00',
          },
          '&:disabled': {
            backgroundColor: '#40b745',
            opacity: 0.9
          }
        }}
        onClick={handleStatusClick}
        disabled={winner.status === "gain reçu" || isUpdating}
      >
        {isUpdating ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : winner.status === "gain reçu" ? (
          <>
            <span style={{ marginRight: '8px' }}>Gain reçu</span>
            <span style={{ fontSize: '1.2rem' }}>✓</span>
          </>
        ) : (
          "En cours de traitement"
        )}
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
  const [emailFilter, setEmailFilter] = useState("");

  // Local state to control which tab is active ("users" or "winners")
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
            Bienvenue sur le tableau de bord des employés
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
            Se déconnecter
          </Button>
        </Toolbar>
      </AppBar>

      {/* Users Table Section */}
      {tab === "users" && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Liste des utilisateurs
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Rôle</TableCell>
                  {/* <TableCell>Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role === 0 ? "User" : u.role}</TableCell>
                      {/* <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteUser(u._id)}
                        >
                          Supprimer
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Aucun utilisateur trouvé.
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
            Liste des gagnants
          </Typography>
          
          {/* Email Filter Input - Ajout du filtre */}
          <Box sx={{ mb: 2 }}>
            <input
              type="text"
              placeholder="Filtrer par email..."
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
                  <TableCell>Nom</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Code du ticket</TableCell>
                  <TableCell>Gain</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWinners.length > 0 ? (
                  filteredWinners.map((winner) => (
                    <WinnerRow key={winner._id} winner={winner} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Aucune gain pour l'instant.
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
