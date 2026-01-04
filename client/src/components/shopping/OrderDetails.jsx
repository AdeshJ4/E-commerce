import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetailsView = () => {

    return (
        <DialogContent className="sm:max-w-[600px] bg-gray-50 rounded-lg shadow-md p-10">
            <div className="h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-4">
                <div className="grid gap-6">
                    {/* Order Summary Section */}
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

                    {/* Order Details Section */}
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

                    {/* Shipping Information Section */}
                    <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Shipping Info</h2>
                        <div className="grid gap-1 text-gray-600">
                            <span className="font-medium text-gray-800">Adesh Jadhav</span>
                            <span>Lohegaon</span>
                            <span>Pune</span>
                            <span>411047</span>
                            <span>Near Datta Mandir</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
};

export default ShoppingOrderDetailsView;