import { filterOptions } from '@/config'
import React from 'react'
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

const ProductFilter = ({filters, handleFilter}) => {
  // console.log('filters ProductFIlter', filters);  // filters = {"category": [ "men","kids"], "brand": [ "levi", "puma" ]}
  
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, index) => (   // keyItem = category/brand
          <div key={index}>
            <div className='mb-5'>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option, index) => (  // { id: "men", label: "Men" },
                  <Label
                    key={index}
                    className="flex items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={ filters[keyItem]?.indexOf(option.id) > -1 }  // ["men", "female"].indexOf("men")  ->   checked property accepts true false                                   
                      onCheckedChange={() => handleFilter(keyItem, option.id)}  // keyItem=category , option.id=men
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter