import Container from 'react-bootstrap/Container';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import {TrashCan} from '@carbon/icons-react'
import CheckoutForm from '../../components/CheckoutForm';
import authApi from '../../api/authApi';

const CartDetails = () => {
  const [items, setItems] = useState([]);

  const getCartItems = async () =>{
    const {data} = await authApi.get('/get-cart-items');
    console.log(data)
    if(data.message === 'Fetched cart items'){
      setItems(data.data)
    }
  }

  useEffect(()=>{
    getCartItems();
  },[])
  return (
    <Container>
      <NavBar />
      <hr className="hr" />
      {
        items.map((item)=>{
          return(
            <div key={item.product._id} className='cart-items'>
            <img className='img'  src={'http://localhost:5000/' +item. product.image} alt="product-image"/>
            <p>{item.product.name}</p>
            <p>{item.quantity}</p>
            <p>Ksh {item.product.sellingPrice}</p>
            <TrashCan/>
        </div>
          )
        })
      }
      <div>
       
        <CheckoutForm/>
      </div>
    </Container>
  );
};

export default CartDetails;
