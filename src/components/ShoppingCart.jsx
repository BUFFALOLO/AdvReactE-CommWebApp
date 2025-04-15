import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { Card, Container, Button, Table, Badge, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => 
    state.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );
  const totalQuantity = useSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity: Number(quantity) }));
    }
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
    setCheckoutSuccess(true);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      {checkoutSuccess && (
        <Alert variant="success" onClose={() => setCheckoutSuccess(false)} dismissible>
          Checkout successful! Your cart has been cleared.
        </Alert>
      )}
      {items.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: '50px', marginRight: '10px' }}
                      />
                      {item.title}
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      style={{ width: '70px' }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end">
            <h5>Total Items: {totalQuantity}</h5>
            <h4>Total: ${total.toFixed(2)}</h4>
            <div className="mt-3">
              <Button variant="success" className="me-2" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline-danger" 
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default ShoppingCart;
