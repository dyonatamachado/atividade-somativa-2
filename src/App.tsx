import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

function App() {
  return (
    <>
      <ToastContainer/>
      <Outlet></Outlet>
    </>
  );
}

export default App;
