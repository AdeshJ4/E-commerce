import ProductFilter from '@/components/shopping/filter'
import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon } from 'lucide-react';
import { sortOptions } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '@/store/slices/shop-slice/product-slice';
import ShoppingProductTile from '@/components/shopping/product-tile';


const ShoppingListing = () => {

  const dispatch = useDispatch();
  const { isLoading, productList } = useSelector(state => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(()=>{
    setSort('price-lowtohigh'); 
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])

  console.log(filters, 'filters');
  

  const handleSort = (value) => {
    setSort(value)
  }

  function handleFilter (getSelectedSection, getSelectedSectionOption) {
    //getSectionId = getSelectedSection   &&    getCurrentOptions = getSelectedSectionOption
    // console.log(getSelectedSection, getSelectedSectionOption);
    let cpyFilters = {...filters};
    // checking category or brand present or not
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSelectedSection);

    if(indexOfCurrentSection == -1){
      cpyFilters = {
        ...cpyFilters,
        [getSelectedSection]: [getSelectedSectionOption]
      }
    } else {
      const indexOfCurrentOption = cpyFilters[getSelectedSection].indexOf(
        getSelectedSectionOption
      );
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSelectedSection].push(getSelectedSectionOption);
      } else {
        cpyFilters[getSelectedSection].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
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
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
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
                <ShoppingProductTile product={product} key={i}/>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing