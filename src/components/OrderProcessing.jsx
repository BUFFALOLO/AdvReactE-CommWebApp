import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderProcessing() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form className="mx-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-4" md="4" controlId="validationCustom01">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter the name of the customer placing the order"
          />
        <Form.Control.Feedback type="invalid">
            Please provide a valid customer name.
        </Form.Control.Feedback>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" md="4" controlId="validationCustom02">
        <Form.Label>Product</Form.Label>
        <Form.Control
        required
        type="text"
        placeholder="Enter the name of the product you wish to order"
        />
        <Form.Control.Feedback type="invalid">
            Please provide a valid product name.
        </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Place Order</Button>
    </Form>
  );
}

export default OrderProcessing;