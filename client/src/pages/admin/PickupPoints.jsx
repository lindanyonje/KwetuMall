import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import PickupPointForm from '../../components/PickupPointForm';


const PickupPoints = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('create');
  const [pickupPoints, setPickupPoints] = useState([]);
  const [pickupPointData, setPickupPointData] = useState({
    location: '',
    name: '',
  });

  const handleClose = () => {
    setShow(false);
    setPickupPointData({location: '', name: ''});
    setStatus('create');
  }
  const handleShow = () => setShow(true);

  //Getting all the pickup points
  const getPickupPoints = async () => {
    const { data } = await axios.get('http://localhost:5000/pickup-points');
    console.log(data);
    // if statement
    if (data.message === 'Fetched pickup points') setPickupPoints(data.data);
  };

  const createPickupPoint = async (e) => {
    e.preventDefault();
    //1. Captiure data from the form: pickupPointData
    //2. Send a request to the server with the captured data
    const {data} = await axios.post('http://localhost:5000/pickup-points/create',pickupPointData);
    console.log(data)
    //3. Add the created pickup point to the array of pickup point
    if(data.message === 'Created pickup point'){
      setPickupPoints([...pickupPoints, data.data])
    }
    //4. close the modal
    handleClose()
  };

  //getting one pickup point
  const editPickupPoint = async (e) =>{
    e.preventDefault
    //1. Get the specific pickup point we will be editing using the id
    //2. Populate our form using the data we fetch
    //3. Send a request to the server with the new capgtured data and the id of the pickup point
    const {data} = await axios.post(`http://localhost:5000/pickup-points/update/${pickupPointData._id}`, pickupPointData);
    console.log(data)
    //4. Update array of pickup points to reflect the changes
    if(data.message === 'Updated pickup point'){
      let updatedPickupPoints = pickupPoints.map((pickupPoint)=>{
        if(pickupPoint._id === pickupPointData._id){
          return data.data
        }else{
          return pickupPoint
        }
      })
      setPickupPoints(updatedPickupPoints)
    }
    //5. Close the modal
    handleClose()
  }

  const handleEdit = async (id) =>{
    const {data} = await axios.get(`http://localhost:5000/pickup-points/${id}`);
    console.log(data);
    if(data.message === 'Fetched pickup point'){
      setStatus('edit')
      setPickupPointData(data.data);
      handleShow();
    }

  }

  const deletePickupPoint = async (id) => {
    const { data } = await axios.post(`http://localhost:5000/pickup-points/delete/${id}`);
    console.log(data);
    // Automatically removes the category
    if (data.message === 'Deleted pickup point') {
      let remainingPickupPoints = pickupPoints.filter((pickupPoint) => {
        return pickupPoint._id !== id;
      });
      setPickupPoints(remainingPickupPoints);
    }
  };

  useEffect(() => {
    getPickupPoints();
  }, []);
  return (
    <div>
      <Sidebar />
      <div className="adminContainer">
        <h1>Pickup Points</h1>
        <button className='crtBtn' onClick={handleShow}>Create Pickup Points</button>
        <PickupPointForm
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          status={status}
          pickupPointData={pickupPointData}
          setPickupPointData={setPickupPointData}
          createPickupPoint={createPickupPoint}
          editPickupPoint={editPickupPoint}
          
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Location</th>
              <th> Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pickupPoints.map((pickupPoint) => {
              return (
                <tr key={pickupPoint._id}>
                  <td>{pickupPoint._id}</td>
                  <td>{pickupPoint.location}</td>
                  <td>{pickupPoint.name}</td>
                  <td>
                    <button
                      className="actionBtn"
                      onClick={() => {
                        handleEdit(pickupPoint._id);
                        
                      }}
                    >
                      Edit
                    </button>

                    <button className="actionBtn" onClick={() => deletePickupPoint(pickupPoint._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Assignment: Add a react bootstrap table */}
      </div>
    </div>
  );
};

export default PickupPoints;
