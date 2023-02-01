import NavBar from "./components/navBar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import { useEffect } from "react";
import instance from "./instance";
import { List } from "antd";

function AdminReceipts() {


    const [receipts, setReceipts] = useState([]);
    const [receiptCount, setReceiptCount] = useState(0)

    useEffect(() => {
        instance.get(`admin/receipts`, { withCredentials: true })
            .then((response) => {
                setReceipts(response.data.receipts)
                console.log(response.data.receipts);
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
                        <h5 className="mb-2">All Receipts </h5>
                        <p className="mb-4">Receipts Count: {receiptCount}</p>
                        <List
                            itemLayout="horizontal"
                            dataSource={receipts}   
                            bordered='true'
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={'Name: ' + item.name + `, Posted by: ${item.userName}`}
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
                </Row>
            </Container>
        </>
    )
}

export default AdminReceipts;