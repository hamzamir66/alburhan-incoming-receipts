import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "./components/navBar";
import { useAuthUser } from 'react-auth-kit'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function Home() {

	const [receipts, setReceipts] = useState([]);
	const auth = useAuthUser();
	const userId = auth().id;
	const url = `http://localhost:5500/api/v1/myreceipts/${userId}`;

	useEffect(() => {
		axios.get(url)
			.then((response) => {
				setReceipts(response.data.receipts)
			})
			.catch((error) => {
				console.log(error);
			})
	}, []);

	return (
		<>
			<NavBar />
			<Container>
				<Row>
					<Col lg={8}>
						<h3 className="mb-4">My Receipts</h3>
						<ListGroup>
						{receipts.map((receipt, index) => (
							<div key={index}>
								<ListGroup.Item className="mb-1" action><Link style={{ textDecoration:"none" }} to={'/receipt/'+ receipt._id}> Name: {receipt.name} - Amount: {receipt.totalAmount} </Link></ListGroup.Item>
							</div>
						))}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Home;