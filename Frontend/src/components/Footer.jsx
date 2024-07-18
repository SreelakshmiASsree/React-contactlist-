
import React,{useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector,useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/ContactSlice';


const Footer = ({page,setPage,limit,setLimit}) => {
  const pageCount = useSelector((state)=>state.contacts.totalPages)
  const dispatch = useDispatch();

  const handlePageClick=(newpage)=>{
    const data= newpage.selected +1 ;
    console.log(data)
    setPage(data);
    dispatch(fetchContacts({page:data}))
  }
  useEffect(()=>{

  })

  return (
    <footer className='footer'>
        <div className='container'> 
     
      <div className='pagination'> 
    
        <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={limit}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />
      </div>
        </div>

    </footer>
  )
}

export default Footer

//

