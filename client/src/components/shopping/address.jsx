import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'


const initialFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: ""
}


const Address = () => {

    const [formData, setFormData] = useState(initialFormData);

    const handleManageAddress = (event) => {
        event.preventDefault();
    }

  return (
    <Card>
        <div>
            Address List
        </div>

        <CardHeader>
            <CardTitle>Add New Address</CardTitle>            
        </CardHeader>
        <CardContent className="space-y-3">
            <CommonForm 
                formControls={addressFormControls} 
                formData={formData}
                setFormData={setFormData}
                buttonText={"Add"}
                onSubmit={handleManageAddress}
            />
        </CardContent>
    </Card>
  )
}

export default Address