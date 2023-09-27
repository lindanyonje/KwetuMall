import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Table from 'react-bootstrap/Table';
import ProductForm from '../../components/ProductForm';
import axios from 'axios';

const Products = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('create');
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: '', buyingPrice: '', sellingPrice: '', stock:'', image:'', categories:[], description:''
  })

  const handleClose = () => {
    setShow(false);
    setStatus('create');
    setProductData({
      name: '',
      buyingPrice: '', 
      sellingPrice: '', 
      stock:'',
      image:'', 
      categories:[], 
      description:''});

  };
  const handleShow = () => setShow(true);

  const createProduct = async(e) =>{
    e.preventDefault();
    // form data: used when sending files/images to backend

    let formData = new FormData();
    formData.append('name',productData.name);
    formData.append('buyingPrice',productData.buyingPrice);
    formData.append('sellingPrice',productData.sellingPrice);
    formData.append('stock',productData.stock);
    formData.append('image',productData.image);
    formData.append('description',productData.description);
    // JSON.stringify: creates a JSON string from an array
    formData.append('categories', JSON.stringify(productData.categories));
    const {data} = await axios.post('http://localhost:5000/products/create', formData);
    console.log(data);
    if (data.message === 'Created product') {
      setProducts([...products, data.data]);
      handleClose();
    }

    // Activity
    // Adding newly created product to list of products
    // Close the modal
  };

  const getProducts = async () => {
    // 1. Make a request to our server to get all the products
    const { data } = await axios.get('http://localhost:5000/products');
    console.log(data)
    
    if (data.message === 'Fetched products') {
      // 2. store data i've gotten in a variable
      setProducts(data.data); 
    }
  };

  const getProduct = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/product/${id}`);
    console.log(data);
    if (data.message === 'Fetched product') {
      setProductData(data.data);
      setStatus('edit');
    }
  };

  const deleteProduct = async(id) =>{
    //1.make a request to our server to delete product
    const {data} = await axios.post(`http://localhost:5000/products/delete/${id}`)
    //2.Remove the deleted item from the table
    if(data.message === 'Deleted product!'){
      let filteredProducts = products.filter((product)=>{
        return product._id !== id
      })
      setProducts(filteredProducts)
    }
  }

  const handleEdit = async (id) =>{
    //1. Get product to be edited, populate the form with the data
    const {data} = await axios.get(`http://localhost:5000/products/${id}`);
    if (data.message === 'Fetched product'){
      setProductData(data.data)
      //2. Change status of the form to edit
      setStatus('edit');
      //3. Open the modal
      handleShow();
    }
  }

  const editProduct = async (e) => {
    e.preventDefault();
    // form data: used when sending files/images to backend

    let formData = new FormData();
    formData.append('name',productData.name);
    formData.append('buyingPrice',productData.buyingPrice);
    formData.append('sellingPrice',productData.sellingPrice);
    formData.append('stock',productData.stock);
    if(productData.image) {
      formData.append('image',productData.image);
    }
    formData.append('description',productData.description);
    // JSON.stringify: creates a JSON string from an array
    formData.append('categories', JSON.stringify(productData.categories));
    console.log(formData)
    const {data} = await axios.post(`http://localhost:5000/products/update/${productData._id}`, formData);
    console.log(data);

    if(data.message === 'Updated product'){
      let newProducts = products.map((product)=>{
        if(product._id === productData._id){
          return data.data
        }else {
          return product;
        } 
      })
      setProducts(newProducts)
      handleClose();
    }
    
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="adminContainer">
        <h1>Products</h1>
        <button className='crtBtn' onClick={handleShow}>Create Product</button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Stock</th>
              <th>Categories</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <img className='img' src={'http://localhost:5000/' + product.image}/>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.buyingPrice}</td>
                  <td>{product.sellingPrice}</td>
                  <td>{product.stock}</td>
                  <td>{product.categories}</td>
                  <td>{product.description}</td>
                  <td >
                    <button className='actionBtn' onClick={()=>{handleEdit(product._id)} }>Edit</button>

                    <button className='actionBtn'onClick={()=>deleteProduct(product._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <ProductForm
            show={show} 
            handleClose={handleClose} 
            status={status}
            productData={productData}
            setProductData={setProductData}
            createProduct={createProduct}
            editProduct={editProduct}
           
        />
      </div>
    </>
  );
};

export default Products;
