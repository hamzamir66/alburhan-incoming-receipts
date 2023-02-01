import NavBar from "./components/navBar";
import instance from "./instance";
import { useAuthUser } from 'react-auth-kit'
import { useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { List } from 'antd';

function AllUsers() {
    const auth = useAuthUser()
    const userId = auth().id
    const [isAdmin, setIsAdmin] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        instance.get("me", { withCredentials: true })
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
            instance.get("admin/users", { withCredentials: true })
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