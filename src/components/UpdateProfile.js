import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
//Firebase Auth Context
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  //*firebase Auth Context:
  //currentUser: logged in user info
  const { currentUser, updateEmailInFirebase, updatePasswordInFirebase } = useAuth();
  const [error, setError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();

  //!EVENTS
  function handleSubmit(e) {
    e.preventDefault();
    setUpdateLoading(true);
    //err check passwords match
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      //sets state error for <Alert/>
      setError("Passwords do not match");
      setUpdateLoading(false);
      //exits out of func with return
      return
    }

    const promises = [];
    setError("");
    setUpdateLoading(true);
    //*if form email different than logged in user's email
    if(emailRef.current.value !== currentUser.email) {
        //*email being updated, add to promises arr to be exec later 
        promises.push(updateEmailInFirebase(emailRef.current.value));
    }
    //*check if password being updated
    if(passwordRef.current.value !== currentUser.password) {
        //*add method to promises arr to be exec 
        promises.push(updatePasswordInFirebase(passwordRef.current.value));
    }

    //*exec all promises in arr 
    Promise.all(promises).then(() => {
        //redirect to homepage
        navigate("/");
    }).catch((err) => {
        setError(`Failed to update account ${err.message}}`);
    }).finally(() => {
        //*promises done, loading finished
        setUpdateLoading(false);
    });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {/* use this to visually see email after signup worked */}
          {/* {currentUser ? currentUser.email : ""} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            {/* disable t/f, if currently loading, dont want to resubmit form */}
            <Button type="submit" className="w-100" disabled={updateLoading}>
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}

export default UpdateProfile;
