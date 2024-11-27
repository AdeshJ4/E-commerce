import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/slices/shop-slice/order-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const paymentId = searchParams.get('paymentId');
  const payerId = searchParams.get('PayerID');
  
  
  useEffect(() => {
    if(paymentId && payerId){
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({paymentId, payerId, orderId})).then((data) => {
        if(data?.payload?.success){ 
          sessionStorage.removeItem('currentOrderId');
          window.location.href = '/shop/payment-success'
        }
      })
    }
  }, [paymentId, payerId, dispatch])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Please Wait</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturnPage 