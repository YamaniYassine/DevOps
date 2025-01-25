import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { fetchWinners, selectWinners } from "../../../features/auth/winnerSlice"; // Add this import

const Dashboard = () => {
  const { user, error } = useSelector((state) => state.auth);
  const winners = useSelector(selectWinners);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (!user || (user.data && user.data.user.role !== 1)) {
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

  const handleDeleteUser  = (id) => {
    // Call API to delete user
    // For example:
    // axios.delete(`/api/users/${id}`)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <section className="dashboard-container">
      <h1 className="welcome-header">
        Welcome <span>{user.name}</span> to the dashboard
      </h1>
      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="users-table">
  <h2>Users List</h2>
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {user.data && user.data.users && user.data.users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => handleDeleteUser   (user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

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
