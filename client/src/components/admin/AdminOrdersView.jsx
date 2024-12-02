import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog } from '../ui/dialog';
import AdminOrderDetailsView from './AdminDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForAdmin, getOrderDetailsForAdmin } from '@/store/slices/admin-slice/order-slice';
import { toast } from '@/hooks/use-toast';
import StatusBadge from '../common/StatusBadge';

const AdminOrdersView = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { orderDetails, orderList, isLoading, error } = useSelector(state => state.adminOrder);


  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);


  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetailsForAdmin(orderId));
    setOpenDetailsDialog(true);
  };


  const handleDialogClose = () => {
    setOpenDetailsDialog(false);
  };


  if (isLoading) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>
  }

  if (error) {
    toast({
      title: error,
      variant: "destructive",
    });
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Card className=" px-6 shadow-lg rounded-lg border border-gray-300 bg-white w-full">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Order date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead><span className='sr-only'>Details</span></TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <StatusBadge orderStatus={order?.orderStatus} />
                    </TableCell>
                    <TableCell>{order?.totalAmount}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleFetchOrderDetails(order?._id)}>
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


      <Dialog open={openDetailsDialog && orderDetails} onOpenChange={handleDialogClose}>
        {orderDetails && (
          <AdminOrderDetailsView order={orderDetails} handleDialogClose={handleDialogClose} />
        )}
      </Dialog>
    </div>
  )
}

export default AdminOrdersView