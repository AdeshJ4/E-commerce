import React, { memo } from 'react'
import PropTypes from 'prop-types';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './cart-items-content';
import { useNavigate } from 'react-router-dom';

const UserCartWrapper = ({ cartItems }) => {

  const navigate = useNavigate();

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
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => (
            <UserCartItemsContent cartItem={item} key={index} />
          ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>

      <Button className="w-full mt-6" onClick={() => navigate("/shop/checkout")}>Checkout</Button>
    </SheetContent>
  );
}


UserCartWrapper.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      salePrice: PropTypes.number,
      totalStock: PropTypes.number,
      quantity: PropTypes.number,
    })
  )
};



export default memo(UserCartWrapper)