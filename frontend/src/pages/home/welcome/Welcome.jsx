import React, { useEffect } from "react";
import "./welcome.css";
import { useNavigate } from "react-router-dom";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners } from "../../../features/auth/winnerSlice";

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

    // Fetch winners from backend
    dispatch(fetchWinners());

    return () => {
      dispatch(reset());
    };
  }, [error, user, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Determine username and email
  const username = user ? (user.name ? user.name : user.data.user.name) : null;
  const userEmail = user ? (user.email ? user.email : user.data.user.email) : null;

  // Filter winners based on user's email
  const userWins = winners.filter(win => win.email === userEmail);

  return (
    <section className="welcome-container">
      <h1 className="welcome-header">
        Welcome! <span>{username}!</span>
      </h1>
      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      
      {/* Wins section */}
      <div className="wins-container">
        <h2>Your Wins</h2>
        {userWins.length > 0 ? (
          <table className="wins-table">
            <thead>
              <tr>
                <th>Ticket Code</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {userWins.map(win => (
                <tr key={win._id}>
                  <td>{win.ticketCode}</td>
                  <td>{win.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have not won any prizes yet.</p>
        )}
      </div>
    </section>
  );
};

export default WelcomePage;