
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';
const env = 'http://localhost:5000/contact';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts',
    async ({ search = '', page = 1, limit = 10 }) => {
        console.log("fetch2");
        const response = await axios.get(env, {
            params: { search, page, limit }
        });
        return response.data;

    });

export const addContacts = createAsyncThunk('contacts/addContacts',
    async (newContact,) => {
        const response = await axios.post(env, newContact);
        return response.data;
    }
);

export const updateContact = createAsyncThunk('contacts/updateContacts',
    async ({ id, updatedData }) => {
        const response = await axios.put(`${env}/${id}`, updatedData);
        return response.data
    }
);

export const deleteContact = createAsyncThunk('contacts/deleteContacts',
    async (id) => {
        const response = await axios.delete(`${env}/${id}`);
        return response.data
    }
);

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        currentpage: 1,
        totalPages: 1,
        totalContacts: 0,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = 'suceeded';
                state.contacts = action.payload.data;
                state.currentpage = action.payload.currentpage;
                state.totalPages = action.payload.totalPages;

                state.totalContacts = action.payload.totalContacts;
            })

            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addContacts.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
            })

            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.contacts.findIndex(contact => contact._id === action.payload._id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            })

            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(contact => contact._id !== action.payload._id)
            })
    }
});
export default contactSlice.reducer;


