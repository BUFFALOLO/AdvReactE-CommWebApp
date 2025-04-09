import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateProductForm() {
  const [validated, setValidated] = useState(false);
  const {id} = useParams();
  const [newProduct, setNewProduct] = useState({ 
    title: "", 
    price: "", 
    description: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    category: "electronics"
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidated(true);

    if (!newProduct.title.trim() || !newProduct.price.trim()) {
      setError("All fields must be filled out correctly.");
      setSuccess("");
      return;
    }

    if (form.checkValidity() === false) {
      return;
    }

    await UpdateProduct();
  };

  const UpdateProduct = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, newProduct);
      setNewProduct({ 
        title: "", 
        price: "", 
        description: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        category: "electronics"
      }); 
      setSuccess("Product updated successfully!");
      setError("");
      setValidated(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Form className="mx-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-4" md="4" controlId="validationCustom01">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter product title"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
          />
        <Form.Control.Feedback type="invalid">
            Please provide a valid product title.
        </Form.Control.Feedback>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" md="4" controlId="validationCustom01">
          <Form.Label>New Product Price</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter new product price"
            pattern="[0-9]+(\.[0-9]{1,2})?"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        <Form.Control.Feedback type="invalid">
            Please provide a valid decimal number for a price.
        </Form.Control.Feedback>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" md="4" controlId="validationCustom02">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button type="submit">Update Product</Button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
    </Form>
  );
}

export default UpdateProductForm;
