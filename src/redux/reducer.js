import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'api/api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const setLoading = state => {
  state.isLoading = true;
};

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.error;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, setLoading)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, setError)
      .addCase(addContact.pending, setLoading)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, setError)
      .addCase(deleteContact.pending, setLoading)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.contactId !== payload);
      })
      .addCase(deleteContact.rejected, setError);
  },
});

export const contactSliceReducer = contactSlice.reducer;
export const selectContacts = store => store.contacts;

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const selectFilter = store => store.filter;
