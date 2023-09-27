import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const CheckoutForm = () => {
  const [show, setShow] = useState(false);
  const [pickupPoints, setPickupPoints] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPickupPoints = async() =>{
    const {data} = await axios.get('http://localhost:5000/pickup-points')
    if(data.message === 'Fetched pickup points'){
        setPickupPoints(data.data)
    }
  }

  useEffect(()=>{
    getPickupPoints();
  },[])
  return (
    // Get a modal from react bootstrp and add it here
    <>
      <button onClick={handleShow} className='submitBtn checkoutBtn'>Proceed to Checkout</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Location</Form.Label>
                    <Form.Select>
                        <option>Choose Location</option>
                        {
                            pickupPoints.map((pickupPoint)=>{
                                return <option key={pickupPoint._id}>{pickupPoint.location}</option>
                                })
                        }
                    
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Pickup point</Form.Label>
                    <Form.Select>
                        <option>Choose pickup point</option>
                    </Form.Select>
                </Form.Group>
                <button className='submitBtn'>Checkout</button>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CheckoutForm;
