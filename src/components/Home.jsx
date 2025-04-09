import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Card, Container, Row, Col, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import CategoryDropdown from './CategoryDropdown';

function Home() {
    const dispatch = useDispatch();
    const divStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    const imgStyles = {
        maxWidth: '60%',
        height: 'auto',
        marginTop: '2rem',
        borderRadius: '8px'
    }

    const [selectedCategory, setSelectedCategory] = useState('');

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => {
            const url = selectedCategory 
                ? `${API_BASE_URL}/products/category/${selectedCategory}`
                : `${API_BASE_URL}/products`;
            return axios.get(url).then(res => res.data);
        }
    });

    return (
        <div style={divStyles}>
            <h1 className="my-5 display-3">Mini Project: E-Commerce API</h1>
            <p className="lead">Completed by Lauren Farrell</p>
            <img 
                src="/src/assets/photo.jpg" 
                alt="E-Commerce Illustration" 
                style={imgStyles}
            />

            <Container className="mt-5">
                <h2 className="mb-4">Our Products</h2>
                <CategoryDropdown 
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error loading products: {error.message}</Alert>}
                {products && (
                    <Row>
                        {products.map(product => (
                            <Col key={product.id} md={4} className="mb-4">
                                <Card className="h-100">
                                    <Card.Img 
                                        variant="top" 
                                        src={product.image} 
                                        style={{ height: '200px', objectFit: 'contain' }} 
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {product.category}
                                        </Card.Subtitle>
                                        <Card.Text className="flex-grow-1">
                                            {product.description}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Badge bg="warning" text="dark">
                                                Rating: {product.rating?.rate || 'N/A'}
                                            </Badge>
                                            <h5>${product.price}</h5>
                                        </div>
                                        <Button 
                                            variant="primary" 
                                            className="mt-3"
                                            onClick={() => dispatch(addItem(product))}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default Home;
