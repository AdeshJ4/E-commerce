function createSearchParamsHelper (filterParams) {   // {"category": [ "men","kids"], "brand": [ "levi", "puma" ]}

  const queryParams = [];

  for(const [key, value] of Object.entries(filterParams)){  // key: 'category', 'brand'  -> value: ['men', 'kids'], ['levi', 'puma']
    if(Array.isArray(value) && value.length > 0){
      const paramValue = value.join(',');  // 1st: paramValue = men,kids    2nd : paramValue = levi,puma
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)  // [category=men%2Ckids, brand=levi%2Cpuma]
    };
  }


  return queryParams.join('&')  // [category=men%2Ckids, brand=levi%2Cpuma] => category=men%2Ckids&brand=levi%2Cpuma
}


export default createSearchParamsHelper;


/*
createSearchParamsHelper function converts an object containing filter parameters into a properly formatted query string.

The result will be: "category=men%2Ckids&brand=levi%2Cpuma"

final : https://shopify/shop/listing?category=men%2Ckids&brand=levi%2Cpuma

Explanation of the Output:
category=men%2Ckids: The , is encoded as %2C for safe URL transmission.
brand=levi%2Cpuma: Similar encoding is applied to the brand array.


*/