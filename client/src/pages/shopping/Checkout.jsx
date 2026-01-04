import React from 'react'
import img from '../../assets/account.jpg';
import Addresses from '@/components/shopping/Addresses';
import { useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping/UserCartItemsContent';
import { Button } from '@/components/ui/button';

const ShoppingCheckout = () => {

  const { cartItems } = useSelector(state => state.shopCart);

  const totalCartAmount =
    cartItems.length > 0
      ? cartItems.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) *
          currentItem?.quantity,
        0 // Initial value for reduce
      )
      : 0;


  return (
    <div className='flex flex-col'>
      {/* image */}
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} className='h-full w-full object-cover object-center' />
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Addresses />
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
            <Button className='mt-4 w-full'>Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout