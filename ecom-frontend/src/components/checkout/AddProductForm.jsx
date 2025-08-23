// src/components/AddProductForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addProduct, fetchCategories } from '../redux/actions/productActions';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress } from '@mui/material';

const AddProductForm = ({ onClose }) => {
  const [productData, setProductData] = useState({
    productName: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: '',
  });
  const [categoryId, setCategoryId] = useState('');
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useSelector((state) => state.products);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setErrors({ ...errors, categoryId: '' });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!productData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!productData.price || Number(productData.price) <= 0) newErrors.price = 'Price must be a positive number';
    if (!productData.quantity || Number(productData.quantity) < 0) newErrors.quantity = 'Quantity must be a non-negative number';
    if (!categoryId) newErrors.categoryId = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedProductData = {
      productName: productData.productName,
      description: productData.description,
      price: Number(productData.price),
      quantity: Number(productData.quantity),
      imageUrl: productData.imageUrl || undefined,
    };

    console.log('Submitting:', { categoryId, productData: formattedProductData });

    try {
      await dispatch(addProduct(categoryId, formattedProductData, toast, navigate, setLoader));
      if (onClose) onClose();
    } catch (error) {
      console.error('Dispatch error:', error);
      setLoader(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem', maxWidth: '500px', margin: 'auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add New Product</h2>
      {categoriesLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            label="Product Name"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.productName}
            helperText={errors.productName}
          />
          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 0, step: 0.01 }}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={productData.quantity}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 0 }}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth required error={!!errors.categoryId}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryId}
              onChange={handleCategoryChange}
              label="Category"
              disabled={categoriesLoading}
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && <p style={{ color: 'red', fontSize: '0.75rem' }}>{errors.categoryId}</p>}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loader || categoriesLoading}
            fullWidth
          >
            {loader ? 'Adding...' : 'Add Product'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;