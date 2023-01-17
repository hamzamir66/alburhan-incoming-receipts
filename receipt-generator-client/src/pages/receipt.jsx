import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./components/navBar";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from 'react-bootstrap/Button';
import ReactToPrint from 'react-to-print';
import { useNavigate } from "react-router-dom";


function Receipt() {
	const nav = useNavigate();
	const printRef = useRef(null);
	const { id } = useParams()
	const [data, setData] = useState({
		name: '',
		email: '',
		mobileNo: '',
		referenceNo: '',
		receiptNo: '',
		address: '',
		paymentDate: '',
		paymentEntries: [{ title: '', amount: '' }],
		totalAmount: 0
	});
	const url = `http://localhost:5500/api/v1/receipt/${id}`;
	useEffect(() => {
		axios.get(url)
			.then((response) => {
				const rawData = response.data.receipt
				const date = new Date(response.data.receipt.paymentDate);
				let year = date.getFullYear();
				let month = date.getMonth();
				let day = date.getDate();
				const newPaymentDate = `${day}-${month+1}-${year}`
				rawData.paymentDate = newPaymentDate
				setData({ ...response.data.receipt })
			})
			.catch((error) => {
				console.log(error);
			})
	}, [])

	const editButton = () => {
		nav(`/receipt/${id}/update`)
	}
	const styles = {
		'@media print': {
			'@page': {
				size: 'A5',
				margin: '0'
			}
		}
	};

	return (
		<>
			<NavBar />
			<Container>
				<ReactToPrint
					trigger={() => <Button variant="primary" className="mb-3">Print</Button>}
					content={() => printRef.current}
				/><Button variant="success" onClick={() => editButton()} className="mb-3 ms-2">Edit</Button>
				<Row>
					<Col>
						<div ref={printRef} style={styles}>
							<p>Name: {data.name}</p>
							<p>Email: {data.email}</p>
							<p>Phone: {data.mobileNo}</p>
							<p>Address: {data.address}</p>
							<p>Reference No : {data.referenceNo}</p>
							<p>Receipt No :{data.receiptNo}</p>
							<p>Payment Date: {data.paymentDate}</p>
							<p>Payment Entries:</p>
							<ul>
								{data.paymentEntries.map((entry, index) => (
									<div key={entry.title + index}>
										<p>{index + 1} Title: {entry.title} - amount: {entry.amount}</p>
									</div>
								))}
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
			<Container>

			</Container>
		</>
	);
}

export default Receipt;