import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const CategoryForm = ({ categoryData, setCategoryData, createCategory, status, editCategory, show, handleClose }) => {


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{status === 'create'? 'Create' : 'Edit'} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={status === 'create' ? createCategory : editCategory}>
            <p>{categoryData.name}</p>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category name"
                value={categoryData.name}
                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
              />

              {/* setCategoryData('electronics)*/}
            </Form.Group>

            <button className='submitBtn' type="submit">
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryForm;
