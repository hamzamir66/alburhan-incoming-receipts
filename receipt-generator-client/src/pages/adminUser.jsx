import NavBar from "./components/navBar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";

function AdminUser() {

    const { id } = useParams()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '',
        amountDeposited: '',
        amountToDeposit: ''
    })

    const [receiptCount, setReceiptCount] = useState(0)
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5500/api/v1/admin/user/${id}`, { withCredentials: true })
            .then((response) => {
                setUserData(response.data.user)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const items = [
        {
            key: '1',
            label: 'User Info',
            children:
                <>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Role: {userData.role}</p>
                    <p>Deposited Amount: {userData.amountDeposited}</p>
                    <p>Amount to be Deposited: {userData.amountToDeposit}</p>
                </>
        },
        {
            key: '2',
            label: 'User Receipts',
            children: 'content 2'
        }
    ]


    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col>
                        <Tabs
                            // onChange={onChange}
                            type="card"
                            centered='true'
                            defaultActiveKey="1"
                            items={items}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminUser;