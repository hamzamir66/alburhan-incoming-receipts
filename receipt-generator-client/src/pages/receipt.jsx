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
	function numToUrdu(number) {
		const num = number.toString();
		const numbers = {
			0: "",
			1: " ایک",
			2: " دو",
			3: " تین",
			4: " چار",
			5: " پانچ",
			6: " چھ",
			7: " سات",
			8: " آٹھ",
			9: " نو",
			10: " دس",
			11: " گیارہ",
			12: " بارہ",
			13: " تيرہ",
			14: " چودہ",
			15: " پندرہ",
			16: " سولہ",
			17: " سترہ",
			18: " اٹھارہ",
			19: " انيس",
			20: " بيس",
			21: " اکيس",
			22: " بائيس",
			23: " تئيس",
			24: " چوبيس",
			25: " پچيس",
			26: " چھبيس",
			27: " ستائيس",
			28: " اٹھائيس",
			29: " انتيس",
			30: " تيس",
			31: " اکتيس",
			32: " بتيس",
			33: " تينتيس",
			34: " چونتيس",
			35: " پينتس",
			36: " چھتيس",
			37: " سينتيس",
			38: " اڑتیس",
			39: " انتاليس",
			40: " چاليس",
			41: " اکتاليس",
			42: " بياليس",
			43: " تينتاليس",
			44: " چواليس",
			45: " پينتاليس",
			46: " چھیالیس",
			47: " سينتاليس",
			48: " اڑتاليس",
			49: " انچاس",
			50: " پچاس",
			51: " اکياون",
			52: " باون",
			53: " ترپن",
			54: " چون",
			55: " پچپن",
			56: " چھپن",
			57: " ستاون",
			58: " اٹھاون",
			59: " انسٹھ",
			60: " ساٹھ",
			61: " اکسٹھ",
			62: " باسٹھ",
			63: " تریسٹھ",
			64: " چونسٹھ",
			65: " پينسٹھ",
			66: " چھياسٹھ",
			67: " سڑسٹھ",
			68: " اڑسٹھ",
			69: " انہتر",
			70: " ستر",
			71: " اکہتر",
			72: " بہتر",
			73: " تہتر",
			74: " چوہتر",
			75: " پچھتر",
			76: " چھہتر",
			77: " ستتر",
			78: " اٹھہتر",
			79: " اناسی",
			80: " اسی",
			81: " اکياسی",
			82: " بياسی",
			83: " تراسی",
			84: " چوراسی",
			85: " پچاسی",
			86: " چھياسی",
			87: " ستاسی",
			88: " اٹھاسی",
			89: " نواسی",
			90: " نوے",
			91: " اکيانوے",
			92: " بانوے",
			93: " ترانوے",
			94: " چونوے",
			95: " پچانوے",
			96: " چھانوے",
			97: " ستانوے",
			98: " اٹھانوے",
			99: " ننانوے",
			'00': "",
			'000': "",
			'0000': "",
			'00000': "",
			'000000': ""
		};
		let numberInUrdu = "";
		const numberPrefixes = [" سو", " ہزار", " لاکھ", " کروڑ"];
		let len = num.length;
		if (len == 2 || len == 1) {
			numberInUrdu = `${numbers[Number(num)]}`;
			return numberInUrdu;
		}
		if (len == 3) {
			numberInUrdu = `${numbers[Number(num[1] + num[2])]}${numberPrefixes[0]}${numbers[num[0]]}`;
			return numberInUrdu;
		}
		if (len == 4) {
			numberInUrdu = `${numbers[Number(num[2] + num[3])]}${numbers[num[1]] ? numberPrefixes[0] : " "}${numbers[num[1]]}${numberPrefixes[1]}${numbers[num[0]]}`;
			return numberInUrdu;
		}
		if (len == 5) {
			numberInUrdu = `${numbers[Number(num[3] + num[4])]}${numbers[num[2]] ? numberPrefixes[0] : " "}${numbers[num[2]]}${numberPrefixes[1]}${numbers[num[0] + num[1]]}`;
			return numberInUrdu;
		}
		if (len == 6) {
			let isZero = true
			if (num[1] + num[2] == '00') {
				isZero = false
			}
			numberInUrdu = `${numbers[Number(num[4] + num[5])]}${numbers[num[3]] ? numberPrefixes[0] : " "}${numbers[num[3]]}${isZero ? numberPrefixes[1] : " "}${numbers[Number(num[1] + num[2])]}${numberPrefixes[2]}${numbers[num[0]]}`;
			return numberInUrdu;
		}
		if (len == 7) {
			let isZero = true
			if (num[2] + num[3] == '00') {
				isZero = false
			}
			numberInUrdu = `${numbers[Number(num[5] + num[6])]}${numbers[num[4]] ? numberPrefixes[0] : " "}${numbers[num[4]]}${isZero ? numberPrefixes[1] : " "}${numbers[Number(num[2] + num[3])]}${numberPrefixes[2]}${numbers[num[0] + num[1]]}`;
			return numberInUrdu;
		}
	}
	const url = `http://localhost:5500/api/v1/receipt/${id}`;
	useEffect(() => {
		axios.get(url, {withCredentials: true})
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
							<p>Total Amount: <span style={{'fontFamily': 'Urdu', 'fontSize': '24px'}}>
								{numToUrdu(data.totalAmount).split(' ').reverse().join(' ')}</span></p>
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