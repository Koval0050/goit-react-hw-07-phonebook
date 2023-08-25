import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, setFilter, selectFilter } from 'redux/reducer';
import { deleteContact, fetchContacts } from 'api/api';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const contactList = contacts.items;
  const [searchValue, setSearchValue] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contactList);

  const filter = useSelector(selectFilter);

  useEffect(() => {
    filterContacts(searchValue);
    dispatch(fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactList, searchValue, dispatch]);

  const handleInput = elem => {
    const value = elem.target.value;
    setSearchValue(value);
    dispatch(setFilter(value));
    filterContacts(value);
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
    filterContacts(searchValue);
  };

  const filterContacts = value => {
    const newFilteredContacts = contactList.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredContacts(newFilteredContacts);
  };

  const noContactsMessage = (
    <p className="no-contacts-message">There is nothing here yet</p>
  );


  return (
    <div className="contact-list-container">
      <div className="contact-list">
        <h1 style={{ fontFamily: 'cursive' }}>Contacts</h1>
        <input
          type="text"
          value={filter}
          onChange={handleInput}
          placeholder="Filter by name"
          className="filter-input"
        />
        <ul className="contacts">
          {filteredContacts.length ? (
            filteredContacts.map(contact => (
              <li key={contact.contactId} className="contacts-item">
                <div className="contacts-item-text">
                  <p>Name: {contact.name}</p>
                  <p>Number: {contact.number}</p>
                </div>
                <button
                  className="contact-btn"
                  onClick={() => removeContact(contact.contactId)}
                >
                  x
                </button>
              </li>
            ))
          ) : (
            <li>{noContactsMessage}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
