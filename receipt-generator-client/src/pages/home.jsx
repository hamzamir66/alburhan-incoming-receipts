import instance from "./instance";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "./components/navBar";
import { useAuthUser } from 'react-auth-kit'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Button, Card, List } from 'antd'


function Home() {

	const [receipts, setReceipts] = useState([]);
	const [user, setUser] = useState([]);
	const auth = useAuthUser();
	const userId = auth().id;
	const url = `myreceipts/${userId}`;

	useEffect(() => {
		instance.get(url, { withCredentials: true })
			.then((response) => {
				setReceipts(response.data.receipts)
			})
			.catch((error) => {
				console.log(error);
			})
	}, []);

	useEffect(() => {
		instance.get('me', { withCredentials: true })
			.then((response) => {
				setUser(response.data.user)
			})
			.catch((error) => {
				console.log(error);
			})
	}, []);

	const depositAmount = (amount) => {
		console.log(user);
		instance.post(`user/depositamount/?amount=${amount}`,
			user, { withCredentials: true }
		)
			.then((response) => {
				setUser(response.data.user)
			})
			.catch((error) => {
				console.log(error);
			})
	}

	const styleText = {
		'textAlign': 'center'
	}

	return (
		<>
			<NavBar />
			<Container>
				<Row>
					<Col lg={8}>
						<h3 className="mb-4">My Receipts</h3>
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
							title="Amount deposited"
							className="mb-3"
							hoverable='true'
							bodyStyle={styleText}
							headStyle={styleText}
						>
							<p>Total: {user.amountDeposited}</p>

						</Card>

						<Card
							title="Amount to deposit"
							className="mb-3"
							hoverable='true'
							bodyStyle={styleText}
							headStyle={styleText}
						>
							<p>Total: {user.amountToDeposit}</p>
							<Button
								onClick={() => depositAmount(user.amountToDeposit)}
							>Click here to deposit all
							</Button>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Home;