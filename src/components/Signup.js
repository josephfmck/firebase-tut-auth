import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
//Firebase Auth Context
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  //*firebase Auth Context: 
    //signup func, currentUser state
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //!EVENTS
  async function handleSubmit(e) {
    e.preventDefault();

    //err check passwords match
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      //sets state error msg and exits out of func with return
      return setError("Passwords do not match");
    }

    //*check if fails. exec signup async func to firebase
    try {
      //?no err, reset state
      setError("");

      //*firebase signup func, send form data to firebase to authenticate
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        confirmPasswordRef.current.value
      );
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
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
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                required
              ></Form.Control>
            </Form.Group>
            {/* disable t/f, if currently loading, dont want to resubmit form */}
            <Button type="submit" className="w-100" disable={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </>
  );
}
