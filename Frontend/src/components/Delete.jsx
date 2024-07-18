import React from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchContacts, deleteContact } from '../redux/ContactSlice';
import { toast } from 'react-toastify';
import './style.css';


const Delete = ({ contactId, deleteFormVisible }) => {
  console.log("hbugh", contactId)
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => {
        dispatch(fetchContacts(contacts));
        deleteFormVisible();
        toast.success("Delete successfully")
      })
      .catch((error) => {
        console.error("Failed to delete contats", error);
      });
  };

  return (

    <div>
      <div className='container'>
        <div className='delete_contact' >
          <h2>Delete</h2>
          <p>Are you sure you want delete contact?</p>

          <div className='delete_button'>
            <button className='delete_btn' onClick={handleDelete}>YES</button>
            <button className='delete_btn close_btn' onClick={deleteFormVisible}>NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete