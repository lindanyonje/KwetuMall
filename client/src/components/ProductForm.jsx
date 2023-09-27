import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ProductForm = ({ show, handleClose, status,handleEdit, productData, setProductData, createProduct, editProduct }) => {
  const [ categories, setCategories] = useState([]);

  const getCategories = async () =>{
    const {data} = await axios.get('http://localhost:5000/categories');
    console.log(data);
    if (data.message === 'Successfully fetched categories!'){
      setCategories(data.data)
    }
  }

  useEffect(() =>{
    getCategories();
  },[]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{status === 'create' ? 'Create' : 'Edit'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={status === 'create' ? createProduct : editProduct}>
            {/* row col */}
            {/* multer */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      name: e.target.value,
                    })
                  }
                />
              </Col>
              <Col>
                <Form.Label>Buying Price</Form.Label>
                <Form.Control
                  type="number"
                  value={productData.buyingPrice}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      buyingPrice: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Selling Price</Form.Label>
                <Form.Control type="number" 
                value={productData.sellingPrice}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    sellingPrice: e.target.value,
                  })
                }
                />
              </Col>
              <Col>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={productData.stock}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      stock: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" 
                onChange={(e)=> setProductData({...productData, image: e.target.files[0]})}
                />
              </Col>
              <Col>
                <Form.Label>Categories</Form.Label>
                <Form.Select
                 onChange={(e) => setProductData({
                   ...productData, 
                   categories:[...productData.categories, e.target.value]})}>
                  <option></option>
                  {
                    categories.map((category) =>{
                      return <option  key={category._id}>{category.name}</option>
                    })
                  }
                </Form.Select>
              </Col>
            </Row>

            <div className='mb-3'>
              {
                productData.categories.map((category, idx)=>{
                  return <span className='actionBtn' key={idx}>{category}</span>
                })
              }
              {
                productData.categories.length > 0 ?
                <span onClick={() => setProductData({...productData, categories:[]})}> X</span>
                : null
              }
              
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                placeholder="Description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <button className="submitBtn" type="submit">
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductForm;
