import { useState } from 'react';
import './styles/NewReceipt.css';

function NewReceipt() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        reference: '',
        address: '',
        paymentDate: '',
        paymentEntries: [{ title: '', amount: '' }]
    });

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        let newEntries = [...formData.paymentEntries];
        if (index !== undefined) {
            newEntries[index][name] = value;
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setFormData({ ...formData, paymentEntries: newEntries });
    };

    const handleAddEntry = () => {
        setFormData({ ...formData, paymentEntries: [...formData.paymentEntries, { title: '', amount: '' }] });
    };

    const handleRemoveEntry = (index) => {
        let newEntries = [...formData.paymentEntries];
        newEntries.splice(index, 1);
        setFormData({ ...formData, paymentEntries: newEntries });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          reference: formData.reference,
          address: formData.address,
          paymentDate: formData.paymentDate,
          paymentEntries: formData.paymentEntries
        };
    
        axios.post('https://your-server.com/submit-form', formData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label className="form-label">
                Name:
                <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label className="form-label">
                Email:
                <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <label className="form-label">
                Phone:
                <input className="form-input" type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <br />
            <label className="form-label">
                Reference:
                <input className="form-input" type="text" name="reference" value={formData.reference} onChange={handleChange} />
            </label>
            <br />
            <label className="form-label">
                Address:
                <input className="form-input" type="text" name="address" value={formData.address} onChange={handleChange} />
            </label>
            <br />
            <label className="form-label">
                Payment Date:
                <input className="form-input" type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} />
            </label>
            <br />
            {formData.paymentEntries.map((entry, index) => (
                <div key={index}>
                    <label className="form-label">
                        Title:
                        <input
                            className="form-input"
                            type="text"
                            name="title"
                            value={entry.title}
                            onChange={e => handleChange(e, index)}
                        />
                    </label>
                    <br />
                    <label className="form-label">
                        Amount:
                        <input
                            className="form-input"
                            type="number"
                            name="amount"
                            value={entry.amount}
                            onChange={e => handleChange(e, index)}
                        />
                    </label>
                    <br />
                    <button className="form-remove-btn" type="button" onClick={() => handleRemoveEntry(index)}>Remove Payment Entry</button>
                    <br />
                </div>
            ))}
            <button className="form-add-btn" type="button" onClick={handleAddEntry}>
                Add Payment Entry
            </button>
            <br />
            <input className="form-submit" type="submit" value="Submit Form" />
        </form>
    );
}

export default NewReceipt;