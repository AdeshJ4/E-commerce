import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog } from '../ui/dialog';
import AdminOrderDetailsView from './AdminDetails';

const AdminOrdersView = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Card className="w-full max-w-4xl px-6 shadow-lg rounded-lg border border-gray-300 bg-white">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
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
                    <AdminOrderDetailsView />
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminOrdersView


// Admin will able to see all orders