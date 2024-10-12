import React from 'react';
import PropTypes from 'prop-types';
import { Minus, Plus, Trash } from 'lucide-react';
import { Button } from '../ui/button';

const UserCartItemsContent = ({ cartItem }) => { 
  
  return (
    <div className='flex  items-center space-x-4'>
      <img src={cartItem?.image} alt={cartItem?.title} className='w-20 h-20 rounded object-cover'/>
      <div className='flex-1'>
        <h3 className='font-extrabold'>{cartItem?.title}</h3>
        <div className='flex items-center mt-1 gap-2'>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Minus className='w-4 h-4' />
            <span className='sr-only'>Decrease</span>
          </Button>
          <span className='font-semibold'>{cartItem?.quanity}</span>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Plus className='w-4 h-4' />
            <span className='sr-only'>Increase</span>
          </Button>
        </div>

        <div className='flex flex-col items-end'>
          <p className='font-semibold'>${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quanity).toFixed(2)}</p>
          <Trash className='cursor-pointer mt-1' size={20}/>       
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


export default UserCartItemsContent