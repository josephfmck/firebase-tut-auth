import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";


function Dashboard() {
  //!STATE
  const [error, setError] = useState("");
  //!CONTEXT 
    //*firebase Auth Context: 
  const { currentUser, logout } = useAuth();
  //!HOOKS
  const navigate = useNavigate();

  //!EVENTS
  async function handleLogout() {
    setError("Log out failed");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  //!RENDER
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {/* logout fail error */}
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className='btn btn-primary w-100 mt-3'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}

export default Dashboard;