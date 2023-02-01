import NavBar from "./components/navBar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import instance from "./instance";
import { Card, List } from "antd";

function AdminUser() {

    const { id } = useParams()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '',
        amountDeposited: '',
        amountToDeposit: ''
    })
    const [receipts, setReceipts] = useState([]);
    const [receiptCount, setReceiptCount] = useState(0)

    useEffect(() => {
        instance.get(`admin/user/${id}`, { withCredentials: true })
            .then((response) => {
                setUserData(response.data.user)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])
    useEffect(() => {
        instance.get(`receipts/user/${id}`, { withCredentials: true })
            .then((response) => {
                setReceipts(response.data.receipts)
                setReceiptCount(response.data.receipts.length)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const styleText = {
        'textAlign': 'center'
    }


    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col lg={8}>
                        <h5 className="mb-4">User Receipts</h5>
                        <List
                            itemLayout="horizontal"
                            dataSource={receipts}   
                            bordered='true'
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={'Name: ' + item.name}
                                        description={`Total: ${item.totalAmount}, date posted: ${new Intl.DateTimeFormat("en-PK", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric"
                                        }).format(new Date(item.createdAt))}`}
                                    />
                                    <a href={'/receipt/' + item._id} style={{ textDecoration: "none" }} >See More...</a>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col lg={4}>
                        <Card
                            title="User Info"
                            className="mb-3"
                            hoverable='true'
                            bodyStyle={styleText}
                            headStyle={styleText}
                        >
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                            <p>Role: {userData.role}</p>
                            <p>Amount deposited: {userData.amountDeposited}</p>
                            <p>Amount to deposit: {userData.amountToDeposit}</p>
                            <p>Total receipts: {receiptCount}</p>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminUser;