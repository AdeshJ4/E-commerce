import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
    addNewAddress,
    deleteAddress,
    editAddress,
    fetchAllAddresses,
} from "@/store/slices/shop-slice/address-slice";
import { toast } from "@/hooks/use-toast";
import AddressCard from "./AddressCard";

const initialFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
};

const Addresses = () => {
    const [formData, setFormData] = useState(initialFormData);
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
    const [currentEditId, setCurrentEditId] = useState(null);
    const dispatch = useDispatch();

    const handleManageAddress = (event) => {
        event.preventDefault();

        if(addressList.length >= 3 && currentEditId === null){
            setFormData(initialFormData);
            toast({
                title: "You can add max 3 addresses",
                variant: "destructive",
            });

            return;
        }
        currentEditId ? dispatch(editAddress({ userId: user?.id, addressId: currentEditId, formData })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id));
                setCurrentEditId(null);
                setFormData(initialFormData);
                toast({
                    title: data?.payload?.message,
                });
            }else{
                toast({
                    title: data?.payload?.message || "Failed to Edit Address",
                    variant: "destructive",
                });
            }
        }) : dispatch(addNewAddress({ ...formData, userId: user?.id })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user.id));
                setFormData(initialFormData); // clear the form
                toast({
                    title: data?.payload?.message,
                });
            } else {
                toast({
                    title: data?.payload?.message || "Failed to Add Address",
                    variant: "destructive",
                });
            }
        });
    };

    // return true or false, true
    const isFormValid = () => {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    };

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id));
    }, [dispatch]);

    console.log("addressList", addressList);

    const handleEditAddress = (getCurrentAddress) => {
        setCurrentEditId(getCurrentAddress?._id);
        setFormData({
            //   ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes,
        });
    };

    const handleDeleteAddress = (getCurrentAddress) => {
        dispatch(
            deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
        ).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Address deleted successfully"
                })
            }else{
                toast({
                    title: "Failed to delete Address",
                    variant: "destructive",
                });
            }
            dispatch(fetchAllAddresses(user?.id));
        });
    };

    return (
        <Card>
            <div className="mb-3 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {addressList && addressList.length > 0
                    ? addressList.map((address) => (
                        <AddressCard
                            address={address}
                            handleDeleteAddress={handleDeleteAddress}
                            key={address._id}
                            handleEditAddress={handleEditAddress}
                        />
                    ))
                    : null}
            </div>

            <CardHeader>
                <CardTitle>{currentEditId ? "Edit Address" : "Add New Address"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditId ? "Edit" : "Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
};

export default Addresses;
