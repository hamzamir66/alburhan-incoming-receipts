import React, { useState, useEffect } from "react";
import instance from "../instance";
import '../styles/loginForm.css';
import { useSignIn } from "react-auth-kit";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = useSignIn();
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        instance.post("login", { email, password }, {withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.user._id);
                    signIn({
                        token: response.data.token,
                        expiresIn: 172800, // 2 days
                        tokenType: "Bearer",
                        authState: {id:response.data.user._id}
                    });
                    nav('/');
                    
                } else {
                    console.log(response);  
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Container>
            <Row>
                <Col className="loginHeading mb-3">
                    <h3>Login</h3>
                </Col>
            </Row>
            <Row className="justfy-content-lg-center">
                <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }}>
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <FloatingLabel className="mb-3" label="Email Adress" controlId="floatingInput">
                            <Form.Control
                                className="login-input"
                                placeholder="name@example.com"
                                type="email"
                                value={email}
                                required="required"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
                            <Form.Control
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                required="required"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FloatingLabel>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type="submit">
                                Login
                            </Button>
                        </div>
                        {/* <button className="login-button" type="submit">Login</button> */}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;