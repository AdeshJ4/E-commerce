const arr = [
  {
      "productId": "66f7e4b0e36cbb2426028aaf",
      "image": "http://res.cloudinary.com/dytygoezb/image/upload/v1727521960/zijj9898yskkwos8sd8m.jpg",
      "title": "Sun Glasses",
      "price": 90,
      "salePrice": 60,
      "totalStock": 1,
      "quantity": 4
  },
  {
      "productId": "66f7e547e36cbb2426028abd",
      "image": "http://res.cloudinary.com/dytygoezb/image/upload/v1727522092/vrcak5pci8vazwptwsxu.jpg",
      "title": "One Piece",
      "price": 20,
      "salePrice": 50,
      "totalStock": 10,
      "quantity": 9
  }
]


const total = arr.reduce((acc, curEle) => {
  return acc + (curEle.salePrice > 0 ? curEle?.salePrice : curEle?.price) * curEle?.quantity;
})

console.log(total);
