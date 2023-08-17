import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners } from "../../../features/auth/winnerSlice"; // Add this import

const Dashboard = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners); // Add this line

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userrole = user ? (user.name ? user.name : user.data.user.role) : null;

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  
    if (!user || (user.data && user.data.user.role !== 1)) {
      navigate("/");
    }
  
    dispatch(fetchWinners()); // Fetch winners' data
    return () => {
      dispatch(reset());
    };
  }, [error, user, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const username = user ? (user.name ? user.name : user.data.user.name) : null;

  return (
    <section className="dashboard-container">
      <h1 className="welcome-header">
        Welcome <span>{username}!</span> to the dashboard
      </h1>
      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {/* Winners' Table */}
      <div className="winner-table">
        <h2>Winners List</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Ticket Code</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner) => (
                <tr key={winner._id}>
                  <td>{winner.name}</td>
                  <td>{winner.email}</td>
                  <td>{winner.ticketCode}</td>
                  <td>{winner.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
