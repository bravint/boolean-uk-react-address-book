import { useState, useEffect } from "react";
import { api, apiEndpoints } from "../config";

const ContactForm = (props) => {
    const {
        fetchContacts,
        setFetchContacts,
        setHideForm,
        selectedContact,
        setSelectedContact,
    } = props;

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
        if (!submit) return;
        selectedContact ? postAddress("PUT", `${contact.addressId}`) : postAddress("POST");
    }, [submit]);

    useEffect(() => {
        if (!contact.addressId || !submit) return;
        selectedContact ? postContact("PUT", `${contact.id}`) : postContact("POST");
        postSubmit();
        setSelectedContact({...contact, address});
        setSubmit(false);
    }, [contact]);

    useEffect(() => {
        if (!selectedContact) return;
        const { address, ...contact } = selectedContact;
        setContact(contact);
        setAddress(address);
    }, [selectedContact]);

    const handleContactChange = (event) => setContact({...contact, [event.target.name]: event.target.value});

    const handleAddressChange = (event) => setAddress({...address, [event.target.name]: event.target.value});

    const handleCheckboxChange = (event) => setContact({...contact,[event.target.name]: event.target.checked});

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(true);
    };

    const handleDeleteClick = async () => {
        deleteEntry(`contacts`, contact.id);
        deleteEntry(`addresses`, contact.addressId);
        postSubmit();
        setSelectedContact(null);
    };

    const apiURL = (endpoint, id = "") => `${api.url}/${endpoint}/${id}`

    const config = (method, data) => {
        return {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
    };

    const postAddress = async (method, id = "") => {
        try {
            const response = await fetch(`${api.url}${apiEndpoints.addresses}/${id}`, config(method, address));
            const data = await response.json();
            setContact({ ...contact, addressId: data.id });
        } catch (error) {
            console.log("address post error", error);
        }
    };

    const postContact = async (method, id = "") => {
        try {
            await fetch(`${api.url}${apiEndpoints.contacts}/${id}`, config(method, contact));
        } catch (error) {
            console.log(`contact post error`, error);
        }
    };

    const deleteEntry = async (endpoint, id = "") => {
        await fetch(apiURL(endpoint, id), {
            method: "DELETE",
        });
    };

    const resetForm = () => {
        setAddress(initialAddresses);
        setContact(initialContacts);
    };

    const postSubmit = () => {
        resetForm();
        setHideForm(true);
        setFetchContacts(!fetchContacts);
    };

    return (
        <form
            className="form-stack light-shadow center contact-form"
            onSubmit={handleSubmit}
        >
            {!selectedContact && <h1>Create Contact</h1>}
            {selectedContact && <h1>Edit Contact</h1>}
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
                    checked={contact.blockContact}
                />
                <label htmlFor="block-checkbox">Block</label>
            </div>
            <div className="actions-section">
                {!selectedContact && (
                    <button className="button blue" type="submit">
                        Create
                    </button>
                )}
                {selectedContact && (
                    <>
                        <button className="button blue" type="submit">
                            Edit
                        </button>
                        <button className="button blue" onClick={() => handleDeleteClick()}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

export default ContactForm;
