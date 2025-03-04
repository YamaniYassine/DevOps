import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners } from "../../../features/auth/winnerSlice";

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
  TableRow
} from "@mui/material";

const WelcomePage = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* AppBar with Welcome message and Logout button */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bienvenue {username} dans l'espace utilisateur
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Se déconnecter</Button>
        </Toolbar>
      </AppBar>

      {/* Wins Table Section */}
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
    </Container>
  );
};

export default WelcomePage;