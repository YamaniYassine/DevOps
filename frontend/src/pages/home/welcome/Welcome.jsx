import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners } from "../../../features/auth/winnerSlice";
import { updateUserProfile } from "../../../features/auth/authActions";

// Material-UI imports
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
  Tabs,
  Tab,
  TextField,
  TableRow
} from "@mui/material";

const WelcomePage = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState("users");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // New state for account update
  const [accountData, setAccountData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);
  const [accountMessage, setAccountMessage] = useState("");

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (!user) {
      navigate("/");
    }
    dispatch(fetchWinners());
    return () => {
      dispatch(reset());
    };
  }, [error, user, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Determine username and email from state
  const username = user ? (user.name || (user.data && user.data.user.name)) : null;
  const userEmail = user ? (user.email || (user.data && user.data.user.email)) : null;

  // Filter winners based on the logged-in user's email
  const userWins = winners.filter(win => win.email === userEmail);

  // Account update handlers
  const handleAccountChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingAccount(true);
    try {
      const result = await dispatch(updateUserProfile(accountData)).unwrap();
      setAccountMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);
      setAccountMessage("Profile update failed.");
    } finally {
      setIsUpdatingAccount(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* AppBar with Welcome message and Logout button */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bienvenue {username} dans l'espace utilisateur
          </Typography>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ marginRight: 2 }}
          >
            <Tab label="Mes Gains" value="MesGain" />
            <Tab label="Mon compte" value="mon-compte" />
          </Tabs>
          <Button color="inherit" onClick={handleLogout}>Se déconnecter</Button>
        </Toolbar>
      </AppBar>

      {/* Wins Table Section */}
      {tab === "MesGain" && (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Vos gains
        </Typography>
        {userWins.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code du ticket</TableCell>
                  <TableCell>gain</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userWins.map(win => (
                  <TableRow key={win._id}>
                    <TableCell>{win.ticketCode}</TableCell>
                    <TableCell>{win.prize}</TableCell>
                    <TableCell>
                      <span style={{ 
                        color: win.status === "gain reçu" ? "green" : "orange",
                        fontWeight: "bold"
                      }}>
                        {win.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">Vous n'avez pas encore gagné.</Typography>
        )}
      </Box>
      )}

      {tab === "mon-compte" && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Mon Compte
          </Typography>
          <form onSubmit={handleAccountSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
            <TextField 
              label="Nom" 
              name="name" 
              value={accountData.name} 
              onChange={handleAccountChange} 
              required 
            />
            <TextField 
              label="E-mail" 
              name="email" 
              value={accountData.email} 
              onChange={handleAccountChange} 
              required 
            />
            <TextField 
              label="Mot de passe actuel" 
              name="currentPassword" 
              type="password"
              value={accountData.currentPassword} 
              onChange={handleAccountChange} 
              required 
            />
            <TextField 
              label="Nouveau mot de passe" 
              name="newPassword" 
              type="password"
              value={accountData.newPassword} 
              onChange={handleAccountChange} 
            />
            <TextField 
              label="Confirmer nouveau mot de passe" 
              name="confirmNewPassword" 
              type="password"
              value={accountData.confirmNewPassword} 
              onChange={handleAccountChange} 
            />
            <Button type="submit" variant="contained" color="primary" disabled={isUpdatingAccount}>
              {isUpdatingAccount ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Mettre à jour"}
            </Button>
          </form>
          {accountMessage && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {accountMessage}
            </Typography>
          )}
        </Box>
      )}

    </Container>
  );
};

export default WelcomePage;