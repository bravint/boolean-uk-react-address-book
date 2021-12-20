import { useState, useEffect } from "react";

import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";

import "./styles/styles.css";

export default function App() {
    const [contacts, setContacts] = useState([]);

    const [hideForm, setHideForm] = useState(true);

    const [fetchContacts, setFetchContacts] = useState(false);

    const [editContact, setEditContact] = useState(false);

    const [contactToEdit, setcontactToEdit] = useState(null)

    console.log("states", {
        contacts,
        hideForm,
        fetchContacts,
        editContact,
        contactToEdit
    });

    useEffect(() => {
        fetchAPIContacts();
        setHideForm(true);
    }, [fetchContacts]);

    const fetchAPIContacts = async () => {
        try {
            const response = await fetch(`http://localhost:3000/contacts`);
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.log(`fetch error`, error);
        }
    };

    return (
        <>
            <ContactsList
                contacts={contacts}
                hideForm={hideForm}
                setHideForm={setHideForm}
                setEditContact={setEditContact}
                setcontactToEdit={setcontactToEdit}

            />
            <main>
                {!hideForm && (
                    <CreateContactForm
                        setFetchContacts={setFetchContacts}
                        fetchContacts={fetchContacts}
                        editContact={editContact}
                        setEditContact={setEditContact}
                        contactToEdit={contactToEdit}
                        setcontactToEdit={setcontactToEdit}
                    />
                )}
            </main>
        </>
    );
}
