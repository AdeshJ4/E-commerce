import ProductDetailsDialog from '@/components/shopping/product-details';
import ShoppingProductTile from '@/components/shopping/product-tile';
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast';
import { addToCart, fetchCartItems } from '@/store/slices/shop-slice/cart-slice';
import { fetchProductDetails } from '@/store/slices/shop-slice/product-slice';
import { getSearchResults, resetSearchResults } from '@/store/slices/shop-slice/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchProducts = () => {

  const [searchText, setSearchText] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);  
  const [searchParams, setSearchparams] = useSearchParams();
  const { searchResults, error, isLoading } = useSelector(state => state.shopSearch);
  const { cartItems} = useSelector(state => state.shopCart);
  const { productDetails } = useSelector(state => state.shopProducts);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if(searchText && searchText.trim() !== "" && searchText.trim().length >= 3 ){
      setTimeout(() => {
        setSearchparams(new URLSearchParams(`?searchText=${searchText}`));
        dispatch(getSearchResults(searchText));
      }, 1000)
    }else{
      setSearchparams(new URLSearchParams(`?searchText=${searchText}`));
      dispatch(resetSearchResults())
    }
  }, [searchText]);

  useEffect(()=> {
    if(productDetails !== null){
      setOpenDetailsDialog(true);
    }
  }, [productDetails])


  const handleGetProductDetails = (getCurrentProductId) => {    
    dispatch(fetchProductDetails(getCurrentProductId))
  }



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
        dispatch(fetchCartItems(user?.id))
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


  if(error) {
    console.log('error in search ', error);
  }
  

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="p-6"
            placeholder="Search Products"
          />
        </div>
      </div>

      {!searchResults.length ? (
        <h1 className="text-5xl">No results found</h1>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-5">
        {searchResults.map((item, index) => (
          <ShoppingProductTile
            product={item}
            handleAddToCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
            key={index}
          />
        ))}
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        product={productDetails}
      />
    </div>
  );
}

export default SearchProducts