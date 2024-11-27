import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Dialog } from '../ui/dialog';
import ShoppingOrderDetailsView from './OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getOrderDetails } from '@/store/slices/shop-slice/order-slice';
import { Badge } from '../ui/badge';

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { orderList, orderDetails } = useSelector(state => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrders(user?.id));
  }, []);

  useEffect(() => {
    if(orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId))
  }

  console.log('orderDetails', orderDetails);
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Card className="px-6 shadow-lg rounded-lg border border-gray-300 bg-white w-[893px]">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            {/* Table Head */}
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Order date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((order) => (
                    <TableRow key={order?._id}>
                      <TableCell>{order?._id}</TableCell>
                      <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge className={`py-2 px-3 ${order?.orderStatus === 'confirmed' ? 'bg-green-500': 'bg-[#FFC107]'}`}>{order?.orderStatus}</Badge>
                      </TableCell>
                      <TableCell>{order?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={setOpenDetailsDialog}
                        >
                          <Button onClick={() => handleFetchOrderDetails(order?._id)}>
                            View Details
                          </Button>
                          <ShoppingOrderDetailsView />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShoppingOrders