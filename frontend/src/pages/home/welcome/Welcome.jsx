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
            Welcome {username} to the Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Log Out</Button>
        </Toolbar>
      </AppBar>

      {/* Wins Table Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Wins
        </Typography>
        {userWins.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ticket Code</TableCell>
                  <TableCell>Prize</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userWins.map(win => (
                  <TableRow key={win._id}>
                    <TableCell>{win.ticketCode}</TableCell>
                    <TableCell>{win.prize}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">You have not won any prizes yet.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default WelcomePage;