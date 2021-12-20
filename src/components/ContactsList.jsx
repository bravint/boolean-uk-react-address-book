import { useState } from "react";

const ContactsList = (props) => {
  const { contacts, hideForm, setHideForm, setEditContact, setcontactToEdit } = props;

  const onClickEditHandler = (contact) => {
    console.log("in edit button handler", contact)
    setcontactToEdit(contact)
    setEditContact(true);
  }
  
  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => setHideForm(!hideForm)}
          className="button new-contact-btn"
        >
          {hideForm ? "New Contact" : "Cancel"}
        </button>
      </header>
      <ul>
        {contacts.map((contact, index) => {
          const { firstName, lastName, address } = contact;

          return (
            <>
              <li className="contactListItem" key={index}>
                <div>
                  <h3>
                    {firstName} {lastName}
                  </h3>
                  <p>
                    {address.street}, {address.postCode}
                  </p>
                </div>
                <div className="contactListItemButtons">
                <button className="button blue">
                    View
                </button>
                <button className="button blue" onClick={() => onClickEditHandler(contact)}>
                    Edit
                </button>
                </div>
              </li>
              <hr></hr>
            </>
          );
        })}
      </ul>    
    </aside>
  );
}

export default ContactsList;
