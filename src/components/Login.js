import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
//Firebase Auth Context
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    //*firebase Auth Context: 
      //signup func, currentUser state
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [signUpLoading, setSignupLoading] = useState(false);
  
    //!EVENTS
    async function handleSubmit(e) {
      e.preventDefault();
  
      setSignupLoading(true);
  
  
      //*check if fails. exec signup async func to firebase
      try {
        //?no err, reset state
        setError("");
  
        //*firebase signup func, send form data to firebase to authenticate
        await signup(
          emailRef.current.value,
          passwordRef.current.value,
        );
        setSignupLoading(false);
        return;
      } catch(error) {
        setError("Failed to create an account");
        setError(error.message)
        setSignupLoading(false);
        return;
      }
    }
  
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {/* use this to visually see email after signup worked */}
            {/* {currentUser ? currentUser.email : ""} */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>
              {/* disable t/f, if currently loading, dont want to resubmit form */}
              <Button type="submit" className="w-100" disabled={signUpLoading}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </>
    );
}

export default Login

