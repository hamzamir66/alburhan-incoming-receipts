import React, { useState, useEffect } from "react";
import instance from "../instance";
import '../styles/loginForm.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegisterForm() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatch, setIsMatch] = useState();

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password === e.target.value) {
            setIsMatch(true);
        } else {
            setIsMatch(false);
        }
    }

    useEffect(()=> {
        if (password === confirmPassword) {
            setIsMatch(true);
        } else {
            setIsMatch(false);
        }
    },[confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isMatch === true) {
            instance.post("admin/register", { name, email, password }, { withCredentials: true })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                    } else {
                        console.log(response);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            if (password === confirmPassword) {
                setIsMatch(true);
            } else {
                setIsMatch(false);
            }
        }
    };

    return (
        <Container>
            <Row>
                <Col className="loginHeading mb-3">
                    <h3>Register New User</h3>
                </Col>
            </Row>
            <Row className="justfy-content-lg-center">
                <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }}>
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <FloatingLabel className="mb-3" label="Name" controlId="floatingName">
                            <Form.Control
                                className="login-input"
                                placeholder="Name"
                                type="text"
                                value={name}
                                required="required"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FloatingLabel>
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
                        <FloatingLabel className="mb-3" controlId="floatingPassword2" label="ConfirmPassword" hasValidation>
                            <Form.Control
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                value={confirmPassword}
                                required="required"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                isInvalid={!isMatch}
                            />
                            <Form.Control.Feedback type="invalid">
                                {!isMatch && <p>Passwords do not match</p>}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type="submit">
                                Register
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterForm;