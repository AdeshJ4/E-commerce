import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { getAllOrdersForAdmin, updateOrderStatusForAdmin } from "@/store/slices/admin-slice/order-slice";
import StatusBadge from "../common/StatusBadge";
import { toast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};




const AdminOrderDetailsView = ({ order, handleDialogClose }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    const { status } = formData;
    dispatch(updateOrderStatusForAdmin({ orderId: order._id, orderStatus: status })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message
        })
      }else{
        toast({
          title: data?.payload?.message || "Failed to Update Status",
          variant: "destructive",
      });
      }
    });

    handleDialogClose();
  };

  return (
    <DialogContent className="sm:max-w-[600px] bg-gray-50 rounded-lg shadow-md p-10">
      <div className="h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-4">
        <div className="grid gap-6">
          <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <DialogTitle className="text-lg font-semibold text-gray-800">Order Summary</DialogTitle>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Order ID</p>
                <Label className="font-semibold text-gray-800">{order?._id}</Label>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Order Date</p>
                <Label className="font-semibold text-gray-800">{order?.orderDate.split("T")[0]}</Label>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Order Status</p>
                <StatusBadge orderStatus={order?.orderStatus} />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Order Price</p>
                <Label className="font-semibold text-green-600">${order?.totalAmount}</Label>
              </div>
            </div>
          </div>


          <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <DialogTitle className="text-lg font-semibold text-gray-800">Order Details</DialogTitle>
            <ul className="grid gap-3">
              {order?.cartItems.map((cart) => (
                <li
                  className="grid grid-cols-3 items-center justify-between gap-4 p-2 border-b border-gray-200"
                  key={cart?._id}
                >
                  <span className="text-gray-700">Title: {cart?.title}</span>
                  <span className="text-gray-700">Quantity: {cart?.quantity}</span>
                  <span className="font-semibold text-gray-800 text-right">
                    Amount: ${cart?.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>


          <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <DialogTitle className="text-lg font-semibold text-gray-800">Shipping Info</DialogTitle>
            <div className="grid gap-1 text-gray-600">
              <span className="font-medium text-gray-800">{user?.userName}</span>
              <span>{order?.addressInfo?.address}</span>
              <span>{order?.addressInfo?.city}</span>
              <span>{order?.addressInfo?.pincode}</span>
              <span>{order?.addressInfo?.phone}</span>
              <span>{order?.addressInfo?.notes}</span>
            </div>
          </div>


          <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <DialogTitle className="text-lg font-semibold text-gray-800">Payment Info</DialogTitle>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Payment Method:</p>
                <Label className="font-semibold text-gray-800">{order?.paymentMethod}</Label>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-600">Payment Status:</p>
                <Label className={`font-semibold ${order?.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}>{order?.paymentStatus}</Label>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "confirmed", label: "Confirmed" },
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


AdminOrderDetailsView.propTypes = {
  order: PropTypes.shape({
    addressInfo: PropTypes.shape({
      addressId: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      pincode: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      notes: PropTypes.string,
    }).isRequired,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    cartId: PropTypes.string.isRequired,
    cartItems: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    orderStatus: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    orderDate: PropTypes.string.isRequired,
    orderUpdateDate: PropTypes.string.isRequired,
    paymentId: PropTypes.string.isRequired,
    payerId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
  handleDialogClose: PropTypes.func.isRequired,
};

export default AdminOrderDetailsView;
