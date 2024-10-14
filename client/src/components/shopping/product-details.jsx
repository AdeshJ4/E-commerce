import React from 'react'
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { StarIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/shop-slice/cart-slice';
import { useToast } from '@/hooks/use-toast';

const ProductDetailsDialog = ({ product, open, setOpen }) => {

  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector(state => state.auth)

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message
          });
        } else {
          toast({
            title: data?.payload?.message || 'Failed to add item to cart',
            variant: 'destructive'
          });
        }
      })
  };

  function handleDialogClose() {
    setOpen(false);
    // dispatch(setProduct)
  }


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      {/* <DialogContent className='grid grid-cols-2 gap-8 sm:p-5 max-w-[80vw] sm:max-w-[70vw] lg:max-w-[60vw]'> */}
      <DialogContent className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-[95vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
        <div className='relative overflow-hidden'>
          <img src={product?.image} alt={product?.title} className='aspect-square object-cover rounded-lg' />
        </div>
        <div className=''>
          <div>
            <DialogTitle>
               <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold'>{product?.title}</h1>
            </DialogTitle>
             <p className='text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-5 mt-3 sm:mt-5'>{product?.description}</p>
          </div>

          <div className='flex items-center justify-between'>
            <p className={`${product?.salePrice > 0 ? 'line-through': ''} text-3xl font-bold text-primary`}>${product?.price}</p>
            {
              product?.salePrice > 0 ? <p className='text-2xl font-bold'>${product.salePrice}</p> : null
            }
          </div>

          <div className='flex items-center gap-2 mt-2'>
            <div className='flex items-center gap-0.5'>
              <StarIcon className='w-5 h-5 fill-primary' />
              <StarIcon className='w-5 h-5 fill-primary' />
              <StarIcon className='w-5 h-5 fill-primary' />
              <StarIcon className='w-5 h-5 fill-primary' />
              <StarIcon className='w-5 h-5 fill-primary' />
            </div>
            <span className='text-muted-foreground'>(4.5)</span>
          </div> 
          <div className='mt-5 mb-5'>
            <Button onClick={() => handleAddToCart(product?._id)} className='w-full'>Add to Cart</Button>
          </div>

          <Separator />

          {/* <div className='max-h-[300px] overflow-auto'> */}
          <div className='max-h-[200px] sm:max-h-[300px] overflow-auto mt-4'>
            {/* <h2 className='text-xl font-bold mb-4'>Reviews</h2> */}
            <h2 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4'>Reviews</h2>
            <div className='grid gap-6'>
              <div className='flex gap-4'>
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-bold'>Anurag Mishra</h3>
                  </div>
                  <p className='text-muted-foreground'>This is awesome project</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-bold'>Adesh Jadhav</h3>
                  </div>
                  <p className='text-muted-foreground'>Quality is Good</p>
                </div>
              </div>
            </div>

            {/* You have to buy the product to write review */}
            <div className='mt-6 flex gap-2'>
              <Input placeholder="Write a review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

ProductDetailsDialog.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
    totalStock: PropTypes.number
  }),
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};


export default ProductDetailsDialog