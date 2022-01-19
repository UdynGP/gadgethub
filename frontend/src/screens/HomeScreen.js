import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const search = new URLSearchParams(location.search).get('keyword');
  const keyword = search ? search : '';

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}

      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error}
          {'!!'}
        </Message>
      ) : (
        <div>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <Message variant='info'>{`No Product Found for '${search}'`}</Message>
            )}
          </Row>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
