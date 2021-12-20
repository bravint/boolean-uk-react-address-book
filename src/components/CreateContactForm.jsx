import { useState, useEffect } from "react";

const CreateContactForm = (props) => {
    const { fetchContacts, setFetchContacts } = props;

    const initialContacts = {
        firstName: "",
        lastName: "",
        blockContact: false,
        addressId: null,
    };

    const initialAddresses = {
        street: "",
        city: "",
        postCode: "",
    };

    const [newContact, setNewContact] = useState(initialContacts);

    const [newAddress, setNewAddress] = useState(initialAddresses);

    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        if (!submit) return;
        postAddress();
        setSubmit(false)
    }, [submit]);

    useEffect(() => {
        if (!newContact.addressId) return;
        postContact();
        resetForm();
        setFetchContacts(!fetchContacts);
    }, [newContact]);

    console.log("states :", {
        newContact, 
        newAddress, 
        submit
    })

    const handleContactChange = (event) => setNewContact({ ...newContact, [event.target.name]: event.target.value });

    const handleAddressChange = (event) => setNewAddress({ ...newAddress, [event.target.name]: event.target.value });

    const handleCheckboxChange = (event) => setNewContact({ ...newContact, [event.target.name]: event.target.checked });

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(true);
    };

    const resetForm = () => {
        setNewAddress(initialAddresses);
        setNewContact(initialContacts);
    }

    const apiURL = (endpoint) => `http://localhost:3000/${endpoint}`

    const postConfig = (data) => {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    }

    const postAddress = async () => {
        try {
            const response = await fetch(apiURL(`addresses`), postConfig(newAddress));
            const data = await response.json();
            setNewContact({ ...newContact, addressId: data.id });
        } catch (error) {
            console.log("address post error", error);
        }
    };

    const postContact = async () => {
        try {
            await fetch(apiURL(`contacts`), postConfig(newContact));
        } catch (error) {
            console.log(`contact post error`, error);
        }
    };

    return (
        <form
            className="form-stack light-shadow center contact-form"
            onSubmit={handleSubmit}
        >
            <h1>Create Contact</h1>
            <label htmlFor="first-name-input">First Name:</label>
            <input
                id="first-name-input"
                name="firstName"
                type="text"
                onChange={handleContactChange}
                value={newContact.firstName}
            />
            <label htmlFor="last-name-input">Last Name:</label>
            <input
                id="last-name-input"
                name="lastName"
                type="text"
                onChange={handleContactChange}
                value={newContact.lastName}
            />
            <label htmlFor="street-input">Street:</label>
            <input
                id="street-input"
                name="street"
                type="text"
                onChange={handleAddressChange}
                value={newAddress.street}
            />
            <label htmlFor="city-input">City:</label>
            <input
                id="city-input"
                name="city"
                type="text"
                onChange={handleAddressChange}
                value={newAddress.city}
            />
            <label htmlFor="post-code-input">Post Code:</label>
            <input
                id="post-code-input"
                name="postCode"
                type="text"
                onChange={handleAddressChange}
                value={newAddress.postCode}
            />
            <div className="checkbox-section">
                <input
                    id="block-checkbox"
                    name="blockContact"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={newContact.blockContact}
                />
                <label htmlFor="block-checkbox">Block</label>
            </div>
            <div className="actions-section">
                <button className="button blue" type="submit">
                    Create
                </button>
                <button className="button blue">
                    Save
                </button>
                <button className="button blue">
                    Delete
                </button>
            </div>
        </form>
    );
};

export default CreateContactForm;
