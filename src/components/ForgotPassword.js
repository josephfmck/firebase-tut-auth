import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
//Firebase Auth Context
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
    const emailRef = useRef();
    //*firebase Auth Context: 
      //signup func, currentUser state
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [fpLoading, setFPLoading] = useState(false);
    const navigate = useNavigate();


    //!EVENTS
    async function handleSubmit(e) {
      e.preventDefault();
  
      setFPLoading(true);
  
      //*check if fails. exec signup async func to firebase
      try {
        //?no err, reset state
        setMessage("");
        setError("");
  
        //*firebase signup func, send form data to firebase to authenticate
        await resetPassword(
          emailRef.current.value,
        );
        //success message
        setMessage("Check your inbox for further instructions"); 
        setFPLoading(false);
        return;
      } catch(error) {
        setError(`Failed to reset password - ${error.message}`);
        setFPLoading(false);
        return;
      }
    }
  
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required></Form.Control>
              </Form.Group>
              {/* disable t/f, if currently loading, dont want to resubmit form */}
              <Button type="submit" className="w-100" disabled={fpLoading}>
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </>
    );
}

export default ForgotPassword;


