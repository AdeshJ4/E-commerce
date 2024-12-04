import React, { useState } from 'react'
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
import { Label } from '../ui/label';
import StarRating from '../common/StarRating';
import { addReview } from '@/store/slices/shop-slice/review-slice';

const ProductDetailsDialog = ({ product, open, setOpen }) => {

  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.shopCart);

  const handleAddToCart = (getCurrentProductId, getCurrentProductTotalStock) => {


    const getCartItems = cartItems?.items || [];
    
    if(getCartItems.length){
      const indexOfCurrentItem  = getCartItems.findIndex(item => item.productId === getCurrentProductId);

      if(indexOfCurrentItem > -1){
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if(getQuantity + 1 > getCurrentProductTotalStock){  // 6 > 5
          toast({
            title: `Only ${getQuantity} quantity can be added for this product`,
            variant: "destructive" 
          });
          return;
        }
      }
    }


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
    setRating(0);
    setReviewMsg("")
  }

  function handleRatingChange (getRating){
    console.log('getRating', getRating);
    
    setRating(getRating)
  }


  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: product?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    );
    handleDialogClose();
  };


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-[95vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="aspect-square object-cover rounded-lg"
          />
        </div>
        <div className="">
          <div>
            <DialogTitle>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                {product?.title}
              </h1>
            </DialogTitle>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-5 mt-3 sm:mt-5">
              {product?.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-3xl font-bold text-primary`}
            >
              ${product?.price}
            </p>
            {product?.salePrice > 0 ? (
              <p className="text-2xl font-bold">${product.salePrice}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            {product?.totalStock === 0 ? (
              <Button className="w-full cursor-not-allowed opacity-65">
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() => handleAddToCart(product?._id, product?.totalStock)}
                className="w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator />

          <div className="max-h-[200px] sm:max-h-[300px] overflow-auto mt-4">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Reviews
            </h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Anurag Mishra</h3>
                  </div>
                  <p className="text-muted-foreground">
                    This is awesome project
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Adesh Jadhav</h3>
                  </div>
                  <p className="text-muted-foreground">Quality is Good</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-2">
              <Label>Write a review</Label>
              <div className='flex'>
                <StarRating rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input name="reviewMsg" value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} placeholder="Write a review..." />
              <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>Submit</Button> 
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
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