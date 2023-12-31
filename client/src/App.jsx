import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Exercise from './pages/Exercise';
import Categories from './pages/admin/Categories';
import Sidebar from './pages/admin/Sidebar';
import PickupPoints from './pages/admin/pickupPoints';
import Products from './pages/admin/Products';

import Home from './pages/users/Home';
import Register from './pages/users/auth/Register';
import Login from './pages/users/auth/Login';
import ProductDetail from './pages/users/ProductDetail';
import CartDetails from './pages/users/CartDetails';

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        {/* user routes */}
         <Route exact path='/login' element={<Login/>}/>
         <Route exact path='/register' element={<Register/>}/>
         <Route exact path='/exercise' element={<Exercise/>}/>
         <Route exact path='/' element={<Home/>}/>
         <Route exact path='/product-detail/:id' element={<ProductDetail/>}/>
         <Route exact path='/cart' element={<CartDetails/>}/>
         
         /* admin routes */
         <Route exact path='/admin/categories' element={<Categories/>}/>
         {/* <Route exact path='/admin/Sidebar' element={<Sidebar/>}/> */}
         <Route exact path='/admin/pickup-points' element={<PickupPoints/>}/>
         <Route exact path='/admin/products' element={<Products/>}/>
    
       </Routes>
    </BrowserRouter>
   
  )
}

export default App
