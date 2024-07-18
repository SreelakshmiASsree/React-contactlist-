import React, { useState, useEffect } from 'react';
import Header from './Header';
import Table from './Table';
import FormAdd from './FormAdd';
import Footer from './Footer';
import Delete from './Delete';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/ContactSlice';



const Mainlayout = () => {
  const [isFormvisible, setIsFormvisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [contactId, setcontactId] = useState(null);
  const contacts = useSelector(state => state.contacts.contacts);
  const [editContact, setEditContact] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchContacts({ search, page, limit }))
    console.log("fetch1")
  }, [dispatch, search, page, limit])


  const formVisible = (id) => {
    if (id) {
      const contactUpdate = contacts.find(contact => contact._id === id);
      setEditContact(contactUpdate);
    }
    else {
      setEditContact(null)
    }
    setIsFormvisible(!isFormvisible);
  };


  const deleteFormVisible = (id) => {
    setcontactId(id);

    setDeleteVisible(!deleteVisible);


  }


  return (
    <div>
      <Header search={search} setSearch={setSearch} limit={limit} setLimit={setLimit} />

      <Table formVisible={formVisible} deleteFormVisible={deleteFormVisible} />
      {isFormvisible && <div className='overlay' onClick={formVisible}></div>}
      {isFormvisible && <FormAdd formVisible={formVisible} initialContact={editContact} />}

      <Footer page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
      {deleteVisible && <div className='overlay' onClick={deleteFormVisible}></div>}
      {deleteVisible && <Delete deleteFormVisible={deleteFormVisible} contactId={contactId} />}


    </div>
  )
}

export default Mainlayout

 

