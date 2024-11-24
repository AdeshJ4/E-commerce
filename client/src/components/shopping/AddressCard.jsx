import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import PropTypes from "prop-types";
import { Button } from "../ui/button";

const AddressCard = ({ address, handleDeleteAddress, handleEditAddress }) => {
  return (
    <Card className="h-full flex flex-col border border-gray-300 shadow-lg hover:shadow-xl transition-shadow rounded-lg bg-white">
      <CardContent className="grid gap-2 p-4 flex-1">
        <Label className="font-semibold text-gray-600 text-sm">
          Address: <span className="font-normal text-gray-800">{address?.address}</span>
        </Label>
        <Label className="font-semibold text-gray-600 text-sm">
          City: <span className="font-normal text-gray-800">{address?.city}</span>
        </Label>
        <Label className="font-semibold text-gray-600 text-sm">
          Pincode: <span className="font-normal text-gray-800">{address?.pincode}</span>
        </Label>
        <Label className="font-semibold text-gray-600 text-sm">
          Phone: <span className="font-normal text-gray-800">{address?.phone}</span>
        </Label>
        <Label className="font-semibold text-gray-600 text-sm">
          Notes: <span className="font-normal text-gray-800">{address?.notes}</span>
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t border-gray-200">
        <Button
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition"
          onClick={() => handleEditAddress(address)}
        >
          Update
        </Button>
        <Button
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 transition"
          onClick={() => handleDeleteAddress(address)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

AddressCard.propTypes = {
  address: PropTypes.shape({
    _id: PropTypes.string,
    userId: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    pincode: PropTypes.string,
    notes: PropTypes.string,
  }),
};

export default AddressCard;





// import React from 'react'
// import { Card, CardContent, CardFooter } from '../ui/card'
// import { Label } from '../ui/label'
// import PropTypes from 'prop-types';
// import { Button } from '../ui/button';

// const AddressCard = ({ address, handleDeleteAddress, handleEditAddress }) => {

//   console.log('address: ', address);

//   return (
//     <Card>
//         <CardContent className="grid gap-4 p-4">
//           <Label>Address: {address?.address}</Label>
//           <Label>City: {address?.city}</Label>
//           <Label>Pincode: {address?.pincode}</Label>
//           <Label>Phone: {address?.phone}</Label>
//           <Label>Notes: {address?.notes}</Label>
//         </CardContent>
//         <CardFooter className="flex justify-between p-5">
//           <Button onClick={() => handleEditAddress(address)} >Update</Button>
//           <Button onClick={() => handleDeleteAddress(address)} >Delete</Button>
//         </CardFooter>
//     </Card>
//   )
// }

// AddressCard.propTypes = {
//   address: PropTypes.shape({
//     _id: PropTypes.string,
//     userId: PropTypes.string,
//     address: PropTypes.string,
//     city: PropTypes.string,
//     phone: PropTypes.string,
//     pincode: PropTypes.string,
//     notes: PropTypes.string
//   })
// };

// export default AddressCard
