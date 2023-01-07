import React, { useState, useEffect }from 'react';
import { uuid } from "uuidv4";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, {id: uuid(), ...contact}]);
  };
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }
  // Retrieve data back from local
  useEffect(() => {
   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
   if(retrieveContacts)
    setContacts(retrieveContacts);
  
  }, []);
  //To store contact data in local
  useEffect(() => {
     localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  }, [contacts]);
//to get unique installed uuidv4
  return (
    <div>
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList  contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
