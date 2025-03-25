import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners } from "../../../features/auth/winnerSlice";
import { fetchUsers, selectUsers } from "../../../features/auth/userSlice";
import { AddEmployee } from "../../../features/auth/authActions";
import { css, keyframes } from "@emotion/react";
import { Add as AddIcon, Cancel as CancelIcon } from '@mui/icons-material';

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
  TextField,
} from "@mui/material";

// Chart.js imports
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(3600deg); }
`;

const popIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  80% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); }
`;

const flash = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const Dashboard = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailFilter, setEmailFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [employeeData, setEmployeeData] = useState({ name: "", email: "", password: "employee", confirmPassword: "employee" });
  const [grandGagnant, setGrandGagnant] = useState(null);


  // Local state to control which tab is active ("users", "winners", or "statiques")
  const [tab, setTab] = useState("users");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const filteredUsers = roleFilter
  ? users.filter((u) =>
      (u.role === 1 && roleFilter === "Admin") ||
      (u.role === 2 && roleFilter === "Employee") ||
      (u.role === 0 && roleFilter === "User") 
    )
  : users;


  const handleAddEmployee = () => {
    dispatch(AddEmployee({ ...employeeData }));
    setShowEmployeeForm(false);
    setEmployeeData({ name: "", email: "", password: "employee", confirmPassword: "employee" });
    dispatch(fetchUsers());
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

  const handleTirageAuSort = () => {
    if (winners.length === 0) {
      setGrandGagnant("Aucun gagnant disponible !");
      return;
    }
    
    setIsSpinning(true);
    
    // Animation de roulette
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * winners.length);
      setIsSpinning(false);
      setGrandGagnant(winners[randomIndex]);
      
    }, 5000); // Durée de l'animation de roulette
  };

const [isSpinning, setIsSpinning] = useState(false);

// Ticket Statistics
const totalTickets = 150;
const ticketsAttributed = 50; 
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
            Bienvenue sur le tableau de bord
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
            {/* <Tab label="Test Check" value="test-check" /> */}
            <Tab label="Grand Gagnant" value="grand-gagnant" />
          </Tabs>
          <Button color="inherit" onClick={handleLogout}>
            Se déconnecter
          </Button>
        </Toolbar>
      </AppBar>

      {/* Render the Users table if "users" tab is selected */}
      {tab === "users" && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Liste des utilisateurs
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setShowEmployeeForm(!showEmployeeForm)}
            sx={{ 
              mb: 2 // Ajoute une marge basse même quand le formulaire est fermé
            }}          
          >
            {showEmployeeForm ? (
              <>
                <CancelIcon sx={{ fontSize: '1.2rem', mr: 1 }} />
                Annuler
              </>
            ) : (
              <>
                <AddIcon sx={{ fontSize: '1.2rem', mr: 1 }} />
                Ajouter un employé
              </>
            )}
          </Button>
          {showEmployeeForm && (
            <Box sx={{ 
              display: "flex", 
              gap: 2, 
              mt: 2,
              flexWrap: 'nowrap', // Empêche le retour à la ligne
              alignItems: 'center', // Alignement vertical
              width: '60%' // Prend toute la largeur
            }}>
              <TextField 
                label="Nom" 
                sx={{ flex: 1, width: '30%' }} // Prend l'espace disponible
                value={employeeData.name} 
                onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })} 
              />
              <TextField 
                label="E-mail"
                sx={{ flex: 1 }} // Prend l'espace disponible 
                value={employeeData.email} 
                onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })} 
              />
              <Button 
                variant="contained" 
                color="success" 
                onClick={handleAddEmployee}
                sx={{ 
                  whiteSpace: 'nowrap', // Garde le texte sur une ligne
                  px: 4 // Padding horizontal
                }}
              >
                Ajouter
              </Button>
            </Box>
          )}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button 
              variant={roleFilter === "" ? "contained" : "outlined"} 
              onClick={() => setRoleFilter("")}
            >
              All
            </Button>
            <Button 
              variant={roleFilter === "User" ? "contained" : "outlined"} 
              onClick={() => setRoleFilter("User")}
            >
              Users
            </Button>
            <Button 
              variant={roleFilter === "Employee" ? "contained" : "outlined"} 
              onClick={() => setRoleFilter("Employee")}
            >
              Employees
            </Button>
            <Button 
              variant={roleFilter === "Admin" ? "contained" : "outlined"} 
              onClick={() => setRoleFilter("Admin")}
            >
              Admins
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Rôle</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              {filteredUsers.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    {u.role === 1 ? "Admin" : u.role === 2 ? "Employee" : "User"}
                  </TableCell>
                  <TableCell>
                    {u.role !== 1 && (
                      <Button variant="contained" color="error" onClick={() => handleDeleteUser(u._id)}>
                        Supprimer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </Box>
      )}


      {/* Render the Winners table if "winners" tab is selected */}
      {tab === "winners" && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Liste des gagnants
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
                  <TableCell>Nom</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Code du ticket</TableCell>
                  <TableCell>Gain</TableCell>
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
          Statistiques des gains
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Paper>
      </Box>
      )}


      {/* Render the Test Check section if "test-check" tab is selected */}
      {/* {tab === "test-check" && (
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
      )} */}

      {tab === "grand-gagnant" && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Tirage au sort - Grand Gagnant
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleTirageAuSort}
            disabled={isSpinning}
            sx={{
              mb: 4,
              animation: isSpinning ? `${flash} 1s infinite` : 'none'
            }}
          >
            {isSpinning ? 'Tirage en cours...' : 'Tirage au sort'}
          </Button>

          {/* Roulette animation */}
          {isSpinning && (
            <Box sx={{
              width: 200,
              height: 200,
              margin: '0 auto 2rem',
              borderRadius: '50%',
              backgroundColor: '#ff5722',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: `${spin} 3s cubic-bezier(0.4, 0, 0.2, 1)`,
              boxShadow: '0 0 20px rgba(255,87,34,0.5)'
            }}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                🎰
              </Typography>
            </Box>
          )}

          {/* Résultat avec animation */}
          {grandGagnant && !isSpinning && (
            <Box sx={{
              mt: 3,
              p: 4,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              position: 'relative',
              animation: `${popIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
            }}>
              
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                🎉 Félicitations au grand gagnant ! 🎉
              </Typography>
              
              {typeof grandGagnant === "string" ? (
                <Typography variant="body1">{grandGagnant}</Typography>
              ) : (
                <Box sx={{
                  padding: 3,
                  backgroundColor: 'gold',
                  borderRadius: 2,
                  boxShadow: '0 0 20px gold'
                }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: '#d32f2f' }}>
                    {grandGagnant.name}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {grandGagnant.email}
                  </Typography>
                  <img 
                    src="/bigwinner.webp" 
                    alt="" 
                    style={{ width: "60%", height: "60%", objectFit: "cover" }} 
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;