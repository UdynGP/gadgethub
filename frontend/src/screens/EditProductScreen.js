import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function EditProductScreen() {
  const params = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success } = productUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/products');
    } else {
      if (!product.name || product._id !== Number(params.id)) {
        dispatch(listProductDetails(params.id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, params.id, navigate, dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: params.id,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();

    formdata.append('image', file);
    formdata.append('product_id', params.id);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        '/api/products/upload/',
        formdata,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    userInfo.isAdmin && (
      <div>
        <Link to='/admin/products'>
          <Button variant='outline-dark' className='my-3'>
            Go Back
          </Button>
        </Link>

        <FormContainer>
          <h1>Edit Product</h1>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Product Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='price' className='my-2'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='image' className='my-2'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Product Image'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>

                <Form.Control
                  type='file'
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.Control>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId='category' className='my-2'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='brand' className='my-2'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock' className='my-2'>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='description' className='my-2'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={4}
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='dark' className='my-3 w-100'>
                Save
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    )
  );
}

export default EditProductScreen;
