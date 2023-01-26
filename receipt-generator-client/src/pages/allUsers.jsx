import NavBar from "./components/navBar";
import axios from "axios";
import { useAuthUser } from 'react-auth-kit'
import { useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { List } from 'antd';

function AllUsers() {
    const auth = useAuthUser()
    const userId = auth().id
    const [isAdmin, setIsAdmin] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:5500/api/v1/me", { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.user.role === 'admin') {
                        setIsAdmin(true);
                    }
                    else if (response.data.user.role === 'user') {
                        setIsAdmin(false);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [isAdmin])

    useEffect(() => {
        if (isAdmin === true) {
            axios.get("http://127.0.0.1:5500/api/v1/admin/users", { withCredentials: true })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.users);
                        setUsers(response.data.users)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [isAdmin])

    return (
        <>
            <NavBar />
            {isAdmin ? (
                <>
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <h3 className="mb-4">All Users</h3>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={users}
                                    bordered='true'
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={item.name}
                                                description={`Role: ${item.role}, Deposited Amount: ${item.amountDeposited}`}
                                            />
                                            <a href={'/admin/user/' + item._id} style={{ textDecoration: "none" }} >See More...</a>

                                        </List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : ''}
        </>
    )
}

export default AllUsers;