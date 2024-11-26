import React, { useState } from 'react'
import img from '../../assets/account.jpg';
import Addresses from '@/components/shopping/Addresses';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping/UserCartItemsContent';
import { Button } from '@/components/ui/button';
import { createNewOrder } from '@/store/slices/shop-slice/order-slice';

const ShoppingCheckout = () => {

  const { cartItems } = useSelector(state => state.shopCart);
  const { user } = useSelector(state => state.auth);
  const { approvalURL } = useSelector(state => state.shopOrder)  
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null); 
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const dispatch = useDispatch();

  console.log('cartItems' , cartItems);
  


  const totalCartAmount =
    cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;


  const handleInitiatePaypalPayment = () => {
    const orderData = {
      userId: user?.id,
      cartId: cartItems._id,
      cartItems: cartItems.map(cart => ({ 
        productId: cart?.productId,
        title: cart?.title,
        image: cart?.image,
        price: cart?.salePrice > 0 ? cart?.salePrice : cart?.price,
        quantity: cart?.quantity
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate:  new Date(),
      paymentId: '',
      payerId: '',
    }

    console.log('order Data ', orderData);
    dispatch(createNewOrder(orderData)).then((data) => {
      if(data?.payload?.success){
        setIsPaymentStart(true);
      }else{
        setIsPaymentStart(false);
      }
    })
  }


  if(approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className='flex flex-col'>
      {/* image */}
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} className='h-full w-full object-cover object-center' />
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        {/* Address Component */}
        <Addresses setCurrentSelectedAddress={setCurrentSelectedAddress}/>
        {/* Cart Items */}
        <div className='flex flex-col gap-4 px-8 py-3 shadow-lg rounded-lg border border-gray-300 bg-white'>
          {cartItems.map(cartItem => <UserCartItemsContent cartItem={cartItem} />)}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div>
            <Button onClick={handleInitiatePaypalPayment} className='mt-4 w-full'>Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout



/*

for the first time when you click on Checkout button we have to set some data to static.


*/