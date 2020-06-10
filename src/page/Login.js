import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Login() {
    // let user = useSelector((state) => state.user);
    // let stateuser = useSelector((state)=>state.user)
    let history = useHistory();
    const dispatch = useDispatch();
    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)


    const login = (e) => {
        e.preventDefault();
        // let user = { email: username, password: password };
        dispatch({ type: "login", payload: { username: username, password: password } });
        history.push('/jobs');
        // console.log("trying again",stateuser)
    };


    return (
        <div>
            <div className="login-page-main">
                    <h1>Login Page</h1>
                    <Form className="login-page-form" onSubmit={(e) => login(e)}>
                        <h1>Login Page</h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                    </Button>
                    </Form>
            </div>
        </div>
    )
}
