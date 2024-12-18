import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { DollarSign } from 'lucide-react'
import { brandOptionsMap, categoryOptionsMap } from '@/config'
import PropTypes from 'prop-types';

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddToCart }) => {
  const handleProductDetails = () => {
    handleGetProductDetails(product?._id);
  }
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={handleProductDetails}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg text-muted-foreground"> {categoryOptionsMap[product?.category]}</span>
            <span className="text-lg text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary flex`}
            >
              <DollarSign />
              {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary flex">
                <DollarSign />
                {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button onClick={() => handleAddToCart(product?._id)} className="w-full">Add to cart</Button>
      </CardFooter>
    </Card>
  );
}


ShoppingProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number, 
  }).isRequired,
  handleGetProductDetails: PropTypes.func,
  handleAddToCart: PropTypes.func,
};


export default ShoppingProductTile