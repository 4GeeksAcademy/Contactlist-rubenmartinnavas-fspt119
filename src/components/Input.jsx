import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Input = ({ onAddContact, contact }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                name: contact.name || "",
                email: contact.email || "",
                phone: contact.phone || "",
                address: contact.address || ""
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onAddContact(formData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="container mt-3 p-3">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success p-4">
                    Save Contact
                </button>
                <div className="text-start">
                    <Link to="/">
                        <button type="submit" className="btn btn-secondary p-1">
                            Back to Contacts
                        </button>
                    </Link>
                </div>
            </form>
        </div>

    );
};

export default Input;