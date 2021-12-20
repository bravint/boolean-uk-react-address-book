import { useState, useEffect } from "react";

const CreateContactForm = (props) => {
    const { fetchContacts, setFetchContacts, editContact, setEditContact, contactToEdit, setcontactToEdit } = props;

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
        
        if (contactToEdit) {
            postAddress("PATCH", newContact.addressId)
        } else {
            postAddress("POST");
        }

    }, [submit]);

    useEffect(() => {
        if (!newContact.addressId || !submit) return;
        if (contactToEdit) {
            postContact("PATCH", newContact.id);
        } else {
            postContact("POST")
        }
            resetForm();
            setFetchContacts(!fetchContacts);
            setSubmit(false)
        
    }, [newContact]);

    console.log("states createForm:", {
        newContact, 
        newAddress, 
        submit,
        editContact,
        contactToEdit
    })

    useEffect(() => {
        if (!editContact) return
        const {address, ...contact} = contactToEdit
        setNewContact(contact)
        setNewAddress(address)
        setEditContact(false)
    }, [editContact])

    const handleContactChange = (event) => setNewContact({ ...newContact, [event.target.name]: event.target.value });

    const handleAddressChange = (event) => setNewAddress({ ...newAddress, [event.target.name]: event.target.value });

    const handleCheckboxChange = (event) => setNewContact({ ...newContact, [event.target.name]: event.target.checked });

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(true);
    };

    const deleteContactHandler = () => {
        fetch(`http://localhost:3000/addresses/${newContact.addressId}`,{ 
        method: "DELETE"
        })
        fetch(`http://localhost:3000/contacts/${newContact.id}`,{ 
        method: "DELETE"
        })
        resetForm();
        setFetchContacts(!fetchContacts);
    }

    const resetForm = () => {
        setNewAddress(initialAddresses);
        setNewContact(initialContacts);
    }

    const apiURL = (endpoint, id="") => `http://localhost:3000/${endpoint}/${id}`

    const postConfig = (method, data) => {
        return {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    }

    const postAddress = async (method, id) => {
        try {
            const response = await fetch(apiURL(`addresses`, id), postConfig(method, newAddress));
            const data = await response.json();
            setNewContact({ ...newContact, addressId: data.id });
        } catch (error) {
            console.log("address post error", error);
        }
    };

    const postContact = async (method, id) => {
        try {
            await fetch(apiURL(`contacts`, id), postConfig(method, newContact));
        } catch (error) {
            console.log(`contact post error`, error);
        }
    };

    return (
        <form
            className="form-stack light-shadow center contact-form"
            onSubmit={handleSubmit}
        >
            {!editContact && (
                <h1>Create Contact</h1>
            )}
            {editContact && (
                <h1>Edit Contact</h1>
            )}
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
                {!contactToEdit && (
                <button className="button blue" type="submit">
                    Create
                </button>
                )}
                {contactToEdit && (
                <>
                    <button className="button blue" type = "submit">
                        Edit
                    </button>
                    <button className="button blue" onClick = {() => deleteContactHandler()}>
                        Delete
                    </button>
                </>
                )}
            </div>
        </form>
    );
};

export default CreateContactForm;
