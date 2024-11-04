import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { Button } from '@/components/ui/button';
import { BabyIcon, Bitcoin, Check, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Footprints, Glasses, Shirt, ShirtIcon, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '@/store/slices/shop-slice/product-slice';
import ShoppingProductTile from '@/components/shopping/product-tile';
import { useNavigate } from 'react-router-dom';

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Check },
  { id: "adidas", label: "Adidas", icon: Footprints },
  { id: "puma", label: "Puma", icon: Bitcoin },
  { id: "levi", label: "Levi", icon: Glasses },
  { id: "zara", label: "Zara", icon: Shirt },
  { id: "h&m", label: "H&M", icon: WashingMachine },
];

const slides = [bannerOne, bannerTwo, bannerThree];


const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(state => state.shopProducts);
  const navigate = useNavigate()

  console.log('productList, productDetails', productList, productDetails);


  const handleLeftSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)
  };

  const handleRightSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)
  };


  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)
    }, 3500);

    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])


  const handleNavigateToListingPage = (getCurrentItem, section) => {
    console.log('getCurrentItem, section', getCurrentItem, section);

    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(`/shop/listing`)
  }


  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[625px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        {/* Left Icon */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleLeftSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        {/* Right Icon */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleRightSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Shop by Category section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem, index) => (
              <Card
                onClick={() => handleNavigateToListingPage(categoryItem, 'category')}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={index}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Shop by brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem, index) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={index}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Feature Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                <ShoppingProductTile product={productItem} />
              ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome