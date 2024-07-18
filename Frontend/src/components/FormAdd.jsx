import React, { useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch,useSelector } from 'react-redux';
import { fetchContacts, addContacts, updateContact } from '../redux/ContactSlice';
import { toast } from 'react-toastify';





const FormAdd = ({ formVisible, initialContact }) => {

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  

  const [iscontact, setIscontact] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    place: ''
  });

  useEffect(() => {
    if (initialContact) {
      setIscontact(initialContact);
    }
  }, [initialContact]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setIscontact({
      ...iscontact,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (initialContact) {
 
      dispatch(updateContact({ id: initialContact._id, updatedData: iscontact }))
        .unwrap()
        .then(() => {
          dispatch(fetchContacts());
          formVisible();
          toast.success("update successfully")
        })
        .catch((error) => {
          console.error("failed to form submission");
          toast.error("please provide value into each field")
        })
    }
    else {
      dispatch(addContacts(iscontact))
        .unwrap()
        .then(() => {
          dispatch(fetchContacts(contacts));
          formVisible();
          toast.success("Add successfully")
          // window.location.reload(); 
        })
        .catch((error) => {
          console.error("Failed to add contact");
          toast.error("Please provide value into each field");
        });
    }



  }


  return (
    <>
      <section className=" form_container">
        <header> <h2> Contact Form <FontAwesomeIcon className='close_icon' onClick={formVisible} icon={faXmark} /></h2></header>
        <form className="form" action="#" onSubmit={handlesubmit}>
          <div className='column'>
            <div className="input-box">
              <label>Salutation</label>
              <select name='salutation' value={iscontact.salutation} onChange={handleChange}>
                <option>select</option>
                <option>Mr</option>
                <option>Mrs</option>
                <option>Miss</option>
              </select>
            </div>
            <div className="input-box">
              <label>First Name</label>
              <input required="" value={iscontact.firstName} onChange={handleChange} placeholder="Enter first name" type="text" name='firstName' />
            </div>
            <div className="input-box">
              <label>Last Name</label>
              <input required="" value={iscontact.lastName} onChange={handleChange} placeholder="Enter last name" type="text" name='lastName' />
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Phone Number</label>
              <input required="" value={iscontact.phone} onChange={handleChange} placeholder="Enter phone number" type="telephone" name='phone' />
            </div>
            <div className="input-box">
              <label>Email</label>
              <input required="" value={iscontact.email} onChange={handleChange} placeholder="Enter email" type="email" name='email' />
            </div>
          </div>
          <div className='column'>
            <div className="input-box">
              <label>Place</label>
              <input required="" value={iscontact.place} onChange={handleChange} placeholder="Enter place" type="text" name='place' />
            </div>
          </div>
          <div className='submit_button'>
            <button >Submit</button>
            <button className='close_btn' >cancel</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default FormAdd;