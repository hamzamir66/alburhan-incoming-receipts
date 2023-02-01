import React from "react";
import NavBar from "./components/navBar";
import { useState } from "react";
import { useEffect } from "react";
import instance from "./instance";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Card } from "antd";

function Profile() {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '',
        amountDeposited: '',
        amountToDeposit: ''
    })


    useEffect(() => {
        instance.get('me', { withCredentials: true })
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    const styleText = {
        'textAlign': 'center'
    }

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col lg={4}>
                    <Card
                            title="User Info"
                            className="mb-3"
                            hoverable='true'

                        >
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                            <p>Role: {userData.role}</p>
                            <p>Amount deposited: {userData.amountDeposited}</p>
                            <p>Amount to deposit: {userData.amountToDeposit}</p>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Profile;