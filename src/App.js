import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  console.log("contacts", contacts)

  // [TODO] Write a useEffect to fetch contacts here...

  useEffect(() => {
    fetch("http://localhost:3000/contacts")
      .then (res => res.json())
      .then (data => setContacts(data))
      .catch (error => console.error("fetch error", error))
  }, [])

  //const response = await fetch("http://localhost:3000/contacts")
  //const data = await response.JSON()
  //setContacts(data)

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
      />
      <main>{!hideForm && <CreateContactForm setHideForm={setHideForm} setContacts={setContacts}/>}</main>
    </>
  );
}
