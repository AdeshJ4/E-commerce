import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Minus, Plus, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartItems } from '@/store/slices/shop-slice/cart-slice';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';


const UserCartItemsContent = ({ cartItem }) => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { toast } = useToast();
  const { isLoadingDelete, isLoadingUpdate } = useSelector(state => state.shopCart);

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem({ userId: user?.id, productId: cartItem?.productId }))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message
          });
        } else {
          toast({
            title: data?.payload?.message || 'Failed to delete item from cart',
            variant: 'destructive'
          });
        }
      })
  }

  const handleUpdateQuantity = (value) => {
    console.log('value', value);
    console.log('cartItem?.quantity', cartItem?.quantity);


    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          value === "plus" ? cartItem?.quantity + 1 : cartItem.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message
        });
      } else {
        toast({
          title: data?.payload?.message || 'Failed to update quantity',
          variant: 'destructive'
        });
      }
    });
  }

  if (isLoadingUpdate || isLoadingDelete) return <Spinner />;

  return (
    <div className='flex items-center space-x-4 px-5 py-3 rounded-lg border border-gray-300 bg-white'>
      <img src={cartItem?.image} alt={cartItem?.title} className='w-20 h-20 rounded object-cover' />
      <div className='flex-1'>
        <div className='flex justify-between'>
          <h3 className='font-extrabold'>{cartItem?.title}</h3>
          <Trash onClick={handleDeleteCartItem} className='cursor-pointer mt-1' size={20} />
        </div>

        <div className='flex items-center mt-1 gap-2'>
          <Button onClick={() => handleUpdateQuantity("minus")} disabled={cartItem?.quantity === 1} variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Minus className='w-4 h-4' />
            <span className='sr-only'>Decrease</span>
          </Button>
          <span className='font-semibold'>{cartItem?.quantity}</span>
          <Button onClick={() => handleUpdateQuantity("plus")} variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Plus className='w-4 h-4' />
            <span className='sr-only'>Increase</span>
          </Button>
        </div>

        <div className="relative">
          <p className="absolute right-0 bottom-1">
            ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

UserCartItemsContent.propTypes = {
  productId: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  salePrice: PropTypes.number,
  totalStock: PropTypes.number,
  quantity: PropTypes.number
};


export default memo(UserCartItemsContent)