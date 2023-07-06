import { Route, Routes} from 'react-router-dom';
import './App.css';
import { AdminPage } from './component/admin/admin';
import Tracking from './component/map/tracking';
import MainPage from './component/mainPage';
import Register from './users/register';
import Login from "./users/login"
import { DeliveryGuyPage } from './component/deliveryGuy/deliveryGuy';
import { NavigationBar } from './component/navbar';

function App() {
  return (
    <div>
      <NavigationBar />
       <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path='/deliveryguy' element={<DeliveryGuyPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/> 
           <Route path='/track' element={<Tracking/>}/>

      </Routes>
    </div>
  );
}

export default App;
