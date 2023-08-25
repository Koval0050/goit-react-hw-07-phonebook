import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get(
    'https://64e8a0be99cf45b15fdfe2d8.mockapi.io/contacts'
  );
  return response.data;
});

const addContact = createAsyncThunk(
  'contacts/addContact',
  async contactData => {
    const response = await axios.post(
      'https://64e8a0be99cf45b15fdfe2d8.mockapi.io/contacts',
      contactData
    );
    return response.data;
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await axios.delete(
      `https://64e8a0be99cf45b15fdfe2d8.mockapi.io/contacts/${contactId}`
    );
    return contactId;
  }
);

export { fetchContacts, addContact, deleteContact };
