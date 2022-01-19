import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_RESET_PROFILE } from '../constants/userConstants';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [successmessage, setSuccessMessage] = useState('');
  const [failuremessage, setFailureMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrders = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({
          type: USER_RESET_PROFILE,
        });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, dispatch, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      oldpassword === newpassword &&
      oldpassword !== '' &&
      newpassword !== ''
    ) {
      setFailureMessage('Please update with a different password');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: newpassword,
        })
      );
      setSuccessMessage('Profile Updated');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {successmessage && (
          <Message variant='success'>{successmessage}</Message>
        )}
        {failuremessage && <Message variant='danger'>{failuremessage}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password' className='my-2'>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type='password'
              value={oldpassword}
              onChange={(e) => setOldPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='newpassword' className='my-2'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='dark' className='my-3 w-100'>
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : orders.length < 1 ? (
          <Message variant='info'>No current orders</Message>
        ) : (
          <Table striped responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn btn-secondary btn-sm w-100'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
