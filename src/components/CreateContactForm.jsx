import { useState, useEffect } from "react";

function CreateContactForm(props) {
    // [TODO] Write form handlers here and POST requests here...
  const { setHideForm, setContacts } = props

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

    const [contact, setContact] = useState(initialContacts);

    const [address, setAddress] = useState(initialAddresses);

    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        if (submit === false) return;
        postAddress();
        setSubmit(false);
    }, [submit]);

    useEffect(() => {
        if (contact.addressId === null) return;
        postContact();      
    }, [contact]);

    console.log("states", { contact, address });

    const handleContactChange = (event) =>
        setContact({ ...contact, [event.target.name]: event.target.value });

    const handleAddressChange = (event) =>
        setAddress({ ...address, [event.target.name]: event.target.value });

    const handleCheckboxChange = (event) =>
        setContact({ ...contact, [event.target.name]: !contact.blockContact });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("before POST", { contact, address });
        setSubmit(true);
    };

    const postAddress = async () => {
        try {
            const response = await fetch("http://localhost:3000/addresses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(address),
            });
            const data = await response.json();
            console.log("server copy of data posted including its ID", data);
            setContact({ ...contact, addressId: data.id });
            setAddress(initialAddresses)
        } catch (error) {
            console.log("address post error", error);
        }
    };

    const postContact = async () => {
        try {
            const response = await fetch("http://localhost:3000/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });
            const data = await response.json();
            console.log("server copy of data posted including its ID", data);
            setContacts(contact)
            setContact(initialContacts)
        } catch (error) {
            console.log("contact post error", error);
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
                value={contact.firstName}
            />
            <label htmlFor="last-name-input">Last Name:</label>
            <input
                id="last-name-input"
                name="lastName"
                type="text"
                onChange={handleContactChange}
                value={contact.lastName}
            />
            <label htmlFor="street-input">Street:</label>
            <input
                id="street-input"
                name="street"
                type="text"
                onChange={handleAddressChange}
                value={address.street}
            />
            <label htmlFor="city-input">City:</label>
            <input
                id="city-input"
                name="city"
                type="text"
                onChange={handleAddressChange}
                value={address.city}
            />
            <label htmlFor="post-code-input">Post Code:</label>
            <input
                id="post-code-input"
                name="postCode"
                type="text"
                onChange={handleAddressChange}
                value={address.postCode}
            />
            <div className="checkbox-section">
                <input
                    id="block-checkbox"
                    name="blockContact"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={contact.blockContact}
                />
                <label htmlFor="block-checkbox">Block</label>
            </div>
            <div className="actions-section">
                <button className="button blue" type="submit">
                    Create
                </button>
            </div>
        </form>
    );
}

export default CreateContactForm;
