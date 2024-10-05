const cart = {
    userId: 1001,
    items: [
      {
        productId: {
          _id: 1,
          image: "image1.png",
          title: "Product 1",
          price: 100,
          salePrice: 90,
          totalStock: 100,
        },
        quantity: 57
      },
      {
        productId: {
          _id: 2,
          image: "image2.png",
          title: "Product 2",
          price: 50,
          salePrice: 45,
          totalStock: 200,
        },
        quantity: 20
      },
      {
        productId: null,  // Product 3 was deleted
        quantity: 40
      },
      {
        productId: null,  // Product 4 was deleted
        quantity: 51
      }
    ]
  };
  

  const validItems = cart.items.filter((product) => product.productId);

  console.log(validItems);
  