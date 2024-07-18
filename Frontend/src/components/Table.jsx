

// Table.js
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/ContactSlice';

const Table = ({ formVisible, deleteFormVisible }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const status = useSelector((state)=>state.contacts.status)
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);


  return (
    <div className='table'>
      <div className='container table_container'>
        <div className='button'>
          <button className='create_button' onClick={formVisible}><FontAwesomeIcon className='icons' icon={faPlus} />Create</button>
        </div>
        <div className='row'>
          <table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Place</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{contact.salutation + '.' + contact.firstName + ' ' + contact.lastName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.place}</td>
                  <td>
                    <div className='button'>
                      <button className='edit' onClick={() => formVisible(contact._id)}><FontAwesomeIcon className='icons' icon={faPenToSquare} />Edit</button>
                      <button className='delete' onClick={() => deleteFormVisible(contact._id)}><FontAwesomeIcon className='icons' icon={faTrash} />Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
