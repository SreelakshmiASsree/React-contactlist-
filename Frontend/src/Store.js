// store.js

import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './redux/ContactSlice'

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

export default store;
