import { useState, useEffect } from 'react';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/NewReceipt.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



function UpdateReceiptForm() {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        reference: '',
        address: '',
        paymentDate: '',
        paymentEntries: [{ title: '', amount: '' }],
        totalAmount: 0
    });
    const [prevAmount, setPrevAmount] = useState(0)
	const url = `http://localhost:5500/api/v1/receipt/${id}`;
	useEffect(() => {
		axios.get(url, {withCredentials: true})
			.then((response) => {
                console.log(response.data.receipt);
                const dateValue = new Date(response.data.receipt.paymentDate);
                const isoDate = dateValue.toISOString().substring(0, 10);
				setFormData({...formData,
                    name: response.data.receipt.name,
                    email: response.data.receipt.email,
                    phone: response.data.receipt.mobileNo,
                    reference: response.data.receipt.referenceNo,
                    address: response.data.receipt.address,
                    paymentDate: isoDate,
                    paymentEntries: response.data.receipt.paymentEntries,
                    totalAmount: response.data.receipt.totalAmount
                })
                setPrevAmount(response.data.receipt.totalAmount)
			})
			.catch((error) => {
				console.log(error);
			})
	}, [])
    const nav = useNavigate();

    useEffect(()=>{
        console.log(formData);
    },[formData])

    useEffect(() => {
        calculateTotalAmount();
    }, [formData.paymentEntries]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handlePaymentEntriesChange = (e, index) => {
        const { name, value } = e.target;
        const paymentEntries = [...formData.paymentEntries];
        paymentEntries[index][name] = value;
        setFormData({ ...formData, paymentEntries });
    }

    const handleAddEntry = () => {
        setFormData({ ...formData, paymentEntries: [...formData.paymentEntries, { title: '', amount: '' }] });
    };

    const handleRemoveEntry = (index) => {
        let newEntries = [...formData.paymentEntries];
        newEntries.splice(index, 1);
        setFormData({ ...formData, paymentEntries: newEntries });
    }

    const calculateTotalAmount = () => {
        let total = 0;
        formData.paymentEntries.forEach(entry => {
            total += Number(entry.amount);
        });
        setFormData({ ...formData, totalAmount: total });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        calculateTotalAmount();
        const submitData = {
            name: formData.name,
            email: formData.email,
            mobileNo: formData.phone,
            referenceNo: formData.reference,
            address: formData.address,
            paymentDate: formData.paymentDate,
            paymentEntries: formData.paymentEntries,
            totalAmount: formData.totalAmount,
            prevAmount: prevAmount
        };
        // console.log(submitData);
        axios.put(`http://localhost:5500/api/v1/receipt/${id}`, submitData, {withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.receipt);
                    const receiptId = response.data.receipt._id
                    nav(`/receipt/${receiptId}`);    
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Container>
            <Form className="form" onSubmit={handleSubmit}>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="name"
                        value={formData.name}
                        type="text"
                        required="required"
                        placeholder="Name"
                        onChange={handleChange}
                        name="name"
                    />
                    <label htmlFor="name">Name*</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="email"
                        value={formData.email}
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="phone"
                        value={formData.phone}
                        type="tel"
                        placeholder="Phone Number"
                        pattern="03[0-9]{9}"
                        name="phone"
                        onChange={handleChange}
                    />
                    <label htmlFor="phone">Phone Number</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="reference"
                        value={Number(formData.reference)}
                        type="number"
                        placeholder="Reference Number"
                        required="required"
                        pattern="[0-9]{7}"
                        name="reference"
                        onChange={handleChange}
                    />
                    <label htmlFor="reference">Reference Number*</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="address"
                        value={formData.address}
                        type="text"
                        as="textarea"
                        placeholder="Address"
                        onChange={handleChange}
                        name="address"
                    />
                    <label htmlFor="address">Address</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="paymentDate"
                        value={formData.paymentDate}
                        type="date"
                        placeholder="Payment Date"
                        required="required"
                        onChange={handleChange}
                        name="paymentDate"
                    />
                    <label htmlFor="paymentDate">Payment Date*</label>
                </Form.Floating>
                <h3 className='mb-3'>Payment Entries:
                    <Button variant="success" size="md" className="form-add-btn" type="button" onClick={handleAddEntry}>
                        Add Payment Entry
                    </Button>
                </h3>

                {formData.paymentEntries.map((entry, index) => (
                    <div key={index}>
                        <Row>
                            <Col sm={5}>
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="title"
                                        value={formData.paymentEntries[index].title}
                                        type="text"
                                        placeholder="Title"
                                        required="required"
                                        name="title"
                                        onChange={e => handlePaymentEntriesChange(e, index)}
                                    />
                                    <label htmlFor="title">Title*</label>
                                </Form.Floating>
                            </Col>
                            <Col sm={5}>
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="amount"
                                        value={formData.paymentEntries[index].amount}
                                        type="number"
                                        placeholder="Amount"
                                        required="required"
                                        name="amount"
                                        onChange={e => handlePaymentEntriesChange(e, index)}
                                    />
                                    <label htmlFor="amount">Amount*</label>
                                </Form.Floating>
                            </Col>
                            <Col sm={2} className="d-grid gap-2">
                                <div>
                                    <Button variant="danger" size="md" className="form-remove-btn" type="button" onClick={() => handleRemoveEntry(index)}>Remove Payment Entry</Button>
                                </div>
                            </Col>
                        </Row>


                    </div>
                ))}
                <div>
                    Total amount: {formData.totalAmount}
                </div>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" type="submit">
                        Submit Receipt
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default UpdateReceiptForm;