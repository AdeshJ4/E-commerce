import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Dialog } from '../ui/dialog';
import ShoppingOrderDetailsView from './OrderDetails';

const ShoppingOrders = () => {


  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


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
                    <TableHead><span className='sr-only'>Details</span></TableHead>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>24-01-2001</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell>$12</TableCell>
                    <TableCell>
                      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                         
                      <Button onClick={() => setOpenDetailsDialog(true)}>View Details</Button>
                      <ShoppingOrderDetailsView />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
        </Card>
    </div>
);
}

export default ShoppingOrders