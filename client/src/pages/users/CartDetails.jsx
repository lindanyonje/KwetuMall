import Container from 'react-bootstrap/Container';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { TrashCan } from '@carbon/icons-react';
import CheckoutForm from '../../components/CheckoutForm';
import authApi from '../../api/authApi';

const CartDetails = () => {
  const [items, setItems] = useState([]);

  const getCartItems = async () => {
    const { data } = await authApi.get('/get-cart-items');
    console.log(data);
    if (data.message === 'Fetched cart items') {
      setItems(data.data);
    }
  };

  const getTotal = () =>{
    //[1,2,3,4]
    //[{product:{sellingPrice: 1000}, quantity: 1}]
    return items.reduce((a, b) => a + (b.product.sellingPrice * b.quantity), 0)
  }

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <Container>
      <NavBar />
      <hr className="hr" />
      {items.map((item) => {
        return (
          <div key={item.product._id} className="cart-items">
            <img className="img" src={'http://localhost:5000/' + item.product.image} alt="product-image" />
            <p>{item.product.name}</p>
            <p>{item.quantity}</p>
            <p>Ksh {item.product.sellingPrice}</p>
            <TrashCan />
          </div>
        );
      })}
       <p className='cart-total'> Total: ksh {getTotal().toLocaleString()} </p>
        <CheckoutForm />
      
    </Container>
  );
};

export default CartDetails;
