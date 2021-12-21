const ContactView = (props) => {
    const {selectedContact} = props

    return (
        <div className="view-contact light-shadow center">
            <h2>{selectedContact.firstName} {selectedContact.lastName}</h2>
            <h3>Address</h3>
            <p>{selectedContact.address.street}</p>
            <p>{selectedContact.address.city}</p>
            <p>{selectedContact.address.postCode}</p>
        </div>
    )
}

export default ContactView
