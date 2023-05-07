import React, { useRef } from 'react'
import { Form, Button, Card} from 'react-bootstrap'

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();



  return (
    <>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Signup</h2>
            <Form>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="confirm-password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmPasswordRef} required></Form.Control>
                </Form.Group>
                <Button type="submit" className="w-100">Sign Up</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? Log In
      </div>
    </>
  )
}

