
import './App.css';

import Mainlayout from './components/Mainlayout';
import{ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <div className='main' >
        <ToastContainer/>
   <Mainlayout/>
   
    </div>
  );
}

export default App;
