import { useLocation, Navigate } from "react-router-dom";
 

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();


  

  // is user is not Authenticated and he is trying to access any other page rather than login and register then : 
  if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
    return <Navigate to='/auth/login' />
  }

  // IF USER IS AUTHENTICATED AND TRYING TO ACCESS LOGIN PAGE OR REGISTER PAGE THEN BASED ON HIS ROLE REDIRECT THEM :
  if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
    if (user?.role === 'admin') {
      return <Navigate to='/admin/dashboard' />
    } else {
      return <Navigate to='/shop/home' />
    } 
  }

  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
    return <Navigate to='/unauth-page' />
  }


  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
    return <Navigate to='/admin/dashboard' />
  }


  return <>{children}</>;

}


export default CheckAuth;