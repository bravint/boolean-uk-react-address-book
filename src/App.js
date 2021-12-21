import { useState, useEffect } from "react";

import { api, apiEndpoints } from "./config";

import ContactsList from "./components/ContactsList";
import ContactForm from "./components/ContactForm";
import ContactView from "./components/ContactView";

import "./styles/styles.css";

const App = () => {
    const [contacts, setContacts] = useState([]);

    const [hideForm, setHideForm] = useState(true);

    const [fetchContacts, setFetchContacts] = useState(false);

    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        fetchAPIContacts();
        setHideForm(true);
    }, [fetchContacts]);

    const fetchAPIContacts = async () => {
        try {
            const response = await fetch(`${api.url}${apiEndpoints.contacts}`);
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
                setSelectedContact={setSelectedContact}
            />
            <main>
                {!hideForm && (
                    <ContactForm
                        setFetchContacts={setFetchContacts}
                        fetchContacts={fetchContacts}
                        setHideForm={setHideForm}
                        selectedContact={selectedContact}
                        setSelectedContact={setSelectedContact}
                    />
                )}
                {hideForm && selectedContact &&(
                    <ContactView selectedContact={selectedContact}/>
                )}
            </main>
        </>
    );
}

export default App;
