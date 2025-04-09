import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Form } from 'react-bootstrap';

function CategoryDropdown({ selectedCategory, onCategoryChange }) {
    const { data: categories, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get(`${API_BASE_URL}/products/categories`).then(res => res.data)
    });

    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories</div>;

    return (
        <Form.Select 
            aria-label="Select category" 
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="mb-4"
        >
            <option value="">All Categories</option>
            {categories?.map(category => (
                <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
            ))}
        </Form.Select>
    );
}

export default CategoryDropdown;
