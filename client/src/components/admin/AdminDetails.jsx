import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    // Handle status update logic
  };

  return (
    <DialogContent className="sm:max-w-[600px] bg-gray-50 rounded-lg shadow-md p-10">
      <div className="h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-4">
        <div className="grid gap-6">
          {/* Order Summary */}
          <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Order ID</p>
                <Label className="font-semibold text-gray-800">1</Label>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Order Date</p>
                <Label className="font-semibold text-gray-800">22/06/2001</Label>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Order Status</p>
                <Label className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded">
                  In Progress
                </Label>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Order Price</p>
                <Label className="font-semibold text-green-600">$500</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Details */}
          <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Order Details</h2>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Product One</span>
                <span className="font-semibold text-gray-800">$100</span>
              </li>
              {/* Add more products here */}
            </ul>
          </div>

          <Separator />

          {/* Shipping Information */}
          <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Shipping Info</h2>
            <div className="grid gap-1 text-gray-600">
              <span>Adesh Jadhav</span>
              <span>Lohegaon</span>
              <span>Pune</span>
              <span>411047</span>
              <span>Near Datta Mandir</span>
            </div>
          </div>

          <Separator />

          {/* Admin Update Order Status */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "order status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;



// import React, { useState } from 'react'
// import { DialogContent } from '../ui/dialog'
// import { Label } from '../ui/label'
// import { Separator } from '../ui/separator'
// import CommonForm from '../common/form'


// const initialFormData = {
//     status: ''
// }


// const AdminOrderDetailsView = () => {

//     const [formData, setFormData] = useState(initialFormData);

//     const handleUpdateStatus = (event) => {
//         event.preventDefault();
//     }


//     return (
//         <DialogContent className="sm:max-w-[600ox]">
//             <div className="grid gap-6">
//                 <div className="grid gap-2">
//                     <div className="flex mt-7 items-center justify-between">
//                         <p className="font-medium">Order ID</p>
//                         <Label>1</Label>
//                     </div>
//                     <div className="flex mt-2 items-center justify-between">
//                         <p className="font-medium">Order Date</p>
//                         <Label>22/06/2001</Label>
//                     </div>
//                     <div className="flex mt-2 items-center justify-between">
//                         <p className="font-medium">Order Status</p>
//                         <Label>In Progress</Label>
//                     </div>
//                     <div className="flex mt-2 items-center justify-between">
//                         <p className="font-medium">Order Price</p>
//                         <Label>$500</Label>
//                     </div>
//                 </div>

//                 <Separator />

//                 {/* Order Details */}
//                 <div className="grid gap-4">
//                     <div className="grid gap-2">
//                         <div className="font-medium">Order Details</div>
//                         <ul className="grid gap-3">
//                             <li className="flex items-center justify-between">
//                                 <span>Product One</span>
//                                 <span>$100</span>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Shipping Information */}
//                 <div className='grid gap-4'>
//                     <div className='grid gap-2'>
//                         <div className='font font-medium'>Shipping Info</div>
//                         <div className='grid gap-0.5 text-muted-foreground'>
//                             <span>Adesh Jadhav</span>
//                             <span>Lohegaon</span>
//                             <span>Pune</span>
//                             <span>411047</span>
//                             <span>Near Datta Mandir</span>
//                         </div>
//                     </div>
//                 </div>



//                 {/* Admin can change Order Status */}
//                 <div>
//                     <CommonForm
//                         formControls={[
//                             {
//                                 label: 'Order Status',
//                                 name: 'status',
//                                 componentType: 'select',
//                                 options: [
//                                     { id: "pending", label: 'Pending' },
//                                     { id: "inProcess", label: 'In Process' },
//                                     { id: "inShipping", label: 'In Shipping' },
//                                     { id: "delivered", label: 'Delivered' },
//                                     { id: "rejected", label: 'Rejected' },
//                                 ]
//                             },
//                         ]}
//                         formData={formData}
//                         setFormData={setFormData}
//                         buttonText={'Update Order Status'}
//                         onSubmit={handleUpdateStatus}
//                     />
//                 </div>


//             </div>
//         </DialogContent>
//     );
// }

// export default AdminOrderDetailsView