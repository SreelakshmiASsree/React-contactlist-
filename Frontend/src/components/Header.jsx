import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/ContactSlice';

const Header = ({ search, setSearch, limit, setLimit }) => {
  const totalcontacts = useSelector((state) => state.contacts.totalContacts);
  const [debounce, setDebounce] = useState(search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(debounce);
      dispatch(fetchContacts());
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  },[debounce, setSearch, dispatch]);

  const handleSearch = (e) => {
    setDebounce(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <header className='header'>
      <div className='container'>
        <div className='heading'>
          <div>
            <h1><FontAwesomeIcon icon={faAddressBook} /> CONTACT LIST</h1>
          </div>
          <div className='search_bar'>
            <div className='total_contact'>
              <select onChange={(e) => setLimit(e.target.value)} value={limit}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span>of {totalcontacts}</span>
            </div>
            <div><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /></div>
            <input value={debounce} onChange={handleSearch} placeholder='search...' name='search' />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
