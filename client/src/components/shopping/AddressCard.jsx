import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import PropTypes from 'prop-types';
import { Button } from '../ui/button';

const AddressCard = ({ address, handleDeleteAddress, handleEditAddress }) => {

  console.log('address: ', address);
  
  return (
    <Card>
        <CardContent className="grid gap-4 p-4">
          <Label>Address: {address?.address}</Label>
          <Label>City: {address?.city}</Label>
          <Label>Pincode: {address?.pincode}</Label>
          <Label>Phone: {address?.phone}</Label>
          <Label>Notes: {address?.notes}</Label>
        </CardContent>
        <CardFooter className="flex justify-between p-5">
          <Button onClick={() => handleEditAddress(address)} >Update</Button>
          <Button onClick={() => handleDeleteAddress(address)} >Delete</Button>
        </CardFooter>
    </Card>
  )
}

AddressCard.propTypes = {
  address: PropTypes.shape({
    _id: PropTypes.string,
    userId: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    pincode: PropTypes.string,
    notes: PropTypes.string 
  })
};


export default AddressCard