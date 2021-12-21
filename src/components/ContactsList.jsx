const ContactsList = (props) => {
    const { contacts, hideForm, setHideForm, setSelectedContact } = props;

    const handleEditClick = (contact) => {
        setSelectedContact(contact);
        setHideForm(false);
    };

    const handleCancelClick = () => {
        setSelectedContact(null);
        setHideForm(!hideForm);
    };

    const handleViewClick = (contact) => {
        setSelectedContact(contact);
        setHideForm(true);
    };

    return (
        <aside className="contacts-section light-shadow">
            <header>
                <h2>Contacts</h2>
                <button
                    onClick={() => handleCancelClick()}
                    className="button new-contact-btn"
                >
                    {hideForm ? "New Contact" : "Cancel"}
                </button>
            </header>
            <ul>
                {contacts.map((contact, index) => {
                    const { firstName, lastName, address } = contact;

                    return (
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
                                <button
                                    className="button blue"
                                    onClick={() => handleViewClick(contact)}
                                >
                                    View
                                </button>
                                <button
                                    className="button blue"
                                    onClick={() => handleEditClick(contact)}
                                >
                                    Edit
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default ContactsList;
