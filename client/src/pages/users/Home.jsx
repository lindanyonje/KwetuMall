import {useEffect, useState} from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ArrowRight } from '@carbon/icons-react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate  = useNavigate();
  const [products, setProducts] = useState([]);
  const getProducts = async() =>{
    const {data} = await axios.get('http://localhost:5000/products');
    console.log (data)
    if(data.message === 'Fetched products'){
      setProducts(data.data)
    }
  }
  useEffect(()=>{
    getProducts();
  },[]);
  return (
    <Container>
      <NavBar />
      <hr className='hr'/>

      <div>
         <img className='bckGrndImg' src='./images/Rectangle 52.png' alt="Background" />
         <button className="overlay-button"><span>Items on sale &nbsp;</span> <ArrowRight /></button>
      </div>
      <div className='product'>

        {/* product */}

        <Row xs={1} md={4} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <Card>
                <Card.Img className='product-image' variant="top" src={'http://localhost:5000/' + product.image}/>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                   {product.description}
                  </Card.Text>
                  <div className="product-footer">
                    <div className="price">Ksh {product.sellingPrice.toLocaleString()}</div>
                    <div>
                      <button  className="view-button"
                       onClick={()=> navigate(`/product-detail/${product._id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
       
      </div>
    </Container>
  );
};

export default Home;
