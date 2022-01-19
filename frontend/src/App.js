import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UsersListScreen from './screens/UsersListScreen';
import EditUserScreen from './screens/EditUserScreen';
import ProductsListScreen from './screens/ProductsListScreen';
import OrdersListScreen from './screens/OrdersListScreen';
import EditProductScreen from './screens/EditProductScreen';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />}>
              <Route path=':id' element={<CartScreen />} />
            </Route>
            <Route path='/admin/users' element={<UsersListScreen />} />
            <Route path='/admin/user/:id/edit' element={<EditUserScreen />} />

            <Route path='/admin/products' element={<ProductsListScreen />} />
            <Route path='/admin/orders' element={<OrdersListScreen />} />
            <Route
              path='/admin/product/:id/edit'
              element={<EditProductScreen />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
