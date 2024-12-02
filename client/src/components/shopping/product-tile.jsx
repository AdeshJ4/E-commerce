import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { DollarSign } from 'lucide-react';
import { brandOptionsMap, categoryOptionsMap } from '@/config';
import PropTypes from 'prop-types';

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddToCart }) => {
  const handleProductDetails = () => handleGetProductDetails(product?._id);

  const renderBadge = () => {
    if (product?.totalStock === 0) {
      return <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Out of Stock</Badge>;
    }
    if (product?.totalStock <= 10) {
      return <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">Only {product?.totalStock} left</Badge>;
    }
    if (product?.salePrice > 0) {
      return <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">Sale</Badge>;
    }
    return null;
  };

  const renderPrice = () => (
    <div className="flex justify-between items-center mb-2">
      <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary flex`}>
        <DollarSign />
        {product?.price}
      </span>
      {product?.salePrice > 0 && (
        <span className="text-lg font-semibold text-primary flex">
          <DollarSign />
          {product?.salePrice}
        </span>
      )}
    </div>
  );

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={handleProductDetails} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {renderBadge()}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title || 'Product Title'}</h2>
          <div className="flex justify-between items-center mb-2 text-muted-foreground">
            <span>{categoryOptionsMap[product?.category] || 'Category'}</span>
            <span>{brandOptionsMap[product?.brand] || 'Brand'}</span>
          </div>
          {renderPrice()}
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-65 cursor-not-allowed">
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => handleAddToCart(product?._id, product?.totalStock)} className="w-full">
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

ShoppingProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
    totalStock: PropTypes.number,
  }).isRequired,
  handleGetProductDetails: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default ShoppingProductTile;