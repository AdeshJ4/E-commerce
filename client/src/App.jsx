import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin/layout';
import AdminDashBoard from './pages/admin/DashBoard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/AdminOrdersPage';
import AdminFeatures from './pages/admin/Features';
import ShoppingLayout from './components/shopping/layout';
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping/Home';
import ShoppingListing from './pages/shopping/Listing';
import ShoppingCheckout from './pages/shopping/Checkout';
import ShoppingAccount from './pages/shopping/Account';
import CheckAuth from './components/common/check-auth';
import UnAuth from './pages/unauth-page';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/slices/auth-slice';
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from './pages/shopping/PaypalReturn';
import PaymentSuccess from './pages/shopping/PaymentSuccess.jsx';
import PaymentFail from './pages/shopping/PaymentFail';
import AdminOrdersView from './components/admin/AdminOrdersView';


const App = () => {
  const { isAuthenticated, user, isLoading  } = useSelector(state => state.auth);


  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkAuth())
  }, [dispatch])


  if(isLoading) return <Skeleton className="w-full h-screen bg-black" />; 


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        {/* Protected the routes based on role */}

        {/* Auth related routes */}
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>

        {/* Admin related routes */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashBoard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrdersView />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>


        {/* Shop related routes */}
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='paypal-return' element={<PaypalReturnPage />} />
          <Route path='payment-success' element={<PaymentSuccess />} />
          <Route path='paypal-cancel' element={<PaymentFail />} />
        </Route>

        <Route path='/unauth-page' element={<UnAuth />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App