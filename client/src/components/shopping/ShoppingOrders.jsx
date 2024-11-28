import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./ShoppingOrderDetailsView";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderDetails} from "@/store/slices/shop-slice/order-slice";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrders(user.id));
    }
  }, [user?.id, dispatch]);

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
    setOpenDetailsDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDetailsDialog(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Card className="px-6 shadow-lg rounded-lg border border-gray-300 bg-white w-[893px]">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((order) => (
                    <TableRow key={order?._id}>
                      <TableCell>{order?._id}</TableCell>
                      <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge
                          className={`py-2 px-3 ${
                            order?.orderStatus === "confirmed"  ? "bg-green-500"  : "bg-[#FFC107]"   }`}
                        >
                          {order?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{order?.totalAmount}</TableCell>
                      <TableCell>
                        <Button  onClick={() => handleFetchOrderDetails(order?._id)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={openDetailsDialog} onOpenChange={handleDialogClose}>
      {orderDetails && (
            <ShoppingOrderDetailsView order={orderDetails} />
          )}
      </Dialog>
    </div>
  );
};

export default ShoppingOrders;