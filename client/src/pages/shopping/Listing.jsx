import ProductFilter from '@/components/shopping/filter'
import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon } from 'lucide-react';
import { sortOptions } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchProductDetails } from '@/store/slices/shop-slice/product-slice';
import ShoppingProductTile from '@/components/shopping/product-tile';
import { useSearchParams } from 'react-router-dom';
import createSearchParamsHelper from '@/helpers/searchParamsHelper';
import ProductDetailsDialog from '@/components/shopping/product-details';
import { addToCart } from '@/store/slices/shop-slice/cart-slice';
import { useToast } from '@/hooks/use-toast';


const ShoppingListing = () => {

  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(state => state.shopProducts);
  const { user } = useSelector(state => state.auth);
  const [filters, setFilters] = useState({});   // { "category": ["men", "women", "accessories"], "brand": ["nike", "adidas"] }
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();  
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);   
  const { toast } = useToast();

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllProducts({ filterParams: filters, sortParams: sort }))
        .then((data) => {
          if (data?.payload?.success === false) {
            toast({
              title: data?.payload?.message || 'Failed to fetched prducts',
              variant: 'destructive'
            })
          }
        })
    }
  }, [dispatch, sort, filters]);

  useEffect(()=>{
    setSort('price-lowtohigh'); 
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])

  useEffect(()=> {
    if(filters && Object.keys(filters).length > 0){      
      const createQueryString = createSearchParamsHelper(filters);      
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters]);

  useEffect(()=> {
    if(productDetails !== null){
      setOpenDetailsDialog(true);
    }
  }, [productDetails])
  

  const handleSort = (value) => {
    setSort(value)
  }

  
  const handleAddToCart = (getCurrentProductId) => {
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
    .then((data) => {

      console.log('data', data);
      
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

  function handleFilter (getSelectedSection, getSelectedSectionOption) { // category , men
    let cpyFilters = {...filters};   // cpyFilters = { category: ["men"], brand: [] }

    // checking category or brand present or not
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSelectedSection);  // ['category', 'brand'].indexOf(category)  ==> 0

    if(indexOfCurrentSection == -1){
      cpyFilters = {
        ...cpyFilters,
        [getSelectedSection]: [getSelectedSectionOption]
      }
    } else {
      const indexOfCurrentOption = cpyFilters[getSelectedSection].indexOf(getSelectedSectionOption);  // ["men"].indexOf(men)  == 0
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSelectedSection].push(getSelectedSectionOption);  // if you don't got that element that menas we want to add it 
      } else {
        cpyFilters[getSelectedSection].splice(indexOfCurrentOption, 1);  // if you got that element that menas we want to delete/unchecked  that element.
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters))
  }

  const handleGetProductDetails = (getCurrentProductId) => {    
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((product, i) => (
              <ShoppingProductTile
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
                key={i}
              />
              ))
            : null}
        </div>
      </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          product={productDetails}
        />
    </div>
  );
}

export default ShoppingListing