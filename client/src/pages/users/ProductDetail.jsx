import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import authApi from '../../api/authApi';

const ProductDetail = () => {
  const { id } = useParams();
  // const [counter, SetCounter]= useState(0);
  const [counter, setCounter] = useState(1);
  const handleIncrement = () => {
    setCounter(counter + 1);
  };
  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const [product, setProduct] = useState({});
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const getProduct = async () => {
    const { data } = await axios.get(`http://localhost:5000/products/${id}`);
    if (data.message === 'Fetched product') {
      setProduct(data.data);
    }
  };

  const addToCart = async () => {
    const { data } = await authApi.post('/add-to-cart', { productId: id, quantity: counter });
    // axios.post(`http://localhost:5000/add-to-cart`);
    console.log(data);
    if (data.message === 'Added to cart') {
      setSuccess('Successfully added to cart');
    } else {
      setErr(data.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container>
      <NavBar />
      <hr className="hr" />

      <div className="product-details">
        <Row>
          <Col>
            <div>
              <img className="productdetail-img" src={'http://localhost:5000/' + product.image} alt="product-image" />
            </div>
          </Col>
          <Col>
            <div className="product-description">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
            <div className="flex">
              <div className="product-counter">
                <button className="counter-button" onClick={handleDecrement}>
                  -
                </button>
                <span>{counter}</span>
                <button className="counter-button" onClick={handleIncrement}>
                  +
                </button>
              </div>
              <p>Ksh {(product.sellingPrice * counter).toLocaleString()}</p>
            </div>

            <button className="submitBtn" onClick={addToCart}>
              Add to Cart
            </button>
            {success ? (
              <>
                <p style={{ color: 'green', fontWeight: 'bold' }}>Product added to cart!</p>
                <p>To continue shopping click <a href='/'>here</a></p>
                <p>To view your cart click <a href='/cart'>here</a></p>
              </>
            ) : null}
            {err ? <p className="red-paragraph">{err}</p> : null}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ProductDetail;
